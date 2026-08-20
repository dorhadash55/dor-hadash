import { trustProofs } from "../content/homepage";
import Reveal from "./Reveal";

export default function HomeStats() {
  return (
    <section className="relative z-10 border-y border-brand-blue/10 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-brand-blue/8 sm:grid-cols-4 sm:divide-y-0">
        {trustProofs.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80} variant="scale" className="stat-pop h-full">
            <div className="flex h-full flex-col items-center justify-center px-3 py-5 text-center sm:px-4 sm:py-7">
              <span className="font-heading text-2xl font-semibold text-brand-blue sm:text-3xl lg:text-4xl">
                {stat.value}
              </span>
              <span className="mt-0.5 font-accent text-[10px] uppercase leading-tight tracking-[0.14em] text-gray-500 sm:mt-1 sm:text-[11px] sm:tracking-[0.18em]">
                {stat.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
