import React, { useState, useEffect, useMemo } from 'react';
import { ProductItem, fetchAdminProducts, toggleProductStatus, deleteProduct } from '../services/api';
import { 
  Package, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Star, 
  Filter, 
  RefreshCw, 
  Copy, 
  Layers,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface ProductsListViewProps {
  onEditProduct: (product: ProductItem) => void;
  onAddProduct: () => void;
}

export const ProductsListView: React.FC<ProductsListViewProps> = ({ onEditProduct, onAddProduct }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Delete modal state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminProducts({
        search,
        category,
        status,
        page,
        limit
      });
      setProducts(res.data);
      setTotalPages(res.pagination.pages);
      setTotalCount(res.pagination.total);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category, status, page, limit]);

  const handleToggle = async (id: string | number, field: 'inStock' | 'featured') => {
    const res = await toggleProductStatus(id, field);
    if (res.success) {
      setProducts(prev => prev.map(p => String(p.id) === String(id) ? { ...p, [field]: !p[field] } : p));
    }
  };

  const handleDelete = async (id: string | number) => {
    const res = await deleteProduct(id);
    if (res.success) {
      setDeleteConfirmId(null);
      loadProducts();
    }
  };

  const handleDuplicate = (item: ProductItem) => {
    const duplicated: ProductItem = {
      ...item,
      id: '',
      name: `${item.name} (Copy)`,
      sku: `${item.sku || 'AAT'}-COPY`,
      featured: false
    };
    onEditProduct(duplicated);
  };

  const categories = useMemo(() => [
    'all',
    'Industrial RO',
    'Domestic RO',
    'Water Softeners',
    'Spares & Consumables',
    'Under Sink RO',
    'Water Dispensers',
    'FRP Vessels'
  ], []);
  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Products Management</h2>
          <p className="text-xs text-slate-400 mt-1">
            Displaying <span className="text-white font-semibold">{totalCount}</span> WooCommerce catalog items
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadProducts}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Reload Products"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-sky-400' : ''}`} />
          </button>
          
          <button
            onClick={onAddProduct}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, SKU, or ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>

        {/* Filter Selects */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 focus:outline-none focus:border-sky-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="">All Stock Status</option>
            <option value="in_stock">In Stock Only</option>
            <option value="out_of_stock">Out of Stock Only</option>
          </select>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value={15}>15 per page</option>
            <option value={30}>30 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>

      </div>

      {/* Main Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-4 px-4 w-16">Image</th>
                <th className="py-4 px-4">Title & Category</th>
                <th className="py-4 px-4">SKU / ID</th>
                <th className="py-4 px-4">Price (₹)</th>
                <th className="py-4 px-4 text-center">Variations</th>
                <th className="py-4 px-4 text-center">Stock</th>
                <th className="py-4 px-4 text-center">Featured</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-sky-500 mb-2" />
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    No products found matching your search or filters.
                  </td>
                </tr>
              ) : (
                products.map((item) => {
                  const priceDisplay = item.type === 'variable' && item.minPrice && item.maxPrice && item.minPrice !== item.maxPrice
                    ? `₹${item.minPrice.toLocaleString('en-IN')} - ₹${item.maxPrice.toLocaleString('en-IN')}`
                    : item.regularPrice > 0
                      ? `₹${item.regularPrice.toLocaleString('en-IN')}`
                      : 'On Quote';

                  const isConfirmingDelete = deleteConfirmId === item.id;

                  return (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition-colors group">
                      
                      {/* Image Thumbnail */}
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
                          {item.mainImage ? (
                            <img
                              src={item.mainImage}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80';
                              }}
                            />
                          ) : (
                            <Package className="w-5 h-5 text-slate-600" />
                          )}
                        </div>
                      </td>

                      {/* Title & Category */}
                      <td className="py-3 px-4 max-w-sm">
                        <button
                          onClick={() => onEditProduct(item)}
                          className="font-bold text-slate-100 hover:text-sky-400 transition-colors line-clamp-1 text-sm text-left block"
                        >
                          {item.name}
                        </button>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-sky-400 font-semibold">
                            {item.category || 'General'}
                          </span>
                          {item.type === 'variable' && (
                            <span className="px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-800 text-purple-300 text-[10px] font-semibold">
                              Variable
                            </span>
                          )}
                        </div>
                      </td>

                      {/* SKU / ID */}
                      <td className="py-3 px-4 text-slate-300 font-mono text-[11px]">
                        <div>{item.sku || 'N/A'}</div>
                        <div className="text-[10px] text-slate-500">ID: #{item.id}</div>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4">
                        <div className="font-extrabold text-white text-sm">
                          {priceDisplay}
                        </div>
                        {item.salePrice > 0 && (
                          <div className="text-[10px] text-emerald-400 font-semibold">
                            Sale: ₹{item.salePrice.toLocaleString('en-IN')}
                          </div>
                        )}
                      </td>

                      {/* Variations */}
                      <td className="py-3 px-4 text-center">
                        {item.variationsCount && item.variationsCount > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-semibold text-[11px]">
                            <Layers className="w-3 h-3" />
                            {item.variationsCount}
                          </span>
                        ) : (
                          <span className="text-slate-600 text-xs">-</span>
                        )}
                      </td>

                      {/* Stock Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggle(item.id, 'inStock')}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                            item.inStock
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20'
                          }`}
                          title="Click to toggle stock"
                        >
                          {item.inStock ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              <span>In Stock</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              <span>Out of Stock</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggle(item.id, 'featured')}
                          className={`p-1.5 rounded-lg transition-colors ${
                            item.featured ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                          }`}
                          title="Click to toggle featured"
                        >
                          <Star className={`w-4 h-4 ${item.featured ? 'fill-amber-400' : ''}`} />
                        </button>
                      </td>

                      {/* Action Buttons (NO POPUPS - Direct Edit navigation) */}
                      <td className="py-3 px-4 text-right">
                        {isConfirmingDelete ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <span className="text-[10px] text-rose-400">Delete?</span>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="px-2 py-1 rounded bg-rose-600 text-white text-[10px] font-bold"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-[10px]"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onEditProduct(item)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white transition-colors"
                              title="Edit Full Product Page"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDuplicate(item)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-purple-600 text-slate-300 hover:text-white transition-colors"
                              title="Duplicate Product"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(item.id)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            Showing <span className="text-white font-semibold">{products.length}</span> of <span className="text-white font-semibold">{totalCount}</span> products (Page {page} of {totalPages || 1})
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 text-white font-semibold flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <span className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-semibold">
              {page} / {totalPages || 1}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 text-white font-semibold flex items-center gap-1"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
