// import { motion } from 'framer-motion';
// import { ShieldCheck, BadgeCheck, FileCheck, Building } from 'lucide-react';
// import { trustItems } from '@/data/content';
// import { SectionHeading, AnimatedSection } from '@/components/ui/Section';

// const icons = [BadgeCheck, ShieldCheck, FileCheck, Building];

// export function TrustSection() {
//   return (
//     <section className="py-20 lg:py-28 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <SectionHeading
//           eyebrow="Verified Platform"
//           title="Trust & Business Proof"
//           subtitle="GlobPulse is committed to transparency. The following areas will be populated with verified, approved information."
//         />

//         <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {trustItems.map((item, i) => {
//             const Icon = icons[i % icons.length];
//             return (
//               <AnimatedSection key={i} delay={i * 0.1}>
//                 <div className="h-full rounded-2xl border-2 border-dashed border-navy-200 p-7 text-center hover:border-navy-300 transition-colors">
//                   <div className="w-14 h-14 rounded-xl bg-navy-50 flex items-center justify-center mx-auto">
//                     <Icon className="w-7 h-7 text-navy-400" />
//                   </div>
//                   <p className="mt-4 text-sm font-medium text-navy-500">
//                     {item.label}
//                   </p>
//                 </div>
//               </AnimatedSection>
//             );
//           })}
//         </div>

//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mt-10 text-center text-sm text-navy-400 max-w-2xl mx-auto"
//         >
//           All figures, certifications, and credentials will be verified and approved before display.
//           No unverified claims are presented.
//         </motion.p>
//       </div>
//     </section>
//   );
// }





import { motion } from 'framer-motion';
import {
  ShieldCheck,
  BadgeCheck,
  FileCheck,
  Building,
  Award,
  Globe2,
  Lock,
  Users,
} from 'lucide-react';

// ---------- Data + Icons ----------
const trustItems = [
  { label: 'Approved GlobPulse Figure', icon: BadgeCheck },
  { label: 'Certification / Credential', icon: Award },
  { label: 'Platform Verification', icon: ShieldCheck },
  { label: 'Business Information', icon: Building },
  { label: 'Global Compliance', icon: Globe2 },
  { label: 'Secure & Encrypted', icon: Lock },
  { label: 'Verified Partners', icon: Users },
  { label: 'Documented Proof', icon: FileCheck },
];

// ---------- Section heading (fixed contrast) ----------
function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-white bg-navy-800 px-4 py-1.5 rounded-full"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-navy-500 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// ---------- Single trust card (light card, dark readable text) ----------
function TrustCard({
  label,
  Icon,
}: {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="group relative w-[280px] shrink-0 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm hover:shadow-lg hover:border-navy-300 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy-600 to-navy-800 text-white shadow-md shadow-navy-500/20">
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-navy-900 leading-snug">
            {label}
          </p>
          <p className="mt-0.5 text-xs font-medium text-navy-500">
            Verified &amp; Approved
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------- Main section ----------
export function TrustSection() {
  const loopItems = [...trustItems, ...trustItems, ...trustItems];

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Verified Platform"
          title="Trust & Business Proof"
          subtitle="GlobPulse is committed to transparency. The following areas will be populated with verified, approved information."
        />
      </div>

      {/* ---------- Single-line auto-scroll marquee ---------- */}
      <div className="relative mt-16">
       

        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{
            duration: 40,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {loopItems.map((item, i) => (
            <TrustCard key={`item-${i}`} label={item.label} Icon={item.icon} />
          ))}
        </motion.div>
      </div>

      {/* ---------- Footer note ---------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center text-sm text-navy-500 max-w-2xl mx-auto"
        >
          All figures, certifications, and credentials will be verified and
          approved before display. No unverified claims are presented.
        </motion.p>
      </div>
    </section>
  );
}