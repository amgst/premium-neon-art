
import React from 'react';
import { Hexagon, Layers, Eye, Cpu } from 'lucide-react';

const Exhibits: React.FC = () => {
  const artifacts = [
    { id: 'A-01', name: 'Neural Mantle', year: '2084', type: 'Bio-Sync Wearable', color: 'text-cyan-400' },
    { id: 'A-02', name: 'Glitch-Core Blade', year: '2089', type: 'Defense Asset', color: 'text-fuchsia-400' },
    { id: 'A-03', name: 'Ionic Respirator', year: '2077', type: 'Environmental Gear', color: 'text-emerald-400' },
    { id: 'A-04', name: 'Phase-Shift Boots', year: '2091', type: 'Mobility Mod', color: 'text-yellow-400' },
  ];

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-20">
        <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Archive 0.1 // Digital Relics</span>
        <h1 className="font-orbitron text-5xl md:text-7xl font-black mb-8">ARTIFACT <span className="text-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">VAULT</span></h1>
        <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
          The following assets have been retrieved from the deep-web fringes. 
          Each artifact contains encoded history and unique metadata signatures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {artifacts.map((art, idx) => (
          <div key={art.id} className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-3xl blur opacity-20 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative glass-panel rounded-3xl overflow-hidden aspect-video flex flex-col justify-end p-8">
              {/* Fake background image/pattern */}
              <div className="absolute inset-0 bg-slate-900/50 pointer-events-none">
                <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
              </div>

              {/* Holographic scanning line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/30 blur-sm group-hover:animate-bounce transition-all duration-1000"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className={`text-xs font-black tracking-widest mb-2 flex items-center gap-2 ${art.color}`}>
                    <Hexagon className="w-3 h-3 fill-current" />
                    {art.id} // SECURED
                  </div>
                  <h2 className="font-orbitron text-3xl font-black text-white group-hover:text-glow-cyan transition-all">{art.name}</h2>
                  <p className="text-slate-500 text-sm mt-2">{art.type} // Origin: Sector {idx + 7}</p>
                </div>
                <div className="flex gap-3">
                  <button className="p-3 glass-panel border border-white/10 rounded-xl hover:text-cyan-400 transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-3 glass-panel border border-white/10 rounded-xl hover:text-cyan-400 transition-colors">
                    <Cpu className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exhibits;
