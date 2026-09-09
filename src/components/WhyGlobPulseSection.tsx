import { motion } from 'framer-motion';
import { Monitor, Search, Building2, Network } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/Section';

const features = [
  {
    icon: Building2,
    title: 'Build Your Business Presence',
    description:
      'Create a professional seller profile on GlobPulse to present your business to international buyers on a B2B marketplace for manufacturers and suppliers.',
  },
  {
    icon: Search,
    title: 'Explore Buyer Opportunities',
    description:
      'Use your Buyer Credits to explore buyer and business opportunities and connect with global trade partners looking for products like yours.',
  },
  {
    icon: Monitor,
    title: 'Showcase Your Products',
    description:
      'List your products on the GlobPulse B2B platform to showcase them to international buyers and find buyers for export products.',
  },
  {
    icon: Network,
    title: 'Connect with Global Buyers',
    description:
      'GlobPulse is a B2B platform for Indian manufacturers, suppliers, and exporters to connect with global buyers and explore international business opportunities.',
  },
];

export function WhyGlobPulseSection() {
  return (
    <section id="why-globpulse" className="py-20 lg:py-28 bg-navy-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-navy-500/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3"
          >
            Why GlobPulse?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] text-balance"
          >
            See how GlobPulse helps sellers build their presence and explore global business opportunities
          </motion.h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.1}>
              <div className="group h-full rounded-2xl bg-navy-800/50 border border-navy-700/50 p-7 hover:border-gold-400/30 hover:bg-navy-800 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-700/50 group-hover:bg-gold-400/10 flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-navy-200 group-hover:text-gold-400 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-navy-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-navy-400 max-w-2xl mx-auto">
            GlobPulse provides access to business opportunities and buyer-seller connections. Actual
            enquiries and orders depend on factors such as product demand, pricing, business profile
            and buyer requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
