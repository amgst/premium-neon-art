
import React from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';
import { CartItem, PageType } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onNavigate: (page: PageType) => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onNavigate }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 25 : 0;
  const total = subtotal + shipping;

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12">
        <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Order Manifest</span>
        <h1 className="font-orbitron text-6xl md:text-8xl font-black leading-none">YOUR <span className="text-white text-glow-cyan">CART</span></h1>
      </div>

      {items.length === 0 ? (
        <div className="glass-panel rounded-[3rem] p-20 text-center flex flex-col items-center gap-8 border border-white/5">
          <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-slate-600">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <div>
            <h2 className="font-orbitron text-3xl font-black text-white mb-4">NO GLOW DETECTED</h2>
            <p className="text-slate-500 max-w-md mx-auto">Your cart is currently empty. Explore our collections to find the perfect neon piece for your space.</p>
          </div>
          <button 
            onClick={() => onNavigate('shop')}
            className="px-12 py-5 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-cyan-400 transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
          >
            START SHOPPING
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="glass-panel rounded-[2.5rem] p-6 border border-white/5 flex flex-col sm:flex-row items-center gap-8 group hover:border-cyan-400/20 transition-all">
                <div className="w-full sm:w-40 aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-orbitron text-2xl font-black text-white mb-1">{item.name}</h3>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">{item.category} // Artifact</span>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-6">
                    <div className="flex items-center glass-panel border border-white/10 rounded-xl px-2 py-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-2 hover:text-cyan-400 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-orbitron font-black text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-2 hover:text-cyan-400 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Price</span>
                  <span className="font-orbitron text-2xl font-black text-white">${item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-40">
            <div className="glass-panel rounded-[3rem] p-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <h3 className="font-orbitron text-xl font-black mb-8 border-b border-white/5 pb-4 uppercase tracking-widest">ORDER SUMMARY</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold uppercase tracking-widest">Subtotal</span>
                  <span className="text-white font-orbitron font-black">${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold uppercase tracking-widest">Global Shipping</span>
                  <span className="text-white font-orbitron font-black">${shipping}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold uppercase tracking-widest">Tax</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-widest">Included</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-10 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block mb-1 animate-pulse">Total Investment</span>
                  <span className="font-orbitron text-4xl font-black text-white text-glow-cyan">${total}</span>
                </div>
                <Sparkles className="text-cyan-400 w-6 h-6 mb-1" />
              </div>

              <button 
                onClick={() => onNavigate('checkout')}
                className="w-full py-6 rounded-2xl bg-white text-slate-950 font-black text-sm uppercase tracking-widest hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all flex items-center justify-center gap-3 active:scale-95 group"
              >
                PROCEED TO CHECKOUT <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-8 flex flex-col gap-3">
                 <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                   <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Secure end-to-end encryption
                 </div>
                 <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                   <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Insured shipping via Luminal logistics
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
