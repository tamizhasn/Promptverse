"use client";

import { useState } from "react";

export default function PromptInput({
  onSearch,
}: {
  onSearch: (params: { q?: string }) => void; // 👈 allow empty
}) {
  const [value, setValue] = useState("");

  return (
    <div className="mx-auto w-full max-w-3xl glass rounded-2xl p-6">
      <textarea
        placeholder="Describe what you want to generate..."
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          setValue(v);

          // 🔥 RESET TO ALL PROMPTS WHEN CLEARED
          if (v.trim() === "") {
            onSearch({});
          }
        }}
        className="w-full resize-none bg-transparent text-lg outline-none"
        rows={3}
      />

      <button
        onClick={() => {
          const trimmed = value.trim();

          // 🔁 empty → fetch all
          if (!trimmed) {
            onSearch({});
          } else {
            onSearch({ q: trimmed });
          }
        }}
        disabled={!value.trim()}
        className="mt-4 w-full rounded-lg bg-indigo-600 py-3 font-semibold hover:bg-indigo-500 disabled:opacity-50"
      >
        Search Prompts
      </button>
    </div>
  );
}
