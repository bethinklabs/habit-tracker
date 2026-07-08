"use client";

import { useId, useRef, useState } from "react";
import { addHabit, validate, type Habit } from "@/lib/habits";
import { animateShake } from "@/lib/animations";
import NumberStepper from "@/app/_components/NumberStepper";

type AddHabitFormProps = {
  onAdded: (habit: Habit) => void;
};

/** The "Add a habit" card: name, daily target stepper, optional unit, and validation. */
export default function AddHabitForm({ onAdded }: AddHabitFormProps) {
  const nameId = useId();
  const targetId = useId();
  const unitId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [target, setTarget] = useState(1);
  const [unit, setUnit] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const problem = validate({ name, target });
    if (problem) {
      setError(problem.message);
      if (formRef.current) animateShake(formRef.current);
      return;
    }
    const habit = addHabit({ name, target, unit });
    onAdded(habit);
    setName("");
    setTarget(1);
    setUnit("");
    setError(null);
  };

  return (
    <form
      ref={formRef}
      className="card p-5 sm:p-6"
      onSubmit={handleSubmit}
      aria-label="Add a habit"
      noValidate
    >
      <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold">
        <span
          aria-hidden
          className="grid h-6 w-6 place-items-center rounded-md text-[var(--accent)]"
          style={{ background: "var(--accent-soft)" }}
        >
          +
        </span>
        Add a habit
      </h2>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor={nameId} className="field-label">
            Habit name
          </label>
          <input
            id={nameId}
            className="input"
            placeholder="e.g. Drink water"
            value={name}
            aria-invalid={!!error && !name.trim()}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <NumberStepper
          id={targetId}
          label="Daily target"
          value={target}
          onChange={setTarget}
        />

        <div className="sm:w-40">
          <label htmlFor={unitId} className="field-label">
            Unit <span className="font-normal text-[var(--muted)]">· optional</span>
          </label>
          <input
            id={unitId}
            className="input"
            placeholder="e.g. glasses"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary sm:self-end">
          Add habit
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-[var(--danger)]">
          {error}
        </p>
      )}
    </form>
  );
}
