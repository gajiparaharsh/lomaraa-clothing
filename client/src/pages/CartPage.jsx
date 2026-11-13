import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  TicketPercent,
  Check,
  X
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { formatINR } from "../data/products";

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    applyCoupon,
    appliedCoupon,
    removeCoupon,
    discountAmount,
    shippingFee,
    taxAmount,
    finalTotal
  } = useShop();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError("");
      setCouponInput("");
    }
  };

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="w-full bg-white min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md space-y-5 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#E8E5DF] text-[#B89B67] flex items-center justify-center mx-auto">
            <ShoppingBag size={28} strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl text-[#111111]">Your Shopping Bag is Empty</h1>
          <p className="text-xs text-[#717171] leading-relaxed">
            There are currently no garments in your bag. Discover our curated collections tailored in pure noble fibres.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#111111] hover:bg-[#B89B67] text-white text-xs tracking-[0.2em] uppercase font-semibold transition-colors"
            >
              <span>EXPLORE ALL COLLECTIONS</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-4 text-xs tracking-wider uppercase text-[#717171]">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-[#111111]">Home</Link></li>
          <li className="text-[#CCCCCC]">/</li>
          <li className="text-[#111111] font-semibold">Shopping Bag</li>
        </ol>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Header */}
        <div className="pb-6 border-b border-[#111111] mb-8">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89B67] font-semibold block mb-1">
            CLIENT CART REVIEW
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#111111]">
            Shopping Bag ({cart.reduce((t, i) => t + i.quantity, 0)} {cart.reduce((t, i) => t + i.quantity, 0) === 1 ? "Item" : "Items"})
          </h1>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-[#FAF8F5] border border-[#E8E5DF] p-4 mb-8">
          <div className="flex justify-between items-center text-xs tracking-wider mb-2">
            <span className="text-[#222222]">
              {freeShippingRemaining === 0 ? (
                <strong className="text-[#111111] flex items-center gap-1.5 font-semibold">
                  <Check size={14} className="text-emerald-700" />
                  Complimentary Express Shipping Unlocked
                </strong>
              ) : (
                <span>
                  Add <strong className="text-[#111111]">{formatINR(freeShippingRemaining)}</strong> for Complimentary Express Shipping
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

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Bag Items Table */}
          <div className="lg:col-span-8 divide-y divide-[#E8E5DF] border-t border-b border-[#E8E5DF]">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="py-6 flex space-x-4 sm:space-x-6">
                {/* Image */}
                <Link to={`/product/${item.slug || item.id}`} className="w-24 sm:w-32 aspect-3/4 bg-[#FAF8F5] overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] tracking-wider uppercase text-[#B89B67] font-medium block">
                          {item.category}
                        </span>
                        <Link to={`/product/${item.slug || item.id}`} className="text-sm sm:text-base font-serif text-[#111111] hover:text-[#B89B67] transition-colors">
                          {item.name}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-[#999999] hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Remove piece"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="text-xs text-[#717171] tracking-wider mt-1.5 space-y-0.5">
                      <p>Size: <strong className="text-[#111111]">{item.selectedSize}</strong></p>
                      <p>Color: <strong className="text-[#111111]">{item.selectedColor}</strong></p>
                      <p className="text-[10px] text-[#888888]">SKU: {item.sku}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-4 pt-2">
                    {/* Quantity Controller */}
                    <div className="flex items-center border border-[#E8E5DF] bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, -1, item.selectedColor)}
                        className="p-2 text-[#555555] hover:text-[#111111] cursor-pointer"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#111111]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, 1, item.selectedColor)}
                        className="p-2 text-[#555555] hover:text-[#111111] cursor-pointer"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-sm sm:text-base font-semibold text-[#111111] tracking-wide">
                        {formatINR(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-[#888888]">{formatINR(item.price)} each</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-4 bg-[#FAF8F5] border border-[#E8E5DF] p-6 sm:p-8 space-y-6 sticky top-28">
            <h2 className="font-serif text-xl text-[#111111] pb-3 border-b border-[#E8E5DF]">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <div>
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#555555] block mb-2">
                Promotional Code
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-white border border-[#B89B67] text-xs">
                  <div className="flex items-center space-x-2">
                    <TicketPercent size={15} className="text-[#B89B67]" />
                    <span className="font-semibold text-[#111111]">{appliedCoupon.code}</span>
                    <span className="text-[10px] text-[#B89B67]">({formatINR(discountAmount)} OFF)</span>
                  </div>
                  <button onClick={removeCoupon} className="text-[#999999] hover:text-red-600 cursor-pointer">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      if (couponError) setCouponError("");
                    }}
                    placeholder="Enter code (e.g. LOMARAA10)"
                    className="flex-1 px-3 py-2.5 bg-white border border-[#E8E5DF] text-xs tracking-wider uppercase focus:outline-hidden focus:border-[#111111]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#B89B67] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs tracking-wider border-t border-b border-[#E8E5DF] py-4">
              <div className="flex justify-between text-[#666666]">
                <span>Bag Subtotal</span>
                <span className="text-[#111111] font-medium">{formatINR(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#B89B67]">
                  <span>Atelier Discount</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#666666]">
                <span>Estimated Express Shipping</span>
                <span className="text-[#111111] font-medium">
                  {shippingFee === 0 ? "Complimentary" : formatINR(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-[#666666]">
                <span>Goods &amp; Services Tax (12% GST)</span>
                <span className="text-[#111111] font-medium">{formatINR(taxAmount)}</span>
              </div>

              <div className="pt-2 border-t border-[#E8E5DF] flex justify-between text-base font-semibold text-[#111111]">
                <span>Total Amount</span>
                <span>{formatINR(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-4 bg-[#111111] hover:bg-[#B89B67] text-white text-xs tracking-[0.25em] font-semibold uppercase flex items-center justify-center space-x-2 transition-all duration-300 shadow-md cursor-pointer group"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust Points */}
            <div className="pt-2 space-y-2 text-[11px] text-[#717171] tracking-normal font-light">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={14} className="text-[#B89B67]" />
                <span>256-bit encrypted checkout via Razorpay</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck size={14} className="text-[#B89B67]" />
                <span>Complimentary gift box &amp; garment carrier included</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;

