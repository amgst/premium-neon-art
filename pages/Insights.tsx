
import React from 'react';
import { BarChart3, PieChart, Activity, Globe, ShieldCheck } from 'lucide-react';

const Insights: React.FC = () => {
  const metrics = [
    { label: 'Network Growth', value: '+342%', trend: 'Upward' },
    { label: 'Strategic Nodes', value: '8,402', trend: 'Stable' },
    { label: 'Asset Liquidity', value: '4.2B CR', trend: 'High' },
    { label: 'Consensus Rate', value: '99.99%', trend: 'Verified' },
  ];

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <span className="text-emerald-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">ENTERPRISE ANALYTICS</span>
          <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-16">GLOBAL <span className="text-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">INSIGHTS</span></h1>
          
          <div className="space-y-12">
            <div className="glass-panel p-12 rounded-[3rem] border border-emerald-500/10">
              <div className="flex items-center gap-6 mb-8">
                <Activity className="w-12 h-12 text-emerald-400" />
                <h3 className="font-orbitron text-3xl font-black">Market Resonance</h3>
              </div>
              <p className="text-slate-400 leading-relaxed text-xl mb-12">
                Real-time tracking of the global synaptic economy. Our neural analytics engine processes quadrillions of data points to predict market shifts before they occur.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m) => (
                  <div key={m.label} className="p-6 bg-slate-900/50 rounded-[2rem] border border-white/5 group hover:border-emerald-400/30 transition-all">
                    <span className="text-[10px] font-black text-slate-500 block mb-2 uppercase tracking-widest">{m.label}</span>
                    <span className="font-orbitron text-xl font-black text-white block mb-2">{m.value}</span>
                    <span className="text-[10px] text-emerald-400 font-black flex items-center gap-1.5 uppercase">
                       <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> {m.trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="glass-panel p-10 rounded-[3rem] border border-white/10 group hover:border-fuchsia-400/30 transition-all">
                <ShieldCheck className="w-10 h-10 text-fuchsia-500 mb-8" />
                <h4 className="font-orbitron text-2xl font-black mb-4">Risk Mitigation</h4>
                <p className="text-slate-400 leading-relaxed">
                  Automated quantum-defense protocols that proactively isolate threats to your corporate assets.
                </p>
              </div>
              <div className="glass-panel p-10 rounded-[3rem] border border-white/10 group hover:border-cyan-400/30 transition-all">
                <Globe className="w-10 h-10 text-cyan-400 mb-8" />
                <h4 className="font-orbitron text-2xl font-black mb-4">Expansion Vectors</h4>
                <p className="text-slate-400 leading-relaxed">
                  Identifying key sectors in the meta-economy for immediate strategic deployment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-40 space-y-10">
            <div className="glass-panel p-10 rounded-[3rem] border border-white/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <BarChart3 className="w-32 h-32" />
              </div>
              <h4 className="font-orbitron text-xs font-black tracking-widest text-slate-500 mb-10 uppercase">Enterprise Status</h4>
              <div className="space-y-6 font-mono text-[11px] leading-relaxed">
                <div className="flex gap-3 text-emerald-400">
                  <span className="opacity-50">#821</span>
                  <span>Nexus Bridge Status: STABLE</span>
                </div>
                <div className="flex gap-3 text-emerald-400">
                  <span className="opacity-50">#822</span>
                  <span>Neural Sync Completion: 100%</span>
                </div>
                <div className="flex gap-3 text-slate-500">
                  <span className="opacity-50">#823</span>
                  <span>Recalibrating Strategy Node 4...</span>
                </div>
                <div className="flex gap-3 text-fuchsia-400">
                  <span className="opacity-50">#824</span>
                  <span>Growth Vector Detected [Sector A-9]</span>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-white/5">
                <button className="w-full py-4 rounded-xl bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                  REFRESH GRID
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
