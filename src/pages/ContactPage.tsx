import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  ChevronDown,
  Navigation,
  Clock,
  Send,
} from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.config';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';

const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid telephone number'),
  branchId: z.string().min(1, 'Please select a haveli destination'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(RESTAURANT_CONFIG.branches[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeBranch =
    RESTAURANT_CONFIG.branches.find((b) => b.id === selectedBranchId) ||
    RESTAURANT_CONFIG.branches[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      branchId: 'downtown-flagship',
      subject: 'Table Concierge Inquiry',
    },
  });

  const onSubmitContact = (_data: ContactFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      reset();
    }, 900);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: 'Do you strictly adhere to 100% vegetarian culinary standards?',
      a: 'Yes, absolutely. RASORAA is a 100% pure vegetarian (Shuddh Shakahari) establishment. No meat, fish, shellfish, or eggs ever enter our premises or cooking facilities.',
    },
    {
      q: 'Do you offer authentic Jain options without onion, garlic, or root vegetables?',
      a: 'Yes. We take pride in providing a dedicated Jain menu across all courses — including paneer preparations, slow-simmered dals, samosas, and royal thalis prepared without onion, garlic, or root vegetables in dedicated satvik cookware.',
    },
    {
      q: 'What is the dress code for dinner service?',
      a: 'Our dining rooms observe an elegant smart-casual dress code. We recommend collared shirts or traditional Indian formal attire for evening dinner service.',
    },
    {
      q: 'Can you accommodate guests with severe celiac or nut allergies?',
      a: 'Yes. All dishes on our menu clearly display gluten-free and allergen indicators. Please notify our hosts when booking and your server before dining.',
    },
    {
      q: 'Is valet parking available at all branches?',
      a: 'Complimentary valet parking is provided at our Downtown Royal Palace and The Garden Conservatory locations. The Waterfront Haveli offers validated pier parking.',
    },
  ];

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      {/* Banner */}
      <section className="relative py-24 md:py-32 bg-slate-950 text-white overflow-hidden mb-12">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50 z-10" />

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-sans font-bold uppercase tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Concierge & Reservations</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white">
            Connect With Our Darbar
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
            We are honored to welcome you. Contact our reservation hosts for table inquiries, private dining salons, and bespoke royal banquets.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 font-sans">
        {/* Branch Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESTAURANT_CONFIG.branches.map((b) => (
            <div
              key={b.id}
              onClick={() => setSelectedBranchId(b.id)}
              className={`p-6 sm:p-7 bg-white rounded-3xl border cursor-pointer transition-all duration-300 shadow-card ${
                b.id === selectedBranchId
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-elevated'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <span className="text-xs uppercase font-sans tracking-widest text-emerald-700 font-bold block mb-1">
                {b.neighborhood}
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1">
                {b.name}
              </h3>
              <p className="text-xs text-slate-500 mb-5 font-sans">{b.subtitle}</p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-4 font-sans">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{b.address}, {b.city}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                  <a href={`tel:${b.phone}`} className="text-emerald-700 font-bold hover:underline">
                    {b.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-slate-600">{b.email}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Form (6 cols) */}
          <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-card">
            <div className="mb-6">
              <span className="text-xs font-sans uppercase tracking-widest text-emerald-700 font-bold block mb-1">
                Concierge Inbox
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Send Us a Message
              </h3>
              <p className="text-sm text-slate-600 font-sans">
                Whether you have dietary questions, feedback, or special celebration requests, our hospitality hosts will respond promptly.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-serif text-xl font-bold text-slate-900 mb-1">
                  Message Delivered
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 mb-4 font-sans">
                  Thank you for reaching out to RASORAA. Our host will reply to your inquiry shortly.
                </p>
                <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
                  Send Another Note
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmitContact)} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-600 mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="e.g. vikram@example.com"
                      className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="e.g. +1 (555) 000-0000"
                      className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-600 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1">
                      Destination Haveli *
                    </label>
                    <select
                      {...register('branchId')}
                      className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors cursor-pointer"
                    >
                      {RESTAURANT_CONFIG.branches.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      {...register('subject')}
                      placeholder="e.g. Table Concierge Inquiry"
                      className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    />
                    {errors.subject && (
                      <p className="text-xs text-rose-600 mt-1">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    {...register('message')}
                    placeholder="How may our hosts assist you?"
                    className="w-full bg-slate-50 text-sm text-slate-900 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-600 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  icon={Send}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl shadow-md"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message to Concierge'}
                </Button>
              </form>
            )}
          </div>

          {/* Location Map View & Hours (6 cols) */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-sans tracking-widest text-emerald-700 font-bold block mb-1">
                  Active Location
                </span>
                <h4 className="font-serif text-2xl font-bold text-slate-900">
                  {activeBranch.name}
                </h4>
              </div>
              <a
                href={activeBranch.mapEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 font-bold"
              >
                <span>Google Maps</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="overflow-hidden h-72 rounded-2xl border border-slate-200 bg-slate-100">
              <iframe
                src={activeBranch.mapEmbedUrl}
                title={`${activeBranch.name} Full Interactive Map`}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs font-sans">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-slate-500 mb-1 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Lunch Hours</span>
                </div>
                <span className="font-bold text-slate-900">{activeBranch.hours.lunch}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-slate-500 mb-1 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Dinner Hours</span>
                </div>
                <span className="font-bold text-slate-900">{activeBranch.hours.dinner}</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <section className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-card">
          <SectionHeading
            eyebrow="Dining Etiquette & Queries"
            title="Frequently Asked Questions"
            subtitle="Answers to common questions regarding dietary certifications, dress guidelines, and reservations."
          />

          <div className="max-w-3xl mx-auto mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50 font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
