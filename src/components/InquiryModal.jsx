import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ArrowRight, Shield, MessageSquare } from 'lucide-react';
import { FORGE_META } from '../data/forgeData';

export default function InquiryModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    discipline: 'STRENGTH',
    goal: 'Maximal Power & Force Vectoring',
    timeSlot: '06:00 AM (PRIME)',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `*FORGE / 01 PRIVATE MEMBERSHIP APPLICATION*\n\n` +
      `*Athlete Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email || 'N/A'}\n` +
      `*Focus Discipline:* ${formData.discipline}\n` +
      `*Target Goal:* ${formData.goal}\n` +
      `*Preferred Slot:* ${formData.timeSlot}\n\n` +
      `Requested via FORGE / 01 Surat Platform.`
    );
    window.open(`https://wa.me/${FORGE_META.whatsapp}?text=${text}`, '_blank');
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#090909]/95 backdrop-blur-2xl p-4 sm:p-6 md:p-12 flex items-center justify-center overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative max-w-2xl w-full bg-[#111111] rounded-3xl border border-[#C8FF3D]/40 p-6 sm:p-10 shadow-2xl overflow-hidden my-auto"
        >
          {/* Scanline Background Effect */}
          <div className="scanline-bg absolute inset-0 pointer-events-none opacity-20" />

          {/* Close Button */}
          <button
            onClick={resetAndClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-[#090909] text-[#8A8F99] hover:text-[#C8FF3D] border border-[#F1EEE7]/10 transition-colors cursor-pointer z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div className="space-y-6 relative z-10">
              <div className="border-b border-[#F1EEE7]/10 pb-4">
                <span className="font-mono-tech text-xs text-[#C8FF3D] tracking-widest uppercase block mb-1">
                  MEMBERSHIP ASSESSMENT APPLICATION
                </span>
                <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#F1EEE7] uppercase">
                  ENTER THE FORGE STANDARDS
                </h3>
                <p className="font-sans-ui text-xs text-[#8A8F99] mt-1 font-light">
                  Complete your profile below. A Senior Performance Director will review your application for capacity availability in Surat.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono-tech text-[11px] text-[#F1EEE7] uppercase block mb-1.5">
                      FULL ATHLETE NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Arjun Mehta"
                      className="w-full bg-[#090909] border border-[#F1EEE7]/15 rounded-xl px-4 py-3 text-xs font-mono-tech text-[#F1EEE7] focus:outline-none focus:border-[#C8FF3D]"
                    />
                  </div>

                  <div>
                    <label className="font-mono-tech text-[11px] text-[#F1EEE7] uppercase block mb-1.5">
                      WHATSAPP / PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98250 00000"
                      className="w-full bg-[#090909] border border-[#F1EEE7]/15 rounded-xl px-4 py-3 text-xs font-mono-tech text-[#F1EEE7] focus:outline-none focus:border-[#C8FF3D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono-tech text-[11px] text-[#F1EEE7] uppercase block mb-1.5">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="arjun@forge.club"
                      className="w-full bg-[#090909] border border-[#F1EEE7]/15 rounded-xl px-4 py-3 text-xs font-mono-tech text-[#F1EEE7] focus:outline-none focus:border-[#C8FF3D]"
                    />
                  </div>

                  <div>
                    <label className="font-mono-tech text-[11px] text-[#F1EEE7] uppercase block mb-1.5">
                      PRIMARY DISCIPLINE FOCUS
                    </label>
                    <select
                      value={formData.discipline}
                      onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                      className="w-full bg-[#090909] border border-[#F1EEE7]/15 rounded-xl px-4 py-3 text-xs font-mono-tech text-[#F1EEE7] focus:outline-none focus:border-[#C8FF3D]"
                    >
                      <option value="STRENGTH">01 — STRENGTH (Heavy Compound Lifts)</option>
                      <option value="CONDITIONING">02 — CONDITIONING (Metabolic VO2)</option>
                      <option value="MOBILITY">03 — MOBILITY (Joint Longevity)</option>
                      <option value="PERFORMANCE">04 — PERFORMANCE (Rate of Force)</option>
                      <option value="PRIVATE 1-ON-1">05 — PRIVATE 1-ON-1 COACHING</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono-tech text-[11px] text-[#F1EEE7] uppercase block mb-1.5">
                    PREFERRED MORNING SLOT
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-[#090909] border border-[#F1EEE7]/15 rounded-xl px-4 py-3 text-xs font-mono-tech text-[#F1EEE7] focus:outline-none focus:border-[#C8FF3D]"
                  >
                    <option value="05:30 AM (ARRIVE)">05:30 AM (Silent Entry & Hydration)</option>
                    <option value="06:00 AM (PRIME)">06:00 AM (Neuromuscular Activation)</option>
                    <option value="07:00 AM (TRAIN)">07:00 AM (The Main Work)</option>
                    <option value="08:00 AM (RECOVER)">08:00 AM (Thermal Vault & Recovery)</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#C8FF3D] text-[#090909] font-syne font-bold text-xs tracking-widest py-4 rounded-xl uppercase hover:bg-[#d4ff66] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>SUBMIT ASSESSMENT APPLICATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 space-y-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#C8FF3D]/20 text-[#C8FF3D] border border-[#C8FF3D] flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="font-mono-tech text-xs text-[#C8FF3D] tracking-widest uppercase block mb-1">
                  APPLICATION RECORDED // ID #FRG-2026-88
                </span>
                <h3 className="font-syne font-extrabold text-3xl text-[#F1EEE7] uppercase">
                  APPLICATION RECEIVED, {formData.name.toUpperCase()}
                </h3>
                <p className="font-sans-ui text-xs text-[#8A8F99] mt-2 max-w-md mx-auto">
                  Your profile has been logged in the FORGE / 01 Surat registry. Send a direct verification via WhatsApp to fast-track your invitation.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto bg-[#C8FF3D] text-[#090909] font-syne font-bold text-xs tracking-widest px-8 py-3.5 rounded-full hover:bg-[#d4ff66] transition-colors flex items-center justify-center gap-2 cursor-pointer uppercase shadow-xl"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>FAST-TRACK VIA WHATSAPP</span>
                </button>

                <button
                  onClick={resetAndClose}
                  className="w-full sm:w-auto bg-[#090909] text-[#F1EEE7] font-syne font-bold text-xs tracking-widest px-6 py-3.5 rounded-full border border-[#F1EEE7]/20 hover:border-[#C8FF3D] transition-colors cursor-pointer uppercase"
                >
                  RETURN TO WEBSITE
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
