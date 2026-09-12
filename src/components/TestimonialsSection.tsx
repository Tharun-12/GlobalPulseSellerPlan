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





import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '@/data/content';
import { SectionHeading, AnimatedSection } from '@/components/ui/Section';

// Each card gets its own unique seller image — replace with real approved seller photos
const sellerImages = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces', // Card 1
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=faces', // Card 2
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces', // Card 3
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-navy-50/50 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Seller Testimonials"
          title="What Sellers Say"
          subtitle="Genuine feedback from businesses using GlobPulse. [Approved seller testimonials to be added]"
        />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              {/* Speech Bubble Card Container */}
              <div className="relative h-full group">
                
                {/* The Bubble Body */}
                <div className="relative h-full bg-white rounded-2xl p-7 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-navy-100 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col z-10">
                  
                  {/* Top Left Quote Icon */}
                  <div className="absolute -top-5 -left-3 bg-white rounded-full p-1 z-20">
                    <Quote className="w-8 h-8 text-blue-500 fill-blue-500 rotate-180" />
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 mb-6 mt-2">
                    {/* Unique seller photo per card */}
                    <div className="w-14 h-14 rounded-full bg-navy-50 border-2 border-white shadow-sm flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src={sellerImages[i]}
                        alt={`${testimonial.businessName} seller`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-navy-900 text-base">
                        {testimonial.businessName}
                      </p>
                      <p className="text-navy-500 text-sm font-medium mt-0.5">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-navy-600 leading-relaxed flex-1 text-[15px] font-medium">
                    {testimonial.text}
                  </p>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mt-6 pt-6 border-t border-navy-50">
                    {[...Array(5)].map((_, index) => (
                      <Star 
                        key={index} 
                        className="w-4 h-4 text-navy-800 fill-navy-800" 
                      />
                    ))}
                  </div>

                  {/* Bottom Right Quote Icon */}
                  <div className="absolute -bottom-5 -right-3 bg-white rounded-full p-1 z-20">
                    <Quote className="w-8 h-8 text-blue-500 fill-blue-500" />
                  </div>
                </div>

                {/* Speech Bubble Tail */}
                <div className="absolute -bottom-3 left-8 w-6 h-6 bg-white border-b border-l border-navy-100 transform -rotate-45 z-0 group-hover:shadow-[-4px_4px_6px_-2px_rgba(0,0,0,0.02)] transition-shadow duration-300"></div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center text-sm text-navy-400 font-medium"
        >
          Testimonials will be replaced with genuine approved seller feedback.
        </motion.p>
      </div>
    </section>
  );
}