import { useState } from "react";
import AdminHeader from "../../admin/components/AdminHeader";
import { AdminButton, AdminCard, FormField, TextArea, TextInput } from "../../admin/components/AdminUi";
import { useSiteSettings } from "../../admin/hooks/useAdminContent";
import {
  exportContentJson,
  getSiteSettings,
  importContentJson,
  isFirebaseConfigured,
  resetContentToDefaults,
  saveSiteSettings,
} from "../../admin/storage/contentStore";
import type { SiteSettings } from "../../admin/storage/types";

export default function AdminSettingsPage() {
  const current = useSiteSettings();
  const [form, setForm] = useState<SiteSettings>(current);
  const [saved, setSaved] = useState(false);
  const [importError, setImportError] = useState("");

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

        <AdminCard title="Configuration Firebase (à venir)">
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              Statut :{" "}
              <strong className={isFirebaseConfigured() ? "text-brand-teal" : "text-amber-600"}>
                {isFirebaseConfigured() ? "Variables détectées" : "Non configuré"}
              </strong>
            </p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Créez un projet sur console.firebase.google.com</li>
              <li>Activez Firestore et Authentication (email/mot de passe)</li>
              <li>Ajoutez les clés dans <code className="rounded bg-gray-100 px-1">.env</code> :</li>
            </ol>
            <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100">
{`VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_ADMIN_PASSWORD=votre-mot-de-passe-admin`}
            </pre>
            <p>
              Collections Firestore prévues : <code className="rounded bg-gray-100 px-1">videos</code>,{" "}
              <code className="rounded bg-gray-100 px-1">blog_posts</code>,{" "}
              <code className="rounded bg-gray-100 px-1">contact_submissions</code>,{" "}
              <code className="rounded bg-gray-100 px-1">site_settings</code>
            </p>
          </div>
        </AdminCard>
      </main>
    </>
  );
}
