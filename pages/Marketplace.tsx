
import React from 'react';
import { ShoppingCart, Filter, Tag, Zap } from 'lucide-react';

const Marketplace: React.FC = () => {
  const products = [
    { id: 1, name: 'Holo-Visor V1', price: '450', rarity: 'common', color: 'cyan' },
    { id: 2, name: 'Ghost Protocol Key', price: '1,200', rarity: 'rare', color: 'purple' },
    { id: 3, name: 'Obsidian Pulse Jacket', price: '2,800', rarity: 'legendary', color: 'orange' },
    { id: 4, name: 'Quantum Capacitor', price: '950', rarity: 'rare', color: 'purple' },
    { id: 5, name: 'Neo-Tokyo Soundtrack', price: '150', rarity: 'common', color: 'cyan' },
    { id: 6, name: 'Apex Predator Drone', price: '5,000', rarity: 'legendary', color: 'orange' },
  ];

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'legendary': return 'text-orange-400 border-orange-400/30 bg-orange-400/10 shadow-[0_0_10px_rgba(251,146,60,0.3)]';
      case 'rare': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      default: return 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10';
    }
  };

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <span className="text-fuchsia-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">P2P EXCHANGE HUB</span>
          <h1 className="font-orbitron text-5xl md:text-7xl font-black">NEON <span className="text-white text-glow-fuchsia">EXCHANGE</span></h1>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 glass-panel border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/5 transition-all">
            <Filter className="w-4 h-4" /> FILTERS
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-950 rounded-2xl text-sm font-black hover:bg-cyan-400 transition-colors">
            <ShoppingCart className="w-4 h-4" /> CART (0)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <div key={p.id} className="group relative glass-panel rounded-[2rem] p-6 border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-square bg-slate-900/50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
              <Zap className={`w-12 h-12 opacity-20 group-hover:scale-125 transition-transform duration-700 ${p.rarity === 'legendary' ? 'text-orange-400' : 'text-cyan-400'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
            </div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-orbitron text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{p.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase mt-2 border ${getRarityColor(p.rarity)}`}>
                  {p.rarity}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-bold block mb-1">PRICE</span>
                <span className="font-orbitron text-lg font-black text-white">{p.price} CR</span>
              </div>
            </div>

            <button className="w-full py-4 rounded-xl bg-slate-800 text-white font-bold text-sm border border-white/10 hover:bg-white hover:text-slate-950 transition-all active:scale-95 flex items-center justify-center gap-2">
              <Tag className="w-4 h-4" /> ACQUIRE ASSET
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
