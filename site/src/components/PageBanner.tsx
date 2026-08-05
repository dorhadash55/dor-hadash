export default function PageBanner({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="overflow-x-clip bg-gradient-to-br from-brand-blue-deep to-brand-blue text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <h1 className="hero-in font-heading text-[1.75rem] font-semibold leading-tight sm:text-4xl" style={{ animationDelay: "60ms" }}>
          {title}
        </h1>
        {subtitle && (
          <p
            className="hero-in mt-2.5 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-3 sm:text-base"
            style={{ animationDelay: "180ms" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
