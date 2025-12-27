
import React from 'react';
import { Cpu, Zap, Radio, Database, ShieldAlert } from 'lucide-react';

const Tech: React.FC = () => {
  const specs = [
    { label: 'Uplink Latency', value: '0.002ms', status: 'Optimal' },
    { label: 'Neural Mesh Nodes', value: '1,440', status: 'Online' },
    { label: 'Asset Encryption', value: 'RSA-Q4', status: 'Active' },
    { label: 'Sync Rate', value: '98.4%', status: 'Synced' },
  ];

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <span className="text-emerald-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">SYSTEM DIAGNOSTICS</span>
          <h1 className="font-orbitron text-5xl md:text-7xl font-black mb-12">CORE <span className="text-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">ENGINE</span></h1>
          
          <div className="space-y-12">
            <div className="glass-panel p-10 rounded-3xl border border-emerald-500/20">
              <div className="flex items-center gap-4 mb-6">
                <Cpu className="w-10 h-10 text-emerald-400" />
                <h3 className="font-orbitron text-2xl font-bold">Neural Architecture</h3>
              </div>
              <p className="text-slate-400 leading-relaxed text-lg mb-8">
                The NovaLumina backbone is built on a distributed ledger of synaptic nodes. 
                Every interaction is verified by our decentralized AI consensus, 
                ensuring that your digital presence is as real as your physical one.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {specs.map((s) => (
                  <div key={s.label} className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-bold text-slate-500 block mb-1 uppercase tracking-tighter">{s.label}</span>
                    <span className="font-orbitron text-sm font-black text-white block mb-1">{s.value}</span>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                       <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-panel p-8 rounded-3xl border border-white/10">
                <ShieldAlert className="w-8 h-8 text-fuchsia-500 mb-6" />
                <h4 className="font-orbitron text-xl font-bold mb-4">Quantum Shielding</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Our vaults utilize post-quantum cryptography, making your acquisitions immune to brute-force decryption by future hardware.
                </p>
              </div>
              <div className="glass-panel p-8 rounded-3xl border border-white/10">
                <Radio className="w-8 h-8 text-cyan-400 mb-6" />
                <h4 className="font-orbitron text-xl font-bold mb-4">Holo-Transmission</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Data is streamed via ionized laser links, allowing for real-time 3D previewing of artifacts without bulky downloads.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-40 space-y-8">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Database className="w-24 h-24" />
              </div>
              <h4 className="font-orbitron text-sm font-black tracking-widest text-slate-500 mb-6 uppercase">System Logs</h4>
              <div className="space-y-4 font-mono text-[10px]">
                <div className="flex gap-2 text-cyan-400">
                  <span className="opacity-50">[12:04:22]</span>
                  <span>Uplink Established...</span>
                </div>
                <div className="flex gap-2 text-emerald-400">
                  <span className="opacity-50">[12:04:23]</span>
                  <span>Consensus Verified [Node-74]</span>
                </div>
                <div className="flex gap-2 text-slate-400">
                  <span className="opacity-50">[12:04:25]</span>
                  <span>Syncing artifact metadata...</span>
                </div>
                <div className="flex gap-2 text-fuchsia-400">
                  <span className="opacity-50">[12:05:01]</span>
                  <span>Alert: Unauthorized scan attempt blocked</span>
                </div>
                <div className="flex gap-2 text-slate-400">
                  <span className="opacity-50">[12:05:10]</span>
                  <span>Idle...</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                <button className="w-full py-3 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs uppercase hover:bg-white transition-colors">
                  REBOOT TERMINAL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tech;
