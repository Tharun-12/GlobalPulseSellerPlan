import { motion } from 'framer-motion';
import { howItWorksSteps } from '@/data/content';
import { SectionHeading } from '@/components/ui/Section';

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-navy-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="Get Started in 3 Simple Steps"
          subtitle="From registration to activation in minutes."
        />

        {/* Desktop horizontal */}
        <div className="mt-16 hidden lg:flex items-start justify-between relative max-w-4xl mx-auto">
          <div className="absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-navy-200 via-gold-400/40 to-navy-200" />
          {howItWorksSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex-1 max-w-[260px] flex flex-col items-center text-center relative z-10"
            >
              <div className="w-24 h-24 rounded-full bg-white border-2 border-navy-200 flex items-center justify-center shadow-lg">
                <span className="font-display text-3xl font-bold text-navy-900">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-navy-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-navy-500 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="mt-16 lg:hidden flex flex-col gap-8 relative max-w-md mx-auto">
          <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-navy-200 via-gold-400/40 to-navy-200" />
          {howItWorksSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-5 items-start relative z-10"
            >
              <div className="w-24 h-24 rounded-full bg-white border-2 border-navy-200 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="font-display text-3xl font-bold text-navy-900">
                  {step.number}
                </span>
              </div>
              <div className="pt-4">
                <h3 className="font-display text-lg font-bold text-navy-900">
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
    </section>
  );
}



