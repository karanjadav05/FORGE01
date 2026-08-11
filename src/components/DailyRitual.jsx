import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Sun, Sunrise, Sunset, Moon, Sparkles, CheckCircle2 } from 'lucide-react';
import { DAILY_RITUALS } from '../data/forgeData';

export default function DailyRitual() {
  const [activeRitualIndex, setActiveRitualIndex] = useState(0);
  const activeRitual = DAILY_RITUALS[activeRitualIndex];

  // Lighting ambient themes per time
  const ambiances = [
    'from-indigo-950/40 via-[#090909] to-[#090909]',
    'from-amber-950/40 via-[#090909] to-[#090909]',
    'from-slate-900/60 via-[#090909] to-[#090909]',
    'from-emerald-950/40 via-[#090909] to-[#090909]',
  ];

  return (
    <section
      id="ritual"
      className={`relative min-h-screen w-full bg-gradient-to-b ${ambiances[activeRitualIndex]} py-28 px-6 md:px-12 transition-colors duration-1000 overflow-hidden border-b border-[#F1EEE7]/10 flex flex-col justify-center`}
    >
      <div className="architectural-grid absolute inset-0 pointer-events-none opacity-15" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header Title */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#C8FF3D] tracking-widest uppercase">
            <Clock className="w-4 h-4" />
            <span>SECTION 07 // CHRONO-PERFORMANCE PROTOCOL</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl text-[#F1EEE7] uppercase tracking-tight">
            THE DAILY <span className="text-stroke-lime">RITUAL.</span>
          </h2>
          <p className="font-sans-ui text-sm text-[#8A8F99] font-light max-w-lg">
            High performance is an integrated morning sequence. Explore how an athlete moves through FORGE / 01 from quiet 05:30 arrival to post-training thermal recovery.
          </p>
        </div>

        {/* Interactive Chrono Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Vertical Time Sequence Selector */}
          <div className="lg:col-span-5 space-y-4">
            {DAILY_RITUALS.map((ritual, idx) => {
              const isActive = activeRitualIndex === idx;
              return (
                <div
                  key={ritual.time}
                  onClick={() => setActiveRitualIndex(idx)}
                  className={`p-6 rounded-3xl border transition-all duration-500 cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? 'bg-[#111111] border-[#C8FF3D] shadow-2xl scale-[1.02]'
                      : 'bg-[#111111]/50 border-[#F1EEE7]/10 hover:border-[#F1EEE7]/30 hover:bg-[#111111]/80'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={`font-mono-tech font-bold text-3xl md:text-4xl transition-colors ${
                        isActive ? 'text-[#C8FF3D]' : 'text-[#8A8F99] group-hover:text-[#F1EEE7]'
                      }`}
                    >
                      {ritual.time}
                    </span>
                    <div>
                      <p className="font-syne font-extrabold text-lg text-[#F1EEE7] uppercase tracking-wide">
                        {ritual.phase}
                      </p>
                      <p className="font-mono-tech text-xs text-[#8A8F99]">
                        {ritual.title}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-3 h-3 rounded-full transition-all ${
                      isActive ? 'bg-[#C8FF3D] shadow-lg shadow-[#C8FF3D]' : 'bg-[#222222]'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Atmosphere & Protocol Display */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRitual.time}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-[#111111] p-8 sm:p-12 rounded-3xl border border-[#F1EEE7]/15 shadow-2xl space-y-8 relative overflow-hidden"
              >
                <div className="scanline-bg absolute inset-0 pointer-events-none opacity-20" />

                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-[#F1EEE7]/10 pb-6">
                  <div>
                    <span className="font-mono-tech text-4xl sm:text-6xl font-bold text-[#C8FF3D] block">
                      {activeRitual.time}
                    </span>
                    <span className="font-mono-tech text-xs text-[#8A8F99] uppercase tracking-widest">
                      CHRONO SEQUENCE 0{activeRitualIndex + 1}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-syne font-extrabold text-2xl text-[#F1EEE7] uppercase block">
                      {activeRitual.phase}
                    </span>
                    <span className="font-mono-tech text-xs text-[#C8FF3D]">
                      {activeRitual.ambience}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                  <h3 className="font-syne font-extrabold text-3xl text-[#F1EEE7] uppercase">
                    {activeRitual.title}
                  </h3>
                  <p className="font-sans-ui text-sm text-[#8A8F99] leading-relaxed font-light">
                    {activeRitual.description}
                  </p>
                </div>

                {/* Protocol Action Checklist */}
                <div className="space-y-3 pt-6 border-t border-[#F1EEE7]/10">
                  <h4 className="font-mono-tech text-xs text-[#C8FF3D] tracking-widest uppercase">
                    MANDATORY PROTOCOL CHECKLIST
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeRitual.details.map((detail, i) => (
                      <div
                        key={i}
                        className="bg-[#090909] p-3 rounded-xl border border-[#F1EEE7]/10 flex items-center gap-2.5 font-mono-tech text-xs text-[#F1EEE7]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#C8FF3D] shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
