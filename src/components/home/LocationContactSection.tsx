import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../../config/restaurant.config';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';

export const LocationContactSection: React.FC = () => {
  const [selectedBranchId, setSelectedBranchId] = useState(RESTAURANT_CONFIG.branches[0].id);

  const activeBranch =
    RESTAURANT_CONFIG.branches.find((b) => b.id === selectedBranchId) ||
    RESTAURANT_CONFIG.branches[0];

  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dining Haveli Sanctuaries"
          title="Locations & Concierge"
          subtitle="Three distinctive palace dining destinations across the metropolis, each crafted with authentic sandstone carvings, brass accents, and serene courtyards."
        />

        {/* Branch Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 max-w-2xl mx-auto">
          {RESTAURANT_CONFIG.branches.map((branch) => {
            const isSelected = branch.id === selectedBranchId;
            return (
              <button
                key={branch.id}
                onClick={() => setSelectedBranchId(branch.id)}
                className={`text-xs sm:text-sm font-sans font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>{branch.name}</span>
              </button>
            );
          })}
        </div>

        {/* Branch Card and Map Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-elevated">
          {/* Branch Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-sans uppercase tracking-widest text-emerald-700 font-bold block mb-1">
                {activeBranch.neighborhood}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                {activeBranch.name}
              </h3>
              <p className="text-sm text-slate-600 mb-6 font-sans">
                {activeBranch.subtitle}
              </p>

              <div className="space-y-4 text-sm font-sans text-slate-700">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Address</div>
                    <div className="text-slate-600">{activeBranch.address}, {activeBranch.city}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Direct Reservations</div>
                    <a
                      href={`tel:${activeBranch.phone}`}
                      className="text-emerald-700 hover:underline font-semibold"
                    >
                      {activeBranch.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Concierge Desk</div>
                    <a
                      href={`mailto:${activeBranch.email}`}
                      className="text-slate-600 hover:text-emerald-700"
                    >
                      {activeBranch.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Service Hours</div>
                    <div className="text-slate-600">Lunch: {activeBranch.hours.lunch}</div>
                    <div className="text-slate-600">Dinner: {activeBranch.hours.dinner}</div>
                    <div className="text-slate-600">Weekends: {activeBranch.hours.weekend}</div>
                  </div>
                </div>
              </div>

              {/* Branch Feature Pills */}
              <div className="mt-6 pt-5 border-t border-slate-200">
                <div className="text-xs uppercase font-sans font-bold text-slate-400 tracking-wider mb-2.5">
                  Haveli Amenities
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeBranch.features.map((feat) => (
                    <span
                      key={feat}
                      className="text-xs font-sans font-medium px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <Link to={`/reservations?branch=${activeBranch.id}`} className="flex-1">
                <Button
                  variant="primary"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  Reserve at {activeBranch.name.split(' ')[0]}
                </Button>
              </Link>
              <a
                href={activeBranch.mapEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 text-xs font-semibold"
              >
                <Navigation className="w-4 h-4 mr-1.5 text-emerald-600" />
                Directions
              </a>
            </div>
          </div>

          {/* Interactive Map Embed (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-subtle min-h-[420px] bg-slate-200">
            <iframe
              src={activeBranch.mapEmbedUrl}
              title={`${activeBranch.name} Location Map`}
              className="w-full h-full min-h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
