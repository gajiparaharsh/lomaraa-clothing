import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  Search,
  RotateCcw,
  CheckCircle2,
  X
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { formatINR } from "../data/products";

export const OrdersPage = () => {
  const { orders, cancelOrder, addToCart, showToast } = useShop();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const filteredOrders = orders.filter((order) => {
    // Tab filter
    if (activeTab === "active" && !["Confirmed", "Shipped", "Processing"].includes(order.status)) {
      return false;
    }
    if (activeTab === "delivered" && order.status !== "Delivered") {
      return false;
    }
    if (activeTab === "cancelled" && order.status !== "Cancelled") {
      return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesId = order.id.toLowerCase().includes(q);
      const matchesItem = order.items.some((item) => item.name.toLowerCase().includes(q));
      return matchesId || matchesItem;
    }

    return true;
  });

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addToCart(item, item.selectedSize, item.selectedColor);
    });
    showToast(`Items from order ${order.id} added to bag.`);
  };

  const handleConfirmCancel = (orderId) => {
    cancelOrder(orderId);
    setCancellingOrderId(null);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs tracking-widest uppercase text-[#888888] mb-6">
          <Link to="/" className="hover:text-[#111111]">Home</Link>
          <span>/</span>
          <Link to="/account" className="hover:text-[#111111]">Account</Link>
          <span>/</span>
          <span className="text-[#111111] font-semibold">Orders</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#E8E5DF]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B89B67] font-semibold">
              ACQUISITION HISTORY
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] mt-1 font-medium">
              My Wardrobe Orders
            </h1>
            <p className="text-xs sm:text-sm text-[#666666] mt-2">
              Review current deliveries, previous acquisitions, invoices and garment tracking.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-xs text-[#777777]">
            Total Orders: <span className="font-bold text-[#111111]">{orders.length}</span>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="flex border-b border-[#E8E5DF] sm:border-none space-x-6 text-xs uppercase tracking-wider font-medium">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-2 transition-colors ${
                activeTab === "all"
                  ? "border-b-2 border-[#111111] text-[#111111] font-bold"
                  : "text-[#777777] hover:text-[#111111]"
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`pb-2 transition-colors ${
                activeTab === "active"
                  ? "border-b-2 border-[#111111] text-[#111111] font-bold"
                  : "text-[#777777] hover:text-[#111111]"
              }`}
            >
              In Transit ({orders.filter((o) => ["Confirmed", "Shipped", "Processing"].includes(o.status)).length})
            </button>
            <button
              onClick={() => setActiveTab("delivered")}
              className={`pb-2 transition-colors ${
                activeTab === "delivered"
                  ? "border-b-2 border-[#111111] text-[#111111] font-bold"
                  : "text-[#777777] hover:text-[#111111]"
              }`}
            >
              Delivered ({orders.filter((o) => o.status === "Delivered").length})
            </button>
            <button
              onClick={() => setActiveTab("cancelled")}
              className={`pb-2 transition-colors ${
                activeTab === "cancelled"
                  ? "border-b-2 border-[#111111] text-[#111111] font-bold"
                  : "text-[#777777] hover:text-[#111111]"
              }`}
            >
              Cancelled ({orders.filter((o) => o.status === "Cancelled").length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
            <input
              type="text"
              placeholder="Search order ID or garment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
            />
          </div>
        </div>

        {/* Orders Listing */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-[#E8E5DF] p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#888888] mx-auto flex items-center justify-center">
              <Package size={24} />
            </div>
            <h3 className="font-serif text-lg text-[#111111]">No orders match your criteria</h3>
            <p className="text-xs text-[#777777] max-w-sm mx-auto">
              You haven't placed any orders matching this filter, or your search query yielded no results.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3 bg-[#111111] text-white text-xs uppercase tracking-widest font-medium"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const isDelivered = order.status === "Delivered";
              const isCancelled = order.status === "Cancelled";
              const isShipped = order.status === "Shipped";

              return (
                <div key={order.id} className="bg-white border border-[#E8E5DF] overflow-hidden shadow-2xs">
                  {/* Order Top Bar */}
                  <div className="bg-[#FAF8F5] p-4 sm:p-5 border-b border-[#E8E5DF] flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                      <div>
                        <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Order Placed</span>
                        <span className="font-medium text-[#111111]">
                          {new Date(order.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Order ID</span>
                        <span className="font-bold text-[#111111] tracking-wider">{order.id}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Total Amount</span>
                        <span className="font-serif font-bold text-[#111111] text-sm">
                          {formatINR(order.total)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Status Badge */}
                      <span
                        className={`text-[10px] uppercase tracking-widest px-3 py-1 font-semibold flex items-center gap-1 ${
                          isDelivered
                            ? "bg-[#E8F5E9] text-[#2E7D32]"
                            : isCancelled
                            ? "bg-[#FFEBEE] text-[#C62828]"
                            : isShipped
                            ? "bg-[#E3F2FD] text-[#1565C0]"
                            : "bg-[#FFF8E1] text-[#F57F17]"
                        }`}
                      >
                        {isDelivered && <CheckCircle2 size={12} />}
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Body Items */}
                  <div className="p-5 sm:p-6">
                    <div className="divide-y divide-[#F5F2EB]">
                      {order.items.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-start space-x-4">
                            <img
                              src={item.gallery?.front || item.coverImage}
                              alt={item.name}
                              className="w-16 h-20 object-cover bg-[#F5F1E8] border border-[#E8E5DF] shrink-0"
                            />
                            <div>
                              <Link
                                to={`/product/${item.slug}`}
                                className="font-medium text-sm text-[#111111] hover:text-[#B89B67] transition-colors"
                              >
                                {item.name}
                              </Link>
                              <p className="text-xs text-[#777777] mt-0.5">
                                Size: <span className="font-medium text-[#222222]">{item.selectedSize}</span> • Color:{" "}
                                <span className="font-medium text-[#222222]">{item.selectedColor || item.color}</span>
                              </p>
                              <p className="text-xs text-[#888888] mt-0.5">Quantity: {item.quantity}</p>
                              <p className="text-xs font-semibold text-[#111111] mt-1">
                                {formatINR(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 self-end sm:self-center">
                            <Link
                              to={`/product/${item.slug}`}
                              className="text-xs uppercase tracking-wider text-[#111111] hover:text-[#B89B67] font-medium"
                            >
                              Buy Again
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Card Footer */}
                  <div className="bg-[#FAF8F5]/60 p-4 sm:p-5 border-t border-[#E8E5DF] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-2 text-[#666666]">
                      <Truck size={14} className="text-[#B89B67]" />
                      <span>
                        {isDelivered
                          ? `Delivered on ${order.estimatedDelivery}`
                          : isCancelled
                          ? "Order was cancelled"
                          : `Estimated delivery by ${order.estimatedDelivery}`}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      {!isCancelled && (
                        <Link
                          to={`/track-order/${order.id}`}
                          className="px-4 py-2 bg-[#111111] text-white text-[11px] uppercase tracking-wider font-semibold hover:bg-black transition-colors flex items-center gap-1.5"
                        >
                          <Truck size={13} />
                          <span>Track Package</span>
                        </Link>
                      )}

                      <button
                        onClick={() => handleReorder(order)}
                        className="px-4 py-2 border border-[#E8E5DF] bg-white text-[#333333] text-[11px] uppercase tracking-wider hover:bg-[#FAF8F5] transition-colors flex items-center gap-1.5"
                      >
                        <RotateCcw size={13} />
                        <span>Reorder All</span>
                      </button>

                      {!isCancelled && !isDelivered && (
                        <button
                          onClick={() => setCancellingOrderId(order.id)}
                          className="px-3 py-2 text-[#C62828] text-[11px] uppercase tracking-wider hover:underline"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancel Order Confirmation Modal */}
      {cancellingOrderId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 border border-[#E8E5DF] shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-3">
              <h3 className="font-serif text-lg text-[#111111]">Cancel Order</h3>
              <button
                onClick={() => setCancellingOrderId(null)}
                className="text-[#888888] hover:text-[#111111]"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#666666] leading-relaxed">
              Are you sure you wish to cancel order <span className="font-bold text-[#111111]">{cancellingOrderId}</span>? A full refund will be processed immediately to your original payment method.
            </p>

            <div className="flex justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setCancellingOrderId(null)}
                className="px-4 py-2 border border-[#E8E5DF] text-xs uppercase tracking-wider"
              >
                Keep Order
              </button>
              <button
                type="button"
                onClick={() => handleConfirmCancel(cancellingOrderId)}
                className="px-4 py-2 bg-[#C62828] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#B71C1C]"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
