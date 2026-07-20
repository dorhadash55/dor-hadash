import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";

export default function NotFound() {
  return (
    <>
      <SeoHead title="Page introuvable | Dor Hadash" description="Cette page n'existe pas ou plus." />
      <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-28 text-center">
        <span className="font-heading text-6xl font-semibold text-brand-blue">404</span>
        <h1 className="mt-4 font-heading text-2xl font-semibold text-brand-blue-deep">Page introuvable</h1>
        <p className="mt-3 text-gray-600">Cette page n'existe pas ou a été déplacée.</p>
        <Link
          to="/"
          className="mt-8 rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark"
        >
          Retour à l'accueil
        </Link>
      </section>
    </>
  );
}
