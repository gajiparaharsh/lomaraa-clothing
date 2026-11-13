import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  Clock
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { formatINR } from "../data/products";

export const OrderSuccessPage = () => {
  const { orders } = useShop();

  const lastOrderId = sessionStorage.getItem("lomaraa_last_order_id");
  const order = orders.find((o) => o.id === lastOrderId) || orders[0];

  useEffect(() => {
    // Scroll to top when landing on confirmation
    window.scrollTo(0, 0);
  }, []);

  if (!order) {
    return (
      <div className="w-full bg-white min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-2xl text-[#111111]">No recent orders found</h2>
          <Link
            to="/shop"
            className="inline-block px-8 py-3 bg-[#111111] text-white text-xs uppercase tracking-widest font-medium"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header Card */}
        <div className="bg-white border border-[#E8E5DF] p-8 sm:p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border-2 border-[#B89B67] text-[#B89B67] mx-auto flex items-center justify-center mb-6">
            <CheckCircle2 size={36} />
          </div>

          <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89B67] font-semibold">
            PAYMENT CONFIRMED &amp; ORDER PLACED
          </span>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] mt-2 font-medium">
            Thank You for Your Patronage
          </h1>

          <p className="text-sm text-[#666666] max-w-lg mx-auto mt-3">
            Your sartorial piece is now being carefully prepared and packaged in our atelier. An electronic receipt has been dispatched to your registered email.
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 bg-[#FAF8F5] border border-[#E8E5DF] px-6 py-3 text-xs">
            <div>
              <span className="text-[#888888] uppercase tracking-wider block text-[10px]">Order Reference</span>
              <span className="font-bold text-[#111111] tracking-wider text-sm">{order.id}</span>
            </div>
            <span className="text-[#CCCCCC] hidden sm:inline">|</span>
            <div>
              <span className="text-[#888888] uppercase tracking-wider block text-[10px]">Estimated Delivery</span>
              <span className="font-medium text-[#111111]">
                {order.estimatedDelivery || "Within 3-4 Business Days"}
              </span>
            </div>
            <span className="text-[#CCCCCC] hidden sm:inline">|</span>
            <div>
              <span className="text-[#888888] uppercase tracking-wider block text-[10px]">Payment Method</span>
              <span className="font-medium text-[#111111]">{order.paymentMethod}</span>
            </div>
          </div>
        </div>

        {/* Order Fulfillment Progress */}
        <div className="bg-white border border-[#E8E5DF] p-6 sm:p-8 mt-6">
          <h3 className="font-serif text-base text-[#111111] mb-6 flex items-center gap-2">
            <Clock size={16} className="text-[#B89B67]" />
            Order Progress
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
            <div className="flex sm:flex-col items-center sm:text-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold shrink-0">
                ✓
              </div>
              <div>
                <p className="text-xs font-semibold text-[#111111]">Confirmed</p>
                <p className="text-[11px] text-[#777777]">Order verified</p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:text-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#B89B67] text-white flex items-center justify-center text-xs font-bold shrink-0">
                2
              </div>
              <div>
                <p className="text-xs font-semibold text-[#111111]">Atelier Inspection</p>
                <p className="text-[11px] text-[#777777]">Garment QA &amp; packaging</p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:text-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E5DFD3] text-[#777777] flex items-center justify-center text-xs font-bold shrink-0">
                3
              </div>
              <div>
                <p className="text-xs font-semibold text-[#666666]">Dispatched</p>
                <p className="text-[11px] text-[#888888]">{order.courier || "BlueDart Express"}</p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:text-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E5DFD3] text-[#777777] flex items-center justify-center text-xs font-bold shrink-0">
                4
              </div>
              <div>
                <p className="text-xs font-semibold text-[#666666]">Delivered</p>
                <p className="text-[11px] text-[#888888]">To your doorstep</p>
              </div>
            </div>
          </div>
        </div>

        {/* Purchased Items & Delivery Destination */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          {/* Purchased Items List */}
          <div className="md:col-span-7 bg-white border border-[#E8E5DF] p-6 space-y-4">
            <h3 className="font-serif text-base text-[#111111] pb-3 border-b border-[#E8E5DF]">
              Purchased Garments ({order.items.length})
            </h3>

            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex space-x-4 text-xs pb-4 border-b border-[#F5F2EB] last:border-b-0">
                  <img
                    src={item.gallery?.front || item.coverImage}
                    alt={item.name}
                    className="w-16 h-20 object-cover bg-[#F5F1E8] border border-[#E8E5DF]"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-[#111111]">{item.name}</p>
                    <p className="text-[#777777] mt-0.5">
                      Size: {item.selectedSize} • Color: {item.selectedColor || item.color}
                    </p>
                    <p className="text-[#888888] mt-0.5">Qty: {item.quantity}</p>
                    <p className="font-semibold text-[#111111] mt-1">
                      {formatINR(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary */}
            <div className="pt-3 border-t border-[#E8E5DF] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#666666]">
                <span>Subtotal</span>
                <span>{formatINR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#2E7D32]">
                  <span>Discount</span>
                  <span>-{formatINR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#666666]">
                <span>Atelier Shipping</span>
                <span>{order.shipping === 0 ? "Complimentary" : formatINR(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-[#666666]">
                <span>GST (12%)</span>
                <span>{formatINR(order.tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#111111] pt-2 border-t border-[#111111]">
                <span>Total Paid</span>
                <span>{formatINR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Assistance */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white border border-[#E8E5DF] p-6 space-y-3">
              <h3 className="font-serif text-base text-[#111111] pb-2 border-b border-[#E8E5DF]">
                Delivery Destination
              </h3>
              <p className="text-xs font-semibold text-[#111111]">
                {order.shippingAddress?.name}
              </p>
              <p className="text-xs text-[#666666] leading-relaxed">
                {order.shippingAddress?.street}
                <br />
                {order.shippingAddress?.city}
              </p>
              <div className="pt-2 text-[11px] text-[#888888] flex items-center gap-1.5">
                <Truck size={14} className="text-[#B89B67]" />
                <span>Tracking No: {order.trackingNumber || "Pending Dispatch"}</span>
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E8E5DF] p-6 space-y-3">
              <h4 className="font-serif text-sm text-[#111111]">Lomaraa Concierge Support</h4>
              <p className="text-xs text-[#666666]">
                Have questions regarding tailoring or delivery schedule? Our style advisors are available 7 days a week.
              </p>
              <div className="pt-1 text-xs space-y-1 text-[#111111] font-medium">
                <p>Email: concierge@lomaraa.com</p>
                <p>Concierge WhatsApp: +91 98200 88000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={`/track-order/${order.id}`}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-black transition-colors text-center flex items-center justify-center gap-2"
          >
            <Truck size={14} />
            <span>Track Order Status</span>
          </Link>

          <Link
            to="/orders"
            className="w-full sm:w-auto px-8 py-3.5 border border-[#111111] text-[#111111] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#111111] hover:text-white transition-colors text-center flex items-center justify-center gap-2"
          >
            <Package size={14} />
            <span>View All Orders</span>
          </Link>

          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-3.5 border border-[#E8E5DF] bg-white text-[#444444] text-xs uppercase tracking-[0.15em] hover:bg-[#FAF8F5] transition-colors flex items-center justify-center gap-2"
          >
            <Printer size={14} />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
