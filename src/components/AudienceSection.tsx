// import { ArrowUpRight } from 'lucide-react';
// import { audiences } from '@/data/content';
// import { SectionHeading, AnimatedSection } from '@/components/ui/Section';

// export function AudienceSection() {
//   return (
//     <section id="who-its-for" className="py-20 lg:py-28 bg-navy-50/50 relative overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <SectionHeading
//           eyebrow="Who Is This For?"
//           title="Built for businesses ready to explore global markets"
//           subtitle="Whether you manufacture, supply, export, or are just beginning to explore international trade, GlobPulse provides the tools to help you get started."
//         />

//         <div className="mt-16 grid lg:grid-cols-2 gap-6 lg:gap-8">
//           {audiences.map((audience, i) => (
//             <AnimatedSection key={audience.title} delay={i * 0.1}>
//               <div className="group relative rounded-2xl overflow-hidden bg-white border border-navy-100 hover:border-navy-300 hover:shadow-2xl hover:shadow-navy-900/10 transition-all duration-300">
//                 {/* Image */}
//                 <div className="relative h-56 overflow-hidden">
//                   <img
//                     src={audience.image}
//                     alt={audience.alt}
//                     loading="lazy"
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
//                   <div className="absolute bottom-4 left-5 flex items-center gap-3">
//                     <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
//                       <audience.icon className="w-6 h-6 text-white" />
//                     </div>
//                     <h3 className="font-display text-2xl font-bold text-white">
//                       {audience.title}
//                     </h3>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6">
//                   <p className="text-navy-600 leading-relaxed">
//                     {audience.description}
//                   </p>
//                   <div className="mt-4 flex items-center gap-1 text-navy-400 group-hover:text-navy-700 transition-colors">
//                     <span className="text-sm font-medium">Explore opportunities</span>
//                     <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//                   </div>
//                 </div>
//               </div>
//             </AnimatedSection>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }




import { useState } from 'react';
import {
  ArrowUpRight,
  Factory,
  Package,
  Ship,
  Compass,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading, AnimatedSection } from '@/components/ui/Section';

type Audience = {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const audiences: Audience[] = [
  {
    icon: Factory,
    title: 'Manufacturers',
    description:
      'Showcase your products beyond your existing market and reach international buyers on a B2B marketplace for manufacturers.',
    image:
      'https://images.pexels.com/photos/2760286/pexels-photo-2760286.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Industrial manufacturing facility with stainless steel tanks',
  },
  {
    icon: Package,
    title: 'Suppliers',
    description:
      'Explore new buyer and business opportunities on a B2B marketplace for suppliers and connect with global trade partners.',
    image:
      'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Workers handling packages in a large warehouse',
  },
  {
    icon: Ship,
    title: 'Exporters',
    description:
      'Expand your international business reach and find buyers for export products through a B2B platform for exporters in India.',
    image:
      'https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Cargo ship loaded with containers at sunset',
  },
  {
    icon: Compass,
    title: 'Businesses Exploring Exports',
    description:
      'Build your foundation before entering international markets with the tools and knowledge to start exploring global opportunities.',
    image:
      'https://images.pexels.com/photos/7792841/pexels-photo-7792841.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Business handshake in a professional office setting',
  },
];

export function AudienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = audiences[activeIndex];

  return (
    <section
      id="who-its-for"
      className="py-20 lg:py-28 bg-navy-50/50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Who Is This For?"
          title="Built for businesses ready to explore global markets"
          subtitle="Whether you manufacture, supply, export, or are just beginning to explore international trade, GlobPulse provides the tools to help you get started."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* LEFT — Featured / Carousel content */}
          <AnimatedSection>
            <div className="relative h-full rounded-3xl overflow-hidden bg-white border border-navy-100 shadow-xl shadow-navy-900/5 min-h-[480px]">
              {/* Image with crossfade */}
              {audiences.map((audience, i) => (
                <div
                  key={audience.title}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    i === activeIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={audience.image}
                    alt={audience.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/60 to-navy-900/20" />
                </div>
              ))}

              {/* Content overlay */}
              <div className="relative h-full flex flex-col justify-end p-8 sm:p-10 text-white">
                {/* Icon + eyebrow */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <active.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
                    Featured Audience
                  </span>
                </div>

                {/* Animated title + description */}
                <div key={activeIndex} className="animate-fade-up">
                  <h3 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                    {active.title}
                  </h3>
                  <p className="mt-3 text-navy-100 text-base leading-relaxed max-w-lg">
                    {active.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-gold-400 font-medium text-sm cursor-pointer group">
                    <span>Explore opportunities</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Pagination dots */}
                <div className="mt-8 flex items-center gap-2">
                  {audiences.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? 'w-8 bg-gold-400'
                          : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

                  
         {/* RIGHT — Clickable card list */}
    <div className="flex flex-col gap-3 lg:gap-4">
  {audiences.map((audience, i) => {
    const isActive = i === activeIndex;
    return (
      <AnimatedSection key={audience.title} delay={i * 0.05}>
        <button
          onClick={() => setActiveIndex(i)}
          className={`group w-full text-left rounded-2xl border p-5 sm:p-6 transition-all duration-300 flex items-start gap-4 ${
            isActive
              ? 'bg-white border-gold-400/60 shadow-lg shadow-navy-900/10 ring-1 ring-gold-400/30'
              : 'bg-white border-navy-100 hover:border-navy-300 hover:shadow-md'
          }`}
        >
          {/* Icon */}
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
              isActive
                ? 'bg-navy-900 text-gold-400'
                : 'bg-navy-900 text-white group-hover:bg-navy-800'
            }`}
          >
            <audience.icon className="w-6 h-6" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-lg font-bold text-navy-900">
                {audience.title}
              </h3>
              <ArrowUpRight
                className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                  isActive
                    ? 'text-gold-500 translate-x-0.5 -translate-y-0.5'
                    : 'text-navy-300 group-hover:text-navy-500'
                }`}
              />
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-navy-600">
              {audience.description}
            </p>
          </div>
        </button>
      </AnimatedSection>
    );
  })}
    </div>
        </div>
      </div>
    </section>
  );
}