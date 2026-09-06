import { useRef, useState, type ChangeEvent } from "react";
import { AdminButton } from "./AdminUi";
import { uploadImage } from "../firebase/storageUpload";
import { isFirebaseConfigured } from "../firebase/config";
import { isMediaRef } from "../firebase/mediaStore";
import SmartImage from "../../components/SmartImage";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
};

export default function ImageUpload({
  value,
  onChange,
  folder = "blog",
  label = "Photo",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Choisissez un fichier image (JPG, PNG, WebP…).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image trop lourde (max 5 Mo).");
      return;
    }

    setUploading(true);
    setError("");

    try {
      if (isFirebaseConfigured()) {
        const url = await uploadImage(file, folder);
        onChange(url);
      } else {
        const url = await readFileAsDataUrl(file);
        onChange(url);
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Échec de l'upload. Réessayez ou collez une URL.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const urlValue = isMediaRef(value) || value.startsWith("data:") ? "" : value;

  return (
    <div className="space-y-3">
      {value && (
        <SmartImage
          src={value}
          alt=""
          className="h-36 w-full rounded-lg border border-gray-200 object-cover"
        />
      )}

      <div className="flex flex-wrap gap-2">
        <AdminButton
          type="button"
          variant="secondary"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Compression et enregistrement…" : `Uploader ${label.toLowerCase()}`}
        </AdminButton>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      {error && <p className="text-sm text-brand-coral">{error}</p>}

      <label className="block">
        <span className="mb-1 block text-xs font-medium text-gray-500">Ou coller une URL d’image</span>
        <input
          type="text"
          value={urlValue}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://… ou /images/blog/photo.jpg"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
        />
      </label>

      {isMediaRef(value) && (
        <p className="text-xs text-gray-500">Image enregistrée dans Firestore (gratuite, sans Storage).</p>
      )}
    </div>
  );
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
