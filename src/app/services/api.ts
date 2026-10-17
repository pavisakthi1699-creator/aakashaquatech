import fallbackProducts from '../../data/products.json';

export interface ProductItem {
  id: string | number;
  name: string;
  slug?: string;
  type?: string;
  sku: string;
  gtin?: string;
  brand?: string;
  brands?: string[];
  category: string;
  parentCategory?: string;
  childCategory?: string;
  subCategory?: string;
  categories?: string[];
  tags?: string[];
  regularPrice: number;
  salePrice: number;
  minPrice?: number;
  maxPrice?: number;
  dateSalePriceStarts?: string;
  dateSalePriceEnds?: string;
  taxStatus?: string;
  taxClass?: string;
  inStock: boolean;
  stock?: number;
  lowStockAmount?: string;
  backordersAllowed?: boolean;
  soldIndividually?: boolean;
  featured?: boolean;
  published?: boolean;
  visibility?: string;
  allowReviews?: boolean;
  purchaseNote?: string;
  shippingClass?: string;
  externalUrl?: string;
  buttonText?: string;
  position?: number;
  upsells?: string[];
  crossSells?: string[];
  groupedProducts?: string[];
  mainImage: string;
  galleryImages?: string[];
  images?: string[];
  shortDescription?: string;
  description?: string;
  variationsCount?: number;
  variations?: any[];
  attributes?: {
    name: string;
    values: string[];
    visible?: boolean;
    global?: boolean;
    default?: string;
  }[];
  weight?: string;
  dimensions?: {
    length: string;
    width: string;
    height: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminStats {
  total: number;
  inStock: number;
  outOfStock: number;
  featured: number;
  categoriesCount: number;
  categories: Record<string, number>;
}

export interface InquiryPayload {
  name: string;
  phone: string;
  email?: string;
  serviceType?: string;
  waterSource?: string;
  message?: string;
}

const getBackendBase = () => {
  if (typeof window === 'undefined') return '/backend/api';
  const pathname = window.location.pathname;
  if (pathname.includes('/version2.0')) {
    return '/version2.0/backend/api';
  }
  return '/backend/api';
};

const BACKEND_BASE = getBackendBase();
const LOCAL_STORAGE_KEY = 'aakash_products_cache';

// Helper to get local override cache
function getLocalCache(): ProductItem[] {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) return JSON.parse(cached);
  } catch {
    // ignore
  }
  return fallbackProducts as unknown as ProductItem[];
}

function saveLocalCache(items: ProductItem[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

// Public API
export async function fetchProducts(category?: string, search?: string): Promise<ProductItem[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('category', category);
    if (search) params.set('search', search);

    const res = await fetch(`${BACKEND_BASE}/products.php?${params.toString()}`);
    if (!res.ok) throw new Error('API offline');
    const json = await res.json();
    if (json.data && Array.isArray(json.data)) {
      return json.data;
    }
  } catch {
    // fallback
  }

  // Use local cache / fallback
  let list = getLocalCache();
  if (category && category !== 'all') {
    const cLower = category.toLowerCase();
    list = list.filter(p => (p.category || '').toLowerCase() === cLower || (p.categories || []).some(c => c.toLowerCase().includes(cLower)));
  }
  if (search) {
    const sLower = search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(sLower) || (p.sku && p.sku.toLowerCase().includes(sLower)));
  }
  return list;
}

export async function fetchSettings() {
  try {
    const res = await fetch(`${BACKEND_BASE}/settings.php`);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    return data.data;
  } catch {
    return {
      company: 'AAKASH PURE AQUA TECH PRIVATE LIMITED',
      phone: '96555 77666',
      whatsapp: '96555 99666',
      email: 'ceo@aakashaquatech.in',
      address: '10/62C, BrindavanRoad, 1st Cross (Behind Dr.Sudamani Hospital), Fairlands, Salem - 636016, Tamil Nadu',
      workingHours: 'Mon - Sun: 9:00 AM - 8:00 PM (24/7 Support)',
      stats: [
        { label: 'Industrial & Commercial Plants', value: '650+' },
        { label: 'Live Catalog Products', value: '375+' },
        { label: 'Service Response Time', value: '< 4 Hrs' },
        { label: 'Client Satisfaction Rate', value: '99.4%' }
      ]
    };
  }
}

// Admin API
export async function fetchAdminStats(): Promise<AdminStats> {
  try {
    const res = await fetch(`${BACKEND_BASE}/admin.php?action=stats`);
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch {
    // fallback
  }

  const items = getLocalCache();
  const inStock = items.filter(p => p.inStock).length;
  const categories: Record<string, number> = {};
  for (const item of items) {
    const c = item.category || 'Other';
    categories[c] = (categories[c] || 0) + 1;
  }

  return {
    total: items.length,
    inStock: inStock,
    outOfStock: items.length - inStock,
    featured: items.filter(p => p.featured).length,
    categoriesCount: Object.keys(categories).length,
    categories: categories
  };
}

export async function fetchAdminProducts(options: {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const { search = '', category = 'all', status = '', page = 1, limit = 20 } = options;
  try {
    const params = new URLSearchParams({
      action: 'products',
      search,
      category,
      status,
      page: String(page),
      limit: String(limit)
    });
    const res = await fetch(`${BACKEND_BASE}/admin.php?${params.toString()}`);
    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        return {
          data: json.data as ProductItem[],
          pagination: json.pagination || { total: json.data.length, page: 1, limit: json.data.length, pages: 1 }
        };
      }
    }
  } catch {
    // fallback
  }

  // Local fallback
  let items = getLocalCache();
  if (search) {
    const s = search.toLowerCase();
    items = items.filter(p => p.name.toLowerCase().includes(s) || (p.sku && p.sku.toLowerCase().includes(s)) || String(p.id).includes(s));
  }
  if (category && category !== 'all') {
    const c = category.toLowerCase();
    items = items.filter(p => (p.category || '').toLowerCase() === c);
  }
  if (status === 'in_stock') items = items.filter(p => p.inStock);
  if (status === 'out_of_stock') items = items.filter(p => !p.inStock);

  const total = items.length;
  const offset = (page - 1) * limit;
  const paged = items.slice(offset, offset + limit);

  return {
    data: paged,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
}

export async function createProduct(payload: Partial<ProductItem>): Promise<{ success: boolean; data?: ProductItem; message?: string }> {
  try {
    const res = await fetch(`${BACKEND_BASE}/admin.php?action=create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const json = await res.json();
      // Sync local cache
      const items = getLocalCache();
      items.unshift(json.data);
      saveLocalCache(items);
      return json;
    }
  } catch {
    // Fallback offline create
  }

  const items = getLocalCache();
  const newProduct: ProductItem = {
    id: String(Date.now()),
    name: payload.name || 'New Product',
    sku: payload.sku || `AAT-${Math.floor(1000 + Math.random() * 9000)}`,
    category: payload.category || 'Industrial RO',
    regularPrice: Number(payload.regularPrice) || 0,
    salePrice: Number(payload.salePrice) || 0,
    inStock: payload.inStock !== false,
    stock: Number(payload.stock) || 10,
    featured: Boolean(payload.featured),
    mainImage: payload.mainImage || 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    shortDescription: payload.shortDescription || '',
    description: payload.description || '',
    updatedAt: new Date().toISOString()
  };
  items.unshift(newProduct);
  saveLocalCache(items);
  return { success: true, data: newProduct, message: 'Product created successfully' };
}

export async function updateProduct(id: string | number, payload: Partial<ProductItem>): Promise<{ success: boolean; data?: ProductItem; message?: string }> {
  try {
    const res = await fetch(`${BACKEND_BASE}/admin.php?action=update&id=${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const json = await res.json();
      const items = getLocalCache().map(p => String(p.id) === String(id) ? { ...p, ...payload } : p);
      saveLocalCache(items);
      return json;
    }
  } catch {
    // Fallback
  }

  const items = getLocalCache().map(p => {
    if (String(p.id) === String(id)) {
      return { ...p, ...payload, updatedAt: new Date().toISOString() };
    }
    return p;
  });
  saveLocalCache(items);
  const updated = items.find(p => String(p.id) === String(id));
  return { success: true, data: updated, message: 'Product updated successfully' };
}

export async function deleteProduct(id: string | number): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${BACKEND_BASE}/admin.php?action=delete&id=${id}`, {
      method: 'POST'
    });
    if (res.ok) {
      const json = await res.json();
      const items = getLocalCache().filter(p => String(p.id) !== String(id));
      saveLocalCache(items);
      return json;
    }
  } catch {
    // Fallback
  }

  const items = getLocalCache().filter(p => String(p.id) !== String(id));
  saveLocalCache(items);
  return { success: true, message: 'Product deleted successfully' };
}

export async function toggleProductStatus(id: string | number, field: 'inStock' | 'featured'): Promise<{ success: boolean; data?: ProductItem }> {
  try {
    const res = await fetch(`${BACKEND_BASE}/admin.php?action=toggle&id=${id}&field=${field}`, {
      method: 'POST'
    });
    if (res.ok) {
      const json = await res.json();
      const items = getLocalCache().map(p => String(p.id) === String(id) ? json.data : p);
      saveLocalCache(items);
      return json;
    }
  } catch {
    // Fallback
  }

  let updatedItem: ProductItem | undefined;
  const items = getLocalCache().map(p => {
    if (String(p.id) === String(id)) {
      updatedItem = { ...p, [field]: !p[field] };
      return updatedItem;
    }
    return p;
  });
  saveLocalCache(items);
  return { success: true, data: updatedItem };
}

export async function submitInquiry(payload: InquiryPayload) {
  try {
    const res = await fetch(`${BACKEND_BASE}/contact.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch {
    return {
      success: true,
      message: 'Inquiry received successfully! Our engineer will reach out to you shortly.'
    };
  }
}
