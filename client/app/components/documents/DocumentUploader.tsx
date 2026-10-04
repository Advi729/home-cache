import {
  type ChangeEvent,
  useRef,
  useState,
} from "react";

import {
  uploadDocument,
} from "../../lib/api";

interface Props {
  onUploaded: () => void;
}

export function DocumentUploader({
  onUploaded,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleFile = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError(null);

    if (file.type !== "application/pdf") {
      setError(
        "Only PDF documents are supported."
      );

      return;
    }

    try {
      setUploading(true);

      await uploadDocument(file);

      onUploaded();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Upload failed."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFile}
        className="hidden"
      />

      <button
        type="button"
        disabled={uploading}
        onClick={() =>
          inputRef.current?.click()
        }
        className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {uploading
          ? "Processing..."
          : "+ Add document"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}