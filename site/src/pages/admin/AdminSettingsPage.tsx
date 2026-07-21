import { useState } from "react";
import AdminHeader from "../../admin/components/AdminHeader";
import { AdminButton, AdminCard, FormField, TextArea, TextInput } from "../../admin/components/AdminUi";
import { useSiteSettings } from "../../admin/hooks/useAdminContent";
import { testFirestoreWrite } from "../../admin/firebase/firestoreDiagnostics";
import {
  exportContentJson,
  getSiteSettings,
  importContentJson,
  isFirebaseConfigured,
  pushAllContentToFirestore,
  resetContentToDefaults,
  saveSiteSettings,
} from "../../admin/storage/contentStore";
import type { SiteSettings } from "../../admin/storage/types";

export default function AdminSettingsPage() {
  const current = useSiteSettings();
  const [form, setForm] = useState<SiteSettings>(current);
  const [saved, setSaved] = useState(false);
  const [importError, setImportError] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");
  const [testing, setTesting] = useState(false);
  const [testMessage, setTestMessage] = useState("");

  const updateHero = (key: keyof SiteSettings["hero"], value: string) => {
    setForm((prev) => ({ ...prev, hero: { ...prev.hero, [key]: value } }));
    setSaved(false);
  };

  const handleSave = () => {
    saveSiteSettings({
      ...form,
      phonesIsrael: form.phonesIsrael.filter(Boolean),
      phonesFrance: form.phonesFrance.filter(Boolean),
    });
    setSaved(true);
  };

  const handleExport = () => {
    const blob = new Blob([exportContentJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dor-hadash-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importContentJson(String(reader.result));
        setForm(getSiteSettings());
        setImportError("");
        alert("Import réussi.");
      } catch {
        setImportError("Fichier JSON invalide.");
      }
    };
    reader.readAsText(file);
  };

  const handleSyncFirestore = async () => {
    setSyncing(true);
    setSyncMessage("");
    const result = await pushAllContentToFirestore();
    setSyncing(false);
    if (result.ok) {
      setSyncMessage("Tout le contenu a été enregistré dans Firestore ✓");
    } else {
      setSyncMessage(`Erreur : ${result.error}`);
    }
  };

  const handleTestFirestore = async () => {
    setTesting(true);
    setTestMessage("");
    const result = await testFirestoreWrite();
    setTesting(false);
    setTestMessage(result.ok ? result.message : `${result.message}\n${result.details ?? ""}`);
  };

  return (
    <>
      <AdminHeader title="Paramètres" />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <AdminCard title="Contact du site">
          <div className="space-y-4">
            <FormField label="Email">
              <TextInput
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setSaved(false);
                }}
              />
            </FormField>
            <FormField label="Téléphones Israël (un par ligne)">
              <TextArea
                value={form.phonesIsrael.join("\n")}
                onChange={(e) => {
                  setForm({ ...form, phonesIsrael: e.target.value.split("\n") });
                  setSaved(false);
                }}
                rows={3}
              />
            </FormField>
            <FormField label="Téléphones France (un par ligne)">
              <TextArea
                value={form.phonesFrance.join("\n")}
                onChange={(e) => {
                  setForm({ ...form, phonesFrance: e.target.value.split("\n") });
                  setSaved(false);
                }}
                rows={2}
              />
            </FormField>
            {saved && <p className="text-sm text-brand-teal">Paramètres enregistrés ✓</p>}
            <AdminButton onClick={handleSave}>Enregistrer</AdminButton>
          </div>
        </AdminCard>

        <AdminCard title="Page d'accueil — Hero">
          <div className="space-y-4">
            <FormField label="Surtitre">
              <TextInput value={form.hero.eyebrow} onChange={(e) => updateHero("eyebrow", e.target.value)} />
            </FormField>
            <FormField label="Titre principal">
              <TextInput value={form.hero.title} onChange={(e) => updateHero("title", e.target.value)} />
            </FormField>
            <FormField label="Sous-titre">
              <TextArea value={form.hero.subtitle} onChange={(e) => updateHero("subtitle", e.target.value)} rows={3} />
            </FormField>
            <AdminButton onClick={handleSave}>Enregistrer le hero</AdminButton>
          </div>
        </AdminCard>

        <AdminCard title="Firestore — enregistrement">
          <p className="text-sm text-gray-600">
            Enregistre dans Firestore tous les articles de blog, témoignages vidéo, paramètres du site et
            messages contact. Les photos uploadées sont stockées dans Firebase Storage.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <AdminButton onClick={handleTestFirestore} disabled={testing || !isFirebaseConfigured()}>
              {testing ? "Test…" : "Tester la connexion Firestore"}
            </AdminButton>
            <AdminButton onClick={handleSyncFirestore} disabled={syncing || !isFirebaseConfigured()}>
              {syncing ? "Enregistrement…" : "Tout enregistrer dans Firestore"}
            </AdminButton>
          </div>
          {testMessage && (
            <pre
              className={`mt-3 whitespace-pre-wrap rounded-lg p-3 text-xs ${
                testMessage.startsWith("Échec") || testMessage.startsWith("Non")
                  ? "bg-red-50 text-brand-coral"
                  : "bg-brand-teal/10 text-brand-teal"
              }`}
            >
              {testMessage}
            </pre>
          )}
          {syncMessage && (
            <p
              className={`mt-3 text-sm ${syncMessage.startsWith("Erreur") ? "text-brand-coral" : "text-brand-teal"}`}
            >
              {syncMessage}
            </p>
          )}
        </AdminCard>

        <AdminCard title="Sauvegarde & restauration">
          <p className="text-sm text-gray-600">
            Exportez tout le contenu admin (vidéos, blog, messages, paramètres) en JSON pour le sauvegarder
            ou le migrer vers Firebase plus tard.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <AdminButton variant="secondary" onClick={handleExport}>
              Exporter JSON
            </AdminButton>
            <label className="inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              Importer JSON
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleImport(e.target.files[0])}
              />
            </label>
            <AdminButton
              variant="danger"
              onClick={() => {
                if (confirm("Réinitialiser tout le contenu admin aux valeurs par défaut ?")) {
                  resetContentToDefaults();
                  setSaved(false);
                }
              }}
            >
              Réinitialiser
            </AdminButton>
          </div>
          {importError && <p className="mt-2 text-sm text-brand-coral">{importError}</p>}
        </AdminCard>

        <AdminCard title="Configuration Firebase">
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              Statut :{" "}
              <strong className={isFirebaseConfigured() ? "text-brand-teal" : "text-amber-600"}>
                {isFirebaseConfigured() ? "Connecté à Firestore" : "Non configuré (mode localStorage)"}
              </strong>
            </p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Console Firebase → Paramètres du projet → Vos applications → Web → copiez la config
              </li>
              <li>
                Authentication → <strong>Google</strong> activé + domaines autorisés :{" "}
                <code className="rounded bg-gray-100 px-1">localhost</code>, votre domaine Vercel{" "}
                (<code className="rounded bg-gray-100 px-1">*.vercel.app</code>) et{" "}
                <code className="rounded bg-gray-100 px-1">dor-hadash.com</code>
              </li>
              <li>
                Définissez <code className="rounded bg-gray-100 px-1">VITE_ADMIN_PASSWORD</code> (connexion
                admin par mot de passe) et <code className="rounded bg-gray-100 px-1">VITE_ADMIN_EMAIL</code>{" "}
                (compte Google autorisé)
              </li>
              <li>
                Si erreur « permission-denied » malgré la connexion Google : vérifiez{" "}
                <strong>App Check</strong> → Firestore → mettez en <strong>Unenforced</strong> (pas Enforced)
              </li>
              <li>
                Déployez les règles depuis{" "}
                <code className="rounded bg-gray-100 px-1">site/firestore.rules</code> et{" "}
                <code className="rounded bg-gray-100 px-1">site/storage.rules</code>
              </li>
              <li>
                Ajoutez les clés dans <code className="rounded bg-gray-100 px-1">site/.env</code> (local) et
                dans Vercel → Settings → Environment Variables (production)
              </li>
            </ol>
            <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100">
{`VITE_ADMIN_PASSWORD=...
VITE_ADMIN_EMAIL=dor.hadash55@gmail.com
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...`}
            </pre>
            <p>
              Données Firestore :{" "}
              <code className="rounded bg-gray-100 px-1">site/content</code> (vidéos, blog, paramètres),{" "}
              <code className="rounded bg-gray-100 px-1">contact_submissions</code> (messages). Photos :{" "}
              <code className="rounded bg-gray-100 px-1">Storage /blog/</code>.
            </p>
          </div>
        </AdminCard>
      </main>
    </>
  );
}
