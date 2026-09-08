import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../admin/components/AdminHeader";
import ImageUpload from "../../admin/components/ImageUpload";
import { useAuth } from "../../admin/auth/AuthContext";
import { AdminButton, AdminCard, FormField, TextArea, TextInput } from "../../admin/components/AdminUi";
import { useCity } from "../../admin/hooks/useAdminContent";
import { getCityBySlug, upsertCityAsync } from "../../admin/storage/contentStore";
import type { City } from "../../admin/storage/types";
import { slugify } from "../../admin/utils/slug";
import { isReservedCitySlug, type CityGalleryImage } from "../../content/cities";

type GalleryFormItem = {
  src: string;
  caption: string;
  fit: "cover" | "contain";
};

type SectionForm = {
  heading: string;
  body: string;
};

type TestimonialForm = {
  name: string;
  quote: string;
};

type CityForm = {
  name: string;
  slug: string;
  tagline: string;
  image: string;
  isDraft: boolean;
  intro: string;
  sections: SectionForm[];
  testimonials: TestimonialForm[];
  gallery: GalleryFormItem[];
  galleryMore: GalleryFormItem[];
};

const emptyGalleryItem = (): GalleryFormItem => ({ src: "", caption: "", fit: "cover" });
const emptySection = (): SectionForm => ({ heading: "", body: "" });
const emptyTestimonial = (): TestimonialForm => ({ name: "", quote: "" });

const emptyForm = (): CityForm => ({
  name: "",
  slug: "",
  tagline: "",
  image: "",
  isDraft: false,
  intro: "",
  sections: [emptySection()],
  testimonials: [],
  gallery: [],
  galleryMore: [],
});

function splitParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function galleryToForm(images?: CityGalleryImage[]): GalleryFormItem[] {
  return (images ?? []).map((image) => ({
    src: image.src,
    caption: image.caption,
    fit: image.fit === "contain" ? "contain" : "cover",
  }));
}

function formToGallery(items: GalleryFormItem[]): CityGalleryImage[] | undefined {
  const images: CityGalleryImage[] = [];
  for (const item of items) {
    const src = item.src.trim();
    if (!src) continue;
    const image: CityGalleryImage = { src, caption: item.caption.trim() };
    if (item.fit === "contain") image.fit = "contain";
    images.push(image);
  }
  return images.length ? images : undefined;
}

function cityToForm(city: City): CityForm {
  return {
    name: city.name,
    slug: city.slug,
    tagline: city.tagline,
    image: city.image,
    isDraft: Boolean(city.isDraft),
    intro: city.intro.join("\n\n"),
    sections: city.sections.length
      ? city.sections.map((section) => ({
          heading: section.heading,
          body: section.paragraphs.join("\n\n"),
        }))
      : [emptySection()],
    testimonials: city.testimonials.map((item) => ({ name: item.name, quote: item.quote })),
    gallery: galleryToForm(city.gallery),
    galleryMore: galleryToForm(city.galleryMore),
  };
}

function formToCity(form: CityForm, previous?: City): City {
  const gallery = formToGallery(form.gallery);
  const galleryMore = formToGallery(form.galleryMore);
  const city: City = {
    slug: form.slug.trim(),
    name: form.name.trim(),
    tagline: form.tagline.trim(),
    image: form.image.trim() || gallery?.[0]?.src || previous?.image || "",
    intro: splitParagraphs(form.intro),
    sections: form.sections
      .map((section) => ({
        heading: section.heading.trim(),
        paragraphs: splitParagraphs(section.body),
      }))
      .filter((section) => section.heading || section.paragraphs.length > 0),
    testimonials: form.testimonials
      .map((item) => ({ name: item.name.trim(), quote: item.quote.trim() }))
      .filter((item) => item.name || item.quote),
  };
  if (form.isDraft) city.isDraft = true;
  if (gallery) city.gallery = gallery;
  if (galleryMore) city.galleryMore = galleryMore;
  if (previous?.sortKey !== undefined) city.sortKey = previous.sortKey;
  if (previous?.lowResImage) city.lowResImage = true;
  if (previous?.photoCredit) city.photoCredit = previous.photoCredit;
  return city;
}

type EditorLocationState = { justSaved?: "created" | "updated" };

function GalleryEditor({
  title,
  items,
  folder,
  onChange,
}: {
  title: string;
  items: GalleryFormItem[];
  folder: string;
  onChange: (items: GalleryFormItem[]) => void;
}) {
  const update = (index: number, patch: Partial<GalleryFormItem>) => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  return (
    <AdminCard
      title={title}
      action={
        <AdminButton variant="secondary" onClick={() => onChange([...items, emptyGalleryItem()])}>
          + Photo
        </AdminButton>
      }
    >
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">Aucune photo. Ajoutez-en une pour le carrousel.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={`${item.src}-${index}`} className="rounded-xl border border-gray-100 p-3">
              <ImageUpload
                value={item.src}
                onChange={(url) => update(index, { src: url })}
                folder={folder}
                label={`Photo ${index + 1}`}
              />
              <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_140px]">
                <FormField label="Légende">
                  <TextInput
                    value={item.caption}
                    onChange={(e) => update(index, { caption: e.target.value })}
                    placeholder="Légende optionnelle"
                  />
                </FormField>
                <FormField label="Affichage">
                  <select
                    value={item.fit}
                    onChange={(e) =>
                      update(index, { fit: e.target.value === "contain" ? "contain" : "cover" })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  >
                    <option value="cover">Photo (recadrée)</option>
                    <option value="contain">Slide entière</option>
                  </select>
                </FormField>
              </div>
              <AdminButton
                variant="ghost"
                className="mt-2 text-xs"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
              >
                Retirer
              </AdminButton>
            </li>
          ))}
        </ul>
      )}
    </AdminCard>
  );
}

export default function AdminCityEditorPage() {
  const { slug } = useParams<{ slug: string }>();
  const isNew = !slug;
  const existing = useCity(slug ?? "");
  const navigate = useNavigate();
  const location = useLocation();
  const justSaved = (location.state as EditorLocationState | null)?.justSaved;
  const { canWriteToFirestore, connectGoogleForFirestore } = useAuth();
  const [connectingGoogle, setConnectingGoogle] = useState(false);

  const [form, setForm] = useState<CityForm>(emptyForm());
  const [slugManual, setSlugManual] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<"created" | "updated" | null>(justSaved ?? null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (justSaved) setSaved(justSaved);
  }, [justSaved]);

  useEffect(() => {
    if (!isNew && existing) {
      setForm(cityToForm(existing));
      setSlugManual(true);
    }
  }, [isNew, existing]);

  if (!isNew && slug && !existing && !saved) {
    return (
      <>
        <AdminHeader title="Ville introuvable" />
        <main className="p-6">
          <Link to="/admin/villes" className="text-brand-blue hover:underline">
            ← Retour aux villes
          </Link>
        </main>
      </>
    );
  }

  const updateField = <K extends keyof CityForm>(key: K, value: CityForm[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "name" && !slugManual) {
        next.slug = slugify(String(value));
      }
      return next;
    });
    setSaved(null);
  };

  const handleSave = async () => {
    if (!canWriteToFirestore) {
      setError("Connectez-vous avec Google (bandeau en haut) pour enregistrer dans Firestore.");
      return;
    }

    if (!form.name.trim()) {
      setError("Le nom de la ville est obligatoire.");
      return;
    }

    const finalSlug = (form.slug || slugify(form.name)).trim();
    if (!finalSlug) {
      setError("Le slug est obligatoire.");
      return;
    }
    if (isReservedCitySlug(finalSlug)) {
      setError("Ce slug est déjà utilisé par une page du site. Choisissez-en un autre.");
      return;
    }

    const duplicate = getCityBySlug(finalSlug);
    if (duplicate && (isNew || duplicate.slug !== slug)) {
      setError("Ce slug existe déjà. Choisissez-en un autre.");
      return;
    }

    const city = formToCity({ ...form, slug: finalSlug }, isNew ? undefined : existing);
    if (!city.image) {
      setError("Ajoutez une photo de couverture (ou une photo dans la galerie bannière).");
      return;
    }

    setSaving(true);
    const result = await upsertCityAsync(city, {
      previousSlug: isNew ? undefined : slug,
    });
    setSaving(false);

    if (!result.ok) {
      setError(`Erreur Firestore : ${result.error}`);
      setSaved(null);
      return;
    }

    const kind = isNew ? "created" : "updated";
    setError("");
    setSaved(kind);

    if (isNew) {
      navigate(`/admin/villes/${finalSlug}/edit`, {
        replace: true,
        state: { justSaved: kind } satisfies EditorLocationState,
      });
    }
  };

  return (
    <>
      <AdminHeader
        title={isNew ? "Nouvelle ville" : "Modifier la ville"}
        description="Renseignez le texte, les photos et les témoignages. Enregistrez pour publier sur le site."
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        {saved === "created" && (
          <p className="rounded-lg bg-brand-teal/10 px-4 py-3 text-sm font-medium text-brand-teal">
            Ville ajoutée dans Firestore ✓ Elle est maintenant visible sur le site.
          </p>
        )}
        {saved === "updated" && (
          <p className="rounded-lg bg-brand-teal/10 px-4 py-3 text-sm font-medium text-brand-teal">
            Ville enregistrée dans Firestore ✓
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/admin/villes" className="text-sm font-medium text-brand-blue hover:underline">
            ← Retour aux villes
          </Link>
          {!isNew && form.slug && (
            <a
              href={`/${form.slug}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-brand-blue hover:underline"
            >
              Aperçu sur le site ↗
            </a>
          )}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <AdminCard title="Présentation">
              <div className="space-y-4">
                <FormField label="Nom">
                  <TextInput
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Karmiel"
                  />
                </FormField>
                <FormField label="Slug (URL)" hint={`/${form.slug || "nom-de-la-ville"}`}>
                  <TextInput
                    value={form.slug}
                    onChange={(e) => {
                      setSlugManual(true);
                      updateField("slug", slugify(e.target.value));
                    }}
                    placeholder="karmiel"
                  />
                </FormField>
                <FormField label="Accroche">
                  <TextInput
                    value={form.tagline}
                    onChange={(e) => updateField("tagline", e.target.value)}
                    placeholder="Ville d’accueil en Galilée"
                  />
                </FormField>
                <FormField label="Introduction" hint="Séparez les paragraphes par une ligne vide.">
                  <TextArea
                    value={form.intro}
                    onChange={(e) => updateField("intro", e.target.value)}
                    rows={8}
                  />
                </FormField>
              </div>
            </AdminCard>

            <AdminCard
              title="Sections"
              action={
                <AdminButton
                  variant="secondary"
                  onClick={() => updateField("sections", [...form.sections, emptySection()])}
                >
                  + Section
                </AdminButton>
              }
            >
              <div className="space-y-4">
                {form.sections.map((section, index) => (
                  <div key={index} className="rounded-xl border border-gray-100 p-3">
                    <FormField label={`Titre de section ${index + 1}`}>
                      <TextInput
                        value={section.heading}
                        onChange={(e) =>
                          updateField(
                            "sections",
                            form.sections.map((item, i) =>
                              i === index ? { ...item, heading: e.target.value } : item,
                            ),
                          )
                        }
                      />
                    </FormField>
                    <div className="mt-3">
                      <FormField label="Texte" hint="Séparez les paragraphes par une ligne vide.">
                        <TextArea
                          value={section.body}
                          onChange={(e) =>
                            updateField(
                              "sections",
                              form.sections.map((item, i) =>
                                i === index ? { ...item, body: e.target.value } : item,
                              ),
                            )
                          }
                          rows={6}
                        />
                      </FormField>
                    </div>
                    {form.sections.length > 1 && (
                      <AdminButton
                        variant="ghost"
                        className="mt-2 text-xs"
                        onClick={() =>
                          updateField(
                            "sections",
                            form.sections.filter((_, i) => i !== index),
                          )
                        }
                      >
                        Retirer la section
                      </AdminButton>
                    )}
                  </div>
                ))}
              </div>
            </AdminCard>

            <AdminCard
              title="Témoignages"
              action={
                <AdminButton
                  variant="secondary"
                  onClick={() => updateField("testimonials", [...form.testimonials, emptyTestimonial()])}
                >
                  + Témoignage
                </AdminButton>
              }
            >
              {form.testimonials.length === 0 ? (
                <p className="text-sm text-gray-500">Aucun témoignage pour cette ville.</p>
              ) : (
                <div className="space-y-4">
                  {form.testimonials.map((item, index) => (
                    <div key={index} className="rounded-xl border border-gray-100 p-3">
                      <FormField label="Nom">
                        <TextInput
                          value={item.name}
                          onChange={(e) =>
                            updateField(
                              "testimonials",
                              form.testimonials.map((row, i) =>
                                i === index ? { ...row, name: e.target.value } : row,
                              ),
                            )
                          }
                        />
                      </FormField>
                      <div className="mt-3">
                        <FormField label="Citation">
                          <TextArea
                            value={item.quote}
                            onChange={(e) =>
                              updateField(
                                "testimonials",
                                form.testimonials.map((row, i) =>
                                  i === index ? { ...row, quote: e.target.value } : row,
                                ),
                              )
                            }
                            rows={4}
                          />
                        </FormField>
                      </div>
                      <AdminButton
                        variant="ghost"
                        className="mt-2 text-xs"
                        onClick={() =>
                          updateField(
                            "testimonials",
                            form.testimonials.filter((_, i) => i !== index),
                          )
                        }
                      >
                        Retirer
                      </AdminButton>
                    </div>
                  ))}
                </div>
              )}
            </AdminCard>

            <GalleryEditor
              title="Galerie bannière"
              items={form.gallery}
              folder="cities"
              onChange={(gallery) => updateField("gallery", gallery)}
            />
            <GalleryEditor
              title="Galerie complémentaire"
              items={form.galleryMore}
              folder="cities"
              onChange={(galleryMore) => updateField("galleryMore", galleryMore)}
            />
          </div>

          <div className="space-y-6">
            <AdminCard title="Publication">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.isDraft}
                    onChange={(e) => updateField("isDraft", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                  />
                  Brouillon (masquée dans le menu)
                </label>
                <FormField label="Photo de couverture">
                  <ImageUpload
                    value={form.image}
                    onChange={(url) => updateField("image", url)}
                    folder="cities"
                    label="Photo de couverture"
                  />
                  <div className="mt-3">
                    <TextInput
                      value={form.image}
                      onChange={(e) => updateField("image", e.target.value)}
                      placeholder="/images/cities/... ou URL"
                    />
                  </div>
                </FormField>
              </div>
            </AdminCard>

            {error && (
              <div className="space-y-2">
                <p className="text-sm text-brand-coral">{error}</p>
                {!canWriteToFirestore && (
                  <AdminButton
                    variant="secondary"
                    disabled={connectingGoogle}
                    onClick={async () => {
                      setConnectingGoogle(true);
                      setError("");
                      try {
                        await connectGoogleForFirestore();
                      } finally {
                        setConnectingGoogle(false);
                      }
                    }}
                  >
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
