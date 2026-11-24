# L'ÉMERAUDE | Premium Modern Restaurant & Gastronomy Portal

A modern, high-end fine dining restaurant website and reservation platform built with **React 18**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **React Router**, and **React Hook Form + Zod**.

Designed with a bespoke **Green & Blue** architectural color palette representing forest terroir and coastal freshness.

---

## 🌿 Visual Identity & Design System

The visual identity embodies contemporary culinary elegance — generous whitespace, refined typography, soft drop-shadows, and curated high-resolution culinary photography.

### Color Palette
- **Deep Forest Green** (`#123F35`): Primary brand color, hero backdrops, editorial accents.
- **Emerald Green** (`#167C72`): Interactive accents, badges, highlights, primary buttons.
- **Ocean Blue** (`#1769AA`): Secondary accent, coastal markers, interactive states.
- **Light Blue** (`#EAF3F5`): Soft badges, secondary cards, informational toasts.
- **Background Canvas** (`#F7F9F8`): Editorial neutral background.
- **Primary Text** (`#172B28`): Deep botanical ink.
- **Muted Text** (`#71817D`): Soft subtitle and metadata ink.
- **Warm Gold Accent** (`#C5A059`): Subtle rating stars and culinary accolade marks.

### Typography
- **Headings**: *Playfair Display* (Editorial luxury serif).
- **Body Text**: *Inter / Manrope* (Clean, highly legible geometric sans).

---

## 🏛️ Centralized Configuration Architecture

All business-specific content, brand names, branches, menu items, culinary stories, and contact details are consolidated inside:
```
src/config/restaurant.config.ts
```

### Easily Replaceable Client Data:
1. **Brand Identity**:
   - `RESTAURANT_CONFIG.brand.name`
   - `RESTAURANT_CONFIG.brand.tagline`
   - `RESTAURANT_CONFIG.brand.shortPhilosophy`
2. **Branch Locations**:
   - Downtown Flagship, Ocean Pavilion, Forest Conservatory.
   - Address, coordinates, hours, features, phone, email, Google Maps embed URLs.
3. **Menu & Dietary**:
   - Starters, Mains, Desserts, Beverages, Tasting Degustations.
   - Dietary tags: Vegetarian, Vegan, Gluten-Free, Chef's Signature.
   - Sommelier wine pairings and prices.
4. **Experiences & Private Events**:
   - Private Dining Salons, Receptions, Full Buyouts with guest capacities and amenities.
5. **Guest Reviews & FAQs**:
   - Sample feedback clearly labeled, dress code policies, reservation guidelines.

---

## 📅 5-Step Reservations Journey

The reservation engine redesigns the table booking journey into five clean, interactive steps:

1. **Step 1: Restaurant Location**: Select from distinctive branch cards with photos, neighborhood tags, and operating hours.
2. **Step 2: Date Selection**: Custom interactive calendar with month navigation, past date prevention, and availability indicators.
3. **Step 3: Service Session & Guests**: Lunch vs. Dinner service toggle, guest party selector (1 to 8+ guests), and dynamic time slot buttons.
4. **Step 4: Patron Information**: Form with title, first name, last name, email, phone, seating preference, dining occasion, special dietary allergies, and persistence preferences validated via Zod.
5. **Step 5: Review & Confirmation**: Complete reservation summary before submission, followed by an attractive booking receipt screen with a generated reference code (`LEM-XXXXXX`), summary card, and backend integration notice.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Badge.tsx               # Dietary and category pills
│   │   ├── Button.tsx              # Luxury button variants (primary, secondary, outline)
│   │   ├── Footer.tsx              # Editorial footer with newsletter & branch links
│   │   ├── Navbar.tsx              # Sticky nav with scroll transition & mobile drawer
│   │   ├── ScrollToTop.tsx         # Router scroll reset
│   │   └── SectionHeading.tsx      # Eyebrow, serif titles, and luxury dividers
│   ├── home/
│   │   ├── FeaturedMenuSection.tsx # Category filterable menu showcase
│   │   ├── HeroSection.tsx         # Cinematic split hero with smooth scroll indicator
│   │   ├── IntroductionSection.tsx # Asymmetrical editorial image/text layout
│   │   ├── LocationContactSection.tsx # Interactive branch map & hours
│   │   ├── PrivateEventsSection.tsx # Visual private dining showcase
│   │   ├── SignatureExperiencesSection.tsx # 3 visual experience cards
│   │   ├── StoryPreviewSection.tsx # Brand philosophy & interior photography
│   │   └── TestimonialCarousel.tsx # Guest reflections carousel with sample labeling
│   └── reservations/
│       ├── ReservationFlow.tsx     # 5-step controller & progress stepper
│       ├── Step1Branch.tsx         # Branch selector cards
│       ├── Step2Date.tsx           # Interactive calendar component
│       ├── Step3SessionTime.tsx    # Lunch/Dinner session & time slots
│       ├── Step4CustomerInfo.tsx   # React Hook Form + Zod patron form
│       └── Step5Confirmation.tsx   # Summary review & confirmation receipt
├── config/
│   └── restaurant.config.ts        # Centralized business & menu configuration
├── lib/
│   └── utils.ts                    # Class merging, date formatters, booking code generator
├── pages/
│   ├── ContactPage.tsx             # Branches, map, contact form & FAQ accordion
│   ├── EventsPage.tsx              # Private dining salons, amenities & enquiry form
│   ├── HomePage.tsx                # Complete homepage experience
│   ├── LoginPage.tsx               # Password / OTP authentication portal
│   ├── MenuPage.tsx                # Filterable a la carte menu with search & diet tags
│   ├── NotFoundPage.tsx            # 404 page with navigation fallbacks
│   ├── ReservationsPage.tsx        # Dedicated booking journey
│   └── StoryPage.tsx               # Culinary heritage, philosophy & team artisans
├── types/
│   └── index.ts                    # TypeScript models
├── App.tsx                         # Navigation routes & layout
├── main.tsx                        # React DOM entry point
└── index.css                       # Tailwind layers & typography styling
```

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
# or
pnpm run dev
```

### Production Build
```bash
npm run build
# or
pnpm run build
```

### Preview Production Build
```bash
npm run preview
# or
pnpm run preview
```
