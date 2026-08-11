import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Maximize2, ShieldCheck, X } from 'lucide-react';
import { FACILITY_GALLERY } from '../data/forgeData';

export default function Facility() {
  const [activeModalImage, setActiveModalImage] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <motion.section
      id="facility"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className="relative min-h-screen w-full bg-[#090909] py-28 px-6 md:px-12 overflow-hidden border-b border-[#F1EEE7]/10"
    >
      <div className="scanline-bg absolute inset-0 pointer-events-none opacity-15" />
      <div className="architectural-grid absolute inset-0 pointer-events-none opacity-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#C8FF3D] tracking-widest uppercase mb-3">
              <Building2 className="w-4 h-4" />
              <span>SECTION 06 // ARCHITECTURAL INFRASTRUCTURE</span>
            </div>
            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl text-[#F1EEE7] uppercase tracking-tight">
              BUILT FOR <span className="text-stroke-lime">THE WORK.</span>
            </h2>
          </div>
          <p className="font-sans-ui text-sm text-[#8A8F99] font-light max-w-md">
            Raw concrete. Custom matte-black steel. Soundproofed acoustic rubber. Acoustic dampening. Designed to maximize mental clarity and absolute physical output.
          </p>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-12 gap-6 items-stretch">
          {FACILITY_GALLERY.map((item) => {
            const isHovered = hoveredId === item.id;
            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveModalImage(item)}
                className={`${item.aspect} relative rounded-3xl overflow-hidden bg-[#111111] border border-[#F1EEE7]/10 group cursor-pointer min-h-[320px] lg:min-h-[400px] transition-all duration-500 shadow-2xl`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover filter contrast-[1.15] brightness-[0.75] group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                {/* Content Box */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-xs text-[#C8FF3D] bg-[#090909]/80 px-3 py-1 rounded-full border border-[#C8FF3D]/30 backdrop-blur-md">
                      {item.zone}
                    </span>
                    <button
                      className="p-2 rounded-full bg-[#090909]/80 text-[#F1EEE7] border border-[#F1EEE7]/20 group-hover:border-[#C8FF3D] group-hover:text-[#C8FF3D] transition-colors"
                      aria-label="Expand image view"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-syne font-extrabold text-2xl md:text-3xl text-[#F1EEE7] uppercase tracking-tight group-hover:text-[#C8FF3D] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-mono-tech text-xs text-[#8A8F99]">
                      {item.spec}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Facility Specification Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono-tech text-xs text-[#8A8F99]">
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#F1EEE7]/10 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C8FF3D]" />
            <div>
              <p className="text-[#F1EEE7] font-semibold">12,000 SQ FT</p>
              <p className="text-[10px]">Private Footprint</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#F1EEE7]/10 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C8FF3D]" />
            <div>
              <p className="text-[#F1EEE7] font-semibold">100 MEMBER CAP</p>
              <p className="text-[10px]">Strict Access Ratio</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#F1EEE7]/10 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C8FF3D]" />
            <div>
              <p className="text-[#F1EEE7] font-semibold">AIR PURITY ALGORITHM</p>
              <p className="text-[10px]">HEPA-14 & Medical Oxygen</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#F1EEE7]/10 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C8FF3D]" />
            <div>
              <p className="text-[#F1EEE7] font-semibold">ACOUSTIC ISOLATION</p>
              <p className="text-[10px]">65dB Silent Environment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {activeModalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalImage(null)}
            className="fixed inset-0 z-50 bg-[#090909]/95 backdrop-blur-xl p-6 md:p-12 flex items-center justify-center cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#111111] rounded-3xl border border-[#C8FF3D]/30 overflow-hidden shadow-2xl cursor-default"
            >
              <button
                onClick={() => setActiveModalImage(null)}
                className="absolute top-6 right-6 z-20 p-3 rounded-full bg-[#090909] text-[#F1EEE7] hover:text-[#C8FF3D] border border-[#F1EEE7]/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative h-[420px] md:h-[550px] w-full">
                <img
                  src={activeModalImage.image}
                  alt={activeModalImage.title}
                  className="w-full h-full object-cover filter contrast-[1.15]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
              </div>

              <div className="p-8 space-y-3">
                <span className="font-mono-tech text-xs text-[#C8FF3D] tracking-widest uppercase">
                  {activeModalImage.zone}
                </span>
                <h3 className="font-syne font-extrabold text-3xl text-[#F1EEE7] uppercase">
                  {activeModalImage.title}
                </h3>
                <p className="font-mono-tech text-sm text-[#8A8F99]">
                  {activeModalImage.spec}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
