import React from 'react';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ocean' | 'outline' | 'ghost' | 'white' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none rounded-lg';

  const variants = {
    primary:
      'bg-forest hover:bg-forest-hover text-white shadow-sm hover:shadow focus:ring-forest border border-transparent',
    ocean:
      'bg-ocean hover:bg-ocean-dark text-white shadow-sm hover:shadow focus:ring-ocean border border-transparent',
    outline:
      'bg-transparent border-2 border-forest text-forest hover:bg-forest hover:text-white focus:ring-forest',
    ghost:
      'bg-transparent text-slate-700 hover:text-forest hover:bg-slate-100 focus:ring-slate-300',
    white:
      'bg-white text-forest hover:bg-slate-50 border border-slate-200 shadow-sm focus:ring-white',
    gold:
      'bg-amber-600 hover:bg-amber-700 text-white shadow-sm hover:shadow focus:ring-amber-500 border border-transparent font-semibold',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 space-x-1.5',
    md: 'text-sm px-5 py-2.5 space-x-2',
    lg: 'text-base px-6 py-3.5 space-x-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {Icon && iconPosition === 'left' && !isLoading && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && !isLoading && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
};
