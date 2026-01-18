type Props = {
  mode: "login" | "register";
  setMode: (m: "login" | "register") => void;
};

export default function AuthTabs({ mode, setMode }: Props) {
  return (
    <div className="mb-6 flex rounded-lg bg-black/40 p-1">
      {["login", "register"].map((m) => (
        <button
          key={m}
          onClick={() => setMode(m as any)}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
            mode === m
              ? "bg-indigo-500 text-white"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          {m === "login" ? "Sign In" : "Register"}
        </button>
      ))}
    </div>
  );
}
