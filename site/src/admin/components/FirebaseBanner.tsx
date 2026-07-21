import { isFirebaseConfigured } from "../firebase/config";
import { useAuth } from "../auth/AuthContext";

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
        <strong>Accès lecture seule</strong> — Connectez-vous avec Google pour enregistrer dans
        Firestore (vidéos, blog, paramètres).
      </div>
    );
  }

  return (
    <div className="break-words border-b border-brand-teal/30 bg-brand-teal/10 px-3 py-2.5 text-xs text-brand-teal sm:px-4 sm:py-3 sm:text-sm">
      <strong>Firestore connecté</strong> — Le contenu est synchronisé avec Firebase (
      <code className="break-all font-mono">{import.meta.env.VITE_FIREBASE_PROJECT_ID}</code>).
    </div>
  );
}
