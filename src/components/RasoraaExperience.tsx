import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Minus,
  MoreVertical,
  Phone,
  Plus,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { RasoraaBook } from './menu/RasoraaBook';
import { GlassCoverFlow, CoverFlowItem } from './gallery/GlassCoverFlow';
import { MenuItem, OFFICIAL_DISHES } from '../data/menuData';

/* ─── Visual Chronicles (Gallery) ─── */
const GALLERY_ITEMS: CoverFlowItem[] = [
  {
    id: 'g1',
    title: 'The Sealed Awadhi Dum Handi',
    category: 'Awadhi Metallurgy',
    subtitle: '16-hour wood charcoal simmer in earthenware handi sealed with whole-wheat dough.',
    image: '/dish-awadhi.jpg',
    palette: ['#1c3826', '#06130b'],
    isJain: true,
    isSignature: true,
  },
  {
    id: 'g2',
    title: 'Angari Malai Paneer over Embers',
    category: 'Live Fire Hearth',
    subtitle: '400°C clay pit metallurgy with Kashmiri deggi mirch & Vedic A2 cow ghee.',
    image: '/dish-tandoor.jpg',
    palette: ['#3b220d', '#0c0703'],
    isJain: true,
    isSignature: true,
  },
  {
    id: 'g3',
    title: 'Pan-Asian Wok Hei & Black Truffle',
    category: 'High-Flame Wok',
    subtitle: 'Botanical high-heat searing with crystal wild mushroom & truffle oil drizzle.',
    image: '/dish-oriental.jpg',
    palette: ['#162a33', '#050c10'],
    isJain: false,
    isSignature: true,
  },
  {
    id: 'g4',
    title: 'Stone Hearth Sourdough & Morel',
    category: 'Artisanal Hearth',
    subtitle: 'Double zero flour hand-stretched crust with wild foraged Himalayan morels.',
    image: '/dish-continental.jpg',
    palette: ['#36281a', '#0d0905'],
    isJain: true,
    isSignature: false,
  },
  {
    id: 'g5',
    title: 'Royal Bilona Ghee Crisp Dosa',
    category: 'Vedic Heritage',
    subtitle: 'Golden roasted on heavy cast-iron hearths with Vedic churned butter & coconut chutney.',
    image: '/haven-clean-bg-2x.jpg',
    palette: ['#2e2a14', '#0a0904'],
    isJain: true,
    isSignature: true,
  },
  {
    id: 'g6',
    title: 'Kashmiri Deggi Mirch Dal Makhani',
    category: 'Charcoal Simmer',
    subtitle: 'Black urad lentils slow-simmered overnight over smoldering sal embers with white butter.',
    image: '/dish-awadhi.jpg',
    palette: ['#281814', '#0a0504'],
    isJain: true,
    isSignature: false,
  },
  {
    id: 'g7',
    title: 'Smoked Peshawari Mushroom Tikka',
    category: 'Tandoor Char',
    subtitle: 'Plump button mushrooms marinated in stone-ground ajwain & mustard oil smoke.',
    image: '/dish-tandoor.jpg',
    palette: ['#332415', '#0c0804'],
    isJain: false,
    isSignature: false,
  },
  {
    id: 'g8',
    title: 'Imperial Sizzling Rice Platter',
    category: 'Botanical Searing',
    subtitle: 'Smoked jasmine rice with baby corn, water chestnuts, and imperial five-spice gravy.',
    image: '/dish-oriental.jpg',
    palette: ['#142a20', '#040b08'],
    isJain: true,
    isSignature: true,
  },
];

/* ─── Private Banquets & Gatherings ─── */
const PRIVATE_EVENTS = [
  {
    id: 'e1',
    title: 'The Sheesh Mahal Salon',
    guests: '8 – 18 Guests',
    subtitle: 'Private Dining Sanctuary',
    desc: 'An intimate dining alcove inlaid with thousands of antique convex mirror rosettes, lit by Belgian crystal chandeliers for bespoke celebrations.',
    features: ['Dedicated Royal Khansama', 'Hand-Hammered Silverware', 'Personal Sitar Acoustics'],
  },
  {
    id: 'e2',
    title: 'The Imperial Darbar Banquet',
    guests: '40 – 120 Guests',
    subtitle: 'Grand Receptions & Soirées',
    desc: 'A magnificent heritage hall with arched Makrana marble columns, jasmine-scented courtyards, and a curated multi-course degustation feast.',
    features: ['Curated 7-Course Degustation', 'Bespoke Floral Architecture', 'Sommelier Botanical Pairings'],
  },
  {
    id: 'e3',
    title: 'The Glasshouse Conservatory',
    guests: '20 – 50 Guests',
    subtitle: 'Al Fresco Starlight Banquets',
    desc: 'Botanical garden pavilion under Delhi twilight skies, surrounded by night-blooming parijat trees and live brass tandoor pits.',
    features: ['Live Clay Pit & Wok Theatres', 'Open Fireplace Ambiance', 'Strict Jain Feasts Tailored'],
  },
];

/* ─── Dining Sanctuaries & Heritage Salons ─── */
const SANCTUARIES = [
  {
    id: 'heritage',
    name: 'The Heritage Town Flagship',
    location: '39, Ambalathadayar Madam St, Heritage Town, Pondicherry',
    hours: '11:30 AM – 11:30 PM Daily',
    phone: '+91 94845 94845',
    desc: 'Grand heritage mansion blending French colonial archways with traditional courtyard dining, brass lanterns, and live tandoor and wok stations.',
  },
  {
    id: 'courtyard',
    name: 'The Chettinad-Awadh Courtyard',
    location: 'Heritage Town, Central Atrium, Pondicherry',
    hours: '12:00 PM – 11:00 PM',
    phone: '+91 94845 94845',
    desc: 'Open-air botanical salon under starry coastal skies, shaded by ancient teak pillars with evening sitar and flute acoustics.',
  },
  {
    id: 'salon',
    name: 'The Rajan R Private Dining Suite',
    location: 'Heritage Town, First Floor Salon, Pondicherry',
    hours: '1:00 PM – 11:30 PM (By Prior Decree)',
    phone: '+91 99420 23456',
    desc: 'Bespoke private dining suite curated by Founder & Managing Partner Rajan R for exclusive family celebrations and executive banquets.',
  },
];

/* ─── Subtle Floating Embers Canvas ─── */
const EmberCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 50,
      size: Math.random() * 1.8 + 0.6,
      speedY: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.15,
      fadeSpeed: Math.random() * 0.003 + 0.001,
      isGold: Math.random() > 0.35,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity -= p.fadeSpeed;

        if (p.y < -10 || p.opacity <= 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.5 + 0.2;
          p.speedY = Math.random() * 0.5 + 0.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isGold
          ? `rgba(200, 169, 98, ${p.opacity})`
          : `rgba(34, 170, 0, ${p.opacity * 0.7})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
    />
  );
};

/* ═════════════════════════════════════════════════════════════════════════════
   RASORAA — 5-STAR HAUTE GASTRONOMY EDITORIAL EXPERIENCE
   ═════════════════════════════════════════════════════════════════════════════ */
export const RasoraaExperience: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);

  // Reservation Form State
  const today = new Date();
  const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const [selectedSanctuary, setSelectedSanctuary] = useState('heritage');
  const [guestCount, setGuestCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState<string>(todayISO);
  const [calendarViewDate, setCalendarViewDate] = useState<Date>(() => new Date());
  const [selectedTime, setSelectedTime] = useState('8:00 PM');
  const [isJainDiet, setIsJainDiet] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  // Calendar Calculation Helpers
  const calendarYear = calendarViewDate.getFullYear();
  const calendarMonthIndex = calendarViewDate.getMonth();
  const monthName = calendarViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const firstDayOfWeek = new Date(calendarYear, calendarMonthIndex, 1).getDay();
  const totalDaysInMonth = new Date(calendarYear, calendarMonthIndex + 1, 0).getDate();
  const isCurrentMonth = calendarYear === today.getFullYear() && calendarMonthIndex === today.getMonth();

  const handlePrevMonth = () => {
    setCalendarViewDate(new Date(calendarYear, calendarMonthIndex - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarViewDate(new Date(calendarYear, calendarMonthIndex + 1, 1));
  };

  const isDayDisabled = (day: number) => {
    const candidate = new Date(calendarYear, calendarMonthIndex, day, 23, 59, 59);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return candidate < now;
  };

  const isDaySelected = (day: number) => {
    const formattedCandidate = `${calendarYear}-${String(calendarMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return selectedDate === formattedCandidate;
  };

  const handleSelectDay = (day: number) => {
    if (isDayDisabled(day)) return;
    const formatted = `${calendarYear}-${String(calendarMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(formatted);
  };

  const formatSelectedDateHuman = (isoStr: string) => {
    if (!isoStr) return '';
    try {
      const [y, m, d] = isoStr.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoStr;
    }
  };

  // Dish Detail Lightbox Preview
  const [previewDish, setPreviewDish] = useState<MenuItem | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroDishes = [
    {
      title: 'Malai Paneer Tikka',
      subtitle: '400°C Clay Pit Metallurgy & Saffron Cream',
      discipline: 'Tandoori Starter',
      origin: 'Northwest Frontier',
      image: '/dish-tandoor.jpg',
      price: '₹369',
    },
    {
      title: 'Dal Makhani Imperial',
      subtitle: '16-Hour Slow Simmered Earthen Handi Dum',
      discipline: 'Royal Indian Curry',
      origin: 'Punjab Heritage',
      image: '/dish-awadhi.jpg',
      price: '₹319',
    },
    {
      title: 'Honey Chilli Lotus Stem',
      subtitle: 'Wild Honey Glaze, Sesame & High Wok Hei',
      discipline: 'Chinese Starter',
      origin: 'Himalayan Silk Road',
      image: '/dish-oriental.jpg',
      price: '₹399',
    },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) return;
    setIsBookingSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#070B08] text-[#FBF9F5] font-sans selection:bg-[#22AA00] selection:text-black overflow-x-hidden">
      {/* ─── 0. TOP BENEDICTION BAR ─── */}
      <div className="border-b border-white/[0.06] bg-[#040705] text-[10.5px] font-sans tracking-[0.12em] uppercase py-2 px-4 sm:px-8 text-neutral-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 shrink-0 whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 text-[#22AA00] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22AA00] shadow-[0_0_8px_#22AA00]" />
              100% Shuddh Shakahari
            </span>
            <span className="text-neutral-700">|</span>
            <span className="text-[#C5A880]">Strict Jain Hearth on Decree</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-neutral-400 text-[10px] shrink-0 whitespace-nowrap">
            <span>39, Ambalathadayar Madam St · Heritage Town, Pondicherry</span>
            <span className="text-neutral-700">|</span>
            <span className="text-neutral-300 font-mono">Pondicherry — 605 001</span>
          </div>
        </div>
      </div>

      {/* ─── 1. FIXED HAUTE GASTRONOMY NAVBAR ─── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#070B08]/95 backdrop-blur-md border-b border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)]'
            : 'bg-transparent border-b border-white/[0.04]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Editorial Wordmark */}
          <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0">
            <img
              src="/logo.png"
              alt="RASORAA"
              className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(34,170,0,0.3)] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-2xl font-light tracking-[0.2em] text-white transition-colors leading-none">
                RASORAA
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] font-sans font-medium tracking-[0.18em] sm:tracking-[0.22em] text-[#C5A880] uppercase mt-0.5 sm:mt-1 whitespace-nowrap">
                Pure Veg &amp; Jain Haute Cuisine
              </span>
            </div>
          </a>

          {/* Clean 6-Link Editorial Navigation with zero line-wrapping */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-8 text-[11.5px] font-sans tracking-[0.16em] uppercase text-neutral-300 font-light shrink-0">
            <a href="#hero" className="hover:text-[#C5A880] transition-colors py-1 relative group whitespace-nowrap">
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#about" className="hover:text-[#C5A880] transition-colors py-1 relative group whitespace-nowrap">
              <span>About Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#menu" className="hover:text-[#C5A880] transition-colors py-1 relative group whitespace-nowrap">
              <span>Menu</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#gallery" className="hover:text-[#C5A880] transition-colors py-1 relative group whitespace-nowrap">
              <span>Gallery</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#events" className="hover:text-[#C5A880] transition-colors py-1 relative group whitespace-nowrap">
              <span>Events</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#contact" className="hover:text-[#C5A880] transition-colors py-1 relative group whitespace-nowrap">
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="tel:+919484594845"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white px-3.5 py-2 rounded-full border border-white/10 hover:border-[#C5A880]/50 transition-colors bg-white/[0.03] whitespace-nowrap shrink-0"
            >
              <Phone size={11} className="text-[#C5A880]" />
              <span>+91 94845 94845</span>
            </a>

            {/* Book Table Button - visible on tablet and desktop, compact on mobile */}
            <a
              href="#reserve"
              className="hidden sm:inline-flex px-4 sm:px-5 py-2 rounded-full border border-[#C5A880]/60 bg-gradient-to-r from-[#162E1D] via-[#0D2214] to-[#162E1D] hover:border-[#C5A880] text-[#FBF9F5] hover:text-white text-xs font-medium tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(197,168,128,0.25)] hover:-translate-y-0.5 whitespace-nowrap shrink-0 items-center gap-2"
            >
              <Calendar size={12} className="text-[#C5A880]" />
              <span>Book Table</span>
            </a>

            {/* Luxury 3-Dots Dropdown Trigger for Mobile & Tablet */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-300 flex items-center justify-center shrink-0 active:scale-95 ${
                mobileMenuOpen
                  ? 'border-[#C5A880] bg-[#162E1D] text-[#C5A880] shadow-[0_0_15px_rgba(197,168,128,0.3)]'
                  : 'border-[#C5A880]/40 bg-[#0D2214]/90 hover:border-[#C5A880] text-[#C5A880] hover:text-white shadow-[0_2px_10px_rgba(0,0,0,0.5)]'
              }`}
              aria-label="Navigation Menu"
              title="Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X size={18} className="text-[#C5A880]" />
              ) : (
                <MoreVertical size={18} className="text-[#C5A880]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="lg:hidden border-b border-[#C5A880]/20 bg-[#070B08]/98 px-5 py-6 overflow-hidden backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
            >
              {/* Header Label inside Dropdown */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#C5A880] font-medium">
                    The Imperial Navigation
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-neutral-400">
                  Heritage Town
                </span>
              </div>

              {/* Navigation Links Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-sans tracking-[0.18em] uppercase">
                <a
                  href="#hero"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg border border-transparent hover:border-[#C5A880]/30 hover:bg-white/[0.03] flex items-center justify-between text-neutral-200 hover:text-[#C5A880] transition-colors group"
                >
                  <span className="font-light">Home</span>
                  <ArrowUpRight size={14} className="text-[#C5A880] opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg border border-transparent hover:border-[#C5A880]/30 hover:bg-white/[0.03] flex items-center justify-between text-neutral-200 hover:text-[#C5A880] transition-colors group"
                >
                  <span className="font-light">About Us</span>
                  <ArrowUpRight size={14} className="text-[#C5A880] opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="#menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg border border-transparent hover:border-[#C5A880]/30 hover:bg-white/[0.03] flex items-center justify-between text-neutral-200 hover:text-[#C5A880] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-light">Dining Folio (Menu)</span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30">3D</span>
                  </div>
                  <ArrowUpRight size={14} className="text-[#C5A880] opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="#gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg border border-transparent hover:border-[#C5A880]/30 hover:bg-white/[0.03] flex items-center justify-between text-neutral-200 hover:text-[#C5A880] transition-colors group"
                >
                  <span className="font-light">Visual Chronicles (Gallery)</span>
                  <ArrowUpRight size={14} className="text-[#C5A880] opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="#events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg border border-transparent hover:border-[#C5A880]/30 hover:bg-white/[0.03] flex items-center justify-between text-neutral-200 hover:text-[#C5A880] transition-colors group"
                >
                  <span className="font-light">Private Events &amp; Salons</span>
                  <ArrowUpRight size={14} className="text-[#C5A880] opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg border border-transparent hover:border-[#C5A880]/30 hover:bg-white/[0.03] flex items-center justify-between text-neutral-200 hover:text-[#C5A880] transition-colors group"
                >
                  <span className="font-light">Contact &amp; Location</span>
                  <ArrowUpRight size={14} className="text-[#C5A880] opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-3 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="#reserve"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full border border-[#C5A880]/60 bg-gradient-to-r from-[#162E1D] via-[#0D2214] to-[#162E1D] text-[#FBF9F5] text-center text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
                >
                  <Calendar size={13} className="text-[#C5A880]" />
                  <span>Reserve Table</span>
                </a>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <a
                    href="tel:+919484594845"
                    className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-[#C5A880] font-mono text-[11px]"
                  >
                    <Phone size={12} className="text-[#C5A880]" />
                    <span>+91 94845 94845</span>
                  </a>

                  <div className="flex items-center gap-4 text-neutral-400">
                    <a
                      href="https://wa.me/919484594845"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#25D366] hover:underline"
                    >
                      <MessageCircle size={14} />
                      <span>WhatsApp</span>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
                      <Instagram size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── 2. ACT I: CINEMATIC EDITORIAL HERO ─── */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex items-center justify-center pt-10 pb-20 overflow-hidden"
      >
        <EmberCanvas />

        {/* Soft Warm Candlelight & Forest Vignette */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[200px] bg-gradient-to-tr from-[#1B3B24]/20 via-[#C5A880]/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Breathtaking Editorial Typography */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/5 text-[#C5A880] text-[11px] font-sans tracking-[0.26em] uppercase">
                <Sparkles size={11} className="text-[#C5A880]" />
                <span>The Imperial Court · Est. 2012</span>
              </div>

              <div className="space-y-4">
                <p className="font-serif italic text-2xl sm:text-3xl text-[#E8E4DA] font-light tracking-wide">
                  Where Ancient Living Fire Meets
                </p>
                <h1 className="font-serif text-3.5xl sm:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[1.08] break-words">
                  Vegetarian Craft,{' '}
                  <br className="hidden sm:block" />
                  <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#E8E4DA] to-[#C5A880]">
                    Elevated to Royalty.
                  </span>
                </h1>
              </div>

              <p className="text-neutral-300 text-sm sm:text-base lg:text-lg max-w-xl font-light leading-relaxed mx-auto lg:mx-0">
                Century-old Awadhi earthenware handis simmered over sal wood embers, 400°C clay tandoors, and whisper-thin wok hei — united under an uncompromising 100% Shuddh Shakahari &amp; Jain decree.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <a
                  href="#reserve"
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-[#C5A880]/80 bg-gradient-to-r from-[#183620] via-[#112918] to-[#183620] hover:border-[#C5A880] text-[#FBF9F5] font-medium text-xs tracking-[0.16em] uppercase transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(197,168,128,0.3)] hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <Calendar size={14} className="text-[#C5A880]" />
                  <span>Reserve Table</span>
                </a>

                <a
                  href="#menu"
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/15 hover:border-[#C5A880] text-neutral-300 hover:text-white font-light text-xs tracking-[0.16em] uppercase transition-all duration-300 hover:bg-white/[0.04] inline-flex items-center gap-2"
                >
                  <span>Explore The Carte</span>
                  <ArrowUpRight size={14} className="text-[#C5A880]" />
                </a>
              </div>

              {/* Quiet Architectural Trust Metrics */}
              <div className="pt-6 sm:pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-2 sm:gap-6 text-center sm:text-left">
                <div>
                  <span className="block font-serif text-xl sm:text-2xl text-white font-light">100%</span>
                  <span className="text-[9.5px] sm:text-[11px] font-sans uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[#22AA00] block">
                    Pure Shakahari
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-xl sm:text-2xl text-white font-light">Strict</span>
                  <span className="text-[9.5px] sm:text-[11px] font-sans uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[#C5A880] block">
                    Jain Certified
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-xl sm:text-2xl text-white font-light truncate">Heritage</span>
                  <span className="text-[9.5px] sm:text-[11px] font-sans uppercase tracking-[0.12em] sm:tracking-[0.2em] text-neutral-400 block truncate">
                    Pondicherry
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Arched Masterpiece Frame */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[460px] select-none mx-auto">
                <div className="relative rounded-[36px] p-3 sm:p-4 bg-gradient-to-b from-[#14261A] via-[#0B150F] to-[#040805] border border-[#C5A880]/30 shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
                  {/* Inside Portrait Frame with Soft Arched Crown */}
                  <div className="relative aspect-[4/4.8] rounded-[26px] overflow-hidden border border-white/10 group">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedHeroIndex}
                        src={heroDishes[selectedHeroIndex].image}
                        alt={heroDishes[selectedHeroIndex].title}
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-1000"
                      />
                    </AnimatePresence>

                    {/* Atmospheric Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040705] via-transparent to-black/30 pointer-events-none" />

                    {/* Top Seal Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#050C07]/90 backdrop-blur-md border border-[#C5A880]/40 text-[#FBF9F5] text-[10px] font-sans tracking-[0.22em] uppercase">
                        <Sparkles size={11} className="text-[#C5A880]" />
                        <span>Imperial Signature</span>
                      </div>
                    </div>

                    {/* Floating Bottom Card */}
                    <div className="absolute bottom-4 inset-x-4 z-20">
                      <div className="p-4 rounded-2xl bg-[#060D08]/90 backdrop-blur-md border border-[#C5A880]/30 text-left shadow-2xl">
                        <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/10">
                          <span className="text-[11px] font-sans text-[#C5A880] tracking-[0.2em] uppercase">
                            {heroDishes[selectedHeroIndex].discipline}
                          </span>
                          <span className="text-xs font-mono font-medium text-[#22AA00]">
                            {heroDishes[selectedHeroIndex].price}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl text-white font-light pt-2">
                          {heroDishes[selectedHeroIndex].title}
                        </h3>
                        <p className="text-[11px] text-neutral-400 font-light pt-1">
                          {heroDishes[selectedHeroIndex].subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Minimalist 3-Dish Selector Beneath Frame */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {heroDishes.map((item, idx) => {
                    const isSelected = selectedHeroIndex === idx;
                    return (
                      <button
                        key={item.title}
                        onClick={() => setSelectedHeroIndex(idx)}
                        className={`group relative p-2 rounded-2xl border text-left transition-all duration-300 flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#142B1A] border-[#C5A880] shadow-[0_0_15px_rgba(197,168,128,0.2)]'
                            : 'bg-white/[0.03] border-white/10 hover:border-white/30 hover:bg-white/[0.06]'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="block text-[9px] font-sans uppercase tracking-wider text-[#C5A880] leading-none">
                            0{idx + 1}
                          </span>
                          <span className="block text-xs font-serif text-white truncate pt-1">
                            {item.title.split(' ')[0]}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. CONTINUOUS WHISPERING GOLD MARQUEE ─── */}
      <div className="border-y border-[#C5A880]/20 bg-[#050906] py-3.5 overflow-hidden text-[#E8E4DA] select-none relative z-20">
        <div className="animate-marquee-infinite">
          <div className="flex items-center space-x-12 shrink-0 pr-12 text-xs sm:text-[13px] tracking-[0.28em] uppercase font-sans">
            <span className="text-white font-light">AWADHI DUM HANDIS</span>
            <span className="text-[#C5A880]">✦</span>
            <span className="text-[#22AA00] font-medium">100% SHUDDH SHAKAHARI</span>
            <span className="text-[#C5A880]">✦</span>
            <span className="text-white font-light">400°C CLAY TANDOORS</span>
            <span className="text-[#C5A880]">✦</span>
            <span className="text-[#C5A880] font-light">STRICT JAIN HEARTH</span>
            <span className="text-[#C5A880]">✦</span>
            <span className="text-white font-light">PAN-ASIAN WOK HEI</span>
            <span className="text-[#C5A880]">✦</span>
            <span className="text-[#E8E4DA] font-light">HERITAGE TOWN PONDICHERRY</span>
            <span className="text-[#C5A880]">✦</span>
            <span className="text-white font-light">CHEF RAJAN R SIGNATURES</span>
            <span className="text-[#C5A880]">✦</span>
          </div>

          <div className="flex items-center space-x-12 shrink-0 pr-12 text-xs sm:text-[13px] tracking-[0.28em] uppercase font-sans" aria-hidden="true">
            <span className="text-white font-light">AWADHI DUM HANDIS</span>
            <span className="text-[#C5A880]">✦</span>
            <span className="text-[#22AA00] font-medium">100% SHUDDH SHAKAHARI</span>
            <span className="text-[#C5A880]">✦</span>
            <span className="text-white font-light">400°C CLAY TANDOORS</span>
            <span className="text-[#C5A880]">✦</span>
            <span className="text-[#C5A880] font-light">STRICT JAIN HEARTH</span>
            <span className="text-[#C5A880]">✦</span>
            <span className="text-white font-light">PAN-ASIAN WOK HEI</span>
            <span className="text-[#C5A880]">✦</span>
            <span className="text-[#E8E4DA] font-light">HERITAGE TOWN PONDICHERRY</span>
            <span className="text-[#C5A880]">✦</span>
            <span className="text-white font-light">CHEF RAJAN R SIGNATURES</span>
            <span className="text-[#C5A880]">✦</span>
          </div>
        </div>
      </div>

      {/* ─── 4. ACT II: THE PHILOSOPHY & HERITAGE (#about) ─── */}
      <section id="about" className="py-28 relative bg-[#070C09] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Story & Manifesto */}
            <div className="lg:col-span-6 space-y-8">
              <span className="text-[#C5A880] text-xs font-sans tracking-[0.28em] uppercase">
                01 / Our Philosophy
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-[1.12]">
                Purity Decreed by Lineage.{' '}
                <br />
                <span className="italic text-[#E8E4DA]">Mastery Forged in Fire.</span>
              </h2>

              <p className="font-serif italic text-xl text-[#C5A880] font-light border-l border-[#C5A880]/40 pl-6 leading-relaxed">
                “अन्नं परब्रह्म स्वरूपम् — Food is sacred divine consciousness. In our hearths, every handi is sealed with Vedic reverence, sal wood embers, and pure Gir cow bilona.”
              </p>

              <div className="space-y-4 text-neutral-300 font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Founded with an uncompromising vow to sacred pure vegetarian gastronomy, RASORAA reclaims centuries of culinary wisdom from the royal courts of Awadh, the clay pits of the Northwest Frontier, and the wok masters of the Silk Road.
                </p>
                <p className="text-neutral-400">
                  We maintain strictly independent preparation stations, dedicated pure-veg ustads, and bespoke Jain protocols that exclude onion, garlic, or root tubers upon royal request.
                </p>
              </div>

              {/* 4 Quiet Pillars */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/[0.08]">
                <div>
                  <span className="text-white block font-serif text-lg font-light">100% Shuddh</span>
                  <span className="text-xs text-neutral-400 font-light">Zero animal derivatives, enzymes, or compromises</span>
                </div>
                <div>
                  <span className="text-[#C5A880] block font-serif text-lg font-light">Strict Jain Hearth</span>
                  <span className="text-xs text-neutral-400 font-light">Dedicated root-free stations &amp; pure brass cookware</span>
                </div>
                <div>
                  <span className="text-white block font-serif text-lg font-light">16-Hour Dum</span>
                  <span className="text-xs text-neutral-400 font-light">Earthen clay handis sealed under smoldering sal wood</span>
                </div>
                <div>
                  <span className="text-[#22AA00] block font-serif text-lg font-light">A2 Gir Cow Butter</span>
                  <span className="text-xs text-neutral-400 font-light">Hand-churned bilona ghee from indigenous Vedic cows</span>
                </div>
              </div>
            </div>

            {/* Editorial Heritage Visual */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[32px] overflow-hidden border border-[#C5A880]/30 aspect-[4/5] shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
                <img
                  src="/dish-tandoor.jpg"
                  alt="Royal Tandoor Craft"
                  className="w-full h-full object-cover filter contrast-[1.08] hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040806] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8 text-left">
                  <span className="text-xs font-sans text-[#C5A880] tracking-[0.25em] uppercase block">
                    Heritage Alchemy
                  </span>
                  <h4 className="font-serif text-2xl text-white font-light pt-1">
                    Live Clay Pit Metallurgy at 400°C
                  </h4>
                  <p className="text-xs text-neutral-300 font-light pt-1">
                    Fresh hung curd, cold-pressed mustard oil, and hand-strung Kashmiri saffron roasted over direct fruitwood charcoal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. ACT III: THE IMPERIAL CARTE & INTERACTIVE MENU BOOK (#menu) ─── */}
      <section id="menu" className="py-24 sm:py-32 relative bg-[#060D08] border-b border-white/[0.06] overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#12361E]/20 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-[#C5A880] text-xs font-sans tracking-[0.28em] uppercase inline-flex items-center gap-2">
              <BookOpen size={14} className="text-[#C5A880]" />
              <span>02 / The Imperial Folio</span>
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-tight">
              Interactive Restaurant Book
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
              Experience our official 6-page dining carte as an authentic royal folio. Turn pages, browse chapters, or inspect every freshly prepared delicacy.
            </p>

            {/* Chef's Fresh Preparation Pledge from Official Menu */}
            <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#0D1812] border border-[#C5A880]/30 text-xs text-[#E8E4DA] font-light leading-relaxed text-center shadow-xl">
              <span className="font-serif italic text-base text-[#C5A880] block pb-1">
                “Fresh • Elegant • Authentic Dining Experience”
              </span>
              <p className="text-neutral-300">
                All dishes are freshly prepared upon order. We kindly request 20–25 minutes for preparation to ensure every plate meets our highest standards of freshness and flavor.
              </p>
            </div>
          </div>

          {/* 3D Physical Realistic Restaurant Book Folio */}
          <RasoraaBook onSelectDish={(dish) => setPreviewDish(dish)} />

          {/* Reserve CTA Footer */}
          <div className="mt-16 text-center">
            <a
              href="#reserve"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[#C5A880]/50 hover:border-[#C5A880] bg-[#122818] hover:bg-[#183620] text-[#FBF9F5] text-xs font-sans tracking-[0.2em] uppercase transition-all shadow-xl"
            >
              <Calendar size={13} className="text-[#C5A880]" />
              <span>Reserve Table For Degustation</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 6. ACT IV: VISUAL CHRONICLES (#gallery) ─── */}
      <section id="gallery" className="py-24 sm:py-28 relative bg-[#070C09] border-b border-white/[0.06] overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#12361E]/20 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-4">
            <span className="text-[#C8A962] text-xs font-sans tracking-[0.28em] uppercase">
              03 / Visual Chronicles
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#F4F0E6]">
              The Alchemy of Living Fire
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
              A photographic study of smoldering sal wood coals, hand-hammered brass handis, and the pure quietude of our dining salons.
            </p>
          </div>

          {/* Liquid Glass 3D Cover Flow Showcase */}
          <GlassCoverFlow
            items={GALLERY_ITEMS}
            initialIndex={1}
            onSelect={(item) => {
              const found = OFFICIAL_DISHES.find(
                (d) =>
                  d.name.toLowerCase().includes(item.title.toLowerCase()) ||
                  item.title.toLowerCase().includes(d.name.toLowerCase())
              );
              if (found) {
                setPreviewDish(found);
              } else {
                setPreviewDish({
                  id: item.id,
                  name: item.title,
                  category: item.category as any,
                  price: 495,
                  description: item.subtitle,
                  origin: 'Heritage Town, Pondicherry',
                  isJain: Boolean(item.isJain),
                  isSignature: Boolean(item.isSignature),
                  image: item.image,
                });
              }
            }}
          />
        </div>
      </section>

      {/* ─── 7. ACT V: ROYAL BANQUETS & PRIVATE EVENTS (#events) ─── */}
      <section id="events" className="py-28 relative bg-[#060A08] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[#C5A880] text-xs font-sans tracking-[0.28em] uppercase">
              04 / Royal Banquets &amp; Gatherings
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-white">
              Private Dining Salons
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
              Bespoke multi-course pure vegetarian galas served in hand-hammered silverware under crystal chandeliers.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {PRIVATE_EVENTS.map((salon) => (
              <div
                key={salon.id}
                className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0E1B13] to-[#060C08] border border-[#C5A880]/30 text-left space-y-6 shadow-2xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-sans text-[#C5A880] tracking-[0.2em] uppercase">
                      {salon.subtitle}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300">
                      <Users size={12} className="text-[#C5A880]" />
                      {salon.guests}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                    {salon.title}
                  </h3>

                  <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
                    {salon.desc}
                  </p>

                  <ul className="space-y-2 pt-2 text-xs font-light text-neutral-400">
                    {salon.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <Check size={12} className="text-[#C5A880] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <a
                    href="#reserve"
                    className="w-full py-3 rounded-full border border-[#C5A880]/60 hover:border-[#C5A880] text-center text-xs font-sans tracking-[0.2em] uppercase text-[#FBF9F5] hover:bg-[#C5A880]/10 transition-colors block"
                  >
                    Inquire For Salon
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. ACT VI: SANCTUARIES & RESERVATION SUITE (#contact & #reserve) ─── */}
      <section id="contact" className="py-28 relative bg-[#070B08] border-b border-white/[0.06]">
        <div id="reserve" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[#C5A880] text-xs font-sans tracking-[0.28em] uppercase">
              05 / Sanctuaries &amp; Concierge
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-white">
              Reserve Your Table
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
              Tables are released thirty days in advance. Dedicated Jain root-free stations prepared upon request.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left: Sanctuary Details */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-serif text-2xl text-white font-light pb-2 border-b border-white/10">
                Pondicherry Sanctuaries &amp; Salons
              </h3>

              <div className="space-y-4">
                {SANCTUARIES.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSanctuary(s.id)}
                    className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                      selectedSanctuary === s.id
                        ? 'bg-[#14281A] border-[#C5A880] shadow-[0_0_20px_rgba(197,168,128,0.2)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1">
                      <span className="font-serif text-lg text-white font-light">
                        {s.name}
                      </span>
                      <span className="text-xs font-mono text-[#C5A880]">{s.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-sans text-neutral-400 pt-1">
                      <MapPin size={12} className="text-[#C5A880] shrink-0" />
                      <span>{s.location}</span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light pt-2 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Instant WhatsApp Concierge Banner */}
              <div className="p-5 rounded-2xl bg-[#09150E] border border-[#25D366]/40 flex items-center justify-between gap-4">
                <div>
                  <span className="block text-xs font-sans text-[#25D366] font-medium tracking-wider uppercase">
                    Direct VIP Concierge
                  </span>
                  <span className="text-xs text-neutral-300 font-light">
                    Private salon bookings &amp; special Jain dietary inquiries
                  </span>
                </div>
                <a
                  href="https://wa.me/919484594845"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-black font-semibold text-xs tracking-wider uppercase transition-colors shrink-0 inline-flex items-center gap-1.5"
                >
                  <MessageCircle size={14} />
                  <span>Chat</span>
                </a>
              </div>
            </div>

            {/* Right: Bespoke Reservation Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0D1C13] to-[#060D08] border border-[#C5A880]/40 shadow-2xl text-left">
                {isBookingSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#183B22] border border-[#C5A880] mx-auto flex items-center justify-center text-[#C5A880]">
                      <Sparkles size={28} />
                    </div>
                    <h3 className="font-serif text-3xl text-white font-light">
                      Reservation Confirmed
                    </h3>
                    <p className="text-neutral-300 text-sm max-w-md mx-auto font-light leading-relaxed">
                      Honored Patron <strong className="text-white">{guestName}</strong>, your sanctuary table for <strong className="text-white">{guestCount} Guests</strong> on <strong className="text-white">{formatSelectedDateHuman(selectedDate)} ({selectedTime})</strong> has been registered.
                    </p>
                    <div className="text-xs font-mono text-[#C5A880]">
                      Confirmation dispatched to {guestPhone}. Our Chief Maître d' will greet you.
                    </div>
                    <button
                      onClick={() => {
                        setIsBookingSuccess(false);
                        setGuestName('');
                        setGuestPhone('');
                      }}
                      className="px-6 py-2.5 rounded-full border border-white/20 text-xs font-sans tracking-widest uppercase hover:bg-white/5"
                    >
                      Book Another Table
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <h3 className="font-serif text-2xl text-white font-light pb-2 border-b border-white/10">
                      Sanctuary Table Suite
                    </h3>

                    {/* Guest Count Selector */}
                    <div>
                      <label className="block text-xs font-sans text-neutral-400 uppercase tracking-widest mb-2">
                        Party Size
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#C5A880]"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-serif text-2xl text-white font-light w-16 text-center">
                          {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.min(16, guestCount + 1))}
                          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#C5A880]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Interactive Bespoke Luxury Calendar Picker */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-sans text-neutral-400 uppercase tracking-widest">
                          Dining Calendar Date
                        </label>
                        <span className="text-xs font-serif text-[#C5A880] italic">
                          {formatSelectedDateHuman(selectedDate)}
                        </span>
                      </div>

                      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                        {/* Month & Year Navigator */}
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <span className="font-serif text-lg text-white font-light tracking-wide">
                            {monthName}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={handlePrevMonth}
                              disabled={isCurrentMonth}
                              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#C5A880] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                              aria-label="Previous Month"
                            >
                              <ChevronLeft size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={handleNextMonth}
                              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white hover:border-[#C5A880] transition-colors"
                              aria-label="Next Month"
                            >
                              <ChevronRight size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Weekday Labels */}
                        <div className="grid grid-cols-7 gap-1 text-center text-[10.5px] font-sans text-neutral-500 uppercase tracking-wider py-1">
                          <span>Su</span>
                          <span>Mo</span>
                          <span>Tu</span>
                          <span>We</span>
                          <span>Th</span>
                          <span>Fr</span>
                          <span>Sa</span>
                        </div>

                        {/* Calendar Day Grid */}
                        <div className="grid grid-cols-7 gap-1 text-center">
                          {/* Empty offset days before 1st of month */}
                          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                            <div key={`offset-${i}`} className="h-8 sm:h-9" />
                          ))}

                          {/* Days of current month */}
                          {Array.from({ length: totalDaysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const disabled = isDayDisabled(day);
                            const selected = isDaySelected(day);
                            const isToday =
                              today.getDate() === day &&
                              today.getMonth() === calendarMonthIndex &&
                              today.getFullYear() === calendarYear;

                            return (
                              <button
                                key={`day-${day}`}
                                type="button"
                                disabled={disabled}
                                onClick={() => handleSelectDay(day)}
                                className={`h-8 sm:h-9 rounded-xl text-xs font-mono transition-all duration-200 flex items-center justify-center ${
                                  selected
                                    ? 'bg-[#183620] text-white font-bold border border-[#C5A880] shadow-[0_0_15px_rgba(197,168,128,0.3)] scale-[1.05]'
                                    : disabled
                                    ? 'text-neutral-600 opacity-25 cursor-not-allowed'
                                    : isToday
                                    ? 'text-[#C5A880] border border-[#C5A880]/40 hover:bg-white/10'
                                    : 'text-neutral-300 hover:text-white hover:bg-white/[0.08]'
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>

                        {/* Quick Selection Footer */}
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                          <span className="flex items-center gap-1.5 text-neutral-400">
                            <Calendar size={12} className="text-[#C5A880]" />
                            <span>Reserved For: <strong className="text-white">{formatSelectedDateHuman(selectedDate)}</strong></span>
                          </span>
                          <label className="cursor-pointer text-[#C5A880] hover:underline flex items-center gap-1">
                            <span>Pick from OS Datepicker</span>
                            <input
                              type="date"
                              min={todayISO}
                              value={selectedDate}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setSelectedDate(e.target.value);
                                  const [y, m] = e.target.value.split('-').map(Number);
                                  setCalendarViewDate(new Date(y, m - 1, 1));
                                }
                              }}
                              className="sr-only"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Twilight Session */}
                    <div>
                      <label className="block text-xs font-sans text-neutral-400 uppercase tracking-widest mb-2">
                        Twilight Session
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['12:30 PM', '4:00 PM', '8:00 PM', '10:00 PM'].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setSelectedTime(t)}
                            className={`py-2 px-2 rounded-xl text-xs font-mono border transition-colors ${
                              selectedTime === t
                                ? 'bg-[#183620] text-[#C5A880] border-[#C5A880]'
                                : 'bg-white/[0.02] text-neutral-400 border-white/10 hover:border-white/30'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Strict Jain Dietary Toggle */}
                    <div className="pt-2">
                      <label
                        onClick={() => setIsJainDiet(!isJainDiet)}
                        className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 cursor-pointer hover:border-[#C5A880]/50 transition-colors"
                      >
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            isJainDiet
                              ? 'bg-[#22AA00] border-[#22AA00] text-black'
                              : 'border-white/30'
                          }`}
                        >
                          {isJainDiet && <Check size={13} strokeWidth={3} />}
                        </div>
                        <div className="text-left">
                          <span className="block text-xs font-sans font-medium text-white tracking-wider uppercase">
                            Strict Jain Preparation (Root-Free)
                          </span>
                          <span className="text-[11px] text-neutral-400 font-light">
                            Dedicated root-free station without onion, garlic, or underground tubers.
                          </span>
                        </div>
                      </label>
                    </div>

                    {/* Name & Phone Inputs */}
                    <div className="grid sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-[11px] font-sans text-neutral-400 uppercase tracking-widest mb-1.5">
                          Patron Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Lord / Lady Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-sans text-neutral-400 uppercase tracking-widest mb-1.5">
                          Mobile Telephone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+91 98100 XXXXX"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full border border-[#C5A880] bg-gradient-to-r from-[#183620] via-[#112918] to-[#183620] hover:from-[#22AA00] hover:to-[#178500] hover:text-black text-[#FBF9F5] font-medium text-xs tracking-[0.22em] uppercase transition-all duration-500 shadow-2xl hover:shadow-[0_0_35px_rgba(34,170,0,0.4)]"
                    >
                      Confirm Sanctuary Reservation
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. LUXURY EDITORIAL FOOTER ─── */}
      <footer className="border-t border-white/[0.08] bg-[#040705] pt-20 pb-14 text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 pb-14 border-b border-white/[0.08]">
            {/* Brand Manifesto */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div className="flex items-center gap-3.5">
                <img
                  src="/logo.png"
                  alt="RASORAA"
                  className="h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(34,170,0,0.4)]"
                />
                <span className="font-serif text-2xl font-light tracking-[0.26em] text-white">
                  RASORAA
                </span>
              </div>
              <p className="font-serif italic text-base text-[#C5A880] font-light">
                “अन्नं परब्रह्म स्वरूपम्”
              </p>
              <p className="text-xs font-light leading-relaxed max-w-sm text-neutral-400">
                A 100% Shuddh Shakahari &amp; Jain royal fine-dining sanctuary honoring the sacred traditions of earthenware clay handis, living charcoal embers, and artisanal precision.
              </p>
              <div className="flex items-center gap-2 text-xs font-sans text-[#22AA00]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22AA00]" />
                <span>Certified Vedic Vegetarian &amp; Jain Hearth</span>
              </div>

              {/* Verified Social Channels */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-neutral-300 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all"
                  aria-label="Facebook"
                >
                  <Facebook size={15} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-neutral-300 hover:text-white hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="https://wa.me/919484594845"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-neutral-300 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all"
                  aria-label="WhatsApp Concierge"
                >
                  <MessageCircle size={15} />
                </a>
              </div>
            </div>

            {/* Sanctuaries & Address */}
            <div className="lg:col-span-4 space-y-3 text-left">
              <h4 className="font-sans text-xs text-white uppercase tracking-[0.22em]">
                Flagship Heritage Address
              </h4>
              <p className="text-xs font-light text-neutral-300 leading-relaxed">
                39, Ambalathadayar Madam Street,<br />
                Heritage Town, Pondicherry — 605 001
              </p>
              <div className="pt-2 text-xs font-light text-neutral-400">
                <span className="text-[#C5A880] block font-serif text-sm">Rajan R</span>
                <span>Founder &amp; Managing Partner</span>
              </div>
              <div className="pt-1 text-xs font-mono text-neutral-400">
                <a href="mailto:rajan@rasoraa.com" className="hover:text-[#C5A880] transition-colors">
                  rajan@rasoraa.com
                </a>
              </div>
            </div>

            {/* Concierge & Hours */}
            <div className="lg:col-span-3 space-y-3 text-left">
              <h4 className="font-sans text-xs text-white uppercase tracking-[0.22em]">
                Concierge &amp; Reservations
              </h4>
              <ul className="space-y-2 text-xs font-light text-neutral-400">
                <li>Daily: 11:30 AM – 11:30 PM</li>
                <li>
                  <a href="tel:+919484594845" className="text-[#C5A880] hover:underline font-mono">
                    +91 94845 94845
                  </a>
                  <span className="text-neutral-500 mx-1.5">/</span>
                  <a href="tel:+919942023456" className="text-[#C5A880] hover:underline font-mono">
                    99420 23456
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919484594845"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline flex items-center gap-1.5 pt-1"
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp Concierge</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] font-sans text-neutral-500">
            <span>© {new Date().getFullYear()} RASORAA Imperial Dining. All Rights Reserved.</span>
            <div className="flex items-center space-x-6">
              <a href="#about" className="hover:text-neutral-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#about" className="hover:text-neutral-400 transition-colors">
                Terms of Decree
              </a>
              <a href="#contact" className="hover:text-neutral-400 transition-colors">
                Sanctuary Press
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── 10. DISH PREVIEW LIGHTBOX MODAL ─── */}
      <AnimatePresence>
        {previewDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewDish(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-3xl overflow-hidden bg-[#070D09] border border-[#C5A880]/40 shadow-2xl text-left"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={previewDish.image}
                  alt={previewDish.name}
                  className="w-full h-full object-cover filter contrast-[1.08]"
                />
                <button
                  onClick={() => setPreviewDish(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/90"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-sans text-[#C5A880] tracking-widest uppercase">
                    {previewDish.category} · {previewDish.origin}
                  </span>
                  <span className="font-mono text-base font-medium text-[#22AA00]">
                    ₹{previewDish.price}
                  </span>
                </div>

                <h3 className="font-serif text-3xl text-white font-light">
                  {previewDish.name}
                </h3>

                <p className="text-neutral-300 text-sm font-light leading-relaxed">
                  {previewDish.description}
                </p>

                <div className="pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-sans text-[#22AA00]">
                    <span className="w-2 h-2 rounded-full bg-[#22AA00]" />
                    <span>{previewDish.isJain ? '100% Shuddh & Jain Available' : '100% Shuddh Shakahari'}</span>
                  </div>
                  <a
                    href="#reserve"
                    onClick={() => setPreviewDish(null)}
                    className="px-5 py-2 rounded-full bg-[#183620] border border-[#C5A880] text-xs font-sans tracking-wider uppercase text-white hover:bg-[#22AA00] hover:text-black transition-colors"
                  >
                    Reserve Table
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
