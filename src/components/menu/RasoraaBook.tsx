import React, { useState, useEffect } from 'react';
import { MenuItem, OFFICIAL_DISHES } from '../../data/menuData';
import { RasoraaControls } from './RasoraaControls';
import { ThreeBookViewer } from './ThreeBookViewer';
import './rasoraa-book.css';

interface RasoraaBookProps {
  onSelectDish: (dish: MenuItem) => void;
}

export const RasoraaBook: React.FC<RasoraaBookProps> = ({ onSelectDish }) => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [menuViewMode, setMenuViewMode] = useState<'book' | 'grid'>('book');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCatalogCategory, setActiveCatalogCategory] = useState<string>('All Items');

  const turnToSpread = (newSpread: number) => {
    setCurrentSpread(newSpread);
  };

  const handleNextSpread = () => {
    if (currentSpread < 4) setCurrentSpread(currentSpread + 1);
  };

  const handlePrevSpread = () => {
    if (currentSpread > 0) setCurrentSpread(currentSpread - 1);
  };

  // Pre-filter dishes for search
  const tandooriDishes = OFFICIAL_DISHES.filter((d) => d.category === 'Tandoori Starters');
  const chineseDishes = OFFICIAL_DISHES.filter((d) => d.category === 'Chinese & Sizzlers');
  const curryDishes = OFFICIAL_DISHES.filter((d) => d.category === 'Indian Curries');
  const southIndianDishes = OFFICIAL_DISHES.filter((d) => d.category === 'South Indian & Dosas');
  const riceBreadsDishes = OFFICIAL_DISHES.filter((d) => d.category === 'Rice, Biryani & Breads');
  const continentalDishes = OFFICIAL_DISHES.filter((d) => d.category === 'Continental, Pastas & Pizzas');
  const mocktailDishes = OFFICIAL_DISHES.filter((d) => d.category === 'Mocktails & Shakes');
  const dessertDishes = OFFICIAL_DISHES.filter((d) => d.category === 'Desserts');

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
        isTurning={false}
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
          MODE 1: THE REALISTIC THREE.JS 3D DINING FOLIO (from zjy365/threejs-page-flip)
         ══════════════════════════════════════════════════════════════════ */}
      {menuViewMode === 'book' && (
        <ThreeBookViewer
          onSelectDish={(dishName) => {
            const found = OFFICIAL_DISHES.find(
              (d) => d.name.toLowerCase() === dishName.toLowerCase()
            );
            if (found) onSelectDish(found);
          }}
        />
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
