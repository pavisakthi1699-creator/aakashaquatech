const fs = require('fs');
const path = require('path');

const csvPath = 'C:/Users/pavid/Downloads/wc-product-export-12-10-2026-1791808696518.csv';
const content = fs.readFileSync(csvPath, 'utf8');

function parseCSV(text) {
  const lines = [];
  let row = [''];
  let inQuotes = false;
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
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

const varByParent = {};
for (const v of variations) {
  let parentId = (v.Parent || '').replace(/^id:/i, '').trim();
  if (!parentId) continue;
  if (!varByParent[parentId]) varByParent[parentId] = [];
  varByParent[parentId].push(v);
}

const parseCsvList = (s) => (s ? s.split(',').map(x => x.trim()).filter(Boolean) : []);

function cleanHtml(html) {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .trim();
}

function stripTags(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .trim();
}

function extractFeatures(desc, shortDesc, brandLabel, catName) {
  const features = [];
  const combined = (desc || '') + ' ' + (shortDesc || '');
  const liMatches = combined.matchAll(/<li[^>]*>(.*?)<\/li>/gis);
  for (const m of liMatches) {
    const cleaned = stripTags(m[1]);
    if (cleaned && cleaned.length > 3 && !features.includes(cleaned)) {
      features.push(cleaned);
      if (features.length >= 6) break;
    }
  }

  if (features.length < 2) {
    return [
      `Genuine ${brandLabel} engineered for pure, healthy drinking water`,
      `Multi-stage high-efficiency filtration & purification technology`,
      `Free installation and 24 hours service support across Tamil Nadu`,
      `Certified water quality with TDS balancing and reliable warranty`
    ];
  }
  return features;
}

const brandLabels = {
  'aakash': 'Aakash',
  'kent': 'KENT Mineral RO',
  'aosmith': 'A.O. Smith',
  'zerob': 'ZeroB',
  'wave': "Sarwan's Wave",
  'conway': 'Conway',
  'aquaguard': 'Aquaguard',
  'enviro': 'Enviro',
  'purella': 'Purella',
  'senco': 'Senco',
  'lexcru': 'Lexcru'
};

const categoryNames = {
  'ro': 'RO Water Purifiers',
  'uv': 'UV Water Purifier',
  'alkaline': 'Alkaline',
  'gravity': 'Gravity Water Purifier',
  'undersink': 'Under Sink',
  'dispenser': 'SS Water Dispenser',
  'industrial': 'Commercial RO System',
  'spares': 'Spares',
  'softner': 'Softner',
  'iron': 'Iron Remover Filter',
  'sand': 'Sand Filter',
  'vessel': 'Vessel',
  'sstank': 'SS Tank',
  'dm': 'DM Plant',
  'heatpump': 'Heat Pump'
};

function classify(p) {
  const c = p.Categories || '';
  const fullCats = c.toLowerCase();
  const nameLower = (p.Name || '').toLowerCase();
  const brandRaw = (p.Brands || '').toLowerCase();
  const allText = fullCats + ' ' + nameLower + ' ' + brandRaw;

  let cat = 'ro';
  if (fullCats.includes('softner')) cat = 'softner';
  else if (fullCats.includes('iron')) cat = 'iron';
  else if (fullCats.includes('sand')) cat = 'sand';
  else if (fullCats.includes('vessel')) cat = 'vessel';
  else if (fullCats.includes('ss tank') || fullCats.includes('ss tanks')) cat = 'sstank';
  else if (fullCats.includes('dm plant')) cat = 'dm';
  else if (fullCats.includes('heat pump')) cat = 'heatpump';
  else if (fullCats.includes('dispenser')) cat = 'dispenser';
  else if (fullCats.includes('spares') || fullCats.includes('mop')) cat = 'spares';
  else if (fullCats.includes('industrial') || (fullCats.includes('lph') && !fullCats.includes('domestic'))) cat = 'industrial';
  else if (fullCats.includes('alkaline') && !fullCats.includes('domestic ro')) cat = 'alkaline';
  else if (fullCats.includes('gravity')) cat = 'gravity';
  else if (fullCats.includes('under sink') || fullCats.includes('undersink')) cat = 'undersink';
  else if (fullCats.includes('uv') && !fullCats.includes('ro')) cat = 'uv';
  else cat = 'ro';

  let brand = null;
  if (allText.includes('aquaguard') || allText.includes('aquagaurd')) brand = 'aquaguard';
  else if (allText.includes('ao smith') || allText.includes('smith')) brand = 'aosmith';
  else if (allText.includes('kent')) brand = 'kent';
  else if (allText.includes('zerob') || allText.includes('zero b') || allText.includes('hydrolife')) brand = 'zerob';
  else if (allText.includes('wave') || allText.includes('sarwan')) brand = 'wave';
  else if (allText.includes('conway')) brand = 'conway';
  else if (allText.includes('enviro')) brand = 'enviro';
  else if (allText.includes('purella')) brand = 'purella';
  else if (allText.includes('senco')) brand = 'senco';
  else if (allText.includes('lexcru')) brand = 'lexcru';
  else if (allText.includes('aakash')) brand = 'aakash';
  else {
    if (cat === 'ro') brand = 'aakash';
  }

  return { cat, brand };
}

function createProductItem(p, cat, brand, pid, isExtra = false) {
  const name = (p.Name || '').trim();
  const bLabel = brandLabels[brand] || 'Aakash';
  const catName = categoryNames[cat] || 'Water Purifiers';

  // 1. Images strictly from CSV
  const rawParentImages = parseCsvList(p.Images);
  
  // 2. Child variations from CSV rows
  const existingChildVars = varByParent[p.ID] || [];

  // Price calculations
  let reg = parseFloat(p['Regular price']) || 0;
  let sale = parseFloat(p['Sale price']) || 0;

  // Collect parent attributes
  const parentAttributes = [];
  const parentAttrMap = {};
  for (let a = 1; a <= 5; a++) {
    const aname = p[`Attribute ${a} name`];
    const avals = p[`Attribute ${a} value(s)`];
    const vis = p[`Attribute ${a} visible`];
    const dflt = p[`Attribute ${a} default`];
    if (aname && avals) {
      const valsList = parseCsvList(avals);
      parentAttributes.push({
        name: aname.trim(),
        values: valsList,
        visible: vis === '1',
        default: (dflt || '').trim()
      });
      parentAttrMap[aname.trim()] = valsList;
    }
  }

  // Build variations
  let variationsList = [];

  if (existingChildVars.length > 0) {
    // Parent has actual variation rows in the CSV
    variationsList = existingChildVars.map((v, vIdx) => {
      const vAttrs = {};
      const labels = [];
      for (let a = 1; a <= 5; a++) {
        const aname = v[`Attribute ${a} name`] || p[`Attribute ${a} name`] || `Attr${a}`;
        const aval = (v[`Attribute ${a} value(s)`] || '').trim();
        if (aval) {
          vAttrs[aname] = aval;
          labels.push(aval);
        }
      }

      const vImages = parseCsvList(v.Images);
      // Strictly use variation image from CSV, fallback to parent image
      const vImg = vImages[0] || rawParentImages[0] || '';

      const vReg = parseFloat(v['Regular price']) || reg;
      const vSale = parseFloat(v['Sale price']) || 0;
      const vPrice = vSale > 0 ? vSale : vReg;

      return {
        id: v.ID || `${p.ID}-var-${vIdx + 1}`,
        name: labels.join(' / ') || `Option #${vIdx + 1}`,
        sku: v.SKU || `${p.SKU || 'AAT'}-VAR-${vIdx + 1}`,
        price: vPrice,
        regularPrice: vReg,
        salePrice: vSale,
        inStock: v['In stock?'] !== '0',
        stock: parseInt(v.Stock) || 10,
        image: vImg,
        images: vImages.length > 0 ? vImages : (vImg ? [vImg] : []),
        description: cleanHtml(v.Description || ''),
        attributes: vAttrs
      };
    });
  } else {
    // Parent does not have child variation rows.
    // Check if parent has multi-value attributes (e.g. Color, Capacity, Variant, Model)
    const multiValAttr = parentAttributes.find(a => 
      ['color', 'colour', 'capacity', 'variant', 'model', 'technology', 'vessel', 'option'].includes(a.name.toLowerCase()) || 
      a.values.length > 1
    );

    if (multiValAttr && multiValAttr.values.length > 1) {
      // Synthesize proper variations based on the attribute values and map to parent images!
      variationsList = multiValAttr.values.map((val, vIdx) => {
        // Map corresponding image from parent images if available
        const vImg = rawParentImages[vIdx] || rawParentImages[0] || '';
        const vAttrs = { [multiValAttr.name]: val };
        return {
          id: `${p.ID}-opt-${vIdx + 1}`,
          name: val,
          sku: `${p.SKU || 'AAT-' + p.ID}-${val.toUpperCase().replace(/[^A-Z0-9]+/g, '-')}`,
          price: sale > 0 ? sale : reg,
          regularPrice: reg,
          salePrice: sale,
          inStock: p['In stock?'] !== '0',
          stock: parseInt(p.Stock) || 10,
          image: vImg,
          images: vImg ? [vImg] : [],
          description: '',
          attributes: vAttrs
        };
      });
    }
  }

  // Derive min and max prices from variations if available
  const varPrices = variationsList.map(v => v.price).filter(pr => pr > 0);
  let price = sale > 0 ? sale : reg;
  let mrp = reg >= price ? reg : price;
  let maxPrice = 0;

  if (varPrices.length > 0) {
    const minVar = Math.min(...varPrices);
    const maxVar = Math.max(...varPrices);
    if (price === 0) price = minVar;
    if (maxVar > price) maxPrice = maxVar;
    if (mrp === 0 || mrp < price) mrp = maxVar;
  }

  const savePct = (price > 0 && mrp > price) ? Math.round((1 - price / mrp) * 100) : 0;

  // Main product image strictly from CSV
  const mainImage = rawParentImages[0] || (variationsList[0] && variationsList[0].image) || '';

  // Gallery: All unique images from CSV parent images AND variation images
  const seenGallery = new Set();
  const gallery = [];
  const addImg = (im) => {
    if (!im) return;
    const trimmed = im.trim();
    if (trimmed && !seenGallery.has(trimmed)) {
      seenGallery.add(trimmed);
      gallery.push(trimmed);
    }
  };

  rawParentImages.forEach(addImg);
  variationsList.forEach(v => {
    addImg(v.image);
    (v.images || []).forEach(addImg);
  });
  if (gallery.length === 0 && mainImage) gallery.push(mainImage);

  // Content & Descriptions
  const rawDesc = cleanHtml(p.Description || '');
  const rawShortDesc = cleanHtml(p['Short description'] || '');
  const cleanSummary = stripTags(p['Short description'] || p.Description || '').slice(0, 320).trim();
  const summary = cleanSummary || `The ${name} is engineered by ${bLabel} to deliver clean, purified, and healthy water with advanced multi-stage purification technology.`;

  const features = extractFeatures(p.Description, p['Short description'], bLabel, catName);

  // Specifications table
  const tech = [
    ['Model', name],
    ['Brand', bLabel],
    ['Category', catName]
  ];
  if (p.SKU) tech.push(['SKU', p.SKU]);

  parentAttributes.forEach(attr => {
    if (attr.name && attr.values.length > 0) {
      tech.push([attr.name, attr.values.join(', ')]);
    }
  });

  const dims = [p['Length (cm)'], p['Width (cm)'], p['Height (cm)']].filter(Boolean);
  if (dims.length > 0) {
    tech.push(['Dimensions (L × W × H)', dims.join(' × ') + ' cm']);
  }
  if (p['Weight (kg)']) {
    tech.push(['Weight', `${p['Weight (kg)']} kg`]);
  }

  // Base slug
  const baseSlug = (p.Slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) || `product-${pid}`;
  const slug = isExtra ? `${baseSlug}-${cat}` : baseSlug;

  return {
    id: String(p.ID || pid),
    slug: slug,
    name: name,
    cat: cat,
    brand: brand,
    price: price,
    max: maxPrice,
    mrp: mrp,
    save: savePct,
    np: price === 0,
    v: variationsList.length > 0,
    inStock: p['In stock?'] !== '0',
    stock: parseInt(p.Stock) || 10,
    img: mainImage,
    big: mainImage,
    gallery: gallery,
    summary: summary,
    description: rawDesc,
    shortDescription: rawShortDesc,
    features: features,
    tech: tech,
    attributes: parentAttributes,
    variations: variationsList,
    variationsCount: variationsList.length
  };
}

const seenSlugs = new Set();
const catalog = [];

parents.forEach((p, idx) => {
  const pid = String(p.ID || idx + 1);
  const { cat, brand } = classify(p);
  const item = createProductItem(p, cat, brand, pid, false);

  if (seenSlugs.has(item.slug)) {
    item.slug = `${item.slug}-${pid}`;
  }
  seenSlugs.add(item.slug);
  catalog.push(item);

  // If RO purifier also mentions UV in name/cat/desc, also index under UV category
  const nLower = (p.Name || '').toLowerCase();
  const cLower = (p.Categories || '').toLowerCase();
  const dLower = (p.Description || '').toLowerCase();
  if (cat === 'ro' && (nLower.includes('uv') || cLower.includes('uv') || dLower.includes('uv')) && !cLower.includes('spares') && !nLower.includes('chamber')) {
    const uvItem = createProductItem(p, 'uv', brand, pid, true);
    if (!seenSlugs.has(uvItem.slug)) {
      seenSlugs.add(uvItem.slug);
      catalog.push(uvItem);
    }
  }
});

console.log(`Generated ${catalog.length} catalog products!`);

// Statistics
const totalWithVars = catalog.filter(p => p.variations && p.variations.length > 0).length;
const totalVariations = catalog.reduce((acc, p) => acc + (p.variations ? p.variations.length : 0), 0);
const totalWithImages = catalog.filter(p => p.img && p.img.length > 5).length;
const totalWithDesc = catalog.filter(p => p.description && p.description.length > 10).length;

console.log(`- Products with variations: ${totalWithVars} (Total variation count across catalog: ${totalVariations})`);
console.log(`- Products with CSV images: ${totalWithImages} / ${catalog.length}`);
console.log(`- Products with full Description: ${totalWithDesc} / ${catalog.length}`);

// Write files
const catalogDataPath = path.join(__dirname, '../src/hpa/catalogData.js');
const jsContent = `// Complete Products Catalog exported from WooCommerce (${catalog.length} items with full variations, images, descriptions)\nexport const catalogProducts = ${JSON.stringify(catalog, null, 2)};\n`;
fs.writeFileSync(catalogDataPath, jsContent, 'utf8');
console.log(`Wrote src/hpa/catalogData.js (${(fs.statSync(catalogDataPath).size / 1024 / 1024).toFixed(2)} MB)`);

const backendProductsPath = path.join(__dirname, '../backend/data/products.json');
fs.writeFileSync(backendProductsPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`Wrote backend/data/products.json`);

const srcProductsPath = path.join(__dirname, '../src/data/products.json');
fs.writeFileSync(srcProductsPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`Wrote src/data/products.json`);

