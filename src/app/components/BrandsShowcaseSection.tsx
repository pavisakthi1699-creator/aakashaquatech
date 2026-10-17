import React from 'react';
import { assetUrl } from '../utils/asset';

interface BrandItem {
  id: string;
  name: string;
  logo: string;
}

const BRANDS: BrandItem[] = [
  {
    id: 'kent',
    name: 'KENT RO',
    logo: assetUrl('/images/BRAND/IMG_8837.PNG'),
  },
  {
    id: 'aquaguard',
    name: 'Aquaguard',
    logo: assetUrl('/images/BRAND/Aquaguard_logo_transparent_HD.png'),
  },
  {
    id: 'aosmith',
    name: 'AO Smith',
    logo: assetUrl('/images/BRAND/IMG_8835.PNG'),
  },
  {
    id: 'zerob',
    name: 'Zero B',
    logo: assetUrl('/images/BRAND/IMG_8833.PNG'),
  },
  {
    id: 'faber',
    name: 'Faber',
    logo: assetUrl('/images/BRAND/FABER_logo_transparent_HD.png'),
  },
  {
    id: 'conway',
    name: 'Conway',
    logo: assetUrl('/images/BRAND/IMG_8832.PNG'),
  },
  {
    id: '100c',
    name: '100°C',
    logo: assetUrl('/images/BRAND/100C_logo_transparent_HD.png'),
  },
  {
    id: 'enviro',
    name: 'Enviro',
    logo: assetUrl('/images/BRAND/Enviro_logo_transparent_HD.png'),
  },
  {
    id: 'orcas',
    name: 'Orcas',
    logo: assetUrl('/images/BRAND/IMG_8834.PNG'),
  },
  {
    id: 'misty',
    name: 'Misty',
    logo: assetUrl('/images/BRAND/IMG_8839.PNG'),
  },
  {
    id: 'olyar',
    name: 'Olyar',
    logo: assetUrl('/images/BRAND/OLYAR_logo_transparent_HD.png'),
  },
  {
    id: 'sarwans',
    name: 'Sarwans',
    logo: assetUrl('/images/BRAND/SARWANS_logo_transparent_HD.png'),
  },
];

interface BrandsShowcaseSectionProps {
  onOpenQuote: (serviceOrBrand?: string) => void;
  onOpenOrder?: () => void;
}

export const BrandsShowcaseSection: React.FC<BrandsShowcaseSectionProps> = ({
  onOpenQuote,
}) => {
  // Triple the list for an infinite smooth sliding loop without any blank pause
  const slidingBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section
      id="brands-section"
      // Fullscreen Snap Screen with proper header offset: ensures 100% clean alignment on scroll from Testimonial
      className="snap-screen relative w-full min-h-[100dvh] flex flex-col justify-center items-center pt-[115px] sm:pt-[130px] pb-14 sm:pb-18 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#003d47] via-[#005f73] via-[#006f7d] to-[#004e5a] border-y border-teal-800/40 overflow-hidden select-none font-trendy"
    >
      {/* Ambient Water Caustics Glow Lighting (Matching What We Offer) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] rounded-full bg-cyan-400/15 blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[550px] h-[550px] rounded-full bg-teal-300/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
      </div>

      {/* Left & Right Soft Fade Gradients (Matching What We Offer edges) */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#003d47] via-[#003d47]/80 to-transparent z-20" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#004e5a] via-[#004e5a]/80 to-transparent z-20" />

      {/* Perfectly Centered Container with max-w-[1400px] */}
      <div className="max-w-[1400px] w-full mx-auto relative z-10 my-auto flex flex-col justify-center">
        
        {/* Section Heading: Exactly styled like What We Offer */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-tight drop-shadow-md">
            Brands We <span className="text-cyan-300 drop-shadow-[0_2px_12px_rgba(103,232,249,0.5)]">Service & Support</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-teal-300 mx-auto mt-3 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
          <p className="mt-3.5 text-xs sm:text-sm text-cyan-100/90 font-medium max-w-xl mx-auto">
            Authorized multi-brand sales, genuine manufacturer spare parts, and certified technician support across Tamil Nadu.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* THE SLIDING DOCK: WHITE BG CARDS WITH GLASS OVERLAY & ORIGINAL LOGOS      */}
        {/* ========================================================================= */}
        <div className="w-full relative overflow-hidden py-4">
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-7 animate-brand-marquee hover:[animation-play-state:paused] w-max cursor-grab active:cursor-grabbing">
            {slidingBrands.map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                onClick={() => onOpenQuote(`${brand.name} Multi-Brand Service`)}
                className="group flex flex-col items-center shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105"
                title={`${brand.name} - Click for Multi-Brand Service`}
              >
                {/* Light White Overlay Glass Card (Increased White Opacity ~50%) */}
                <div className="w-[108px] h-[108px] sm:w-[124px] sm:h-[124px] lg:w-[132px] lg:h-[132px] rounded-[24px] sm:rounded-[28px] bg-white/50 hover:bg-white/65 backdrop-blur-md border border-white/60 hover:border-cyan-300 p-3.5 sm:p-4 flex items-center justify-center shadow-lg shadow-slate-950/20 hover:shadow-2xl hover:shadow-cyan-400/25 transition-all duration-300 group-hover:-translate-y-2 relative overflow-hidden">
                  
                  {/* Soft Light Frosted Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/35 pointer-events-none" />

                  {/* Brand Image */}
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-16 sm:max-h-20 lg:max-h-22 max-w-[88%] object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110 relative z-10"
                    loading="lazy"
                  />
                </div>

                {/* Text Label Below Card: High contrast white font with text shadow */}
                <span className="mt-3 text-xs sm:text-[13px] font-bold text-white drop-shadow-sm text-center tracking-tight truncate max-w-[105px] sm:max-w-[120px] transition-colors duration-300 group-hover:text-cyan-300">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Embedded Continuous Sliding Keyframes */}
      <style>{`
        @keyframes brandMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
        .animate-brand-marquee {
          animation: brandMarquee 26s linear infinite;
        }
      `}</style>
    </section>
  );
};
