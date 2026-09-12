import React, { useState, useEffect } from 'react';
import { Calendar, Play, Pause, SplitSquareVertical } from 'lucide-react';

interface TemporalScrubberProps {
  currentYear: number;
  onYearChange: (year: number) => void;
  isSplitCompare: boolean;
  onToggleSplitCompare: () => void;
}

const EPOCHS = [
  { year: 2015, label: '2015', tag: 'Historic' },
  { year: 2018, label: '2018', tag: 'Pre-QuES T1' },
  { year: 2020, label: '2020', tag: '🇪🇺 EUDR Cutoff', highlight: true },
  { year: 2022, label: '2022', tag: 'Monitoring' },
  { year: 2024, label: '2024', tag: 'Present T2' },
  { year: 2030, label: '2030', tag: 'Scenario' },
];

export const TemporalScrubber: React.FC<TemporalScrubberProps> = ({
  currentYear,
  onYearChange,
  isSplitCompare,
  onToggleSplitCompare,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const idx = EPOCHS.findIndex((e) => e.year === currentYear);
      const nextIdx = (idx + 1) % EPOCHS.length;
      onYearChange(EPOCHS[nextIdx].year);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, currentYear, onYearChange]);

  return (
    <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4 pointer-events-auto">
      <div className="bg-slate-950/85 backdrop-blur-md border border-slate-800/90 rounded-xl px-4 py-2.5 shadow-2xl flex items-center justify-between space-x-4 text-xs">
        {/* Play / Pause button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 transition-colors"
            title={isPlaying ? 'Pause Timeline' : 'Play Timeline'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <div className="flex items-center space-x-1 text-slate-400 font-mono text-[11px]">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white font-bold">{currentYear}</span>
          </div>
        </div>

        {/* Timeline track with epoch points */}
        <div className="flex-1 flex items-center justify-between relative px-2">
          <div className="absolute left-2 right-2 h-1 bg-slate-800 rounded-full" />
          {EPOCHS.map((epoch) => {
            const isActive = currentYear === epoch.year;
            return (
              <button
                key={epoch.year}
                onClick={() => onYearChange(epoch.year)}
                className="relative z-10 flex flex-col items-center group focus:outline-none transition-all"
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                    isActive
                      ? 'bg-emerald-400 border-white scale-125 shadow-lg shadow-emerald-500/50'
                      : epoch.highlight
                      ? 'bg-amber-500 border-amber-300'
                      : 'bg-slate-800 border-slate-600 group-hover:border-slate-400'
                  }`}
                />
                <span
                  className={`text-[10px] mt-1 font-mono transition-colors ${
                    isActive
                      ? 'text-emerald-400 font-bold'
                      : epoch.highlight
                      ? 'text-amber-400 font-semibold'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {epoch.label}
                </span>
                <span className="hidden sm:block text-[8px] text-slate-400 tracking-tight">
                  {epoch.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Split Compare Button */}
        <button
          onClick={onToggleSplitCompare}
          className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
            isSplitCompare
              ? 'bg-purple-600/30 border-purple-500/60 text-purple-300 shadow-sm'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
          title="Split Curtain: Compare Pre-2020 vs Present"
        >
          <SplitSquareVertical className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{isSplitCompare ? 'Split Active' : 'Compare 2020'}</span>
        </button>
      </div>
    </div>
  );
};
