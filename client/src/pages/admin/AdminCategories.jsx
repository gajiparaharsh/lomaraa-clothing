import React, { useState } from "react";
import { PlusCircle, Search, Trash2, X } from "lucide-react";
import { useShop } from "../../context/ShopContext";

export const AdminCategories = () => {
  const { categories, addCategory, deleteCategory } = useShop();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCat, setNewCat] = useState({
    name: "",
    coverImage: "/images/products/lom-001/front.jpg"
  });

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;

    addCategory({
      name: newCat.name.trim(),
      coverImage: newCat.coverImage || "/images/products/lom-001/front.jpg"
    });

    setNewCat({ name: "", coverImage: "/images/products/lom-001/front.jpg" });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DF]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B67] font-bold">
            COLLECTION TAXONOMY
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold mt-1">
            Category &amp; Capsule Management
          </h1>
          <p className="text-xs text-[#666666] mt-1">
            Organize garments into seasonal capsule lines and shopping departments.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <PlusCircle size={14} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 border border-[#E8E5DF] flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
          />
        </div>

        <div className="text-xs text-[#777777]">
          Total Categories: <span className="font-bold text-[#111111]">{categories.length}</span>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCategories.map((cat) => (
          <div key={cat.id} className="bg-white border border-[#E8E5DF] overflow-hidden group shadow-2xs">
            <div className="h-44 relative overflow-hidden bg-[#FAF8F5]">
              <img
                src={cat.coverImage}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="font-serif text-lg font-bold">{cat.name}</h3>
                <p className="text-[11px] text-white/80">{cat.count || 2} Garments</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between text-xs border-t border-[#E8E5DF]">
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#E8F5E9] text-[#2E7D32]">
                Active
              </span>

              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => deleteCategory(cat.id)}
                  className="p-1.5 text-[#888888] hover:text-[#C62828] transition-colors"
                  title="Remove Category"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 border border-[#E8E5DF] shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-3">
              <h3 className="font-serif text-lg text-[#111111]">Create New Category</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#888888] hover:text-[#111111]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="text-[#555555] block mb-1">Category / Collection Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Knitwear &amp; Cashmere"
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="text-[#555555] block mb-1">Cover Image URL</label>
                <input
                  type="text"
                  placeholder="/images/products/lom-001/front.jpg"
                  value={newCat.coverImage}
                  onChange={(e) => setNewCat({ ...newCat, coverImage: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8E5DF] font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-[#E8E5DF]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#E8E5DF] uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#111111] text-white uppercase tracking-wider font-semibold hover:bg-black"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
