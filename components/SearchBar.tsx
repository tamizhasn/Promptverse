"use client";

import { useState } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      placeholder="Search prompts..."
      value={value}
      onChange={(e) => {
        const q = e.target.value;
        setValue(q);
        onSearch(q); // 🔥 only on typing
      }}
      className="w-full rounded-lg glass px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
}
