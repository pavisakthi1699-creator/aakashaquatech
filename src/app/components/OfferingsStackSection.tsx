import React, { useRef, useState, useEffect } from 'react';
import { 
  Droplets, 
  ShieldCheck, 
  Check, 
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowDown
} from 'lucide-react';
import { assetUrl } from '../utils/asset';

interface OfferingsStackSectionProps {
  onOpenQuote: (serviceName?: string) => void;
  activeCardIndex: number;
  onCardChange: (index: number) => void;
  onNextCard?: () => void;
  onPrevCard?: () => void;
}

interface OfferingCardData {
  number: string;
  categoryLabel: string;
  title: string;
  p1: string;
  p2?: string;
  highlights: string[];
  tags: string[];
  image: string;
}

export const OfferingsStackSection: React.FC<OfferingsStackSectionProps> = ({
  onOpenQuote,
  activeCardIndex,
  onCardChange,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [cardTextVisible, setCardTextVisible] = useState(false);

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

  useEffect(() => {
    if (isInView) {
      setCardTextVisible(false);
      const timer = setTimeout(() => {
        setCardTextVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setCardTextVisible(false);
    }
  }, [activeCardIndex, isInView]);

  // Dedicated wheel & touch listener on the section:
  // Scrolls through card 1 to 7 one by one. On card 7, scrolls down to the next section.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isLocked = false;
    let lockTimer: any = null;

    const handleSectionWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 14) return;

      if (e.deltaY > 14) {
        // Scrolling DOWN
        if (activeCardIndex < 6) {
          // Cards 0..5 (Card 1 through Card 6) -> advance 1 by 1
          e.preventDefault();
          e.stopPropagation();
          if (isLocked) return;
          isLocked = true;
          onCardChange(activeCardIndex + 1);
          lockTimer = setTimeout(() => { isLocked = false; }, 380);
        } else {
          // On Card 7 (index 6, the 7th card): All 7 cards complete!
          // Scroll down to next section (#google-reviews)
          e.preventDefault();
          e.stopPropagation();
          if (isLocked) return;
          isLocked = true;
          const nextSec = document.getElementById('google-reviews');
          if (nextSec) {
            nextSec.scrollIntoView({ behavior: 'smooth' });
          }
          lockTimer = setTimeout(() => { isLocked = false; }, 850);
        }
      } else if (e.deltaY < -14) {
        // Scrolling UP
        if (activeCardIndex > 0) {
          // Cards 6..1 -> step back 1 by 1
          e.preventDefault();
          e.stopPropagation();
          if (isLocked) return;
          isLocked = true;
          onCardChange(activeCardIndex - 1);
          lockTimer = setTimeout(() => { isLocked = false; }, 380);
        } else {
          // On Card 1 (index 0): scroll back to About section
          e.preventDefault();
          e.stopPropagation();
          if (isLocked) return;
          isLocked = true;
          const prevSec = document.getElementById('about');
          if (prevSec) {
            prevSec.scrollIntoView({ behavior: 'smooth' });
          }
          lockTimer = setTimeout(() => { isLocked = false; }, 850);
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 35) return;

      if (deltaY > 35) {
        // Swiping UP = Scrolling DOWN
        if (activeCardIndex < 6) {
          onCardChange(activeCardIndex + 1);
        } else {
          const nextSec = document.getElementById('google-reviews');
          if (nextSec) nextSec.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (deltaY < -35) {
        // Swiping DOWN = Scrolling UP
        if (activeCardIndex > 0) {
          onCardChange(activeCardIndex - 1);
        } else {
          const prevSec = document.getElementById('about');
          if (prevSec) prevSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    section.addEventListener('wheel', handleSectionWheel, { passive: false });
    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      section.removeEventListener('wheel', handleSectionWheel);
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchend', handleTouchEnd);
      if (lockTimer) clearTimeout(lockTimer);
    };
  }, [activeCardIndex, onCardChange]);
  const cards: OfferingCardData[] = [
    {
      number: '01',
      categoryLabel: 'AAKASH PURE AQUA TECH',
      title: 'RO Water Purifiers',
      p1: 'Trusted by thousands of customers, Aakash Pure Aqua Tech Pvt. Ltd. provides high-quality RO water purifiers that make your drinking water pure and safe. With advanced purification technologies like RO + UV + UF and Live TDS Display, our systems ensure effective purification while retaining essential natural minerals with Alkaline & Copper technology.',
      p2: 'With features like digital purity display, customers can monitor water quality, filter life, and purification performance in real time. Aakash Pure Aqua Tech is committed to delivering pure and healthy drinking water for every family.',
      highlights: [
        'Advanced RO + UV + UF Multi-Stage Filtration',
        'Live Digital TDS & Real-Time Purity Display',
        'Alkaline & Copper Natural Mineralization',
        'Filter Life & Real-Time Performance Monitoring'
      ],
      tags: ['Alkaline & Copper', 'Live TDS Display', 'Pure & Safe Drinking Water'],
      image: assetUrl('/images/offerings/ro-purifiers.png')
    },
    {
      number: '02',
      categoryLabel: 'AAKASH PURE AQUA TECH',
      title: 'UV Water Purifiers',
      p1: 'Aakash Pure Aqua Tech offers advanced UV Water Purifiers with storage. These purifiers use UV and UF purification technology to remove harmful bacteria, viruses, and cysts, ensuring safe and healthy drinking water for your family.',
      p2: 'With features like digital purity display, customers can monitor water quality, filter life, and purification performance in real time. Aakash Pure Aqua Tech is committed to delivering pure and healthy drinking water for every family.',
      highlights: [
        'Advanced UV & UF Technology with Inbuilt Storage',
        'Removes Harmful Bacteria, Viruses, and Cysts',
        'Real-Time Filter Life & Purity Digital Monitoring',
        'Retains Essential Natural Electrolytes & Minerals'
      ],
      tags: ['UV + UF Storage', 'Bacteria & Virus Free', 'Digital Purity Display'],
      image: assetUrl('/images/offerings/uv-purifiers.png')
    },
    {
      number: '03',
      categoryLabel: 'AAKASH PURE AQUA TECH',
      title: 'Gravity Water Purifiers',
      p1: 'Aakash Pure Aqua Tech offers high-quality non-electric gravity water purifiers that use the natural force of gravity to remove suspended impurities, bacteria, and cysts from water. These purifiers provide safe and pure drinking water, making them an ideal solution for areas with limited electricity.',
      highlights: [
        '100% Non-Electric Natural Force of Gravity',
        'Removes Suspended Impurities, Bacteria & Cysts',
        'Safe, Pure & Healthy Drinking Water Anywhere',
        'Ideal Solution for Areas with Limited Electricity'
      ],
      tags: ['Non-Electric', 'Natural Force of Gravity', 'Power-Free Solution'],
      image: assetUrl('/images/offerings/gravity-purifiers.png')
    },
    {
      number: '04',
      categoryLabel: 'AAKASH PURE AQUA TECH',
      title: 'Home Water Structuring Device',
      p1: 'The Enviro Water Structuring Device is a fully automatic, maintenance-free water conditioning solution that helps reduce the scale-forming properties of hard water. It minimizes mineral deposits in pipelines, plumbing systems, boilers, cooling towers, and other water-based equipment.',
      p2: 'Operating without electricity, chemicals, salt, filters, or replacement parts, it offers an eco-friendly and cost-effective solution for protecting water systems from hard water scaling.',
      highlights: [
        'Fully Automatic & Maintenance-Free Conditioning',
        'Minimizes Mineral Deposits in Pipelines & Boilers',
        'Zero Electricity, Chemicals, Salt, Filters, or Spares',
        'Eco-Friendly Solution for Hard Water Scaling'
      ],
      tags: ['Enviro Anti-Scale', 'Zero Chemicals & Salt', 'Maintenance-Free'],
      image: assetUrl('/images/offerings/home-structuring.png')
    },
    {
      number: '05',
      categoryLabel: 'AAKASH PURE AQUA TECH',
      title: 'SS Dispenser',
      p1: 'Trusted by leading corporates including Foxconn, Qualcomm, Hyundai, Yamaha, Ola, MRF, Amara Raja, Ford, LGB, TVS Group and Ashok Leyland across India. Successfully installed water purifier-cum-dispensers at 5 ISRO centres and 16 international airports.',
      p2: 'India’s only water dispenser manufacturer with BIS License across its entire dispenser range. Offers 100+ customized water dispenser solutions for schools, colleges, hospitals, industries, offices, and public spaces.',
      highlights: [
        'Trusted by Foxconn, Hyundai, Yamaha, TVS & Ashok Leyland',
        'Installed at 5 ISRO Centres & 16 International Airports',
        'India’s Only Manufacturer with BIS License Across Range',
        '100+ Customized Dispenser Solutions Built to Last'
      ],
      tags: ['BIS Licensed', '5 ISRO Centres & 16 Airports', 'Corporate Trust'],
      image: assetUrl('/images/offerings/ss-dispenser.png')
    },
    {
      number: '06',
      categoryLabel: 'AAKASH PURE AQUA TECH',
      title: 'Alkaline Water Filter Pitcher',
      p1: 'Zerob Alkaline Water Filter Pitchers transform your regular drinking water into healthy alkaline water with enhanced mineral balance. Designed to increase the pH level up to 9.5, they help reduce acidity, support better hydration, and promote overall well-being.',
      p2: 'Enjoy fresh, healthy, and great-tasting alkaline water every day for you and your family.',
      highlights: [
        'Transforms Drinking Water into Healthy Alkaline Water',
        'Increases pH Level Up to 9.5 with Enhanced Minerals',
        'Helps Reduce Acidity & Supports Superior Hydration',
        'Fresh, Healthy & Great-Tasting Daily Hydration'
      ],
      tags: ['pH Level Up to 9.5', 'Enhanced Minerals', 'Reduces Acidity'],
      image: assetUrl('/images/offerings/alkaline-pitcher.png')
    },
    {
      number: '07',
      categoryLabel: 'AAKASH PURE AQUA TECH',
      title: 'Under Sink',
      p1: 'Aakash Pure Aqua Tech’s Under Sink Water Purifiers provide pure, healthy drinking water while staying neatly hidden beneath your kitchen sink. Advanced RO, UV, and UF technologies remove harmful contaminants, bacteria, and viruses for safe everyday use.',
      p2: 'The space-saving design keeps your kitchen clutter-free while delivering fresh water through a dedicated faucet. Ideal for homes, apartments, and offices using borewell, tanker, or municipal water sources.',
      highlights: [
        'Neatly Hidden Beneath Your Kitchen Sink',
        'Space-Saving Design Keeps Kitchen Completely Clutter-Free',
        'Advanced RO, UV & UF Multi-Stage Filtration',
        'Delivers Fresh Water Through Dedicated Modern Faucet'
      ],
      tags: ['Space-Saving Design', 'Dedicated Faucet', 'Clutter-Free Kitchen'],
      image: assetUrl('/images/offerings/under-sink.png')
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="offerings-section" 
      // Background uses the exact brand text ocean teal gradient: from-[#003d47] via-[#005f73] via-[#006f7d] to-[#004e5a]
      className="snap-screen relative w-full min-h-[100dvh] flex flex-col justify-center items-center pt-[115px] sm:pt-[125px] pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#003d47] via-[#005f73] via-[#006f7d] to-[#004e5a] border-y border-teal-800/40 overflow-hidden select-none font-trendy"
    >
      {/* Ambient Water Caustics Glow Lighting */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-400/15 blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-teal-300/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
      </div>

      {/* Increased Width Container: Max-w-[1360px] */}
      <div className="max-w-[1360px] w-full mx-auto relative z-10 flex flex-col justify-center">
        
        {/* Simple & Clean Heading: Only "What We Offer" with brand underline */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2 
            className={`text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-tight drop-shadow-md transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            What We <span className="text-cyan-300 drop-shadow-[0_2px_12px_rgba(103,232,249,0.5)]">Offer</span>
          </h2>
          <div 
            className={`w-20 h-1 bg-gradient-to-r from-cyan-400 to-teal-300 mx-auto mt-2.5 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.6)] transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          />
        </div>

        {/* Increased Width Card Container (Next card is hidden; only animates in on scroll) */}
        <div className="relative w-full h-[540px] sm:h-[560px] lg:h-[590px]">
          {cards.map((card, index) => {
            const isPast = index < activeCardIndex;
            const isCurrent = index === activeCardIndex;
            const isFuture = index > activeCardIndex;

            // STRICT SINGLE CARD VIEW:
            // Below card is COMPLETELY HIDDEN with opacity 0 (NO peeking below!)
            // Only when user scrolls, the card glides up into active view!
            let transform = 'translateY(90px) scale(0.95)';
            let zIndex = 0;
            let opacity = 0;
            let pointerEvents: 'auto' | 'none' = 'none';

            if (isPast) {
              const dist = activeCardIndex - index;
              transform = `translateY(-${dist * 10}px) scale(${1 - dist * 0.02})`;
              zIndex = index;
              opacity = Math.max(0, 0.22 - dist * 0.1);
              pointerEvents = 'none';
            } else if (isCurrent) {
              transform = 'translateY(0px) scale(1)';
              zIndex = 30;
              opacity = 1;
              pointerEvents = 'auto';
            } else if (isFuture) {
              transform = 'translateY(90px) scale(0.95)';
              zIndex = 0;
              opacity = 0;
              pointerEvents = 'none';
            }

            const isCardActive = isCurrent && cardTextVisible;

            return (
              <div
                key={card.number}
                style={{
                  transform,
                  zIndex,
                  opacity,
                  pointerEvents,
                  boxShadow: isCurrent 
                    ? '0 30px 65px -15px rgba(0, 20, 30, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.8)'
                    : 'none'
                }}
                className="absolute inset-0 rounded-[32px] sm:rounded-[38px] bg-white border border-slate-100 p-6 sm:p-8 lg:p-9 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between"
              >
                {/* ========================================================================= */}
                {/* CARD HEADER ROW: EXACT MATCH TO ATTACHED DESIGN                           */}
                {/* LEFT: 01 + (CATEGORY / TITLE)  |  RIGHT: SHOP NOW BUTTON                  */}
                {/* ========================================================================= */}
                <div className="flex items-center justify-between gap-4 pb-3.5 border-b border-slate-100 shrink-0">
                  
                  {/* Left: Giant Number + Stacked Category/Title */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span 
                      className={`font-anton text-4xl sm:text-5xl lg:text-6xl text-[#005f73] tracking-normal leading-none select-none transition-all duration-700 ease-out ${
                        isCardActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90'
                      }`}
                      style={{ transitionDelay: '100ms' }}
                    >
                      {card.number}
                    </span>

                    <div className="flex flex-col">
                      <span 
                        className={`text-[10px] sm:text-[11.5px] font-bold text-slate-400 uppercase tracking-widest leading-tight transition-all duration-700 ease-out ${
                          isCardActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                        }`}
                        style={{ transitionDelay: '180ms' }}
                      >
                        {card.categoryLabel}
                      </span>
                      <h3 
                        className={`text-lg sm:text-2xl lg:text-[27px] font-black text-slate-900 tracking-tight leading-snug transition-all duration-700 ease-out ${
                          isCardActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                        style={{ transitionDelay: '250ms' }}
                      >
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right: Shop Now Button (Matching screenshot button: "Shop Now") */}
                  <button
                    onClick={() => onOpenQuote(card.title)}
                    className={`shrink-0 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border-2 border-[#005f73] bg-[#005f73] hover:bg-[#004e5a] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-all duration-700 shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 ${
                      isCardActive ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-6 scale-95'
                    }`}
                    style={{ transitionDelay: '300ms' }}
                  >
                    <span>Shop Now</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                </div>

                {/* ========================================================================= */}
                {/* CARD BODY: AUTHENTIC TEXT + CHECKMARKS ON LEFT, PRODUCT IMAGE ON RIGHT     */}
                {/* ========================================================================= */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 flex-1 pt-3.5 overflow-hidden items-center">
                  
                  {/* Left Side (7.5 Cols): Authentic Description Text & Key Highlights */}
                  <div className="md:col-span-8 flex flex-col justify-between h-full py-0.5 overflow-y-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    
                    {/* Paragraph 1 */}
                    <div className="space-y-2">
                      <p 
                        className={`text-xs sm:text-[13px] lg:text-[13.5px] text-slate-700 leading-relaxed font-normal text-justify transition-all duration-700 ease-out ${
                          isCardActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                        style={{ transitionDelay: '360ms' }}
                      >
                        {card.p1}
                      </p>

                      {/* Paragraph 2 if present */}
                      {card.p2 && (
                        <p 
                          className={`text-xs sm:text-[13px] lg:text-[13.5px] text-slate-600 leading-relaxed font-normal text-justify transition-all duration-700 ease-out ${
                            isCardActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                          }`}
                          style={{ transitionDelay: '430ms' }}
                        >
                          {card.p2}
                        </p>
                      )}
                    </div>

                    {/* Bullet Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2.5 my-auto">
                      {card.highlights.map((highlight, idx) => (
                        <div 
                          key={idx} 
                          className={`flex items-start gap-2.5 py-1.5 px-2.5 rounded-xl bg-[#edf6f9]/60 border border-[#cfe5eb]/70 transition-all duration-600 ease-out ${
                            isCardActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'
                          }`}
                          style={{ transitionDelay: `${480 + idx * 70}ms` }}
                        >
                          <div className="mt-0.5 rounded-full p-0.5 bg-[#005f73] text-white shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="text-[11px] sm:text-[11.5px] text-slate-800 font-semibold leading-snug">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tags Row */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {card.tags.map((tag, tagIdx) => (
                        <span 
                          key={tagIdx}
                          className={`text-[10.5px] font-bold px-3 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 transition-all duration-600 ease-out ${
                            isCardActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
                          }`}
                          style={{ transitionDelay: `${480 + card.highlights.length * 70 + tagIdx * 50}ms` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Right Side (4 Cols): Large Product Showcase Box */}
                  <div 
                    className={`md:col-span-4 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-[#edf6f9]/60 border border-slate-200/90 p-4 sm:p-6 flex items-center justify-center h-full relative overflow-hidden group transition-all duration-800 ease-out ${
                      isCardActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                    }`}
                    style={{ transitionDelay: '320ms' }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-cyan-100/60 blur-2xl pointer-events-none" />
                    
                    <img
                      src={card.image}
                      alt={card.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const fallbacks: Record<string, string> = {
                          '01': 'https://aakashaquatech.in/wp-content/uploads/2026/08/IMG_7780-600x331.png',
                          '02': 'https://aakashaquatech.in/wp-content/uploads/2026/08/IMG_7787-scaled-e1785863931797-600x302.png',
                          '03': 'https://aakashaquatech.in/wp-content/uploads/2026/08/IMG_7788-300x300.png',
                          '04': 'https://aakashaquatech.in/wp-content/uploads/2026/08/IMG_7790-600x600.png',
                          '05': 'https://aakashaquatech.in/wp-content/uploads/2026/08/IMG_7782-600x600.png',
                          '06': 'https://aakashaquatech.in/wp-content/uploads/2026/08/IMG_7784-300x300.png',
                          '07': 'https://aakashaquatech.in/wp-content/uploads/2026/08/IMG_7778-600x329.png'
                        };
                        if (fallbacks[card.number] && target.src !== fallbacks[card.number]) {
                          target.src = fallbacks[card.number];
                        }
                      }}
                      className="max-h-[220px] sm:max-h-[260px] lg:max-h-[280px] w-auto max-w-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl relative z-10"
                    />
                  </div>

                </div>

                {/* Bottom Card Stepper Bar */}
                <div 
                  className={`pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0 transition-all duration-700 ease-out ${
                    isCardActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                  style={{ transitionDelay: '750ms' }}
                >
                  {/* Left: Interactive Dots */}
                  <div className="flex items-center gap-2">
                    {cards.map((c, dotIdx) => (
                      <button
                        key={c.number}
                        onClick={(e) => {
                          e.stopPropagation();
                          onCardChange(dotIdx);
                        }}
                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          dotIdx === activeCardIndex
                            ? 'w-8 bg-[#005f73]'
                            : 'w-2 bg-slate-300 hover:bg-slate-500'
                        }`}
                        title={`Go to ${c.title}`}
                      />
                    ))}
                  </div>

                  {/* Center: Scroll Guidance Hint */}
                  <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                    {activeCardIndex < 6 ? (
                      <>
                        <span>Scroll down for next card</span>
                        <ChevronDown className="w-3.5 h-3.5 text-[#005f73] animate-bounce" />
                      </>
                    ) : (
                      <>
                        <span className="text-[#005f73] font-bold">Card 7 of 7 Complete • Scroll down for Client Reviews</span>
                        <ArrowDown className="w-3.5 h-3.5 text-[#005f73] animate-bounce" />
                      </>
                    )}
                  </div>

                  {/* Right: Stepper buttons & Card counter */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activeCardIndex > 0) {
                          onCardChange(activeCardIndex - 1);
                        } else {
                          const el = document.getElementById('about');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="p-1 rounded-full hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                      title={activeCardIndex > 0 ? "Previous Card" : "Back to About Us"}
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span className="font-mono text-xs font-bold text-slate-700">
                      {activeCardIndex + 1} / {cards.length}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activeCardIndex < 6) {
                          onCardChange(activeCardIndex + 1);
                        } else {
                          const el = document.getElementById('google-reviews');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="p-1 rounded-full hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                      title={activeCardIndex < 6 ? "Next Card" : "Continue to Reviews Section"}
                      aria-label="Next"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
