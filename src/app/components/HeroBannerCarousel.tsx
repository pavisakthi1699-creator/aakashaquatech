import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Droplets, Star, ChevronLeft, ChevronRight, CheckCircle2, Cpu } from 'lucide-react';
import { assetUrl } from '../utils/asset';
import { AnimatedWaterBubbles } from './AnimatedWaterBubbles';

interface HeroBannerCarouselProps {
  onOpenOrder: (productName: string) => void;
  onExploreProducts: () => void;
}

interface BannerSlide {
  id: string;
  badge: string;
  titlePrefix: string;
  rotatingWords: string[];
  description: string;
  orderProduct: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  trustPoints: { icon: 'warranty' | 'install' | 'rating' | 'chip'; text: string }[];
  mascotImage: string;
  mascotAlt: string;
  badgeLeft: { title: string; subtitle: string; borderColor: string; dotColor: string; titleColor: string };
  badgeRight: { title: string; subtitle: string; borderColor: string; dotColor: string; titleColor: string };
  badgeBottom: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 'slide-aakash-fonix',
    badge: "INDIA'S ADVANCED MINERAL RO™ PURIFIERS",
    titlePrefix: 'Pure, Healthy Water for ',
    rotatingWords: [
      'Your Beloved Family',
      'Lifelong Active Health',
      'Smart Modern Kitchens',
      '100% Pure Alkaline Living',
    ],
    description:
      'Advanced 10-Stage Multi-Stage RO + UV + UF Filtration infused with Active Copper & essential natural minerals. Tested and certified for 99.9% purity with zero water wastage.',
    orderProduct: 'Aakash Pure H2O Multi-Stage Purifier',
    primaryBtnText: 'Book Free Water Test / Order',
    secondaryBtnText: 'View Catalog',
    trustPoints: [
      { icon: 'warranty', text: '1 Year Onsite Warranty' },
      { icon: 'install', text: 'Free Installation & Delivery' },
      { icon: 'rating', text: '4.9/5 Rating (25,000+ Homes)' },
    ],
    mascotImage: assetUrl('/images/hero-banners/mascot-purifiers.png'),
    mascotAlt: 'Aakash Aqua Tech Expert with Aakash Pure H2O and Fonix Purifiers',
    badgeLeft: {
      title: 'Aakash Pure H2O',
      subtitle: 'Micro Controller Display',
      borderColor: 'border-red-200/90 shadow-red-950/10',
      dotColor: 'bg-red-600',
      titleColor: 'text-red-950',
    },
    badgeRight: {
      title: 'Fonix Pure H2O',
      subtitle: 'High-Flow Purification',
      borderColor: 'border-cyan-200/90 shadow-cyan-950/10',
      dotColor: 'bg-cyan-500',
      titleColor: 'text-cyan-950',
    },
    badgeBottom: 'Certified 99.9% Hospital-Grade Purity',
  },
  {
    id: 'slide-olivar-series',
    badge: 'LUXURY SMART COPPER & ALKALINE SERIES',
    titlePrefix: 'Designer Aesthetics & ',
    rotatingWords: [
      'Active Copper Health',
      'Smart Touch Controls',
      'Copper-Zinc Alkaline',
      'Modern Kitchen Elegance',
    ],
    description:
      'Experience next-gen Olivar S1 & Volcano luxury purifiers. Active Copper-Zinc alkaline fortification, intelligent touch LED controls, and multi-faceted diamond aesthetics engineered for modern kitchens.',
    orderProduct: 'Olivar Smart Copper-Zinc Purifier Series',
    primaryBtnText: 'Explore Olivar Series',
    secondaryBtnText: 'View Catalog',
    trustPoints: [
      { icon: 'chip', text: 'Smart Touch Sensor Display' },
      { icon: 'install', text: '100% Pure Copper Infusion' },
      { icon: 'rating', text: 'Tested for High TDS (2500+)' },
    ],
    mascotImage: assetUrl('/images/hero-banners/mascot-olivar.png'),
    mascotAlt: 'Aakash Aqua Tech Expert with Olivar S1 and Volcano Designer Purifiers',
    badgeLeft: {
      title: 'Olivar S1 Smart Touch',
      subtitle: 'Metallic Copper Finish',
      borderColor: 'border-amber-200/90 shadow-amber-950/10',
      dotColor: 'bg-amber-600',
      titleColor: 'text-amber-950',
    },
    badgeRight: {
      title: 'Olivar Volcano',
      subtitle: 'Copper Zinc Alkaline Facet',
      borderColor: 'border-orange-200/90 shadow-orange-950/10',
      dotColor: 'bg-orange-500',
      titleColor: 'text-orange-950',
    },
    badgeBottom: 'Premium Designer Series • High Recovery RO',
  },
  {
    id: 'slide-wave-krystal',
    badge: '25 YEARS OF PURITY EXCELLENCE',
    titlePrefix: 'High-Recovery Wave RO with ',
    rotatingWords: [
      'Live Digital TDS Display',
      '14L Mega Storage Tank',
      '25 Years Brand Legacy',
      '100% Sweet Mountain Taste',
    ],
    description:
      "Sarwan's Wave Krystal brings India's No.1 Alkaline RO with real-time digital TDS monitoring, heavy-duty 14-liter storage capacity, and multi-stage mineral balancing for continuous pure drinking water.",
    orderProduct: "Sarwan's Wave Krystal Digital RO Purifier",
    primaryBtnText: 'Order Wave Krystal',
    secondaryBtnText: 'View Catalog',
    trustPoints: [
      { icon: 'chip', text: 'Real-Time Digital TDS Screen' },
      { icon: 'install', text: '14L Mega Transparent Tank' },
      { icon: 'warranty', text: "India's No.1 Alkaline Tech" },
    ],
    mascotImage: assetUrl('/images/hero-banners/mascot-wave.png'),
    mascotAlt: "Aakash Aqua Tech Expert with Sarwan's Wave Krystal Copper and Digital Purifiers",
    badgeLeft: {
      title: 'Wave Krystal Copper',
      subtitle: 'Multi-Stage Purification',
      borderColor: 'border-blue-200/90 shadow-blue-950/10',
      dotColor: 'bg-blue-600',
      titleColor: 'text-blue-950',
    },
    badgeRight: {
      title: 'Wave Smart Digital',
      subtitle: 'Real-Time TDS • 14L Tank',
      borderColor: 'border-cyan-200/90 shadow-cyan-950/10',
      dotColor: 'bg-cyan-500',
      titleColor: 'text-cyan-950',
    },
    badgeBottom: "ISI 10500 Certified • India's #1 Alkaline Tech",
  },
];

export const HeroBannerCarousel: React.FC<HeroBannerCarouselProps> = ({
  onOpenOrder,
  onExploreProducts,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [isWordFading, setIsWordFading] = useState(false);
  const [isSlideTransitioning, setIsSlideTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSlide = BANNER_SLIDES[currentSlide];

  // Rotating words cycle for the active slide
  useEffect(() => {
    setWordIdx(0);
    const wordInterval = setInterval(() => {
      setIsWordFading(true);
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % activeSlide.rotatingWords.length);
        setIsWordFading(false);
      }, 300);
    }, 2600);

    return () => clearInterval(wordInterval);
  }, [currentSlide]);

  // Auto-advance slides every 5.8s when not hovered
  useEffect(() => {
    if (isPaused) return;

    slideTimerRef.current = setInterval(() => {
      handleNextSlide();
    }, 5800);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [currentSlide, isPaused]);

  const handleNextSlide = () => {
    setIsSlideTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
      setIsSlideTransitioning(false);
    }, 280);
  };

  const handlePrevSlide = () => {
    setIsSlideTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
      setIsSlideTransitioning(false);
    }, 280);
  };

  const handleSelectSlide = (idx: number) => {
    if (idx === currentSlide) return;
    setIsSlideTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(idx);
      setIsSlideTransitioning(false);
    }, 280);
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[100dvh] sm:min-h-screen flex items-center justify-center overflow-hidden select-none font-trendy bg-white"
      style={{
        // Solid minimal background derived from Panel 1's soft aqua & mint palette: very minimal, clean & light
        background: 'linear-gradient(135deg, #eef9f7 0%, #f3fcf8 32%, #f8fdfb 65%, #ffffff 100%)',
      }}
    >
      {/* ========================================================================= */}
      {/* 1. PANEL 1 MINIMAL WATER ESSENCE: GENTLE BUBBLES & AMBIENT SOFT ORBS       */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Soft Ambient Bubbles Canvas from Panel 1 */}
        <div className="absolute inset-0 opacity-40">
          <AnimatedWaterBubbles />
        </div>

        {/* Panel 1 Ambient Water Orbs with Soft Blur */}
        <div className="absolute left-[5%] bottom-[14%] w-6 h-6 rounded-full bg-[#4ecbc2]/20 blur-[1px]" />
        <div className="absolute left-[24%] top-[18%] w-10 h-10 rounded-full bg-[#93e3b5]/25 blur-[2px]" />
        <div className="absolute right-[12%] bottom-[10%] w-7 h-7 rounded-full bg-[#6fd8bd]/20 blur-[1px]" />
        <div className="absolute right-[32%] top-[12%] w-5 h-5 rounded-full bg-[#4ecbc2]/15 blur-[1px]" />

        {/* Ambient Top Light Beam for Depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-white/70 blur-[90px]" />

        {/* Dynamic Glow behind Right Mascot matching current slide */}
        <div
          className={`absolute top-1/4 right-0 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full blur-3xl opacity-70 transition-all duration-700 ${
            currentSlide === 0
              ? 'bg-gradient-to-br from-cyan-100/60 via-teal-50/40 to-transparent'
              : currentSlide === 1
              ? 'bg-gradient-to-br from-amber-100/60 via-orange-50/40 to-transparent'
              : 'bg-gradient-to-br from-blue-100/60 via-cyan-50/40 to-transparent'
          }`}
        />

        {/* Subtle Modern Aqua Micro-Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#005f73_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.025]" />
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN TWO-COLUMN CONTENT STAGE                                          */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 lg:gap-10 h-full min-h-[100dvh] pt-[108px] sm:pt-[118px] lg:pt-[112px] pb-14 lg:pb-12">
        
        {/* ======================================================================= */}
        {/* LEFT COLUMN: TRENDY TYPOGRAPHY & BEST CONTENT FOR EACH SLIDE            */}
        {/* ======================================================================= */}
        <div
          className={`w-full lg:w-[50%] flex flex-col justify-center items-start text-left z-20 self-center py-2 lg:py-4 transition-all duration-300 ${
            isSlideTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Animated Super Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#005f73]/10 via-[#0a9396]/15 to-[#005f73]/10 border border-[#005f73]/30 text-[#005f73] text-[11px] sm:text-xs font-extrabold tracking-wider uppercase shadow-sm mb-3.5 sm:mb-4.5">
            <Sparkles className="w-3.5 h-3.5 text-[#005f73] animate-spin" style={{ animationDuration: '6s' }} />
            <span>{activeSlide.badge}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          {/* Main Trendy Headline with Dynamic Rotating Words */}
          <h1 className="text-3xl sm:text-5xl lg:text-[44px] xl:text-[52px] 2xl:text-[58px] font-black text-slate-900 tracking-tight leading-[1.14] drop-shadow-sm font-trendy min-h-[90px] sm:min-h-[120px] lg:min-h-[135px]">
            <span>{activeSlide.titlePrefix}</span>
            <br className="hidden sm:inline" />
            <span className="relative inline-block mt-0.5 sm:mt-1">
              <span
                className={`inline-block bg-gradient-to-r from-[#002f43] via-[#005f73] via-[#0077b6] to-[#0a9396] bg-clip-text text-transparent transition-all duration-300 transform ${
                  isWordFading ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
                }`}
              >
                {activeSlide.rotatingWords[wordIdx]}
              </span>
            </span>
          </h1>

          {/* Neatly Aligned Subheading / Value Proposition */}
          <p className="text-sm sm:text-base lg:text-[16.5px] xl:text-[17.5px] text-slate-600 font-normal mt-3 sm:mt-4 leading-relaxed max-w-xl lg:max-w-2xl drop-shadow-sm">
            {activeSlide.description}
          </p>

          {/* 100% Animated CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 pt-5 sm:pt-6 w-full sm:w-auto">
            <button
              onClick={() => onOpenOrder(activeSlide.orderProduct)}
              className="relative group overflow-hidden px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#002f43] via-[#005f73] to-[#0a9396] hover:from-[#002231] hover:to-[#004e5a] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-[#005f73]/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2.5 font-trendy"
            >
              {/* Shimmer sweep effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <span className="relative z-10">{activeSlide.primaryBtnText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform relative z-10" />
            </button>

            <button
              onClick={onExploreProducts}
              className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm tracking-wider uppercase border-2 border-slate-300 hover:border-[#005f73] hover:text-[#005f73] shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer text-center font-trendy"
            >
              {activeSlide.secondaryBtnText}
            </button>
          </div>

          {/* Trust Guarantees Footer Bar */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 sm:mt-8 pt-4 border-t border-slate-200/80 text-slate-600 text-xs sm:text-[13px] font-semibold w-full">
            {activeSlide.trustPoints.map((point, pIdx) => (
              <div key={pIdx} className="flex items-center gap-1.5">
                {point.icon === 'warranty' && <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />}
                {point.icon === 'install' && <Droplets className="w-4 h-4 text-[#005f73] shrink-0" />}
                {point.icon === 'rating' && <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />}
                {point.icon === 'chip' && <Cpu className="w-4 h-4 text-cyan-600 shrink-0" />}
                <span>{point.text}</span>
              </div>
            ))}
          </div>

        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: 3D MASCOT WITH RESPECTIVE PURIFIERS & FLOATING PILLS      */}
        {/* ======================================================================= */}
        <div className="w-full lg:w-[50%] flex flex-col items-center justify-end self-end relative mt-auto z-20">
          
          {/* Main 3D Floating Avatar Container (Anchored at Column Bottom) */}
          <div
            className={`relative w-full max-w-[480px] sm:max-w-[560px] md:max-w-[620px] lg:max-w-[680px] xl:max-w-[730px] flex flex-col items-center justify-end animate-float-mascot transition-all duration-300 ${
              isSlideTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            
            {/* Top-Left Floating Purifier Badge */}
            <div
              className={`absolute top-4 sm:top-5 -left-2 sm:-left-4 lg:-left-6 z-30 px-3 py-1.5 rounded-2xl bg-white/95 border shadow-lg flex items-center gap-2 backdrop-blur-md animate-bounce ${activeSlide.badgeLeft.borderColor}`}
              style={{ animationDuration: '4s' }}
            >
              <span className={`w-2 h-2 rounded-full animate-ping shrink-0 ${activeSlide.badgeLeft.dotColor}`} />
              <div className="text-left">
                <div className={`text-[11px] sm:text-xs font-black uppercase tracking-wide font-trendy ${activeSlide.badgeLeft.titleColor}`}>
                  {activeSlide.badgeLeft.title}
                </div>
                <div className="text-[9px] sm:text-[10px] font-semibold text-slate-500">
                  {activeSlide.badgeLeft.subtitle}
                </div>
              </div>
            </div>

            {/* Top-Right Floating Purifier Badge */}
            <div
              className={`absolute top-8 sm:top-10 -right-2 sm:-right-4 lg:-right-6 z-30 px-3 py-1.5 rounded-2xl bg-white/95 border shadow-lg flex items-center gap-2 backdrop-blur-md animate-bounce ${activeSlide.badgeRight.borderColor}`}
              style={{ animationDuration: '4.6s', animationDelay: '1s' }}
            >
              <span className={`w-2 h-2 rounded-full animate-ping shrink-0 ${activeSlide.badgeRight.dotColor}`} />
              <div className="text-left">
                <div className={`text-[11px] sm:text-xs font-black uppercase tracking-wide font-trendy ${activeSlide.badgeRight.titleColor}`}>
                  {activeSlide.badgeRight.title}
                </div>
                <div className="text-[9px] sm:text-[10px] font-semibold text-slate-500">
                  {activeSlide.badgeRight.subtitle}
                </div>
              </div>
            </div>

            {/* 3D Mascot Image with Image Anchored at Column Bottom */}
            <img
              key={activeSlide.mascotImage}
              src={activeSlide.mascotImage}
              alt={activeSlide.mascotAlt}
              className="w-full h-auto max-h-[460px] sm:max-h-[530px] md:max-h-[600px] lg:max-h-[640px] xl:max-h-[690px] object-contain drop-shadow-[0_20px_35px_rgba(0,53,84,0.18)] hover:scale-[1.02] transition-transform duration-500 cursor-pointer block"
              onClick={() => onOpenOrder(activeSlide.orderProduct)}
            />

            {/* Realistic Floating Ground Contact Shadow */}
            <div className="w-[82%] h-6 bg-slate-900/15 rounded-[100%] blur-md -mt-2.5 pointer-events-none animate-shadow-scale" />

            {/* Bottom Centered Floating Trust Badge */}
            <div className="relative -mt-3.5 z-30 px-4 py-2 rounded-full bg-slate-900 text-white shadow-xl flex items-center gap-2 text-xs font-bold whitespace-nowrap border border-slate-700 font-trendy animate-in fade-in slide-in-from-bottom-2 duration-700 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{activeSlide.badgeBottom}</span>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. SLIDE CONTROLS: PREV / NEXT ARROWS & MINIMAL PILL PAGINATION           */}
      {/* ========================================================================= */}
      {/* Desktop Prev / Next Navigation Arrows */}
      <div className="hidden lg:flex items-center gap-2 absolute bottom-6 right-10 z-30">
        <button
          onClick={handlePrevSlide}
          aria-label="Previous Slide"
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#005f73] border border-slate-200/80 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNextSlide}
          aria-label="Next Slide"
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#005f73] border border-slate-200/80 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Centered Minimal Pill Slide Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/80 shadow-sm">
        <span className="text-[11px] font-bold text-slate-400">
          0{currentSlide + 1}
        </span>
        <div className="flex items-center gap-1.5">
          {BANNER_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => handleSelectSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === idx
                  ? 'w-7 h-2.5 bg-gradient-to-r from-[#005f73] to-[#0a9396] shadow-sm'
                  : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] font-bold text-slate-500">
          0{BANNER_SLIDES.length}
        </span>
      </div>

    </section>
  );
};
