import { useEffect, useState } from 'react';

const STEPS: { title: string; body: string }[] = [
  {
    title: 'Welcome to the RICH Planner',
    body: 'A governance workspace for agroforestry landscapes. This short tour covers the four sections — it takes under a minute.',
  },
  {
    title: '1 · Map workspace',
    body: 'Browse parcels on a lightweight 2D map. Click any parcel for its dossier: provenance, area, confidence, and the EUDR rule that applies to it.',
  },
  {
    title: '2 · Validation inbox',
    body: 'Review model-labelled parcels 10 at a time. Every confirm/correct/reject decision is saved to the database immediately, so nothing is lost on a weak connection.',
  },
  {
    title: '3 · Scenario workbench',
    body: 'Explore illustrative land-use change and carbon scenarios for the selected landscape. Results are clearly labelled as demo calculations, not real measurements.',
  },
  {
    title: '4 · Ask the assistant',
    body: 'Ask questions about the landscape. Answers are grounded in retrieved parcels and regulations — with provenance, no invented figures.',
  },
];

const STORAGE_KEY = 'rich-planner-tour-dismissed-v1';

export function PlannerTour() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const close = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* private mode */
    }
    setOpen(false);
  };

  if (!open) return null;
  const s = STEPS[step];

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="planner-tour-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-stone-900/40 p-4"
    >
      <div className="bg-white rounded-xl border border-stone-200 shadow-2xl max-w-md w-full p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 id="planner-tour-title" className="text-base font-semibold text-stone-900">
            {s.title}
          </h2>
          <span className="text-xs text-stone-400 tabular-nums shrink-0" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
            {step + 1}/{STEPS.length}
          </span>
        </div>
        <p className="mt-2 text-sm text-stone-600">{s.body}</p>
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={close}
            className="text-xs text-stone-500 underline underline-offset-2 hover:text-stone-800"
          >
            Skip tour
          </button>
          <div className="flex gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((v) => v - 1)}
                className="px-3 py-1.5 rounded border border-stone-300 text-sm text-stone-700 hover:bg-stone-100"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={() => (step === STEPS.length - 1 ? close() : setStep((v) => v + 1))}
              className="px-3 py-1.5 rounded bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800"
            >
              {step === STEPS.length - 1 ? 'Start working' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
