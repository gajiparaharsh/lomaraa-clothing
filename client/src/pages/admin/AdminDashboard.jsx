import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  ChevronRight,
  PlusCircle
} from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { formatINR } from "../../data/products";

export const AdminDashboard = () => {
  const { products, orders, customers, categories } = useShop();

  // Calculated metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "Cancelled" ? o.total : 0), 245280);
  const totalOrdersCount = orders.length + 84;
  const totalCustomersCount = customers.length + 120;
  const totalProductsCount = products.length;

  const monthlySales = [
    { month: "Nov", sales: 185000, height: "45%" },
    { month: "Dec", sales: 298000, height: "72%" },
    { month: "Jan", sales: 242000, height: "58%" },
    { month: "Feb", sales: 310000, height: "75%" },
    { month: "Mar", sales: 380000, height: "92%" },
    { month: "Apr", sales: 412000, height: "100%" }
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DF]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B67] font-bold">
            COMMERCE OVERVIEW
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold mt-1">
            Atelier Executive Dashboard
          </h1>
          <p className="text-xs text-[#666666] mt-1">
            Real-time sales, order fulfillment and inventory health across Lomaraa.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/products/new"
            className="px-4 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <PlusCircle size={14} />
            <span>Add New Garment</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 border border-[#E8E5DF] shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Revenue</span>
            <div className="p-2 bg-[#FAF8F5] text-[#111111] rounded-full">
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">
              {formatINR(totalRevenue)}
            </h3>
            <p className="text-xs text-[#2E7D32] flex items-center gap-1 mt-1 font-medium">
              <ArrowUpRight size={14} /> +18.4% vs last period
            </p>
          </div>
        </div>

        <div className="bg-white p-6 border border-[#E8E5DF] shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Orders</span>
            <div className="p-2 bg-[#FAF8F5] text-[#111111] rounded-full">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">
              {totalOrdersCount}
            </h3>
            <p className="text-xs text-[#2E7D32] flex items-center gap-1 mt-1 font-medium">
              <ArrowUpRight size={14} /> +12.1% fulfillment rate
            </p>
          </div>
        </div>

        <div className="bg-white p-6 border border-[#E8E5DF] shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Atelier Patrons</span>
            <div className="p-2 bg-[#FAF8F5] text-[#111111] rounded-full">
              <Users size={16} />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">
              {totalCustomersCount}
            </h3>
            <p className="text-xs text-[#2E7D32] flex items-center gap-1 mt-1 font-medium">
              <ArrowUpRight size={14} /> +24 new this month
            </p>
          </div>
        </div>

        <div className="bg-white p-6 border border-[#E8E5DF] shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-[#888888]">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Active Catalog</span>
            <div className="p-2 bg-[#FAF8F5] text-[#111111] rounded-full">
              <Package size={16} />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">
              {totalProductsCount} SKUs
            </h3>
            <p className="text-xs text-[#B89B67] flex items-center gap-1 mt-1 font-medium">
              Across {categories.length} Collections
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Chart & Category Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Revenue Bar Chart */}
        <div className="lg:col-span-8 bg-white border border-[#E8E5DF] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0EDE6]">
            <div>
              <h2 className="font-serif text-base text-[#111111] font-semibold">Gross Revenue Trajectory</h2>
              <p className="text-xs text-[#777777]">Monthly sales volume (INR)</p>
            </div>
            <span className="text-xs font-semibold text-[#111111] bg-[#FAF8F5] px-2.5 py-1 border border-[#E8E5DF]">
              FY 2025-26
            </span>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 sm:gap-6 pt-6 pb-2 px-2">
            {monthlySales.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] text-[#777777] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatINR(item.sales)}
                </span>
                <div
                  className="w-full bg-[#111111] group-hover:bg-[#B89B67] transition-all rounded-xs relative"
                  style={{ height: item.height }}
                />
                <span className="text-xs text-[#666666] font-medium mt-1">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-4 bg-white border border-[#E8E5DF] p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-[#F0EDE6]">
            <h2 className="font-serif text-base text-[#111111] font-semibold">Collection Share</h2>
            <p className="text-xs text-[#777777]">Sales contribution by category</p>
          </div>

          <div className="space-y-3 pt-1">
            {[
              { name: "Outerwear & Coats", pct: "34%", amount: "₹1,42,000" },
              { name: "Tailoring & Blazers", pct: "26%", amount: "₹1,08,500" },
              { name: "Shirts & Trousers", pct: "22%", amount: "₹92,300" },
              { name: "Dresses & Tops", pct: "12%", amount: "₹50,200" },
              { name: "Accessories", pct: "6%", amount: "₹25,100" }
            ].map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[#111111]">{cat.name}</span>
                  <span className="text-[#666666] font-semibold">{cat.pct}</span>
                </div>
                <div className="w-full bg-[#EAE6DE] h-1.5 overflow-hidden rounded-full">
                  <div
                    className="bg-[#B89B67] h-full"
                    style={{ width: cat.pct }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#F0EDE6] text-center">
            <Link
              to="/admin/categories"
              className="text-xs uppercase tracking-wider text-[#111111] hover:text-[#B89B67] font-semibold inline-flex items-center gap-1"
            >
              <span>Manage Collections</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white border border-[#E8E5DF] shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-[#E8E5DF] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-base text-[#111111] font-semibold">Recent Atelier Orders</h2>
            <p className="text-xs text-[#777777] mt-0.5">Latest acquisitions requiring processing and dispatch</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs uppercase tracking-wider text-[#111111] hover:text-[#B89B67] font-semibold inline-flex items-center gap-1"
          >
            <span>View All ({orders.length})</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#888888] uppercase tracking-wider text-[10px] border-b border-[#E8E5DF]">
              <tr>
                <th className="py-3 px-6">Order ID</th>
                <th className="py-3 px-6">Patron</th>
                <th className="py-3 px-6">Items</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Total</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE6]">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-[#111111]">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-6 text-[#444444]">
                    {order.shippingAddress?.name || "Patron"}
                  </td>
                  <td className="py-3.5 px-6 text-[#666666]">
                    {order.items.length} garment{order.items.length > 1 ? "s" : ""}
                  </td>
                  <td className="py-3.5 px-6 text-[#777777]">
                    {new Date(order.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short"
                    })}
                  </td>
                  <td className="py-3.5 px-6 font-bold text-[#111111]">
                    {formatINR(order.total)}
                  </td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 font-bold ${
                        order.status === "Delivered"
                          ? "bg-[#E8F5E9] text-[#2E7D32]"
                          : order.status === "Cancelled"
                          ? "bg-[#FFEBEE] text-[#C62828]"
                          : "bg-[#E3F2FD] text-[#1565C0]"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <Link
                      to="/admin/orders"
                      className="text-xs uppercase tracking-wider text-[#B89B67] hover:underline font-semibold"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
