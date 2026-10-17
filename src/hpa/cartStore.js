/* Cart state: items live in localStorage so a refresh / new tab keeps the cart.
   item = { id, name, img, price, mrp?, opt?, url? } + qty */
import { useCallback, useEffect, useState } from 'react'

const KEY = 'aakash-cart-v1'
const read = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(v) ? v : []
  } catch {
    return []
  }
}

export function useCart() {
  const [items, setItems] = useState(read)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      /* private mode – cart still works for this visit */
    }
  }, [items])

  const add = useCallback((it, qty = 1) => {
    if (!it || !it.price) return
    const id = it.id || (it.slug ? (it.selectedVariation ? `${it.slug}-${encodeURIComponent(it.selectedVariation)}` : it.slug) : String(Date.now()))
    const name = it.name
    const img = it.selectedImage || it.img || it.image || it.mainImage || ''
    const price = it.price
    const mrp = it.mrp || it.regularPrice || price
    const opt = it.opt || it.selectedVariation || ''
    const url = it.url || (it.slug ? `/product/${it.slug}` : '')
    const quantity = it.quantity || qty || 1
    const normalized = { id, name, img, price, mrp, opt, url }

    setItems((list) =>
      list.some((x) => x.id === id)
        ? list.map((x) => (x.id === id ? { ...x, qty: x.qty + quantity } : x))
        : [...list, { ...normalized, qty: quantity }],
    )
  }, [])

  const setQty = useCallback(
    (id, qty) => setItems((l) => l.map((x) => (x.id === id ? { ...x, qty: Math.min(99, Math.max(1, qty)) } : x))),
    [],
  )
  const remove = useCallback((id) => setItems((l) => l.filter((x) => x.id !== id)), [])
  const clear = useCallback(() => setItems([]), [])

  return {
    items,
    add,
    setQty,
    remove,
    clear,
    count: items.reduce((n, x) => n + x.qty, 0),
    total: items.reduce((n, x) => n + x.qty * x.price, 0),
  }
}