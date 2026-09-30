import React from 'react';
import { AdminStats, ProductItem } from '../services/api';
import { 
  Package, 
  CheckCircle, 
  AlertTriangle, 
  Star, 
  Layers, 
  Plus, 
  ArrowRight, 
  Edit3, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';

interface DashboardViewProps {
  stats: AdminStats | null;
  recentProducts: ProductItem[];
  onNavigateToProducts: () => void;
  onNavigateToAddProduct: () => void;
  onEditProduct: (product: ProductItem) => void;
  onNavigateToInquiries: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  recentProducts,
  onNavigateToProducts,
  onNavigateToAddProduct,
  onEditProduct,
  onNavigateToInquiries
}) => {
  return (
    <div className="space-y-8 font-sans">
      
      {/* Welcome & Quick Actions Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-900/60 via-slate-900 to-indigo-950/60 border border-slate-800 p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold">
            <span>Engineering Store Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome to Aakash Aqua Tech Control Center
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
            Manage your catalog of 375+ Industrial RO Plants, Softeners, and Spares imported from WooCommerce. Edit specifications, prices, variations, and images in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNavigateToAddProduct}
            className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-lg shadow-sky-600/30 flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
          <button
            onClick={onNavigateToProducts}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            Browse Catalog
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Total Catalog</span>
              <Package className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-3xl font-black text-white">{stats.total}</div>
            <div className="text-[11px] text-sky-400 font-medium">WooCommerce Products</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>In Stock</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">{stats.inStock}</div>
            <div className="text-[11px] text-slate-400">Available for delivery</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Out of Stock</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">{stats.outOfStock}</div>
            <div className="text-[11px] text-slate-400">Requires inventory update</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Featured</span>
              <Star className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-purple-400">{stats.featured}</div>
            <div className="text-[11px] text-slate-400">Homepage showcased</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-1 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Categories</span>
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-cyan-400">{stats.categoriesCount}</div>
            <div className="text-[11px] text-slate-400">Active product groups</div>
          </div>
        </div>
      )}

      {/* Recent Catalog Products Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Catalog Products</h3>
            <p className="text-xs text-slate-400 mt-0.5">Quick access to view and edit recent equipment</p>
          </div>

          <button
            onClick={onNavigateToProducts}
            className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition-colors"
          >
            <span>View All {stats?.total || 375} Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">SKU / ID</th>
                <th className="py-3 px-6">Price (₹)</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {recentProducts.slice(0, 8).map((item) => {
                const priceDisplay = item.type === 'variable' && item.minPrice && item.maxPrice && item.minPrice !== item.maxPrice
                  ? `₹${item.minPrice.toLocaleString('en-IN')} - ₹${item.maxPrice.toLocaleString('en-IN')}`
                  : item.regularPrice > 0
                    ? `₹${item.regularPrice.toLocaleString('en-IN')}`
                    : 'On Quote';

                return (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
                          {item.mainImage ? (
                            <img src={item.mainImage} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                        <div className="max-w-xs font-semibold text-white truncate text-xs">
                          {item.name}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-6">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-sky-400 font-medium">
                        {item.category || 'General'}
                      </span>
                    </td>

                    <td className="py-3.5 px-6 font-mono text-[11px] text-slate-400">
                      {item.sku || `#${item.id}`}
                    </td>

                    <td className="py-3.5 px-6 font-bold text-white">
                      {priceDisplay}
                    </td>

                    <td className="py-3.5 px-6 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.inStock 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      }`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>

                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => onEditProduct(item)}
                        className="px-3 py-1.5 rounded-lg bg-sky-600/10 hover:bg-sky-600 text-sky-400 hover:text-white transition-all font-semibold inline-flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};