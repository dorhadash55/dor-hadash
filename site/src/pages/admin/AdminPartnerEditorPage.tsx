import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../admin/components/AdminHeader";
import ImageUpload from "../../admin/components/ImageUpload";
import { useAuth } from "../../admin/auth/AuthContext";
import {
  AdminButton,
  AdminCard,
  FormField,
  TextArea,
  TextInput,
} from "../../admin/components/AdminUi";
import { usePartner } from "../../admin/hooks/useAdminContent";
import { getPartnerBySlug, upsertPartnerAsync } from "../../admin/storage/contentStore";
import type { Partner } from "../../admin/storage/types";
import { slugify } from "../../admin/utils/slug";
import {
  PARTNER_HIGHLIGHT_ICONS,
  partnerCategoryLabels,
  partnerHighlightIconLabels,
  type PartnerCategory,
  type PartnerHighlightIcon,
} from "../../content/partners";

type HighlightForm = { text: string; icon: PartnerHighlightIcon };
type PartnerForm = {
  name: string;
  slug: string;
  nameHe: string;
  category: PartnerCategory;
  tagline: string;
  summary: string;
  logo: string;
  website: string;
  websiteLabel: string;
  phone: string;
  phoneDisplay: string;
  contactName: string;
  offer: string;
  audience: string;
  quote: string;
  highlights: HighlightForm[];
  showOnHome: boolean;
};

const emptyHighlight = (): HighlightForm => ({ text: "", icon: "help" });
const emptyForm = (): PartnerForm => ({
  name: "",
  slug: "",
  nameHe: "",
  category: "operationnel",
  tagline: "",
  summary: "",
  logo: "",
  website: "",
  websiteLabel: "",
  phone: "",
  phoneDisplay: "",
  contactName: "",
  offer: "",
  audience: "",
  quote: "",
  highlights: [],
  showOnHome: false,
});

function partnerToForm(partner: Partner): PartnerForm {
  return {
    ...emptyForm(),
    ...partner,
    nameHe: partner.nameHe ?? "",
    logo: partner.logo ?? "",
    website: partner.website ?? "",
    websiteLabel: partner.websiteLabel ?? "",
    phone: partner.phone ?? "",
    phoneDisplay: partner.phoneDisplay ?? "",
    contactName: partner.contactName ?? "",
    offer: partner.offer ?? "",
    audience: partner.audience ?? "",
    quote: partner.quote ?? "",
    highlights: partner.highlights ?? [],
    showOnHome: Boolean(partner.showOnHome),
  };
}

function formToPartner(form: PartnerForm, previous?: Partner): Partner {
  const optional = (value: string) => value.trim() || undefined;
  return {
    slug: form.slug.trim(),
    name: form.name.trim(),
    category: form.category,
    tagline: form.tagline.trim(),
    summary: form.summary.trim(),
    ...(optional(form.nameHe) ? { nameHe: optional(form.nameHe) } : {}),
    ...(optional(form.logo) ? { logo: optional(form.logo) } : {}),
    ...(optional(form.website) ? { website: optional(form.website) } : {}),
    ...(optional(form.websiteLabel) ? { websiteLabel: optional(form.websiteLabel) } : {}),
    ...(optional(form.phone) ? { phone: optional(form.phone) } : {}),
    ...(optional(form.phoneDisplay) ? { phoneDisplay: optional(form.phoneDisplay) } : {}),
    ...(optional(form.contactName) ? { contactName: optional(form.contactName) } : {}),
    ...(optional(form.offer) ? { offer: optional(form.offer) } : {}),
    ...(optional(form.audience) ? { audience: optional(form.audience) } : {}),
    ...(optional(form.quote) ? { quote: optional(form.quote) } : {}),
    ...(form.highlights.some((item) => item.text.trim())
      ? {
          highlights: form.highlights
            .map((item) => ({ ...item, text: item.text.trim() }))
            .filter((item) => item.text),
        }
      : {}),
    ...(form.showOnHome ? { showOnHome: true } : {}),
    ...(previous?.sortKey !== undefined ? { sortKey: previous.sortKey } : {}),
  };
}

type EditorLocationState = { justSaved?: "created" | "updated" };
const selectClass =
  "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";

export default function AdminPartnerEditorPage() {
  const { slug } = useParams<{ slug: string }>();
  const isNew = !slug;
  const existing = usePartner(slug ?? "");
  const navigate = useNavigate();
  const location = useLocation();
  const justSaved = (location.state as EditorLocationState | null)?.justSaved;
  const { canWriteToFirestore, connectGoogleForFirestore } = useAuth();
  const [form, setForm] = useState<PartnerForm>(emptyForm());
  const [slugManual, setSlugManual] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<"created" | "updated" | null>(justSaved ?? null);
  const [saving, setSaving] = useState(false);
  const [connectingGoogle, setConnectingGoogle] = useState(false);

  useEffect(() => {
    if (!isNew && existing) {
      setForm(partnerToForm(existing));
      setSlugManual(true);
    }
  }, [isNew, existing]);

  if (!isNew && slug && !existing && !saved) {
    return (
      <>
        <AdminHeader title="Partenaire introuvable" />
        <main className="p-6">
          <Link to="/admin/partenaires" className="text-brand-blue hover:underline">
            ← Retour aux partenaires
          </Link>
        </main>
      </>
    );
  }

  const updateField = <K extends keyof PartnerForm>(key: K, value: PartnerForm[K]) => {
    setForm((previous) => {
      const next = { ...previous, [key]: value };
      if (key === "name" && !slugManual) next.slug = slugify(String(value));
      return next;
    });
    setSaved(null);
  };

  const handleSave = async () => {
    if (!canWriteToFirestore) {
      setError("Connectez-vous avec Google pour enregistrer dans Firestore.");
      return;
    }
    const finalSlug = (form.slug || slugify(form.name)).trim();
    if (!form.name.trim() || !finalSlug || !form.tagline.trim() || !form.summary.trim()) {
      setError("Le nom, le slug, l’accroche et le résumé sont obligatoires.");
      return;
    }
    const duplicate = getPartnerBySlug(finalSlug);
    if (duplicate && (isNew || duplicate.slug !== slug)) {
      setError("Ce slug existe déjà. Choisissez-en un autre.");
      return;
    }
    setSaving(true);
    const result = await upsertPartnerAsync(
      formToPartner({ ...form, slug: finalSlug }, isNew ? undefined : existing),
      { previousSlug: isNew ? undefined : slug },
    );
    setSaving(false);
    if (!result.ok) {
      setError(`Erreur Firestore : ${result.error}`);
      return;
    }
    const kind = isNew ? "created" : "updated";
    setError("");
    setSaved(kind);
    if (isNew) {
      navigate(`/admin/partenaires/${finalSlug}/edit`, {
        replace: true,
        state: { justSaved: kind } satisfies EditorLocationState,
      });
    }
  };

  return (
    <>
      <AdminHeader
        title={isNew ? "Nouveau partenaire" : "Modifier le partenaire"}
        description="Renseignez sa présentation, ses coordonnées et les détails affichés dans la fenêtre du site."
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        {saved && (
          <p className="rounded-lg bg-brand-teal/10 px-4 py-3 text-sm font-medium text-brand-teal">
            Partenaire {saved === "created" ? "ajouté" : "enregistré"} dans Firestore ✓
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/partenaires" className="text-sm font-medium text-brand-blue hover:underline">
            ← Retour aux partenaires
          </Link>
          {!isNew && form.slug && (
            <a href={`/partenaires#${form.slug}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-brand-blue hover:underline">
              Aperçu sur le site ↗
            </a>
          )}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <AdminCard title="Présentation">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Nom"><TextInput value={form.name} onChange={(e) => updateField("name", e.target.value)} /></FormField>
                <FormField label="Nom en hébreu"><TextInput dir="rtl" value={form.nameHe} onChange={(e) => updateField("nameHe", e.target.value)} /></FormField>
                <FormField label="Slug"><TextInput value={form.slug} onChange={(e) => { setSlugManual(true); updateField("slug", slugify(e.target.value)); }} /></FormField>
                <FormField label="Catégorie">
                  <select className={selectClass} value={form.category} onChange={(e) => updateField("category", e.target.value as PartnerCategory)}>
                    {Object.entries(partnerCategoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </FormField>
                <div className="sm:col-span-2"><FormField label="Accroche"><TextInput value={form.tagline} onChange={(e) => updateField("tagline", e.target.value)} /></FormField></div>
                <div className="sm:col-span-2"><FormField label="Résumé"><TextArea rows={5} value={form.summary} onChange={(e) => updateField("summary", e.target.value)} /></FormField></div>
              </div>
            </AdminCard>

            <AdminCard title="Coordonnées et offre">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Site web"><TextInput type="url" value={form.website} onChange={(e) => updateField("website", e.target.value)} /></FormField>
                <FormField label="Texte du bouton"><TextInput value={form.websiteLabel} onChange={(e) => updateField("websiteLabel", e.target.value)} /></FormField>
                <FormField label="Téléphone (lien)"><TextInput value={form.phone} onChange={(e) => updateField("phone", e.target.value)} /></FormField>
                <FormField label="Téléphone affiché"><TextInput value={form.phoneDisplay} onChange={(e) => updateField("phoneDisplay", e.target.value)} /></FormField>
                <FormField label="Contact"><TextInput value={form.contactName} onChange={(e) => updateField("contactName", e.target.value)} /></FormField>
                <FormField label="Public concerné"><TextInput value={form.audience} onChange={(e) => updateField("audience", e.target.value)} /></FormField>
                <div className="sm:col-span-2"><FormField label="Offre"><TextInput value={form.offer} onChange={(e) => updateField("offer", e.target.value)} /></FormField></div>
                <div className="sm:col-span-2"><FormField label="Citation"><TextArea rows={4} value={form.quote} onChange={(e) => updateField("quote", e.target.value)} /></FormField></div>
              </div>
            </AdminCard>

            <AdminCard title="Points forts" action={<AdminButton variant="secondary" onClick={() => updateField("highlights", [...form.highlights, emptyHighlight()])}>+ Point fort</AdminButton>}>
              {form.highlights.length === 0 ? <p className="text-sm text-gray-500">Aucun point fort.</p> : (
                <div className="space-y-3">
                  {form.highlights.map((highlight, index) => (
                    <div key={index} className="grid gap-3 rounded-xl border border-gray-100 p-3 sm:grid-cols-[180px_1fr_auto]">
                      <select className={selectClass} value={highlight.icon} onChange={(e) => updateField("highlights", form.highlights.map((item, i) => i === index ? { ...item, icon: e.target.value as PartnerHighlightIcon } : item))}>
                        {PARTNER_HIGHLIGHT_ICONS.map((icon) => <option key={icon} value={icon}>{partnerHighlightIconLabels[icon]}</option>)}
                      </select>
                      <TextInput value={highlight.text} onChange={(e) => updateField("highlights", form.highlights.map((item, i) => i === index ? { ...item, text: e.target.value } : item))} placeholder="Description" />
                      <AdminButton variant="ghost" onClick={() => updateField("highlights", form.highlights.filter((_, i) => i !== index))}>Retirer</AdminButton>
                    </div>
                  ))}
                </div>
              )}
            </AdminCard>
          </div>

          <div className="space-y-6">
            <AdminCard title="Publication">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={form.showOnHome} onChange={(e) => updateField("showOnHome", e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue" />
                  Afficher dans le bandeau d’accueil
                </label>
                <FormField label="Logo">
                  <ImageUpload value={form.logo} onChange={(url) => updateField("logo", url)} folder="partners" label="Logo" />
                </FormField>
              </div>
            </AdminCard>
            {error && (
              <div className="space-y-2">
                <p className="text-sm text-brand-coral">{error}</p>
                {!canWriteToFirestore && (
                  <AdminButton variant="secondary" disabled={connectingGoogle} onClick={async () => {
                    setConnectingGoogle(true);
                    setError("");
                    try { await connectGoogleForFirestore(); } finally { setConnectingGoogle(false); }
                  }}>
                    {connectingGoogle ? "Redirection Google…" : "Se connecter avec Google"}
                  </AdminButton>
                )}
              </div>
            )}
            <AdminButton className="w-full" onClick={() => void handleSave()} disabled={saving || !canWriteToFirestore}>
              {saving ? "Enregistrement…" : "Enregistrer dans Firestore"}
            </AdminButton>
          </div>
        </div>
      </main>
    </>
  );
}
