import { Link } from "react-router-dom";
import { entryDoors } from "../content/homepage";
import { hashIdFromHref, scrollToId } from "../lib/scrollToId";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const cardClass =
  "group flex items-center gap-3 rounded-xl border border-brand-sand bg-white px-3.5 py-3 transition-all hover:border-brand-blue/25 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 sm:min-h-0 sm:flex-col sm:items-stretch sm:justify-between sm:gap-0 sm:rounded-2xl sm:px-5 sm:py-5";

function DoorCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  const hashId = hashIdFromHref(href);
  const inner = (
    <>
      <div className="min-w-0 flex-1">
        <h3 className="font-heading text-[0.95rem] font-semibold leading-snug text-brand-blue-deep sm:text-lg">
          {title}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-gray-600 sm:mt-2 sm:line-clamp-none sm:text-sm sm:leading-relaxed">
          {description}
        </p>
      </div>
      <span className="shrink-0 text-sm font-semibold text-brand-blue sm:mt-4 sm:inline-flex sm:items-center sm:gap-1">
        <span className="hidden sm:inline">Continuer </span>
        <span aria-hidden>→</span>
      </span>
    </>
  );

  if (hashId) {
    return (
      <a
        href={`#${hashId}`}
        className={cardClass}
        onClick={(e) => {
          e.preventDefault();
          const ok = scrollToId(hashId);
          if (ok) {
            window.history.replaceState(null, "", `#${hashId}`);
          } else {
            window.location.assign(`/#${hashId}`);
          }
        }}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link to={href} className={cardClass}>
      {inner}
    </Link>
  );
}

export default function EntryDoors() {
  return (
    <section className="section-shell bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            align="center"
            label="Où en êtes-vous ?"
            title="Par où commencer ?"
            description="Choisissez votre situation pour aller droit au but."
          />
        </Reveal>

        <div className="mt-5 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-3">
          {entryDoors.map((door, i) => (
            <Reveal key={door.title} delay={i * 50} variant="up">
              <DoorCard href={door.href} title={door.title} description={door.description} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
