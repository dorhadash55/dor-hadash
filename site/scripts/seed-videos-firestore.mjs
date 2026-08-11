/**
 * Pousse la liste éditoriale des vidéos vers Firestore (site/content.videos).
 * Nécessite : `firebase login` avec un compte admin (dor.hadash55@… / dorhadash5780@…).
 *
 * Usage :
 *   cd site && node scripts/seed-videos-firestore.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp, applicationDefault, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  const envPath = resolve(root, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    if (!process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

loadEnv();

const videos = [
  {
    id: "yrFA6Gut1Lg",
    youtubeId: "yrFA6Gut1Lg",
    title: "Qualita & Dor Hadash",
    caption:
      "Quand Qualita et Dor Hadash unissent leurs forces pour accompagner les olim francophones.",
    category: "temoignage",
  },
  {
    id: "sCUoN36RAhc",
    youtubeId: "sCUoN36RAhc",
    title: "Un nouveau programme pour futurs olim à Haifa",
    caption:
      "Patricia Hassoun présente l'incubateur Dor Hadash à Haifa, avec la communauté du Rav Avner Ajout.",
    category: "programme",
  },
  {
    id: "2lB-J4uQHoI",
    youtubeId: "2lB-J4uQHoI",
    title: "Dor Hadash pour réussir son Alya",
    caption:
      "Focus Qualita #508 — le programme Dor Hadash expliqué pour préparer et réussir son Alya.",
    category: "programme",
  },
  {
    id: "52RrBzqQbRc",
    youtubeId: "52RrBzqQbRc",
    title: "L'Alya à Jérusalem avec Dor Hadash",
    caption:
      "Focus Qualita #531 — s'installer à Jérusalem avec l'accompagnement Dor Hadash.",
    category: "programme",
  },
  {
    id: "IOgHS9mNf24",
    youtubeId: "IOgHS9mNf24",
    title: "Karmiel, perle de Galilée",
    caption: "Vue d'ensemble de Karmiel, l'une des villes d'accueil du programme Dor Hadash.",
    category: "autre",
  },
];

async function main() {
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT;
  if (!projectId) {
    console.error("VITE_FIREBASE_PROJECT_ID manquant (.env).");
    process.exit(1);
  }

  if (!getApps().length) {
    initializeApp({ credential: applicationDefault(), projectId });
  }

  const db = getFirestore();
  const ref = db.doc("site/content");
  const snap = await ref.get();
  const existing = Array.isArray(snap.data()?.videos) ? snap.data().videos : [];
  const byId = new Map();
  for (const v of existing) {
    if (v?.youtubeId) byId.set(v.youtubeId, v);
  }
  for (const v of videos) {
    byId.set(v.youtubeId, { ...(byId.get(v.youtubeId) || {}), ...v });
  }
  const merged = [...byId.values()];

  await ref.set(
    {
      videos: merged,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  console.log(`OK — ${merged.length} vidéo(s) enregistrée(s) dans site/content (projet ${projectId}).`);
}

main().catch((err) => {
  console.error("Échec seed Firebase:", err.message || err);
  console.error(
    "Astuce : connectez-vous avec `gcloud auth application-default login` (compte admin), puis relancez.",
  );
  process.exit(1);
});
