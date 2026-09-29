import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  Share2,
} from 'lucide-react';
import { ChatMessage, PromptPill } from '../types';
import { api } from '../services/api';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  jurisdictionCode?: string;
  activeBbox?: number[];
  onSelectParcelCitation?: (parcelId: string) => void;
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  jurisdictionCode,
  activeBbox,
  onSelectParcelCitation,
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Welcome to **RICH AI Assistant**. I provide geospatial reasoning, EUDR deforestation compliance verification, and LUMENS landscape scenario analysis.\n\nSelect a prompt pill below or ask any question about the current pilot landscape.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pills, setPills] = useState<PromptPill[]>([]);
  const [selectedCitation, setSelectedCitation] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sharedId, setSharedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback(async (msgId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // fallback: select invisible textarea
      const el = document.createElement('textarea');
      el.value = content;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 1500);
    }
  }, []);

  const handleShare = useCallback(
    async (msgId: string, content: string) => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'RICH AI Copilot Analysis',
            text: content,
          });
          setSharedId(msgId);
          setTimeout(() => setSharedId(null), 1500);
          return;
        } catch {
          // user cancelled or share failed, fallback to copy
        }
      }
      handleCopy(msgId, content);
      setSharedId(msgId);
      setTimeout(() => setSharedId(null), 1500);
    },
    [handleCopy]
  );

  const formatInline = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*.*?\*\*|`.*?`)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={match.index} className="font-bold text-white">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <code key={match.index} className="px-1 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono text-[10px]">
            {token.slice(1, -1)}
          </code>
        );
      }
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  };

  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lineIdx) => {
      if (line.startsWith('### ')) {
        return (
          <h3 key={lineIdx} className="font-bold text-sm text-emerald-300 mt-2 mb-1 border-b border-emerald-500/20 pb-0.5">
            {formatInline(line.slice(4))}
          </h3>
        );
      }
      if (line.startsWith('#### ')) {
        return (
          <h4 key={lineIdx} className="font-bold text-xs text-teal-300 mt-2 mb-0.5">
            {formatInline(line.slice(5))}
          </h4>
        );
      }
      if (line.trim() === '---') {
        return <hr key={lineIdx} className="border-slate-800 my-2" />;
      }
      if (line.trim().startsWith('- ')) {
        return (
          <div key={lineIdx} className="flex items-start space-x-1.5 ml-1 my-0.5">
            <span className="text-emerald-400 font-bold shrink-0">•</span>
            <span className="text-slate-200">{formatInline(line.trim().slice(2))}</span>
          </div>
        );
      }
      const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        return (
          <div key={lineIdx} className="flex items-start space-x-1.5 ml-1 my-0.5">
            <span className="text-emerald-400 font-mono font-bold shrink-0">{numMatch[1]}.</span>
            <span className="text-slate-200">{formatInline(numMatch[2])}</span>
          </div>
        );
      }
      if (!line.trim()) {
        return <div key={lineIdx} className="h-1.5" />;
      }
      return (
        <p key={lineIdx} className="my-0.5 text-slate-200 leading-relaxed">
          {formatInline(line)}
        </p>
      );
    });
  };

  // Load context-aware prompt pills
  useEffect(() => {
    api.getPromptPills(jurisdictionCode).then(setPills).catch(console.error);
  }, [jurisdictionCode]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && initialPrompt) {
      handleSend(initialPrompt);
      onClearInitialPrompt?.();
    }
  }, [isOpen, initialPrompt]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const res = await api.sendChatMessage(query, history, jurisdictionCode, activeBbox);

      const botMsg: ChatMessage = {
        id: res.id || Date.now().toString(),
        role: 'assistant',
        content: res.response,
        citations: res.citations || [],
        sources: res.sources || [],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error communicating with the AI service. Please verify server connectivity.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (msgId: string, rating: number) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, rating } : m))
    );
    try {
      await api.submitFeedback(msgId, rating);
    } catch (e) {
      console.error('Feedback submission error:', e);
    }
  };

  if (!isOpen) return null;

  return (
    <aside className="fixed top-14 right-0 bottom-0 w-96 max-w-full bg-slate-950/95 backdrop-blur-md border-l border-slate-800 shadow-2xl flex flex-col z-30 select-none">
      {/* Drawer Header */}
      <div className="h-12 px-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-xs text-white">RICH Climate AI</span>
            <span className="ml-2 text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              Multi-Agent RAG
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs select-text">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start space-x-2.5 ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full bg-emerald-700/40 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-emerald-300" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-lg p-3 leading-relaxed ${
                m.role === 'user'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900/90 text-slate-200 border border-slate-800'
              }`}
            >
              {m.role === 'user' ? (
                <div className="whitespace-pre-wrap">{m.content}</div>
              ) : (
                <div className="text-xs space-y-0.5">{renderFormattedContent(m.content)}</div>
              )}

              {/* Citations block */}
              {m.citations && m.citations.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-slate-800 space-y-1">
                  <div className="text-[10px] font-semibold text-slate-400">
                    Grounded Sources & Citations:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {m.citations.map((c, i) => {
                      const isParcel = c.type === 'agroforestry_parcel';
                      return (
                        <span
                          key={c.id || i}
                          onClick={() => {
                            if (isParcel) {
                              onSelectParcelCitation?.(c.parcel_id || c.id);
                            } else {
                              setSelectedCitation(c);
                            }
                          }}
                          className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-emerald-300 border border-slate-700 cursor-pointer transition-colors"
                          title={isParcel ? "Focus and inspect parcel on the map" : "View legal clause / citation details"}
                        >
                          <span>[{i + 1}] {c.title}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Message Feedback */}
              {m.role === 'assistant' && m.id !== 'welcome' && (
                <div className="mt-2 flex items-center justify-end space-x-1.5 pt-1 text-slate-500">
                  <button
                    onClick={() => handleCopy(m.id, m.content)}
                    className={`p-1 rounded hover:bg-slate-800 transition-all flex items-center space-x-1 ${
                      copiedId === m.id ? 'text-emerald-400' : 'hover:text-slate-300'
                    }`}
                    title={copiedId === m.id ? 'Copied!' : 'Copy message'}
                  >
                    {copiedId === m.id ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span className="text-[9px] font-semibold">Copied!</span>
                      </>
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                  <button
                    onClick={() => handleShare(m.id, m.content)}
                    className={`p-1 rounded hover:bg-slate-800 transition-all flex items-center space-x-1 ${
                      sharedId === m.id ? 'text-sky-400' : 'hover:text-slate-300'
                    }`}
                    title={sharedId === m.id ? 'Shared!' : 'Share message'}
                  >
                    {sharedId === m.id ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span className="text-[9px] font-semibold">Shared!</span>
                      </>
                    ) : (
                      <Share2 className="w-3 h-3" />
                    )}
                  </button>
                  <button
                    onClick={() => handleFeedback(m.id, 1)}
                    className={`p-1 rounded hover:text-emerald-400 ${
                      m.rating === 1 ? 'text-emerald-400 font-bold' : ''
                    }`}
                    title="Accurate & helpful"
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleFeedback(m.id, -1)}
                    className={`p-1 rounded hover:text-rose-400 ${
                      m.rating === -1 ? 'text-rose-400 font-bold' : ''
                    }`}
                    title="Needs improvement"
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {m.role === 'user' && (
              <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5 text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-slate-400 p-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Guardian & Architect agents reasoning...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Pills Carousel */}
      <div className="px-3 py-2 border-t border-slate-800 bg-slate-900/40">
        <div className="text-[10px] text-slate-400 mb-1 font-medium">Suggested Prompts:</div>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
          {pills.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSend(p.prompt)}
              className="px-2 py-1 rounded-full text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-colors flex items-center space-x-1 text-left"
            >
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about EUDR, LUMENS, or parcels..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2 rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Modal T4 GPU Embeddings · pgvector (384-dim)</span>
          </span>
          <span>EUR-Lex &amp; CIFOR-ICRAF Grounded</span>
        </div>
      </div>
      {/* Grounded Legal Citation Dossier Popover */}
      {selectedCitation && (
        <div className="absolute inset-x-3 bottom-20 bg-slate-900/95 border border-emerald-500/40 rounded-xl p-3.5 shadow-2xl z-40 space-y-2 text-xs backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grounded Citation Dossier</span>
            </div>
            <button
              onClick={() => setSelectedCitation(null)}
              className="text-slate-400 hover:text-white p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="font-semibold text-slate-100">{selectedCitation.title}</div>
            <div className="text-slate-400 text-[10px]">
              Type: <strong className="text-slate-200 capitalize">{selectedCitation.type?.replace('_', ' ')}</strong>
              {selectedCitation.regulation && ` • ${selectedCitation.regulation}`}
              {selectedCitation.article && ` • ${selectedCitation.article}`}
              {selectedCitation.page && ` • Page ${selectedCitation.page}`}
            </div>
            {selectedCitation.doi && (
              <div className="text-slate-500 font-mono text-[9px]">DOI/CELEX: {selectedCitation.doi}</div>
            )}
            {selectedCitation.snippet && (
              <p className="text-slate-300 text-[10px] bg-slate-950/80 p-2 rounded border border-slate-800 italic leading-relaxed">
                &ldquo;{selectedCitation.snippet}&rdquo;
              </p>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
