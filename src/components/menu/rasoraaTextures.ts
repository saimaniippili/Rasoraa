import * as THREE from 'three';

const WIDTH = 1024;
const HEIGHT = 1408;

function createBaseCanvas(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d', { alpha: false })!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  return { canvas, ctx };
}

// Draw leather texture with stitching and brass corners
function drawCoverBackground(ctx: CanvasRenderingContext2D) {
  // Emerald gradient
  const grad = ctx.createRadialGradient(
    WIDTH * 0.5,
    HEIGHT * 0.45,
    100,
    WIDTH * 0.5,
    HEIGHT * 0.5,
    WIDTH * 0.8
  );
  grad.addColorStop(0, '#0E3324');
  grad.addColorStop(0.5, '#09251A');
  grad.addColorStop(1, '#05160F');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Subtle leather grain
  ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT;
    const r = Math.random() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Padded border indentation
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.lineWidth = 4;
  ctx.strokeRect(36, 36, WIDTH - 72, HEIGHT - 72);

  // Antique gold perimeter stitching
  ctx.save();
  ctx.strokeStyle = '#C5A880';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([8, 6]);
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 4;
  ctx.strokeRect(44, 44, WIDTH - 88, HEIGHT - 88);
  ctx.restore();

  // Inner delicate gold hairline
  ctx.strokeStyle = 'rgba(197, 168, 128, 0.35)';
  ctx.lineWidth = 1;
  ctx.strokeRect(56, 56, WIDTH - 112, HEIGHT - 112);

  // Brass Corner Protectors
  const cornerSize = 75;
  const corners = [
    { x: 38, y: 38, angle: 0 },
    { x: WIDTH - 38, y: 38, angle: Math.PI / 2 },
    { x: WIDTH - 38, y: HEIGHT - 38, angle: Math.PI },
    { x: 38, y: HEIGHT - 38, angle: -Math.PI / 2 },
  ];

  corners.forEach(({ x, y, angle }) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(cornerSize, 0);
    ctx.lineTo(cornerSize * 0.7, cornerSize * 0.3);
    ctx.lineTo(cornerSize * 0.3, cornerSize * 0.7);
    ctx.lineTo(0, cornerSize);
    ctx.closePath();
    const brassGrad = ctx.createLinearGradient(0, 0, cornerSize, cornerSize);
    brassGrad.addColorStop(0, '#E3C99B');
    brassGrad.addColorStop(0.5, '#C5A880');
    brassGrad.addColorStop(1, '#8C6F42');
    ctx.fillStyle = brassGrad;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 6;
    ctx.fill();

    // Rivet dot
    ctx.beginPath();
    ctx.arc(22, 22, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#4A3B22';
    ctx.fill();
    ctx.restore();
  });
}

// Draw parchment interior paper with deckle edge and subtle grain
function drawParchmentBackground(ctx: CanvasRenderingContext2D, isLeftPage: boolean) {
  // Warm ivory background
  const grad = ctx.createLinearGradient(
    isLeftPage ? WIDTH : 0,
    0,
    isLeftPage ? 0 : WIDTH,
    0
  );
  grad.addColorStop(0, '#FAF7EE');
  grad.addColorStop(0.85, '#F5EFE0');
  grad.addColorStop(1, '#EDE3CE');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Spine valley shadow
  const spineGrad = ctx.createLinearGradient(
    isLeftPage ? WIDTH : 0,
    0,
    isLeftPage ? WIDTH - 90 : 90,
    0
  );
  spineGrad.addColorStop(0, 'rgba(30, 20, 10, 0.22)');
  spineGrad.addColorStop(0.4, 'rgba(40, 25, 15, 0.08)');
  spineGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = spineGrad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Subtle paper fibers
  ctx.fillStyle = 'rgba(100, 75, 45, 0.018)';
  for (let i = 0; i < 2500; i++) {
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT;
    ctx.fillRect(x, y, Math.random() * 2 + 1, 1);
  }

  // Elegant gold inner frame
  ctx.strokeStyle = 'rgba(197, 168, 128, 0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(52, 52, WIDTH - 104, HEIGHT - 104);

  // Corner ornaments
  const cPoints = [
    [52, 52],
    [WIDTH - 52, 52],
    [WIDTH - 52, HEIGHT - 52],
    [52, HEIGHT - 52],
  ];
  ctx.fillStyle = '#C5A880';
  cPoints.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Draw Jain leaf indicator
function drawJainLeaf(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.strokeStyle = '#22AA00';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x - 6, y - 6, 12, 12);
  ctx.fillStyle = '#22AA00';
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

interface PageData {
  title: string;
  subtitle: string;
  chapterNumber?: string;
  items?: Array<{
    name: string;
    desc: string;
    price: number;
    isJain?: boolean;
    isSignature?: boolean;
  }>;
}

export async function generateRasoraaTextures(): Promise<THREE.Texture[]> {
  // Load restaurant logo image
  const logoImg = new Image();
  logoImg.crossOrigin = 'anonymous';
  const logoPromise = new Promise<HTMLImageElement>((resolve) => {
    logoImg.onload = () => resolve(logoImg);
    logoImg.onerror = () => resolve(logoImg);
    logoImg.src = '/logo.png';
  });
  await logoPromise;

  const textures: THREE.Texture[] = [];

  // 12 Pages (6 double-sided sheets)
  // Page 1: Front Cover
  {
    const { canvas, ctx } = createBaseCanvas();
    drawCoverBackground(ctx);

    // Central Gold Insignia Medallion
    const centerX = WIDTH * 0.5;
    const centerY = HEIGHT * 0.42;

    // Draw logo if available
    if (logoImg.complete && logoImg.naturalWidth > 0) {
      const logoW = 280;
      const logoH = (logoImg.naturalHeight / logoImg.naturalWidth) * logoW;
      ctx.drawImage(logoImg, centerX - logoW * 0.5, centerY - 210, logoW, logoH);
    }

    // Gold Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#E3C99B';
    ctx.font = '300 48px "Cinzel", "Playfair Display", "Times New Roman", serif';
    ctx.letterSpacing = '12px';
    ctx.fillText('R A S O R A A', centerX, centerY + 30);

    ctx.fillStyle = '#C5A880';
    ctx.font = '400 16px "DM Sans", "Helvetica Neue", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('PURE VEG & JAIN HAUTE CUISINE', centerX, centerY + 68);

    // Gold divider
    ctx.strokeStyle = '#C5A880';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX - 120, centerY + 95);
    ctx.lineTo(centerX + 120, centerY + 95);
    ctx.stroke();

    ctx.fillStyle = '#C5A880';
    ctx.font = '16px serif';
    ctx.fillText('❖', centerX, centerY + 99);

    // Subtitle
    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'italic 300 24px "Playfair Display", "Georgia", serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('The Imperial Dining Folio', centerX, centerY + 150);

    ctx.fillStyle = '#C5A880';
    ctx.font = '400 13px "DM Sans", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('HERITAGE TOWN · PONDICHERRY', centerX, centerY + 185);

    // Lower Seals
    const sealY = HEIGHT - 180;
    ctx.strokeStyle = 'rgba(197, 168, 128, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(centerX - 170, sealY - 25, 340, 50);

    ctx.fillStyle = '#E3C99B';
    ctx.font = '500 12px "DM Sans", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('100% SHUDDH SHAKAHARI', centerX, sealY - 4);
    ctx.fillStyle = '#A38965';
    ctx.font = '400 10px "DM Sans", sans-serif';
    ctx.letterSpacing = '2.5px';
    ctx.fillText('STRICT JAIN HEARTH ON DECREE · EST. 2012', centerX, sealY + 14);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    textures.push(tex);
  }

  // Page 2: Inside Front Cover / Prologue & Index
  {
    const { canvas, ctx } = createBaseCanvas();
    drawParchmentBackground(ctx, true);

    ctx.textAlign = 'center';
    const centerX = WIDTH * 0.5;

    ctx.fillStyle = '#8C682E';
    ctx.font = '700 14px "DM Sans", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('THE CULINARY DECREE', centerX, 130);

    ctx.fillStyle = '#030C06';
    ctx.font = '700 42px "Playfair Display", "Cinzel", serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('Freshness & Devotion', centerX, 180);

    ctx.strokeStyle = '#8C682E';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX - 90, 210);
    ctx.lineTo(centerX + 90, 210);
    ctx.stroke();

    // Freshness Decree Quote - Bold & High Contrast
    ctx.font = 'italic 600 23px "Playfair Display", "Georgia", serif';
    ctx.fillStyle = '#040C06';
    ctx.letterSpacing = '1px';
    ctx.fillText('“Every ingredient chosen with care.', centerX, 265);
    ctx.fillText('Every preparation guided by tradition.', centerX, 302);
    ctx.fillText('Every meal served with devotion.”', centerX, 340);

    ctx.font = '700 14px "DM Sans", sans-serif';
    ctx.fillStyle = '#6E552D';
    ctx.letterSpacing = '3px';
    ctx.fillText('— MASTER CHEF RAJAN · HERITAGE TOWN', centerX, 385);

    // Table of Chapters
    ctx.fillStyle = '#8C682E';
    ctx.font = '700 13px "DM Sans", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('TABLE OF CHAPTERS', centerX, 465);

    const chapters = [
      { num: 'CHAPTER I', name: 'Tandoori Hearth & Charcoal Kebabs', p: '03' },
      { num: 'CHAPTER II', name: 'Indo-Chinese Wok & Sizzlers', p: '04' },
      { num: 'CHAPTER III', name: 'Royal Awadhi Handi Curries', p: '05' },
      { num: 'CHAPTER IV', name: 'South Indian Heritage & Ghee Roast', p: '06' },
      { num: 'CHAPTER V', name: 'Dum Biryani & Artisanal Tandoor Breads', p: '07' },
      { num: 'CHAPTER VI', name: 'Stone Hearth Pizzas & Pastas', p: '08' },
      { num: 'CHAPTER VII', name: 'Artisanal Coolers & Heritage Shakes', p: '09' },
      { num: 'CHAPTER VIII', name: 'Royal Confections & Epilogue', p: '10' },
    ];

    let cY = 515;
    chapters.forEach((c) => {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#6E552D';
      ctx.font = '700 13px "DM Sans", monospace';
      ctx.letterSpacing = '2px';
      ctx.fillText(c.num, 110, cY);

      ctx.fillStyle = '#030C06';
      ctx.font = '700 18px "Playfair Display", serif';
      ctx.letterSpacing = '0.5px';
      ctx.fillText(c.name, 235, cY);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#8C682E';
      ctx.font = '700 16px "DM Sans", monospace';
      ctx.fillText(c.p, WIDTH - 110, cY);

      // dotted line
      ctx.strokeStyle = 'rgba(140, 104, 46, 0.4)';
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(560, cY - 4);
      ctx.lineTo(WIDTH - 135, cY - 4);
      ctx.stroke();
      ctx.setLineDash([]);

      cY += 48;
    });

    // Page Number
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6E552D';
    ctx.font = '600 14px "DM Sans", serif';
    ctx.fillText('— 02 —', centerX, HEIGHT - 75);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    textures.push(tex);
  }

  // Chapters Data for Pages 3 to 10
  const MENU_PAGES: PageData[] = [
    {
      chapterNumber: 'CHAPTER I',
      title: 'Tandoori Hearth',
      subtitle: 'Clay Pit Roasting & Charcoal Metallurgy',
      items: [
        {
          name: 'Angari Paneer Tikka',
          desc: 'Malai cottage cheese cubes infused with Kashmiri deggi mirch, hung curd, and stone-ground mustard.',
          price: 425,
          isJain: true,
          isSignature: true,
        },
        {
          name: 'Bharwan Tandoori Aloo',
          desc: 'Crisp barrel potatoes stuffed with dry fruits, khoya, crushed paneer, and charred over sal embers.',
          price: 395,
          isJain: true,
        },
        {
          name: 'Dahi Ke Kebab',
          desc: 'Velvety hung curd patties spiced with green cardamom, roasted cumin, and flash-crisped in clarified ghee.',
          price: 385,
          isJain: false,
          isSignature: true,
        },
        {
          name: 'Peshawari Mushroom Tikka',
          desc: 'Plump button mushrooms marinated in tandoori masala, ajwain, and mustard oil smoke.',
          price: 415,
          isJain: false,
        },
        {
          name: 'Broccoli Malai Tikka',
          desc: 'Fresh broccoli florets draped in cashew paste, processed cheese, cream, and mace.',
          price: 445,
          isJain: true,
        },
        {
          name: 'Rasoraa Grand Tandoor Platter',
          desc: 'An imperial tasting assortment of paneer tikka, dahi kebab, stuffed aloo, and malai broccoli.',
          price: 795,
          isJain: true,
          isSignature: true,
        },
      ],
    },
    {
      chapterNumber: 'CHAPTER II',
      title: 'Wok & Sizzlers',
      subtitle: 'High-Flame Botanical Searing & Dim Sum',
      items: [
        {
          name: 'Crispy Lotus Stem Honey Chilli',
          desc: 'Thin lotus root crisps tossed with kashmiri honey, roasted sesame, and scallion curls.',
          price: 395,
          isJain: false,
          isSignature: true,
        },
        {
          name: 'Dim Sum Truffle Platter',
          desc: 'Crystal dumplings with water chestnut, wild mushrooms, and black winter truffle oil drizzle.',
          price: 465,
          isJain: true,
        },
        {
          name: 'Wok Tossed Chilli Paneer',
          desc: 'Crisp cottage cheese batons tossed with bell peppers, green chillies, and dark artisanal soy.',
          price: 425,
          isJain: true,
        },
        {
          name: 'Burnt Garlic Vegetable Noodles',
          desc: 'Hand-pulled wheat noodles tossed in high-flame wok with roasted golden garlic and garden greens.',
          price: 345,
          isJain: false,
        },
        {
          name: 'Imperial Sizzling Rice Platter',
          desc: 'Smoked jasmine rice with exotic wok vegetables, baby corn, water chestnuts, and five-spice gravy.',
          price: 475,
          isJain: true,
          isSignature: true,
        },
      ],
    },
    {
      chapterNumber: 'CHAPTER III',
      title: 'Awadhi Handis',
      subtitle: '16-Hour Earthenware Charcoal Simmer',
      items: [
        {
          name: 'Paneer Lababdar',
          desc: 'Cottage cheese simmered in a velvet gravy of San Marzano tomatoes, cashews, and grated paneer.',
          price: 445,
          isJain: true,
          isSignature: true,
        },
        {
          name: 'Handi Dal Rasoraa',
          desc: 'Urad lentils slow-cooked for 16 hours over wood charcoal, enriched with churned butter and cream.',
          price: 395,
          isJain: true,
          isSignature: true,
        },
        {
          name: 'Dum Aloo Kashmiri',
          desc: 'Baby potatoes stuffed with paneer and dried plums, simmered in a rich yoghurt and fennel gravy.',
          price: 415,
          isJain: true,
        },
        {
          name: 'Nizami Malai Kofta',
          desc: 'Silken paneer and mawa dumplings gently rested in a fragrant white cashew and melon seed korma.',
          price: 455,
          isJain: true,
        },
        {
          name: 'Methi Matar Malai',
          desc: 'Fresh fenugreek leaves and sweet green peas folded in luscious clotted cream and fragrant mace.',
          price: 425,
          isJain: true,
        },
      ],
    },
    {
      chapterNumber: 'CHAPTER IV',
      title: 'South Heritage',
      subtitle: 'Bilona Ghee Roasts & Coastal Specialties',
      items: [
        {
          name: 'Ghee Podi Roast Dosa',
          desc: 'Crisp fermented crepe roasted in bilona cow ghee, dusted with heritage gun powder podi.',
          price: 265,
          isJain: true,
          isSignature: true,
        },
        {
          name: 'Mysore Masala Special Dosa',
          desc: 'Golden dosa spread with spicy red garlic-byadgi chilli chutney and seasoned potato mash.',
          price: 285,
          isJain: false,
        },
        {
          name: 'Kariveppilai Paneer Varuval',
          desc: 'Succulent cottage cheese cubes pan-tossed in cold-pressed coconut oil, fresh curry leaves, and black pepper.',
          price: 395,
          isJain: true,
          isSignature: true,
        },
        {
          name: 'Malabar Parotta with Kurma',
          desc: 'Flaky layered Kerala parottas paired with rich coconut milk and vegetable stew.',
          price: 345,
          isJain: false,
        },
        {
          name: 'Rasam Vadai Royal Presentation',
          desc: 'Crisp medu vada immersed in piping hot tomato and black pepper rasam infused with asafoetida.',
          price: 225,
          isJain: true,
        },
      ],
    },
    {
      chapterNumber: 'CHAPTER V',
      title: 'Dum Biryani & Breads',
      subtitle: 'Parda Earthenware & Tandoor Metallurgy',
      items: [
        {
          name: 'Awadhi Subz Dum Biryani',
          desc: 'Long-grain basmati, exotic vegetables, and saffron milk dum-sealed under dough crust.',
          price: 445,
          isJain: true,
          isSignature: true,
        },
        {
          name: 'Zafrani Paneer Pulao',
          desc: 'Aged dehradun basmati rice delicately infused with pure Kashmiri saffron strands and fresh paneer.',
          price: 415,
          isJain: true,
        },
        {
          name: 'Truffle Oil Garlic Naan',
          desc: 'Artisanal leavened bread baked on clay tandoor walls, brushed with butter and white truffle extract.',
          price: 165,
          isJain: false,
          isSignature: true,
        },
        {
          name: 'Amritsari Chur Chur Kulcha',
          desc: 'Flaky layered bread stuffed with spiced cottage cheese and herbs, crushed with bilona ghee.',
          price: 185,
          isJain: true,
        },
        {
          name: 'Laccha Paratha & Missi Roti',
          desc: 'Spiral layered whole wheat bread and gram flour roti scented with ajwain and kasoori methi.',
          price: 125,
          isJain: true,
        },
      ],
    },
    {
      chapterNumber: 'CHAPTER VI',
      title: 'Stone Hearth Hearth',
      subtitle: 'Artisanal Italian Pizzas & Pastas',
      items: [
        {
          name: 'Margherita Rustica San Marzano',
          desc: 'Double zero flour hand-stretched crust, crushed San Marzano DOP tomatoes, fresh fior di latte, and basil.',
          price: 495,
          isJain: true,
          isSignature: true,
        },
        {
          name: 'Truffle & Wild Funghi Pizza',
          desc: 'White base with portobello, button mushrooms, mozzarella di bufala, and black truffle drizzle.',
          price: 575,
          isJain: false,
          isSignature: true,
        },
        {
          name: 'Penne Rosa Pomodoro',
          desc: 'Al dente penne in a pink blush sauce of ripe plum tomatoes, parmigiano, and velvety mascarpone.',
          price: 465,
          isJain: true,
        },
        {
          name: 'Gnocchi al Pesto Genovese',
          desc: 'Pillowy potato gnocchi tossed in fresh sweet basil pesto, toasted pine nuts, and extra virgin olive oil.',
          price: 485,
          isJain: false,
        },
      ],
    },
    {
      chapterNumber: 'CHAPTER VII',
      title: 'Elixirs & Shakes',
      subtitle: 'Hand-Muddled Coolers & Botanical Infusions',
      items: [
        {
          name: 'Royal Saffron Badam Thandai',
          desc: 'Stone-ground almond paste, pistachios, green cardamom, fennel seeds, and Kashmiri saffron milk.',
          price: 295,
          isJain: true,
          isSignature: true,
        },
        {
          name: 'Gandharaj Gondhoraj Lime Cooler',
          desc: 'Aromatic kaffir and gondhoraj lime muddled with mint leaves, rock salt, and sparkling soda.',
          price: 245,
          isJain: true,
        },
        {
          name: 'Jamun Kala Khatta Smoked Salt',
          desc: 'Wild Indian black plum reduction, roasted cumin, smoked Himalayan rock salt, and crushed ice.',
          price: 265,
          isJain: true,
          isSignature: true,
        },
        {
          name: 'Kesar Pista Rose Falooda',
          desc: 'Layered rabdi, sabja seeds, silky vermicelli, rose syrup, and artisanal saffron pistachio kulfi.',
          price: 325,
          isJain: true,
        },
        {
          name: 'Pondicherry Spiced Filter Kaapi',
          desc: 'Freshly roasted plantation peaberry decoction frothed with boiled full-cream milk in brass dabarah.',
          price: 165,
          isJain: true,
        },
      ],
    },
    {
      chapterNumber: 'CHAPTER VIII',
      title: 'Royal Confections',
      subtitle: 'Heritage Sweets & Epilogue',
      items: [
        {
          name: 'Shahi Malpua with Rabdi',
          desc: 'Cardamom-scented pancakes steeped in saffron syrup, served with slow-reduced lachha rabdi.',
          price: 325,
          isJain: true,
          isSignature: true,
        },
        {
          name: 'Tender Coconut Elaneer Payasam',
          desc: 'Young coastal coconut pulp and water simmered with milk, jaggery, cardamom, and toasted cashews.',
          price: 295,
          isJain: true,
          isSignature: true,
        },
        {
          name: 'Kesari Rasmalai Terrine',
          desc: 'Spongy chenna discs soaked in clotted saffron milk, layered with pistachio crumble and gold leaf.',
          price: 345,
          isJain: true,
        },
        {
          name: 'Baked Gulab Jamun Tart',
          desc: 'Warm khoya dumplings baked inside a buttery tart shell, drizzled with rose water glaze.',
          price: 295,
          isJain: true,
        },
      ],
    },
  ];

  // Render Pages 3 through 10
  MENU_PAGES.forEach((pageData, idx) => {
    const pageNum = idx + 3;
    const isLeftPage = pageNum % 2 === 0;
    const { canvas, ctx } = createBaseCanvas();
    drawParchmentBackground(ctx, isLeftPage);

    ctx.textAlign = 'center';
    const centerX = WIDTH * 0.5;

    // Chapter Header
    ctx.fillStyle = '#8C682E';
    ctx.font = '700 14px "DM Sans", monospace';
    ctx.letterSpacing = '5px';
    ctx.fillText(pageData.chapterNumber || '', centerX, 115);

    ctx.fillStyle = '#030C06';
    ctx.font = '700 42px "Playfair Display", "Cinzel", serif';
    ctx.letterSpacing = '3px';
    ctx.fillText(pageData.title, centerX, 160);

    ctx.fillStyle = '#5A452C';
    ctx.font = 'italic 600 17px "Playfair Display", "Georgia", serif';
    ctx.letterSpacing = '1px';
    ctx.fillText(pageData.subtitle, centerX, 190);

    // Decorative rule
    ctx.strokeStyle = '#8C682E';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX - 100, 215);
    ctx.lineTo(centerX + 100, 215);
    ctx.stroke();

    // Dish List
    let itemY = 265;
    const items = pageData.items || [];
    const itemSpacing = items.length > 5 ? 175 : 195;

    items.forEach((item) => {
      // Dish Name - Bold & Clear
      ctx.textAlign = 'left';
      ctx.fillStyle = '#030C06';
      ctx.font = '700 24px "Playfair Display", "Times New Roman", serif';
      ctx.letterSpacing = '0.5px';
      ctx.fillText(item.name, 95, itemY);

      // Signature / Jain indicators
      let badgeX = 95 + ctx.measureText(item.name).width + 12;
      if (item.isSignature) {
        ctx.fillStyle = '#8C682E';
        ctx.font = '700 11px "DM Sans", sans-serif';
        ctx.letterSpacing = '1.5px';
        ctx.fillText('SIGNATURE', badgeX, itemY - 2);
        badgeX += 85;
      }
      if (item.isJain) {
        drawJainLeaf(ctx, badgeX + 8, itemY - 5);
      }

      // Price in INR - Bold Gold
      ctx.textAlign = 'right';
      ctx.fillStyle = '#8C682E';
      ctx.font = '700 23px "DM Sans", monospace';
      ctx.letterSpacing = '1px';
      ctx.fillText(`₹${item.price}`, WIDTH - 95, itemY);

      // Description (wrapped) - Crisp High Contrast
      ctx.textAlign = 'left';
      ctx.fillStyle = '#0B1710';
      ctx.font = '500 16px "DM Sans", -apple-system, sans-serif';
      ctx.letterSpacing = '0.3px';

      const maxDescWidth = WIDTH - 200;
      const words = item.desc.split(' ');
      let line = '';
      let descY = itemY + 24;

      words.forEach((word) => {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxDescWidth && line !== '') {
          ctx.fillText(line, 95, descY);
          line = word + ' ';
          descY += 22;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line, 95, descY);

      itemY += itemSpacing;
    });

    // Page Number
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6E552D';
    ctx.font = '600 14px "DM Sans", serif';
    ctx.fillText(`— 0${pageNum} —`, centerX, HEIGHT - 75);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    textures.push(tex);
  });

  // Page 11: Patron Privileges & Heritage Town Map
  {
    const { canvas, ctx } = createBaseCanvas();
    drawParchmentBackground(ctx, true);

    ctx.textAlign = 'center';
    const centerX = WIDTH * 0.5;

    ctx.fillStyle = '#8C682E';
    ctx.font = '700 14px "DM Sans", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('THE PATRON GUILD', centerX, 145);

    ctx.fillStyle = '#030C06';
    ctx.font = '700 42px "Playfair Display", "Cinzel", serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('Privileges & Protocol', centerX, 195);

    ctx.strokeStyle = '#8C682E';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX - 90, 225);
    ctx.lineTo(centerX + 90, 225);
    ctx.stroke();

    // Features
    const privileges = [
      {
        title: 'Strict Jain Hearth Decree',
        desc: 'Zero onion, zero garlic, zero root vegetables. Dedicated cookware and sanctified prep counters.',
      },
      {
        title: 'Pure Bilona Ghee Preparation',
        desc: 'Traditional Vedic churned A2 cow ghee exclusively utilized for our Awadhi curries and dosas.',
      },
      {
        title: 'Private Imperial Salons',
        desc: 'Exclusive private dining halls accommodating up to 60 esteemed patrons for celebratory feasts.',
      },
      {
        title: 'Concierge Reservations',
        desc: 'Table reservations honored with bespoke customized floral table setups upon advance request.',
      },
    ];

    let pY = 300;
    privileges.forEach((p) => {
      ctx.fillStyle = '#8C682E';
      ctx.font = '18px serif';
      ctx.fillText('❖', centerX, pY);

      ctx.fillStyle = '#030C06';
      ctx.font = '700 22px "Playfair Display", serif';
      ctx.letterSpacing = '0.5px';
      ctx.fillText(p.title, centerX, pY + 32);

      ctx.fillStyle = '#0A170F';
      ctx.font = '500 16px "DM Sans", sans-serif';
      ctx.fillText(p.desc, centerX, pY + 58);

      pY += 128;
    });

    // Address & Contact
    ctx.strokeStyle = 'rgba(140, 104, 46, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(centerX - 190, HEIGHT - 275, 380, 105);

    ctx.fillStyle = '#8C682E';
    ctx.font = '700 12px "DM Sans", monospace';
    ctx.letterSpacing = '3px';
    ctx.fillText('HERITAGE TOWN SANCTUARY', centerX, HEIGHT - 245);

    ctx.fillStyle = '#030C06';
    ctx.font = '600 14px "DM Sans", sans-serif';
    ctx.fillText('39, Ambalathadayar Madam St, Pondicherry — 605 001', centerX, HEIGHT - 220);

    ctx.fillStyle = '#8C682E';
    ctx.font = '700 17px "DM Sans", monospace';
    ctx.fillText('+91 94845 94845', centerX, HEIGHT - 192);

    ctx.fillStyle = '#6E552D';
    ctx.font = '600 14px "DM Sans", serif';
    ctx.fillText('— 11 —', centerX, HEIGHT - 75);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    textures.push(tex);
  }

  // Page 12: Back Cover (Emerald Leather)
  {
    const { canvas, ctx } = createBaseCanvas();
    drawCoverBackground(ctx);

    const centerX = WIDTH * 0.5;
    const centerY = HEIGHT * 0.46;

    // Central Emblem
    ctx.textAlign = 'center';
    ctx.fillStyle = '#C5A880';
    ctx.font = '40px serif';
    ctx.fillText('❖', centerX, centerY - 60);

    ctx.fillStyle = '#E3C99B';
    ctx.font = '300 36px "Cinzel", "Playfair Display", serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('R A S O R A A', centerX, centerY);

    ctx.fillStyle = '#C5A880';
    ctx.font = '400 13px "DM Sans", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('PONDICHERRY · HERITAGE TOWN', centerX, centerY + 36);

    ctx.strokeStyle = '#C5A880';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX - 80, centerY + 65);
    ctx.lineTo(centerX + 80, centerY + 65);
    ctx.stroke();

    ctx.fillStyle = '#FAF7EE';
    ctx.font = 'italic 300 16px "Playfair Display", serif';
    ctx.fillText('“Devotion on Every Plate. Heritage in Every Bite.”', centerX, centerY + 110);

    // Bottom Credentials
    ctx.fillStyle = '#A38965';
    ctx.font = '400 11px "DM Sans", monospace';
    ctx.letterSpacing = '2.5px';
    ctx.fillText('39, AMBALATHADAYAR MADAM ST · 11.9360° N, 79.8336° E', centerX, HEIGHT - 120);
    ctx.fillText('RESERVATIONS: +91 94845 94845', centerX, HEIGHT - 98);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    textures.push(tex);
  }

  return textures;
}
