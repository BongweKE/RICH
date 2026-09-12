import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { ChatMessage, PromptPill } from '../types';
import { api } from '../services/api';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  jurisdictionCode?: string;
  activeBbox?: number[];
  onSelectParcelCitation?: (parcelId: string) => void;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  jurisdictionCode,
  activeBbox,
  onSelectParcelCitation,
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load context-aware prompt pills
  useEffect(() => {
    api.getPromptPills(jurisdictionCode).then(setPills).catch(console.error);
  }, [jurisdictionCode]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

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
              <div className="whitespace-pre-wrap">{m.content}</div>

              {/* Citations block */}
              {m.citations && m.citations.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-slate-800 space-y-1">
                  <div className="text-[10px] font-semibold text-slate-400">
                    Grounded Sources & Citations:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {m.citations.map((c, i) => (
                      <span
                        key={c.id}
                        onClick={() => c.type === 'agroforestry_parcel' && onSelectParcelCitation?.(c.id)}
                        className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-emerald-300 border border-slate-700 cursor-pointer transition-colors"
                      >
                        <span>[{i + 1}] {c.title}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Feedback */}
              {m.role === 'assistant' && m.id !== 'welcome' && (
                <div className="mt-2 flex items-center justify-end space-x-1.5 pt-1 text-slate-500">
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
      </div>
    </aside>
  );
};
