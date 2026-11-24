import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Award, ShieldCheck, Flame, HeartHandshake } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurant.config';
import { Button } from '../common/Button';

export const IntroductionSection: React.FC = () => {
  return (
    <section id="introduction-section" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Asymmetric Imagery Showcase (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative z-10 overflow-hidden rounded-2xl shadow-elevated border border-slate-200 bg-white">
              <motion.img
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                alt="RASORAA Grand Darbar Hall Interior"
                className="w-full h-[460px] sm:h-[540px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Floating Chef Philosophy Card */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden sm:block absolute -bottom-8 -right-6 z-20 w-80 bg-white p-6 rounded-2xl shadow-elevated border border-slate-200"
            >
              <div className="flex items-center space-x-2 text-emerald-600 mb-2.5">
                <Sparkles className="w-4 h-4" />
                <span className="text-[11px] uppercase font-sans font-bold tracking-wider text-emerald-800">
                  Royal Culinary Creed
                </span>
              </div>
              <p className="font-serif text-base text-slate-900 italic leading-snug">
                "In royal Indian kitchens, vegetarian cuisine was never an omission — it was the supreme test of spice alchemy and hospitality."
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Ustad Nizamuddin</div>
                  <div className="text-[11px] text-slate-500">Executive Master Chef</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-serif font-bold text-xs">
                  R
                </div>
              </div>
            </motion.div>
          </div>

          {/* Editorial Content (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 text-emerald-700 font-sans font-bold uppercase tracking-widest text-xs"
            >
              <span className="w-4 h-[2px] bg-emerald-600" />
              <span>Philosophy & Heritage</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15]"
            >
              The Art of Imperial Indian Vegetarianism
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-base text-slate-700 leading-relaxed font-sans"
            >
              {RESTAURANT_CONFIG.brand.shortPhilosophy}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="text-sm text-slate-600 leading-relaxed font-sans"
            >
              Every preparation at RASORAA is an alchemy of patience: fresh malai paneer hand-pressed daily, Kashmiri saffron steeped in warm milk, and black lentils slow-cooked overnight over gentle charcoal embers with churned country butter.
            </motion.p>

            {/* 4 Pillars of Excellence Grid */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200"
            >
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-subtle flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">100% Shuddh Veg</div>
                  <div className="text-[11px] text-slate-500 leading-tight">No meat, poultry or fish</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-subtle flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-sky-50 text-sky-700 shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Charcoal Dum</div>
                  <div className="text-[11px] text-slate-500 leading-tight">16-hour slow simmered</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-subtle flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Jain Specialized</div>
                  <div className="text-[11px] text-slate-500 leading-tight">Dedicated root-free kitchen</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-subtle flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Atithi Devo Bhava</div>
                  <div className="text-[11px] text-slate-500 leading-tight">Revered royal hospitality</div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="pt-2"
            >
              <Link to="/story">
                <Button
                  variant="primary"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-semibold shadow-md"
                >
                  Explore Our Story & Heritage
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
