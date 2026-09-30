import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { fetchProducts, fetchSettings, ProductItem } from './services/api';
import { X, Droplets } from 'lucide-react';

export const App: React.FC = () => {
  const [view, setView] = useState<'site' | 'admin'>(() => {
    return window.location.hash === '#admin' ? 'admin' : 'site';
  });

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [stats, setStats] = useState<{ label: string; value: string }[]>([
    { label: 'Industrial & Commercial Plants', value: '650+' },
    { label: 'Live Catalog Products', value: '375+' },
    { label: 'Service Response Time', value: '< 4 Hrs' },
    { label: 'Client Satisfaction Rate', value: '99.4%' }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    const handleHash = () => {
      setView(window.location.hash === '#admin' ? 'admin' : 'site');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const loadCatalog = () => {
    fetchProducts().then(items => {
      setProducts(items);
      setStats(prev => prev.map(s => s.label === 'Live Catalog Products' ? { ...s, value: `${items.length}+` } : s));
    });
    fetchSettings().then(settings => {
      if (settings?.stats) {
        setStats(settings.stats);
      }
    });
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  const handleOpenQuote = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleSwitchToAdmin = () => {
    window.location.hash = '#admin';
    setView('admin');
  };

  const handleBackToSite = () => {
    window.location.hash = '';
    setView('site');
    loadCatalog(); // Refresh products in case admin edited something
  };

  if (view === 'admin') {
    return <AdminPanel onBackToSite={handleBackToSite} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Top Banner */}
      <div className="bg-sky-900 text-sky-100 text-xs py-2 px-4 text-center font-medium border-b border-sky-800 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Free Raw Water TDS & Hardness Test Kit with Every Plant Installation Inquiry</span>
        <a href="#contact" className="underline font-bold text-white ml-2 hover:text-sky-200">
          Claim Now &rarr;
        </a>
      </div>

      <Navbar onOpenQuote={handleOpenQuote} onOpenAdmin={handleSwitchToAdmin} />
      
      <main className="flex-1">
        <Hero onOpenQuote={handleOpenQuote} />

        {/* Stats Strip */}
        <section className="bg-white border-y border-slate-200 py-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {stats.map((s, idx) => (
                <div key={idx} className="pt-4 md:pt-0">
                  <div className="text-3xl sm:text-4xl font-extrabold text-sky-600 tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Products products={products} onSelectProduct={handleSelectProduct} />

        <Services onOpenQuote={handleOpenQuote} />

        <WhyUs />

        <ContactForm initialService={selectedProduct ? selectedProduct.name : ''} />
      </main>

      <Footer />

      {/* Quote / Product Specs Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {selectedProduct ? `Inquire: ${selectedProduct.name}` : 'Request Water Engineering Quote'}
                </h3>
                <p className="text-xs text-sky-400">Direct technical proposal from our engineering team</p>
              </div>
            </div>

            {selectedProduct && (
              <div className="mb-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1.5 flex gap-4 items-center">
                {selectedProduct.mainImage && (
                  <div className="w-14 h-14 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-slate-700">
                    <img src={selectedProduct.mainImage} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <div className="text-white font-semibold line-clamp-1">{selectedProduct.name}</div>
                  <div className="text-slate-400">Category: <span className="text-sky-300 font-medium">{selectedProduct.category}</span> {selectedProduct.sku ? `| SKU: ${selectedProduct.sku}` : ''}</div>
                  {selectedProduct.regularPrice > 0 && (
                    <div className="text-emerald-400 font-bold">₹{selectedProduct.regularPrice.toLocaleString('en-IN')}</div>
                  )}
                </div>
              </div>
            )}

            <ContactForm 
              initialService={selectedProduct ? selectedProduct.name : ''} 
              onSuccess={() => setTimeout(() => setModalOpen(false), 2000)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;