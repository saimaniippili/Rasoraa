import React from 'react';

export const RasoraaSpine: React.FC = () => {
  return (
    <>
      {/* Central Recessed Curved Valley Shadow */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 sm:w-10 rasoraa-spine-valley z-30 pointer-events-none" />

      {/* Visible Stitched Binding Line */}
      <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-1.5 rasoraa-spine-stitches opacity-50 z-30 pointer-events-none" />

      {/* Draped Satin Gold Bookmark Ribbon */}
      <div className="hidden md:block absolute -top-2 left-1/2 -translate-x-1/2 w-5 sm:w-6 h-20 sm:h-24 rasoraa-bookmark-ribbon rounded-b-md shadow-xl z-40 pointer-events-none">
        <div className="w-full h-full flex flex-col justify-end items-center pb-2">
          {/* Subtle Ribbon Notch */}
          <div className="w-2 h-2 rotate-45 bg-[#09251A] -mb-3" />
        </div>
      </div>
    </>
  );
};
