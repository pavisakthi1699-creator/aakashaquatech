import React from 'react';

export const BrandsCarousel: React.FC = () => {
  const brands = [
    { name: 'AO Smith', logo: 'https://aakashaquatech.in/wp-content/uploads/2026/04/Smith-2-1.png' },
    { name: 'Kent RO', logo: 'https://aakashaquatech.in/wp-content/uploads/2026/06/14.jpg' },
    { name: 'Purella', logo: 'https://aakashaquatech.in/wp-content/uploads/2026/06/13.jpg' },
    { name: 'Wave RO', logo: 'https://aakashaquatech.in/wp-content/uploads/2026/06/12.jpg' },
    { name: 'Conway', logo: 'https://aakashaquatech.in/wp-content/uploads/2026/06/10.jpg' },
    { name: 'ZeroB', logo: 'https://aakashaquatech.in/wp-content/uploads/2026/06/9.jpg' },
    { name: 'Aquaguard', logo: 'https://aakashaquatech.in/wp-content/uploads/2026/06/8.jpg' },
    { name: 'Aakash Aqua', logo: 'https://aakashaquatech.in/wp-content/uploads/2026/06/7.jpg' },
    { name: 'Enviro Tech', logo: 'https://aakashaquatech.in/wp-content/uploads/2026/06/6.jpg' }
  ];

  return (
    <section className="py-16 bg-[#f8fafb] border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173238] tracking-tight">
            Our Brands
          </h2>
          <div className="w-12 h-1 bg-[#2d737d] mx-auto mt-3 rounded-full"></div>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium">
            Authorized multi-brand partner for India's leading certified water purification manufacturers
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4 items-center">
          {brands.map((b, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center h-24 group hover:border-[#2d737d]"
            >
              <img
                src={b.logo}
                alt={b.name}
                className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-[10px] font-bold text-slate-500 mt-1 truncate max-w-full text-center">
                {b.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
