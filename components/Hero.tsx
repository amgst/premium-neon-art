
import React from 'react';
import { ArrowRight, Zap, Sparkles as SparklesIcon } from 'lucide-react';
import { PageType } from '../types';

interface HeroProps {
  onNavigate: (page: PageType) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background Layer: Deep Background Grid (Static) */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
      ></div>

      {/* Background Layer: Large Glow Blob (Static) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-500/10 rounded-full blur-[200px] pointer-events-none"
      ></div>

      {/* Floating Sparkles (Static position, pulse animation only) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-fuchsia-400/30 animate-pulse"
            style={{
              top: `${(i * 7) % 100}%`,
              left: `${(i * 13) % 100}%`,
            }}
          >
            <SparklesIcon size={12 + (i % 5) * 4} />
          </div>
        ))}
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-panel border border-fuchsia-500/20 text-[10px] font-black tracking-[0.3em] text-fuchsia-400 uppercase mb-12 shadow-[0_0_30px_rgba(217,70,239,0.2)]">
          <Zap className="w-3.5 h-3.5 animate-pulse" />
          Handcrafted Electric Art for Every Vibe
        </div>

        <h1 className="font-orbitron text-7xl md:text-[9rem] font-black leading-[0.9] mb-10 tracking-tighter">
          <span className="block text-white opacity-95">
            LIGHT UP YOUR
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-white to-cyan-400 text-glow-fuchsia">
            UNIVERSE
          </span>
        </h1>

        <p className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
          Premium neon signs designed to transform your <span className="text-fuchsia-400 font-medium">home</span>, 
          <span className="text-cyan-400 font-medium"> workspace</span>, or <span className="text-white font-medium">commercial lounge</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          <button 
            onClick={() => onNavigate('shop')}
            className="group relative px-12 py-6 bg-white text-slate-950 rounded-2xl font-black text-xl flex items-center gap-4 overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 hover:shadow-[0_0_60px_rgba(217,70,239,0.6)]"
          >
            <span className="relative z-10">SHOP NEON</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-400 via-white to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button 
            onClick={() => onNavigate('custom')}
            className="flex items-center gap-3 px-12 py-6 glass-panel rounded-2xl font-bold text-xl border border-white/10 text-white hover:border-fuchsia-400/50 hover:bg-white/5 transition-all duration-300 hover:text-glow-fuchsia"
          >
            CREATE CUSTOM SIGN
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
