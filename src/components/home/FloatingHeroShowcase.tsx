import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Animation variants for smooth directional slide & scale
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.94,
      rotate: dir > 0 ? 3 : -3,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 28 },
        opacity: { duration: 0.45 },
        scale: { duration: 0.45, ease: 'easeOut' },
        rotate: { duration: 0.5, ease: 'easeOut' },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.92,
      rotate: dir > 0 ? -3 : 3,
      transition: {
        x: { duration: 0.35, ease: 'easeInOut' },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };

  return (
    <div className="relative w-full max-w-[540px] select-none mx-auto flex flex-col items-center">
      {/* ─── Ambient Emerald & Warm Amber Volumetric Lighting ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[520px] h-[360px] sm:h-[440px] bg-gradient-to-tr from-[#143d22]/35 via-[#C5A880]/12 to-transparent blur-[90px] sm:blur-[120px] pointer-events-none -z-20 rounded-full" />

      {/* ─── Top Eyebrow: Imperial Signature with gold line ─── */}
      <div className="w-full flex flex-col items-start px-2 sm:px-4 mb-2 sm:mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDish.badge}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-start"
          >
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] text-[#C5A880] uppercase">
              {currentDish.badge}
            </span>
            <div className="w-12 sm:w-14 h-[1px] bg-[#C5A880]/70 mt-1.5" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Main Floating Culinary Object (Interactive Touch & Drag Area) ─── */}
      <div
        className="relative w-full aspect-[4/3.2] sm:aspect-[4/3] flex items-center justify-center cursor-grab active:cursor-grabbing px-2"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Soft Contact Shadow beneath the Plate */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-[72%] sm:w-[78%] h-10 sm:h-14 rounded-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.92)_0%,_rgba(197,168,128,0.24)_40%,_transparent_75%)] blur-xl pointer-events-none -z-10" />

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
            onDragEnd={(_, { offset, velocity }) => {
              if (offset.x < -35 || velocity.x < -400) {
                handleNext();
              } else if (offset.x > 35 || velocity.x > 400) {
                handlePrev();
              }
            }}
            className="w-full h-full flex items-center justify-center relative select-none"
          >
            {/* Idle Levitation Animation */}
            <motion.div
              animate={{
                y: [-6, 6, -6],
                rotate: [-0.6, 0.6, -0.6],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut',
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src={currentDish.image}
                alt={currentDish.title}
                draggable={false}
                className="max-w-[92%] max-h-[92%] sm:max-w-[95%] sm:max-h-[95%] object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.7)] pointer-events-none transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Food Information Layout (Below the Food Image) ─── */}
      <div className="w-full px-2 sm:px-4 mt-2 sm:mt-4 text-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDish.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-1.5 sm:space-y-2"
          >
            {/* Category Eyebrow */}
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#C5A880] uppercase block">
              {currentDish.discipline}
            </span>

            {/* Dish Name & Price with Elegant Divider */}
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-light text-white leading-tight tracking-wide drop-shadow-sm">
                {currentDish.title}
              </h3>
              <div className="flex items-center gap-3 shrink-0">
                <span className="w-8 sm:w-12 h-[1px] bg-white/20 hidden sm:block" />
                <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-medium text-[#22AA00] tracking-tight">
                  {currentDish.price}
                </span>
              </div>
            </div>

            {/* Preparation Subtitle */}
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              {currentDish.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Swipe Selector Capsule Row ─── */}
      <div className="w-full px-2 sm:px-4 mt-6 sm:mt-8 flex items-center justify-center gap-3">
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
                  ? 'bg-gradient-to-r from-[#142D1C] to-[#0A1A10] border-[#C5A880] shadow-[0_0_20px_rgba(197,168,128,0.28)] ring-1 ring-[#C5A880]/60 scale-105'
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
    </div>
  );
};
