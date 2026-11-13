import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  X
} from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { formatINR } from "../../data/products";

export const AdminProducts = () => {
  const { products, deleteProduct, categories } = useShop();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [deletingProductId, setDeletingProductId] = useState(null);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }
    if (selectedGender !== "all" && product.gender !== selectedGender) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchSku = product.sku?.toLowerCase().includes(q);
      return matchName || matchSku;
    }
    return true;
  });

  const productToDelete = products.find((p) => p.id === deletingProductId);

  const handleConfirmDelete = () => {
    if (deletingProductId) {
      deleteProduct(deletingProductId);
      setDeletingProductId(null);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DF]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B67] font-bold">
            CATALOGUE DIRECTORY
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold mt-1">
            Garment &amp; Product Management
          </h1>
          <p className="text-xs text-[#666666] mt-1">
            Manage couture listings, inventories, pricing and seasonal highlights.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="px-4 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <PlusCircle size={14} />
          <span>Add New Garment</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Total SKUs</span>
          <span className="font-serif text-xl font-bold text-[#111111] mt-1 block">
            {products.length}
          </span>
        </div>
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">In Stock</span>
          <span className="font-serif text-xl font-bold text-[#2E7D32] mt-1 block">
            {products.filter((p) => p.stock > 0).length}
          </span>
        </div>
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Low Stock (&lt; 15)</span>
          <span className="font-serif text-xl font-bold text-[#F57F17] mt-1 block">
            {products.filter((p) => p.stock > 0 && p.stock < 15).length}
          </span>
        </div>
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Total Inventory Value</span>
          <span className="font-serif text-xl font-bold text-[#111111] mt-1 block">
            {formatINR(products.reduce((acc, p) => acc + p.price * (p.stock || 20), 0))}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-[#E8E5DF] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
          <input
            type="text"
            placeholder="Search by title or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
          />
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>

          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
          >
            <option value="all">All Genders</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#E8E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#888888] uppercase tracking-wider text-[10px] border-b border-[#E8E5DF]">
              <tr>
                <th className="py-3 px-4">Garment</th>
                <th className="py-3 px-4">SKU / ID</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Price (INR)</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE6]">
              {filteredProducts.map((product) => {
                const isLowStock = product.stock > 0 && product.stock < 15;
                const isOutOfStock = product.stock === 0;

                return (
                  <tr key={product.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.gallery?.front || product.coverImage}
                          alt={product.name}
                          className="w-10 h-14 object-cover bg-[#FAF8F5] border border-[#E8E5DF] shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-[#111111] truncate">{product.name}</p>
                          <p className="text-[11px] text-[#777777] truncate">{product.tagline}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-[#555555]">
                      {product.sku || product.id}
                    </td>

                    <td className="py-3 px-4 text-[#444444]">
                      {product.category}
                    </td>

                    <td className="py-3 px-4 text-[#444444]">
                      {product.gender}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-[#111111]">
                        {formatINR(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="block text-[10px] text-[#888888] line-through">
                          {formatINR(product.originalPrice)}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`font-semibold ${
                          isOutOfStock
                            ? "text-[#C62828]"
                            : isLowStock
                            ? "text-[#F57F17]"
                            : "text-[#2E7D32]"
                        }`}
                      >
                        {product.stock || 25} units
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`text-[9px] uppercase tracking-wider px-2 py-0.5 font-bold ${
                          isOutOfStock
                            ? "bg-[#FFEBEE] text-[#C62828]"
                            : isLowStock
                            ? "bg-[#FFF8E1] text-[#F57F17]"
                            : "bg-[#E8F5E9] text-[#2E7D32]"
                        }`}
                      >
                        {isOutOfStock ? "Out of Stock" : isLowStock ? "Low Stock" : "In Stock"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/product/${product.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View on store"
                          className="p-1.5 text-[#888888] hover:text-[#111111]"
                        >
                          <ExternalLink size={14} />
                        </Link>

                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          title="Edit garment"
                          className="p-1.5 text-[#888888] hover:text-[#B89B67]"
                        >
                          <Edit size={14} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => setDeletingProductId(product.id)}
                          title="Delete from catalog"
                          className="p-1.5 text-[#888888] hover:text-[#C62828]"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 border border-[#E8E5DF] shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-3">
              <h3 className="font-serif text-lg text-[#111111]">Remove Product</h3>
              <button
                onClick={() => setDeletingProductId(null)}
                className="text-[#888888] hover:text-[#111111]"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#666666] leading-relaxed">
              Are you sure you want to permanently remove <span className="font-bold text-[#111111]">{productToDelete?.name}</span> ({productToDelete?.sku}) from the Lomaraa catalog?
            </p>

            <div className="flex justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setDeletingProductId(null)}
                className="px-4 py-2 border border-[#E8E5DF] text-xs uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-[#C62828] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#B71C1C]"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
