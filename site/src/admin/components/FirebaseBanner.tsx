import { useState } from "react";
import { isFirebaseConfigured } from "../firebase/config";
import { useAuth } from "../auth/AuthContext";
import { getDefaultAdminEmail } from "../auth/adminAccess";

export default function FirebaseBanner() {
  const { canWriteToFirestore, usesFirebaseAuth, connectGoogleForFirestore, userEmail } = useAuth();
  const [connecting, setConnecting] = useState(false);

  const handleGoogleConnect = async () => {
    setConnecting(true);
    try {
      await connectGoogleForFirestore();
    } finally {
      setConnecting(false);
    }
  };

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
        <p>
          <strong>Enregistrement Firebase désactivé</strong> — Le mot de passe ouvre l&apos;admin, mais seule
          la connexion Google ({getDefaultAdminEmail()}) permet d&apos;enregistrer vidéos, blog et paramètres.
        </p>
        <button
          type="button"
          onClick={handleGoogleConnect}
          disabled={connecting}
          className="mt-2 rounded-lg bg-brand-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60 sm:text-sm"
        >
          {connecting ? "Redirection Google…" : "Se connecter avec Google pour enregistrer"}
        </button>
      </div>
    );
  }

  return (
    <div className="break-words border-b border-brand-teal/30 bg-brand-teal/10 px-3 py-2.5 text-xs text-brand-teal sm:px-4 sm:py-3 sm:text-sm">
      <strong>Firestore connecté</strong>
      {userEmail ? ` (${userEmail})` : ""} — Le contenu est synchronisé avec Firebase (
      <code className="break-all font-mono">{import.meta.env.VITE_FIREBASE_PROJECT_ID}</code>).
    </div>
  );
}
