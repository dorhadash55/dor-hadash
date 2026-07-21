import { methodeSteps } from "../content/homepage";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const stepThemes = [
  { badge: "from-brand-blue to-brand-blue-dark", glow: "shadow-brand-blue/20", ring: "ring-brand-blue/20" },
  { badge: "from-brand-teal to-emerald-500", glow: "shadow-brand-teal/25", ring: "ring-brand-teal/25" },
  { badge: "from-brand-blue-light to-brand-blue", glow: "shadow-brand-blue-light/25", ring: "ring-brand-blue-light/25" },
  { badge: "from-brand-coral to-orange-500", glow: "shadow-brand-coral/20", ring: "ring-brand-coral/20" },
];

export default function MethodeSection() {
  return (
    <section id="methode" className="section-shell relative overflow-hidden bg-brand-cream">
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand-teal/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            align="center"
            label="Notre méthode"
            title="La méthode Dor Hadash"
            description="Quatre étapes claires pour transformer votre projet d'Alya en une intégration réussie."
          />
        </Reveal>

        {/* Mobile */}
        <div className="relative mt-12 sm:hidden">
          <div
            className="absolute bottom-4 left-[1.6875rem] top-4 w-px bg-gradient-to-b from-brand-blue via-brand-teal to-brand-coral"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-5">
            {methodeSteps.map((s, i) => {
              const theme = stepThemes[i];
              return (
                <Reveal key={s.step} delay={i * 80}>
                  <article className="methode-step relative pl-14">
                    <div
                      className={`absolute left-0 top-5 flex h-[3.375rem] w-[3.375rem] items-center justify-center rounded-full bg-gradient-to-br ${theme.badge} font-heading text-base font-semibold text-white shadow-lg ${theme.glow}`}
                    >
                      {s.step}
                    </div>
                    <div className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ${theme.ring}`}>
                      <h3 className="font-heading text-lg font-semibold text-brand-blue-deep">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Desktop */}
        <div className="relative mt-16 hidden sm:block">
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 h-px overflow-hidden bg-brand-blue/10 lg:block"
            aria-hidden="true"
          >
            <div className="methode-progress h-full w-full origin-left bg-gradient-to-r from-brand-blue via-brand-teal to-brand-coral" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {methodeSteps.map((s, i) => {
              const theme = stepThemes[i];
              return (
                <Reveal key={s.step} delay={i * 90}>
                  <article className="methode-step group">
                    <div className="relative z-10 inline-flex">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${theme.badge} font-heading text-lg font-semibold text-white shadow-lg transition-transform duration-300 group-hover:scale-105 ${theme.glow}`}
                      >
                        {s.step}
                      </div>
                    </div>
                    <div className={`mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md ${theme.ring}`}>
                      <h3 className="font-heading text-lg font-semibold text-brand-blue-deep">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
