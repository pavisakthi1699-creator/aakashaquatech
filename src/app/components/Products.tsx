import React, { useState, useMemo } from 'react';
import { ProductItem } from '../services/api';
import { Search, ShoppingCart, ArrowRight, Filter, Sparkles, Check, ChevronDown } from 'lucide-react';

interface ProductsProps {
  products: ProductItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectProduct: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
}

export const Products: React.FC<ProductsProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'name'>('featured');
  const [visibleCount, setVisibleCount] = useState(20);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const categoryTabs = [
    { id: 'all', label: 'All Equipment' },
    { id: 'Domestic RO', label: 'Domestic RO' },
    { id: 'SS WATER DISPENSER', label: 'SS Water Dispenser' },
    { id: 'Industrial RO System', label: 'Commercial RO System' },
    { id: 'Softner', label: 'Water Softeners' },
    { id: 'Water Treatment', label: 'Water Treatment Plant' },
    { id: 'Iron Remover Filter', label: 'Iron Remover' },
    { id: 'Sand Filter', label: 'Sand Filter' },
    { id: 'FRP Pressure Vessels', label: 'FRP Vessels' },
    { id: 'SS Tanks', label: 'SS Tanks' },
    { id: 'Alkaline', label: 'Alkaline' },
    { id: 'Under Sink', label: 'Under Sink' },
    { id: 'Spares', label: 'Spares' }
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory && selectedCategory !== 'all') {
      const catLower = selectedCategory.toLowerCase();
      result = result.filter(p => {
        const primaryMatch = (p.category || '').toLowerCase().includes(catLower);
        const arrayMatch = (p.categories || []).some(c => c.toLowerCase().includes(catLower));
        return primaryMatch || arrayMatch;
      });
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // Sort
    const sorted = [...result];
    if (sortBy === 'price_asc') {
      sorted.sort((a, b) => (a.regularPrice || 0) - (b.regularPrice || 0));
    } else if (sortBy === 'price_desc') {
      sorted.sort((a, b) => (b.regularPrice || 0) - (a.regularPrice || 0));
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sorted;
  }, [products, selectedCategory, searchTerm, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleAddToCart = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedToast(`Added "${product.name.slice(0, 28)}..." to cart`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  return (
    <section id="catalog-section" className="py-20 bg-[#f5f8f9] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef6f7] text-[#2d737d] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#2d737d]" />
            Official Product Catalog ({filteredProducts.length} Systems Available)
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173238] tracking-tight">
            Explore All Water Treatment & Purifier Systems
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Multi-brand direct showroom inventory featuring certified Reverse Osmosis purifiers, softeners, dispensers, and industrial plant systems.
          </p>
        </div>

        {/* Search, Filter Bar and Sorting */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search models, brands (Kent, AO Smith, Conway), LPH..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setVisibleCount(12);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2d737d] focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Sorting Select */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <span className="text-xs font-bold text-slate-500 shrink-0">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-[#2d737d]"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name">Product Name (A-Z)</option>
              </select>
            </div>

          </div>

          {/* Category Tabs Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar border-t border-slate-100">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onSelectCategory(tab.id);
                  setVisibleCount(12);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  (selectedCategory === tab.id || (tab.id === 'all' && (!selectedCategory || selectedCategory === 'all')))
                    ? 'bg-[#1b3d4b] text-white shadow-md'
                    : 'bg-[#eef6f7] text-[#2d737d] hover:bg-[#6f9ea6] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - Exactly matching .aat-cat-products */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#eef6f7] flex items-center justify-center mx-auto text-[#2d737d]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#173238]">No products found matching your search</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Try searching with different keywords or switch back to "All Equipment" to view all available systems.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                onSelectCategory('all');
              }}
              className="px-6 py-2.5 rounded-xl bg-[#2d737d] text-white text-xs font-bold shadow-md hover:bg-[#205860]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => {
              const bestPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.regularPrice;
              const hasMrp = product.salePrice && product.regularPrice > product.salePrice;
              const mrpPrice = hasMrp ? product.regularPrice : Math.round((bestPrice || 12000) * 1.25);

              return (
                <div
                  key={product.id}
                  className="aat-product-card relative flex flex-col justify-between rounded-xl bg-[#f5f5f5] border border-[#e2eaec] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 group"
                >
                  {/* On Sale Badge */}
                  <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded bg-[#e91e8c] text-white text-[11px] font-extrabold shadow-sm tracking-wide">
                    SALE
                  </span>

                  {/* Image Link & Container */}
                  <div>
                    <div 
                      onClick={() => onSelectProduct(product)}
                      className="cursor-pointer relative w-full h-56 bg-white flex items-center justify-center p-4 overflow-hidden border-b border-slate-100"
                    >
                      <img
                        src={product.mainImage || 'https://aakashaquatech.in/wp-content/uploads/2026/03/Untitled-design-1-1.png'}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://aakashaquatech.in/wp-content/uploads/2026/03/Untitled-design-1-1.png';
                        }}
                      />
                    </div>

                    {/* Summary Info */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      
                      {/* Categories Tag */}
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#6f8c93] mb-1.5 line-clamp-1">
                        {product.category || 'Water Purifier System'}
                      </div>

                      {/* Product Title */}
                      <h3 
                        onClick={() => onSelectProduct(product)}
                        className="cursor-pointer text-sm sm:text-base font-extrabold text-[#132f36] group-hover:text-[#2d737d] transition-colors line-clamp-2 min-h-[42px] leading-snug mb-2"
                      >
                        {product.name}
                      </h3>

                      {/* Excerpt */}
                      {product.shortDescription && (
                        <p className="text-xs text-[#405a60] line-clamp-2 leading-relaxed mb-3">
                          {product.shortDescription}
                        </p>
                      )}

                      {/* Price Section */}
                      <div className="my-3 pt-2 border-t border-slate-200/60">
                        {mrpPrice > 0 && (
                          <div className="text-xs text-[#8a9ea3] font-medium line-through">
                            MRP ₹{mrpPrice.toLocaleString('en-IN')}
                          </div>
                        )}
                        <div className="text-[#2d737d] text-[11px] font-bold">Best Price:</div>
                        <div className="text-lg sm:text-xl font-extrabold text-[#122f36]">
                          {bestPrice > 0 ? `₹${bestPrice.toLocaleString('en-IN')}` : 'Price On Request'}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Actions Grid (Buy Now & Add to Cart) */}
                  <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full py-2.5 px-2 rounded-lg bg-[#1b3d4b] hover:bg-[#2d737d] text-white text-xs font-extrabold text-center transition-colors shadow-sm"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full py-2.5 px-2 rounded-lg bg-white hover:bg-[#2d737d] text-[#2d737d] hover:text-white border-2 border-[#2d737d] text-xs font-extrabold text-center transition-colors flex items-center justify-center gap-1 shadow-sm"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount(c => c + 20)}
              className="px-8 py-3.5 rounded-xl bg-[#1b3d4b] hover:bg-[#2d737d] text-white text-sm font-bold shadow-lg transition-all hover:scale-105"
            >
              Load More Products ({filteredProducts.length - visibleCount} remaining)
            </button>
          </div>
        )}

      </div>

      {/* Instant Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#173238] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom duration-200">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold">{addedToast}</span>
        </div>
      )}
    </section>
  );
};