import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  Lock,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import { formatINR } from "../data/products";

export const PaymentPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    finalTotal,
    appliedCoupon,
    addresses,
    createOrder
  } = useShop();

  // Retrieve checkout address and speed from sessionStorage or defaults
  const savedAddress = (() => {
    try {
      const stored = sessionStorage.getItem("lomaraa_checkout_address");
      return stored ? JSON.parse(stored) : addresses[0];
    } catch {
      return addresses[0];
    }
  })();

  const deliverySpeed = sessionStorage.getItem("lomaraa_delivery_speed") || "express";

  const [paymentMethod, setPaymentMethod] = useState("razorpay_upi");
  const [upiId, setUpiId] = useState("");
  const [cardData, setCardData] = useState({
    number: "4532 •••• •••• 8891",
    name: user?.name || "Aarav Sharma",
    expiry: "09/29",
    cvv: "•••"
  });
  const [selectedBank, setSelectedBank] = useState("HDFC");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(1);

  const handlePayNow = () => {
    setIsProcessing(true);
    setProcessingStep(1);

    // Simulate authentic Razorpay / Banking gateway steps
    setTimeout(() => {
      setProcessingStep(2); // Authenticating 3D Secure / UPI Mandate
    }, 1200);

    setTimeout(() => {
      setProcessingStep(3); // Payment confirmed
    }, 2400);

    setTimeout(() => {
      // Build order details
      const newOrder = createOrder({
        items: [...cart],
        subtotal: cartSubtotal,
        discount: discountAmount,
        couponCode: appliedCoupon?.code || null,
        tax: taxAmount,
        shipping: shippingFee,
        total: finalTotal,
        paymentMethod:
          paymentMethod === "razorpay_upi"
            ? "Razorpay UPI"
            : paymentMethod === "razorpay_card"
            ? "Razorpay Card"
            : paymentMethod === "netbanking"
            ? `Net Banking (${selectedBank})`
            : "Cash on Delivery",
        paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid",
        shippingAddress: savedAddress || {
          name: user?.name || "Lomaraa Guest",
          street: "Signature Bay Towers, Marine Drive",
          city: "Mumbai, Maharashtra - 400021"
        },
        deliverySpeed: deliverySpeed === "white_glove" ? "White-Glove Atelier Courier" : "Complimentary Express"
      });

      // Save order id for success screen
      sessionStorage.setItem("lomaraa_last_order_id", newOrder.id);
      setIsProcessing(false);
      navigate("/order-success");
    }, 3200);
  };

  if (cart.length === 0) {
    return (
      <div className="w-full bg-white min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-2xl text-[#111111]">No pending order to process</h2>
          <p className="text-sm text-[#777777]">Your shopping bag is currently empty.</p>
          <Link
            to="/shop"
            className="inline-block px-8 py-3 bg-[#111111] text-white text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors"
          >
            Explore Collection
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
          <Link to="/cart" className="text-[#888888] flex items-center gap-1.5 hover:text-[#111111]">
            <span className="w-5 h-5 rounded-full bg-[#E5DFD3] text-[#444444] flex items-center justify-center text-[10px]">1</span>
            Bag
          </Link>
          <span className="text-[#CCCCCC]">—</span>
          <Link to="/checkout" className="text-[#888888] flex items-center gap-1.5 hover:text-[#111111]">
            <span className="w-5 h-5 rounded-full bg-[#E5DFD3] text-[#444444] flex items-center justify-center text-[10px]">2</span>
            Delivery
          </Link>
          <span className="text-[#CCCCCC]">—</span>
          <span className="text-[#111111] font-bold flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px]">3</span>
            Payment
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Payment Section */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Recap Card */}
            <div className="bg-white p-5 border border-[#E8E5DF] flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#888888] font-medium">Delivering To</p>
                <p className="font-medium text-sm text-[#111111] mt-1">{savedAddress?.name}</p>
                <p className="text-xs text-[#666666] mt-0.5">
                  {savedAddress?.street}, {savedAddress?.city} - {savedAddress?.pincode}
                </p>
                <p className="text-xs text-[#888888] mt-1">Phone: {savedAddress?.phone}</p>
              </div>
              <Link
                to="/checkout"
                className="text-xs uppercase tracking-wider text-[#B89B67] hover:underline font-medium"
              >
                Change
              </Link>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white border border-[#E8E5DF] overflow-hidden">
              <div className="p-5 border-b border-[#E8E5DF] flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-lg text-[#111111]">Select Payment Method</h2>
                  <p className="text-xs text-[#777777] mt-0.5">All transactions are encrypted and secured by Razorpay</p>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1">
                  <ShieldCheck size={14} />
                  <span className="font-medium">256-Bit SSL</span>
                </div>
              </div>

              {/* Method 1: Razorpay UPI / QR */}
              <div
                onClick={() => setPaymentMethod("razorpay_upi")}
                className={`p-5 border-b border-[#E8E5DF] cursor-pointer transition-colors ${
                  paymentMethod === "razorpay_upi" ? "bg-[#FAF8F5]" : "hover:bg-[#FAF8F5]/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      checked={paymentMethod === "razorpay_upi"}
                      onChange={() => setPaymentMethod("razorpay_upi")}
                      className="accent-[#111111]"
                    />
                    <div className="flex items-center space-x-2">
                      <QrCode size={18} className="text-[#111111]" />
                      <span className="text-sm font-medium text-[#111111]">UPI (Google Pay, PhonePe, Paytm, QR)</span>
                    </div>
                  </div>
                  <span className="text-[10px] tracking-widest uppercase bg-[#111111] text-white px-2 py-0.5 font-semibold">
                    RECOMMENDED
                  </span>
                </div>

                {paymentMethod === "razorpay_upi" && (
                  <div className="mt-4 pt-4 border-t border-[#E8E5DF] space-y-4">
                    <p className="text-xs text-[#666666]">
                      Scan QR code with any UPI application or enter your Virtual Payment Address (VPA).
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="p-3 bg-white border border-[#E8E5DF] text-center">
                        <div className="w-28 h-28 bg-[#111111] mx-auto flex items-center justify-center text-white">
                          <QrCode size={84} className="text-white" />
                        </div>
                        <p className="text-[10px] text-[#888888] mt-1.5 uppercase tracking-wider">Scan with any UPI App</p>
                      </div>
                      <div className="flex-1 w-full space-y-2">
                        <label className="text-xs text-[#555555]">Or enter UPI ID</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. mobile@okhdfcbank"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="flex-1 px-3 py-2 border border-[#E8E5DF] text-xs focus:outline-hidden focus:border-[#111111] bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => setUpiId("aarav.lomaraa@okaxis")}
                            className="text-[11px] px-3 py-2 border border-[#E8E5DF] text-[#666666] hover:bg-[#FAF8F5]"
                          >
                            Use Demo ID
                          </button>
                        </div>
                        <p className="text-[11px] text-[#888888]">Supported: GPay, PhonePe, Paytm, BHIM, Cred</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Method 2: Credit / Debit Card */}
              <div
                onClick={() => setPaymentMethod("razorpay_card")}
                className={`p-5 border-b border-[#E8E5DF] cursor-pointer transition-colors ${
                  paymentMethod === "razorpay_card" ? "bg-[#FAF8F5]" : "hover:bg-[#FAF8F5]/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      checked={paymentMethod === "razorpay_card"}
                      onChange={() => setPaymentMethod("razorpay_card")}
                      className="accent-[#111111]"
                    />
                    <div className="flex items-center space-x-2">
                      <CreditCard size={18} className="text-[#111111]" />
                      <span className="text-sm font-medium text-[#111111]">Credit / Debit Card (Visa, Mastercard, Amex, RuPay)</span>
                    </div>
                  </div>
                </div>

                {paymentMethod === "razorpay_card" && (
                  <div className="mt-4 pt-4 border-t border-[#E8E5DF] space-y-3">
                    <div>
                      <label className="text-xs text-[#555555] block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="w-full px-3 py-2 border border-[#E8E5DF] text-xs bg-white focus:outline-hidden focus:border-[#111111]"
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs text-[#555555] block mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          value={cardData.name}
                          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                          className="w-full px-3 py-2 border border-[#E8E5DF] text-xs bg-white focus:outline-hidden focus:border-[#111111]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#555555] block mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="w-full px-3 py-2 border border-[#E8E5DF] text-xs bg-white focus:outline-hidden focus:border-[#111111]"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="text-xs text-[#555555] block mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className="w-full px-3 py-2 border border-[#E8E5DF] text-xs bg-white focus:outline-hidden focus:border-[#111111]"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-[#888888] flex items-center gap-1">
                      <Lock size={12} /> Encrypted via Razorpay PCI-DSS Level 1 compliant gateway.
                    </p>
                  </div>
                )}
              </div>

              {/* Method 3: Net Banking */}
              <div
                onClick={() => setPaymentMethod("netbanking")}
                className={`p-5 border-b border-[#E8E5DF] cursor-pointer transition-colors ${
                  paymentMethod === "netbanking" ? "bg-[#FAF8F5]" : "hover:bg-[#FAF8F5]/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={paymentMethod === "netbanking"}
                    onChange={() => setPaymentMethod("netbanking")}
                    className="accent-[#111111]"
                  />
                  <div className="flex items-center space-x-2">
                    <Building size={18} className="text-[#111111]" />
                    <span className="text-sm font-medium text-[#111111]">Net Banking (All Indian Major Banks)</span>
                  </div>
                </div>

                {paymentMethod === "netbanking" && (
                  <div className="mt-4 pt-4 border-t border-[#E8E5DF] space-y-3">
                    <p className="text-xs text-[#666666]">Select your bank to proceed to secure net banking:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["HDFC", "ICICI", "SBI", "Axis", "Kotak", "Yes Bank"].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBank(b);
                          }}
                          className={`py-2 px-3 border text-xs font-medium text-center transition-colors ${
                            selectedBank === b
                              ? "border-[#111111] bg-[#111111] text-white"
                              : "border-[#E8E5DF] bg-white text-[#444444] hover:border-[#111111]"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Method 4: Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod("cod")}
                className={`p-5 cursor-pointer transition-colors ${
                  paymentMethod === "cod" ? "bg-[#FAF8F5]" : "hover:bg-[#FAF8F5]/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-[#111111]"
                  />
                  <div className="flex items-center space-x-2">
                    <Banknote size={18} className="text-[#111111]" />
                    <div>
                      <span className="text-sm font-medium text-[#111111]">Cash on Delivery</span>
                      <p className="text-xs text-[#888888]">Pay with cash or digital UPI upon doorstep delivery</p>
                    </div>
                  </div>
                </div>

                {paymentMethod === "cod" && (
                  <div className="mt-3 pt-3 border-t border-[#E8E5DF] text-xs text-[#666666] flex items-start gap-2">
                    <AlertCircle size={14} className="text-[#B89B67] shrink-0 mt-0.5" />
                    <span>
                      Our concierge courier accepts exact cash or instant UPI scan at your doorstep. Verification OTP will be sent to your phone upon arrival.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Pay Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-4 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Processing Secure Transaction...</span>
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>PAY {formatINR(finalTotal)} &amp; CONFIRM ORDER</span>
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center space-x-6 text-[11px] text-[#777777]">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-[#B89B67]" /> RBI Compliant
                </span>
                <span>•</span>
                <span>100% Buyer Protection</span>
                <span>•</span>
                <span>7-Day Hassle-Free Returns</span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E8E5DF] p-6 sticky top-28 space-y-5">
              <h3 className="font-serif text-lg text-[#111111] pb-3 border-b border-[#E8E5DF]">
                Order Summary ({cart.reduce((t, i) => t + i.quantity, 0)} Items)
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex space-x-3 text-xs py-2 border-b border-[#F5F2EB] last:border-b-0">
                    <img
                      src={item.gallery?.front || item.coverImage}
                      alt={item.name}
                      className="w-14 h-18 object-cover bg-[#F5F1E8] border border-[#E8E5DF]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#111111] truncate">{item.name}</p>
                      <p className="text-[#777777] mt-0.5">
                        Size: {item.selectedSize} • Qty: {item.quantity}
                      </p>
                      <p className="text-[#888888] mt-0.5">{item.selectedColor || item.color}</p>
                      <p className="font-semibold text-[#111111] mt-1">
                        {formatINR(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2.5 text-xs pt-3 border-t border-[#E8E5DF]">
                <div className="flex justify-between text-[#666666]">
                  <span>Subtotal</span>
                  <span className="text-[#111111] font-medium">{formatINR(cartSubtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Promotional Discount ({appliedCoupon?.code})</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#666666]">
                  <span>Atelier Standard Delivery</span>
                  <span>{shippingFee === 0 ? "Complimentary" : formatINR(shippingFee)}</span>
                </div>

                <div className="flex justify-between text-[#666666]">
                  <span>Estimated GST (12%)</span>
                  <span>{formatINR(taxAmount)}</span>
                </div>

                <div className="pt-3 border-t border-[#111111] flex justify-between items-baseline">
                  <span className="font-serif text-sm text-[#111111] font-bold">Total Amount</span>
                  <span className="font-serif text-xl font-bold text-[#111111]">{formatINR(finalTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Simulation Processing Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-8 border border-[#E8E5DF] text-center shadow-2xl space-y-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF8F5] border border-[#B89B67] flex items-center justify-center">
              <Loader2 size={28} className="animate-spin text-[#B89B67]" />
            </div>

            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#888888] font-bold">RAZORPAY SECURE GATEWAY</p>
              <h3 className="font-serif text-xl text-[#111111] mt-1">
                {processingStep === 1
                  ? "Connecting to Banking Network..."
                  : processingStep === 2
                  ? "Verifying 3D Secure / OTP Authentication..."
                  : "Payment Approved. Creating Order..."}
              </h3>
              <p className="text-xs text-[#666666] mt-2">
                Please do not refresh or close this browser window.
              </p>
            </div>

            <div className="w-full bg-[#E5DFD3] h-1.5 overflow-hidden">
              <div
                className="bg-[#B89B67] h-full transition-all duration-700 ease-out"
                style={{
                  width: processingStep === 1 ? "35%" : processingStep === 2 ? "75%" : "100%"
                }}
              />
            </div>

            <div className="text-[11px] text-[#888888] flex items-center justify-center gap-1.5">
              <Lock size={12} className="text-[#2E7D32]" />
              <span>256-Bit End-to-End Encryption</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
