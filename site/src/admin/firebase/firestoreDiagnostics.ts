import { doc, setDoc } from "firebase/firestore";
import { ensureFirebaseAuthReady } from "./authReady";
import { getDb, getFirebaseAuth, isFirebaseConfigured } from "./config";

function decodeJwtPayload(token: string): Record<string, unknown> {
  const base64 = token.split(".")[1]?.replace(/-/g, "+").replace(/_/g, "/");
  if (!base64) return {};
  return JSON.parse(atob(base64)) as Record<string, unknown>;
}

export async function testFirestoreWrite(): Promise<{
  ok: boolean;
  message: string;
  details?: string;
}> {
  if (!isFirebaseConfigured()) {
    return { ok: false, message: "Firebase non configuré dans .env" };
  }

  const auth = getFirebaseAuth();
  const db = getDb();
  if (!auth || !db) {
    return { ok: false, message: "Firebase Auth ou Firestore indisponible" };
  }

  let user;
  let tokenPayload: Record<string, unknown> = {};
  try {
    user = await ensureFirebaseAuthReady();
    const token = await user.getIdToken();
    tokenPayload = decodeJwtPayload(token);
  } catch (error) {
    return {
      ok: false,
      message: "Non connecté à Firebase Auth",
      details: error instanceof Error ? error.message : String(error),
    };
  }

  const envProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID as string;
  const firebaseClaim = tokenPayload.firebase as { project_id?: string } | undefined;
  const tokenProjectId = String(tokenPayload.aud ?? firebaseClaim?.project_id ?? "?");
  const tokenEmail = String(tokenPayload.email ?? user.email ?? "?");

  const authInfo =
    `UID: ${user.uid}\n` +
    `Email token: ${tokenEmail}\n` +
    `Projet .env: ${envProjectId}\n` +
    `Projet token: ${tokenProjectId}`;

  if (tokenProjectId !== "?" && tokenProjectId !== envProjectId) {
    return {
      ok: false,
      message: "Projet Firebase incorrect",
      details:
        authInfo +
        "\n\nLe token Auth ne correspond pas au projet .env. Vérifiez les clés VITE_FIREBASE_*.",
    };
  }

  try {
    await setDoc(
      doc(db, "site", "content"),
      {
        videos: [],
        blogPosts: [],
        siteSettings: null,
        _connectivityTest: new Date().toISOString(),
      },
      { merge: true },
    );

    return {
      ok: true,
      message: `Écriture OK — ${user.email} sur ${envProjectId}`,
      details: authInfo,
    };
  } catch (error) {
    const code = (error as { code?: string }).code ?? "unknown";
    const details = error instanceof Error ? error.message : String(error);

    const hint =
      code === "permission-denied"
        ? "Vous êtes connecté mais Firestore refuse quand même → c'est presque toujours App Check.\n\n" +
          "FIX (2 min) :\n" +
          "1. console.firebase.google.com → projet dor-hadash-a1202\n" +
          "2. Build → App Check\n" +
          "3. Ligne « Cloud Firestore » → cliquez les 3 points ou le crayon\n" +
          "4. Mettez « Unenforced » (PAS Enforced) → Enregistrer\n" +
          "5. Attendez 2 min, rechargez le site, retestez\n\n" +
          "Si App Check est déjà Unenforced :\n" +
          "→ Firestore Database → Règles → collez firestore.rules → Publier\n" +
          "→ Vérifiez que vous éditez la base « (default) »"
        : "Republiez firestore.rules dans Firestore → Règles.";

    return {
      ok: false,
      message: `Échec (${code})`,
      details: `${authInfo}\n\n${details}\n\n${hint}`,
    };
  }
}
