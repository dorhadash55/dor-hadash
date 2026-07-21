import { useState, type FormEvent } from "react";
import { Head } from "vite-react-ssg";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../admin/auth/AuthContext";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function AdminLogin() {
  const { isAuthenticated, isLoading, login, loginWithGoogle, usesFirebaseAuth } = useAuth();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? "/admin";
  const busy = submitting || googleSubmitting;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-blue-deep px-4 text-white">
        Chargement…
      </div>
    );
  }

  if (isAuthenticated) return <Navigate to={from} replace />;

  const handlePasswordLogin = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const result = await login({ password });
    setSubmitting(false);

    if (!result.ok && result.reason !== "cancelled") {
      setError("Mot de passe incorrect.");
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleSubmitting(true);
    setError("");

    const result = await loginWithGoogle();
    setGoogleSubmitting(false);

    if (!result.ok) {
      if (result.reason === "unauthorized") {
        setError("Ce compte Google n'est pas autorisé.");
      } else if (result.reason !== "cancelled") {
        setError("Connexion Google impossible. Réessayez ou utilisez le mot de passe.");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Connexion admin | Dor Hadash</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-blue-deep to-brand-blue px-4 py-10">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
          <div className="text-center">
            <img src="/images/logo.png" alt="Dor Hadash" className="mx-auto h-14 w-auto" />
            <h1 className="mt-4 font-heading text-2xl font-semibold text-brand-blue-deep">Admin</h1>
            <p className="mt-1 text-sm text-gray-500">Gestion du site Dor Hadash</p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handlePasswordLogin}>
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
                autoFocus
                required
                placeholder="Entrez le mot de passe admin"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-brand-coral/10 px-3 py-2 text-sm text-brand-coral">{error}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-brand-blue py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark disabled:opacity-60"
            >
              {submitting ? "Connexion…" : "Se connecter"}
            </button>
          </form>

          {usesFirebaseAuth && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs text-gray-400">
                  <span className="bg-white px-3">ou</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={busy}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
              >
                <GoogleIcon />
                {googleSubmitting ? "Redirection Google…" : "Continuer avec Google"}
              </button>
            </>
          )}

          <p className="mt-6 text-center">
            <Link to="/" className="text-sm text-brand-blue hover:underline">
              ← Retour au site
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
