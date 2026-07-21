const stats = [
  { value: "6", label: "villes d'accueil" },
  { value: "4", label: "étapes d'accompagnement" },
  { value: "6", label: "piliers de services" },
  { value: "100%", label: "gratuit pour les olim" },
];

export default function HomeStats() {
  return (
    <section className="relative z-10 border-y border-brand-blue/10 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-brand-blue/8 sm:grid-cols-4 sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center px-4 py-6 text-center sm:py-8">
            <span className="font-heading text-3xl font-semibold text-brand-blue sm:text-4xl">{stat.value}</span>
            <span className="mt-1 font-accent text-[11px] uppercase tracking-[0.18em] text-gray-500 sm:text-xs">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
