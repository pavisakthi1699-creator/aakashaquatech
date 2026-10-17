import React, { useState } from 'react';
import { 
  Phone, Menu, X, Search, ShoppingCart, User, ChevronDown, 
  Droplet, Shield, Award, Sparkles, MapPin 
} from 'lucide-react';
import { assetUrl } from '../utils/asset';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  onOpenQuote: (serviceName?: string) => void;
  onSelectCategory: (category: string) => void;
  onOpenInfo: (type: 'zones' | 'testimonials' | 'service' | 'about') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenSearch,
  onOpenAdmin,
  onOpenQuote,
  onSelectCategory,
  onOpenInfo
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleCategoryClick = (cat: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onSelectCategory(cat);
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#1b3d4b] text-white text-xs py-2 px-4 border-b border-[#2d737d]/30 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Free Water Quality & TDS Testing | 24 Hours Fast Service Across Tamil Nadu</span>
          </div>
          <div className="flex items-center gap-4 text-slate-200">
            <a href="tel:9655577666" className="flex items-center gap-1 hover:text-white font-semibold">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>96555 77666</span>
            </a>
            <span className="hidden md:inline text-slate-400">|</span>
            <div className="hidden md:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Salem • Coimbatore • Dharmapuri</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group shrink-0">
              <img 
                src="https://aakashaquatech.in/wp-content/uploads/2026/07/IMG_5770-1003x1024.png" 
                alt="Aakash Pure Aqua Tech" 
                className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const fallback = assetUrl('/images/aakash-logo.png');
                  if (target.src !== fallback) {
                    target.src = fallback;
                  }
                }}
              />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#173238] leading-tight">
                  AAKASH <span className="text-[#2d737d]">AQUA TECH</span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pure Aqua Tech Private Limited
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 font-semibold text-sm text-[#173238]">
              
              {/* Domestic RO Mega Menu */}
              <div 
                className="relative group py-6"
                onMouseEnter={() => setActiveDropdown('domestic')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className="flex items-center gap-1 hover:text-[#2d737d] transition-colors focus:outline-none"
                  onClick={() => handleCategoryClick('Domestic RO')}
                >
                  <span>Domestic Ro</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'domestic' ? 'rotate-180 text-[#2d737d]' : ''}`} />
                </button>

                {activeDropdown === 'domestic' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] bg-gradient-to-b from-[#fdfbf7] to-[#eadfcc] rounded-3xl shadow-2xl border-2 border-[#c9a273] p-6 grid grid-cols-5 gap-3.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <button 
                      onClick={() => handleCategoryClick('Domestic RO')}
                      className="group/item flex flex-col items-center text-center p-3 rounded-2xl bg-[#fcf8f1] hover:bg-white border-2 border-[#c9a273] hover:border-[#a77f4f] shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="w-20 h-20 rounded-xl bg-transparent p-2 mb-2 flex items-center justify-center overflow-hidden">
                        <img src="https://aakashaquatech.in/wp-content/uploads/2026/03/Untitled-design-1-1.png" alt="RO Water Purifiers" className="max-h-full object-contain group-hover/item:scale-110 transition-transform [mix-blend-mode:multiply]" />
                      </div>
                      <span className="text-xs font-black text-[#0b3f66] group-hover/item:text-[#2d737d]">RO Water Purifiers</span>
                    </button>

                    <button 
                      onClick={() => handleCategoryClick('Domestic RO')}
                      className="group/item flex flex-col items-center text-center p-3 rounded-2xl bg-[#fcf8f1] hover:bg-white border-2 border-[#c9a273] hover:border-[#a77f4f] shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="w-20 h-20 rounded-xl bg-transparent p-2 mb-2 flex items-center justify-center overflow-hidden">
                        <img src="https://aakashaquatech.in/wp-content/uploads/2026/04/ProPlanet-3-_X-Angle01.webp" alt="UV Water Purifiers" className="max-h-full object-contain group-hover/item:scale-110 transition-transform [mix-blend-mode:multiply]" />
                      </div>
                      <span className="text-xs font-black text-[#0b3f66] group-hover/item:text-[#2d737d]">UV Water Purifiers</span>
                    </button>

                    <button 
                      onClick={() => handleCategoryClick('Alkaline')}
                      className="group/item flex flex-col items-center text-center p-3 rounded-2xl bg-[#fcf8f1] hover:bg-white border-2 border-[#c9a273] hover:border-[#a77f4f] shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="w-20 h-20 rounded-xl bg-transparent p-2 mb-2 flex items-center justify-center overflow-hidden">
                        <img src="https://aakashaquatech.in/wp-content/uploads/2026/03/ZeroB-Hydrolife.png" alt="Alkaline" className="max-h-full object-contain group-hover/item:scale-110 transition-transform [mix-blend-mode:multiply]" />
                      </div>
                      <span className="text-xs font-black text-[#0b3f66] group-hover/item:text-[#2d737d]">Alkaline</span>
                    </button>

                    <button 
                      onClick={() => handleCategoryClick('Gravity')}
                      className="group/item flex flex-col items-center text-center p-3 rounded-2xl bg-[#fcf8f1] hover:bg-white border-2 border-[#c9a273] hover:border-[#a77f4f] shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="w-20 h-20 rounded-xl bg-transparent p-2 mb-2 flex items-center justify-center overflow-hidden">
                        <img src="https://aakashaquatech.in/wp-content/uploads/2026/03/Untitled-design-38-e1776358874556.png" alt="Gravity Water Purifiers" className="max-h-full object-contain group-hover/item:scale-110 transition-transform [mix-blend-mode:multiply]" />
                      </div>
                      <span className="text-xs font-black text-[#0b3f66] group-hover/item:text-[#2d737d]">Gravity Purifiers</span>
                    </button>

                    <button 
                      onClick={() => handleCategoryClick('Under Sink')}
                      className="group/item flex flex-col items-center text-center p-3 rounded-2xl bg-[#fcf8f1] hover:bg-white border-2 border-[#c9a273] hover:border-[#a77f4f] shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="w-20 h-20 rounded-xl bg-transparent p-2 mb-2 flex items-center justify-center overflow-hidden">
                        <img src="https://aakashaquatech.in/wp-content/uploads/2026/03/cyclone-under-sink-water-purifiers-e1781104064938.jpg" alt="Under Sink" className="max-h-full object-contain group-hover/item:scale-110 transition-transform [mix-blend-mode:multiply]" />
                      </div>
                      <span className="text-xs font-black text-[#0b3f66] group-hover/item:text-[#2d737d]">Under Sink</span>
                    </button>
                  </div>
                )}
              </div>

              {/* SS Water Dispenser */}
              <button 
                onClick={() => handleCategoryClick('SS WATER DISPENSER')}
                className="hover:text-[#2d737d] transition-colors"
              >
                SS Water Dispenser
              </button>

              {/* Commercial RO System */}
              <button 
                onClick={() => handleCategoryClick('Industrial RO System')}
                className="hover:text-[#2d737d] transition-colors"
              >
                Commercial Ro System
              </button>

              {/* Spares */}
              <button 
                onClick={() => handleCategoryClick('Spares')}
                className="hover:text-[#2d737d] transition-colors"
              >
                Spares
              </button>

              {/* Water treatment plant Mega Menu */}
              <div 
                className="relative group py-6"
                onMouseEnter={() => setActiveDropdown('treatment')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className="flex items-center gap-1 hover:text-[#2d737d] transition-colors focus:outline-none"
                  onClick={() => handleCategoryClick('Water Treatment')}
                >
                  <span>Water treatment plant</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'treatment' ? 'rotate-180 text-[#2d737d]' : ''}`} />
                </button>

                {activeDropdown === 'treatment' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[840px] bg-gradient-to-b from-[#fdfbf7] to-[#eadfcc] rounded-3xl shadow-2xl border-2 border-[#c9a273] p-6 grid grid-cols-6 gap-3 animate-in fade-in slide-in-from-top-2 duration-150">
                    <button 
                      onClick={() => handleCategoryClick('Softner')}
                      className="group/item flex flex-col items-center text-center p-2.5 rounded-2xl bg-[#fcf8f1] hover:bg-white border-2 border-[#c9a273] hover:border-[#a77f4f] shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="w-16 h-16 rounded-xl bg-transparent p-1 mb-2 flex items-center justify-center overflow-hidden">
                        <img src="https://aakashaquatech.in/wp-content/uploads/2026/05/as3-filter2.png" alt="Softner" className="max-h-full object-contain group-hover/item:scale-110 transition-transform [mix-blend-mode:multiply]" />
                      </div>
                      <span className="text-xs font-black text-[#0b3f66] group-hover/item:text-[#2d737d]">Softner</span>
                    </button>

                    <button 
                      onClick={() => handleCategoryClick('Iron Remover Filter')}
                      className="group/item flex flex-col items-center text-center p-2.5 rounded-2xl bg-[#fcf8f1] hover:bg-white border-2 border-[#c9a273] hover:border-[#a77f4f] shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="w-16 h-16 rounded-xl bg-transparent p-1 mb-2 flex items-center justify-center overflow-hidden">
                        <img src="https://aakashaquatech.in/wp-content/uploads/2026/05/kent-automatic-water-softener-40l-1.png" alt="Iron Remover Filter" className="max-h-full object-contain group-hover/item:scale-110 transition-transform [mix-blend-mode:multiply]" />
                      </div>
                      <span className="text-xs font-black text-[#0b3f66] group-hover/item:text-[#2d737d]">Iron Remover</span>
                    </button>

                    <button 
                      onClick={() => handleCategoryClick('Sand Filter')}
                      className="group/item flex flex-col items-center text-center p-2.5 rounded-2xl bg-[#fcf8f1] hover:bg-white border-2 border-[#c9a273] hover:border-[#a77f4f] shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="w-16 h-16 rounded-xl bg-transparent p-1 mb-2 flex items-center justify-center overflow-hidden">
                        <img src="https://aakashaquatech.in/wp-content/uploads/2026/05/kent-sand-filter-1.png" alt="Sand Filter" className="max-h-full object-contain group-hover/item:scale-110 transition-transform [mix-blend-mode:multiply]" />
                      </div>
                      <span className="text-xs font-black text-[#0b3f66] group-hover/item:text-[#2d737d]">Sand Filter</span>
                    </button>

                    <button 
                      onClick={() => handleCategoryClick('FRP Pressure Vessels')}
                      className="group/item flex flex-col items-center text-center p-2.5 rounded-2xl bg-[#fcf8f1] hover:bg-white border-2 border-[#c9a273] hover:border-[#a77f4f] shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="w-16 h-16 rounded-xl bg-transparent p-1 mb-2 flex items-center justify-center overflow-hidden">
                        <img src="https://aakashaquatech.in/wp-content/uploads/2026/03/Vessel.jpg" alt="Vessel" className="max-h-full object-contain group-hover/item:scale-110 transition-transform [mix-blend-mode:multiply]" />
                      </div>
                      <span className="text-xs font-black text-[#0b3f66] group-hover/item:text-[#2d737d]">Vessels</span>
                    </button>

                    <button 
                      onClick={() => handleCategoryClick('SS Tanks')}
                      className="group/item flex flex-col items-center text-center p-2.5 rounded-2xl bg-[#fcf8f1] hover:bg-white border-2 border-[#c9a273] hover:border-[#a77f4f] shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="w-16 h-16 rounded-xl bg-transparent p-1 mb-2 flex items-center justify-center overflow-hidden">
                        <img src="https://aakashaquatech.in/wp-content/uploads/2026/05/C320A38C-55B2-4DC4-8432-CD042858A031.png" alt="SS Tank" className="max-h-full object-contain group-hover/item:scale-110 transition-transform [mix-blend-mode:multiply]" />
                      </div>
                      <span className="text-xs font-black text-[#0b3f66] group-hover/item:text-[#2d737d]">SS Tank</span>
                    </button>

                    <button 
                      onClick={() => handleCategoryClick('DM Plant')}
                      className="group/item flex flex-col items-center text-center p-2.5 rounded-2xl bg-[#fcf8f1] hover:bg-white border-2 border-[#c9a273] hover:border-[#a77f4f] shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="w-16 h-16 rounded-xl bg-transparent p-1 mb-2 flex items-center justify-center overflow-hidden">
                        <img src="https://aakashaquatech.in/wp-content/uploads/2026/03/dmplant.jpeg" alt="DM Plant" className="max-h-full object-contain group-hover/item:scale-110 transition-transform [mix-blend-mode:multiply]" />
                      </div>
                      <span className="text-xs font-black text-[#0b3f66] group-hover/item:text-[#2d737d]">DM Plant</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Heat pump */}
              <button 
                onClick={() => handleCategoryClick('Heat Pump')}
                className="hover:text-[#2d737d] transition-colors"
              >
                Heat pump
              </button>

              {/* Service */}
              <button 
                onClick={() => onOpenInfo('service')}
                className="hover:text-[#2d737d] transition-colors"
              >
                Service
              </button>

              {/* About us Dropdown */}
              <div 
                className="relative group py-6"
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => onOpenInfo('about')}
                  className="flex items-center gap-1 hover:text-[#2d737d] transition-colors focus:outline-none"
                >
                  <span>About us</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180 text-[#2d737d]' : ''}`} />
                </button>

                {activeDropdown === 'about' && (
                  <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-2 space-y-1 animate-in fade-in duration-150">
                    <button 
                      onClick={() => { setActiveDropdown(null); onOpenInfo('about'); }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#eef6f7] hover:text-[#2d737d] rounded-lg transition-colors"
                    >
                      About Company
                    </button>
                    <button 
                      onClick={() => { setActiveDropdown(null); onOpenInfo('zones'); }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#eef6f7] hover:text-[#2d737d] rounded-lg transition-colors"
                    >
                      Zone we serve
                    </button>
                    <button 
                      onClick={() => { setActiveDropdown(null); onOpenInfo('testimonials'); }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-[#eef6f7] hover:text-[#2d737d] rounded-lg transition-colors"
                    >
                      Testimonials
                    </button>
                  </div>
                )}
              </div>

              {/* Contact Us */}
              <a href="#contact" className="hover:text-[#2d737d] transition-colors">
                Contact Us
              </a>

              {/* Blog */}
              <a href="#faq-section" className="hover:text-[#2d737d] transition-colors">
                Blog
              </a>
            </nav>

            {/* Header Right Action Icons */}
            <div className="flex items-center gap-3">
              {/* Instant Search Trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Search products"
                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-[#eef6f7] hover:text-[#2d737d] transition-colors"
                title="Search Products (Ctrl+K)"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={onOpenCart}
                aria-label="View shopping cart"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-[#eef6f7] border border-slate-200 transition-colors relative"
                title="View Cart"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-[#1b3d4b]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 bg-[#e91e8c] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[10px] text-slate-400 font-bold leading-none">Cart</span>
                  <span className="text-xs font-black text-[#173238] leading-tight">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </button>

              {/* User / Admin Trigger */}
              <button
                onClick={onOpenAdmin}
                aria-label="Admin Portal"
                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-[#eef6f7] hover:text-[#2d737d] transition-colors"
                title="Admin Portal"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="xl:hidden w-10 h-10 rounded-xl bg-[#6f9ea6] text-white flex items-center justify-center shadow-sm"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 max-h-[85vh] overflow-y-auto px-4 py-4 space-y-2 shadow-2xl animate-in fade-in duration-200">
            <button 
              onClick={() => handleCategoryClick('all')}
              className="w-full text-left py-2.5 px-3 rounded-lg font-bold text-slate-800 hover:bg-[#eef6f7] hover:text-[#2d737d] text-sm"
            >
              Home / All Equipment
            </button>

            {/* Mobile Domestic RO section */}
            <div className="border-t border-slate-100 pt-2">
              <div className="px-3 py-1 text-xs font-extrabold uppercase text-[#2d737d] tracking-wider">Domestic RO</div>
              <div className="grid grid-cols-2 gap-1.5 pt-1 pl-2">
                <button onClick={() => handleCategoryClick('Domestic RO')} className="text-left py-1.5 px-2 text-xs font-semibold text-slate-700 hover:text-[#2d737d]">RO Purifiers</button>
                <button onClick={() => handleCategoryClick('Domestic RO')} className="text-left py-1.5 px-2 text-xs font-semibold text-slate-700 hover:text-[#2d737d]">UV Purifiers</button>
                <button onClick={() => handleCategoryClick('Alkaline')} className="text-left py-1.5 px-2 text-xs font-semibold text-slate-700 hover:text-[#2d737d]">Alkaline Pitchers</button>
                <button onClick={() => handleCategoryClick('Gravity')} className="text-left py-1.5 px-2 text-xs font-semibold text-slate-700 hover:text-[#2d737d]">Gravity Purifiers</button>
                <button onClick={() => handleCategoryClick('Under Sink')} className="text-left py-1.5 px-2 text-xs font-semibold text-slate-700 hover:text-[#2d737d]">Under Sink</button>
              </div>
            </div>

            {/* Mobile Commercial & Dispenser */}
            <div className="border-t border-slate-100 pt-2 space-y-1">
              <button onClick={() => handleCategoryClick('SS WATER DISPENSER')} className="w-full text-left py-2 px-3 text-sm font-bold text-slate-800 hover:text-[#2d737d]">SS Water Dispenser</button>
              <button onClick={() => handleCategoryClick('Industrial RO System')} className="w-full text-left py-2 px-3 text-sm font-bold text-slate-800 hover:text-[#2d737d]">Commercial Ro System</button>
              <button onClick={() => handleCategoryClick('Spares')} className="w-full text-left py-2 px-3 text-sm font-bold text-slate-800 hover:text-[#2d737d]">Spares & Filters</button>
            </div>

            {/* Mobile Water Treatment Plant */}
            <div className="border-t border-slate-100 pt-2">
              <div className="px-3 py-1 text-xs font-extrabold uppercase text-[#2d737d] tracking-wider">Water Treatment Plant</div>
              <div className="grid grid-cols-2 gap-1.5 pt-1 pl-2">
                <button onClick={() => handleCategoryClick('Softner')} className="text-left py-1.5 px-2 text-xs font-semibold text-slate-700 hover:text-[#2d737d]">Softner</button>
                <button onClick={() => handleCategoryClick('Iron Remover Filter')} className="text-left py-1.5 px-2 text-xs font-semibold text-slate-700 hover:text-[#2d737d]">Iron Remover</button>
                <button onClick={() => handleCategoryClick('Sand Filter')} className="text-left py-1.5 px-2 text-xs font-semibold text-slate-700 hover:text-[#2d737d]">Sand Filter</button>
                <button onClick={() => handleCategoryClick('FRP Pressure Vessels')} className="text-left py-1.5 px-2 text-xs font-semibold text-slate-700 hover:text-[#2d737d]">Vessels</button>
                <button onClick={() => handleCategoryClick('SS Tanks')} className="text-left py-1.5 px-2 text-xs font-semibold text-slate-700 hover:text-[#2d737d]">SS Tanks</button>
                <button onClick={() => handleCategoryClick('DM Plant')} className="text-left py-1.5 px-2 text-xs font-semibold text-slate-700 hover:text-[#2d737d]">DM Plant</button>
              </div>
            </div>

            {/* Mobile Information links */}
            <div className="border-t border-slate-100 pt-3 space-y-1.5">
              <button onClick={() => { setMobileMenuOpen(false); onOpenInfo('service'); }} className="w-full text-left py-2 px-3 text-sm font-bold text-slate-800 hover:text-[#2d737d]">Service & Maintenance</button>
              <button onClick={() => { setMobileMenuOpen(false); onOpenInfo('about'); }} className="w-full text-left py-2 px-3 text-sm font-bold text-slate-800 hover:text-[#2d737d]">About Us</button>
              <button onClick={() => { setMobileMenuOpen(false); onOpenInfo('zones'); }} className="w-full text-left py-2 px-3 text-sm font-bold text-slate-800 hover:text-[#2d737d]">Zone we serve</button>
              <button onClick={() => { setMobileMenuOpen(false); onOpenInfo('testimonials'); }} className="w-full text-left py-2 px-3 text-sm font-bold text-slate-800 hover:text-[#2d737d]">Testimonials</button>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm font-bold text-slate-800 hover:text-[#2d737d]">Contact Us</a>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 rounded-xl bg-[#2d737d] text-white font-bold text-center shadow-md text-sm"
              >
                Book Free Demo / Consultation
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-center text-xs"
              >
                Admin Management Portal
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};