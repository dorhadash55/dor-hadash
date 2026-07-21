import { useRef, useState, type ChangeEvent } from "react";
import { AdminButton } from "./AdminUi";
import { uploadImage } from "../firebase/storageUpload";
import { isFirebaseConfigured } from "../firebase/config";

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
    } catch {
      setError("Échec de l'upload. Réessayez ou collez une URL.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {value && (
        <img
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
          {uploading ? "Upload en cours…" : `Uploader ${label.toLowerCase()}`}
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

      {!isFirebaseConfigured() && (
        <p className="text-xs text-gray-500">
          Mode local — l'image est stockée temporairement. Configurez Firebase Storage pour un
          enregistrement permanent.
        </p>
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
