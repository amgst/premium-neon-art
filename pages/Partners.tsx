
import React from 'react';
import { Shield, Star, Rocket, CheckCircle2 } from 'lucide-react';

const Partners: React.FC = () => {
  const tiers = [
    { 
      name: 'Standard Ascent', 
      price: '2.5k', 
      rarity: 'standard', 
      color: 'cyan',
      features: ['Basic AI Integration', 'Standard Security Node', 'Monthly Strategy Sync']
    },
    { 
      name: 'Premium Horizon', 
      price: '10k', 
      rarity: 'premium', 
      color: 'purple',
      features: ['Advanced Neural Ops', 'Quantum Shielding (Tier 1)', '24/7 Dedicated Uplink', 'Custom Smart Contracts']
    },
    { 
      name: 'Enterprise Apex', 
      price: '50k+', 
      rarity: 'enterprise', 
      color: 'orange',
      features: ['Full Infrastructure Control', 'Post-Quantum Encryption', 'Direct Neural Bridge', 'Infinite Global Scalability']
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'enterprise': return 'text-orange-400 border-orange-400/30 bg-orange-400/10 shadow-[0_0_20px_rgba(251,146,60,0.3)]';
      case 'premium': return 'text-purple-400 border-purple-400/30 bg-purple-400/10 shadow-[0_0_15px_rgba(192,132,252,0.2)]';
      default: return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_10px_rgba(52,211,153,0.1)]';
    }
  };

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <span className="text-fuchsia-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">ACCESS TIERS // NEXUS PROGRAM</span>
        <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-8">PARTNER <span className="text-white text-glow-fuchsia">NETWORK</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
          Join the elite circle of organizations defining the next century of industry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {tiers.map((tier) => (
          <div key={tier.name} className="group relative glass-panel rounded-[3rem] p-10 border border-white/5 hover:border-emerald-400/30 transition-all duration-500 hover:-translate-y-4">
            <div className="flex justify-between items-start mb-10">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${getRarityColor(tier.rarity)}`}>
                {tier.rarity}
              </span>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-bold block mb-1 uppercase tracking-widest">Starts at</span>
                <span className="font-orbitron text-3xl font-black text-white">{tier.price} <span className="text-sm opacity-50">CR</span></span>
              </div>
            </div>

            <h3 className="font-orbitron text-3xl font-black text-white mb-8 group-hover:text-emerald-400 transition-colors">{tier.name}</h3>
            
            <ul className="space-y-6 mb-12">
              {tier.features.map(f => (
                <li key={f} className="flex items-center gap-4 text-slate-400 font-medium">
                  <CheckCircle2 className={`w-5 h-5 ${tier.rarity === 'enterprise' ? 'text-orange-400' : 'text-emerald-400'}`} />
                  {f}
                </li>
              ))}
            </ul>

            <button className="w-full py-6 rounded-2xl bg-white text-slate-950 font-black text-sm uppercase tracking-widest hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(52,211,153,0.4)] transition-all active:scale-95">
              Secure Uplink
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
