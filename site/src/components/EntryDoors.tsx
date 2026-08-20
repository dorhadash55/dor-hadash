import { Link } from "react-router-dom";
import { entryDoors } from "../content/homepage";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function EntryDoors() {
  return (
    <section className="section-shell bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            align="center"
            label="Où en êtes-vous ?"
            title="Par où commencer ?"
            description="Trois situations, trois portes d'entrée."
          />
        </Reveal>

        <div className="mt-5 grid gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-3">
          {entryDoors.map((door, i) => (
            <Reveal key={door.title} delay={i * 50} variant="up">
              <Link
                to={door.href}
                className="group flex items-center gap-3 rounded-xl border border-brand-sand bg-white px-3.5 py-3 transition-all hover:border-brand-blue/25 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 sm:flex-col sm:items-stretch sm:justify-between sm:gap-0 sm:rounded-2xl sm:px-5 sm:py-5"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-[0.95rem] font-semibold leading-snug text-brand-blue-deep sm:text-lg">
                    {door.title}
                  </h3>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-gray-600 sm:mt-2 sm:line-clamp-none sm:text-sm sm:leading-relaxed">
                    {door.description}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-brand-blue sm:mt-4 sm:inline-flex sm:items-center sm:gap-1">
                  <span className="hidden sm:inline">Continuer </span>
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
