import { AuthProvider } from "./auth/AuthContext";
import ContentSyncInit from "../components/ContentSyncInit";
import { Outlet } from "react-router-dom";

/** Enveloppe toutes les routes /admin avec le contexte d'authentification. */
export default function AdminRoot() {
  return (
    <AuthProvider>
      <ContentSyncInit />
      <Outlet />
    </AuthProvider>
  );
}
