import React, { useState, useEffect } from 'react';
import { ProductItem, createProduct, updateProduct } from '../services/api';
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  Upload, 
  Plus, 
  Image as ImageIcon, 
  Layers, 
  Check, 
  AlertCircle, 
  ExternalLink, 
  X, 
  Star,
  Package,
  DollarSign,
  FileText
} from 'lucide-react';

interface ProductEditorViewProps {
  product: ProductItem | null;
  onBack: () => void;
  onSaved: () => void;
}

export const ProductEditorView: React.FC<ProductEditorViewProps> = ({ product, onBack, onSaved }) => {
  const isNew = !product || !product.id;

  const [formData, setFormData] = useState<Partial<ProductItem>>({
    name: '',
    slug: '',
    type: 'simple',
    sku: `AAT-${Math.floor(1000 + Math.random() * 9000)}`,
    category: 'Industrial RO',
    categories: ['Industrial RO'],
    regularPrice: 25000,
    salePrice: 0,
    inStock: true,
    stock: 10,
    featured: false,
    published: true,
    mainImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    images: [],
    shortDescription: '',
    description: '',
    variations: []
  });

  const [activeTab, setActiveTab] = useState<'general' | 'inventory' | 'variations'>('general');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New gallery image input state
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [showAddGallery, setShowAddGallery] = useState(false);

  // New variation state
  const [newVarAttr, setNewVarAttr] = useState('');
  const [newVarPrice, setNewVarPrice] = useState(0);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        images: product.images && product.images.length > 0 ? product.images : (product.mainImage ? [product.mainImage] : []),
        variations: product.variations || []
      });
      if (product.type === 'variable' || (product.variations && product.variations.length > 0)) {
        setActiveTab('variations');
      }
    }
  }, [product]);

  // Handle local image file upload
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (isGallery) {
        setFormData(prev => ({
          ...prev,
          images: [...(prev.images || []), result]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          mainImage: result,
          images: prev.images && prev.images.length > 0 ? prev.images : [result]
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), newGalleryUrl.trim()]
    }));
    setNewGalleryUrl('');
    setShowAddGallery(false);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData(prev => {
      const updated = [...(prev.images || [])];
      updated.splice(index, 1);
      return {
        ...prev,
        images: updated,
        mainImage: updated.length > 0 ? updated[0] : ''
      };
    });
  };

  const handleSetMainImage = (url: string) => {
    setFormData(prev => ({ ...prev, mainImage: url }));
  };

  const handleAddVariation = () => {
    if (!newVarAttr.trim() || newVarPrice <= 0) return;
    const newVar = {
      id: String(Date.now()),
      sku: `${formData.sku || 'AAT'}-VAR-${Date.now().toString().slice(-4)}`,
      regularPrice: newVarPrice,
      salePrice: 0,
      inStock: true,
      stock: 5,
      attributes: {
        attr1: newVarAttr.trim()
      }
    };
    setFormData(prev => ({
      ...prev,
      type: 'variable',
      variations: [newVar, ...(prev.variations || [])],
      variationsCount: (prev.variations?.length || 0) + 1
    }));
    setNewVarAttr('');
    setNewVarPrice(0);
  };

  const handleRemoveVariation = (idx: number) => {
    setFormData(prev => {
      const vars = [...(prev.variations || [])];
      vars.splice(idx, 1);
      return {
        ...prev,
        variations: vars,
        variationsCount: vars.length
      };
    });
  };

  const handleSave = async () => {
    if (!formData.name?.trim()) {
      setFeedback({ type: 'error', message: 'Product title is required' });
      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      if (isNew) {
        const res = await createProduct(formData);
        if (res.success) {
          setFeedback({ type: 'success', message: 'Product created successfully!' });
          setTimeout(() => onSaved(), 600);
        } else {
          setFeedback({ type: 'error', message: res.message || 'Error creating product' });
        }
      } else if (product?.id) {
        const res = await updateProduct(product.id, formData);
        if (res.success) {
          setFeedback({ type: 'success', message: 'Product updated successfully!' });
          setTimeout(() => onSaved(), 600);
        } else {
          setFeedback({ type: 'error', message: res.message || 'Error updating product' });
        }
      }
    } catch {
      setFeedback({ type: 'error', message: 'Connection error while saving product' });
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Top Breadcrumb & Save Bar */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </button>
            <div className="h-5 w-px bg-slate-800" />
            <div className="text-xs text-slate-400">
              <span>Products</span> / <span className="text-white font-semibold">{isNew ? 'Add New Product' : formData.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : isNew ? 'Publish Product' : 'Update Product'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Form Body */}
      <div className="max-w-7xl w-full mx-auto px-6 py-8 flex-1">
        
        {feedback && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center gap-2 text-sm ${
            feedback.type === 'success' 
              ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' 
              : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
          }`}>
            {feedback.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{feedback.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Primary Content) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Title & Slug Card */}
            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter product title (e.g. 1000 LPH SS COMFORT AUTO RO Plant)"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 text-lg font-bold focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-500">Permalink:</span>
                <span className="text-slate-500">https://aakashaquatech.in/product/</span>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="product-url-slug"
                  className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-sky-400 font-mono text-xs focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Short Description Card */}
            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Product Short Description</span>
                <span className="text-[11px] text-slate-500 normal-case">Displays under product title in catalogs</span>
              </label>
              <textarea
                rows={3}
                placeholder="Brief summary of key specifications, recommended applications, and capacity..."
                value={formData.shortDescription || ''}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500 transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Full Description & Tech Specs */}
            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Full Description & Engineering Specifications
              </label>
              <textarea
                rows={8}
                placeholder="Detailed description, filtration stages, pump horsepower, membrane details, piping specifications..."
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500 transition-colors resize-y leading-relaxed font-sans"
              />
            </div>

            {/* WooCommerce Product Data Tabs Box */}
            <div className="rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md overflow-hidden">
              <div className="bg-slate-950/80 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Product Data</span>
                </div>
                
                <select
                  value={formData.type || 'simple'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-sky-400 focus:outline-none"
                >
                  <option value="simple">Simple product</option>
                  <option value="variable">Variable product</option>
                </select>
              </div>

              {/* Tabs Bar */}
              <div className="flex border-b border-slate-700/80 bg-slate-950/40 px-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('general')}
                  className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'general' ? 'border-sky-500 text-sky-400 bg-slate-800/60' : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>General</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('inventory')}
                  className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'inventory' ? 'border-sky-500 text-sky-400 bg-slate-800/60' : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Inventory</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('variations')}
                  className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'variations' ? 'border-sky-500 text-sky-400 bg-slate-800/60' : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Variations ({formData.variations?.length || 0})</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-6">
                
                {/* General Tab */}
                {activeTab === 'general' && (
                  <div className="space-y-4 max-w-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Regular Price (₹)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.regularPrice || ''}
                          onChange={(e) => setFormData({ ...formData, regularPrice: parseFloat(e.target.value) || 0 })}
                          placeholder="25000"
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Sale Price (₹)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.salePrice || ''}
                          onChange={(e) => setFormData({ ...formData, salePrice: parseFloat(e.target.value) || 0 })}
                          placeholder="0"
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Inventory Tab */}
                {activeTab === 'inventory' && (
                  <div className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        SKU (Stock Keeping Unit)
                      </label>
                      <input
                        type="text"
                        value={formData.sku || ''}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        placeholder="AAT-RO-1000"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Stock Status
                        </label>
                        <select
                          value={formData.inStock ? '1' : '0'}
                          onChange={(e) => setFormData({ ...formData, inStock: e.target.value === '1' })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                        >
                          <option value="1">In Stock</option>
                          <option value="0">Out of Stock</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.stock || ''}
                          onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                          placeholder="10"
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* Variations Tab */}
                {activeTab === 'variations' && (
                  <div className="space-y-6">
                    
                    {/* Add Variation Box */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-700/80 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
                        Add New Product Variation
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="e.g. Dow Filmtec 8040 Membrane"
                          value={newVarAttr}
                          onChange={(e) => setNewVarAttr(e.target.value)}
                          className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                        />
                        <input
                          type="number"
                          placeholder="Price (₹)"
                          min="0"
                          value={newVarPrice || ''}
                          onChange={(e) => setNewVarPrice(parseFloat(e.target.value) || 0)}
                          className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
                        />
                        <button
                          type="button"
                          onClick={handleAddVariation}
                          className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Variation</span>
                        </button>
                      </div>
                    </div>

                    {/* Variations List */}
                    {formData.variations && formData.variations.length > 0 ? (
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Current Variations ({formData.variations.length})
                        </div>
                        <div className="divide-y divide-slate-700/60 border border-slate-700 rounded-xl overflow-hidden bg-slate-950">
                          {formData.variations.map((v: any, idx: number) => {
                            const attrDisplay = v.attributes 
                              ? Object.values(v.attributes).filter(Boolean).join(' | ') 
                              : (v.sku || `Option #${idx + 1}`);

                            return (
                              <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/60 transition-colors">
                                <div className="space-y-1">
                                  <div className="font-semibold text-xs text-white">
                                    {attrDisplay || `Variation #${idx + 1}`}
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                                    <span>SKU: {v.sku || 'N/A'}</span>
                                    <span>|</span>
                                    <span className="text-emerald-400 font-bold">
                                      ₹{(v.regularPrice || 0).toLocaleString('en-IN')}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveVariation(idx)}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors"
                                    title="Delete variation"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-500 text-xs">
                        No variations created yet. Enter an attribute and price above to add one.
                      </div>
                    )}

                  </div>
                )}

              </div>
            </div>

          </div>

          {/* Right Column (Sidebar Widgets) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Publish Actions Widget */}
            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Publish Status</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {formData.published ? 'Published' : 'Draft'}
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <label className="flex items-center justify-between cursor-pointer py-1">
                  <span>Mark as Featured Product</span>
                  <input
                    type="checkbox"
                    checked={Boolean(formData.featured)}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-600 bg-slate-950 border-slate-700"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer py-1">
                  <span>In Stock Availability</span>
                  <input
                    type="checkbox"
                    checked={Boolean(formData.inStock)}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 bg-slate-950 border-slate-700"
                  />
                </label>
              </div>

              <div className="pt-2 border-t border-slate-700 flex gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-600/30 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : isNew ? 'Publish Now' : 'Save Changes'}</span>
                </button>
              </div>
            </div>

            {/* Categories Widget */}
            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Product Categories
              </span>

              <select
                value={formData.category || 'Industrial RO'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value, categories: [e.target.value] })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-sky-500"
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

            {/* Featured Primary Image Widget */}
            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Primary Product Image
              </span>

              {formData.mainImage ? (
                <div className="relative group rounded-xl bg-slate-950 border border-slate-700 overflow-hidden h-52 flex items-center justify-center p-2">
                  <img
                    src={formData.mainImage}
                    alt="Featured preview"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <label className="p-2 rounded-lg bg-sky-600 text-white cursor-pointer hover:bg-sky-500" title="Upload Replacement">
                      <Upload className="w-4 h-4" />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageFileUpload(e, false)} />
                    </label>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, mainImage: '' })}
                      className="p-2 rounded-lg bg-rose-600 text-white hover:bg-rose-500"
                      title="Remove Image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-sky-500 hover:bg-slate-950/40 transition-colors">
                  <ImageIcon className="w-8 h-8 text-slate-500 mb-2" />
                  <span className="text-xs font-semibold text-slate-300">Upload Product Image</span>
                  <span className="text-[10px] text-slate-500 mt-1">PNG, JPG, WebP up to 5MB</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageFileUpload(e, false)} />
                </label>
              )}

              {/* Paste URL Option */}
              <div className="pt-2">
                <input
                  type="url"
                  placeholder="Or paste direct image URL (https://...)"
                  value={formData.mainImage || ''}
                  onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Product Gallery Widget */}
            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Product Gallery ({formData.images?.length || 0})
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddGallery(!showAddGallery)}
                  className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {/* Add Gallery URL Form */}
              {showAddGallery && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-700 space-y-2">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                  />
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-[11px] text-sky-400 cursor-pointer flex items-center gap-1 hover:underline">
                      <Upload className="w-3 h-3" /> Upload File
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageFileUpload(e, true)} />
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddGallery(false)}
                        className="px-2 py-1 rounded bg-slate-800 text-[11px] text-slate-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddGalleryUrl}
                        className="px-3 py-1 rounded bg-sky-600 text-white text-[11px] font-semibold"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Gallery Grid */}
              {formData.images && formData.images.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {formData.images.map((imgUrl, index) => (
                    <div key={index} className="relative group aspect-square rounded-lg bg-slate-950 border border-slate-700 overflow-hidden flex items-center justify-center p-1">
                      <img src={imgUrl} alt={`Gallery ${index}`} className="w-full h-full object-contain" />
                      <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleSetMainImage(imgUrl)}
                          className="p-1 rounded bg-sky-600 text-white hover:bg-sky-500"
                          title="Set as Main Image"
                        >
                          <Star className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(index)}
                          className="p-1 rounded bg-rose-600 text-white hover:bg-rose-500"
                          title="Delete Image"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-slate-500 text-xs">
                  No additional gallery images uploaded.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
