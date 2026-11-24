import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurant.config';
import { SectionHeading } from '../common/SectionHeading';

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = RESTAURANT_CONFIG.testimonials;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading
          eyebrow="Guest Reflections"
          title="Words of Appreciation"
          subtitle="Critiques and reflections from our distinguished patrons, culinary journalists, and celebratory banquets."
        />

        {/* Testimonial Card Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative mt-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-elevated"
        >
          {/* Quote Icon Accent */}
          <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Quote className="w-6 h-6" />
          </div>

          <div className="relative min-h-[160px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* 5 Stars */}
                <div className="flex items-center justify-center space-x-1.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-serif text-xl sm:text-2xl md:text-3xl font-medium text-slate-900 leading-snug max-w-2xl mx-auto italic">
                  "{current.quote}"
                </p>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-100 flex flex-col items-center">
                  <div className="flex items-center space-x-2">
                    <span className="font-sans font-bold text-base text-slate-900">
                      {current.author}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-xs sm:text-sm font-sans text-slate-500 font-medium">
                    {current.title}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-100">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-slate-100 text-slate-700 hover:bg-emerald-600 hover:text-white transition-all focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-emerald-600'
                      : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-slate-100 text-slate-700 hover:bg-emerald-600 hover:text-white transition-all focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
