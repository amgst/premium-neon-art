
import React from 'react';
import { ShieldCheck, Zap, BarChart3, Globe2 } from 'lucide-react';
import GlowCard from './GlowCard';
import { Feature } from '../types';

const FeatureSection: React.FC = () => {
  const features: Feature[] = [
    {
      title: "Strategic AI",
      description: "Custom-trained neural models that optimize your business operations with surgical precision.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-emerald-400 to-cyan-500"
    },
    {
      title: "Instant Velocity",
      description: "Scale from local to planetary in milliseconds with our high-frequency data transmission mesh.",
      icon: <Zap className="w-8 h-8" />,
      color: "from-fuchsia-400 to-purple-600"
    },
    {
      title: "Ironclad Assets",
      description: "Protect your corporate IP with tiered quantum encryption and distributed ledger consensus.",
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "from-slate-200 to-slate-400"
    },
    {
      title: "Global Reach",
      description: "Establish dominance in the meta-economy with our universal integration protocols.",
      icon: <Globe2 className="w-8 h-8" />,
      color: "from-cyan-400 to-blue-600"
    }
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative">
      <div className="text-center mb-20">
        <h2 className="font-orbitron text-4xl md:text-6xl font-black mb-6">BUILT FOR POWER</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-xl font-light">The foundational architecture for the leaders of tomorrow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <GlowCard key={idx} feature={feature} />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
