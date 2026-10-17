import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface CategoryShowcasesProps {
  onShopCategory: (category: string) => void;
}

export const CategoryShowcases: React.FC<CategoryShowcasesProps> = ({ onShopCategory }) => {
  const showcases = [
    {
      title: 'RO Water Purifiers',
      categoryKey: 'Domestic RO',
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/08/IMG_7780-scaled.png',
      reverse: false,
      paragraphs: [
        'Trusted by thousands of customers, Aakash Pure Aqua Tech Pvt. Ltd. provides high-quality RO water purifiers that make your drinking water pure and safe. With advanced purification technologies like RO + UV + UF and Live TDS Display, our systems ensure effective purification while retaining essential natural minerals with Alkaline & Copper technology.',
        'With features like digital purity display, customers can monitor water quality, filter life, and purification performance in real time. Aakash Pure Aqua Tech is committed to delivering pure and healthy drinking water for every family.'
      ],
      points: ['Multi-Stage RO + UV + UF Filtration', 'Real-Time Live TDS Purity Display', 'Mineral Alkaline & Active Copper Tech']
    },
    {
      title: 'UV Water Purifiers',
      categoryKey: 'Domestic RO',
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/08/IMG_7787-scaled-e1785863931797.png',
      reverse: true,
      paragraphs: [
        'Aakash Pure Aqua Tech offers advanced UV Water Purifiers with storage. These purifiers use UV and UF purification technology to remove harmful bacteria, viruses, and cysts, ensuring safe and healthy drinking water for your family.',
        'With features like digital purity display, customers can monitor water quality, filter life, and purification performance in real time. Aakash Pure Aqua Tech is committed to delivering pure and healthy drinking water for every family.'
      ],
      points: ['High-Intensity UV Disinfection Chamber', 'Stainless Steel Storage Tanks Available', 'Ideal for Low-TDS Municipal Water Sources']
    },
    {
      title: 'Gravity Water Purifiers',
      categoryKey: 'Gravity',
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/08/IMG_7788-1024x1024.png',
      reverse: false,
      paragraphs: [
        'Aakash Pure Aqua Tech offers high-quality non-electric gravity water purifiers that use the natural force of gravity to remove suspended impurities, bacteria, and cysts from water.',
        'These purifiers provide safe and pure drinking water, making them an ideal solution for areas with limited electricity, rural homes, and cost-conscious environments.'
      ],
      points: ['Zero Electricity Needed - 100% Non-Electric', 'Activated Carbon & Ultra-filtration Mesh', 'Portable, Durable & Easy Maintenance']
    },
    {
      title: 'Home Water Structuring Device',
      categoryKey: 'Softner',
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/08/IMG_7790-1024x1024.png',
      reverse: true,
      paragraphs: [
        'The Enviro Water Structuring Device is a fully automatic, maintenance-free water conditioning solution that helps reduce the scale-forming properties of hard water. It minimizes mineral deposits in pipelines, plumbing systems, boilers, cooling towers, and other water-based equipment.',
        'Operating without electricity, chemicals, salt, filters, or replacement parts, it offers an eco-friendly and cost-effective solution for protecting water systems from hard water scaling across whole homes.'
      ],
      points: ['Zero Chemicals, No Salt, No Filters to Replace', 'Permanently Eliminates Pipe & Tap Scale Deposits', 'Protects Geysers, Washing Machines & Solar Heaters']
    },
    {
      title: 'SS Dispenser',
      categoryKey: 'SS WATER DISPENSER',
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/08/IMG_7782-1024x1024.png',
      reverse: false,
      paragraphs: [
        'Trusted by leading corporates including Foxconn, Qualcomm, Hyundai, Yamaha, Ola, MRF, Amara Raja, Ford, LGB, TVS Group and Ashok Leyland across India.',
        'Successfully installed water purifier-cum-dispensers at 5 ISRO centres and 16 international airports. India’s only water dispenser manufacturer with BIS License across its entire dispenser range with 100+ customized configurations for schools, colleges, hospitals, industries, and public offices.'
      ],
      points: ['Heavy Gauge Food-Grade SS 304 Construction', 'Equipped at 5 ISRO Centres & 16 Airports', 'Hot, Cold & Normal Multi-Faucet Dispensing']
    },
    {
      title: 'Alkaline Water Filter Pitcher',
      categoryKey: 'Alkaline',
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/08/IMG_7784-1024x1024.png',
      reverse: true,
      paragraphs: [
        'Zerob Alkaline Water Filter Pitchers transform your regular drinking water into healthy alkaline water with enhanced mineral balance.',
        'Designed to increase the pH level up to 9.5, they help reduce acidity, support better hydration, and promote overall well-being. Enjoy fresh, healthy, and great-tasting alkaline water every day for you and your family.'
      ],
      points: ['Raises Drinking Water pH up to 9.5', 'Antioxidant & Negative ORP Water Boost', 'Compact Ergonomic Countertop Design']
    },
    {
      title: 'Under Sink Water Purifiers',
      categoryKey: 'Under Sink',
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/08/IMG_7778-1024x562.png',
      reverse: false,
      paragraphs: [
        'Aakash Pure Aqua Tech’s Under Sink Water Purifiers provide pure, healthy drinking water while staying neatly hidden beneath your kitchen sink. Advanced RO, UV, and UF technologies remove harmful contaminants, bacteria, and viruses for safe everyday use.',
        'The space-saving design keeps your kitchen clutter-free while delivering fresh water through an elegant dedicated faucet. Ideal for modern apartments and premium modular homes.'
      ],
      points: ['Concealed Under-Counter Ergonomic Design', 'Dedicated Designer Goose-Neck Faucet', 'Hydro-Pneumatic Pressurized Pure Water Tank']
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {showcases.map((item, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-[#eef6f7]/60 border border-[#6f9ea6]/20 p-6 sm:p-10 lg:p-12 shadow-sm transition-all hover:shadow-lg"
          >
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${item.reverse ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Text Column */}
              <div className={`lg:col-span-6 space-y-5 ${item.reverse ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="inline-block px-3 py-1 rounded-full bg-white text-[#2d737d] text-xs font-bold border border-[#6f9ea6]/30 shadow-sm uppercase tracking-wide">
                  Featured Product Line
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173238] tracking-tight">
                  {item.title}
                </h3>

                <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {item.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-justify">{p}</p>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-2 pt-1">
                  {item.points.map((pt, ptIdx) => (
                    <div key={ptIdx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                      <div className="w-5 h-5 rounded-full bg-[#2d737d]/10 text-[#2d737d] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => onShopCategory(item.categoryKey)}
                    className="px-7 py-3.5 rounded-xl bg-[#6f9ea6] hover:bg-[#2d737d] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 hover:gap-3"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Image Column */}
              <div className={`lg:col-span-6 ${item.reverse ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-100 shadow-md flex items-center justify-center overflow-hidden group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-[360px] sm:max-h-[420px] w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
