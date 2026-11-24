import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Utensils, ChevronDown, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [quickBranch, setQuickBranch] = useState('downtown');
  const [quickDate, setQuickDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [quickGuests, setQuickGuests] = useState('2');
  const [quickTime, setQuickTime] = useState('19:30');

  const scrollToExplore = () => {
    const introSection = document.getElementById('introduction-section');
    if (introSection) {
      introSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickReserve = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/reservations?branch=${quickBranch}&date=${quickDate}&guests=${quickGuests}&time=${quickTime}`);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950">
      {/* Background Photography with slow cinematic subtle scale */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=85')",
        }}
      />

      {/* High-Contrast Dual Gradient Overlays: Deep Slate 950 + Forest Emerald Tint */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-emerald-950/50" />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-36 sm:pt-40 pb-16">
        {/* Crisp Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 text-white shadow-card mb-6"
        >
          <span className="w-3.5 h-3.5 rounded-[2px] border-2 border-emerald-400 flex items-center justify-center p-[1px] bg-white">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
          </span>
          <span className="text-[11px] sm:text-xs font-sans uppercase tracking-widest font-bold text-emerald-300">
            100% Pure Indian Vegetarian • Shuddh Shakahari
          </span>
        </motion.div>

        {/* Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold tracking-tight leading-[1.08] mb-6 drop-shadow-sm"
        >
          A Taste Worth <br className="hidden sm:inline" />
          <span className="italic font-light text-amber-300">Experiencing</span>
        </motion.h1>

        {/* High-Contrast Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-200 font-sans font-normal leading-relaxed mb-8 drop-shadow"
        >
          An imperial celebration of India's richest culinary heritage — royal Awadhi dum curries, slow-charred clay oven kebabs, and handcrafted artisanal mithai.
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link to="/reservations" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              icon={Calendar}
              iconPosition="right"
              className="w-full sm:w-auto shadow-elevated bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-7"
            >
              Reserve Your Table
            </Button>
          </Link>

          <Link to="/menu" className="w-full sm:w-auto">
            <Button
              variant="white"
              size="lg"
              icon={Utensils}
              iconPosition="right"
              className="w-full sm:w-auto bg-white/90 hover:bg-white text-slate-900 font-semibold px-7"
            >
              Explore Royal Menu
            </Button>
          </Link>
        </motion.div>

        {/* Modern Interactive Quick Reservation Dock (Bento / Agency Style) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700/60 shadow-modal"
        >
          <form onSubmit={handleQuickReserve} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            {/* Branch Selector */}
            <div className="bg-slate-800/80 rounded-xl p-2.5 text-left border border-slate-700/50">
              <label className="block text-[10px] uppercase font-sans font-bold text-slate-400 tracking-wider mb-1">
                Haveli Location
              </label>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <select
                  value={quickBranch}
                  onChange={(e) => setQuickBranch(e.target.value)}
                  className="bg-transparent text-white text-xs sm:text-sm font-medium w-full focus:outline-none cursor-pointer"
                >
                  <option value="downtown" className="bg-slate-900 text-white">Downtown Palace</option>
                  <option value="waterfront" className="bg-slate-900 text-white">Waterfront Haveli</option>
                  <option value="conservatory" className="bg-slate-900 text-white">Conservatory Gardens</option>
                </select>
              </div>
            </div>

            {/* Date Selector */}
            <div className="bg-slate-800/80 rounded-xl p-2.5 text-left border border-slate-700/50">
              <label className="block text-[10px] uppercase font-sans font-bold text-slate-400 tracking-wider mb-1">
                Date
              </label>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
                <input
                  type="date"
                  value={quickDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setQuickDate(e.target.value)}
                  className="bg-transparent text-white text-xs sm:text-sm font-medium w-full focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Time Selector */}
            <div className="bg-slate-800/80 rounded-xl p-2.5 text-left border border-slate-700/50">
              <label className="block text-[10px] uppercase font-sans font-bold text-slate-400 tracking-wider mb-1">
                Seating Time
              </label>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <select
                  value={quickTime}
                  onChange={(e) => setQuickTime(e.target.value)}
                  className="bg-transparent text-white text-xs sm:text-sm font-medium w-full focus:outline-none cursor-pointer"
                >
                  <option value="12:30" className="bg-slate-900 text-white">12:30 PM (Lunch)</option>
                  <option value="13:30" className="bg-slate-900 text-white">1:30 PM (Lunch)</option>
                  <option value="19:00" className="bg-slate-900 text-white">7:00 PM (Dinner)</option>
                  <option value="19:30" className="bg-slate-900 text-white">7:30 PM (Dinner)</option>
                  <option value="20:30" className="bg-slate-900 text-white">8:30 PM (Dinner)</option>
                  <option value="21:15" className="bg-slate-900 text-white">9:15 PM (Dinner)</option>
                </select>
              </div>
            </div>

            {/* Guests Selector */}
            <div className="bg-slate-800/80 rounded-xl p-2.5 text-left border border-slate-700/50">
              <label className="block text-[10px] uppercase font-sans font-bold text-slate-400 tracking-wider mb-1">
                Guests
              </label>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                <select
                  value={quickGuests}
                  onChange={(e) => setQuickGuests(e.target.value)}
                  className="bg-transparent text-white text-xs sm:text-sm font-medium w-full focus:outline-none cursor-pointer"
                >
                  <option value="1" className="bg-slate-900 text-white">1 Guest</option>
                  <option value="2" className="bg-slate-900 text-white">2 Guests</option>
                  <option value="4" className="bg-slate-900 text-white">4 Guests</option>
                  <option value="6" className="bg-slate-900 text-white">6 Guests</option>
                  <option value="8" className="bg-slate-900 text-white">8+ Guests (Feast)</option>
                </select>
              </div>
            </div>

            {/* Quick Find Button */}
            <div className="sm:col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="w-full h-full min-h-[52px] bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-all transform active:scale-98"
              >
                <span>Find Table</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Metadata Badges Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 pt-6 border-t border-slate-800/80 hidden md:grid grid-cols-3 gap-6 text-left"
        >
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="w-3.5 h-3.5 rounded-[2px] border-2 border-emerald-400 flex items-center justify-center p-[1px] bg-white shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
            </span>
            <div>
              <div className="text-xs font-sans font-bold text-white uppercase tracking-wider">
                100% Pure Vegetarian
              </div>
              <div className="text-xs text-slate-400 font-sans">Shuddh Shakahari & Jain menus curated daily</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-slate-300">
            <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <div className="text-xs font-sans font-bold text-white uppercase tracking-wider">
                Three Haveli Sanctuaries
              </div>
              <div className="text-xs text-slate-400 font-sans">Downtown Palace, Waterfront & Conservatory</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-slate-300">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-sans font-bold text-white uppercase tracking-wider">
                Royal Service Hours
              </div>
              <div className="text-xs text-slate-400 font-sans">Lunch 12:00 – 3:30 PM • Dinner 6:00 – 11:30 PM</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Smooth Scroll Indicator */}
      <motion.button
        onClick={scrollToExplore}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-slate-400 hover:text-white transition-colors focus:outline-none"
        aria-label="Scroll to introduction"
      >
        <span className="text-[10px] font-sans uppercase tracking-widest mb-1">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-emerald-400" />
        </motion.div>
      </motion.button>
    </section>
  );
};
