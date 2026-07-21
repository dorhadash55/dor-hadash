import { isFirebaseConfigured } from "../storage/contentStore";

export default function FirebaseBanner() {
  if (isFirebaseConfigured()) return null;

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <strong>Mode local</strong> — Les données sont stockées dans le navigateur (localStorage).
      Configurez Firebase pour synchroniser le contenu en production.{" "}
      <a href="/admin/settings" className="font-semibold underline">
        Voir les instructions
      </a>
    </div>
  );
}
