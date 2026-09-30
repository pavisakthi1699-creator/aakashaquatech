import React from 'react';
import { ShieldCheck, Zap, Cog, HeartHandshake, CheckCircle } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% Genuine Components',
      description: 'We exclusively utilize genuine Dow Filmtec / Dupont membranes, Grundfos / CNP high pressure pumps, and Pentair / Wave Cyber vessels with warranty validation.'
    },
    {
      icon: Cog,
      title: 'Precision Water Engineering',
      description: 'Custom plant sizing calculated specifically for your raw water TDS, silica concentration, and daily output needs to maximize membrane lifespan.'
    },
    {
      icon: Zap,
      title: 'Rapid 4-Hour Response Team',
      description: 'Dedicated fleet of field service technicians equipped with mobile testing kits and spare components to resolve plant downtime promptly.'
    },
    {
      icon: HeartHandshake,
      title: 'Transparent Project Execution',
      description: 'Complete transparency in water test reports, bill of materials, engineering drawings, and commissioning parameters with zero hidden charges.'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold tracking-wider uppercase text-sky-600">
              The Aakash Aqua Tech Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why 650+ Commercial Facilities Trust Our Water Systems
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Water is the lifeblood of industrial processes and everyday operations. Our engineered plants are designed for minimal downtime, high energy efficiency, and extended membrane longevity.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-slate-700 font-semibold text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Over 12 years of hands-on water engineering expertise</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 font-semibold text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Plants installed across 15+ industrial sectors</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 font-semibold text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Full compliance with State Pollution Control Board norms</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={i}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/30 transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sky-600 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
