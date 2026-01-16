export default function FilterBar() {
  return (
    <select
      className="
        rounded-lg glass px-3 py-2 text-sm
        text-zinc-100
        outline-none
        focus:ring-2 focus:ring-indigo-500
        bg-transparent
      "
    >
      <option value="" className="bg-zinc-900 text-zinc-100">
        All
      </option>
      <option value="image" className="bg-zinc-900 text-zinc-100">
        Image
      </option>
      <option value="code" className="bg-zinc-900 text-zinc-100">
        Code
      </option>
      <option value="text" className="bg-zinc-900 text-zinc-100">
        Text
      </option>
    </select>
  );
}
