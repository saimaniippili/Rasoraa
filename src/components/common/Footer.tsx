import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Instagram,
  Facebook,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurant.config';
import { Button } from './Button';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800">
          {/* Brand Identity & Legacy (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block group bg-white/95 rounded-xl p-2 shadow-md">
              <img
                src={RESTAURANT_CONFIG.brand.logoUrl}
                alt={RESTAURANT_CONFIG.brand.name}
                className="h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-slate-300 text-sm font-sans leading-relaxed max-w-sm">
              {RESTAURANT_CONFIG.brand.subheading}
            </p>

            <div className="pt-2 flex items-center space-x-2.5 text-xs">
              <span className="w-3.5 h-3.5 rounded-[2px] border-2 border-emerald-400 flex items-center justify-center p-[1px] bg-white shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              </span>
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs">
                100% Pure Multicuisine Vegetarian (Shuddh Shakahari)
              </span>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-emerald-500 hover:bg-emerald-600 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-emerald-500 hover:bg-emerald-600 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-sans tracking-widest text-emerald-400 font-bold">
              Explore
            </h4>
            <ul className="space-y-3 text-sm font-sans text-slate-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Royal Menu
                </Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="hover:text-white transition-colors">
                  Table Reservations
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  Private Banquets
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Locations & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations & Concierge (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-sans tracking-widest text-emerald-400 font-bold">
              Haveli Locations
            </h4>
            <div className="space-y-4 text-sm font-sans text-slate-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">Downtown Royal Palace</strong>
                  <span className="text-slate-400 text-xs">142 Botanica Blvd, Central Plaza</span>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold">The Waterfront Haveli</strong>
                  <span className="text-slate-400 text-xs">88 Marina Promenade, Pier 7</span>
                </div>
              </div>
              <div className="flex items-center space-x-2.5 pt-1">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+15552348901" className="text-slate-300 hover:text-white transition-colors">
                  +1 (555) 234-8901
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-400 text-xs">Daily: 12:00 PM – 11:30 PM</span>
              </div>
            </div>
          </div>

          {/* Newsletter & Imperial Gazette (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-sans tracking-widest text-emerald-400 font-bold">
              The Royal Gazette
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Receive invitations to seasonal degustations, new haveli openings, and festive banquet menus.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl shadow-md"
              >
                Subscribe to Gazette
              </Button>
            </form>

            {isSubscribed && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl flex items-center space-x-2 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you. You have been added to our guest register.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 font-sans gap-4">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_CONFIG.brand.name} Multicuisine Veg Restaurant. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/story" className="hover:text-slate-200 transition-colors">
              Philosophy
            </Link>
            <Link to="/menu" className="hover:text-slate-200 transition-colors">
              Menu
            </Link>
            <Link to="/reservations" className="hover:text-slate-200 transition-colors">
              Reservations
            </Link>
            <Link to="/contact" className="hover:text-slate-200 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
