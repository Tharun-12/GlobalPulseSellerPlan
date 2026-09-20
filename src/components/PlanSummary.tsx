import { motion } from 'framer-motion';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { planBenefits } from '@/data/content';
import { CTAButton } from '@/components/ui/CTAButton';

type PlanSummaryProps = {
  onGetStarted: () => void;
  onDashboardClick: () => void;
  hasActive999Package?: boolean;
};

export function PlanSummary({
  onGetStarted,
  onDashboardClick,
  hasActive999Package = false,
}: PlanSummaryProps) {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl bg-navy-900 overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gold-500/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-navy-500/20 blur-[80px] rounded-full" />

          <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-4"
            >
              ₹999 Seller Plan
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance"
            >
              Everything You Need to Start Exploring Global Markets
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, type: 'spring' }}
              className="mt-8 inline-flex items-baseline gap-2"
            >
              <span className="font-display text-6xl sm:text-7xl font-bold text-gold-400">
                ₹999
              </span>
              <span className="text-navy-300 text-lg font-medium">one-time</span>
            </motion.div>

            <div className="mt-8 grid sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left">
              {planBenefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-gold-400" />
                  </div>
                  <span className="text-navy-100 font-medium text-sm sm:text-base">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10"
            >
              <CTAButton onClick={hasActive999Package
              ? onDashboardClick
              : onGetStarted} variant="gold" size="lg">
                {hasActive999Package
                  ? 'View My Plan'
                  : 'Activate My Plan — ₹999'}

                <ArrowRight className="w-5 h-5" />
              </CTAButton>
              <div className="mt-4 flex items-center gap-2 justify-center text-sm text-navy-300">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Secure payment through Razorpay</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
