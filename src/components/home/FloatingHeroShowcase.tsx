import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

export interface FloatingHeroDish {
  id: string;
  shortName: string;
  title: string;
  subtitle: string;
  discipline: string;
  origin: string;
  image: string;
  thumb: string;
  price: string;
  badge: string;
}

export const HERO_FLOATING_DISHES: FloatingHeroDish[] = [
  {
    id: '01',
    shortName: 'Malai',
    title: 'Malai Paneer Tikka',
    subtitle: '400°C Clay Pit Metallurgy & Saffron Cream',
    discipline: 'TANDOORI STARTER',
    origin: 'Northwest Frontier',
    image: '/hero-dish-malai.png',
    thumb: '/hero-dish-malai.png',
    price: '₹369',
    badge: 'IMPERIAL SIGNATURE',
  },
  {
    id: '02',
    shortName: 'Dal',
    title: 'Dal Makhani Imperial',
    subtitle: '16-Hour Slow Simmered Earthen Handi Dum',
    discipline: 'ROYAL HEARTH CURRY',
    origin: 'Punjab Heritage',
    image: '/hero-dish-dal.png',
    thumb: '/hero-dish-dal.png',
    price: '₹319',
    badge: 'HERITAGE DECREE',
  },
  {
    id: '03',
    shortName: 'Honey',
    title: 'Honey Glazed Lotus Stem',
    subtitle: 'Wild Forest Honey Glaze, Sesame & High Wok Hei',
    discipline: 'BOTANICAL STARTER',
    origin: 'Silk Road Heritage',
    image: '/hero-dish-dessert.png',
    thumb: '/hero-dish-dessert.png',
    price: '₹349',
    badge: 'SIGNATURE CRAFT',
  },
];

interface FloatingHeroShowcaseProps {
  onSelectDish?: (dish: FloatingHeroDish) => void;
}

export const FloatingHeroShowcase: React.FC<FloatingHeroShowcaseProps> = ({ onSelectDish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Drag tracking to prevent opening lightbox on swipe gestures
  const isDraggingRef = useRef(false);

  const total = HERO_FLOATING_DISHES.length;
  const currentDish = HERO_FLOATING_DISHES[currentIndex];

  const changeDish = useCallback(
    (newIndex: number, newDirection: 1 | -1) => {
      setDirection(newDirection);
      setCurrentIndex(newIndex);
      onSelectDish?.(HERO_FLOATING_DISHES[newIndex]);
    },
    [onSelectDish]
  );

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % total;
    changeDish(nextIdx, 1);
  }, [changeDish, currentIndex, total]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + total) % total;
    changeDish(prevIdx, -1);
  }, [changeDish, currentIndex, total]);

  // Keyboard navigation & Esc listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (!isLightboxOpen) {
        if (e.key === 'ArrowRight') {
          handleNext();
        } else if (e.key === 'ArrowLeft') {
          handlePrev();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isLightboxOpen]);

  // Lock body scroll when lightbox is active
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  // Animation variants for smooth in-place directional slide & scale
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.94,
      rotate: dir > 0 ? 2 : -2,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        x: { type: 'spring', stiffness: 290, damping: 28 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4, ease: 'easeOut' },
        rotate: { duration: 0.45, ease: 'easeOut' },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.94,
      rotate: dir > 0 ? -2 : 2,
      transition: {
        x: { duration: 0.32, ease: 'easeInOut' },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
      },
    }),
  };

  return (
    <div className="relative w-full max-w-[460px] select-none mx-auto flex flex-col items-center">
      {/* ─── Ambient Emerald & Warm Amber Volumetric Lighting ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[280px] sm:h-[340px] bg-gradient-to-tr from-[#1B512D]/40 via-[#C5A880]/10 to-transparent blur-[80px] sm:blur-[100px] pointer-events-none -z-20 rounded-full" />

      {/* ─── Top Eyebrow: Imperial Signature with gold line ─── */}
      <div className="w-full flex flex-col items-start px-2 sm:px-4 mb-1.5 sm:mb-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDish.badge}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-start"
          >
            <span className="text-[9.5px] sm:text-[10.5px] font-mono tracking-[0.28em] text-[#C5A880] uppercase">
              {currentDish.badge}
            </span>
            <div className="w-10 sm:w-12 h-[1px] bg-[#C5A880]/70 mt-1" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Main Floating Culinary Object (Interactive Touch & Drag Area) ─── */}
      <div
        className="relative w-full aspect-[4/3] sm:aspect-[4/2.85] max-h-[310px] sm:max-h-[360px] flex items-center justify-center cursor-grab active:cursor-grabbing px-2 group"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Soft Contact Shadow beneath the Plate */}
        <div className="absolute bottom-1 sm:bottom-3 left-1/2 -translate-x-1/2 w-[60%] sm:w-[66%] h-8 sm:h-11 rounded-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.92)_0%,_rgba(197,168,128,0.22)_40%,_transparent_75%)] blur-lg pointer-events-none -z-10" />

        {/* Floating Dish Image with Idle Floating Motion & Swipe Support */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentDish.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.22}
            onDragStart={() => {
              isDraggingRef.current = true;
            }}
            onDragEnd={(_, { offset, velocity }) => {
              setTimeout(() => {
                isDraggingRef.current = false;
              }, 60);

              if (offset.x < -35 || velocity.x < -350) {
                handleNext();
              } else if (offset.x > 35 || velocity.x > 350) {
                handlePrev();
              }
            }}
            className="w-full h-full flex items-center justify-center relative select-none"
          >
            {/* Idle Levitation Animation */}
            <motion.div
              animate={{
                y: [-5, 5, -5],
                rotate: [-0.5, 0.5, -0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut',
              }}
              onClick={() => {
                if (!isDraggingRef.current) {
                  setIsLightboxOpen(true);
                }
              }}
              className="w-full h-full flex items-center justify-center cursor-zoom-in"
              title="Click to view dish in high resolution"
            >
              <img
                src={currentDish.image}
                alt={currentDish.title}
                draggable={false}
                className="max-w-[80%] max-h-[80%] sm:max-w-[84%] sm:max-h-[84%] object-contain filter drop-shadow-[0_18px_40px_rgba(0,0,0,0.75)] pointer-events-none transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Discreet Zoom Affordance Pill on Hover */}
              <div className="absolute bottom-2 right-4 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] text-neutral-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <Maximize2 size={10} className="text-[#C5A880]" />
                <span className="font-mono tracking-wider">VIEW</span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Food Information Layout (Below the Food Image) ─── */}
      <div className="w-full px-2 sm:px-4 mt-1.5 sm:mt-3 text-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDish.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="space-y-1 sm:space-y-1.5"
          >
            {/* Category Eyebrow */}
            <span className="text-[9.5px] sm:text-[10px] font-mono tracking-[0.24em] text-[#C5A880] uppercase block">
              {currentDish.discipline}
            </span>

            {/* Dish Name & Price with Elegant Divider */}
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-serif text-xl sm:text-2xl lg:text-[30px] font-light text-white leading-tight tracking-wide drop-shadow-sm">
                {currentDish.title}
              </h3>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="w-6 sm:w-10 h-[1px] bg-white/20 hidden sm:block" />
                <span className="font-mono text-lg sm:text-xl lg:text-2xl font-semibold text-[#2E8B4E] tracking-tight">
                  {currentDish.price}
                </span>
              </div>
            </div>

            {/* Preparation Subtitle */}
            <p className="text-[11.5px] sm:text-[13px] text-neutral-400 font-light leading-relaxed">
              {currentDish.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Swipe Selector Capsule Row ─── */}
      <div className="w-full px-2 sm:px-4 mt-4 sm:mt-6 flex items-center justify-center gap-2.5 sm:gap-3">
        {HERO_FLOATING_DISHES.map((dish, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              key={dish.id}
              type="button"
              onClick={() => {
                const dir = idx > currentIndex ? 1 : -1;
                changeDish(idx, dir);
              }}
              className={`flex items-center gap-2.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border transition-all duration-300 select-none group cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#1B512D] to-[#0A1A10] border-[#C5A880] shadow-[0_0_20px_rgba(27,81,45,0.45)] ring-1 ring-[#C5A880]/60 scale-105'
                  : 'bg-[#060D08]/60 border-white/10 hover:border-white/30 hover:bg-white/[0.04]'
              }`}
            >
              {/* Dish Miniature Thumbnail */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden p-0.5 border flex items-center justify-center shrink-0 transition-colors ${
                  isActive ? 'bg-[#050C07] border-[#C5A880]/60' : 'bg-black/40 border-white/10 group-hover:border-white/20'
                }`}
              >
                <img
                  src={dish.thumb}
                  alt={dish.title}
                  className="w-full h-full object-contain filter contrast-[1.05]"
                />
              </div>

              {/* Number and Short Name */}
              <div className="flex items-center gap-1.5 text-xs pr-1">
                <span
                  className={`text-[9.5px] sm:text-[10px] font-mono transition-colors ${
                    isActive ? 'text-[#C5A880] font-semibold' : 'text-neutral-500'
                  }`}
                >
                  {dish.id}
                </span>
                <span
                  className={`font-serif tracking-wide transition-colors ${
                    isActive ? 'text-[#FBF9F5]' : 'text-neutral-400 group-hover:text-white'
                  }`}
                >
                  {dish.shortName}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ─── Premium High-Resolution Food Lightbox (Deliberate Click Only) ─── */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[120] bg-[#070C09]/94 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 cursor-zoom-out select-none"
          >
            {/* Top Bar with Badge & Close Button */}
            <div
              className="w-full max-w-5xl flex items-center justify-between z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                  {currentDish.badge} · {currentDish.discipline}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="w-10 h-10 rounded-full border border-white/20 bg-black/50 hover:bg-white/10 hover:border-[#C5A880] text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                title="Close Lightbox (Esc)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Center: High-Resolution Food Image */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full flex-1 flex items-center justify-center my-4 pointer-events-auto"
            >
              {/* Soft warm glow behind dish in lightbox */}
              <div className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-tr from-[#1B512D]/45 via-[#C5A880]/20 to-transparent blur-[120px] pointer-events-none -z-10" />

              <img
                src={currentDish.image}
                alt={currentDish.title}
                className="max-h-[62vh] sm:max-h-[70vh] max-w-full object-contain filter drop-shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
              />
            </motion.div>

            {/* Bottom Bar: Dish Details & Dismiss Hint */}
            <div
              className="w-full max-w-xl text-center space-y-1.5 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-light tracking-wide">
                {currentDish.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-light">
                {currentDish.subtitle}
              </p>
              <div className="pt-2 flex items-center justify-center gap-3 text-xs">
                <span className="font-mono text-lg text-[#2E8B4E] font-semibold">{currentDish.price}</span>
                <span className="text-neutral-500">·</span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                  Press ESC or click anywhere to return
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
