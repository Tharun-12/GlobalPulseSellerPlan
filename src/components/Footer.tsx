import { ArrowRight } from 'lucide-react';
import { navLinks } from '@/data/content';
import { CTAButton } from '@/components/ui/CTAButton';
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
type FooterProps = {
  onGetStarted: () => void;
    onDashboardClick: () => void;
    hasActive999Package?: boolean;

};

const footerLinks = [
  {
    label: 'Privacy Policy',
    path: '/privacy-policy',
  },
  {
    label: 'Terms & Conditions',
    path: '/term-conditions',
  },
  {
    label: 'Refund Policy',
    path: '/refund-policy',
  },
  {
    label: 'Shipping Policy',
    path: '/shipping-policy',
  },
  {
    label: 'Contact Us',
    path: '/contact',
  },
];

export function Footer({ onGetStarted,  onDashboardClick, hasActive999Package = false, }: FooterProps) {
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
              <CTAButton onClick={hasActive999Package
              ? onDashboardClick
              : onGetStarted}
               variant="gold" size="md">
                {hasActive999Package
                    ? 'View My Plan'
                    : 'Get Started — ₹999'}
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
  {footerLinks.map((link) => (
    <li key={link.label}>
      <a
        href={`${API_URL}${link.path}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-navy-400 hover:text-white transition-colors"
      >
        {link.label}
      </a>
    </li>
  ))}
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
