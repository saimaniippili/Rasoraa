import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { PaperBookEngine } from './paperBookEngine';
import { generateRasoraaTextures } from './rasoraaTextures';

interface ThreeBookViewerProps {
  onSelectDish?: (dishName: string) => void;
}

export const ThreeBookViewer: React.FC<ThreeBookViewerProps> = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<PaperBookEngine | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // 3-Phase Realistic Paper Sound via Web Audio API
  const playPaperTurnSound = () => {
    if (typeof window === 'undefined') return;
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

  // Initialize Three.js Book Engine
  useEffect(() => {
    let isMounted = true;
    let engine: PaperBookEngine | null = null;

    async function initBook() {
      if (!stageRef.current) return;
      try {
        setIsLoading(true);
        setLoadError(null);

        // Generate 12 high-resolution, high-contrast canvas textures
        const textures = await generateRasoraaTextures();

        if (!isMounted || !stageRef.current) {
          textures.forEach((t) => t.dispose());
          return;
        }

        engine = new PaperBookEngine(
          stageRef.current,
          textures,
          undefined,
          () => {
            playPaperTurnSound();
          },
          (zoom) => {
            setZoomLevel(zoom);
          }
        );

        bookRef.current = engine;
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
      if (engine) {
        engine.dispose();
      }
      bookRef.current = null;
    };
  }, []);

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (!bookRef.current) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        bookRef.current.turn(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        bookRef.current.turn(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        bookRef.current.reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full select-none">
      {/* ─── Ambient Glow Backdrop ─── */}
      <div className="absolute inset-0 bg-radial from-[#123121]/30 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />

      {/* ─── Pure 3D Folio Stage (Three.js WebGL) ─── */}
      <div className="relative max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4">
        {/* Loading Overlay */}
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

        {/* 3D Book Stage - Proportionately sized, permits natural page scrolling */}
        <div
          ref={stageRef}
          className="relative w-full h-[400px] xs:h-[440px] sm:h-[480px] md:h-[520px] lg:h-[560px] xl:h-[600px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/[0.06] bg-gradient-to-b from-[#0D1812]/40 via-[#070B08] to-[#0A120D] shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
          style={{ touchAction: 'pan-y' }}
        >
          {/* Subtle Zoom Status Badge & Tap-to-Reset */}
          <AnimatePresence>
            {zoomLevel > 1.15 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                onClick={(e) => {
                  e.stopPropagation();
                  bookRef.current?.resetZoom();
                }}
                className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#08150D]/90 backdrop-blur-md border border-[#C5A880]/50 text-[#E3C99B] text-xs font-mono tracking-wider shadow-xl hover:bg-[#0D2417] transition-all active:scale-95 cursor-pointer select-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                <span>{zoomLevel.toFixed(1)}× Zoom</span>
                <span className="text-[10px] text-neutral-400 pl-1 border-l border-white/20">
                  Tap to reset
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
