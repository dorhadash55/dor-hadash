import { useEffect, useMemo, useState } from "react";
import AdminHeader from "../../admin/components/AdminHeader";
import { AdminButton, EmptyState } from "../../admin/components/AdminUi";
import { useAuth } from "../../admin/auth/AuthContext";
import { useContactSubmissions } from "../../admin/hooks/useAdminContent";
import {
  deleteContactSubmission,
  markAllContactsRead,
  markContactRead,
} from "../../admin/storage/contentStore";
import type { ContactSubmission } from "../../admin/storage/types";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatShortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });

type Filter = "all" | "unread";

export default function AdminContactsPage() {
  const submissions = useContactSubmissions();
  const { canWriteToFirestore } = useAuth();
  const [filter, setFilter] = useState<Filter>("unread");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const unreadCount = useMemo(
    () => submissions.filter((s) => !s.read).length,
    [submissions],
  );

  const filtered = useMemo(() => {
    if (filter === "unread") return submissions.filter((s) => !s.read);
    return submissions;
  }, [submissions, filter]);

  // Si le filtre "non lus" se vide, revenir à tous
  useEffect(() => {
    if (filter === "unread" && unreadCount === 0 && submissions.length > 0) {
      setFilter("all");
    }
  }, [filter, unreadCount, submissions.length]);

  // Garder une sélection valide
  useEffect(() => {
    if (filtered.length === 0) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !filtered.some((s) => s.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const selected: ContactSubmission | null =
    filtered.find((s) => s.id === selectedId) ?? null;

  const openMessage = (id: string) => {
    setSelectedId(id);
    const msg = submissions.find((s) => s.id === id);
    if (msg && !msg.read) {
      markContactRead(id, true);
    }
  };

  return (
    <>
      <AdminHeader
        title="Messages"
        description="Demandes reçues via le formulaire de contact."
      />
      <main className="flex flex-1 flex-col p-4 sm:p-6">
        {!canWriteToFirestore && (
          <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Mode lecture seule : connectez-vous avec Google pour que le statut « lu » soit
            enregistré dans Firebase (sinon le badge peut revenir).
          </p>
        )}

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:min-h-[min(70vh,720px)] lg:flex-row">
          {/* Liste */}
          <div className="flex w-full flex-col border-b border-gray-100 lg:w-[22rem] lg:shrink-0 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-3">
              <div className="flex flex-1 rounded-lg bg-gray-100 p-0.5">
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className={`flex-1 rounded-md px-2.5 py-1.5 text-xs font-semibold transition ${
                    filter === "all" ? "bg-white text-brand-blue-deep shadow-sm" : "text-gray-600"
                  }`}
                >
                  Tous ({submissions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("unread")}
                  className={`flex-1 rounded-md px-2.5 py-1.5 text-xs font-semibold transition ${
                    filter === "unread" ? "bg-white text-brand-blue-deep shadow-sm" : "text-gray-600"
                  }`}
                >
                  Non lus ({unreadCount})
                </button>
              </div>
              {unreadCount > 0 && (
                <AdminButton variant="secondary" onClick={() => markAllContactsRead()}>
                  Tout lu
                </AdminButton>
              )}
            </div>

            <ul className="max-h-[40vh] flex-1 overflow-y-auto lg:max-h-none">
              {filtered.length === 0 ? (
                <li className="p-6">
                  <EmptyState
                    title={filter === "unread" ? "Boîte à jour" : "Aucun message"}
                    description={
                      filter === "unread"
                        ? "Tous les messages ont été lus."
                        : "Les demandes du formulaire apparaîtront ici."
                    }
                  />
                </li>
              ) : (
                filtered.map((s) => {
                  const active = s.id === selectedId;
                  return (
                    <li key={s.id} className="border-b border-gray-50 last:border-0">
                      <button
                        type="button"
                        onClick={() => openMessage(s.id)}
                        className={`flex w-full gap-3 px-3 py-3 text-left transition ${
                          active ? "bg-brand-blue/8" : "hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                            s.read ? "bg-transparent" : "bg-brand-coral"
                          }`}
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-2">
                            <span
                              className={`truncate text-sm ${
                                s.read
                                  ? "font-medium text-gray-700"
                                  : "font-semibold text-brand-blue-deep"
                              }`}
                            >
                              {s.prenom} {s.nom}
                            </span>
                            <span className="shrink-0 text-[11px] text-gray-400">
                              {formatShortDate(s.createdAt)}
                            </span>
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-gray-500">
                            {s.message || s.email}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>

          {/* Détail */}
          <div className="flex min-h-0 flex-1 flex-col bg-[#fafafa]">
            {!selected ? (
              <div className="flex flex-1 items-center justify-center p-8">
                <p className="text-sm text-gray-500">Sélectionnez un message pour le lire.</p>
              </div>
            ) : (
              <>
                <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-heading text-xl font-semibold text-brand-blue-deep">
                        {selected.prenom} {selected.nom}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">{formatDate(selected.createdAt)}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selected.read ? (
                        <AdminButton
                          variant="secondary"
                          onClick={() => markContactRead(selected.id, false)}
                        >
                          Marquer non lu
                        </AdminButton>
                      ) : (
                        <AdminButton
                          variant="secondary"
                          onClick={() => markContactRead(selected.id, true)}
                        >
                          Marquer lu
                        </AdminButton>
                      )}
                      <AdminButton
                        variant="danger"
                        onClick={() => {
                          if (!confirm("Supprimer ce message ?")) return;
                          deleteContactSubmission(selected.id);
                        }}
                      >
                        Supprimer
                      </AdminButton>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-white p-4 ring-1 ring-gray-100">
                      <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                        Email
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={`mailto:${selected.email}`}
                          className="text-sm font-medium text-brand-blue hover:underline"
                        >
                          {selected.email}
                        </a>
                      </dd>
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-gray-100">
                      <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                        Téléphone
                      </dt>
                      <dd className="mt-1">
                        {selected.telephone ? (
                          <a
                            href={`tel:${selected.telephone.replace(/\s/g, "")}`}
                            className="text-sm text-gray-800 hover:underline"
                          >
                            {selected.telephone}
                          </a>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </dd>
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-gray-100">
                      <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                        Ville envisagée
                      </dt>
                      <dd className="mt-1 text-sm text-gray-800">{selected.ville || "—"}</dd>
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-gray-100">
                      <dt className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                        Horizon
                      </dt>
                      <dd className="mt-1 text-sm text-gray-800">{selected.horizon || "—"}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 rounded-xl bg-white p-5 ring-1 ring-gray-100">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                      Message
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
                      {selected.message || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <a
                    href={`mailto:${selected.email}?subject=${encodeURIComponent("Dor Hadash — votre demande d'Alya")}`}
                    className="inline-flex items-center rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-dark"
                  >
                    Répondre par email
                  </a>
                  {selected.telephone && (
                    <a
                      href={`tel:${selected.telephone.replace(/\s/g, "")}`}
                      className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Appeler
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
