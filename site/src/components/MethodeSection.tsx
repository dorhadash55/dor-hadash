import { methodeSteps } from "../content/homepage";

const stepThemes = [
  {
    ring: "ring-brand-blue/25",
    badge: "from-brand-blue to-brand-blue-dark",
    glow: "shadow-brand-blue/25",
    dot: "bg-brand-blue",
    line: "from-brand-blue",
  },
  {
    ring: "ring-brand-teal/30",
    badge: "from-brand-teal to-emerald-500",
    glow: "shadow-brand-teal/30",
    dot: "bg-brand-teal",
    line: "from-brand-teal",
  },
  {
    ring: "ring-brand-blue-light/30",
    badge: "from-brand-blue-light to-brand-blue",
    glow: "shadow-brand-blue-light/30",
    dot: "bg-brand-blue-light",
    line: "from-brand-blue-light",
  },
  {
    ring: "ring-brand-coral/25",
    badge: "from-brand-coral to-orange-500",
    glow: "shadow-brand-coral/25",
    dot: "bg-brand-coral",
    line: "from-brand-coral",
  },
];

export default function MethodeSection() {
  return (
    <section id="methode" className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-brand-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-teal/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-brand-teal">
            <span className="methode-pulse h-2 w-2 rounded-full bg-brand-teal" aria-hidden="true" />
            Notre méthode
          </span>
          <h2 className="mt-4 font-heading text-2xl font-semibold text-brand-blue-deep sm:text-3xl lg:text-4xl">
            La méthode Dor Hadash
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
            Quatre étapes claires pour transformer votre projet d'Alya en une intégration réussie.
          </p>
        </div>

        {/* Mobile : timeline verticale */}
        <div className="relative mt-12 sm:hidden">
          <div
            className="absolute bottom-4 left-[1.6875rem] top-4 w-0.5 bg-gradient-to-b from-brand-blue via-brand-teal via-50% to-brand-coral"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-5">
            {methodeSteps.map((s, i) => {
              const theme = stepThemes[i];
              return (
                <article
                  key={s.step}
                  className="methode-step relative pl-14"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <div
                    className={`absolute left-0 top-5 flex h-[3.375rem] w-[3.375rem] items-center justify-center rounded-full bg-gradient-to-br ${theme.badge} font-heading text-base font-semibold text-white shadow-lg ${theme.glow} ring-4 ring-white`}
                  >
                    {s.step}
                  </div>
                  <div
                    className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md ${theme.ring}`}
                  >
                    <h3 className="font-heading text-lg font-semibold text-brand-blue-deep">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Desktop : parcours horizontal */}
        <div className="relative mt-16 hidden sm:block">
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-1 overflow-hidden rounded-full bg-gray-100 lg:block"
            aria-hidden="true"
          >
            <div className="methode-progress h-full w-full origin-left rounded-full bg-gradient-to-r from-brand-blue via-brand-teal to-brand-coral" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
            {methodeSteps.map((s, i) => {
              const theme = stepThemes[i];
              return (
                <article
                  key={s.step}
                  className="methode-step group relative flex flex-col items-center text-center lg:items-start lg:text-left"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative z-10">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${theme.badge} font-heading text-lg font-semibold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 ${theme.glow}`}
                    >
                      {s.step}
                    </div>
                    <span
                      className={`absolute -inset-1 -z-10 rounded-full bg-gradient-to-br ${theme.badge} opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40`}
                      aria-hidden="true"
                    />
                  </div>

                  <div
                    className={`mt-6 w-full rounded-2xl bg-white/80 p-5 backdrop-blur-sm ring-1 ring-black/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white group-hover:shadow-lg ${theme.ring}`}
                  >
                    <h3 className="font-heading text-lg font-semibold text-brand-blue-deep">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
