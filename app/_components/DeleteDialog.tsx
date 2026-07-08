"use client";

import { useEffect, useId, useRef } from "react";
import type { Habit } from "@/lib/habits";
import { animateDialogIn } from "@/lib/animations";

type DeleteDialogProps = {
  habit: Habit;
  onCancel: () => void;
  onConfirm: () => void;
};

/** Confirmation asked before a habit is deleted. */
export default function DeleteDialog({ habit, onCancel, onConfirm }: DeleteDialogProps) {
  const titleId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlayRef.current && panelRef.current) {
      animateDialogIn(overlayRef.current, panelRef.current);
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      className="overlay"
      ref={overlayRef}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={panelRef}>
        <h2 id={titleId} className="font-display text-lg font-semibold">
          Delete this habit?
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          &ldquo;{habit.name}&rdquo; will be removed. This can&rsquo;t be undone.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
