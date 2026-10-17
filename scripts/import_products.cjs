const fs = require('fs');
const path = require('path');

const csvPath = 'C:/Users/pavid/Downloads/wc-product-export-12-10-2026-1791808696518.csv';
const content = fs.readFileSync(csvPath, 'utf8');

function parseCSV(text) {
  const lines = [];
  let row = [''];
  let inQuotes = false;
  
  // Strip BOM if present
  if (text.charCodeAt(0) === 0xFEFF) {
    text = text.slice(1);
  }
  
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

const parseCsvList = (s) => (s ? s.split(',').map(x => x.trim()).filter(Boolean) : []);

const products = parents.map((p, idx) => {
  const id = p.ID || String(idx + 1);
  const vars = varByParent[id] || [];

  // Parse all images
  const rawImages = parseCsvList(p.Images);
  const mainImage = rawImages[0] || 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80';
  const galleryImages = rawImages.length > 1 ? rawImages.slice(1) : [];

  // Parse categories with hierarchy
  const rawCatList = parseCsvList(p.Categories);
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

  // Brands
  const rawBrands = parseCsvList(p.Brands);
  let brand = rawBrands[0] || '';
  if (!brand) {
    const cLower = primaryCatPath.toLowerCase();
    const nLower = (p.Name || '').toLowerCase();
    if (cLower.includes('kent') || nLower.includes('kent')) brand = 'Kent';
    else if (cLower.includes('ao smith') || nLower.includes('ao smith')) brand = 'AO SMITH';
    else if (cLower.includes('zerob') || nLower.includes('zero b') || nLower.includes('zerob')) brand = 'ZeroB';
    else if (cLower.includes('enviro') || nLower.includes('enviro')) brand = 'Enviro';
    else if (cLower.includes('purella') || nLower.includes('purella')) brand = 'Purella';
    else if (cLower.includes('aakash') || nLower.includes('aakash')) brand = 'Aakash Water Purifiers';
    else if (cLower.includes('wave') || nLower.includes('wave')) brand = 'WAVE';
    else if (cLower.includes('conway') || nLower.includes('conway')) brand = 'Conway SS Residential';
    else if (cLower.includes('aquaguard') || nLower.includes('aquaguard')) brand = 'Aquaguard';
  }

  // Tags
  const rawTags = parseCsvList(p.Tags);

  // Compute pricing
  let regularPrice = parseFloat(p['Regular price']) || 0;
  let salePrice = parseFloat(p['Sale price']) || 0;
  let minPrice = regularPrice;
  let maxPrice = regularPrice;

  if (vars.length > 0) {
    const varPrices = vars
      .map(v => parseFloat(v['Sale price']) || parseFloat(v['Regular price']) || 0)
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
    const vis = p[`Attribute ${a} visible`];
    const glb = p[`Attribute ${a} global`];
    const dflt = p[`Attribute ${a} default`];
    if (name && vals) {
      attributes.push({
        name: name.trim(),
        values: parseCsvList(vals),
        visible: vis === '1',
        global: glb === '1',
        default: (dflt || '').trim()
      });
    }
  }

  // Format all variations
  const formattedVars = vars.map((v, vIdx) => {
    const attrVals = {};
    const labels = [];
    for (let a = 1; a <= 5; a++) {
      const aname = v[`Attribute ${a} name`] || p[`Attribute ${a} name`] || `attr${a}`;
      const aval = (v[`Attribute ${a} value(s)`] || '').trim();
      if (aval) {
        attrVals[aname] = aval;
        labels.push(aval);
      }
    }

    const attrLabel = labels.join(' | ') || `Option #${vIdx + 1}`;
    const vImages = parseCsvList(v.Images);
    const vImg = vImages[0] || mainImage;

    return {
      id: v.ID || `${id}-var-${vIdx + 1}`,
      name: attrLabel,
      sku: v.SKU || `${p.SKU || 'AAT'}-VAR-${vIdx + 1}`,
      regularPrice: parseFloat(v['Regular price']) || regularPrice,
      salePrice: parseFloat(v['Sale price']) || 0,
      inStock: v['In stock?'] === '1' || v['In stock?'] === '',
      stock: parseInt(v.Stock) || 10,
      image: vImg,
      images: vImages.length > 0 ? vImages : [vImg],
      description: (v.Description || '').trim(),
      weight: (v['Weight (kg)'] || '').trim(),
      dimensions: {
        length: (v['Length (cm)'] || '').trim(),
        width: (v['Width (cm)'] || '').trim(),
        height: (v['Height (cm)'] || '').trim()
      },
      attributes: attrVals
    };
  });

  const name = (p.Name || '').trim();
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return {
    id: id,
    name: name,
    slug: slug,
    type: vars.length > 0 ? 'variable' : (p.Type || 'simple'),
    sku: p.SKU || `AAT-${id}`,
    gtin: (p['GTIN, UPC, EAN, or ISBN'] || '').trim(),
    brand: brand,
    brands: rawBrands.length > 0 ? rawBrands : (brand ? [brand] : []),
    category: primaryCatPath,
    parentCategory: parentCategory,
    childCategory: childCategory,
    subCategory: subCategory,
    categories: rawCatList.length > 0 ? rawCatList : [primaryCatPath],
    tags: rawTags,
    regularPrice: regularPrice,
    salePrice: salePrice,
    minPrice: minPrice,
    maxPrice: maxPrice,
    dateSalePriceStarts: (p['Date sale price starts'] || '').trim(),
    dateSalePriceEnds: (p['Date sale price ends'] || '').trim(),
    taxStatus: (p['Tax status'] || 'taxable').trim(),
    taxClass: (p['Tax class'] || '').trim(),
    inStock: p['In stock?'] === '1' || p['In stock?'] === '',
    stock: parseInt(p.Stock) || 10,
    lowStockAmount: (p['Low stock amount'] || '').trim(),
    backordersAllowed: p['Backorders allowed?'] === '1',
    soldIndividually: p['Sold individually?'] === '1',
    featured: p['Is featured?'] === '1',
    published: p.Published !== '0',
    visibility: (p['Visibility in catalog'] || 'visible').trim(),
    allowReviews: p['Allow customer reviews?'] !== '0',
    purchaseNote: (p['Purchase note'] || '').trim(),
    shippingClass: (p['Shipping class'] || '').trim(),
    externalUrl: (p['External URL'] || '').trim(),
    buttonText: (p['Button text'] || '').trim(),
    position: parseInt(p.Position) || 0,
    upsells: parseCsvList(p.Upsells),
    crossSells: parseCsvList(p['Cross-sells']),
    groupedProducts: parseCsvList(p['Grouped products']),
    publishDate: '2026-10-12 18:11:00',
    createdAt: '2026-06-15 10:00:00',
    updatedAt: new Date().toISOString(),
    mainImage: mainImage,
    galleryImages: galleryImages,
    images: rawImages.length > 0 ? rawImages : [mainImage],
    shortDescription: (p['Short description'] || '').trim(),
    description: (p.Description || '').trim(),
    attributes: attributes,
    variationsCount: vars.length,
    variations: formattedVars,
    weight: (p['Weight (kg)'] || '').trim(),
    dimensions: {
      length: (p['Length (cm)'] || '').trim(),
      width: (p['Width (cm)'] || '').trim(),
      height: (p['Height (cm)'] || '').trim()
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

console.log('Successfully imported and structured', products.length, 'products with full A to Z fields and variations!');