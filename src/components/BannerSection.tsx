
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import bannerImage1 from "@/asstes/gfe banners1.png";
import bannerImage2 from "@/asstes/gfe banners2.png";

const banners = [
  {
    image: bannerImage1,
    alt: "GlobPulse Global Business",
  },
  {
    image: bannerImage2,
    alt: "GlobPulse Global Business",
  },
];

export function BannerSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);

    setCurrentSlide((prev) =>
      prev === banners.length - 1 ? 0 : prev + 1
    );
  };

  const previousSlide = () => {
    setDirection(-1);

    setCurrentSlide((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  return (
    <section
      id="banner"
      className="relative w-full overflow-hidden bg-[#0A2947] mt-24"
    >
      {/* =========================
          CAROUSEL
      ========================= */}
      <div className="relative w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={currentSlide}
            src={banners[currentSlide].image}
            alt={banners[currentSlide].alt}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction > 0 ? 80 : -80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -80 : 80,
            }}
            transition={{
              duration: 0.45,
              ease: "easeInOut",
            }}
            className="block h-auto w-full object-cover"
          />
        </AnimatePresence>

        {/* =========================
            LEFT ARROW
        ========================= */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous banner"
          className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/70 sm:left-6 sm:h-12 sm:w-12"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* =========================
            RIGHT ARROW
        ========================= */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next banner"
          className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/70 sm:right-6 sm:h-12 sm:w-12"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* =========================
            DOT INDICATORS
        ========================= */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              aria-label={`Go to banner ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BannerSection;