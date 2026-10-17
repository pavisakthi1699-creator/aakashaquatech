import React, { useState, useEffect, useRef } from 'react';
import { 
  HelpCircle, 
  Plus, 
  Minus, 
  CheckCircle2
} from 'lucide-react';

interface FaqItem {
  id: number;
  q: string;
  a?: string;
  list?: string[];
}

interface FaqSectionProps {
  onOpenQuote?: (name?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(2); // 2nd item active like in user snippet

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const faqs: FaqItem[] = [
    {
      id: 1,
      q: 'Why should I choose an RO water purifier?',
      a: 'An RO (Reverse Osmosis) water purifier removes dissolved salts, heavy metals, chemicals, bacteria, viruses and other harmful impurities, providing clean, safe and great-tasting drinking water.'
    },
    {
      id: 2,
      q: 'How do I know if I need an RO water purifier?',
      a: 'If your water TDS is above 500 ppm, or if you use borewell, tanker or hard water, an RO purifier is recommended. Our experts provide a free water quality check to help you choose the right purifier.'
    },
    {
      id: 3,
      q: 'What is TDS?',
      a: 'TDS (Total Dissolved Solids) measures the concentration of dissolved minerals, salts and impurities present in water.'
    },
    {
      id: 4,
      q: 'How often should RO filters be replaced?',
      list: [
        'Sediment Filter – Every 3–6 months',
        'Carbon Filter – Every 6–12 months',
        'RO Membrane – Every 12–24 months'
      ]
    },
    {
      id: 5,
      q: 'Does RO purification remove essential minerals?',
      a: 'Modern RO systems with Mineralizer, Alkaline Filter or TDS Controller restore essential minerals like calcium and magnesium for healthier drinking water.'
    },
    {
      id: 6,
      q: 'Can an RO purifier remove bacteria and viruses?',
      a: 'Yes. Advanced RO systems with UV and UF purification effectively remove bacteria, viruses, cysts and other harmful microorganisms.'
    },
    {
      id: 7,
      q: 'Is RO water safe for daily drinking?',
      a: 'Yes. Properly purified RO water is completely safe for daily consumption and is suitable for homes, offices, hospitals, hotels and commercial buildings.'
    },
    {
      id: 8,
      q: 'What maintenance does an RO water purifier require?',
      list: [
        'Filter replacement',
        'RO membrane inspection',
        'Storage tank cleaning',
        'Pump & electrical component checks',
        'Water quality testing'
      ]
    },
    {
      id: 9,
      q: 'Can one RO purifier work with borewell and municipal water?',
      a: 'Yes. Most modern RO purifiers can treat borewell, municipal, tanker and mixed water supplies depending on the TDS level.'
    },
    {
      id: 10,
      q: 'Why choose AAKASH PURE AQUA TECH PVT LTD?',
      list: [
        'Premium RO Water Purifiers',
        'Free Water Quality & TDS Testing',
        'Professional Installation',
        'Genuine Spare Parts & Filters',
        'Affordable AMC Plans',
        'Fast After-Sales Support',
        'Domestic, Commercial & Industrial Water Solutions'
      ]
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section 
      ref={sectionRef}
      id="faq-section" 
      className="snap-screen relative w-full min-h-[100dvh] flex flex-col justify-center items-center pt-[115px] sm:pt-[130px] pb-14 sm:pb-18 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#edf6f9] via-white to-[#edf6f9] border-t border-[#cfe5eb] overflow-hidden select-none font-trendy"
    >
      {/* Background Ambient Lighting & Subtle Grid */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-100/50 via-teal-50/20 to-transparent blur-3xl opacity-70" />
        <div className="absolute bottom-10 -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-cyan-100/50 via-blue-50/20 to-transparent blur-3xl opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(#005f73_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      <div className="max-w-[1360px] w-full mx-auto relative z-10 flex flex-col justify-center">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          
          {/* Badge: Frequently Asked Questions */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#cfe5eb] text-slate-800 text-xs font-bold shadow-xs mb-3 transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#005f73]" />
            <span className="bg-gradient-to-r from-[#003d47] to-[#005f73] bg-clip-text text-transparent font-extrabold uppercase tracking-wider text-[11px]">
              Frequently Asked Questions
            </span>
          </div>

          {/* Heading: Everything You Need to Know */}
          <h2 
            className={`text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-tight transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
            }`}
            style={{ transitionDelay: '180ms' }}
          >
            Everything You{' '}
            <span className="bg-gradient-to-r from-[#002f43] via-[#005f73] to-[#0a9396] bg-clip-text text-transparent">
              Need to Know
            </span>
          </h2>
          <div 
            className={`w-20 h-1 bg-gradient-to-r from-[#002f43] via-[#005f73] to-[#0a9396] mx-auto mt-2.5 rounded-full transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transitionDelay: '260ms' }}
          />

          {/* Description */}
          <p 
            className={`mt-3 text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '340ms' }}
          >
            Find answers to the most common questions about our RO water purifiers, maintenance, installation and after-sales service.
          </p>

        </div>

        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* TWO-COLUMN ACCORDION WITH INDEPENDENT COLUMNS (NO BLANK STRETCH GAP)     */}
        {/* ========================================================================= */}
        {(() => {
          const renderFaqCard = (faq: typeof faqs[0]) => {
            const isOpen = openIndex === faq.id;
            const baseDelay = 380 + (faq.id - 1) * 75;

            return (
              <div
                key={faq.id}
                className={`group rounded-[20px] transition-all duration-500 border overflow-hidden bg-white h-fit ${
                  isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-98'
                } ${
                  isOpen
                    ? 'border-[#005f73] shadow-lg shadow-[#005f73]/10 ring-1 ring-[#005f73]/25'
                    : 'border-[#cfe5eb] hover:border-[#005f73]/50 hover:shadow-md'
                }`}
                style={{ transitionDelay: `${baseDelay}ms` }}
              >
                {/* FAQ Question Header Button */}
                <button
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3.5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {/* Index Number Badge */}
                    <span 
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-all duration-500 ease-out ${
                        isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      } ${
                        isOpen 
                          ? 'bg-[#005f73] text-white shadow-xs' 
                          : 'bg-slate-100 text-slate-500 group-hover:bg-cyan-50 group-hover:text-[#005f73]'
                      }`}
                      style={{ transitionDelay: `${baseDelay + 40}ms` }}
                    >
                      {faq.id < 10 ? `0${faq.id}` : faq.id}
                    </span>

                    {/* Question Title */}
                    <span 
                      className={`text-xs sm:text-[14px] font-extrabold transition-all duration-500 ease-out leading-snug ${
                        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      } ${
                        isOpen ? 'text-[#005f73]' : 'text-slate-800 group-hover:text-[#005f73]'
                      }`}
                      style={{ transitionDelay: `${baseDelay + 80}ms` }}
                    >
                      {faq.q}
                    </span>
                  </div>

                  {/* Icon Indicator (Rotates & Transforms) */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ease-out ${
                      isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    } ${
                      isOpen
                        ? 'bg-[#005f73] text-white rotate-180 shadow-xs'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-[#005f73]/10 group-hover:text-[#005f73]'
                    }`}
                    style={{ transitionDelay: `${baseDelay + 100}ms` }}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* FAQ Answer Body */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-[13.5px] leading-relaxed border-t border-slate-100 animate-fade-in">
                    {faq.a && (
                      <p className="font-normal text-slate-700">
                        {faq.a.includes('500 ppm') ? (
                          <>
                            If your water TDS is above{' '}
                            <strong className="text-[#005f73] font-black bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-200">
                              500 ppm
                            </strong>
                            , or if you use borewell, tanker or hard water, an RO purifier is recommended. Our experts provide a free water quality check to help you choose the right purifier.
                          </>
                        ) : (
                          faq.a
                        )}
                      </p>
                    )}

                    {faq.list && (
                      <ul className="space-y-2 mt-2">
                        {faq.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            </span>
                            <span className="font-medium text-slate-700">
                              {item.replace('✔ ', '')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          };

          const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
          const rightFaqs = faqs.filter((_, i) => i % 2 === 1);

          return (
            <div className="max-h-[62vh] overflow-y-auto pr-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {/* Mobile: 1 to 10 single sequential column */}
              <div className="flex flex-col gap-3.5 lg:hidden">
                {faqs.map(renderFaqCard)}
              </div>

              {/* Desktop: 2 independent columns - prevents any sibling card from stretching or creating blank space */}
              <div className="hidden lg:grid grid-cols-2 gap-4 items-start">
                <div className="flex flex-col gap-3.5">
                  {leftFaqs.map(renderFaqCard)}
                </div>
                <div className="flex flex-col gap-3.5">
                  {rightFaqs.map(renderFaqCard)}
                </div>
              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
};
