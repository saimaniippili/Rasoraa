import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Wine, Building } from 'lucide-react';
import { Button } from '../common/Button';

export const PrivateEventsSection: React.FC = () => {
  const eventHighlights = [
    {
      title: 'Private Sheesh Mahal Salons',
      capacity: '12 – 35 Guests',
      desc: 'Discreet, acoustic palace suites with dedicated royal thali service and private servers.',
      icon: Users,
    },
    {
      title: 'Courtyard & Pavilion Galas',
      capacity: '40 – 140 Guests',
      desc: 'Open-air marble courtyards with live clay-oven tandoor stations and artisanal chaat counters.',
      icon: Wine,
    },
    {
      title: 'Full Palace Exclusivity',
      capacity: 'Up to 300 Guests',
      desc: 'Complete buyout for landmark wedding receptions, milestone anniversaries, and corporate celebrations.',
      icon: Building,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-elevated bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80"
                alt="RASORAA Private Dining Banquet Setup"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-card">
                <span className="text-[11px] font-sans uppercase tracking-widest text-emerald-800 font-bold block mb-1">
                  Bespoke Imperial Hospitality
                </span>
                <p className="font-serif text-lg text-slate-900 font-bold">
                  Custom silver thali menus, live classical Indian sitar, and personalized tablescapes.
                </p>
              </div>
            </div>
          </div>

          {/* Event Content & Features (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 text-emerald-700 uppercase tracking-widest text-xs font-sans font-bold mb-3">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Bespoke Gatherings</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] mb-4">
                Private Dining & Grand Banqueting
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-sans">
                Host your life's most memorable moments in regal splendour. Our dedicated event concierge curates customized satvik and royal vegetarian menus, silver dinnerware, and seamless service.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              {eventHighlights.map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all flex items-start space-x-4"
                  >
                    <div className="p-3 rounded-xl bg-white text-emerald-700 shadow-sm border border-slate-200 shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-serif text-lg font-bold text-slate-900">
                          {feat.title}
                        </h4>
                        <span className="text-xs font-sans font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                          {feat.capacity}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 font-sans">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link to="/events">
                <Button
                  variant="primary"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md"
                >
                  Plan Your Private Gathering
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-slate-300 text-slate-800 hover:bg-slate-100"
                >
                  Contact Banquet Concierge
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
