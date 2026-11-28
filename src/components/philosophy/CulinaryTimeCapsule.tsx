import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CapsuleChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  image: string;
  shapeClass: string;
  glowColor: string;
  offsetDesktop: string;
  zIndex: number;
}

export const CAPSULE_CHAPTERS: CapsuleChapter[] = [
  {
    id: '01',
    number: '01',
    title: 'ROYAL LINEAGE',
    subtitle: 'Courts of Awadh Heritage',
    image: '/capsule-panel-1.webp',
    shapeClass: 'rounded-tl-[48px] rounded-tr-[14px] rounded-br-[12px] rounded-bl-[12px]',
    glowColor: 'rgba(197,168,128,0.3)',
    offsetDesktop: 'left-0 sm:left-2 bottom-6 sm:bottom-8',
    zIndex: 10,
  },
  {
    id: '02',
    number: '02',
    title: 'SACRED INGREDIENTS',
    subtitle: 'Vedic Saffron & Brass Hearth',
    image: '/capsule-panel-2.webp',
    shapeClass: 'rounded-tl-[42px] rounded-tr-[18px] rounded-br-[12px] rounded-bl-[12px]',
    glowColor: 'rgba(212,175,55,0.35)',
    offsetDesktop: 'left-[22%] sm:left-[24%] bottom-9 sm:bottom-12',
    zIndex: 20,
  },
  {
    id: '03',
    number: '03',
    title: 'CLAY PIT MASTERY',
    subtitle: '400°C Charcoal Embers',
    image: '/capsule-panel-3.webp',
    shapeClass: 'rounded-tl-[54px] rounded-tr-[28px] rounded-br-[14px] rounded-bl-[14px]',
    glowColor: 'rgba(255,100,20,0.35)',
    offsetDesktop: 'left-[45%] sm:left-[48%] bottom-12 sm:bottom-16',
    zIndex: 30,
  },
  {
    id: '04',
    number: '04',
    title: 'THE RASORAA EXPERIENCE',
    subtitle: 'Imperial Vegetarian Haute Cuisine',
    image: '/capsule-panel-4.webp',
    shapeClass: 'rounded-tl-[16px] rounded-tr-[68px] rounded-br-[16px] rounded-bl-[16px]',
    glowColor: 'rgba(212,175,55,0.5)',
    offsetDesktop: 'left-[66%] sm:left-[70%] bottom-8 sm:bottom-10',
    zIndex: 40,
  },
];

export const CulinaryTimeCapsule: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMobileTab, setActiveMobileTab] = useState<number>(3); // Default to Chapter 4 (Focal point)

  return (
    <div className="relative w-full max-w-[500px] sm:max-w-[540px] lg:max-w-[560px] mx-auto select-none py-4">
      {/* ─── Ambient Atmospheric Backlight (Emerald & Antique Gold) ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[480px] h-[340px] sm:h-[400px] bg-gradient-to-tr from-[#12331C]/35 via-[#C5A880]/15 to-transparent blur-[90px] sm:blur-[110px] pointer-events-none -z-20 rounded-full" />

      {/* ─── Subtle Whispering Rising Smoke Effect over Panel 3 (Clay Pit) ─── */}
      <div className="absolute top-[18%] left-[52%] -translate-x-1/2 w-24 h-48 pointer-events-none -z-10 opacity-40 mix-blend-screen overflow-hidden">
        <motion.div
          animate={{
            y: [20, -50],
            x: [-6, 8, -4],
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: 'easeOut',
          }}
          className="w-16 h-24 rounded-full bg-gradient-to-t from-orange-400/20 via-white/10 to-transparent blur-md"
        />
      </div>

      {/* ─── Desktop & Tablet Architectural 4-Panel Composition ─── */}
      <div className="hidden md:block relative w-full h-[440px] lg:h-[470px]">
        {/* Background Architectural Halo Wireframe Arch */}
        <svg
          viewBox="0 0 540 460"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full pointer-events-none -z-10"
        >
          {/* Subtle Outer Arch Glow */}
          <path
            d="M 50 380 A 220 220 0 0 1 490 380"
            stroke="url(#archGlow)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="opacity-30"
          />
          {/* Main Gold Wireframe Arch */}
          <path
            d="M 70 380 A 200 200 0 0 1 470 380"
            stroke="url(#archGold)"
            strokeWidth="1.2"
            className="opacity-70"
          />
          {/* Inner Delicate Arch */}
          <path
            d="M 100 380 A 170 170 0 0 1 440 380"
            stroke="url(#archGold)"
            strokeWidth="0.8"
            className="opacity-35"
          />
          <defs>
            <linearGradient id="archGold" x1="70" y1="180" x2="470" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C5A880" stopOpacity="0.2" />
              <stop offset="45%" stopColor="#E2CCA6" stopOpacity="0.9" />
              <stop offset="85%" stopColor="#C5A880" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C5A880" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="archGlow" x1="50" y1="160" x2="490" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22AA00" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#C5A880" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#22AA00" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* 4 Overlapping Architectural Glass Panels */}
        {CAPSULE_CHAPTERS.map((chapter, idx) => {
          const isHovered = hoveredIndex === idx;
          const isOtherHovered = hoveredIndex !== null && !isHovered;
          const isFocal = idx === 3; // The Rasoraa Experience (Rightmost panel)

          // Individual dimensions reduced by 12–15% for refined proportion
          const panelWidth = idx === 3 ? 'w-[185px] lg:w-[205px]' : 'w-[160px] lg:w-[178px]';
          const panelHeight =
            idx === 3
              ? 'h-[325px] lg:h-[355px]'
              : idx === 2
              ? 'h-[315px] lg:h-[345px]'
              : idx === 1
              ? 'h-[305px] lg:h-[335px]'
              : 'h-[295px] lg:h-[320px]';

          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 35, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: idx * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ zIndex: isHovered ? 50 : chapter.zIndex }}
              className={`absolute ${chapter.offsetDesktop} ${panelWidth} ${panelHeight} transition-all duration-500 cursor-pointer group`}
            >
              {/* Individual Glass Exhibition Card Frame */}
              <div
                className={`relative w-full h-full ${chapter.shapeClass} overflow-hidden border transition-all duration-500 ${
                  isHovered
                    ? 'border-[#E2CCA6] shadow-[0_20px_50px_rgba(0,0,0,0.9),_0_0_30px_rgba(197,168,128,0.35)] -translate-y-2.5 scale-[1.03]'
                    : isFocal
                    ? 'border-[#C5A880]/80 shadow-[0_15px_40px_rgba(0,0,0,0.85),_0_0_20px_rgba(197,168,128,0.22)]'
                    : 'border-[#C5A880]/40 shadow-[0_12px_35px_rgba(0,0,0,0.75)]'
                } ${isOtherHovered ? 'opacity-85 filter brightness-90' : 'opacity-100'}`}
              >
                {/* Background Exhibition Photograph */}
                <img
                  src={chapter.image}
                  alt={chapter.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out filter contrast-[1.08] ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}
                />

                {/* Translucent Smoked Glass & Ambient Lighting Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[#060B08]/95 via-[#060B08]/30 to-transparent transition-opacity duration-500 ${
                    isHovered ? 'opacity-75' : 'opacity-85'
                  }`}
                />

                {/* Golden Edge Illumination on the Arched Rim */}
                <div
                  className={`absolute inset-0 ${chapter.shapeClass} pointer-events-none transition-opacity duration-500 ${
                    isHovered
                      ? 'ring-1 ring-[#C5A880] opacity-100'
                      : isFocal
                      ? 'ring-1 ring-[#C5A880]/50 opacity-80'
                      : 'opacity-0'
                  }`}
                />

                {/* Subtle Glass Sheen Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/[0.14] via-transparent to-transparent pointer-events-none" />

                {/* Top Corner Chapter Badge */}
                <div className="absolute top-3.5 left-4 z-10 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] inline-block shadow-[0_0_6px_#C5A880]" />
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#E2CCA6] uppercase">
                    {chapter.number}
                  </span>
                </div>

                {/* Bottom Architectural Panel Title */}
                <div className="absolute bottom-4 left-3 right-3 text-center z-10 space-y-0.5">
                  <h4 className="font-sans font-medium text-[9.5px] lg:text-[10.5px] text-[#F4F0E6] uppercase tracking-[0.22em] leading-snug drop-shadow-md">
                    {chapter.title}
                  </h4>
                  <p className="font-serif italic text-[10px] text-[#C5A880]/80 tracking-wide line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {chapter.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* ─── Circular Carved Antique Stone / Metal Pedestal Base ─── */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] lg:w-[94%] pointer-events-none z-0 flex flex-col items-center">
          {/* Warm Golden Glow beneath Pedestal */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-[radial-gradient(ellipse_at_center,_rgba(197,168,128,0.45)_0%,_rgba(34,170,0,0.15)_40%,_transparent_75%)] blur-md pointer-events-none" />

          {/* Carved Pedestal Dais Image */}
          <img
            src="/time-capsule-pedestal.png"
            alt="Pedestal Base"
            className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] opacity-95"
          />
        </div>
      </div>

      {/* ─── Mobile Viewport: Horizontal Narrative Exhibition Strip ─── */}
      <div className="block md:hidden w-full relative">
        {/* Active Exhibit Display Card */}
        <AnimatePresence mode="wait">
          {(() => {
            const activeChapter = CAPSULE_CHAPTERS[activeMobileTab];
            return (
              <motion.div
                key={activeChapter.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="relative w-full aspect-[4/4.2] rounded-[24px] overflow-hidden border border-[#C5A880]/50 shadow-[0_18px_45px_rgba(0,0,0,0.85)] mb-4"
              >
                <img
                  src={activeChapter.image}
                  alt={activeChapter.title}
                  className="w-full h-full object-cover filter contrast-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060B08]/95 via-[#060B08]/40 to-transparent" />

                {/* Chapter Eyebrow */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shadow-[0_0_8px_#C5A880]" />
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                    CHAPTER {activeChapter.number}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-5 left-5 right-5 text-left space-y-1">
                  <h4 className="font-serif text-xl text-white font-light tracking-wide">
                    {activeChapter.title}
                  </h4>
                  <p className="font-sans text-xs text-[#C5A880]/90 font-light tracking-wide">
                    {activeChapter.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* 4 Interactive Capsule Selectors on Mobile */}
        <div className="grid grid-cols-4 gap-2 w-full pt-1">
          {CAPSULE_CHAPTERS.map((ch, idx) => {
            const isActive = activeMobileTab === idx;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => setActiveMobileTab(idx)}
                className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 text-center ${
                  isActive
                    ? 'bg-[#142A1B] border-[#C5A880] text-[#E2CCA6] shadow-[0_0_15px_rgba(197,168,128,0.25)]'
                    : 'bg-white/[0.03] border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                <span className="text-[9px] font-mono font-semibold tracking-widest">{ch.number}</span>
                <span className="text-[9px] font-sans truncate w-full mt-0.5">
                  {ch.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
