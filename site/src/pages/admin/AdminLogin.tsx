import { useState, type FormEvent } from "react";
import { Head } from "vite-react-ssg";
import { Link, Navigate, useLocation } from "react-router-dom";
import { getDefaultAdminPasswordHint, useAuth } from "../../admin/auth/AuthContext";

function LoginForm() {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = (location.state as { from?: string } | null)?.from ?? "/admin";

  if (isAuthenticated) return <Navigate to={from} replace />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError("");
    } else {
      setError("Mot de passe incorrect.");
    }
  };

  return (
    <>
      <Head>
        <title>Connexion admin | Dor Hadash</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-blue-deep to-brand-blue px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <div className="text-center">
            <img src="/images/logo.png" alt="Dor Hadash" className="mx-auto h-16 w-auto" />
            <h1 className="mt-4 font-heading text-2xl font-semibold text-brand-blue-deep">
              Espace admin
            </h1>
            <p className="mt-2 text-sm text-gray-500">Connectez-vous pour gérer le site</p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>

            {error && <p className="text-sm text-brand-coral">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-full bg-brand-blue py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark"
            >
              Se connecter
            </button>
          </form>

          <p className="mt-6 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
            Mode démo — mot de passe par défaut :{" "}
            <code className="font-mono text-gray-700">{getDefaultAdminPasswordHint()}</code>
            <br />
            Changez-le via <code className="font-mono">VITE_ADMIN_PASSWORD</code> dans un fichier{" "}
            <code className="font-mono">.env</code>.
          </p>

          <p className="mt-4 text-center">
            <Link to="/" className="text-sm text-brand-blue hover:underline">
              ← Retour au site
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default function AdminLogin() {
  return <LoginForm />;
}
