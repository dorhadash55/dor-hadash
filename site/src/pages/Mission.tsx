import { Navigate } from "react-router-dom";

/** Ancienne page Mission → contenu fusionné dans l'accueil. */
export default function Mission() {
  return <Navigate to="/#accompagnement" replace />;
}
