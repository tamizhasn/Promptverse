"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import AdminMenu from "./AdminMenu";

export default function Navbar({
  onSearchChange,
}: {
  onSearchChange: (params: {
    q?: string;
    outputType?: string;
  }) => void;
}) {
  const [query, setQuery] = useState("");
  const [outputType, setOutputType] = useState("");

  return (
    <div className="sticky top-0 z-50 glass">
      <div className="container-app flex items-center justify-between py-4 gap-4">
        <h1 className="text-xl font-bold whitespace-nowrap">
          Prompt<span className="text-indigo-400">Verse</span>
        </h1>

        <div className="flex w-full max-w-xl items-center gap-3">
          {/* 🔍 Search */}
          <SearchBar
            onSearch={(q) => {
              setQuery(q);
              onSearchChange({
                q,
                outputType: outputType || undefined,
              });
            }}
          />

          {/* 🧩 Filter */}
          <FilterBar
            value={outputType}
            onChange={(v) => {
              setOutputType(v);
              onSearchChange({
                q: query || undefined,
                outputType: v || undefined,
              });
            }}
          />
        </div>

        <AdminMenu />
      </div>
    </div>
  );
}
