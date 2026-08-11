import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, Shield, Crown, Award } from 'lucide-react';
import { MEMBERSHIPS, FORGE_META } from '../data/forgeData';

export default function Membership({ onOpenJoinModal }) {
  const [hoveredId, setHoveredId] = useState('private');

  const activeMembership = MEMBERSHIPS.find((m) => m.id === hoveredId) || MEMBERSHIPS[1];

  const handleWhatsApp = (membershipName) => {
    const msg = encodeURIComponent(
      `Hello FORGE / 01 team. I would like to inquire about the ${membershipName} tier membership in Surat.`
    );
    window.open(`https://wa.me/${FORGE_META.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <motion.section
      id="membership"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className="relative min-h-screen w-full bg-[#090909] py-28 px-6 md:px-12 overflow-hidden border-b border-[#F1EEE7]/10 flex flex-col justify-center"
    >
      {/* Background Dynamic Preview Image Overlay */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out opacity-20">
        <img
          src={activeMembership.bgImage}
          alt={activeMembership.name}
          className="w-full h-full object-cover filter contrast-125 brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#090909]/80" />
      </div>

      <div className="architectural-grid absolute inset-0 pointer-events-none opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#C8FF3D] tracking-widest uppercase">
            <Crown className="w-4 h-4" />
            <span>SECTION 08 // MEMBERSHIP STANDARDS</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl text-[#F1EEE7] uppercase tracking-tight">
            CHOOSE YOUR <span className="text-stroke-lime">STANDARD.</span>
          </h2>
          <p className="font-sans-ui text-sm text-[#8A8F99] font-light max-w-lg">
            Membership is strictly capped at 100 active athletes to ensure zero waiting for platforms, pristine facility maintenance, and direct coach oversight.
          </p>
        </div>

        {/* Editorial Accordion Expansion Showcase */}
        <div className="space-y-4">
          {MEMBERSHIPS.map((tier) => {
            const isHovered = hoveredId === tier.id;

            return (
              <motion.div
                key={tier.id}
                onMouseEnter={() => setHoveredId(tier.id)}
                className={`rounded-3xl border transition-all duration-500 overflow-hidden cursor-pointer ${
                  isHovered
                    ? 'bg-[#111111] border-[#C8FF3D] p-8 md:p-10 shadow-2xl'
                    : 'bg-[#111111]/40 border-[#F1EEE7]/10 p-6 md:p-8 hover:bg-[#111111]/70'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Tier Name & Badge */}
                  <div className="flex items-center gap-6">
                    <span className="font-mono-tech text-3xl md:text-5xl font-bold text-[#C8FF3D]">
                      0{MEMBERSHIPS.findIndex((m) => m.id === tier.id) + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-syne font-extrabold text-3xl md:text-5xl text-[#F1EEE7] uppercase tracking-tight">
                          {tier.name}
                        </h3>
                        <span className="px-3 py-1 rounded-full bg-[#090909] border border-[#C8FF3D]/30 font-mono-tech text-[10px] text-[#C8FF3D] tracking-wider uppercase">
                          {tier.badge}
                        </span>
                      </div>
                      <p className="font-mono-tech text-xs text-[#8A8F99] mt-1">
                        {tier.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="text-left lg:text-right">
                    <span className="font-syne font-bold text-3xl md:text-4xl text-[#F1EEE7]">
                      {tier.price}
                    </span>
                    <span className="font-mono-tech text-xs text-[#8A8F99] ml-1">
                      {tier.period}
                    </span>
                  </div>
                </div>

                {/* Expanded Content (Details & Perks) */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="pt-8 mt-8 border-t border-[#F1EEE7]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
                    >
                      <div className="lg:col-span-7 space-y-6">
                        <p className="font-sans-ui text-sm text-[#F1EEE7] leading-relaxed font-light">
                          {tier.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {tier.features.map((feature, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2.5 font-mono-tech text-xs text-[#8A8F99]"
                            >
                              <Check className="w-4 h-4 text-[#C8FF3D] shrink-0 mt-0.5" />
                              <span className="text-[#F1EEE7]">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch lg:justify-end gap-3">
                        <button
                          onClick={() => handleWhatsApp(tier.name)}
                          className="bg-[#C8FF3D] text-[#090909] font-syne font-bold text-xs tracking-widest px-8 py-4 rounded-full hover:bg-[#d4ff66] transition-colors flex items-center justify-center gap-2 cursor-pointer uppercase shadow-xl"
                        >
                          <span>START YOUR STANDARD →</span>
                        </button>
                        <button
                          onClick={onOpenJoinModal}
                          className="bg-[#090909] text-[#F1EEE7] font-syne font-bold text-xs tracking-widest px-6 py-4 rounded-full border border-[#F1EEE7]/20 hover:border-[#C8FF3D] transition-colors cursor-pointer uppercase text-center"
                        >
                          INQUIRE VIA FORM
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
