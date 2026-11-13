import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  Bell
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { formatINR } from "../data/products";

export const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const { orders } = useShop();

  const [searchId, setSearchId] = useState("");
  const [activeOrderId, setActiveOrderId] = useState(orderId || orders[0]?.id || "LOM-98241");
  const [smsAlerts, setSmsAlerts] = useState(true);

  // Find the selected order or fallback
  const order = orders.find((o) => o.id === activeOrderId) || orders[0];

  const handleLookup = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = orders.find((o) => o.id.toLowerCase() === searchId.trim().toLowerCase());
    if (found) {
      setActiveOrderId(found.id);
    } else {
      setActiveOrderId(searchId.trim().toUpperCase());
    }
  };

  // Determine active step index
  const getStepIndex = (status) => {
    switch (status) {
      case "Delivered":
        return 4;
      case "Out for Delivery":
        return 3;
      case "Shipped":
        return 2;
      case "Processing":
        return 1;
      case "Confirmed":
      default:
        return 0;
    }
  };

  const currentStep = getStepIndex(order?.status || "Shipped");

  const timelineSteps = [
    { title: "Order Confirmed", desc: "Atelier received and verified payment", date: "April 14, 09:30 AM" },
    { title: "Quality Inspection", desc: "Garment hand-finished and steam-pressed", date: "April 14, 02:15 PM" },
    { title: "Dispatched & In Transit", desc: "Handed over to BlueDart Express Air Hub", date: "April 15, 08:45 AM" },
    { title: "Out for Delivery", desc: "Courier on route with your luxury package", date: "April 16, 10:00 AM" },
    { title: "Delivered", desc: "Hand delivered to recipient", date: "April 16, 02:30 PM" }
  ];

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs tracking-widest uppercase text-[#888888] mb-6">
          <Link to="/" className="hover:text-[#111111]">Home</Link>
          <span>/</span>
          <Link to="/orders" className="hover:text-[#111111]">Orders</Link>
          <span>/</span>
          <span className="text-[#111111] font-semibold">Track Delivery</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#E8E5DF] gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B89B67] font-semibold">
              REAL-TIME FULFILLMENT
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] mt-1 font-medium">
              Track Your Shipment
            </h1>
            <p className="text-xs sm:text-sm text-[#666666] mt-2">
              Follow every step of your garment's journey from our Mumbai atelier to your wardrobe.
            </p>
          </div>

          {/* Quick Lookup Form */}
          <form onSubmit={handleLookup} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. LOM-98241)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="px-3 py-2 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111] w-48 sm:w-56"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
            >
              Track
            </button>
          </form>
        </div>

        {order ? (
          <div className="space-y-6">
            {/* Top Shipment Status Banner */}
            <div className="bg-white border border-[#E8E5DF] p-6 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E8E5DF]">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs uppercase tracking-wider text-[#888888]">Order ID</span>
                    <span className="text-base font-bold text-[#111111]">{order.id}</span>
                  </div>
                  <p className="text-xs text-[#666666] mt-1">
                    Carrier: <span className="font-semibold text-[#111111]">{order.courier || "BlueDart Express"}</span> (Air Express)
                  </p>
                  <p className="text-xs text-[#888888] mt-0.5">
                    Waybill / AWB: <span className="font-mono text-[#111111]">{order.trackingNumber || "BD-88421099IN"}</span>
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs uppercase tracking-wider text-[#888888] block">Estimated Arrival</span>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#111111] mt-0.5">
                    {order.estimatedDelivery || "Within 2 Days"}
                  </p>
                  <span className="inline-block mt-1 text-[10px] uppercase tracking-widest px-2.5 py-0.5 bg-[#E8F5E9] text-[#2E7D32] font-semibold">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Visual 5-Step Stepper */}
              <div className="mt-8 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                  {timelineSteps.map((step, idx) => {
                    const isPassed = idx <= currentStep;
                    const isCurrent = idx === currentStep;

                    return (
                      <div key={idx} className="flex sm:flex-col items-center sm:text-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                            isCurrent
                              ? "bg-[#B89B67] text-white ring-4 ring-[#B89B67]/20"
                              : isPassed
                              ? "bg-[#111111] text-white"
                              : "bg-[#EAE6DE] text-[#888888]"
                          }`}
                        >
                          {isPassed ? (
                            idx < currentStep ? (
                              <CheckCircle2 size={18} />
                            ) : (
                              <Clock size={16} />
                            )
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <div>
                          <p
                            className={`text-xs font-semibold ${
                              isCurrent
                                ? "text-[#B89B67]"
                                : isPassed
                                ? "text-[#111111]"
                                : "text-[#888888]"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-[11px] text-[#777777] mt-0.5 leading-tight">{step.desc}</p>
                          <p className="text-[10px] text-[#999999] mt-1">{step.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Detailed Activity Log & Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Activity Log */}
              <div className="lg:col-span-7 bg-white border border-[#E8E5DF] p-6 space-y-4">
                <h3 className="font-serif text-base text-[#111111] pb-3 border-b border-[#E8E5DF] flex items-center justify-between">
                  <span>Shipment Activity Log</span>
                  <span className="text-[10px] text-[#888888] uppercase tracking-wider font-sans">Live Updates</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex gap-3 pb-3 border-b border-[#F5F2EB]">
                    <div className="w-2 h-2 rounded-full bg-[#2E7D32] mt-1.5 shrink-0" />
                    <div>
                      <p className="font-medium text-[#111111]">Package sorted at regional hub facility</p>
                      <p className="text-[#777777] text-[11px]">Bandra Kurla Complex Logistics Center, Mumbai</p>
                      <p className="text-[10px] text-[#999999] mt-0.5">Today • 11:20 AM</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pb-3 border-b border-[#F5F2EB]">
                    <div className="w-2 h-2 rounded-full bg-[#888888] mt-1.5 shrink-0" />
                    <div>
                      <p className="font-medium text-[#111111]">Dispatched via Air Express</p>
                      <p className="text-[#777777] text-[11px]">Chhatrapati Shivaji Maharaj Air Freight Terminal</p>
                      <p className="text-[10px] text-[#999999] mt-0.5">Yesterday • 04:45 PM</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pb-3 border-b border-[#F5F2EB]">
                    <div className="w-2 h-2 rounded-full bg-[#888888] mt-1.5 shrink-0" />
                    <div>
                      <p className="font-medium text-[#111111]">Lomaraa Atelier Quality QA Completed</p>
                      <p className="text-[#777777] text-[11px]">Crafted with dust bag &amp; hanger garment box</p>
                      <p className="text-[10px] text-[#999999] mt-0.5">2 days ago • 01:10 PM</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#888888] mt-1.5 shrink-0" />
                    <div>
                      <p className="font-medium text-[#111111]">Electronic Order Data Received</p>
                      <p className="text-[#777777] text-[11px]">Payment authorized &amp; verified</p>
                      <p className="text-[10px] text-[#999999] mt-0.5">3 days ago • 10:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E8E5DF] flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-[#555555]">
                    <Bell size={14} className="text-[#B89B67]" />
                    <span>SMS &amp; WhatsApp Notifications</span>
                  </div>
                  <button
                    onClick={() => setSmsAlerts(!smsAlerts)}
                    className={`text-[10px] px-2.5 py-1 font-semibold uppercase tracking-wider ${
                      smsAlerts ? "bg-[#111111] text-white" : "border border-[#E8E5DF] text-[#777777]"
                    }`}
                  >
                    {smsAlerts ? "Enabled" : "Enable"}
                  </button>
                </div>
              </div>

              {/* Destination & Package Items */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border border-[#E8E5DF] p-6 space-y-3">
                  <h3 className="font-serif text-base text-[#111111] pb-2 border-b border-[#E8E5DF]">
                    Shipping Destination
                  </h3>
                  <p className="text-xs font-semibold text-[#111111]">{order.shippingAddress?.name}</p>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {order.shippingAddress?.street}
                    <br />
                    {order.shippingAddress?.city}
                  </p>
                </div>

                <div className="bg-white border border-[#E8E5DF] p-6 space-y-3">
                  <h3 className="font-serif text-base text-[#111111] pb-2 border-b border-[#E8E5DF]">
                    Items in Shipment ({order.items.length})
                  </h3>
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex space-x-3 text-xs">
                        <img
                          src={item.gallery?.front || item.coverImage}
                          alt={item.name}
                          className="w-12 h-16 object-cover bg-[#F5F1E8] border border-[#E8E5DF]"
                        />
                        <div>
                          <p className="font-medium text-[#111111]">{item.name}</p>
                          <p className="text-[11px] text-[#777777]">
                            Size: {item.selectedSize} • Qty: {item.quantity}
                          </p>
                          <p className="font-medium text-[#111111] mt-0.5">{formatINR(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#E8E5DF] p-12 text-center">
            <p className="text-sm text-[#777777]">No shipment found for this order ID.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;
