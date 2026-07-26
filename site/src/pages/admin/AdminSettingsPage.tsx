import { useState } from "react";
import AdminHeader from "../../admin/components/AdminHeader";
import { AdminButton, AdminCard, FormField, TextArea, TextInput, AdminBadge } from "../../admin/components/AdminUi";
import { useAuth } from "../../admin/auth/AuthContext";
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
  const { canWriteToFirestore } = useAuth();
  const [form, setForm] = useState<SiteSettings>(current);
  const [saved, setSaved] = useState(false);
  const [importError, setImportError] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");
  const [testing, setTesting] = useState(false);
  const [testMessage, setTestMessage] = useState("");
  const [showTech, setShowTech] = useState(false);

  const updateHero = (key: keyof SiteSettings["hero"], value: string) => {
    setForm((prev) => ({ ...prev, hero: { ...prev.hero, [key]: value } }));
    setSaved(false);
  };

  const handleSave = () => {
    if (!canWriteToFirestore && isFirebaseConfigured()) {
      alert("Connectez-vous avec Google pour enregistrer dans Firebase.");
      return;
    }
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
      <AdminHeader
        title="Paramètres"
        description="Coordonnées du site, texte de la page d'accueil, sauvegarde et outils Firebase."
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <AdminBadge tone={isFirebaseConfigured() ? "success" : "warning"}>
            {isFirebaseConfigured() ? "Firebase configuré" : "Mode local"}
          </AdminBadge>
          {isFirebaseConfigured() && (
            <AdminBadge tone={canWriteToFirestore ? "success" : "warning"}>
              {canWriteToFirestore ? "Enregistrement actif" : "Google requis pour enregistrer"}
            </AdminBadge>
          )}
        </div>

        <AdminCard title="Contact affiché sur le site">
          <div className="space-y-4">
            <FormField label="Email" hint="Footer, page contact">
              <TextInput
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setSaved(false);
                }}
              />
            </FormField>
            <FormField label="Téléphones Israël" hint="Un numéro par ligne">
              <TextArea
                value={form.phonesIsrael.join("\n")}
                onChange={(e) => {
                  setForm({ ...form, phonesIsrael: e.target.value.split("\n") });
                  setSaved(false);
                }}
                rows={3}
              />
            </FormField>
            <FormField label="Téléphones France" hint="Un numéro par ligne">
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
            <AdminButton onClick={handleSave} disabled={!canWriteToFirestore && isFirebaseConfigured()}>
              Enregistrer les contacts
            </AdminButton>
          </div>
        </AdminCard>

        <AdminCard title="Page d'accueil — bannière principale">
          <div className="space-y-4">
            <FormField label="Surtitre" hint="Ex : Association Dor Hadash">
              <TextInput value={form.hero.eyebrow} onChange={(e) => updateHero("eyebrow", e.target.value)} />
            </FormField>
            <FormField label="Titre principal">
              <TextInput value={form.hero.title} onChange={(e) => updateHero("title", e.target.value)} />
            </FormField>
            <FormField label="Sous-titre">
              <TextArea value={form.hero.subtitle} onChange={(e) => updateHero("subtitle", e.target.value)} rows={3} />
            </FormField>
            <AdminButton onClick={handleSave} disabled={!canWriteToFirestore && isFirebaseConfigured()}>
              Enregistrer le hero
            </AdminButton>
          </div>
        </AdminCard>

        <AdminCard title="Synchronisation Firebase">
          <p className="text-sm text-gray-600">
            Testez la connexion puis poussez tout le contenu (vidéos, blog, paramètres, messages) vers Firestore.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <AdminButton onClick={handleTestFirestore} disabled={testing || !isFirebaseConfigured()}>
              {testing ? "Test…" : "Tester Firestore"}
            </AdminButton>
            <AdminButton
              onClick={handleSyncFirestore}
              disabled={syncing || !isFirebaseConfigured() || !canWriteToFirestore}
            >
              {syncing ? "Enregistrement…" : "Tout synchroniser"}
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
            Exportez ou importez tout le contenu admin en JSON (utile avant une migration ou en cas de problème).
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
                  setForm(getSiteSettings());
                  setSaved(false);
                }
              }}
            >
              Réinitialiser
            </AdminButton>
          </div>
          {importError && <p className="mt-2 text-sm text-brand-coral">{importError}</p>}
        </AdminCard>

        <AdminCard
          title="Aide technique Firebase"
          action={
            <AdminButton variant="ghost" onClick={() => setShowTech((v) => !v)}>
              {showTech ? "Masquer" : "Afficher"}
            </AdminButton>
          }
        >
          {showTech ? (
            <div className="space-y-3 text-sm text-gray-600">
              <ol className="list-decimal space-y-2 pl-5">
                <li>Console Firebase → Paramètres → Web → copiez la config</li>
                <li>
                  Authentication → Google activé + domaines :{" "}
                  <code className="rounded bg-gray-100 px-1">localhost</code>,{" "}
                  <code className="rounded bg-gray-100 px-1">dor-hadash.vercel.app</code>,{" "}
                  <code className="rounded bg-gray-100 px-1">dor-hadash.com</code>
                </li>
                <li>
                  Variables Vercel : <code className="rounded bg-gray-100 px-1">VITE_ADMIN_PASSWORD</code>,{" "}
                  <code className="rounded bg-gray-100 px-1">VITE_ADMIN_EMAIL</code>, toutes les{" "}
                  <code className="rounded bg-gray-100 px-1">VITE_FIREBASE_*</code>
                </li>
                <li>App Check → Firestore → <strong>Unenforced</strong> si erreur permission-denied</li>
                <li>Publiez <code className="rounded bg-gray-100 px-1">firestore.rules</code> et{" "}
                  <code className="rounded bg-gray-100 px-1">storage.rules</code>
                </li>
              </ol>
              <pre className="max-w-full overflow-x-auto rounded-lg bg-gray-900 p-3 text-xs text-gray-100">
{`VITE_ADMIN_EMAIL=dor.hadash55@gmail.com
VITE_FIREBASE_PROJECT_ID=dor-hadash-a1202
…`}
              </pre>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Instructions détaillées pour la configuration Firebase, Vercel et les domaines autorisés.
            </p>
          )}
        </AdminCard>
      </main>
    </>
  );
}
