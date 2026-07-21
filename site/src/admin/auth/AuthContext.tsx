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
const DEFAULT_PASSWORD = "dorhadash-admin";

type LoginInput = {
  password: string;
};

export type LoginResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "unauthorized" | "cancelled" };

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
    code === "auth/web-storage-unsupported"
  );
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
          await ensureAllowedAdmin(result.user);
        }
      })
      .catch((error) => {
        console.warn("[Dor Hadash] Google redirect:", error);
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
      const result = await signInWithPopup(auth, provider);
      return ensureAllowedAdmin(result.user);
    } catch (error) {
      const code = (error as { code?: string }).code ?? "";

      if (code === "auth/popup-closed-by-user") {
        return { ok: false, reason: "cancelled" };
      }

      if (isPopupFallbackError(code) || code.startsWith("auth/")) {
        try {
          await signInWithRedirect(auth, provider);
          return { ok: true };
        } catch {
          return { ok: false, reason: "invalid" };
        }
      }

      return { ok: false, reason: "invalid" };
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
