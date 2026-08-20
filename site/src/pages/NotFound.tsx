import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";

export default function NotFound() {
  return (
    <>
      <SeoHead
        title="Page introuvable | Dor Hadash"
        description="Cette page n'existe pas ou a été déplacée. Retournez à l'accueil Dor Hadash."
        noindex
      />
      <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center sm:py-28">
        <span className="font-heading text-6xl font-semibold text-brand-blue">404</span>
        <h1 className="mt-4 font-heading text-2xl font-semibold text-brand-blue-deep">Page introuvable</h1>
        <p className="mt-3 text-gray-600">Cette page n&apos;existe pas ou a été déplacée.</p>
        <Link
          to="/"
          className="mt-8 rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark"
        >
          Retour à l&apos;accueil
        </Link>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-brand-blue">
          <Link to="/mission" className="hover:underline">
            Accompagnement
          </Link>
          <Link to="/nos-villes" className="hover:underline">
            Nos villes
          </Link>
          <Link to="/nous-contacter" className="hover:underline">
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}
