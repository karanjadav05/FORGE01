import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { CheckCircle2, ArrowRight, Layers, Sliders, ShieldCheck } from 'lucide-react';
import { TRAINING_SYSTEM_STEPS } from '../data/forgeData';

export default function TrainingSystem({ onOpenJoinModal }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  return (
    <section
      id="system"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0b0b0b] py-28 px-6 md:px-12 overflow-hidden border-b border-[#F1EEE7]/10"
    >
      <div className="architectural-grid absolute inset-0 pointer-events-none opacity-15" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#C8FF3D] tracking-widest uppercase">
            <Sliders className="w-4 h-4" />
            <span>SECTION 05 // SYSTEMATIC METHODOLOGY</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl text-[#F1EEE7] uppercase tracking-tight">
            YOUR TRAINING IS <span className="text-stroke-lime">NOT RANDOM.</span>
          </h2>
          <p className="font-sans-ui text-sm text-[#8A8F99] font-light max-w-xl">
            We reject arbitrary workouts and random fitness classes. Every cycle at FORGE / 01 is periodized using force-velocity profiling and neural readiness metrics.
          </p>
        </div>

        {/* 3-Step Animated Timeline Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Animated Connecting Timeline Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="hidden md:block absolute top-12 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C8FF3D] via-[#F1EEE7]/30 to-[#C8FF3D] z-0 origin-left"
          />

          {TRAINING_SYSTEM_STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: idx * 0.25 }}
              className="relative z-10 bg-[#111111] p-8 rounded-3xl border border-[#F1EEE7]/10 hover:border-[#C8FF3D]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-[#C8FF3D]/5"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#090909] border border-[#C8FF3D]/30 group-hover:border-[#C8FF3D] flex items-center justify-center font-mono-tech font-bold text-2xl text-[#C8FF3D] transition-colors shadow-inner">
                    {item.step}
                  </div>
                  <span className="font-mono-tech text-[11px] text-[#8A8F99] bg-[#090909] px-3 py-1 rounded-full border border-[#F1EEE7]/10">
                    {item.duration}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <span className="font-mono-tech text-xs text-[#C8FF3D] tracking-widest uppercase">
                    PHASE {item.step} // {item.phase}
                  </span>
                  <h3 className="font-syne font-extrabold text-2xl text-[#F1EEE7] uppercase tracking-tight">
                    {item.headline}
                  </h3>
                </div>

                <p className="font-sans-ui text-xs sm:text-sm text-[#8A8F99] leading-relaxed mb-6 font-light">
                  {item.description}
                </p>

                {/* Audit Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-[#F1EEE7]/10 mb-8">
                  {item.checklist.map((check, i) => (
                    <div key={i} className="flex items-start gap-2.5 font-mono-tech text-xs text-[#F1EEE7]">
                      <CheckCircle2 className="w-4 h-4 text-[#C8FF3D] shrink-0 mt-0.5" />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote Footer */}
              <div className="pt-4 border-t border-[#F1EEE7]/10">
                <p className="font-serif-display italic text-sm text-[#8A8F99] group-hover:text-[#F1EEE7] transition-colors">
                  "{item.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-[#111111] p-8 rounded-3xl border border-[#F1EEE7]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-syne font-bold text-xl text-[#F1EEE7] uppercase">
              READY FOR YOUR BIOMECHANICAL AUDIT?
            </h4>
            <p className="font-sans-ui text-xs text-[#8A8F99]">
              Schedule a 45-minute baseline movement assessment with a Senior Director at Surat Lab.
            </p>
          </div>
          <button
            onClick={onOpenJoinModal}
            className="shrink-0 bg-[#C8FF3D] text-[#090909] font-syne font-bold text-xs tracking-widest px-8 py-3.5 rounded-full hover:bg-[#d4ff66] transition-colors flex items-center gap-2 cursor-pointer uppercase"
          >
            <span>BOOK AUDIT SESSION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
