import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ShoppingCart, ArrowRight, Package } from 'lucide-react';
import { ProductItem } from '../services/api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(query.toLowerCase())) ||
        (p.sku && p.sku.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 10)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type to search equipment (e.g., Kent, AO Smith, 1000 LPH, Softener)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-base text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              Search by product name, model number, brand, or water treatment capacity.
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              No matching water systems found for "<span className="font-bold text-slate-700">{query}</span>"
            </div>
          ) : (
            results.map((product) => {
              const bestPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.regularPrice;

              return (
                <div
                  key={product.id}
                  className="py-3 px-2 flex items-center justify-between gap-4 hover:bg-[#f8fafb] rounded-xl transition-colors group"
                >
                  <div 
                    onClick={() => {
                      onClose();
                      onSelectProduct(product);
                    }}
                    className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/mega-menu/ro-water-purifiers.png';
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-[#2d737d] uppercase tracking-wider block">
                        {product.category}
                      </span>
                      <h4 className="text-sm font-bold text-[#173238] truncate group-hover:text-[#2d737d] transition-colors">
                        {product.name}
                      </h4>
                      <span className="text-xs font-extrabold text-[#122f36]">
                        {bestPrice > 0 ? `₹${bestPrice.toLocaleString('en-IN')}` : 'Quote on Request'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-2 rounded-lg bg-[#eef6f7] hover:bg-[#2d737d] text-[#2d737d] hover:text-white transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#1b3d4b] hover:bg-[#2d737d] text-white text-xs font-bold transition-colors"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
            Showing top {results.length} matches • Press ESC or click outside to dismiss
          </div>
        )}

      </div>
    </div>
  );
};
