export default function PromptInput() {
  return (
    <div className="glass mx-auto max-w-3xl rounded-2xl p-6">
      <textarea
        placeholder="Describe what you want to generate..."
        rows={3}
        className="w-full resize-none bg-transparent outline-none text-lg"
      />
      <button className="mt-4 w-full rounded-xl bg-indigo-600 py-2 font-semibold hover:bg-indigo-500">
        Search Prompts
      </button>
    </div>
  );
}
