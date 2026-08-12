import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const stats = [
  { value: 7, suffix: "", label: "villes d'accueil" },
  { value: 4, suffix: "", label: "étapes d'accompagnement" },
  { value: 6, suffix: "", label: "piliers de services" },
  { value: 100, suffix: "%", label: "francophone" },
];

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, active };
}

function AnimatedValue({
  value,
  suffix,
  active,
  delay,
}: {
  value: number;
  suffix: string;
  active: boolean;
  delay: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    const duration = 1100;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value, delay]);

  return (
    <span className="font-heading text-3xl font-semibold text-brand-blue sm:text-4xl">
      {display}
      {suffix}
    </span>
  );
}

export default function HomeStats() {
  const { ref, active } = useInViewOnce<HTMLElement>();

  return (
    <section ref={ref} className="relative z-10 border-y border-brand-blue/10 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-brand-blue/8 sm:grid-cols-4 sm:divide-y-0">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 120} variant="scale" className="stat-pop h-full">
            <div className="flex h-full flex-col items-center px-4 py-6 text-center sm:py-8">
              <AnimatedValue value={stat.value} suffix={stat.suffix} active={active} delay={i * 120} />
              <span className="mt-1 font-accent text-[11px] uppercase tracking-[0.18em] text-gray-500 sm:text-xs">
                {stat.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
