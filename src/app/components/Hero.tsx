import React from 'react';
import { ShieldCheck, Award, Wrench, Droplet, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-100/50 rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-bold tracking-wide uppercase">
              <Award className="w-4 h-4 text-sky-600" />
              ISO 9001:2015 Certified Water Treatment
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Engineered Water Purity For <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">Industry & Commerce</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
              Design, manufacturing, installation, and AMC of high-recovery <strong>Industrial RO Plants</strong>, <strong>Commercial RO Systems</strong>, <strong>Water Softeners</strong>, and <strong>STP / ETP Plants</strong> tailored to your raw water chemistry.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-slate-700 font-medium text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Custom Flow Rates (250 LPH to 100,000 LPH)</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 font-medium text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Heavy-Duty SS316 & Dow Filmtec Membranes</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 font-medium text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Pollution Control Board & WHO Compliant</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 font-medium text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Rapid On-Site 4-Hour Breakdown Support</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenQuote}
                className="px-8 py-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base shadow-lg shadow-sky-600/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
              >
                <span>Request Free Water Audit & Quote</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="#solutions"
                className="px-8 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-base flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Explore Water Plants</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Graphic Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-tr from-sky-900 to-slate-900 p-8 text-white shadow-2xl overflow-hidden border border-sky-800/50">
              {/* Background ambient water visual */}
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-sky-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-cyan-300">
                      <Droplet className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Aakash Plant Diagnostics</div>
                      <div className="text-xs text-sky-300">Live Efficiency Benchmark</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Optimal Pure
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-xs text-slate-300 font-medium">TDS Reduction</div>
                    <div className="text-2xl font-black text-cyan-400 mt-1">98.5%</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Tested & Calibrated</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-xs text-slate-300 font-medium">Water Recovery</div>
                    <div className="text-2xl font-black text-cyan-400 mt-1">Up to 75%</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">High Efficiency Tech</div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-sky-300">Supported Industries</div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {['Pharmaceutical', 'Textiles & Dyeing', 'Hospitals', 'Commercial Tech Parks', 'Hotels & Resorts', 'Apartment Townships'].map((item) => (
                      <span key={item} className="px-3 py-1 rounded-lg bg-sky-950/60 border border-sky-700/50 text-sky-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-sky-800/80 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Wrench className="w-4 h-4 text-sky-400" /> Complete Turnkey Installation
                  </span>
                  <span className="font-semibold text-cyan-300">1 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
