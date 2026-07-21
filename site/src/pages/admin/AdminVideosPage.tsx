import { useState } from "react";
import AdminHeader from "../../admin/components/AdminHeader";
import { AdminButton, AdminCard, EmptyState, FormField, TextArea, TextInput } from "../../admin/components/AdminUi";
import { useVideos } from "../../admin/hooks/useAdminContent";
import { saveVideosAsync } from "../../admin/storage/contentStore";
import type { VideoTestimonial } from "../../admin/storage/types";
import { extractYoutubeId, youtubeEmbedUrl, youtubeThumbnailUrl } from "../../admin/utils/youtube";

type VideoForm = {
  title: string;
  youtubeUrl: string;
  caption: string;
};

const emptyForm = (): VideoForm => ({ title: "", youtubeUrl: "", caption: "" });

export default function AdminVideosPage() {
  const videos = useVideos();
  const [form, setForm] = useState<VideoForm>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const youtubeId = extractYoutubeId(form.youtubeUrl);

  const resetForm = () => {
    setForm(emptyForm());
    setEditingId(null);
    setError("");
    setSaved(false);
  };

  const persistVideos = async (next: VideoTestimonial[]) => {
    setSaving(true);
    setError("");
    setSaved(false);

    const result = await saveVideosAsync(next);
    setSaving(false);

    if (!result.ok) {
      setError(`Erreur Firestore : ${result.error}`);
      return false;
    }

    setSaved(true);
    return true;
  };

  const handleSubmit = async () => {
    const id = extractYoutubeId(form.youtubeUrl);
    if (!form.title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }
    if (!id) {
      setError("URL ou identifiant YouTube invalide.");
      return;
    }

    const entry: VideoTestimonial = {
      id: editingId ?? crypto.randomUUID(),
      youtubeId: id,
      title: form.title.trim(),
      caption: form.caption.trim(),
    };

    const next = editingId
      ? videos.map((v) => (v.id === editingId ? entry : v))
      : [entry, ...videos];

    const ok = await persistVideos(next);
    if (ok) resetForm();
  };

  const startEdit = (video: VideoTestimonial) => {
    setEditingId(video.id);
    setForm({
      title: video.title,
      youtubeUrl: video.youtubeId,
      caption: video.caption,
    });
    setError("");
    setSaved(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce témoignage vidéo ?")) return;
    await persistVideos(videos.filter((v) => v.id !== id));
    if (editingId === id) resetForm();
  };

  const moveVideo = async (index: number, direction: -1 | 1) => {
    const next = [...videos];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    await persistVideos(next);
  };

  return (
    <>
      <AdminHeader title="Témoignages" />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        {saved && (
          <p className="rounded-lg bg-brand-teal/10 px-4 py-3 text-sm text-brand-teal">
            Vidéo enregistrée dans Firestore ✓
          </p>
        )}

        <div className="grid gap-6 xl:grid-cols-2">
          <AdminCard title={editingId ? "Modifier la vidéo" : "Ajouter une vidéo YouTube"}>
            <div className="space-y-4">
              <FormField label="Titre" hint="Affiché au-dessus du texte descriptif">
                <TextInput
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex : Mon Alya à Karmiel"
                />
              </FormField>

              <FormField
                label="URL YouTube"
                hint="Collez un lien youtube.com, youtu.be ou l'identifiant à 11 caractères"
              >
                <TextInput
                  value={form.youtubeUrl}
                  onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </FormField>

              <FormField label="Texte descriptif" hint="Affiché sous la vidéo sur le site">
                <TextArea
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  placeholder="Témoignage de la famille Cohen sur leur installation à..."
                  rows={4}
                />
              </FormField>

              {error && <p className="text-sm text-brand-coral">{error}</p>}

              <div className="flex flex-wrap gap-2">
                <AdminButton onClick={handleSubmit} disabled={saving}>
                  {saving
                    ? "Enregistrement…"
                    : editingId
                      ? "Enregistrer dans Firestore"
                      : "Ajouter dans Firestore"}
                </AdminButton>
                {editingId && (
                  <AdminButton variant="secondary" onClick={resetForm} disabled={saving}>
                    Annuler
                  </AdminButton>
                )}
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Aperçu">
            {youtubeId ? (
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="aspect-video bg-black">
                  <iframe
                    className="h-full w-full"
                    src={youtubeEmbedUrl(youtubeId)}
                    title={form.title || "Aperçu"}
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-brand-blue-deep">
                    {form.title || "Titre de la vidéo"}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {form.caption || "Le texte descriptif apparaîtra ici."}
                  </p>
                </div>
              </div>
            ) : (
              <EmptyState
                title="Aperçu indisponible"
                description="Saisissez une URL YouTube valide pour voir l'aperçu."
              />
            )}
          </AdminCard>
        </div>

        <AdminCard
          title={`Vidéos publiées (${videos.length})`}
          action={
            videos.length > 0 && (
              <span className="text-xs text-gray-500">Utilisez ↑ ↓ pour réordonner</span>
            )
          }
        >
          {videos.length === 0 ? (
            <EmptyState
              title="Aucune vidéo"
              description="Ajoutez votre premier témoignage YouTube avec le formulaire ci-dessus."
            />
          ) : (
            <ul className="divide-y divide-gray-100">
              {videos.map((video, index) => (
                <li key={video.id} className="flex flex-wrap gap-4 py-4 first:pt-0 last:pb-0">
                  <img
                    src={youtubeThumbnailUrl(video.youtubeId)}
                    alt=""
                    className="h-20 w-36 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading font-semibold text-brand-blue-deep">{video.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">{video.caption}</p>
                    <p className="mt-1 text-xs text-gray-400">ID : {video.youtubeId}</p>
                  </div>
                  <div className="flex flex-wrap items-start gap-2">
                    <AdminButton
                      variant="ghost"
                      onClick={() => moveVideo(index, -1)}
                      disabled={index === 0 || saving}
                    >
                      ↑
                    </AdminButton>
                    <AdminButton
                      variant="ghost"
                      onClick={() => moveVideo(index, 1)}
                      disabled={index === videos.length - 1 || saving}
                    >
                      ↓
                    </AdminButton>
                    <AdminButton variant="secondary" onClick={() => startEdit(video)} disabled={saving}>
                      Modifier
                    </AdminButton>
                    <AdminButton variant="danger" onClick={() => handleDelete(video.id)} disabled={saving}>
                      Supprimer
                    </AdminButton>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>
      </main>
    </>
  );
}
