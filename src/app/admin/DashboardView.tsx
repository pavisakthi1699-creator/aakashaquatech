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
  Edit3
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
  onEditProduct
}) => {
  return (
    <div className="space-y-8 font-sans">
      
      {/* Welcome & Quick Actions Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-sky-200 p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold">
            <span>Water Treatment Store Control</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Aakash Aqua Tech Operations Overview
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed">
            Manage your full catalog of 375+ Industrial RO Plants, Softeners, and Spares imported from WooCommerce. Edit specifications, prices, variations, dates, and product gallery images.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNavigateToAddProduct}
            className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/25 flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
          <button
            onClick={onNavigateToProducts}
            className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-colors shadow-sm"
          >
            Browse Products
          </button>
        </div>
      </div>

      {/* Stats Cards - Crisp White Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Total Catalog</span>
              <Package className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">{stats.total}</div>
            <div className="text-[11px] text-sky-700 font-semibold">WooCommerce Items</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>In Stock</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-600">{stats.inStock}</div>
            <div className="text-[11px] text-slate-500">Available to order</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Out of Stock</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-black text-amber-600">{stats.outOfStock}</div>
            <div className="text-[11px] text-slate-500">Inventory review needed</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Featured</span>
              <Star className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-3xl font-black text-purple-600">{stats.featured}</div>
            <div className="text-[11px] text-slate-500">Homepage highlighted</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Categories</span>
              <Layers className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-3xl font-black text-cyan-600">{stats.categoriesCount}</div>
            <div className="text-[11px] text-slate-500">Parent & child groups</div>
          </div>
        </div>
      )}

      {/* Recent Catalog Products Table */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Equipment Catalog</h3>
            <p className="text-xs text-slate-500 mt-0.5">Quick access to view and edit recent products</p>
          </div>

          <button
            onClick={onNavigateToProducts}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1.5 transition-colors"
          >
            <span>View All {stats?.total || 375} Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">SKU / ID</th>
                <th className="py-3 px-6">Price (₹)</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentProducts.slice(0, 8).map((item) => {
                const priceDisplay = item.type === 'variable' && item.minPrice && item.maxPrice && item.minPrice !== item.maxPrice
                  ? `₹${item.minPrice.toLocaleString('en-IN')} - ₹${item.maxPrice.toLocaleString('en-IN')}`
                  : item.regularPrice > 0
                    ? `₹${item.regularPrice.toLocaleString('en-IN')}`
                    : 'On Quote';

                return (
                  <tr key={item.id} className="hover:bg-sky-50/40 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                          {item.mainImage ? (
                            <img src={item.mainImage} alt={item.name} className="w-full h-full object-contain p-0.5" />
                          ) : (
                            <Package className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <div className="max-w-xs font-bold text-slate-800 truncate text-xs">
                          {item.name}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-6">
                      <span className="px-2.5 py-0.5 rounded-lg bg-sky-50 border border-sky-100 text-sky-800 font-semibold">
                        {item.category || 'General'}
                      </span>
                    </td>

                    <td className="py-3.5 px-6 font-mono text-[11px] text-slate-500 font-semibold">
                      {item.sku || `#${item.id}`}
                    </td>

                    <td className="py-3.5 px-6 font-extrabold text-slate-900">
                      {priceDisplay}
                    </td>

                    <td className="py-3.5 px-6 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.inStock 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>

                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => onEditProduct(item)}
                        className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white transition-all font-bold inline-flex items-center gap-1.5 border border-sky-200"
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