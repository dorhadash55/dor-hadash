import { useMemo, useState } from "react";
import AdminHeader from "../../admin/components/AdminHeader";
import { AdminButton, AdminCard, AdminPageIntro, EmptyState } from "../../admin/components/AdminUi";
import { useContactSubmissions } from "../../admin/hooks/useAdminContent";
import {
  deleteContactSubmission,
  markAllContactsRead,
  markContactRead,
  isFirebaseConfigured,
} from "../../admin/storage/contentStore";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

type Filter = "all" | "unread";

export default function AdminContactsPage() {
  const submissions = useContactSubmissions();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "unread") return submissions.filter((s) => !s.read);
    return submissions;
  }, [submissions, filter]);

  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <>
      <AdminHeader
        title="Messages de contact"
        description="Demandes reçues via le formulaire « Nous contacter ». Répondez par email ou téléphone."
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <AdminPageIntro
          description={
            isFirebaseConfigured()
              ? "Les messages sont synchronisés avec Firestore et visibles sur tous vos appareils connectés à l'admin."
              : "Mode local : les messages sont stockés dans ce navigateur jusqu'à la configuration Firebase."
          }
        />

        <AdminCard
          title={`Messages (${submissions.length})`}
          action={
            <div className="flex flex-wrap items-center gap-2">
              {unreadCount > 0 && (
                <AdminButton variant="secondary" onClick={() => markAllContactsRead()}>
                  Tout marquer lu
                </AdminButton>
              )}
              <div className="flex rounded-lg border border-gray-200 p-0.5">
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className={`rounded-md px-3 py-1 text-xs font-semibold ${
                    filter === "all" ? "bg-brand-blue text-white" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Tous
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("unread")}
                  className={`rounded-md px-3 py-1 text-xs font-semibold ${
                    filter === "unread" ? "bg-brand-blue text-white" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Non lus ({unreadCount})
                </button>
              </div>
            </div>
          }
        >
          {filtered.length === 0 ? (
            <EmptyState
              title={filter === "unread" ? "Aucun message non lu" : "Aucun message"}
              description={
                filter === "unread"
                  ? "Toutes les demandes ont été traitées."
                  : "Les demandes envoyées via le formulaire de contact apparaîtront ici."
              }
            />
          ) : (
            <ul className="space-y-4">
              {filtered.map((s) => (
                <li
                  key={s.id}
                  className={`rounded-xl border p-4 sm:p-5 ${
                    s.read ? "border-gray-100 bg-gray-50" : "border-brand-blue/20 bg-brand-blue/5"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-brand-blue-deep">
                        {s.prenom} {s.nom}
                        {!s.read && (
                          <span className="ml-2 rounded-full bg-brand-coral px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                            Nouveau
                          </span>
                        )}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">{formatDate(s.createdAt)}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {!s.read && (
                        <AdminButton variant="secondary" onClick={() => markContactRead(s.id)}>
                          Marquer lu
                        </AdminButton>
                      )}
                      <AdminButton variant="danger" onClick={() => deleteContactSubmission(s.id)}>
                        Supprimer
                      </AdminButton>
                    </div>
                  </div>

                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-medium uppercase text-gray-400">Email</dt>
                      <dd className="mt-0.5">
                        <a href={`mailto:${s.email}`} className="font-medium text-brand-blue hover:underline">
                          {s.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase text-gray-400">Téléphone</dt>
                      <dd className="mt-0.5">
                        <a href={`tel:${s.telephone.replace(/\s/g, "")}`} className="text-gray-800 hover:underline">
                          {s.telephone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase text-gray-400">Ville envisagée</dt>
                      <dd className="mt-0.5 text-gray-800">{s.ville || "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase text-gray-400">Horizon de départ</dt>
                      <dd className="mt-0.5 text-gray-800">{s.horizon || "—"}</dd>
                    </div>
                  </dl>

                  {s.message && (
                    <div className="mt-4 rounded-lg border border-gray-100 bg-white p-4 text-sm leading-relaxed text-gray-700">
                      <p className="mb-2 text-xs font-semibold uppercase text-gray-400">Message</p>
                      {s.message}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-200/80 pt-4">
                    <a
                      href={`mailto:${s.email}?subject=${encodeURIComponent(`Dor Hadash — votre demande d'Alya`)}`}
                      className="inline-flex items-center rounded-lg bg-brand-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-blue-dark sm:text-sm"
                    >
                      Répondre par email
                    </a>
                    {s.telephone && (
                      <a
                        href={`tel:${s.telephone.replace(/\s/g, "")}`}
                        className="inline-flex items-center rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 sm:text-sm"
                      >
                        Appeler
                      </a>
                    )}
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
