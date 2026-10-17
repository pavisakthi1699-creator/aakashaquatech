import React, { useState, useEffect } from 'react'
import { navigate } from './router.js'

export function MobileBottomBar({
  currentRoute = '',
  isMenuOpen = false,
  isSearchOpen = false,
  cartCount = 0,
  onToggleMenu,
  onOpenSearch,
  onOpenCart,
  onHome,
}) {

  const isHome = !isMenuOpen && !isSearchOpen && (!currentRoute || currentRoute === 'home' || currentRoute === '/')

  const handleHome = () => {
    if (onHome) {
      onHome()
      return
    }
    if (isMenuOpen && onToggleMenu) {
      onToggleMenu(false)
    }
    if (window.location.hash === '#admin') {
      window.location.hash = ''
    }
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategories = () => {
    if (onToggleMenu) {
      onToggleMenu(!isMenuOpen)
    }
  }

  const handleSearch = () => {
    if (isMenuOpen && onToggleMenu) {
      onToggleMenu(false)
    }
    if (onOpenSearch) onOpenSearch()
  }

  const handleCart = () => {
    if (isMenuOpen && onToggleMenu) {
      onToggleMenu(false)
    }
    if (onOpenCart) onOpenCart()
  }

  return (
    <nav
      className="mobile-app-bottom-bar"
      aria-label="Mobile Navigation"
      role="navigation"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: 'calc(62px + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: 'linear-gradient(180deg, #173f45 0%, #0e2a2f 100%)',
        borderTop: '1.5px solid #549aa2',
        boxShadow: '0 -6px 24px rgba(10, 31, 35, 0.45)',
        zIndex: 99999,
        alignItems: 'center',
      }}
    >
      {/* 1. Home */}
      <button
        type="button"
        id="mbar-home"
        className={`m-bar-item ${isHome ? 'active' : ''}`}
        onClick={handleHome}
        aria-label="Home"
      >
        <span className="m-bar-icon-wrap">
          <svg
            viewBox="0 0 24 24"
            className="m-bar-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 10.5 12 3l9 7.5V20a2 2 0 0 1-2 2h-4a1 1 0 0 1-1-1v-4.5a1.5 1.5 0 0 0-1.5-1.5h-1A1.5 1.5 0 0 0 10 16.5V21a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V10.5Z" />
          </svg>
        </span>
        <span className="m-bar-label">Home</span>
      </button>

      {/* 2. Categories (4 rounded squares in 2x2 grid) */}
      <button
        type="button"
        id="mbar-categories"
        className={`m-bar-item ${isMenuOpen ? 'active' : ''}`}
        onClick={handleCategories}
        aria-label="Categories"
        aria-expanded={isMenuOpen}
      >
        <span className="m-bar-icon-wrap">
          <svg
            viewBox="0 0 24 24"
            className="m-bar-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="2" />
            <rect x="14" y="3.5" width="6.5" height="6.5" rx="2" />
            <rect x="3.5" y="14" width="6.5" height="6.5" rx="2" />
            <rect x="14" y="14" width="6.5" height="6.5" rx="2" />
          </svg>
        </span>
        <span className="m-bar-label">Categories</span>
      </button>

      {/* 3. Search */}
      <button
        type="button"
        id="mbar-search"
        className={`m-bar-item ${isSearchOpen ? 'active' : ''}`}
        onClick={handleSearch}
        aria-label="Search"
      >
        <span className="m-bar-icon-wrap m-bar-search-wrap">
          <svg
            viewBox="0 0 24 24"
            className="m-bar-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16.2 16.2 4.3 4.3" />
          </svg>
        </span>
        <span className="m-bar-label">Search</span>
      </button>

      {/* 4. Cart (Teal circular button as in reference image) */}
      <button
        type="button"
        id="mbar-cart"
        className="m-bar-item m-bar-cart-item"
        onClick={handleCart}
        aria-label="Cart"
      >
        <div className="m-bar-cart-circle">
          <svg
            viewBox="0 0 24 24"
            className="m-bar-cart-icon"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="20" r="1.2" fill="#ffffff" />
            <circle cx="18" cy="20" r="1.2" fill="#ffffff" />
            <path d="M1 2.5h3.5l2.6 12.5a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6l1.6-8.5H5.8" />
          </svg>
          {cartCount > 0 && (
            <span className="m-bar-cart-badge">{cartCount}</span>
          )}
        </div>
        <span className="m-bar-label">Cart</span>
      </button>
    </nav>
  )
}

export default MobileBottomBar
