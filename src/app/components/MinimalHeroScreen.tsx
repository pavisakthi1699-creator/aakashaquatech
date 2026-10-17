import React, { useState, useRef } from 'react';
import { User, ShoppingCart, Search, ChevronDown } from 'lucide-react';
import { WaterRippleEffect } from './WaterRippleEffect';
import { AnimatedWaterBubbles } from './AnimatedWaterBubbles';
import { assetUrl } from '../utils/asset';
import { HeaderMegaMenu } from './HeaderMegaMenu';
import { MEGA_MENUS } from '../data/megaMenuData';
import { menu, hrefOf, u as dataImg } from '../../hpa/data.js';
import { navigate } from '../../hpa/router.js';
import { UniversalHeader } from './UniversalHeader';

interface MinimalHeroScreenProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenLogin: () => void;
  onOpenSearch?: () => void;
  onOpenOrder: (productName?: string) => void;
  onSelectNav: (item: string) => void;
  onSelectCategory?: (category: string) => void;
  onScrollNext?: () => void;
  isGhost?: boolean;
  isActive?: boolean;
  currentSlideIndex?: number;
  onSlideChange?: (idx: React.SetStateAction<number>) => void;
}

interface HeroSlide {
  id: string;
  name: string;
  src: string;
  category: string;
  tag: string;
  specs: string;
}

const panel1Products: HeroSlide[] = [
  {
    id: '01',
    name: 'Kent Grand Plus Multi-Stage RO',
    src: assetUrl('/images/panel1/kent-grand-plus-white.png'),
    category: 'Home purification',
    tag: 'GRAND PLUS',
    specs: 'RO + UV + UF + TDS Alkaline Copper Mineral RO',
  },
  {
    id: '02',
    name: 'Aqua Emerald Mineral RO',
    src: assetUrl('/images/panel1/green.png'),
    category: 'Home purification',
    tag: 'EMERALD GREEN',
    specs: 'Eco Mineral Balance RO with UV Sterilization',
  },
  {
    id: '03',
    name: 'Kent Pearl Star IoT Mineral RO',
    src: assetUrl('/images/panel1/kent-pearl-star-iot.png'),
    category: 'Home purification',
    tag: 'PEARL STAR IOT',
    specs: 'Smart WiFi IoT Mobile Connected RO with Digital Purity Monitor',
  },
  {
    id: '04',
    name: 'Kent Sapphire IoT Smart RO',
    src: assetUrl('/images/panel1/kent-sapphire-iot.png'),
    category: 'Home purification',
    tag: 'SAPPHIRE IOT',
    specs: 'Wall Mounted Digital Display Pure Alkaline RO',
  },
  {
    id: '05',
    name: 'Kent Sapphire Classic Multi-Stage RO',
    src: assetUrl('/images/panel1/kent-sapphire.png'),
    category: 'Home purification',
    tag: 'SAPPHIRE CLASSIC',
    specs: 'High Recovery Zero Water Wastage RO Technology',
  },
  {
    id: '06',
    name: 'Kent Sterling Under-the-Counter Smart RO',
    src: assetUrl('/images/panel1/kent-sterling-iot.png'),
    category: 'Home purification',
    tag: 'STERLING IOT',
    specs: 'Compact Under-Sink Stainless Steel Faucet RO Unit',
  },
  {
    id: '07',
    name: 'Aakash Ruby Multi-Mineral RO',
    src: assetUrl('/images/panel1/red.png'),
    category: 'Home purification',
    tag: 'RUBY MINERAL',
    specs: 'Multi-Stage Active Mineralizer with Active Copper',
  },
  {
    id: '08',
    name: 'Aakash Diamond Pearl Wall RO',
    src: assetUrl('/images/panel1/white-6.png'),
    category: 'Home purification',
    tag: 'DIAMOND PEARL',
    specs: 'Sleek Aesthetic Gloss White Transparent Tank RO',
  },
  {
    id: '09',
    name: 'Aakash Pure Stream Sleek RO',
    src: assetUrl('/images/panel1/white.png'),
    category: 'Home purification',
    tag: 'PURE STREAM',
    specs: 'Ultra-Slim Rapid Flow Direct Drinking Water Purifier',
  },
];

const categories = ['Home purification', 'Commercial solutions', 'Service & support'];

export const MinimalHeroScreen: React.FC<MinimalHeroScreenProps> = ({
  cartCount,
  onOpenCart,
  onOpenLogin,
  onOpenSearch,
  onOpenOrder,
  onSelectNav,
  onSelectCategory,
  onScrollNext,
  isGhost = false,
  isActive = true,
  currentSlideIndex: controlledIndex,
  onSlideChange,
}) => {
  const [internalSlideIndex, setInternalSlideIndex] = React.useState(0);
  const [headerOpen, setHeaderOpen] = useState(false);
  const [headerDd, setHeaderDd] = useState<number | null>(null);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoDone, setDemoDone] = useState(false);
  const [demoFormErr, setDemoFormErr] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState<'domestic-ro' | 'water-treatment' | null>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDemoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const d = Object.fromEntries(new FormData(f)) as Record<string, string>;
    if (!/^[6-9]\d{9}$/.test(d.phone || '')) {
      setDemoFormErr('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!/^\d{6}$/.test(d.pin || '')) {
      setDemoFormErr('Please enter a valid 6-digit pin code.');
      return;
    }
    setDemoFormErr('');
    const text = `Free demo request\nName: ${d.first} ${d.last}\nMobile: ${d.phone}\nCity: ${d.city} - ${d.pin}\nInterested in: ${d.need}\nAddress: ${d.address}`;
    window.open(`https://wa.me/919655599666?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setDemoDone(true);
  };

  const currentSlideIndex = controlledIndex !== undefined ? controlledIndex : internalSlideIndex;
  const setCurrentSlideIndex = (val: React.SetStateAction<number>) => {
    if (onSlideChange) {
      onSlideChange(val);
    } else {
      setInternalSlideIndex(val);
    }
  };

  const handleNavMouseEnter = (item: string) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    if (item === 'Domestic Ro') {
      setActiveMegaMenu('domestic-ro');
    } else if (item === 'Water Treatment Plant') {
      setActiveMegaMenu('water-treatment');
    } else {
      setActiveMegaMenu(null);
    }
  };

  const handleNavMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 220);
  };

  const handleMegaMenuMouseEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
  };

  const handleMegaMenuMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  // Preload all purifier images for instant, smooth 1-second cycling
  React.useEffect(() => {
    panel1Products.forEach((p) => {
      const img = new Image();
      img.src = p.src;
    });
  }, []);

  // Auto-slide to next product every 3 seconds: only product slides, 3 sec timer
  React.useEffect(() => {
    if (isGhost || !isActive) return;

    const timer = setInterval(() => {
      if (onSlideChange) {
        onSlideChange((prev) => (prev + 1) % panel1Products.length);
      } else {
        setInternalSlideIndex((prev) => (prev + 1) % panel1Products.length);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [isGhost, isActive, onSlideChange]);

  const navItems = [
    'Domestic Ro',
    'SS Dispenser',
    'Commercial RO System',
    'Water Treatment Plant',
    'Spares',
    'Heat Pump',
    'About',
    'Contact',
  ];

  // ONE-SCROLL CONTROLLER: A single scroll down immediately transitions from Panel 1 to Panel 2
  React.useEffect(() => {
    if (isGhost || !isActive) return;

    let isLocked = false;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 15) return;
      if (isLocked) return;

      // Scroll Down -> Immediately go to Panel 2
      if (e.deltaY > 15 && onScrollNext) {
        isLocked = true;
        onScrollNext();
        setTimeout(() => {
          isLocked = false;
        }, 1200);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      // Touch swipe up -> Immediately go to Panel 2
      if (deltaY > 35 && !isLocked && onScrollNext) {
        isLocked = true;
        onScrollNext();
        setTimeout(() => {
          isLocked = false;
        }, 1200);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onScrollNext, isGhost, isActive]);

  const currentProduct = panel1Products[currentSlideIndex];

  return (
    <div
      className={`min-h-screen h-screen w-full flex flex-col justify-between overflow-hidden select-none relative font-sans ${
        isGhost ? 'pointer-events-none' : 'cursor-none'
      }`}
      style={{
        background: 'linear-gradient(135deg, #4ecbc2 0%, #6fd8bd 28%, #93e3b5 60%, #86d884 100%)',
      }}
      aria-hidden={isGhost}
    >
      {/* ========================================================================= */}
      {/* 1. INTERACTIVE WATER RIPPLE HOVER EFFECT (WEBGL / BRADLEY STALLCUP STYLE)  */}
      {/* ========================================================================= */}
      {!isGhost && <WaterRippleEffect />}

      {/* 2. LIVING 3D WATER BUBBLES ANIMATION OVERLAY */}
      <AnimatedWaterBubbles />

      {/* Subtle soft ambient water orbs from Screenshot 1 */}
      <div className="absolute left-[6%] bottom-[12%] w-4 h-4 rounded-full bg-white/45 blur-[0.8px] pointer-events-none z-10" />
      <div className="absolute left-[26%] bottom-[2%] w-8 h-8 rounded-full bg-white/35 blur-[1.5px] pointer-events-none z-10" />
      <div className="absolute left-[79%] bottom-[1%] w-5 h-5 rounded-full bg-white/30 blur-[1px] pointer-events-none z-10" />

      {/* Ambient Top Light Beam for Depth */}
      <div className="absolute top-[0%] left-[50%] -translate-x-1/2 w-[650px] h-[350px] rounded-full bg-white/20 blur-[120px] pointer-events-none z-[5]" />



      {/* ========================================================================= */}
      {/* 3. TOP HEADER (PANEL 1 HEADER USED SITE-WIDE VIA UNIVERSALHEADER)         */}
      {/* ========================================================================= */}
      <UniversalHeader
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        onOpenLogin={onOpenLogin}
        onOpenSearch={onOpenSearch}
        onSelectNav={(item) => {
          if (item === 'Home') {
            setCurrentSlideIndex(0);
          } else if (onSelectNav) {
            onSelectNav(item);
          }
        }}
        isSticky={false}
      />

      {/* ========================================================================= */}
      {/* 4. MAIN STAGE: PERFECT HORIZONTAL & VERTICAL CENTER ALIGNMENT              */}
      {/* LEFT: "Aakash Pure" (Center Aligned)                                      */}
      {/* CENTER: PRODUCT SLIDE (Equally Center Aligned to Brand Titles)            */}
      {/* RIGHT: "Aqua Tech Pvt Ltd" (Center Aligned)                               */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full max-w-[1750px] mx-auto relative flex flex-col lg:flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-5 xl:gap-6 px-4 z-20 select-none">
        
        {/* LEFT COLUMN: Aakash Pure (Centered with Product) */}
        <div className="flex flex-col items-center justify-center text-center select-none z-20 shrink-0">
          <h1
            className="font-extrabold tracking-[-0.035em] text-[#155e63] drop-shadow-[0_2px_8px_rgba(21,94,99,0.12)] whitespace-nowrap text-center"
            style={{
              fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(5.5rem, 11vw, 12rem)',
              lineHeight: 0.95,
              margin: 0,
              paddingBottom: '0.04em',
              letterSpacing: '-0.035em',
              fontWeight: 800,
              overflow: 'visible',
            }}
          >
            Aakash
          </h1>
          <span
            className="font-medium tracking-[0.03em] text-[#155e63] mt-1.5 sm:mt-2 whitespace-nowrap text-center"
            style={{
              fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 3.6vw, 3.8rem)',
              lineHeight: 1.1,
              margin: 0,
              fontWeight: 500,
            }}
          >
            Pure
          </span>
        </div>

        {/* CENTER COLUMN: PRODUCT SLIDES (Equally and Vertically Centered to Brand Titles) */}
        <div className="shrink-0 flex items-center justify-center relative z-20 px-0 sm:px-1 my-2 lg:my-0">
          <div
            className="relative flex flex-col items-center justify-center cursor-pointer group"
            onClick={() => setDemoModalOpen(true)}
          >
            {/* Product Sliding Viewport: Centered and matched */}
            <div className="relative overflow-hidden w-[280px] sm:w-[330px] md:w-[370px] lg:w-[400px] xl:w-[430px] h-[48vh] sm:h-[54vh] md:h-[60vh] lg:h-[64vh] max-h-[600px] flex items-center justify-center">
              <div
                className="flex h-full w-full items-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
                style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
              >
                {panel1Products.map((product) => (
                  <div
                    key={product.id}
                    className="w-full h-full shrink-0 flex items-center justify-center"
                  >
                    <img
                      src={product.src}
                      alt={product.name}
                      className="max-h-[92%] w-auto max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.08] group-hover:-translate-y-2 pointer-events-none select-none drop-shadow-2xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Aqua Tech Pvt Ltd (Centered with Product & Full Q Descender Visible) */}
        <div className="flex flex-col items-center justify-center text-center select-none z-20 shrink-0">
          <h2
            className="font-extrabold tracking-[-0.035em] text-[#2e8540] drop-shadow-[0_2px_8px_rgba(46,133,64,0.12)] whitespace-nowrap text-center"
            style={{
              fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(5.5rem, 11vw, 12rem)',
              lineHeight: 0.95,
              margin: 0,
              paddingBottom: '0.16em',
              letterSpacing: '-0.035em',
              fontWeight: 800,
              overflow: 'visible',
            }}
          >
            Aqua
          </h2>
          <span
            className="font-medium tracking-[0.015em] text-[#2e8540] mt-1.5 sm:mt-2 whitespace-nowrap text-center"
            style={{
              fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(1.75rem, 3.1vw, 3.2rem)',
              lineHeight: 1.1,
              margin: 0,
              fontWeight: 500,
              display: 'inline-block',
            }}
          >
            Tech Pvt Ltd
          </span>
        </div>

      </main>

      {/* ========================================================================= */}
      {/* FLOATING RIGHT-SIDE ATTACHED "BOOK NOW" BUTTON                            */}
      {/* ========================================================================= */}
      <button
        onClick={() => setDemoModalOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-gradient-to-l from-[#173f45] to-[#2b6870] text-white font-bold py-4 px-2.5 sm:px-3 rounded-l-2xl shadow-[-4px_6px_25px_rgba(23,63,69,0.35)] hover:shadow-[-6px_10px_35px_rgba(23,63,69,0.5)] border-y border-l border-white/30 backdrop-blur-md flex flex-col items-center gap-2 cursor-pointer hover:-translate-x-1 transition-all duration-300 group"
        title="Book Free Demo & Water Test"
        aria-label="Book Free Demo"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping mb-1" />
        <span
          className="[writing-mode:vertical-rl] rotate-180 font-extrabold tracking-widest text-[11px] sm:text-xs text-white group-hover:text-cyan-200 transition-colors"
          style={{ letterSpacing: '0.22em' }}
        >
          BOOK NOW
        </span>
      </button>

      {/* ========================================================================= */}
      {/* FLOATING RIGHT-SIDE WHATSAPP BUTTON                                       */}
      {/* ========================================================================= */}
      <a
        href="https://wa.me/919655599666?text=Hello%20Aakash%20Aqua%20Tech%2C%20I%20would%20like%20to%20inquire%20about%20your%20Water%20Purifiers."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp (96555 99666)"
        className="fixed right-5 bottom-5 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white" aria-hidden="true">
          <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.31.65 4.47 1.78 6.31L4 29l7.86-1.75A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.9c-1.98 0-3.83-.55-5.4-1.5l-.39-.23-4.66 1.04 1.06-4.55-.25-.4A9.86 9.86 0 0 1 5.1 15c0-6.01 4.9-10.9 10.9-10.9S26.9 8.99 26.9 15 22 24.9 16.004 24.9zm5.98-8.17c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.74.16-.22.33-.85 1.06-1.04 1.28-.19.22-.38.24-.71.08-.33-.16-1.38-.51-2.63-1.63-.97-.87-1.63-1.94-1.82-2.27-.19-.33-.02-.5.14-.67.14-.14.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56-.19-.01-.41-.01-.63-.01-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71 0 1.6 1.17 3.14 1.33 3.36.16.22 2.3 3.51 5.58 4.92.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.63-.38z" />
        </svg>
      </a>

      {/* ========================================================================= */}
      {/* POPUP MODAL: BOOK YOUR FREE DEMO                                          */}
      {/* ========================================================================= */}
      {demoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => {
            setDemoModalOpen(false);
            setDemoDone(false);
          }}
        >
          <div
            className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 sm:p-8 text-[#173f45] shadow-2xl overflow-y-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => {
                setDemoModalOpen(false);
                setDemoDone(false);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#173f45] transition-colors cursor-pointer font-bold"
              aria-label="Close"
            >
              ✕
            </button>

            {demoDone ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold mb-2">Almost Done!</h3>
                <p className="text-sm text-slate-600 mb-6">
                  WhatsApp has opened with your inquiry. Press <b>Send</b> and our technical team will call you shortly to schedule your free doorstep demo.
                </p>
                <button
                  onClick={() => {
                    setDemoModalOpen(false);
                    setDemoDone(false);
                  }}
                  className="px-6 py-2.5 rounded-full text-white font-bold text-sm"
                  style={{ background: '#2b6870' }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#2b6870] text-white flex items-center justify-center text-lg">
                    💧
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#173f45]">Book Your Free Demo</h3>
                    <p className="text-xs text-[#2b6870] font-medium">Free Doorstep Water & TDS Quality Testing</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">First Name*</label>
                    <input
                      required
                      name="first"
                      placeholder="First Name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-[#2b6870]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Last Name*</label>
                    <input
                      required
                      name="last"
                      placeholder="Last Name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-[#2b6870]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Mobile Number* (10 digits)</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      pattern="[6-9][0-9]{9}"
                      maxLength={10}
                      placeholder="Mobile Number"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-[#2b6870]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">City*</label>
                    <input
                      required
                      name="city"
                      placeholder="City"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-[#2b6870]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Pincode*</label>
                    <input
                      required
                      name="pin"
                      maxLength={6}
                      pattern="[0-9]{6}"
                      placeholder="6-digit Pincode"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-[#2b6870]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Interested In</label>
                    <select
                      name="need"
                      defaultValue="Water Purifier"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-[#2b6870]"
                    >
                      <option>Water Purifier</option>
                      <option>Water Softener</option>
                      <option>SS Dispenser</option>
                      <option>Commercial RO Plant</option>
                      <option>AMC / Service</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Address*</label>
                  <textarea
                    required
                    name="address"
                    rows={2}
                    placeholder="Delivery / Installation Address"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-[#2b6870]"
                  />
                </div>

                {demoFormErr && (
                  <p className="text-xs text-red-600 font-semibold">{demoFormErr}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #2b6870 0%, #173f45 100%)' }}
                >
                  Send on WhatsApp & Book Demo →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. CLEAN FOOTER (MATCHING DESIGN WITH COUNTER & PILLS)                    */}
      {/* ========================================================================= */}
      <footer className="w-full z-40 shrink-0 pb-3 sm:pb-4 px-6 sm:px-12 max-w-[1650px] mx-auto select-none">
        {/* Crisp horizontal divider line */}
        <div className="w-full border-t border-[#155e63]/20 mb-2.5 sm:mb-3" />

        <div className="w-full flex items-center justify-between text-xs sm:text-sm font-medium text-[#155e63]">
          {/* Left Categories / Tabs */}
          <div className="flex items-center gap-3 sm:gap-6 font-trendy">
            {categories.map((cat, idx) => {
              const isCatActive = currentProduct.category === cat;
              return (
                <React.Fragment key={cat}>
                  {idx > 0 && <span className="text-[#155e63]/30 font-light">—</span>}
                  <button
                    onClick={() => {
                      const foundIdx = panel1Products.findIndex((p) => p.category === cat);
                      if (foundIdx !== -1) setCurrentSlideIndex(foundIdx);
                    }}
                    className={`hover:text-[#2e8540] transition-colors cursor-pointer whitespace-nowrap ${
                      isCatActive ? 'font-bold text-[#0e4a4f]' : 'text-[#155e63]/75'
                    }`}
                  >
                    {cat}
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          {/* Center: Slide Indicator Dots for Quick Jump */}
          <div className="hidden md:flex items-center gap-1.5">
            {panel1Products.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlideIndex === idx
                    ? 'w-6 h-1.5 bg-[#155e63] shadow-[0_0_8px_rgba(21,94,99,0.5)]'
                    : 'w-1.5 h-1.5 bg-[#155e63]/30 hover:bg-[#155e63]/70'
                }`}
                title={`Go to ${p.name}`}
              />
            ))}
          </div>

          {/* Right Product Counter (Click to cycle next product) */}
          <div
            onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % panel1Products.length)}
            className="flex items-center gap-2 font-trendy text-sm sm:text-base cursor-pointer hover:text-[#2e8540] transition-colors"
            title="Click to view next product"
          >
            <span className="font-bold text-[#0e4a4f]">
              {String(currentSlideIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-[#155e63]/40">/</span>
            <span className="text-[#155e63]/70">
              {String(panel1Products.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

