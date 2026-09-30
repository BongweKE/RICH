import React from 'react';

/**
 * Shared renderer for AI assistant output.
 *
 * The Mistral-backed assistant (and the local fallback) return light Markdown.
 * Rendering that raw leaves `###`, `-`, `_underscores_`, `**bold**` and pipe
 * tables visible as literal characters, which is what made the assistant look
 * broken. This renders the small Markdown subset the models actually emit —
 * headings, lists, blockquotes, rules, tables, bold, code, links and citations —
 * in one place so the impact-view chat and the planner assistant stay visually
 * consistent (Gestalt: similarity/consistency).
 */

export type AiMessageVariant = 'dark' | 'light';

interface Style {
  heading: string;
  subheading: string;
  body: string;
  bullet: string;
  bulletDot: string;
  number: string;
  code: string;
  bold: string;
  italic: string;
  quote: string;
  hr: string;
  link: string;
  citation: string;
  table: string;
  th: string;
  td: string;
}

const STYLES: Record<AiMessageVariant, Style> = {
  dark: {
    heading: 'font-bold text-sm text-emerald-300 mt-2.5 mb-1 border-b border-emerald-500/20 pb-0.5',
    subheading: 'font-bold text-xs text-teal-300 mt-2 mb-0.5',
    body: 'my-0.5 leading-relaxed',
    bullet: 'my-1 flex items-start gap-2',
    bulletDot: 'text-emerald-400 font-bold shrink-0 mt-px',
    number: 'text-emerald-400 font-mono font-bold shrink-0 mt-px',
    code: 'px-1 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono text-[10px]',
    bold: 'font-semibold text-white',
    italic: 'italic text-slate-300',
    quote: 'border-l-2 border-emerald-500/40 pl-2.5 my-1.5 text-slate-400 italic',
    hr: 'border-slate-800 my-2',
    link: 'text-emerald-300 underline underline-offset-2',
    citation: 'text-[9px] align-super text-emerald-400 font-semibold',
    table: 'my-2 w-full border-collapse text-[11px]',
    th: 'border border-slate-700 bg-slate-800/70 px-2 py-1 text-left font-semibold text-slate-200',
    td: 'border border-slate-800 px-2 py-1 text-slate-300',
  },
  light: {
    heading: 'font-semibold text-sm text-stone-900 mt-2.5 mb-1 border-b border-stone-200 pb-0.5',
    subheading: 'font-semibold text-xs text-stone-800 mt-2 mb-0.5',
    body: 'my-0.5 leading-relaxed',
    bullet: 'my-1 flex items-start gap-2',
    bulletDot: 'text-emerald-700 font-bold shrink-0 mt-px',
    number: 'text-emerald-700 font-mono font-bold shrink-0 mt-px',
    code: 'px-1 py-0.5 rounded bg-stone-200 text-emerald-800 font-mono text-[11px]',
    bold: 'font-semibold text-stone-900',
    italic: 'italic text-stone-600',
    quote: 'border-l-2 border-emerald-600/40 pl-2.5 my-1.5 text-stone-500 italic',
    hr: 'border-stone-200 my-2',
    link: 'text-emerald-800 underline underline-offset-2',
    citation: 'text-[10px] align-super text-emerald-700 font-semibold',
    table: 'my-2 w-full border-collapse text-[12px]',
    th: 'border border-stone-300 bg-stone-100 px-2 py-1 text-left font-semibold text-stone-800',
    td: 'border border-stone-200 px-2 py-1 text-stone-700',
  },
};

// Order matters: links before citations; bold before italic.
const INLINE_RE = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*[^*]+\*\*)|(`[^`]+`)|(\[\d+\])/g;

function renderInline(text: string, s: Style, keyBase: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const token = m[0];
    const key = `${keyBase}-${m.index}`;
    if (m[2] !== undefined && m[3] !== undefined) {
      out.push(
        <a key={key} href={m[3]} target="_blank" rel="noopener noreferrer" className={s.link}>
          {m[2]}
        </a>,
      );
    } else if (token.startsWith('**')) {
      out.push(
        <strong key={key} className={s.bold}>
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith('`')) {
      out.push(
        <code key={key} className={s.code}>
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith('[')) {
      out.push(
        <sup key={key} className={s.citation}>
          {token.slice(1, -1)}
        </sup>,
      );
    }
    last = INLINE_RE.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function splitRow(row: string): string[] {
  return row
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim());
}

function isSeparatorRow(row: string): boolean {
  const cells = splitRow(row);
  return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c));
}

function renderTable(block: string[], key: number, s: Style): React.ReactNode {
  const rows = block.filter((r) => !isSeparatorRow(r)).map(splitRow);
  if (rows.length === 0) return null;
  const [head, ...body] = rows;
  return (
    <div key={`table-${key}`} className="overflow-x-auto">
      <table className={s.table}>
        {head && (
          <thead>
            <tr>
              {head.map((c, j) => (
                <th key={j} className={s.th}>
                  {renderInline(c, s, `th-${j}`)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {body.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, j) => (
                <td key={j} className={s.td}>
                  {renderInline(c, s, `td-${ri}-${j}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderLine(line: string, i: number, s: Style): React.ReactNode {
  const key = `line-${i}`;

  if (/^#{4,}\s+/.test(line)) {
    return (
      <div key={key} className={s.subheading}>
        {renderInline(line.replace(/^#{4,}\s+/, ''), s, key)}
      </div>
    );
  }
  if (/^#{1,3}\s+/.test(line)) {
    return (
      <div key={key} className={s.heading}>
        {renderInline(line.replace(/^#{1,3}\s+/, ''), s, key)}
      </div>
    );
  }
  if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
    return <hr key={key} className={s.hr} />;
  }
  if (/^\s*>\s?/.test(line)) {
    return (
      <blockquote key={key} className={s.quote}>
        {renderInline(line.replace(/^\s*>\s?/, ''), s, key)}
      </blockquote>
    );
  }

  const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
  if (bullet) {
    return (
      <div key={key} className={s.bullet}>
        <span aria-hidden="true" className={s.bulletDot}>
          •
        </span>
        <span>{renderInline(bullet[1], s, key)}</span>
      </div>
    );
  }

  const numbered = line.match(/^\s*(\d+)[.)]\s+(.*)$/);
  if (numbered) {
    return (
      <div key={key} className={s.bullet}>
        <span className={s.number}>{numbered[1]}.</span>
        <span>{renderInline(numbered[2], s, key)}</span>
      </div>
    );
  }

  if (/^\s*$/.test(line)) {
    return <div key={key} className="h-1.5" />;
  }

  // Whole-line emphasis only, so `shade_cocoa` style keys are never italicised.
  const italic = line.match(/^_(.+)_$/);
  if (italic) {
    return (
      <p key={key} className={`${s.body} ${s.italic}`}>
        {renderInline(italic[1], s, key)}
      </p>
    );
  }
  const boldLine = line.match(/^\*\*(.+)\*\*$/);
  if (boldLine) {
    return (
      <p key={key} className={`${s.body} ${s.bold}`}>
        {renderInline(boldLine[1], s, key)}
      </p>
    );
  }

  return (
    <p key={key} className={s.body}>
      {renderInline(line, s, key)}
    </p>
  );
}

export interface AiMessageProps {
  content: string;
  variant?: AiMessageVariant;
}

export function AiMessage({ content, variant = 'dark' }: AiMessageProps) {
  const s = STYLES[variant];
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const nodes: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    if (lines[i].trim().startsWith('|')) {
      const block: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        block.push(lines[i]);
        i += 1;
      }
      nodes.push(renderTable(block, nodes.length, s));
      continue;
    }
    nodes.push(renderLine(lines[i], i, s));
    i += 1;
  }
  return <div className="break-words">{nodes}</div>;
}
