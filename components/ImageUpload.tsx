"use client";

import { useState } from "react";

export default function ImageUpload({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    onUpload(data.url);

    setLoading(false);
  };

  return (
    <div className="glass rounded-lg p-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleUpload(e.target.files[0]);
          }
        }}
        className="text-sm"
      />

      {loading && (
        <p className="mt-2 text-xs text-zinc-400">Uploading...</p>
      )}
    </div>
  );
}
