import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  Bookmark,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Grid,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Search,
  Sparkles,
  Users,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

/* ─── Official Rasoraa Menu Items & Exact Pricelist ─── */
type Dish = {
  id: string;
  name: string;
  category:
    | 'Tandoori Starters'
    | 'Indian Curries'
    | 'South Indian & Dosas'
    | 'Rice, Biryani & Breads'
    | 'Chinese & Sizzlers'
    | 'Continental, Pastas & Pizzas'
    | 'Mocktails & Shakes'
    | 'Desserts';
  price: number;
  description: string;
  origin: string;
  isJain: boolean;
  image: string;
};

const DISHES: Dish[] = [
  /* ─── Tandoori Starters & Kebabs ─── */
  {
    id: 't1',
    name: 'Malai Paneer Tikka',
    category: 'Tandoori Starters',
    price: 369,
    description: 'Fresh artisan cottage cheese steeped in mountain cardamom cream, hung curd, and saffron, roasted in our 400°C clay tandoor.',
    origin: 'Northwest Frontier',
    isJain: true,
    image: '/dish-tandoor.jpg',
  },
  {
    id: 't2',
    name: 'Achari Paneer Tikka',
    category: 'Tandoori Starters',
    price: 369,
    description: 'Tender paneer cubes infused with cold-pressed mustard oil and pickling spices, charred over glowing fruitwood coals.',
    origin: 'Punjabi Hearth',
    isJain: true,
    image: '/dish-tandoor.jpg',
  },
  {
    id: 't3',
    name: 'Malai Broccoli',
    category: 'Tandoori Starters',
    price: 399,
    description: 'Tender fresh broccoli florets marinated in velvety cashew cream, cheese, and mace, gently blistered in clay heat.',
    origin: 'Royal Nizami',
    isJain: true,
    image: '/dish-tandoor.jpg',
  },
  {
    id: 't4',
    name: 'Mushroom Tikka',
    category: 'Tandoori Starters',
    price: 379,
    description: 'Plump button mushrooms marinated in smoked mustard oil, roasted cumin, and crushed red chillies, char-skewered.',
    origin: 'Himalayan Foothills',
    isJain: true,
    image: '/dish-tandoor.jpg',
  },
  {
    id: 't5',
    name: 'Hara Bhara Kebab',
    category: 'Tandoori Starters',
    price: 299,
    description: 'Finely mashed garden spinach, sweet green peas, and cottage cheese patties pan-crisped in seasoned ghee.',
    origin: 'Mughlai Lineage',
    isJain: true,
    image: '/dish-tandoor.jpg',
  },
  {
    id: 't6',
    name: 'Assorted Platter',
    category: 'Tandoori Starters',
    price: 599,
    description: 'Grand royal selection featuring malai paneer, achari tikka, tandoori mushrooms, and hara bhara kebabs.',
    origin: 'Chef Rajan Signature',
    isJain: true,
    image: '/dish-tandoor.jpg',
  },

  /* ─── Indian Curries & Handis ─── */
  {
    id: 'c1',
    name: 'Dal Makhani',
    category: 'Indian Curries',
    price: 319,
    description: 'Slow-simmered black urad lentils infused overnight with cultured butter, rich cream, and wood charcoal smoke.',
    origin: 'Punjab Heritage',
    isJain: true,
    image: '/dish-awadhi.jpg',
  },
  {
    id: 'c2',
    name: 'Paneer Butter Masala',
    category: 'Indian Curries',
    price: 369,
    description: 'Soft cottage cheese simmered in a silky, rich reduction of ripe tomatoes, cashews, and aromatic kasuri methi.',
    origin: 'Royal Darbar',
    isJain: true,
    image: '/dish-awadhi.jpg',
  },
  {
    id: 'c3',
    name: 'Handi Paneer',
    category: 'Indian Curries',
    price: 369,
    description: 'Earthenware clay handi preparation with stone-ground coriander, roasted red chillies, and rich spiced gravy.',
    origin: 'Awadh Lineage',
    isJain: true,
    image: '/dish-awadhi.jpg',
  },
  {
    id: 'c4',
    name: 'Paneer Tikka Masala',
    category: 'Indian Curries',
    price: 389,
    description: 'Smoky tandoor-charred cottage cheese folded into a robust, velvet spiced onion-tomato and bell pepper gravy.',
    origin: 'Northwest Frontier',
    isJain: true,
    image: '/dish-awadhi.jpg',
  },
  {
    id: 'c5',
    name: 'Paneer Lababdar',
    category: 'Indian Curries',
    price: 369,
    description: 'Grated and cubed cottage cheese simmered with royal melon seeds, fresh cream, and fragrant whole spices.',
    origin: 'Mughlai Imperial',
    isJain: true,
    image: '/dish-awadhi.jpg',
  },
  {
    id: 'c6',
    name: 'Sooji Makhani Bhopali',
    category: 'Indian Curries',
    price: 429,
    description: 'Rare heritage culinary jewel from the Nawabs of Bhopal, slow-cooked in a rich buttery tomato makhani reduction.',
    origin: 'Bhopal Royal Court',
    isJain: true,
    image: '/dish-awadhi.jpg',
  },
  {
    id: 'c7',
    name: 'Malai Kofta (White Gravy)',
    category: 'Indian Curries',
    price: 369,
    description: 'Melt-in-mouth cottage cheese and mawa dumplings rested in an aromatic cashew-cardamom white velvet sauce.',
    origin: 'Kashmiri Wazwan',
    isJain: true,
    image: '/dish-awadhi.jpg',
  },
  {
    id: 'c8',
    name: 'Diwani Handi',
    category: 'Indian Curries',
    price: 379,
    description: 'Medley of seasonal farm-fresh vegetables and baby corn slow-cooked in hand-beaten copper cookware.',
    origin: 'Deccan Royalty',
    isJain: true,
    image: '/dish-awadhi.jpg',
  },

  /* ─── South Indian & Dosas ─── */
  {
    id: 's1',
    name: 'Garlic Podi Dosa',
    category: 'South Indian & Dosas',
    price: 109,
    description: 'Golden fermented rice-lentil crepe dusted with spiced roasted lentil gun powder (podi) and pure ghee.',
    origin: 'Tamil Heritage Town',
    isJain: false,
    image: '/dish-continental.jpg',
  },
  {
    id: 's2',
    name: 'Paneer Dosa',
    category: 'South Indian & Dosas',
    price: 125,
    description: 'Crisp golden paper dosa filled with spiced grated cottage cheese, green chillies, and fresh coriander.',
    origin: 'Chettinad Lineage',
    isJain: true,
    image: '/dish-continental.jpg',
  },
  {
    id: 's3',
    name: 'Mushroom Dosa',
    category: 'South Indian & Dosas',
    price: 115,
    description: 'Thin buttery crepe rolled with seasoned button mushroom roast and fresh curry leaf tempering.',
    origin: 'Coastal Malabar',
    isJain: true,
    image: '/dish-continental.jpg',
  },
  {
    id: 's4',
    name: 'Pizza Dosa',
    category: 'South Indian & Dosas',
    price: 139,
    description: 'Fusion delight topped with bell peppers, sweet corn, Italian herbs, mozzarella cheese, and tomato coulis.',
    origin: 'Modern Multicuisine',
    isJain: true,
    image: '/dish-continental.jpg',
  },
  {
    id: 's5',
    name: 'Rava Dosa',
    category: 'South Indian & Dosas',
    price: 77,
    description: 'Lacy, crispy semolina crepe spiced with crushed black peppercorns, roasted cumin, and ginger.',
    origin: 'Udupi Tradition',
    isJain: true,
    image: '/dish-continental.jpg',
  },
  {
    id: 's6',
    name: 'South Indian Thali',
    category: 'South Indian & Dosas',
    price: 199,
    description: 'Traditional multi-bowl lunch feast featuring aromatic sambar, rasam, kootu, poriyal, curd, appalam, and rice.',
    origin: 'Heritage Town Pondicherry',
    isJain: true,
    image: '/dish-awadhi.jpg',
  },

  /* ─── Rice, Biryani & Breads ─── */
  {
    id: 'r1',
    name: 'Hyderabadi Biryani',
    category: 'Rice, Biryani & Breads',
    price: 399,
    description: 'Aged long-grain basmati layered with marinated farm vegetables, saffron, and mint, slow-steamed under dough seal.',
    origin: 'Nizami Heritage',
    isJain: true,
    image: '/dish-awadhi.jpg',
  },
  {
    id: 'r2',
    name: 'Jeera Rice',
    category: 'Rice, Biryani & Breads',
    price: 329,
    description: 'Fragrant basmati rice gently tempered with crackling royal cumin seeds and pure desi ghee.',
    origin: 'Vedic Kitchen',
    isJain: true,
    image: '/dish-awadhi.jpg',
  },
  {
    id: 'r3',
    name: 'Burnt Garlic Fried Rice',
    category: 'Rice, Biryani & Breads',
    price: 319,
    description: 'Wok-tossed basmati rice infused with golden crisp garlic bits, scallions, and garden greens.',
    origin: 'Wok Hearth',
    isJain: false,
    image: '/dish-oriental.jpg',
  },
  {
    id: 'r4',
    name: 'Cheese Chilli Naan',
    category: 'Rice, Biryani & Breads',
    price: 139,
    description: 'Tandoori leavened flatbread stuffed with green chillies and molten cheddar cheese, brushed with butter.',
    origin: 'Clay Oven Craft',
    isJain: true,
    image: '/dish-tandoor.jpg',
  },
  {
    id: 'r5',
    name: 'Garlic Naan',
    category: 'Rice, Biryani & Breads',
    price: 99,
    description: 'Crisp and fluffy tandoori naan bread topped with aromatic minced garlic and fresh coriander butter.',
    origin: 'Northwest Frontier',
    isJain: false,
    image: '/dish-tandoor.jpg',
  },
  {
    id: 'r6',
    name: 'North Indian Thali',
    category: 'Rice, Biryani & Breads',
    price: 230,
    description: 'Grand royal thali with two curries, dal makhani, paneer preparation, jeera rice, butter naan, raita, and dessert.',
    origin: 'Imperial Feast',
    isJain: true,
    image: '/dish-awadhi.jpg',
  },

  /* ─── Chinese & Sizzlers ─── */
  {
    id: 'w1',
    name: 'Dragon Paneer',
    category: 'Chinese & Sizzlers',
    price: 349,
    description: 'Crispy fried cottage cheese batons tossed in spicy fiery schezwan glaze, toasted cashews, and bell peppers.',
    origin: 'Canton Hearth',
    isJain: true,
    image: '/dish-oriental.jpg',
  },
  {
    id: 'w2',
    name: 'Honey Chilli Lotus Stem',
    category: 'Chinese & Sizzlers',
    price: 399,
    description: 'Crunchy lotus stem slivers glazed with wild forest honey, toasted white sesame, and bird’s eye chillies.',
    origin: 'Himalayan Silk Road',
    isJain: true,
    image: '/dish-oriental.jpg',
  },
  {
    id: 'w3',
    name: 'Chilli Paneer (Dry)',
    category: 'Chinese & Sizzlers',
    price: 339,
    description: 'Tender paneer cubes wok-charred with capsicum, onions, spring garlic, and dark soy reduction.',
    origin: 'Indo-Chinese Classic',
    isJain: false,
    image: '/dish-oriental.jpg',
  },
  {
    id: 'w4',
    name: 'Crispy Corn',
    category: 'Chinese & Sizzlers',
    price: 299,
    description: 'Batter-crisped sweet corn kernels tossed with freshly crushed black pepper, spring greens, and tangy spices.',
    origin: 'Pan-Asian Wok',
    isJain: true,
    image: '/dish-oriental.jpg',
  },
  {
    id: 'w5',
    name: 'Chinese Sizzler',
    category: 'Chinese & Sizzlers',
    price: 499,
    description: 'Smoking iron platter with wok noodles, fried rice, crispy paneer manchurian, spring rolls, and hot garlic sauce.',
    origin: 'Signature Sizzler',
    isJain: false,
    image: '/dish-oriental.jpg',
  },
  {
    id: 'w6',
    name: 'Continental Sizzler',
    category: 'Chinese & Sizzlers',
    price: 499,
    description: 'Sizzling cast-iron skillet loaded with herb butter rice, crispy potato wedges, grilled vegetables, and cheese sauce.',
    origin: 'Artisanal Hearth',
    isJain: true,
    image: '/dish-continental.jpg',
  },

  /* ─── Continental, Pastas & Pizzas ─── */
  {
    id: 'p1',
    name: 'Queen Margherita Pizza',
    category: 'Continental, Pastas & Pizzas',
    price: 389,
    description: 'Stone-hearth baked crust topped with San Marzano tomato coulis, fresh sweet basil leaves, and molten mozzarella.',
    origin: 'Stone Hearth Bake',
    isJain: true,
    image: '/dish-continental.jpg',
  },
  {
    id: 'p2',
    name: 'Paneer Makhani Pizza',
    category: 'Continental, Pastas & Pizzas',
    price: 459,
    description: 'Hand-stretched dough topped with smoky tandoori paneer, royal makhani drizzle, bell peppers, and mozzarella.',
    origin: 'Multicuisine Fusion',
    isJain: true,
    image: '/dish-continental.jpg',
  },
  {
    id: 'p3',
    name: 'Aglio E Olio Spaghetti',
    category: 'Continental, Pastas & Pizzas',
    price: 349,
    description: 'Al dente spaghetti tossed with extra virgin cold-pressed olive oil, golden garlic slivers, and chilli flakes.',
    origin: 'Mediterranean Hearth',
    isJain: false,
    image: '/dish-continental.jpg',
  },
  {
    id: 'p4',
    name: 'Alfredo Pasta (White Sauce)',
    category: 'Continental, Pastas & Pizzas',
    price: 299,
    description: 'Penne pasta enveloped in a velvety parmesan and rich herb cream sauce with sweet corn and mushrooms.',
    origin: 'Italian Classical',
    isJain: true,
    image: '/dish-continental.jpg',
  },
  {
    id: 'p5',
    name: 'Paneer Tikka Quesadilla',
    category: 'Continental, Pastas & Pizzas',
    price: 389,
    description: 'Crisp Mexican toasted tortilla folded with tandoori paneer, roasted corn, fresh salsa, and melted cheddar.',
    origin: 'Continental Mexican',
    isJain: true,
    image: '/dish-continental.jpg',
  },
  {
    id: 'p6',
    name: '6 Balls 6 Dips',
    category: 'Continental, Pastas & Pizzas',
    price: 289,
    description: 'Crispy fried cheese and corn croquettes served with six chef-curated signature sauces and emulsion dips.',
    origin: 'Appetizer Platter',
    isJain: true,
    image: '/dish-continental.jpg',
  },

  /* ─── Mocktails, Coolers & Shakes ─── */
  {
    id: 'm1',
    name: 'Cranberry Basil Cooler',
    category: 'Mocktails & Shakes',
    price: 230,
    description: 'Tart cranberry nectar muddled with fresh garden basil leaves, lime, and sparkling soda.',
    origin: 'Artisanal Cooler',
    isJain: true,
    image: '/dish-oriental.jpg',
  },
  {
    id: 'm2',
    name: 'Virgin Mojito',
    category: 'Mocktails & Shakes',
    price: 190,
    description: 'Refreshing blend of crushed garden mint, fresh lime wedges, organic cane sugar, and effervescent club soda.',
    origin: 'Signature Mocktail',
    isJain: true,
    image: '/dish-oriental.jpg',
  },
  {
    id: 'm3',
    name: 'Virgin Sangria',
    category: 'Mocktails & Shakes',
    price: 230,
    description: 'Hand-diced apples, oranges, and berries steeped in rich grape and citrus juices with cinnamon essence.',
    origin: 'Botanical Blend',
    isJain: true,
    image: '/dish-oriental.jpg',
  },
  {
    id: 'm4',
    name: 'Spicy Guava',
    category: 'Mocktails & Shakes',
    price: 200,
    description: 'Ripe pink guava puree shaken with black salt, lemon juice, roasted cumin, and a red chilli-salt rim.',
    origin: 'Indian Botanical',
    isJain: true,
    image: '/dish-oriental.jpg',
  },
  {
    id: 'm5',
    name: 'Biscoff Shake',
    category: 'Mocktails & Shakes',
    price: 230,
    description: 'Thick creamy gourmet shake spun with genuine Lotus Biscoff spread, caramel, and biscuit crumble.',
    origin: 'Gourmet Shake',
    isJain: true,
    image: '/dish-oriental.jpg',
  },
  {
    id: 'm6',
    name: 'Nutty Brownie Shake',
    category: 'Mocktails & Shakes',
    price: 210,
    description: 'Fudgy dark chocolate walnut brownie blended with Madagascar vanilla ice cream and chocolate drizzle.',
    origin: 'Artisanal Shake',
    isJain: true,
    image: '/dish-oriental.jpg',
  },

  /* ─── Desserts ─── */
  {
    id: 'd1',
    name: 'Sizzling Brownie',
    category: 'Desserts',
    price: 289,
    description: 'Warm walnut chocolate brownie on a smoking cast-iron skillet, topped with rich vanilla ice cream and hot fudge.',
    origin: 'Hot Skillet Craft',
    isJain: true,
    image: '/dish-continental.jpg',
  },
  {
    id: 'd2',
    name: 'Panna Cotta',
    category: 'Desserts',
    price: 189,
    description: 'Silky, delicate eggless cream dessert infused with vanilla bean and crowned with wild berry coulis.',
    origin: 'Italian Classic',
    isJain: true,
    image: '/dish-continental.jpg',
  },
  {
    id: 'd3',
    name: 'Brownie with Ice Cream',
    category: 'Desserts',
    price: 199,
    description: 'Freshly baked dark chocolate brownie served with a generous scoop of vanilla bean ice cream.',
    origin: 'Sweet Hearth',
    isJain: true,
    image: '/dish-continental.jpg',
  },
];

/* ─── Visual Chronicles (Gallery) ─── */
const GALLERY_ITEMS = [
  {
    id: 'g1',
    title: 'The Sealed Awadhi Dum Handi',
    subtitle: '16-Hour Wood Charcoal Simmer',
    category: 'Culinary Craft',
    image: '/dish-awadhi.jpg',
    aspect: 'aspect-[4/5] md:aspect-[3/4]',
  },
  {
    id: 'g2',
    title: 'Angari Malai Paneer over Embers',
    subtitle: '400°C Clay Pit Metallurgy',
    category: 'Live Fire',
    image: '/dish-tandoor.jpg',
    aspect: 'aspect-[4/5] md:aspect-[3/4]',
  },
  {
    id: 'g3',
    title: 'Pan-Asian Wok Hei & Black Truffle',
    subtitle: 'High-Flame Botanical Searing',
    category: 'Oriental Alchemy',
    image: '/dish-oriental.jpg',
    aspect: 'aspect-[4/5] md:aspect-[3/4]',
  },
  {
    id: 'g4',
    title: 'Stone Hearth Sourdough & Morel',
    subtitle: 'Wild Himalayan Foraged Gucchi',
    category: 'Artisanal Hearth',
    image: '/dish-continental.jpg',
    aspect: 'aspect-[4/5] md:aspect-[3/4]',
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
  const [activeCategory, setActiveCategory] = useState<string>('All');
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
  const [previewDish, setPreviewDish] = useState<Dish | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [menuSearchQuery, setMenuSearchQuery] = useState('');

  // ─── Interactive Luxury Menu Book State & Controls ───
  // Spreads: 0: Cover & Index, 1: Starters & Wok, 2: Curries & Dosas, 3: Biryani & Pizzas, 4: Drinks & Desserts
  const [currentSpread, setCurrentSpread] = useState(0);
  const [menuViewMode, setMenuViewMode] = useState<'book' | 'grid'>('book');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  // Realistic luxury parchment paper turn sound via Web Audio API (zero external assets needed)
  const playPageTurnSound = () => {
    if (isAudioMuted || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const bufferSize = ctx.sampleRate * 0.14;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const decay = Math.exp(-i / (bufferSize * 0.28));
        data[i] = (Math.random() * 2 - 1) * decay * 0.08;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 1350;
      bandpass.Q.value = 0.85;
      noise.connect(bandpass);
      bandpass.connect(ctx.destination);
      noise.start();
    } catch {
      // Audio policy safe fallback
    }
  };

  const turnToSpread = (newSpread: number) => {
    if (newSpread < 0 || newSpread > 4 || newSpread === currentSpread) return;
    setFlipDirection(newSpread > currentSpread ? 'next' : 'prev');
    setCurrentSpread(newSpread);
    playPageTurnSound();
  };

  const handleNextSpread = () => {
    if (currentSpread < 4) {
      turnToSpread(currentSpread + 1);
    }
  };

  const handlePrevSpread = () => {
    if (currentSpread > 0) {
      turnToSpread(currentSpread - 1);
    }
  };

  // Grouped Dishes for Book Spreads matching Official 6-Page Booklet
  const tandooriDishes = DISHES.filter((d) => d.category === 'Tandoori Starters');
  const chineseDishes = DISHES.filter((d) => d.category === 'Chinese & Sizzlers');
  const curryDishes = DISHES.filter((d) => d.category === 'Indian Curries');
  const southIndianDishes = DISHES.filter((d) => d.category === 'South Indian & Dosas');
  const riceBreadsDishes = DISHES.filter((d) => d.category === 'Rice, Biryani & Breads');
  const continentalDishes = DISHES.filter((d) => d.category === 'Continental, Pastas & Pizzas');
  const mocktailDishes = DISHES.filter((d) => d.category === 'Mocktails & Shakes');
  const dessertDishes = DISHES.filter((d) => d.category === 'Desserts');

  // Bookmark ribbons for fast navigation
  const BOOK_CHAPTER_TABS = [
    { spread: 0, label: 'Cover & Index', pages: 'Prologue' },
    { spread: 1, label: 'Starters & Wok', pages: 'pp. 2–3' },
    { spread: 2, label: 'Curries & Dosas', pages: 'pp. 4–5' },
    { spread: 3, label: 'Biryani & Pizzas', pages: 'pp. 6–7' },
    { spread: 4, label: 'Drinks & Desserts', pages: 'pp. 8–9' },
  ];

  // Auto-flip book spread when searching for a dish
  useEffect(() => {
    if (!menuSearchQuery.trim()) return;
    const query = menuSearchQuery.toLowerCase();
    const findDish = (list: Dish[]) =>
      list.some((d) => d.name.toLowerCase().includes(query) || d.description.toLowerCase().includes(query));
    if (findDish(tandooriDishes) || findDish(chineseDishes)) {
      if (currentSpread !== 1) turnToSpread(1);
    } else if (findDish(curryDishes) || findDish(southIndianDishes)) {
      if (currentSpread !== 2) turnToSpread(2);
    } else if (findDish(riceBreadsDishes) || findDish(continentalDishes)) {
      if (currentSpread !== 3) turnToSpread(3);
    } else if (findDish(mocktailDishes) || findDish(dessertDishes)) {
      if (currentSpread !== 4) turnToSpread(4);
    }
  }, [menuSearchQuery]);

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

  const MENU_CATEGORIES = [
    'All Items',
    'Tandoori Starters',
    'Indian Curries',
    'South Indian & Dosas',
    'Rice, Biryani & Breads',
    'Chinese & Sizzlers',
    'Continental, Pastas & Pizzas',
    'Mocktails & Shakes',
    'Desserts',
  ];

  const filteredDishes = DISHES.filter((d) => {
    const matchesCategory =
      activeCategory === 'All' || activeCategory === 'All Items'
        ? true
        : d.category === activeCategory;
    const matchesSearch =
      menuSearchQuery.trim() === '' ||
      d.name.toLowerCase().includes(menuSearchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(menuSearchQuery.toLowerCase()) ||
      d.origin.toLowerCase().includes(menuSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) return;
    setIsBookingSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#070B08] text-[#FBF9F5] font-sans selection:bg-[#22AA00] selection:text-black overflow-x-hidden">
      {/* ─── 0. TOP BENEDICTION BAR ─── */}
      <div className="border-b border-white/[0.06] bg-[#040705] text-[11px] font-sans tracking-[0.2em] uppercase py-2.5 px-4 sm:px-8 text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-2 text-[#22AA00] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22AA00] shadow-[0_0_8px_#22AA00]" />
              100% Shuddh Shakahari
            </span>
            <span className="text-neutral-600">|</span>
            <span className="text-[#C5A880]">Strict Jain Hearth on Decree</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-neutral-400">
            <span>39, Ambalathadayar Madam St · Heritage Town, Pondicherry</span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-300 font-mono">11.9360° N, 79.8336° E</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-22 flex items-center justify-between">
          {/* Brand Logo & Editorial Wordmark */}
          <a href="#hero" className="flex items-center gap-3.5 group flex-shrink-0">
            <img
              src="/logo.png"
              alt="RASORAA"
              className="h-10 sm:h-11 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(34,170,0,0.3)] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.26em] text-white transition-colors leading-none">
                RASORAA
              </span>
              <span className="text-[9px] font-sans font-medium tracking-[0.3em] text-[#C5A880] uppercase mt-1">
                Pure Veg &amp; Jain Haute Cuisine
              </span>
            </div>
          </a>

          {/* Clean 6-Link Editorial Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-[12px] font-sans tracking-[0.22em] uppercase text-neutral-300 font-light">
            <a href="#hero" className="hover:text-[#C5A880] transition-colors py-1 relative group">
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#about" className="hover:text-[#C5A880] transition-colors py-1 relative group">
              <span>About Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#menu" className="hover:text-[#C5A880] transition-colors py-1 relative group">
              <span>Menu</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#gallery" className="hover:text-[#C5A880] transition-colors py-1 relative group">
              <span>Gallery</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#events" className="hover:text-[#C5A880] transition-colors py-1 relative group">
              <span>Events</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#contact" className="hover:text-[#C5A880] transition-colors py-1 relative group">
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+919484594845"
              className="hidden xl:flex items-center gap-2 text-xs font-mono text-neutral-300 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:border-[#C5A880]/50 transition-colors bg-white/[0.03] whitespace-nowrap"
            >
              <Phone size={12} className="text-[#C5A880]" />
              <span>+91 94845 94845</span>
            </a>

            <a
              href="#reserve"
              className="px-6 py-2.5 rounded-full border border-[#C5A880]/60 bg-gradient-to-r from-[#162E1D] via-[#0D2214] to-[#162E1D] hover:border-[#C5A880] text-[#FBF9F5] hover:text-white text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(197,168,128,0.25)] hover:-translate-y-0.5 whitespace-nowrap inline-flex items-center gap-2"
            >
              <Calendar size={13} className="text-[#C5A880]" />
              <span>Book Table</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full border border-white/10 text-neutral-200 hover:text-[#C5A880] transition-colors"
              aria-label="Toggle Menu"
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
              transition={{ duration: 0.3 }}
              className="lg:hidden border-b border-white/10 bg-[#070B08]/98 px-6 py-8 overflow-hidden backdrop-blur-xl"
            >
              <div className="flex flex-col space-y-5 text-sm font-sans tracking-[0.2em] uppercase">
                <a
                  href="#hero"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between text-neutral-300 hover:text-[#C5A880]"
                >
                  <span>Home</span>
                  <ArrowUpRight size={14} className="text-[#C5A880]" />
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between text-neutral-300 hover:text-[#C5A880]"
                >
                  <span>About Us</span>
                  <ArrowUpRight size={14} className="text-[#C5A880]" />
                </a>
                <a
                  href="#menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between text-neutral-300 hover:text-[#C5A880]"
                >
                  <span>Menu</span>
                  <ArrowUpRight size={14} className="text-[#C5A880]" />
                </a>
                <a
                  href="#gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between text-neutral-300 hover:text-[#C5A880]"
                >
                  <span>Gallery</span>
                  <ArrowUpRight size={14} className="text-[#C5A880]" />
                </a>
                <a
                  href="#events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between text-neutral-300 hover:text-[#C5A880]"
                >
                  <span>Events</span>
                  <ArrowUpRight size={14} className="text-[#C5A880]" />
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 flex items-center justify-between text-neutral-300 hover:text-[#C5A880]"
                >
                  <span>Contact</span>
                  <ArrowUpRight size={14} className="text-[#C5A880]" />
                </a>

                <div className="pt-4 flex flex-col gap-4">
                  <a
                    href="#reserve"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3.5 rounded-full border border-[#C5A880]/50 bg-[#162E1D] text-[#FBF9F5] text-center text-xs tracking-[0.2em] uppercase font-medium"
                  >
                    Reserve Table
                  </a>
                  <div className="flex items-center justify-center gap-6 pt-2 text-neutral-400">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <Facebook size={18} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Instagram size={18} />
                    </a>
                    <a href="https://wa.me/919484594845" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                      <MessageCircle size={18} className="text-[#25D366]" />
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
                <h1 className="font-serif text-5xl sm:text-7xl xl:text-8xl font-light tracking-tight text-white leading-[1.04]">
                  Vegetarian Craft,{' '}
                  <br />
                  <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#E8E4DA] to-[#C5A880]">
                    Elevated to Royalty.
                  </span>
                </h1>
              </div>

              <p className="text-neutral-300 text-base sm:text-lg max-w-xl font-light leading-relaxed mx-auto lg:mx-0">
                Century-old Awadhi earthenware handis simmered over sal wood embers, 400°C clay tandoors, and whisper-thin wok hei — united under an uncompromising 100% Shuddh Shakahari &amp; Jain decree.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="#reserve"
                  className="px-8 py-4 rounded-full border border-[#C5A880]/80 bg-gradient-to-r from-[#183620] via-[#112918] to-[#183620] hover:border-[#C5A880] text-[#FBF9F5] font-medium text-xs tracking-[0.2em] uppercase transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(197,168,128,0.3)] hover:-translate-y-0.5 inline-flex items-center gap-2.5"
                >
                  <Calendar size={14} className="text-[#C5A880]" />
                  <span>Reserve Table</span>
                </a>

                <a
                  href="#menu"
                  className="px-8 py-4 rounded-full border border-white/15 hover:border-[#C5A880] text-neutral-300 hover:text-white font-light text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/[0.04] inline-flex items-center gap-2"
                >
                  <span>Explore The Carte</span>
                  <ArrowUpRight size={14} className="text-[#C5A880]" />
                </a>
              </div>

              {/* Quiet Architectural Trust Metrics */}
              <div className="pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-6 text-left">
                <div>
                  <span className="block font-serif text-2xl text-white font-light">100%</span>
                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#22AA00]">
                    Pure Shakahari
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-2xl text-white font-light">Strict</span>
                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#C5A880]">
                    Jain Certified
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-2xl text-white font-light">Heritage Town</span>
                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-neutral-400">
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

          {/* Folio Controls & Ribbon Tabs Bar */}
          <div className="mb-8 space-y-4">
            {/* Chapter Ribbon Bookmark Tabs */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
              {BOOK_CHAPTER_TABS.map((tab) => {
                const isActive = currentSpread === tab.spread && menuViewMode === 'book';
                return (
                  <button
                    key={tab.spread}
                    type="button"
                    onClick={() => {
                      setMenuViewMode('book');
                      turnToSpread(tab.spread);
                    }}
                    className={`relative px-3.5 sm:px-5 py-2.5 rounded-t-xl text-xs font-sans tracking-wider uppercase transition-all duration-300 shrink-0 border-t border-x ${
                      isActive
                        ? 'bg-[#102417] text-[#C5A880] border-[#C5A880]/50 shadow-[0_-4px_16px_rgba(197,168,128,0.15)] -translate-y-1'
                        : 'bg-white/[0.02] text-neutral-400 border-white/10 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-medium">
                      <Bookmark size={11} className={isActive ? 'text-[#C5A880] fill-[#C5A880]' : 'text-neutral-500'} />
                      <span>{tab.label}</span>
                    </div>
                    <span className="text-[10px] block font-mono text-neutral-400 font-normal lowercase">
                      {tab.pages}
                    </span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#102417]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Utility Toolbar: Search, Audio Toggle, View Mode */}
            <div className="flex flex-wrap items-center justify-between gap-4 max-w-5xl mx-auto px-2">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[260px] max-w-md">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={menuSearchQuery}
                  onChange={(e) => setMenuSearchQuery(e.target.value)}
                  placeholder="Search dish (e.g. Malai Paneer, Dosa, Biryani)..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 text-xs font-sans tracking-wide focus:outline-none focus:border-[#C5A880] transition-colors"
                />
                {menuSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setMenuSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* View Switcher & Audio */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  title={isAudioMuted ? 'Turn Sound On' : 'Mute Page Sound'}
                  className="p-2.5 rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white hover:border-white/30 transition-all text-xs"
                >
                  {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[#C5A880]" />}
                </button>

                <div className="inline-flex rounded-full p-1 bg-white/[0.04] border border-white/10">
                  <button
                    type="button"
                    onClick={() => setMenuViewMode('book')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all ${
                      menuViewMode === 'book'
                        ? 'bg-[#183620] text-[#FBF9F5] border border-[#C5A880]/50 shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <BookOpen size={12} className={menuViewMode === 'book' ? 'text-[#C5A880]' : ''} />
                    <span>Folio Book</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMenuViewMode('grid')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all ${
                      menuViewMode === 'grid'
                        ? 'bg-[#183620] text-[#FBF9F5] border border-[#C5A880]/50 shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Grid size={12} className={menuViewMode === 'grid' ? 'text-[#C5A880]' : ''} />
                    <span>Catalog</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              BOOK VIEW: 3D REALISTIC INTERACTIVE PHYSICAL MENU FOLIO
             ═══════════════════════════════════════════════════════════════ */}
          {menuViewMode === 'book' && (
            <div className="relative max-w-6xl mx-auto">
              {/* Outer Leatherette Hardcover Binder */}
              <div className="relative rounded-3xl p-3 sm:p-6 md:p-8 bg-gradient-to-br from-[#08150D] via-[#0B1E13] to-[#06110A] border-2 border-[#C5A880]/40 shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_50px_rgba(20,50,30,0.25)]">
                {/* Brass Corner Brackets */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#C5A880] rounded-tl-sm pointer-events-none" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#C5A880] rounded-tr-sm pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#C5A880] rounded-bl-sm pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#C5A880] rounded-br-sm pointer-events-none" />

                {/* Golden Silk Bookmark Ribbon hanging from top center spine */}
                <div className="hidden md:block absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-16 bg-gradient-to-b from-[#C5A880] via-[#D8C4A0] to-[#8E7044] rounded-b-md shadow-lg z-30 pointer-events-none">
                  <div className="w-full h-full flex items-end justify-center pb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#08150D]" />
                  </div>
                </div>

                {/* Left & Right Page Turning Side Buttons */}
                {currentSpread > 0 && (
                  <button
                    type="button"
                    onClick={handlePrevSpread}
                    aria-label="Previous Page"
                    className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0E2016] border border-[#C5A880]/60 text-[#C5A880] hover:text-white hover:bg-[#183620] hover:scale-110 flex items-center justify-center shadow-2xl transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                {currentSpread < 4 && (
                  <button
                    type="button"
                    onClick={handleNextSpread}
                    aria-label="Next Page"
                    className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0E2016] border border-[#C5A880]/60 text-[#C5A880] hover:text-white hover:bg-[#183620] hover:scale-110 flex items-center justify-center shadow-2xl transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}

                {/* Animated Spread Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSpread}
                    initial={{
                      opacity: 0,
                      rotateY: flipDirection === 'next' ? 6 : -6,
                      scale: 0.985,
                    }}
                    animate={{
                      opacity: 1,
                      rotateY: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotateY: flipDirection === 'next' ? -6 : 6,
                      scale: 0.985,
                    }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    style={{ perspective: 1400 }}
                    className="relative grid md:grid-cols-2 gap-0 min-h-[660px] rounded-2xl overflow-hidden bg-[#0A1710] border border-[#C5A880]/20 shadow-inner"
                  >
                    {/* 3D Spine Fold / Crease Shadow (Center Seam) */}
                    <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-black/55 via-black/15 to-black/55 z-20 pointer-events-none" />

                    {/* ────────────────────────────────────────────────────────
                        SPREAD 0: COVER & PROLOGUE
                       ──────────────────────────────────────────────────────── */}
                    {currentSpread === 0 && (
                      <>
                        {/* Left Page: Welcome & Philosophy */}
                        <div className="p-6 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#C5A880]/20 relative bg-gradient-to-br from-[#0B1A12] to-[#08140D] text-left">
                          {/* Inner Filigree Border */}
                          <div className="absolute inset-4 sm:inset-6 border border-[#C5A880]/20 pointer-events-none rounded-xl" />

                          <div className="relative z-10 space-y-6 pt-3">
                            <div className="flex items-center gap-3">
                              <img src="/rr-monogram.jpg" alt="RR Crest" className="w-10 h-10 object-contain rounded-full border border-[#C5A880]/40" />
                              <div>
                                <span className="font-serif text-[#C5A880] text-sm tracking-wider block">
                                  Rasoraa Pure Veg
                                </span>
                                <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                                  Heritage Town · Pondicherry
                                </span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <span className="text-[#C5A880] text-[10px] font-sans tracking-[0.24em] uppercase block">
                                Imperial Decree
                              </span>
                              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light leading-snug">
                                The Sanctuary of Living Fire & Vegetarian Alchemy
                              </h3>
                            </div>

                            <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
                              Welcome to Rasoraa. Rooted in the rich cultural tapestry of French and Tamil Pondicherry, our kitchens celebrate pure vegetarian gastronomy with charcoal clay pits at 400°C, slow-simmered Awadhi dum handis, and crisp stone-ground dosas.
                            </p>

                            <div className="space-y-3 pt-2">
                              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                                <span className="w-2 h-2 rounded-full bg-[#22AA00] mt-1 shrink-0 shadow-[0_0_8px_#22AA00]" />
                                <div>
                                  <h4 className="text-xs text-white font-medium">100% Shuddh Shakahari & Strict Jain Hearth</h4>
                                  <p className="text-[11px] text-neutral-400 font-light">
                                    Every preparation follows sacred satvik purity. Dedicated Jain cooking vessels and zero onion/garlic options available on decree.
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                                <span className="w-2 h-2 rounded-full bg-[#C5A880] mt-1 shrink-0 shadow-[0_0_8px_#C5A880]" />
                                <div>
                                  <h4 className="text-xs text-white font-medium">Freshness Decree — Made to Order</h4>
                                  <p className="text-[11px] text-neutral-400 font-light">
                                    No precooked gravies. We request 20–25 minutes for preparation so whole spices and pure cultured ghee reveal their true aromatics.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="relative z-10 pt-6 border-t border-[#C5A880]/20 flex items-center justify-between text-[11px] text-neutral-400">
                            <span>Heritage Town Pondicherry — 605 001</span>
                            <span className="text-[#C5A880] font-mono">Prologue</span>
                          </div>
                        </div>

                        {/* Right Page: Royal Table of Chapters */}
                        <div className="p-6 sm:p-10 flex flex-col justify-between relative bg-gradient-to-bl from-[#0C1E14] to-[#091710] text-left">
                          <div className="absolute inset-4 sm:inset-6 border border-[#C5A880]/20 pointer-events-none rounded-xl" />

                          <div className="relative z-10 space-y-6 pt-3">
                            <div className="text-center pb-2">
                              <img src="/logo.png" alt="Rasoraa Logo" className="h-16 mx-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]" />
                              <h3 className="font-serif text-xl sm:text-2xl text-white font-light pt-2">
                                The Imperial Carte
                              </h3>
                              <p className="text-[10px] text-[#C5A880] font-mono uppercase tracking-[0.2em]">
                                Table of Chapters
                              </p>
                            </div>

                            {/* Clickable Chapter Index */}
                            <div className="space-y-2">
                              {[
                                { ch: 'Chapter I', title: 'Tandoori Hearth & Clay Pit Kebabs', page: 2, spread: 1 },
                                { ch: 'Chapter II', title: 'Indo-Chinese Wok & Sizzler Iron', page: 3, spread: 1 },
                                { ch: 'Chapter III', title: 'Royal Awadhi Handis & Curries', page: 4, spread: 2 },
                                { ch: 'Chapter IV', title: 'South Indian Specialities & Dosas', page: 5, spread: 2 },
                                { ch: 'Chapter V', title: 'Dum Biryani & Artisanal Tandoor Breads', page: 6, spread: 3 },
                                { ch: 'Chapter VI', title: 'Stone Hearth Pizzas & Pastas', page: 7, spread: 3 },
                                { ch: 'Chapter VII', title: 'Artisanal Mocktails & Shakes', page: 8, spread: 4 },
                                { ch: 'Chapter VIII', title: 'Royal Desserts & Founder Epilogue', page: 9, spread: 4 },
                              ].map((item) => (
                                <button
                                  key={item.ch}
                                  type="button"
                                  onClick={() => turnToSpread(item.spread)}
                                  className="w-full flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-white/[0.05] transition-colors group text-left"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <span className="text-[#C5A880] text-[10px] font-mono uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
                                      ✦ {item.ch}
                                    </span>
                                    <span className="text-xs text-neutral-300 font-light group-hover:text-white transition-colors">
                                      {item.title}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-[#C5A880] font-mono shrink-0">
                                    p. {item.page}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="relative z-10 pt-4 flex items-center justify-between">
                            <span className="text-[11px] text-neutral-500 font-mono">Page 1</span>
                            <button
                              type="button"
                              onClick={() => turnToSpread(1)}
                              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#183620] hover:bg-[#204a2c] text-[#FBF9F5] border border-[#C5A880] text-xs font-sans uppercase tracking-widest transition-all shadow-lg group"
                            >
                              <span>Open Menu — Turn Page</span>
                              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-[#C5A880]" />
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* ────────────────────────────────────────────────────────
                        SPREAD 1: CHAPTER I (TANDOOR) & CHAPTER II (CHINESE)
                       ──────────────────────────────────────────────────────── */}
                    {currentSpread === 1 && (
                      <>
                        {/* Left Page (Page 2): Tandoori Starters */}
                        <div className="p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#C5A880]/20 relative bg-gradient-to-br from-[#0B1A12] to-[#08140D] text-left">
                          <div className="absolute inset-4 sm:inset-6 border border-[#C5A880]/20 pointer-events-none rounded-xl" />

                          <div className="relative z-10 space-y-4">
                            <div className="border-b border-[#C5A880]/30 pb-3">
                              <span className="text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.22em] block">
                                Chapter I
                              </span>
                              <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
                                Tandoori Hearth & Kebabs
                              </h3>
                              <p className="text-[11px] text-neutral-400 font-light pt-0.5">
                                Roasted at 400°C over aromatic fruitwood coals with saffron cream
                              </p>
                            </div>

                            <div className="space-y-3.5">
                              {tandooriDishes.slice(0, 6).map((dish) => (
                                <div
                                  key={dish.id}
                                  onClick={() => setPreviewDish(dish)}
                                  className="group cursor-pointer p-2 rounded-lg hover:bg-white/[0.04] transition-all border-l-2 border-transparent hover:border-[#C5A880]"
                                >
                                  <div className="flex items-baseline justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-serif text-sm sm:text-base text-white group-hover:text-[#C5A880] transition-colors font-light">
                                        {dish.name}
                                      </h4>
                                      {dish.isJain && (
                                        <span className="text-[9px] font-mono text-[#22AA00] uppercase tracking-wider">
                                          🌱 Jain
                                        </span>
                                      )}
                                    </div>
                                    <span className="font-mono text-xs text-[#C5A880] font-medium shrink-0">
                                      ₹{dish.price}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed pt-0.5 line-clamp-2">
                                    {dish.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="relative z-10 pt-3 border-t border-[#C5A880]/20 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                            <button
                              type="button"
                              onClick={() => turnToSpread(0)}
                              className="text-neutral-400 hover:text-[#C5A880] transition-colors flex items-center gap-1"
                            >
                              <ChevronLeft size={12} />
                              <span>Cover</span>
                            </button>
                            <span>Page 2</span>
                          </div>
                        </div>

                        {/* Right Page (Page 3): Chinese Starters & Sizzlers */}
                        <div className="p-6 sm:p-8 flex flex-col justify-between relative bg-gradient-to-bl from-[#0C1E14] to-[#091710] text-left">
                          <div className="absolute inset-4 sm:inset-6 border border-[#C5A880]/20 pointer-events-none rounded-xl" />

                          <div className="relative z-10 space-y-4">
                            <div className="border-b border-[#C5A880]/30 pb-3">
                              <span className="text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.22em] block">
                                Chapter II
                              </span>
                              <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
                                Indo-Chinese & Sizzlers
                              </h3>
                              <p className="text-[11px] text-neutral-400 font-light pt-0.5">
                                High wok-hei tossed botanicals & smoking cast-iron platters
                              </p>
                            </div>

                            <div className="space-y-3.5">
                              {chineseDishes.slice(0, 6).map((dish) => (
                                <div
                                  key={dish.id}
                                  onClick={() => setPreviewDish(dish)}
                                  className="group cursor-pointer p-2 rounded-lg hover:bg-white/[0.04] transition-all border-l-2 border-transparent hover:border-[#C5A880]"
                                >
                                  <div className="flex items-baseline justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-serif text-sm sm:text-base text-white group-hover:text-[#C5A880] transition-colors font-light">
                                        {dish.name}
                                      </h4>
                                      {dish.isJain && (
                                        <span className="text-[9px] font-mono text-[#22AA00] uppercase tracking-wider">
                                          🌱 Jain
                                        </span>
                                      )}
                                    </div>
                                    <span className="font-mono text-xs text-[#C5A880] font-medium shrink-0">
                                      ₹{dish.price}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed pt-0.5 line-clamp-2">
                                    {dish.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="relative z-10 pt-3 border-t border-[#C5A880]/20 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                            <span>Page 3</span>
                            <button
                              type="button"
                              onClick={() => turnToSpread(2)}
                              className="text-neutral-400 hover:text-[#C5A880] transition-colors flex items-center gap-1"
                            >
                              <span>Next Page</span>
                              <ChevronRight size={12} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* ────────────────────────────────────────────────────────
                        SPREAD 2: CHAPTER III (CURRIES) & CHAPTER IV (DOSAS)
                       ──────────────────────────────────────────────────────── */}
                    {currentSpread === 2 && (
                      <>
                        {/* Left Page (Page 4): Indian Curries & Handis */}
                        <div className="p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#C5A880]/20 relative bg-gradient-to-br from-[#0B1A12] to-[#08140D] text-left">
                          <div className="absolute inset-4 sm:inset-6 border border-[#C5A880]/20 pointer-events-none rounded-xl" />

                          <div className="relative z-10 space-y-4">
                            <div className="border-b border-[#C5A880]/30 pb-3">
                              <span className="text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.22em] block">
                                Chapter III
                              </span>
                              <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
                                Royal Awadhi & Handi Curries
                              </h3>
                              <p className="text-[11px] text-neutral-400 font-light pt-0.5">
                                Slow-simmered earthenware handis infused with whole spices
                              </p>
                            </div>

                            <div className="space-y-3.5">
                              {curryDishes.slice(0, 6).map((dish) => (
                                <div
                                  key={dish.id}
                                  onClick={() => setPreviewDish(dish)}
                                  className="group cursor-pointer p-2 rounded-lg hover:bg-white/[0.04] transition-all border-l-2 border-transparent hover:border-[#C5A880]"
                                >
                                  <div className="flex items-baseline justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-serif text-sm sm:text-base text-white group-hover:text-[#C5A880] transition-colors font-light">
                                        {dish.name}
                                      </h4>
                                      {dish.isJain && (
                                        <span className="text-[9px] font-mono text-[#22AA00] uppercase tracking-wider">
                                          🌱 Jain
                                        </span>
                                      )}
                                    </div>
                                    <span className="font-mono text-xs text-[#C5A880] font-medium shrink-0">
                                      ₹{dish.price}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed pt-0.5 line-clamp-2">
                                    {dish.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="relative z-10 pt-3 border-t border-[#C5A880]/20 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                            <button
                              type="button"
                              onClick={() => turnToSpread(1)}
                              className="text-neutral-400 hover:text-[#C5A880] transition-colors flex items-center gap-1"
                            >
                              <ChevronLeft size={12} />
                              <span>Prev Page</span>
                            </button>
                            <span>Page 4</span>
                          </div>
                        </div>

                        {/* Right Page (Page 5): South Indian Heritage & Dosas */}
                        <div className="p-6 sm:p-8 flex flex-col justify-between relative bg-gradient-to-bl from-[#0C1E14] to-[#091710] text-left">
                          <div className="absolute inset-4 sm:inset-6 border border-[#C5A880]/20 pointer-events-none rounded-xl" />

                          <div className="relative z-10 space-y-4">
                            <div className="border-b border-[#C5A880]/30 pb-3">
                              <span className="text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.22em] block">
                                Chapter IV
                              </span>
                              <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
                                South Indian & Dosas
                              </h3>
                              <p className="text-[11px] text-neutral-400 font-light pt-0.5">
                                Fermented stone-ground batter crisped in golden desi ghee
                              </p>
                            </div>

                            <div className="space-y-3.5">
                              {southIndianDishes.slice(0, 6).map((dish) => (
                                <div
                                  key={dish.id}
                                  onClick={() => setPreviewDish(dish)}
                                  className="group cursor-pointer p-2 rounded-lg hover:bg-white/[0.04] transition-all border-l-2 border-transparent hover:border-[#C5A880]"
                                >
                                  <div className="flex items-baseline justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-serif text-sm sm:text-base text-white group-hover:text-[#C5A880] transition-colors font-light">
                                        {dish.name}
                                      </h4>
                                      {dish.isJain && (
                                        <span className="text-[9px] font-mono text-[#22AA00] uppercase tracking-wider">
                                          🌱 Jain
                                        </span>
                                      )}
                                    </div>
                                    <span className="font-mono text-xs text-[#C5A880] font-medium shrink-0">
                                      ₹{dish.price}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed pt-0.5 line-clamp-2">
                                    {dish.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="relative z-10 pt-3 border-t border-[#C5A880]/20 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                            <span>Page 5</span>
                            <button
                              type="button"
                              onClick={() => turnToSpread(3)}
                              className="text-neutral-400 hover:text-[#C5A880] transition-colors flex items-center gap-1"
                            >
                              <span>Next Page</span>
                              <ChevronRight size={12} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* ────────────────────────────────────────────────────────
                        SPREAD 3: CHAPTER V (BIRYANI & BREADS) & CHAPTER VI (PIZZA)
                       ──────────────────────────────────────────────────────── */}
                    {currentSpread === 3 && (
                      <>
                        {/* Left Page (Page 6): Biryani, Rice & Breads */}
                        <div className="p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#C5A880]/20 relative bg-gradient-to-br from-[#0B1A12] to-[#08140D] text-left">
                          <div className="absolute inset-4 sm:inset-6 border border-[#C5A880]/20 pointer-events-none rounded-xl" />

                          <div className="relative z-10 space-y-4">
                            <div className="border-b border-[#C5A880]/30 pb-3">
                              <span className="text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.22em] block">
                                Chapter V
                              </span>
                              <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
                                Dum Biryani & Artisanal Breads
                              </h3>
                              <p className="text-[11px] text-neutral-400 font-light pt-0.5">
                                Aged basmati sealed in clay purdah & clay oven flatbreads
                              </p>
                            </div>

                            <div className="space-y-3.5">
                              {riceBreadsDishes.slice(0, 6).map((dish) => (
                                <div
                                  key={dish.id}
                                  onClick={() => setPreviewDish(dish)}
                                  className="group cursor-pointer p-2 rounded-lg hover:bg-white/[0.04] transition-all border-l-2 border-transparent hover:border-[#C5A880]"
                                >
                                  <div className="flex items-baseline justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-serif text-sm sm:text-base text-white group-hover:text-[#C5A880] transition-colors font-light">
                                        {dish.name}
                                      </h4>
                                      {dish.isJain && (
                                        <span className="text-[9px] font-mono text-[#22AA00] uppercase tracking-wider">
                                          🌱 Jain
                                        </span>
                                      )}
                                    </div>
                                    <span className="font-mono text-xs text-[#C5A880] font-medium shrink-0">
                                      ₹{dish.price}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed pt-0.5 line-clamp-2">
                                    {dish.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="relative z-10 pt-3 border-t border-[#C5A880]/20 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                            <button
                              type="button"
                              onClick={() => turnToSpread(2)}
                              className="text-neutral-400 hover:text-[#C5A880] transition-colors flex items-center gap-1"
                            >
                              <ChevronLeft size={12} />
                              <span>Prev Page</span>
                            </button>
                            <span>Page 6</span>
                          </div>
                        </div>

                        {/* Right Page (Page 7): Pizzas & Pastas */}
                        <div className="p-6 sm:p-8 flex flex-col justify-between relative bg-gradient-to-bl from-[#0C1E14] to-[#091710] text-left">
                          <div className="absolute inset-4 sm:inset-6 border border-[#C5A880]/20 pointer-events-none rounded-xl" />

                          <div className="relative z-10 space-y-4">
                            <div className="border-b border-[#C5A880]/30 pb-3">
                              <span className="text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.22em] block">
                                Chapter VI
                              </span>
                              <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
                                Hearth Pizzas & Pastas
                              </h3>
                              <p className="text-[11px] text-neutral-400 font-light pt-0.5">
                                Hand-stretched sourdough crusts & durum wheat pastas
                              </p>
                            </div>

                            <div className="space-y-3.5">
                              {continentalDishes.slice(0, 6).map((dish) => (
                                <div
                                  key={dish.id}
                                  onClick={() => setPreviewDish(dish)}
                                  className="group cursor-pointer p-2 rounded-lg hover:bg-white/[0.04] transition-all border-l-2 border-transparent hover:border-[#C5A880]"
                                >
                                  <div className="flex items-baseline justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-serif text-sm sm:text-base text-white group-hover:text-[#C5A880] transition-colors font-light">
                                        {dish.name}
                                      </h4>
                                      {dish.isJain && (
                                        <span className="text-[9px] font-mono text-[#22AA00] uppercase tracking-wider">
                                          🌱 Jain
                                        </span>
                                      )}
                                    </div>
                                    <span className="font-mono text-xs text-[#C5A880] font-medium shrink-0">
                                      ₹{dish.price}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed pt-0.5 line-clamp-2">
                                    {dish.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="relative z-10 pt-3 border-t border-[#C5A880]/20 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                            <span>Page 7</span>
                            <button
                              type="button"
                              onClick={() => turnToSpread(4)}
                              className="text-neutral-400 hover:text-[#C5A880] transition-colors flex items-center gap-1"
                            >
                              <span>Next Page</span>
                              <ChevronRight size={12} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* ────────────────────────────────────────────────────────
                        SPREAD 4: CHAPTER VII (MOCKTAILS) & CHAPTER VIII (DESSERTS & EPILOGUE)
                       ──────────────────────────────────────────────────────── */}
                    {currentSpread === 4 && (
                      <>
                        {/* Left Page (Page 8): Mocktails & Shakes */}
                        <div className="p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#C5A880]/20 relative bg-gradient-to-br from-[#0B1A12] to-[#08140D] text-left">
                          <div className="absolute inset-4 sm:inset-6 border border-[#C5A880]/20 pointer-events-none rounded-xl" />

                          <div className="relative z-10 space-y-4">
                            <div className="border-b border-[#C5A880]/30 pb-3">
                              <span className="text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.22em] block">
                                Chapter VII
                              </span>
                              <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
                                Artisanal Coolers & Shakes
                              </h3>
                              <p className="text-[11px] text-neutral-400 font-light pt-0.5">
                                Cold-pressed fruit botanicals, garden herbs, and thick shakes
                              </p>
                            </div>

                            <div className="space-y-3.5">
                              {mocktailDishes.slice(0, 6).map((dish) => (
                                <div
                                  key={dish.id}
                                  onClick={() => setPreviewDish(dish)}
                                  className="group cursor-pointer p-2 rounded-lg hover:bg-white/[0.04] transition-all border-l-2 border-transparent hover:border-[#C5A880]"
                                >
                                  <div className="flex items-baseline justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-serif text-sm sm:text-base text-white group-hover:text-[#C5A880] transition-colors font-light">
                                        {dish.name}
                                      </h4>
                                      {dish.isJain && (
                                        <span className="text-[9px] font-mono text-[#22AA00] uppercase tracking-wider">
                                          🌱 Jain
                                        </span>
                                      )}
                                    </div>
                                    <span className="font-mono text-xs text-[#C5A880] font-medium shrink-0">
                                      ₹{dish.price}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed pt-0.5 line-clamp-2">
                                    {dish.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="relative z-10 pt-3 border-t border-[#C5A880]/20 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                            <button
                              type="button"
                              onClick={() => turnToSpread(3)}
                              className="text-neutral-400 hover:text-[#C5A880] transition-colors flex items-center gap-1"
                            >
                              <ChevronLeft size={12} />
                              <span>Prev Page</span>
                            </button>
                            <span>Page 8</span>
                          </div>
                        </div>

                        {/* Right Page (Page 9): Desserts & Founder Epilogue */}
                        <div className="p-6 sm:p-8 flex flex-col justify-between relative bg-gradient-to-bl from-[#0C1E14] to-[#091710] text-left">
                          <div className="absolute inset-4 sm:inset-6 border border-[#C5A880]/20 pointer-events-none rounded-xl" />

                          <div className="relative z-10 space-y-4">
                            <div className="border-b border-[#C5A880]/30 pb-3">
                              <span className="text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.22em] block">
                                Chapter VIII
                              </span>
                              <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
                                Desserts & Royal Epilogue
                              </h3>
                              <p className="text-[11px] text-neutral-400 font-light pt-0.5">
                                Sizzling cast-iron skillet sweets and heritage hospitality
                              </p>
                            </div>

                            {/* Desserts List */}
                            <div className="space-y-3">
                              {dessertDishes.map((dish) => (
                                <div
                                  key={dish.id}
                                  onClick={() => setPreviewDish(dish)}
                                  className="group cursor-pointer p-2 rounded-lg hover:bg-white/[0.04] transition-all border-l-2 border-transparent hover:border-[#C5A880]"
                                >
                                  <div className="flex items-baseline justify-between gap-3">
                                    <h4 className="font-serif text-sm sm:text-base text-white group-hover:text-[#C5A880] transition-colors font-light">
                                      {dish.name}
                                    </h4>
                                    <span className="font-mono text-xs text-[#C5A880] font-medium shrink-0">
                                      ₹{dish.price}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed pt-0.5">
                                    {dish.description}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* Royal Epilogue & Address Box */}
                            <div className="p-4 rounded-xl bg-black/40 border border-[#C5A880]/30 space-y-2 text-center">
                              <span className="font-serif italic text-sm text-[#C5A880] block">
                                “Thank You • Visit Again”
                              </span>
                              <p className="text-[11px] text-neutral-300 font-light leading-relaxed">
                                Rasoraa Multicuisine Pure Veg Restaurant<br />
                                39, Ambalathadayar Madam Street, Heritage Town, Pondicherry — 605 001
                              </p>
                              <div className="pt-2 flex items-center justify-center gap-3 text-[11px]">
                                <a
                                  href="tel:+919484594845"
                                  className="text-[#C5A880] hover:underline flex items-center gap-1"
                                >
                                  <Phone size={11} />
                                  <span>+91 94845 94845</span>
                                </a>
                                <span className="text-neutral-600">|</span>
                                <a
                                  href="https://wa.me/919484594845"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#22AA00] hover:underline flex items-center gap-1"
                                >
                                  <MessageCircle size={11} />
                                  <span>WhatsApp Concierge</span>
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="relative z-10 pt-3 border-t border-[#C5A880]/20 flex items-center justify-between">
                            <span className="text-[11px] text-neutral-500 font-mono">Page 9 / Epilogue</span>
                            <a
                              href="#reserve"
                              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#183620] hover:bg-[#204a2c] text-[#FBF9F5] border border-[#C5A880] text-xs font-sans uppercase tracking-widest transition-all shadow-lg"
                            >
                              <Calendar size={12} className="text-[#C5A880]" />
                              <span>Reserve Table</span>
                            </a>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Folio Navigation & Spread Indicator */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400 px-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={currentSpread === 0}
                      onClick={handlePrevSpread}
                      className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#C5A880] disabled:opacity-30 disabled:hover:border-white/10 transition-colors flex items-center gap-1 text-white"
                    >
                      <ChevronLeft size={13} />
                      <span>Turn Back</span>
                    </button>
                    <button
                      type="button"
                      disabled={currentSpread === 4}
                      onClick={handleNextSpread}
                      className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#C5A880] disabled:opacity-30 disabled:hover:border-white/10 transition-colors flex items-center gap-1 text-white"
                    >
                      <span>Turn Forward</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>

                  {/* Spread Indicators Dots */}
                  <div className="flex items-center gap-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => turnToSpread(i)}
                        title={`Go to Spread ${i + 1}`}
                        className={`h-2 rounded-full transition-all ${
                          currentSpread === i ? 'w-8 bg-[#C5A880]' : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] text-neutral-400">
                    Spread {currentSpread + 1} of 5 · Official Rasoraa Folio
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              CATALOG VIEW: FULL DISH GRID & CATEGORY SEARCH (ALTERNATIVE)
             ═══════════════════════════════════════════════════════════════ */}
          {menuViewMode === 'grid' && (
            <div className="space-y-10 max-w-6xl mx-auto">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {MENU_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-[11px] font-sans tracking-[0.14em] uppercase transition-all duration-300 border ${
                      activeCategory === cat || (cat === 'All Items' && activeCategory === 'All')
                        ? 'bg-[#183620] text-[#FBF9F5] border-[#C5A880] shadow-[0_0_15px_rgba(197,168,128,0.2)]'
                        : 'bg-white/[0.03] text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Michelin-Style Editorial Menu Grid */}
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 text-left">
                {filteredDishes.map((dish) => (
                  <div
                    key={dish.id}
                    onClick={() => setPreviewDish(dish)}
                    className="group relative border-b border-white/[0.08] pb-6 cursor-pointer text-left transition-all duration-300 hover:border-[#C5A880]/50"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-xl sm:text-2xl text-white font-light group-hover:text-[#C5A880] transition-colors">
                          {dish.name}
                        </span>
                        {dish.isJain && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-sans text-[#22AA00] tracking-wider uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22AA00]" />
                            Jain
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-base text-[#C5A880] font-light shrink-0">
                        ₹{dish.price}
                      </span>
                    </div>

                    <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed pt-2">
                      {dish.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 text-[11px] font-sans text-neutral-500">
                      <span>{dish.origin}</span>
                      <span className="text-[#C5A880] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        <span>View Chronicle</span>
                        <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </div>
                ))}

                {filteredDishes.length === 0 && (
                  <div className="col-span-2 py-14 text-center text-neutral-400 space-y-3">
                    <p className="font-serif text-2xl text-white font-light">No dishes found matching "{menuSearchQuery}"</p>
                    <p className="text-xs text-neutral-400">Try searching for Paneer, Dosa, Biryani, Pasta, Sizzler, or browse by category.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuSearchQuery('');
                        setActiveCategory('All Items');
                      }}
                      className="px-5 py-2 rounded-full border border-[#C5A880] text-xs font-sans uppercase tracking-widest text-white hover:bg-white/10"
                    >
                      Reset Menu
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

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
      <section id="gallery" className="py-28 relative bg-[#070B08] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[#C5A880] text-xs font-sans tracking-[0.28em] uppercase">
              03 / Visual Chronicles
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-white">
              The Alchemy of Living Fire
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
              A photographic study of smoldering sal wood coals, hand-hammered brass handis, and the pure quietude of our dining salons.
            </p>
          </div>

          {/* Asymmetric Magazine Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-3xl overflow-hidden border border-white/10 aspect-[3/4] bg-[#0A120D] shadow-2xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter contrast-[1.06] group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040805] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <span className="text-[10px] font-sans text-[#C5A880] tracking-[0.22em] uppercase block">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg text-white font-light pt-1 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-light pt-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
