"use client";

import { useEffect, useRef } from "react";
import type { Habit, HabitInput } from "@/lib/habits";
import { animateListIn, animateRowIn } from "@/lib/animations";
import HabitItem from "@/app/_components/HabitItem";

type HabitListProps = {
  habits: Habit[];
  editingId: string | null;
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
  onSaveEdit: (id: string, changes: HabitInput) => void;
  onRequestDelete: (id: string) => void;
};

/** The list of habits. Staggers rows in on first load and eases new rows in. */
export default function HabitList({
  habits,
  editingId,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onRequestDelete,
}: HabitListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const seenIds = useRef<Set<string> | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const rows = Array.from(
      list.querySelectorAll<HTMLElement>("[data-habit-id]"),
    );

    if (seenIds.current === null) {
      // First render with the loaded habits: stagger everything in.
      animateListIn(rows);
    } else {
      // Later renders: only animate rows we have not seen before.
      for (const row of rows) {
        const id = row.dataset.habitId;
        if (id && !seenIds.current.has(id)) animateRowIn(row);
      }
    }
    seenIds.current = new Set(habits.map((h) => h.id));
  }, [habits]);

  return (
    <ul ref={listRef} role="list" className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          isEditing={editingId === habit.id}
          onStartEdit={onStartEdit}
          onCancelEdit={onCancelEdit}
          onSaveEdit={onSaveEdit}
          onRequestDelete={onRequestDelete}
        />
      ))}
    </ul>
  );
}
