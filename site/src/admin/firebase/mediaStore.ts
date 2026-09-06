import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { getDb } from "./config";
import { ensureFirebaseAuthReady } from "./authReady";

export const MEDIA_PREFIX = "media:";

const FALLBACK = "/images/jerusalem.jpg";
const cache = new Map<string, string>();
const listeners = new Set<() => void>();
let syncStarted = false;

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeMedia(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function isMediaRef(src: string | undefined | null): src is string {
  return Boolean(src?.startsWith(MEDIA_PREFIX));
}

export function rememberMedia(id: string, dataUrl: string) {
  cache.set(id, dataUrl);
  emit();
}

export function resolveImageSrc(src: string | undefined | null): string {
  if (!src) return FALLBACK;
  if (!isMediaRef(src)) return src;
  return cache.get(src.slice(MEDIA_PREFIX.length)) ?? FALLBACK;
}

export function isShareableImageSrc(src: string | undefined | null): boolean {
  if (!src || isMediaRef(src) || src.startsWith("data:")) return false;
  return src.startsWith("/") || /^https?:\/\//i.test(src);
}

export function startMediaSync() {
  if (syncStarted || typeof window === "undefined") return;
  const db = getDb();
  if (!db) return;

  syncStarted = true;
  onSnapshot(
    collection(db, "site", "content", "media"),
    (snapshot) => {
      for (const document of snapshot.docs) {
        const data = document.data().data;
        if (typeof data === "string" && data.startsWith("data:")) {
          cache.set(document.id, data);
        }
      }
      emit();
    },
    (error) => {
      console.warn("[Dor Hadash] Lecture media Firestore:", error.message);
    },
  );
}

export async function saveMediaDocument(id: string, dataUrl: string, folder: string) {
  const db = getDb();
  if (!db) throw new Error("Firestore indisponible.");
  await ensureFirebaseAuthReady();
  await setDoc(doc(db, "site", "content", "media", id), {
    data: dataUrl,
    contentType: "image/jpeg",
    folder,
    createdAt: new Date().toISOString(),
  });
  rememberMedia(id, dataUrl);
}
