import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type MobileStickyCTAProps = {
  onGetStarted: () => void;
};

export function MobileStickyCTA({ onGetStarted }: MobileStickyCTAProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-900/95 backdrop-blur-md border-t border-navy-700 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom)]"
    >
      <button
        onClick={onGetStarted}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-400 text-navy-900 font-semibold text-base shadow-lg active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
      >
        Activate Plan — ₹999
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
