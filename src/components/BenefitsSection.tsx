// import { Check } from 'lucide-react';
// import { benefits, planBenefits } from '@/data/content';
// import { AnimatedSection, SectionHeading } from '@/components/ui/Section';
// import { CTAButton } from '@/components/ui/CTAButton';

// type BenefitsSectionProps = {
//   onGetStarted: () => void;
// };

// export function BenefitsSection({ onGetStarted }: BenefitsSectionProps) {
//   return (
//     <section id="what-you-get" className="py-20 lg:py-28 bg-white relative">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <SectionHeading
//           eyebrow="What You Get"
//           title="Everything You Need to Start Exploring Global Markets — Only ₹999"
//           subtitle="Four business benefits designed to help manufacturers, suppliers, and exporters build their global presence."
//         />

//         <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {benefits.map((benefit, i) => (
//             <AnimatedSection key={benefit.title} delay={i * 0.1}>
//               <div className="group h-full rounded-2xl bg-white border border-navy-100 p-7 hover:border-navy-300 hover:shadow-xl hover:shadow-navy-900/5 transition-all duration-300 hover:-translate-y-1">
//                 <div className="w-14 h-14 rounded-xl bg-navy-50 group-hover:bg-navy-900 flex items-center justify-center transition-colors duration-300">
//                   <benefit.icon className="w-7 h-7 text-navy-700 group-hover:text-gold-400 transition-colors duration-300" />
//                 </div>
//                 <h3 className="mt-5 font-display text-lg font-bold text-navy-900">
//                   {benefit.title}
//                 </h3>
//                 <p className="mt-2 text-sm text-navy-500 leading-relaxed">
//                   {benefit.description}
//                 </p>
//               </div>
//             </AnimatedSection>
//           ))}
//         </div>

//         {/* Value statement */}
//         <AnimatedSection delay={0.3}>
//           <div className="mt-16 rounded-3xl bg-navy-900 overflow-hidden relative">
//             <div className="absolute inset-0 bg-dot-pattern opacity-20" />
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gold-500/10 blur-[80px] rounded-full" />
//             <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
//               <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-4">
//                 4 Business Benefits. 1 Plan.
//               </p>
//               <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
//                 Only <span className="text-gold-400">₹999</span>
//               </p>
//               <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-2xl mx-auto">
//                 {planBenefits.map((b) => (
//                   <div key={b} className="flex items-center gap-2 text-navy-100">
//                     <Check className="w-5 h-5 text-gold-400 flex-shrink-0" />
//                     <span className="text-sm font-medium">{b}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-10">
//                 <CTAButton onClick={onGetStarted} variant="gold" size="lg">
//                   Activate Now — ₹999
//                 </CTAButton>
//               </div>
//             </div>
//           </div>
//         </AnimatedSection>
//       </div>
//     </section>
//   );
// }


import { Check, GraduationCap, Users, Briefcase, Globe, type LucideIcon } from 'lucide-react';
import { AnimatedSection, SectionHeading } from '@/components/ui/Section';
import { CTAButton } from '@/components/ui/CTAButton';
import { planBenefits } from '@/data/content';

type Benefit = {
  icon: LucideIcon;
  image: string;
  title: string;
  description: string;
};

export const benefits: Benefit[] = [
  {
    icon: GraduationCap,
    image: 'https://i.pinimg.com/736x/f0/90/5b/f0905b869c6f0910cebc9b1981487d75.jpg',
    title: 'Export-Import Course',
    description:
      'Recorded Export-Import Course access through the LMS to help you understand the fundamentals of international trade.',
  },
  {
    icon: Users,
    image: 'https://i.pinimg.com/236x/3e/d0/88/3ed088bc9d1c67214ec0ec6266ca63ae.jpg',
    title: '50 Buyer Credits',
    description:
      'Access buyer opportunities through GlobPulse. [PRODUCT TEAM CONFIRMATION REQUIRED — exact functionality of Buyer Credits to be confirmed]',
  },
  {
    icon: Briefcase,
    image: 'https://i.pinimg.com/736x/6f/bd/dc/6fbddcfc0ef45c18d112365054b6fdec.jpg',
    title: 'Logo + Letterhead + Website',
    description:
      'Professional business assets including a custom logo, letterhead, and 1-month website access to present your business.',
  },
  {
    icon: Globe,
    image: 'https://i.pinimg.com/736x/53/dd/c0/53ddc0c785f27223723d8f501236610e.jpg',
    title: 'GlobPulse Free Plan',
    description:
      '1 year of GlobPulse Free Plan access to build your presence on the B2B marketplace and explore global business opportunities.',
  },
];

type BenefitsSectionProps = {
  onGetStarted: () => void;
};

export function BenefitsSection({ onGetStarted }: BenefitsSectionProps) {
  return (
    <section id="what-you-get" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What You Get"
          title="Everything You Need to Start Exploring Global Markets — Only ₹999"
          subtitle="Four business benefits designed to help manufacturers, suppliers, and exporters build their global presence."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <AnimatedSection key={benefit.title} delay={i * 0.1}>
              <div className="group h-full rounded-2xl bg-white border border-navy-100 overflow-hidden hover:border-navy-300 hover:shadow-xl hover:shadow-navy-900/5 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                {/* Image — fixed height, always visible */}
                <div className="relative w-full h-44 flex-shrink-0 overflow-hidden">
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
                </div>

                {/* Card body — icon, title, description all inside */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-navy-50 group-hover:bg-navy-900 flex items-center justify-center transition-colors duration-300">
                    <benefit.icon className="w-6 h-6 text-navy-700 group-hover:text-gold-400 transition-colors duration-300" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Value statement */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 rounded-3xl bg-navy-900 overflow-hidden relative">
            <div className="absolute inset-0 bg-dot-pattern opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gold-500/10 blur-[80px] rounded-full" />
            <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-4">
                4 Business Benefits. 1 Plan.
              </p>
              <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                Only <span className="text-gold-400">₹999</span>
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 max-w-2xl mx-auto">
                {planBenefits.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-navy-100">
                    <Check className="w-5 h-5 text-gold-400 flex-shrink-0" />
                    <span className="text-sm font-medium">{b}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <CTAButton onClick={onGetStarted} variant="gold" size="lg">
                  Activate Now — ₹999
                </CTAButton>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}