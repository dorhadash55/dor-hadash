import { AuthProvider } from "./auth/AuthContext";
import ContentSyncInit from "../components/ContentSyncInit";
import { Outlet } from "react-router-dom";

/** Enveloppe toutes les routes /admin avec le contexte d'authentification. */
export default function AdminRoot() {
  return (
    <AuthProvider>
      <ContentSyncInit />
      <div className="admin-shell min-h-dvh w-full max-w-[100vw]">
        <Outlet />
      </div>
    </AuthProvider>
  );
}
