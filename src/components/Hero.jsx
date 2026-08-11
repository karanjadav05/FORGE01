import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { FORGE_META } from '../data/forgeData';

export default function Hero({ onOpenJoinModal }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Floating ambient dust particles in canvas (paused when out of viewport)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isIntersecting = true;

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting && !animationFrameId) {
        render();
      }
    }, { threshold: 0 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize, { passive: true });

    // Create 35 ambient dust particles for lightweight rendering
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1,
    }));

    const render = () => {
      if (!isIntersecting) {
        animationFrameId = null;
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241, 238, 231, ${p.alpha})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#090909] pt-24 pb-12"
    >
      {/* Background Architectural Training Environment Image with Parallax */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 pointer-events-none will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=2000"
          alt="FORGE 01 Dark Architectural Gym Environment"
          className="w-full h-full object-cover object-center opacity-40"
          referrerPolicy="no-referrer"
        />
        {/* Gradients and Haze Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-[#090909]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#090909]/60 to-[#090909]" />
        <div className="scanline-bg absolute inset-0 opacity-15" />
        <div className="architectural-grid absolute inset-0 opacity-20" />
      </motion.div>

      {/* Atmospheric Dust Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-1 pointer-events-none opacity-60"
      />

      {/* Top Meta Details Badge */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1EEE7]/10 pb-6"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C8FF3D]" />
          <span className="font-mono-tech text-xs tracking-widest text-[#F1EEE7]/80 uppercase">
            {FORGE_META.name} • {FORGE_META.subtext}
          </span>
        </div>
        <div className="flex items-center gap-6 font-mono-tech text-[11px] text-[#8A8F99] tracking-wider">
          <span>SURAT • GUJARAT</span>
          <span className="hidden md:inline">21.1702° N, 72.8311° E</span>
          <span className="text-[#C8FF3D]">PRIVATE ACCESS</span>
        </div>
      </motion.div>

      {/* Main Hero Typography Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 my-auto py-12"
      >
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-3 text-[#8A8F99] font-mono-tech text-xs md:text-sm tracking-[0.3em] uppercase"
          >
            <span className="h-[1px] w-8 bg-[#C8FF3D]" />
            <span>ARCHITECTURAL ATHLETISM</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-syne font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#F1EEE7] tracking-tight leading-[0.88] uppercase"
          >
            DISCIPLINE
            <br />
            <span className="font-serif-display font-light italic text-[#F1EEE7]/90 text-4xl sm:text-6xl md:text-7xl lg:text-8xl block my-1">
              HAS A
            </span>
            <span className="text-stroke-lime hover:text-[#C8FF3D] transition-all duration-500 block text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] tracking-tighter leading-[0.8]">
              DESIGN.
            </span>
          </motion.h1>
        </div>

        {/* Sub-Manifesto & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 pt-8 border-t border-[#F1EEE7]/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-end"
        >
          <div className="md:col-span-7">
            <p className="font-sans-ui text-sm sm:text-base text-[#8A8F99] leading-relaxed max-w-xl font-light">
              FORGE / 01 is an exclusive architectural laboratory for human performance in Surat. Engineered for athletes and executives who treat physical conditioning as a non-negotiable standard.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
            <button
              onClick={onOpenJoinModal}
              className="w-full sm:w-auto bg-[#C8FF3D] text-[#090909] font-syne font-bold text-xs tracking-widest px-8 py-4 rounded-full uppercase hover:bg-[#d4ff66] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl shadow-black cursor-pointer flex items-center justify-center gap-3"
            >
              <span>CLAIM MEMBERSHIP ASSESSMENT</span>
              <Sparkles className="w-4 h-4 text-[#090909]" />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Hero Footer Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between text-xs font-mono-tech text-[#8A8F99]"
      >
        <div className="flex items-center gap-2">
          <span className="text-[#F1EEE7] font-medium">SYSTEM STATUS:</span>
          <span className="text-[#C8FF3D]">ONLINE • 05:00 - 22:00</span>
        </div>

        <a
          href="#philosophy"
          className="group flex items-center gap-3 hover:text-[#C8FF3D] transition-colors py-2 cursor-pointer"
        >
          <span className="tracking-widest uppercase text-[11px]">SCROLL TO ENTER</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="p-1.5 rounded-full border border-[#F1EEE7]/20 group-hover:border-[#C8FF3D]"
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#C8FF3D]" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
