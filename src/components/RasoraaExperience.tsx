import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Check,
  Facebook,
  Flame,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

/* ─── Hero Culinary Masterpieces for 3D Stage ─── */
interface HeroMasterpiece {
  id: string;
  discipline: string;
  disciplineNum: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  auraColor: string;
  accentColor: string;
  temp: string;
  origin: string;
  price: number;
}

const HERO_MASTERPIECES: HeroMasterpiece[] = [
  {
    id: 'm1',
    discipline: 'The Awadhi Dum',
    disciplineNum: '01',
    name: 'Dal Rasoraa Imperial',
    tagline: '16-Hour Sealed Clay Embers · A2 Cultured Butter',
    description: 'Black urad lentils breathe overnight in a dough-sealed clay handi over smoldering sal wood embers, hand-churned with Gir cow cultured butter.',
    image: '/dish-awadhi.jpg',
    auraColor: 'rgba(34, 170, 0, 0.4)',
    accentColor: '#22AA00',
    temp: '95°C Slow Simmer',
    origin: 'Royal Awadh Courts',
    price: 680,
  },
  {
    id: 'm2',
    discipline: 'The Royal Tandoor',
    disciplineNum: '02',
    name: 'Angari Malai Paneer Tikka',
    tagline: 'Gir Cow Curd Paneer · Wild Mountain Saffron',
    description: 'Farm-fresh artisan paneer marinated in 36-hour hung curd, stone-ground cardamom, and Kashmiri saffron, charred over 400°C charcoal embers.',
    image: '/dish-tandoor.jpg',
    auraColor: 'rgba(200, 169, 98, 0.45)',
    accentColor: '#C8A962',
    temp: '400°C Clay Pit',
    origin: 'Northwest Frontier',
    price: 740,
  },
  {
    id: 'm3',
    discipline: 'Pan-Asian Wok Hei',
    disciplineNum: '03',
    name: 'Truffle Edamame Hakka',
    tagline: 'Artisanal Wok Noodles · Black Truffle Oil',
    description: 'Hand-pulled artisanal noodles flashed over screaming wok embers with tender young edamame, wild shiitake, and cold-pressed sesame.',
    image: '/dish-oriental.jpg',
    auraColor: 'rgba(56, 189, 248, 0.35)',
    accentColor: '#38BDF8',
    temp: '320°C Wok Fire',
    origin: 'Canton-Himalayan Hearth',
    price: 720,
  },
];

/* ─── Menu Dishes for Tasting Reel & Carte ─── */
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
    category: 'Awadhi Dum',
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
    category: 'Awadhi Dum',
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

/* ─── Gallery Showcase Images ─── */
const GALLERY_ITEMS = [
  {
    id: 'g1',
    title: 'The Sealed Awadhi Dum Handi',
    category: 'Culinary Craft',
    image: '/dish-awadhi.jpg',
    span: 'col-span-1 md:col-span-2 row-span-1 md:row-span-2',
  },
  {
    id: 'g2',
    title: 'Angari Malai Paneer Tikka over Embers',
    category: 'Live Fire',
    image: '/dish-tandoor.jpg',
    span: 'col-span-1',
  },
  {
    id: 'g3',
    title: 'Pan-Asian Wok Hei & Black Truffle',
    category: 'Oriental Alchemy',
    image: '/dish-oriental.jpg',
    span: 'col-span-1',
  },
  {
    id: 'g4',
    title: 'Stone Hearth Sourdough & Morel Gratin',
    category: 'Continental Hearth',
    image: '/dish-continental.jpg',
    span: 'col-span-1 md:col-span-2',
  },
];

/* ─── Event Offerings ─── */
const EVENTS = [
  {
    title: 'Royal Banquets & Soirées',
    capacity: '40 – 120 Guests',
    desc: 'Bespoke multi-course pure vegetarian feasts served in hand-hammered silverware under crystal chandeliers with live sitar and flute acoustics.',
    badge: 'Private Galas',
  },
  {
    title: 'The Sheesh-Mahal Intimate Salon',
    capacity: '8 – 18 Guests',
    desc: 'An exclusive dining alcove adorned with thousands of convex mirror rosettes for corporate leadership dinners and milestone family celebrations.',
    badge: 'Private Dining',
  },
  {
    title: 'The Glasshouse Conservatory',
    capacity: '20 – 50 Guests',
    desc: 'Al fresco botanical dining under starry Delhi skies with personal ustads hosting live charcoal tandoor and wok stations.',
    badge: 'Cocktail & Feasts',
  },
];

/* ─── Seating Sanctuaries ─── */
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

/* ─── Ambient Ember Particle Canvas ─── */
const EmberCanvas: React.FC<{ activeColor?: string }> = ({ activeColor = '#22AA00' }) => {
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

    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 80,
      size: Math.random() * 2.5 + 0.8,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      fadeSpeed: Math.random() * 0.004 + 0.002,
      isGold: Math.random() > 0.45,
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
          p.opacity = Math.random() * 0.6 + 0.3;
          p.speedY = Math.random() * 0.8 + 0.3;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isGold
          ? `rgba(229, 195, 120, ${p.opacity})`
          : `rgba(34, 170, 0, ${p.opacity * 0.85})`;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = p.isGold ? '#E5C378' : activeColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-50"
    />
  );
};

/* ─── Main Component ─── */
export const RasoraaExperience: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMasterpieceIdx, setActiveMasterpieceIdx] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedZone, setSelectedZone] = useState<string>('z1');
  const [guestCount, setGuestCount] = useState<number>(4);
  const [selectedDate, setSelectedDate] = useState<string>('Tonight');
  const [selectedSession, setSelectedSession] = useState<string>('Twilight Dinner (8:00 PM)');
  const [isJainStrict, setIsJainStrict] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const heroStageRef = useRef<HTMLDivElement>(null);

  // Framer Motion 3D Tilt Spring Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 140, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]);

  const handleStageMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = heroStageRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleStageMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeMasterpiece = HERO_MASTERPIECES[activeMasterpieceIdx];

  const categories = ['All', 'Awadhi Dum', 'Royal Tandoor', 'Pan-Asian Wok', 'Continental Hearth'];

  const filteredDishes = useMemo(() => {
    if (activeCategory === 'All') return DISHES;
    return DISHES.filter((d) => d.category === activeCategory);
  }, [activeCategory]);

  const activeZone = SANCTUARIES.find((s) => s.id === selectedZone) || SANCTUARIES[0];

  return (
    <div className="min-h-screen bg-[#060B08] text-[#F7F6F2] font-sans selection:bg-[#22AA00] selection:text-black overflow-x-hidden">
      {/* ─── 0. REFINED HAUTE GASTRONOMY PRE-HEADER ─── */}
      <div className="border-b border-white/[0.06] bg-[#030604] text-[11px] font-sans tracking-[0.14em] uppercase py-2 px-4 sm:px-8 text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-2 text-[#22AA00] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22AA00] shadow-[0_0_8px_#22AA00]" />
              100% Shuddh Shakahari
            </span>
            <span className="text-white/20 hidden sm:inline">·</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-neutral-300 font-light">
              <ShieldCheck size={12} className="text-[#C8A962]" /> Jain Certified Kitchens
            </span>
          </div>

          <div className="flex items-center space-x-4 text-neutral-400 font-light">
            <span className="flex items-center gap-1.5">
              <MapPin size={11} className="text-[#22AA00]" /> Connaught Place · Mehrauli · Aerocity
            </span>
            <span className="text-white/20 hidden md:inline">·</span>
            <span className="hidden md:inline text-neutral-400">
              New Delhi
            </span>
          </div>
        </div>
      </div>

      {/* ─── 1. FIXED GLASSMORPHIC LUXURY NAVBAR ─── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#060B08]/95 backdrop-blur-md border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.9)]'
            : 'bg-[#060B08]/80 backdrop-blur-sm border-b border-white/[0.05]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <Link to="/" className="flex items-center gap-3.5 group flex-shrink-0">
            <img
              src="/logo.png"
              alt="RASORAA"
              className="h-11 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(34,170,0,0.4)] group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-[0.22em] text-white group-hover:text-[#22AA00] transition-colors leading-none">
                RASORAA
              </span>
              <span className="text-[8.5px] font-sans font-medium tracking-[0.25em] text-[#C8A962] uppercase mt-1">
                Pure Veg &amp; Jain Fine Dining
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Home, About Us, Menu, Gallery, Events, Contact) */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-xs font-sans tracking-[0.15em] uppercase text-neutral-300">
            <a href="#hero" className="hover:text-[#22AA00] transition-colors py-1 relative group">
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#22AA00] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#about" className="hover:text-[#22AA00] transition-colors py-1 relative group">
              <span>About Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#22AA00] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#menu" className="hover:text-[#22AA00] transition-colors py-1 relative group">
              <span>Menu</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#22AA00] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#gallery" className="hover:text-[#22AA00] transition-colors py-1 relative group">
              <span>Gallery</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#22AA00] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#events" className="hover:text-[#22AA00] transition-colors py-1 relative group">
              <span>Events</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#22AA00] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#contact" className="hover:text-[#22AA00] transition-colors py-1 relative group">
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#22AA00] transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+911141002800"
              className="hidden xl:flex items-center gap-2 text-xs font-mono text-neutral-300 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:border-[#22AA00]/40 transition-colors bg-white/5 whitespace-nowrap flex-shrink-0"
            >
              <Phone size={13} className="text-[#22AA00] shrink-0" />
              <span>+91 11 4100 2800</span>
            </a>

            <a
              href="#reserve"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#17381E] to-[#0D2413] hover:from-[#22AA00] hover:to-[#1E9500] hover:text-black text-[#F5E6CA] border border-[#22AA00]/40 hover:border-[#C8A962] font-medium text-xs tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(34,170,0,0.4)] hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0"
            >
              <Calendar size={13} className="shrink-0 text-[#C8A962]" />
              <span>Book Table</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full border border-white/10 text-neutral-200 hover:text-[#22AA00] hover:border-[#22AA00]/40 transition-colors shrink-0"
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
              className="lg:hidden border-b border-white/10 bg-[#060B08]/98 px-6 py-6 overflow-hidden"
            >
              <div className="flex flex-col space-y-4 text-base font-medium tracking-wide">
                <a
                  href="#hero"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between hover:text-[#22AA00]"
                >
                  <span>Home</span>
                  <ArrowRight size={14} className="text-[#22AA00]" />
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between hover:text-[#22AA00]"
                >
                  <span>About Us</span>
                  <ArrowRight size={14} className="text-[#22AA00]" />
                </a>
                <a
                  href="#menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between hover:text-[#22AA00]"
                >
                  <span>Menu</span>
                  <ArrowRight size={14} className="text-[#22AA00]" />
                </a>
                <a
                  href="#gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between hover:text-[#22AA00]"
                >
                  <span>Gallery</span>
                  <ArrowRight size={14} className="text-[#22AA00]" />
                </a>
                <a
                  href="#events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between hover:text-[#22AA00]"
                >
                  <span>Events</span>
                  <ArrowRight size={14} className="text-[#22AA00]" />
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between hover:text-[#22AA00]"
                >
                  <span>Contact</span>
                  <ArrowRight size={14} className="text-[#22AA00]" />
                </a>

                {/* Mobile Socials & Reserve CTA */}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-4 py-2">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#22AA00] hover:border-[#22AA00]"
                      aria-label="Facebook"
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#22AA00] hover:border-[#22AA00]"
                      aria-label="Instagram"
                    >
                      <Instagram size={18} />
                    </a>
                    <a
                      href="https://wa.me/911141002800"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-300 hover:text-[#22AA00] hover:border-[#22AA00]"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle size={18} />
                    </a>
                  </div>

                  <a
                    href="#reserve"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3.5 rounded-xl bg-[#22AA00] text-black font-bold text-center text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(34,170,0,0.5)]"
                  >
                    Reserve Table
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── 2. REFINED HAUTE GASTRONOMY HERO SECTION ─── */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-20 overflow-hidden bg-gradient-to-b from-[#050A07] via-[#07110B] to-[#040806]"
      >
        <EmberCanvas activeColor={activeMasterpiece.accentColor} />

        {/* Ambient Warm Golden & Emerald Glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] rounded-full blur-[180px] pointer-events-none transition-all duration-1000 opacity-25"
          style={{
            background: `radial-gradient(circle, ${activeMasterpiece.accentColor} 0%, rgba(200, 169, 98, 0.25) 45%, transparent 70%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Refined Editorial Gastronomy Typography */}
            <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
              {/* Sacred Lineage Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#C8A962]/40 bg-[#C8A962]/10 text-[#E5D9C5] text-xs font-mono tracking-[0.22em] uppercase backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#22AA00] shadow-[0_0_8px_#22AA00]" />
                <span>100% Shuddh Shakahari · Imperial Court</span>
              </div>

              {/* Majestic Headline */}
              <div className="space-y-3">
                <p className="font-serif italic text-2xl sm:text-3xl text-[#E5D9C5] font-light tracking-wide">
                  Where Ancient Living Fire Meets
                </p>
                <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-white leading-[1.08]">
                  Vegetarian Craft,{' '}
                  <br />
                  <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7F2] via-[#F0E6D2] to-[#C8A962]">
                    Elevated to Royalty.
                  </span>
                </h1>
              </div>

              {/* Narrative Subtitle */}
              <p className="text-neutral-300/90 text-base sm:text-lg max-w-xl font-light leading-relaxed mx-auto lg:mx-0">
                Century-old Awadhi dum handis simmered over sal wood embers, 400°C clay tandoors, and wok hei artistry breathe under a single, uncompromising 100% Shuddh Shakahari &amp; Jain-certified decree.
              </p>

              {/* Fire Discipline Switcher Pills */}
              <div className="pt-1">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                  {HERO_MASTERPIECES.map((item, idx) => {
                    const isSelected = activeMasterpieceIdx === idx;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveMasterpieceIdx(idx)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2.5 border ${
                          isSelected
                            ? 'bg-[#152B1C] text-[#F5E6CA] font-semibold border-[#C8A962] shadow-[0_0_20px_rgba(200,169,98,0.25)] scale-[1.02]'
                            : 'bg-white/5 text-neutral-400 border-white/10 hover:border-[#C8A962]/40 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span className={`text-[10px] ${isSelected ? 'text-[#C8A962]' : 'text-neutral-500'}`}>
                          {item.disciplineNum}
                        </span>
                        <span>{item.discipline}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="#reserve"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#173B20] via-[#20522B] to-[#173B20] hover:from-[#22AA00] hover:to-[#178500] hover:text-black text-[#F5E6CA] font-semibold text-xs tracking-[0.16em] uppercase transition-all duration-300 border border-[#22AA00]/50 hover:border-[#C8A962] shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(34,170,0,0.4)] hover:-translate-y-0.5 inline-flex items-center gap-2.5"
                >
                  <Calendar size={14} className="text-[#C8A962]" />
                  <span>Reserve Table</span>
                </a>

                <a
                  href="#menu"
                  className="px-7 py-3.5 rounded-full border border-white/20 hover:border-[#C8A962] text-neutral-300 hover:text-[#F5E6CA] font-medium text-xs tracking-[0.16em] uppercase transition-all duration-300 backdrop-blur-sm hover:bg-white/5 inline-flex items-center gap-2"
                >
                  <span>Explore Carte</span>
                  <ArrowRight size={14} className="text-[#C8A962]" />
                </a>
              </div>

              {/* Subtle Trust Pillars */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="block font-serif text-lg text-white font-medium">100%</span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#C8A962]">
                    Pure Shakahari
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-lg text-white font-medium">Strict</span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#22AA00]">
                    Jain Certified
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-lg text-white font-medium">3 Havens</span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    Delhi NCR
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Haute Gastronomy Showcase Frame */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div
                ref={heroStageRef}
                onMouseMove={handleStageMouseMove}
                onMouseLeave={handleStageMouseLeave}
                className="relative w-full max-w-[460px] select-none mx-auto"
                style={{ perspective: 1200 }}
              >
                {/* 3D Tilted Architectural Image Frame */}
                <motion.div
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  className="relative rounded-3xl p-3 sm:p-3.5 bg-gradient-to-b from-[#182B1F] via-[#0A160F] to-[#040806] border border-[#C8A962]/35 shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
                >
                  {/* Outer Delicate Gold Filigree Ring */}
                  <div className="relative aspect-[4/4.6] rounded-2xl overflow-hidden border border-white/10 group">
                    {/* Active Dish Image with Silky Transition */}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeMasterpiece.id}
                        src={activeMasterpiece.image}
                        alt={activeMasterpiece.name}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="w-full h-full object-cover filter contrast-[1.06] group-hover:scale-105 transition-transform duration-1000"
                      />
                    </AnimatePresence>

                    {/* Subtle Vignette & Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040806] via-transparent to-black/20 pointer-events-none" />

                    {/* Top Seal Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050C07]/85 backdrop-blur-md border border-[#C8A962]/40 text-[#F5E6CA] text-[10px] font-mono tracking-widest uppercase">
                        <Sparkles size={11} className="text-[#C8A962]" />
                        <span>Imperial Signature</span>
                      </div>
                    </div>

                    {/* Floating Lower Showcase Card */}
                    <div className="absolute bottom-4 inset-x-4 z-20">
                      <div className="p-4 rounded-2xl bg-[#060E09]/90 backdrop-blur-md border border-[#C8A962]/30 text-left shadow-2xl">
                        <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/10">
                          <span className="text-[11px] font-mono text-[#C8A962] tracking-wider uppercase">
                            {activeMasterpiece.discipline}
                          </span>
                          <span className="text-xs font-mono font-bold text-[#22AA00]">
                            ₹{activeMasterpiece.price}
                          </span>
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl text-white font-medium pt-2">
                          {activeMasterpiece.name}
                        </h3>
                        <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-neutral-400">
                          <span className="flex items-center gap-1.5">
                            <Flame size={12} className="text-[#C8A962]" />
                            {activeMasterpiece.temp}
                          </span>
                          <span className="text-[#E5D9C5]">{activeMasterpiece.origin}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Masterpiece Thumb Selector Strip Below Frame */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {HERO_MASTERPIECES.map((item, idx) => {
                    const isSelected = activeMasterpieceIdx === idx;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveMasterpieceIdx(idx)}
                        className={`group relative p-2 rounded-2xl border text-left transition-all duration-300 flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#152B1C] border-[#C8A962] shadow-[0_0_15px_rgba(200,169,98,0.2)]'
                            : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="block text-[10px] font-mono text-[#C8A962] leading-none">
                            {item.disciplineNum}
                          </span>
                          <span className="block text-xs font-serif text-white truncate group-hover:text-[#F5E6CA] transition-colors pt-1">
                            {item.name.split(' ')[0]}
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

      {/* ─── 3. REFINED CONTINUOUS LUXURY MARQUEE ─── */}
      <div className="border-y border-[#C8A962]/20 bg-[#060D09] py-3.5 overflow-hidden text-[#E5D9C5] select-none relative z-20">
        <div className="animate-marquee-infinite">
          <div className="flex items-center space-x-10 shrink-0 pr-10 text-xs sm:text-[13px] tracking-[0.25em] uppercase font-sans">
            <span className="text-white font-medium">AWADHI DUM HANDIS</span>
            <span className="text-[#C8A962]">✦</span>
            <span className="text-[#22AA00] font-medium">100% SHUDDH SHAKAHARI</span>
            <span className="text-[#C8A962]">✦</span>
            <span className="text-white font-medium">400°C CLAY TANDOORS</span>
            <span className="text-[#C8A962]">✦</span>
            <span className="text-[#E5D9C5] font-medium">STRICT JAIN HEARTH</span>
            <span className="text-[#C8A962]">✦</span>
            <span className="text-white font-medium">PAN-ASIAN WOK HEI</span>
            <span className="text-[#C8A962]">✦</span>
            <span className="text-[#C8A962] font-medium">CONNAUGHT PLACE &amp; MEHRAULI</span>
            <span className="text-[#C8A962]">✦</span>
            <span className="text-white font-medium">ROYAL VEG GASTRONOMY</span>
            <span className="text-[#C8A962]">✦</span>
          </div>

          <div className="flex items-center space-x-10 shrink-0 pr-10 text-xs sm:text-[13px] tracking-[0.25em] uppercase font-sans" aria-hidden="true">
            <span className="text-white font-medium">AWADHI DUM HANDIS</span>
            <span className="text-[#C8A962]">✦</span>
            <span className="text-[#22AA00] font-medium">100% SHUDDH SHAKAHARI</span>
            <span className="text-[#C8A962]">✦</span>
            <span className="text-white font-medium">400°C CLAY TANDOORS</span>
            <span className="text-[#C8A962]">✦</span>
            <span className="text-[#E5D9C5] font-medium">STRICT JAIN HEARTH</span>
            <span className="text-[#C8A962]">✦</span>
            <span className="text-white font-medium">PAN-ASIAN WOK HEI</span>
            <span className="text-[#C8A962]">✦</span>
            <span className="text-[#C8A962] font-medium">CONNAUGHT PLACE &amp; MEHRAULI</span>
            <span className="text-[#C8A962]">✦</span>
            <span className="text-white font-medium">ROYAL VEG GASTRONOMY</span>
            <span className="text-[#C8A962]">✦</span>
          </div>
        </div>
      </div>

      {/* ─── 4. ABOUT US SECTION (#about) ─── */}
      <section id="about" className="py-24 relative bg-[#08100C] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#22AA00] text-xs font-mono tracking-[0.25em] uppercase">
                About Us // Royal Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                Purity of Tradition. Mastery of Fire.
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
                Founded with a sacred commitment to pure vegetarian gastronomy, RASORAA honors centuries-old culinary lineages across royal India, Pan-Asia, and the Mediterranean hearth.
              </p>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                We operate with independent culinary stations, dedicated pure-veg ustads, and strict Jain protocols that completely forbid onion, garlic, or underground root tubers upon request.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[#22AA00] block text-base font-bold">100% Shuddh</span>
                  <span className="text-neutral-400">Pure Shakahari Discipline</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[#C8A962] block text-base font-bold">Jain Certified</span>
                  <span className="text-neutral-400">Separate Root-Free Preparation</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <img
                  src="/dish-tandoor.jpg"
                  alt="Rasoraa Heritage Kitchen"
                  className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08100C] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#060B08]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-white text-sm font-bold font-serif block">Executive Culinary Custodians</span>
                    <span className="text-[#22AA00] text-xs font-mono">Five Generations of Awadhi Dum Heritage</span>
                  </div>
                  <Flame size={20} className="text-[#22AA00]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. MENU SECTION (#menu) ─── */}
      <section id="menu" className="py-24 relative bg-[#060B08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#22AA00] text-xs font-mono tracking-[0.25em] uppercase">
              The Imperial Carte
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
              Our Signature Creations.
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-3">
              Explore our pure vegetarian master recipes, simmered in clay handis and charred over live coals.
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
                className="rounded-3xl border border-white/10 bg-[#0E1A15] p-6 hover:border-[#22AA00]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-[#22AA00] uppercase tracking-wider">
                      {dish.category}
                    </span>
                    {dish.jain && (
                      <span className="text-[10px] font-mono text-[#C8A962] bg-[#C8A962]/10 px-2 py-0.5 rounded-full border border-[#C8A962]/30">
                        Jain Available
                      </span>
                    )}
                  </div>

                  <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#22AA00] transition-colors">
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
                    <span>Reserve Taste</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. GALLERY SECTION (#gallery) ─── */}
      <section id="gallery" className="py-24 relative bg-[#08100C] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#22AA00] text-xs font-mono tracking-[0.25em] uppercase">
              Visual Chronicles
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
              The Aesthetic of Rasoraa.
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-3">
              Moments of living fire, antique handis, and pure vegetarian artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`relative rounded-3xl overflow-hidden border border-white/10 group ${item.span}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full min-h-[260px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono text-[#22AA00] uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. EVENTS & PRIVATE DINING SECTION (#events) ─── */}
      <section id="events" className="py-24 relative bg-[#060B08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#22AA00] text-xs font-mono tracking-[0.25em] uppercase">
              Private Dining &amp; Gatherings
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
              Royal Feasts &amp; Celebrations.
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-3">
              Host intimate anniversaries, corporate banquets, and bespoke family feasts in dedicated sanctuaries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {EVENTS.map((evt) => (
              <div
                key={evt.title}
                className="p-8 rounded-3xl border border-white/10 bg-[#0E1A15] hover:border-[#22AA00]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[#22AA00] uppercase tracking-wider block mb-2">
                    {evt.badge}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    {evt.title}
                  </h3>
                  <span className="text-xs font-mono text-[#C8A962] block mb-4">
                    {evt.capacity}
                  </span>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {evt.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <a
                    href="#reserve"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#22AA00] hover:underline"
                  >
                    <span>Inquire for Events</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. CONTACT & TABLE RESERVATION SUITE (#contact & #reserve) ─── */}
      <section id="contact" className="py-24 relative bg-[#08100C] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#22AA00] text-xs font-mono tracking-[0.25em] uppercase">
              Sanctuaries of Delhi
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
              Select Your Seating Sanctuary.
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-3">
              Choose your preferred dining hall and confirm your table instantly.
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
            className="rounded-[2.5rem] border border-[#22AA00]/40 bg-gradient-to-br from-[#12221A] to-[#08100C] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
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
                  {/* Stepper & Date Row */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-[#050B08]/80 p-4 rounded-2xl border border-white/10">
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

                    <div className="bg-[#050B08]/80 p-4 rounded-2xl border border-white/10">
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                        Dining Evening
                      </label>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-transparent text-white font-serif text-lg outline-none cursor-pointer"
                      >
                        <option value="Tonight" className="bg-[#050B08]">Tonight (Recommended)</option>
                        <option value="Tomorrow" className="bg-[#050B08]">Tomorrow Evening</option>
                        <option value="Friday Gala" className="bg-[#050B08]">This Friday Gala</option>
                        <option value="Saturday Feast" className="bg-[#050B08]">This Saturday Feast</option>
                        <option value="Sunday Soirée" className="bg-[#050B08]">This Sunday Soirée</option>
                      </select>
                    </div>
                  </div>

                  {/* Session Selection */}
                  <div className="bg-[#050B08]/80 p-4 rounded-2xl border border-white/10">
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
                    className="cursor-pointer bg-[#050B08]/80 p-4 rounded-2xl border border-white/10 flex items-center justify-between hover:border-[#22AA00]/40 transition-colors"
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

      {/* ─── 9. LUXURY FOOTER (With Facebook, Instagram, WhatsApp) ─── */}
      <footer className="border-t border-white/10 bg-[#040806] pt-16 pb-12 text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
            {/* Col 1: Brand & Manifesto */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="RASORAA"
                  className="h-10 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(34,170,0,0.5)]"
                />
                <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white">
                  RASORAA
                </span>
              </div>
              <p className="text-xs font-light leading-relaxed max-w-sm text-neutral-400">
                A royal multi-cuisine sanctuary honoring 100% Shuddh Shakahari and Jain gastronomy through live fire, earthenware handis, and artisanal precision.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#22AA00]">
                <span className="w-2 h-2 rounded-full bg-[#22AA00]" />
                <span>100% Shuddh Shakahari &amp; Jain Certified</span>
              </div>

              {/* Social Channels: Facebook, Instagram, WhatsApp */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all"
                  aria-label="Follow RASORAA on Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent transition-all"
                  aria-label="Follow RASORAA on Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://wa.me/911141002800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all"
                  aria-label="Chat with Concierge on WhatsApp"
                >
                  <MessageCircle size={16} />
                </a>
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

            {/* Col 3: Concierge Timings & Quick Links */}
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
                <li>
                  <a
                    href="https://wa.me/911141002800"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline font-mono flex items-center gap-1.5 pt-1"
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp Concierge</span>
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
