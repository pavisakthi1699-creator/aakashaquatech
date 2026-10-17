import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { ProductItem } from '../services/api';

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string | number, delta: number) => void;
  onRemoveItem: (productId: string | number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => {
    const price = item.product.salePrice && item.product.salePrice > 0 ? item.product.salePrice : (item.product.regularPrice || 0);
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#f8fafb]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#eef6f7] flex items-center justify-center text-[#2d737d]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#173238]">Your Equipment Cart</h3>
                <span className="text-xs text-slate-500 font-semibold">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-700">Your cart is currently empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Browse our high-performance water purifiers, dispensers, and treatment plants to add equipment.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#2d737d] text-white text-xs font-bold shadow-md hover:bg-[#205860] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemPrice = item.product.salePrice && item.product.salePrice > 0 ? item.product.salePrice : (item.product.regularPrice || 0);

                return (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3.5 rounded-2xl bg-[#f8fafb] border border-slate-200/80 items-center justify-between"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-white p-1.5 border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.product.mainImage}
                        alt={item.product.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://aakashaquatech.in/wp-content/uploads/2026/03/Untitled-design-1-1.png';
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#173238] truncate">{item.product.name}</h4>
                      <div className="text-[11px] text-slate-400">{item.product.category}</div>
                      <div className="text-xs font-extrabold text-[#2d737d] mt-1">
                        {itemPrice > 0 ? `₹${itemPrice.toLocaleString('en-IN')}` : 'Price on Request'}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQty(item.product.id, -1)}
                        className="w-5 h-5 rounded hover:bg-slate-100 flex items-center justify-center text-slate-600"
                        title="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1 text-slate-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, 1)}
                        className="w-5 h-5 rounded hover:bg-slate-100 flex items-center justify-center text-slate-600"
                        title="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-white space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-600">Subtotal Estimated</span>
                <span className="text-xl font-extrabold text-[#173238]">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#eef6f7] text-[11px] font-semibold text-[#2d737d] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Includes free on-site water quality assessment & installation</span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-4 rounded-xl bg-[#1b3d4b] hover:bg-[#2d737d] text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Order & Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
