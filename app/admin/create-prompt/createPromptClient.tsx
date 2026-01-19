"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import BackButton from "@/components/BackButton";

export default function CreatePromptClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/prompts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        description: formData.get("description"),
        promptText: formData.get("promptText"),
        category: formData.get("category"),
        outputType: formData.get("outputType"),
        difficulty: formData.get("difficulty"),
        tags: String(formData.get("tags") || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        previewImage,
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4">
      
      <form
        onSubmit={handleSubmit}
        className="
          glass w-full max-w-3xl rounded-2xl
          border border-white/10
          bg-black/40 p-8
          shadow-2xl
        "
      >
        <BackButton label="Back" fallback="/" />
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Create <span className="text-indigo-400">Prompt</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Share a high-quality AI prompt with the community
          </p>
        </div>

        {/* Title */}
        <div className="mb-5">
          <label className="label">Prompt Title</label>
          <input
            name="title"
            required
            placeholder="Cinematic Portrait Lighting"
            className="input"
          />
        </div>

        {/* Short Description */}
        <div className="mb-5">
          <label className="label">Short Description</label>
          <textarea
            name="description"
            rows={2}
            placeholder="Professional studio portrait generation with dramatic lighting"
            className="textarea"
            required
          />
        </div>

        {/* Prompt Text */}
        <div className="mb-6">
          <label className="label">Prompt Content</label>
          <textarea
            name="promptText"
            rows={6}
            placeholder="Write the full AI prompt here..."
            className="textarea"
            required
          />
        </div>

        {/* Meta fields */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="label">Category</label>
            <input
              name="category"
              placeholder="Image Generation"
              className="input"
            />
          </div>

          <div>
            <label className="label">Output Type</label>
            <select name="outputType" className="input">
              <option>Image</option>
              <option>Video</option>
              <option>Text</option>
            </select>
          </div>

          <div>
            <label className="label">Difficulty</label>
            <select name="difficulty" className="input">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="label">Tags</label>
          <input
            name="tags"
            placeholder="cinematic, portrait, lighting, photography"
            className="input"
          />
          <p className="mt-1 text-xs text-zinc-400">
            Separate tags with commas
          </p>
        </div>

        {/* Image Upload */}
        <div className="mb-8">
          <label className="label">Preview Image</label>

          <ImageUpload onUpload={setPreviewImage} />

          {previewImage && (
            <img
              src={previewImage}
              className="mt-4 h-32 w-full rounded-lg object-cover border border-white/10"
              alt="Preview"
            />
          )}
        </div>

        {/* Submit */}
        <button
          disabled={loading || !previewImage}
          className="
            w-full rounded-xl bg-indigo-600
            py-3 text-sm font-semibold
            transition hover:bg-indigo-500
            disabled:opacity-50
          "
        >
          {loading ? "Publishing Prompt..." : "Create Prompt"}
        </button>
      </form>
      
    </div>
  );
}
