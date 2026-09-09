import { Check } from 'lucide-react';
import { benefits, planBenefits } from '@/data/content';
import { AnimatedSection, SectionHeading } from '@/components/ui/Section';
import { CTAButton } from '@/components/ui/CTAButton';

type BenefitsSectionProps = {
  onGetStarted: () => void;
};

export function BenefitsSection({ onGetStarted }: BenefitsSectionProps) {
  return (
    <section id="what-you-get" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What You Get"
          title="Everything You Need to Start Exploring Global Markets — Only ₹999"
          subtitle="Four business benefits designed to help manufacturers, suppliers, and exporters build their global presence."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <AnimatedSection key={benefit.title} delay={i * 0.1}>
              <div className="group h-full rounded-2xl bg-white border border-navy-100 p-7 hover:border-navy-300 hover:shadow-xl hover:shadow-navy-900/5 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-navy-50 group-hover:bg-navy-900 flex items-center justify-center transition-colors duration-300">
                  <benefit.icon className="w-7 h-7 text-navy-700 group-hover:text-gold-400 transition-colors duration-300" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-navy-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Value statement */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 rounded-3xl bg-navy-900 overflow-hidden relative">
            <div className="absolute inset-0 bg-dot-pattern opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gold-500/10 blur-[80px] rounded-full" />
            <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-4">
                4 Business Benefits. 1 Plan.
              </p>
              <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                Only <span className="text-gold-400">₹999</span>
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-2xl mx-auto">
                {planBenefits.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-navy-100">
                    <Check className="w-5 h-5 text-gold-400 flex-shrink-0" />
                    <span className="text-sm font-medium">{b}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <CTAButton onClick={onGetStarted} variant="gold" size="lg">
                  Activate Now — ₹999
                </CTAButton>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
