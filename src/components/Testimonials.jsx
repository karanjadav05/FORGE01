import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { TESTIMONIALS } from '../data/forgeData';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <motion.section
      id="testimonials"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className="relative min-h-[80vh] w-full bg-[#090909] py-28 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden border-b border-[#F1EEE7]/10"
    >
      <div className="scanline-bg absolute inset-0 pointer-events-none opacity-15" />
      <div className="architectural-grid absolute inset-0 pointer-events-none opacity-10" />

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center space-y-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-[#F1EEE7]/10 text-xs font-mono-tech text-[#C8FF3D] tracking-widest uppercase">
          <Quote className="w-3.5 h-3.5" />
          <span>SECTION 09 // ATHLETE PROOF</span>
        </div>

        {/* Minimal Animated Quote Showcase */}
        <div className="min-h-[220px] sm:min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h3 className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#F1EEE7] uppercase tracking-tight leading-tight max-w-4xl mx-auto">
                "{activeTestimonial.quote}"
              </h3>

              <div className="space-y-1 font-mono-tech">
                <p className="text-sm font-bold text-[#C8FF3D] tracking-widest uppercase">
                  — {activeTestimonial.author}
                </p>
                <p className="text-xs text-[#8A8F99]">
                  {activeTestimonial.role} • {activeTestimonial.since}
                </p>
                <p className="text-[11px] text-[#F1EEE7]/60 italic pt-1">
                  [ {activeTestimonial.stat} ]
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Indicator Dots */}
        <div className="flex items-center justify-center gap-4 pt-6">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="p-2.5 rounded-full bg-[#111111] border border-[#F1EEE7]/10 text-[#8A8F99] hover:text-[#C8FF3D] hover:border-[#C8FF3D] transition-colors cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === i ? 'w-8 bg-[#C8FF3D]' : 'w-2 bg-[#222222]'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)}
            className="p-2.5 rounded-full bg-[#111111] border border-[#F1EEE7]/10 text-[#8A8F99] hover:text-[#C8FF3D] hover:border-[#C8FF3D] transition-colors cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
