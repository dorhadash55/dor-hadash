import { trustProofs } from "../content/homepage";
import Reveal from "./Reveal";

export default function HomeStats() {
  return (
    <section className="relative z-10 border-y border-brand-blue/10 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-brand-blue/8 sm:grid-cols-4 sm:divide-y-0">
        {trustProofs.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 100} variant="scale" className="stat-pop h-full">
            <div className="flex h-full flex-col items-center px-4 py-6 text-center sm:py-8">
              <span className="font-heading text-3xl font-semibold text-brand-blue sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1 font-accent text-[11px] uppercase tracking-[0.18em] text-gray-500 sm:text-xs">
                {stat.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="border-t border-brand-blue/8 px-4 py-3 text-center text-xs text-gray-500 sm:text-sm">
        Partenaires institutionnels reconnus · Suivi avant et après l&apos;Alya
      </p>
    </section>
  );
}
