import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../admin/components/AdminHeader";
import ImageUpload from "../../admin/components/ImageUpload";
import { AdminButton, AdminCard, FormField, TextArea, TextInput } from "../../admin/components/AdminUi";
import { useBlogPost } from "../../admin/hooks/useAdminContent";
import { getBlogPostBySlug, upsertBlogPostAsync } from "../../admin/storage/contentStore";
import type { BlogPost } from "../../admin/storage/types";
import { slugify } from "../../admin/utils/slug";

type BlogForm = {
  title: string;
  slug: string;
  excerpt: string;
  metaDescription: string;
  author: string;
  date: string;
  coverImage: string;
  body: string;
};

const emptyForm = (): BlogForm => ({
  title: "",
  slug: "",
  excerpt: "",
  metaDescription: "",
  author: "Patricia Hassoun",
  date: new Date().toISOString().slice(0, 10),
  coverImage: "/images/blog/jerusalem-quartier.jpg",
  body: "",
});

function postToForm(post: BlogPost): BlogForm {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    metaDescription: post.metaDescription,
    author: post.author,
    date: post.date,
    coverImage: post.coverImage,
    body: post.paragraphs.join("\n\n"),
  };
}

export default function AdminBlogEditorPage() {
  const { slug } = useParams<{ slug: string }>();
  const isNew = !slug;
  const existing = useBlogPost(slug ?? "");
  const navigate = useNavigate();

  const [form, setForm] = useState<BlogForm>(emptyForm());
  const [slugManual, setSlugManual] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew && existing) {
      setForm(postToForm(existing));
      setSlugManual(true);
    }
  }, [isNew, existing]);

  if (!isNew && slug && !existing) {
    return (
      <>
        <AdminHeader title="Article introuvable" />
        <main className="p-6">
          <Link to="/admin/blog" className="text-brand-blue hover:underline">
            ← Retour au blog
          </Link>
        </main>
      </>
    );
  }

  const updateField = <K extends keyof BlogForm>(key: K, value: BlogForm[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !slugManual) {
        next.slug = slugify(String(value));
      }
      return next;
    });
    setSaved(false);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }
    const finalSlug = (form.slug || slugify(form.title)).trim();
    if (!finalSlug) {
      setError("Le slug est obligatoire.");
      return;
    }

    const duplicate = getBlogPostBySlug(finalSlug);
    if (duplicate && (isNew || duplicate.slug !== slug)) {
      setError("Ce slug existe déjà. Choisissez-en un autre.");
      return;
    }

    const paragraphs = form.body
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    if (paragraphs.length === 0) {
      setError("Le contenu de l'article est obligatoire.");
      return;
    }

    const post: BlogPost = {
      slug: finalSlug,
      title: form.title.trim(),
      excerpt: form.excerpt.trim() || paragraphs[0].slice(0, 160),
      metaDescription: form.metaDescription.trim() || form.excerpt.trim() || paragraphs[0].slice(0, 160),
      author: form.author.trim() || "Dor Hadash",
      date: form.date,
      coverImage: form.coverImage.trim() || "/images/blog/jerusalem-quartier.jpg",
      legacyUrl: `/blog/${finalSlug}/`,
      paragraphs,
    };

    setSaving(true);
    const result = await upsertBlogPostAsync(post);
    setSaving(false);

    if (!result.ok) {
      setError(`Erreur Firestore : ${result.error}`);
      setSaved(false);
      return;
    }

    setError("");
    setSaved(true);

    if (isNew) {
      navigate(`/admin/blog/${finalSlug}/edit`, { replace: true });
    }
  };

  return (
    <>
      <AdminHeader title={isNew ? "Nouvel article" : "Modifier l'article"} />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/admin/blog" className="text-sm font-medium text-brand-blue hover:underline">
            ← Retour au blog
          </Link>
          {saved && <span className="text-sm text-brand-teal">Enregistré dans Firestore ✓</span>}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <AdminCard title="Contenu">
            <div className="space-y-4">
              <FormField label="Titre">
                <TextInput
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Titre de l'article"
                />
              </FormField>

              <FormField label="Slug (URL)" hint="/blog/votre-slug">
                <TextInput
                  value={form.slug}
                  onChange={(e) => {
                    setSlugManual(true);
                    updateField("slug", slugify(e.target.value));
                  }}
                  placeholder="mon-article-de-blog"
                />
              </FormField>

              <FormField label="Contenu" hint="Séparez les paragraphes par une ligne vide. **texte** pour le gras.">
                <TextArea
                  value={form.body}
                  onChange={(e) => updateField("body", e.target.value)}
                  rows={16}
                  placeholder="Premier paragraphe...

Deuxième paragraphe..."
                />
              </FormField>
            </div>
          </AdminCard>

          <div className="space-y-6">
            <AdminCard title="Publication">
              <div className="space-y-4">
                <FormField label="Auteur">
                  <TextInput
                    value={form.author}
                    onChange={(e) => updateField("author", e.target.value)}
                  />
                </FormField>
                <FormField label="Date">
                  <TextInput
                    type="date"
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                  />
                </FormField>
                <FormField label="Image de couverture">
                  <ImageUpload
                    value={form.coverImage}
                    onChange={(url) => updateField("coverImage", url)}
                    folder="blog"
                    label="Photo de couverture"
                  />
                  <div className="mt-3">
                    <TextInput
                      value={form.coverImage}
                      onChange={(e) => updateField("coverImage", e.target.value)}
                      placeholder="/images/blog/... ou URL Firebase Storage"
                    />
                  </div>
                </FormField>
              </div>
            </AdminCard>

            <AdminCard title="SEO">
              <div className="space-y-4">
                <FormField label="Extrait (liste blog)">
                  <TextArea
                    value={form.excerpt}
                    onChange={(e) => updateField("excerpt", e.target.value)}
                    rows={3}
                  />
                </FormField>
                <FormField label="Meta description">
                  <TextArea
                    value={form.metaDescription}
                    onChange={(e) => updateField("metaDescription", e.target.value)}
                    rows={3}
                  />
                </FormField>
              </div>
            </AdminCard>

            {error && <p className="text-sm text-brand-coral">{error}</p>}

            <AdminButton className="w-full" onClick={handleSave} disabled={saving}>
              {saving ? "Enregistrement…" : "Enregistrer dans Firestore"}
            </AdminButton>
          </div>
        </div>
      </main>
    </>
  );
}
