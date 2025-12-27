
import React from 'react';
import { Palette, Type, Maximize2, Send, CheckCircle2 } from 'lucide-react';

const Customizer: React.FC = () => {
  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Bespoke Design</span>
          <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-8 leading-none">CRAFT YOUR <span className="text-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">GLOW</span></h1>
          <p className="text-slate-400 text-xl leading-relaxed mb-12">
            Can't find what you're looking for? Our design team can turn any logo, quote, or sketch into a high-intensity neon masterpiece.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="p-4 glass-panel border border-cyan-500/20 rounded-2xl h-fit">
                <Type className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="font-orbitron text-xl font-bold mb-2">Custom Typography</h4>
                <p className="text-sm text-slate-500">Choose from 50+ script, block, and futuristic fonts.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="p-4 glass-panel border border-fuchsia-500/20 rounded-2xl h-fit">
                <Palette className="w-6 h-6 text-fuchsia-400" />
              </div>
              <div>
                <h4 className="font-orbitron text-xl font-bold mb-2">Infinite Palette</h4>
                <p className="text-sm text-slate-500">12+ vibrant colors with RGB dimming options available.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="p-4 glass-panel border border-white/10 rounded-2xl h-fit">
                <Maximize2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-orbitron text-xl font-bold mb-2">Any Scale</h4>
                <p className="text-sm text-slate-500">From 10-inch desk pieces to 20-foot commercial signage.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-10 rounded-[3rem] border border-white/10 relative overflow-hidden group">
          {/* Decorative scan effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/20 blur-sm group-hover:animate-bounce"></div>
          
          <h3 className="font-orbitron text-3xl font-black mb-10 text-center">INQUIRY FORM</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Name</label>
              <input type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400/50 transition-all" placeholder="Enter name..." />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Email Uplink</label>
              <input type="email" className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400/50 transition-all" placeholder="Enter email..." />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Your Vision (Text or Idea)</label>
              <textarea className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400/50 transition-all h-32" placeholder="Tell us about your neon..."></textarea>
            </div>
            <button className="w-full py-6 rounded-2xl bg-cyan-400 text-slate-950 font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center gap-3">
              <Send className="w-4 h-4" /> SEND DESIGN BRIEF
            </button>
            <p className="text-[10px] text-center text-slate-600 font-bold uppercase tracking-tighter">Quotes are free. Response time within 24 standard cycles.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customizer;
