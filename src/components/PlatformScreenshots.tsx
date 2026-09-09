import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, Monitor } from 'lucide-react';
import { platformScreenshots } from '@/data/content';
import { SectionHeading } from '@/components/ui/Section';

export function PlatformScreenshots() {
  const [activeTab, setActiveTab] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const current = platformScreenshots[activeTab];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Platform Showcase"
          title="Explore the GlobPulse Platform"
          subtitle="Get a preview of the GlobPulse seller experience. [Actual GlobPulse screenshots to be added]"
        />

        {/* Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {platformScreenshots.map((screenshot, i) => (
            <button
              key={screenshot.title}
              onClick={() => { setActiveTab(i); setZoomed(false); }}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                activeTab === i
                  ? 'bg-navy-900 text-white shadow-lg'
                  : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
              }`}
            >
              {screenshot.title}
            </button>
          ))}
        </div>

        {/* Screenshot display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-10 max-w-5xl mx-auto"
        >
          {/* Browser frame */}
          <div className="rounded-2xl overflow-hidden bg-navy-900 shadow-2xl border border-navy-200">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-navy-800 border-b border-navy-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 mx-4 h-6 rounded-md bg-navy-700/50 flex items-center px-3">
                <span className="text-xs text-navy-400 font-mono">
                  globpulse.com/{current.title.toLowerCase().replace(/\s+/g, '-')}
                </span>
              </div>
              <Monitor className="w-4 h-4 text-navy-500" />
            </div>

            {/* Screenshot area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-video bg-gradient-to-br from-navy-100 to-navy-50 cursor-zoom-in group"
                onClick={() => setZoomed(true)}
              >
                <img
                  src={current.image}
                  alt={`${current.title} preview placeholder`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-navy-950/90 via-navy-900/55 to-navy-800/65" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gold-400/15 border border-gold-400/25 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ZoomIn className="w-8 h-8 text-gold-300" />
                  </div>
                  <p className="font-display text-xl font-bold text-white">
                    {current.title}
                  </p>
                  <p className="mt-2 text-sm text-navy-100 max-w-md">
                    {current.description}
                  </p>
                  <p className="mt-4 text-xs font-medium text-gold-300 uppercase tracking-wider">
                    Stock preview — replace with actual screenshot
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm text-navy-700 text-sm font-medium shadow-lg">
                      Click to zoom
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Description */}
          <p className="mt-6 text-center text-navy-500 text-sm max-w-2xl mx-auto">
            {current.description}
          </p>
        </motion.div>
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy-950/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomed(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-navy-800/80 flex items-center justify-center text-white hover:bg-navy-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                aria-label="Close zoom"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="rounded-2xl overflow-hidden bg-navy-900 border border-navy-700 shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-navy-800 border-b border-navy-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                    <div className="w-3 h-3 rounded-full bg-green-400/70" />
                  </div>
                </div>
                <div className="aspect-video bg-gradient-to-br from-navy-100 to-navy-50 flex flex-col items-center justify-center p-12 text-center">
                  <p className="font-display text-2xl font-bold text-navy-700">
                    {current.title}
                  </p>
                  <p className="mt-3 text-navy-500 max-w-lg">
                    {current.description}
                  </p>
                  <p className="mt-6 text-sm font-medium text-navy-400 uppercase tracking-wider">
                    [Actual GlobPulse Screenshot to be Added]
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
