/** Shown in the "Your habits" area when there are no habits yet. */
export default function EmptyState() {
  return (
    <div className="card grid place-items-center px-6 py-14 text-center">
      <div
        aria-hidden
        className="mb-4 grid h-12 w-12 place-items-center rounded-full text-[var(--accent)]"
        style={{ background: "var(--accent-soft)" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
      <h2 className="font-display text-lg font-semibold">No habits yet</h2>
      <p className="mt-1 max-w-sm text-sm text-[var(--muted)]">
        Add your first habit above to start building a routine. Small, daily, repeatable.
      </p>
    </div>
  );
}
