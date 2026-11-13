import React from "react";
import { Link } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { formatINR } from "../../data/products";

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingThreshold,
    freeShippingRemaining
  } = useShop();

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out border-l border-[#E8E5DF]">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8E5DF] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={18} className="text-[#111111]" />
              <h2 className="text-base font-serif tracking-[0.15em] text-[#111111] uppercase font-semibold">
                Shopping Bag ({cart.reduce((t, i) => t + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#666666] hover:text-[#111111] transition-colors rounded-full hover:bg-black/5"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-6 py-3.5 bg-[#F5F1E8] border-b border-[#E8E5DF]">
            <div className="flex justify-between items-center text-xs tracking-wider mb-1.5 font-medium">
              <span className="text-[#222222]">
                {freeShippingRemaining === 0 ? (
                  <span className="text-[#111111] font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#B89B67] inline-block"></span>
                    Complimentary Express Shipping Unlocked
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#111111]">{formatINR(freeShippingRemaining)}</strong> for Complimentary Shipping
                  </span>
                )}
              </span>
              <span className="text-[#B89B67] font-semibold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#E5DFD3] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#B89B67] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#F0EDE6]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F5F1E8] flex items-center justify-center text-[#B89B67]">
                  <ShoppingBag size={28} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-serif tracking-wide text-[#111111]">Your bag is currently empty</p>
                  <p className="text-xs text-[#717171] max-w-xs leading-relaxed">
                    Explore our curated seasonal essentials and discover pieces crafted to elevate your wardrobe.
                  </p>
                </div>
                <Link
                  to="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-3 bg-[#111111] text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#B89B67] transition-colors"
                >
                  Discover The Collection
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="py-4 flex space-x-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-26 bg-[#F5F1E8] overflow-hidden flex-shrink-0 relative group">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-[#111111] tracking-wide leading-snug">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className="text-[#999999] hover:text-[#111111] p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <p className="text-xs text-[#717171] mt-1 tracking-wider">
                        Size: <span className="text-[#111111] font-medium">{item.selectedSize}</span>
                        {item.color && (
                          <>
                            <span className="mx-1.5">•</span>
                            <span>{item.color}</span>
                          </>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-[#E8E5DF] bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                          className="p-1.5 text-[#666666] hover:text-[#111111] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-medium text-[#111111]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                          className="p-1.5 text-[#666666] hover:text-[#111111] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#111111] tracking-wide">
                          {formatINR(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8E5DF] bg-[#FAF8F5] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#666666] tracking-wider">
                  <span>Subtotal</span>
                  <span className="text-[#111111] font-medium">{formatINR(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-[#666666] tracking-wider">
                  <span>Shipping</span>
                  <span className="text-[#111111] font-medium">
                    {freeShippingRemaining === 0 ? "Complimentary Express" : formatINR(350)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8E5DF] flex justify-between text-sm font-semibold text-[#111111] tracking-wider">
                  <span>Estimated Total</span>
                  <span>{formatINR(cartSubtotal + (freeShippingRemaining === 0 ? 0 : 350))}</span>
                </div>
                <p className="text-[11px] text-[#888888] tracking-normal pt-1">
                  Applicable taxes calculated at checkout. Curated atelier gift packaging included.
                </p>
              </div>

              <button
                className="w-full py-4 bg-[#111111] hover:bg-[#B89B67] text-white text-xs tracking-[0.25em] font-semibold uppercase flex items-center justify-center space-x-2 transition-all duration-300 shadow-sm group"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-[#717171] tracking-wider">
                <div className="flex items-center space-x-1.5 justify-center">
                  <ShieldCheck size={14} className="text-[#B89B67]" />
                  <span>Secure 256-bit SSL</span>
                </div>
                <div className="flex items-center space-x-1.5 justify-center">
                  <RefreshCw size={13} className="text-[#B89B67]" />
                  <span>14-Day Atelier Returns</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

