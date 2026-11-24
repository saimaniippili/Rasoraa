import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, Heart } from 'lucide-react';
import { Button } from '../common/Button';

export const customerInfoSchema = z.object({
  title: z.string().min(1, 'Please select your title'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid telephone number'),
  seatingPreference: z.string().optional(),
  occasion: z.string().optional(),
  specialRequests: z.string().max(500, 'Special requests cannot exceed 500 characters').optional(),
  rememberDetails: z.boolean().default(false),
  receiveUpdates: z.boolean().default(true),
});

export type CustomerInfoFormData = z.infer<typeof customerInfoSchema>;

interface Step4CustomerInfoProps {
  initialData?: Partial<CustomerInfoFormData>;
  onSubmitInfo: (data: CustomerInfoFormData) => void;
  onBack: () => void;
}

export const Step4CustomerInfo: React.FC<Step4CustomerInfoProps> = ({
  initialData,
  onSubmitInfo,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerInfoFormData>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: {
      title: initialData?.title || 'Mr',
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      seatingPreference: initialData?.seatingPreference || 'Darbar Main Salon',
      occasion: initialData?.occasion || 'Royal Dining Experience',
      specialRequests: initialData?.specialRequests || '',
      rememberDetails: initialData?.rememberDetails ?? true,
      receiveUpdates: initialData?.receiveUpdates ?? true,
    },
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl sm:text-3xl font-medium text-palace-900 mb-2">
          Patron Contact Details
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted font-sans">
          Your reservation confirmation and seating arrangements will be communicated via these contact details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitInfo)}
        className="bg-white p-6 sm:p-8 border border-parchment-border shadow-subtle space-y-6 font-sans"
      >
        {/* Title, First Name, Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-3">
            <label className="block text-[11px] uppercase tracking-wider text-palace-900 font-semibold mb-1">
              Title *
            </label>
            <select
              {...register('title')}
              className="w-full bg-parchment text-xs sm:text-sm text-ink px-3 py-2.5 rounded-sm border border-parchment-border focus:outline-none focus:border-gold"
            >
              <option value="Mr">Mr.</option>
              <option value="Ms">Ms.</option>
              <option value="Mrs">Mrs.</option>
              <option value="Dr">Dr.</option>
              <option value="Prof">Prof.</option>
            </select>
            {errors.title && (
              <p className="text-[10px] text-red-600 mt-1">{errors.title.message}</p>
            )}
          </div>

          <div className="sm:col-span-4">
            <label className="block text-[11px] uppercase tracking-wider text-palace-900 font-semibold mb-1">
              First Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Vikram"
              {...register('firstName')}
              className="w-full bg-parchment text-xs sm:text-sm text-ink px-3 py-2.5 rounded-sm border border-parchment-border focus:outline-none focus:border-gold"
            />
            {errors.firstName && (
              <p className="text-[10px] text-red-600 mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div className="sm:col-span-5">
            <label className="block text-[11px] uppercase tracking-wider text-palace-900 font-semibold mb-1">
              Last Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Singhania"
              {...register('lastName')}
              className="w-full bg-parchment text-xs sm:text-sm text-ink px-3 py-2.5 rounded-sm border border-parchment-border focus:outline-none focus:border-gold"
            />
            {errors.lastName && (
              <p className="text-[10px] text-red-600 mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-palace-900 font-semibold mb-1 flex items-center space-x-1">
              <Mail className="w-3 h-3 text-gold" />
              <span>Email Address *</span>
            </label>
            <input
              type="email"
              placeholder="e.g. vikram@singhania.com"
              {...register('email')}
              className="w-full bg-parchment text-xs sm:text-sm text-ink px-3 py-2.5 rounded-sm border border-parchment-border focus:outline-none focus:border-gold"
            />
            {errors.email && (
              <p className="text-[10px] text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-palace-900 font-semibold mb-1 flex items-center space-x-1">
              <Phone className="w-3 h-3 text-gold" />
              <span>Telephone *</span>
            </label>
            <input
              type="tel"
              placeholder="e.g. +1 (555) 234-5678"
              {...register('phone')}
              className="w-full bg-parchment text-xs sm:text-sm text-ink px-3 py-2.5 rounded-sm border border-parchment-border focus:outline-none focus:border-gold"
            />
            {errors.phone && (
              <p className="text-[10px] text-red-600 mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Seating Preference & Occasion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-palace-900 font-semibold mb-1">
              Seating Preference
            </label>
            <select
              {...register('seatingPreference')}
              className="w-full bg-parchment text-xs sm:text-sm text-ink px-3 py-2.5 rounded-sm border border-parchment-border focus:outline-none focus:border-gold"
            >
              <option value="Darbar Main Salon">Darbar Main Palace Hall (Standard)</option>
              <option value="Courtyard Veranda">Courtyard Veranda Table</option>
              <option value="Sheesh Mahal Alcove">Sheesh Mahal Mirror Alcove</option>
              <option value="Quiet Corner Table">Quiet Corner Intimate Table</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-palace-900 font-semibold mb-1">
              Dining Occasion
            </label>
            <select
              {...register('occasion')}
              className="w-full bg-parchment text-xs sm:text-sm text-ink px-3 py-2.5 rounded-sm border border-parchment-border focus:outline-none focus:border-gold"
            >
              <option value="Royal Dining Experience">Family Dinner & Fine Dining</option>
              <option value="Anniversary">Anniversary Celebration</option>
              <option value="Birthday Celebration">Birthday Banquet</option>
              <option value="Business Summit">Executive / Corporate Dinner</option>
              <option value="Grand Milestone">Special Landmark Milestone</option>
            </select>
          </div>
        </div>

        {/* Dietary / Jain Requests */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider text-palace-900 font-semibold mb-1 flex items-center space-x-1">
            <Heart className="w-3 h-3 text-gold" />
            <span>Special Requests & Jain Requirements</span>
          </label>
          <textarea
            rows={3}
            placeholder="Please specify Jain preparation requirements (no root vegetables), severe nut/dairy allergies, anniversary seating preferences..."
            {...register('specialRequests')}
            className="w-full bg-parchment text-xs sm:text-sm text-ink px-3 py-2.5 rounded-sm border border-parchment-border focus:outline-none focus:border-gold"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-2 pt-2 border-t border-parchment-border">
          <label className="flex items-start space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              {...register('rememberDetails')}
              className="mt-0.5 rounded-sm text-palace-900 focus:ring-gold h-3.5 w-3.5"
            />
            <span className="text-xs text-ink-muted font-sans">
              Remember my patron details on this device for priority reservations.
            </span>
          </label>

          <label className="flex items-start space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              {...register('receiveUpdates')}
              className="mt-0.5 rounded-sm text-palace-900 focus:ring-gold h-3.5 w-3.5"
            />
            <span className="text-xs text-ink-muted font-sans">
              Receive SMS and email confirmations and seasonal royal thali release invitations.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-between">
          <Button type="button" variant="outline" size="md" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" variant="gold" size="md">
            Review Reservation Summary
          </Button>
        </div>
      </form>
    </div>
  );
};
