"use client";

import { motion } from "framer-motion";

const samples = [
  "Cinematic portrait lighting",
  "AI SaaS landing page",
  "Anime character concept",
  "Product promo video",
  "SEO blog generator",
  "Chatbot system prompt",
];

export default function SamplePromptsMarquee() {
  return (
    <section className="relative mt-20 overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div
        className="flex w-max gap-4 px-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        }}
      >
        {[...samples, ...samples].map((text, i) => (
          <div
            key={i}
            className="whitespace-nowrap rounded-full bg-white/10 px-5 py-2 text-sm text-zinc-200 backdrop-blur"
          >
            {text}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
