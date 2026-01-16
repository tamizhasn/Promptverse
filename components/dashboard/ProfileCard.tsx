export default function ProfileCard({ user }: any) {
  return (
    <div className="glass rounded-xl p-6">
      <img
        src={user.image || "/avatar.png"}
        className="h-16 w-16 rounded-full object-cover"
      />
      <h3 className="mt-3 font-semibold">{user.name}</h3>
      <p className="text-sm text-zinc-400">{user.email}</p>
      <p className="mt-2 text-xs">
        Violations: {user.violations ?? 0}/3
      </p>
    </div>
  );
}
