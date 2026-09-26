// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Play, X } from 'lucide-react';

// const demoVideoUrl = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
// const demoPosterUrl = 'https://images.pexels.com/photos/9034729/pexels-photo-9034729.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
// import { SectionHeading } from '@/components/ui/Section';

// export function PlatformVideo() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <section className="py-20 lg:py-28 bg-navy-50/50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <SectionHeading
//           eyebrow="Platform Video"
//           title="See How GlobPulse Works"
//           subtitle="Understand what GlobPulse is, how sellers use the platform and how buyer opportunities work."
//         />

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: '-80px' }}
//           transition={{ duration: 0.7 }}
//           className="mt-12 max-w-4xl mx-auto"
//         >
//           <button
//             onClick={() => setIsOpen(true)}
//             className="group relative w-full aspect-video rounded-2xl overflow-hidden bg-navy-900 border border-navy-700 shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-4"
//             aria-label="Play GlobPulse platform video"
//           >
//             {/* Thumbnail background */}
//             <img
//               src={demoPosterUrl}
//               alt="Business team planning international trade opportunities"
//               className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
//             />
//             <div className="absolute inset-0 bg-gradient-to-br from-navy-950/90 via-navy-900/65 to-navy-900/40" />
//             <div className="absolute inset-0 bg-grid-pattern opacity-20" />

//             {/* Decorative elements */}
//             <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-navy-500/20 rounded-full blur-[80px]" />
//             <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gold-500/10 rounded-full blur-[60px]" />

//             {/* Play button */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 className="relative"
//               >
//                 <div className="absolute inset-0 rounded-full bg-gold-400/30 blur-xl animate-glow" />
//                 <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold-400 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
//                   <Play className="w-8 h-8 sm:w-10 sm:h-10 text-navy-900 ml-1" fill="currentColor" />
//                 </div>
//               </motion.div>
//             </div>

//             {/* Label */}
//             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy-950/80 to-transparent">
//               <p className="text-white font-display text-lg font-semibold">
//                 GlobPulse Platform Overview
//               </p>
//               <p className="text-navy-200 text-sm mt-1">
//                 Demo video placeholder — replace with the actual GlobPulse video
//               </p>
//             </div>
//           </button>
//         </motion.div>
//       </div>

//       {/* Video modal */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[60] bg-navy-950/90 backdrop-blur-sm flex items-center justify-center p-4"
//             onClick={() => setIsOpen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="relative w-full max-w-4xl aspect-video bg-navy-900 rounded-2xl overflow-hidden border border-navy-700 shadow-2xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-navy-800/80 flex items-center justify-center text-white hover:bg-navy-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
//                 aria-label="Close video"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//               <video
//                 controls
//                 autoPlay
//                 playsInline
//                 poster={demoPosterUrl}
//                 className="h-full w-full object-cover"
//               >
//                 <source src={demoVideoUrl} type="video/mp4" />
//                 Your browser does not support video playback.
//               </video>
//               <div className="absolute bottom-4 left-4 rounded-lg bg-navy-950/80 px-3 py-2 text-xs text-navy-100">
//                 Demo video placeholder — replace before launch
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }




// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Play, X } from 'lucide-react';

// const demoVideoUrl = 'https://www.pexels.com/download/video/33302243/';
// const demoPosterUrl = 'https://i.pinimg.com/736x/e1/d1/b7/e1d1b733b97073079e80e5296c008c4d.jpg';
// import { SectionHeading } from '@/components/ui/Section';

// export function PlatformVideo() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <section className="py-20 lg:py-28 bg-navy-50/50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <SectionHeading
//           eyebrow="Platform Video"
//           title="See How GlobPulse Works"
//           subtitle="Understand what GlobPulse is, how sellers use the platform and how buyer opportunities work."
//         />

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: '-80px' }}
//           transition={{ duration: 0.7 }}
//           className="mt-12 max-w-4xl mx-auto"
//         >
//           <button
//             onClick={() => setIsOpen(true)}
//             className="group relative w-full aspect-video rounded-2xl overflow-hidden bg-navy-900 border border-navy-700 shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-4"
//             aria-label="Play GlobPulse platform video"
//           >
//             {/* Thumbnail background */}
//             <img
//               src={demoPosterUrl}
//               alt="Business team planning international trade opportunities"
//               className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
//             />
//             <div className="absolute inset-0 bg-gradient-to-br from-navy-950/90 via-navy-900/65 to-navy-900/40" />
//             <div className="absolute inset-0 bg-grid-pattern opacity-20" />

//             {/* Decorative elements */}
//             <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-navy-500/20 rounded-full blur-[80px]" />
//             <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gold-500/10 rounded-full blur-[60px]" />

//             {/* Play button */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 className="relative"
//               >
//                 <div className="absolute inset-0 rounded-full bg-gold-400/30 blur-xl animate-glow" />
//                 <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold-400 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
//                   <Play className="w-8 h-8 sm:w-10 sm:h-10 text-navy-900 ml-1" fill="currentColor" />
//                 </div>
//               </motion.div>
//             </div>

//             {/* Label */}
//             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy-950/80 to-transparent">
//               <p className="text-white font-display text-lg font-semibold">
//                 GlobPulse Platform Overview
//               </p>
//               <p className="text-navy-200 text-sm mt-1">
//                 Demo video placeholder — replace with the actual GlobPulse video
//               </p>
//             </div>
//           </button>
//         </motion.div>
//       </div>

//       {/* Video modal */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[60] bg-navy-950/90 backdrop-blur-sm flex items-center justify-center p-4"
//             onClick={() => setIsOpen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="relative w-full max-w-4xl aspect-video bg-navy-900 rounded-2xl overflow-hidden border border-navy-700 shadow-2xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-navy-800/80 flex items-center justify-center text-white hover:bg-navy-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
//                 aria-label="Close video"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//               <video
//                 controls
//                 autoPlay
//                 playsInline
//                 poster={demoPosterUrl}
//                 className="h-full w-full object-cover"
//               >
//                 <source src={demoVideoUrl} type="video/mp4" />
//                 Your browser does not support video playback.
//               </video>
//               <div className="absolute bottom-4 left-4 rounded-lg bg-navy-950/80 px-3 py-2 text-xs text-navy-100">
//                 Demo video placeholder — replace before launch
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }


import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const exportVideo =
  `${API_URL}/vibrant-home/assets/exim-trade1.mp4`;

const exportPoster =
  `${API_URL}/vibrant-home/assets/trade-globe.jpg`;

export function PlatformVideo() {
  return (
    <section
      id="platform-video"
      className="py-14 sm:py-16 lg:py-20 bg-navy-50/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center rounded-full bg-navy-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
            See How It Works
          </span>

          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900">
            See Our Export Process In Action
          </h2>

          <p className="mt-4 text-base sm:text-lg text-navy-500 leading-relaxed">
            Discover how GlobPulse helps businesses source, connect,
            prepare and explore international trade opportunities.
          </p>
        </motion.div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10"
        >
          <div className="relative overflow-hidden rounded-2xl bg-navy-950 shadow-2xl border border-navy-200">

            <video
              controls
              playsInline
              preload="metadata"
              poster={exportPoster}
              className="block w-full aspect-video object-cover"
              src={exportVideo}
            >
              Your browser does not support the video tag.
            </video>

            {/* Small label */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <div className="flex items-center gap-2 rounded-full bg-navy-950/70 backdrop-blur-md border border-white/10 px-3 py-1.5">
                <Play className="w-3.5 h-3.5 text-gold-400" />

                <span className="text-xs font-medium text-white">
                  GlobPulse Export Journey
                </span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Small points */}
        <div className="mt-6 grid sm:grid-cols-3 gap-3 max-w-4xl mx-auto">

          <div className="rounded-xl bg-white border border-navy-100 p-4 text-center">
            <p className="text-sm font-semibold text-navy-900">
              Global Opportunities
            </p>

            <p className="mt-1 text-xs text-navy-500">
              Explore international markets
            </p>
          </div>

          <div className="rounded-xl bg-white border border-navy-100 p-4 text-center">
            <p className="text-sm font-semibold text-navy-900">
              Business Connections
            </p>

            <p className="mt-1 text-xs text-navy-500">
              Connect with trade partners
            </p>
          </div>

          <div className="rounded-xl bg-white border border-navy-100 p-4 text-center">
            <p className="text-sm font-semibold text-navy-900">
              Export Support
            </p>

            <p className="mt-1 text-xs text-navy-500">
              Build export-ready capability
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}