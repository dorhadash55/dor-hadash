import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFirebaseStorage, isFirebaseConfigured } from "./config";

export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase non configuré.");
  }

  const storage = getFirebaseStorage();
  if (!storage) throw new Error("Firebase Storage indisponible.");

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extension}`;
  const path = `${folder}/${safeName}`;
  const storageRef = ref(storage, path);

  await uploadBytes(storageRef, file, { contentType: file.type || undefined });
  return getDownloadURL(storageRef);
}
