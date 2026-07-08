"use client";

type Tab = "manage" | "system";
type Theme = "light" | "dark";

type HeaderProps = {
  theme: Theme;
  onToggleTheme: () => void;
  tab: Tab;
  onTab: (tab: Tab) => void;
};

/** App header: logo, title, the Manage/System toggle, and the theme toggle. */
export default function Header({ theme, onToggleTheme, tab, onTab }: HeaderProps) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div
          className="grid h-11 w-11 place-items-center rounded-xl text-[var(--accent-contrast)]"
          style={{ background: "var(--accent)" }}
          aria-hidden
        >
          <CheckIcon />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold leading-tight">Habits</h1>
          <p className="text-sm text-[var(--muted)]">Build a routine, one habit at a time</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="seg" role="group" aria-label="View">
          <button
            type="button"
            className="seg-btn"
            aria-pressed={tab === "manage"}
            onClick={() => onTab("manage")}
          >
            Manage
          </button>
          <button
            type="button"
            className="seg-btn"
            aria-pressed={tab === "system"}
            onClick={() => onTab("system")}
          >
            System
          </button>
        </div>
        <button
          type="button"
          className="icon-btn"
          aria-label="Toggle theme"
          onClick={onToggleTheme}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}
