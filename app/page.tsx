"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PromptInput from "@/components/PromptInput";
import SamplePrompts from "@/components/SamplePrompts";
import PromptCard from "@/components/PromptCard";

export default function Home() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await fetch("/api/prompts");
        const data = await res.json();

        if (Array.isArray(data)) {
          setPrompts(data);
        } else {
          setPrompts([]);
        }
      } catch (error) {
        console.error("Failed to fetch prompts", error);
        setPrompts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="container-app pt-20">
        <h1 className="mb-6 text-center text-4xl font-bold">
          Discover Powerful AI Prompts
        </h1>
        <PromptInput />
      </section>

      {/* DESCRIPTION */}
      <section className="mx-auto mt-20 max-w-4xl px-6 text-center text-zinc-400">
        PromptVerse helps you find curated AI prompts for image generation,
        web apps, automation, and content creation — faster and smarter.
      </section>

      {/* SAMPLE PROMPTS */}
      <SamplePrompts />

      {/* ALL PROMPTS */}
      <section className="container-prompts mt-20">
        <h2 className="mb-6 text-2xl font-semibold">All Prompts</h2>

        {loading ? (
          <p className="text-zinc-400">Loading prompts...</p>
        ) : prompts.length === 0 ? (
          <p className="text-zinc-400">No prompts available</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {prompts.map((prompt) => (
              <PromptCard key={prompt._id} prompt={prompt} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
