
import React from 'react';
import { Feature } from '../types';

interface GlowCardProps {
  feature: Feature;
}

const GlowCard: React.FC<GlowCardProps> = ({ feature }) => {
  return (
    <div className="group relative animated-glow-border rounded-[2rem]">
      <div className="relative glass-panel rounded-[2rem] p-10 h-full flex flex-col items-start transition-all duration-500 group-hover:-translate-y-3 content-z">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-20 mb-8 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] group-hover:scale-110 transition-transform duration-500`}>
          {feature.icon}
        </div>
        <h3 className="font-orbitron text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
          {feature.title}
        </h3>
        <p className="text-slate-400 leading-relaxed text-base">
          {feature.description}
        </p>
        
        <div className="mt-auto pt-8 flex items-center text-sm font-black tracking-[0.2em] text-slate-500 group-hover:text-cyan-400 transition-all duration-300 uppercase">
          Initialize <span className="ml-3 group-hover:translate-x-2 transition-transform">⚡</span>
        </div>
      </div>
      
      {/* Background radial glow */}
      <div className={`absolute -inset-10 bg-gradient-to-r ${feature.color} rounded-full blur-[100px] opacity-0 group-hover:opacity-10 transition duration-700 pointer-events-none`}></div>
    </div>
  );
};

export default GlowCard;
