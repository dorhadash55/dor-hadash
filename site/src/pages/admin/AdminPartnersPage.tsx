import { useState } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../../admin/components/AdminHeader";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminLinkButton,
  EmptyState,
} from "../../admin/components/AdminUi";
import { useAuth } from "../../admin/auth/AuthContext";
import { usePartners } from "../../admin/hooks/useAdminContent";
import { deletePartnerAsync } from "../../admin/storage/contentStore";
import { partnerCategoryLabels } from "../../content/partners";
import SmartImage from "../../components/SmartImage";

export default function AdminPartnersPage() {
  const partners = usePartners();
  const { canWriteToFirestore } = useAuth();
  const [error, setError] = useState("");

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Supprimer le partenaire « ${name} » ? Il disparaîtra du site.`)) return;
    const result = await deletePartnerAsync(slug);
    if (!result.ok) setError(result.error);
    else setError("");
  };

  return (
    <>
      <AdminHeader
        title="Partenaires"
        description="Ajoutez, modifiez ou retirez un partenaire. Les changements sont enregistrés dans Firebase et visibles sur le site."
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        {error && <p className="rounded-lg bg-brand-coral/10 px-4 py-3 text-sm text-brand-coral">{error}</p>}
        <AdminCard
          title={`Partenaires (${partners.length})`}
          action={<AdminLinkButton to="/admin/partenaires/new">+ Nouveau partenaire</AdminLinkButton>}
        >
          {partners.length === 0 ? (
            <EmptyState
              title="Aucun partenaire"
              description="Créez un premier partenaire pour l’afficher sur le site."
              action={<AdminLinkButton to="/admin/partenaires/new">Créer un partenaire</AdminLinkButton>}
            />
          ) : (
            <ul className="space-y-3">
              {partners.map((partner) => (
                <li
                  key={partner.slug}
                  className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-4 sm:flex-row sm:items-center"
                >
                  {partner.logo ? (
                    <SmartImage
                      src={partner.logo}
                      alt=""
                      loading="lazy"
                      className="h-16 w-20 shrink-0 rounded-lg bg-white object-contain p-1"
                    />
                  ) : (
                    <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-semibold text-brand-blue">
                      {partner.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-heading font-semibold text-brand-blue-deep">{partner.name}</p>
                      <AdminBadge>{partnerCategoryLabels[partner.category]}</AdminBadge>
                      {partner.showOnHome && <AdminBadge tone="success">Accueil</AdminBadge>}
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">#{partner.slug}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">{partner.tagline}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch">
                    <a
                      href={`/partenaires#${partner.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-center text-xs font-semibold text-gray-700 hover:bg-white sm:text-sm"
                    >
                      Voir ↗
                    </a>
                    <Link
                      to={`/admin/partenaires/${partner.slug}/edit`}
                      className="rounded-lg bg-brand-blue px-3 py-1.5 text-center text-xs font-semibold text-white hover:bg-brand-blue-dark sm:text-sm"
                    >
                      Modifier
                    </Link>
                    <AdminButton
                      variant="danger"
                      className="text-xs sm:text-sm"
                      disabled={!canWriteToFirestore}
                      onClick={() => void handleDelete(partner.slug, partner.name)}
                    >
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
