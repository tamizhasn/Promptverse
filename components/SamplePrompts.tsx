const samples = [
  "Photorealistic portrait generation",
  "Build a Next.js SaaS app",
  "Generate anime character art",
  "SEO optimized blog post",
];

export default function SamplePrompts() {
  return (
    <div className="mx-auto mt-12 max-w-5xl">
      <h2 className="mb-4 text-lg font-semibold text-zinc-300">
        Sample Prompts
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {samples.map((s, i) => (
          <div
            key={i}
            className="min-w-[260px] glass rounded-xl p-4 text-sm"
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
