import React from 'react';
import { BookOpen, Bookmark, ChevronLeft, ChevronRight, Grid, Search, Volume2, VolumeX } from 'lucide-react';

interface RasoraaControlsProps {
  currentSpread: number;
  totalSpreads: number;
  isTurning: boolean;
  menuViewMode: 'book' | 'grid';
  isAudioMuted: boolean;
  searchQuery: string;
  onTurnToSpread: (spread: number) => void;
  onPrevSpread: () => void;
  onNextSpread: () => void;
  onToggleViewMode: (mode: 'book' | 'grid') => void;
  onToggleAudio: () => void;
  onSearchChange: (query: string) => void;
}

const TABS = [
  { spread: 0, label: 'Cover & Index', pages: 'Prologue' },
  { spread: 1, label: 'Starters & Wok', pages: 'pp. 2–3' },
  { spread: 2, label: 'Curries & Dosas', pages: 'pp. 4–5' },
  { spread: 3, label: 'Biryani & Pizzas', pages: 'pp. 6–7' },
  { spread: 4, label: 'Drinks & Desserts', pages: 'pp. 8–9' },
];

export const RasoraaControls: React.FC<RasoraaControlsProps> = ({
  currentSpread,
  totalSpreads,
  isTurning,
  menuViewMode,
  isAudioMuted,
  searchQuery,
  onTurnToSpread,
  onPrevSpread,
  onNextSpread,
  onToggleViewMode,
  onToggleAudio,
  onSearchChange,
}) => {
  return (
    <div className="mb-8 space-y-4 max-w-5xl mx-auto">
      {/* Chapter Ribbon Bookmark Tabs */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
        {TABS.map((tab) => {
          const isActive = currentSpread === tab.spread && menuViewMode === 'book';
          return (
            <button
              key={tab.spread}
              type="button"
              disabled={isTurning}
              onClick={() => {
                onToggleViewMode('book');
                onTurnToSpread(tab.spread);
              }}
              className={`relative px-3.5 sm:px-5 py-2.5 rounded-t-xl text-xs font-sans tracking-wider uppercase transition-all duration-300 shrink-0 border-t border-x ${
                isActive
                  ? 'bg-[#09251A] text-[#C5A880] border-[#C5A880]/60 shadow-[0_-4px_16px_rgba(197,168,128,0.2)] -translate-y-1'
                  : 'bg-white/[0.02] text-neutral-400 border-white/10 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-center gap-1.5 font-medium">
                <Bookmark size={11} className={isActive ? 'text-[#C5A880] fill-[#C5A880]' : 'text-neutral-500'} />
                <span>{tab.label}</span>
              </div>
              <span className="text-[10px] block font-mono text-neutral-400 font-normal lowercase">
                {tab.pages}
              </span>
              {isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#09251A]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Utility Toolbar: Search, Audio Toggle, View Mode */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-2">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[260px] max-w-md">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search dish (e.g. Malai Paneer, Dosa, Biryani)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 text-xs font-sans tracking-wide focus:outline-none focus:border-[#C5A880] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* View Switcher & Audio */}
        <div className="flex items-center gap-2">
          {/* Quick Prev/Next Spreads in Toolbar */}
          {menuViewMode === 'book' && (
            <div className="inline-flex items-center gap-1 mr-1">
              <button
                type="button"
                onClick={onPrevSpread}
                disabled={currentSpread === 0 || isTurning}
                title="Previous Spread"
                className="p-2 rounded-full border border-white/10 bg-white/[0.03] text-neutral-300 hover:text-white hover:border-[#C5A880]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-[10px] font-mono text-neutral-400 px-1">
                {currentSpread + 1}/{totalSpreads}
              </span>
              <button
                type="button"
                onClick={onNextSpread}
                disabled={currentSpread >= totalSpreads - 1 || isTurning}
                title="Next Spread"
                className="p-2 rounded-full border border-white/10 bg-white/[0.03] text-neutral-300 hover:text-white hover:border-[#C5A880]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={onToggleAudio}
            title={isAudioMuted ? 'Turn Sound On' : 'Mute Page Sound'}
            className="p-2.5 rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white hover:border-white/30 transition-all text-xs"
          >
            {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[#C5A880]" />}
          </button>

          <div className="inline-flex rounded-full p-1 bg-white/[0.04] border border-white/10">
            <button
              type="button"
              onClick={() => onToggleViewMode('book')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all ${
                menuViewMode === 'book'
                  ? 'bg-[#183620] text-[#FBF9F5] border border-[#C5A880]/50 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <BookOpen size={12} className={menuViewMode === 'book' ? 'text-[#C5A880]' : ''} />
              <span>Folio Book</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all ${
                menuViewMode === 'grid'
                  ? 'bg-[#183620] text-[#FBF9F5] border border-[#C5A880]/50 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Grid size={12} className={menuViewMode === 'grid' ? 'text-[#C5A880]' : ''} />
              <span>Catalog</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
