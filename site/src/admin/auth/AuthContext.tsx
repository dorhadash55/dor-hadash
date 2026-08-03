import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type User,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "../firebase/config";
import { isAllowedAdminEmail } from "./adminAccess";

export const GOOGLE_AUTH_ERROR_KEY = "dor-hadash:google-auth-error";
const GOOGLE_REDIRECT_PENDING_KEY = "dor-hadash:google-redirect-pending";

export type LoginResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "unauthorized" | "cancelled"; message?: string };

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  usesFirebaseAuth: boolean;
  canWriteToFirestore: boolean;
  userEmail: string | null;
  loginWithGoogle: () => Promise<LoginResult>;
  connectGoogleForFirestore: () => Promise<LoginResult>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function ensureAllowedAdmin(user: User | null): Promise<LoginResult> {
  const auth = getFirebaseAuth();
  if (!auth || !user) return { ok: false, reason: "invalid" };

  if (!isAllowedAdminEmail(user.email)) {
    await signOut(auth);
    return {
      ok: false,
      reason: "unauthorized",
      message: `Ce compte Google (${user.email}) n'est pas autorisé.`,
    };
  }

  return { ok: true };
}

function isPopupFallbackError(code: string) {
  return (
    code === "auth/popup-blocked" ||
    code === "auth/operation-not-supported-in-this-environment" ||
    code === "auth/web-storage-unsupported" ||
    code === "auth/cancelled-popup-request"
  );
}

export function formatGoogleAuthError(error: unknown): string {
  const code = (error as { code?: string }).code ?? "";

  if (code === "auth/unauthorized-domain") {
    const host = typeof window !== "undefined" ? window.location.hostname : "votre-domaine";
    return `Domaine non autorisé (${host}). Firebase Console → Authentication → Settings → Authorized domains → ajoutez ce domaine.`;
  }
  if (code === "auth/popup-closed-by-user") {
    return "";
  }
  if (code === "auth/unauthorized" || code === "auth/invalid-credential") {
    return "Connexion Google refusée. Vérifiez que Google est activé dans Firebase Authentication.";
  }

  const message = error instanceof Error ? error.message : "";
  if (message) return message;
  return "Connexion Google impossible. Réessayez.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const usesFirebaseAuth = isFirebaseConfigured();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(usesFirebaseAuth);

  const isAuthenticated = Boolean(firebaseUser);
  const canWriteToFirestore = Boolean(firebaseUser);
  const userEmail = firebaseUser?.email ?? null;

  useEffect(() => {
    if (!usesFirebaseAuth) {
      setIsLoading(false);
      return;
    }

    const auth = getFirebaseAuth();
    if (!auth) {
      setIsLoading(false);
      return;
    }

    let unsubAuth: (() => void) | undefined;
    let cancelled = false;

    const handleAuthUser = (user: User | null) => {
      if (user && !isAllowedAdminEmail(user.email)) {
        sessionStorage.setItem(
          GOOGLE_AUTH_ERROR_KEY,
          `Ce compte Google (${user.email}) n'est pas autorisé.`,
        );
        void signOut(auth);
        setFirebaseUser(null);
        return;
      }

      setFirebaseUser(user);
    };

    void (async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.warn("[Dor Hadash] Auth persistence:", error);
      }

      // Nettoyage d'anciennes sessions mot de passe (plus utilisées)
      try {
        sessionStorage.removeItem("dor-hadash:admin-auth");
      } catch {
        /* ignore */
      }

      const redirectPending =
        typeof sessionStorage !== "undefined" &&
        sessionStorage.getItem(GOOGLE_REDIRECT_PENDING_KEY) === "1";
      if (redirectPending) {
        sessionStorage.removeItem(GOOGLE_REDIRECT_PENDING_KEY);
      }

      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const loginResult = await ensureAllowedAdmin(result.user);
          if (!loginResult.ok && loginResult.message) {
            sessionStorage.setItem(GOOGLE_AUTH_ERROR_KEY, loginResult.message);
          }
        } else if (redirectPending) {
          sessionStorage.setItem(
            GOOGLE_AUTH_ERROR_KEY,
            "La connexion Google n'a pas pu être finalisée. Réessayez — une fenêtre popup va s'ouvrir. " +
              "Vérifiez aussi Firebase → Authentication → Authorized domains.",
          );
        }
      } catch (error) {
        console.warn("[Dor Hadash] Google redirect:", error);
        sessionStorage.setItem(GOOGLE_AUTH_ERROR_KEY, formatGoogleAuthError(error));
      }

      if (cancelled) return;

      unsubAuth = onAuthStateChanged(auth, (user) => {
        handleAuthUser(user);
        setIsLoading(false);
      });
    })();

    return () => {
      cancelled = true;
      unsubAuth?.();
    };
  }, [usesFirebaseAuth]);

  const signInWithGoogleProvider = useCallback(async (): Promise<LoginResult> => {
    if (!usesFirebaseAuth) {
      return {
        ok: false,
        reason: "invalid",
        message: "Firebase n'est pas configuré. Ajoutez les variables VITE_FIREBASE_* .",
      };
    }

    const auth = getFirebaseAuth();
    if (!auth) return { ok: false, reason: "invalid", message: "Firebase Auth indisponible." };

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const startRedirect = async () => {
      sessionStorage.setItem(GOOGLE_REDIRECT_PENDING_KEY, "1");
      await signInWithRedirect(auth, provider);
      return { ok: true } as const;
    };

    try {
      const result = await signInWithPopup(auth, provider);
      const loginResult = await ensureAllowedAdmin(result.user);
      if (!loginResult.ok && loginResult.message) {
        sessionStorage.setItem(GOOGLE_AUTH_ERROR_KEY, loginResult.message);
      }
      return loginResult;
    } catch (error) {
      const code = (error as { code?: string }).code ?? "";

      if (code === "auth/popup-closed-by-user") {
        return { ok: false, reason: "cancelled" };
      }

      if (isPopupFallbackError(code)) {
        try {
          return await startRedirect();
        } catch (redirectError) {
          console.warn("[Dor Hadash] Google redirect:", redirectError);
          return {
            ok: false,
            reason: "invalid",
            message: formatGoogleAuthError(redirectError),
          };
        }
      }

      console.warn("[Dor Hadash] Google sign-in:", error);
      return {
        ok: false,
        reason: "invalid",
        message: formatGoogleAuthError(error),
      };
    }
  }, [usesFirebaseAuth]);

  const loginWithGoogle = signInWithGoogleProvider;
  const connectGoogleForFirestore = signInWithGoogleProvider;

  const logout = useCallback(async () => {
    if (usesFirebaseAuth) {
      const auth = getFirebaseAuth();
      if (auth) await signOut(auth);
    }
    setFirebaseUser(null);
  }, [usesFirebaseAuth]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      usesFirebaseAuth,
      canWriteToFirestore,
      userEmail,
      loginWithGoogle,
      connectGoogleForFirestore,
      logout,
    }),
    [
      isAuthenticated,
      isLoading,
      usesFirebaseAuth,
      canWriteToFirestore,
      userEmail,
      loginWithGoogle,
      connectGoogleForFirestore,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
