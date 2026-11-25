import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MenuItem, OFFICIAL_DISHES } from '../../data/menuData';
import { RasoraaCover } from './RasoraaCover';
import { RasoraaSpine } from './RasoraaSpine';
import { RasoraaPage } from './RasoraaPage';
import { RasoraaControls } from './RasoraaControls';
import './rasoraa-book.css';

interface RasoraaBookProps {
  onSelectDish: (dish: MenuItem) => void;
}

export const RasoraaBook: React.FC<RasoraaBookProps> = ({ onSelectDish }) => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [targetSpread, setTargetSpread] = useState(0);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev'>('next');
  const [menuViewMode, setMenuViewMode] = useState<'book' | 'grid'>('book');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [mobilePage, setMobilePage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCatalogCategory, setActiveCatalogCategory] = useState<string>('All Items');

  // Pre-filter dishes for book chapters
  const tandooriDishes = OFFICIAL_DISHES.filter((d) => d.category === 'Tandoori Starters');
  const chineseDishes = OFFICIAL_DISHES.filter((d) => d.category === 'Chinese & Sizzlers');
  const curryDishes = OFFICIAL_DISHES.filter((d) => d.category === 'Indian Curries');
  const southIndianDishes = OFFICIAL_DISHES.filter((d) => d.category === 'South Indian & Dosas');
  const riceBreadsDishes = OFFICIAL_DISHES.filter((d) => d.category === 'Rice, Biryani & Breads');
  const continentalDishes = OFFICIAL_DISHES.filter((d) => d.category === 'Continental, Pastas & Pizzas');
  const mocktailDishes = OFFICIAL_DISHES.filter((d) => d.category === 'Mocktails & Shakes');
  const dessertDishes = OFFICIAL_DISHES.filter((d) => d.category === 'Desserts');

  // Realistic 3-Phase Paper Physics Audio (Friction scrape -> Air swoosh -> Soft landing)
  const playRealisticPaperTurnSound = () => {
    if (isAudioMuted || typeof window === 'undefined') return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Phase 1: High-frequency paper friction scrape as leaf peels off (0 - 90ms)
      const liftBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
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

      // Phase 2: Atmospheric swoosh as page arcs through 3D air (60ms - 280ms)
      const swooshBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.25, ctx.sampleRate);
      const swooshData = swooshBuffer.getChannelData(0);
      for (let i = 0; i < swooshData.length; i++) {
        const envelope = Math.sin((i / swooshData.length) * Math.PI);
        swooshData[i] = (Math.random() * 2 - 1) * envelope * 0.11;
      }
      const swooshNoise = ctx.createBufferSource();
      swooshNoise.buffer = swooshBuffer;
      const swooshFilter = ctx.createBiquadFilter();
      swooshFilter.type = 'bandpass';
      swooshFilter.frequency.setValueAtTime(1200, now + 0.05);
      swooshFilter.frequency.exponentialRampToValueAtTime(700, now + 0.26);
      swooshFilter.Q.value = 1.2;
      swooshNoise.connect(swooshFilter);
      swooshFilter.connect(ctx.destination);
      swooshNoise.start(now + 0.05);

      // Phase 3: Soft low-frequency pat as paper settles on opposite page (240ms - 340ms)
      const landingOsc = ctx.createOscillator();
      const landingGain = ctx.createGain();
      landingOsc.type = 'sine';
      landingOsc.frequency.setValueAtTime(140, now + 0.24);
      landingOsc.frequency.exponentialRampToValueAtTime(50, now + 0.34);
      landingGain.gain.setValueAtTime(0.035, now + 0.24);
      landingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
      landingOsc.connect(landingGain);
      landingGain.connect(ctx.destination);
      landingOsc.start(now + 0.24);
      landingOsc.stop(now + 0.35);
    } catch {
      // Audio safety
    }
  };

  const turnToSpread = (newSpread: number) => {
    if (newSpread < 0 || newSpread > 4 || newSpread === currentSpread || isTurning) return;
    const dir = newSpread > currentSpread ? 'next' : 'prev';
    setTurnDirection(dir);
    setTargetSpread(newSpread);
    setIsTurning(true);
    setMobilePage(newSpread * 2);
    playRealisticPaperTurnSound();
  };

  const handleNextSpread = () => {
    if (currentSpread < 4 && !isTurning) {
      turnToSpread(currentSpread + 1);
    }
  };

  const handlePrevSpread = () => {
    if (currentSpread > 0 && !isTurning) {
      turnToSpread(currentSpread - 1);
    }
  };

  // Auto-flip book spread when searching for a dish
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();
    const findDish = (list: MenuItem[]) =>
      list.some(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          d.description.toLowerCase().includes(query)
      );
    if (findDish(tandooriDishes) || findDish(chineseDishes)) {
      if (currentSpread !== 1) turnToSpread(1);
    } else if (findDish(curryDishes) || findDish(southIndianDishes)) {
      if (currentSpread !== 2) turnToSpread(2);
    } else if (findDish(riceBreadsDishes) || findDish(continentalDishes)) {
      if (currentSpread !== 3) turnToSpread(3);
    } else if (findDish(mocktailDishes) || findDish(dessertDishes)) {
      if (currentSpread !== 4) turnToSpread(4);
    }
  }, [searchQuery]);

  // Catalog filtered dishes
  const filteredDishes = OFFICIAL_DISHES.filter((d) => {
    const matchesCategory =
      activeCatalogCategory === 'All Items' ? true : d.category === activeCatalogCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const CATALOG_CATEGORIES = [
    'All Items',
    'Tandoori Starters',
    'Indian Curries',
    'South Indian & Dosas',
    'Rice, Biryani & Breads',
    'Chinese & Sizzlers',
    'Continental, Pastas & Pizzas',
    'Mocktails & Shakes',
    'Desserts',
  ];

  return (
    <div className="w-full">
      {/* Folio Controls (Bookmark Ribbon Tabs, Search, View Switcher) */}
      <RasoraaControls
        currentSpread={currentSpread}
        totalSpreads={5}
        isTurning={isTurning}
        menuViewMode={menuViewMode}
        isAudioMuted={isAudioMuted}
        searchQuery={searchQuery}
        onTurnToSpread={turnToSpread}
        onPrevSpread={handlePrevSpread}
        onNextSpread={handleNextSpread}
        onToggleViewMode={setMenuViewMode}
        onToggleAudio={() => setIsAudioMuted(!isAudioMuted)}
        onSearchChange={setSearchQuery}
      />

      {/* ══════════════════════════════════════════════════════════════════
          MODE 1: THE REALISTIC 3D PHYSICAL FOLIO BOOK
         ══════════════════════════════════════════════════════════════════ */}
      {menuViewMode === 'book' && (
        <RasoraaCover currentSpread={currentSpread}>
          {/* Side Turn Buttons */}
          {currentSpread > 0 && (
            <button
              type="button"
              disabled={isTurning}
              onClick={handlePrevSpread}
              aria-label="Previous Page"
              className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#09251A] border border-[#C5A880]/60 text-[#C5A880] hover:text-white hover:bg-[#0E3525] hover:scale-110 disabled:opacity-40 flex items-center justify-center shadow-2xl transition-all"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {currentSpread < 4 && (
            <button
              type="button"
              disabled={isTurning}
              onClick={handleNextSpread}
              aria-label="Next Page"
              className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#09251A] border border-[#C5A880]/60 text-[#C5A880] hover:text-white hover:bg-[#0E3525] hover:scale-110 disabled:opacity-40 flex items-center justify-center shadow-2xl transition-all"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* ─────────────────────────────────────────────────────────────
              DESKTOP/TABLET: 3D TWO-PAGE OPEN BOOK CANVAS
             ───────────────────────────────────────────────────────────── */}
          <div className="hidden md:block relative min-h-[660px] rounded-xl overflow-hidden border border-[#C5A880]/30 shadow-2xl book-stage-perspective">
            {/* Spine Recessed Shadow & Hanging Ribbon */}
            <RasoraaSpine />

            {/* Resting Spread (Not Turning) */}
            {!isTurning && (
              <div className="grid grid-cols-2 h-full min-h-[660px] relative">
                {/* Left Page */}
                <div className="relative h-full border-r border-[#C5A880]/20">
                  <RasoraaPage
                    side="left"
                    spreadIndex={currentSpread}
                    isInteractive={true}
                    onTurnToSpread={turnToSpread}
                    onSelectDish={onSelectDish}
                    tandooriDishes={tandooriDishes}
                    chineseDishes={chineseDishes}
                    curryDishes={curryDishes}
                    southIndianDishes={southIndianDishes}
                    riceBreadsDishes={riceBreadsDishes}
                    continentalDishes={continentalDishes}
                    mocktailDishes={mocktailDishes}
                    dessertDishes={dessertDishes}
                  />

                  {/* Interactive Dog-Ear Corner Curl (Turn Back) */}
                  {currentSpread > 0 && (
                    <div
                      onClick={handlePrevSpread}
                      className="group/peelLeft absolute bottom-0 left-0 w-16 h-16 cursor-pointer z-30"
                      title="Click to turn back"
                    >
                      <div className="absolute bottom-0 left-0 w-10 h-10 bg-black/35 blur-[3px] transition-all duration-300 group-hover/peelLeft:w-16 group-hover/peelLeft:h-16 group-hover/peelLeft:blur-[5px]" />
                      <div className="absolute bottom-0 left-0 w-10 h-10 dog-ear-curl-left group-hover/peelLeft:w-16 group-hover/peelLeft:h-16" />
                      <span className="absolute bottom-1 left-1 text-[8px] font-mono text-[#8C7A62] tracking-tighter opacity-70 group-hover/peelLeft:opacity-100 transition-opacity">
                        ⬅ Back
                      </span>
                    </div>
                  )}
                </div>

                {/* Right Page */}
                <div className="relative h-full">
                  <RasoraaPage
                    side="right"
                    spreadIndex={currentSpread}
                    isInteractive={true}
                    onTurnToSpread={turnToSpread}
                    onSelectDish={onSelectDish}
                    tandooriDishes={tandooriDishes}
                    chineseDishes={chineseDishes}
                    curryDishes={curryDishes}
                    southIndianDishes={southIndianDishes}
                    riceBreadsDishes={riceBreadsDishes}
                    continentalDishes={continentalDishes}
                    mocktailDishes={mocktailDishes}
                    dessertDishes={dessertDishes}
                  />

                  {/* Interactive Dog-Ear Corner Curl (Turn Forward) */}
                  {currentSpread < 4 && (
                    <div
                      onClick={handleNextSpread}
                      className="group/peel absolute bottom-0 right-0 w-16 h-16 cursor-pointer z-30"
                      title="Click to turn page"
                    >
                      <div className="absolute bottom-0 right-0 w-10 h-10 bg-black/35 blur-[3px] transition-all duration-300 group-hover/peel:w-16 group-hover/peel:h-16 group-hover/peel:blur-[5px]" />
                      <div className="absolute bottom-0 right-0 w-10 h-10 dog-ear-curl-right group-hover/peel:w-16 group-hover/peel:h-16" />
                      <span className="absolute bottom-1 right-1 text-[8px] font-mono text-[#8C7A62] tracking-tighter opacity-70 group-hover/peel:opacity-100 transition-opacity">
                        Turn ➔
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Turning NEXT: Right Leaf Flips to Left */}
            {isTurning && turnDirection === 'next' && (
              <div className="relative w-full h-full min-h-[660px]">
                {/* Stationary Left Page (Current Spread) */}
                <div className="absolute top-0 left-0 w-1/2 h-full border-r border-[#C5A880]/20 z-10">
                  <RasoraaPage
                    side="left"
                    spreadIndex={currentSpread}
                    isInteractive={false}
                    tandooriDishes={tandooriDishes}
                    chineseDishes={chineseDishes}
                    curryDishes={curryDishes}
                    southIndianDishes={southIndianDishes}
                    riceBreadsDishes={riceBreadsDishes}
                    continentalDishes={continentalDishes}
                    mocktailDishes={mocktailDishes}
                    dessertDishes={dessertDishes}
                  />
                </div>

                {/* Stationary Right Page (Target Spread Unveiling Underneath) */}
                <div className="absolute top-0 right-0 w-1/2 h-full z-10">
                  <RasoraaPage
                    side="right"
                    spreadIndex={targetSpread}
                    isInteractive={false}
                    tandooriDishes={tandooriDishes}
                    chineseDishes={chineseDishes}
                    curryDishes={curryDishes}
                    southIndianDishes={southIndianDishes}
                    riceBreadsDishes={riceBreadsDishes}
                    continentalDishes={continentalDishes}
                    mocktailDishes={mocktailDishes}
                    dessertDishes={dessertDishes}
                  />
                </div>

                {/* The Physical Turning Leaf (Rotates 0deg -> -180deg around Spine) */}
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  transition={{ duration: 0.75, ease: [0.32, 0, 0.24, 1] }}
                  onAnimationComplete={() => {
                    setCurrentSpread(targetSpread);
                    setIsTurning(false);
                  }}
                  className="absolute top-0 right-0 w-1/2 h-full z-40"
                  style={{
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front Face: Current Right Page */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-r-xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg)',
                      boxShadow: '-8px 0 24px rgba(0,0,0,0.45)',
                    }}
                  >
                    <RasoraaPage
                      side="right"
                      spreadIndex={currentSpread}
                      isInteractive={false}
                      tandooriDishes={tandooriDishes}
                      chineseDishes={chineseDishes}
                      curryDishes={curryDishes}
                      southIndianDishes={southIndianDishes}
                      riceBreadsDishes={riceBreadsDishes}
                      continentalDishes={continentalDishes}
                      mocktailDishes={mocktailDishes}
                      dessertDishes={dessertDishes}
                    />
                    {/* Moving Paper Surface Shadow & Highlight Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-l from-black/25 via-white/[0.08] to-black/15 pointer-events-none" />
                  </div>

                  {/* Back Face: Target Left Page (Settles onto Left Stack) */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-l-xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      boxShadow: '8px 0 24px rgba(0,0,0,0.45)',
                    }}
                  >
                    <RasoraaPage
                      side="left"
                      spreadIndex={targetSpread}
                      isInteractive={false}
                      tandooriDishes={tandooriDishes}
                      chineseDishes={chineseDishes}
                      curryDishes={curryDishes}
                      southIndianDishes={southIndianDishes}
                      riceBreadsDishes={riceBreadsDishes}
                      continentalDishes={continentalDishes}
                      mocktailDishes={mocktailDishes}
                      dessertDishes={dessertDishes}
                    />
                    {/* Moving Paper Surface Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-white/[0.08] to-black/15 pointer-events-none" />
                  </div>
                </motion.div>
              </div>
            )}

            {/* Turning PREV: Left Leaf Flips to Right */}
            {isTurning && turnDirection === 'prev' && (
              <div className="relative w-full h-full min-h-[660px]">
                {/* Stationary Right Page (Current Spread) */}
                <div className="absolute top-0 right-0 w-1/2 h-full z-10">
                  <RasoraaPage
                    side="right"
                    spreadIndex={currentSpread}
                    isInteractive={false}
                    tandooriDishes={tandooriDishes}
                    chineseDishes={chineseDishes}
                    curryDishes={curryDishes}
                    southIndianDishes={southIndianDishes}
                    riceBreadsDishes={riceBreadsDishes}
                    continentalDishes={continentalDishes}
                    mocktailDishes={mocktailDishes}
                    dessertDishes={dessertDishes}
                  />
                </div>

                {/* Stationary Left Page (Target Spread Unveiling Underneath) */}
                <div className="absolute top-0 left-0 w-1/2 h-full border-r border-[#C5A880]/20 z-10">
                  <RasoraaPage
                    side="left"
                    spreadIndex={targetSpread}
                    isInteractive={false}
                    tandooriDishes={tandooriDishes}
                    chineseDishes={chineseDishes}
                    curryDishes={curryDishes}
                    southIndianDishes={southIndianDishes}
                    riceBreadsDishes={riceBreadsDishes}
                    continentalDishes={continentalDishes}
                    mocktailDishes={mocktailDishes}
                    dessertDishes={dessertDishes}
                  />
                </div>

                {/* The Physical Turning Leaf (Rotates 0deg -> 180deg around Spine) */}
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{ duration: 0.75, ease: [0.32, 0, 0.24, 1] }}
                  onAnimationComplete={() => {
                    setCurrentSpread(targetSpread);
                    setIsTurning(false);
                  }}
                  className="absolute top-0 left-0 w-1/2 h-full z-40"
                  style={{
                    transformOrigin: 'right center',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front Face: Current Left Page */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-l-xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg)',
                      boxShadow: '8px 0 24px rgba(0,0,0,0.45)',
                    }}
                  >
                    <RasoraaPage
                      side="left"
                      spreadIndex={currentSpread}
                      isInteractive={false}
                      tandooriDishes={tandooriDishes}
                      chineseDishes={chineseDishes}
                      curryDishes={curryDishes}
                      southIndianDishes={southIndianDishes}
                      riceBreadsDishes={riceBreadsDishes}
                      continentalDishes={continentalDishes}
                      mocktailDishes={mocktailDishes}
                      dessertDishes={dessertDishes}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-white/[0.08] to-black/15 pointer-events-none" />
                  </div>

                  {/* Back Face: Target Right Page (Settles onto Right Stack) */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-r-xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      boxShadow: '-8px 0 24px rgba(0,0,0,0.45)',
                    }}
                  >
                    <RasoraaPage
                      side="right"
                      spreadIndex={targetSpread}
                      isInteractive={false}
                      tandooriDishes={tandooriDishes}
                      chineseDishes={chineseDishes}
                      curryDishes={curryDishes}
                      southIndianDishes={southIndianDishes}
                      riceBreadsDishes={riceBreadsDishes}
                      continentalDishes={continentalDishes}
                      mocktailDishes={mocktailDishes}
                      dessertDishes={dessertDishes}
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/25 via-white/[0.08] to-black/15 pointer-events-none" />
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              MOBILE: SINGLE-PAGE TACTILE BOOKLET VIEW
             ───────────────────────────────────────────────────────────── */}
          <div className="block md:hidden">
            <div className="flex items-center justify-between mb-3 px-2 text-xs font-mono text-[#FAF7EE]">
              <button
                type="button"
                disabled={mobilePage === 0}
                onClick={() => {
                  const newP = Math.max(0, mobilePage - 1);
                  setMobilePage(newP);
                  setCurrentSpread(Math.floor(newP / 2));
                  playRealisticPaperTurnSound();
                }}
                className="px-3 py-1.5 rounded-lg border border-[#C5A880]/30 hover:border-[#C5A880] disabled:opacity-30 flex items-center gap-1"
              >
                <ChevronLeft size={12} />
                <span>Prev</span>
              </button>
              <span className="text-[#C5A880] font-medium">Page {mobilePage + 1} of 9</span>
              <button
                type="button"
                disabled={mobilePage === 8}
                onClick={() => {
                  const newP = Math.min(8, mobilePage + 1);
                  setMobilePage(newP);
                  setCurrentSpread(Math.floor(newP / 2));
                  playRealisticPaperTurnSound();
                }}
                className="px-3 py-1.5 rounded-lg border border-[#C5A880]/30 hover:border-[#C5A880] disabled:opacity-30 flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight size={12} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mobilePage}
                initial={{ opacity: 0, x: 20, rotateY: 8 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -20, rotateY: -8 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl overflow-hidden border border-[#C5A880]/35 shadow-2xl"
              >
                <RasoraaPage
                  side={mobilePage % 2 === 0 ? 'left' : 'right'}
                  spreadIndex={Math.floor(mobilePage / 2)}
                  isInteractive={true}
                  onTurnToSpread={turnToSpread}
                  onSelectDish={onSelectDish}
                  tandooriDishes={tandooriDishes}
                  chineseDishes={chineseDishes}
                  curryDishes={curryDishes}
                  southIndianDishes={southIndianDishes}
                  riceBreadsDishes={riceBreadsDishes}
                  continentalDishes={continentalDishes}
                  mocktailDishes={mocktailDishes}
                  dessertDishes={dessertDishes}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Folio Navigation & Spread Indicator */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#C5A880] px-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentSpread === 0 || isTurning}
                onClick={handlePrevSpread}
                className="px-3 py-1.5 rounded-lg border border-[#C5A880]/30 hover:border-[#C5A880] disabled:opacity-30 disabled:hover:border-[#C5A880]/30 transition-colors flex items-center gap-1 text-[#FAF7EE]"
              >
                <ChevronLeft size={13} />
                <span>Turn Back</span>
              </button>
              <button
                type="button"
                disabled={currentSpread === 4 || isTurning}
                onClick={handleNextSpread}
                className="px-3 py-1.5 rounded-lg border border-[#C5A880]/30 hover:border-[#C5A880] disabled:opacity-30 disabled:hover:border-[#C5A880]/30 transition-colors flex items-center gap-1 text-[#FAF7EE]"
              >
                <span>Turn Forward</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {/* Spread Indicators Dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => turnToSpread(i)}
                  title={`Go to Spread ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    currentSpread === i ? 'w-8 bg-[#C5A880]' : 'w-2 bg-[#C5A880]/30 hover:bg-[#C5A880]/60'
                  }`}
                />
              ))}
            </div>

            <span className="text-[11px] text-[#A69986]">
              Spread {currentSpread + 1} of 5 · Official Rasoraa Folio
            </span>
          </div>
        </RasoraaCover>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MODE 2: FULL EDITORIAL CATALOG (GRID INDEX)
         ══════════════════════════════════════════════════════════════════ */}
      {menuViewMode === 'grid' && (
        <div className="space-y-10 max-w-6xl mx-auto">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATALOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCatalogCategory(cat)}
                className={`px-4 py-2 rounded-full text-[11px] font-sans tracking-[0.14em] uppercase transition-all duration-300 border ${
                  activeCatalogCategory === cat
                    ? 'bg-[#183620] text-[#FBF9F5] border-[#C5A880] shadow-[0_0_15px_rgba(197,168,128,0.2)]'
                    : 'bg-white/[0.03] text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Michelin-Style Editorial Menu Grid */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 text-left">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => onSelectDish(dish)}
                className="group relative border-b border-white/[0.08] pb-6 cursor-pointer text-left transition-all duration-300 hover:border-[#C5A880]/50"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-xl sm:text-2xl text-white font-light group-hover:text-[#C5A880] transition-colors">
                      {dish.name}
                    </span>
                    {dish.isJain && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-sans text-[#22AA00] tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22AA00]" />
                        Jain
                      </span>
                    )}
                    {dish.isSignature && (
                      <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider">
                        ✦ Signature
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-base text-[#C5A880] font-light shrink-0">
                    ₹{dish.price}
                  </span>
                </div>

                <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed pt-2">
                  {dish.description}
                </p>

                <div className="flex items-center justify-between pt-3 text-[11px] font-sans text-neutral-500">
                  <span>{dish.origin}</span>
                  <span className="text-[#C5A880] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>View Chronicle</span>
                    <span className="text-xs">↗</span>
                  </span>
                </div>
              </div>
            ))}

            {filteredDishes.length === 0 && (
              <div className="col-span-2 py-14 text-center text-neutral-400 space-y-3">
                <p className="font-serif text-2xl text-white font-light">
                  No dishes found matching "{searchQuery}"
                </p>
                <p className="text-xs text-neutral-400">
                  Try searching for Paneer, Dosa, Biryani, Pasta, Sizzler, or browse by category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCatalogCategory('All Items');
                  }}
                  className="px-5 py-2 rounded-full border border-[#C5A880] text-xs font-sans uppercase tracking-widest text-white hover:bg-white/10"
                >
                  Reset Menu
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
