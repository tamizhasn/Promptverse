"use client";

import { motion } from "framer-motion";
import PromptCard from "./PromptCard";

type Props = {
  prompts: any;
};

export default function PromptGrid({ prompts }: Props) {
  if (!Array.isArray(prompts)) return null;

  if (prompts.length === 0) {
    return (
      <p className="text-center text-zinc-500">
        No prompts available
      </p>
    );
  }

  return (
    <section className="container-prompts">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-2xl font-semibold"
      >
        All Prompts
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {prompts.map((prompt) => (
          <motion.div
            key={prompt._id}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.98 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <PromptCard prompt={prompt} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
