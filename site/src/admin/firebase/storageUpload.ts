import { getFirebaseAuth, isFirebaseConfigured } from "./config";
import { compressImageFile } from "./compressImage";
import { MEDIA_PREFIX, saveMediaDocument } from "./mediaStore";

export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase non configuré.");
  }

  const user = getFirebaseAuth()?.currentUser;
  if (!user) {
    throw new Error("Connectez-vous avec Google pour uploader une image.");
  }

  const dataUrl = await compressImageFile(file);
  const id = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  await saveMediaDocument(id, dataUrl, folder);
  return `${MEDIA_PREFIX}${id}`;
}
