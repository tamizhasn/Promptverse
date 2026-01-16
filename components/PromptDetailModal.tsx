"use client";

import { X, Heart, Copy } from "lucide-react";
import { useEffect, useState, useRef } from "react";

type Props = {
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
  onClose: () => void;
};

export default function PromptDetailModal({ prompt, onClose }: Props) {
  const [liked, setLiked] = useState(false);
  const hasViewed = useRef(false); // 🛡️ prevent multiple view counts

  /* ============================
     🔑 ESC KEY HANDLER
  ============================ */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  /* ============================
     👀 VIEW COUNT (ON OPEN)
  ============================ */
  useEffect(() => {
    if (hasViewed.current) return;
    hasViewed.current = true;

    fetch("/api/prompts/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        promptId: prompt._id,
        action: "view",
      }),
    });
  }, [prompt._id]);

  /* ============================
     📋 COPY HANDLER
  ============================ */
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

  /* ============================
     ❤️ LIKE HANDLER
  ============================ */
  const handleLike = async () => {
    setLiked(true);

    await fetch("/api/prompts/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        promptId: prompt._id,
        action: "like",
      }),
    });
  };

  return (
    /* 🌑 BACKDROP (click outside closes modal) */
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      {/* 🪟 MODAL CONTAINER */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[80vh] w-[90vw] max-w-5xl overflow-hidden rounded-2xl bg-zinc-900"
      >
        {/* ❌ CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-black/60 p-2 hover:bg-black"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 🖼️ IMAGE */}
        <div className="relative w-1/2">
          <img
            src={prompt.previewImage || "/sample-prompt.png"}
            alt={prompt.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/sample-prompt.png";
            }}
          />

          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <img
              src={prompt.createdBy?.profileImage || "/avatar.png"}
              className="h-8 w-8 rounded-full object-cover"
              alt="Creator"
            />
            <span className="text-sm">
              {prompt.createdBy?.name || "Admin"}
            </span>
          </div>
        </div>

        {/* 📄 CONTENT */}
        <div className="flex w-1/2 flex-col p-6">
          <h2 className="mb-3 text-xl font-semibold">
            {prompt.title}
          </h2>

          <div className="mb-4 flex gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
              {prompt.outputType}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
              {prompt.difficulty}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto rounded-lg bg-black/40 p-4 text-sm leading-relaxed text-zinc-200">
            {prompt.promptText}
          </div>

          {/* ACTIONS */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200"
            >
              <Copy className="h-4 w-4" />
              Copy Prompt
            </button>

            <button onClick={handleLike}>
              <Heart
                className={`h-6 w-6 transition ${
                  liked
                    ? "fill-red-500 text-red-500"
                    : "text-white"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
