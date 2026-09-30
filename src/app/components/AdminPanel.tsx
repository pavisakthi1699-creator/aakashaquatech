import React, { useState, useEffect, useMemo } from 'react';
import { 
  fetchAdminProducts, 
  fetchAdminStats, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  toggleProductStatus,
  ProductItem, 
  AdminStats 
} from '../services/api';
import { 
  Package, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Star, 
  ArrowLeft, 
  Filter, 
  RefreshCw, 
  X, 
  Copy, 
  AlertTriangle,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AdminPanelProps {
  onBackToSite: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToSite }) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Partial<ProductItem>>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductItem | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, pagedData] = await Promise.all([
        fetchAdminStats(),
        fetchAdminProducts({
          search,
          category: selectedCategory,
          status: selectedStatus,
          page,
          limit
        })
      ]);

      setStats(statsData);
      setProducts(pagedData.data);
      setTotalPages(pagedData.pagination.pages);
      setTotalCount(pagedData.pagination.total);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, selectedCategory, selectedStatus, page, limit]);

  const handleToggle = async (id: string | number, field: 'inStock' | 'featured') => {
    const res = await toggleProductStatus(id, field);
    if (res.success) {
      setProducts(prev => prev.map(p => String(p.id) === String(id) ? { ...p, [field]: !p[field] } : p));
      if (stats) {
        setStats({
          ...stats,
          inStock: field === 'inStock' ? (stats.inStock + (res.data?.inStock ? 1 : -1)) : stats.inStock,
          outOfStock: field === 'inStock' ? (stats.outOfStock + (res.data?.inStock ? -1 : 1)) : stats.outOfStock,
          featured: field === 'featured' ? (stats.featured + (res.data?.featured ? 1 : -1)) : stats.featured
        });
      }
    }
  };
  const handleOpenCreate = () => {
    setCurrentProduct({
      name: '',
      sku: `AAT-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'Industrial RO',
      regularPrice: 25000,
      salePrice: 0,
      inStock: true,
      stock: 10,
      featured: false,
      mainImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
      shortDescription: '',
      description: ''
    });
    setModalMode('create');
    setFeedback(null);
  };

  const handleOpenEdit = (product: ProductItem) => {
    setCurrentProduct({ ...product });
    setModalMode('edit');
    setFeedback(null);
  };

  const handleDuplicate = (product: ProductItem) => {
    setCurrentProduct({
      ...product,
      id: undefined,
      name: `${product.name} (Copy)`,
      sku: `${product.sku}-COPY`,
      featured: false
    });
    setModalMode('create');
    setFeedback(null);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct.name) return;

    setSubmitting(true);
    setFeedback(null);

    try {
      if (modalMode === 'create') {
        const res = await createProduct(currentProduct);
        if (res.success) {
          setFeedback({ type: 'success', message: 'Product created successfully!' });
          setTimeout(() => {
            setModalMode(null);
            loadData();
          }, 800);
        } else {
          setFeedback({ type: 'error', message: res.message || 'Failed to create product' });
        }
      } else if (modalMode === 'edit' && currentProduct.id) {
        const res = await updateProduct(currentProduct.id, currentProduct);
        if (res.success) {
          setFeedback({ type: 'success', message: 'Product updated successfully!' });
          setTimeout(() => {
            setModalMode(null);
            loadData();
          }, 800);
        } else {
          setFeedback({ type: 'error', message: res.message || 'Failed to update product' });
        }
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error saving product' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const res = await deleteProduct(deleteTarget.id);
    if (res.success) {
      setDeleteTarget(null);
      loadData();
    }
  };

  const categories = useMemo(() => {
    return [
      'all',
      'Industrial RO',
      'Domestic RO',
      'Water Softeners',
      'Spares & Consumables',
      'Under Sink RO',
      'Water Dispensers',
      'FRP Vessels'
    ];
  }, []);
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </button>
            <div className="h-6 w-px bg-slate-800" />
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-md shadow-sky-600/30">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  Aakash Aqua Tech <span className="text-sky-400 font-medium text-xs px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-800">Admin Control</span>
                </h1>
                <span className="text-xs text-slate-400">Manage 375+ WooCommerce Water Products</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={loadData}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-sky-400' : ''}`} />
            </button>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-sky-600/30 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex-1 space-y-6">
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Catalog</div>
              <div className="text-2xl font-black text-white mt-1">{stats.total}</div>
              <div className="text-[11px] text-sky-400 mt-0.5">Imported from WooCommerce</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">In Stock</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">{stats.inStock}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Available for dispatch</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Out of Stock</div>
              <div className="text-2xl font-black text-amber-400 mt-1">{stats.outOfStock}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Needs stock replenishment</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Featured Items</div>
              <div className="text-2xl font-black text-purple-400 mt-1">{stats.featured}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Promoted on homepage</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-sm col-span-2 sm:col-span-4 lg:col-span-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Categories</div>
              <div className="text-2xl font-black text-cyan-400 mt-1">{stats.categoriesCount}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Active equipment types</div>
            </div>
          </div>
        )}

        <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, SKU, or ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:border-sky-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'all' ? 'All Categories' : c}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:border-sky-500"
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
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value={15}>15 per page</option>
              <option value={30}>30 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>
        <div className="rounded-2xl bg-slate-800/90 border border-slate-700 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-700 text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4 w-16">Image</th>
                  <th className="py-3.5 px-4">Product Name & Category</th>
                  <th className="py-3.5 px-4">SKU / ID</th>
                  <th className="py-3.5 px-4">Price (₹)</th>
                  <th className="py-3.5 px-4 text-center">Variations</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-sky-500 mb-2" />
                      Loading catalog products...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
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

                    return (
                      <tr key={item.id} className="hover:bg-slate-700/40 transition-colors group">
                        <td className="py-3 px-4">
                          <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
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

                        <td className="py-3 px-4 max-w-xs">
                          <div className="font-semibold text-slate-100 group-hover:text-sky-400 transition-colors line-clamp-1 text-sm">
                            {item.name}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
                            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-sky-300 font-medium">
                              {item.category || 'General'}
                            </span>
                            {item.type === 'variable' && (
                              <span className="px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-800 text-purple-300 text-[10px] font-semibold">
                                Variable
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-slate-300 font-mono text-[11px]">
                          <div>{item.sku || 'N/A'}</div>
                          <div className="text-[10px] text-slate-500">ID: #{item.id}</div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-bold text-white text-sm">
                            {priceDisplay}
                          </div>
                          {item.salePrice > 0 && (
                            <div className="text-[10px] text-emerald-400">
                              Sale: ₹{item.salePrice.toLocaleString('en-IN')}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4 text-center">
                          {item.variationsCount && item.variationsCount > 0 ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-medium text-[11px]">
                              <Layers className="w-3 h-3" />
                              {item.variationsCount}
                            </span>
                          ) : (
                            <span className="text-slate-500 text-[11px]">-</span>
                          )}
                        </td>

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

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleToggle(item.id, 'featured')}
                            className={`p-1.5 rounded-lg transition-colors ${
                              item.featured
                                ? 'text-amber-400 hover:text-amber-300'
                                : 'text-slate-600 hover:text-slate-400'
                            }`}
                            title="Click to toggle featured"
                          >
                            <Star className={`w-4 h-4 ${item.featured ? 'fill-amber-400' : ''}`} />
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(item)}
                              className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-sky-600 text-slate-300 hover:text-white transition-colors"
                              title="Edit Product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDuplicate(item)}
                              className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-purple-600 text-slate-300 hover:text-white transition-colors"
                              title="Duplicate Product"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(item)}
                              className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-950/70 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              Showing <span className="text-white font-semibold">{products.length}</span> of <span className="text-white font-semibold">{totalCount}</span> products (Page {page} of {totalPages})
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-white font-semibold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono">
                {page} / {totalPages || 1}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-white font-semibold flex items-center gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[92vh]">
            <button
              onClick={() => setModalMode(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {modalMode === 'create' ? 'Add New Water Treatment Product' : 'Edit Product Details'}
                </h2>
                <p className="text-xs text-slate-400">
                  {modalMode === 'create' ? 'Register equipment in Aakash Aqua Tech catalog' : `Product ID: #${currentProduct.id}`}
                </p>
              </div>
            </div>

            {feedback && (
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-2 text-sm ${
                feedback.type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
              }`}>
                {feedback.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                <span>{feedback.message}</span>
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Product Name / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2000 LPH SS Industrial RO Plant"
                  value={currentProduct.name || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AAT-RO-2000"
                    value={currentProduct.sku || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, sku: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Category
                  </label>
                  <select
                    value={currentProduct.category || 'Industrial RO'}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                  >
                    <option value="Industrial RO">Industrial RO</option>
                    <option value="Domestic RO">Domestic RO</option>
                    <option value="Water Softeners">Water Softeners</option>
                    <option value="DM Plants">DM Plants</option>
                    <option value="STP / ETP">STP / ETP</option>
                    <option value="Spares & Consumables">Spares & Consumables</option>
                    <option value="Under Sink RO">Under Sink RO</option>
                    <option value="Water Dispensers">Water Dispensers</option>
                    <option value="FRP Vessels">FRP Vessels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Product Type
                  </label>
                  <select
                    value={currentProduct.type || 'simple'}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                  >
                    <option value="simple">Simple Product</option>
                    <option value="variable">Variable Product</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Regular Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="25000"
                    value={currentProduct.regularPrice || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, regularPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Sale Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={currentProduct.salePrice || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, salePrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="10"
                    value={currentProduct.stock || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer py-2.5">
                    <input
                      type="checkbox"
                      checked={Boolean(currentProduct.inStock)}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, inStock: e.target.checked })}
                      className="w-4 h-4 rounded text-sky-600 bg-slate-950 border-slate-700"
                    />
                    <span className="text-xs font-semibold text-slate-300">Mark as In Stock</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Main Image URL
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={currentProduct.mainImage || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, mainImage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500"
                  />
                  {currentProduct.mainImage && (
                    <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-700 overflow-hidden shrink-0">
                      <img src={currentProduct.mainImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Short Summary / Specifications
                </label>
                <textarea
                  rows={2}
                  placeholder="Key specifications, capacity, recovery rate..."
                  value={currentProduct.shortDescription || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, shortDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(currentProduct.featured)}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700"
                  />
                  <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> Feature on Homepage Showcase
                  </span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setModalMode(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/30 disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : modalMode === 'create' ? 'Create Product' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 text-white shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">Delete Product</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to permanently delete <strong className="text-white font-semibold">"{deleteTarget.name}"</strong>?
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30"
              >
                Yes, Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
