
import React, { useState, useMemo } from 'react';
import { ShoppingBag, Heart, Sparkles, CheckCircle2, Upload, Maximize, Palette, MessageSquare, Send, Zap, FilterX, Flame } from 'lucide-react';
import { NeonSign, SystemConfig } from '../types';

interface ShopProps {
  signs: NeonSign[];
  config: SystemConfig;
  onAddToCart: (product: NeonSign) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onViewProduct: (product: NeonSign) => void;
}

const Shop: React.FC<ShopProps> = ({ signs, config, onAddToCart, wishlist, onToggleWishlist, onViewProduct }) => {
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const displayedSigns = useMemo(() => {
    const regular = signs.filter(s => !s.isNew);
    if (showSavedOnly) {
      return regular.filter(s => wishlist.includes(s.id));
    }
    return regular;
  }, [showSavedOnly, wishlist, signs]);

  const newArrivals = useMemo(() => {
    const arr = signs.filter(s => s.isNew);
    if (showSavedOnly) {
      return arr.filter(s => wishlist.includes(s.id));
    }
    return arr;
  }, [showSavedOnly, wishlist, signs]);

  // Fix: Added key to the props type definition to avoid TS errors when mapping components
  const ProductCard = ({ sign, variant = 'default' }: { sign: NeonSign; variant?: 'default' | 'featured'; key?: string | number }) => {
    const isWishlisted = wishlist.includes(sign.id);

    return (
      <div 
        className={`group relative glass-panel rounded-[2.5rem] p-6 border transition-all duration-500 hover:-translate-y-4 cursor-pointer ${
          variant === 'featured' 
            ? 'border-fuchsia-500/20 shadow-[0_0_30px_rgba(217,70,239,0.05)] bg-slate-900/40' 
            : 'border-white/5 hover:border-cyan-400/30'
        }`}
        onClick={() => onViewProduct(sign)}
      >
        <div className="aspect-square bg-slate-900/50 rounded-3xl mb-6 relative overflow-hidden">
          <img src={sign.image} alt={sign.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
          
          {sign.isNew && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-fuchsia-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-[0_0_20px_#d946ef] flex items-center gap-1.5 uppercase tracking-widest animate-pulse border border-fuchsia-400/50">
                <Flame className="w-3 h-3 fill-current" /> NEW RELEASE
              </span>
            </div>
          )}

          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(sign.id);
              }}
              className={`p-3 glass-panel border rounded-full transition-all hover:scale-110 active:scale-95 ${
                isWishlisted 
                  ? 'border-fuchsia-400/50 bg-fuchsia-400 text-white shadow-[0_0_20px_rgba(217,70,239,0.5)]' 
                  : 'border-white/10 opacity-0 group-hover:opacity-100 hover:bg-fuchsia-400 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-start mb-6 px-2">
          <div>
            <h3 className="font-orbitron text-2xl font-bold text-white group-hover:text-fuchsia-400 transition-colors">{sign.name}</h3>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{sign.category}</span>
          </div>
          <div className="text-right">
            <span className={`font-orbitron text-xl font-black ${config.saleMode ? 'text-emerald-400 text-glow-cyan' : 'text-white'}`}>
              ${sign.price}
            </span>
          </div>
        </div>

        <div className="px-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(sign);
            }}
            className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${
              variant === 'featured'
                ? 'bg-fuchsia-500 text-white hover:bg-white hover:text-slate-950 hover:shadow-[0_0_30px_rgba(217,70,239,0.6)]'
                : 'bg-white text-slate-950 hover:bg-cyan-400 hover:text-white hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> ADD TO CART
          </button>
        </div>
      </div>
    );
  };



  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <span className="text-fuchsia-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block text-glow-fuchsia">Collection 2024</span>
          <h1 className="font-orbitron text-6xl md:text-8xl font-black">THE <span className="text-white">SHOP</span></h1>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              showSavedOnly 
                ? 'bg-fuchsia-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.4)]' 
                : 'glass-panel border border-white/10 text-slate-400 hover:text-white hover:border-fuchsia-400/50'
            }`}
          >
            <Heart className={`w-4 h-4 ${showSavedOnly ? 'fill-current' : ''}`} /> 
            {showSavedOnly ? 'Showing Favorites' : 'View Favorites'}
          </button>
        </div>
      </div>

      {showSavedOnly && (displayedSigns.length + newArrivals.length) === 0 ? (
        <div className="mb-32 glass-panel rounded-[3rem] p-20 text-center border border-dashed border-white/10 animate-in fade-in slide-in-from-bottom-4">
          <FilterX className="w-16 h-16 text-slate-700 mx-auto mb-6" />
          <h2 className="font-orbitron text-3xl font-black text-white mb-4 uppercase tracking-tighter">No Saved Artifacts</h2>
          <button onClick={() => setShowSavedOnly(false)} className="px-10 py-4 bg-white text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-fuchsia-400 transition-all active:scale-95">
            Explore Collection
          </button>
        </div>
      ) : (
        <>
          {newArrivals.length > 0 && (
            <section className="mb-32 relative">
              <div className="absolute -inset-10 bg-fuchsia-600/5 blur-[120px] rounded-[5rem] pointer-events-none"></div>
              <div className="relative z-10 p-8 md:p-12 glass-panel rounded-[4rem] border border-fuchsia-500/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-fuchsia-500/10 rounded-3xl border border-fuchsia-500/30 text-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.2)]">
                      <Sparkles className="w-10 h-10" />
                    </div>
                    <div>
                      <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white tracking-tighter">NEW <span className="text-fuchsia-400">ARRIVALS</span></h2>
                      <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mt-1">Direct from the lab</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {newArrivals.map((sign) => (
                    <ProductCard key={sign.id} sign={sign} variant="featured" />
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="mb-32">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-orbitron text-2xl md:text-3xl font-black text-white tracking-tighter">
                {showSavedOnly ? 'YOUR SAVED ARTIFACTS' : 'FULL CATALOGUE'}
              </h2>
              <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
            </div>
            {displayedSigns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {displayedSigns.map((sign) => (
                  <ProductCard key={sign.id} sign={sign} />
                ))}
              </div>
            ) : !newArrivals.length && (
              <div className="p-20 text-center glass-panel rounded-3xl border border-white/5">
                <p className="text-slate-500 font-bold uppercase tracking-widest">No matching artifacts found.</p>
              </div>
            )}
          </section>
        </>
      )}

    </div>
  );
};

export default Shop;
