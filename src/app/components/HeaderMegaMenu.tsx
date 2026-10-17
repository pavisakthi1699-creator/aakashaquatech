import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react';
import { MegaMenuCategory, MegaMenuItem } from '../data/megaMenuData';

interface HeaderMegaMenuProps {
  category: MegaMenuCategory;
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: MegaMenuItem) => void;
  onViewAll: (categoryKey: string) => void;
  onOpenConsultation?: () => void;
  theme?: 'light' | 'aqua';
}

export const HeaderMegaMenu: React.FC<HeaderMegaMenuProps> = ({
  category,
  isOpen,
  onClose,
  onSelectItem,
  onViewAll,
  onOpenConsultation,
  theme = 'light',
}) => {
  if (!isOpen) return null;

  const columnCount = category.items.length === 6 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';

  return (
    <div
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={onClose}
      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[95vw] max-w-[1360px] z-50 animate-in fade-in slide-in-from-top-2 duration-200 font-trendy select-none"
    >
      {/* Invisible Hover Bridge */}
      <div className="absolute top-0 left-0 right-0 h-3" />

      {/* Main Glassmorphic Dropdown Card */}
      <div className="w-full bg-white/98 backdrop-blur-2xl rounded-3xl border border-slate-200/90 shadow-[0_24px_50px_-12px_rgba(0,53,84,0.22)] p-6 sm:p-8 overflow-hidden relative">
        
        {/* Subtle Ambient Background Water Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#4ecbc2]/10 via-[#93e3b5]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#005f73]/5 via-[#0a9396]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row of Mega Menu */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 mb-6 border-b border-slate-100 gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#005f73] to-[#0a9396] text-white flex items-center justify-center shadow-md shadow-[#005f73]/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>{category.title}</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 tracking-wider">
                  Verified Range
                </span>
              </h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {category.subtitle}
              </p>
            </div>
          </div>

          {/* Quick View All CTA */}
          <button
            onClick={() => {
              onViewAll(category.categoryFilter);
              onClose();
            }}
            className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 hover:bg-[#005f73] text-slate-700 hover:text-white border border-slate-200 hover:border-[#005f73] text-xs font-bold transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer shrink-0"
          >
            <span>{category.viewAllLabel}</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid of Product Category Cards */}
        <div className={`grid ${columnCount} gap-3 sm:gap-4 relative z-10`}>
          {category.items.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectItem(item);
                onClose();
              }}
              className="group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-3xl bg-[#fcf8f1] hover:bg-white border-2 border-[#c9a273] hover:border-[#a77f4f] shadow-md hover:shadow-2xl hover:shadow-[#c9a273]/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer text-center"
            >
              {/* Optional Mini Badge */}
              {item.badge && (
                <div className="absolute top-2.5 right-2.5 z-20">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border tracking-wider shadow-2xs ${item.badgeColor || 'bg-amber-100 text-[#0b3f66] border-[#c9a273]'}`}>
                    {item.badge}
                  </span>
                </div>
              )}

              {/* Product Image Stage */}
              <div className="w-full h-32 sm:h-36 flex items-center justify-center p-2 mb-2 relative bg-transparent">
                {/* Subtle spotlight circle on card hover */}
                <div className="absolute inset-2 rounded-full bg-slate-100/60 group-hover:bg-gradient-to-tr group-hover:from-amber-50 group-hover:to-cyan-50 transition-colors -z-10" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md select-none"
                  style={{ mixBlendMode: 'multiply', background: 'transparent' }}
                  loading="lazy"
                />
              </div>

              {/* Card Title & Tagline */}
              <div className="w-full pt-1">
                <h5 className="text-[13px] sm:text-[14px] font-black text-[#0b3f66] group-hover:text-[#005f73] transition-colors line-clamp-1 leading-tight">
                  {item.title}
                </h5>
                <p className="text-[11px] text-slate-500 font-medium mt-1 line-clamp-1">
                  {item.tagline}
                </p>
                <div className="mt-2.5 flex items-center justify-center gap-1 text-[11px] font-bold text-[#005f73] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Row: Free Water Testing & Consultation */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3 text-xs relative z-10">
          <div className="flex items-center gap-2 text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Free On-Site Water Testing & TDS Analysis:</strong> Certified doorstep evaluation for all homes & businesses across Tamil Nadu.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenConsultation && (
              <button
                onClick={() => {
                  onOpenConsultation();
                  onClose();
                }}
                className="px-4 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                Book Free TDS Test
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
