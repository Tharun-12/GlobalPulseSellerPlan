import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type CTAButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'gold' | 'outline' | 'light';
  size?: 'md' | 'lg';
  className?: string;
};

export function CTAButton({
  children,
  onClick,
  variant = 'gold',
  size = 'lg',
  className = '',
}: CTAButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2';

  const sizes = {
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-base sm:text-lg',
  };

  const variants = {
    gold: 'bg-gold-400 text-navy-900 hover:bg-gold-300 shadow-lg shadow-gold-500/20 hover:shadow-xl hover:shadow-gold-500/30 hover:-translate-y-0.5',
    outline:
      'border-2 border-navy-200 text-navy-700 hover:border-navy-400 hover:text-navy-900 bg-white hover:bg-navy-50',
    light:
      'bg-white text-navy-900 hover:bg-navy-100 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
