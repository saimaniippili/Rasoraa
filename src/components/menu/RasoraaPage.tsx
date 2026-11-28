import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, MessageCircle, Phone } from 'lucide-react';
import { MenuItem, RESTAURANT_METADATA } from '../../data/menuData';

interface RasoraaPageProps {
  side: 'left' | 'right';
  spreadIndex: number;
  isInteractive?: boolean;
  onTurnToSpread?: (spread: number) => void;
  onSelectDish?: (dish: MenuItem) => void;
  tandooriDishes: MenuItem[];
  chineseDishes: MenuItem[];
  curryDishes: MenuItem[];
  southIndianDishes: MenuItem[];
  riceBreadsDishes: MenuItem[];
  continentalDishes: MenuItem[];
  mocktailDishes: MenuItem[];
  dessertDishes: MenuItem[];
}

export const RasoraaPage: React.FC<RasoraaPageProps> = ({
  side,
  spreadIndex,
  isInteractive = true,
  onTurnToSpread,
  onSelectDish,
  tandooriDishes,
  chineseDishes,
  curryDishes,
  southIndianDishes,
  riceBreadsDishes,
  continentalDishes,
  mocktailDishes,
  dessertDishes,
}) => {
  const isLeft = side === 'left';

  // ─────────────────────────────────────────────────────────────
  // SPREAD 0: COVER / PROLOGUE
  // ─────────────────────────────────────────────────────────────
  if (spreadIndex === 0) {
    if (isLeft) {
      return (
        <div className="h-full p-4 sm:p-7 md:p-10 flex flex-col justify-between relative rasoraa-parchment-page text-left select-none overflow-hidden">
          {/* Spine shadow overlay */}
          <div className="absolute inset-0 left-page-spine-shadow pointer-events-none" />

          {/* Elegant Perimeter Frame */}
          <div className="absolute inset-3 sm:inset-5 border border-[#C5A880]/40 pointer-events-none rounded-sm" />
          <div className="absolute inset-4 sm:inset-6 border border-[#C5A880]/20 pointer-events-none rounded-sm" />

          <div className="relative z-10 space-y-5 pt-2">
            {/* Heritage Crest */}
            <div className="flex items-center gap-3">
              <img
                src="/rr-monogram.jpg"
                alt="RR Crest"
                className="w-11 h-11 object-contain rounded-full border border-[#C5A880]/60 shadow-sm"
              />
              <div>
                <span className="font-serif text-[#0B1F14] text-base tracking-wide font-medium block">
                  Rasoraa Multicuisine
                </span>
                <span className="text-[10px] text-[#8C7A62] font-mono tracking-widest uppercase">
                  Heritage Town · Pondicherry
                </span>
              </div>
            </div>

            {/* Freshness Decree Quote from Master Prompt */}
            <div className="space-y-2 py-2 border-y border-[#C5A880]/30">
              <span className="text-[#96784A] text-[10px] font-mono tracking-[0.24em] uppercase block">
                Freshness Decree
              </span>
              <p className="font-serif italic text-lg sm:text-xl text-[#0B1F14] leading-relaxed">
                “{RESTAURANT_METADATA.freshnessDecree}”
              </p>
              <span className="text-[11px] text-[#6E6455] font-serif block">
                — Chef Rajan R, Managing Partner
              </span>
            </div>

            {/* Philosophy Description */}
            <p className="text-[#3A453E] text-xs sm:text-[13px] font-normal leading-relaxed">
              Situated in the historic French-Tamil quarters, Rasoraa celebrates the sacred art of vegetarian alchemy. Every creation is prepared without compromise — utilizing slow-simmered Awadhi dum handis, 400°C charcoal tandoors, and pure stone-ground stone mill batter.
            </p>

            {/* Sacred Seals */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-[#FAF7EE] border border-[#C5A880]/30 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#1F7A28] mt-1 shrink-0 shadow-xs" />
                <div>
                  <h4 className="text-xs text-[#0B1F14] font-medium tracking-wide">
                    100% Shuddh Shakahari & Dedicated Jain Hearth
                  </h4>
                  <p className="text-[11px] text-[#55635B] leading-tight pt-0.5">
                    Strict adherence to Jain culinary codes. Custom rootless satvik preparations cooked in dedicated sanctified vessels.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-[#FAF7EE] border border-[#C5A880]/30 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#C5A880] mt-1 shrink-0 shadow-xs" />
                <div>
                  <h4 className="text-xs text-white-contrast font-medium text-[#0B1F14] tracking-wide">
                    Made to Order Freshness Pledge
                  </h4>
                  <p className="text-[11px] text-[#55635B] leading-tight pt-0.5">
                    {RESTAURANT_METADATA.preparationPledge}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-3 border-t border-[#C5A880]/30 flex items-center justify-between text-[11px] text-[#7A7061] font-mono">
            <span>39, Ambalathadayar Madam St</span>
            <span className="text-[#96784A]">Prologue</span>
          </div>
        </div>
      );
    } else {
      // Right Page: Official Carte Frontispiece & Table of Chapters
      return (
        <div className="h-full p-4 sm:p-7 md:p-10 flex flex-col justify-between relative rasoraa-parchment-page text-left select-none overflow-hidden">
          <div className="absolute inset-0 right-page-spine-shadow pointer-events-none" />
          <div className="absolute inset-3 sm:inset-5 border border-[#C5A880]/40 pointer-events-none rounded-sm" />
          <div className="absolute inset-4 sm:inset-6 border border-[#C5A880]/20 pointer-events-none rounded-sm" />

          <div className="relative z-10 space-y-4 pt-2">
            <div className="text-center pb-2">
              <img
                src="/logo.png"
                alt="Rasoraa Emblem"
                className="h-16 mx-auto object-contain drop-shadow-sm filter contrast-105"
              />
              <h3 className="font-serif text-2xl text-[#0B1F14] font-medium pt-2 tracking-tight">
                The Imperial Carte
              </h3>
              <p className="text-[10px] text-[#96784A] font-mono uppercase tracking-[0.22em]">
                Table of Chapters
              </p>
            </div>

            {/* Clickable Chapter Index */}
            <div className="space-y-1.5 border-t border-b border-[#C5A880]/30 py-2.5">
              {[
                { ch: 'Chapter I', title: 'Tandoori Hearth & Clay Pit Kebabs', page: 2, spread: 1 },
                { ch: 'Chapter II', title: 'Indo-Chinese Wok & Sizzler Iron', page: 3, spread: 1 },
                { ch: 'Chapter III', title: 'Royal Awadhi Handis & Curries', page: 4, spread: 2 },
                { ch: 'Chapter IV', title: 'South Indian Specialities & Dosas', page: 5, spread: 2 },
                { ch: 'Chapter V', title: 'Dum Biryani & Artisanal Tandoor Breads', page: 6, spread: 3 },
                { ch: 'Chapter VI', title: 'Stone Hearth Pizzas & Pastas', page: 7, spread: 3 },
                { ch: 'Chapter VII', title: 'Artisanal Coolers & Shakes', page: 8, spread: 4 },
                { ch: 'Chapter VIII', title: 'Royal Desserts & Epilogue', page: 9, spread: 4 },
              ].map((item) => (
                <button
                  key={item.ch}
                  type="button"
                  onClick={() => isInteractive && onTurnToSpread?.(item.spread)}
                  className="w-full flex items-center justify-between py-1 px-2 rounded hover:bg-[#EFE8DA] transition-colors group text-left gap-2"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                    <span className="text-[#96784A] text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider group-hover:translate-x-0.5 transition-transform shrink-0 whitespace-nowrap">
                      ✦ {item.ch}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#2A3830] font-serif group-hover:text-[#0B1F14] transition-colors font-medium truncate">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[9.5px] sm:text-[10px] text-[#8C7A62] font-mono shrink-0 whitespace-nowrap">
                    p. {item.page}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-3 flex items-center justify-between border-t border-[#C5A880]/30">
            <span className="text-[11px] text-[#7A7061] font-mono">Page 1</span>
            <button
              type="button"
              onClick={() => isInteractive && onTurnToSpread?.(1)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#09251A] hover:bg-[#0E3525] text-[#FAF7EE] text-xs font-sans uppercase tracking-widest transition-all shadow-md group"
            >
              <span>Open Folio</span>
              <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform text-[#C5A880]" />
            </button>
          </div>
        </div>
      );
    }
  }

  // ─────────────────────────────────────────────────────────────
  // REUSABLE DISH CHAPTER PAGE GENERATOR
  // ─────────────────────────────────────────────────────────────
  const renderDishPage = (
    dishes: MenuItem[],
    chapterNum: string,
    title: string,
    subtitle: string,
    pageNumber: number,
    prevSpread?: number,
    nextSpread?: number
  ) => (
    <div className="h-full p-4 sm:p-7 md:p-8 flex flex-col justify-between relative rasoraa-parchment-page text-left select-none overflow-hidden">
      {/* Spine shadow overlay depending on left/right */}
      <div className={`absolute inset-0 ${isLeft ? 'left-page-spine-shadow' : 'right-page-spine-shadow'} pointer-events-none`} />

      {/* Perimeter Frame */}
      <div className="absolute inset-3 sm:inset-5 border border-[#C5A880]/35 pointer-events-none rounded-sm" />
      <div className="absolute inset-4 sm:inset-6 border border-[#C5A880]/15 pointer-events-none rounded-sm" />

      <div className="relative z-10 space-y-3.5">
        {/* Chapter Header */}
        <div className="border-b border-[#C5A880]/40 pb-2.5">
          <span className="text-[#96784A] text-[10px] font-mono uppercase tracking-[0.24em] block font-medium">
            {chapterNum}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-[#0B1F14] font-medium tracking-tight">
            {title}
          </h3>
          <p className="text-[11px] text-[#616B64] font-normal pt-0.5 leading-tight">
            {subtitle}
          </p>
        </div>

        {/* Dishes List */}
        <div className="space-y-3">
          {dishes.slice(0, 6).map((dish) => (
            <div
              key={dish.id}
              onClick={() => isInteractive && onSelectDish?.(dish)}
              className={`p-1.5 rounded transition-all ${
                isInteractive
                  ? 'cursor-pointer hover:bg-[#F0E9DC] hover:translate-x-0.5'
                  : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
                  <h4 className="font-serif text-sm sm:text-base text-[#0B1F14] font-medium leading-snug break-words">
                    {dish.name}
                  </h4>
                  {dish.isJain && (
                    <span className="text-[9px] font-mono text-[#1F7A28] uppercase tracking-wider font-semibold whitespace-nowrap bg-[#1F7A28]/10 px-1 py-0.5 rounded">
                      🌱 Jain
                    </span>
                  )}
                  {dish.isSignature && (
                    <span className="text-[9px] font-mono text-[#96784A] uppercase tracking-wider whitespace-nowrap bg-[#96784A]/10 px-1 py-0.5 rounded">
                      ✦ Signature
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs sm:text-sm text-[#96784A] font-semibold shrink-0 ml-1.5 whitespace-nowrap pt-0.5">
                  ₹{dish.price}
                </span>
              </div>
              <p className="text-[11px] text-[#55635B] leading-relaxed pt-0.5 line-clamp-2">
                {dish.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 pt-2.5 border-t border-[#C5A880]/30 flex items-center justify-between text-[11px] text-[#7A7061] font-mono">
        {prevSpread !== undefined ? (
          <button
            type="button"
            onClick={() => isInteractive && onTurnToSpread?.(prevSpread)}
            className="text-[#6E6455] hover:text-[#0B1F14] transition-colors flex items-center gap-1"
          >
            <ChevronLeft size={12} />
            <span>Prev</span>
          </button>
        ) : (
          <span />
        )}
        <span className="font-medium text-[#96784A]">Page {pageNumber}</span>
        {nextSpread !== undefined ? (
          <button
            type="button"
            onClick={() => isInteractive && onTurnToSpread?.(nextSpread)}
            className="text-[#6E6455] hover:text-[#0B1F14] transition-colors flex items-center gap-1"
          >
            <span>Next</span>
            <ChevronRight size={12} />
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );

  // SPREAD 1 (Pages 2 & 3)
  if (spreadIndex === 1) {
    if (isLeft) {
      return renderDishPage(
        tandooriDishes,
        'Chapter I',
        'Tandoori Hearth & Kebabs',
        'Roasted at 400°C over aromatic fruitwood coals with saffron cream',
        2,
        0,
        undefined
      );
    } else {
      return renderDishPage(
        chineseDishes,
        'Chapter II',
        'Indo-Chinese Wok & Sizzlers',
        'High wok-hei tossed botanicals & smoking cast-iron platters',
        3,
        undefined,
        2
      );
    }
  }

  // SPREAD 2 (Pages 4 & 5)
  if (spreadIndex === 2) {
    if (isLeft) {
      return renderDishPage(
        curryDishes,
        'Chapter III',
        'Royal Awadhi Handi Curries',
        'Slow-simmered earthenware handis infused with whole spices',
        4,
        1,
        undefined
      );
    } else {
      return renderDishPage(
        southIndianDishes,
        'Chapter IV',
        'South Indian Specialities & Dosas',
        'Fermented stone-ground batter crisped in golden desi ghee',
        5,
        undefined,
        3
      );
    }
  }

  // SPREAD 3 (Pages 6 & 7)
  if (spreadIndex === 3) {
    if (isLeft) {
      return renderDishPage(
        riceBreadsDishes,
        'Chapter V',
        'Dum Biryani & Artisanal Breads',
        'Aged basmati sealed in clay purdah & clay oven flatbreads',
        6,
        2,
        undefined
      );
    } else {
      return renderDishPage(
        continentalDishes,
        'Chapter VI',
        'Stone Hearth Pizzas & Pastas',
        'Hand-stretched sourdough crusts & durum wheat pastas',
        7,
        undefined,
        4
      );
    }
  }

  // SPREAD 4 (Pages 8 & 9)
  if (spreadIndex === 4) {
    if (isLeft) {
      return renderDishPage(
        mocktailDishes,
        'Chapter VII',
        'Artisanal Coolers & Shakes',
        'Cold-pressed fruit botanicals, garden herbs, and thick shakes',
        8,
        3,
        undefined
      );
    } else {
      // Page 9: Desserts & Epilogue
      return (
        <div className="h-full p-4 sm:p-7 md:p-8 flex flex-col justify-between relative rasoraa-parchment-page text-left select-none overflow-hidden">
          <div className="absolute inset-0 right-page-spine-shadow pointer-events-none" />
          <div className="absolute inset-3 sm:inset-5 border border-[#C5A880]/35 pointer-events-none rounded-sm" />
          <div className="absolute inset-4 sm:inset-6 border border-[#C5A880]/15 pointer-events-none rounded-sm" />

          <div className="relative z-10 space-y-3">
            <div className="border-b border-[#C5A880]/40 pb-2.5">
              <span className="text-[#96784A] text-[10px] font-mono uppercase tracking-[0.24em] block font-medium">
                Chapter VIII
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#0B1F14] font-medium tracking-tight">
                Royal Desserts & Epilogue
              </h3>
              <p className="text-[11px] text-[#616B64] font-normal pt-0.5 leading-tight">
                Sizzling cast-iron skillet sweets and heritage hospitality
              </p>
            </div>

            {/* Desserts List */}
            <div className="space-y-2">
              {dessertDishes.map((dish) => (
                <div
                  key={dish.id}
                  onClick={() => isInteractive && onSelectDish?.(dish)}
                  className={`p-1.5 rounded transition-all ${
                    isInteractive ? 'cursor-pointer hover:bg-[#F0E9DC]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif text-sm sm:text-base text-[#0B1F14] font-medium leading-snug break-words flex-1 min-w-0">
                      {dish.name}
                    </h4>
                    <span className="font-mono text-xs sm:text-sm text-[#96784A] font-semibold shrink-0 ml-1.5 whitespace-nowrap pt-0.5">
                      ₹{dish.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#55635B] leading-relaxed pt-0.5">
                    {dish.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Epilogue Heritage Box */}
            <div className="p-3.5 rounded-lg bg-[#FAF7EE] border border-[#C5A880]/40 space-y-1.5 text-center shadow-xs">
              <span className="font-serif italic text-base text-[#0B1F14] block font-medium">
                “Thank You • Visit Again”
              </span>
              <p className="text-[11px] text-[#4A5750] leading-relaxed">
                {RESTAURANT_METADATA.name} {RESTAURANT_METADATA.tagline}
                <br />
                {RESTAURANT_METADATA.address}
              </p>
              <div className="pt-1 flex items-center justify-center gap-3 text-[11px] text-[#0B1F14]">
                <a
                  href={`tel:${RESTAURANT_METADATA.phone1}`}
                  className="text-[#96784A] hover:underline flex items-center gap-1 font-mono"
                >
                  <Phone size={11} />
                  <span>{RESTAURANT_METADATA.phone1}</span>
                </a>
                <span className="text-[#C5A880]">|</span>
                <a
                  href={RESTAURANT_METADATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1F7A28] hover:underline flex items-center gap-1 font-mono font-medium"
                >
                  <MessageCircle size={11} />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-2.5 border-t border-[#C5A880]/30 flex items-center justify-between">
            <span className="text-[11px] text-[#7A7061] font-mono">Page 9 / Epilogue</span>
            <a
              href="#reserve"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#09251A] hover:bg-[#0E3525] text-[#FAF7EE] text-xs font-sans uppercase tracking-widest transition-all shadow-md"
            >
              <Calendar size={12} className="text-[#C5A880]" />
              <span>Reserve Table</span>
            </a>
          </div>
        </div>
      );
    }
  }

  return null;
};
