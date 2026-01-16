"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";

export default function CreatePromptPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [promptText, setPromptText] = useState("");
  const [category, setCategory] = useState("");
  const [outputType, setOutputType] = useState("Image");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [tags, setTags] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (
      !title ||
      !description ||
      !promptText ||
      !category ||
      !previewImage
    ) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/prompts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        promptText,
        category,
        outputType,
        difficulty,
        tags: tags.split(",").map((t) => t.trim()),
        previewImage,
        status: "published",
      }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Failed to create prompt");
      return;
    }

    router.push("/admin/dashboard");
  };

  return (
    <div className="container-app mt-10 max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold">Create Prompt</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/20 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="glass rounded-xl p-6 space-y-5">
        {/* Title */}
        <input
          placeholder="Prompt Title"
          className="w-full rounded bg-transparent p-3 outline-none"
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <textarea
          placeholder="Short description"
          className="w-full rounded bg-transparent p-3 outline-none"
          rows={2}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Prompt Text */}
        <textarea
          placeholder="Full prompt text"
          className="w-full rounded bg-transparent p-3 outline-none"
          rows={5}
          onChange={(e) => setPromptText(e.target.value)}
        />

        {/* Category */}
        <input
          placeholder="Category (e.g. Image Generation, Video Generation)"
          className="w-full rounded bg-transparent p-3 outline-none"
          onChange={(e) => setCategory(e.target.value)}
        />

        {/* Output + Difficulty */}
        <div className="grid grid-cols-2 gap-4">
          <select
            className="rounded bg-transparent p-3 outline-none"
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
          >
            <option className="bg-zinc-900">Image</option>
            <option className="bg-zinc-900">Video</option>
            <option className="bg-zinc-900">Text</option>
            <option className="bg-zinc-900">Code</option>
          </select>

          <select
            className="rounded bg-transparent p-3 outline-none"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option className="bg-zinc-900">Beginner</option>
            <option className="bg-zinc-900">Intermediate</option>
            <option className="bg-zinc-900">Advanced</option>
          </select>
        </div>

        {/* Tags */}
        <input
          placeholder="Tags (comma separated)"
          className="w-full rounded bg-transparent p-3 outline-none"
          onChange={(e) => setTags(e.target.value)}
        />

        {/* Preview Image Upload */}
        <div>
          <p className="mb-2 text-sm text-zinc-400">Preview Image</p>
          <ImageUpload onUpload={setPreviewImage} />

          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-3 h-40 rounded-lg object-cover"
            />
          )}
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold hover:bg-indigo-500 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Prompt"}
        </button>
      </div>
    </div>
  );
}
