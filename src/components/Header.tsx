import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/content';
import { CTAButton } from '@/components/ui/CTAButton';

type HeaderProps = {
  onGetStarted: () => void;
};

export function Header({ onGetStarted }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-navy-900/95 backdrop-blur-md shadow-lg shadow-navy-950/20 py-2'
            : 'bg-navy-900 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group" aria-label="GlobPulse home">
            <img
              src="/GFEPLUSE1.png"
              alt="GlobPulse — The pulse of global trade"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-navy-100 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <CTAButton onClick={onGetStarted} size="md" variant="gold">
              Get Started ₹999
            </CTAButton>
          </div>

          <button
            className="lg:hidden text-white p-2 -mr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-navy-900 z-50 lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-navy-700">
                <img
                  src="/GFEPLUSE1.png"
                  alt="GlobPulse — The pulse of global trade"
                  className="h-9 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-white p-2 -mr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-6 flex-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-lg font-medium text-navy-100 hover:text-white py-3 px-4 rounded-lg hover:bg-navy-800 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
              <div className="p-6 border-t border-navy-700">
                <CTAButton onClick={() => { setMobileOpen(false); onGetStarted(); }} variant="gold" className="w-full">
                  Get Started ₹999
                </CTAButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
