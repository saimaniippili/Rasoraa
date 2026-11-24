import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurant.config';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';

export const FeaturedMenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'starters' | 'mains' | 'desserts' | 'beverages'>('all');

  const categories = [
    { id: 'all', label: 'All Specialties' },
    { id: 'starters', label: 'Tandoor & Starters' },
    { id: 'mains', label: 'Dum & Curries' },
    { id: 'desserts', label: 'Mithai & Sweets' },
    { id: 'beverages', label: 'Elixirs & Chai' },
  ];

  const filteredDishes = activeCategory === 'all'
    ? RESTAURANT_CONFIG.featuredDishes
    : RESTAURANT_CONFIG.fullMenu.filter((dish) => dish.category === activeCategory);

  return (
    <section className="py-24 md:py-32 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Royal Degustation"
          title="Curated Seasonal Offerings"
          subtitle="Time-tested vegetarian alchemy from Awadhi clay ovens to Varanasi confectioneries. Prepared fresh with organic A2 dairy, cold-pressed oils, and stone-ground spices."
        />

        {/* Clean Pill Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-3xl mx-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`text-xs sm:text-sm font-sans font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dish Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
        >
          <AnimatePresence>
            {filteredDishes.slice(0, 6).map((dish) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
              >
                {/* Dish Photo */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-40" />

                  {/* Pure Veg Emblem Pill */}
                  <div className="absolute top-3.5 left-3.5 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-slate-200">
                    <span className="w-3.5 h-3.5 rounded-[2px] border-2 border-emerald-600 flex items-center justify-center p-[1px] bg-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    </span>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-800">
                      100% Veg
                    </span>
                  </div>

                  {dish.dietary?.includes('chef-signature') && (
                    <div className="absolute top-3.5 right-3.5 z-10 px-2 py-0.5 rounded-full bg-amber-500/90 text-white text-[10px] font-sans font-semibold tracking-wide">
                      Chef's Signature
                    </div>
                  )}
                </div>

                {/* Dish Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-serif text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {dish.name}
                      </h4>
                      <span className="text-base font-bold text-emerald-700 font-sans shrink-0">
                        {dish.price}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed font-sans mb-4">
                      {dish.description}
                    </p>
                  </div>

                  {/* Dietary & Details Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-sans text-slate-500 font-medium">
                      {dish.category === 'mains'
                        ? 'Awadhi Dum Specialty'
                        : dish.category === 'starters'
                        ? 'Clay-Oven Roasted'
                        : dish.category === 'desserts'
                        ? 'Fresh Saffron Mithai'
                        : 'House Craft Beverage'}
                    </span>

                    <Link
                      to="/reservations"
                      className="text-xs font-sans font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
                    >
                      <span>Reserve</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View Full Menu CTA */}
        <div className="mt-14 text-center">
          <Link to="/menu">
            <Button
              variant="outline"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="border-slate-300 text-slate-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm"
            >
              View Full 60+ Dish Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
