"use client";

export default function FilterBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        rounded-lg glass px-3 py-2 text-sm
        text-zinc-100
        outline-none
        focus:ring-2 focus:ring-indigo-500
        bg-transparent
      "
    >
      <option value="" className="bg-zinc-900">
        All
      </option>
      <option value="Image" className="bg-zinc-900">
        Image
      </option>
      <option value="Code" className="bg-zinc-900">
        Code
      </option>
      <option value="Text" className="bg-zinc-900">
        Text
      </option>
      <option value="Video" className="bg-zinc-900">
        Video
      </option>
    </select>
  );
}
