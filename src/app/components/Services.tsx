import React from 'react';
import { Wrench, TestTube, RefreshCw, Factory, ShieldCheck, PhoneCall } from 'lucide-react';

interface ServicesProps {
  onOpenQuote: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuote }) => {
  const serviceList = [
    {
      icon: TestTube,
      title: 'Water Chemistry Testing & Audit',
      desc: 'Accurate physical and chemical raw water testing (TDS, hardness, iron, silica, microbial load) to accurately size membranes and pre-treatment media.',
      badge: 'Free On-Site Sample Collection'
    },
    {
      icon: Factory,
      title: 'Turnkey Plant Design & Fabrication',
      desc: 'Skid fabrication in SS304/SS316, automated electrical panels with PLC/SCADA integration, high-pressure piping, and zero-leak guarantee.',
      badge: 'Tailored to Site Specifications'
    },
    {
      icon: RefreshCw,
      title: 'Comprehensive AMC & Operation Support',
      desc: 'Preventive monthly maintenance, periodic membrane chemical CIP washing, media replacement, consumable supply, and guaranteed 4-hour breakdown response.',
      badge: 'Round-the-Clock Priority'
    },
    {
      icon: Wrench,
      title: 'STP & ETP Retrofit & Upgrades',
      desc: 'Upgrading existing underperforming sewage and effluent treatment plants with MBR/MBBR aeration technology to meet state pollution board norms.',
      badge: 'PCB Norms Compliance'
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-sky-600 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> End-to-End Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Turnkey Water Engineering Services
            </h2>
            <p className="text-slate-600 text-base">
              From raw water laboratory analysis to commissioning and 24/7 annual maintenance, we keep your water systems operating at peak recovery.
            </p>
          </div>

          <button
            onClick={onOpenQuote}
            className="self-start md:self-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-sky-400" />
            Book Site Consultation
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceList.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 mb-1">
                    {service.badge}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
