import AdminHeader from "../../admin/components/AdminHeader";
import { AdminButton, AdminCard, EmptyState } from "../../admin/components/AdminUi";
import { useContactSubmissions } from "../../admin/hooks/useAdminContent";
import {
  deleteContactSubmission,
  markContactRead,
} from "../../admin/storage/contentStore";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function AdminContactsPage() {
  const submissions = useContactSubmissions();

  return (
    <>
      <AdminHeader title="Messages de contact" />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <AdminCard title={`Messages reçus (${submissions.length})`}>
          {submissions.length === 0 ? (
            <EmptyState
              title="Aucun message"
              description="Les demandes envoyées via le formulaire de contact apparaîtront ici. En attendant Firebase, elles sont stockées localement dans le navigateur."
            />
          ) : (
            <ul className="space-y-4">
              {submissions.map((s) => (
                <li
                  key={s.id}
                  className={`rounded-xl border p-4 ${s.read ? "border-gray-100 bg-gray-50" : "border-brand-blue/20 bg-brand-blue/5"}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-brand-blue-deep">
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

                  <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-gray-500">Email</dt>
                      <dd>
                        <a href={`mailto:${s.email}`} className="text-brand-blue hover:underline">
                          {s.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Téléphone</dt>
                      <dd>{s.telephone}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Ville envisagée</dt>
                      <dd>{s.ville}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Horizon de départ</dt>
                      <dd>{s.horizon}</dd>
                    </div>
                  </dl>

                  {s.message && (
                    <div className="mt-4 rounded-lg bg-white p-3 text-sm text-gray-700">
                      <p className="mb-1 text-xs font-medium uppercase text-gray-400">Message</p>
                      {s.message}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </AdminCard>
      </main>
    </>
  );
}
