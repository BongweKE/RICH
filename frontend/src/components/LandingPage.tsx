import { useEffect, useState } from 'react';

const FEATURES = [
  {
    href: '/planner',
    title: 'Planner workspace',
    who: 'Planners, extension officers, NGO staff',
    body: 'Review model-labelled agroforestry parcels, validate them 10 at a time (each decision saved to the database immediately), explore illustrative scenarios, and ask a grounded assistant.',
    cost: 'Lightweight 2D map · works on 3G',
    accent: 'bg-emerald-700',
  },
  {
    href: '/impact',
    title: 'Impact viewer',
    who: 'Funders, partners, evaluators',
    body: 'A 3D visual overview of mapped agroforestry parcels, reference points, and deforestation alerts across the pilot landscapes.',
    cost: 'Heavier 3D map · best on a good connection',
    accent: 'bg-sky-700',
  },
];

const LEARN = [
  {
    title: 'What am I looking at?',
    body: 'Every parcel on the map is a machine-labelled agroforestry prediction with a confidence score and provenance (who or what produced it). In this PoC all records are synthetic demo data, clearly labelled as such — no real farmer data is used.',
  },
  {
    title: 'Why validate?',
    body: 'Continental maps routinely misclassify African agroforestry as forest or cropland. Human review of model labels — by extension officers and communities — is how a trusted reference dataset gets built. Your confirm/correct/reject decision is the ground truth.',
  },
  {
    title: 'How the validation inbox works',
    body: 'The inbox shows 10 parcels per page. Each decision is sent to the database the moment you tap it, with your user ID and a timestamp, so a dropped connection never loses your work. Failed saves show a Retry button.',
  },
  {
    title: 'What the assistant can (and cannot) do',
    body: 'The assistant answers only from retrieved parcels and regulations, with citations. If it cannot ground an answer, it says so rather than inventing figures.',
  },
  {
    title: 'EUDR compliance checks',
    body: 'The EUDR checker is evidence-gated: it never returns a compliance verdict without sufficient data. Bare coordinates yield INSUFFICIENT_DATA, and plots ≥ 4 ha require a polygon, per Article 9.',
  },
  {
    title: 'Scenario workbench',
    body: 'Scenario and carbon figures are illustrative demo calculations, labelled as such on every result. They demonstrate the workflow LUMENS-style analysis will follow, not real measurements.',
  },
];

const STORAGE_KEY = 'rich-landing-tour-dismissed-v1';

export function LandingPage() {
  const [showLearn, setShowLearn] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setTourOpen(true);
    } catch {
      setTourOpen(true);
    }
  }, []);

  const closeTour = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setTourOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <a href="#landing-main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded">
        Skip to main content
      </a>

      <header className="bg-emerald-900 text-emerald-50">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6">
          <p className="text-xs uppercase tracking-wider text-emerald-300">PoC · demo data</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold">
            RICH — making African agroforestry visible on land-cover maps
          </h1>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-emerald-100">
            An AI4D climate-hub prototype adapting CIFOR-ICRAF's LUMENS approach:
            reference data, validation workflows, EUDR due diligence, and scenario
            planning for agroforestry landscapes.
          </p>
        </div>
      </header>

      <main id="landing-main" className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <section aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-lg font-semibold mb-3">Choose a workspace</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <a
                key={f.href}
                href={f.href}
                className="block bg-white rounded-xl border border-stone-200 hover:border-emerald-600 hover:shadow-md transition-all p-5"
              >
                <span className={`inline-block text-[11px] font-semibold text-white px-2 py-0.5 rounded-full ${f.accent}`}>
                  {f.cost}
                </span>
                <h3 className="mt-2 text-base font-semibold">{f.title}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{f.who}</p>
                <p className="text-sm text-stone-600 mt-2">{f.body}</p>
                <span className="inline-block mt-3 text-sm font-medium text-emerald-700">Open →</span>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="learn-heading" className="mt-10">
          <div className="flex items-center justify-between gap-2">
            <h2 id="learn-heading" className="text-lg font-semibold">Learn how to use the platform</h2>
            <button
              type="button"
              onClick={() => setShowLearn((v) => !v)}
              aria-expanded={showLearn}
              className="text-sm px-3 py-1.5 rounded border border-stone-300 bg-white hover:bg-stone-100"
            >
              {showLearn ? 'Hide' : 'Show'} guides
            </button>
          </div>
          {showLearn && (
            <div className="mt-3 grid md:grid-cols-2 gap-3">
              {LEARN.map((l) => (
                <article key={l.title} className="bg-white rounded-lg border border-stone-200 p-4">
                  <h3 className="text-sm font-semibold">{l.title}</h3>
                  <p className="text-sm text-stone-600 mt-1">{l.body}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section aria-labelledby="honesty-heading" className="mt-10">
          <h2 id="honesty-heading" className="text-lg font-semibold">What this PoC is — and is not</h2>
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
            All parcels, reference points, alerts, and analysis results are <strong>synthetic
            demo data</strong> generated for this prototype. No real farmer or institutional
            data is used, and no output should be treated as a real compliance verdict or
            measurement. Provenance is shown on every record.
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 text-xs text-stone-500">
          RICH PoC · adapted from the LUMENS framework · funded context: AI4D Research and
          Innovation for Climate Hub ·{' '}
          <a href="/impact" className="underline">Impact viewer</a> ·{' '}
          <a href="/planner" className="underline">Planner</a>
        </div>
      </footer>

      {tourOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="landing-tour-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-stone-900/40 p-4"
        >
          <div className="bg-white rounded-xl border border-stone-200 shadow-2xl max-w-md w-full p-5">
            <h2 id="landing-tour-title" className="text-base font-semibold">Start here</h2>
            <p className="mt-2 text-sm text-stone-600">
              This platform has two workspaces. If you are on a slow or expensive connection,
              use the <strong>Planner</strong> — it loads a small 2D map. The
              <strong> Impact viewer</strong> is a heavier 3D experience.
              All data is synthetic demo content.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeTour}
                className="px-3 py-1.5 rounded bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
