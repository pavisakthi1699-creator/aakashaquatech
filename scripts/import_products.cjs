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
console.log('Headers:', headers.length);

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

console.log('Parents count:', parents.length);
console.log('Variations count:', variations.length);

// Group variations by parent ID
const varByParent = {};
for (const v of variations) {
  let parentId = (v.Parent || '').replace(/^id:/i, '').trim();
  if (!parentId) continue;
  if (!varByParent[parentId]) varByParent[parentId] = [];
  varByParent[parentId].push(v);
}

// Clean and structure products
const products = parents.map((p, idx) => {
  const id = p.ID || String(idx + 1);
  const vars = varByParent[id] || [];

  // Parse images
  const rawImages = (p.Images || '')
    .split(',')
    .map(u => u.trim())
    .filter(u => u.length > 0);

  // Parse categories
  const categories = (p.Categories || '')
    .split(',')
    .map(c => c.trim())
    .filter(c => c.length > 0);

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

  // Parse primary category for filtering
  let mainCategory = 'Water Treatment';
  if (categories.length > 0) {
    const firstCat = categories[0];
    if (firstCat.toLowerCase().includes('industrial ro')) {
      mainCategory = 'Industrial RO';
    } else if (firstCat.toLowerCase().includes('domestic ro')) {
      mainCategory = 'Domestic RO';
    } else if (firstCat.toLowerCase().includes('softner') || firstCat.toLowerCase().includes('softener')) {
      mainCategory = 'Water Softeners';
    } else if (firstCat.toLowerCase().includes('spares') || firstCat.toLowerCase().includes('accessories') || firstCat.toLowerCase().includes('membrane')) {
      mainCategory = 'Spares & Consumables';
    } else if (firstCat.toLowerCase().includes('under sink')) {
      mainCategory = 'Under Sink RO';
    } else if (firstCat.toLowerCase().includes('dispenser')) {
      mainCategory = 'Water Dispensers';
    } else if (firstCat.toLowerCase().includes('vessel') || firstCat.toLowerCase().includes('frp')) {
      mainCategory = 'FRP Vessels';
    } else {
      mainCategory = firstCat.split('>')[0].trim();
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

  // Variations summary
  const formattedVars = vars.map(v => ({
    id: v.ID,
    sku: v.SKU,
    regularPrice: parseFloat(v['Regular price']) || 0,
    salePrice: parseFloat(v['Sale price']) || 0,
    inStock: v['In stock?'] === '1',
    stock: parseInt(v.Stock) || 0,
    attributes: {
      attr1: v['Attribute 1 value(s)'],
      attr2: v['Attribute 2 value(s)'],
      attr3: v['Attribute 3 value(s)']
    }
  }));

  // Strip html for clean preview
  const cleanShortDesc = (p['Short description'] || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return {
    id: id,
    name: p.Name,
    slug: p.Name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    type: p.Type,
    sku: p.SKU || '',
    category: mainCategory,
    categories: categories,
    regularPrice: regularPrice,
    salePrice: salePrice,
    minPrice: minPrice,
    maxPrice: maxPrice,
    inStock: p['In stock?'] === '1' || p['In stock?'] === '',
    stock: parseInt(p.Stock) || 0,
    featured: p['Is featured?'] === '1',
    published: p.Published === '1',
    images: rawImages,
    mainImage: rawImages[0] || 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    shortDescription: cleanShortDesc,
    description: p.Description || '',
    attributes: attributes,
    variationsCount: vars.length,
    variations: formattedVars.slice(0, 20), // Top variations for quick inspection
    weight: p['Weight (kg)'] || '',
    dimensions: {
      length: p['Length (cm)'] || '',
      width: p['Width (cm)'] || '',
      height: p['Height (cm)'] || ''
    },
    updatedAt: new Date().toISOString()
  };
});

console.log('Successfully structured', products.length, 'products');

// Save to backend/data/products.json
const dataDir = path.join(__dirname, '../backend/data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

fs.writeFileSync(
  path.join(dataDir, 'products.json'),
  JSON.stringify(products, null, 2),
  'utf8'
);

// Also copy to src/data/products.json for frontend bundling & instant offline fallback
const srcDataDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(srcDataDir)) fs.mkdirSync(srcDataDir, { recursive: true });

fs.writeFileSync(
  path.join(srcDataDir, 'products.json'),
  JSON.stringify(products, null, 2),
  'utf8'
);

console.log('Saved to backend/data/products.json and src/data/products.json');
