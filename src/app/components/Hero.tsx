import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onExploreProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onExploreProducts }) => {
  const slides = [
    {
      id: 1,
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/07/ChatGPT-Image-Jul-1-2026-at-10_40_36-PM.png',
      alt: 'Aakash Aqua Tech - Pure Living Water Purifiers',
      title: 'Revolutionary Pure Water Technology',
      subtitle: 'South India’s Leading Multi-Brand Store for Sales & 24hr Engineering Service',
      badge: 'Certified 7-Stage RO + UV + Alkaline'
    },
    {
      id: 2,
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/07/ChatGPT-Image-Jul-1-2026-at-10_36_28-PM.png',
      alt: 'Commercial & Industrial RO Plants',
      title: 'Commercial & Industrial RO Plants',
      subtitle: 'High Recovery 100 LPH to 10,000+ LPH Turnkey Installations',
      badge: 'Turnkey Industrial Plants'
    },
    {
      id: 3,
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/07/ChatGPT-Image-Jul-1-2026-at-10_33_47-PM.png',
      alt: 'Advanced Home Water Softening Solutions',
      title: 'Total Water Conditioning & Softeners',
      subtitle: 'Protect Your Entire Home & Plumbing from Scaling & Hard Water',
      badge: 'Zero Scaling & Soft Water'
    },
    {
      id: 4,
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/07/ChatGPT-Image-Jul-1-2026-at-10_07_08-PM.png',
      alt: 'Premium SS Water Dispensers',
      title: 'Stainless Steel Water Dispensers',
      subtitle: 'Trusted by ISRO, 16 Airports & Leading Global Tech Corporates',
      badge: 'ISRO & Airport Trusted'
    },
    {
      id: 5,
      image: 'https://aakashaquatech.in/wp-content/uploads/2026/07/ChatGPT-Image-Jul-1-2026-at-06_20_16-PM.png',
      alt: 'Rapid After-Sales & 24hr Technical Service',
      title: 'Reliable 24-Hour Service & Genuine Spares',
      subtitle: 'Over 35 Years of Environmental Water Engineering Expertise',
      badge: '35+ Years of Trust'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Aspect Ratio Container for Responsive Slideshow */}
      <div className="relative w-full h-[380px] sm:h-[480px] md:h-[580px] lg:h-[680px] select-none">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            {/* Subtle Gradient Overlay for Text Readability & CTA interaction */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex items-end">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 w-full">
                <div className="max-w-2xl text-white space-y-3.5 drop-shadow-md">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-cyan-400/40 shadow-lg">
                    <ShieldCheck className="w-4 h-4 text-cyan-300" />
                    <span className="text-cyan-100">{slide.badge}</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-lg text-slate-200 font-medium leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={onOpenQuote}
                      className="px-6 py-3 rounded-xl bg-[#2d737d] hover:bg-[#205860] text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-900/40 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
                    >
                      <span>Book Free Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onExploreProducts}
                      className="px-6 py-3 rounded-xl bg-white/95 hover:bg-white text-[#173238] font-bold text-xs sm:text-sm backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 shadow-md"
                    >
                      <span>Explore Equipment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Arrow Controls */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Dots Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-cyan-400' : 'w-2.5 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
