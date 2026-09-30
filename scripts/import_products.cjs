const fs = require('fs');
const path = require('path');

const csvPath = 'C:/Users/pavid/Downloads/wc-product-export-30-9-2026-1790749178678.csv';
const content = fs.readFileSync(csvPath, 'utf8');

function parseCSV(text) {
  const lines = [];
  let row = [''];
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    
    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push('');
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') i++;
      lines.push(row);
      row = [''];
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== '') lines.push(row);
  return lines;
}

const rows = parseCSV(content);
const headers = rows[0].map(h => h.trim());

const records = [];
for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  if (r.length < 2) continue;
  const obj = {};
  for (let j = 0; j < headers.length; j++) {
    obj[headers[j]] = (r[j] || '').trim();
  }
  records.push(obj);
}

const parents = records.filter(r => r.Type !== 'variation');
const variations = records.filter(r => r.Type === 'variation');

// Group variations by parent ID
const varByParent = {};
for (const v of variations) {
  let parentId = (v.Parent || '').replace(/^id:/i, '').trim();
  if (!parentId) continue;
  if (!varByParent[parentId]) varByParent[parentId] = [];
  varByParent[parentId].push(v);
}

// Build category tree
const categoryTree = {};
const allCategoryPaths = new Set();

const products = parents.map((p, idx) => {
  const id = p.ID || String(idx + 1);
  const vars = varByParent[id] || [];

  // Parse all images
  const rawImages = (p.Images || '')
    .split(',')
    .map(u => u.trim())
    .filter(u => u.length > 0);

  // Featured main image is 1st image
  const mainImage = rawImages[0] || 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80';
  // Gallery images are all images or slice(1)
  const galleryImages = rawImages.length > 1 ? rawImages.slice(1) : [];

  // Parse categories with hierarchy
  const rawCatList = (p.Categories || '')
    .split(',')
    .map(c => c.trim())
    .filter(c => c.length > 0);

  rawCatList.forEach(cp => allCategoryPaths.add(cp));

  const primaryCatPath = rawCatList[0] || 'Water Treatment';
  const catParts = primaryCatPath.split('>').map(s => s.trim());
  const parentCategory = catParts[0] || 'Water Treatment';
  const childCategory = catParts.length > 1 ? catParts[1] : '';
  const subCategory = catParts.length > 2 ? catParts[2] : '';

  // Register in category tree
  if (!categoryTree[parentCategory]) categoryTree[parentCategory] = {};
  if (childCategory) {
    if (!categoryTree[parentCategory][childCategory]) categoryTree[parentCategory][childCategory] = [];
    if (subCategory && !categoryTree[parentCategory][childCategory].includes(subCategory)) {
      categoryTree[parentCategory][childCategory].push(subCategory);
    }
  }

  // Compute pricing
  let regularPrice = parseFloat(p['Regular price']) || 0;
  let salePrice = parseFloat(p['Sale price']) || 0;
  let minPrice = regularPrice;
  let maxPrice = regularPrice;

  if (vars.length > 0) {
    const varPrices = vars
      .map(v => parseFloat(v['Regular price']) || parseFloat(v['Sale price']) || 0)
      .filter(pr => pr > 0);
    
    if (varPrices.length > 0) {
      minPrice = Math.min(...varPrices);
      maxPrice = Math.max(...varPrices);
      if (regularPrice === 0) {
        regularPrice = minPrice;
      }
    }
  }

  // Attributes
  const attributes = [];
  for (let a = 1; a <= 5; a++) {
    const name = p[`Attribute ${a} name`];
    const vals = p[`Attribute ${a} value(s)`];
    if (name && vals) {
      attributes.push({
        name: name.trim(),
        values: vals.split(',').map(s => s.trim()).filter(Boolean)
      });
    }
  }

  // Format all variations so every single field is editable
  const formattedVars = vars.map((v, vIdx) => {
    const attr1Val = v['Attribute 1 value(s)'] || '';
    const attr2Val = v['Attribute 2 value(s)'] || '';
    const attr3Val = v['Attribute 3 value(s)'] || '';
    
    const attrLabel = [attr1Val, attr2Val, attr3Val].filter(Boolean).join(' | ') || `Option #${vIdx + 1}`;

    return {
      id: v.ID || `${id}-var-${vIdx + 1}`,
      name: attrLabel,
      sku: v.SKU || `${p.SKU || 'AAT'}-VAR-${vIdx + 1}`,
      regularPrice: parseFloat(v['Regular price']) || regularPrice,
      salePrice: parseFloat(v['Sale price']) || 0,
      inStock: v['In stock?'] === '1' || v['In stock?'] === '',
      stock: parseInt(v.Stock) || 10,
      attributes: {
        attr1: attr1Val,
        attr2: attr2Val,
        attr3: attr3Val
      }
    };
  });

  return {
    id: id,
    name: p.Name,
    slug: p.Name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    type: vars.length > 0 ? 'variable' : (p.Type || 'simple'),
    sku: p.SKU || `AAT-${id}`,
    category: primaryCatPath,
    parentCategory: parentCategory,
    childCategory: childCategory,
    categories: rawCatList.length > 0 ? rawCatList : [primaryCatPath],
    regularPrice: regularPrice,
    salePrice: salePrice,
    minPrice: minPrice,
    maxPrice: maxPrice,
    inStock: p['In stock?'] === '1' || p['In stock?'] === '',
    stock: parseInt(p.Stock) || 10,
    featured: p['Is featured?'] === '1',
    published: p.Published !== '0',
    publishDate: '2026-09-30 11:30:00',
    createdAt: '2026-06-15 10:00:00',
    updatedAt: new Date().toISOString(),
    mainImage: mainImage,
    galleryImages: galleryImages,
    images: rawImages.length > 0 ? rawImages : [mainImage],
    shortDescription: p['Short description'] || '',
    description: p.Description || '',
    attributes: attributes,
    variationsCount: vars.length,
    variations: formattedVars,
    weight: p['Weight (kg)'] || '',
    dimensions: {
      length: p['Length (cm)'] || '',
      width: p['Width (cm)'] || '',
      height: p['Height (cm)'] || ''
    }
  };
});

// Save to backend/data/products.json and src/data/products.json
const dataDir = path.join(__dirname, '../backend/data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2), 'utf8');

const srcDataDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(srcDataDir)) fs.mkdirSync(srcDataDir, { recursive: true });
fs.writeFileSync(path.join(srcDataDir, 'products.json'), JSON.stringify(products, null, 2), 'utf8');

// Save categories taxonomy
const categoriesData = {
  tree: categoryTree,
  allPaths: Array.from(allCategoryPaths).sort()
};
fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(categoriesData, null, 2), 'utf8');
fs.writeFileSync(path.join(srcDataDir, 'categories.json'), JSON.stringify(categoriesData, null, 2), 'utf8');

console.log('Successfully imported and structured', products.length, 'products with gallery, dates, and variations!');