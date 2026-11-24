import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Flame, Heart } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurant.config';
import { Button } from '../common/Button';

export const StoryPreviewSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden">
      {/* Subtle radial emerald & sapphire backdrops */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative Content (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 text-amber-400 uppercase tracking-widest text-xs font-sans font-bold"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Imperial Legacy & Craftsmanship</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]"
            >
              Born from Ancient Spice Routes & Royal Darbars
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans font-normal"
            >
              {RESTAURANT_CONFIG.story.p1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans"
            >
              {RESTAURANT_CONFIG.story.p2}
            </motion.p>

            {/* Key Quality Pillars in High Contrast Badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-slate-800"
            >
              <div className="flex items-start space-x-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Pure Gir Cow A2 Ghee</h4>
                  <p className="text-xs text-slate-400">Churned from organic grass-fed grass pasture milk</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Stone-Pounded Masalas</h4>
                  <p className="text-xs text-slate-400">Slow-crushed to preserve delicate volatile oils</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Zero Preservatives</h4>
                  <p className="text-xs text-slate-400">100% natural, freshly prepared twice daily</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                <Heart className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Dedicated Jain Kitchen</h4>
                  <p className="text-xs text-slate-400">Separate utensils, root-free satvik recipes</p>
                </div>
              </div>
            </motion.div>

            {/* Read Story CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="pt-2"
            >
              <Link to="/story">
                <Button
                  variant="primary"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-elevated"
                >
                  Read Our Full Heritage Story
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Visual Showcase (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 overflow-hidden rounded-3xl border border-slate-800 shadow-modal bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80"
                alt="Culinary Artisans at RASORAA"
                className="w-full h-[480px] sm:h-[560px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />

              {/* Floating Testimonial Citation */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700/80 shadow-elevated">
                <div className="flex items-center space-x-2 text-amber-400 mb-2">
                  <span className="text-xs font-sans uppercase font-bold tracking-wider">
                    Culinary Heritage Review
                  </span>
                </div>
                <p className="font-serif text-sm sm:text-base text-slate-200 italic leading-snug">
                  "RASORAA restores the lost glory of vegetarian banqueting where every morsel reveals centuries of master craft."
                </p>
                <div className="mt-3 text-xs text-slate-400 font-sans font-medium">
                  — The Global Gastronome Magazine
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
