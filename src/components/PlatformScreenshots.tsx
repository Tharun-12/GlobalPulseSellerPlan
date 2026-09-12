// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ZoomIn, X, Monitor } from 'lucide-react';
// import { platformScreenshots } from '@/data/content';
// import { SectionHeading } from '@/components/ui/Section';

// export function PlatformScreenshots() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [zoomed, setZoomed] = useState(false);

//   const current = platformScreenshots[activeTab];

//   return (
//     <section className="py-20 lg:py-28 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <SectionHeading
//           eyebrow="Platform Showcase"
//           title="Explore the GlobPulse Platform"
//           subtitle="Get a preview of the GlobPulse seller experience. [Actual GlobPulse screenshots to be added]"
//         />

//         {/* Tabs */}
//         <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
//           {platformScreenshots.map((screenshot, i) => (
//             <button
//               key={screenshot.title}
//               onClick={() => { setActiveTab(i); setZoomed(false); }}
//               className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
//                 activeTab === i
//                   ? 'bg-navy-900 text-white shadow-lg'
//                   : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
//               }`}
//             >
//               {screenshot.title}
//             </button>
//           ))}
//         </div>

//         {/* Screenshot display */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: '-80px' }}
//           transition={{ duration: 0.6 }}
//           className="mt-10 max-w-5xl mx-auto"
//         >
//           {/* Browser frame */}
//           <div className="rounded-2xl overflow-hidden bg-navy-900 shadow-2xl border border-navy-200">
//             {/* Browser bar */}
//             <div className="flex items-center gap-2 px-4 py-3 bg-navy-800 border-b border-navy-700">
//               <div className="flex gap-1.5">
//                 <div className="w-3 h-3 rounded-full bg-red-400/70" />
//                 <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
//                 <div className="w-3 h-3 rounded-full bg-green-400/70" />
//               </div>
//               <div className="flex-1 mx-4 h-6 rounded-md bg-navy-700/50 flex items-center px-3">
//                 <span className="text-xs text-navy-400 font-mono">
//                   globpulse.com/{current.title.toLowerCase().replace(/\s+/g, '-')}
//                 </span>
//               </div>
//               <Monitor className="w-4 h-4 text-navy-500" />
//             </div>

//             {/* Screenshot area */}
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeTab}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="relative aspect-video bg-gradient-to-br from-navy-100 to-navy-50 cursor-zoom-in group"
//                 onClick={() => setZoomed(true)}
//               >
//                 <img
//                   src={current.image}
//                   alt={`${current.title} preview placeholder`}
//                   loading="lazy"
//                   className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-br from-navy-950/90 via-navy-900/55 to-navy-800/65" />
//                 <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
//                   <div className="w-16 h-16 rounded-2xl bg-gold-400/15 border border-gold-400/25 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                     <ZoomIn className="w-8 h-8 text-gold-300" />
//                   </div>
//                   <p className="font-display text-xl font-bold text-white">
//                     {current.title}
//                   </p>
//                   <p className="mt-2 text-sm text-navy-100 max-w-md">
//                     {current.description}
//                   </p>
//                   <p className="mt-4 text-xs font-medium text-gold-300 uppercase tracking-wider">
//                     Stock preview — replace with actual screenshot
//                   </p>
//                 </div>

//                 {/* Hover overlay */}
//                 <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/10 transition-colors duration-300 flex items-center justify-center">
//                   <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <div className="px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm text-navy-700 text-sm font-medium shadow-lg">
//                       Click to zoom
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Description */}
//           <p className="mt-6 text-center text-navy-500 text-sm max-w-2xl mx-auto">
//             {current.description}
//           </p>
//         </motion.div>
//       </div>

//       {/* Zoom modal */}
//       <AnimatePresence>
//         {zoomed && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[60] bg-navy-950/90 backdrop-blur-sm flex items-center justify-center p-4"
//             onClick={() => setZoomed(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="relative w-full max-w-5xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={() => setZoomed(false)}
//                 className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-navy-800/80 flex items-center justify-center text-white hover:bg-navy-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
//                 aria-label="Close zoom"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//               <div className="rounded-2xl overflow-hidden bg-navy-900 border border-navy-700 shadow-2xl">
//                 <div className="flex items-center gap-2 px-4 py-3 bg-navy-800 border-b border-navy-700">
//                   <div className="flex gap-1.5">
//                     <div className="w-3 h-3 rounded-full bg-red-400/70" />
//                     <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
//                     <div className="w-3 h-3 rounded-full bg-green-400/70" />
//                   </div>
//                 </div>
//                 <div className="aspect-video bg-gradient-to-br from-navy-100 to-navy-50 flex flex-col items-center justify-center p-12 text-center">
//                   <p className="font-display text-2xl font-bold text-navy-700">
//                     {current.title}
//                   </p>
//                   <p className="mt-3 text-navy-500 max-w-lg">
//                     {current.description}
//                   </p>
//                   <p className="mt-6 text-sm font-medium text-navy-400 uppercase tracking-wider">
//                     [Actual GlobPulse Screenshot to be Added]
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }





import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus, X, Circle } from 'lucide-react';

const platformScreenshots = [
  {
    title: 'Seller Profile',
    description: 'Build and manage your seller profile on GlobPulse to present your business to international buyers.',
    image: 'https://i.pinimg.com/1200x/1c/e1/f4/1ce1f45027b5162be93162ee86f3ca17.jpg',
  },
  {
    title: 'Product Listing',
    description: 'List your products on the GlobPulse B2B marketplace to showcase them to global buyers.',
    image: 'https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Buyer Opportunities',
    description: 'Explore buyer opportunities and connect with international businesses through GlobPulse.',
    image: 'https://images.pexels.com/photos/8555366/pexels-photo-8555366.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Platform Screens',
    description: 'Navigate the GlobPulse platform to manage your presence and explore global trade opportunities.',
    image: 'https://images.pexels.com/photos/4872021/pexels-photo-4872021.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export function PlatformScreenshots() {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [direction, setDirection] = useState(1);

  const current = platformScreenshots[active];
  const total = platformScreenshots.length;

  const go = (dir: number) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + total) % total);
  };

  const jumpTo = (i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'Escape') setZoomed(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, scale: 1.04, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, scale: 1.02, x: dir < 0 ? 40 : -40 }),
  };

  return (
    <section className="relative py-24 lg:py-32 bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-navy-500/10 rounded-full blur-[120px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold-400/60" />
              <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold-400/90">
                Platform Showcase
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.05]"
            >
              Inside the
              <br />
              <span className="font-semibold bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 bg-clip-text text-transparent">
                GlobPulse
              </span>{' '}
              platform
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-white/10"
          >
            <p className="text-base text-navy-100/60 leading-relaxed">
              A curated walkthrough of the seller experience — from building
              your profile to closing cross-border deals.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-light text-white tabular-nums">
                  {String(active + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-navy-300/40">/</span>
                <span className="text-sm text-navy-300/60 tabular-nums">
                  {String(total).padStart(2, '0')}
                </span>
              </div>
              <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold-400"
                  animate={{ width: `${((active + 1) / total) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left rail */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="space-y-1 lg:sticky lg:top-32">
              {platformScreenshots.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.title}
                    onClick={() => jumpTo(i)}
                    className="group w-full text-left relative py-4 pr-4 focus:outline-none"
                  >
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] bg-gold-400 rounded-full"
                      animate={{
                        height: isActive ? '70%' : '0%',
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div className="pl-5 flex items-baseline gap-3">
                      <span
                        className={`text-[11px] tabular-nums font-medium transition-colors duration-300 ${
                          isActive ? 'text-gold-400' : 'text-navy-300/40 group-hover:text-navy-200/70'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-[15px] font-medium tracking-tight transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-navy-100/50 group-hover:text-white/80'
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>
                  </button>
                );
              })}

              <div className="pt-8 mt-8 border-t border-white/10 flex items-center gap-3 pl-5">
                <button
                  onClick={() => go(-1)}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-navy-100/60 hover:text-white hover:border-gold-400/50 hover:bg-white/5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                  aria-label="Previous"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-navy-100/60 hover:text-white hover:border-gold-400/50 hover:bg-white/5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                  aria-label="Next"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right stage */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l border-t border-gold-400/30" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-r border-t border-gold-400/30" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l border-b border-gold-400/30" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r border-b border-gold-400/30" />

              <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={active}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 group cursor-zoom-in"
                    onClick={() => setZoomed(true)}
                  >
                    {/* ⬇️ SHARP IMAGE — no opacity, no grayscale */}
                    <img
                      src={current.image}
                      alt={current.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
                    />

                    {/* ⬇️ Only a bottom gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-950/40 backdrop-blur-sm border border-white/10">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                          <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/80">
                            Live preview
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-white/60 tabular-nums px-2 py-1 rounded bg-navy-950/40 backdrop-blur-sm border border-white/10">
                          {String(active + 1).padStart(3, '0')} / {String(total).padStart(3, '0')}
                        </span>
                      </div>

                      <div className="max-w-2xl">
                        <motion.h3
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                          className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-[1.1] drop-shadow-lg"
                        >
                          {current.title}
                        </motion.h3>
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                          className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed max-w-lg drop-shadow"
                        >
                          {current.description}
                        </motion.p>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          className="mt-6"
                        >
                          <button
                            onClick={(e) => { e.stopPropagation(); setZoomed(true); }}
                            className="group/btn inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gold-300 transition-colors"
                          >
                            <span className="relative">
                              View full preview
                              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-white/40 group-hover/btn:bg-gold-400 transition-colors" />
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </motion.div>
                      </div>
                    </div>

                    <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                      <div className="w-14 h-14 rounded-full border border-gold-400/40 backdrop-blur-sm bg-navy-950/40 flex items-center justify-center">
                        <Plus className="w-5 h-5 text-gold-300" />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {platformScreenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => jumpTo(i)}
                    className="group relative h-8 w-8 flex items-center justify-center focus:outline-none"
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    <Circle
                      className={`w-2 h-2 transition-all duration-300 ${
                        i === active
                          ? 'fill-gold-400 text-gold-400 scale-125'
                          : 'fill-transparent text-navy-200/30 group-hover:text-gold-400/70'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-navy-200/40">
                <span>Use</span>
                <kbd className="px-1.5 py-0.5 rounded border border-white/15 font-mono text-[10px] text-navy-100/60">←</kbd>
                <kbd className="px-1.5 py-0.5 rounded border border-white/15 font-mono text-[10px] text-navy-100/60">→</kbd>
                <span>to navigate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[70] bg-navy-950/95 backdrop-blur-2xl flex items-center justify-center"
            onClick={() => setZoomed(false)}
          >
            <button
              onClick={() => setZoomed(false)}
              className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-navy-100/70 hover:text-white hover:border-gold-400/50 hover:bg-white/5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-navy-100/70 hover:text-white hover:border-gold-400/50 hover:bg-white/5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              aria-label="Previous"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-navy-100/70 hover:text-white hover:border-gold-400/50 hover:bg-white/5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              aria-label="Next"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[1300px] mx-4 sm:mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-navy-900 border border-white/10 rounded-sm">
                {/* ⬇️ SHARP IMAGE in modal too */}
                <img
                  src={current.image}
                  alt={current.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-16">
                  <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-gold-400/90 mb-4">
                    {String(active + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}
                  </span>
                  <h3 className="text-4xl lg:text-6xl font-light text-white tracking-tight max-w-3xl leading-[1.05] drop-shadow-lg">
                    {current.title}
                  </h3>
                  <p className="mt-5 text-white/75 max-w-xl leading-relaxed drop-shadow">
                    {current.description}
                  </p>
                  <div className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400/60" />
                    Actual GlobPulse screenshot to be added
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}