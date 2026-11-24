import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Plus,
  Sparkles,
  X,
} from 'lucide-react';

type Dish = {
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
    name: 'Dal Rasoraa',
    hindi: 'Urad dal simmered overnight on embers',
    category: 'Earthenware Dum',
    price: 28,
    profile: 'Smoky charcoal · cultured cream · mild heat',
    jain: true,
    note: 'Black urad lentils breathe for sixteen hours in a sealed clay handi, finished with a whisper of smoked butter.',
  },
  {
    name: 'Malai Paneer Tikka',
    hindi: 'Handcrafted paneer · saffron · stone-ground cardamom',
    category: 'Royal Tandoor',
    price: 32,
    profile: 'Saffron milk · charred lime · gentle warmth',
    jain: true,
    note: 'Fresh Gir milk paneer, rested in saffron and hung curd before meeting the live clay tandoor.',
  },
  {
    name: 'Kashmiri Morel Yakhni',
    hindi: 'Gucchi mushrooms · fennel · wild mountain saffron',
    category: 'Earthenware Dum',
    price: 38,
    profile: 'Forest earth · fennel blossom · delicate',
    jain: false,
    note: 'Wild morels from Kashmir, slowly filled with fragrant walnut and folded into a yoghurt yakhni.',
  },
  {
    name: 'Chandi Vark Mithai',
    hindi: 'Pistachio sandesh · edible silver · rose',
    category: 'Artisanal Mithai',
    price: 24,
    profile: 'Rosewater · pistachio · floral',
    jain: true,
    note: 'A delicate finish of hand-beaten chenna, crowned in edible silver leaf and Damascus rose.',
  },
  {
    name: 'Kesar Badam Doodh',
    hindi: 'Saffron almond milk · green cardamom · chilled',
    category: 'Elixirs & Chai',
    price: 16,
    profile: 'Saffron · toasted almond · cool',
    jain: true,
    note: 'A slow-steeped house elixir with Kashmir saffron and freshly milled almonds.',
  },
  {
    name: 'Angithi Baingan',
    hindi: 'Fire-roasted aubergine · tomato · coriander',
    category: 'Royal Tandoor',
    price: 26,
    profile: 'Live fire · sweet tomato · bright herbs',
    jain: false,
    note: 'Whole aubergine blistered over charcoal and folded by hand with warming spices.',
  },
];

const categories = ['All Creations', 'Earthenware Dum', 'Royal Tandoor', 'Artisanal Mithai', 'Elixirs & Chai'];

const branches = [
  {
    name: 'Downtown Flagship',
    address: '12, The Imperial Arcade, Connaught Place, New Delhi 110001',
    style: 'A restored 1911 haveli of carved teak, jade inlay and vaulted lime-plaster ceilings.',
    phone: '+91 11 4100 2800',
    map: 'Connaught Place, New Delhi',
  },
  {
    name: 'The Waterfront Haveli',
    address: '5, Riverfront Promenade, Khan Market, New Delhi 110003',
    style: 'An intimate riverside pavilion with jaali screens and a moonlit sheesh-mahal salon.',
    phone: '+91 11 4100 2801',
    map: 'Khan Market, New Delhi',
  },
  {
    name: 'Garden Conservatory',
    address: '18, Lodhi Gardens Estate, Lodhi Road, New Delhi 110003',
    style: 'A glass-roofed winter garden among old-growth neem and fragrant mogra.',
    phone: '+91 11 4100 2802',
    map: 'Lodhi Gardens, New Delhi',
  },
];

const heroCuisines = [
  {
    id: 'awadhi',
    tag: 'ROYAL AWADHI DUM',
    title: 'Dal Rasoraa & Saffron Biryani',
    desc: 'Slow-simmered for 16 hours over charcoal embers in sealed earthen handis with cultured butter.',
    flavor: 'Smoked Butter · Kashmiri Saffron · Whole Spices',
    badge: '16h Charcoal Dum',
    image: '/dish-awadhi.jpg',
  },
  {
    id: 'tandoor',
    tag: 'LIVE CLAY TANDOOR',
    title: 'Angari Malai Paneer Tikka',
    desc: 'Fresh Gir cow paneer rested in wild saffron and hung curd, blistered over live clay embers.',
    flavor: 'Stone Cardamom · Charred Lime · Ghee Embers',
    badge: 'Clay Oven Sear',
    image: '/dish-tandoor.jpg',
  },
  {
    id: 'oriental',
    tag: 'PAN-ASIAN WOK ALCHEMY',
    title: 'Truffle Edamame & Golden Hakka Noodles',
    desc: 'Hand-pulled artisanal noodles wok-tossed with fresh shiitake, edamame and cold-pressed sesame.',
    flavor: 'Black Truffle · Searing Wok Breath · Sesame',
    badge: 'Live Wok Craft',
    image: '/dish-oriental.jpg',
  },
  {
    id: 'continental',
    tag: 'ARTISANAL CONTINENTAL',
    title: 'Wild Morel & Herb Gratin Crostini',
    desc: 'Kashmir morels in creamy velvet emulsion served alongside garlic-rubbed artisanal hearth sourdough.',
    flavor: 'Wild Morel · Cultured Cream · Rosemary',
    badge: 'Stone Hearth Bake',
    image: '/dish-continental.jpg',
  },
];

export const RasoraaExperience: React.FC = () => {
  const [activeCuisine, setActiveCuisine] = useState(0);
  const [category, setCategory] = useState('All Creations');
  const [jainOnly, setJainOnly] = useState(false);
  const [branch, setBranch] = useState(0);
  const [modal, setModal] = useState<'purity' | 'acts' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedDish, setExpandedDish] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('Today');
  const [reservation, setReservation] = useState(false);

  const filtered = useMemo(
    () =>
      dishes.filter(
        (dish) => (category === 'All Creations' || dish.category === category) && (!jainOnly || dish.jain)
      ),
    [category, jainOnly]
  );

  return (
    <main className="site-shell">
      {/* Micro Rail Top Banner */}
      <div className="micro-rail">
        <span>28.6139° N&nbsp; / &nbsp;77.2090° E</span>
        <button onClick={() => setModal('purity')}>
          100% Shuddh Shakahari Multicuisine Certified <span className="tiny-leaf">✳</span>
        </button>
        <span className="rail-status">
          <i /> Accepting reservations for lunch & dinner
        </span>
      </div>

      {/* Main Architectural Header */}
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label="Rasoraa home">
          <img
            src="/logo.png"
            alt="RASORAA Multicuisine Veg Restaurant"
            className="wordmark-logo"
          />
          <span className="wordmark-text">
            RASORAA
            <small>MULTICUISINE VEG RESTAURANT</small>
          </span>
        </Link>

        <button
          className="mobile-menu"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
        </button>

        <nav
          className={mobileOpen ? 'main-nav nav-open' : 'main-nav'}
          aria-label="Main navigation"
        >
          <a href="#carte" onClick={() => setMobileOpen(false)}>
            The Carte
          </a>
          <a href="#experiences" onClick={() => setMobileOpen(false)}>
            Experiences
          </a>
          <a href="#philosophy" onClick={() => setMobileOpen(false)}>
            Our Story
          </a>
          <Link to="/reservations" onClick={() => setMobileOpen(false)}>
            Reservations
          </Link>
          <Link to="/events" onClick={() => setMobileOpen(false)}>
            Private Dining
          </Link>
          <a href="#sanctuaries" onClick={() => setMobileOpen(false)}>
            Sanctuaries
          </a>

          <div className="nav-actions">
            <span className="pure-veg-tag" title="100% Pure Vegetarian Certified">
              <span className="veg-icon-dot" /> Pure Veg
            </span>
            <Link
              to="/reservations"
              className="nav-book-cta"
              onClick={() => setMobileOpen(false)}
            >
              Book a Table <ArrowUpRight size={14} />
            </Link>
          </div>
        </nav>
        {mobileOpen && (
          <div
            className="mobile-backdrop"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </header>

      {/* Creative Bespoke Hero: Royal Multicuisine Gastronomy */}
      <section className="creative-hero-section" id="top">
        <div className="creative-hero-container">
          {/* Left Column: Bold Narrative & Dual Action */}
          <div className="creative-hero-copy">
            <div className="creative-hero-eyebrow">
              <span className="eyebrow-badge">100% PURE VEGETARIAN</span>
              <span className="eyebrow-divider">/</span>
              <span className="eyebrow-text">ROYAL MULTICUISINE GASTRONOMY</span>
            </div>

            <h1 className="creative-hero-headline">
              Where heritage spices meet <em>contemporary culinary alchemy</em>.
            </h1>

            <p className="creative-hero-desc">
              From slow-simmered Awadhi dum handis and charcoal-charred malai paneer to vibrant Pan-Asian wok alchemy and artisanal Continental creations — crafted with purest ingredients and reverence.
            </p>

            <div className="creative-hero-actions">
              <a href="#carte" className="btn-primary-hero">
                Explore The Carte <ArrowRight size={16} />
              </a>
              <Link to="/reservations" className="btn-secondary-hero">
                <Clock3 size={15} /> Reserve Your Table
              </Link>
            </div>

            {/* Prestige Metric Badges */}
            <div className="creative-hero-metrics">
              <div className="metric-item">
                <span className="metric-num">16h</span>
                <span className="metric-label">Charcoal Dum Embers</span>
              </div>
              <div className="metric-sep" />
              <div className="metric-item">
                <span className="metric-num">100%</span>
                <span className="metric-label">Pure Veg &amp; Jain Kitchen</span>
              </div>
              <div className="metric-sep" />
              <div className="metric-item">
                <span className="metric-num">3</span>
                <span className="metric-label">Haveli Sanctuaries</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Multicuisine Showcase Stage */}
          <div className="creative-hero-stage">
            {/* Cuisine Selector Tabs */}
            <div className="cuisine-tabs-bar" role="tablist">
              {heroCuisines.map((item, idx) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={activeCuisine === idx}
                  className={`cuisine-tab-btn ${activeCuisine === idx ? 'active' : ''}`}
                  onClick={() => setActiveCuisine(idx)}
                >
                  {item.tag.split(' ')[0]} {item.tag.split(' ')[1] || ''}
                </button>
              ))}
            </div>

            {/* Active Dish Feature Card with Dynamic Transitions */}
            <div className="cuisine-display-card">
              <div className="cuisine-img-wrap">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={heroCuisines[activeCuisine].id}
                    src={heroCuisines[activeCuisine].image}
                    alt={heroCuisines[activeCuisine].title}
                    className="cuisine-active-img"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </AnimatePresence>
                <div className="cuisine-overlay-gradient" />
                <span className="cuisine-badge-pill">
                  {heroCuisines[activeCuisine].badge}
                </span>
                <span className="cuisine-jain-pill">
                  <Sparkles size={11} /> Jain Friendly
                </span>
              </div>

              <div className="cuisine-info-pane">
                <span className="cuisine-subtag">{heroCuisines[activeCuisine].tag}</span>
                <h3 className="cuisine-dish-title">{heroCuisines[activeCuisine].title}</h3>
                <p className="cuisine-dish-desc">{heroCuisines[activeCuisine].desc}</p>
                <div className="cuisine-dish-flavor">
                  <span>NOTES:</span> {heroCuisines[activeCuisine].flavor}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean, Non-Obtrusive Quick Reservation Dock */}
        <div className="concierge-strip">
          <div className="concierge-strip-inner">
            <div className="concierge-strip-header">
              <span className="concierge-strip-title">QUICK TABLE CONCIERGE</span>
              <span className="concierge-live-badge">
                <span className="live-dot" /> 6 Tables Available Tonight
              </span>
            </div>
            <div className="concierge-strip-grid">
              <div className="strip-field">
                <span className="field-label">HAVELI LOCATION</span>
                <select
                  value={branch}
                  onChange={(e) => setBranch(Number(e.target.value))}
                  aria-label="Select Haveli Location"
                >
                  {branches.map((b, i) => (
                    <option key={b.name} value={i}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="strip-field">
                <span className="field-label">GUEST COUNT</span>
                <div className="strip-stepper">
                  <button
                    type="button"
                    aria-label="Decrease guests"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                  >
                    <Minus size={13} />
                  </button>
                  <b>{String(guests).padStart(2, '0')} Guests</b>
                  <button
                    type="button"
                    aria-label="Increase guests"
                    onClick={() => setGuests(Math.min(12, guests + 1))}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              <div className="strip-field">
                <span className="field-label">SERVICE &amp; DATE</span>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  aria-label="Select Date and Service"
                >
                  <option>Today · Dinner (8:00 PM)</option>
                  <option>Tomorrow · Lunch (1:00 PM)</option>
                  <option>Tomorrow · Dinner (8:30 PM)</option>
                  <option>This Weekend · Royal Feast</option>
                </select>
              </div>

              <Link
                to={`/reservations?branch=${branch}&guests=${guests}`}
                className="strip-cta-btn"
              >
                Find Table <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Manifesto Section */}
      <section className="manifesto section-pad" id="philosophy">
        <div className="manifesto-photo">
          <div className="photo-note">
            <span>THE PANTRY OF THE EMPERORS</span>
            <span>KASHMIRI MOREL · STONE-GROUND CARDAMOM · 24K VARK</span>
          </div>
        </div>

        <div className="manifesto-copy">
          <span className="eyebrow">
            <span className="eyebrow-line" /> A PHILOSOPHY OF ABUNDANCE
          </span>
          <h2>“Vegetarian dining in royal Awadh was never an act of restraint.”</h2>
          <p className="manifesto-sub">It was the supreme canvas of spice alchemy.</p>

          <div className="ledger">
            <div>
              <b>01</b>
              <span>
                Pure Gir cow<br />
                A2 ghee
              </span>
            </div>
            <div>
              <b>02</b>
              <span>
                Zero onion &amp; garlic<br />
                Jain sanctuaries
              </span>
            </div>
            <div>
              <b>03</b>
              <span>
                36 stone-mortared<br />
                masalas
              </span>
            </div>
            <div>
              <b>04</b>
              <span>
                16-hour earthenware<br />
                dum
              </span>
            </div>
          </div>

          <button
            type="button"
            className="text-link button-link"
            onClick={() => setModal('purity')}
          >
            Our purity promise <ArrowUpRight size={14} />
          </button>
        </div>
      </section>

      {/* Signature Experiences Asymmetrical Bento Grid */}
      <section className="experiences section-pad" id="experiences">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" /> A PLACE AT THE COURT
            </span>
            <h2>
              Choose your <em>ceremony.</em>
            </h2>
          </div>
          <span className="section-index">THE RASORAA EXPERIENCES &nbsp; / &nbsp; 03</span>
        </div>

        <div className="experience-grid">
          {/* Main 70% Card: The Silver Thali */}
          <button
            type="button"
            className="experience-main"
            onClick={() => setModal('acts')}
          >
            <div className="experience-image silver">
              <span className="experience-number">01 — THE SIGNATURE</span>
              <span className="courses-tag">
                32 courses <ArrowUpRight size={13} />
              </span>
            </div>
            <div className="experience-caption">
              <div>
                <h3>
                  The Silver Thali<br />
                  <em>Degustation</em>
                </h3>
                <p>Seven acts. Thirty-two expressions. One silver heirloom.</p>
              </div>
              <span className="round-arrow">
                <ArrowUpRight size={20} />
              </span>
            </div>
          </button>

          {/* Stacked Cards: Dum & Sheesh Mahal */}
          <div className="experience-stack">
            <a className="stack-card dum" href="#carte">
              <span className="experience-number">02 — FROM THE EMBER</span>
              <div>
                <h3>
                  Wood-fired<br />
                  <em>Awadhi Dum</em>
                </h3>
                <span className="text-link">
                  Explore the craft <ArrowRight size={13} />
                </span>
              </div>
            </a>

            <a className="stack-card sheesh" href="#sanctuaries">
              <span className="experience-number">03 — THE PRIVATE SALON</span>
              <div>
                <h3>
                  Sheesh Mahal<br />
                  <em>Banqueting</em>
                </h3>
                <span className="text-link">
                  Enquire privately <ArrowRight size={13} />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Carte Menu Section */}
      <section className="carte section-pad" id="carte">
        <div className="carte-top">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" /> FROM OUR ROYAL KITCHEN
            </span>
            <h2>
              The <em>carte.</em>
            </h2>
          </div>
          <p>
            Each creation is an act of patience.<br />
            Each ingredient, a story with a provenance.
          </p>
        </div>

        <div className="carte-toolbar">
          <div className="category-list" role="tablist" aria-label="Menu categories">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                className={category === item ? 'category active' : 'category'}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={jainOnly ? 'jain-toggle is-on' : 'jain-toggle'}
            aria-pressed={jainOnly}
            onClick={() => setJainOnly(!jainOnly)}
          >
            <span className="toggle-track">
              <i />
            </span>{' '}
            Jain-friendly only
          </button>
        </div>

        <div className="dish-list">
          <AnimatePresence mode="popLayout">
            {filtered.map((dish, index) => (
              <motion.article
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className={expandedDish === dish.name ? 'dish-row dish-expanded' : 'dish-row'}
                key={dish.name}
              >
                <button
                  type="button"
                  className="dish-summary"
                  aria-expanded={expandedDish === dish.name}
                  onClick={() => setExpandedDish(expandedDish === dish.name ? null : dish.name)}
                >
                  <span className="dish-index">0{index + 1}</span>
                  <span className="veg-mark">
                    <i />
                  </span>
                  <span className="dish-name">
                    <b>{dish.name}</b>
                    <small>{dish.hindi}</small>
                  </span>
                  <span className="dish-profile">{dish.profile}</span>
                  <span className="dish-price">${dish.price}</span>
                  <span className="dish-plus">
                    {expandedDish === dish.name ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {expandedDish === dish.name && (
                    <motion.div
                      className="dish-note"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <span>FROM THE DASTARKHWAN</span>
                      <p>{dish.note}</p>
                      <span className="dish-category">{dish.category.toUpperCase()}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <div className="carte-footer">
          <span>MENU COMPOSED DAILY · SEASONAL INGREDIENTS MAY VARY</span>
          <Link to="/reservations">
            Request the full carte <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Sanctuaries Multi-Branch Concierge Section */}
      <section className="sanctuaries section-pad" id="sanctuaries">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" /> THREE DOORS. ONE WELCOME.
            </span>
            <h2>
              Our <em>sanctuaries.</em>
            </h2>
          </div>
          <span className="section-index">NEW DELHI, INDIA</span>
        </div>

        <div className="branch-tabs" role="tablist" aria-label="Restaurant locations">
          {branches.map((place, index) => (
            <button
              key={place.name}
              type="button"
              role="tab"
              aria-selected={branch === index}
              className={branch === index ? 'branch-tab selected' : 'branch-tab'}
              onClick={() => setBranch(index)}
            >
              <span>0{index + 1}</span>
              {place.name}
            </button>
          ))}
        </div>

        <div className="branch-content">
          <div className="branch-details">
            <span className="open-status">
              <i /> OPEN TODAY <span>12:00 PM — 11:30 PM</span>
            </span>
            <h3>{branches[branch].name}</h3>
            <p className="branch-style">{branches[branch].style}</p>
            <div className="branch-address">
              <MapPin size={15} />
              <span>{branches[branch].address}</span>
            </div>
            <a
              className="branch-phone"
              href={`tel:${branches[branch].phone.replace(/\s+/g, '')}`}
            >
              CONCIERGE &nbsp; {branches[branch].phone} <ArrowUpRight size={14} />
            </a>
            <Link className="text-link" to={`/reservations?branch=${branch}`}>
              Reserve this sanctuary <ArrowRight size={14} />
            </Link>
          </div>

          <div className="map-panel">
            <iframe
              title={`Map showing ${branches[branch].name}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(branches[branch].map)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <span className="map-label">
              <MapPin size={14} /> RASORAA &nbsp; / &nbsp; NEW DELHI
            </span>
          </div>
        </div>
      </section>

      {/* Table Reservation Section */}
      <section className="reservation section-pad" id="reserve">
        <div className="reservation-intro">
          <span className="eyebrow">
            <span className="eyebrow-line" /> YOUR EVENING, ORCHESTRATED
          </span>
          <h2>
            A table<br />
            awaits <em>you.</em>
          </h2>
          <p>Some evenings deserve to be remembered before they even begin.</p>
          <span className="reservation-mark">
            R<br />
            <small>RESERVATIONS</small>
          </span>
        </div>

        <div className="reservation-form">
          <div className="form-progress">
            <span>YOUR REQUEST</span>
            <span>
              01 <i /> 02 <i /> 03 <i /> 04 <i /> 05
            </span>
          </div>

          <h3>{reservation ? 'Your evening begins here.' : 'Begin your reservation.'}</h3>

          {reservation ? (
            <div className="reservation-success">
              <span className="success-mark">
                <Check />
              </span>
              <p>Your table request is prepared.</p>
              <span>Our concierge will be in touch shortly to complete your reservation.</span>
              <button
                type="button"
                className="text-link button-link"
                onClick={() => setReservation(false)}
              >
                Make another request <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <>
              <label className="form-field">
                <span>01 — SELECT YOUR SANCTUARY</span>
                <select
                  value={branch}
                  onChange={(e) => setBranch(Number(e.target.value))}
                >
                  {branches.map((place, index) => (
                    <option key={place.name} value={index}>
                      {place.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} />
              </label>

              <div className="form-split">
                <label className="form-field">
                  <span>02 — THE DATE</span>
                  <input
                    type="date"
                    defaultValue="2026-11-25"
                    min="2026-11-24"
                  />
                  <Clock3 size={15} />
                </label>

                <label className="form-field">
                  <span>03 — THE SERVICE</span>
                  <select defaultValue="Darbar Dinner">
                    <option>Lunch</option>
                    <option>Sunset</option>
                    <option>Darbar Dinner</option>
                  </select>
                  <ChevronDown size={15} />
                </label>
              </div>

              <label className="form-field">
                <span>04 — YOUR PARTY</span>
                <select defaultValue="02 Patrons">
                  <option>01 Patron</option>
                  <option>02 Patrons</option>
                  <option>03 Patrons</option>
                  <option>04 Patrons</option>
                  <option>05 Patrons</option>
                  <option>06 Patrons</option>
                  <option>Private party · 7+</option>
                </select>
                <ChevronDown size={15} />
              </label>

              <fieldset className="preference-field">
                <legend>05 — SATVIK &amp; JAIN PREFERENCES</legend>
                <label>
                  <input type="checkbox" /> <span>Satvik preparation</span>
                </label>
                <label>
                  <input type="checkbox" /> <span>Jain, no root vegetables</span>
                </label>
                <label>
                  <input type="checkbox" /> <span>Celebrating a special occasion</span>
                </label>
              </fieldset>

              <button
                type="button"
                className="reserve-submit"
                onClick={() => setReservation(true)}
              >
                Request your table <ArrowRight size={16} />
              </button>

              <span className="form-note">
                A member of our concierge will confirm your request personally.
              </span>
            </>
          )}
        </div>
      </section>

      {/* Haute Gastronomy Footer */}
      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" /> THE IMPERIAL GAZETTE
            </span>
            <h2>
              Harvests, heirlooms<br />
              &amp; <em>invitations.</em>
            </h2>
          </div>

          <form
            className="newsletter"
            onSubmit={(e) => {
              e.preventDefault();
              setModal('purity');
            }}
          >
            <label htmlFor="newsletter-email">A letter from the court, once in a season.</label>
            <div>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email address"
                required
              />
              <button type="submit" aria-label="Subscribe to newsletter">
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>

        <div className="footer-middle">
          <Link className="wordmark footer-wordmark" to="/">
            <img
              src="/logo.png"
              alt="RASORAA Multicuisine Veg Restaurant"
              className="wordmark-logo"
            />
            <span>
              RASORAA
              <small>MULTICUISINE VEG RESTAURANT</small>
            </span>
          </Link>

          <div>
            <span>FIND US</span>
            <p>
              Connaught Place<br />
              New Delhi, India 110001
            </p>
          </div>

          <div>
            <span>THE DARBAR</span>
            <p>
              Lunch &amp; dinner, daily<br />
              12:00 noon — 11:30 pm
            </p>
          </div>

          <div>
            <span>CONCIERGE</span>
            <p>
              +91 11 4100 2800<br />
              reservations@rasoraa.in
            </p>
          </div>

          <a className="back-top" href="#top">
            BACK TO THE BEGINNING <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="footer-bottom">
          <span>© 2026 RASORAA · MULTICUISINE PURE VEGETARIAN CRAFT</span>
          <button type="button" onClick={() => setModal('purity')}>
            SATVIK / JAIN PURITY GUARANTEE <ArrowUpRight size={12} />
          </button>
          <span>MADE WITH PATIENCE IN NEW DELHI</span>
        </div>
      </footer>

      {/* Editorial Interactive Modals */}
      {modal && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setModal(null)}
        >
          <section
            className="editorial-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-heading"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close dialog"
              onClick={() => setModal(null)}
            >
              <X size={16} />
            </button>

            <span className="eyebrow">
              <span className="eyebrow-line" />{' '}
              {modal === 'purity' ? 'THE RASORAA STANDARD' : 'A SEVEN-ACT DASTARKHWAN'}
            </span>

            <h2 id="modal-heading">
              {modal === 'purity' ? (
                <>
                  Purity is our<br />
                  <em>oldest promise.</em>
                </>
              ) : (
                <>
                  The royal service,<br />
                  <em>in seven acts.</em>
                </>
              )}
            </h2>

            {modal === 'purity' ? (
              <>
                <p>
                  Every plate at Rasoraa is 100% vegetarian, prepared in a multicuisine kitchen devoted to the Shuddh Shakahari tradition. Dedicated Jain preparations are crafted without onion, garlic, or root vegetables.
                </p>
                <div className="modal-seal">
                  <Sparkles size={20} />
                  <span>SHUDDH SHAKAHARI</span>
                  <small>HONOURED IN EVERY ACT</small>
                </div>
                <p className="modal-small">
                  We source Gir A2 ghee, stone-mortar our masalas daily, and honour the quiet discipline of Satvik cooking.
                </p>
              </>
            ) : (
              <>
                <ol className="acts-list">
                  {[
                    'The welcome — rose sherbet & saffron smoke',
                    'The first whisper — seasonal chaat',
                    'The tandoor — charred paneer & morel',
                    'The dum — rice, sealed in its earthen handi',
                    'The silver thali — the centrepiece',
                    'The palate — a cooling kesar granita',
                    'The sweet farewell — chandi vark mithai',
                  ].map((act, i) => (
                    <li key={act}>
                      <b>0{i + 1}</b>
                      <span>{act}</span>
                    </li>
                  ))}
                </ol>
                <p className="modal-small">The seven-act service is offered by advance reservation.</p>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
};
