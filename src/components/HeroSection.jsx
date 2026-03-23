import React from 'react';
import { Link } from 'react-router-dom';
import ThreeScene from './ThreeScene';

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-carbon flex flex-col items-center justify-center">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0 opacity-40">
         <ThreeScene />
      </div>
      
      <div className="z-10 text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-4">
          Bonner <span className="text-smokyTeal font-semibold">Pilot</span>
        </h1>
        <p className="text-smokyTeal/80 max-w-xl mx-auto text-lg font-light tracking-wider uppercase">
          Industrial Transparency Engine
        </p>
      </div>

      <div className="z-10 flex flex-col md:flex-row gap-6 w-full max-w-5xl px-6">
        <Link to="/portal" className="flex-1 glass-morphism p-8 rounded-2xl hover:bg-smokyTeal/20 transition-all cursor-pointer group border border-smokyTeal/30 hover:border-cyanGlow/50">
          <h2 className="text-2xl font-medium text-white group-hover:text-cyanGlow transition-colors">Local Solutions</h2>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed">Community-first data access and resident liaison portal.</p>
        </Link>
        <Link to="/executive" className="flex-1 glass-morphism p-8 rounded-2xl hover:bg-smokyTeal/20 transition-all cursor-pointer group border border-smokyTeal/30 hover:border-cyanGlow/50">
          <h2 className="text-2xl font-medium text-white group-hover:text-cyanGlow transition-colors">Municipal Solutions</h2>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed">Executive command dashboard for regulatory tracking.</p>
        </Link>
        <div className="flex-1 glass-morphism p-8 rounded-2xl hover:bg-smokyTeal/20 transition-all cursor-pointer group border border-smokyTeal/30 hover:border-cyanGlow/50">
          <h2 className="text-2xl font-medium text-white group-hover:text-cyanGlow transition-colors">Industrial Infrastructure</h2>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed">Core site metrics and live environmental monitoring.</p>
        </div>
      </div>
    </div>
  );
}
