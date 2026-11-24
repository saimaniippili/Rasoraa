import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  Calendar,
  Clock,
  Users,
  AlertCircle,
} from 'lucide-react';
import { ReservationState } from '../../types';
import { RESTAURANT_CONFIG } from '../../config/restaurant.config';
import { Button } from '../common/Button';
import { formatDate, generateBookingId } from '../../lib/utils';
import { motion } from 'framer-motion';

interface Step5ConfirmationProps {
  reservation: ReservationState;
  onBack: () => void;
  onReset: () => void;
}

export const Step5Confirmation: React.FC<Step5ConfirmationProps> = ({
  reservation,
  onBack,
  onReset,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const branch =
    RESTAURANT_CONFIG.branches.find((b) => b.id === reservation.branchId) ||
    RESTAURANT_CONFIG.branches[0];

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setBookingRef(generateBookingId().replace('LEM', 'RAS'));
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1100);
  };

  // 1. Post-Submission Success Screen
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto bg-white p-8 sm:p-12 border border-gold shadow-elevated text-center font-sans"
      >
        <div className="w-14 h-14 rounded-full bg-palace-100 text-palace-900 flex items-center justify-center mx-auto mb-5 border border-gold-hairline">
          <CheckCircle className="w-7 h-7 text-emerald" />
        </div>

        <span className="text-[10px] uppercase font-sans tracking-widest text-gold-dark font-semibold block mb-1">
          Royal Reservation Confirmed
        </span>
        <h3 className="font-display text-3xl font-medium text-palace-900 mb-2">
          We Await Your Imperial Arrival
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted mb-6">
          A confirmation and seating summary have been dispatched to{' '}
          <strong className="text-palace-900 font-semibold">{reservation.customer.email}</strong>.
        </p>

        {/* Booking Reference ID */}
        <div className="bg-parchment p-4 border border-parchment-border inline-block mb-8">
          <span className="text-[9px] uppercase tracking-widest text-ink-muted block mb-1">
            Booking Reference ID
          </span>
          <span className="font-display text-2xl font-bold text-palace-900 tracking-wider">
            {bookingRef}
          </span>
        </div>

        {/* Detailed Receipt Card */}
        <div className="bg-parchment p-6 border border-parchment-border text-left space-y-4 mb-8 text-xs">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-parchment-border">
            <div>
              <span className="text-ink-muted block text-[11px]">Palace Destination</span>
              <strong className="text-palace-900 font-semibold font-display text-base block">{branch.name}</strong>
              <span className="text-ink-muted block text-[11px]">{branch.address}</span>
            </div>
            <div>
              <span className="text-ink-muted block text-[11px]">Date & Time</span>
              <strong className="text-palace-900 font-semibold font-display text-base block">{formatDate(reservation.date)}</strong>
              <span className="text-ink-muted block text-[11px]">{reservation.timeSlot} ({reservation.session.toUpperCase()})</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-ink-muted block text-[11px]">Party Size</span>
              <strong className="text-palace-900 font-semibold">
                {reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}
              </strong>
            </div>
            <div>
              <span className="text-ink-muted block text-[11px]">Primary Patron</span>
              <strong className="text-palace-900 font-semibold">
                {reservation.customer.title} {reservation.customer.firstName} {reservation.customer.lastName}
              </strong>
            </div>
          </div>

          {reservation.customer.specialRequests && (
            <div className="pt-3 border-t border-parchment-border">
              <span className="text-ink-muted block text-[11px]">Special Requests & Dietary</span>
              <span className="text-ink-soft italic">"{reservation.customer.specialRequests}"</span>
            </div>
          )}
        </div>

        {/* Backend Architectural Notice */}
        <div className="p-4 bg-ocean-soft text-ocean-dark text-xs text-left mb-8 border border-ocean/20 flex items-start space-x-3">
          <AlertCircle className="w-4 h-4 text-ocean shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold block font-sans">System Architecture Notice</span>
            <p className="text-[11px] leading-relaxed text-ocean-dark/85">
              Frontend multi-step reservation validation is complete. This state structure integrates directly with your live restaurant booking database (PostgreSQL, Supabase, or SevenRooms/OpenTable API).
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="gold" size="md" onClick={onReset}>
            Book Another Table
          </Button>
          <Link to="/">
            <Button variant="outline" size="md">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  // 2. Pre-Submission Review Summary Screen
  return (
    <div className="max-w-2xl mx-auto space-y-6 font-sans">
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl sm:text-3xl font-medium text-palace-900 mb-2">
          Review Reservation Summary
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted">
          Please verify your palace destination, party size, and patron details prior to final booking.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 border border-parchment-border shadow-subtle space-y-6">
        {/* Branch Preview */}
        <div className="flex items-center space-x-4 p-4 bg-parchment border border-parchment-border">
          <img
            src={branch.image}
            alt={branch.name}
            className="w-16 h-16 object-cover shrink-0"
          />
          <div>
            <span className="text-[9px] uppercase tracking-widest text-emerald font-semibold block">
              Selected Palace
            </span>
            <h4 className="font-display text-xl font-bold text-palace-900">
              {branch.name}
            </h4>
            <p className="text-xs text-ink-muted">
              {branch.address}, {branch.neighborhood}
            </p>
          </div>
        </div>

        {/* Date, Time & Party Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-parchment border border-parchment-border">
            <span className="text-[10px] uppercase font-sans tracking-wider text-ink-muted block flex items-center space-x-1.5 mb-1">
              <Calendar className="w-3 h-3 text-gold" />
              <span>Date</span>
            </span>
            <strong className="text-xs font-semibold text-palace-900 block">
              {formatDate(reservation.date)}
            </strong>
          </div>

          <div className="p-3.5 bg-parchment border border-parchment-border">
            <span className="text-[10px] uppercase font-sans tracking-wider text-ink-muted block flex items-center space-x-1.5 mb-1">
              <Clock className="w-3 h-3 text-gold" />
              <span>Time & Session</span>
            </span>
            <strong className="text-xs font-semibold text-palace-900 block">
              {reservation.timeSlot} ({reservation.session.toUpperCase()})
            </strong>
          </div>

          <div className="p-3.5 bg-parchment border border-parchment-border">
            <span className="text-[10px] uppercase font-sans tracking-wider text-ink-muted block flex items-center space-x-1.5 mb-1">
              <Users className="w-3 h-3 text-gold" />
              <span>Party Size</span>
            </span>
            <strong className="text-xs font-semibold text-palace-900 block">
              {reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}
            </strong>
          </div>
        </div>

        {/* Patron Overview */}
        <div className="p-4 bg-parchment border border-parchment-border space-y-2.5 text-xs">
          <div className="font-semibold text-palace-900 uppercase tracking-wider text-[11px] border-b border-parchment-border pb-1.5">
            Primary Patron Information
          </div>
          <div className="grid grid-cols-2 gap-2 text-ink-soft">
            <div>
              <span className="text-[10px] text-ink-muted block">Name:</span>
              <span className="font-medium text-palace-900">
                {reservation.customer.title} {reservation.customer.firstName} {reservation.customer.lastName}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-ink-muted block">Phone:</span>
              <span className="font-medium text-palace-900">{reservation.customer.phone}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[10px] text-ink-muted block">Email:</span>
              <span className="font-medium text-palace-900">{reservation.customer.email}</span>
            </div>
            <div>
              <span className="text-[10px] text-ink-muted block">Seating Preference:</span>
              <span>{reservation.customer.seatingPreference}</span>
            </div>
            <div>
              <span className="text-[10px] text-ink-muted block">Occasion:</span>
              <span>{reservation.customer.occasion}</span>
            </div>
          </div>

          {reservation.customer.specialRequests && (
            <div className="pt-2 border-t border-parchment-border text-xs">
              <span className="text-[10px] text-ink-muted block">Special Requests & Jain Requirements:</span>
              <span className="text-ink-soft italic">"{reservation.customer.specialRequests}"</span>
            </div>
          )}
        </div>

        <p className="text-[11px] text-ink-muted leading-relaxed">
          *Tables are held for 15 minutes past reservation time. Standard bookings may be cancelled up to 24 hours in advance without penalty.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Modify Details
          </Button>

          <Button
            type="button"
            variant="gold"
            size="lg"
            isLoading={isSubmitting}
            onClick={handleConfirmBooking}
          >
            Confirm Reservation
          </Button>
        </div>
      </div>
    </div>
  );
};
