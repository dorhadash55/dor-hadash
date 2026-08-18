import { Link } from "react-router-dom";
import { entryDoors } from "../content/homepage";
import { hashIdFromHref, scrollToId } from "../lib/scrollToId";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const cardClass =
  "group flex h-full min-h-[8.5rem] cursor-pointer flex-col justify-between rounded-2xl border border-brand-sand bg-white px-5 py-5 transition-all hover:border-brand-blue/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 sm:min-h-[9.5rem] sm:px-6 sm:py-6";

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
      <div>
        <h3 className="font-heading text-lg font-semibold text-brand-blue-deep sm:text-xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue transition-transform group-hover:translate-x-0.5">
        Continuer <span aria-hidden>→</span>
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
            title="Quatre portes d'entrée"
            description="Reconnaissez votre situation et accédez plus vite aux bonnes informations."
          />
        </Reveal>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
          {entryDoors.map((door, i) => (
            <Reveal key={door.title} delay={i * 80} variant="up">
              <DoorCard href={door.href} title={door.title} description={door.description} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
