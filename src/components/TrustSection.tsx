import { motion } from 'framer-motion';
import { ShieldCheck, BadgeCheck, FileCheck, Building } from 'lucide-react';
import { trustItems } from '@/data/content';
import { SectionHeading, AnimatedSection } from '@/components/ui/Section';

const icons = [BadgeCheck, ShieldCheck, FileCheck, Building];

export function TrustSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Verified Platform"
          title="Trust & Business Proof"
          subtitle="GlobPulse is committed to transparency. The following areas will be populated with verified, approved information."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="h-full rounded-2xl border-2 border-dashed border-navy-200 p-7 text-center hover:border-navy-300 transition-colors">
                  <div className="w-14 h-14 rounded-xl bg-navy-50 flex items-center justify-center mx-auto">
                    <Icon className="w-7 h-7 text-navy-400" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-navy-500">
                    {item.label}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-sm text-navy-400 max-w-2xl mx-auto"
        >
          All figures, certifications, and credentials will be verified and approved before display.
          No unverified claims are presented.
        </motion.p>
      </div>
    </section>
  );
}
