
import React from 'react';
import { NavLink, PageType } from '../types';
import { ShoppingCart, Menu, Sparkles, Heart, Terminal } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  cartCount: number;
  wishlistCount: number;
  storeName: string;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, currentPage, onNavigate, cartCount, wishlistCount, storeName }) => {
  const links: NavLink[] = [
    { label: 'Shop All', id: 'shop' },
    { label: 'Custom Neon', id: 'custom' },
    { label: 'The Craft', id: 'craft' },
    { label: 'Admin', id: 'admin' },
  ];

  const logoParts = storeName.split(' ');
  const lastPart = logoParts.pop();
  const mainPart = logoParts.join(' ');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass-panel border-b border-fuchsia-500/20' : 'py-8 bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative">
            <Sparkles className="w-8 h-8 text-fuchsia-400 group-hover:text-cyan-400 transition-colors duration-500 pulse-glow" />
            <div className="absolute inset-0 bg-fuchsia-400/20 blur-xl group-hover:bg-cyan-500/30 transition-all duration-500 rounded-full scale-150 opacity-0 group-hover:opacity-100"></div>
          </div>
          <span className="font-orbitron text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent uppercase">
            {mainPart}<span className="text-fuchsia-400 text-glow-fuchsia">{lastPart}</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-xs font-black tracking-[0.2em] uppercase transition-all relative group ${currentPage === link.id ? 'text-fuchsia-400 text-glow-fuchsia' : 'text-slate-400 hover:text-white'
                }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-fuchsia-400 to-cyan-500 transition-all duration-300 ${currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={() => onNavigate('admin')}
            className={`p-2 transition-colors ${currentPage === 'admin' ? 'text-emerald-400' : 'text-slate-500 hover:text-emerald-400'}`}
            title="Terminal Access"
          >
            <Terminal className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigate('shop')}
            className="relative p-2 text-slate-300 hover:text-fuchsia-400 transition-colors"
          >
            <Heart className={`w-6 h-6 ${wishlistCount > 0 ? 'text-fuchsia-400 fill-fuchsia-400/20' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-fuchsia-500 text-white rounded-full text-[10px] font-black flex items-center justify-center animate-in zoom-in shadow-[0_0_10px_#d946ef]">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('cart')}
            className="relative p-2 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-cyan-400 text-slate-950 rounded-full text-[10px] font-black flex items-center justify-center animate-in zoom-in shadow-[0_0_10px_#22d3ee]">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2 text-slate-300">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
