import React, { useState } from 'react';
import { ProductItem } from '../services/api';
import { Droplet, Check, ArrowRight, Gauge, Layers, Search, Package } from 'lucide-react';

interface ProductsProps {
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
}

export const Products: React.FC<ProductsProps> = ({ products, onSelectProduct }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'Industrial RO', label: 'Industrial RO' },
    { id: 'Domestic RO', label: 'Domestic RO' },
    { id: 'Water Softeners', label: 'Water Softeners' },
    { id: 'Under Sink RO', label: 'Under Sink RO' },
    { id: 'Water Dispensers', label: 'Water Dispensers' },
    { id: 'FRP Vessels', label: 'FRP Vessels' },
    { id: 'Spares & Consumables', label: 'Spares & Consumables' },
  ];

  let filtered = activeTab === 'all' 
    ? products 
    : products.filter(p => (p.category || '').toLowerCase() === activeTab.toLowerCase());

  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(term) || 
      (p.sku && p.sku.toLowerCase().includes(term))
    );
  }

  const displayed = filtered.slice(0, visibleCount);

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <Gauge className="w-3.5 h-3.5" />
            Live Equipment Catalog ({products.length} Products)
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            High-Performance Water Treatment Systems
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Complete range of Industrial RO Plants, Commercial Softeners, Domestic Purifiers, and genuine spares imported directly from our engineering manufacturing line.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-10 space-y-4">
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products by model, capacity or SKU..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(12);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white shadow-sm transition-all"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setVisibleCount(12);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayed.map((item) => {
            const priceDisplay = item.type === 'variable' && item.minPrice && item.maxPrice && item.minPrice !== item.maxPrice
              ? `₹${item.minPrice.toLocaleString('en-IN')} - ₹${item.maxPrice.toLocaleString('en-IN')}`
              : item.regularPrice > 0
                ? `₹${item.regularPrice.toLocaleString('en-IN')}`
                : 'Quote On Request';

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden flex items-center justify-center p-4">
                    {item.mainImage ? (
                      <img
                        src={item.mainImage}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    ) : (
                      <Package className="w-12 h-12 text-slate-300" />
                    )}

                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-sky-800 backdrop-blur-sm border border-slate-200 shadow-sm">
                      {item.category || 'Water Treatment'}
                    </span>

                    {item.variationsCount && item.variationsCount > 0 ? (
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-purple-900/80 text-purple-200 text-[10px] font-medium backdrop-blur-sm">
                        {item.variationsCount} Variations
                      </span>
                    ) : null}
                  </div>

                  <div className="p-5">
                    <div className="text-[11px] font-mono text-slate-400 mb-1">
                      {item.sku ? `SKU: ${item.sku}` : `ID: #${item.id}`}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                      {item.name}
                    </h3>

                    {item.shortDescription && (
                      <p className="mt-2 text-slate-500 text-xs line-clamp-2 leading-relaxed">
                        {item.shortDescription}
                      </p>
                    )}

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Price</div>
                        <div className="text-base font-extrabold text-slate-900">
                          {priceDisplay}
                        </div>
                      </div>
                      <span className={`text-[11px] font-semibold ${item.inStock ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {item.inStock ? 'In Stock' : 'Call for Lead Time'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectProduct(item)}
                    className="w-full py-2.5 rounded-xl bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Request Specs & Pricing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {filtered.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount(c => c + 16)}
              className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition-all hover:scale-105"
            >
              Load More Products ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}

      </div>
    </section>
  );
};