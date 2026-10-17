import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';
import { InfoModalType } from './InfoModal';
import { assetUrl } from '../utils/asset';

interface FooterProps {
  onOpenInfo: (type: InfoModalType) => void;
  onOpenQuote: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInfo, onOpenQuote, onOpenContact }) => {
  return (
    <footer id="website-footer" className="bg-[#10232b] text-slate-300 pt-16 pb-12 border-t border-slate-800 snap-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Company Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://aakashaquatech.in/wp-content/uploads/2026/07/IMG_5770-1003x1024.png"
                alt="Aakash Pure Aqua Tech"
                className="h-14 w-auto object-contain bg-white rounded-xl p-1"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const fallback = assetUrl('/images/aakash-logo.png');
                  if (target.src !== fallback) {
                    target.src = fallback;
                  }
                }}
              />
              <div>
                <span className="text-base font-extrabold text-white block leading-tight">
                  AAKASH PURE AQUA TECH
                </span>
                <span className="text-[11px] font-semibold text-cyan-400">
                  Private Limited
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed text-justify">
              Aakash AquaTech delivers reliable water purification solutions designed to provide clean, safe, and healthy water for every home and business. We offer quality water purifiers and advanced filtration solutions tailored to meet your everyday needs.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">Follow Our Updates:</span>
              <div className="flex items-center gap-2">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/1JT9dGSZ6f/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#2d737d] text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/></svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/aakashpureaquatech?igsh=MXAwcGdrd2h0a2lkag%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#2d737d] text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://youtube.com/@aakashpureaquatechpvtltd?si=6n-5qzai-FVsN52j"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#2d737d] text-white flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Contact Information (4 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Contact us
            </h4>

            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <a href="tel:9655577666" className="text-white hover:text-cyan-300 font-bold block">
                    96555 77666
                  </a>
                  <span className="text-[11px] text-slate-400">24/7 Service & Inquiries</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <a href="mailto:ceo@aakashaquatech.in" className="text-white hover:text-cyan-300 font-bold">
                  ceo@aakashaquatech.in
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed text-xs">
                  <strong>Head Office:</strong> 10/62C, BrindavanRoad, 1st Cross (Behind Dr.Sudamani Hospital), Fairlands, Salem - 636016, Tamil Nadu
                </span>
              </li>

              <li className="pl-7 text-xs text-slate-400">
                <strong>Branches:</strong> Coimbatore • Dharmapuri
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Quick Links
            </h4>

            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <button onClick={() => onOpenInfo('about')} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>About us</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInfo('zones')} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Zone we serve</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInfo('service')} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Services & AMC</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInfo('testimonials')} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Client Testimonials</span>
                </button>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>FAQs & Blog</span>
                </a>
              </li>
              <li>
                {onOpenContact ? (
                  <button 
                    onClick={onOpenContact} 
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    <span>Contact us</span>
                  </button>
                ) : (
                  <a href="#contact" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    <span>Contact us</span>
                  </a>
                )}
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Links Bar */}
        <div className="py-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400 text-center border-b border-slate-800/80">
          <button onClick={() => onOpenInfo('privacy')} className="hover:text-white transition-colors">
            Privacy Policy
          </button>
          <span>|</span>
          <button onClick={() => onOpenInfo('terms')} className="hover:text-white transition-colors">
            Terms and Conditions
          </button>
          <span>|</span>
          <button onClick={() => onOpenInfo('shipping')} className="hover:text-white transition-colors">
            Shipping and Cancellation
          </button>
          <span>|</span>
          <button onClick={() => onOpenInfo('disclaimer')} className="hover:text-white transition-colors">
            Disclaimer
          </button>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong>AAKASH PURE AQUA TECH PRIVATE LIMITED</strong>. All Rights Reserved.
          </div>
          <div>
            Salem Head Office • Coimbatore • Dharmapuri
          </div>
        </div>

      </div>
    </footer>
  );
};
