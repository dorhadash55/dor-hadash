import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getFirebaseApp, isFirebaseConfigured } from "./config";

let initialized = false;

/** App Check — requis si Firestore est en mode « Enforced » dans la console Firebase. */
export function initFirebaseAppCheck() {
  if (initialized || typeof window === "undefined" || !isFirebaseConfigured()) return;

  const app = getFirebaseApp();
  if (!app) return;

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;

  if (import.meta.env.DEV) {
    // Affiche un token debug dans la console du navigateur à enregistrer dans Firebase → App Check
    (globalThis as typeof globalThis & { FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean }).FIREBASE_APPCHECK_DEBUG_TOKEN =
      true;
  }

  if (!siteKey) {
    console.info(
      "[Dor Hadash] App Check non configuré (VITE_RECAPTCHA_SITE_KEY manquant). " +
        "Si Firestore refuse les écritures : Firebase Console → App Check → Cloud Firestore → Unenforced.",
    );
    return;
  }

  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(siteKey),
    isTokenAutoRefreshEnabled: true,
  });
  initialized = true;
}
