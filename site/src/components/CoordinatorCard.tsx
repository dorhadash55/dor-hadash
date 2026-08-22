import {
  toTelHref,
  type CityCoordinatorGroup,
  type CoordinatorPerson,
} from "../content/coordinators";

function PersonBlock({ person }: { person: CoordinatorPerson }) {
  return (
    <div>
      <p className="font-heading text-base font-semibold text-brand-blue-deep">{person.name}</p>
      <ul className="mt-1.5 space-y-1 text-sm text-gray-600">
        {person.phones.map((phone) => (
          <li key={phone}>
            <a href={toTelHref(phone)} className="hover:text-brand-blue hover:underline">
              {phone}
            </a>
          </li>
        ))}
        {person.email && (
          <li>
            <a href={`mailto:${person.email}`} className="break-all hover:text-brand-blue hover:underline">
              {person.email}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default function CoordinatorCard({
  group,
  compact = false,
}: {
  group: CityCoordinatorGroup;
  compact?: boolean;
}) {
  return (
    <article
      className={`rounded-2xl border border-brand-sand bg-white ${compact ? "p-4" : "p-5 sm:p-6"}`}
    >
      <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-brand-teal">
        Coordinateur local francophone
      </p>
      <h3 className="mt-1 font-heading text-lg font-semibold text-brand-blue-deep">{group.name}</h3>
      {group.recruiting ? (
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Le poste est actuellement en cours de recrutement. Un coordinateur Dor Hadash vous oriente en
          attendant.
        </p>
      ) : (
        <div className={`mt-3 ${group.people.length > 1 ? "space-y-4" : ""}`}>
          {group.people.map((person) => (
            <PersonBlock key={person.name} person={person} />
          ))}
        </div>
      )}
    </article>
  );
}
