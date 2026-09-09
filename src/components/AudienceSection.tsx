import { ArrowUpRight } from 'lucide-react';
import { audiences } from '@/data/content';
import { SectionHeading, AnimatedSection } from '@/components/ui/Section';

export function AudienceSection() {
  return (
    <section id="who-its-for" className="py-20 lg:py-28 bg-navy-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Who Is This For?"
          title="Built for businesses ready to explore global markets"
          subtitle="Whether you manufacture, supply, export, or are just beginning to explore international trade, GlobPulse provides the tools to help you get started."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-6 lg:gap-8">
          {audiences.map((audience, i) => (
            <AnimatedSection key={audience.title} delay={i * 0.1}>
              <div className="group relative rounded-2xl overflow-hidden bg-white border border-navy-100 hover:border-navy-300 hover:shadow-2xl hover:shadow-navy-900/10 transition-all duration-300">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={audience.image}
                    alt={audience.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <audience.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      {audience.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-navy-600 leading-relaxed">
                    {audience.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-navy-400 group-hover:text-navy-700 transition-colors">
                    <span className="text-sm font-medium">Explore opportunities</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
