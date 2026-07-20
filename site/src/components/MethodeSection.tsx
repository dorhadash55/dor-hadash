import { methodeSteps } from "../content/homepage";

export default function MethodeSection() {
  return (
    <section id="methode" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-teal">
            Notre méthode
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-blue-deep sm:text-4xl">
            La méthode Dor Hadash
          </h2>
          <p className="mt-4 text-gray-600">
            Quatre étapes claires pour transformer votre projet d'Alya en une intégration réussie.
          </p>
        </div>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line on desktop */}
          <div className="pointer-events-none absolute top-7 left-0 right-0 hidden h-0.5 bg-gray-200 lg:block" />

          {methodeSteps.map((s) => (
            <div key={s.step} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue font-heading text-lg font-semibold text-white shadow-md shadow-brand-blue/30">
                {s.step}
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-brand-blue-deep">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
