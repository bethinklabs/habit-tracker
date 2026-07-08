"use client";

import { useEffect, useState } from "react";
import {
  getHabits,
  updateHabit,
  deleteHabit,
  type Habit,
  type HabitInput,
} from "@/lib/habits";
import { animateRowOut } from "@/lib/animations";
import Header from "@/app/_components/Header";
import AddHabitForm from "@/app/_components/AddHabitForm";
import HabitList from "@/app/_components/HabitList";
import EmptyState from "@/app/_components/EmptyState";
import DeleteDialog from "@/app/_components/DeleteDialog";

type Tab = "manage" | "system";
type Theme = "light" | "dark";

/** Top-level Manage habits screen: owns state and wires the pieces together. */
export default function HabitsApp() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("manage");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setHabits(getHabits());
    const current = document.documentElement.dataset.theme;
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("habit-tracker:theme", next);
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const handleAdded = (habit: Habit) => setHabits((prev) => [...prev, habit]);

  const handleSaveEdit = (id: string, changes: HabitInput) => {
    updateHabit(id, changes);
    setHabits(getHabits());
    setEditingId(null);
  };

  const handleConfirmDelete = async () => {
    const id = deletingId;
    if (!id) return;
    const el = document.querySelector<HTMLElement>(`[data-habit-id="${id}"]`);
    if (el) await animateRowOut(el);
    deleteHabit(id);
    setHabits((prev) => prev.filter((h) => h.id !== id));
    if (editingId === id) setEditingId(null);
    setDeletingId(null);
  };

  const deletingHabit = habits.find((h) => h.id === deletingId) ?? null;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Header theme={theme} onToggleTheme={toggleTheme} tab={tab} onTab={setTab} />

      {tab === "manage" ? (
        <>
          <AddHabitForm onAdded={handleAdded} />

          <section className="mt-8">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Your habits
              </h2>
              <span className="text-xs text-[var(--muted)]">
                {habits.length} {habits.length === 1 ? "habit" : "habits"}
              </span>
            </div>

            {habits.length === 0 ? (
              <EmptyState />
            ) : (
              <HabitList
                habits={habits}
                editingId={editingId}
                onStartEdit={setEditingId}
                onCancelEdit={() => setEditingId(null)}
                onSaveEdit={handleSaveEdit}
                onRequestDelete={setDeletingId}
              />
            )}
          </section>
        </>
      ) : (
        <SystemPanel />
      )}

      {deletingHabit && (
        <DeleteDialog
          habit={deletingHabit}
          onCancel={() => setDeletingId(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </main>
  );
}

/** A compact preview of the design system tokens (the "System" tab). */
function SystemPanel() {
  const swatches: { name: string; varName: string }[] = [
    { name: "Accent", varName: "--accent" },
    { name: "Surface", varName: "--surface" },
    { name: "Surface 2", varName: "--surface-2" },
    { name: "Danger", varName: "--danger" },
  ];
  return (
    <div className="card mt-2 p-6">
      <h2 className="font-display text-lg font-semibold">Design system</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">
        The tokens this screen is built from. Toggle the theme to see them shift.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {swatches.map((s) => (
          <div key={s.varName} className="rounded-xl border border-[var(--border)] p-3">
            <div
              className="h-12 w-full rounded-lg border border-[var(--border)]"
              style={{ background: `var(${s.varName})` }}
            />
            <div className="mt-2 text-xs font-medium">{s.name}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary">
          Primary
        </button>
        <button type="button" className="btn btn-secondary">
          Secondary
        </button>
        <button type="button" className="btn btn-danger">
          Danger
        </button>
      </div>
    </div>
  );
}
