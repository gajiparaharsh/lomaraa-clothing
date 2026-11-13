import React, { useState } from "react";
import {
  ArrowUpRight
} from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { formatINR } from "../../data/products";

export const AdminAnalytics = () => {
  const { products } = useShop();
  const [timeRange, setTimeRange] = useState("30d");

  const topProducts = products.slice(0, 5).map((p, idx) => ({
    ...p,
    salesCount: [48, 36, 29, 24, 18][idx] || 12,
    salesRevenue: ([48, 36, 29, 24, 18][idx] || 12) * p.price
  }));

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DF]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B67] font-bold">
            COMMERCE INTELLIGENCE
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold mt-1">
            Sales &amp; Financial Analytics
          </h1>
          <p className="text-xs text-[#666666] mt-1">
            Analyze customer acquisition economics, garment velocity and regional performance.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          {["7d", "30d", "90d", "ytd"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 uppercase font-medium border transition-colors ${
                timeRange === range
                  ? "border-[#111111] bg-[#111111] text-white"
                  : "border-[#E8E5DF] bg-white text-[#555555] hover:border-[#111111]"
              }`}
            >
              {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : range === "90d" ? "Quarter" : "YTD"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-[#E8E5DF] space-y-2">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block font-semibold">
            Gross Merchandise Value
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#111111]">₹6,84,200</h3>
          <p className="text-xs text-[#2E7D32] flex items-center gap-1 font-medium">
            <ArrowUpRight size={14} /> +22.4% vs previous window
          </p>
        </div>

        <div className="bg-white p-5 border border-[#E8E5DF] space-y-2">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block font-semibold">
            Average Order Value (AOV)
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#111111]">₹19,450</h3>
          <p className="text-xs text-[#2E7D32] flex items-center gap-1 font-medium">
            <ArrowUpRight size={14} /> +6.8% multi-item baskets
          </p>
        </div>

        <div className="bg-white p-5 border border-[#E8E5DF] space-y-2">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block font-semibold">
            Conversion Rate
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#111111]">3.48%</h3>
          <p className="text-xs text-[#2E7D32] flex items-center gap-1 font-medium">
            <ArrowUpRight size={14} /> +0.6% vs luxury benchmark
          </p>
        </div>

        <div className="bg-white p-5 border border-[#E8E5DF] space-y-2">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block font-semibold">
            Cart Abandonment Rate
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#111111]">21.4%</h3>
          <p className="text-xs text-[#2E7D32] flex items-center gap-1 font-medium">
            -4.2% optimized one-step checkout
          </p>
        </div>
      </div>

      {/* Grid: Acquisition Channels & Regional Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Acquisition Channel Breakdown */}
        <div className="lg:col-span-6 bg-white p-6 border border-[#E8E5DF] space-y-4">
          <div className="pb-3 border-b border-[#F0EDE6]">
            <h2 className="font-serif text-base text-[#111111] font-semibold">Customer Acquisition Channels</h2>
            <p className="text-xs text-[#777777]">Revenue breakdown by referral touchpoint</p>
          </div>

          <div className="space-y-4 pt-1 text-xs">
            {[
              { source: "Direct Atelier Visits & Word of Mouth", pct: "42%", val: "₹2,87,360" },
              { source: "Instagram Luxury Campaign & Editorial", pct: "28%", val: "₹1,91,570" },
              { source: "Organic Search & High Fashion Press", pct: "18%", val: "₹1,23,150" },
              { source: "Privé VIP Newsletter Invitations", pct: "12%", val: "₹82,120" }
            ].map((ch, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium text-[#111111]">{ch.source}</span>
                  <span className="font-bold text-[#111111]">{ch.val} ({ch.pct})</span>
                </div>
                <div className="w-full bg-[#EAE6DE] h-1.5 overflow-hidden rounded-full">
                  <div className="bg-[#111111] h-full" style={{ width: ch.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Geography */}
        <div className="lg:col-span-6 bg-white p-6 border border-[#E8E5DF] space-y-4">
          <div className="pb-3 border-b border-[#F0EDE6]">
            <h2 className="font-serif text-base text-[#111111] font-semibold">Geographical Distribution (India)</h2>
            <p className="text-xs text-[#777777]">Metropolitan demand &amp; delivery concentration</p>
          </div>

          <div className="space-y-4 pt-1 text-xs">
            {[
              { region: "Mumbai & MMR", pct: "38%", orders: "54 Orders" },
              { region: "Delhi NCR (Gurugram / South Delhi)", pct: "30%", orders: "42 Orders" },
              { region: "Bengaluru (Koramangala / Indiranagar)", pct: "18%", orders: "26 Orders" },
              { region: "Hyderabad & Chennai", pct: "9%", orders: "13 Orders" },
              { region: "Other Metropolitan & International", pct: "5%", orders: "7 Orders" }
            ].map((reg, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium text-[#111111]">{reg.region}</span>
                  <span className="font-bold text-[#111111]">{reg.orders} ({reg.pct})</span>
                </div>
                <div className="w-full bg-[#EAE6DE] h-1.5 overflow-hidden rounded-full">
                  <div className="bg-[#B89B67] h-full" style={{ width: reg.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top 5 Performing Garments */}
      <div className="bg-white border border-[#E8E5DF] shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-[#E8E5DF]">
          <h2 className="font-serif text-base text-[#111111] font-semibold">Top Performing Couture Garments</h2>
          <p className="text-xs text-[#777777] mt-0.5">Highest velocity styles ranked by total sales volume</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#888888] uppercase tracking-wider text-[10px] border-b border-[#E8E5DF]">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Garment</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Unit Price</th>
                <th className="py-3 px-4">Volume Sold</th>
                <th className="py-3 px-4 text-right">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE6]">
              {topProducts.map((p, idx) => (
                <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#111111]">
                    #{idx + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={p.gallery?.front || p.coverImage}
                        alt={p.name}
                        className="w-9 h-12 object-cover bg-[#FAF8F5] border border-[#E8E5DF]"
                      />
                      <span className="font-semibold text-[#111111]">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#555555]">
                    {p.category}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#111111]">
                    {formatINR(p.price)}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#111111]">
                    {p.salesCount} units
                  </td>
                  <td className="py-3.5 px-4 text-right font-serif font-bold text-[#111111] text-sm">
                    {formatINR(p.salesRevenue)}
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

export default AdminAnalytics;
