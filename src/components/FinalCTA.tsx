import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { planBenefits } from '@/data/content';
import { CTAButton } from '@/components/ui/CTAButton';

type FinalCTAProps = {
  onGetStarted: () => void;
    hasActive999Package?: boolean;
};

export function FinalCTA({ onGetStarted,  hasActive999Package = false, }: FinalCTAProps) {
  return (
    <section className="py-20 lg:py-28 bg-trade-glow relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-navy-400/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold-400/8 rounded-full blur-[120px]" />
      </div>

      {/* Decorative network lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
        <defs>
          <pattern id="worldMap" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#worldMap)" />
      </svg>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-gold-400/30"
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 mb-6"
        >
          <Globe className="w-4 h-4 text-gold-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            Start Your Global Journey
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] text-balance"
        >
          <span className="text-white">Your Products Are Ready. </span>
          <span className="text-trade-gradient">Start Exploring Global Business Opportunities.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-lg text-navy-200"
        >
          Get Started with GlobPulse — Only{' '}
          <span className="font-bold text-gold-400">₹999</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-2xl mx-auto"
        >
          {planBenefits.map((benefit, i) => (
            <span key={benefit} className="text-sm text-navy-300">
              {benefit}
              {i < planBenefits.length - 1 && (
                <span className="text-navy-600 ml-4">|</span>
              )}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <CTAButton onClick={onGetStarted} variant="gold" size="lg">
              {hasActive999Package
                    ? 'Go to Seller Dashboard'
                    : 'Activate My Plan — ₹999'}
            <ArrowRight className="w-5 h-5" />
          </CTAButton>
          <div className="flex items-center gap-2 text-sm text-navy-300">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>Secure payment through Razorpay</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
