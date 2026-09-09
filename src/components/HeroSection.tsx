import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe, Ship, Package } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';

type HeroSectionProps = {
  onGetStarted: () => void;
};

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center bg-trade-glow overflow-hidden pt-24 pb-16"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-navy-950/60" />

      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gold-400/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-navy-400/12 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
                GlobPulse Seller Plan
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-balance">
              <span className="text-white">Looking for </span>
              <span className="text-trade-gradient">International Buyers</span>
              <span className="text-white"> for Your Products?</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-navy-200 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Build your global business presence with GlobPulse — only{' '}
              <span className="font-bold text-gold-400">₹999</span>.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
              {['Manufacturers', 'Suppliers', 'Exporters'].map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 rounded-md bg-navy-700/50 border border-navy-600 text-sm font-medium text-navy-100"
                >
                  {role}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <CTAButton onClick={onGetStarted} variant="gold" size="lg">
                Get Started for ₹999
                <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>

            <div className="mt-5 flex items-center gap-2 justify-center lg:justify-start text-sm text-navy-300">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>One-time payment | Secure Razorpay checkout</span>
            </div>
          </motion.div>

          {/* Right visual - animated globe network */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative aspect-square max-w-lg mx-auto w-full"
          >
            <HeroGlobeVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroGlobeVisual() {
  const nodes = [
    { x: 50, y: 15, label: 'Europe', delay: 0 },
    { x: 80, y: 40, label: 'Asia', delay: 0.5 },
    { x: 30, y: 55, label: 'Africa', delay: 1 },
    { x: 65, y: 75, label: 'Oceania', delay: 1.5 },
    { x: 20, y: 30, label: 'Americas', delay: 2 },
  ];

  const indiaPoint = { x: 62, y: 48 };

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-10 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-navy-950/50">
        <img
          src="https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Container ship carrying products across international waters"
          className="h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/70 via-navy-900/35 to-gold-500/10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      </div>

      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-navy-600/30"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8 rounded-full border border-navy-600/20"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-16 rounded-full border border-dashed border-gold-400/15"
      />

      {/* Glow */}
      <div className="absolute inset-12 rounded-full bg-gradient-to-br from-navy-400/15 to-transparent blur-2xl" />

      {/* Central globe */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 shadow-2xl shadow-navy-500/30 flex items-center justify-center"
      >
        <Globe className="w-16 h-16 text-navy-200" />
      </motion.div>

      {/* India marker */}
      <div
        className="absolute"
        style={{ left: `${indiaPoint.x}%`, top: `${indiaPoint.y}%` }}
      >
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold-400 ring-4 ring-gold-400/20"
        />
      </div>

      {/* Connection lines from India to nodes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.map((node, i) => (
          <motion.line
            key={i}
            x1={indiaPoint.x}
            y1={indiaPoint.y}
            x2={node.x}
            y2={node.y}
            stroke="url(#lineGradient)"
            strokeWidth="0.3"
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, delay: node.delay, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
          />
        ))}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4a6fa0" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: node.delay }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-navy-300 ring-2 ring-navy-400/30" />
            <span className="text-[10px] font-medium text-navy-200 whitespace-nowrap">{node.label}</span>
          </div>
        </motion.div>
      ))}

      {/* Floating business icons */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[10%] right-[15%] w-12 h-12 rounded-xl bg-navy-700/60 backdrop-blur-sm border border-navy-600/40 flex items-center justify-center shadow-lg"
      >
        <Ship className="w-6 h-6 text-navy-200" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[15%] left-[10%] w-12 h-12 rounded-xl bg-navy-700/60 backdrop-blur-sm border border-navy-600/40 flex items-center justify-center shadow-lg"
      >
        <Package className="w-6 h-6 text-navy-200" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[20%] right-[12%] w-12 h-12 rounded-xl bg-gold-400/10 backdrop-blur-sm border border-gold-400/20 flex items-center justify-center shadow-lg"
      >
        <span className="text-sm font-bold text-gold-300">₹999</span>
      </motion.div>
    </div>
  );
}
