import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseAuth } from "./config";

/** Attend que Firebase Auth soit prêt et rafraîchit le token avant une écriture Firestore. */
export async function ensureFirebaseAuthReady(): Promise<User> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase Auth indisponible.");

  const resolveUser = async (user: User): Promise<User> => {
    await user.getIdToken(true);
    return user;
  };

  if (auth.currentUser) {
    return resolveUser(auth.currentUser);
  }

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      unsubscribe();
      reject(new Error("Session expirée. Reconnectez-vous via Google."));
    }, 8000);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      clearTimeout(timeout);
      unsubscribe();
      void resolveUser(user).then(resolve).catch(reject);
    });
  });
}

export function getCurrentUserEmail(): string | null {
  return getFirebaseAuth()?.currentUser?.email ?? null;
}
