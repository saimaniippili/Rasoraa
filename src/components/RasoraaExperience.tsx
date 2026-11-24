import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Flame,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Plus,
  Sparkles,
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
};

const dishes: Dish[] = [
  {
    id: 'd1',
    name: 'Dal Rasoraa',
    hindi: 'Urad dal simmered overnight on live embers',
    category: 'Earthenware Dum',
    price: 28,
    profile: 'Smoky charcoal · Cultured A2 butter · Slow heat',
    jain: true,
    note: 'Black urad lentils breathe for sixteen hours in a sealed clay handi over wood charcoal, folded by hand with churned Gir cow butter.',
  },
  {
    id: 'd2',
    name: 'Angari Malai Paneer Tikka',
    hindi: 'Fresh curd paneer · Saffron · Stone cardamom',
    category: 'Royal Tandoor',
    price: 32,
    profile: 'Wild saffron · Charred lime · Gentle wood warmth',
    jain: true,
    note: 'Handcrafted Gir cow milk paneer, rested in saffron threads and hung curd before meeting the 400°C live clay tandoor.',
  },
  {
    id: 'd3',
    name: 'Kashmiri Morel Yakhni',
    hindi: 'Gucchi mushrooms · Fennel blossom · Mountain saffron',
    category: 'Earthenware Dum',
    price: 38,
    profile: 'Forest earth · Mountain fennel · Velvety emulsion',
    jain: false,
    note: 'Wild foraged gucchi morels from the Pir Panjal valleys, slowly infused with toasted walnut and simmered in a spiced curd yakhni.',
  },
  {
    id: 'd4',
    name: 'Truffle Edamame Hakka Noodles',
    hindi: 'Artisanal wok noodles · Black truffle · Cold-pressed sesame',
    category: 'Pan-Asian Wok',
    price: 30,
    profile: 'Wok breath (Wok Hei) · Black truffle · Shiitake',
    jain: true,
    note: 'Fresh hand-pulled noodles flashed over screaming wok embers with young edamame, shaved black truffle, and cold-pressed sesame.',
  },
  {
    id: 'd5',
    name: 'Wild Morel & Herb Gratin Crostini',
    hindi: 'Hearth-baked sourdough · Kashmir morel velouté · Fresh thyme',
    category: 'Continental Hearth',
    price: 34,
    profile: 'Charred sourdough · Cultured cream · Garden herbs',
    jain: false,
    note: 'Wild morels in velvet herb reduction, served over garlic-rubbed artisanal stone-hearth sourdough with cold-churned cream.',
  },
  {
    id: 'd6',
    name: 'Subz Awadhi Dum Biryani',
    hindi: 'Long-grain basmati · Garden vegetables · Rose attar',
    category: 'Earthenware Dum',
    price: 34,
    profile: 'Aged basmati · Kashmiri saffron · Damascus rose',
    jain: true,
    note: 'Fragrant basmati layered with seasonal farm vegetables, sealed with dough (purdah) in a clay handi and slow-cooked over gentle embers.',
  },
  {
    id: 'd7',
    name: 'Bhutte Ke Kebab',
    hindi: 'Tender sweet corn patties · Green chilli · Roasted cumin',
    category: 'Royal Tandoor',
    price: 26,
    profile: 'Charred sweet corn · Spiced mint · Crisp gold',
    jain: true,
    note: 'Grated tender sweet corn laced with roasted cumin, fresh coriander, and cold-pressed mustard oil, griddled on cast iron.',
  },
  {
    id: 'd8',
    name: 'Chandi Vark Chenna Mithai',
    hindi: 'Pistachio sandesh · Edible silver leaf · Damascus rose',
    category: 'Mithai & Elixirs',
    price: 24,
    profile: 'Rosewater · Iranian pistachio · Silken chenna',
    jain: true,
    note: 'A delicate finish of hand-beaten cow milk chenna, crowned in 99.9% certified pure silver vark and fragrant organic rose petal preserve.',
  },
  {
    id: 'd9',
    name: 'Kesar Badam Doodh Elixir',
    hindi: 'Slow-steeped saffron milk · Cardamom · Roasted almonds',
    category: 'Mithai & Elixirs',
    price: 16,
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

const culinaryDisciplines = [
  {
    num: '01',
    tag: 'ROYAL AWADHI DUM',
    title: 'Dal Rasoraa & Saffron Dum Handis',
    desc: 'Sixteen hours of patient simmering in clay-sealed earthenware over dying wood embers. The alchemy of cultured butter, Kashmiri saffron, and whole spices.',
    flavor: 'Smoked Butter · Kashmiri Saffron · Earthen Clay',
    image: '/dish-awadhi.jpg',
  },
  {
    num: '02',
    tag: 'LIVE CLAY TANDOOR',
    title: 'Angari Malai Paneer & Stone Spices',
    desc: 'Fresh Gir cow paneer rested in wild saffron and hung curd, blistered at 400°C over live clay charcoal embers with charred lime and cold-pressed ghee.',
    flavor: 'Clay Oven Sear · Stone Cardamom · Charred Lime',
    image: '/dish-tandoor.jpg',
  },
  {
    num: '03',
    tag: 'PAN-ASIAN WOK ALCHEMY',
    title: 'Truffle Edamame & Golden Hakka Noodles',
    desc: 'Hand-pulled artisanal noodles wok-tossed over searing fire breath (Wok Hei) with fresh shiitake, edamame pods, and cold-pressed roasted sesame.',
    flavor: 'Searing Wok Breath · Black Truffle · Shiitake',
    image: '/dish-oriental.jpg',
  },
  {
    num: '04',
    tag: 'ARTISANAL CONTINENTAL',
    title: 'Wild Morel & Herb Gratin Crostini',
    desc: 'Kashmir morels in creamy velvet emulsion served over garlic-rubbed stone-hearth sourdough with cultured cream and garden rosemary.',
    flavor: 'Wild Foraged Morel · Cultured Cream · Hearth Bake',
    image: '/dish-continental.jpg',
  },
];

const criticsPraise = [
  {
    quote: 'Rasoraa strips vegetarian dining of every gimmick. When the seal on their Dal handi cracks open, you understand what royal heritage truly means.',
    critic: 'The Imperial Dining Review',
    city: 'New Delhi Flagship',
    rating: 5,
  },
  {
    quote: 'The level of precision in their live clay tandoor and wok alchemy rivals the greatest culinary institutions in Tokyo and Paris — 100% pure vegetarian reverence.',
    critic: 'Gourmet Gastronomy Guide',
    city: 'Annual Critic Selection',
    rating: 5,
  },
  {
    quote: 'Choosing your exact seating zone in the Haveli Conservatory and having dishes paced to perfection made our evening unforgettable.',
    critic: 'Kavita & Arvind Malhotra',
    city: 'Connaught Place Patrons',
    rating: 5,
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

  // Reservation Form State
  const [partySize, setPartySize] = useState(2);
  const [resDate, setResDate] = useState('Today');
  const [resTime, setResTime] = useState('Dinner 20:00');
  const [resBranch, setResBranch] = useState('Downtown Flagship');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const catMatch = selectedCategory === 'All Creations' || dish.category === selectedCategory;
      const jainMatch = !jainOnly || dish.jain;
      return catMatch && jainMatch;
    });
  }, [selectedCategory, jainOnly]);

  const activeZoneObj = diningZones.find((z) => z.id === selectedZone) || diningZones[0];

  return (
    <div className="obscura-shell">
      {/* Precision Hairline Architectural Grid Lines */}
      <div className="obscura-grid-lines" aria-hidden="true">
        <div className="grid-line" style={{ left: '25%' }} />
        <div className="grid-line" style={{ left: '50%' }} />
        <div className="grid-line" style={{ left: '75%' }} />
      </div>

      {/* Top Precision Meta Rail */}
      <div className="obscura-meta-rail">
        <div className="rail-left">
          <span>28.6139° N&nbsp; / &nbsp;77.2090° E</span>
          <span className="rail-sep">|</span>
          <span className="rail-badge">VOL. IV · IMPERIAL ARCADE</span>
        </div>
        <div className="rail-center">
          <span className="shuddh-status-dot" />
          <span>100% SHUDDH SHAKAHARI &amp; JAIN CERTIFIED</span>
        </div>
        <div className="rail-right">
          <span className="live-status-pulse" />
          <span>ACCEPTING RESERVATIONS TONIGHT</span>
        </div>
      </div>

      {/* Fixed Luxury Nav */}
      <nav className={`obscura-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <Link to="/" className="obscura-brand" aria-label="Rasoraa Home">
          <img src="/logo.png" alt="RASORAA" className="brand-emblem" />
          <div className="brand-naming">
            <span className="brand-title">RASORAA</span>
            <span className="brand-subtitle">MULTICUISINE VEG RESTAURANT</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="obscura-nav-links">
          <a href="#hero">01 // HOME</a>
          <a href="#concierge">02 // ZONES &amp; BOOKING</a>
          <a href="#disciplines">03 // DISCIPLINES</a>
          <a href="#carte">04 // THE CARTE</a>
          <a href="#philosophy">05 // PHILOSOPHY</a>
          <a href="#sanctuaries">06 // SANCTUARIES</a>
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="nav-actions-group">
          <a href="#concierge" className="btn-obscura-action">
            <span>RESERVE TABLE</span>
            <ArrowUpRight size={14} className="btn-icon" />
          </a>
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="obscura-mobile-drawer">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)}>01 // HOME</a>
            <a href="#concierge" onClick={() => setMobileMenuOpen(false)}>02 // ZONES &amp; BOOKING</a>
            <a href="#disciplines" onClick={() => setMobileMenuOpen(false)}>03 // DISCIPLINES</a>
            <a href="#carte" onClick={() => setMobileMenuOpen(false)}>04 // THE CARTE</a>
            <a href="#philosophy" onClick={() => setMobileMenuOpen(false)}>05 // PHILOSOPHY</a>
            <a href="#sanctuaries" onClick={() => setMobileMenuOpen(false)}>06 // SANCTUARIES</a>
            <div className="drawer-footer">
              <span className="drawer-pure-veg">✳ 100% PURE VEGETARIAN SANCTUARY</span>
              <a href="#concierge" className="btn-obscura-action full-w" onClick={() => setMobileMenuOpen(false)}>
                <span>BOOK YOUR TABLE</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO SECTION (OBSCURA STATEMENT + ESENCJA REVERENCE) ─── */}
      <section id="hero" className="obscura-hero">
        {/* Subtle Watermark Ghost Lettering */}
        <div className="hero-ghost-wordmark" aria-hidden="true">
          RASORAA
        </div>

        {/* Hero Top Right Metadata */}
        <div className="hero-top-meta">
          <span className="meta-kicker">ROYAL MULTICUISINE GASTRONOMY</span>
          <span className="meta-details">EST. MMXII · 3 NEW DELHI SANCTUARIES</span>
        </div>

        {/* Hero Central Content */}
        <div className="hero-main-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-accent-dash">—</span>
            <span>FINE DINING, STRIPPED OF COMPROMISE</span>
          </div>

          <h1 className="hero-headline-statement">
            <span className="headline-line1">FIRE, EMBER &amp;</span>
            <span className="headline-line2">VEGETARIAN CRAFT</span>
          </h1>

          <div className="hero-bottom-row">
            <p className="hero-statement-copy">
              From slow-simmered 16-hour Awadhi dum handis and charcoal-charred malai paneer to blistering Pan-Asian wok alchemy and artisanal Continental creations. Precision vegetarian dining crafted with purest reverence.
            </p>

            <div className="hero-actions-cluster">
              <a href="#concierge" className="btn-obscura-solid">
                <span>RESERVE YOUR TABLE</span>
                <ArrowRight size={15} className="arrow-shift" />
              </a>
              <a href="#carte" className="btn-obscura-ghost">
                <span>EXPLORE THE CARTE</span>
              </a>
            </div>
          </div>

          {/* Prestige Monospace Metrics Strip */}
          <div className="hero-metrics-strip">
            <div className="metric-cell">
              <span className="metric-val">16h</span>
              <span className="metric-desc">Charcoal Dum Embers</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-cell">
              <span className="metric-val">100%</span>
              <span className="metric-desc">Shuddh Veg &amp; Jain Kitchen</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-cell">
              <span className="metric-val">03</span>
              <span className="metric-desc">Haveli Sanctuaries</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-cell">
              <span className="metric-val">400°C</span>
              <span className="metric-desc">Live Clay Tandoor Heat</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-beam">
          <div className="scroll-beam-line" />
          <span className="scroll-beam-text">SCROLL TO EXPLORE</span>
        </div>
      </section>

      {/* ─── SECTION 02: TABLE CONCIERGE & DINING ZONES (FROM ESENCJA) ─── */}
      <section id="concierge" className="obscura-section concierge-section">
        <div className="section-header-block">
          <div className="section-num-tag">02 // TABLE CONCIERGE</div>
          <h2 className="section-title-statement">
            SELECT YOUR <span className="title-stroke">DINING ZONE</span>
          </h2>
          <p className="section-subtitle">
            Every sanctuary offers distinct culinary atmospheres. Choose your seating environment and reserve instantly.
          </p>
        </div>

        {/* 4 Interactive Seating Zones */}
        <div className="dining-zones-grid">
          {diningZones.map((zone) => (
            <div
              key={zone.id}
              onClick={() => setSelectedZone(zone.id)}
              className={`zone-card ${selectedZone === zone.id ? 'zone-active' : ''}`}
            >
              <div className="zone-card-top">
                <span className="zone-number">{zone.number}</span>
                <span className="zone-tag-pill">{zone.tag}</span>
              </div>
              <h3 className="zone-name">{zone.name}</h3>
              <p className="zone-subtitle">{zone.subtitle}</p>
              <div className="zone-meta">
                <span className="zone-capacity">
                  <Users size={12} /> {zone.capacity}
                </span>
                <span className="zone-ideal">{zone.ideal}</span>
              </div>
              <div className="zone-select-indicator">
                {selectedZone === zone.id ? (
                  <span className="selected-text">
                    <Check size={12} /> ZONE SELECTED
                  </span>
                ) : (
                  <span className="select-prompt">CLICK TO SELECT</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Booking Parameters Bar */}
        <div className="concierge-booking-box">
          <div className="booking-box-header">
            <div className="box-header-title">
              <Sparkles size={14} className="gold-icon" />
              <span>CONFIRMING FOR: <strong>{activeZoneObj.name}</strong></span>
            </div>
            <div className="box-header-status">
              <span className="green-pulse-dot" />
              <span>TABLES AVAILABLE TONIGHT</span>
            </div>
          </div>

          {!bookingConfirmed ? (
            <div className="booking-fields-row">
              {/* Branch Selector */}
              <div className="booking-field-group">
                <label className="field-label">SANCTUARY LOCATION</label>
                <div className="field-input-wrap">
                  <MapPin size={14} className="field-icon" />
                  <select
                    value={resBranch}
                    onChange={(e) => setResBranch(e.target.value)}
                    className="styled-select"
                  >
                    <option value="Downtown Flagship">Connaught Place Flagship</option>
                    <option value="Waterfront Haveli">Waterfront Haveli (Khan Market)</option>
                    <option value="Garden Conservatory">Garden Conservatory (Lodhi Road)</option>
                  </select>
                </div>
              </div>

              {/* Date Selector */}
              <div className="booking-field-group">
                <label className="field-label">DATE</label>
                <div className="field-input-wrap">
                  <Calendar size={14} className="field-icon" />
                  <select
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="styled-select"
                  >
                    <option value="Today">Today, 24 Nov</option>
                    <option value="Tomorrow">Tomorrow, 25 Nov</option>
                    <option value="This Weekend">This Weekend (Sat, 28 Nov)</option>
                  </select>
                </div>
              </div>

              {/* Time Session */}
              <div className="booking-field-group">
                <label className="field-label">MEAL SESSION</label>
                <div className="field-input-wrap">
                  <Clock size={14} className="field-icon" />
                  <select
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="styled-select"
                  >
                    <option value="Lunch 12:30">Lunch Seating · 12:30 PM</option>
                    <option value="Lunch 14:00">Lunch Seating · 02:00 PM</option>
                    <option value="Sunset 17:00">Sunset High Tea · 05:00 PM</option>
                    <option value="Dinner 19:30">Dinner Seating · 07:30 PM</option>
                    <option value="Dinner 20:30">Royal Dinner · 08:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Guests Stepper */}
              <div className="booking-field-group">
                <label className="field-label">PARTY SIZE</label>
                <div className="party-stepper-wrap">
                  <button
                    onClick={() => setPartySize(Math.max(1, partySize - 1))}
                    className="stepper-btn"
                    aria-label="Decrease guests"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="party-count">{partySize < 10 ? `0${partySize}` : partySize} PATRONS</span>
                  <button
                    onClick={() => setPartySize(Math.min(16, partySize + 1))}
                    className="stepper-btn"
                    aria-label="Increase guests"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                onClick={() => setBookingConfirmed(true)}
                className="btn-book-submit"
              >
                <span>CONFIRM TABLE</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="booking-success-card">
              <div className="success-icon-badge">
                <Check size={24} />
              </div>
              <div className="success-copy">
                <h3>RESERVATION RECORDED · {activeZoneObj.name.toUpperCase()}</h3>
                <p>
                  Your table for <strong>{partySize} patrons</strong> is allocated at <strong>{resBranch}</strong> for <strong>{resDate} ({resTime})</strong>. A concierge confirmation SMS has been prepared.
                </p>
              </div>
              <button
                onClick={() => setBookingConfirmed(false)}
                className="btn-modify"
              >
                MODIFY SEATING
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── SECTION 03: THE FOUR CULINARY DISCIPLINES (OBSCURA GRID) ─── */}
      <section id="disciplines" className="obscura-section disciplines-section">
        <div className="section-header-block">
          <div className="section-num-tag">03 // CULINARY ARCHITECTURE</div>
          <h2 className="section-title-statement">
            FOUR REVERED <span className="title-stroke">DISCIPLINES</span>
          </h2>
          <p className="section-subtitle">
            Rasoraa unites the royal Awadhi heritage with live clay ovens, wok-tossed Asian gastronomy, and European hearth baking.
          </p>
        </div>

        <div className="disciplines-grid">
          {culinaryDisciplines.map((item) => (
            <div key={item.num} className="discipline-card">
              <div className="discipline-img-stage">
                <img src={item.image} alt={item.title} className="discipline-photo" />
                <div className="discipline-photo-overlay" />
                <span className="discipline-index">{item.num}</span>
                <span className="discipline-badge-pill">{item.tag}</span>
              </div>
              <div className="discipline-info">
                <h3 className="discipline-title">{item.title}</h3>
                <p className="discipline-desc">{item.desc}</p>
                <div className="discipline-flavor-bar">
                  <span className="flavor-label">FLAVOR NOTES:</span>
                  <span className="flavor-value">{item.flavor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 04: THE CARTE (PRECISION EDITORIAL MENU) ─── */}
      <section id="carte" className="obscura-section carte-section">
        <div className="section-header-block">
          <div className="section-num-tag">04 // THE EDITORIAL CARTE</div>
          <h2 className="section-title-statement">
            CURATED <span className="title-stroke">CREATIONS</span>
          </h2>
          <p className="section-subtitle">
            Seasonal ingredients, cold-churned Gir cow dairy, and ancient slow-fire techniques.
          </p>
        </div>

        {/* Menu Filtering Toolbar */}
        <div className="carte-toolbar-bar">
          <div className="carte-categories-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`carte-cat-btn ${selectedCategory === cat ? 'cat-active' : ''}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => setJainOnly(!jainOnly)}
            className={`jain-toggle-btn ${jainOnly ? 'jain-active' : ''}`}
            title="Filter 100% Jain Certified Creations"
          >
            <span className="jain-dot" />
            <span>JAIN CREATIONS ONLY</span>
          </button>
        </div>

        {/* Dishes List */}
        <div className="dishes-ledger">
          {filteredDishes.map((dish, idx) => {
            const isExpanded = expandedDish === dish.id;
            const indexStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
            return (
              <div
                key={dish.id}
                className={`dish-ledger-row ${isExpanded ? 'dish-row-expanded' : ''}`}
                onClick={() => setExpandedDish(isExpanded ? null : dish.id)}
              >
                <div className="dish-row-summary">
                  <span className="dish-order-index">{indexStr}</span>

                  <div className="dish-identity">
                    <div className="dish-title-line">
                      <span className="dish-name-bold">{dish.name}</span>
                      {dish.jain && (
                        <span className="jain-mini-badge" title="Prepared strictly according to Jain dietary tradition">
                          JAIN CERTIFIED
                        </span>
                      )}
                    </div>
                    <span className="dish-hindi-sub">{dish.hindi}</span>
                  </div>

                  <span className="dish-flavor-notes">{dish.profile}</span>

                  <div className="dish-pricing">
                    <span className="price-num">₹{dish.price * 25}</span>
                    <span className="dish-expand-icon">
                      <ChevronDown size={14} className={isExpanded ? 'rotate-180' : ''} />
                    </span>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="dish-expanded-details"
                    >
                      <div className="expanded-inner">
                        <div className="craft-note">
                          <Flame size={13} className="craft-icon" />
                          <p>{dish.note}</p>
                        </div>
                        <div className="expanded-meta-tag">
                          <span>DISCIPLINE: {dish.category.toUpperCase()}</span>
                          <span>•</span>
                          <span>100% SHUDDH SHAKAHARI</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── SECTION 05: THREE REVERENT PILLARS (OBSCURA PROCESS) ─── */}
      <section id="philosophy" className="obscura-section philosophy-section">
        <div className="section-header-block">
          <div className="section-num-tag">05 // THE PHILOSOPHY</div>
          <h2 className="section-title-statement">
            THREE REVERENT <span className="title-stroke">PILLARS</span>
          </h2>
          <p className="section-subtitle">
            True luxury is restraint. We strip away synthetic enhancers, animal derivatives, and rushed preparation.
          </p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <span className="pillar-num">01</span>
            <h3 className="pillar-title">ETHICAL SOURCING</h3>
            <p className="pillar-body">
              Certified Gir cow A2 dairy, cold-pressed stone mustard oils, hand-harvested wild morels from Kashmir, and organic single-origin spices ground in stone pestles.
            </p>
            <div className="pillar-tag">NO PROCESSED EXTRACTS</div>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">02</span>
            <h3 className="pillar-title">THE ELEMENT OF FIRE</h3>
            <p className="pillar-body">
              Sixteen-hour sealed clay handis slow-simmered over wood charcoal embers, live 400°C clay tandoors, and roaring wok hearths that impart authentic breath.
            </p>
            <div className="pillar-tag">ANCIENT CHARCOAL ALCHEMY</div>
          </div>

          <div className="pillar-card">
            <span className="pillar-num">03</span>
            <h3 className="pillar-title">PURE VEGETARIAN SANCTUARY</h3>
            <p className="pillar-body">
              100% Shuddh Shakahari and Jain sanctuaries. We use zero eggs, zero gelatin, zero animal rennet, and provide dedicated separate Jain preparation stations.
            </p>
            <div className="pillar-tag">100% PURE VEG REVERENCE</div>
          </div>
        </div>
      </section>

      {/* ─── CRITICS PRAISE (ESENCJA STYLE) ─── */}
      <section className="obscura-section praise-section">
        <div className="praise-grid">
          {criticsPraise.map((item, idx) => (
            <div key={idx} className="praise-card">
              <div className="praise-stars">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={12} fill="#c3a66c" color="#c3a66c" />
                ))}
              </div>
              <p className="praise-quote">"{item.quote}"</p>
              <div className="praise-author">
                <span className="critic-name">{item.critic}</span>
                <span className="critic-city">{item.city}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 06: SANCTUARIES & HAVELIS ─── */}
      <section id="sanctuaries" className="obscura-section sanctuaries-section">
        <div className="section-header-block">
          <div className="section-num-tag">06 // THE SANCTUARIES</div>
          <h2 className="section-title-statement">
            THREE HAVELI <span className="title-stroke">DESTINATIONS</span>
          </h2>
          <p className="section-subtitle">
            Restored heritage havelis across the imperial capital of New Delhi.
          </p>
        </div>

        <div className="sanctuaries-grid">
          {sanctuaries.map((s) => (
            <div key={s.num} className="sanctuary-card">
              <div className="sanctuary-card-top">
                <span className="sanctuary-num">{s.num}</span>
                <span className="sanctuary-locality">{s.locality}</span>
              </div>
              <h3 className="sanctuary-name">{s.name}</h3>
              <p className="sanctuary-address">{s.address}</p>
              <p className="sanctuary-note">{s.note}</p>
              <div className="sanctuary-timing">
                <Clock size={12} />
                <span>{s.hours}</span>
              </div>
              <div className="sanctuary-actions">
                <a href={`tel:${s.phone.replace(/\s+/g, '')}`} className="sanctuary-phone">
                  {s.phone}
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(s.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="sanctuary-map-link"
                >
                  GET DIRECTIONS <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BESPOKE ARCHITECTURAL FOOTER ─── */}
      <footer className="obscura-footer">
        <div className="footer-top-row">
          <div className="footer-brand-block">
            <img src="/logo.png" alt="RASORAA" className="footer-logo" />
            <h2 className="footer-brand-title">RASORAA</h2>
            <p className="footer-tagline">
              ROYAL MULTICUISINE VEGETARIAN GASTRONOMY · NEW DELHI
            </p>
            <div className="footer-shuddh-badge">
              <span className="green-dot" />
              <span>100% SHUDDH SHAKAHARI CERTIFIED</span>
            </div>
          </div>

          <div className="footer-links-col">
            <span className="col-header">SANCTUARIES</span>
            <a href="#sanctuaries">Downtown Flagship, CP</a>
            <a href="#sanctuaries">The Waterfront Haveli, Khan Mkt</a>
            <a href="#sanctuaries">Garden Conservatory, Lodhi</a>
            <a href="#concierge">Private Dining &amp; Salons</a>
          </div>

          <div className="footer-links-col">
            <span className="col-header">CULINARY</span>
            <a href="#carte">Royal Awadhi Dum</a>
            <a href="#carte">Live Clay Tandoor</a>
            <a href="#carte">Pan-Asian Wok Craft</a>
            <a href="#carte">Continental Hearth</a>
            <a href="#carte">Artisanal Chenna Mithai</a>
          </div>

          <div className="footer-links-col">
            <span className="col-header">RESERVATIONS &amp; HOURS</span>
            <p className="hours-text">Lunch: 12:00 – 15:30</p>
            <p className="hours-text">Dinner: 19:00 – 23:30</p>
            <a href="tel:+911141002800" className="footer-phone">+91 11 4100 2800</a>
            <a href="#concierge" className="btn-footer-reserve">
              <span>ONLINE CONCIERGE ↗</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <span>© {new Date().getFullYear()} RASORAA VEG RESTAURANT. ALL RIGHTS RESERVED.</span>
          <span>EST. MMXII · CRAFTED WITH REVERENCE</span>
          <span>NEW DELHI · BHARAT</span>
        </div>
      </footer>
    </div>
  );
};
