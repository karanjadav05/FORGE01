import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Volume2, VolumeX, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { FORGE_META } from '../data/forgeData';

export default function Navbar({ onOpenJoinModal, isAudioPlaying, toggleAudio }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { label: 'PHILOSOPHY', href: '#philosophy' },
    { label: 'LAB', href: '#lab' },
    { label: 'MACHINE', href: '#human-machine' },
    { label: 'SYSTEM', href: '#system' },
    { label: 'FACILITY', href: '#facility' },
    { label: 'RITUAL', href: '#ritual' },
    { label: 'MEMBERSHIP', href: '#membership' },
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Use IntersectionObserver for active section tracking without layout thrashing
    const sectionIds = ['hero', 'philosophy', 'lab', 'human-machine', 'system', 'facility', 'ritual', 'membership', 'testimonials'];
    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3.5 bg-[#090909]/85 backdrop-blur-md border-b border-[#F1EEE7]/10 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <span className="font-space font-bold text-lg md:text-xl tracking-wider text-[#F1EEE7] group-hover:text-[#C8FF3D] transition-colors">
              FORGE <span className="text-[#C8FF3D] font-mono-tech text-sm font-normal ml-1">/ 01</span>
            </span>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#111111] border border-[#F1EEE7]/10 text-[10px] font-mono-tech text-[#8A8F99]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF3D]" />
              <span>LIVE</span>
            </div>
          </a>

          {/* Center Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-8 bg-[#111111]/60 px-6 py-2 rounded-full border border-[#F1EEE7]/10 backdrop-blur-sm">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-xs font-mono-tech tracking-widest transition-all relative py-1 ${
                    isActive
                      ? 'text-[#C8FF3D] font-medium'
                      : 'text-[#8A8F99] hover:text-[#F1EEE7]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C8FF3D]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleAudio}
              className="p-2 rounded-full bg-[#111111] border border-[#F1EEE7]/10 text-[#8A8F99] hover:text-[#C8FF3D] hover:border-[#C8FF3D]/40 transition-all text-xs font-mono-tech flex items-center gap-1.5 cursor-pointer"
              title={isAudioPlaying ? "Mute Atmospheric Audio" : "Enable Atmospheric Audio"}
            >
              {isAudioPlaying ? (
                <Volume2 className="w-4 h-4 text-[#C8FF3D]" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
              <span className="hidden sm:inline text-[10px] font-mono-tech tracking-wider uppercase">
                {isAudioPlaying ? 'AUDIO ON' : 'ATMOSPHERE'}
              </span>
            </button>

            {/* Join CTA */}
            <button
              onClick={onOpenJoinModal}
              className="hidden sm:flex items-center gap-2 bg-[#F1EEE7] hover:bg-[#C8FF3D] text-[#090909] px-5 py-2 rounded-full text-xs font-syne font-bold tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-black/50 cursor-pointer"
            >
              <span>[ JOIN ]</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#111111] border border-[#F1EEE7]/15 text-[#F1EEE7] hover:text-[#C8FF3D] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#090909]/98 backdrop-blur-xl pt-28 pb-12 px-8 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="scanline-bg absolute inset-0 pointer-events-none opacity-20" />
            
            <div className="space-y-6 relative z-10">
              <div className="text-[11px] font-mono-tech text-[#8A8F99] tracking-widest border-b border-[#F1EEE7]/10 pb-3">
                NAVIGATION / FORGE 01
              </div>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group flex items-baseline justify-between text-2xl font-syne font-bold text-[#F1EEE7] hover:text-[#C8FF3D] transition-colors border-b border-[#F1EEE7]/5 pb-3"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono-tech text-xs text-[#8A8F99] group-hover:text-[#C8FF3D]">
                      0{idx + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="space-y-6 relative z-10 pt-8 border-t border-[#F1EEE7]/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoinModal();
                }}
                className="w-full bg-[#C8FF3D] text-[#090909] font-syne font-bold text-sm tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#d4ff66] transition-colors cursor-pointer"
              >
                <span>[ ENTER FORGE NOW ]</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono-tech text-[#8A8F99]">
                <div>
                  <p className="text-[#F1EEE7] font-medium mb-1">LOCATION</p>
                  <p>{FORGE_META.location}</p>
                  <p>{FORGE_META.postal}</p>
                </div>
                <div>
                  <p className="text-[#F1EEE7] font-medium mb-1">HOURS</p>
                  <p>05:00 - 22:00 MON-SAT</p>
                  <p>SUNDAY: CLOSED</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
