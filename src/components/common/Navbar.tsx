import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Calendar, ChevronRight, Phone, MapPin } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurant.config';
import { Button } from './Button';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Our Story', path: '/story' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Private Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  const isNavSolid = isScrolled || !isHome;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Pre-Header Bar (Desktop) */}
      <div
        className={cn(
          'hidden lg:block transition-all duration-300 border-b text-xs font-sans tracking-wide',
          isNavSolid
            ? 'bg-slate-900 text-slate-300 border-slate-800 py-2'
            : 'bg-slate-950/70 backdrop-blur-md text-slate-200 border-white/10 py-2'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded-[2px] border-2 border-emerald-500 flex items-center justify-center p-[1px] bg-white">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              </span>
              <span className="font-semibold text-emerald-400">100% Pure Multicuisine Vegetarian (Shuddh Shakahari)</span>
            </span>
            <span className="opacity-30">|</span>
            <span className="flex items-center space-x-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Downtown Palace • Waterfront Haveli • Conservatory</span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="tel:+15552348901"
              className="flex items-center space-x-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium">Direct Line: +1 (555) 234-8901</span>
            </a>
            <span className="opacity-30">|</span>
            <span className="text-slate-300 font-medium">Daily: 12:00 PM – 11:30 PM</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={cn(
          'transition-all duration-300',
          isNavSolid
            ? 'bg-white/98 backdrop-blur-md shadow-md border-b border-slate-200 py-3'
            : 'bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Anchor */}
            <Link
              to="/"
              className="flex items-center focus:outline-none group"
              aria-label="RASORAA Homepage"
            >
              <div
                className={cn(
                  'rounded-lg p-1.5 transition-all duration-300 flex items-center',
                  !isNavSolid && 'bg-white/95 shadow-md'
                )}
              >
                <img
                  src={RESTAURANT_CONFIG.brand.logoUrl}
                  alt={RESTAURANT_CONFIG.brand.name}
                  className="h-11 sm:h-13 md:h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      'relative text-sm font-sans font-semibold tracking-wide transition-colors py-1',
                      isNavSolid
                        ? isActive
                          ? 'text-forest font-bold'
                          : 'text-slate-700 hover:text-forest'
                        : isActive
                          ? 'text-white font-bold'
                          : 'text-slate-200 hover:text-white'
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className={cn(
                          'absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full',
                          isNavSolid ? 'bg-forest' : 'bg-emerald-400'
                        )}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center space-x-3.5">
              <Link
                to="/login"
                className={cn(
                  'flex items-center space-x-1.5 text-xs font-sans font-semibold px-3 py-2 rounded-lg transition-colors',
                  isNavSolid
                    ? 'text-slate-700 hover:text-forest hover:bg-slate-100'
                    : 'text-white hover:text-white hover:bg-white/15'
                )}
                aria-label="Patron Sign In"
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Sign In</span>
              </Link>

              <Link to="/reservations">
                <Button
                  variant="primary"
                  size="sm"
                  icon={Calendar}
                  iconPosition="left"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow"
                >
                  Reserve Table
                </Button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-2">
              <Link to="/reservations" className="sm:hidden">
                <Button variant="primary" size="sm" className="bg-emerald-600 text-white text-xs px-3 py-1.5">
                  Book
                </Button>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'p-2 rounded-lg focus:outline-none transition-colors',
                  isNavSolid
                    ? 'text-slate-800 hover:bg-slate-100'
                    : 'text-white hover:bg-white/20'
                )}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="px-5 pt-3 pb-6 space-y-1.5">
              <div className="py-2.5 mb-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-[2px] border-2 border-emerald-600 flex items-center justify-center p-[1px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  </span>
                  <span className="font-bold text-emerald-700">100% Pure Indian Vegetarian</span>
                </span>
                <span className="text-slate-500 font-medium">Est. 2018</span>
              </div>

              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      'flex items-center justify-between px-3.5 py-2.5 text-sm font-sans font-semibold transition-colors rounded-lg',
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-bold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    )}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col space-y-2">
                <Link to="/login" className="w-full">
                  <Button variant="outline" size="md" className="w-full" icon={User}>
                    Patron Sign In
                  </Button>
                </Link>

                <Link to="/reservations" className="w-full">
                  <Button variant="primary" size="md" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" icon={Calendar}>
                    Book Table Reservation
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
