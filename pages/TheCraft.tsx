
import React from 'react';
import { Flame, ShieldCheck, Gauge, Zap, Globe } from 'lucide-react';

const TheCraft: React.FC = () => {
  const steps = [
    { title: 'Digital CAD Rendering', desc: 'Every sign starts as a precision vector file, optimized for light diffusion.', icon: <Gauge className="w-8 h-8 text-cyan-400" /> },
    { title: 'Hand-Bent Artistry', desc: 'Our artisans use high-temperature shaping to ensure perfect curves and angles.', icon: <Flame className="w-8 h-8 text-orange-400" /> },
    { title: 'Circuit Assembly', desc: 'Integrated dimmers and UL-certified power supplies for maximum reliability.', icon: <Zap className="w-8 h-8 text-fuchsia-400" /> },
    { title: 'Quality Stress Test', desc: '100-hour burn-in period to ensure zero flicker and color consistency.', icon: <ShieldCheck className="w-8 h-8 text-emerald-400" /> },
  ];

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Precision Engineering</span>
        <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-8">THE <span className="text-white text-glow-cyan">CRAFT</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
          Combining old-world craftsmanship with next-generation LED technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
        {steps.map((step) => (
          <div key={step.title} className="glass-panel p-10 rounded-[2.5rem] border border-white/5 hover:border-cyan-400/20 transition-all group">
            <div className="mb-6 transform group-hover:scale-110 transition-transform">
              {step.icon}
            </div>
            <h3 className="font-orbitron text-xl font-bold mb-4">{step.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel p-12 rounded-[3rem] border border-white/10 flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1">
          <h2 className="font-orbitron text-4xl font-black mb-6">WHY LED <span className="text-cyan-400">FLEX?</span></h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <p className="text-slate-400 font-medium">80% more energy efficient than traditional glass neon.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <p className="text-slate-400 font-medium">Shatterproof and cool to the touch (safe for homes).</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <p className="text-slate-400 font-medium">Over 50,000 hours of continuous illumination.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <p className="text-slate-400 font-medium">No harmful gasses or mercury components.</p>
            </div>
          </div>
        </div>
        <div className="flex-1 relative aspect-video bg-slate-900/50 rounded-[2rem] overflow-hidden flex items-center justify-center">
          <Globe className="w-24 h-24 text-cyan-400 opacity-20 animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="font-orbitron text-xs font-black tracking-[0.5em] text-white/50 uppercase">Global Shipping</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheCraft;
