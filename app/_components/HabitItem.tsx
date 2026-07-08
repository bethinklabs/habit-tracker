"use client";

import { useId, useRef, useState } from "react";
import { validate, type Habit, type HabitInput } from "@/lib/habits";
import { animateShake } from "@/lib/animations";
import NumberStepper from "@/app/_components/NumberStepper";

type HabitItemProps = {
  habit: Habit;
  isEditing: boolean;
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
  onSaveEdit: (id: string, changes: HabitInput) => void;
  onRequestDelete: (id: string) => void;
};

/** One habit in the list. Shows the habit, or an inline edit form while editing. */
export default function HabitItem({
  habit,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onRequestDelete,
}: HabitItemProps) {
  return (
    <li data-habit-id={habit.id} className="card flex items-center gap-4 px-4 py-3.5">
      {isEditing ? (
        <EditHabitForm
          habit={habit}
          onSave={(changes) => onSaveEdit(habit.id, changes)}
          onCancel={onCancelEdit}
        />
      ) : (
        <>
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium">{habit.name}</div>
            <div className="mt-1.5">
              <span
                className="inline-flex items-center gap-1.5 font-semibold tabular-nums"
                style={{
                  padding: "2px 9px",
                  borderRadius: "7px",
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                  fontSize: "12.5px",
                }}
              >
                {habit.unit ? `${habit.target} ${habit.unit}` : `${habit.target} / day`}
              </span>
            </div>
          </div>
          <div className="hidden h-6 w-px shrink-0 bg-[var(--border)] sm:block" />
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="icon-btn"
              aria-label="Edit"
              onClick={() => onStartEdit(habit.id)}
            >
              <PencilIcon />
            </button>
            <button
              type="button"
              className="icon-btn icon-btn-danger"
              aria-label="Delete"
              onClick={() => onRequestDelete(habit.id)}
            >
              <TrashIcon />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

function EditHabitForm({
  habit,
  onSave,
  onCancel,
}: {
  habit: Habit;
  onSave: (changes: HabitInput) => void;
  onCancel: () => void;
}) {
  const nameId = useId();
  const targetId = useId();
  const unitId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState(habit.name);
  const [target, setTarget] = useState(habit.target);
  const [unit, setUnit] = useState(habit.unit ?? "");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const problem = validate({ name, target });
    if (problem) {
      setError(problem.message);
      if (formRef.current) animateShake(formRef.current);
      return;
    }
    onSave({ name, target, unit });
  };

  return (
    <form
      ref={formRef}
      aria-label="Edit habit"
      className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="min-w-0 flex-1">
        <label htmlFor={nameId} className="field-label">
          Habit name
        </label>
        <input
          id={nameId}
          className="input"
          value={name}
          aria-invalid={!!error && !name.trim()}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <NumberStepper id={targetId} label="Daily target" value={target} onChange={setTarget} />

      <div className="sm:w-36">
        <label htmlFor={unitId} className="field-label">
          Unit <span className="font-normal text-[var(--muted)]">· optional</span>
        </label>
        <input
          id={unitId}
          className="input"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
      </div>

      <div className="flex gap-2 sm:self-end">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>

      {error && (
        <p role="alert" className="w-full text-sm font-medium text-[var(--danger)]">
          {error}
        </p>
      )}
    </form>
  );
}

function PencilIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}
