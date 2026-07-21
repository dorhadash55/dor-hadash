import { isFirebaseConfigured } from "../firebase/config";
import { useAuth } from "../auth/AuthContext";

export default function FirebaseBanner() {
  const { canWriteToFirestore, usesFirebaseAuth } = useAuth();

  if (!isFirebaseConfigured()) {
    return (
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong>Mode local</strong> — Configurez Firebase pour synchroniser le contenu en production.{" "}
        <a href="/admin/settings" className="font-semibold underline">
          Voir les instructions
        </a>
      </div>
    );
  }

  if (usesFirebaseAuth && !canWriteToFirestore) {
    return (
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong>Accès lecture seule</strong> — Connectez-vous avec Google pour enregistrer dans
        Firestore (vidéos, blog, paramètres).
      </div>
    );
  }

  return (
    <div className="border-b border-brand-teal/30 bg-brand-teal/10 px-4 py-3 text-sm text-brand-teal">
      <strong>Firestore connecté</strong> — Le contenu est synchronisé avec Firebase (
      <code className="font-mono">{import.meta.env.VITE_FIREBASE_PROJECT_ID}</code>).
    </div>
  );
}
