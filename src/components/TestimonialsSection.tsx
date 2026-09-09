import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/content';
import { SectionHeading, AnimatedSection } from '@/components/ui/Section';

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-navy-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Seller Testimonials"
          title="What Sellers Say"
          subtitle="Genuine feedback from businesses using GlobPulse. [Approved seller testimonials to be added]"
        />

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="h-full rounded-2xl bg-white border border-navy-100 p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <Quote className="w-10 h-10 text-gold-400/40 flex-shrink-0" />
                <p className="mt-4 text-navy-600 leading-relaxed flex-1 italic">
                  {testimonial.text}
                </p>

                {/* Placeholder for seller photo/logo */}
                <div className="mt-6 pt-6 border-t border-navy-100 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-navy-100 border border-dashed border-navy-300 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-medium text-navy-400 text-center leading-tight px-1">
                      [Approved Seller Photo]
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800 text-sm">
                      {testimonial.businessName}
                    </p>
                    <p className="text-navy-400 text-xs mt-0.5">
                      {testimonial.designation}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-sm text-navy-400"
        >
          Testimonials will be replaced with genuine approved seller feedback.
        </motion.p>
      </div>
    </section>
  );
}
