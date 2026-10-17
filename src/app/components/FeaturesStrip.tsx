import React from 'react';

export const FeaturesStrip: React.FC = () => {
  const features = [
    {
      title: 'Free Installation',
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/07/ChatGPT-Image-Jul-19-2026-02_45_21-PM-e1784473443781.png',
      desc: 'Expert technician setup at zero additional cost'
    },
    {
      title: 'Easy EMI Options',
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/07/ChatGPT-Image-Jul-19-2026-02_49_07-PM-e1784474068985.png',
      desc: 'Affordable monthly financing for every budget'
    },
    {
      title: '24 Hours Service',
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/07/ChatGPT-Image-Jul-19-2026-02_52_49-PM-e1784473752352.png',
      desc: 'Round the clock technical assistance & repair'
    },
    {
      title: 'Money Guarantee',
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/07/ChatGPT-Image-Jul-19-2026-02_51_45-PM-e1784473841941.png',
      desc: '100% genuine products with manufacturer warranty'
    },
    {
      title: 'Free Shipping',
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/07/ChatGPT-Image-Jul-19-2026-02_50_28-PM-e1784473925846.png',
      desc: 'Prompt doorstep delivery across all of Tamil Nadu'
    }
  ];

  return (
    <section className="py-16 bg-[#f8fafb] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173238] tracking-tight mb-3">
            Best Service For You
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Leading the pure water industry with dedicated customer support, genuine equipment, certified installation, and transparent pricing.
          </p>
        </div>

        {/* 5 Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 text-center border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between group"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#eef6f7] p-3 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>

              <div>
                <h3 className="text-base font-bold text-[#173238] group-hover:text-[#2d737d] transition-colors mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
