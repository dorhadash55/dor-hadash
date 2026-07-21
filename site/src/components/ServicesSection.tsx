import { services } from "../content/homepage";
import ServiceIcon from "./ServiceIcon";

const accents = [
  { border: "border-t-brand-blue", bg: "bg-brand-blue", ring: "ring-brand-blue/15" },
  { border: "border-t-brand-teal", bg: "bg-brand-teal", ring: "ring-brand-teal/15" },
  { border: "border-t-brand-coral", bg: "bg-brand-coral", ring: "ring-brand-coral/15" },
];

export default function ServicesSection() {
  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-teal">
            Notre accompagnement
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-blue-deep sm:text-4xl">
            Nos 6 réponses pour une Alya réussie
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {services.map((s, i) => {
            const accent = accents[i % accents.length];
            return (
              <div
                key={s.title}
                className={`flex flex-col rounded-xl border-t-4 bg-white p-4 shadow-sm ring-1 ring-black/5 sm:rounded-2xl sm:p-7 ${accent.border}`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-white sm:h-14 sm:w-14 sm:rounded-xl ${accent.bg}`}
                >
                  <ServiceIcon icon={s.icon} className="h-5 w-5 sm:h-7 sm:w-7" />
                </div>
                <h3 className="mt-3 flex flex-wrap items-baseline gap-x-1.5 font-heading text-sm font-semibold text-brand-blue-deep sm:mt-6 sm:text-lg">
                  {s.title}
                  {s.isNew && (
                    <span className="text-[10px] font-bold uppercase tracking-wide text-brand-teal sm:text-[11px]">
                      · Nouveau
                    </span>
                  )}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-600 sm:mt-2 sm:text-sm">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
