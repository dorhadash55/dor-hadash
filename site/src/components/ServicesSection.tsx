import { Link } from "react-router-dom";
import { services } from "../content/homepage";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ServiceIcon from "./ServiceIcon";

const accents = [
  { iconBg: "bg-brand-blue/10", iconText: "text-brand-blue", border: "border-brand-blue/15" },
  { iconBg: "bg-brand-teal/15", iconText: "text-brand-teal", border: "border-brand-teal/20" },
  { iconBg: "bg-brand-coral/10", iconText: "text-brand-coral", border: "border-brand-coral/15" },
];

export default function ServicesSection() {
  return (
    <section className="section-shell bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            align="center"
            label="Notre accompagnement"
            title="Nos 6 réponses pour une Alya réussie"
            description="Un accompagnement complet, de la préparation à l'intégration."
          />
        </Reveal>

        {/* Mobile */}
        <Reveal delay={100}>
          <div className="mt-10 divide-y divide-brand-sand rounded-2xl border border-brand-sand bg-brand-cream sm:hidden">
            {services.map((s, i) => {
              const accent = accents[i % accents.length];
              return (
                <div key={s.title} className="flex items-start gap-3 px-4 py-4">
                  <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${accent.border} ${accent.iconBg} ${accent.iconText}`}
                  >
                    <ServiceIcon icon={s.icon} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-[0.9375rem] font-semibold text-brand-blue-deep [overflow-wrap:anywhere]">
                      {s.title}
                      {s.isNew && (
                        <span className="ml-1.5 inline-block rounded-full bg-brand-teal/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-brand-teal">
                          Nouveau
                        </span>
                      )}
                    </h3>
                    <p className="mt-1.5 text-[0.8125rem] leading-[1.55] text-gray-600 [overflow-wrap:anywhere]">
                      {s.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Desktop */}
        <div className="mt-14 hidden space-y-5 sm:block">
          <Reveal delay={80}>
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="/images/hero-accompagnement.jpg"
                alt=""
                className="aspect-[21/8] w-full object-cover lg:aspect-[21/7]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-deep/92 via-brand-blue-deep/55 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-8 py-10 lg:px-12">
                <p className="font-accent text-xs uppercase tracking-[0.22em] text-brand-teal">Dor Hadash</p>
                <p className="mt-2 max-w-lg font-heading text-2xl font-semibold leading-snug text-white lg:text-3xl">
                  Un parcours pensé pour vous — pas un catalogue de services.
                </p>
                <Link to="/nous-contacter" className="btn-outline mt-5 w-fit text-white hover:text-brand-teal">
                  Parler à un coordinateur →
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const accent = accents[i % accents.length];
              return (
                <Reveal
                  key={s.title}
                  delay={120 + i * 50}
                  className={`group rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${accent.border}`}
                >
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${accent.iconBg} ${accent.iconText}`}
                  >
                    <ServiceIcon icon={s.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-brand-blue-deep">
                    {s.title}
                    {s.isNew && (
                      <span className="ml-2 rounded-full bg-brand-teal/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-teal">
                        Nouveau
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
