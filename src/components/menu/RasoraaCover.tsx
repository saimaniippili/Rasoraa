import React from 'react';

interface RasoraaCoverProps {
  children: React.ReactNode;
  currentSpread: number;
}

export const RasoraaCover: React.FC<RasoraaCoverProps> = ({ children, currentSpread }) => {
  // Physical paper stack thickness calculation (left grows, right shrinks)
  const leftStackWidth = Math.max(3, currentSpread * 3 + 2);
  const rightStackWidth = Math.max(3, (4 - currentSpread) * 3 + 2);

  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Outer Padded Leather Hardcover Casing */}
      <div className="rasoraa-leather-casing rasoraa-leather-texture p-3 sm:p-5 md:p-7 relative transition-all duration-700">
        {/* Golden Perimeter Hand-Stitching */}
        <div className="absolute inset-2 sm:inset-3 rasoraa-gold-stitching pointer-events-none z-10" />

        {/* Embossed Brass Corner Protectors */}
        <div className="brass-corner-tl" />
        <div className="brass-corner-tr" />
        <div className="brass-corner-bl" />
        <div className="brass-corner-br" />

        {/* Left Physical Paper Edge Stack */}
        <div
          className="hidden md:block absolute -left-2 top-8 bottom-8 paper-stack-left pointer-events-none transition-all duration-500 z-10"
          style={{ width: `${leftStackWidth}px` }}
        />

        {/* Right Physical Paper Edge Stack */}
        <div
          className="hidden md:block absolute -right-2 top-8 bottom-8 paper-stack-right pointer-events-none transition-all duration-500 z-10"
          style={{ width: `${rightStackWidth}px` }}
        />

        {/* Book Content Spread Interior */}
        {children}
      </div>
    </div>
  );
};
