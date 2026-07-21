import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

const AUTH_KEY = "dor-hadash:admin-auth";
const DEFAULT_PASSWORD = "dorhadash-admin";

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readAuth(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readAuth);

  const login = useCallback((password: string) => {
    const expected = import.meta.env.VITE_ADMIN_PASSWORD || DEFAULT_PASSWORD;
    if (password !== expected) return false;
    sessionStorage.setItem(AUTH_KEY, "1");
    setIsAuthenticated(true);
    // TODO(Firebase): remplacer par signInWithEmailAndPassword
    return true;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    // TODO(Firebase): signOut(auth)
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
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
