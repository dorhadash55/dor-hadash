import { Link } from "react-router-dom";
import AdminHeader from "../../admin/components/AdminHeader";
import { AdminBadge, AdminButton, AdminCard, AdminLinkButton, EmptyState } from "../../admin/components/AdminUi";
import { useAuth } from "../../admin/auth/AuthContext";
import { useCities } from "../../admin/hooks/useAdminContent";
import { deleteCityAsync } from "../../admin/storage/contentStore";
import { useState } from "react";
import SmartImage from "../../components/SmartImage";

export default function AdminCitiesPage() {
  const cities = useCities();
  const { canWriteToFirestore } = useAuth();
  const [error, setError] = useState("");

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Supprimer la ville « ${name} » ? Elle disparaîtra du site.`)) return;
    const result = await deleteCityAsync(slug);
    if (!result.ok) setError(result.error);
    else setError("");
  };

  return (
    <>
      <AdminHeader
        title="Villes"
        description="Ajoutez, modifiez ou retirez une ville d’accueil. Les changements sont enregistrés dans Firebase et visibles sur le site."
      />
      <main className="flex-1 space-y-6 p-4 sm:p-6">
        {error && <p className="rounded-lg bg-brand-coral/10 px-4 py-3 text-sm text-brand-coral">{error}</p>}
        <AdminCard
          title={`Villes (${cities.length})`}
          action={<AdminLinkButton to="/admin/villes/new">+ Nouvelle ville</AdminLinkButton>}
        >
          {cities.length === 0 ? (
            <EmptyState
              title="Aucune ville"
              description="Créez une première ville pour l’afficher sur le site."
              action={<AdminLinkButton to="/admin/villes/new">Créer une ville</AdminLinkButton>}
            />
          ) : (
            <ul className="space-y-3">
              {cities.map((city) => (
                <li
                  key={city.slug}
                  className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-4 sm:flex-row sm:items-center"
                >
                  <SmartImage
                    src={city.image || city.gallery?.[0]?.src || ""}
                    alt=""
                    loading="lazy"
                    className="h-20 w-full shrink-0 rounded-lg object-cover sm:h-16 sm:w-24"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-heading font-semibold text-brand-blue-deep">{city.name}</p>
                      {city.isDraft && <AdminBadge tone="warning">Brouillon</AdminBadge>}
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">/{city.slug}</p>
                    {city.tagline && (
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">{city.tagline}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch">
                    <a
                      href={`/${city.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-center text-xs font-semibold text-gray-700 hover:bg-white sm:text-sm"
                    >
                      Voir ↗
                    </a>
                    <Link
                      to={`/admin/villes/${city.slug}/edit`}
                      className="rounded-lg bg-brand-blue px-3 py-1.5 text-center text-xs font-semibold text-white hover:bg-brand-blue-dark sm:text-sm"
                    >
                      Modifier
                    </Link>
                    <AdminButton
                      variant="danger"
                      className="text-xs sm:text-sm"
                      disabled={!canWriteToFirestore}
                      onClick={() => void handleDelete(city.slug, city.name)}
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
