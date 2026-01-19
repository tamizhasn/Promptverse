"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import PromptInput from "@/components/PromptInput";
import SamplePromptsMarquee from "@/components/SamplePromptsMarquee";
import PromptGrid from "@/components/PromptGrid";

export default function Home() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH PROMPTS (supports search & filter)
  const fetchPrompts = useCallback(
      async (params?: { q?: string; outputType?: string }) => {
        setLoading(true);

        const url = new URL("/api/prompts", window.location.origin);

        if (params?.q) {
          url.searchParams.set("q", params.q);
        }

        if (params?.outputType) {
          url.searchParams.set("outputType", params.outputType);
        }

        try {
          const res = await fetch(url.toString());
          const data = await res.json();
          setPrompts(Array.isArray(data) ? data : []);
        } catch {
          setPrompts([]);
        } finally {
          setLoading(false);
        }
      },
      [] // ✅ stable reference
    );


  // 🔹 Initial load
  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);


  return (
    <>
      {/* 🔍 Navbar with search + filter */}
      <Navbar onSearchChange={fetchPrompts} />

      {/* HERO */}
      <section className="container-app pt-28 text-center">
        {/* Brand */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-5xl font-extrabold"
        >
          <span className="text-white">Prompt</span>
          <span className="text-indigo-400">Verse</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-10 text-3xl text-zinc-300"
        >
          Discover Powerful AI Prompts
        </motion.h2>

        <PromptInput  onSearch={fetchPrompts}/>
      </section>

      {/* SAMPLE PROMPTS */}
      <SamplePromptsMarquee />

      {/* ALL PROMPTS */}
      <section className="mt-24">
        {loading ? (
          <p className="text-center text-zinc-400">
            Loading prompts...
          </p>
        ) : (
          <PromptGrid prompts={prompts} />
        )}
      </section>
    </>
  );
}
