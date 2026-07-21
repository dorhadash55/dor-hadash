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
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type User,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "../firebase/config";
import { getDefaultAdminEmail, isAllowedAdminEmail } from "./adminAccess";

const AUTH_KEY = "dor-hadash:admin-auth";
export const GOOGLE_AUTH_ERROR_KEY = "dor-hadash:google-auth-error";
const DEFAULT_PASSWORD = "dorhadash-admin";

type LoginInput = {
  password: string;
};

export type LoginResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "unauthorized" | "cancelled"; message?: string };

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  usesFirebaseAuth: boolean;
  canWriteToFirestore: boolean;
  userEmail: string | null;
  login: (input: LoginInput) => Promise<LoginResult>;
  loginWithGoogle: () => Promise<LoginResult>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readPasswordSession(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

function setPasswordSession(active: boolean) {
  if (typeof window === "undefined") return;
  if (active) sessionStorage.setItem(AUTH_KEY, "1");
  else sessionStorage.removeItem(AUTH_KEY);
}

function getExpectedPassword() {
  return (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) || DEFAULT_PASSWORD;
}

async function ensureAllowedAdmin(user: User | null): Promise<LoginResult> {
  const auth = getFirebaseAuth();
  if (!auth || !user) return { ok: false, reason: "invalid" };

  if (!isAllowedAdminEmail(user.email)) {
    await signOut(auth);
    return { ok: false, reason: "unauthorized" };
  }

  setPasswordSession(false);
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

function preferGoogleRedirect(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host !== "localhost" && host !== "127.0.0.1";
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
  return "Connexion Google impossible. Réessayez ou utilisez le mot de passe.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const usesFirebaseAuth = isFirebaseConfigured();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [passwordSession, setPasswordSessionState] = useState(() =>
    usesFirebaseAuth ? readPasswordSession() : readPasswordSession(),
  );
  const [isLoading, setIsLoading] = useState(usesFirebaseAuth);

  const isAuthenticated = Boolean(firebaseUser) || passwordSession;
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

    void getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          const loginResult = await ensureAllowedAdmin(result.user);
          if (!loginResult.ok && loginResult.message) {
            sessionStorage.setItem(GOOGLE_AUTH_ERROR_KEY, loginResult.message);
          }
        }
      })
      .catch((error) => {
        console.warn("[Dor Hadash] Google redirect:", error);
        sessionStorage.setItem(GOOGLE_AUTH_ERROR_KEY, formatGoogleAuthError(error));
      });

    return onAuthStateChanged(auth, (user) => {
      if (user && !isAllowedAdminEmail(user.email)) {
        void signOut(auth);
        setFirebaseUser(null);
        setIsLoading(false);
        return;
      }

      if (user) setPasswordSession(false);
      setFirebaseUser(user);
      setIsLoading(false);
    });
  }, [usesFirebaseAuth]);

  const login = useCallback(
    async ({ password }: LoginInput): Promise<LoginResult> => {
      if (password !== getExpectedPassword()) {
        return { ok: false, reason: "invalid" };
      }

      if (usesFirebaseAuth) {
        const auth = getFirebaseAuth();
        const email = getDefaultAdminEmail();

        if (auth) {
          try {
            const credential = await signInWithEmailAndPassword(auth, email, password);
            return ensureAllowedAdmin(credential.user);
          } catch {
            // Mot de passe admin OK — accès UI sans Firebase Auth email/password configuré
            setPasswordSession(true);
            setPasswordSessionState(true);
            return { ok: true };
          }
        }
      }

      setPasswordSession(true);
      setPasswordSessionState(true);
      return { ok: true };
    },
    [usesFirebaseAuth],
  );

  const loginWithGoogle = useCallback(async (): Promise<LoginResult> => {
    if (!usesFirebaseAuth) return { ok: false, reason: "invalid" };

    const auth = getFirebaseAuth();
    if (!auth) return { ok: false, reason: "invalid" };

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      if (preferGoogleRedirect()) {
        await signInWithRedirect(auth, provider);
        return { ok: true };
      }

      const result = await signInWithPopup(auth, provider);
      return ensureAllowedAdmin(result.user);
    } catch (error) {
      const code = (error as { code?: string }).code ?? "";

      if (code === "auth/popup-closed-by-user") {
        return { ok: false, reason: "cancelled" };
      }

      if (isPopupFallbackError(code)) {
        try {
          await signInWithRedirect(auth, provider);
          return { ok: true };
        } catch (redirectError) {
          console.warn("[Dor Hadash] Google redirect:", redirectError);
          return { ok: false, reason: "invalid" };
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

  const logout = useCallback(async () => {
    setPasswordSession(false);
    setPasswordSessionState(false);

    if (usesFirebaseAuth) {
      const auth = getFirebaseAuth();
      if (auth) await signOut(auth);
      setFirebaseUser(null);
      return;
    }
  }, [usesFirebaseAuth]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      usesFirebaseAuth,
      canWriteToFirestore,
      userEmail,
      login,
      loginWithGoogle,
      logout,
    }),
    [
      isAuthenticated,
      isLoading,
      usesFirebaseAuth,
      canWriteToFirestore,
      userEmail,
      login,
      loginWithGoogle,
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
