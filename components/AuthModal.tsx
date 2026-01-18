"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AuthTabs from "./AuthTabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

type Props = {
  onClose: () => void;
};

export default function AuthModal({ onClose }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [mounted, setMounted] = useState(false);

  // Ensure portal runs only on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC to close
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!mounted) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-zinc-900 p-6 shadow-2xl border border-white/10"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-black/60 p-2 hover:bg-black"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <h2 className="mb-1 text-center text-2xl font-bold">
          Welcome to <span className="text-indigo-400">PromptVerse</span>
        </h2>
        <p className="mb-6 text-center text-sm text-zinc-400">
          Discover & create powerful AI prompts
        </p>

        {/* Tabs */}
        <AuthTabs mode={mode} setMode={setMode} />

        {/* Forms */}
        {mode === "login" ? (
          <LoginForm onSuccess={onClose} />
        ) : (
          <RegisterForm onSuccess={() => setMode("login")} />
        )}

        {/* Back */}
        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-sm text-zinc-400 hover:text-white"
        >
          ← Back to home
        </button>
      </div>
    </div>,
    modalRoot
  );
}
