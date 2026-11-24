import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Sparkles, CheckCircle, Wine, Music, Building, Check, ArrowRight } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.config';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';

const eventEnquirySchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid telephone number'),
  branchId: z.string().min(1, 'Please select a preferred branch'),
  eventType: z.string().min(1, 'Please select an event type'),
  preferredDate: z.string().min(1, 'Please select your preferred date'),
  guestCount: z.coerce.number().min(8, 'Private events minimum is 8 guests').max(300, 'Maximum capacity is 300 guests'),
  additionalRequirements: z.string().optional(),
});

type EventEnquiryFormData = z.infer<typeof eventEnquirySchema>;

export const EventsPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventEnquiryFormData>({
    resolver: zodResolver(eventEnquirySchema),
    defaultValues: {
      branchId: 'downtown-flagship',
      eventType: 'Private Sheesh Mahal Salon',
      guestCount: 16,
    },
  });

  const onSubmitEnquiry = (_data: EventEnquiryFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      reset();
    }, 1000);
  };

  const eventVenues = [
    {
      title: 'The Sheesh Mahal Salon',
      capacity: '12 – 35 Guests',
      image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80',
      description: 'Intimate mirror-inlaid dining room with private butler guild, customized silver thali banquets, and discrete acoustic partitioning.',
      features: ['Dedicated Waitstaff', 'Custom Degustation Menu', 'Audio-Visual Connectivity', 'Private Reception Foyer'],
    },
    {
      title: 'The Saffron Courtyard Pavilion',
      capacity: '40 – 120 Guests',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
      description: 'Open-air marble veranda surrounded by water fountains and fragrant jasmine, featuring live tandoor and chaat counters.',
      features: ['Live Tandoor Station', 'Fountain Courtyard Ambience', 'Live Sitar & Classical Music', 'Cocktail / Mocktail Bar Setup'],
    },
    {
      title: 'Grand Palace Complete Buyout',
      capacity: 'Up to 300 Guests',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
      description: 'Exclusive access to our entire haveli for landmark wedding receptions, milestone anniversaries, and corporate celebrations.',
      features: ['Full Venue Exclusivity', 'Valet Parking for All Guests', 'Custom Decor & Floral Design', 'Multi-Station Royal Buffet'],
    },
  ];

  const facilities = [
    { title: 'Live Classical Ragas', desc: 'Curated sitar, flute, and tabla acoustics for grand festive celebrations.', icon: Music },
    { title: 'Dedicated Butler Guild', desc: 'White-glove royal thali service and customized silver dinnerware setup.', icon: Wine },
    { title: 'Royal Chef Degustation', desc: 'Bespoke vegetarian and Jain multi-course menus crafted by our master chefs.', icon: Sparkles },
    { title: 'Modern Audio-Visual', desc: 'Concealed 4K presentation screens with discrete wireless connectivity.', icon: Building },
  ];

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      {/* Page Banner */}
      <section className="relative py-24 md:py-32 bg-slate-950 text-white overflow-hidden mb-12">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50 z-10" />

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-sans font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Private Dining & Royal Banquets</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white">
            Private Salons & Celebrations
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
            Celebrate momentous milestones, wedding sangeet banquets, and executive summits in spaces inspired by Mughal and Rajasthani palaces.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 font-sans">
        {/* Event Venues Cards */}
        <section>
          <SectionHeading
            eyebrow="Distinctive Palaces"
            title="Curated Private Venues"
            subtitle="Explore our specialized suites designed for intimacy, celebrations, and complete buyouts."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {eventVenues.map((venue) => (
              <div
                key={venue.title}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <img
                    src={venue.image}
                    alt={venue.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-white text-xs font-bold">
                    {venue.capacity}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                      {venue.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-sans mb-4">
                      {venue.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {venue.features.map((feat) => (
                        <div key={feat} className="flex items-center space-x-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <a
                      href="#enquiry-form"
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 uppercase tracking-wider flex items-center space-x-1"
                    >
                      <span>Enquire for this Venue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Facilities & Services Grid */}
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-card">
          <SectionHeading
            eyebrow="Imperial Hospitality"
            title="Included Concierge Services"
            subtitle="Every private celebration is attended by dedicated culinary coordinators, sommeliers, and master chefs."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {facilities.map((f) => {
              const IconComp = f.icon;
              return (
                <div key={f.title} className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-slate-200 mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">
                    {f.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Private Banquet Enquiry Form */}
        <section id="enquiry-form" className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-elevated max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-sans uppercase tracking-widest text-emerald-700 font-bold block mb-2">
              Private Concierge
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Request Banquet Availability
            </h2>
            <p className="text-sm text-slate-600 font-sans">
              Our banquet director will contact you within 24 hours with custom menu proposals, floorplans, and pricing.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                Enquiry Successfully Received
              </h3>
              <p className="text-sm text-slate-700 max-w-md mx-auto mb-6 font-sans">
                Thank you for considering RASORAA for your celebration. Our private dining director will review your requirements and reach out promptly.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSubmitted(false)}
              >
                Submit Another Enquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmitEnquiry)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase font-sans font-bold text-slate-700 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    placeholder="e.g. Radhika Singhania"
                    className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-600 mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase font-sans font-bold text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="e.g. radhika@example.com"
                    className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase font-sans font-bold text-slate-700 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="e.g. +1 (555) 987-6543"
                    className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-600 mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase font-sans font-bold text-slate-700 mb-1.5">
                    Preferred Haveli Location *
                  </label>
                  <select
                    {...register('branchId')}
                    className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors cursor-pointer"
                  >
                    {RESTAURANT_CONFIG.branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.neighborhood})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase font-sans font-bold text-slate-700 mb-1.5">
                    Event Type *
                  </label>
                  <select
                    {...register('eventType')}
                    className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="Private Sheesh Mahal Salon">Private Sheesh Mahal Salon</option>
                    <option value="Wedding / Sangeet Banquet">Wedding / Sangeet Banquet</option>
                    <option value="Milestone Birthday / Anniversary">Milestone Birthday / Anniversary</option>
                    <option value="Corporate Executive Summit">Corporate Executive Summit</option>
                    <option value="Full Haveli Buyout">Full Haveli Buyout</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-sans font-bold text-slate-700 mb-1.5">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    {...register('preferredDate')}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                  {errors.preferredDate && (
                    <p className="text-xs text-rose-600 mt-1">{errors.preferredDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase font-sans font-bold text-slate-700 mb-1.5">
                    Estimated Guests *
                  </label>
                  <input
                    type="number"
                    min="8"
                    max="300"
                    {...register('guestCount')}
                    className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                  {errors.guestCount && (
                    <p className="text-xs text-rose-600 mt-1">{errors.guestCount.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-sans font-bold text-slate-700 mb-1.5">
                  Specific Culinary Preferences & AV Notes
                </label>
                <textarea
                  rows={4}
                  {...register('additionalRequirements')}
                  placeholder="e.g. Jain menu requirements, live sitar setup, silver thali presentation..."
                  className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>

              <div className="pt-2 text-center">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-10 shadow-elevated"
                >
                  {isSubmitting ? 'Submitting Details...' : 'Submit Banquet Enquiry'}
                </Button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};
