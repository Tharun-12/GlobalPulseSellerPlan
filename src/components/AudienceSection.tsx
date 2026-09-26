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




import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Leaf,
  Home,
  Cross,
  Tag,
  Dumbbell,
  Wrench,
  Zap,
  Box,
  Building2,
  Grid2X2,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';

import { SectionHeading, AnimatedSection } from '@/components/ui/Section';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

/*
|--------------------------------------------------------------------------
| Real GlobPulse image
|--------------------------------------------------------------------------
| This is already present in your Laravel public assets.
*/
const marketplaceImage =
  `${API_URL}/vibrant-home/assets/trade-globe.jpg`;

type Category = {
  id: number;
  name: string;
  slug: string;
  subcategory_count: number;
  url: string;
};

const getCategoryIcon = (name: string): LucideIcon => {
  const value = name.toLowerCase();

  if (value.includes('agri')) {
    return Leaf;
  }

  if (
    value.includes('home') ||
    value.includes('decor') ||
    value.includes('furniture')
  ) {
    return Home;
  }

  if (
    value.includes('health') ||
    value.includes('beauty') ||
    value.includes('medical') ||
    value.includes('pharma') ||
    value.includes('cosmetic')
  ) {
    return Cross;
  }

  if (
    value.includes('apparel') ||
    value.includes('fashion') ||
    value.includes('textile') ||
    value.includes('garment') ||
    value.includes('cloth')
  ) {
    return Tag;
  }

  if (
    value.includes('sport') ||
    value.includes('outdoor') ||
    value.includes('fitness') ||
    value.includes('gym')
  ) {
    return Dumbbell;
  }

  if (
    value.includes('tool') ||
    value.includes('hardware') ||
    value.includes('hardwere')
  ) {
    return Wrench;
  }

  if (
    value.includes('electron') ||
    value.includes('electric')
  ) {
    return Zap;
  }

  if (
    value.includes('raw material') ||
    value.includes('material') ||
    value.includes('metal') ||
    value.includes('mineral') ||
    value.includes('machine') ||
    value.includes('machinery') ||
    value.includes('industrial')
  ) {
    return Box;
  }

  if (
    value.includes('construction') ||
    value.includes('real estate') ||
    value.includes('realestate') ||
    value.includes('property')
  ) {
    return Building2;
  }

  return Grid2X2;
};

export function AudienceSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/homepage/categories`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch categories: ${response.status}`
          );
        }

        const result = await response.json();

        if (result.status && Array.isArray(result.data)) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error(
          'Homepage categories fetch error:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Show only 6 initially
  |--------------------------------------------------------------------------
  */
  const visibleCategories = showAll
    ? categories
    : categories.slice(0, 6);

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */
  if (loading) {
    return (
      <section
        id="who-its-for"
        className="py-14 lg:py-18 bg-navy-50/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Live Globpulse Marketplace"
            title="Explore global business opportunities"
            subtitle="Discover live product categories from GlobPulse."
          />

          <div className="mt-10 grid lg:grid-cols-2 gap-5">

            <div className="h-[340px] rounded-3xl bg-navy-100 animate-pulse" />

            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-28 rounded-2xl bg-navy-100 animate-pulse"
                />
              ))}
            </div>

          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) {
    return null;
  }

  return (
    <section
      id="who-its-for"
      className="py-14 lg:py-18 bg-navy-50/50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================================================
            HEADING
        ========================================================== */}

        <SectionHeading
          eyebrow="Live Globpulse Marketplace"
          title="Explore global business opportunities"
          subtitle="Discover live product categories and connect with businesses across the GlobPulse marketplace."
        />

        {/* =========================================================
            MAIN CONTENT
        ========================================================== */}

        <div className="mt-10 grid lg:grid-cols-[0.85fr_1.15fr] gap-5 lg:gap-6">

          {/* =======================================================
              LEFT IMAGE
          ======================================================== */}

          <AnimatedSection>

            <div className="relative h-[330px] lg:h-[380px] rounded-3xl overflow-hidden border border-navy-800 bg-navy-950 shadow-xl">

              {/* Real image */}

              <img
                src={marketplaceImage}
                alt="Global trade and marketplace"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              {/* Dark overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent" />

              {/* Top badge */}

              <div className="absolute top-5 left-5">

                <span className="inline-flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white">

                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />

                  Live Marketplace

                </span>

              </div>

              {/* Bottom content */}

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
                  GlobPulse
                </p>

                <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
                  Find products.
                  <br />
                  Find opportunities.
                </h3>

                <p className="mt-2 text-sm text-white/70 max-w-md">
                  Explore live categories from the GlobPulse B2B marketplace.
                </p>

              </div>

            </div>

          </AnimatedSection>

          {/* =======================================================
              RIGHT CATEGORIES
          ======================================================== */}

          <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {visibleCategories.map((category, index) => {

                const Icon = getCategoryIcon(
                  category.name
                );

                return (
                  <AnimatedSection
                    key={category.id}
                    delay={index * 0.04}
                  >

                    <a
                      href={category.url}
                      className="group h-full min-h-[112px] rounded-2xl border border-navy-800 bg-navy-900/90 hover:bg-navy-800 hover:border-gold-400/50 p-4 sm:p-5 flex items-center gap-4 transition-all duration-300"
                    >

                      {/* Icon */}

                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-navy-950 border border-white/5 flex items-center justify-center text-gold-400 group-hover:bg-gold-400 group-hover:text-navy-950 transition-all duration-300">

                        <Icon className="w-5 h-5" />

                      </div>

                      {/* Content */}

                      <div className="flex-1 min-w-0">

                        <h3 className="font-display text-[15px] sm:text-base font-bold text-white truncate">
                          {category.name}
                        </h3>

                        <p className="mt-1 text-xs sm:text-[13px] text-white/50">
                          {category.subcategory_count}{' '}
                          subcategories
                        </p>

                      </div>

                      {/* Arrow */}

                      <ChevronRight className="w-4 h-4 flex-shrink-0 text-white/30 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-300" />

                    </a>

                  </AnimatedSection>

                );
              })}

            </div>

            {/* =====================================================
                VIEW ALL
            ====================================================== */}

            {categories.length > 6 && (
              <div className="mt-4 flex justify-center lg:justify-end">

                <button
                  type="button"
                  onClick={() => setShowAll((value) => !value)}
                  className="inline-flex items-center gap-2 rounded-xl border border-navy-700 bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:border-gold-400 hover:text-gold-400 transition-all duration-300"
                >

                  {showAll
                    ? 'Show fewer categories'
                    : `View all ${categories.length} categories`
                  }

                  <ArrowUpRight className="w-4 h-4" />

                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}