import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Utensils } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center pt-24 pb-20 px-4 font-sans">
      <div className="max-w-md w-full bg-white p-8 sm:p-12 text-center shadow-subtle border border-parchment-border">
        <div className="w-14 h-14 rounded-full bg-palace-100 text-palace-900 flex items-center justify-center mx-auto mb-5 border border-gold-hairline">
          <Compass className="w-7 h-7 text-gold-dark" />
        </div>
        <span className="text-[10px] uppercase font-sans tracking-widest text-gold font-semibold block mb-2">
          Page Not Located
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-medium text-palace-900 mb-3">
          404
        </h1>
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-8 font-sans">
          The culinary journey you are looking for has been moved or does not exist. Allow us to guide you back to our royal Darbar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="gold" size="md" icon={Home} className="w-full">
              Return Home
            </Button>
          </Link>
          <Link to="/menu" className="w-full sm:w-auto">
            <Button variant="outline" size="md" icon={Utensils} className="w-full">
              Explore Menu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
