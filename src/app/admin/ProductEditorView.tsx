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
  X, 
  Star,
  Package,
  DollarSign,
  Calendar,
  FolderPlus,
  Eye,
  CheckSquare,
  Square
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
    category: 'Industrial RO System > 1000 LPH',
    categories: ['Industrial RO System', 'Industrial RO System > 1000 LPH'],
    regularPrice: 25000,
    salePrice: 0,
    inStock: true,
    stock: 10,
    featured: false,
    published: true,
    publishDate: '2026-09-30T10:00',
    createdAt: '2026-06-15 10:00:00',
    mainImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [],
    images: [],
    shortDescription: '',
    description: '',
    variations: []
  });

  const [activeTab, setActiveTab] = useState<'general' | 'inventory' | 'variations'>('general');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Gallery input state
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [showAddGalleryUrl, setShowAddGalleryUrl] = useState(false);

  // Category addition state
  const [newCatName, setNewCatName] = useState('');
  const [newCatParent, setNewCatParent] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  // New variation state
  const [newVarName, setNewVarName] = useState('');
  const [newVarSku, setNewVarSku] = useState('');
  const [newVarPrice, setNewVarPrice] = useState(0);

  // Category taxonomy list with parent-child relationships
  const defaultCategoryHierarchy = [
    {
      parent: 'Industrial RO System',
      children: [
        'Industrial RO System > 250 LPH',
        'Industrial RO System > 500 LPH',
        'Industrial RO System > 1000 LPH',
        'Industrial RO System > 2000 LPH',
        'Industrial RO System > 3000 LPH',
        'Industrial RO System > 5000 LPH'
      ]
    },
    {
      parent: 'Domestic RO',
      children: [
        'Domestic RO > AO SMITH',
        'Domestic RO > AO SMITH > RO Water Purifier',
        'Domestic RO > AO SMITH > UV Water Purifier',
        'Domestic RO > Aquaguard',
        'Domestic RO > Aquaguard > RO Water Purifier',
        'Domestic RO > Aquaguard > UV Water Purifier',
        'Domestic RO > kent',
        'Domestic RO > kent > RO Water Purifier',
        'Domestic RO > kent > UV Water Purifier',
        'Domestic RO > Wave',
        'Domestic RO > ZeroB',
        'Domestic RO > Purella'
      ]
    },
    {
      parent: 'Domestic Ro Aakash',
      children: [
        'Domestic Ro Aakash > Domestic RO System',
        'Domestic Ro Aakash > Domestic RO System > 12 LPH',
        'Domestic Ro Aakash > Aakash Purifier'
      ]
    },
    {
      parent: 'Water Treatment',
      children: [
        'Water Treatment > Softner',
        'Water Treatment > DM Plant',
        'Water Treatment > STP / ETP'
      ]
    },
    {
      parent: 'Under Sink',
      children: [
        'Under Sink > Alkaline',
        'Under Sink > RO Purifier'
      ]
    },
    {
      parent: 'SS WATER DISPENSER',
      children: [
        'SS WATER DISPENSER > 20 Liters',
        'SS WATER DISPENSER > 40 Liters',
        'SS WATER DISPENSER > 100 Liters'
      ]
    },
    {
      parent: 'Spares & Consumables',
      children: [
        'Spares > RO Membranes',
        'Spares > High Pressure Pumps',
        'Spares > Multiport Valves',
        'Spares > Filter Media & Sand'
      ]
    },
    {
      parent: 'FRP Pressure Vessels',
      children: [
        'FRP Pressure Vessels > 1054',
        'FRP Pressure Vessels > 1354',
        'FRP Pressure Vessels > 1465'
      ]
    }
  ];

  const [categoriesHierarchy, setCategoriesHierarchy] = useState(defaultCategoryHierarchy);

  useEffect(() => {
    if (product) {
      const allImgs = product.images && product.images.length > 0 ? product.images : (product.mainImage ? [product.mainImage] : []);
      const gImgs = product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : allImgs.slice(1);

      setFormData({
        ...product,
        mainImage: product.mainImage || allImgs[0] || '',
        images: allImgs,
        galleryImages: gImgs,
        publishDate: product.publishDate ? product.publishDate.replace(' ', 'T').slice(0, 16) : '2026-09-30T10:00',
        variations: product.variations || []
      });

      if (product.type === 'variable' || (product.variations && product.variations.length > 0)) {
        setActiveTab('variations');
      }
    }
  }, [product]);

  // Toggle Category Checkbox
  const handleToggleCategory = (catPath: string) => {
    setFormData(prev => {
      const existing = prev.categories || [];
      const updated = existing.includes(catPath) 
        ? existing.filter(c => c !== catPath) 
        : [...existing, catPath];
      return {
        ...prev,
        categories: updated,
        category: updated[0] || 'General'
      };
    });
  };

  // Add New Custom Category
  const handleAddNewCategory = () => {
    if (!newCatName.trim()) return;
    const catName = newCatName.trim();
    const fullPath = newCatParent ? `${newCatParent} > ${catName}` : catName;

    setCategoriesHierarchy(prev => {
      if (newCatParent) {
        return prev.map(group => {
          if (group.parent === newCatParent) {
            return { ...group, children: [...group.children, fullPath] };
          }
          return group;
        });
      } else {
        return [...prev, { parent: catName, children: [] }];
      }
    });

    handleToggleCategory(fullPath);
    setNewCatName('');
    setNewCatParent('');
    setShowAddCategory(false);
  };
  // Handle Multiple Image File Uploads
  const handleMultipleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setFormData(prev => {
          const currentMain = prev.mainImage || result;
          const currentGallery = [...(prev.galleryImages || []), result];
          const allImages = [currentMain, ...currentGallery];
          return {
            ...prev,
            mainImage: currentMain,
            galleryImages: currentGallery,
            images: allImages
          };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    const url = newGalleryUrl.trim();
    setFormData(prev => {
      const currentGallery = [...(prev.galleryImages || []), url];
      const allImages = [prev.mainImage || url, ...currentGallery];
      return {
        ...prev,
        galleryImages: currentGallery,
        images: allImages
      };
    });
    setNewGalleryUrl('');
    setShowAddGalleryUrl(false);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData(prev => {
      const updatedGallery = [...(prev.galleryImages || [])];
      updatedGallery.splice(index, 1);
      return {
        ...prev,
        galleryImages: updatedGallery,
        images: [prev.mainImage || '', ...updatedGallery].filter(Boolean)
      };
    });
  };

  const handleSetMainImage = (url: string) => {
    setFormData(prev => {
      const currentGallery = (prev.galleryImages || []).filter(u => u !== url);
      if (prev.mainImage && prev.mainImage !== url) {
        currentGallery.unshift(prev.mainImage);
      }
      return {
        ...prev,
        mainImage: url,
        galleryImages: currentGallery,
        images: [url, ...currentGallery]
      };
    });
  };

  // Variation Field Change (Full In-Place Editing)
  const handleVariationChange = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const vars = [...(prev.variations || [])];
      vars[index] = { ...vars[index], [field]: value };
      return {
        ...prev,
        variations: vars
      };
    });
  };

  // Add Variation
  const handleAddVariation = () => {
    if (!newVarName.trim()) return;
    const newVar = {
      id: String(Date.now()),
      name: newVarName.trim(),
      sku: newVarSku.trim() || `${formData.sku || 'AAT'}-VAR-${Date.now().toString().slice(-4)}`,
      regularPrice: newVarPrice || formData.regularPrice || 0,
      salePrice: 0,
      inStock: true,
      stock: 10,
      attributes: {
        attr1: newVarName.trim()
      }
    };

    setFormData(prev => ({
      ...prev,
      type: 'variable',
      variations: [newVar, ...(prev.variations || [])],
      variationsCount: (prev.variations?.length || 0) + 1
    }));
    setNewVarName('');
    setNewVarSku('');
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

  // Save product
  const handleSave = async () => {
    if (!formData.name?.trim()) {
      setFeedback({ type: 'error', message: 'Product title is required' });
      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      const payload: Partial<ProductItem> = {
        ...formData,
        updatedAt: new Date().toISOString(),
        images: [formData.mainImage || '', ...(formData.galleryImages || [])].filter(Boolean)
      };

      if (isNew) {
        const res = await createProduct(payload);
        if (res.success) {
          setFeedback({ type: 'success', message: 'Product published successfully!' });
          setTimeout(() => onSaved(), 500);
        } else {
          setFeedback({ type: 'error', message: res.message || 'Error creating product' });
        }
      } else if (product?.id) {
        const res = await updateProduct(product.id, payload);
        if (res.success) {
          setFeedback({ type: 'success', message: 'Product updated successfully!' });
          setTimeout(() => onSaved(), 500);
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans -m-6 sm:-m-8">
      
      {/* Top Breadcrumb & Save Action Bar - Crisp White Theme */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 sm:px-8 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-2 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </button>
            <div className="h-5 w-px bg-slate-200" />
            <div className="text-xs text-slate-500">
              <span>Products</span> / <span className="text-slate-900 font-bold">{isNew ? 'Add New Product' : formData.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/25 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : isNew ? 'Publish Product' : 'Update Product'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Form Body - Clean White Theme */}
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 py-8 flex-1">
        
        {feedback && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center gap-2 text-sm ${
            feedback.type === 'success' 
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}>
            {feedback.type === 'success' ? <Check className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
            <span className="font-semibold">{feedback.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Primary Content) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Title & Slug Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter product title (e.g. 1000 LPH SS COMFORT AUTO RO Plant)"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-lg font-bold focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold">Permalink:</span>
                <span className="text-slate-400">https://aakashaquatech.in/product/</span>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="product-url-slug"
                  className="px-2 py-1 rounded bg-slate-50 border border-slate-300 text-sky-700 font-mono text-xs focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Short Description Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>Product Short Description</span>
                <span className="text-[11px] text-slate-400 normal-case">Displays under product title in catalogs</span>
              </label>
              <textarea
                rows={3}
                placeholder="Brief summary of key specifications, recommended applications, and capacity..."
                value={formData.shortDescription || ''}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Full Description & Tech Specs */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Full Description & Engineering Specifications
              </label>
              <textarea
                rows={8}
                placeholder="Detailed description, filtration stages, pump horsepower, membrane details, piping specifications..."
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 transition-colors resize-y leading-relaxed font-sans"
              />
            </div>

            {/* WooCommerce Product Data Tabs Box */}
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-sky-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Product Data</span>
                </div>
                
                <select
                  value={formData.type || 'simple'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-sky-700 focus:outline-none focus:border-sky-500 shadow-sm"
                >
                  <option value="simple">Simple product</option>
                  <option value="variable">Variable product</option>
                </select>
              </div>

              {/* Tabs Bar */}
              <div className="flex border-b border-slate-200 bg-slate-100/50 px-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('general')}
                  className={`px-4 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'general' ? 'border-sky-600 text-sky-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>General Pricing</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('inventory')}
                  className={`px-4 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'inventory' ? 'border-sky-600 text-sky-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Inventory / SKU</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('variations')}
                  className={`px-4 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === 'variations' ? 'border-sky-600 text-sky-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'
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
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Regular Price (₹) *
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.regularPrice || ''}
                          onChange={(e) => setFormData({ ...formData, regularPrice: parseFloat(e.target.value) || 0 })}
                          placeholder="25000"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Sale Price (₹)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.salePrice || ''}
                          onChange={(e) => setFormData({ ...formData, salePrice: parseFloat(e.target.value) || 0 })}
                          placeholder="0"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Inventory Tab */}
                {activeTab === 'inventory' && (
                  <div className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        SKU (Stock Keeping Unit)
                      </label>
                      <input
                        type="text"
                        value={formData.sku || ''}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        placeholder="AAT-RO-1000"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500 font-mono font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Stock Status
                        </label>
                        <select
                          value={formData.inStock ? '1' : '0'}
                          onChange={(e) => setFormData({ ...formData, inStock: e.target.value === '1' })}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500 font-semibold"
                        >
                          <option value="1">In Stock</option>
                          <option value="0">Out of Stock</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.stock || ''}
                          onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                          placeholder="10"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* Variations Tab - FULLY EDITABLE VARIATIONS */}
                {activeTab === 'variations' && (
                  <div className="space-y-6">
                    
                    {/* Add Variation Bar */}
                    <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-sky-800 flex items-center justify-between">
                        <span>+ Add New Product Variation</span>
                        <span className="text-[11px] text-sky-600 font-normal">e.g. Specific Membrane, Motor, or Flow Rate Option</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <input
                          type="text"
                          placeholder="Option Name (e.g. Dow Filmtec 8040 Membrane)"
                          value={newVarName}
                          onChange={(e) => setNewVarName(e.target.value)}
                          className="sm:col-span-2 px-3 py-2 rounded-xl bg-white border border-sky-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Variation SKU (e.g. AAT-VAR-101)"
                          value={newVarSku}
                          onChange={(e) => setNewVarSku(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-white border border-sky-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 font-mono"
                        />
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="Price (₹)"
                            min="0"
                            value={newVarPrice || ''}
                            onChange={(e) => setNewVarPrice(parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-sky-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 font-mono font-bold"
                          />
                          <button
                            type="button"
                            onClick={handleAddVariation}
                            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold whitespace-nowrap shadow-sm"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Variations List - Every field editable */}
                    {formData.variations && formData.variations.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Manage Variations ({formData.variations.length})
                          </div>
                          <span className="text-[11px] text-slate-500">All fields below are directly editable</span>
                        </div>

                        <div className="space-y-3">
                          {formData.variations.map((v: any, idx: number) => {
                            const optionLabel = v.name || (v.attributes ? Object.values(v.attributes).filter(Boolean).join(' | ') : `Variation #${idx + 1}`);

                            return (
                              <div 
                                key={v.id || idx} 
                                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-sky-300 transition-colors space-y-3"
                              >
                                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2.5">
                                  <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold flex items-center justify-center">
                                      {idx + 1}
                                    </span>
                                    <span className="text-xs font-bold text-slate-800">
                                      Variation Details
                                    </span>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleRemoveVariation(idx)}
                                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                    title="Delete Variation"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                  
                                  {/* Attribute / Option Name */}
                                  <div className="sm:col-span-4">
                                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                      Attribute / Option Name
                                    </label>
                                    <input
                                      type="text"
                                      value={v.name || optionLabel}
                                      onChange={(e) => handleVariationChange(idx, 'name', e.target.value)}
                                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-500 focus:bg-white"
                                    />
                                  </div>

                                  {/* Variation SKU */}
                                  <div className="sm:col-span-2">
                                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                      SKU
                                    </label>
                                    <input
                                      type="text"
                                      value={v.sku || ''}
                                      onChange={(e) => handleVariationChange(idx, 'sku', e.target.value)}
                                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:border-sky-500 focus:bg-white"
                                    />
                                  </div>

                                  {/* Regular Price */}
                                  <div className="sm:col-span-2">
                                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                      Regular Price (₹)
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      value={v.regularPrice || ''}
                                      onChange={(e) => handleVariationChange(idx, 'regularPrice', parseFloat(e.target.value) || 0)}
                                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono font-bold focus:outline-none focus:border-sky-500 focus:bg-white"
                                    />
                                  </div>

                                  {/* Sale Price */}
                                  <div className="sm:col-span-2">
                                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                      Sale Price (₹)
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      value={v.salePrice || ''}
                                      onChange={(e) => handleVariationChange(idx, 'salePrice', parseFloat(e.target.value) || 0)}
                                      placeholder="0"
                                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:border-sky-500 focus:bg-white"
                                    />
                                  </div>

                                  {/* Stock Status */}
                                  <div className="sm:col-span-2">
                                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                      Stock
                                    </label>
                                    <select
                                      value={v.inStock ? '1' : '0'}
                                      onChange={(e) => handleVariationChange(idx, 'inStock', e.target.value === '1')}
                                      className="w-full px-2 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-500 focus:bg-white"
                                    >
                                      <option value="1">In Stock</option>
                                      <option value="0">Out of Stock</option>
                                    </select>
                                  </div>

                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500 text-xs">
                        No variations created yet. Enter an option name and price above to add one.
                      </div>
                    )}

                  </div>
                )}

              </div>
            </div>

          </div>

          {/* Right Column (Sidebar Widgets) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Publish & Date Widget */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" /> Publish Settings
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${formData.published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {formData.published ? 'Published' : 'Draft'}
                </span>
              </div>

              {/* Published Date & Time Editing */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Publish Date & Time</span>
                  <span className="text-[10px] text-slate-400 font-normal">Date shown on store</span>
                </label>
                <input
                  type="datetime-local"
                  value={formData.publishDate || '2026-09-30T10:00'}
                  onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white"
                />
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-700 border-t border-slate-100">
                <label className="flex items-center justify-between cursor-pointer py-1">
                  <span className="font-semibold">Featured Product on Homepage</span>
                  <input
                    type="checkbox"
                    checked={Boolean(formData.featured)}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-600 border-slate-300"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer py-1">
                  <span className="font-semibold">Mark Product In Stock</span>
                  <input
                    type="checkbox"
                    checked={Boolean(formData.inStock)}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 border-slate-300"
                  />
                </label>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/25 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : isNew ? 'Publish Now' : 'Save Changes'}</span>
                </button>
              </div>
            </div>

            {/* Hierarchical Parent & Child Categories Widget */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-600" /> Categories (Taxonomy)
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                >
                  <FolderPlus className="w-3.5 h-3.5" /> + New
                </button>
              </div>

              {/* Add New Category Box */}
              {showAddCategory && (
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="New category name..."
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-sky-200 text-xs focus:outline-none focus:border-sky-500 font-semibold"
                  />
                  <div>
                    <label className="block text-[10px] text-slate-500 font-bold mb-1">Parent Category (Optional):</label>
                    <select
                      value={newCatParent}
                      onChange={(e) => setNewCatParent(e.target.value)}
                      className="w-full px-2 py-1 rounded-lg bg-white border border-sky-200 text-xs text-slate-800"
                    >
                      <option value="">-- No Parent (Root Category) --</option>
                      {categoriesHierarchy.map((g) => (
                        <option key={g.parent} value={g.parent}>{g.parent}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddCategory(false)}
                      className="px-2 py-1 rounded text-slate-600 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddNewCategory}
                      className="px-3 py-1 rounded bg-sky-600 text-white font-bold text-xs"
                    >
                      Add Category
                    </button>
                  </div>
                </div>
              )}

              {/* Categories Tree Checklist */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-1 text-xs">
                {categoriesHierarchy.map((group) => {
                  const isParentChecked = (formData.categories || []).includes(group.parent);

                  return (
                    <div key={group.parent} className="space-y-1">
                      {/* Parent Category Checkbox */}
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 hover:text-sky-700 py-0.5">
                        <input
                          type="checkbox"
                          checked={isParentChecked}
                          onChange={() => handleToggleCategory(group.parent)}
                          className="w-3.5 h-3.5 rounded text-sky-600 border-slate-300"
                        />
                        <span>{group.parent}</span>
                      </label>

                      {/* Child Subcategories Indented */}
                      {group.children && group.children.length > 0 && (
                        <div className="pl-5 space-y-1 border-l-2 border-slate-100 ml-1.5">
                          {group.children.map((childPath) => {
                            const isChildChecked = (formData.categories || []).includes(childPath);
                            const childLabel = childPath.includes('>') 
                              ? childPath.split('>').slice(1).join(' > ').trim()
                              : childPath;

                            return (
                              <label 
                                key={childPath} 
                                className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 py-0.5"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChildChecked}
                                  onChange={() => handleToggleCategory(childPath)}
                                  className="w-3 h-3 rounded text-sky-600 border-slate-300"
                                />
                                <span>{childLabel}</span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Featured Primary Image Widget */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Primary Product Image
              </span>

              {formData.mainImage ? (
                <div className="relative group rounded-xl bg-slate-50 border border-slate-200 overflow-hidden h-52 flex items-center justify-center p-3">
                  <img
                    src={formData.mainImage}
                    alt="Featured preview"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <label className="p-2.5 rounded-xl bg-sky-600 text-white cursor-pointer hover:bg-sky-500 shadow" title="Upload Replacement">
                      <Upload className="w-4 h-4" />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const res = ev.target?.result as string;
                            setFormData(prev => ({ ...prev, mainImage: res }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }} />
                    </label>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, mainImage: '' })}
                      className="p-2.5 rounded-xl bg-rose-600 text-white hover:bg-rose-500 shadow"
                      title="Remove Image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-sky-500 hover:bg-sky-50/50 transition-colors">
                  <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs font-bold text-slate-700">Upload Featured Image</span>
                  <span className="text-[10px] text-slate-400 mt-1">PNG, JPG, WebP</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const res = ev.target?.result as string;
                        setFormData(prev => ({ ...prev, mainImage: res }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }} />
                </label>
              )}

              <input
                type="url"
                placeholder="Or paste direct image URL (https://...)"
                value={formData.mainImage || ''}
                onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Product Gallery Widget - PROMINENT MULTIPLE UPLOAD & REMOVE */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Product Gallery
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {formData.galleryImages?.length || 0} images in gallery
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Multiple file upload button */}
                  <label className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold flex items-center gap-1 cursor-pointer border border-sky-200 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Images</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                      onChange={handleMultipleImageUpload} 
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowAddGalleryUrl(!showAddGalleryUrl)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                    title="Add by URL"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add by URL box */}
              {showAddGalleryUrl && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <input
                    type="url"
                    placeholder="Paste image URL (https://...)"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-sky-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddGalleryUrl(false)}
                      className="px-2 py-1 rounded text-slate-500 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddGalleryUrl}
                      className="px-3 py-1 rounded bg-sky-600 text-white text-xs font-bold"
                    >
                      Add Image
                    </button>
                  </div>
                </div>
              )}

              {/* Gallery Grid with Delete and Set-As-Main */}
              {formData.galleryImages && formData.galleryImages.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {formData.galleryImages.map((imgUrl, index) => (
                    <div 
                      key={index} 
                      className="relative group aspect-square rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center p-1"
                    >
                      <img src={imgUrl} alt={`Gallery ${index}`} className="w-full h-full object-contain" />
                      
                      <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleSetMainImage(imgUrl)}
                          className="p-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-500 shadow"
                          title="Make Primary Image"
                        >
                          <Star className="w-3.5 h-3.5 fill-white" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(index)}
                          className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-500 shadow"
                          title="Delete from Gallery"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400">
                  No additional gallery images. Click "Upload Images" above to add product angles.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
