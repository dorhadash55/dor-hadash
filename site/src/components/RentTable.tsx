import { Link } from "react-router-dom";
import { cityRents, rentDisclaimer, rentUpdatedLabel } from "../content/rents";

export default function RentTable() {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-brand-sand bg-white">
        <table className="w-full min-w-[20rem] text-left text-sm">
          <caption className="sr-only">
            Fourchettes indicatives des loyers mensuels, {rentUpdatedLabel}
          </caption>
          <thead className="bg-brand-cream/80 text-xs uppercase tracking-wide text-brand-blue-deep">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                Ville
              </th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                3 pièces
              </th>
              <th scope="col" className="px-4 py-3 font-semibold sm:px-5">
                4 pièces
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-sand">
            {cityRents.map((row) => (
              <tr key={row.name}>
                <th scope="row" className="px-4 py-3 font-heading font-semibold text-brand-blue-deep sm:px-5">
                  {row.slug ? (
                    <Link to={`/${row.slug}`} className="hover:underline">
                      {row.name}
                    </Link>
                  ) : (
                    row.name
                  )}
                </th>
                <td className="px-4 py-3 tabular-nums text-gray-700 sm:px-5">{row.threeRooms}</td>
                <td className="px-4 py-3 tabular-nums text-gray-700 sm:px-5">{row.fourRooms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-gray-500">{rentDisclaimer}</p>
    </div>
  );
}
