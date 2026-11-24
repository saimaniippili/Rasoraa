import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'dark' | 'light';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  className,
}) => {
  const isCenter = align === 'center';
  const isRight = align === 'right';

  return (
    <div
      className={cn(
        'max-w-3xl mb-12 md:mb-16',
        isCenter ? 'mx-auto text-center' : isRight ? 'ml-auto text-right' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn(
            'inline-flex items-center space-x-2 font-sans font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-3.5 border',
            theme === 'dark'
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          )}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{eyebrow}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className={cn(
          'font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]',
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className={cn(
            'mt-4 text-base sm:text-lg font-sans font-normal leading-relaxed',
            theme === 'dark' ? 'text-slate-200' : 'text-slate-600'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
