import { useEffect } from "react";
import { initFirebaseAppCheck } from "../admin/firebase/appCheck";
import { initContentSync } from "../admin/storage/contentStore";

function deferNonCriticalWork(callback: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback, { timeout: 2500 });
  } else {
    window.setTimeout(callback, 120);
  }
}

/** Démarre la synchro Firestore après le premier rendu (ne bloque pas le LCP). */
export default function ContentSyncInit() {
  useEffect(() => {
    deferNonCriticalWork(() => {
      initFirebaseAppCheck();
      initContentSync();
    });
  }, []);

  return null;
}
