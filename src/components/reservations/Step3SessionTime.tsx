import React from 'react';
import { Sun, Moon, Users, Clock, AlertCircle } from 'lucide-react';

interface Step3SessionTimeProps {
  session: 'lunch' | 'dinner';
  guests: number;
  timeSlot: string;
  onSelectSession: (session: 'lunch' | 'dinner') => void;
  onSelectGuests: (guests: number) => void;
  onSelectTimeSlot: (slot: string) => void;
}

export const Step3SessionTime: React.FC<Step3SessionTimeProps> = ({
  session,
  guests,
  timeSlot,
  onSelectSession,
  onSelectGuests,
  onSelectTimeSlot,
}) => {
  const lunchSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'
  ];

  const dinnerSlots = [
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  const activeSlots = session === 'lunch' ? lunchSlots : dinnerSlots;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl sm:text-3xl font-medium text-palace-900 mb-2">
          Service Session & Guests
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted font-sans">
          Select your dining session, party size, and arrival window.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 border border-parchment-border shadow-subtle space-y-8 font-sans">
        {/* 1. Dining Session (Lunch vs Dinner) */}
        <div>
          <label className="block text-xs uppercase tracking-luxury text-palace-900 font-semibold mb-3">
            1. Dining Service Session
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => onSelectSession('lunch')}
              className={`p-4 border text-left transition-all ${
                session === 'lunch'
                  ? 'border-gold bg-parchment shadow-subtle ring-1 ring-gold'
                  : 'border-parchment-border hover:border-gold-hairline'
              }`}
            >
              <div className="flex items-center space-x-2 text-gold mb-1">
                <Sun className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-semibold">Lunch Service</span>
              </div>
              <div className="text-xs text-ink-muted">12:00 PM – 3:30 PM</div>
            </button>

            <button
              type="button"
              onClick={() => onSelectSession('dinner')}
              className={`p-4 border text-left transition-all ${
                session === 'dinner'
                  ? 'border-gold bg-parchment shadow-subtle ring-1 ring-gold'
                  : 'border-parchment-border hover:border-gold-hairline'
              }`}
            >
              <div className="flex items-center space-x-2 text-gold mb-1">
                <Moon className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-semibold">Dinner Service</span>
              </div>
              <div className="text-xs text-ink-muted">6:00 PM – 11:30 PM</div>
            </button>
          </div>
        </div>

        {/* 2. Number of Guests */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs uppercase tracking-luxury text-palace-900 font-semibold flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-gold" />
              <span>2. Number of Guests</span>
            </label>
            <span className="text-[11px] text-ink-muted">
              Parties over 8 may book a Private Salon
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const isSelected = guests === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => onSelectGuests(num)}
                  className={`py-3 text-xs font-sans font-semibold transition-all border ${
                    isSelected
                      ? 'bg-palace-900 text-gold border-gold font-bold shadow-subtle'
                      : 'bg-parchment text-palace-900 hover:bg-white border-parchment-border'
                  }`}
                >
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </button>
              );
            })}
          </div>

          {guests >= 7 && (
            <div className="mt-3 p-3 bg-parchment text-palace-900 text-xs flex items-center space-x-2 border border-gold/30">
              <AlertCircle className="w-4 h-4 shrink-0 text-gold" />
              <span>
                For large parties of 7+ guests, our kitchen prepares our seasonal tasting experience to ensure seamless royal banquet service.
              </span>
            </div>
          )}
        </div>

        {/* 3. Available Time Slots */}
        <div>
          <label className="block text-xs uppercase tracking-luxury text-palace-900 font-semibold mb-3 flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-gold" />
            <span>3. Available Table Times</span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {activeSlots.map((slot) => {
              const isSelected = timeSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onSelectTimeSlot(slot)}
                  className={`py-2.5 px-3 text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-200 border ${
                    isSelected
                      ? 'bg-palace-900 text-gold border-gold shadow-subtle'
                      : 'bg-parchment text-palace-900 hover:bg-white border-parchment-border'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
