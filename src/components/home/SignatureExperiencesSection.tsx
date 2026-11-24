import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Crown, Flame, PartyPopper } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

export const SignatureExperiencesSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Dining Odyssey"
          title="Curated Signature Experiences"
          subtitle="Three distinct imperial culinary chapters crafted for intimate dinners, cultural explorations, and grand celebrations."
        />

        {/* Modern Bento Grid (7 cols + 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Large Bento Tile: The Royal Thali (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 group relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between shadow-elevated"
          >
            <div className="relative h-80 sm:h-96 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80"
                alt="RASORAA Grand Shahi Thali Feasting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Tag Pill */}
              <div className="absolute top-5 left-5 z-10 inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-amber-500/40 text-amber-300">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider">
                  Imperial Degustation
                </span>
              </div>
            </div>

            <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between bg-slate-950">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-3">
                  The Royal Shahi Thali
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-6">
                  A grand feast of 32 silver katoris served in true royal court fashion. Enjoy seasonal vegetables, royal dal, artisanal chutneys, saffron rice, hand-stretched breads, and traditional desserts.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 mb-6">
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="text-amber-400 font-bold block">32 Offerings</span>
                    Silverware feast
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="text-emerald-400 font-bold block">100% Shuddh</span>
                    Pure vegetarian
                  </div>
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="text-sky-400 font-bold block">Jain Option</span>
                    Without onion/garlic
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <Link
                  to="/menu"
                  className="inline-flex items-center space-x-2 text-xs uppercase font-sans tracking-widest font-bold text-white group-hover:text-amber-400 transition-colors"
                >
                  <span>Explore Thali Courses</span>
                  <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  to="/reservations"
                  className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2 rounded-xl transition-all"
                >
                  Book Thali
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column Stacked Bento Tiles (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
            {/* Tile 2: Clay Oven & Dum Alchemy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 flex-1 flex flex-col sm:flex-row lg:flex-col justify-between shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="relative h-48 sm:h-auto sm:w-1/2 lg:w-full lg:h-52 overflow-hidden bg-slate-900 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80"
                  alt="Awadhi Dum and Clay Oven Specialties"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-[10px] uppercase font-sans font-bold tracking-wider text-amber-300 border border-slate-700">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Wood-Fired & Dum</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    Awadhi Dum & Tandoor Alchemy
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans mb-4">
                    Slow-cooked in clay handis sealed with wheat dough, capturing rich aromatics of green cardamom, saffron, and stone-ground garam masala.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to="/menu"
                    className="inline-flex items-center space-x-1.5 text-xs uppercase font-sans tracking-wider font-bold text-slate-900 group-hover:text-emerald-700 transition-colors"
                  >
                    <span>View Specialties</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Tile 3: Private Banquets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 flex-1 flex flex-col sm:flex-row lg:flex-col justify-between shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="relative h-48 sm:h-auto sm:w-1/2 lg:w-full lg:h-52 overflow-hidden bg-slate-900 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1000&q=80"
                  alt="Private Banquets & Sheesh Mahal Salons"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-[10px] uppercase font-sans font-bold tracking-wider text-sky-300 border border-slate-700">
                  <PartyPopper className="w-3.5 h-3.5 text-sky-400" />
                  <span>Celebrations & Galas</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    Sheesh Mahal Banquets
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans mb-4">
                    Exclusive dining salons and courtyards with private servers, custom menus, and traditional music for 15 to 300 guests.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to="/events"
                    className="inline-flex items-center space-x-1.5 text-xs uppercase font-sans tracking-wider font-bold text-slate-900 group-hover:text-emerald-700 transition-colors"
                  >
                    <span>Plan an Event</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
