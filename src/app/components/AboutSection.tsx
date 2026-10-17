import React, { useEffect, useState, useRef } from 'react';
import { assetUrl } from '../utils/asset';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  MapPin, 
  ArrowRight, 
  PhoneCall, 
  Droplets, 
  Clock, 
  Factory, 
  Star,
  Users,
  ChevronDown
} from 'lucide-react';

interface AboutSectionProps {
  onOpenQuote?: (productOrService?: string) => void;
  onExploreProducts?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  onOpenQuote, 
  onExploreProducts 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="snap-screen relative w-full min-h-[100dvh] flex flex-col justify-center items-center pt-[115px] sm:pt-[125px] lg:pt-[118px] pb-6 sm:pb-8 lg:pb-10 bg-gradient-to-b from-[#edf6f9] via-white to-[#edf6f9] border-y border-[#cfe5eb] font-trendy select-none overflow-hidden"
    >
      {/* Background Ambient Lighting & Aqua Grids */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-gradient-to-br from-cyan-100/60 via-teal-50/30 to-transparent blur-3xl opacity-80" />
        <div className="absolute -bottom-20 left-0 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-tr from-cyan-50/70 via-blue-50/30 to-transparent blur-3xl opacity-75" />
        <div className="absolute inset-0 bg-[radial-gradient(#005f73_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.035]" />
      </div>

      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-center h-full">
        
        {/* Simple & Trendy Section Heading (Animates In 1st & 2nd) */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7">
          
          {/* 1. Super Trust Pill */}
          <div 
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#005f73]/10 via-[#0a9396]/15 to-[#005f73]/10 border border-[#005f73]/25 text-[#005f73] text-[10.5px] sm:text-xs font-black tracking-wider uppercase shadow-sm mb-2 transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <Sparkles className="w-3 h-3 text-[#005f73] animate-spin" style={{ animationDuration: '6s' }} />
            <span>ESTABLISHED 2004 • SOUTH INDIA'S PIONEER</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          {/* 2. Main Title */}
          <h2 
            className={`text-2xl sm:text-3xl lg:text-[38px] font-black text-slate-900 tracking-tight leading-[1.15] transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            About{' '}
            <span className="bg-gradient-to-r from-[#002f43] via-[#005f73] to-[#0a9396] bg-clip-text text-transparent">
              Aakash Pure Aqua Tech
            </span>
          </h2>

          {/* 3. Underline Accent */}
          <div 
            className={`w-16 h-1 bg-gradient-to-r from-[#002f43] via-[#005f73] to-[#0a9396] mx-auto mt-2.5 rounded-full transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          />
        </div>

        {/* Two-Column Grid: Full Screen Coverage & Trendy Staggered Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* ======================================================================= */}
          {/* LEFT COLUMN: AUTHENTIC HEADQUARTERS PHOTO + ANIMATIVE METRICS           */}
          {/* ======================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center relative">
            
            {/* Headquarters Photo Container (Animates In 3rd) */}
            <div 
              className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white group transition-all duration-800 ease-out ${
                isInView ? 'opacity-100 translate-x-0 scale-100 shadow-2xl' : 'opacity-0 -translate-x-8 scale-95 shadow-none'
              }`}
              style={{ transitionDelay: '350ms' }}
            >
              <img
                src={assetUrl('/images/about/aakash-headquarters.png')}
                alt="Aakash Pure Aqua Tech Pvt Ltd Salem Flagship Headquarters"
                className="w-full h-[220px] sm:h-[260px] lg:h-[280px] xl:h-[310px] object-cover group-hover:scale-105 transition-transform duration-700 block"
              />

              {/* Clean Location Tag on Base */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-2.5 sm:p-3 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-extrabold truncate">Salem Head Office (Est. 2004)</span>
                </div>
                <span className="text-[10.5px] text-cyan-300 font-bold hidden sm:inline-block">Coimbatore • Dharmapuri</span>
              </div>
            </div>

            {/* 4 Animative Proven Metric Chips Below Photo (Staggered Wave) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full mt-3">
              <div 
                className={`p-2 sm:p-2.5 rounded-xl bg-white/95 border border-slate-200/90 shadow-sm text-center hover:scale-105 transition-all duration-500 ease-out ${
                  isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <div className="text-lg sm:text-xl font-black text-[#005f73]">35+</div>
                <div className="text-[10px] font-bold text-slate-600 mt-0.5 leading-tight">Years Experience</div>
              </div>

              <div 
                className={`p-2 sm:p-2.5 rounded-xl bg-white/95 border border-slate-200/90 shadow-sm text-center hover:scale-105 transition-all duration-500 ease-out ${
                  isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <div className="text-lg sm:text-xl font-black text-emerald-600">2004</div>
                <div className="text-[10px] font-bold text-slate-600 mt-0.5 leading-tight">Founded in Salem</div>
              </div>

              <div 
                className={`p-2 sm:p-2.5 rounded-xl bg-white/95 border border-slate-200/90 shadow-sm text-center hover:scale-105 transition-all duration-500 ease-out ${
                  isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                <div className="text-lg sm:text-xl font-black text-[#0a9396]">3 Hubs</div>
                <div className="text-[10px] font-bold text-slate-600 mt-0.5 leading-tight">Flagship Stores</div>
              </div>

              <div 
                className={`p-2 sm:p-2.5 rounded-xl bg-white/95 border border-slate-200/90 shadow-sm text-center hover:scale-105 transition-all duration-500 ease-out ${
                  isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
                }`}
                style={{ transitionDelay: '800ms' }}
              >
                <div className="text-lg sm:text-xl font-black text-amber-500">35K+</div>
                <div className="text-[10px] font-bold text-slate-600 mt-0.5 leading-tight">Happy Homes</div>
              </div>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* RIGHT COLUMN: RICH STORY, 3 TRENDY CAPABILITY CARDS & ACTIONS           */}
          {/* ======================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start text-left space-y-4 sm:space-y-4.5">
            
            {/* Authentic Company Narrative (Animates In with slight slide from right) */}
            <div 
              className={`space-y-2.5 text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed transition-all duration-700 ease-out ${
                isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <p>
                An RO expert with over <strong>35 years of dedicated expertise</strong> in the field of water and waste water treatment. The entrepreneur who founded and grew <strong>Aakash Pure Aqua Tech Pvt. Ltd.</strong> from a pioneer startup into millions in annual sales through visionary business planning, creative sales techniques, and innovative marketing.
              </p>
              <p>
                Founded in <strong>2004 at Salem</strong> with flagship branches in <strong>Coimbatore</strong> and <strong>Dharmapuri</strong>, Aakash Aqua Tech is South India’s most professionally managed environmental engineering firm. Unanimously acknowledged as the leading No.1 multi-brand store in the RO water purifier category for sales and service, we pioneered bringing revolutionary Reverse Osmosis Technology to South India.
              </p>
            </div>

            {/* 3 Trendy Animative Capability Cards (One-by-One Staggered Slide In) */}
            <div className="space-y-2.5 w-full pt-1">
              
              {/* Card 1: Multi-Brand */}
              <div 
                className={`p-3 sm:p-3.5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-600 ease-out flex items-center gap-3 group ${
                  isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <span>#1 Multi-Brand Store Authority</span>
                    <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">Verified</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 truncate">Official sales & 100% genuine spares for Kent, AO Smith, Faber, ZeroB, Pureit & 20+ brands.</div>
                </div>
              </div>

              {/* Card 2: Environmental Engineering */}
              <div 
                className={`p-3 sm:p-3.5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-600 ease-out flex items-center gap-3 group ${
                  isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: '850ms' }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#005f73]/15 text-[#005f73] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Factory className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <span>Turnkey Environmental Systems</span>
                    <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-cyan-100 text-[#005f73]">Industrial</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 truncate">Domestic ROs, SS Dispensers, 100,000 LPH Commercial Plants, Water Softeners & DM Plants.</div>
                </div>
              </div>

              {/* Card 3: 24/7 Rapid Care */}
              <div 
                className={`p-3 sm:p-3.5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-600 ease-out flex items-center gap-3 group ${
                  isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: '1000ms' }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#0a9396]/15 text-[#0a9396] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <span>24/7 Rapid Emergency AMC & Service</span>
                    <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-[#0a9396]">Same-Day</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 truncate">Express installation within 4 hours, 24hr helpline, and factory certified engineers.</div>
                </div>
              </div>

            </div>

            {/* Action Buttons (Animates In Last) */}
            <div 
              className={`flex flex-wrap items-center gap-3 pt-2 transition-all duration-700 ease-out ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '1150ms' }}
            >
              <button
                onClick={() => onOpenQuote?.('General Consultation - About Us')}
                className="relative group overflow-hidden px-7 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#002f43] via-[#005f73] to-[#0a9396] hover:from-[#002231] hover:to-[#004e5a] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-[#005f73]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <span className="relative z-10">Book Free Water Audit / Inquiry</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </button>

              <a
                href="tel:9655588666"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm tracking-wider uppercase border-2 border-slate-300 hover:border-[#005f73] hover:text-[#005f73] shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Call 96555 88666</span>
              </a>
            </div>

          </div>

        </div>


      </div>
    </section>
  );
};
