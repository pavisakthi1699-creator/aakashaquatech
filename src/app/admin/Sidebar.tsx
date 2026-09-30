import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  Layers, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Droplets, 
  ShieldCheck,
  ChevronRight,
  X
} from 'lucide-react';

export type AdminSection = 'dashboard' | 'products' | 'add_product' | 'categories' | 'inquiries' | 'settings';

interface SidebarProps {
  currentSection: AdminSection;
  onSelectSection: (section: AdminSection) => void;
  user: { name: string; email: string; role: string } | null;
  onLogout: () => void;
  onBackToSite: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  totalProducts?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  user,
  onLogout,
  onBackToSite,
  mobileOpen,
  onCloseMobile,
  totalProducts = 375
}) => {
  const menuItems: { id: AdminSection; label: string; icon: any; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'All Products', icon: Package, badge: totalProducts },
    { id: 'add_product', label: 'Add New Product', icon: PlusCircle },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'inquiries', label: 'Customer Inquiries', icon: MessageSquare, badge: 'New' },
    { id: 'settings', label: 'Store Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out font-sans ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Top Header */}
        <div>
          <div className="h-20 px-6 border-b border-slate-800/80 flex items-center justify-between">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-600/30">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight block leading-tight">
                  AAKASH <span className="text-sky-400">AQUA TECH</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Admin Control
                </span>
              </div>
            </a>

            <button 
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Management
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectSection(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-900 text-slate-300 border border-slate-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Profile & Actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950/60">
          
          <button
            onClick={onBackToSite}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-between border border-slate-800/80 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-sky-400" />
              <span>Visit Live Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {/* User Profile Box */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                PO
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">
                  {user?.name || 'Plant Ops Admin'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {user?.email || 'admin@aakashaquatech.com'}
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </aside>
    </>
  );
};