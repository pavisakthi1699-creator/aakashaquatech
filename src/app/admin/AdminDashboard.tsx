import React, { useState, useEffect } from 'react';
import { Sidebar, AdminSection } from './Sidebar';
import { DashboardView } from './DashboardView';
import { ProductsListView } from './ProductsListView';
import { ProductEditorView } from './ProductEditorView';
import { InquiriesView } from './InquiriesView';
import { CategoriesView } from './CategoriesView';
import { ProductItem, AdminStats, fetchAdminStats, fetchAdminProducts } from '../services/api';
import { Menu, ExternalLink } from 'lucide-react';

interface AdminDashboardProps {
  user: { name: string; email: string; role: string } | null;
  onLogout: () => void;
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout, onBackToSite }) => {
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Dedicated full-page editor state (NO POPUPS)
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isEditorActive, setIsEditorActive] = useState(false);

  // Global data
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentProducts, setRecentProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, pagedData] = await Promise.all([
        fetchAdminStats(),
        fetchAdminProducts({ limit: 10 })
      ]);
      setStats(statsData);
      setRecentProducts(pagedData.data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleStartEdit = (product: ProductItem) => {
    setEditingProduct(product);
    setIsEditorActive(true);
  };

  const handleStartAdd = () => {
    setEditingProduct(null);
    setIsEditorActive(true);
  };

  const handleEditorSaved = () => {
    setIsEditorActive(false);
    setEditingProduct(null);
    loadDashboardData();
    setCurrentSection('products');
  };

  const handleEditorCancel = () => {
    setIsEditorActive(false);
    setEditingProduct(null);
  };

  const handleSelectSection = (section: AdminSection) => {
    setIsEditorActive(false);
    setEditingProduct(null);
    if (section === 'add_product') {
      handleStartAdd();
    } else {
      setCurrentSection(section);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      
      {/* Light Blue Sidebar */}
      <Sidebar
        currentSection={isEditorActive ? 'products' : currentSection}
        onSelectSection={handleSelectSection}
        user={user}
        onLogout={onLogout}
        onBackToSite={onBackToSite}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        totalProducts={stats?.total || 375}
      />

      {/* Main Content Viewport - Crisp White / Light Theme */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
        
        {/* Top Header Bar */}
        <header className="h-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:block">
              <div className="text-xs uppercase font-bold tracking-wider text-sky-700">
                {isEditorActive ? (editingProduct ? 'Product Editor' : 'New Product Registration') : currentSection.toUpperCase()}
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                Aakash Aqua Tech Operations Hub
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onBackToSite}
              className="px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold flex items-center gap-1.5 border border-sky-200 transition-colors shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
              <span>Public Storefront</span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-300 text-sky-800 flex items-center justify-center text-xs font-bold">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'PO'}
              </div>
              <span className="text-xs font-bold text-slate-800 hidden md:inline">
                {user?.name || 'Administrator'}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Section Content */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {isEditorActive ? (
            <ProductEditorView
              product={editingProduct}
              onBack={handleEditorCancel}
              onSaved={handleEditorSaved}
            />
          ) : currentSection === 'dashboard' ? (
            <DashboardView
              stats={stats}
              recentProducts={recentProducts}
              onNavigateToProducts={() => setCurrentSection('products')}
              onNavigateToAddProduct={handleStartAdd}
              onEditProduct={handleStartEdit}
              onNavigateToInquiries={() => setCurrentSection('inquiries')}
            />
          ) : currentSection === 'products' ? (
            <ProductsListView
              onEditProduct={handleStartEdit}
              onAddProduct={handleStartAdd}
            />
          ) : currentSection === 'categories' ? (
            <CategoriesView
              stats={stats}
              onSelectCategory={() => {
                setCurrentSection('products');
              }}
            />
          ) : currentSection === 'inquiries' ? (
            <InquiriesView />
          ) : (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 max-w-2xl space-y-4 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Store Settings</h2>
              <p className="text-xs text-slate-500">
                Aakash Aqua Tech e-commerce configurations and company details.
              </p>
              <div className="space-y-2 text-xs text-slate-700">
                <div>Company: <strong className="text-slate-900">Aakash Aqua Tech</strong></div>
                <div>Manufacturing: <strong className="text-slate-900">Hyderabad, Telangana</strong></div>
                <div>Total Catalog Items: <strong className="text-sky-700">{stats?.total || 375} Products</strong></div>
                <div>Data Source: <strong className="text-emerald-700">WooCommerce CSV Sync</strong></div>
              </div>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};