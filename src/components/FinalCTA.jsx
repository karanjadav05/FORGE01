import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, Compass } from 'lucide-react';
import { FORGE_META } from '../data/forgeData';

export default function FinalCTA({ onOpenJoinModal }) {
  return (
    <section
      id="cta"
      className="relative min-h-screen w-full bg-[#040404] py-32 px-6 md:px-12 flex flex-col justify-center items-center text-center overflow-hidden border-b border-[#F1EEE7]/10"
    >
      {/* Background Architectural Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#C8FF3D]/5 blur-[120px] pointer-events-none opacity-50" />
      <div className="scanline-bg absolute inset-0 pointer-events-none opacity-20" />
      <div className="architectural-grid-dense absolute inset-0 pointer-events-none opacity-10" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#F1EEE7]/10 text-xs font-mono-tech text-[#C8FF3D] tracking-widest uppercase">
          <Compass className="w-3.5 h-3.5" />
          <span>SECTION 10 // FINAL CALL TO ENTRY</span>
        </div>

        {/* Huge Enormous Text */}
        <h2 className="font-space font-extrabold text-6xl sm:text-8xl md:text-[10rem] text-[#F1EEE7] uppercase tracking-tight leading-[0.85]">
          READY
          <br />
          <span className="text-stroke-lime hover:text-[#C8FF3D] transition-colors duration-500">
            TO ENTER?
          </span>
        </h2>

        {/* Single Premium CTA Button with Subtle Border Accent */}
        <div className="relative inline-block py-6">
          <div className="absolute -inset-4 rounded-full border border-[#C8FF3D]/30 pointer-events-none" />
          <div className="absolute -inset-8 rounded-full border border-dashed border-[#F1EEE7]/15 pointer-events-none" />

          <button
            onClick={onOpenJoinModal}
            className="relative z-10 bg-[#C8FF3D] text-[#090909] font-syne font-bold text-base sm:text-lg tracking-widest px-10 sm:px-14 py-5 rounded-full hover:bg-[#d4ff66] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl shadow-[#C8FF3D]/20 cursor-pointer flex items-center justify-center gap-3 uppercase"
          >
            <span>[ ENTER FORGE ]</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        {/* Small Details Underneath */}
        <div className="space-y-1 font-mono-tech text-xs text-[#8A8F99] tracking-widest pt-8 uppercase">
          <p className="text-[#F1EEE7] font-semibold">{FORGE_META.subtext}</p>
          <p>{FORGE_META.location} • {FORGE_META.postal}</p>
          <p className="text-[#C8FF3D] text-[11px] pt-2">STRICTLY CAPPED AT 100 ATHLETES</p>
        </div>
      </div>
    </section>
  );
}
