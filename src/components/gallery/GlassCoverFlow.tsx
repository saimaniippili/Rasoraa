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
  const boundedInitial = Math.min(Math.max(initialIndex, 0), Math.max(safeItems.length - 1, 0));

  const [activeIndex, setActiveIndex] = useState(boundedInitial);
  const [position, setPosition] = useState(boundedInitial);

  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const positionRef = useRef(boundedInitial);
  const targetRef = useRef(boundedInitial);
  const activeIndexRef = useRef(boundedInitial);
  const animationFrame = useRef<number | null>(null);
  const settleTimer = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const lastPointerX = useRef<number | null>(null);
  const pointerDownRef = useRef<{ x: number; y: number; time: number; pointerId: number } | null>(null);
  const isDraggingRef = useRef(false);
  const dragDirectionRef = useRef<'horizontal' | 'vertical' | null>(null);

  const wrapIndex = useCallback(
    (index: number) => {
      const total = safeItems.length || 1;
      return ((index % total) + total) % total;
    },
    [safeItems.length]
  );

  const wrapPosition = useCallback(
    (nextPosition: number) => {
      const total = safeItems.length || 1;
      return ((nextPosition % total) + total) % total;
    },
    [safeItems.length]
  );

  // Responsive 3D Apple-style Cover Flow calculations
  const styleCards = useCallback(
    (nextPosition = positionRef.current, pointer = pointerRef.current) => {
      const total = safeItems.length || 1;
      const stageW = stageRef.current?.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1200);
      const isMobile = stageW < 640;
      const isTablet = stageW >= 640 && stageW < 1024;

      // Responsive spacing parameters proportional to 270px card width
      const step1 = isMobile ? 140 : isTablet ? 190 : 240;
      const step2 = isMobile ? 50 : isTablet ? 74 : 96;
      const zBase = isMobile ? 90 : 130;
      const zStep = isMobile ? 28 : 36;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const raw = index - nextPosition;
        const offset = ((((raw + total / 2) % total) + total) % total) - total / 2;
        const side = offset < 0 ? -1 : 1;
        const abs = Math.abs(offset);
        const nearCenter = abs < 0.5;
        const sideProgress = Math.min(abs, 1);
        const centerEase = 1 - sideProgress;
        const breathe = centerEase * centerEase * (3 - 2 * centerEase);
        // Hermite smoothstep curve for buttery 120fps rotation without angle kinks
        const rotateProgress = sideProgress * sideProgress * (3 - 2 * sideProgress);
        const extraTilt = Math.max(0, abs - 1) * 1.5;

        const xBase = abs < 1 ? abs * step1 : step1 + (abs - 1) * step2;
        const x = side * xBase + pointer.x * (nearCenter ? 12 : 14);
        const y = abs * 4 + pointer.y * (nearCenter ? 5 : 6);
        const rotate = side * (-58 * rotateProgress - extraTilt) + pointer.x * (nearCenter ? -1.5 : -1.0);
        const scale = 0.90 + breathe * 0.12 - Math.max(0, abs - 1) * 0.02;
        const opacity = abs > 5 ? 0 : Math.max(0.28, 1 - abs * 0.08);
        const blur = abs > 4 ? 'blur(4px)' : abs > 3 ? 'blur(2px)' : 'none';

        card.style.transform = `translate3d(${x}px, ${y}px, ${zBase - abs * zStep}px) rotateY(${rotate}deg) scale(${scale})`;
        card.style.zIndex = String(60 - Math.round(abs));
        card.style.filter = blur;
        card.style.opacity = String(opacity);
      });
    },
    [safeItems.length]
  );

  const updateActiveIndex = useCallback(
    (nextPosition: number) => {
      const nextIndex = wrapIndex(Math.round(nextPosition));
      if (activeIndexRef.current === nextIndex) return;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    },
    [wrapIndex]
  );

  const syncPosition = useCallback(
    (nextPosition: number, commitState = true) => {
      const wrapped = wrapPosition(nextPosition);
      positionRef.current = wrapped;
      targetRef.current = wrapped;
      styleCards(wrapped);
      updateActiveIndex(wrapped);
      if (commitState) setPosition(wrapped);
    },
    [styleCards, updateActiveIndex, wrapPosition]
  );

  const animateToTarget = useCallback(() => {
    if (animationFrame.current !== null) return;
    const tick = () => {
      const total = safeItems.length || 1;
      let delta = targetRef.current - positionRef.current;
      if (delta > total / 2) delta -= total;
      if (delta < -total / 2) delta += total;
      if (Math.abs(delta) < 0.002) {
        syncPosition(targetRef.current);
        animationFrame.current = null;
        return;
      }
      const next = wrapPosition(positionRef.current + delta * 0.11);
      positionRef.current = next;
      styleCards(next);
      animationFrame.current = window.requestAnimationFrame(tick);
    };
    animationFrame.current = window.requestAnimationFrame(tick);
  }, [safeItems.length, styleCards, syncPosition, wrapPosition]);

  const settle = useCallback(() => {
    targetRef.current = wrapPosition(Math.round(positionRef.current));
    animateToTarget();
  }, [animateToTarget, wrapPosition]);

  const scheduleSettle = useCallback(
    (delay = 130) => {
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
      settleTimer.current = window.setTimeout(() => {
        settleTimer.current = null;
        settle();
      }, delay);
    },
    [settle]
  );

  const push = useCallback(
    (delta: number) => {
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
      if (settleTimer.current !== null) {
        window.clearTimeout(settleTimer.current);
        settleTimer.current = null;
      }
      syncPosition(positionRef.current + delta, false);
    },
    [syncPosition]
  );

  const handleNext = () => {
    targetRef.current = wrapPosition(Math.round(positionRef.current + 1));
    animateToTarget();
  };

  const handlePrev = () => {
    targetRef.current = wrapPosition(Math.round(positionRef.current - 1));
    animateToTarget();
  };

  // Window resize observer
  useEffect(() => {
    const handleResize = () => {
      styleCards(positionRef.current, pointerRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [styleCards]);

  useEffect(() => {
    syncPosition(boundedInitial);
    return () => {
      if (animationFrame.current !== null) window.cancelAnimationFrame(animationFrame.current);
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    };
  }, [boundedInitial, syncPosition]);

  const active = safeItems[activeIndex];

  return (
    <section className="rasoraa-cover-flow" aria-label="Visual Chronicles Cover Flow">
      <div
        ref={stageRef}
        className="rasoraa-cover-flow__stage"
        role="region"
        tabIndex={0}
        onWheel={(event) => {
          const absX = Math.abs(event.deltaX);
          const absY = Math.abs(event.deltaY);

          // Horizontal trackpad swipe or Shift + scroll
          if (absX > absY || event.shiftKey) {
            event.preventDefault();
            const wheelDelta = event.deltaX || event.deltaY;
            push(clamp(wheelDelta, -240, 240) / 230);
            scheduleSettle(170);
          } else if (absY < 25) {
            // Gentle scroll: prevent jumpy page skips
            push(clamp(event.deltaY, -120, 120) / 320);
            scheduleSettle(170);
          }
        }}
        onPointerDown={(event) => {
          pointerDownRef.current = {
            x: event.clientX,
            y: event.clientY,
            time: performance.now(),
            pointerId: event.pointerId,
          };
          lastPointerX.current = event.clientX;
          isDraggingRef.current = true;
          dragDirectionRef.current = null;
        }}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          pointerRef.current = {
            x: clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1),
            y: clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1),
          };
          styleCards(positionRef.current, pointerRef.current);

          if (!isDraggingRef.current || pointerDownRef.current === null) return;
          if (event.pointerId !== pointerDownRef.current.pointerId) return;

          const dx = event.clientX - pointerDownRef.current.x;
          const dy = event.clientY - pointerDownRef.current.y;

          if (dragDirectionRef.current === null) {
            if (Math.hypot(dx, dy) > 7) {
              if (Math.abs(dx) > Math.abs(dy)) {
                dragDirectionRef.current = 'horizontal';
                try {
                  event.currentTarget.setPointerCapture(event.pointerId);
                } catch (_) {}
              } else {
                dragDirectionRef.current = 'vertical';
                isDraggingRef.current = false;
                return;
              }
            } else {
              return;
            }
          }

          if (dragDirectionRef.current === 'horizontal') {
            if (lastPointerX.current !== null) {
              const delta = event.clientX - lastPointerX.current;
              if (Math.abs(delta) > 0.3) {
                const stageW = rect.width || 1000;
                const sensitivity = stageW < 640 ? 130 : 165;
                push(-delta / sensitivity);
                scheduleSettle(130);
              }
            }
            lastPointerX.current = event.clientX;
          }
        }}
        onPointerUp={(event) => {
          const down = pointerDownRef.current;
          const movedFar = down && Math.hypot(event.clientX - down.x, event.clientY - down.y) > 10;

          isDraggingRef.current = false;
          dragDirectionRef.current = null;
          pointerDownRef.current = null;
          lastPointerX.current = null;

          try {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          } catch (_) {}

          if (movedFar) {
            scheduleSettle(60);
          }
        }}
        onPointerLeave={() => {
          lastPointerX.current = null;
          isDraggingRef.current = false;
          dragDirectionRef.current = null;
          pointerDownRef.current = null;
          pointerRef.current = { x: 0, y: 0 };
          styleCards(positionRef.current, pointerRef.current);
          scheduleSettle(60);
        }}
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
            const raw = index - position;
            const offset =
              ((((raw + safeItems.length / 2) % safeItems.length) + safeItems.length) % safeItems.length) -
              safeItems.length / 2;
            const abs = Math.abs(offset);
            const nearCenter = abs < 0.5;

            return (
              <button
                key={`${item.id}-${index}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className="rasoraa-cover-card"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (nearCenter) {
                    onSelect?.(item, index);
                  } else {
                    targetRef.current = index;
                    animateToTarget();
                  }
                }}
                aria-label={`View ${item.title}`}
              >
                <GlassCoverCard item={item} active={nearCenter} />
              </button>
            );
          })}
        </div>

        {/* Minimal Navigation Arrows */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="rasoraa-cover-flow__arrow rasoraa-cover-flow__arrow--prev"
          aria-label="Previous card"
        >
          <ChevronLeft size={22} />
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
          <ChevronRight size={22} />
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
