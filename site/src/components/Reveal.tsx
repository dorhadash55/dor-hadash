import { useEffect, useRef, useState, type ReactNode } from "react";

export type RevealVariant = "up" | "down" | "left" | "right" | "fade" | "scale" | "blur";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  duration,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms once the element enters the viewport */
  delay?: number;
  variant?: RevealVariant;
  /** Optional override for animation duration (ms) */
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 639px)").matches);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let shown = false;
    let raf1 = 0;
    let raf2 = 0;

    const show = () => {
      if (shown) return;
      shown = true;
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
      observer?.disconnect();
    };

    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    // Mobile : déclencher plus bas dans le viewport pour voir l'anim
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      isMobile
        ? { threshold: 0.2, rootMargin: "0px 0px -20% 0px" }
        : { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);

    const fallback = window.setTimeout(show, 4500);

    return () => {
      observer?.disconnect();
      clearTimeout(fallback);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  const effectiveDelay = mobile ? Math.round(delay * 1.4) + 80 : delay;

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${visible ? "is-revealed" : ""} ${className}`}
      style={{
        animationDelay: visible ? `${effectiveDelay}ms` : undefined,
        ...(duration ? { animationDuration: `${duration}ms` } : undefined),
      }}
    >
      {children}
    </div>
  );
}
