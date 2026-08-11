import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Target, Zap, Heart, Compass, ShieldCheck } from 'lucide-react';
import { HUMAN_MACHINE_NODES } from '../data/forgeData';

export default function HumanMachine() {
  const [selectedNode, setSelectedNode] = useState(HUMAN_MACHINE_NODES[0]);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  const getIcon = (id) => {
    switch (id) {
      case 'POWER': return <Zap className="w-4 h-4 text-[#C8FF3D]" />;
      case 'CONTROL': return <Target className="w-4 h-4 text-[#C8FF3D]" />;
      case 'MOBILITY': return <Compass className="w-4 h-4 text-[#C8FF3D]" />;
      case 'RECOVERY': return <ShieldCheck className="w-4 h-4 text-[#C8FF3D]" />;
      case 'ENDURANCE': return <Heart className="w-4 h-4 text-[#C8FF3D]" />;
      default: return <Activity className="w-4 h-4 text-[#C8FF3D]" />;
    }
  };

  return (
    <motion.section
      id="human-machine"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className="relative min-h-screen w-full bg-[#090909] py-28 px-6 md:px-12 overflow-hidden border-b border-[#F1EEE7]/10 flex flex-col justify-center"
    >
      {/* Background Architectural Grid & Scan Lines */}
      <div className="architectural-grid-dense absolute inset-0 pointer-events-none opacity-20" />
      <div className="scanline-bg absolute inset-0 pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-[#F1EEE7]/10 text-xs font-mono-tech text-[#C8FF3D] tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5" />
            <span>SECTION 04 // BIOMECHANICAL DIAGNOSTICS</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl text-[#F1EEE7] uppercase tracking-tight">
            BUILD THE <span className="text-stroke-lime">MACHINE.</span>
          </h2>
          <p className="font-sans-ui text-sm text-[#8A8F99] font-light max-w-lg mx-auto">
            Select kinetic zones below to inspect neuromuscular recruitment, joint load mechanics, and physical capacity specs.
          </p>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Anatomical Silhouette & Connecting Laser Nodes */}
          <div className="lg:col-span-7 relative h-[480px] sm:h-[580px] w-full rounded-3xl bg-[#111111]/70 border border-[#F1EEE7]/10 p-6 flex items-center justify-center overflow-hidden shadow-2xl">
            {/* Background Grid & Compass Graphic */}
            <div className="absolute inset-0 architectural-grid opacity-30" />
            <div className="absolute w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full border border-[#F1EEE7]/10" />
            <div className="absolute w-[200px] sm:w-[280px] h-[200px] sm:h-[280px] rounded-full border border-[#C8FF3D]/10" />

            {/* Central Artistic High-Contrast Athletic Silhouette */}
            <motion.div
              animate={{
                scale: hoveredNodeId ? 1.03 : 1,
                filter: hoveredNodeId ? 'contrast(1.2) brightness(0.9)' : 'contrast(1.1) brightness(0.8)',
              }}
              transition={{ duration: 0.5 }}
              className="relative h-full w-auto max-w-full flex items-center justify-center z-1"
            >
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000"
                alt="Human Machine Athletic Silhouette"
                className="h-[85%] sm:h-[92%] object-contain filter grayscale contrast-125 brightness-75 rounded-2xl border border-[#F1EEE7]/10 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/80" />
            </motion.div>

            {/* Interactive Kinetic Nodes */}
            {HUMAN_MACHINE_NODES.map((node) => {
              const isSelected = selectedNode.id === node.id;
              const isHovered = hoveredNodeId === node.id;

              return (
                <div
                  key={node.id}
                  style={{ top: node.coords.y, left: node.coords.x }}
                  className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
                >
                  {/* Pulsing Target Dot */}
                  <button
                    onClick={() => setSelectedNode(node)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className={`relative p-2.5 rounded-full transition-all duration-300 cursor-pointer group ${
                      isSelected
                        ? 'bg-[#C8FF3D] text-[#090909] scale-125 shadow-lg shadow-[#C8FF3D]/50'
                        : 'bg-[#090909]/90 border border-[#F1EEE7]/30 text-[#F1EEE7] hover:border-[#C8FF3D] hover:text-[#C8FF3D]'
                    }`}
                  >
                    {/* Active Ring Indicator */}
                    <span
                      className={`absolute inset-0 rounded-full border border-[#C8FF3D] transition-opacity ${
                        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                      }`}
                    />
                    {getIcon(node.id)}

                    {/* Floating Label Text Tag */}
                    <span
                      className={`absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-[#090909]/90 border text-[10px] font-mono-tech tracking-wider uppercase whitespace-nowrap backdrop-blur-md transition-all ${
                        isSelected
                          ? 'border-[#C8FF3D] text-[#C8FF3D] font-bold shadow-md'
                          : 'border-[#F1EEE7]/15 text-[#8A8F99] group-hover:text-[#F1EEE7]'
                      }`}
                    >
                      {node.id}
                    </span>
                  </button>
                </div>
              );
            })}

            {/* Bottom HUD Bar */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono-tech text-[10px] text-[#8A8F99] bg-[#090909]/80 px-4 py-2 rounded-xl border border-[#F1EEE7]/10 backdrop-blur-md">
              <span className="text-[#C8FF3D]">KINEMATIC MODEL // ACTIVE</span>
              <span>TAP ANY NODE TO INSPECT</span>
            </div>
          </div>

          {/* Right Column: Node Detailed Telemetry Inspector Panel */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="bg-[#111111] p-8 rounded-3xl border border-[#C8FF3D]/30 shadow-2xl relative overflow-hidden space-y-6"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-[#F1EEE7]/10 pb-4">
                  <div className="flex items-center gap-2">
                    {getIcon(selectedNode.id)}
                    <span className="font-mono-tech text-xs text-[#C8FF3D] tracking-widest uppercase">
                      NODE {selectedNode.id}
                    </span>
                  </div>
                  <span className="font-mono-tech text-[10px] text-[#8A8F99] bg-[#090909] px-2.5 py-1 rounded border border-[#F1EEE7]/10">
                    TARGET: {selectedNode.zone}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-syne font-extrabold text-2xl text-[#F1EEE7] uppercase tracking-tight mb-1">
                    {selectedNode.title}
                  </h3>
                  <p className="font-mono-tech text-xs text-[#8A8F99]">
                    FOCUS: {selectedNode.focus}
                  </p>
                </div>

                {/* Description */}
                <p className="font-sans-ui text-xs sm:text-sm text-[#8A8F99] leading-relaxed font-light">
                  {selectedNode.detail}
                </p>

                {/* Telemetry Output Box */}
                <div className="bg-[#090909] p-4 rounded-xl border border-[#F1EEE7]/10 space-y-2">
                  <span className="font-mono-tech text-[10px] text-[#C8FF3D] uppercase tracking-widest block">
                    BENCHMARK CAPACITY METRIC
                  </span>
                  <p className="font-mono-tech text-sm font-semibold text-[#F1EEE7]">
                    {selectedNode.metric}
                  </p>
                </div>

                {/* Selector Pills */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {HUMAN_MACHINE_NODES.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`px-3 py-1.5 rounded-lg font-mono-tech text-[11px] tracking-wider uppercase transition-colors cursor-pointer border ${
                        selectedNode.id === node.id
                          ? 'bg-[#C8FF3D] text-[#090909] border-[#C8FF3D] font-bold'
                          : 'bg-[#090909] text-[#8A8F99] border-[#F1EEE7]/10 hover:text-[#F1EEE7]'
                      }`}
                    >
                      {node.id}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
