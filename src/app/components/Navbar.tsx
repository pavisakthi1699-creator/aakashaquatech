import React, { useState } from 'react';
import { Droplets, Phone, Menu, X, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Droplets className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                AAKASH <span className="text-sky-600">AQUA TECH</span>
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 inline" /> Pure Water Engineering
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <a href="#solutions" className="hover:text-sky-600 transition-colors">Catalog & Products</a>
            <a href="#services" className="hover:text-sky-600 transition-colors">Turnkey Services</a>
            <a href="#why-us" className="hover:text-sky-600 transition-colors">Why Choose Us</a>
            <a href="#contact" className="hover:text-sky-600 transition-colors">Contact Us</a>
          </nav>

          {/* Quick CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200"
              title="Open Admin Dashboard"
            >
              <Lock className="w-3.5 h-3.5 text-slate-600" />
              <span>Admin Panel</span>
            </button>

            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-slate-700 hover:text-sky-600 text-sm font-semibold transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                <Phone className="w-4 h-4" />
              </div>
              <span>+91 98765 43210</span>
            </a>

            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold shadow-md shadow-sky-600/25 flex items-center gap-2 transition-all hover:gap-3"
            >
              Get Free Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 border border-slate-200"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 font-medium text-slate-700">
            <a 
              href="#solutions" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sky-50 hover:text-sky-600"
            >
              Catalog & Products
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sky-50 hover:text-sky-600"
            >
              Turnkey Services
            </a>
            <a 
              href="#why-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sky-50 hover:text-sky-600"
            >
              Why Choose Us
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sky-50 hover:text-sky-600"
            >
              Contact Us
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 rounded-lg bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" /> Admin Portal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 rounded-lg bg-sky-600 text-white font-semibold text-center shadow-md text-sm"
            >
              Request Free Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};