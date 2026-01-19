"use client";

import { useState } from "react";

const MAX_MB = 2; // 👈 change here if needed
const MAX_BYTES = MAX_MB * 1024 * 1024;

export default function ImageUpload({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    // 🚨 SIZE CHECK ONLY
    if (file.size > MAX_BYTES) {
      setError(`Please upload an image under ${MAX_MB} MB.`);
      return;
    }

    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      onUpload(data.url);
    } catch (err) {
      setError("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-lg p-4 space-y-2">
      <input
        type="file"
        accept="image/*"
        disabled={loading}
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleUpload(e.target.files[0]);
          }
        }}
        className="text-sm"
      />

      {/* ℹ️ INFO */}
      <p className="text-xs text-zinc-400">
        Upload image under <span className="text-white">{MAX_MB} MB</span>
      </p>

      {/* ❌ ERROR */}
      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}

      {/* ⏳ LOADING */}
      {loading && (
        <p className="text-xs text-zinc-400">
          Uploading...
        </p>
      )}
    </div>
  );
}
