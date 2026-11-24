import React from 'react';
import { Leaf, HeartHandshake, Compass, Calendar } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant.config';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

export const StoryPage: React.FC = () => {
  const masterChefs = [
    {
      name: 'Ustad Tariq Nizamuddin',
      role: 'Executive Culinary Custodian',
      bio: 'Carrying forward five generations of royal Awadhi dum craftsmanship, mastering 36-spice alchemies and earthenware slow-simmering.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Pandit Radheshyam Sharma',
      role: 'Master Mithai Artisan',
      bio: 'Varanasi-trained confectioner who crafts our signature rabri, saffron-infused chenna rasmalai, and 24-karat gold leaf desserts.',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Dr. Anandita Sen',
      role: 'Ayurvedic Botanical Sommelier',
      bio: 'Designs our cold-pressed spice infusions, blue pea flower welcome elixirs, and single-estate Assam and Darjeeling tea pairings.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      {/* Editorial Story Hero */}
      <section className="relative py-24 md:py-32 bg-slate-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50 z-10" />

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-sans font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Terroir & Imperial Lineage</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white">
            The Soul of RASORAA
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
            Founded to resurrect the forgotten grandeur of ancient Indian vegetarian banquets — where pure vegetable creations were celebrated as imperial ceremonies of taste and spirituality.
          </p>
        </div>
      </section>

      {/* Narrative Section with Split Editorial Layout */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans uppercase tracking-widest text-emerald-700 font-bold block">
              The Guiding Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-[1.15]">
              "Vegetarian gastronomy in royal India was not a compromise — it was sovereign art."
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-sans">
              {RESTAURANT_CONFIG.story.p1}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              {RESTAURANT_CONFIG.story.p2}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              {RESTAURANT_CONFIG.story.p3}
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
                <Leaf className="w-5 h-5 text-emerald-600 mb-2" />
                <div className="font-bold text-slate-900 text-sm">Farm-to-Thali Purity</div>
                <div className="text-xs text-slate-500 mt-1">Single-origin organic pulses & seasonal produce</div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card">
                <HeartHandshake className="w-5 h-5 text-sky-600 mb-2" />
                <div className="font-bold text-slate-900 text-sm">Sacred Satvik Standards</div>
                <div className="text-xs text-slate-500 mt-1">Zero meat, zero cross-contamination, separate Jain kitchen</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-elevated bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80"
                alt="Culinary Preparation at RASORAA"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-card">
                <span className="text-xs font-sans uppercase font-bold text-emerald-800 tracking-wider block mb-1">
                  100% Shuddh Shakahari Commitment
                </span>
                <p className="font-serif text-slate-900 text-base font-bold">
                  Stone-ground spices, clay handis, and unadulterated desi ghee — preserving centuries of authentic recipes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Master Culinary Custodians Section */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Custodians of Taste"
            title="The Masters Behind the Alchemy"
            subtitle="Meet the culinary architects preserving centuries-old royal recipes and confectionery arts."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {masterChefs.map((chef) => (
              <div
                key={chef.name}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-elevated transition-shadow flex flex-col justify-between"
              >
                <div className="h-72 w-full overflow-hidden bg-slate-900">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-sans uppercase tracking-widest text-emerald-700 font-bold block mb-1">
                    {chef.role}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                    {chef.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {chef.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-modal text-center max-w-4xl mx-auto">
          <span className="text-xs uppercase font-sans tracking-widest text-amber-400 font-bold block mb-3">
            Experience the Heritage in Person
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-4 text-white">
            Reserve Your Imperial Table
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 font-sans">
            Allow us to welcome you to our courtyards and dining salons for an unforgettable exploration of authentic Indian vegetarian culinary traditions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/reservations">
              <Button
                variant="primary"
                size="lg"
                icon={Calendar}
                iconPosition="right"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8"
              >
                Reserve a Table
              </Button>
            </Link>
            <Link to="/menu">
              <Button
                variant="white"
                size="lg"
                className="bg-white/90 hover:bg-white text-slate-900 font-semibold px-8"
              >
                Explore Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
