import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  Flame,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Plus,
  Star,
  Users,
  X,
} from 'lucide-react';

type Dish = {
  id: string;
  name: string;
  hindi: string;
  category: string;
  price: number;
  profile: string;
  jain: boolean;
  note: string;
  isSignature?: boolean;
  image?: string;
};

const dishes: Dish[] = [
  {
    id: 'd1',
    name: 'Dal Rasoraa',
    hindi: 'Black urad lentils simmered overnight on live embers',
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
    hindi: 'Fresh curd paneer · Wild mountain saffron · Stone cardamom',
    category: 'Royal Tandoor',
    price: 740,
    profile: 'Wild saffron · Charred lime · Gentle wood warmth',
    jain: true,
    note: 'Handcrafted Gir cow milk paneer rested in wild saffron threads and hung curd before meeting the 400°C live clay tandoor.',
    isSignature: true,
    image: '/dish-tandoor.jpg',
  },
  {
    id: 'd3',
    name: 'Truffle Edamame Hakka Noodles',
    hindi: 'Artisanal wok noodles · Black truffle · Cold-pressed sesame',
    category: 'Pan-Asian Wok',
    price: 720,
    profile: 'Wok breath (Wok Hei) · Black truffle · Fresh shiitake',
    jain: true,
    note: 'Hand-pulled artisanal noodles flashed over screaming wok embers with tender edamame pods, black truffle, and cold-pressed sesame.',
    isSignature: true,
    image: '/dish-oriental.jpg',
  },
  {
    id: 'd4',
    name: 'Kashmiri Morel Yakhni',
    hindi: 'Gucchi mushrooms · Mountain fennel · Walnut emulsion',
    category: 'Earthenware Dum',
    price: 890,
    profile: 'Forest earth · Mountain fennel · Velvety emulsion',
    jain: false,
    note: 'Wild foraged gucchi morels from the Pir Panjal valleys, filled with toasted walnut and simmered in a fragrant curd yakhni.',
  },
  {
    id: 'd5',
    name: 'Wild Morel & Herb Gratin Crostini',
    hindi: 'Hearth-baked sourdough · Kashmir morel velouté · Fresh thyme',
    category: 'Continental Hearth',
    price: 780,
    profile: 'Charred sourdough · Cultured cream · Garden rosemary',
    jain: false,
    note: 'Wild morels in velvet herb reduction, served over garlic-rubbed artisanal stone-hearth sourdough with cold-churned cream.',
    image: '/dish-continental.jpg',
  },
  {
    id: 'd6',
    name: 'Subz Awadhi Dum Biryani',
    hindi: 'Long-grain aged basmati · Garden vegetables · Rose attar',
    category: 'Earthenware Dum',
    price: 750,
    profile: 'Aged basmati · Kashmiri saffron · Damascus rose',
    jain: true,
    note: 'Fragrant basmati layered with seasonal farm vegetables, sealed with wheat dough (purdah) in a clay handi and slow-cooked over gentle embers.',
  },
  {
    id: 'd7',
    name: 'Bhutte Ke Kebab',
    hindi: 'Tender sweet corn patties · Green chilli · Roasted cumin',
    category: 'Royal Tandoor',
    price: 580,
    profile: 'Charred sweet corn · Spiced mint · Crisp gold',
    jain: true,
    note: 'Grated tender sweet corn laced with roasted cumin, fresh coriander, and cold-pressed mustard oil, griddled on cast iron.',
  },
  {
    id: 'd8',
    name: 'Chandi Vark Chenna Mithai',
    hindi: 'Pistachio sandesh · Edible silver leaf · Damascus rose preserve',
    category: 'Mithai & Elixirs',
    price: 490,
    profile: 'Damascus rosewater · Iranian pistachio · Silken chenna',
    jain: true,
    note: 'A delicate finish of hand-beaten cow milk chenna, crowned in 99.9% certified pure silver vark and fragrant organic rose petal preserve.',
  },
  {
    id: 'd9',
    name: 'Kesar Badam Doodh Elixir',
    hindi: 'Slow-steeped saffron milk · Green cardamom · Toasted almonds',
    category: 'Mithai & Elixirs',
    price: 360,
    profile: 'Saffron threads · Toasted almond slivers · Chilled',
    jain: true,
    note: 'Whole Gir cow milk slow-steeped for hours with Kashmir saffron, green cardamom pods, and slivered roasted mamra almonds.',
  },
];

const categories = [
  'All Creations',
  'Earthenware Dum',
  'Royal Tandoor',
  'Pan-Asian Wok',
  'Continental Hearth',
  'Mithai & Elixirs',
];

const diningZones = [
  {
    id: 'zone-dum',
    number: '01',
    name: 'The Awadhi Dum Court',
    subtitle: 'Low brass lighting, velvet haveli banquettes & live handi aromas',
    capacity: 'Tables for 2 to 6 Patrons',
    ideal: 'Best for slow, multi-course evening family dining',
    tag: 'HAVELI INTIMACY',
  },
  {
    id: 'zone-tandoor',
    number: '02',
    name: 'Live Clay Tandoor Counter',
    subtitle: 'Front-row view of live fire, glowing charcoal embers & hand-tossed breads',
    capacity: 'High counter seats & pairs',
    ideal: 'Best for culinary enthusiasts who love kitchen theater',
    tag: 'LIVE FIRE VIEW',
  },
  {
    id: 'zone-conservatory',
    number: '03',
    name: 'Haveli Garden Conservatory',
    subtitle: 'Glass-roofed pavilion, lush indoor mogra botanicals & tranquil moonlight',
    capacity: 'Tables for 2 to 4 Patrons',
    ideal: 'Best for romantic dates, quiet conversations & anniversaries',
    tag: 'GARDEN AMBIANCE',
  },
  {
    id: 'zone-salon',
    number: '04',
    name: 'The Sheesh-Mahal Salon',
    subtitle: 'Private banquet sanctuary with carved teak jaali screens and dedicated butler',
    capacity: 'Private tables for 8 to 16 Patrons',
    ideal: 'Best for royal private gatherings & celebrations',
    tag: 'PRIVATE ROYAL SALON',
  },
];

const testimonials = [
  {
    quote: "We reserved Zone 01 at the Dum Court and received an unforgettable experience. Unhurried, serene, and the staff took meticulous care of our Jain dietary preferences.",
    author: "Kavita & Arvind Malhotra",
    city: "New Delhi Patrons",
  },
  {
    quote: "The Dal Rasoraa breathes true woodsmoke and patient simmering. Rivaling the greatest fine dining institutions in Tokyo and Paris — 100% pure vegetarian reverence.",
    author: "Marek Nowicki",
    city: "International Culinary Critic",
  },
  {
    quote: "Choosing our exact seating zone in the Garden Conservatory made our anniversary magical. The Truffle Edamame Hakka Noodles and Malai Tikka were extraordinary.",
    author: "Rohit & Meera Singhal",
    city: "Lodhi Gardens Visitors",
  },
];

const sanctuaries = [
  {
    num: '01',
    name: 'Downtown Flagship',
    locality: 'Connaught Place',
    address: '12, The Imperial Arcade, Connaught Place, New Delhi 110001',
    hours: 'Lunch 12:00 – 15:30  ·  Dinner 19:00 – 23:30',
    phone: '+91 11 4100 2800',
    note: 'Restored 1911 haveli featuring vaulted lime-plaster ceilings, carved teak arches, and the central Awadhi Dum Court.',
  },
  {
    num: '02',
    name: 'The Waterfront Haveli',
    locality: 'Khan Market',
    address: '5, Riverfront Promenade, Khan Market, New Delhi 110003',
    hours: 'Lunch 12:00 – 15:30  ·  Dinner 19:00 – 23:30',
    phone: '+91 11 4100 2801',
    note: 'Intimate riverside pavilion with jaali screens, candle-lit reflections, and the private Sheesh-Mahal banquet salon.',
  },
  {
    num: '03',
    name: 'Garden Conservatory',
    locality: 'Lodhi Gardens',
    address: '18, Lodhi Gardens Estate, Lodhi Road, New Delhi 110003',
    hours: 'Lunch 12:00 – 15:30  ·  Dinner 19:00 – 23:30',
    phone: '+91 11 4100 2802',
    note: 'Glass-roofed winter garden sheltered among old-growth neem and night-blooming mogra jasmine.',
  },
];

export const RasoraaExperience: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState('zone-dum');
  const [selectedCategory, setSelectedCategory] = useState('All Creations');
  const [jainOnly, setJainOnly] = useState(false);
  const [expandedDish, setExpandedDish] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Reservation Form State
  const [partySize, setPartySize] = useState(2);
  const [resDate, setResDate] = useState('Today');
  const [resTime, setResTime] = useState('Dinner 20:00');
  const [resBranch, setResBranch] = useState('Downtown Flagship');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const catMatch = selectedCategory === 'All Creations' || dish.category === selectedCategory;
      const jainMatch = !jainOnly || dish.jain;
      return catMatch && jainMatch;
    });
  }, [selectedCategory, jainOnly]);

  const signatureDishes = useMemo(() => {
    return dishes.filter((d) => d.isSignature);
  }, []);

  const activeZoneObj = diningZones.find((z) => z.id === selectedZone) || diningZones[0];

  return (
    <div className="esencja-shell">
      {/* ─── Top Micro-Rail ─── */}
      <div className="esencja-rail">
        <div className="rail-location">
          <span>28.6139° N / 77.2090° E</span>
          <span>•</span>
          <span>THE IMPERIAL ARCADE, NEW DELHI</span>
        </div>
        <div className="rail-badge-leaf">
          <span className="leaf-dot" />
          <span>100% Pure Vegetarian &amp; Jain Certified</span>
        </div>
        <div className="rail-status">
          <span className="gold-pulse-dot" />
          <span>Accepting Reservations Tonight</span>
        </div>
      </div>

      {/* ─── Fixed Luxury Navbar (Esencja Grid Architecture) ─── */}
      <nav className={`esencja-nav ${scrolled ? 'scrolled' : ''}`}>
        {/* Left: Brand Wordmark */}
        <Link to="/" className="nav-brand-wrap" aria-label="Rasoraa Home">
          <img src="/logo.png" alt="RASORAA" className="nav-brand-logo" />
          <div className="nav-brand-title">
            <span className="brand-main-text">RASORAA</span>
            <span className="brand-sub-badge">MULTICUISINE VEG RESTAURANT</span>
          </div>
        </Link>

        {/* Center: Clean Nav Links with Underline Indicator */}
        <div className="nav-center-menu">
          <a href="#hero" className="nav-link-item">Home</a>
          <a href="#philosophy" className="nav-link-item">Our Story</a>
          <a href="#signatures" className="nav-link-item">Signatures</a>
          <a href="#carte" className="nav-link-item">The Carte</a>
          <a href="#zones" className="nav-link-item">Seating Zones</a>
          <a href="#sanctuaries" className="nav-link-item">Sanctuaries</a>
        </div>

        {/* Right: CTA Button */}
        <div className="nav-right-actions">
          <a href="#zones" className="btn-nav-reserve">
            <Calendar size={14} />
            <span>Book a Table</span>
          </a>
          <button
            className="btn-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <a href="#hero" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
              01 · Home
            </a>
            <a href="#philosophy" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
              02 · Our Story &amp; Craft
            </a>
            <a href="#signatures" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
              03 · Signature Creations
            </a>
            <a href="#carte" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
              04 · The Carte
            </a>
            <a href="#zones" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
              05 · Seating Zones &amp; Booking
            </a>
            <a href="#sanctuaries" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
              06 · Haveli Sanctuaries
            </a>
            <div className="drawer-bottom-cta">
              <a href="#zones" className="btn-hero-primary" onClick={() => setMobileMenuOpen(false)}>
                <Calendar size={16} />
                <span>Reserve Your Table</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO SECTION (ATMOSPHERIC ESENCJA LUXURY) ─── */}
      <section id="hero" className="esencja-hero">
        <div className="hero-backdrop-image" />
        <div className="hero-vignette-overlay" />

        <div className="hero-content-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="hero-top-eyebrow">
              <span>12, THE IMPERIAL ARCADE</span>
              <span className="eyebrow-sep">/</span>
              <span>ROYAL MULTICUISINE GASTRONOMY</span>
            </div>

            <h1 className="hero-main-title">
              The Art of Royal Vegetarian
              <span className="hero-title-italic">Alchemy &amp; Living Fire</span>
            </h1>

            <p className="hero-lead-text">
              Where sixteen-hour Awadhi dum handis, live 400°C clay tandoor embers, and artisanal Pan-Asian wok craft meet uncompromising vegetarian reverence. Savor dinner at your selected seating zone without compromise.
            </p>

            <div className="hero-buttons-row">
              <a href="#zones" className="btn-hero-primary">
                <Calendar size={17} />
                <span>Reserve Your Table</span>
              </a>
              <a href="#carte" className="btn-hero-secondary">
                <span>Explore The Carte</span>
                <ChevronRight size={17} />
              </a>
            </div>

            {/* Prestige Metrics */}
            <div className="hero-prestige-strip">
              <div className="prestige-item">
                <span className="prestige-num">16h</span>
                <span className="prestige-label">Charcoal Dum Embers</span>
              </div>
              <div className="prestige-item">
                <span className="prestige-num">100%</span>
                <span className="prestige-label">Pure Veg &amp; Jain Sanctuary</span>
              </div>
              <div className="prestige-item">
                <span className="prestige-num">03</span>
                <span className="prestige-label">Heritage Haveli Locations</span>
              </div>
              <div className="prestige-item">
                <span className="prestige-num">400°C</span>
                <span className="prestige-label">Live Clay Tandoor Heat</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Cue */}
        <div className="hero-scroll-cue">
          <div className="scroll-cue-pill" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* ─── KITCHEN & PHILOSOPHY SECTION (POLAROID COLLAGE FROM ESENCJA) ─── */}
      <section id="philosophy" className="esencja-section">
        <div className="kitchen-story-grid">
          {/* Left: Narrative & Principles */}
          <div className="kitchen-copy-col">
            <span className="section-kicker-leaf">THE KITCHEN &amp; LIVING FIRE</span>
            <h2 className="section-main-heading">
              Seasonal Ingredients, <br />
              <em>honest, uncompromised plates</em>
            </h2>
            <div className="h-0.5 w-16 bg-[#22AA00]" />
            <p className="section-lead-paragraph">
              We cook strictly with what is finest at harvest. Our carte evolves with the seasons, honoring every single ingredient with time-tested Vedic and royal court techniques. No synthetic shortcuts. No animal derivatives. Only pure reverence.
            </p>

            <div className="kitchen-features-duo">
              <div className="feature-bullet">
                <Compass size={22} className="bullet-icon" />
                <div>
                  <h4 className="bullet-title">Single-Origin Ethical Dairy</h4>
                  <p className="bullet-desc">
                    Gir cow A2 milk, hand-churned cultured butter, and fresh paneer crafted every sunrise.
                  </p>
                </div>
              </div>

              <div className="feature-bullet">
                <Flame size={22} className="bullet-icon" />
                <div>
                  <h4 className="bullet-title">Open Live Fire Theater</h4>
                  <p className="bullet-desc">
                    From the dining hall, witness the live clay tandoor, sealed earthen handis, and roaring wok hearths.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Esencja Floating Tilted Photos */}
          <div className="kitchen-collage-col">
            <div className="collage-card card-1" title="Chef finishing the sealed clay handi">
              <img src="/dish-awadhi.jpg" alt="Slow Charcoal Dum Cooking" />
            </div>
            <div className="collage-card card-2" title="Blistering Paneer Tikka over clay coals">
              <img src="/dish-tandoor.jpg" alt="Live Clay Tandoor Sear" />
            </div>
            <div className="collage-card card-3" title="High-heat Pan-Asian wok alchemy">
              <img src="/dish-oriental.jpg" alt="Live Wok Alchemy" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SIGNATURE DISHES SHOWCASE (ESENCJA 3-COLUMN CARDS) ─── */}
      <section id="signatures" className="esencja-section">
        <div className="section-head-center">
          <span className="section-kicker-leaf">SIGNATURE CULINARY CREATIONS</span>
          <h2 className="section-main-heading">
            Crafted for <em>The Imperial Table</em>
          </h2>
          <div className="section-separator-line" />
          <p className="section-lead-paragraph">
            Our most revered dishes, celebrating slow earthen dum alchemy, clay tandoor embers, and artisanal wok mastery.
          </p>
        </div>

        <div className="signature-dishes-grid">
          {signatureDishes.map((dish) => (
            <div key={dish.id} className="signature-dish-card">
              <div className="dish-img-box">
                <img src={dish.image} alt={dish.name} />
                <span className="dish-badge-overlay">{dish.category}</span>
              </div>
              <div className="dish-content-body">
                <div className="dish-title-row">
                  <h3 className="dish-card-name">{dish.name}</h3>
                  <span className="dish-card-price">₹{dish.price}</span>
                </div>
                <p className="dish-card-hindi">{dish.hindi}</p>
                <p className="dish-card-note">{dish.note}</p>
                <div className="dish-card-flavor">
                  <span>FLAVOR:</span> {dish.profile}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── INTERACTIVE SEATING ZONES & RESERVATION (FROM ESENCJA) ─── */}
      <section id="zones" className="esencja-section">
        <div className="section-head-center">
          <span className="section-kicker-leaf">INTERACTIVE TABLE CONCIERGE</span>
          <h2 className="section-main-heading">
            Choose Your <em>Dining Zone</em>
          </h2>
          <div className="section-separator-line" />
          <p className="section-lead-paragraph">
            Select your preferred dining atmosphere, check availability, and reserve your table in 60 seconds without calling.
          </p>
        </div>

        <div className="zones-suite-container">
          {/* 4 Interactive Zone Cards */}
          <div className="zones-picker-grid">
            {diningZones.map((zone) => (
              <div
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`zone-selector-card ${selectedZone === zone.id ? 'active' : ''}`}
              >
                <div className="zone-top-row">
                  <span className="zone-num">{zone.number}</span>
                  <span className="zone-pill">{zone.tag}</span>
                </div>
                <h3 className="zone-headline">{zone.name}</h3>
                <p className="zone-desc">{zone.subtitle}</p>
                <div className="zone-footer-status">
                  <span><Users size={12} className="inline mr-1" /> {zone.capacity}</span>
                  {selectedZone === zone.id ? (
                    <span className="active-check"><Check size={13} /> Selected</span>
                  ) : (
                    <span className="inactive-prompt">Click to select</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Reservation Controls */}
          {!bookingConfirmed ? (
            <div className="reservation-action-bar">
              {/* Sanctuary */}
              <div className="control-field">
                <label className="control-label">Haveli Sanctuary</label>
                <div className="control-input-box">
                  <MapPin size={15} className="control-icon" />
                  <select
                    value={resBranch}
                    onChange={(e) => setResBranch(e.target.value)}
                    className="control-select"
                  >
                    <option value="Downtown Flagship">Connaught Place Flagship</option>
                    <option value="Waterfront Haveli">Waterfront Haveli (Khan Mkt)</option>
                    <option value="Garden Conservatory">Garden Conservatory (Lodhi)</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="control-field">
                <label className="control-label">Date</label>
                <div className="control-input-box">
                  <Calendar size={15} className="control-icon" />
                  <select
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="control-select"
                  >
                    <option value="Today">Today, 24 Nov</option>
                    <option value="Tomorrow">Tomorrow, 25 Nov</option>
                    <option value="This Weekend">This Weekend (Sat, 28 Nov)</option>
                  </select>
                </div>
              </div>

              {/* Session */}
              <div className="control-field">
                <label className="control-label">Meal Session</label>
                <div className="control-input-box">
                  <Clock size={15} className="control-icon" />
                  <select
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="control-select"
                  >
                    <option value="Lunch 12:30">Lunch Seating · 12:30 PM</option>
                    <option value="Lunch 14:00">Lunch Seating · 02:00 PM</option>
                    <option value="Sunset 17:00">Sunset High Tea · 05:00 PM</option>
                    <option value="Dinner 19:30">Dinner Seating · 07:30 PM</option>
                    <option value="Dinner 20:30">Royal Dinner · 08:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Guests */}
              <div className="control-field">
                <label className="control-label">Patrons</label>
                <div className="stepper-box">
                  <button
                    onClick={() => setPartySize(Math.max(1, partySize - 1))}
                    className="stepper-icon-btn"
                    aria-label="Decrease guests"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="stepper-value">{partySize < 10 ? `0${partySize}` : partySize} Guests</span>
                  <button
                    onClick={() => setPartySize(Math.min(16, partySize + 1))}
                    className="stepper-icon-btn"
                    aria-label="Increase guests"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* Confirm */}
              <button
                onClick={() => setBookingConfirmed(true)}
                className="btn-confirm-booking"
              >
                <Calendar size={15} />
                <span>Confirm Table</span>
              </button>
            </div>
          ) : (
            <div className="booking-confirmed-panel">
              <div className="confirmed-icon-circle">
                <Check size={22} />
              </div>
              <div className="confirmed-text">
                <h4>Table Allocated at {activeZoneObj.name}</h4>
                <p>
                  Reserved for <strong>{partySize} guests</strong> at <strong>{resBranch}</strong> on <strong>{resDate} ({resTime})</strong>. A confirmation SMS has been prepared for your arrival.
                </p>
              </div>
              <button
                onClick={() => setBookingConfirmed(false)}
                className="btn-rebook"
              >
                Change Details
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── THE EDITORIAL CARTE (ESENCJA MENU TABS & LIST) ─── */}
      <section id="carte" className="esencja-section">
        <div className="section-head-center">
          <span className="section-kicker-leaf">THE REVERENT CARTE</span>
          <h2 className="section-main-heading">
            Culinary Dishes &amp; <em>Elixirs</em>
          </h2>
          <div className="section-separator-line" />
          <p className="section-lead-paragraph">
            Dishes marked with Jain Certified are prepared in strict adherence to Jain traditions with zero root vegetables.
          </p>
        </div>

        {/* Tabs Bar */}
        <div className="carte-tabs-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`carte-filter-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => setJainOnly(!jainOnly)}
            className={`jain-switch-button ${jainOnly ? 'active' : ''}`}
          >
            <span className="leaf-dot" />
            <span>Jain Only</span>
          </button>
        </div>

        {/* Dish List */}
        <div className="carte-menu-list">
          {filteredDishes.map((dish) => {
            const isExpanded = expandedDish === dish.id;
            return (
              <div
                key={dish.id}
                className="carte-dish-row"
                onClick={() => setExpandedDish(isExpanded ? null : dish.id)}
              >
                <div className="dish-row-top">
                  <div className="dish-title-group">
                    <div className="dish-name-header">
                      <span>{dish.name}</span>
                      {dish.jain && (
                        <span className="dish-jain-pill">JAIN</span>
                      )}
                    </div>
                    <span className="dish-subtext-hindi">{dish.hindi}</span>
                  </div>

                  <span className="dish-flavor-badge">{dish.profile}</span>

                  <div className="dish-price-expand">
                    <span className="dish-rupee">₹{dish.price}</span>
                    <ChevronDown size={16} className={`chevron-icon ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="expanded-card-box">
                        <p className="craft-text">{dish.note}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── TESTIMONIALS SLIDER (FROM ESENCJA) ─── */}
      <section className="esencja-section testimonials-section">
        <div className="testimonial-carousel-card">
          <div className="testimonial-stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="#C8A962" color="#C8A962" />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <p className="testimonial-quote">
                "{testimonials[testimonialIdx].quote}"
              </p>
              <div className="testimonial-author">
                {testimonials[testimonialIdx].author}
              </div>
              <div className="testimonial-city">
                {testimonials[testimonialIdx].city}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── SANCTUARIES & HAVELIS ─── */}
      <section id="sanctuaries" className="esencja-section">
        <div className="section-head-center">
          <span className="section-kicker-leaf">OUR DESTINATIONS</span>
          <h2 className="section-main-heading">
            Three Imperial <em>Haveli Sanctuaries</em>
          </h2>
          <div className="section-separator-line" />
          <p className="section-lead-paragraph">
            Historic architectural destinations across New Delhi, preserved for royal multicuisine dining.
          </p>
        </div>

        <div className="sanctuaries-triple-grid">
          {sanctuaries.map((s) => (
            <div key={s.num} className="sanctuary-box">
              <div className="sanctuary-header-line">
                <span className="sanctuary-index">{s.num}</span>
                <span className="sanctuary-locality-tag">{s.locality}</span>
              </div>
              <h3 className="sanctuary-title">{s.name}</h3>
              <p className="sanctuary-address-text">{s.address}</p>
              <p className="sanctuary-story-text">{s.note}</p>
              <div className="sanctuary-hours-line">
                <Clock size={13} className="text-[#22AA00]" />
                <span>{s.hours}</span>
              </div>
              <div className="sanctuary-footer-links">
                <a href={`tel:${s.phone.replace(/\s+/g, '')}`} className="sanctuary-phone-link">
                  {s.phone}
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(s.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="sanctuary-dir-link"
                >
                  <span>Directions</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="esencja-footer">
        <div className="footer-inner-grid">
          <div className="footer-col-brand">
            <img src="/logo.png" alt="RASORAA" className="footer-brand-logo" />
            <h2 className="footer-title-h2">RASORAA</h2>
            <p className="footer-tagline-text">
              THE ART OF ROYAL MULTICUISINE VEGETARIAN DINING
            </p>
            <div className="footer-pure-veg-emblem">
              <span className="leaf-dot" />
              <span>100% SHUDDH SHAKAHARI &amp; JAIN CERTIFIED</span>
            </div>
          </div>

          <div className="footer-col-nav">
            <span className="footer-col-title">Sanctuaries</span>
            <a href="#sanctuaries">Downtown Flagship, CP</a>
            <a href="#sanctuaries">The Waterfront Haveli, Khan Mkt</a>
            <a href="#sanctuaries">Garden Conservatory, Lodhi</a>
            <a href="#zones">Private Salons &amp; Banquets</a>
          </div>

          <div className="footer-col-nav">
            <span className="footer-col-title">Culinary Disciplines</span>
            <a href="#carte">Royal Awadhi Dum</a>
            <a href="#carte">Live Clay Tandoor</a>
            <a href="#carte">Pan-Asian Wok Craft</a>
            <a href="#carte">Continental Hearth</a>
            <a href="#carte">Chenna Sandesh Mithai</a>
          </div>

          <div className="footer-col-nav">
            <span className="footer-col-title">Reservations</span>
            <p className="footer-hours-note">Lunch: 12:00 – 15:30</p>
            <p className="footer-hours-note">Dinner: 19:00 – 23:30</p>
            <a href="tel:+911141002800" className="sanctuary-phone-link">+91 11 4100 2800</a>
            <a href="#zones" className="btn-nav-reserve mt-2 w-fit">
              <Calendar size={13} />
              <span>Online Concierge</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span>© {new Date().getFullYear()} RASORAA VEG RESTAURANT. ALL RIGHTS RESERVED.</span>
          <span>EST. MMXII · 100% PURE VEGETARIAN</span>
          <span>NEW DELHI · BHARAT</span>
        </div>
      </footer>
    </div>
  );
};
