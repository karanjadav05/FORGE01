import React from 'react';
import { FORGE_META } from '../data/forgeData';
import { ShieldCheck, ArrowUpRight, MessageSquare, Instagram, Youtube, Twitter } from 'lucide-react';

export default function Footer({ onOpenJoinModal }) {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Hello FORGE / 01 Surat team. I would like to schedule a private visit.");
    window.open(`https://wa.me/${FORGE_META.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <footer className="bg-[#070707] text-[#F1EEE7] pt-20 pb-12 px-6 md:px-12 border-t border-[#F1EEE7]/10 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#F1EEE7]/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="inline-block">
              <span className="font-syne font-extrabold text-2xl text-[#F1EEE7]">
                FORGE <span className="text-[#C8FF3D] font-mono-tech text-base font-normal">/ 01</span>
              </span>
            </a>
            <p className="font-mono-tech text-xs text-[#C8FF3D] tracking-widest uppercase">
              "{FORGE_META.tagline}"
            </p>
            <p className="font-sans-ui text-xs text-[#8A8F99] leading-relaxed max-w-sm font-light">
              Surat's premiere private performance club. Architectural strength training, metabolic conditioning, thermal recovery vaults, and 1-on-1 athletic coaching.
            </p>

            <div className="pt-2 flex items-center gap-3 font-mono-tech text-xs text-[#8A8F99]">
              <span className="w-2 h-2 rounded-full bg-[#C8FF3D]" />
              <span>FACILITY OPERATIONAL • CAPPED ACCESS</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3 font-mono-tech text-xs">
            <h4 className="text-[#F1EEE7] font-bold tracking-widest uppercase mb-4 border-b border-[#F1EEE7]/10 pb-2">
              SECTIONS
            </h4>
            <ul className="space-y-2.5 text-[#8A8F99]">
              <li>
                <a href="#philosophy" onClick={(e) => handleNavClick(e, '#philosophy')} className="hover:text-[#C8FF3D] transition-colors">
                  01 // THE PHILOSOPHY
                </a>
              </li>
              <li>
                <a href="#lab" onClick={(e) => handleNavClick(e, '#lab')} className="hover:text-[#C8FF3D] transition-colors">
                  02 // PERFORMANCE LAB
                </a>
              </li>
              <li>
                <a href="#human-machine" onClick={(e) => handleNavClick(e, '#human-machine')} className="hover:text-[#C8FF3D] transition-colors">
                  03 // HUMAN MACHINE
                </a>
              </li>
              <li>
                <a href="#system" onClick={(e) => handleNavClick(e, '#system')} className="hover:text-[#C8FF3D] transition-colors">
                  04 // TRAINING SYSTEM
                </a>
              </li>
              <li>
                <a href="#facility" onClick={(e) => handleNavClick(e, '#facility')} className="hover:text-[#C8FF3D] transition-colors">
                  05 // ARCHITECTURAL FACILITY
                </a>
              </li>
              <li>
                <a href="#ritual" onClick={(e) => handleNavClick(e, '#ritual')} className="hover:text-[#C8FF3D] transition-colors">
                  06 // DAILY RITUAL
                </a>
              </li>
              <li>
                <a href="#membership" onClick={(e) => handleNavClick(e, '#membership')} className="hover:text-[#C8FF3D] transition-colors">
                  07 // MEMBERSHIP TIER
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Access Info */}
          <div className="lg:col-span-4 space-y-4 font-mono-tech text-xs">
            <h4 className="text-[#F1EEE7] font-bold tracking-widest uppercase mb-4 border-b border-[#F1EEE7]/10 pb-2">
              SURAT LAB DIRECTORY
            </h4>
            
            <div className="space-y-1 text-[#8A8F99]">
              <p className="text-[#F1EEE7] font-medium">LOCATION:</p>
              <p>{FORGE_META.location}</p>
              <p>POSTAL CODE: {FORGE_META.postal}</p>
              <p className="text-[11px] text-[#8A8F99]">{FORGE_META.coordinates}</p>
            </div>

            <div className="space-y-1 text-[#8A8F99]">
              <p className="text-[#F1EEE7] font-medium">OPERATING HOURS:</p>
              <p>{FORGE_META.hours}</p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleWhatsApp}
                className="bg-[#111111] text-[#F1EEE7] hover:text-[#C8FF3D] hover:border-[#C8FF3D] px-4 py-2 rounded-lg border border-[#F1EEE7]/15 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C8FF3D]" />
                <span>WHATSAPP HOTLINE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-xs text-[#8A8F99]">
          <p>© {new Date().getFullYear()} FORGE / 01 PRIVATE PERFORMANCE CLUB. ALL RIGHTS RESERVED.</p>
          
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8FF3D] transition-colors">
              INSTAGRAM
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8FF3D] transition-colors">
              YOUTUBE
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8FF3D] transition-colors">
              X (TWITTER)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
