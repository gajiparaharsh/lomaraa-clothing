import React, { useState } from "react";
import { Search, Plus, Minus } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { formatINR } from "../../data/products";

export const AdminInventory = () => {
  const { products, updateProduct, showToast } = useShop();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStock, setFilterStock] = useState("all");

  const filteredProducts = products.filter((p) => {
    const stock = p.stock || 20;
    if (filterStock === "low" && (stock >= 15 || stock === 0)) return false;
    if (filterStock === "out" && stock > 0) return false;
    if (filterStock === "healthy" && stock < 15) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSku = p.sku?.toLowerCase().includes(q);
      return matchName || matchSku;
    }
    return true;
  });

  const handleAdjustStock = (productId, delta) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const currentStock = product.stock || 20;
    const newStock = Math.max(0, currentStock + delta);
    updateProduct(productId, { stock: newStock });
    showToast(`Stock for ${product.name} updated to ${newStock} units.`);
  };

  const handleRestockStandard = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    const newStock = (product.stock || 0) + 25;
    updateProduct(productId, { stock: newStock });
    showToast(`Added 25 units to ${product.name}.`);
  };

  const totalInventoryUnits = products.reduce((acc, p) => acc + (p.stock || 20), 0);
  const lowStockCount = products.filter((p) => (p.stock || 20) > 0 && (p.stock || 20) < 15).length;
  const outOfStockCount = products.filter((p) => (p.stock || 0) === 0).length;

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DF]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B67] font-bold">
            STOCK CONTROLS &amp; WAREHOUSE
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold mt-1">
            Inventory &amp; Warehousing
          </h1>
          <p className="text-xs text-[#666666] mt-1">
            Real-time stock audits, threshold alerts and batch restocking.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Total Physical Units</span>
          <span className="font-serif text-xl font-bold text-[#111111] mt-1 block">
            {totalInventoryUnits} Units
          </span>
        </div>
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Healthy Stock</span>
          <span className="font-serif text-xl font-bold text-[#2E7D32] mt-1 block">
            {products.length - lowStockCount - outOfStockCount} SKUs
          </span>
        </div>
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Low Stock Alerts</span>
          <span className="font-serif text-xl font-bold text-[#F57F17] mt-1 block">
            {lowStockCount} SKUs
          </span>
        </div>
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Out of Stock</span>
          <span className="font-serif text-xl font-bold text-[#C62828] mt-1 block">
            {outOfStockCount} SKUs
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 border border-[#E8E5DF] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
          <input
            type="text"
            placeholder="Search SKU or Garment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
          />
        </div>

        <div className="flex gap-2 text-xs">
          <select
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
          >
            <option value="all">All Inventory</option>
            <option value="healthy">Healthy Stock (&gt; 15)</option>
            <option value="low">Low Stock (&lt; 15)</option>
            <option value="out">Out of Stock (0)</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-[#E8E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#888888] uppercase tracking-wider text-[10px] border-b border-[#E8E5DF]">
              <tr>
                <th className="py-3.5 px-4">Garment</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Unit Price</th>
                <th className="py-3.5 px-4">Stock Level</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Asset Value</th>
                <th className="py-3.5 px-4 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE6]">
              {filteredProducts.map((p) => {
                const stock = p.stock || 20;
                const isLow = stock > 0 && stock < 15;
                const isOut = stock === 0;

                return (
                  <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={p.gallery?.front || p.coverImage}
                          alt={p.name}
                          className="w-9 h-12 object-cover bg-[#FAF8F5] border border-[#E8E5DF] shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-[#111111]">{p.name}</p>
                          <p className="text-[11px] text-[#777777]">{p.category} • {p.gender}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#555555]">
                      {p.sku || p.id}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-[#111111]">
                      {formatINR(p.price)}
                    </td>

                    <td className="py-3.5 px-4">
                      {/* Interactive Stepper */}
                      <div className="flex items-center space-x-1.5">
                        <button
                          type="button"
                          onClick={() => handleAdjustStock(p.id, -1)}
                          className="w-6 h-6 border border-[#E8E5DF] bg-white hover:bg-[#FAF8F5] flex items-center justify-center text-[#555555]"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-10 text-center font-bold text-[#111111]">
                          {stock}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAdjustStock(p.id, 1)}
                          className="w-6 h-6 border border-[#E8E5DF] bg-white hover:bg-[#FAF8F5] flex items-center justify-center text-[#555555]"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[9px] uppercase tracking-wider px-2.5 py-0.5 font-bold ${
                          isOut
                            ? "bg-[#FFEBEE] text-[#C62828]"
                            : isLow
                            ? "bg-[#FFF8E1] text-[#F57F17]"
                            : "bg-[#E8F5E9] text-[#2E7D32]"
                        }`}
                      >
                        {isOut ? "Depleted" : isLow ? "Low Stock" : "Optimum"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#111111]">
                      {formatINR(p.price * stock)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleRestockStandard(p.id)}
                        className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-semibold border border-[#E8E5DF] bg-white hover:bg-[#111111] hover:text-white transition-colors"
                      >
                        +25 Units
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInventory;
