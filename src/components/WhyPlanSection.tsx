import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { journeySteps } from '@/data/content';
import { SectionHeading } from '@/components/ui/Section';

export function WhyPlanSection() {
  return (
    <section id="why-plan" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Consider the ₹999 Plan?"
          title="Your Product Is Ready. Is Your Business Ready for Global Buyers?"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg text-navy-500 leading-relaxed text-center max-w-2xl mx-auto"
        >
          Finding international buyers requires more than having a good product. Businesses also need
          export knowledge, buyer opportunities and a professional business presence.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-center text-navy-700 font-semibold text-lg"
        >
          The ₹999 plan brings these starting points together:
        </motion.p>

        {/* Journey */}
        <div className="mt-16">
          {/* Desktop horizontal */}
          <div className="hidden lg:flex items-start justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-navy-200 via-navy-300 to-navy-200" />

            {journeySteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex-1 max-w-[220px] flex flex-col items-center text-center relative z-10"
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-navy-200 flex items-center justify-center shadow-lg group-hover:border-gold-400 transition-colors">
                    <step.icon className="w-10 h-10 text-navy-700" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold-400 text-navy-900 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <span className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-500">
                  {step.label}
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-navy-500 leading-relaxed">
                  {step.description}
                </p>
                {i < journeySteps.length - 1 && (
                  <ArrowRight className="hidden" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile vertical timeline */}
          <div className="lg:hidden flex flex-col gap-8 relative">
            <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-navy-200 via-navy-300 to-navy-200" />
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-5 items-start relative z-10"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-navy-200 flex items-center justify-center shadow-lg">
                    <step.icon className="w-10 h-10 text-navy-700" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold-400 text-navy-900 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <div className="pt-3">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-500">
                    {step.label}
                  </span>
                  <h3 className="mt-1 font-display text-base font-bold text-navy-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
