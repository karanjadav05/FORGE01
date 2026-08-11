import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowUpRight, Cpu, Layers, Activity } from 'lucide-react';
import { LAB_DISCIPLINES } from '../data/forgeData';

export default function PerformanceLab({ onOpenJoinModal }) {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const scrollContainerRef = useRef(null);

  const activeDiscipline = LAB_DISCIPLINES[activeTab];

  const handleNext = () => {
    setActiveTab((prev) => (prev + 1) % LAB_DISCIPLINES.length);
  };

  const handlePrev = () => {
    setActiveTab((prev) => (prev - 1 + LAB_DISCIPLINES.length) % LAB_DISCIPLINES.length);
  };

  return (
    <motion.section
      id="lab"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className="relative min-h-screen w-full bg-[#0d0d0d] py-28 px-6 md:px-12 overflow-hidden border-b border-[#F1EEE7]/10"
    >
      <div className="architectural-grid absolute inset-0 pointer-events-none opacity-15" />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#C8FF3D] tracking-widest uppercase mb-3">
            <Cpu className="w-4 h-4" />
            <span>SECTION 03 // DISCIPLINE ARCHITECTURE</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-[#F1EEE7] uppercase tracking-tight">
            THE PERFORMANCE <span className="text-stroke-lime">LAB</span>
          </h2>
        </div>

        {/* Desktop discipline selectors */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {LAB_DISCIPLINES.map((disc, idx) => (
            <button
              key={disc.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full font-mono-tech text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                activeTab === idx
                  ? 'bg-[#C8FF3D] text-[#090909] font-bold border-[#C8FF3D] shadow-lg shadow-[#C8FF3D]/10'
                  : 'bg-[#111111] text-[#8A8F99] border-[#F1EEE7]/10 hover:text-[#F1EEE7] hover:border-[#F1EEE7]/30'
              }`}
            >
              <span>{disc.id}</span>
              <span>—</span>
              <span>{disc.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Showcase (Desktop Horizontal Split / Mobile Stack) */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDiscipline.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#111111] rounded-3xl border border-[#F1EEE7]/10 overflow-hidden p-6 lg:p-10 shadow-2xl relative"
          >
            {/* Left Column: Technical Telemetry & Description */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8 z-10">
              <div>
                {/* Meta Bar */}
                <div className="flex items-center justify-between border-b border-[#F1EEE7]/10 pb-4 mb-6">
                  <span className="font-mono-tech text-4xl lg:text-6xl font-bold text-[#C8FF3D]">
                    {activeDiscipline.id}
                  </span>
                  <div className="text-right font-mono-tech text-xs text-[#8A8F99]">
                    <p className="text-[#F1EEE7] font-medium">{activeDiscipline.code}</p>
                    <p>LAB SPECIFICATION</p>
                  </div>
                </div>

                <h3 className="font-syne font-extrabold text-3xl sm:text-4xl text-[#F1EEE7] uppercase tracking-tight mb-2">
                  {activeDiscipline.name}
                </h3>
                <p className="font-mono-tech text-xs text-[#C8FF3D] tracking-widest uppercase mb-4">
                  {activeDiscipline.title}
                </p>
                <p className="font-sans-ui text-sm text-[#8A8F99] leading-relaxed mb-6 font-light">
                  {activeDiscipline.description}
                </p>

                {/* Highlights Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeDiscipline.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md bg-[#090909] border border-[#F1EEE7]/10 font-mono-tech text-[11px] text-[#F1EEE7]"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>

                {/* Technical Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F1EEE7]/10">
                  {activeDiscipline.stats.map((stat, i) => (
                    <div key={i} className="bg-[#090909]/60 p-3.5 rounded-xl border border-[#F1EEE7]/5">
                      <p className="font-mono-tech text-[10px] text-[#8A8F99] tracking-wider uppercase mb-1">
                        {stat.label}
                      </p>
                      <p className="font-sans-ui text-xs font-semibold text-[#F1EEE7]">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-[#F1EEE7]/10">
                <button
                  onClick={onOpenJoinModal}
                  className="bg-[#C8FF3D] text-[#090909] font-syne font-bold text-xs tracking-wider px-6 py-3 rounded-full hover:bg-[#d4ff66] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>INSPECT {activeDiscipline.name} PROTOCOL</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-3 rounded-full bg-[#090909] border border-[#F1EEE7]/15 text-[#F1EEE7] hover:border-[#C8FF3D] hover:text-[#C8FF3D] transition-colors cursor-pointer"
                    aria-label="Previous Discipline"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-3 rounded-full bg-[#090909] border border-[#F1EEE7]/15 text-[#F1EEE7] hover:border-[#C8FF3D] hover:text-[#C8FF3D] transition-colors cursor-pointer"
                    aria-label="Next Discipline"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Visual & Interactive Hover Framing */}
            <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-[500px] rounded-2xl overflow-hidden group">
              <img
                src={activeDiscipline.image}
                alt={activeDiscipline.name}
                className="absolute inset-0 w-full h-full object-cover filter contrast-[1.15] brightness-[0.8] group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
              <div className="scanline-bg absolute inset-0 opacity-20 pointer-events-none" />

              {/* Geometric UI Crosshair Elements */}
              <div className="absolute top-4 left-4 font-mono-tech text-[10px] text-[#C8FF3D] bg-[#090909]/80 px-3 py-1 rounded border border-[#C8FF3D]/30 backdrop-blur-md">
                TELEMETRY RECV // 100%
              </div>
              <div className="absolute bottom-4 right-4 font-mono-tech text-[10px] text-[#8A8F99] bg-[#090909]/80 px-3 py-1 rounded border border-[#F1EEE7]/10 backdrop-blur-md">
                CAM_0{activeDiscipline.id} • FORGE_LAB
              </div>
              
              {/* Corner crosshair SVG graphics */}
              <div className="absolute top-3 right-3 text-[#C8FF3D] opacity-60 font-mono-tech text-xs">
                + [01]
              </div>
              <div className="absolute bottom-3 left-3 text-[#C8FF3D] opacity-60 font-mono-tech text-xs">
                + [02]
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Horizontal Card Grid Preview */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LAB_DISCIPLINES.map((disc, idx) => (
            <div
              key={disc.id}
              onClick={() => setActiveTab(idx)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-40 ${
                activeTab === idx
                  ? 'bg-[#161616] border-[#C8FF3D] shadow-xl'
                  : 'bg-[#111111]/80 border-[#F1EEE7]/10 hover:border-[#F1EEE7]/30 hover:bg-[#141414]'
              }`}
            >
              <div className="flex items-center justify-between font-mono-tech text-xs">
                <span className={activeTab === idx ? 'text-[#C8FF3D] font-bold' : 'text-[#8A8F99]'}>
                  {disc.id}
                </span>
                <span className="text-[10px] text-[#8A8F99] uppercase">{disc.code}</span>
              </div>

              <div>
                <h4 className="font-syne font-bold text-lg text-[#F1EEE7] uppercase">
                  {disc.name}
                </h4>
                <p className="font-mono-tech text-[11px] text-[#8A8F99] truncate">
                  {disc.subtitle}
                </p>
              </div>

              <div className="w-full h-[2px] bg-[#222] overflow-hidden rounded-full">
                <div
                  className={`h-full bg-[#C8FF3D] transition-all duration-300 ${
                    activeTab === idx ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
