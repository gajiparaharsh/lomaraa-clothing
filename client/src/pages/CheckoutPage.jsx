import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  ArrowRight,
  Lock
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import { formatINR } from "../data/products";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cart,
    addresses,
    addAddress,
    cartSubtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    finalTotal
  } = useShop();

  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || ""
  );

  const [deliverySpeed, setDeliverySpeed] = useState("express");
  const [isAddingNewAddr, setIsAddingNewAddr] = useState(false);

  // New address form state
  const [newAddr, setNewAddr] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    street: "",
    landmark: "",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    type: "Home",
    isDefault: false
  });

  const handleAddNewAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.pincode) return;
    const createdId = addAddress(newAddr);
    setSelectedAddressId(createdId);
    setIsAddingNewAddr(false);
  };

  const handleProceedToPayment = () => {
    const chosenAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
    // Save selected checkout info into sessionStorage for the payment screen
    sessionStorage.setItem("lomaraa_checkout_address", JSON.stringify(chosenAddress));
    sessionStorage.setItem("lomaraa_delivery_speed", deliverySpeed);
    navigate("/payment");
  };

  if (cart.length === 0) {
    return (
      <div className="w-full bg-white min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-2xl text-[#111111]">Your bag is currently empty</h2>
          <Link to="/shop" className="inline-block px-6 py-3 bg-[#111111] text-white text-xs uppercase tracking-widest">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      {/* Checkout Breadcrumb / Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-center space-x-4 sm:space-x-8 text-xs tracking-[0.2em] uppercase font-medium">
          <span className="text-[#888888] flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#E5DFD3] text-[#444444] flex items-center justify-center text-[10px]">1</span>
            Bag
          </span>
          <span className="text-[#CCCCCC]">—</span>
          <span className="text-[#111111] font-bold flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px]">2</span>
            Delivery &amp; Details
          </span>
          <span className="text-[#CCCCCC]">—</span>
          <span className="text-[#888888] flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#E5DFD3] text-[#444444] flex items-center justify-center text-[10px]">3</span>
            Payment
          </span>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Delivery Address & Shipping Speed (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Customer Information */}
            <div className="bg-white p-6 sm:p-8 border border-[#E8E5DF] shadow-xs space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-[#F0EDE6]">
                <h2 className="font-serif text-lg text-[#111111] tracking-wide">
                  1. Client Identification
                </h2>
                <span className="text-[10px] tracking-wider uppercase text-[#B89B67] font-semibold">
                  SECURE CHECKOUT
                </span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between text-xs text-[#555555] gap-2 pt-1">
                <p>Purchasing as: <strong className="text-[#111111] font-medium">{user?.name || "Client"}</strong> ({user?.email || "guest@lomaraa.com"})</p>
                <Link to="/account" className="text-[#B89B67] hover:underline uppercase text-[11px]">Edit Profile</Link>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="bg-white p-6 sm:p-8 border border-[#E8E5DF] shadow-xs space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-[#F0EDE6]">
                <h2 className="font-serif text-lg text-[#111111] tracking-wide">
                  2. Select Delivery Destination
                </h2>
                <button
                  onClick={() => setIsAddingNewAddr(!isAddingNewAddr)}
                  className="flex items-center space-x-1 text-xs text-[#B89B67] hover:text-[#111111] uppercase tracking-wider font-medium cursor-pointer"
                >
                  <Plus size={13} />
                  <span>{isAddingNewAddr ? "Cancel" : "Add New Address"}</span>
                </button>
              </div>

              {/* Inline Add New Address Form */}
              {isAddingNewAddr ? (
                <form onSubmit={handleAddNewAddressSubmit} className="p-4 bg-[#FAF8F5] border border-[#E8E5DF] space-y-3 text-xs animate-fade-in">
                  <h4 className="font-serif text-sm font-semibold text-[#111111]">Add New Delivery Address</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Recipient Full Name"
                      value={newAddr.name}
                      onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                      required
                      className="p-2.5 bg-white border border-[#E8E5DF] text-xs"
                    />
                    <input
                      type="tel"
                      placeholder="Contact Phone Number"
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      required
                      className="p-2.5 bg-white border border-[#E8E5DF] text-xs"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Flat, House no., Building, Apartment, Street"
                    value={newAddr.street}
                    onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                    required
                    className="w-full p-2.5 bg-white border border-[#E8E5DF] text-xs"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      required
                      className="p-2.5 bg-white border border-[#E8E5DF] text-xs"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddr.state}
                      onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                      required
                      className="p-2.5 bg-white border border-[#E8E5DF] text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                      required
                      className="p-2.5 bg-white border border-[#E8E5DF] text-xs"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddr(false)}
                      className="px-4 py-2 border border-[#CCCCCC] text-[11px] uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#111111] text-white text-[11px] uppercase tracking-wider font-semibold"
                    >
                      Save &amp; Deliver Here
                    </button>
                  </div>
                </form>
              ) : (
                /* Saved Address Cards */
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`flex items-start p-4 border transition-all cursor-pointer ${
                        selectedAddressId === addr.id
                          ? "border-[#111111] bg-[#FAF8F5] shadow-xs"
                          : "border-[#E8E5DF] bg-white hover:border-[#CCCCCC]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="selectedAddress"
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="accent-[#111111] mt-1 mr-3"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex items-center space-x-2">
                          <strong className="text-sm font-serif text-[#111111]">{addr.name}</strong>
                          <span className="px-1.5 py-0.5 bg-[#E8E5DF] text-[#444444] text-[9px] uppercase tracking-wider">
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] text-[#B89B67] font-semibold uppercase">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-[#555555] mt-1 leading-relaxed">
                          {addr.street}, {addr.landmark ? `${addr.landmark}, ` : ""}{addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                        </p>
                        <p className="text-[#888888] mt-0.5">Phone: {addr.phone}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Delivery Method Selection */}
            <div className="bg-white p-6 sm:p-8 border border-[#E8E5DF] shadow-xs space-y-4">
              <h2 className="font-serif text-lg text-[#111111] tracking-wide pb-3 border-b border-[#F0EDE6]">
                3. Shipping &amp; Atelier Handling
              </h2>

              <div className="space-y-3 text-xs">
                <label
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                    deliverySpeed === "express" ? "border-[#111111] bg-[#FAF8F5]" : "border-[#E8E5DF]"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="deliverySpeed"
                      checked={deliverySpeed === "express"}
                      onChange={() => setDeliverySpeed("express")}
                      className="accent-[#111111]"
                    />
                    <div>
                      <p className="font-semibold text-[#111111] tracking-wider">COMPLIMENTARY EXPRESS DISPATCH</p>
                      <p className="text-[#717171] text-[11px]">Dispatched via Air Courier (Estimated 2-3 business days)</p>
                    </div>
                  </div>
                  <span className="font-semibold text-emerald-800">FREE</span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                    deliverySpeed === "priority" ? "border-[#111111] bg-[#FAF8F5]" : "border-[#E8E5DF]"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="deliverySpeed"
                      checked={deliverySpeed === "priority"}
                      onChange={() => setDeliverySpeed("priority")}
                      className="accent-[#111111]"
                    />
                    <div>
                      <p className="font-semibold text-[#111111] tracking-wider">WHITE-GLOVE ATELIER CONCIERGE</p>
                      <p className="text-[#717171] text-[11px]">Hand-delivered in signature wooden garment box &amp; hanger</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#111111]">₹1,500</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Proceed (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-[#E8E5DF] p-6 sm:p-8 space-y-6 shadow-xs sticky top-28">
            <h3 className="font-serif text-xl text-[#111111] pb-3 border-b border-[#E8E5DF]">
              Order Review ({cart.length})
            </h3>

            {/* Item Mini Preview */}
            <div className="max-h-60 overflow-y-auto divide-y divide-[#F0EDE6] pr-1">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="py-3 flex space-x-3 text-xs">
                  <img src={item.image} alt={item.name} className="w-14 h-18 object-cover flex-shrink-0" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-medium text-[#111111] line-clamp-1">{item.name}</p>
                      <p className="text-[#717171] text-[11px]">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[#111111]">{formatINR(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs tracking-wider border-t border-b border-[#E8E5DF] py-4">
              <div className="flex justify-between text-[#666666]">
                <span>Items Subtotal</span>
                <span>{formatINR(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#B89B67]">
                  <span>Discount</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#666666]">
                <span>Shipping</span>
                <span>{deliverySpeed === "priority" ? formatINR(1500) : shippingFee === 0 ? "Complimentary" : formatINR(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-[#666666]">
                <span>GST (12%)</span>
                <span>{formatINR(taxAmount)}</span>
              </div>
              <div className="pt-2 border-t border-[#E8E5DF] flex justify-between text-base font-semibold text-[#111111]">
                <span>Total Amount</span>
                <span>
                  {formatINR(
                    finalTotal + (deliverySpeed === "priority" ? 1500 : 0)
                  )}
                </span>
              </div>
            </div>

            {/* Payment Proceed CTA */}
            <button
              onClick={handleProceedToPayment}
              className="w-full py-4 bg-[#111111] hover:bg-[#B89B67] text-white text-xs tracking-[0.25em] font-semibold uppercase flex items-center justify-center space-x-2 transition-all duration-300 shadow-md cursor-pointer"
            >
              <Lock size={13} />
              <span>CONTINUE TO PAYMENT</span>
              <ArrowRight size={14} />
            </button>

            <p className="text-[11px] text-[#888888] text-center">
              Your details are encrypted and securely passed to the payment gateway.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
