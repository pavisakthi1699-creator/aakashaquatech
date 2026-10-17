import React, { useState, useEffect } from 'react';
import { User, ShoppingCart, Search } from 'lucide-react';
import { menu, u as dataImg } from '../../hpa/data.js';
import { navigate } from '../../hpa/router.js';

export interface UniversalHeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenLogin?: () => void;
  onOpenSearch?: () => void;
  onDemo?: () => void;
  onBackToIntro?: () => void;
  onSelectNav?: (item: string) => void;
  isSticky?: boolean;
  className?: string;
  onOpenMobileMenu?: () => void;
}

export const UniversalHeader: React.FC<UniversalHeaderProps> = ({
  cartCount = 0,
  onOpenCart,
  onOpenLogin,
  onOpenSearch,
  onDemo,
  onBackToIntro,
  onSelectNav,
  onOpenMobileMenu,
  isSticky = false,
  className = '',
}) => {
  const [headerOpen, setHeaderOpen] = useState(false);
  const [headerDd, setHeaderDd] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isSticky) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  useEffect(() => {
    const handleToggle = () => setHeaderOpen((prev) => !prev);
    const handleOpen = () => setHeaderOpen(true);
    const handleClose = () => setHeaderOpen(false);
    window.addEventListener('aakash:toggle-menu', handleToggle);
    window.addEventListener('aakash:open-menu', handleOpen);
    window.addEventListener('aakash:close-menu', handleClose);
    return () => {
      window.removeEventListener('aakash:toggle-menu', handleToggle);
      window.removeEventListener('aakash:open-menu', handleOpen);
      window.removeEventListener('aakash:close-menu', handleClose);
    };
  }, []);

  const close = () => {
    setHeaderOpen(false);
    setHeaderDd(null);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    itemTitle: string,
    href: string,
    hasKids: boolean,
    idx: number
  ) => {
    if (hasKids && window.innerWidth < 1360) {
      e.preventDefault();
      setHeaderDd(headerDd === idx ? null : idx);
      return;
    }
    e.preventDefault();
    close();
    if (onSelectNav) {
      onSelectNav(itemTitle);
    }
    navigate(href);
  };

  const wrapperStyle: React.CSSProperties = isSticky
    ? {
        position: 'fixed',
        top: '12px',
        left: 0,
        right: 0,
        zIndex: 60,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 0.75rem',
        pointerEvents: 'none',
      }
    : {
        width: '100%',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '1rem',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        flexShrink: 0,
      };

  return (
    <div style={wrapperStyle} className={`hdr-wrapper ${className}`}>
        <header
          className={'hdr glass' + (headerOpen ? ' open' : '') + (scrolled ? ' sc' : '')}
          style={{
            position: 'relative',
            top: 0,
            left: 'auto',
            translate: 'none',
            margin: '0 auto',
            width: 'max-content',
            maxWidth: 'calc(100vw - 1.5rem)',
            minHeight: '74px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.4rem',
            padding: '0.75rem 2rem 0.75rem 1.4rem',
            borderRadius: '999px',
            background: scrolled
              ? 'rgba(251, 247, 240, 0.95)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(248, 243, 235, 0.92))',
            boxShadow: '0 16px 48px rgba(31,80,88,0.24), inset 0 1px 0 rgba(255,255,255,0.95)',
            border: '1px solid rgba(255,255,255,0.9)',
            backdropFilter: 'blur(24px)',
            boxSizing: 'border-box',
            pointerEvents: 'auto',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Header Logo - Scaled Up Official Logo */}
          <a
            href="/"
            className="logo flex items-center shrink-0 mr-1 sm:mr-3"
            onClick={(e) => {
              e.preventDefault();
              close();
              if (onSelectNav) onSelectNav('Home');
              navigate('/');
            }}
            aria-label="Aakash Pure Aqua Tech"
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <img
              src="/images/aakash-official-logo.png"
              alt="Aakash Pure Aqua Tech"
              style={{
                height: scrolled ? '52px' : '60px',
                width: 'auto',
                maxHeight: '64px',
                objectFit: 'contain',
                display: 'block',
                transition: 'height 0.3s ease',
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== 'https://aakashaquatech.in/wp-content/uploads/2026/07/IMG_5770-1003x1024.png') {
                  target.src = 'https://aakashaquatech.in/wp-content/uploads/2026/07/IMG_5770-1003x1024.png';
                }
              }}
            />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            className="burger"
            aria-label="Menu"
            aria-expanded={headerOpen}
            onClick={() => {
              if (onOpenMobileMenu) {
                onOpenMobileMenu();
              } else {
                setHeaderOpen(!headerOpen);
              }
            }}
          >
            <i />
            <i />
            <i />
          </button>

          {/* Desktop Navigation Menu & Aligned Action Icons */}
          <nav
            className="desktop-nav"
            aria-label="Main"
            style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', flexWrap: 'nowrap' }}
          >
          {menu.map((n, i) => (
            <div
              key={n.t}
              className={'ni' + (n.kids ? ' dd' : '') + (headerDd === i ? ' o' : '')}
              style={n.kids ? { position: 'static' } : undefined}
            >
              <a
                href={n.h}
                style={{
                  fontSize: '0.98rem',
                  fontWeight: 600,
                  padding: '0.6rem 0.72rem',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
                onClick={(e) => handleNavClick(e, n.t, n.h, !!n.kids, i)}
              >
                <span>{n.t}</span>
                {n.kids && <span className="car ml-1 text-xs opacity-80 inline-block">▾</span>}
              </a>

              {/* Centered Mega Menu Dropdown */}
              {n.kids && (
                <div
                  className="menu imgmenu glass"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    left: '0.8rem',
                    right: '0.8rem',
                    margin: '0 auto',
                    width: 'calc(100% - 1.6rem)',
                    maxWidth: '1280px',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.9rem',
                    padding: '1.1rem 1.4rem',
                    borderRadius: '28px',
                    background:
                      'linear-gradient(165deg, rgba(254, 252, 248, 0.98) 0%, rgba(234, 223, 204, 0.96) 100%)',
                    boxShadow: '0 24px 55px rgba(23,63,69,0.28), inset 0 1px 0 rgba(255,255,255,0.95)',
                    border: '1.5px solid #c9a273',
                    backdropFilter: 'blur(24px)',
                    boxSizing: 'border-box',
                    zIndex: 60,
                  }}
                >
                  <a
                    className="only-m"
                    href={n.h}
                    onClick={(e) => {
                      e.preventDefault();
                      close();
                      if (onSelectNav) onSelectNav(n.t);
                      navigate(n.h);
                    }}
                  >
                    <b>All {n.t}</b>
                  </a>

                  {n.kids.map((k) => (
                    <a
                      key={k.t}
                      href={k.h}
                      style={{
                        flex: '1 1 0',
                        maxWidth: '190px',
                        minWidth: '145px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: '1.1rem 0.8rem',
                        borderRadius: '24px',
                        background: '#fcf8f1',
                        border: '1.8px solid #c9a273',
                        boxShadow: '0 8px 20px rgba(201, 162, 115, 0.16), inset 0 1px 0 rgba(255,255,255,0.9)',
                        transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                        textDecoration: 'none',
                        color: '#0b3f66',
                        textAlign: 'center',
                        boxSizing: 'border-box',
                      }}
                      className="hover:bg-white hover:border-[#a77f4f] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        close();
                        if (onSelectNav) onSelectNav(k.t);
                        navigate(k.h);
                      }}
                    >
                      {/* Image middle-aligned */}
                      <div
                        style={{
                          width: '100%',
                          height: '84px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'transparent',
                          position: 'relative',
                        }}
                      >
                        <img
                          src={dataImg(k.img)}
                          alt={k.t}
                          style={{
                            maxWidth: '82px',
                            maxHeight: '82px',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                            display: 'block',
                            margin: '0 auto',
                            background: 'transparent',
                            mixBlendMode: 'multiply',
                            filter: 'contrast(1.05)',
                            transition: 'transform 0.3s ease',
                          }}
                          className="group-hover:scale-110"
                        />
                      </div>

                      {/* Title below image */}
                      <b
                        style={{
                          fontSize: '0.92rem',
                          lineHeight: '1.25',
                          fontWeight: 800,
                          color: '#0b3f66',
                          textAlign: 'center',
                          letterSpacing: '-0.01em',
                          display: 'block',
                          marginTop: '0.3rem',
                        }}
                      >
                        {k.t}
                      </b>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Subtle Divider (Desktop Only) */}
          <div className="h-7 w-px bg-[#173f45]/20 mx-2.5 shrink-0 hidden sm:block desktop-action-strip" />

          {/* Action Icons & CTA Buttons (Desktop Header Only) */}
          <div className="flex items-center gap-2 text-[#173f45] shrink-0 pr-1 desktop-action-strip">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                title="Search Products (Ctrl+K)"
                aria-label="Search"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/70 hover:bg-white text-[#173f45] hover:text-[#2b6870] border border-white/80 shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Search className="w-5 h-5" strokeWidth={2.3} />
              </button>
            )}

            {onOpenLogin && (
              <button
                onClick={onOpenLogin}
                title="User Account / Admin Login"
                aria-label="Account Login"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/70 hover:bg-white text-[#173f45] hover:text-[#2b6870] border border-white/80 shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <User className="w-5 h-5" strokeWidth={2.3} />
              </button>
            )}

            {onOpenCart && (
              <button
                onClick={onOpenCart}
                title="Shopping Cart"
                aria-label="Cart"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/70 hover:bg-white text-[#173f45] hover:text-[#2b6870] border border-white/80 shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 relative cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" strokeWidth={2.3} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#2b6870] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>

        </nav>
      </header>
    </div>
  );
};
