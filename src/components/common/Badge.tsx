import React from 'react';
import { cn } from '../../lib/utils';
import { DietaryType } from '../../types';

interface BadgeProps {
  type?: DietaryType | 'tag' | 'highlight' | 'pure-veg';
  label?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type = 'tag', label, className }) => {
  const getBadgeConfig = () => {
    switch (type) {
      case 'pure-veg':
      case 'vegetarian':
        return {
          text: label || '100% Veg',
          isVegMark: true,
          styles: 'bg-emerald-soft text-emerald-dark border-emerald-border',
        };
      case 'vegan':
        return {
          text: label || 'Vegan',
          isVegMark: false,
          styles: 'bg-slate-100 text-slate-800 border-slate-200',
        };
      case 'gluten-free':
        return {
          text: label || 'Gluten-Free',
          isVegMark: false,
          styles: 'bg-ocean-soft text-ocean-dark border-ocean-border',
        };
      case 'chef-signature':
        return {
          text: label || "Chef's Special",
          isVegMark: false,
          styles: 'bg-amber-50 text-amber-800 border-amber-200 font-semibold',
        };
      default:
        return {
          text: label || 'Specialty',
          isVegMark: false,
          styles: 'bg-slate-100 text-slate-700 border-slate-200',
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <span
      className={cn(
        'inline-flex items-center space-x-1.5 text-xs font-sans font-semibold px-2.5 py-0.5 rounded-full border',
        config.styles,
        className
      )}
    >
      {config.isVegMark && (
        <span className="w-3 h-3 rounded-[2px] border-2 border-emerald-600 flex items-center justify-center shrink-0 p-[1px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
        </span>
      )}
      <span>{config.text}</span>
    </span>
  );
};
