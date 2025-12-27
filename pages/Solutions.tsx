
import React from 'react';
import { Target, BarChart, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const Solutions: React.FC = () => {
  const products = [
    { id: 'S-01', name: 'Neural Logistics', type: 'Supply Chain AI', color: 'text-emerald-400', desc: 'Predictive autonomous supply route optimization.' },
    { id: 'S-02', name: 'Quantum Ledger', type: 'Financial Security', color: 'text-fuchsia-400', desc: 'Irreversible transaction verification on the neon-mesh.' },
    { id: 'S-03', name: 'Flux Marketing', type: 'Brand Strategy', color: 'text-cyan-400', desc: 'Real-time consumer resonance and digital aura management.' },
    { id: 'S-04', name: 'Apex Infrastructure', type: 'Enterprise Cloud', color: 'text-orange-400', desc: 'Zero-latency global node clusters for heavy workloads.' },
  ];

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-24 text-center md:text-left">
        <span className="text-emerald-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Deployment Modules // v4.2</span>
        <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-8">CORE <span className="text-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-white">SOLUTIONS</span></h1>
        <p className="text-slate-400 max-w-3xl text-xl leading-relaxed">
          Proprietary infrastructure designed to accelerate enterprise growth. 
          Select a module to initiate strategic integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {products.map((solution) => (
          <div key={solution.id} className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 to-fuchsia-500/30 rounded-[2.5rem] blur opacity-20 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative glass-panel rounded-[2.5rem] p-12 flex flex-col h-full">
              <div className={`text-xs font-black tracking-widest mb-6 flex items-center gap-2 ${solution.color}`}>
                <Target className="w-4 h-4" />
                MODULE {solution.id} // ACTIVE
              </div>
              <h2 className="font-orbitron text-4xl font-black text-white mb-4 group-hover:text-glow-cyan transition-all">{solution.name}</h2>
              <p className="text-slate-500 text-lg mb-10">{solution.desc}</p>
              
              <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{solution.type}</span>
                <button className="flex items-center gap-2 text-white font-black text-xs uppercase group/btn transition-colors hover:text-emerald-400">
                  Integrate Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solutions;
