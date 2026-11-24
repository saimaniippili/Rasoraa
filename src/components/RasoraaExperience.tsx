import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react';

type Dish = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  profile: string;
  jain: boolean;
  note: string;
  isSignature?: boolean;
  image: string;
};

const DISHES: Dish[] = [
  {
    id: 'd1',
    name: 'Dal Rasoraa Imperial',
    tagline: '16-Hour Wood Ember Simmered Urad Lentils',
    category: 'Earthenware Dum',
    price: 680,
    profile: 'Smoky charcoal · Cultured Gir cow cream · Slow heat',
    jain: true,
    note: 'Black urad lentils breathe for sixteen hours in a sealed earthenware handi over wood embers, hand-folded with churned A2 cultured butter.',
    isSignature: true,
    image: '/dish-awadhi.jpg',
  },
  {
    id: 'd2',
    name: 'Angari Malai Paneer Tikka',
    tagline: 'Gir Cow Curd Paneer · Wild Mountain Saffron',
    category: 'Royal Tandoor',
    price: 740,
    profile: 'Wild saffron · Charred lime · 400°C charcoal warmth',
    jain: true,
    note: 'Handcrafted fresh Gir cow milk paneer rested in mountain saffron threads and hung curd before meeting the live clay tandoor.',
    isSignature: true,
    image: '/dish-tandoor.jpg',
  },
  {
    id: 'd3',
    name: 'Truffle Edamame Hakka Noodles',
    tagline: 'Artisanal Wok Noodles · Black Truffle Oil',
    category: 'Pan-Asian Wok',
    price: 720,
    profile: 'Wok breath (Wok Hei) · Black truffle · Fresh shiitake',
    jain: true,
    note: 'Hand-pulled artisanal noodles flashed over roaring cast-iron wok embers with tender young edamame, shaved black truffle, and cold-pressed sesame.',
    isSignature: true,
    image: '/dish-oriental.jpg',
  },
  {
    id: 'd4',
    name: 'Wild Morel & Herb Gratin Crostini',
    tagline: 'Stone Hearth Sourdough · Kashmir Morel Velouté',
    category: 'Continental Hearth',
    price: 780,
    profile: 'Charred sourdough · Cultured cream · Garden rosemary',
    jain: false,
    note: 'Wild foraged gucchi morels in velvet herb reduction, served over garlic-rubbed artisanal stone-hearth sourdough with cold-churned cream.',
    isSignature: true,
    image: '/dish-continental.jpg',
  },
  {
    id: 'd5',
    name: 'Subz Awadhi Dum Biryani',
    tagline: 'Aged Basmati · Farm Vegetables · Damascus Rose',
    category: 'Earthenware Dum',
    price: 750,
    profile: 'Aged basmati · Kashmiri saffron · Damascus rose attar',
    jain: true,
    note: 'Four-year aged Himalayan basmati layered with tender garden vegetables and saffron milk, sealed with whole wheat dough under burning coals.',
    isSignature: true,
    image: '/dish-awadhi.jpg',
  },
  {
    id: 'd6',
    name: 'Bhutte Ke Kebab & Mint Emulsion',
    tagline: 'Tender Sweet Corn · Pounded Cardamom · Cold-Pressed Ghee',
    category: 'Royal Tandoor',
    price: 660,
    profile: 'Tender corn · Smoked cloves · Forest coriander',
    jain: true,
    note: 'Freshly harvested monsoon sweet corn mashed on stone with toasted royal cumin and pan-crisped in copper skillets with fresh mint reduction.',
    isSignature: true,
    image: '/dish-tandoor.jpg',
  },
];

const DISCIPLINES = [
  {
    num: '01',
    title: 'The Awadhi Dum',
    subtitle: '16-Hour Clay Handi Embers',
    desc: 'Ancient seal of whole wheat dough trapping wild herbs, mountain saffron, and stone-ground spices over smoldering sal wood.',
    badge: 'Ancient Heritage',
    image: '/dish-awadhi.jpg',
  },
  {
    num: '02',
    title: 'The Live Tandoor',
    subtitle: '400°C Clay Pit Metallurgy',
    desc: 'Pristine Gir cow dairy, cold-hung yogurt, and smoked mountain spices flash-roasted on skewers in intense clay radiant heat.',
    badge: 'Fire & Smoke',
    image: '/dish-tandoor.jpg',
  },
  {
    num: '03',
    title: 'Pan-Asian Wok',
    subtitle: 'High-Flame Wok Breath (Hei)',
    desc: 'High-heat roaring fires searing farm-crisp shoots, shiitake fungi, black truffle essence, and hand-pulled noodles.',
    badge: 'Wok Alchemy',
    image: '/dish-oriental.jpg',
  },
  {
    num: '04',
    title: 'Continental Hearth',
    subtitle: 'Artisanal Stone Fire Hearth',
    desc: 'Rustic sourdough hearth loaves, wild gucchi morels, aged plant-based veloutés, and aromatic garden-harvest herbs.',
    badge: 'Stone Oven',
    image: '/dish-continental.jpg',
  },
];

const SANCTUARIES = [
  {
    id: 'z1',
    name: 'The Royal Awadhi Dum Court',
    hall: 'Central Courtyard',
    capacity: 'Up to 60 Patrons',
    desc: 'Surrounded by hand-carved Makrana marble archways, fragrant jasmine pools, and live evening sitar acoustics.',
    vibe: 'Grand Heritage Dining',
  },
  {
    id: 'z2',
    name: 'The Sheesh-Mahal Salon',
    hall: 'Private Dining Alcove',
    capacity: '8 to 16 Patrons',
    desc: 'Inlaid with thousands of convex mirror rosettes and lit by antique Belgian crystal chandeliers for bespoke gatherings.',
    vibe: 'Private Royal Suite',
  },
  {
    id: 'z3',
    name: 'The Garden Conservatory',
    hall: 'Glass Pavilion',
    capacity: '24 Patrons',
    desc: 'A botanical glass sanctum under the evening stars, surrounded by night-blooming parijat and brass fire pits.',
    vibe: 'Al Fresco Romance',
  },
  {
    id: 'z4',
    name: 'Live Tandoor & Wok Counter',
    hall: 'Culinary Front Row',
    capacity: '12 Patrons',
    desc: 'Countertop seats facing the master ustads as live charcoal embers glow and hand-thrown roomali rotis fly.',
    vibe: 'Interactive Gastronomy',
  },
];

const FLOATING_SPICES = [
  { name: 'Kashmiri Saffron', hindi: 'केसर', pos: 'top-10 left-6 sm:top-16 sm:left-12', delay: 0 },
  { name: 'Green Cardamom', hindi: 'इलायची', pos: 'top-20 right-8 sm:top-24 sm:right-16', delay: 1.5 },
  { name: 'Star Anise', hindi: 'चक्र फूल', pos: 'bottom-24 left-10 sm:bottom-32 sm:left-20', delay: 3 },
  { name: 'Fresh Basil Sprig', hindi: 'तुलसी दल', pos: 'bottom-16 right-6 sm:bottom-20 sm:right-16', delay: 2 },
];

export const RasoraaExperience: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedZone, setSelectedZone] = useState<string>('z1');
  const [guestCount, setGuestCount] = useState<number>(4);
  const [selectedDate, setSelectedDate] = useState<string>('Tonight');
  const [selectedSession, setSelectedSession] = useState<string>('Twilight Dinner (8:00 PM)');
  const [isJainStrict, setIsJainStrict] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Earthenware Dum', 'Royal Tandoor', 'Pan-Asian Wok', 'Continental Hearth'];

  const filteredDishes = useMemo(() => {
    if (activeCategory === 'All') return DISHES;
    return DISHES.filter((d) => d.category === activeCategory);
  }, [activeCategory]);

  const activeZone = SANCTUARIES.find((s) => s.id === selectedZone) || SANCTUARIES[0];

  const scrollReel = (direction: 'left' | 'right') => {
    if (!reelRef.current) return;
    const scrollAmount = 360;
    reelRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-[#08100C] text-[#F7F6F2] font-sans selection:bg-[#22AA00] selection:text-black overflow-x-hidden">
      {/* ─── 0. TOP PRE-HEADER RAIL ─── */}
      <div className="border-b border-[#22AA00]/20 bg-[#050B08] text-[11px] font-mono tracking-wider py-2 px-4 sm:px-8 text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 text-[#22AA00] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#22AA00] animate-pulse" />
              100% SHUDDH SHAKAHARI
            </span>
            <span className="text-neutral-600 hidden sm:inline">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-neutral-300">
              <ShieldCheck size={13} className="text-[#22AA00]" /> JAIN CERTIFIED KITCHEN
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <MapPin size={12} className="text-[#22AA00]" /> Connaught Place · Mehrauli · Aerocity
            </span>
            <span className="text-neutral-600 hidden md:inline">|</span>
            <span className="hidden md:inline text-neutral-400">
              28.6139° N, 77.2090° E
            </span>
          </div>
        </div>
      </div>

      {/* ─── 1. FIXED LUXURY NAVBAR (Crust & Crave 3-Column Architecture) ─── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#08100C]/95 backdrop-blur-md border-b border-[#22AA00]/25 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-[#08100C]/75 backdrop-blur-sm border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left Column: Brand Logo & Title */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 flex-shrink-0 rounded-full p-1 bg-gradient-to-tr from-[#22AA00]/30 to-white/10 border border-[#22AA00]/40 group-hover:border-[#22AA00] transition-colors">
              <img
                src="/logo.png"
                alt="RASORAA Pure Veg"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(34,170,0,0.5)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white group-hover:text-[#22AA00] transition-colors leading-none">
                RASORAA
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#22AA00] uppercase mt-1">
                Pure Veg &amp; Jain Fine Dining
              </span>
            </div>
          </Link>

          {/* Middle Column: Desktop Navigation (Zero overlap guaranteed) */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wider text-neutral-300">
            <a href="#hero" className="hover:text-[#22AA00] transition-colors">
              EXPERIENCE
            </a>
            <a href="#reel" className="hover:text-[#22AA00] transition-colors">
              SIGNATURES
            </a>
            <a href="#disciplines" className="hover:text-[#22AA00] transition-colors">
              THE DISCIPLINES
            </a>
            <a href="#carte" className="hover:text-[#22AA00] transition-colors">
              THE CARTE
            </a>
            <a href="#sanctuaries" className="hover:text-[#22AA00] transition-colors">
              SEATING COURTS
            </a>
            <a href="#reserve" className="hover:text-[#22AA00] transition-colors">
              RESERVATIONS
            </a>
          </nav>

          {/* Right Column: Actions (Desktop & Mobile) */}
          <div className="flex items-center gap-3.5">
            <a
              href="tel:+911141002800"
              className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white px-3 py-2 rounded-full border border-white/10 hover:border-[#22AA00]/40 transition-colors"
            >
              <Phone size={13} className="text-[#22AA00]" />
              <span>+91 11 4100 2800</span>
            </a>

            <a
              href="#reserve"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#22AA00] hover:bg-[#1E9500] text-black font-semibold text-xs tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(34,170,0,0.4)] hover:shadow-[0_0_30px_rgba(34,170,0,0.7)] hover:-translate-y-0.5"
            >
              <Calendar size={14} />
              <span className="uppercase">Book Table</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full border border-white/10 text-neutral-200 hover:text-[#22AA00] hover:border-[#22AA00]/40 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-b border-[#22AA00]/20 bg-[#08100C]/98 px-6 py-6 overflow-hidden"
            >
              <div className="flex flex-col space-y-4 text-base font-medium tracking-wide">
                <a
                  href="#hero"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between hover:text-[#22AA00]"
                >
                  <span>01 // EXPERIENCE</span>
                  <ArrowRight size={14} className="text-[#22AA00]" />
                </a>
                <a
                  href="#reel"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between hover:text-[#22AA00]"
                >
                  <span>02 // SIGNATURE REEL</span>
                  <ArrowRight size={14} className="text-[#22AA00]" />
                </a>
                <a
                  href="#disciplines"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between hover:text-[#22AA00]"
                >
                  <span>03 // THE 4 DISCIPLINES</span>
                  <ArrowRight size={14} className="text-[#22AA00]" />
                </a>
                <a
                  href="#carte"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between hover:text-[#22AA00]"
                >
                  <span>04 // THE CARTE</span>
                  <ArrowRight size={14} className="text-[#22AA00]" />
                </a>
                <a
                  href="#sanctuaries"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between hover:text-[#22AA00]"
                >
                  <span>05 // SEATING SANCTUARIES</span>
                  <ArrowRight size={14} className="text-[#22AA00]" />
                </a>
                <a
                  href="#reserve"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 flex items-center justify-between text-[#22AA00] font-semibold"
                >
                  <span>06 // INSTANT TABLE BOOKING</span>
                  <Calendar size={16} />
                </a>

                <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                  <a
                    href="tel:+911141002800"
                    className="w-full py-3 rounded-xl border border-[#22AA00]/40 text-center text-sm font-mono text-[#22AA00] hover:bg-[#22AA00]/10"
                  >
                    Direct Concierge: +91 11 4100 2800
                  </a>
                  <a
                    href="#reserve"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3.5 rounded-xl bg-[#22AA00] text-black font-bold text-center text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(34,170,0,0.5)]"
                  >
                    Confirm Table Reservation
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── 2. KINETIC HERO SECTION (Crust & Crave Style with Parallax Spices) ─── */}
      <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
        {/* Giant Kinetic Outlined Watermark in Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <span className="font-serif text-[18vw] font-black uppercase text-transparent tracking-tighter whitespace-nowrap [-webkit-text-stroke:2px_#22AA00]">
            RASORAA · SHAKAHARI · RASORAA
          </span>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#22AA00]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-[#C8A962]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Category pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#22AA00]/40 bg-[#22AA00]/10 text-[#22AA00] text-xs font-mono tracking-widest uppercase">
                <Sparkles size={13} />
                <span>Fine Dining Stripped of Compromise</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                The Royal Art of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22AA00] via-[#55DD22] to-[#E5C378]">
                  Living Fire
                </span>{' '}
                &amp; Vegetarian Alchemy.
              </h1>

              {/* Lead paragraph */}
              <p className="text-neutral-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
                Where century-old royal Awadhi dum handis, 400°C charcoal tandoors, and screaming pan-Asian woks converge in a single 100% Shuddh Shakahari &amp; Jain-certified culinary sanctuary.
              </p>

              {/* Dual CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="#reserve"
                  className="px-8 py-4 rounded-full bg-[#22AA00] hover:bg-[#1E9500] text-black font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(34,170,0,0.5)] hover:shadow-[0_0_40px_rgba(34,170,0,0.8)] hover:-translate-y-1 inline-flex items-center gap-2.5"
                >
                  <Calendar size={16} />
                  <span>Reserve Table</span>
                </a>

                <a
                  href="#reel"
                  className="px-8 py-4 rounded-full border border-white/20 hover:border-[#22AA00] text-white hover:text-[#22AA00] font-medium text-sm tracking-widest uppercase transition-all duration-300 backdrop-blur-sm hover:bg-white/5 inline-flex items-center gap-2"
                >
                  <span>Explore Signatures</span>
                  <ArrowRight size={15} />
                </a>
              </div>

              {/* Prestige Trust Bar */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-bold font-serif text-[#22AA00]">100%</div>
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    Pure Vegetarian
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif text-[#C8A962]">16 hrs</div>
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    Wood Ember Dum
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-serif text-white">4.9 ★</div>
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    1,400+ Patrons
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Central Floating Culinary Stage (Crust & Crave Core) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Outer decorative halo */}
              <div className="relative w-[320px] sm:w-[420px] aspect-square flex items-center justify-center">
                {/* Rotating Dashed Orbit */}
                <div className="absolute inset-0 rounded-full border border-dashed border-[#22AA00]/30 animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-6 rounded-full border border-white/10" />

                {/* Central Dish Platter Artwork */}
                <div className="relative w-[78%] aspect-square rounded-full overflow-hidden p-2 bg-gradient-to-tr from-[#22AA00]/40 via-transparent to-[#C8A962]/30 border-2 border-[#22AA00]/60 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(34,170,0,0.4)]">
                  <img
                    src="/dish-awadhi.jpg"
                    alt="Dal Rasoraa Imperial"
                    className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 pointer-events-none" />
                </div>

                {/* Floating Botanicals & Spices with Parallax Hover */}
                {FLOATING_SPICES.map((spice, idx) => (
                  <motion.div
                    key={spice.name}
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4 + idx,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: spice.delay,
                    }}
                    className={`absolute ${spice.pos} z-20 px-3 py-1.5 rounded-full bg-[#0D1C16]/90 backdrop-blur-md border border-[#22AA00]/40 text-xs font-mono shadow-[0_8px_20px_rgba(0,0,0,0.6)] flex items-center gap-1.5`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22AA00]" />
                    <span className="text-white font-medium">{spice.name}</span>
                    <span className="text-[#22AA00] text-[10px]">{spice.hindi}</span>
                  </motion.div>
                ))}

                {/* Michelin / Award Gold Seal Badge */}
                <div className="absolute -bottom-4 right-4 z-20 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#193325] to-[#0A1610] border border-[#C8A962]/50 shadow-[0_10px_25px_rgba(0,0,0,0.8)] text-left flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#C8A962]/20 border border-[#C8A962] flex items-center justify-center text-[#C8A962] font-serif font-bold text-base">
                    ★
                  </div>
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#C8A962] uppercase">
                      Michelin Recommended
                    </div>
                    <div className="text-xs font-bold text-white">
                      Pure Vegetarian Excellence
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. VELOCITY MARQUEE STRIP (From Scenes4.tsx) ─── */}
      <div className="border-y border-[#22AA00]/30 bg-[#22AA00] py-3.5 overflow-hidden text-black font-black select-none">
        <div className="flex w-max animate-[marquee_25s_linear_infinite] space-x-8 text-xs sm:text-sm tracking-[0.25em] uppercase">
          <span>AWADHI DUM HANDIS</span>
          <span>✦</span>
          <span>100% SHUDDH SHAKAHARI</span>
          <span>✦</span>
          <span>LIVE CLAY TANDOORS</span>
          <span>✦</span>
          <span>STRICT JAIN PREPARATION</span>
          <span>✦</span>
          <span>PAN-ASIAN WOK HEI</span>
          <span>✦</span>
          <span>STONE HEARTH SOURDOUGH</span>
          <span>✦</span>
          <span>CONNAUGHT PLACE &amp; MEHRAULI</span>
          <span>✦</span>
          <span>AWADHI DUM HANDIS</span>
          <span>✦</span>
          <span>100% SHUDDH SHAKAHARI</span>
          <span>✦</span>
          <span>LIVE CLAY TANDOORS</span>
          <span>✦</span>
        </div>
      </div>

      {/* ─── 4. SIGNATURE CARD REEL (Horizontal Snap Reel - Reel.tsx Style) ─── */}
      <section id="reel" className="py-24 relative overflow-hidden bg-[#0A1410]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-[#22AA00] text-xs font-mono tracking-[0.25em] uppercase flex items-center gap-2">
                <Utensils size={14} /> Scene 03 // Signature Masterpieces
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
                The Master’s Tasting Reel.
              </h2>
            </div>

            {/* Carousel navigation controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollReel('left')}
                className="w-12 h-12 rounded-full border border-white/20 hover:border-[#22AA00] flex items-center justify-center text-white hover:text-[#22AA00] transition-colors"
                aria-label="Previous Dish"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollReel('right')}
                className="w-12 h-12 rounded-full border border-white/20 hover:border-[#22AA00] flex items-center justify-center text-white hover:text-[#22AA00] transition-colors"
                aria-label="Next Dish"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Horizontal Snap Reel */}
          <div
            ref={reelRef}
            className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {DISHES.map((dish, index) => {
              const numStr = (index + 1).toString().padStart(2, '0');
              return (
                <article
                  key={dish.id}
                  className="relative flex-shrink-0 w-[300px] sm:w-[380px] h-[520px] rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#162720] via-[#0E1A15] to-[#08100C] p-7 flex flex-col justify-between overflow-hidden group snap-center hover:border-[#22AA00]/50 transition-all duration-300"
                >
                  {/* Giant Outline Number in Background */}
                  <span className="font-serif text-[10rem] font-bold text-[#22AA00]/10 select-none pointer-events-none absolute -right-4 -top-8 leading-none">
                    {numStr}
                  </span>

                  {/* Top Tags */}
                  <div className="flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-[#22AA00]/20 text-[#22AA00] border border-[#22AA00]/30">
                      {dish.category}
                    </span>
                    {dish.jain && (
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase bg-white/10 text-[#C8A962] border border-[#C8A962]/40">
                        Jain Available
                      </span>
                    )}
                  </div>

                  {/* Central Dish Artwork with Emerald Glow */}
                  <div className="relative mx-auto my-2 aspect-square w-[72%]">
                    <div className="absolute inset-0 rounded-full bg-[#22AA00]/20 blur-2xl group-hover:bg-[#22AA00]/35 transition-colors" />
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="relative w-full h-full object-cover rounded-full drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card Content & Action */}
                  <div className="relative z-10 space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#22AA00] transition-colors leading-tight">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 font-light">
                      {dish.note}
                    </p>

                    <div className="pt-3 flex items-center justify-between border-t border-white/10">
                      <div>
                        <span className="text-xs text-neutral-400 font-mono">Price </span>
                        <span className="text-xl font-bold font-serif text-[#22AA00]">
                          ₹{dish.price}
                        </span>
                      </div>

                      <a
                        href="#reserve"
                        className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#22AA00] text-white hover:text-black font-semibold text-xs tracking-wider transition-colors inline-flex items-center gap-1.5"
                      >
                        <Plus size={14} />
                        <span>Reserve Taste</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. THE 4 SACRED DISCIPLINES (Scenes2.tsx Editorial Grid) ─── */}
      <section id="disciplines" className="py-24 relative bg-[#08100C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#22AA00] text-xs font-mono tracking-[0.25em] uppercase">
              The Four Culinary Disciplines
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-3">
              One Temple. Four Sacred Fires.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-4 font-light">
              Rasoraa does not compromise. Each of our four kitchens operates with dedicated chefs, bespoke hearths, and independent preparation stations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DISCIPLINES.map((d) => (
              <div
                key={d.num}
                className="group relative rounded-3xl border border-white/10 bg-[#0E1C16] p-6 hover:border-[#22AA00]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#22AA00] mb-4">
                    <span>{d.num}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#22AA00]/10 border border-[#22AA00]/30 text-[10px]">
                      {d.badge}
                    </span>
                  </div>

                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                    <img
                      src={d.image}
                      alt={d.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1C16] via-transparent to-transparent" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#22AA00] transition-colors">
                    {d.title}
                  </h3>
                  <div className="text-xs font-mono text-[#C8A962] mt-1">
                    {d.subtitle}
                  </div>
                  <p className="text-xs text-neutral-400 mt-3 font-light leading-relaxed">
                    {d.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-300 group-hover:text-[#22AA00] transition-colors">
                  <span className="font-mono">Explore Carte</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. THE INTERACTIVE CARTE (Scenes3.tsx Flavor Switch Style) ─── */}
      <section id="carte" className="py-24 relative bg-[#0A1410] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#22AA00] text-xs font-mono tracking-[0.25em] uppercase">
              A la Carte Gastronomy
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
              The Imperial Vegetarian Carte.
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-3">
              Filter by culinary fire and explore our signature recipes.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#22AA00] text-black font-bold shadow-[0_0_20px_rgba(34,170,0,0.5)]'
                    : 'bg-[#101F18] border border-white/10 text-neutral-300 hover:text-white hover:border-[#22AA00]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dishes Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="rounded-3xl border border-white/10 bg-[#0E1A15] p-6 hover:border-[#22AA00]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-[#22AA00] uppercase tracking-wider">
                      {dish.category}
                    </span>
                    {dish.jain && (
                      <span className="text-[10px] font-mono text-[#C8A962] bg-[#C8A962]/10 px-2 py-0.5 rounded-full border border-[#C8A962]/30">
                        Jain
                      </span>
                    )}
                  </div>

                  <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-[#22AA00] font-mono mt-1">
                    {dish.tagline}
                  </p>
                  <p className="text-xs text-neutral-400 mt-2 font-light line-clamp-2">
                    {dish.note}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-lg font-bold font-serif text-white">
                    ₹{dish.price}
                  </span>
                  <a
                    href="#reserve"
                    className="text-xs font-mono text-[#22AA00] hover:underline flex items-center gap-1"
                  >
                    <span>Reserve</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. SEATING SANCTUARIES & BOOKING CONCIERGE ─── */}
      <section id="sanctuaries" className="py-24 relative bg-[#08100C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#22AA00] text-xs font-mono tracking-[0.25em] uppercase">
              Sanctuaries of Delhi
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
              Select Your Seating Court.
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-3">
              Each dining room features its own distinct acoustic and visual ambiance.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6 mb-16">
            {SANCTUARIES.map((sanctuary) => {
              const isSelected = selectedZone === sanctuary.id;
              return (
                <div
                  key={sanctuary.id}
                  onClick={() => setSelectedZone(sanctuary.id)}
                  className={`cursor-pointer rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#22AA00] bg-[#14291F] shadow-[0_0_30px_rgba(34,170,0,0.25)]'
                      : 'border-white/10 bg-[#0E1A15] hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono text-neutral-400 uppercase">
                        {sanctuary.hall}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#22AA00]" />
                      )}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white">
                      {sanctuary.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-2 font-light leading-relaxed">
                      {sanctuary.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#C8A962]">{sanctuary.vibe}</span>
                    <span className="text-neutral-400">{sanctuary.capacity}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Reservation Box */}
          <div
            id="reserve"
            className="rounded-[2.5rem] border border-[#22AA00]/40 bg-gradient-to-br from-[#12221A] to-[#0A1410] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
          >
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-[#22AA00] text-xs font-mono tracking-widest uppercase">
                  Confirmed Seating Suite
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mt-1">
                  Book Table at {activeZone.name}
                </h3>
              </div>

              {bookingConfirmed ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#22AA00]/20 border border-[#22AA00] mx-auto flex items-center justify-center text-[#22AA00]">
                    <Check size={32} />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-white">
                    Table Reserved with Royal Honor!
                  </h4>
                  <p className="text-neutral-300 text-sm max-w-md mx-auto font-light">
                    Your reservation for {guestCount} patrons in {activeZone.name} on {selectedDate} ({selectedSession}) is confirmed under booking reference #RAS-{Math.floor(1000 + Math.random() * 9000)}.
                  </p>
                  <p className="text-[#22AA00] text-xs font-mono">
                    {isJainStrict ? '✓ Strictly Jain Kitchen Protocol Assigned' : '✓ Pure Vegetarian Protocol'}
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setBookingConfirmed(false)}
                      className="px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase text-white hover:border-[#22AA00]"
                    >
                      Make Another Booking
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Stepper & Session Row */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Guest Count Stepper */}
                    <div className="bg-[#08100C]/80 p-4 rounded-2xl border border-white/10">
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                        Number of Patrons
                      </label>
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#22AA00]"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-serif text-2xl font-bold text-white">
                          {guestCount} Guests
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.min(16, guestCount + 1))}
                          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#22AA00]"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Date Picker */}
                    <div className="bg-[#08100C]/80 p-4 rounded-2xl border border-white/10">
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                        Dining Evening
                      </label>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-transparent text-white font-serif text-lg outline-none cursor-pointer"
                      >
                        <option value="Tonight" className="bg-[#08100C]">Tonight (Recommended)</option>
                        <option value="Tomorrow" className="bg-[#08100C]">Tomorrow Evening</option>
                        <option value="Friday Gala" className="bg-[#08100C]">This Friday Gala</option>
                        <option value="Saturday Feast" className="bg-[#08100C]">This Saturday Feast</option>
                        <option value="Sunday Soirée" className="bg-[#08100C]">This Sunday Soirée</option>
                      </select>
                    </div>
                  </div>

                  {/* Session Selection */}
                  <div className="bg-[#08100C]/80 p-4 rounded-2xl border border-white/10">
                    <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                      Dining Session &amp; Time
                    </label>
                    <div className="grid sm:grid-cols-3 gap-2">
                      {[
                        'Afternoon Feast (1:00 PM)',
                        'Twilight Dinner (8:00 PM)',
                        'Imperial Nocturne (10:00 PM)',
                      ].map((sess) => (
                        <button
                          key={sess}
                          type="button"
                          onClick={() => setSelectedSession(sess)}
                          className={`py-2 px-3 rounded-xl text-xs font-mono text-center transition-all ${
                            selectedSession === sess
                              ? 'bg-[#22AA00] text-black font-bold'
                              : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                          }`}
                        >
                          {sess}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dietary Preference Checkbox */}
                  <div
                    onClick={() => setIsJainStrict(!isJainStrict)}
                    className="cursor-pointer bg-[#08100C]/80 p-4 rounded-2xl border border-white/10 flex items-center justify-between hover:border-[#22AA00]/40 transition-colors"
                  >
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <ShieldCheck size={16} className={isJainStrict ? 'text-[#22AA00]' : 'text-neutral-400'} />
                        <span>Strict Jain Dining Protocol</span>
                      </div>
                      <div className="text-xs text-neutral-400 font-light mt-0.5">
                        Prepared without onions, garlic, root vegetables, or underground tubers.
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                        isJainStrict ? 'bg-[#22AA00] border-[#22AA00] text-black' : 'border-white/30'
                      }`}
                    >
                      {isJainStrict && <Check size={16} />}
                    </div>
                  </div>

                  {/* Confirmation Button */}
                  <button
                    type="button"
                    onClick={() => setBookingConfirmed(true)}
                    className="w-full py-4 rounded-2xl bg-[#22AA00] hover:bg-[#1E9500] text-black font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(34,170,0,0.5)] hover:shadow-[0_0_40px_rgba(34,170,0,0.8)]"
                  >
                    Confirm Table Reservation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. FOOTER (Crust & Crave Luxury Style) ─── */}
      <footer className="border-t border-white/10 bg-[#050B08] pt-16 pb-12 text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
            {/* Col 1: Brand & Manifesto */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="RASORAA"
                  className="w-10 h-10 object-contain filter drop-shadow-[0_0_10px_rgba(34,170,0,0.5)]"
                />
                <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white">
                  RASORAA
                </span>
              </div>
              <p className="text-xs font-light leading-relaxed max-w-sm text-neutral-400">
                A multi-cuisine fine dining sanctuary honoring the sacred traditions of 100% Shuddh Shakahari and Jain gastronomy through live fire, earthenware handis, and artisanal precision.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#22AA00]">
                <span className="w-2 h-2 rounded-full bg-[#22AA00]" />
                <span>100% Shuddh Shakahari &amp; Jain Certified</span>
              </div>
            </div>

            {/* Col 2: Sanctuaries */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="font-mono text-xs text-white uppercase tracking-wider">
                Sanctuaries
              </h4>
              <ul className="text-xs space-y-2 font-light">
                <li className="flex items-start gap-2">
                  <MapPin size={13} className="text-[#22AA00] flex-shrink-0 mt-0.5" />
                  <span>12, The Imperial Arcade, Connaught Place, New Delhi 110001</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={13} className="text-[#22AA00] flex-shrink-0 mt-0.5" />
                  <span>The Heritage Courtyard, Qutub Complex, Mehrauli 110030</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={13} className="text-[#22AA00] flex-shrink-0 mt-0.5" />
                  <span>The Glass Conservatory, Worldmark 1, Aerocity 110037</span>
                </li>
              </ul>
            </div>

            {/* Col 3: Concierge Timings */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-mono text-xs text-white uppercase tracking-wider">
                Concierge &amp; Hours
              </h4>
              <ul className="text-xs space-y-2 font-light">
                <li>Lunch: 12:30 PM – 3:30 PM</li>
                <li>Twilight Dinner: 7:00 PM – 11:30 PM</li>
                <li className="pt-2">
                  <span className="text-neutral-500 block">Reservations Desk:</span>
                  <a href="tel:+911141002800" className="text-[#22AA00] hover:underline font-mono">
                    +91 11 4100 2800
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
            <div>
              © {new Date().getFullYear()} RASORAA MULTICUISINE VEG RESTAURANT. ALL RIGHTS RESERVED.
            </div>
            <div className="flex items-center gap-6">
              <span>Pure Shakahari Gastronomy</span>
              <span>·</span>
              <span>Jain Protocols</span>
              <span>·</span>
              <span>Imperial Hospitality</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default RasoraaExperience;
