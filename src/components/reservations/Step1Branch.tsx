import React from 'react';
import { Check, MapPin, Clock } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurant.config';
import { Branch } from '../../types';

interface Step1BranchProps {
  selectedBranchId: string;
  onSelectBranch: (branchId: string) => void;
}

export const Step1Branch: React.FC<Step1BranchProps> = ({
  selectedBranchId,
  onSelectBranch,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="font-display text-2xl sm:text-3xl font-medium text-palace-900 mb-2">
          Select Your Dining Palace
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted font-sans">
          Choose between our downtown Darbar hall, oceanfront waterfront Haveli, or parkside botanical glasshouse.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RESTAURANT_CONFIG.branches.map((branch: Branch) => {
          const isSelected = branch.id === selectedBranchId;
          return (
            <div
              key={branch.id}
              onClick={() => onSelectBranch(branch.id)}
              className={`group relative overflow-hidden cursor-pointer border transition-all duration-300 flex flex-col justify-between bg-white ${
                isSelected
                  ? 'border-gold shadow-card ring-1 ring-gold'
                  : 'border-parchment-border hover:border-gold-hairline shadow-subtle'
              }`}
            >
              {/* Branch visual */}
              <div className="relative h-44 overflow-hidden bg-palace-950">
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-palace-950/85 via-transparent to-transparent" />

                {isSelected ? (
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-gold text-palace-950 text-[10px] font-sans font-bold uppercase tracking-wider flex items-center space-x-1 shadow-subtle">
                    <Check className="w-3 h-3" />
                    <span>Selected</span>
                  </span>
                ) : (
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-palace-950/80 backdrop-blur-md text-white/85 text-[9px] font-sans uppercase tracking-wider">
                    {branch.neighborhood}
                  </span>
                )}

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-display text-lg font-semibold leading-snug">
                    {branch.name}
                  </h4>
                  <p className="text-[11px] text-white/80 line-clamp-1 font-sans">{branch.subtitle}</p>
                </div>
              </div>

              {/* Branch Information */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 font-sans">
                <div className="space-y-2 text-xs text-ink-soft">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                    <span>{branch.address}, {branch.city}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="w-3.5 h-3.5 text-palace-700 shrink-0 mt-0.5" />
                    <span>Lunch {branch.hours.lunch} • Dinner {branch.hours.dinner}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="pt-3 border-t border-parchment-border flex flex-wrap gap-1">
                  {branch.features.slice(0, 3).map((feat) => (
                    <span
                      key={feat}
                      className="text-[10px] bg-parchment text-palace-900 px-2 py-0.5 border border-parchment-border"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
