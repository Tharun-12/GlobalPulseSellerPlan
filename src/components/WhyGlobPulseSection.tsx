// import { motion } from 'framer-motion';
// import { Monitor, Search, Building2, Network } from 'lucide-react';
// import { AnimatedSection } from '@/components/ui/Section';

// const features = [
//   {
//     icon: Building2,
//     title: 'Build Your Business Presence',
//     description:
//       'Create a professional seller profile on GlobPulse to present your business to international buyers on a B2B marketplace for manufacturers and suppliers.',
//   },
//   {
//     icon: Search,
//     title: 'Explore Buyer Opportunities',
//     description:
//       'Use your Buyer Credits to explore buyer and business opportunities and connect with global trade partners looking for products like yours.',
//   },
//   {
//     icon: Monitor,
//     title: 'Showcase Your Products',
//     description:
//       'List your products on the GlobPulse B2B platform to showcase them to international buyers and find buyers for export products.',
//   },
//   {
//     icon: Network,
//     title: 'Connect with Global Buyers',
//     description:
//       'GlobPulse is a B2B platform for Indian manufacturers, suppliers, and exporters to connect with global buyers and explore international business opportunities.',
//   },
// ];

// export function WhyGlobPulseSection() {
//   return (
//     <section id="why-globpulse" className="py-20 lg:py-28 bg-navy-900 relative overflow-hidden">
//       {/* Background pattern */}
//       <div className="absolute inset-0 bg-grid-pattern opacity-20" />
//       <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-navy-500/10 rounded-full blur-[120px]" />

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center max-w-3xl mx-auto">
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3"
//           >
//             Why GlobPulse?
//           </motion.p>
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] text-balance"
//           >
//             See how GlobPulse helps sellers build their presence and explore global business opportunities
//           </motion.h2>
//         </div>

//         <div className="mt-16 grid sm:grid-cols-2 gap-6">
//           {features.map((feature, i) => (
//             <AnimatedSection key={feature.title} delay={i * 0.1}>
//               <div className="group h-full rounded-2xl bg-navy-800/50 border border-navy-700/50 p-7 hover:border-gold-400/30 hover:bg-navy-800 transition-all duration-300">
//                 <div className="flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-navy-700/50 group-hover:bg-gold-400/10 flex items-center justify-center transition-colors duration-300 flex-shrink-0">
//                     <feature.icon className="w-6 h-6 text-navy-200 group-hover:text-gold-400 transition-colors duration-300" />
//                   </div>
//                   <div>
//                     <h3 className="font-display text-lg font-bold text-white">
//                       {feature.title}
//                     </h3>
//                     <p className="mt-2 text-sm text-navy-300 leading-relaxed">
//                       {feature.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </AnimatedSection>
//           ))}
//         </div>

//         {/* Disclaimer */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mt-12 text-center"
//         >
//           <p className="text-sm text-navy-400 max-w-2xl mx-auto">
//             GlobPulse provides access to business opportunities and buyer-seller connections. Actual
//             enquiries and orders depend on factors such as product demand, pricing, business profile
//             and buyer requirements.
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { Monitor, Search, Building2, Network, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setActiveIndex((index + features.length) % features.length);
  }, []);

  const next = useCallback(() => goTo(activeIndex + 1, 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1, -1), [activeIndex, goTo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const activeFeature = features[activeIndex];

  return (
    <section id="why-globpulse" className="py-20 lg:py-28 bg-navy-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-navy-500/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
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

        {/* Two column layout — 60% / 35% split, both equal height */}
        <div className="mt-16 grid lg:grid-cols-[60fr_35fr] gap-5 lg:gap-8 items-stretch">
          {/* Left: 60% — Carousel (defines the row height) */}
          <div className="flex flex-col">
            {/* Card container with fixed height — this sets the height for BOTH sides */}
            <div className="relative h-[420px] sm:h-[460px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * 50 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <div className="h-full rounded-2xl bg-navy-800/50 border border-navy-700/50 p-8 hover:border-gold-400/30 hover:bg-navy-800 transition-all duration-300 flex flex-col">
                    <div className="w-14 h-14 rounded-xl bg-navy-700/50 flex items-center justify-center flex-shrink-0">
                      <activeFeature.icon className="w-7 h-7 text-gold-400" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold text-white">
                      {activeFeature.title}
                    </h3>
                    <p className="mt-4 text-base text-navy-300 leading-relaxed">
                      {activeFeature.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrows + Dots */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="w-10 h-10 rounded-full bg-navy-800/70 border border-navy-700/50 flex items-center justify-center text-navy-200 hover:bg-gold-400 hover:text-navy-900 hover:border-gold-400 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {features.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-8 bg-gold-400' : 'w-2 bg-navy-600 hover:bg-navy-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next slide"
                className="w-10 h-10 rounded-full bg-navy-800/70 border border-navy-700/50 flex items-center justify-center text-navy-200 hover:bg-gold-400 hover:text-navy-900 hover:border-gold-400 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right: 35% — Static image, same height as card only */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-start"
          >
            <img
              src="https://i.pinimg.com/1200x/8a/72/ea/8a72eae989508f49244da3c9824fcf6a.jpg"
              alt="Global B2B trade and business connections on GlobPulse"
              className="w-full h-[420px] sm:h-[460px] object-cover rounded-2xl"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
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