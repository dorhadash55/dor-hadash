import { useState, useEffect } from "react";
import { Head } from "vite-react-ssg";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth, formatGoogleAuthError, GOOGLE_AUTH_ERROR_KEY } from "../../admin/auth/AuthContext";
import { isFirebaseConfigured } from "../../admin/firebase/config";

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
  const { isAuthenticated, isLoading, loginWithGoogle, usesFirebaseAuth } = useAuth();
  const location = useLocation();
  const [error, setError] = useState("");
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(GOOGLE_AUTH_ERROR_KEY);
    if (stored) {
      sessionStorage.removeItem(GOOGLE_AUTH_ERROR_KEY);
      setError(stored);
    }
  }, []);

  const from = (location.state as { from?: string } | null)?.from ?? "/admin";

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-blue-deep px-4 text-white">
        Chargement…
      </div>
    );
  }

  if (isAuthenticated) return <Navigate to={from} replace />;

  const handleGoogleLogin = async () => {
    setGoogleSubmitting(true);
    setError("");

    try {
      const result = await loginWithGoogle();
      if (!result.ok) {
        if (result.reason === "unauthorized") {
          setError(result.message ?? "Ce compte Google n'est pas autorisé.");
        } else if (result.reason !== "cancelled") {
          setError(result.message ?? "Connexion Google impossible. Réessayez.");
        }
      }
    } catch (err) {
      setError(formatGoogleAuthError(err));
    } finally {
      setGoogleSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Connexion admin | Dor Hadash</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-brand-blue-deep to-brand-blue px-4 py-6 sm:py-10">
        <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl sm:p-8">
          <div className="text-center">
            <img src="/images/logo.png" alt="Dor Hadash" className="mx-auto h-14 w-auto" />
            <h1 className="mt-4 font-heading text-xl font-semibold text-brand-blue-deep sm:text-2xl">
              Espace admin
            </h1>
            <p className="mt-1 text-sm text-gray-500">Connexion sécurisée avec Google</p>
          </div>

          {error && (
            <p className="mt-6 rounded-lg bg-brand-coral/10 px-3 py-2 text-sm text-brand-coral">{error}</p>
          )}

          {!isFirebaseConfigured() || !usesFirebaseAuth ? (
            <p className="mt-8 rounded-lg bg-amber-50 px-3 py-3 text-sm text-amber-900">
              Firebase n&apos;est pas configuré. Ajoutez les variables <code>VITE_FIREBASE_*</code> pour
              activer l&apos;admin.
            </p>
          ) : (
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleSubmitting}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-60"
            >
              <GoogleIcon />
              {googleSubmitting ? "Connexion…" : "Continuer avec Google"}
            </button>
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
