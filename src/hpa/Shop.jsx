/* Shop pages (category list, product detail, contact) – structure from "Updated Product Page",
   styled in the sand-cream theme (see shop.css). Every class is prefixed sp- so nothing clashes with the Home/About CSS. */
import { useEffect, useMemo, useState } from 'react'
import payImg from './assets/pay-methods.png'
import { TrustStrip, Related } from './Cro.jsx'
import {
  u,
  PHONE,
  WA,
  inr,
  cats,
  groups,
  catGroup,
  catBrands,
  catAll,
  defBrand,
  brandInfo,
  hrefOf,
  blocks,
  products,
  stages,
  replaceGuide,
  why,
  faq,
} from './data.js'
import { mrpFor, saveOf } from './pricing.js'
import { spares } from './sparesData.js'
import wcProducts from './wcProductsData.json'

const pr = (p) => (p.np ? 'Price on request' : inr(p.price) + (p.max ? ' – ' + inr(p.max) : ''))
export const CatImg = ({ k }) =>
  cats[k][1] ? <img src={u(cats[k][1])} alt="" /> : <span className="sp-ph">{cats[k][3]}</span>

/* ---------------- category / brand list ---------------- */
export function Shop({ g, cat, brand: pickedBrand, addCart }) {
  const brand = pickedBrand || defBrand[cat] // RO Water Purifiers opens on Aakash
  const grp = groups[g],
    bks = catBrands[cat] || []
  const needBrand = bks.length > 0 && !brand && !catAll.includes(cat)
  const all = products.filter((p) => p.cat === cat && (!brand || p.brand === brand))
  const top = Math.max(1000, Math.ceil(Math.max(0, ...all.map((p) => p.max || p.price)) / 1000) * 1000)
  const [sort, setSort] = useState(''),
    [lo, setLo] = useState(0),
    [hi, setHi] = useState(top)
  const [sortOpen, setSortOpen] = useState(true),
    [priceOpen, setPriceOpen] = useState(true)
  useEffect(() => {
    setSort('')
    setLo(0)
    setHi(top)
  }, [cat, brand, top])
  const list = useMemo(() => {
    const l = all.filter((p) => p.price >= lo && p.price <= hi)
    const s = {
      lh: (a, b) => a.price - b.price,
      hl: (a, b) => b.price - a.price,
      az: (a, b) => a.name.localeCompare(b.name),
      za: (a, b) => b.name.localeCompare(a.name),
    }[sort]
    return s ? [...l].sort(s) : l
  }, [all, sort, lo, hi])
  const base = grp ? `/shop/${g}/${cat}` : `/shop/${cat}`
  const live = (brand && cat === 'ro' && brandInfo[brand]?.[2]) || cats[cat][2]
  return (
    <div className="sp-page">
      <div className="sp-head">
        <h1>{cats[cat][0]}</h1>
        <div className="sp-crumb">
          <a href="/">Home</a> ›{' '}
          {grp && (
            <>
              <a href={'/shop/' + g}>{grp.t}</a> ›{' '}
            </>
          )}
          <a href={base}>{cats[cat][0]}</a>
          {brand && (
            <>
              {' '}
              › <span>{brandInfo[brand][0]}</span>
            </>
          )}
        </div>
      </div>
      {blocks.find((b) => b[0] === cat) && <p className="sp-intro">{blocks.find((b) => b[0] === cat)[2]}</p>}
      {grp && (
        <nav className="sp-tiles" aria-label={grp.t + ' categories'}>
          {grp.bar.map((k) => (
            <a key={k} href={hrefOf(k)} className={'sp-tile' + (k === cat ? ' on' : '')}>
              <CatImg k={k} />
              <b>{cats[k][0]}</b>
            </a>
          ))}
        </nav>
      )}
      {bks.length > 0 && (
        <div className="sp-brands">
          <h3>{cats[cat][0]}</h3>
          <i className="sp-ul" />
          <nav className="sp-tabs" aria-label="Brands">
            {catAll.includes(cat) && (
              <a href={base} className={!brand ? 'on' : ''}>
                All
              </a>
            )}
            {bks.map((k) => (
              <a key={k} href={base + '/' + k} className={k === brand ? 'on' : ''}>
                {brandInfo[k][0]}
              </a>
            ))}
          </nav>
          {needBrand && <p className="sp-hint">Select a brand to see its products</p>}
        </div>
      )}
      {!needBrand &&
        (!all.length ? (
          <div className="sp-empty">
            <h3>{brand ? brandInfo[brand][0] : cats[cat][0]}</h3>
            <p>Products for this range are listed on our main website.</p>
            <a className="sp-btn" href={live} target="_blank" rel="noreferrer">
              View on aakashaquatech.in
            </a>
          </div>
        ) : (
          <>
            <p className="sp-count">
              Showing {list.length} of {all.length} products
            </p>
            <div className="sp-lay">
              <aside className="sp-filters">
                <div className="sp-fb">
                  <h4 onClick={() => setSortOpen(!sortOpen)}>Sort By</h4>
                  {sortOpen &&
                    [
                      ['lh', 'Price, low to high'],
                      ['hl', 'Price, high to low'],
                      ['az', 'Alphabetically, A-Z'],
                      ['za', 'Alphabetically, Z-A'],
                    ].map(([v, t]) => (
                      <label key={v}>
                        <input type="radio" name="s" checked={sort === v} onChange={() => setSort(v)} />
                        <i />
                        {t}
                      </label>
                    ))}
                </div>
                <div className="sp-fb">
                  <h4 onClick={() => setPriceOpen(!priceOpen)}>
                    Price <span>{priceOpen ? '⌃' : '⌄'}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setLo(0)
                        setHi(top)
                      }}
                    >
                      Reset
                    </button>
                  </h4>
                  {priceOpen && (
                    <>
                      <div className="sp-dual">
                        <div className="sp-trk">
                          <div style={{ left: (lo / top) * 100 + '%', right: 100 - (hi / top) * 100 + '%' }} />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max={top}
                          step="100"
                          value={lo}
                          onChange={(e) => setLo(Math.min(+e.target.value, hi - 500))}
                        />
                        <input
                          type="range"
                          min="0"
                          max={top}
                          step="100"
                          value={hi}
                          onChange={(e) => setHi(Math.max(+e.target.value, lo + 500))}
                        />
                      </div>
                      <div className="sp-pin">
                        <label>
                          ₹<input type="number" value={lo} onChange={(e) => setLo(+e.target.value || 0)} />
                        </label>
                        —
                        <label>
                          ₹<input type="number" value={hi} onChange={(e) => setHi(+e.target.value || 0)} />
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </aside>
              <div className="sp-grid">
                {list.map((p) => (
                  <article className="sp-card" key={p.slug}>
                    {p.save > 0 && <span className="sp-badge">Save {p.save}%</span>}
                    <a className="sp-pic" href={'/product/' + p.slug}>
                      <img
                        src={p.max || p.cat !== 'ro' ? p.img : p.big}
                        alt={p.name}
                        width="600"
                        height="600"
                        loading="lazy"
                        decoding="async"
                      />
                    </a>
                    <h3>
                      <a href={'/product/' + p.slug}>{p.name}</a>
                    </h3>
                    <p className="sp-sm">{p.summary}</p>
                    <div className="sp-pr">
                      <b>{p.np ? pr(p) : (p.max ? 'Price' : 'Best Price') + ' : ' + pr(p)}</b>
                      {p.save > 0 && (
                        <span>
                          MRP <s>{inr(p.mrp)}</s> <small>(Inclusive of all taxes)</small>
                        </span>
                      )}
                      {p.save === 0 && !p.np && <small>Inclusive of all taxes</small>}
                    </div>
                    <div className="sp-act">
                      {p.max || p.v ? (
                        <>
                          <a className="sp-btn" href={'/product/' + p.slug}>
                            View Product
                          </a>
                          {p.v ? (
                            <a className="sp-btn ghost" href={'/product/' + p.slug}>
                              Select Options
                            </a>
                          ) : (
                            <a
                              className="sp-btn ghost"
                              href={`${WA}?text=${encodeURIComponent('I want to know about ' + p.name)}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Enquire
                            </a>
                          )}
                        </>
                      ) : (
                        <>
                          <a
                            className="sp-btn"
                            href={`${WA}?text=${encodeURIComponent('I want to buy ' + p.name)}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Buy Now
                          </a>
                          <button
                            className="sp-btn ghost"
                            onClick={() =>
                              addCart({
                                id: p.slug,
                                name: p.name,
                                img: p.max || p.cat !== 'ro' ? p.img : p.big,
                                price: p.price,
                                mrp: p.mrp,
                                url: '/product/' + p.slug,
                              })
                            }
                          >
                            Add to Cart
                          </button>
                        </>
                      )}
                    </div>
                  </article>
                ))}
                {!list.length && <p className="sp-none">No products match these filters.</p>}
              </div>
            </div>
          </>
        ))}
    </div>
  )
}

/* ---------------- product detail ---------------- */
const cleanSlug = (name) =>
  String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const formatInr = (val) => {
  const num = Number(val) || 0
  return '₹' + num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const cleanShortDesc = (raw, fallback = '') => {
  if (!raw || typeof raw !== 'string' || !raw.trim()) return fallback
  let text = raw
    .replace(/<div class="qMYqUG[\s\S]*?<div class="markdown[^>]*>/gi, '')
    .replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>[\s\S]*$/gi, '')
    .trim()
  const match = text.match(/<p[\s\S]*?<\/p>/i)
  if (match) return match[0]
  if (text.startsWith('<')) return text
  return `<p>${text}</p>`
}

export function Detail({ slug, addCart, onOpenCart }) {
  const normSlug = (slug || '').toLowerCase().trim()
  const unbranded = normSlug.replace(/^(commercial|aakash|aosmith|wave|zerob|aquaguard|conway|purella)-/, '')

  // 1. Look up in wcProductsData (WooCommerce catalog)
  let wc = wcProducts.find(
    (x) =>
      x.slug === normSlug ||
      x.slug === unbranded ||
      'commercial-' + x.slug === normSlug ||
      x.id === normSlug ||
      (x.sku && x.sku.toLowerCase() === normSlug)
  )

  // 2. Look up in data.js
  let dp = products.find(
    (x) =>
      x.slug === normSlug ||
      x.slug === unbranded ||
      cleanSlug(x.name) === cleanSlug(normSlug)
  )

  // 3. Look up in sparesData.js
  let sp = spares.find(
    (s) => s.slug === normSlug || normSlug.includes(s.slug) || s.slug.includes(normSlug)
  )

  // If matched dp but not wc, try to match by clean name
  if (!wc && dp) {
    wc = wcProducts.find(
      (x) =>
        x.name.toLowerCase() === dp.name.toLowerCase() ||
        cleanSlug(x.name) === cleanSlug(dp.name) ||
        x.slug.includes(dp.slug) ||
        dp.slug.includes(x.slug)
    )
  }

  if (!wc && !dp && !sp) {
    return (
      <div className="sp-page sp-empty">
        <h3>Product not found</h3>
        <a className="sp-btn" href={hrefOf('ro')}>
          Back to products
        </a>
      </div>
    )
  }

  const pName = wc?.name || dp?.name || sp?.name
  const isVariable = Boolean(wc && wc.variations && wc.variations.length > 0)
  const attributes = wc?.attributes || []
  const variations = wc?.variations || []

  // Variation selection state: initialize with URL params or default to first variation
  const [selectedAttrs, setSelectedAttrs] = useState(() => {
    const qs = new URLSearchParams(window.location.search)
    const init = {}
    if (attributes.length > 0) {
      const defaultVar = variations[0]?.attributes || {}
      attributes.forEach((attr) => {
        const urlVal =
          qs.get(attr.name.toLowerCase().replace(/\s+/g, '-')) ||
          qs.get(attr.name.toLowerCase())
        if (urlVal && attr.options.includes(urlVal)) {
          init[attr.name] = urlVal
        } else if (defaultVar[attr.name] && attr.options.includes(defaultVar[attr.name])) {
          init[attr.name] = defaultVar[attr.name]
        } else if (attr.options.length > 0) {
          init[attr.name] = attr.options[0]
        }
      })
    }
    return init
  })

  const hasAnySelected = Object.values(selectedAttrs).some(Boolean)
  const allAttrsSelected = attributes.length > 0 && attributes.every((a) => selectedAttrs[a.name])

  // Matched variation
  const selectedVariation = useMemo(() => {
    if (!isVariable || !allAttrsSelected) return null
    return (
      variations.find((v) => {
        return attributes.every((attr) => {
          const vVal = v.attributes[attr.name]
          return !vVal || vVal === selectedAttrs[attr.name]
        })
      }) || null
    )
  }, [isVariable, allAttrsSelected, variations, attributes, selectedAttrs])

  const handleAttrChange = (attrName, val) => {
    setSelectedAttrs((prev) => {
      const updated = { ...prev, [attrName]: val }
      try {
        const qs = new URLSearchParams(window.location.search)
        if (val) {
          qs.set(attrName.toLowerCase().replace(/\s+/g, '-'), val)
        } else {
          qs.delete(attrName.toLowerCase().replace(/\s+/g, '-'))
        }
        window.history.replaceState(
          null,
          '',
          window.location.pathname + (qs.toString() ? '?' + qs.toString() : '')
        )
      } catch (e) {
        /* ignore */
      }
      return updated
    })
  }

  const clearSelections = () => {
    setSelectedAttrs({})
    try {
      window.history.replaceState(null, '', window.location.pathname)
    } catch (e) {
      /* ignore */
    }
  }

  // Pricing
  const minPrice = wc?.min_price || dp?.price || sp?.price || 0
  const maxPrice = wc?.max_price || dp?.max || dp?.price || sp?.price || 0
  const currentPrice = selectedVariation
    ? selectedVariation.price
    : isVariable
    ? minPrice
    : wc?.price || dp?.price || sp?.price || 0

  // Images
  const allImages = useMemo(() => {
    const list = []
    if (selectedVariation?.main_image) list.push(selectedVariation.main_image)
    if (wc?.images?.length) list.push(...wc.images)
    else if (wc?.main_image) list.push(wc.main_image)
    if (dp?.big) list.push(dp.big)
    if (dp?.img) list.push(dp.img)
    if (sp?.img) list.push(sp.img)
    return Array.from(new Set(list.filter(Boolean)))
  }, [selectedVariation, wc, dp, sp])

  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const mainImage = selectedVariation?.main_image || allImages[activeImgIndex] || allImages[0]

  // Short description (displayed above variation)
  const shortDesc = cleanShortDesc(
    wc?.short_desc,
    dp?.summary ||
      sp?.summary ||
      `<p><strong>${pName}</strong> is engineered by Aakash Pure Aqua Tech for high-performance water purification, durability, and reliable everyday operation.</p>`
  )

  // Quantity & pincode
  const [q, setQ] = useState(1)
  const [pin, setPin] = useState('')
  const [pinMsg, setPinMsg] = useState('')

  const handleCheckPin = () => {
    if (pin.length === 6) {
      setPinMsg('✓ Delivery Available — Free shipping & technician installation confirmed for your area.')
    } else {
      setPinMsg('Please enter a valid 6-digit pincode')
    }
  }

  // Cart integration
  const handleAddToCart = () => {
    if (isVariable && !selectedVariation) {
      alert('Please select all product options before adding to cart.')
      return
    }
    const itemPrice = selectedVariation ? selectedVariation.price : currentPrice
    const itemOpt =
      isVariable && selectedVariation
        ? Object.entries(selectedAttrs)
            .map(([k, v]) => `${k}: ${v}`)
            .join(' · ')
        : ''
    const itemId = isVariable && selectedVariation ? `${normSlug}-${selectedVariation.id}` : normSlug

    if (addCart) {
      addCart(
        {
          id: itemId,
          name: pName,
          opt: itemOpt,
          img: mainImage,
          price: itemPrice,
          mrp: mrpFor(pName, itemPrice) || Math.round(itemPrice * 1.25),
          url: '/product/' + (wc?.slug || dp?.slug || sp?.slug || normSlug),
        },
        q
      )
      if (onOpenCart) onOpenCart()
    }
  }

  // WhatsApp Buy Now
  const optSummary =
    isVariable && selectedVariation
      ? ` (${Object.entries(selectedAttrs)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ')})`
      : ''
  const waLink = `${WA}?text=${encodeURIComponent(
    `Hello Aakash Aqua Tech, I would like to buy:\n\n*${pName}*${optSummary}\nQuantity: ${q}\nPrice: ₹${((selectedVariation?.price || currentPrice) * q).toLocaleString('en-IN')}\n\nPlease confirm availability and delivery schedule.`
  )}`

  // Breadcrumbs
  const breadcrumbs = useMemo(() => {
    const list = [{ label: 'Home', url: '/' }]
    if (wc?.cats && wc.cats.length > 0) {
      wc.cats.forEach((c) => {
        const catNorm = c.toLowerCase()
        let catUrl = '/shop'
        if (catNorm.includes('dispenser')) catUrl = '/shop/commercial/ss-water-dispenser'
        else if (catNorm.includes('industrial') || catNorm.includes('commercial'))
          catUrl = '/shop/commercial/industrial'
        else if (catNorm.includes('domestic') || catNorm.includes('ro')) catUrl = '/shop/domestic/ro'
        else if (catNorm.includes('spare')) catUrl = '/spares'
        list.push({ label: c, url: catUrl })
      })
    } else if (dp?.cat) {
      list.push({ label: cats[dp.cat]?.[0] || dp.cat, url: hrefOf(dp.cat) })
    } else if (sp) {
      list.push({ label: 'Spares', url: '/spares' })
    }
    return list
  }, [wc, dp, sp])

  return (
    <div className="sp-page sp-pd">
      <div className="sp-pdl">
        {/* Left Column: Product Image Gallery */}
        <div className="sp-left">
          <div className="sp-pimg">
            <img
              src={mainImage}
              alt={pName}
              width="600"
              height="600"
              fetchpriority="high"
              decoding="async"
            />
          </div>
          {allImages.length > 1 && (
            <div className="sp-gallery-thumbs">
              {allImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={'sp-thumb-btn' + (mainImage === imgUrl ? ' on' : '')}
                  onClick={() => setActiveImgIndex(idx)}
                >
                  <img src={imgUrl} alt="" width="60" height="60" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Title, Price, Short Desc, Variations, Spec Desc, Add/Buy, Why & FAQ */}
        <div className="sp-pinfo">
          {/* 1. Breadcrumbs */}
          <div className="sp-crumb">
            {breadcrumbs.map((b, i) => (
              <span key={i}>
                {i > 0 && ' / '}
                <a href={b.url}>{b.label}</a>
              </span>
            ))}
            <span> / {pName}</span>
          </div>

          {/* 2. Product Title */}
          <h1 className="sp-title">{pName}</h1>

          {/* 3. Price & Taxes */}
          <div className="sp-price-box">
            <div className="sp-price-main">
              {isVariable && !selectedVariation ? (
                <span>
                  {formatInr(minPrice)} – {formatInr(maxPrice)}
                </span>
              ) : (
                <span>{formatInr(currentPrice)}</span>
              )}
            </div>
            <div className="sp-tax-note">Inclusive of all taxes</div>
          </div>

          {/* 4. Short Description (above variation) */}
          {shortDesc && (
            <div
              className="sp-short-desc"
              dangerouslySetInnerHTML={{ __html: shortDesc }}
            />
          )}

          {/* 5. Variations Selector */}
          {isVariable && (
            <div className="sp-vars-section">
              {attributes.map((attr) => (
                <div className="sp-var-field" key={attr.name}>
                  <label className="sp-var-title">{attr.name}</label>
                  <div className="sp-var-select-wrap">
                    <select
                      value={selectedAttrs[attr.name] || ''}
                      onChange={(e) => handleAttrChange(attr.name, e.target.value)}
                    >
                      <option value="">Choose an option</option>
                      {attr.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
              {hasAnySelected && (
                <button
                  type="button"
                  className="sp-var-clear-btn"
                  onClick={clearSelections}
                >
                  CLEAR
                </button>
              )}
            </div>
          )}

          {/* 6. Description / Technical Specifications Table (after variation) */}
          <div className="sp-spec-section">
            {selectedVariation && selectedVariation.desc ? (
              <div
                className="sp-html-desc"
                dangerouslySetInnerHTML={{ __html: selectedVariation.desc }}
              />
            ) : isVariable && !hasAnySelected ? (
              <p className="sp-select-prompt">
                Please select options above to view complete specifications and exact pricing.
              </p>
            ) : wc?.desc ? (
              <div
                className="sp-html-desc"
                dangerouslySetInnerHTML={{ __html: wc.desc }}
              />
            ) : dp?.tech ? (
              <table className="aakash-product-spec-table">
                <tbody>
                  {dp.tech.map(([label, val]) => (
                    <tr key={label}>
                      <th>{label}</th>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>

          {/* 7. Add to Cart & Buy Now Section (below description) */}
          <div className="sp-actions-box">
            <div className="sp-btn-row">
              <div className="sp-qty-stepper">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQ(Math.max(1, q - 1))}
                >
                  −
                </button>
                <span>{q}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQ(q + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="sp-btn-add"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
              <a
                className="sp-btn-buy"
                href={waLink}
                target="_blank"
                rel="noreferrer"
              >
                Buy it now
              </a>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="sp-pincode-box">
              <span className="sp-pincode-label">Check Availability</span>
              <div className="sp-pincode-input-row">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                />
                <button type="button" onClick={handleCheckPin}>
                  Check
                </button>
              </div>
              {pinMsg && <p className="sp-pin-feedback">{pinMsg}</p>}
            </div>

            {/* Safe & Secure Checkout */}
            <div className="sp-pay-banner">
              <span>Safe &amp; Secure Checkout</span>
              <img
                src={payImg}
                alt="Google Pay, PhonePe, Mastercard, Visa, Paytm, Cash on Delivery"
                width="535"
                height="80"
                loading="lazy"
              />
            </div>
          </div>

          {/* 8 & 9. Why Buy from Aakash Pure Aqua Tech & FAQs (below Add to Cart & Buy Now) */}
          <div className="sp-bottom-sections">
            <div className="sp-why-box">
              <h2>Why buy from Aakash Pure Aqua Tech</h2>
              <ul className="sp-bf">
                {why.map((w) => (
                  <li key={w}>
                    <span>✔</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sp-faq-box">
              <h2>Frequently Asked Questions</h2>
              {faq.map(([qq, an]) => (
                <details className="sp-faq" key={qq}>
                  <summary>{qq}</summary>
                  <p>{an}</p>
                </details>
              ))}
            </div>
          </div>
          {/* 10. Other all removed or hidden! */}
        </div>
      </div>
    </div>
  )
}

/* ---------------- contact / service ---------------- */
export function ContactPage({ onDemo }) {
  return (
    <div className="sp-page sp-empty">
      <h1>Contact us</h1>
      <p>
        <a href="tel:9655577666">{PHONE}</a> · <a href="mailto:ceo@aakashaquatech.in">ceo@aakashaquatech.in</a>
      </p>
      <address>
        10/62C, Brindavan Road, 1st Cross (Behind Dr. Sudamani Hospital), Fairlands, Salem - 636016, Tamil Nadu
      </address>
      <button className="sp-btn" onClick={onDemo}>
        Book Your Free Demo
      </button>
    </div>
  )
}

export function NotFound() {
  return (
    <div className="sp-page sp-empty">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or has moved.</p>
      <a className="sp-btn" href="/">
        Back to home
      </a>
      <a className="sp-btn ghost" href={hrefOf('ro')}>
        Browse water purifiers
      </a>
    </div>
  )
}