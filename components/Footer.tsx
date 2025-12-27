
import React from 'react';
import { Sparkles, Twitter, Github, Instagram, Terminal } from 'lucide-react';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  storeName: string;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, storeName }) => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 mb-6 cursor-pointer"
          >
            <Sparkles className="w-6 h-6 text-fuchsia-400" />
            <span className="font-orbitron text-lg font-black tracking-tighter uppercase">{storeName}</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            Premium neon art for the modern era. 
            Illuminating spaces since 2024.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 glass-panel border border-white/10 rounded-full hover:text-fuchsia-400 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 glass-panel border border-white/10 rounded-full hover:text-fuchsia-400 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-orbitron text-sm font-bold mb-6 text-white tracking-widest uppercase">Collections</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><button onClick={() => onNavigate('shop')} className="hover:text-fuchsia-400 transition-colors">Best Sellers</button></li>
            <li><button onClick={() => onNavigate('shop')} className="hover:text-fuchsia-400 transition-colors">Gaming Signs</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-orbitron text-sm font-bold mb-6 text-white tracking-widest uppercase">System</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><button onClick={() => onNavigate('admin')} className="hover:text-emerald-400 transition-colors flex items-center gap-2">
              <Terminal className="w-3 h-3" /> Admin Terminal
            </button></li>
            <li><button onClick={() => onNavigate('craft')} className="hover:text-fuchsia-400 transition-colors">Our Process</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-orbitron text-sm font-bold mb-6 text-white tracking-widest uppercase">Newsletter</h4>
          <p className="text-xs text-slate-500 mb-4">Get 10% off your first neon order.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Enter email..." 
              className="bg-white/5 border border-white/10 px-4 py-2 rounded-l-full text-xs focus:outline-none focus:border-fuchsia-400 w-full"
            />
            <button className="bg-white text-slate-950 px-4 py-2 rounded-r-full font-bold text-xs hover:bg-fuchsia-400 transition-colors">SUBMIT</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
        <p>© 2024 {storeName} CO. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export default Footer;
