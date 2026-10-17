import React, { useState, useEffect } from 'react';
import { MinimalHeroScreen } from './components/MinimalHeroScreen';
import { ThreeDVideoScreen } from './components/ThreeDVideoScreen';
import HpaApp from '../hpa/App.jsx';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { fetchProducts, ProductItem } from './services/api';
import { navigate } from '../hpa/router.js';

export const App: React.FC = () => {
  const [view, setView] = useState<'site' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#admin') return 'admin';
    }
    return 'site';
  });

  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(() => {
    try {
      const stored = localStorage.getItem('aakash_admin_auth');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.user || null;
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [products, setProducts] = useState<ProductItem[]>([]);
  
  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aakash_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Mobile detection: Mobile & tablet users (<= 1024px) bypass Panel 1 & 2 directly into the website app experience
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 1024;
    }
    return false;
  });

  const [activeScreen, setActiveScreen] = useState<1 | 2 | 3>(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 1024 || (window.location.pathname !== '/' && window.location.pathname !== '')) {
        return 3;
      }
    }
    return 1;
  });

  const [panel1SlideIndex, setPanel1SlideIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (mobile) {
        setActiveScreen(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleRouteChange = () => {
      if (window.location.pathname !== '/' && window.location.pathname !== '') {
        setActiveScreen(3);
      }
    };
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Lock body scroll while in Screen 1 or Screen 2 on desktop
  useEffect(() => {
    if (!isMobile && activeScreen < 3) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeScreen, isMobile]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aakash_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setView('admin');
      } else {
        setView('site');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    fetchProducts().then(items => {
      setProducts(items);
    });
  }, []);

  const handleAddToCart = (product: ProductItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => String(item.product.id) === String(product.id));
      if (existing) {
        return prev.map(item =>
          String(item.product.id) === String(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQty = (productId: string | number, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (String(item.product.id) === String(productId)) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (productId: string | number) => {
    setCartItems(prev => prev.filter(item => String(item.product.id) !== String(productId)));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Admin View Handlers
  const handleSwitchToAdmin = () => {
    window.location.hash = '#admin';
    setView('admin');
  };

  const handleBackToSite = () => {
    window.location.hash = '';
    setView('site');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('aakash_admin_auth');
    setAdminUser(null);
  };

  const handleAdminLoginSuccess = (user: { name: string; email: string; role: string }) => {
    setAdminUser(user);
  };

  // If in Admin view mode
  if (view === 'admin') {
    if (!adminUser) {
      return (
        <AdminLogin
          onLoginSuccess={handleAdminLoginSuccess}
          onBackToSite={handleBackToSite}
        />
      );
    }

    return (
      <AdminDashboard
        user={adminUser}
        onLogout={handleAdminLogout}
        onBackToSite={handleBackToSite}
      />
    );
  }

  // Public Storefront View with Panel 1 & Panel 2 (desktop) and 100% authentic aakash-merged Website
  return (
    <div className="relative w-full min-h-screen bg-[#549aa2] font-sans selection:bg-[#00b4d8] selection:text-white">
      {/* ========================================================================= */}
      {/* DESKTOP ONLY: PANEL 1 (MINIMAL HERO) & PANEL 2 (THEATER 3D VIDEO HOIST)     */}
      {/* On mobile devices (< 768px), these are bypassed for direct website access */}
      {/* ========================================================================= */}
      {!isMobile && (
        <>
          {/* PANEL 1: UNIFIED MINIMAL HERO SCREEN (Top Layer: z-50) */}
          <div
            className="fixed inset-0 w-full h-full z-50 overflow-hidden transition-transform duration-[1800ms] ease-[cubic-bezier(0.33,1,0.68,1)] will-change-transform"
            style={{
              transform: activeScreen >= 2 ? 'translateY(-100%)' : 'translateY(0%)',
              pointerEvents: activeScreen === 1 ? 'auto' : 'none',
            }}
          >
            <MinimalHeroScreen
              isActive={activeScreen === 1}
              currentSlideIndex={panel1SlideIndex}
              onSlideChange={setPanel1SlideIndex}
              cartCount={cartCount}
              onOpenCart={() => setCartOpen(true)}
              onOpenLogin={handleSwitchToAdmin}
              onOpenSearch={() => setSearchOpen(true)}
              onOpenOrder={() => {
                setActiveScreen(3);
              }}
              onSelectNav={(item) => {
                setActiveScreen(3);
                if (item === 'About') {
                  navigate('/about');
                } else if (item === 'Contact') {
                  navigate('/contact');
                } else if (item === 'Domestic Ro') {
                  navigate('/shop/domestic/ro');
                } else if (item === 'SS Dispenser') {
                  navigate('/shop/dispenser');
                } else if (item === 'Commercial RO System') {
                  navigate('/shop/industrial');
                } else if (item === 'Water Treatment Plant') {
                  navigate('/shop/wtp');
                } else if (item === 'Spares') {
                  navigate('/shop/spares');
                } else if (item === 'Heat Pump') {
                  navigate('/shop/heatpump');
                }
              }}
              onSelectCategory={(cat) => {
                setActiveScreen(3);
                navigate(`/shop/${cat}`);
              }}
              onScrollNext={() => setActiveScreen(2)}
            />
          </div>

          {/* PANEL 2: FATHER & SON 3D VIDEO SCREEN (Middle Layer: z-40) */}
          <div 
            className={`fixed inset-0 w-full h-full z-40 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform overflow-hidden ${
              activeScreen >= 3 ? 'pointer-events-none' : ''
            }`}
            style={{ 
              transform: activeScreen >= 3 ? 'translateY(-100%)' : 'translateY(0%)',
              pointerEvents: activeScreen === 2 ? 'auto' : 'none'
            }}
          >
            <ThreeDVideoScreen
              isActive={activeScreen === 2}
              onComplete={() => setActiveScreen(3)}
              onSkip={() => setActiveScreen(3)}
              onPrevScreen={() => setActiveScreen(1)}
            />

            {/* Theater Screen / Flag Hoisting Weighted Bottom Bar with Cables */}
            <div className="absolute bottom-0 left-0 right-0 h-3.5 bg-gradient-to-r from-slate-900 via-slate-700 via-slate-800 to-slate-900 z-30 flex items-center justify-between px-6 pointer-events-none">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-400 border-2 border-slate-900 shadow-md" />
              <div className="w-20 h-1.5 rounded-full bg-slate-400/80 shadow-inner" />
              <div className="w-3.5 h-3.5 rounded-full bg-slate-400 border-2 border-slate-900 shadow-md" />
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 3: 100% AUTHENTIC AAKASH-MERGED HOME PAGE WEBSITE                  */}
      {/* ========================================================================= */}
      <div 
        id="website-root-container"
        className="w-full min-h-screen relative z-10"
      >
        <HpaApp
          onBackToIntro={!isMobile ? () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveScreen(1);
          } : undefined}
          cartCount={cartCount}
          onOpenCart={() => setCartOpen(true)}
          onOpenLogin={handleSwitchToAdmin}
          onOpenSearch={() => setSearchOpen(true)}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Interactive Cart Drawer - Available Site-Wide */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setCartOpen(false);
          setActiveScreen(3);
          navigate('/cart');
        }}
      />

      {/* Live Search Modal - Available Site-Wide */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={products}
        onSelectProduct={() => {
          setSearchOpen(false);
          setActiveScreen(3);
        }}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default App;
