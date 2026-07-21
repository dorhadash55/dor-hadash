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
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "../firebase/config";
import { isAllowedAdminEmail } from "./adminAccess";

const AUTH_KEY = "dor-hadash:admin-auth";
const DEFAULT_PASSWORD = "dorhadash-admin";

type LoginInput = {
  email?: string;
  password: string;
};

export type LoginResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "unauthorized" | "cancelled" };

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  usesFirebaseAuth: boolean;
  userEmail: string | null;
  login: (input: LoginInput) => Promise<LoginResult>;
  loginWithGoogle: () => Promise<LoginResult>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readLocalAuth(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

async function ensureAllowedAdmin(email: string | null | undefined): Promise<LoginResult> {
  const auth = getFirebaseAuth();
  if (!auth) return { ok: false, reason: "invalid" };

  if (!isAllowedAdminEmail(email)) {
    await signOut(auth);
    return { ok: false, reason: "unauthorized" };
  }

  return { ok: true };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const usesFirebaseAuth = isFirebaseConfigured();
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    usesFirebaseAuth ? false : readLocalAuth(),
  );
  const [isLoading, setIsLoading] = useState(usesFirebaseAuth);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!usesFirebaseAuth) return;

    const auth = getFirebaseAuth();
    if (!auth) {
      setIsLoading(false);
      return;
    }

    void getRedirectResult(auth).then(async (result) => {
      if (result?.user) {
        await ensureAllowedAdmin(result.user.email);
      }
    });

    return onAuthStateChanged(auth, (user) => {
      if (user && !isAllowedAdminEmail(user.email)) {
        void signOut(auth);
        setIsAuthenticated(false);
        setUserEmail(null);
        setIsLoading(false);
        return;
      }

      setUserEmail(user?.email ?? null);
      setIsAuthenticated(Boolean(user));
      setIsLoading(false);
    });
  }, [usesFirebaseAuth]);

  const login = useCallback(
    async ({ email, password }: LoginInput): Promise<LoginResult> => {
      if (usesFirebaseAuth) {
        const auth = getFirebaseAuth();
        if (!auth || !email) return { ok: false, reason: "invalid" };

        if (!isAllowedAdminEmail(email)) {
          return { ok: false, reason: "unauthorized" };
        }

        try {
          const credential = await signInWithEmailAndPassword(auth, email, password);
          return ensureAllowedAdmin(credential.user.email);
        } catch {
          return { ok: false, reason: "invalid" };
        }
      }

      const expected = import.meta.env.VITE_ADMIN_PASSWORD || DEFAULT_PASSWORD;
      if (password !== expected) return { ok: false, reason: "invalid" };

      sessionStorage.setItem(AUTH_KEY, "1");
      setIsAuthenticated(true);
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
      await signInWithRedirect(auth, provider);
      return { ok: true };
    } catch {
      return { ok: false, reason: "invalid" };
    }
  }, [usesFirebaseAuth]);

  const logout = useCallback(async () => {
    if (usesFirebaseAuth) {
      const auth = getFirebaseAuth();
      if (auth) await signOut(auth);
      setIsAuthenticated(false);
      setUserEmail(null);
      return;
    }

    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }, [usesFirebaseAuth]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      usesFirebaseAuth,
      userEmail,
      login,
      loginWithGoogle,
      logout,
    }),
    [isAuthenticated, isLoading, usesFirebaseAuth, userEmail, login, loginWithGoogle, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function getDefaultAdminPasswordHint() {
  return import.meta.env.VITE_ADMIN_PASSWORD ? "(mot de passe configuré dans .env)" : DEFAULT_PASSWORD;
}
