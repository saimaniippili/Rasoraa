import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Sparkles, Filter, Search, Calendar, ArrowRight } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.config';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

export const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'starters', label: 'Tandoor & Starters' },
    { id: 'mains', label: 'Dum & Curries' },
    { id: 'desserts', label: 'Mithai & Sweets' },
    { id: 'beverages', label: 'Elixirs & Chai' },
  ];

  const dietaryFilters = [
    { id: 'all', label: 'All Items' },
    { id: 'vegetarian', label: '100% Pure Veg' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'chef-signature', label: "Chef's Signature" },
  ];

  const filteredDishes = RESTAURANT_CONFIG.fullMenu.filter((dish) => {
    const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
    const matchesDiet =
      selectedDietary === 'all' || dish.dietary.includes(selectedDietary as any);
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDiet && matchesSearch;
  });

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      {/* Editorial Header Banner */}
      <section className="relative py-24 md:py-32 bg-slate-950 text-white overflow-hidden mb-12">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50 z-10" />

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-sans font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Pure Indian Vegetarian Gastronomy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white">
            A La Carte & Royal Thali
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
            Every creation honors imperial Awadhi, Rajasthani, and Malabar traditions — slow-cooked over gentle charcoal embers with organic A2 dairy and stone-ground aromatics.
          </p>
        </div>
      </section>

      {/* Main Menu Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Controls: Categories, Search & Diet */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 mb-10 space-y-6 shadow-card">
          {/* Top row: Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 border-b border-slate-100 pb-6">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-xs sm:text-sm font-sans font-semibold px-5 py-2.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Bottom row: Search & Dietary quick filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            {/* Dietary Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-sans font-bold text-slate-500 mr-1 flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Filter:
              </span>
              {dietaryFilters.map((diet) => {
                const isSelected = selectedDietary === diet.id;
                return (
                  <button
                    key={diet.id}
                    onClick={() => setSelectedDietary(diet.id)}
                    className={`text-xs font-sans font-medium px-3.5 py-1.5 rounded-full transition-colors border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {diet.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search paneer, biryani, dal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-xs sm:text-sm font-sans text-slate-900 pl-9 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Dietary Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-slate-600 mb-8 px-2">
          <div className="flex items-center space-x-5">
            <span className="flex items-center space-x-1.5">
              <span className="w-3.5 h-3.5 rounded-[2px] border-2 border-emerald-600 flex items-center justify-center p-[1px] bg-white">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </span>
              <span className="font-bold text-emerald-700">100% Pure Indian Veg</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <span className="font-medium">Gluten-Free</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="font-medium">Chef's Signature</span>
            </span>
          </div>

          <span className="italic text-xs text-slate-500">
            *Jain preparations without onion and garlic available daily upon request.
          </span>
        </div>

        {/* Menu Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-subtle">
            <Utensils className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
              No Dishes Found
            </h3>
            <p className="text-sm text-slate-600 mb-6 font-sans">
              Try adjusting your search query or reset your filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredDishes.map((dish) => (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start"
                >
                  {/* Dish Visual */}
                  <div className="relative w-full sm:w-40 h-40 shrink-0 overflow-hidden rounded-xl bg-slate-900">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-white font-sans text-xs font-bold tracking-wide">
                      {dish.price}
                    </span>
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="w-3.5 h-3.5 rounded-[2px] border-2 border-emerald-600 flex items-center justify-center p-[1px] bg-white shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      </span>
                    </div>
                  </div>

                  {/* Dish Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full space-y-3">
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {dish.dietary.map((tag) => (
                          <Badge key={tag} type={tag} />
                        ))}
                      </div>

                      <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {dish.name}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed font-sans line-clamp-2 mt-1">
                        {dish.description}
                      </p>
                    </div>

                    {dish.pairing && (
                      <div className="pt-2.5 border-t border-slate-100 text-xs text-slate-500 italic font-sans flex items-center justify-between">
                        <span>Accompaniment: {dish.pairing}</span>
                        <Link
                          to="/reservations"
                          className="font-sans font-bold text-emerald-700 hover:text-emerald-800 not-italic flex items-center space-x-1"
                        >
                          <span>Order at Table</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Grand Royal Thali Degustation Banner */}
        <div className="mt-16 bg-slate-950 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-modal flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-sans uppercase tracking-widest text-amber-400 font-bold block mb-2">
              The Emperor's Feast
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold mb-3 text-white">
              The Grand Rasoraa Royal Thali
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              A 32-dish imperial banquet served in handcrafted silver katoris: artisanal malai paneer, 16-hour charcoal dal, seasonal subziyan, saffron basmati pulao, tandoori breads, and royal mithai.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <Link to="/reservations" className="w-full sm:w-auto block">
              <Button
                variant="primary"
                size="lg"
                icon={Calendar}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8"
              >
                Reserve Royal Thali
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
