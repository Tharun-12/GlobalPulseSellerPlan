import { ArrowRight } from 'lucide-react';
import { navLinks } from '@/data/content';
import { CTAButton } from '@/components/ui/CTAButton';

type FooterProps = {
  onGetStarted: () => void;
};

export function Footer({ onGetStarted }: FooterProps) {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 border-t border-navy-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center">
              <img
                src="/GFEPLUSE1.png"
                alt="GlobPulse — The pulse of global trade"
                className="h-11 w-auto object-contain"
              />
            </div>
            <p className="mt-4 text-navy-400 text-sm leading-relaxed max-w-xs">
              Build your global business presence and explore international business opportunities
              with GlobPulse.
            </p>
            <div className="mt-6">
              <CTAButton onClick={onGetStarted} variant="gold" size="md">
                Get Started — ₹999
                <ArrowRight className="w-4 h-4" />
              </CTAButton>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-navy-200 mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-navy-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-navy-200 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms & Conditions', 'Refund & Cancellation Policy', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-navy-400 hover:text-white transition-colors cursor-pointer">
                      {item}
                      {item === 'Contact' && (
                        <span className="block text-xs text-navy-500 mt-0.5">
                          [Contact details to be added]
                        </span>
                      )}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-500">
            © {new Date().getFullYear()} GlobPulse. All rights reserved.
          </p>
          <p className="text-xs text-navy-500">
            GlobPulse provides access to business opportunities. No guaranteed buyers or orders.
          </p>
        </div>
      </div>
    </footer>
  );
}
