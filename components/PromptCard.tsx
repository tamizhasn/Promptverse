"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import ReportModal from "@/components/ReportModal";
import PromptDetailModal from "@/components/PromptDetailModal";

type PromptCardProps = {
  prompt: {
    _id: string;
    title: string;
    promptText: string;
    outputType: string;
    difficulty: string;
    previewImage?: string;
    createdBy?: {
      name?: string;
      profileImage?: string;
    };
  };
};

export default function PromptCard({ prompt }: PromptCardProps) {
  if (!prompt) return null;

  const [showReport, setShowReport] = useState(false);
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);

  const imageSrc = prompt.previewImage || "/sample-prompt.png";

  const handleCopy = async () => {
  await navigator.clipboard.writeText(prompt.promptText);

  await fetch("/api/prompts/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      promptId: prompt._id,
      action: "copy",
    }),
  });
};


  return (
    <>
      {/* 🖼️ CARD */}
      <div
        onClick={() => setOpen(true)}
        className="
          group relative h-[420px] w-full cursor-pointer overflow-hidden
          rounded-2xl bg-black
          transition-transform duration-300 ease-out
          hover:-translate-y-1 hover:scale-[1.02]
        "
      >
        {/* Background image */}
        <img
          src={imageSrc}
          alt={prompt.title}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/sample-prompt.png";
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Copy button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          className="
            absolute right-3 top-3 z-10
            rounded-full bg-black/60 px-3 py-1 text-xs
            opacity-0 group-hover:opacity-100
            transition
          "
        >
          Copy
        </button>

        {/* Bottom content */}
        <div className="absolute bottom-0 z-10 w-full p-4">
          <h3 className="text-sm font-semibold leading-tight">
            {prompt.title}
          </h3>

          <div className="mt-2 flex gap-2">
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px]">
              {prompt.outputType}
            </span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px]">
              {prompt.difficulty}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            {/* Creator */}
            <div className="flex items-center gap-2">
              <img
                src={prompt.createdBy?.profileImage || "/avatar.png"}
                className="h-6 w-6 rounded-full object-cover"
                alt="Creator"
              />
              <span className="text-xs text-zinc-300">
                {prompt.createdBy?.name || "Admin"}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);

                  fetch("/api/prompts/analytics", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      promptId: prompt._id,
                      action: "like",
                    }),
                  });
                }}
              >
                <Heart
                  className={`h-5 w-5 ${
                    liked
                      ? "fill-red-500 text-red-500"
                      : "text-white/80"
                  }`}
                />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReport(true);
                }}
                className="text-xs text-white/70 hover:text-red-400"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📖 PROMPT DETAIL MODAL */}
      {open && (
        <PromptDetailModal
          prompt={prompt}
          onClose={() => setOpen(false)}
        />
      )}

      {/* 🚨 REPORT MODAL */}
      {showReport && (
        <ReportModal
          promptId={prompt._id}
          onClose={() => setShowReport(false)}
        />
      )}
    </>
  );
}
