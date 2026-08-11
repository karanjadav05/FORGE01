import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import PerformanceLab from './components/PerformanceLab';
import HumanMachine from './components/HumanMachine';
import TrainingSystem from './components/TrainingSystem';
import Facility from './components/Facility';
import DailyRitual from './components/DailyRitual';
import Membership from './components/Membership';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import InquiryModal from './components/InquiryModal';

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillatorNode, setOscillatorNode] = useState<OscillatorNode | null>(null);

  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (oscillatorNode) {
        oscillatorNode.stop();
        oscillatorNode.disconnect();
        setOscillatorNode(null);
      }
      setIsAudioPlaying(false);
    } else {
      try {
        const ctx = audioContext || new (window.AudioContext || (window as any).webkitAudioContext)();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        setAudioContext(ctx);

        // Create warm sub-bass ambient drone at 55Hz (A1)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(120, ctx.currentTime);

        // Very soft subtle volume
        gain.gain.setValueAtTime(0.035, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        setOscillatorNode(osc);
        setIsAudioPlaying(true);
      } catch (e) {
        console.warn('Audio play restricted by browser policy:', e);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (oscillatorNode) {
        oscillatorNode.stop();
        oscillatorNode.disconnect();
      }
    };
  }, [oscillatorNode]);

  return (
    <div className="min-h-screen bg-[#090909] text-[#F1EEE7] font-sans-ui selection:bg-[#C8FF3D] selection:text-[#090909] relative">
      {/* Background radial glow */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at 70% 30%, #222222 0%, transparent 70%)' }}
      />
      {/* Scroll Progress Bar at Top */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-[#222222] z-50 pointer-events-none">
        <div
          id="scrollProgress"
          className="h-full bg-[#C8FF3D] origin-left will-change-transform"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Header Navigation */}
      <Navbar
        onOpenJoinModal={() => setIsJoinModalOpen(true)}
        isAudioPlaying={isAudioPlaying}
        toggleAudio={toggleAudio}
      />

      {/* Main Page Sections */}
      <main>
        <Hero onOpenJoinModal={() => setIsJoinModalOpen(true)} />
        <Philosophy />
        <PerformanceLab onOpenJoinModal={() => setIsJoinModalOpen(true)} />
        <HumanMachine />
        <TrainingSystem onOpenJoinModal={() => setIsJoinModalOpen(true)} />
        <Facility />
        <DailyRitual />
        <Membership onOpenJoinModal={() => setIsJoinModalOpen(true)} />
        <Testimonials />
        <FinalCTA onOpenJoinModal={() => setIsJoinModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenJoinModal={() => setIsJoinModalOpen(true)} />

      {/* Assessment Inquiry Modal */}
      <InquiryModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}

// Global scroll listener for top progress bar using transform: scaleX on GPU
if (typeof window !== 'undefined') {
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const bar = document.getElementById('scrollProgress');
          if (bar) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
            bar.style.transform = `scaleX(${progress})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}
