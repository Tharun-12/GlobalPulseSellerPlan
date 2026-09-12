// import { motion } from 'framer-motion';
// import { ArrowRight } from 'lucide-react';
// import { journeySteps } from '@/data/content';
// import { SectionHeading } from '@/components/ui/Section';

// export function WhyPlanSection() {
//   return (
//     <section id="why-plan" className="py-20 lg:py-28 bg-white relative overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <SectionHeading
//           eyebrow="Why Consider the ₹999 Plan?"
//           title="Your Product Is Ready. Is Your Business Ready for Global Buyers?"
//         />

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mt-6 text-lg text-navy-500 leading-relaxed text-center max-w-2xl mx-auto"
//         >
//           Finding international buyers requires more than having a good product. Businesses also need
//           export knowledge, buyer opportunities and a professional business presence.
//         </motion.p>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="mt-4 text-center text-navy-700 font-semibold text-lg"
//         >
//           The ₹999 plan brings these starting points together:
//         </motion.p>

//         {/* Journey */}
//         <div className="mt-16">
//           {/* Desktop horizontal */}
//           <div className="hidden lg:flex items-start justify-between relative">
//             {/* Connecting line */}
//             <div className="absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-navy-200 via-navy-300 to-navy-200" />

//             {journeySteps.map((step, i) => (
//               <motion.div
//                 key={step.label}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-50px' }}
//                 transition={{ duration: 0.6, delay: i * 0.15 }}
//                 className="flex-1 max-w-[220px] flex flex-col items-center text-center relative z-10"
//               >
//                 <div className="relative">
//                   <div className="w-24 h-24 rounded-full bg-white border-2 border-navy-200 flex items-center justify-center shadow-lg group-hover:border-gold-400 transition-colors">
//                     <step.icon className="w-10 h-10 text-navy-700" />
//                   </div>
//                   <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold-400 text-navy-900 text-xs font-bold flex items-center justify-center">
//                     {i + 1}
//                   </span>
//                 </div>
//                 <span className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-500">
//                   {step.label}
//                 </span>
//                 <h3 className="mt-2 font-display text-base font-bold text-navy-900">
//                   {step.title}
//                 </h3>
//                 <p className="mt-2 text-sm text-navy-500 leading-relaxed">
//                   {step.description}
//                 </p>
//                 {i < journeySteps.length - 1 && (
//                   <ArrowRight className="hidden" />
//                 )}
//               </motion.div>
//             ))}
//           </div>

//           {/* Mobile vertical timeline */}
//           <div className="lg:hidden flex flex-col gap-8 relative">
//             <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-navy-200 via-navy-300 to-navy-200" />
//             {journeySteps.map((step, i) => (
//               <motion.div
//                 key={step.label}
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true, margin: '-50px' }}
//                 transition={{ duration: 0.6, delay: i * 0.1 }}
//                 className="flex gap-5 items-start relative z-10"
//               >
//                 <div className="relative flex-shrink-0">
//                   <div className="w-24 h-24 rounded-full bg-white border-2 border-navy-200 flex items-center justify-center shadow-lg">
//                     <step.icon className="w-10 h-10 text-navy-700" />
//                   </div>
//                   <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold-400 text-navy-900 text-xs font-bold flex items-center justify-center">
//                     {i + 1}
//                   </span>
//                 </div>
//                 <div className="pt-3">
//                   <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-500">
//                     {step.label}
//                   </span>
//                   <h3 className="mt-1 font-display text-base font-bold text-navy-900">
//                     {step.title}
//                   </h3>
//                   <p className="mt-2 text-sm text-navy-500 leading-relaxed">
//                     {step.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }





import { motion } from 'framer-motion';
import { Benefit, journeySteps } from '@/data/content';
import { SectionHeading } from '@/components/ui/Section';
import { Briefcase, Globe, GraduationCap, Users } from 'lucide-react';

export function WhyPlanSection() {
  return (
    <section id="why-plan" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Consider the ₹999 Plan?"
          title="Your Product Is Ready. Is Your Business Ready for Global Buyers?"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg text-navy-500 leading-relaxed text-center max-w-2xl mx-auto"
        >
          Finding international buyers requires more than having a good product. Businesses also need
          export knowledge, buyer opportunities and a professional business presence.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-center text-navy-700 font-semibold text-lg"
        >
          The ₹999 plan brings these starting points together:
        </motion.p>

        {/* ==================== DESKTOP INFOGRAPHIC ==================== */}
        <div className="hidden lg:block mt-20 relative">
          {/*
            Curve geometry (per step):
            - Step 1 (i=0, TOP)    : circle sits ABOVE the curve → curve passes BELOW its icon
            - Step 2 (i=1, BOTTOM) : circle sits BELOW the curve → curve passes ABOVE its icon
            - Step 3 (i=2, TOP)    : circle sits ABOVE the curve → curve passes BELOW its icon
            - Step 4 (i=3, BOTTOM) : circle sits BELOW the curve → curve passes ABOVE its icon

            ViewBox: 1200 x 460
            Circle centers: x = 150, 450, 750, 1050
            Top circle Y = 90, Bottom circle Y = 370
          */}
          <svg
            className="absolute inset-x-0 top-0 w-full h-[460px] pointer-events-none"
            viewBox="0 0 1200 460"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Main dotted curve */}
            <path
              d="
                M 40 130
                C 90 90, 120 95, 155 130
                C 210 180, 300 250, 400 230
                C 470 215, 490 190, 520 200
                C 580 220, 640 275, 720 265
                C 800 255, 830 210, 880 230
                C 960 260, 1010 320, 1070 300
                C 1110 285, 1140 260, 1170 250
              "
              stroke="#cbd5e1"
              strokeWidth="2.5"
              strokeDasharray="4 9"
              strokeLinecap="round"
            />

            {/* Arrowhead at the end of the curve */}
            <g transform="translate(1170 250) rotate(-25)" fill="#cbd5e1">
              {/* Simple clean arrowhead */}
              <path d="M -14 -6 L 4 0 L -14 6 L -9 0 Z" />
            </g>

            {/* Small sparkle/flourish accent (like the ✦ in the reference) */}
            <g transform="translate(1180 235)" fill="#cbd5e1" opacity="0.9">
              {/* 4-point sparkle */}
              <path d="M 0 -7 C 1 -2, 2 -1, 7 0 C 2 1, 1 2, 0 7 C -1 2, -2 1, -7 0 C -2 -1, -1 -2, 0 -7 Z" />
            </g>
          </svg>

          <div className="relative grid grid-cols-4 gap-6">
            {journeySteps.map((step, i) => {
              const isTop = i % 2 === 0; // 0=top, 1=bottom, 2=top, 3=bottom
              const accents = [
                { ring: 'border-[#8CC63F]', dot: 'bg-[#8CC63F]' }, // lime
                { ring: 'border-[#00B4D8]', dot: 'bg-[#00B4D8]' }, // cyan
                { ring: 'border-[#0B63C5]', dot: 'bg-[#0B63C5]' }, // blue
                { ring: 'border-[#8B2FD1]', dot: 'bg-[#8B2FD1]' }, // purple
              ][i % 4];

              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: isTop ? -30 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`flex flex-col items-center text-center relative z-10 ${
                    isTop ? 'pt-0' : 'pt-[260px]'
                  }`}
                >
                  {/* Circle — top circles sit ABOVE curve, bottom circles sit BELOW curve */}
                  <div className="relative">
                    <div
                      className={`w-28 h-28 rounded-full bg-white border-[5px] ${accents.ring} flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(15,23,42,0.25)]`}
                    >
                      <step.icon className="w-11 h-11 text-navy-800" />
                    </div>
                    <span
                      className={`absolute -top-1 -right-1 w-8 h-8 rounded-full ${accents.dot} text-white text-xs font-bold flex items-center justify-center shadow-md`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Text block */}
                  <div className="mt-5 max-w-[230px]">
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-navy-400">
                      Step {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-1.5 font-display text-base font-bold text-navy-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-navy-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ==================== MOBILE VERTICAL TIMELINE ==================== */}
        <div className="lg:hidden mt-16 flex flex-col gap-10 relative">
          <div
            className="absolute left-12 top-4 bottom-4 w-0.5"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, #cbd5e1 0 3px, transparent 3px 9px)',
            }}
          />

          {journeySteps.map((step, i) => {
            const accents = [
              'border-[#8CC63F]',
              'border-[#00B4D8]',
              'border-[#0B63C5]',
              'border-[#8B2FD1]',
            ][i % 4];
            const dotColor = [
              'bg-[#8CC63F]',
              'bg-[#00B4D8]',
              'bg-[#0B63C5]',
              'bg-[#8B2FD1]',
            ][i % 4];

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-5 items-start relative z-10"
              >
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-24 h-24 rounded-full bg-white border-[4px] ${accents} flex items-center justify-center shadow-lg`}
                  >
                    <step.icon className="w-9 h-9 text-navy-800" />
                  </div>
                  <span
                    className={`absolute -top-1 -right-1 w-7 h-7 rounded-full ${dotColor} text-white text-xs font-bold flex items-center justify-center shadow`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="pt-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-navy-400">
                    Step {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-1 font-display text-base font-bold text-navy-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const benefits: Benefit[] = [
  {
    icon: GraduationCap,
    title: 'Export-Import Course',
    description:
      'Recorded Export-Import Course access through the LMS to help you understand the fundamentals of international trade.',
  },
  {
    icon: Users,
    title: '50 Buyer Credits',
    description:
      'Access buyer opportunities through GlobPulse. [PRODUCT TEAM CONFIRMATION REQUIRED — exact functionality of Buyer Credits to be confirmed]',
  },
  {
    icon: Briefcase,
    title: 'Logo + Letterhead + Website',
    description:
      'Professional business assets including a custom logo, letterhead, and 1-month website access to present your business.',
  },
  {
    icon: Globe,
    title: 'GlobPulse Free Plan',
    description:
      '1 year of GlobPulse Free Plan access to build your presence on the B2B marketplace and explore global business opportunities.',
  },
];