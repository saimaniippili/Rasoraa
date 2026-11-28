---
name: luxury-restaurant-experience
description: >-
  Architectural blueprint and component system for creating world-class luxury restaurant,
  haute gastronomy, and fine-dining web experiences. Covers floating 3D culinary showcases with genuine
  transparent food cutouts, multi-layer glass exhibit installations (time capsules), 3D interactive
  skeuomorphic dining folios, custom sanctuary reservation engines, ambient living ember particles,
  and ethereal whole-page brand watermarks.
---

# Luxury Restaurant Experience Architecture & Blueprint

A comprehensive, production-grade guide and component suite for building ultra-premium, Michelin-star, and royal heritage restaurant websites.

---

## 1. Visual & Aesthetic Philosophy

### The Haute Gastronomy Design Principles
1. **Atmospheric Immersion**: Deep obsidian-green canvas (`#070B08`, `#060D08`, `#070C09`) that feels like an intimate, candlelit dining salon after dusk.
2. **True 3D Floating Culinary Sculpture**: Food photography is displayed without rigid rectangular cards or visible image containers. The food dish itself (with plate/handi and natural contact shadows) floats directly in dark 3D space.
3. **Heritage Architectural Glass Exhibits**: Multi-layer translucent smoked glass installations with progressive Z-depth, subtle antique-gold hairline borders, and warm edge illumination.
4. **Restrained Imperial Palette**:
   - **Regal Forest Emerald**: `#1B512D`, `#0F2F1A` (accents, buttons, badges, glows)
   - **Antique Gold & Champagne**: `#C5A880`, `#E2CCA6` (eyebrow headers, borders, serif highlights)
   - **Obsidian Hearth**: `#070B08`, `#040705` (seamless backgrounds)
   - **Vedic Cream**: `#FAF8F5`, `#E8E4DA` (editorial typography)
5. **Living Ember Physics**: Subtle HTML5 canvas particle engine simulating sal wood embers and fireplace sparks ascending gently into the dark atmosphere.
6. **Ethereal Brand Watermark**: Ultra-transparent (`opacity: 0.03 – 0.04`), `mix-blend-screen`, `pointer-events-none` monogram watermark fixed across the canvas.

---

## 2. Core Interactive Modules

### Module A: Floating Culinary Showcase (Hero Dish Presentation)

**Problem Solved**: Standard ecommerce websites place food inside rectangular boxes with drop shadows. In luxury dining, the dish must look like a physical culinary sculpture suspended in the atmosphere.

#### Key Architecture & Interaction Rules:
- **Zero Card Boundaries**: Remove outer borders, card containers, and heavy background boxes around the main food photograph.
- **Genuine Alpha Cutouts**: Must use transparent WebP/PNG cutouts with clean plate edges and natural drop shadows—never dark rectangles blended with CSS.
- **Controlled 3D Tilt**: Apply gentle mouse-tracking 3D tilt (`perspective: 1000px`, `rotateX`, `rotateY`) and floating animations.
- **In-Place Dish Switching**: Visitors swipe or click dish selector thumbnails (e.g., 01 Malai, 02 Dal, 03 Honey). The dish and typography transition smoothly in place with zero unwanted popup modals or preview cards.
- **Deliberate Lightbox Only**: An enlarged lightbox opens *only* when the visitor deliberately clicks the food image or a small "View" button, never automatically on swipe.

```tsx
// Example Floating Presentation Container
<motion.div
  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
  animate={{ y: [0, -8, 0] }}
  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
  className="relative cursor-pointer select-none"
  onClick={() => setLightboxOpen(true)}
>
  <img
    src={currentDish.image}
    alt={currentDish.name}
    className="w-full max-w-[480px] h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] filter contrast-[1.05]"
  />
  {/* Soft contact glow beneath plate */}
  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-[#1B512D]/30 blur-2xl rounded-full pointer-events-none" />
</motion.div>
```

---

### Module B: Culinary Time Capsule (Four-Layer Glass Exhibition)

**Concept**: A visual storytelling installation representing lineage, ingredients, hearth mastery, and final gastronomy as progressive overlapping glass exhibits on a circular carved stone/metal pedestal.

#### Construction Details:
1. **Layer 01 – Royal Lineage**: Heritage court architecture, placed furthest back and left.
2. **Layer 02 – Sacred Ingredients**: Traditional brass spice bowls, green cardamom, and saffron.
3. **Layer 03 – Clay Pit Mastery**: 400°C clay tandoor with smoldering embers and rising smoke.
4. **Layer 04 – The Signature Experience**: Fine-dining plated course at the front right as the visual climax.

#### Styling Recipe:
- Smoked translucent glass: `bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-md`
- Hairline antique gold border: `border border-[#C5A880]/30 hover:border-[#C5A880]/80`
- Pedestal base: Oval disc with radial gradient, dark metallic rim, and warm upward spotlight.
- 12–15% proportional scale reduction to preserve section breathing room.

---

### Module C: 3D Interactive Dining Folio (Menu Experience)

**Concept**: Replaces flat restaurant PDF menus with an interactive leather-bound hardcover royal folio.

#### Features:
- Skeuomorphic hardcover binding with gold filigree and corner brackets.
- Tab-based navigation across courses: Starters, Royal Handi, Breads, Desserts, Artisanal Elixirs.
- Authentic Dietary Badging:
  - `100% Shuddh Shakahari`: Green seal with lotus emblem.
  - `Strict Jain Hearth`: Dedicated root-free stations, zero onion/garlic/tuber protocols.
- Integrated currency formatting (`₹` INR or localized) with tasting notes, spice pit metallurgy, and cooking techniques.

---

### Module D: Sanctuary Table Suite (Bespoke Reservation Engine)

**Concept**: A high-touch reservation suite replacing generic booking widgets.

#### Component Structure:
1. **Interactive Calendar Grid**:
   - Current month view with previous/next month transitions.
   - Disabled past dates, active day highlight in `#1B512D` with gold border.
   - Native OS datepicker fallback for mobile accessibility.
2. **Party Size Counter**: Interactive `-` and `+` guest selector.
3. **Dining Sessions**: Twilight service slots (12:30 PM, 4:00 PM, 8:00 PM, 10:00 PM).
4. **Dietary Safeguard Toggle**: One-click "Strict Jain Dietary Requirements" toggle.
5. **Direct VIP WhatsApp Concierge**: Instant fallback button for bespoke salon bookings and special dietary consultations.

---

### Module E: Living Fire & Particle Canvas (`EmberCanvas`)

An ultra-lightweight HTML5 `<canvas>` simulation of glowing embers:
- 40–60 floating particles with randomized size (1px – 3px), opacity, and float speed.
- Gold (`rgba(197, 168, 128, ...)`) and hearth amber (`rgba(226, 120, 40, ...)`) color mixing.
- Subdued upward drift with gentle sine-wave horizontal oscillation.
- Pauses gracefully on hidden tabs to preserve battery and GPU.

---

### Module F: Ethereal Brand Watermark System

A subtle watermark that gives the entire digital presence a bespoke private-club feel:
- Key out solid background into genuine alpha channel (0 to 255 alpha gradient, zero dark halo).
- Place once as a fixed, whole-page background layer:
  ```tsx
  <div className="fixed inset-0 pointer-events-none z-[1] flex items-center justify-center overflow-hidden" aria-hidden="true">
    <div className="w-[500px] sm:w-[700px] lg:w-[920px] max-w-[85vw] aspect-[4/3] opacity-[0.035] filter blur-[0.2px] select-none mix-blend-screen transform-gpu">
      <img src="/brand-watermark-2x.webp" alt="" className="w-full h-full object-contain pointer-events-none" />
    </div>
  </div>
  ```
- **Rule**: Never duplicate the watermark inside individual sections when the whole-page fixed layer is active, avoiding confusing double/ghost watermarks.

---

## 3. Technology Stack Recommendations

- **Framework**: React / Next.js / Vite + TypeScript
- **Styling**: Tailwind CSS
- **Motion & 3D Transitions**: Framer Motion
- **Icons**: Lucide React
- **Typography Pairing**:
  - Headings / Dish Titles: Classic Luxury Serif (e.g., Cormorant Garamond, Playfair Display, Cinzel)
  - Details / Prices / Meta: Clean Sans & Monospace (e.g., Inter, Outfit, JetBrains Mono)

---

## 4. Common Pitfalls & How to Avoid Them

| Pitfall | Wrong Approach | Right Approach |
| :--- | :--- | :--- |
| **Card Enclosure** | Enclosing food in a rounded rectangular card with a gray background. | Let the food cutout float freely directly over the dark ambient canvas with soft contact drop shadows. |
| **Fake Cutouts** | Using a rectangular photo with a dark background hoping it blends with CSS `mix-blend-mode`. | Generate or process clean transparent WebP/PNG cutouts with true alpha channels. |
| **Overlapping Watermarks** | Adding a watermark to the page container AND each individual section. | Use one single fixed background layer with `opacity: 0.035` and `pointer-events-none`. |
| **Disruptive Previews** | Automatically opening a modal/popup when the user clicks or swipes between dishes. | Keep the preview in-place on the hero. Only open a lightbox on explicit user zoom action. |
| **Color Clash** | Using bright neon greens for vegetarian icons. | Use deep regal forest emerald (`#1B512D`) with warm antique gold (`#C5A880`) accents. |
