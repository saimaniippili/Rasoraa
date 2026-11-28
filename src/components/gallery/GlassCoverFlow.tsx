import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import './glass-cover-flow.css';

export interface CoverFlowItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  image: string;
  palette?: [string, string] | string[];
  isJain?: boolean;
  isSignature?: boolean;
}

interface GlassCoverFlowProps {
  items: CoverFlowItem[];
  initialIndex?: number;
  onSelect?: (item: CoverFlowItem, index: number) => void;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const GlassCoverFlow: React.FC<GlassCoverFlowProps> = ({
  items,
  initialIndex = 0,
  onSelect,
}) => {
  const safeItems = useMemo(() => items.filter(Boolean), [items]);
  const total = safeItems.length || 1;
  const boundedInitial = Math.min(Math.max(initialIndex, 0), Math.max(total - 1, 0));

  const [activeIndex, setActiveIndex] = useState(boundedInitial);

  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  
  // Continuous position and target — avoid wrapping these directly to prevent sign flips
  const currentPos = useRef<number>(boundedInitial);
  const targetPos = useRef<number>(boundedInitial);
  const velocity = useRef<number>(0);
  const isAnimating = useRef<boolean>(false);
  const animFrameId = useRef<number | null>(null);

  // Pointer & Touch tracking
  const pointerCoord = useRef({ x: 0, y: 0 });
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchPrev = useRef<{ x: number; time: number } | null>(null);
  const isDragging = useRef<boolean>(false);
  const hasMovedSignificant = useRef<boolean>(false);

  // Shortest modular difference from a to b in a circular array of size N
  const getShortestDelta = useCallback((from: number, to: number, n: number) => {
    let diff = (to - from) % n;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  }, []);

  // Normalizes an index to [0, total - 1]
  const normalizeIndex = useCallback((idx: number, n: number) => {
    return ((Math.round(idx) % n) + n) % n;
  }, []);

  // Update card 3D transforms based on continuous position
  const renderCards = useCallback(
    (pos: number, pointer = pointerCoord.current) => {
      const stageEl = stageRef.current;
      const stageW = stageEl ? stageEl.clientWidth : (typeof window !== 'undefined' ? window.innerWidth : 1000);
      
      const isMobile = stageW < 640;
      const isTablet = stageW >= 640 && stageW < 1024;

      // Proportional spacing tuned for tablet and mobile
      const step1 = isMobile ? 125 : isTablet ? 175 : 230;
      const step2 = isMobile ? 45 : isTablet ? 65 : 90;
      const zBase = isMobile ? 70 : isTablet ? 100 : 130;
      const zStep = isMobile ? 22 : isTablet ? 28 : 34;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        // Calculate offset of this card relative to pos in circular range [-total/2, total/2]
        const raw = index - pos;
        let offset = ((raw % total) + total) % total;
        if (offset > total / 2) offset -= total;

        const side = offset < 0 ? -1 : 1;
        const abs = Math.abs(offset);
        const nearCenter = abs < 0.5;

        // Smooth Hermite interpolation curves
        const sideProgress = Math.min(abs, 1);
        const centerEase = 1 - sideProgress;
        const breathe = centerEase * centerEase * (3 - 2 * centerEase);
        const rotateProgress = sideProgress * sideProgress * (3 - 2 * sideProgress);
        const extraTilt = Math.max(0, abs - 1) * 1.5;

        const xBase = abs < 1 ? abs * step1 : step1 + (abs - 1) * step2;
        const x = side * xBase + pointer.x * (nearCenter ? 10 : 12);
        const y = abs * 3.5 + pointer.y * (nearCenter ? 4 : 5);
        const rotate = side * (-56 * rotateProgress - extraTilt) + pointer.x * (nearCenter ? -1.2 : -0.8);
        const scale = 0.90 + breathe * 0.12 - Math.max(0, abs - 1) * 0.02;
        const opacity = abs > 4.5 ? 0 : Math.max(0.28, 1 - abs * 0.11);
        const blur = abs > 3.5 ? 'blur(3px)' : abs > 2.5 ? 'blur(1.5px)' : 'none';

        card.style.transform = `translate3d(${x}px, ${y}px, ${zBase - abs * zStep}px) rotateY(${rotate}deg) scale(${scale})`;
        card.style.zIndex = String(Math.max(1, 50 - Math.round(abs * 5)));
        card.style.filter = blur;
        card.style.opacity = String(opacity);
        card.style.pointerEvents = abs > 3.5 ? 'none' : 'auto';
      });
    },
    [total]
  );

  // Smooth RAF animation engine with spring physics
  const startAnimation = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const tick = () => {
      // Find delta from currentPos to targetPos
      const delta = targetPos.current - currentPos.current;

      // Friction / spring interpolation
      if (Math.abs(delta) < 0.0015 && Math.abs(velocity.current) < 0.001) {
        currentPos.current = targetPos.current;
        renderCards(currentPos.current);
        const newActive = normalizeIndex(currentPos.current, total);
        setActiveIndex(newActive);
        isAnimating.current = false;
        animFrameId.current = null;
        return;
      }

      // Spring acceleration
      const springK = 0.14;
      const friction = 0.82;
      velocity.current = velocity.current * friction + delta * springK;
      currentPos.current += velocity.current;

      renderCards(currentPos.current);

      const activeCandidate = normalizeIndex(currentPos.current, total);
      setActiveIndex((prev) => (prev !== activeCandidate ? activeCandidate : prev));

      animFrameId.current = window.requestAnimationFrame(tick);
    };

    animFrameId.current = window.requestAnimationFrame(tick);
  }, [normalizeIndex, renderCards, total]);

  // Navigate directly to an absolute target index
  const goToIndex = useCallback(
    (index: number) => {
      const shortestDelta = getShortestDelta(currentPos.current, index, total);
      targetPos.current = currentPos.current + shortestDelta;
      velocity.current = 0;
      startAnimation();
    },
    [getShortestDelta, startAnimation, total]
  );

  const handleNext = useCallback(() => {
    targetPos.current = Math.round(currentPos.current) + 1;
    velocity.current = 0;
    startAnimation();
  }, [startAnimation]);

  const handlePrev = useCallback(() => {
    targetPos.current = Math.round(currentPos.current) - 1;
    velocity.current = 0;
    startAnimation();
  }, [startAnimation]);

  // Immediate positional drag update (1:1 finger tracking)
  const applyDragOffset = useCallback(
    (deltaX: number) => {
      const stageW = stageRef.current?.clientWidth || 800;
      // Sensitivity tuned so a natural swipe advances 1 card easily
      const sensitivity = stageW < 640 ? 170 : stageW < 1024 ? 220 : 260;
      const posDelta = -deltaX / sensitivity;

      currentPos.current += posDelta;
      targetPos.current = currentPos.current;
      velocity.current = posDelta;
      renderCards(currentPos.current);

      const activeCandidate = normalizeIndex(currentPos.current, total);
      setActiveIndex((prev) => (prev !== activeCandidate ? activeCandidate : prev));
    },
    [normalizeIndex, renderCards, total]
  );

  // Settle on nearest card with release momentum
  const settleWithMomentum = useCallback(
    (releaseVelocity = 0) => {
      // Predict target based on release flick velocity
      let target = currentPos.current + releaseVelocity * 3.5;
      target = Math.round(target);
      targetPos.current = target;
      startAnimation();
    },
    [startAnimation]
  );

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      renderCards(currentPos.current, pointerCoord.current);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [renderCards]);

  // Initialize
  useEffect(() => {
    currentPos.current = boundedInitial;
    targetPos.current = boundedInitial;
    renderCards(boundedInitial);
    return () => {
      if (animFrameId.current !== null) {
        window.cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [boundedInitial, renderCards]);

  const active = safeItems[activeIndex];

  return (
    <section className="rasoraa-cover-flow" aria-label="Visual Chronicles Cover Flow">
      <div
        ref={stageRef}
        className="rasoraa-cover-flow__stage"
        role="region"
        tabIndex={0}
        // Wheel & Trackpad
        onWheel={(event) => {
          const absX = Math.abs(event.deltaX);
          const absY = Math.abs(event.deltaY);

          if (absX > absY || event.shiftKey) {
            event.preventDefault();
            const wheelDelta = event.deltaX || event.deltaY;
            const delta = clamp(wheelDelta, -180, 180) / 200;
            currentPos.current += delta;
            targetPos.current = Math.round(currentPos.current);
            startAnimation();
          }
        }}
        // Pointer down
        onPointerDown={(event) => {
          // If clicked on an arrow button, don't initiate stage drag
          if ((event.target as HTMLElement).closest('.rasoraa-cover-flow__arrow')) {
            return;
          }

          touchStart.current = {
            x: event.clientX,
            y: event.clientY,
            time: performance.now(),
          };
          touchPrev.current = {
            x: event.clientX,
            time: performance.now(),
          };
          isDragging.current = true;
          hasMovedSignificant.current = false;

          if (animFrameId.current !== null) {
            window.cancelAnimationFrame(animFrameId.current);
            animFrameId.current = null;
            isAnimating.current = false;
          }

          try {
            (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
          } catch (_) {}
        }}
        // Pointer move
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          pointerCoord.current = {
            x: clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1),
            y: clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1),
          };

          if (!isDragging.current || !touchStart.current) {
            // Still update subtle tilt on desktop hover
            renderCards(currentPos.current, pointerCoord.current);
            return;
          }

          const dxTotal = event.clientX - touchStart.current.x;
          const dyTotal = event.clientY - touchStart.current.y;

          // Detect intentional swipe
          if (!hasMovedSignificant.current) {
            if (Math.hypot(dxTotal, dyTotal) > 6) {
              hasMovedSignificant.current = true;
            }
          }

          if (touchPrev.current) {
            const dx = event.clientX - touchPrev.current.x;
            const dt = Math.max(1, performance.now() - touchPrev.current.time);
            velocity.current = -dx / dt; // pixels per ms
            applyDragOffset(dx);
          }

          touchPrev.current = {
            x: event.clientX,
            time: performance.now(),
          };
        }}
        // Pointer up
        onPointerUp={(event) => {
          if (!isDragging.current) return;
          isDragging.current = false;

          try {
            if ((event.currentTarget as HTMLElement).hasPointerCapture(event.pointerId)) {
              (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
            }
          } catch (_) {}

          let flickVelocity = 0;
          if (touchPrev.current && touchStart.current) {
            const elapsed = performance.now() - touchStart.current.time;
            const dist = event.clientX - touchStart.current.x;
            if (elapsed < 350 && Math.abs(dist) > 25) {
              // Valid flick gesture
              flickVelocity = -Math.sign(dist) * Math.min(1.2, Math.abs(dist) / 120);
            }
          }

          settleWithMomentum(flickVelocity);
          touchStart.current = null;
          touchPrev.current = null;
        }}
        // Pointer cancel
        onPointerCancel={(event) => {
          isDragging.current = false;
          try {
            if ((event.currentTarget as HTMLElement).hasPointerCapture(event.pointerId)) {
              (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
            }
          } catch (_) {}
          settleWithMomentum(0);
          touchStart.current = null;
          touchPrev.current = null;
        }}
        // Keyboard accessibility
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            handleNext();
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            handlePrev();
          } else if (event.key === 'Enter' && active) {
            event.preventDefault();
            onSelect?.(active, activeIndex);
          }
        }}
      >
        {/* Ambient Glow & Liquid Floor */}
        <div className="rasoraa-cover-flow__ambience" />
        <div className="rasoraa-cover-flow__horizon" />

        {/* 3D Perspective Card Stage */}
        <div className="rasoraa-cover-flow__cards" style={{ perspective: 1800 }}>
          {safeItems.map((item, index) => {
            const raw = index - activeIndex;
            let offset = ((raw % total) + total) % total;
            if (offset > total / 2) offset -= total;
            const nearCenter = Math.abs(offset) < 0.5;

            return (
              <button
                key={`${item.id}-${index}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className={`rasoraa-cover-card ${nearCenter ? 'rasoraa-cover-card--center' : ''}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  // Prevent click action if user was dragging
                  if (hasMovedSignificant.current) return;

                  if (nearCenter) {
                    onSelect?.(item, index);
                  } else {
                    goToIndex(index);
                  }
                }}
                aria-label={`View ${item.title}`}
              >
                <GlassCoverCard item={item} active={nearCenter} />
              </button>
            );
          })}
        </div>

        {/* Minimal Navigation Arrows with High Z-Index & Touch Support */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="rasoraa-cover-flow__arrow rasoraa-cover-flow__arrow--prev"
          aria-label="Previous card"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="rasoraa-cover-flow__arrow rasoraa-cover-flow__arrow--next"
          aria-label="Next card"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

/* ─── Individual Luxury Glass Cover Card ─── */
const GlassCoverCard: React.FC<{ item: CoverFlowItem; active: boolean }> = ({ item, active }) => {
  return (
    <div className={`rasoraa-cover-card__inner ${active ? 'rasoraa-cover-card__inner--active' : ''}`}>
      {/* Glossy Floor Reflection with Mirrored Image */}
      <div className="rasoraa-cover-card__reflection">
        <img src={item.image} alt="" aria-hidden="true" />
      </div>

      {/* Main Glass Face */}
      <div className="rasoraa-cover-card__face">
        {/* Food Image */}
        <img
          src={item.image}
          alt={item.title}
          className="rasoraa-cover-card__image"
          loading="lazy"
        />

        {/* Editorial Vignette Scrim */}
        <div className="rasoraa-cover-card__scrim" />

        {/* Card Content Overlay */}
        <div className="rasoraa-cover-card__content">
          {/* Top Eyebrow & Badges */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#C8A962] uppercase bg-[#070C09]/80 px-2.5 py-1 rounded-full border border-[#C8A962]/30 backdrop-blur-md">
              {item.category}
            </span>

            <div className="flex items-center gap-1.5">
              {item.isJain && (
                <span
                  className="w-4 h-4 rounded-sm border border-[#2E8B4E] bg-black/60 flex items-center justify-center"
                  title="100% Strict Jain Decree"
                >
                  <span className="w-2 h-2 rounded-full bg-[#1B512D]" />
                </span>
              )}
              {item.isSignature && (
                <span
                  className="inline-flex items-center gap-1 text-[9px] font-mono text-[#C8A962] font-bold uppercase tracking-wider bg-black/60 px-1.5 py-0.5 rounded border border-[#C8A962]/40"
                  title="Imperial Signature"
                >
                  <Sparkles size={10} className="text-[#C8A962]" />
                  <span>SIG</span>
                </span>
              )}
            </div>
          </div>

          {/* Bottom Title & Preparation Description */}
          <div className="space-y-1.5 text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#F4F0E6] leading-tight tracking-wide drop-shadow-md">
              {item.title}
            </h3>
            <p className="text-[12px] sm:text-[12.5px] font-sans font-light text-[#D5CDC0] line-clamp-2 leading-relaxed">
              {item.subtitle}
            </p>
          </div>
        </div>

        {/* Diagonal Specular Glass Shine */}
        <div className="rasoraa-cover-card__shine" />
      </div>
    </div>
  );
};
