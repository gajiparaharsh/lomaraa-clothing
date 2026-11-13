import React, { useState } from "react";
import {
  Search,
  Printer,
  Eye,
  X
} from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { formatINR } from "../../data/products";

export const AdminOrders = () => {
  const { orders, updateOrderStatus } = useShop();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [inspectingOrder, setInspectingOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    if (selectedStatus !== "all" && order.status !== selectedStatus) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchName = order.shippingAddress?.name?.toLowerCase().includes(q);
      return matchId || matchName;
    }
    return true;
  });

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (inspectingOrder && inspectingOrder.id === orderId) {
      setInspectingOrder({ ...inspectingOrder, status: newStatus });
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DF]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B67] font-bold">
            FULFILLMENT &amp; LOGISTICS
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold mt-1">
            Order Fulfillment &amp; Dispatch
          </h1>
          <p className="text-xs text-[#666666] mt-1">
            Track customer acquisitions, dispatch tracking numbers and delivery verification.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Total Volume</span>
          <span className="font-serif text-xl font-bold text-[#111111] mt-1 block">
            {orders.length} Orders
          </span>
        </div>
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Ready to Dispatch</span>
          <span className="font-serif text-xl font-bold text-[#F57F17] mt-1 block">
            {orders.filter((o) => o.status === "Confirmed").length}
          </span>
        </div>
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">In Transit</span>
          <span className="font-serif text-xl font-bold text-[#1565C0] mt-1 block">
            {orders.filter((o) => o.status === "Shipped").length}
          </span>
        </div>
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Delivered</span>
          <span className="font-serif text-xl font-bold text-[#2E7D32] mt-1 block">
            {orders.filter((o) => o.status === "Delivered").length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-[#E8E5DF] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
          <input
            type="text"
            placeholder="Search by order ID or patron name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
          />
        </div>

        <div className="flex gap-2 text-xs">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
          >
            <option value="all">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#E8E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#888888] uppercase tracking-wider text-[10px] border-b border-[#E8E5DF]">
              <tr>
                <th className="py-3.5 px-4">Order ID &amp; Date</th>
                <th className="py-3.5 px-4">Patron &amp; Destination</th>
                <th className="py-3.5 px-4">Garments</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Status &amp; Flow</th>
                <th className="py-3.5 px-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE6]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#111111]">{order.id}</p>
                    <p className="text-[11px] text-[#777777] mt-0.5">
                      {new Date(order.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </p>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-medium text-[#111111]">{order.shippingAddress?.name || "Client"}</p>
                    <p className="text-[11px] text-[#777777] mt-0.5">{order.shippingAddress?.city}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-1.5">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <img
                          key={idx}
                          src={item.gallery?.front || item.coverImage}
                          alt={item.name}
                          title={item.name}
                          className="w-8 h-10 object-cover bg-[#FAF8F5] border border-[#E8E5DF]"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-[10px] text-[#777777]">+{order.items.length - 3}</span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-[#111111]">
                    {formatINR(order.total)}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-[11px] text-[#555555] block">{order.paymentMethod}</span>
                    <span className="text-[10px] text-[#2E7D32] font-semibold">● {order.paymentStatus || "Paid"}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 border focus:outline-hidden ${
                        order.status === "Delivered"
                          ? "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]"
                          : order.status === "Cancelled"
                          ? "bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]"
                          : order.status === "Shipped"
                          ? "bg-[#E3F2FD] text-[#1565C0] border-[#BBDEFB]"
                          : "bg-[#FFF8E1] text-[#F57F17] border-[#FFE082]"
                      }`}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setInspectingOrder(order)}
                      className="p-1.5 text-[#888888] hover:text-[#111111] transition-colors"
                      title="Inspect Order &amp; Invoice"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Inspection / Invoice Modal */}
      {inspectingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full p-6 sm:p-8 border border-[#E8E5DF] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B89B67] font-bold">
                  OFFICIAL ATELIER INVOICE
                </span>
                <h3 className="font-serif text-xl text-[#111111]">Order {inspectingOrder.id}</h3>
              </div>
              <button
                onClick={() => setInspectingOrder(null)}
                className="text-[#888888] hover:text-[#111111]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-[#888888] uppercase tracking-wider text-[10px]">Patron Details</p>
                <p className="font-semibold text-[#111111] mt-1">{inspectingOrder.shippingAddress?.name}</p>
                <p className="text-[#666666] leading-relaxed mt-0.5">
                  {inspectingOrder.shippingAddress?.street}
                  <br />
                  {inspectingOrder.shippingAddress?.city}
                </p>
              </div>

              <div>
                <p className="text-[#888888] uppercase tracking-wider text-[10px]">Logistics Partner</p>
                <p className="font-semibold text-[#111111] mt-1">{inspectingOrder.courier || "BlueDart Express"}</p>
                <p className="text-[#666666] mt-0.5">AWB: {inspectingOrder.trackingNumber}</p>
                <p className="text-[#666666]">Payment: {inspectingOrder.paymentMethod}</p>
              </div>
            </div>

            {/* Items */}
            <div className="border-t border-[#E8E5DF] pt-4 space-y-3">
              <p className="text-[10px] uppercase tracking-wider text-[#888888] font-bold">Garments Ordered</p>
              {inspectingOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs pb-2 border-b border-[#F5F2EB] last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.gallery?.front || item.coverImage}
                      alt={item.name}
                      className="w-10 h-14 object-cover bg-[#FAF8F5] border border-[#E8E5DF]"
                    />
                    <div>
                      <p className="font-medium text-[#111111]">{item.name}</p>
                      <p className="text-[#777777] text-[11px]">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#111111]">{formatINR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-[#E8E5DF] pt-3 text-xs space-y-1 text-right">
              <div className="flex justify-between text-[#666666]">
                <span>Subtotal</span>
                <span>{formatINR(inspectingOrder.subtotal)}</span>
              </div>
              {inspectingOrder.discount > 0 && (
                <div className="flex justify-between text-[#2E7D32]">
                  <span>Discount</span>
                  <span>-{formatINR(inspectingOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#666666]">
                <span>Shipping</span>
                <span>{inspectingOrder.shipping === 0 ? "Complimentary" : formatINR(inspectingOrder.shipping)}</span>
              </div>
              <div className="flex justify-between text-[#666666]">
                <span>GST (12%)</span>
                <span>{formatINR(inspectingOrder.tax)}</span>
              </div>
              <div className="flex justify-between font-serif font-bold text-sm text-[#111111] pt-2 border-t border-[#111111]">
                <span>Grand Total</span>
                <span>{formatINR(inspectingOrder.total)}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t border-[#E8E5DF]">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 border border-[#E8E5DF] text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#FAF8F5]"
              >
                <Printer size={13} />
                <span>Print Invoice</span>
              </button>
              <button
                type="button"
                onClick={() => setInspectingOrder(null)}
                className="px-4 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
