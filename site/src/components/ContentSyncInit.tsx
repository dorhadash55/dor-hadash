import { useEffect } from "react";
import { initFirebaseAppCheck } from "../admin/firebase/appCheck";
import { initFirebaseAnalytics } from "../admin/firebase/config";
import { initContentSync } from "../admin/storage/contentStore";

/** Démarre la synchro Firestore dès le chargement du site (public + admin). */
export default function ContentSyncInit() {
  useEffect(() => {
    initFirebaseAppCheck();
    initContentSync();
    void initFirebaseAnalytics();
  }, []);

  return null;
}
