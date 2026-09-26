// import { motion } from 'framer-motion';
// import { Quote } from 'lucide-react';
// import { testimonials } from '@/data/content';
// import { SectionHeading, AnimatedSection } from '@/components/ui/Section';

// export function TestimonialsSection() {
//   return (
//     <section className="py-20 lg:py-28 bg-navy-50/50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <SectionHeading
//           eyebrow="Seller Testimonials"
//           title="What Sellers Say"
//           subtitle="Genuine feedback from businesses using GlobPulse. [Approved seller testimonials to be added]"
//         />

//         <div className="mt-16 grid md:grid-cols-3 gap-6">
//           {testimonials.map((testimonial, i) => (
//             <AnimatedSection key={i} delay={i * 0.1}>
//               <div className="h-full rounded-2xl bg-white border border-navy-100 p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
//                 <Quote className="w-10 h-10 text-gold-400/40 flex-shrink-0" />
//                 <p className="mt-4 text-navy-600 leading-relaxed flex-1 italic">
//                   {testimonial.text}
//                 </p>

//                 {/* Placeholder for seller photo/logo */}
//                 <div className="mt-6 pt-6 border-t border-navy-100 flex items-center gap-4">
//                   <div className="w-14 h-14 rounded-xl bg-navy-100 border border-dashed border-navy-300 flex items-center justify-center flex-shrink-0">
//                     <span className="text-[10px] font-medium text-navy-400 text-center leading-tight px-1">
//                       [Approved Seller Photo]
//                     </span>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-navy-800 text-sm">
//                       {testimonial.businessName}
//                     </p>
//                     <p className="text-navy-400 text-xs mt-0.5">
//                       {testimonial.designation}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </AnimatedSection>
//           ))}
//         </div>

//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mt-10 text-center text-sm text-navy-400"
//         >
//           Testimonials will be replaced with genuine approved seller feedback.
//         </motion.p>
//       </div>
//     </section>
//   );
// }





// import { motion } from 'framer-motion';
// import { Quote, Star } from 'lucide-react';
// import { testimonials } from '@/data/content';
// import { SectionHeading, AnimatedSection } from '@/components/ui/Section';

// // Each card gets its own unique seller image — replace with real approved seller photos
// const sellerImages = [
//   'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces', // Card 1
//   'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=faces', // Card 2
//   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces', // Card 3
// ];

// export function TestimonialsSection() {
//   return (
//     <section className="py-20 lg:py-28 bg-navy-50/50 relative overflow-hidden">
//       {/* Background Decorative Accents */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
//         <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
//         <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <SectionHeading
//           eyebrow="Seller Testimonials"
//           title="What Sellers Say"
//           subtitle="Genuine feedback from businesses using GlobPulse. [Approved seller testimonials to be added]"
//         />

//         <div className="mt-16 grid md:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, i) => (
//             <AnimatedSection key={i} delay={i * 0.1}>
//               {/* Speech Bubble Card Container */}
//               <div className="relative h-full group">
                
//                 {/* The Bubble Body */}
//                 <div className="relative h-full bg-white rounded-2xl p-7 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-navy-100 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col z-10">
                  
//                   {/* Top Left Quote Icon */}
//                   <div className="absolute -top-5 -left-3 bg-white rounded-full p-1 z-20">
//                     <Quote className="w-8 h-8 text-blue-500 fill-blue-500 rotate-180" />
//                   </div>

//                   {/* Author Info */}
//                   <div className="flex items-center gap-4 mb-6 mt-2">
//                     {/* Unique seller photo per card */}
//                     <div className="w-14 h-14 rounded-full bg-navy-50 border-2 border-white shadow-sm flex items-center justify-center flex-shrink-0 overflow-hidden">
//                       <img
//                         src={sellerImages[i]}
//                         alt={`${testimonial.businessName} seller`}
//                         className="w-full h-full object-cover"
//                         loading="lazy"
//                       />
//                     </div>
//                     <div>
//                       <p className="font-bold text-navy-900 text-base">
//                         {testimonial.businessName}
//                       </p>
//                       <p className="text-navy-500 text-sm font-medium mt-0.5">
//                         {testimonial.designation}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Testimonial Text */}
//                   <p className="text-navy-600 leading-relaxed flex-1 text-[15px] font-medium">
//                     {testimonial.text}
//                   </p>

//                   {/* Star Rating */}
//                   <div className="flex items-center gap-1 mt-6 pt-6 border-t border-navy-50">
//                     {[...Array(5)].map((_, index) => (
//                       <Star 
//                         key={index} 
//                         className="w-4 h-4 text-navy-800 fill-navy-800" 
//                       />
//                     ))}
//                   </div>

//                   {/* Bottom Right Quote Icon */}
//                   <div className="absolute -bottom-5 -right-3 bg-white rounded-full p-1 z-20">
//                     <Quote className="w-8 h-8 text-blue-500 fill-blue-500" />
//                   </div>
//                 </div>

//                 {/* Speech Bubble Tail */}
//                 <div className="absolute -bottom-3 left-8 w-6 h-6 bg-white border-b border-l border-navy-100 transform -rotate-45 z-0 group-hover:shadow-[-4px_4px_6px_-2px_rgba(0,0,0,0.02)] transition-shadow duration-300"></div>
//               </div>
//             </AnimatedSection>
//           ))}
//         </div>

//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mt-14 text-center text-sm text-navy-400 font-medium"
//         >
//           Testimonials will be replaced with genuine approved seller feedback.
//         </motion.p>
//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Quote,
  MapPin,
  Building2,
  Package,
  IndianRupee,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const API_URL = (
  import.meta.env.VITE_API_URL ||
  'https://globpulsebita.gfeworldwide.com'
).replace(/\/$/, '');

/*
|--------------------------------------------------------------------------
| Laravel fallback images
|--------------------------------------------------------------------------
| These are real assets already used by the Laravel homepage.
*/
const FALLBACK_IMAGE =
  'https://globpulsebita.gfeworldwide.com/vibrant-home/assets/trade-globe.jpg';

const FALLBACK_IMAGE_2 =
  'https://globpulsebita.gfeworldwide.com/vibrant-home/assets/hero-poster.jpg';

type SuccessStory = {
  id: number;
  client_name: string | null;
  company_name: string | null;
  product: string | null;
  amount: number | string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  location: string;
  description: string;
  logo: string | null;
  url: string;
};

export function TestimonialsSection() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Load dynamic stories from Laravel
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    let cancelled = false;

    const loadStories = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          `${API_URL}/api/success-stories`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load success stories: ${response.status}`
          );
        }

        const result = await response.json();

        if (!cancelled) {
          setStories(
            Array.isArray(result?.data)
              ? result.data
              : []
          );
        }
      } catch (err) {
        console.error(
          'Success stories loading error:',
          err
        );

        if (!cancelled) {
          setError(true);
          setStories([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadStories();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Amount formatter
  |--------------------------------------------------------------------------
  */
  const formatAmount = (
    amount: number | string | null
  ) => {
    if (
      amount === null ||
      amount === '' ||
      Number.isNaN(Number(amount))
    ) {
      return null;
    }

    return `₹${Number(amount).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
    })}`;
  };

  /*
  |--------------------------------------------------------------------------
  | Get initials for fallback avatar
  |--------------------------------------------------------------------------
  */
  const getInitials = (story: SuccessStory) => {
    const value =
      story.company_name ||
      story.client_name ||
      story.product ||
      'GP';

    return value
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  /*
  |--------------------------------------------------------------------------
  | Image error fallback
  |--------------------------------------------------------------------------
  */
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>,
    fallback = FALLBACK_IMAGE
  ) => {
    const image = event.currentTarget;

    if (image.dataset.fallbackApplied === 'true') {
      return;
    }

    image.dataset.fallbackApplied = 'true';
    image.src = fallback;
  };

  return (
    <section
      id="success-stories"
      className="
        relative
        overflow-hidden
        bg-[#06131f]
        py-16
        sm:py-20
        lg:py-24
      "
    >

      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -top-40
          -left-40
          h-[420px]
          w-[420px]
          rounded-full
          bg-emerald-400/10
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-40
          h-[420px]
          w-[420px]
          rounded-full
          bg-cyan-400/10
          blur-[120px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =======================================================
            HEADER
        ======================================================= */}

        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

          <div className="max-w-3xl">

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-400/25
                bg-emerald-400/10
                px-4
                py-2
                text-[11px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-emerald-300
              "
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />

              Customer Success Stories
            </div>

            <h2
              className="
                mt-5
                font-display
                text-4xl
                font-bold
                leading-[1.05]
                tracking-tight
                text-white
                sm:text-5xl
                lg:text-[56px]
              "
            >
              Real businesses.
              <br />

              <span className="text-emerald-300">
                Real trade stories.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-2xl
                text-base
                leading-7
                text-slate-400
                sm:text-lg
              "
            >
              Explore business journeys, products and trade
              milestones currently featured on GlobPulse.
            </p>

          </div>

          {/* VIEW ALL */}
          <a
            href={`${API_URL}/success-stories`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-white/15
              bg-white/[0.04]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
              backdrop-blur
              transition-all
              duration-300
              hover:border-emerald-400/50
              hover:bg-emerald-400
              hover:text-slate-950
            "
          >
            Explore all stories

            <ArrowUpRight className="h-4 w-4" />
          </a>

        </div>

        {/* =======================================================
            LOADING
        ======================================================= */}

        {loading && (
          <div className="mt-12 flex min-h-[280px] items-center justify-center">

            <div className="flex items-center gap-3 text-slate-400">

              <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />

              <span>
                Loading success stories...
              </span>

            </div>

          </div>
        )}

        {/* =======================================================
            ERROR
        ======================================================= */}

        {!loading && error && (
          <div
            className="
              mt-12
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              px-6
              py-14
              text-center
            "
          >
            <p className="text-slate-400">
              Success stories are temporarily unavailable.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="
                mt-5
                rounded-full
                bg-emerald-400
                px-6
                py-3
                text-sm
                font-bold
                text-slate-950
                transition
                hover:bg-emerald-300
              "
            >
              Try Again
            </button>
          </div>
        )}

        {/* =======================================================
            EMPTY
        ======================================================= */}

        {!loading &&
          !error &&
          stories.length === 0 && (
            <div
              className="
                mt-12
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                px-6
                py-14
                text-center
              "
            >
              <p className="text-slate-400">
                No success stories are currently available.
              </p>
            </div>
          )}

        {/* =======================================================
            STORIES
        ======================================================= */}

        {!loading &&
          !error &&
          stories.length > 0 && (
            <div className="relative mt-12">

              {/* =================================================
                  DESKTOP NAVIGATION
              ================================================= */}

              {stories.length > 3 && (
                <div className="mb-5 hidden justify-end gap-2 lg:flex">

                  <button
                    type="button"
                    aria-label="Previous stories"
                    onClick={() => {
                      const container =
                        document.getElementById(
                          'success-story-slider'
                        );

                      container?.scrollBy({
                        left: -410,
                        behavior: 'smooth',
                      });
                    }}
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.04]
                      text-white
                      transition
                      hover:border-emerald-400/40
                      hover:bg-emerald-400
                      hover:text-slate-950
                    "
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    aria-label="Next stories"
                    onClick={() => {
                      const container =
                        document.getElementById(
                          'success-story-slider'
                        );

                      container?.scrollBy({
                        left: 410,
                        behavior: 'smooth',
                      });
                    }}
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.04]
                      text-white
                      transition
                      hover:border-emerald-400/40
                      hover:bg-emerald-400
                      hover:text-slate-950
                    "
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                </div>
              )}

              {/* =================================================
                  STORY SLIDER
              ================================================= */}

              <div
                id="success-story-slider"
                className="
                  flex
                  gap-6
                  overflow-x-auto
                  scroll-smooth
                  pb-5
                  snap-x
                  snap-mandatory
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >

                {stories.map((story, index) => {
                  const amount = formatAmount(
                    story.amount
                  );

                  const storyImage =
                    story.logo || FALLBACK_IMAGE;

                  return (
                    <motion.article
                      key={story.id}
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.15,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: Math.min(
                          index * 0.06,
                          0.3
                        ),
                      }}
                      className="
                        group
                        relative
                        flex
                        w-[330px]
                        flex-none
                        snap-start
                        flex-col
                        overflow-hidden
                        rounded-[26px]
                        border
                        border-white/10
                        bg-[#0d1a29]
                        shadow-[0_20px_60px_rgba(0,0,0,.25)]
                        transition-all
                        duration-500
                        hover:-translate-y-2
                        hover:border-emerald-400/35
                        hover:shadow-[0_30px_80px_rgba(0,0,0,.4)]
                        sm:w-[360px]
                        lg:w-[380px]
                      "
                    >

                      {/* =========================================
                          IMAGE
                      ========================================= */}

                     <div
                        className="
                          relative
                          h-[190px]
                          overflow-hidden
                          bg-[#111d2b]
                        "
                      >

                        <img
                          src={storyImage}
                          alt={
                            story.company_name ||
                            story.client_name ||
                            story.product ||
                            'GlobPulse success story'
                          }
                          className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-contain
                            p-3
                            transition-transform
                            duration-500
                            group-hover:scale-[1.03]
                          "
                          loading="lazy"
                          decoding="async"
                          onError={(event) =>
                            handleImageError(
                              event
                            )
                          }
                        />

                        {/* IMAGE OVERLAY */}

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-[#0d1a29]
                            via-[#0d1a29]/10
                            to-transparent
                          "
                        />


                        {/* AMOUNT */}

                        {amount && (
                          <div
                            className="
                              absolute
                              left-4
                              top-4
                              inline-flex
                              items-center
                              gap-1
                              rounded-full
                              bg-emerald-400
                              px-3
                              py-1.5
                              text-xs
                              font-extrabold
                              text-slate-950
                              shadow-lg
                            "
                          >
                            <IndianRupee className="h-3.5 w-3.5" />

                            {Number(story.amount).toLocaleString(
                              'en-IN',
                              {
                                maximumFractionDigits: 2,
                              }
                            )}
                          </div>
                        )}

                        {/* PRODUCT ON IMAGE */}

                        <div
                          className="
                            absolute
                            bottom-4
                            left-5
                            right-5
                          "
                        >

                          <span
                            className="
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.15em]
                              text-emerald-300
                            "
                          >
                            Product
                          </span>

                          <h3
                            className="
                              mt-1
                              truncate
                              text-xl
                              font-bold
                              text-white
                            "
                          >
                            {story.product ||
                              'Success Story'}
                          </h3>

                        </div>

                      </div>

                      {/* =========================================
                          CONTENT
                      ========================================= */}

                      <div className="flex flex-1 flex-col p-5">

                        {/* LOCATION */}

                        {story.location && (
                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              text-xs
                              text-slate-400
                            "
                          >
                            <MapPin
                              className="
                                h-4
                                w-4
                                flex-shrink-0
                                text-emerald-300
                              "
                            />

                            <span className="truncate">
                              {story.location}
                            </span>
                          </div>
                        )}

                        {/* QUOTE */}

                        {story.description && (
                          <div className="mt-4">

                            <Quote
                              className="
                                h-6
                                w-6
                                text-emerald-400/60
                              "
                            />

                            <p
                             
                              className="
                                mt-2
                                line-clamp-2
                                text-[13px]
                                leading-5
                                text-slate-300
                              "
                            >
                            
                              {story.description}
                            </p>

                          </div>
                        )}

                        {/* FOOTER */}

                        <div
                          className="
                            mt-auto
                            flex
                            items-end
                            justify-between
                            gap-4
                            border-t
                            border-white/10
                            pt-5
                          "
                        >

                          <div className="min-w-0">

                            {story.client_name && (
                              <p
                                className="
                                  truncate
                                  text-sm
                                  font-bold
                                  text-emerald-300
                                "
                              >
                                {story.client_name}
                              </p>
                            )}

                            {story.company_name && (
                              <p
                                className="
                                  mt-1
                                  flex
                                  items-center
                                  gap-1.5
                                  truncate
                                  text-xs
                                  text-slate-500
                                "
                              >
                                <Building2 className="h-3.5 w-3.5 flex-shrink-0" />

                                <span className="truncate">
                                  {story.company_name}
                                </span>
                              </p>
                            )}

                          </div>

                          <a
                            href={story.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex
                              flex-shrink-0
                              items-center
                              gap-1.5
                              rounded-full
                              border
                              border-white/10
                              bg-white/[0.04]
                              px-3
                              py-2
                              text-xs
                              font-semibold
                              text-white
                              transition-all
                              hover:border-emerald-400/40
                              hover:bg-emerald-400
                              hover:text-slate-950
                            "
                          >
                            Read story

                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>

                        </div>

                      </div>

                    </motion.article>
                  );
                })}

              </div>

              {/* MOBILE SCROLL HINT */}

              {stories.length > 1 && (
                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-xs
                    text-slate-500
                    lg:hidden
                  "
                >
                  <ChevronLeft className="h-3.5 w-3.5" />

                  Swipe to explore stories

                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              )}

            </div>
          )}

        {/* =======================================================
            TRUST STRIP
        ======================================================= */}

        {!loading &&
          !error &&
          stories.length > 0 && (
            <div
              className="
                mt-10
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-3
              "
            >

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.025]
                  px-5
                  py-4
                "
              >
                <div className="text-sm font-bold text-white">
                  Real business stories
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  Dynamically loaded from GlobPulse
                </div>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.025]
                  px-5
                  py-4
                "
              >
                <div className="text-sm font-bold text-white">
                  Products & milestones
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  Current success-story records
                </div>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.025]
                  px-5
                  py-4
                "
              >
                <div className="text-sm font-bold text-white">
                  Explore complete stories
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  Open the full Laravel story page
                </div>
              </div>

            </div>
          )}

      </div>
    </section>
  );
}