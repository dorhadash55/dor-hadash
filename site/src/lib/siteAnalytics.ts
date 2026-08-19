import { doc, getDoc, increment, setDoc } from "firebase/firestore";
import { getDb } from "../admin/firebase/config";
import { hasAnalyticsConsent } from "./cookieConsent";

export type SiteTrafficStats = {
  pageViews: number;
  clicks: number;
};

const STATS_PATH = ["analytics", "stats"] as const;

function statsRef() {
  const db = getDb();
  return db ? doc(db, ...STATS_PATH) : null;
}

async function bump(field: "pageViews" | "clicks") {
  if (!hasAnalyticsConsent()) return;
  const ref = statsRef();
  if (!ref) return;
  try {
    await setDoc(
      ref,
      {
        [field]: increment(1),
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );
  } catch (error) {
    console.warn("[Dor Hadash] Compteur analytics non enregistré.", error);
  }
}

let lastPage = "";
export function trackPageView(pathname: string) {
  if (!hasAnalyticsConsent()) return;
  if (pathname.startsWith("/admin")) return;
  if (pathname === lastPage) return;
  lastPage = pathname;
  void bump("pageViews");
}

let lastClickAt = 0;
export function trackClick() {
  if (!hasAnalyticsConsent()) return;
  const now = Date.now();
  if (now - lastClickAt < 400) return;
  lastClickAt = now;
  void bump("clicks");
}

export async function fetchSiteTrafficStats(): Promise<SiteTrafficStats> {
  const ref = statsRef();
  if (!ref) return { pageViews: 0, clicks: 0 };
  const snap = await getDoc(ref);
  const data = snap.data();
  return {
    pageViews: typeof data?.pageViews === "number" ? data.pageViews : 0,
    clicks: typeof data?.clicks === "number" ? data.clicks : 0,
  };
}
