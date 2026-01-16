export default function AppealsAndTerms() {
  return (
    <div className="glass rounded-xl p-6 text-sm text-zinc-400">
      <h3 className="mb-2 font-semibold text-white">
        Appeals & Terms
      </h3>

      <p className="mb-2">
        If your prompt or account is suspended unfairly, you may
        contact the platform administrator.
      </p>

      <p className="mb-4">
        📧 <strong>support@promptverse.ai</strong>
      </p>

      <ul className="list-disc pl-5 space-y-1">
        <li>No adult or NSFW content</li>
        <li>No illegal activities</li>
        <li>No hate or abusive content</li>
        <li>Repeated violations lead to suspension</li>
      </ul>
    </div>
  );
}
