import React from 'react';
import { Droplets, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white">
                <Droplets className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                AAKASH <span className="text-sky-500">AQUA TECH</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Leading manufacturers and turnkey contractors of Industrial Reverse Osmosis (RO) Plants, Commercial Water Purifiers, Demineralization (DM) Units, Water Softeners, and Sewage/Effluent Treatment Plants.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>ISO 9001:2015 Registered Manufacturing Standard</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Water Plants</div>
            <ul className="space-y-2 text-xs">
              <li><a href="#solutions" className="hover:text-white transition-colors">Industrial RO Plants</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Commercial RO Systems</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Water Softeners</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">DM Demineralizer Units</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">STP & ETP Plants</a></li>
            </ul>
          </div>

          {/* Turnkey Services */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Services</div>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Raw Water Testing</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Custom Plant Fabrication</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Annual Maintenance (AMC)</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Membrane CIP Chemical Wash</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Spare Membranes & Valves</a></li>
            </ul>
          </div>

          {/* Working Hours & Contact */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Direct Connect</div>
            <p className="text-xs leading-relaxed">
              <strong className="text-white">Hotline:</strong> +91 98765 43210<br />
              <strong className="text-white">Email:</strong> info@aakashaquatech.com<br />
              <strong className="text-white">Service Area:</strong> PAN-India Execution
            </p>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            &copy; {new Date().getFullYear()} Aakash Aqua Tech. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
            <span>by Highbizz</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
