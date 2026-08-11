import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ShieldAlert, Activity } from 'lucide-react';

export default function Philosophy() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const line1 = ["YOU", "DON'T", "TRAIN", "FOR", "THE", "MIRROR."];
  const line2 = ["YOU", "TRAIN", "FOR", "EVERYTHING", "OUTSIDE", "IT."];

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#090909] py-32 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden border-t border-b border-[#F1EEE7]/10"
    >
      {/* Moving scanlines & architectural grid */}
      <div className="scanline-bg absolute inset-0 pointer-events-none opacity-20" />
      <div className="architectural-grid absolute inset-0 pointer-events-none opacity-10" />

      {/* Subtle background animated scanbeam */}
      <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-[#C8FF3D]/5 via-transparent to-transparent pointer-events-none animate-scan-line" />

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center space-y-16">
        {/* Editorial Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#111111] border border-[#F1EEE7]/10 text-xs font-mono-tech tracking-widest text-[#8A8F99] uppercase"
        >
          <Activity className="w-3.5 h-3.5 text-[#C8FF3D]" />
          <span>SECTION 02 // MANIFESTO</span>
        </motion.div>

        {/* Statement Part 1 */}
        <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-4xl sm:text-6xl md:text-8xl font-syne font-extrabold uppercase text-[#F1EEE7] tracking-tight leading-none">
          {line1.map((word, idx) => (
            <motion.span
              key={`line1-${idx}`}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 0, y: 40, filter: 'blur(10px)' }
              }
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className={word === "MIRROR." ? "text-[#8A8F99] font-serif-display italic font-normal" : ""}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Subtle Architectural Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-32 h-[1px] bg-[#C8FF3D] mx-auto opacity-60"
        />

        {/* Statement Part 2 */}
        <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-4xl sm:text-6xl md:text-8xl font-syne font-extrabold uppercase tracking-tight leading-none text-[#C8FF3D]">
          {line2.map((word, idx) => (
            <motion.span
              key={`line2-${idx}`}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 0, y: 40, filter: 'blur(10px)' }
              }
              transition={{ duration: 0.7, delay: 0.8 + idx * 0.1 }}
              className={word === "OUTSIDE" || word === "IT." ? "text-stroke-lime hover:text-[#C8FF3D] transition-colors" : "text-[#F1EEE7]"}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Detailed Editorial Footnote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-[#F1EEE7]/10"
        >
          <div className="space-y-2">
            <h4 className="font-mono-tech text-xs text-[#C8FF3D] tracking-widest">01 / REJECT VANITY</h4>
            <p className="font-sans-ui text-xs text-[#8A8F99] leading-relaxed">
              Fitness culture has been corrupted by superficial metrics. We train for velocity, torque, joint longevity, and nervous system resilience.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-mono-tech text-xs text-[#C8FF3D] tracking-widest">02 / UNCOMPROMISED CULT</h4>
            <p className="font-sans-ui text-xs text-[#8A8F99] leading-relaxed">
              No music blasting from phones. No crowds taking videos. Every square meter of FORGE / 01 is engineered for silent, relentless execution.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-mono-tech text-xs text-[#C8FF3D] tracking-widest">03 / REAL WORLD TRANSLATION</h4>
            <p className="font-sans-ui text-xs text-[#8A8F99] leading-relaxed">
              The physical capacity built inside these concrete walls translates into cognitive endurance, stress regulation, and executive presence outside.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
