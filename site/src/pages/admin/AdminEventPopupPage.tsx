import { useEffect, useState } from "react";
import AdminHeader from "../../admin/components/AdminHeader";
import ImageUpload from "../../admin/components/ImageUpload";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  FormField,
  TextArea,
  TextInput,
} from "../../admin/components/AdminUi";
import { useAuth } from "../../admin/auth/AuthContext";
import { useEventPopup } from "../../admin/hooks/useAdminContent";
import { saveEventPopup } from "../../admin/storage/contentStore";
import type { EventPopupSettings } from "../../admin/storage/types";

type EventForm = {
  title: string;
  content: string;
  image: string;
  startAt: string;
  endAt: string;
  enabled: boolean;
};

function toLocalDateTime(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

function defaultForm(): EventForm {
  const start = new Date();
  const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
  return {
    title: "",
    content: "",
    image: "",
    startAt: toLocalDateTime(start.toISOString()),
    endAt: toLocalDateTime(end.toISOString()),
    enabled: true,
  };
}

function eventToForm(event: EventPopupSettings): EventForm {
  return {
    title: event.title,
    content: event.content,
    image: event.image ?? "",
    startAt: toLocalDateTime(event.startAt),
    endAt: toLocalDateTime(event.endAt),
    enabled: event.enabled,
  };
}

function eventIdFromForm(form: EventForm) {
  const source = [form.title, form.content, form.image, form.startAt, form.endAt].join("|");
  let hash = 0;
  for (let index = 0; index < source.length; index++) {
    hash = (hash * 31 + source.charCodeAt(index)) | 0;
  }
  return `event-${Math.abs(hash).toString(36)}`;
}

function eventStatus(event: EventPopupSettings | null) {
  if (!event) return { label: "Non configuré", tone: "neutral" as const };
  if (!event.enabled) return { label: "Désactivé", tone: "warning" as const };
  const now = Date.now();
  if (now < new Date(event.startAt).getTime()) return { label: "Planifié", tone: "neutral" as const };
  if (now > new Date(event.endAt).getTime()) return { label: "Terminé", tone: "warning" as const };
  return { label: "Actif sur le site", tone: "success" as const };
}

export default function AdminEventPopupPage() {
  const current = useEventPopup();
  const { canWriteToFirestore, connectGoogleForFirestore } = useAuth();
  const [form, setForm] = useState<EventForm>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [connectingGoogle, setConnectingGoogle] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (current) setForm(eventToForm(current));
  }, [current]);

  const update = <K extends keyof EventForm>(key: K, value: EventForm[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setMessage("");
    setError("");
  };

  const handleSave = async () => {
    if (!canWriteToFirestore) {
      setError("Connectez-vous avec Google pour enregistrer dans Firestore.");
      return;
    }
    if (!form.title.trim() || !form.content.trim() || !form.startAt || !form.endAt) {
      setError("Le titre, le contenu et les deux dates sont obligatoires.");
      return;
    }
    const startAt = new Date(form.startAt);
    const endAt = new Date(form.endAt);
    if (Number.isNaN(startAt.getTime()) || Number.isNaN(endAt.getTime()) || endAt <= startAt) {
      setError("La date de fin doit être postérieure à la date de début.");
      return;
    }

    const popup: EventPopupSettings = {
      id: eventIdFromForm(form),
      title: form.title.trim(),
      content: form.content.trim(),
      image: form.image.trim(),
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      enabled: form.enabled,
    };
    setSaving(true);
    const result = await saveEventPopup(popup);
    setSaving(false);
    if (!result.ok) {
      setError(`Erreur Firestore : ${result.error}`);
      return;
    }
    setMessage("Popup enregistré dans Firestore ✓");
  };

  const handleDelete = async () => {
    if (!confirm("Supprimer entièrement ce popup événementiel ?")) return;
    setSaving(true);
    const result = await saveEventPopup(null);
    setSaving(false);
    if (!result.ok) {
      setError(`Erreur Firestore : ${result.error}`);
      return;
    }
    setForm(defaultForm());
    setMessage("Popup supprimé ✓");
  };

  const status = eventStatus(current);

  return (
    <>
      <AdminHeader
        title="Popup événement"
        description="Planifiez l’annonce qui s’ouvre une fois pour chaque visiteur et reste accessible sur le côté gauche du site."
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <AdminBadge tone={status.tone}>{status.label}</AdminBadge>
          {current && <span className="text-xs text-gray-500">Identifiant : {current.id}</span>}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <AdminCard title="Contenu de l’événement">
              <div className="space-y-4">
                <FormField label="Titre">
                  <TextInput
                    value={form.title}
                    onChange={(event) => update("title", event.target.value)}
                    placeholder="Journée portes ouvertes"
                  />
                </FormField>
                <FormField label="Contenu" hint="Les retours à la ligne seront conservés.">
                  <TextArea
                    rows={8}
                    value={form.content}
                    onChange={(event) => update("content", event.target.value)}
                    placeholder="Présentez l’événement, le lieu et les informations utiles…"
                  />
                </FormField>
              </div>
            </AdminCard>

            <AdminCard title="Période d’affichage">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Date et heure de début">
                  <TextInput
                    type="datetime-local"
                    value={form.startAt}
                    onChange={(event) => update("startAt", event.target.value)}
                  />
                </FormField>
                <FormField label="Date et heure de fin">
                  <TextInput
                    type="datetime-local"
                    value={form.endAt}
                    onChange={(event) => update("endAt", event.target.value)}
                  />
                </FormField>
              </div>
            </AdminCard>
          </div>

          <div className="space-y-6">
            <AdminCard title="Image et publication">
              <div className="space-y-4">
                <FormField label="Photo (optionnelle)">
                  <ImageUpload
                    value={form.image}
                    onChange={(url) => update("image", url)}
                    folder="events"
                    label="Photo"
                  />
                  {form.image && (
                    <AdminButton
                      type="button"
                      variant="danger"
                      className="mt-3"
                      onClick={() => update("image", "")}
                    >
                      Enlever la photo
                    </AdminButton>
                  )}
                </FormField>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.enabled}
                    onChange={(event) => update("enabled", event.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                  />
                  Popup activé
                </label>
              </div>
            </AdminCard>

            {message && <p className="rounded-lg bg-brand-teal/10 px-4 py-3 text-sm text-brand-teal">{message}</p>}
            {error && (
              <div className="space-y-2">
                <p className="text-sm text-brand-coral">{error}</p>
                {!canWriteToFirestore && (
                  <AdminButton
                    variant="secondary"
                    disabled={connectingGoogle}
                    onClick={async () => {
                      setConnectingGoogle(true);
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

            <AdminButton className="w-full" disabled={saving || !canWriteToFirestore} onClick={() => void handleSave()}>
              {saving ? "Enregistrement…" : "Enregistrer le popup"}
            </AdminButton>
            {current && (
              <AdminButton variant="danger" className="w-full" disabled={saving || !canWriteToFirestore} onClick={() => void handleDelete()}>
                Supprimer le popup
              </AdminButton>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
