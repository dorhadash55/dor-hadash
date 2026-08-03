import { isFirebaseConfigured } from "../firebase/config";
import { useAuth } from "../auth/AuthContext";

/** Bannière discrète : uniquement si Firebase manque ou non connecté. */
export default function FirebaseBanner() {
  const { canWriteToFirestore, usesFirebaseAuth } = useAuth();

  if (!isFirebaseConfigured()) {
    return (
      <div className="break-words border-b border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-900 sm:px-4 sm:py-3 sm:text-sm">
        <strong>Mode local</strong> — Configurez Firebase pour synchroniser le contenu en production.{" "}
        <a href="/admin/settings" className="font-semibold underline">
          Voir les instructions
        </a>
      </div>
    );
  }

  if (usesFirebaseAuth && !canWriteToFirestore) {
    return (
      <div className="break-words border-b border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-900 sm:px-4 sm:py-3 sm:text-sm">
        Session expirée — reconnectez-vous avec Google pour enregistrer.
      </div>
    );
  }

  return null;
}
