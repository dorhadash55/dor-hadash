import { useState } from "react";
import AdminHeader from "../../admin/components/AdminHeader";
import { AdminButton, AdminCard, EmptyState } from "../../admin/components/AdminUi";
import { useAuth } from "../../admin/auth/AuthContext";
import { useNewsletterSubscribers } from "../../admin/hooks/useAdminContent";
import { deleteNewsletterSubscriber } from "../../admin/storage/contentStore";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function AdminNewsletterPage() {
  const subscribers = useNewsletterSubscribers();
  const { canWriteToFirestore } = useAuth();
  const [copied, setCopied] = useState(false);

  const copyEmails = async () => {
    const emails = subscribers.map((item) => item.email).join(", ");
    try {
      await navigator.clipboard.writeText(emails);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <AdminHeader
        title="Newsletter"
        description="Les personnes qui s’inscrivent depuis le site. Vous recevez aussi un email à chaque inscription."
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <AdminCard
          title={`Inscrits (${subscribers.length})`}
          action={
            subscribers.length > 0 ? (
              <AdminButton variant="secondary" onClick={() => void copyEmails()}>
                {copied ? "Emails copiés ✓" : "Copier les emails"}
              </AdminButton>
            ) : undefined
          }
        >
          {subscribers.length === 0 ? (
            <EmptyState
              title="Aucun inscrit"
              description="Dès qu’un visiteur clique sur Envoyer dans la popup Newsletter, son email et son téléphone apparaissent ici."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-500">
                    <th className="pb-2 pr-4 font-semibold">Email</th>
                    <th className="pb-2 pr-4 font-semibold">Téléphone</th>
                    <th className="pb-2 pr-4 font-semibold">Date</th>
                    <th className="pb-2 font-semibold" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {subscribers.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 pr-4 font-medium text-brand-blue-deep">
                        <a href={`mailto:${item.email}`} className="hover:underline">
                          {item.email}
                        </a>
                      </td>
                      <td className="py-3 pr-4 text-gray-700">
                        {item.telephone ? (
                          <a href={`tel:${item.telephone.replace(/[^\d+]/g, "")}`} className="hover:underline">
                            {item.telephone}
                          </a>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-xs text-gray-500">{formatDate(item.createdAt)}</td>
                      <td className="py-3 text-right">
                        <AdminButton
                          variant="danger"
                          className="text-xs"
                          disabled={!canWriteToFirestore}
                          onClick={() => {
                            if (!confirm(`Retirer ${item.email} de la newsletter ?`)) return;
                            deleteNewsletterSubscriber(item.id);
                          }}
                        >
                          Supprimer
                        </AdminButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminCard>
      </main>
    </>
  );
}
