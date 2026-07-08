"use client";

type NumberStepperProps = {
  id: string;
  label: string;
  value: number;
  min?: number;
  onChange: (value: number) => void;
};

/** A labeled number input flanked by decrease/increase buttons. */
export default function NumberStepper({
  id,
  label,
  value,
  min = 1,
  onChange,
}: NumberStepperProps) {
  const step = (delta: number) => {
    const base = Number.isFinite(value) ? value : min;
    onChange(Math.max(min, base + delta));
  };

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="stepper">
        <button
          type="button"
          className="stepper-btn"
          aria-label="Decrease"
          onClick={() => step(-1)}
        >
          −
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          className="stepper-input"
          min={min}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => {
            const next = e.target.value === "" ? NaN : Number(e.target.value);
            onChange(next);
          }}
        />
        <button
          type="button"
          className="stepper-btn"
          aria-label="Increase"
          onClick={() => step(1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
