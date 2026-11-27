import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { PaperBookEngine } from './paperBookEngine';
import { generateRasoraaTextures } from './rasoraaTextures';

interface ThreeBookViewerProps {
  onSelectDish?: (dishName: string) => void;
}

const CHAPTER_PAGES = [
  { label: 'Cover', sheet: 0, desc: 'The Imperial Insignia' },
  { label: 'Index', sheet: 1, desc: 'Freshness Decree & Tandoor' },
  { label: 'Wok & Sizzlers', sheet: 2, desc: 'Oriental Alchemy' },
  { label: 'Awadhi Handis', sheet: 3, desc: '16-Hour Simmer' },
  { label: 'South Heritage', sheet: 4, desc: 'Bilona Ghee Roast' },
  { label: 'Biryani & Breads', sheet: 5, desc: 'Parda Earthenware' },
  { label: 'Italian Stone', sheet: 5, desc: 'Neapolitan Pizzas' },
  { label: 'Coolers & Shakes', sheet: 6, desc: 'Botanical Elixirs' },
  { label: 'Desserts & Epilogue', sheet: 6, desc: 'Royal Confections' },
];

export const ThreeBookViewer: React.FC<ThreeBookViewerProps> = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<PaperBookEngine | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(6);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 3-Phase Realistic Paper Sound via Web Audio API
  const playPaperTurnSound = () => {
    if (isMuted || typeof window === 'undefined') return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;

      // Phase 1: High-frequency paper friction scrape (0 - 80ms)
      const liftBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
      const liftData = liftBuffer.getChannelData(0);
      for (let i = 0; i < liftData.length; i++) {
        const decay = Math.exp(-i / (liftData.length * 0.3));
        liftData[i] = (Math.random() * 2 - 1) * decay * 0.09;
      }
      const liftNoise = ctx.createBufferSource();
      liftNoise.buffer = liftBuffer;
      const liftFilter = ctx.createBiquadFilter();
      liftFilter.type = 'highpass';
      liftFilter.frequency.setValueAtTime(2600, now);
      liftNoise.connect(liftFilter);
      liftFilter.connect(ctx.destination);
      liftNoise.start(now);

      // Phase 2: Atmospheric air swoosh (50ms - 260ms)
      const swooshBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.22, ctx.sampleRate);
      const swooshData = swooshBuffer.getChannelData(0);
      for (let i = 0; i < swooshData.length; i++) {
        const envelope = Math.sin((i / swooshData.length) * Math.PI);
        swooshData[i] = (Math.random() * 2 - 1) * envelope * 0.1;
      }
      const swooshNoise = ctx.createBufferSource();
      swooshNoise.buffer = swooshBuffer;
      const swooshFilter = ctx.createBiquadFilter();
      swooshFilter.type = 'bandpass';
      swooshFilter.frequency.setValueAtTime(1200, now + 0.04);
      swooshFilter.frequency.exponentialRampToValueAtTime(700, now + 0.24);
      swooshFilter.Q.value = 1.3;
      swooshNoise.connect(swooshFilter);
      swooshFilter.connect(ctx.destination);
      swooshNoise.start(now + 0.04);

      // Phase 3: Soft low-frequency pat as leaf lands (220ms - 320ms)
      const landingOsc = ctx.createOscillator();
      const landingGain = ctx.createGain();
      landingOsc.type = 'triangle';
      landingOsc.frequency.setValueAtTime(95, now + 0.2);
      landingOsc.frequency.exponentialRampToValueAtTime(38, now + 0.3);
      landingGain.gain.setValueAtTime(0.045, now + 0.2);
      landingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      landingOsc.connect(landingGain);
      landingGain.connect(ctx.destination);
      landingOsc.start(now + 0.2);
      landingOsc.stop(now + 0.32);
    } catch (_) {}
  };

  // Autoplay handler
  useEffect(() => {
    if (!isAutoPlaying || !bookRef.current) {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      return;
    }

    const runAuto = () => {
      if (!bookRef.current) return;
      if (bookRef.current.page >= bookRef.current.count) {
        bookRef.current.reset();
      } else {
        bookRef.current.turn(1);
      }
      autoPlayTimerRef.current = setTimeout(runAuto, 2800);
    };

    autoPlayTimerRef.current = setTimeout(runAuto, 2800);

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying]);

  // Initialize Three.js Book Engine
  useEffect(() => {
    let isMounted = true;
    let engine: PaperBookEngine | null = null;

    async function initBook() {
      if (!stageRef.current) return;
      try {
        setIsLoading(true);
        setLoadError(null);

        // Generate 12 high-resolution canvas textures
        const textures = await generateRasoraaTextures();

        if (!isMounted || !stageRef.current) {
          textures.forEach((t) => t.dispose());
          return;
        }

        engine = new PaperBookEngine(
          stageRef.current,
          textures,
          (page, count) => {
            if (isMounted) {
              setCurrentPage(page);
              setTotalPages(count);
            }
          },
          () => {
            playPaperTurnSound();
          }
        );

        engine.onManual = () => {
          setIsAutoPlaying(false);
        };

        bookRef.current = engine;
        setCurrentPage(engine.page);
        setTotalPages(engine.count);
        setIsLoading(false);
      } catch (err: any) {
        console.error('Failed to initialize Three.js Book Engine:', err);
        if (isMounted) {
          setLoadError(err?.message || 'WebGL initialization error');
          setIsLoading(false);
        }
      }
    }

    initBook();

    return () => {
      isMounted = false;
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      if (engine) {
        engine.dispose();
      }
      bookRef.current = null;
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (!bookRef.current) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setIsAutoPlaying(false);
        bookRef.current.turn(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIsAutoPlaying(false);
        bookRef.current.turn(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setIsAutoPlaying(false);
        bookRef.current.reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Format Page Label
  const getPageLabel = () => {
    if (currentPage === 0) return 'Front Cover · Royal Insignia';
    if (currentPage === totalPages) return 'Back Cover · Epilogue';
    const leftP = currentPage * 2;
    const rightP = currentPage * 2 + 1;
    return `Pages 0${leftP} — 0${rightP}`;
  };

  const getChapterTitle = () => {
    switch (currentPage) {
      case 0:
        return 'The Imperial Dining Folio';
      case 1:
        return 'Culinary Decree & Tandoori Hearth';
      case 2:
        return 'Indo-Chinese Wok & Awadhi Handis';
      case 3:
        return 'South Heritage & Dum Biryani';
      case 4:
        return 'Stone Hearth Pizzas & Coolers';
      case 5:
        return 'Royal Confections & Privileges';
      case 6:
        return 'Patron Guild & Epilogue';
      default:
        return 'Rasoraa Haute Dining';
    }
  };

  return (
    <div className="relative w-full select-none">
      {/* ─── Ambient Glow Backdrop ─── */}
      <div className="absolute inset-0 bg-radial from-[#123121]/30 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />

      {/* ─── Top Master Control Bar ─── */}
      <div className="max-w-5xl mx-auto px-4 mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left Chapter Indicator */}
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="font-serif text-sm sm:text-base text-neutral-200 tracking-wider">
            {getChapterTitle()}
          </span>
          <span className="text-[11px] font-mono text-[#C5A880] px-2 py-0.5 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10">
            {getPageLabel()}
          </span>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Autoplay Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 text-[11px] font-sans tracking-wider uppercase ${
              isAutoPlaying
                ? 'border-[#C5A880] bg-[#162E1D] text-[#C5A880] shadow-[0_0_12px_rgba(197,168,128,0.3)]'
                : 'border-white/10 hover:border-[#C5A880]/60 bg-white/[0.03] text-neutral-300 hover:text-white'
            }`}
            title="Autoplay Folio"
          >
            {isAutoPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span className="hidden sm:inline">{isAutoPlaying ? 'Pause' : 'Autoplay'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-full border transition-all ${
              !isMuted
                ? 'border-[#C5A880]/40 text-[#C5A880] bg-[#162E1D]/80'
                : 'border-white/10 text-neutral-400 bg-white/[0.03]'
            }`}
            title={isMuted ? 'Unmute Acoustics' : 'Mute Acoustics'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          {/* Reset to Cover */}
          <button
            onClick={() => {
              setIsAutoPlaying(false);
              bookRef.current?.reset();
            }}
            className="p-2 rounded-full border border-white/10 hover:border-[#C5A880]/60 bg-white/[0.03] text-neutral-300 hover:text-white transition-all"
            title="Reset to Cover"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ─── 3D Folio Stage (Three.js WebGL) ─── */}
      <div className="relative max-w-6xl mx-auto px-2 sm:px-4">
        {/* Loading Spinner */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#070B08]/90 backdrop-blur-md rounded-2xl border border-white/10"
            >
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-2 border-[#C5A880]/20" />
                <div className="absolute inset-0 rounded-full border-2 border-[#C5A880] border-t-transparent animate-spin" />
                <BookOpen size={24} className="absolute inset-0 m-auto text-[#C5A880]" />
              </div>
              <p className="font-serif text-lg text-neutral-200 tracking-widest mb-1">
                Illuminating the 3D Dining Folio
              </p>
              <p className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#C5A880]">
                Crafting Handcrafted Leather &amp; Parchment Textures
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WebGL Error fallback */}
        {loadError && (
          <div className="p-8 text-center rounded-2xl border border-red-500/30 bg-red-950/20 text-neutral-300">
            <p className="text-red-400 font-serif text-lg mb-2">Notice on 3D Folio Rendering</p>
            <p className="text-sm max-w-md mx-auto">{loadError}</p>
          </div>
        )}

        {/* Canvas Host Stage */}
        <div
          ref={stageRef}
          className="relative w-full h-[480px] xs:h-[540px] sm:h-[620px] md:h-[680px] lg:h-[740px] xl:h-[780px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/[0.06] bg-gradient-to-b from-[#0D1812]/50 via-[#070B08] to-[#0A120D] shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
          style={{ touchAction: 'none' }}
        />

        {/* Floating Desktop Navigation Arrows on Sides */}
        <button
          onClick={() => {
            setIsAutoPlaying(false);
            bookRef.current?.turn(-1);
          }}
          disabled={currentPage === 0}
          className={`hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border items-center justify-center transition-all z-20 ${
            currentPage === 0
              ? 'opacity-20 border-white/5 cursor-not-allowed text-neutral-500'
              : 'border-[#C5A880]/40 bg-[#0D2214]/80 hover:bg-[#162E1D] hover:border-[#C5A880] text-[#C5A880] hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.7)]'
          }`}
          aria-label="Previous Page"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => {
            setIsAutoPlaying(false);
            bookRef.current?.turn(1);
          }}
          disabled={currentPage === totalPages}
          className={`hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border items-center justify-center transition-all z-20 ${
            currentPage === totalPages
              ? 'opacity-20 border-white/5 cursor-not-allowed text-neutral-500'
              : 'border-[#C5A880]/40 bg-[#0D2214]/80 hover:bg-[#162E1D] hover:border-[#C5A880] text-[#C5A880] hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.7)]'
          }`}
          aria-label="Next Page"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* ─── Mobile-Optimized Bottom Controls Bar ─── */}
      <div className="max-w-5xl mx-auto px-4 mt-4 sm:mt-6">
        {/* Interaction Hint Pill */}
        <div className="text-center mb-3">
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-sans tracking-[0.2em] uppercase text-neutral-400 bg-white/[0.02] border border-white/5 px-3.5 py-1 rounded-full">
            <Sparkles size={11} className="text-[#C5A880]" />
            <span>Drag page corners or swipe to flip realistically</span>
          </span>
        </div>

        {/* Mobile Navigation Thumb Bar */}
        <div className="flex md:hidden items-center justify-between gap-3 bg-[#0D1812]/80 border border-[#C5A880]/20 rounded-full px-3 py-2 backdrop-blur-xl">
          <button
            onClick={() => {
              setIsAutoPlaying(false);
              bookRef.current?.turn(-1);
            }}
            disabled={currentPage === 0}
            className={`flex-1 py-2.5 px-4 rounded-full border flex items-center justify-center gap-2 text-xs font-sans tracking-widest uppercase transition-all ${
              currentPage === 0
                ? 'opacity-30 border-white/5 text-neutral-600'
                : 'border-[#C5A880]/40 bg-[#162E1D] text-[#C5A880] active:scale-95 shadow-[0_2px_10px_rgba(0,0,0,0.5)]'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <span className="font-mono text-xs text-[#C5A880] shrink-0 px-2 font-medium">
            {currentPage === 0 ? 'Cover' : `${currentPage} / ${totalPages}`}
          </span>

          <button
            onClick={() => {
              setIsAutoPlaying(false);
              bookRef.current?.turn(1);
            }}
            disabled={currentPage === totalPages}
            className={`flex-1 py-2.5 px-4 rounded-full border flex items-center justify-center gap-2 text-xs font-sans tracking-widest uppercase transition-all ${
              currentPage === totalPages
                ? 'opacity-30 border-white/5 text-neutral-600'
                : 'border-[#C5A880]/60 bg-gradient-to-r from-[#162E1D] to-[#0D2214] text-white active:scale-95 shadow-[0_2px_10px_rgba(0,0,0,0.5)]'
            }`}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Horizontal Quick-Jump Chapter Strip */}
        <div className="mt-3 sm:mt-4 overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center justify-start sm:justify-center gap-2 min-w-max px-2">
            {CHAPTER_PAGES.map((ch, idx) => {
              const isActive =
                (idx === 0 && currentPage === 0) ||
                (idx > 0 && Math.floor((currentPage * 9) / totalPages) === idx);
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    const target = Math.round((idx / (CHAPTER_PAGES.length - 1)) * totalPages);
                    bookRef.current?.goToPage(target);
                  }}
                  className={`px-3 py-1.5 rounded-full border text-[11px] font-sans tracking-wider uppercase transition-all shrink-0 ${
                    isActive
                      ? 'border-[#C5A880] bg-[#162E1D] text-[#C5A880] shadow-[0_0_12px_rgba(197,168,128,0.25)]'
                      : 'border-white/10 hover:border-[#C5A880]/40 bg-white/[0.02] text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {ch.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
