import { services } from "../content/homepage";
import ServiceIcon from "./ServiceIcon";

const accents = [
  { iconBg: "bg-brand-blue/10", iconText: "text-brand-blue" },
  { iconBg: "bg-brand-teal/15", iconText: "text-brand-teal" },
  { iconBg: "bg-brand-coral/10", iconText: "text-brand-coral" },
];

function ServiceRow({
  title,
  description,
  icon,
  isNew,
  accent,
}: {
  title: string;
  description: string;
  icon: (typeof services)[number]["icon"];
  isNew?: boolean;
  accent: (typeof accents)[number];
}) {
  return (
    <div className="flex items-start gap-3 px-3 py-4 sm:px-4">
      <div
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accent.iconBg} ${accent.iconText}`}
      >
        <ServiceIcon icon={icon} className="h-[1.125rem] w-[1.125rem]" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-heading text-[0.9375rem] font-semibold leading-snug text-brand-blue-deep [overflow-wrap:anywhere]">
          {title}
        </h3>
        {isNew && (
          <span className="mt-1 inline-block rounded-full bg-brand-teal/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-brand-teal">
            Nouveau
          </span>
        )}
        <p className="mt-1.5 text-[0.8125rem] leading-[1.55] text-gray-600 [overflow-wrap:anywhere]">
          {description}
        </p>
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  description,
  icon,
  isNew,
  accent,
}: {
  title: string;
  description: string;
  icon: (typeof services)[number]["icon"];
  isNew?: boolean;
  accent: (typeof accents)[number];
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent.iconBg} ${accent.iconText}`}
      >
        <ServiceIcon icon={icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 flex flex-wrap items-baseline gap-x-2 font-heading text-lg font-semibold text-brand-blue-deep">
        {title}
        {isNew && (
          <span className="rounded-full bg-brand-teal/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-teal">
            Nouveau
          </span>
        )}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-teal">
            Notre accompagnement
          </span>
          <h2 className="mt-3 font-heading text-2xl font-semibold text-brand-blue-deep sm:text-3xl lg:text-4xl">
            Nos 6 réponses pour une Alya réussie
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            Un accompagnement complet, de la préparation à l'intégration.
          </p>
        </div>

        {/* Mobile : liste compacte dans un seul bloc */}
        <div className="mt-8 divide-y divide-gray-100 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 sm:hidden">
          {services.map((s, i) => {
            const accent = accents[i % accents.length];
            return (
              <ServiceRow
                key={s.title}
                title={s.title}
                description={s.description}
                icon={s.icon}
                isNew={s.isNew}
                accent={accent}
              />
            );
          })}
        </div>

        {/* Desktop : grille de cartes */}
        <div className="mt-12 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const accent = accents[i % accents.length];
            return (
              <ServiceCard
                key={s.title}
                title={s.title}
                description={s.description}
                icon={s.icon}
                isNew={s.isNew}
                accent={accent}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
