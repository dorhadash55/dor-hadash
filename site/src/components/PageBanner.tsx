export default function PageBanner({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-gradient-to-br from-brand-blue-deep to-brand-blue text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <h1 className="font-heading text-3xl font-semibold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-white/85">{subtitle}</p>}
      </div>
    </section>
  );
}
