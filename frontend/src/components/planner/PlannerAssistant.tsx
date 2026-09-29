import { useState } from 'react';
import type { Jurisdiction, Parcel } from '../../types';

interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  'How many parcels in this landscape are validated versus synthetic?',
  'Which parcels are large enough to need a polygon for EUDR?',
  'What evidence is missing before this landscape can support EUDR claims?',
  'Summarize the validation progress for this landscape.',
];

function buildLocalGroundedAnswer(query: string, parcels: Parcel[], jurisdiction: Jurisdiction): string {
  const q = query.toLowerCase();
  const validated = parcels.filter((p) => (p as any).data_origin === 'field_validated');
  const synthetic = parcels.filter((p) => (p as any).data_origin === 'synthetic');
  const largeParcels = parcels.filter((p) => (p.area_ha || 0) >= 4);
  const missingEvidence = parcels.filter((p) => !p.source_url);

  if (q.includes('polygon') || q.includes('eudr')) {
    return (
      `Under EUDR Article 9, plots of 4 hectares or more require full polygon boundaries, while smaller plots may use a single GPS point.\n\n` +
      `In ${jurisdiction.name}: **${largeParcels.length} of ${parcels.length}** parcels are ≥ 4 ha and therefore require polygons for due diligence.\n\n` +
      `_Source: parcel catalogue for ${jurisdiction.code} (see each dossier for record-level provenance)._`
    );
  }
  if (q.includes('validated') || q.includes('validation') || q.includes('progress') || q.includes('synthetic')) {
    return (
      `Validation status for ${jurisdiction.name}:\n\n` +
      `- Field-validated: **${validated.length}**\n` +
      `- Synthetic (demo): **${synthetic.length}**\n` +
      `- Other origins: **${parcels.length - validated.length - synthetic.length}**\n\n` +
      (validated.length === 0
        ? 'No field validation has been recorded yet in this landscape. Records cannot support compliance or finance claims until validated.\n\n'
        : '') +
      `_Source: parcel catalogue for ${jurisdiction.code}._`
    );
  }
  if (q.includes('evidence') || q.includes('missing')) {
    return (
      `Evidence gaps in ${jurisdiction.name}:\n\n` +
      `- Parcels without a verifiable source URL: **${missingEvidence.length}**\n` +
      `- Parcels without field validation: **${parcels.length - validated.length}**\n\n` +
      `Recommended next steps: run the validation inbox workflow, attach legality documents, and record validator identity and date for each confirmed parcel.\n\n` +
      `_Source: parcel catalogue for ${jurisdiction.code}._`
    );
  }
  return (
    `I can answer questions about the ${jurisdiction.name} parcel catalogue: validation status, ` +
    `parcel sizes and EUDR geolocation rules, evidence gaps, and landscape statistics ` +
    `(${parcels.length} parcels currently loaded). Try one of the suggested questions, or ` +
    `open the full AI assistant from the impact viewer for regulatory-document Q&A.`
  );
}

interface Props {
  jurisdiction: Jurisdiction;
  parcels: Parcel[];
}

export function PlannerAssistant({ jurisdiction, parcels }: Props) {
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || busy) return;
    setBusy(true);
    setInput('');
    setTurns((prev) => [...prev, { role: 'user', content: q }]);
    let answer: string;
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          jurisdiction_code: jurisdiction.code,
          conversation_history: turns.slice(-6).map((t) => ({ role: t.role, content: t.content })),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        answer = data.response || 'No response text was returned.';
        const origins = [...new Set(parcels.map((p) => (p as any).data_origin || 'unknown'))].join(', ');
        answer += `\n\n---\n_Data provenance: catalogue records for ${jurisdiction.code} (origins: ${origins}). Figures above are drawn from these records only._`;
      } else {
        answer = buildLocalGroundedAnswer(q, parcels, jurisdiction);
      }
    } catch {
      answer = buildLocalGroundedAnswer(q, parcels, jurisdiction);
    }
    setTurns((prev) => [...prev, { role: 'assistant', content: answer }]);
    setBusy(false);
  };

  return (
    <section aria-labelledby="assistant-heading" className="bg-white rounded-lg border border-stone-200">
      <div className="px-4 py-3 border-b border-stone-100">
        <h2 id="assistant-heading" className="text-sm font-semibold">Planner assistant</h2>
        <p className="text-xs text-stone-500">
          Grounded in the current landscape records. It answers only from the parcel
          catalogue and compliance corpus — it will say when evidence is missing.
        </p>
      </div>

      <div className="px-4 py-3 flex flex-wrap gap-2" aria-label="Suggested questions">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => ask(q)}
            disabled={busy}
            className="rounded-full border border-stone-300 bg-stone-50 text-xs px-3 py-1.5 hover:bg-stone-100 disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="px-4 pb-2 max-h-96 overflow-y-auto space-y-3" aria-live="polite">
        {turns.length === 0 && (
          <p className="text-sm text-stone-500">Ask a question about this landscape to get started.</p>
        )}
        {turns.map((t, i) => (
          <div key={i} className={t.role === 'user' ? 'text-right' : ''}>
            <div
              className={
                'inline-block max-w-[92%] rounded-lg px-3 py-2 text-sm text-left ' +
                (t.role === 'user'
                  ? 'bg-emerald-800 text-emerald-50'
                  : 'bg-stone-100 text-stone-800')
              }
            >
              {t.content.split('\n').map((line, j) => (
                <p key={j} className={line.startsWith('**') || line.startsWith('_') ? 'my-1' : 'my-0.5'}>
                  {line.replace(/\*\*/g, '')}
                </p>
              ))}
            </div>
          </div>
        ))}
        {busy && <p role="status" className="text-xs text-stone-500">Thinking…</p>}
      </div>

      <form
        className="px-4 py-3 border-t border-stone-100 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <label htmlFor="assistant-input" className="sr-only">Ask the planner assistant</label>
        <input
          id="assistant-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Which parcels need polygons for EUDR?"
          className="flex-1 rounded border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="rounded bg-emerald-800 text-white text-sm font-medium px-4 py-2 hover:bg-emerald-900 disabled:opacity-50"
        >
          Ask
        </button>
      </form>
    </section>
  );
}
