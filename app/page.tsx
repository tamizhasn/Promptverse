"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import PromptInput from "@/components/PromptInput";
import SamplePromptsMarquee from "@/components/SamplePromptsMarquee";
import PromptGrid from "@/components/PromptGrid";

export default function Home() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH PROMPTS
  useEffect(() => {
    fetch("/api/prompts")
      .then((res) => res.json())
      .then((data) => {
        setPrompts(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

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

        <PromptInput />
      </section>

      {/* SAMPLE PROMPTS */}
      <SamplePromptsMarquee />

      {/* ALL PROMPTS */}
      <section className="mt-24">
        {loading ? (
          <p className="text-center text-zinc-400">Loading prompts...</p>
        ) : (
          <PromptGrid prompts={prompts} />
        )}
      </section>
    </>
  );
}
