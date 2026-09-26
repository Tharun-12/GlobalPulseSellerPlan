import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/data/content';
import { SectionHeading } from '@/components/ui/Section';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-12 sm:py-14 lg:py-16 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <SectionHeading
          eyebrow="Seller FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before getting started."
        />

        {/* FAQ */}
        <div className="mt-8 space-y-2.5">

          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  margin: '-30px',
                }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.03,
                }}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-navy-200 bg-navy-50/40'
                    : 'border-navy-100 bg-white hover:border-navy-200'
                }`}
              >

                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5 sm:py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${i}`}
                >

                  <span className="font-display text-sm sm:text-base font-semibold text-navy-900">
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        isOpen
                          ? 'text-gold-500'
                          : 'text-navy-400'
                      }`}
                    />
                  </motion.div>

                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${i}`}
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.25,
                        ease: 'easeInOut',
                      }}
                      className="overflow-hidden"
                    >

                      <div className="px-4 pb-4 sm:px-5 sm:pb-4">
                        <p className="text-xs sm:text-sm leading-5 text-navy-600">
                          {faq.answer}
                        </p>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}