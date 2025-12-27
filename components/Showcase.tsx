
import React from 'react';
import { ShowcaseItem, PageType } from '../types';

interface ShowcaseProps {
  limit?: number;
  onNavigate: (page: PageType) => void;
}

const Showcase: React.FC<ShowcaseProps> = ({ limit, onNavigate }) => {
  const allItems: ShowcaseItem[] = [
    { id: '1', title: 'Radiant Wings', category: 'Statement Pieces', image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=800' },
    { id: '2', title: 'Tokyo Dreams', category: 'Cultural Icons', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800' },
    { id: '3', title: 'Cursive Glow', category: 'Custom Script', image: 'https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?auto=format&fit=crop&q=80&w=800' },
    { id: '4', title: 'Abstract Void', category: 'Modern Art', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800' },
  ];

  const items = limit ? allItems.slice(0, limit) : allItems;

  return (
    <section className="relative py-24 px-6 bg-slate-900/20 overflow-hidden">
      {/* Decorative Background (Static) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 -right-24 w-128 h-128 bg-fuchsia-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-fuchsia-400 font-bold tracking-widest uppercase text-xs">Gallery Spotlight</span>
            <h2 className="font-orbitron text-3xl md:text-5xl font-black mt-2">RECENT INSTALLATIONS</h2>
          </div>
          <button 
            onClick={() => onNavigate('shop')}
            className="text-sm font-bold border-b-2 border-fuchsia-500 pb-1 hover:text-fuchsia-400 transition-colors"
          >
            VIEW COLLECTION
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onNavigate('shop')}
              className="group relative overflow-hidden rounded-3xl aspect-[16/9] cursor-pointer"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-fuchsia-400 text-xs font-bold uppercase tracking-widest mb-2 block">{item.category}</span>
                <h3 className="font-orbitron text-2xl md:text-3xl font-black text-white">{item.title}</h3>
                <div className="mt-4 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                  <span className="px-4 py-2 bg-white text-slate-950 rounded-full font-bold text-xs uppercase">View Product</span>
                </div>
              </div>

              <div className="absolute top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
