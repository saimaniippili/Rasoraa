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

  // Continuous position and target — smooth unidirectional flow, zero spring bounce
  const currentPos = useRef<number>(boundedInitial);
  const targetPos = useRef<number>(boundedInitial);
  const isAnimating = useRef<boolean>(false);
  const animFrameId = useRef<number | null>(null);

  // Pointer & Touch tracking
  const pointerCoord = useRef({ x: 0, y: 0 });
  const dragStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const dragPrev = useRef<{ x: number; time: number } | null>(null);
  const isDragging = useRef<boolean>(false);
  const hasMovedSignificant = useRef<boolean>(false);

  // Shortest circular difference from a to b
  const getShortestDelta = useCallback((from: number, to: number, n: number) => {
    let diff = (to - from) % n;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  }, []);

  // Normalize index to [0, total - 1]
  const normalizeIndex = useCallback((idx: number, n: number) => {
    return ((Math.round(idx) % n) + n) % n;
  }, []);

  // 3D Card transforms
  const renderCards = useCallback(
    (pos: number, pointer = pointerCoord.current) => {
      const stageEl = stageRef.current;
      const stageW = stageEl ? stageEl.clientWidth : (typeof window !== 'undefined' ? window.innerWidth : 1000);

      const isMobile = stageW < 640;
      const isTablet = stageW >= 640 && stageW < 1024;

      const step1 = isMobile ? 125 : isTablet ? 175 : 230;
      const step2 = isMobile ? 45 : isTablet ? 65 : 90;
      const zBase = isMobile ? 70 : isTablet ? 100 : 130;
      const zStep = isMobile ? 22 : isTablet ? 28 : 34;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const raw = index - pos;
        let offset = ((raw % total) + total) % total;
        if (offset > total / 2) offset -= total;

        const side = offset < 0 ? -1 : 1;
        const abs = Math.abs(offset);
        const nearCenter = abs < 0.5;

        // Smooth Hermite curves without angle kinks
        const sideProgress = Math.min(abs, 1);
        const centerEase = 1 - sideProgress;
        const breathe = centerEase * centerEase * (3 - 2 * centerEase);
        const rotateProgress = sideProgress * sideProgress * (3 - 2 * sideProgress);
        const extraTilt = Math.max(0, abs - 1) * 1.5;

        const xBase = abs < 1 ? abs * step1 : step1 + (abs - 1) * step2;
        const x = side * xBase + pointer.x * (nearCenter ? 8 : 10);
        const y = abs * 3.5 + pointer.y * (nearCenter ? 3 : 4);
        const rotate = side * (-56 * rotateProgress - extraTilt) + pointer.x * (nearCenter ? -1.0 : -0.6);
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

  // Pure critically-damped smooth glide — ZERO oscillation, ZERO bounce
  const startGlide = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const tick = () => {
      const delta = targetPos.current - currentPos.current;

      // When within sub-pixel threshold, snap to target and finish
      if (Math.abs(delta) < 0.001) {
        currentPos.current = targetPos.current;
        renderCards(currentPos.current);
        const newActive = normalizeIndex(currentPos.current, total);
        setActiveIndex(newActive);
        isAnimating.current = false;
        animFrameId.current = null;
        return;
      }

      // Smooth exponential ease-out: direct unidirectional glide with 0 bounce
      currentPos.current += delta * 0.125;
      renderCards(currentPos.current);

      const activeCandidate = normalizeIndex(currentPos.current, total);
      setActiveIndex((prev) => (prev !== activeCandidate ? activeCandidate : prev));

      animFrameId.current = window.requestAnimationFrame(tick);
    };

    animFrameId.current = window.requestAnimationFrame(tick);
  }, [normalizeIndex, renderCards, total]);

  // Navigate directly to a specific card index
  const goToIndex = useCallback(
    (index: number) => {
      const shortestDelta = getShortestDelta(currentPos.current, index, total);
      targetPos.current = currentPos.current + shortestDelta;
      startGlide();
    },
    [getShortestDelta, startGlide, total]
  );

  // Single smooth glide forward (from left to right)
  const handleNext = useCallback(() => {
    targetPos.current = Math.round(currentPos.current) + 1;
    startGlide();
  }, [startGlide]);

  // Single smooth glide backward (from right to left)
  const handlePrev = useCallback(() => {
    targetPos.current = Math.round(currentPos.current) - 1;
    startGlide();
  }, [startGlide]);

  // Direct 1:1 cursor drag update — flows immediately in cursor direction
  const applyDrag = useCallback(
    (deltaX: number) => {
      const stageW = stageRef.current?.clientWidth || 800;
      const sensitivity = stageW < 640 ? 180 : stageW < 1024 ? 230 : 270;
      const posDelta = -deltaX / sensitivity;

      currentPos.current += posDelta;
      targetPos.current = currentPos.current;
      renderCards(currentPos.current);

      const activeCandidate = normalizeIndex(currentPos.current, total);
      setActiveIndex((prev) => (prev !== activeCandidate ? activeCandidate : prev));
    },
    [normalizeIndex, renderCards, total]
  );

  // Smoothly glide to the card in the direction of the cursor movement (no bouncing)
  const settleInDirection = useCallback(
    (totalDx: number) => {
      let target: number;

      // If dragged significantly left (cursor moved left), flow to next card
      if (totalDx < -24) {
        target = Math.ceil(currentPos.current);
        if (target === Math.round(currentPos.current) && currentPos.current > target - 0.2) {
          target = Math.round(currentPos.current) + 1;
        }
      }
      // If dragged significantly right (cursor moved right), flow to previous card
      else if (totalDx > 24) {
        target = Math.floor(currentPos.current);
        if (target === Math.round(currentPos.current) && currentPos.current < target + 0.2) {
          target = Math.round(currentPos.current) - 1;
        }
      }
      // Minimal drag, snap to nearest
      else {
        target = Math.round(currentPos.current);
      }

      targetPos.current = target;
      startGlide();
    },
    [startGlide]
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
        // Wheel & Horizontal Trackpad Swipe
        onWheel={(event) => {
          const absX = Math.abs(event.deltaX);
          const absY = Math.abs(event.deltaY);

          if (absX > absY || event.shiftKey) {
            event.preventDefault();
            const wheelDelta = event.deltaX || event.deltaY;
            const delta = clamp(wheelDelta, -160, 160) / 200;
            currentPos.current += delta;
            targetPos.current = Math.round(currentPos.current);
            startGlide();
          }
        }}
        // Pointer / Cursor Down
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest('.rasoraa-cover-flow__arrow')) {
            return;
          }

          dragStart.current = {
            x: event.clientX,
            y: event.clientY,
            time: performance.now(),
          };
          dragPrev.current = {
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
        // Pointer / Cursor Move
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          pointerCoord.current = {
            x: clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1),
            y: clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1),
          };

          if (!isDragging.current || !dragStart.current) {
            // Update delicate tilt as cursor moves across the stage
            renderCards(currentPos.current, pointerCoord.current);
            return;
          }

          const dxTotal = event.clientX - dragStart.current.x;
          const dyTotal = event.clientY - dragStart.current.y;

          if (!hasMovedSignificant.current && Math.hypot(dxTotal, dyTotal) > 6) {
            hasMovedSignificant.current = true;
          }

          if (dragPrev.current) {
            const dx = event.clientX - dragPrev.current.x;
            applyDrag(dx);
          }

          dragPrev.current = {
            x: event.clientX,
            time: performance.now(),
          };
        }}
        // Pointer / Cursor Up
        onPointerUp={(event) => {
          if (!isDragging.current) return;
          isDragging.current = false;

          try {
            if ((event.currentTarget as HTMLElement).hasPointerCapture(event.pointerId)) {
              (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
            }
          } catch (_) {}

          let totalDx = 0;
          if (dragStart.current) {
            totalDx = event.clientX - dragStart.current.x;
          }

          settleInDirection(totalDx);
          dragStart.current = null;
          dragPrev.current = null;
        }}
        // Pointer Cancel
        onPointerCancel={(event) => {
          isDragging.current = false;
          try {
            if ((event.currentTarget as HTMLElement).hasPointerCapture(event.pointerId)) {
              (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
            }
          } catch (_) {}
          targetPos.current = Math.round(currentPos.current);
          startGlide();
          dragStart.current = null;
          dragPrev.current = null;
        }}
        // Keyboard Arrow Navigation
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
                  // Avoid triggering click action if user was dragging cursor
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
