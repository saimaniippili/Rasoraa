import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface Step2DateProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const Step2Date: React.FC<Step2DateProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initialDate = selectedDate ? new Date(selectedDate + 'T00:00:00') : today;
  const [currentMonth, setCurrentMonth] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(prev);
    }
  };

  const handleNextMonth = () => {
    const next = new Date(year, month + 1, 1);
    const maxFuture = new Date(today.getFullYear(), today.getMonth() + 2, 1);
    if (next <= maxFuture) {
      setCurrentMonth(next);
    }
  };

  const isPrevDisabled =
    currentMonth.getFullYear() === today.getFullYear() &&
    currentMonth.getMonth() === today.getMonth();

  const calendarCells = [];

  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dayNum = prevMonthTotalDays - i;
    calendarCells.push({
      day: dayNum,
      isCurrentMonth: false,
      isPast: true,
      dateString: '',
    });
  }

  for (let d = 1; d <= totalDays; d++) {
    const cellDate = new Date(year, month, d);
    cellDate.setHours(0, 0, 0, 0);
    const isPast = cellDate < today;
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isSelected = selectedDate === dateString;
    const isToday = cellDate.getTime() === today.getTime();

    calendarCells.push({
      day: d,
      isCurrentMonth: true,
      isPast,
      dateString,
      isSelected,
      isToday,
    });
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl sm:text-3xl font-medium text-palace-900 mb-2">
          Select Your Dining Date
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted font-sans">
          Online table reservations open up to 60 days in advance.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 border border-parchment-border shadow-subtle">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-parchment-border">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={isPrevDisabled}
            className={`p-2 transition-colors ${
              isPrevDisabled
                ? 'opacity-30 cursor-not-allowed text-ink-muted'
                : 'text-palace-900 hover:text-gold'
            }`}
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h4 className="font-display text-xl sm:text-2xl font-semibold text-palace-900">
              {monthNames[month]} {year}
            </h4>
            <span className="text-[10px] uppercase font-sans tracking-widest text-emerald font-semibold">
              Lunch & Dinner Tables Open
            </span>
          </div>

          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 text-palace-900 hover:text-gold transition-colors"
            aria-label="Next Month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {daysOfWeek.map((d) => (
            <span key={d} className="text-[10px] uppercase font-sans tracking-wider font-semibold text-ink-muted py-1">
              {d}
            </span>
          ))}
        </div>

        {/* Calendar days grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {calendarCells.map((cell, idx) => {
            if (!cell.isCurrentMonth) {
              return (
                <div
                  key={`prev-${idx}`}
                  className="h-10 sm:h-11 flex items-center justify-center text-xs text-ink-muted/30 select-none font-sans"
                >
                  {cell.day}
                </div>
              );
            }

            return (
              <button
                key={cell.dateString}
                type="button"
                disabled={cell.isPast}
                onClick={() => cell.dateString && onSelectDate(cell.dateString)}
                className={`h-10 sm:h-11 rounded-sm text-xs sm:text-sm font-sans font-medium transition-all duration-200 flex flex-col items-center justify-center relative focus:outline-none ${
                  cell.isPast
                    ? 'text-ink-muted/30 cursor-not-allowed bg-parchment-subtle/40'
                    : cell.isSelected
                      ? 'bg-palace-900 text-gold font-bold shadow-subtle border border-gold'
                      : 'bg-parchment text-palace-900 hover:bg-white hover:border-gold-hairline border border-parchment-border'
                }`}
              >
                <span>{cell.day}</span>
                {cell.isToday && (
                  <span
                    className={`w-1 h-1 rounded-full ${
                      cell.isSelected ? 'bg-gold' : 'bg-emerald'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Calendar Legend / Footer */}
        <div className="mt-6 pt-4 border-t border-parchment-border flex items-center justify-between text-[11px] font-sans text-ink-muted">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 bg-palace-900 border border-gold"></span>
              <span>Selected</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald"></span>
              <span>Today</span>
            </span>
          </div>

          {selectedDate && (
            <div className="font-semibold text-palace-900">
              {formatDate(selectedDate)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
