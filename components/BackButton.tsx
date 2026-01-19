"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
  fallback = "/",
  label = "Back",
}: {
  fallback?: string;
  label?: string;
}) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="
        inline-flex items-center gap-2
        rounded-full glass px-4 py-2
        text-sm font-medium
        transition
        hover:bg-white/15
      "
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
}
