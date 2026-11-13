import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useShop } from "../../context/ShopContext";

export const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, categories } = useShop();

  const isEditing = Boolean(id);
  const existingProduct = isEditing ? products.find((p) => p.id === id) : null;

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sku: "",
    category: "Outerwear",
    gender: "Men",
    price: 9990,
    originalPrice: 11990,
    stock: 25,
    sizes: ["S", "M", "L", "XL"],
    color: "Camel Sand",
    tagline: "Tailored luxury silhouette in premium organic weave.",
    description: "Expertly tailored in our atelier from certified sustainable fibers. Features hand-finished lapels, breathable cupro lining, and a flattering contemporary drape.",
    composition: "90% Certified Wool, 10% Cashmere",
    fit: "Contemporary tailored silhouette",
    isNew: true,
    isBestSeller: false,
    frontImage: "/images/products/lom-001/front.jpg",
    backImage: "/images/products/lom-001/back.jpg",
    detailImage: "/images/products/lom-001/detail.jpg"
  });

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name || "",
        slug: existingProduct.slug || "",
        sku: existingProduct.sku || "",
        category: existingProduct.category || "Outerwear",
        gender: existingProduct.gender || "Men",
        price: existingProduct.price || 0,
        originalPrice: existingProduct.originalPrice || 0,
        stock: existingProduct.stock || 20,
        sizes: existingProduct.sizes || ["M", "L"],
        color: existingProduct.color || "",
        tagline: existingProduct.tagline || "",
        description: existingProduct.description || "",
        composition: existingProduct.composition || "",
        fit: existingProduct.fit || "",
        isNew: existingProduct.isNew || false,
        isBestSeller: existingProduct.isBestSeller || false,
        frontImage: existingProduct.gallery?.front || existingProduct.coverImage || "",
        backImage: existingProduct.gallery?.back || "",
        detailImage: existingProduct.gallery?.detail || ""
      });
    }
  }, [existingProduct]);

  const handleNameChange = (val) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: isEditing ? prev.slug : slug
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => {
      const exists = prev.sizes.includes(size);
      if (exists) {
        return { ...prev, sizes: prev.sizes.filter((s) => s !== size) };
      } else {
        return { ...prev, sizes: [...prev.sizes, size] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productPayload = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      sku: formData.sku || `LOM-${Math.floor(1000 + Math.random() * 9000)}`,
      category: formData.category,
      gender: formData.gender,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      stock: Number(formData.stock),
      sizes: formData.sizes,
      color: formData.color,
      availableColors: [formData.color],
      tagline: formData.tagline,
      description: formData.description,
      composition: formData.composition,
      fit: formData.fit,
      isNew: formData.isNew,
      isBestSeller: formData.isBestSeller,
      coverImage: formData.frontImage,
      gallery: {
        front: formData.frontImage,
        back: formData.backImage || formData.frontImage,
        detail: formData.detailImage || formData.frontImage
      }
    };

    if (isEditing) {
      updateProduct(id, productPayload);
    } else {
      addProduct(productPayload);
    }

    navigate("/admin/products");
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E8E5DF]">
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/products"
            className="p-2 border border-[#E8E5DF] bg-white hover:bg-[#FAF8F5] text-[#444444] transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B67] font-bold">
              {isEditing ? "EDIT GARMENT" : "NEW CATALOG ENTRY"}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold mt-0.5">
              {isEditing ? `Edit: ${formData.name}` : "Add New Garment to Catalog"}
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Save size={14} />
          <span>{isEditing ? "Save Changes" : "Publish Garment"}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Basic Information */}
          <div className="bg-white p-6 border border-[#E8E5DF] space-y-4">
            <h2 className="font-serif text-base text-[#111111] font-semibold pb-3 border-b border-[#F0EDE6]">
              Garment Specification
            </h2>

            <div>
              <label className="text-xs text-[#555555] block mb-1">Product Title *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Structured Double-Breasted Wool Coat"
                className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white focus:outline-hidden focus:border-[#111111]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#555555] block mb-1">URL Slug</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-[#FAF8F5] font-mono text-[#555555]"
                />
              </div>

              <div>
                <label className="text-xs text-[#555555] block mb-1">SKU Number</label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="e.g. LOM-W-CT-001"
                  className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white font-mono uppercase"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#555555] block mb-1">Editorial Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Pure double-faced cashmere tailored for timeless elegance."
                className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white"
              />
            </div>

            <div>
              <label className="text-xs text-[#555555] block mb-1">Long Description &amp; Sartorial Notes</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white focus:outline-hidden focus:border-[#111111]"
              />
            </div>
          </div>

          {/* Section 2: Pricing & Inventory */}
          <div className="bg-white p-6 border border-[#E8E5DF] space-y-4">
            <h2 className="font-serif text-base text-[#111111] font-semibold pb-3 border-b border-[#F0EDE6]">
              Pricing &amp; Inventory
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-[#555555] block mb-1">Selling Price (INR ₹) *</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white font-semibold"
                />
              </div>

              <div>
                <label className="text-xs text-[#555555] block mb-1">Original Price (INR ₹)</label>
                <input
                  type="number"
                  min={0}
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white"
                />
              </div>

              <div>
                <label className="text-xs text-[#555555] block mb-1">Available Stock Units *</label>
                <input
                  type="number"
                  required
                  min={0}
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Attributes & Craft */}
          <div className="bg-white p-6 border border-[#E8E5DF] space-y-4">
            <h2 className="font-serif text-base text-[#111111] font-semibold pb-3 border-b border-[#F0EDE6]">
              Fabric Composition &amp; Craftsmanship
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#555555] block mb-1">Material Composition</label>
                <input
                  type="text"
                  value={formData.composition}
                  onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                  placeholder="e.g. 100% Organic Pima Cotton"
                  className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white"
                />
              </div>

              <div>
                <label className="text-xs text-[#555555] block mb-1">Fit Type</label>
                <input
                  type="text"
                  value={formData.fit}
                  onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                  placeholder="e.g. Relaxed architectural drape"
                  className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#555555] block mb-2">Available Atelier Sizes</label>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => {
                  const active = formData.sizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => handleSizeToggle(sz)}
                      className={`px-3 py-1.5 border text-xs font-medium transition-colors ${
                        active
                          ? "border-[#111111] bg-[#111111] text-white"
                          : "border-[#E8E5DF] bg-white text-[#555555] hover:border-[#111111]"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Form: Imagery & Classifications */}
        <div className="lg:col-span-4 space-y-6">
          {/* Classification Card */}
          <div className="bg-white p-6 border border-[#E8E5DF] space-y-4">
            <h2 className="font-serif text-base text-[#111111] font-semibold pb-2 border-b border-[#F0EDE6]">
              Organization
            </h2>

            <div>
              <label className="text-xs text-[#555555] block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-[#555555] block mb-1">Gender Collection</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-[#555555] block mb-1">Color Shade Name</label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="e.g. Camel Sand / Midnight Black"
                className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white"
              />
            </div>

            <div className="pt-2 border-t border-[#F0EDE6] space-y-2">
              <label className="flex items-center space-x-2 text-xs text-[#444444] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="accent-[#111111] w-4 h-4"
                />
                <span>Mark as "New Arrival"</span>
              </label>

              <label className="flex items-center space-x-2 text-xs text-[#444444] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isBestSeller}
                  onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                  className="accent-[#111111] w-4 h-4"
                />
                <span>Mark as "Best Seller"</span>
              </label>
            </div>
          </div>

          {/* Photography URLs & Previews */}
          <div className="bg-white p-6 border border-[#E8E5DF] space-y-4">
            <h2 className="font-serif text-base text-[#111111] font-semibold pb-2 border-b border-[#F0EDE6]">
              Studio Photography
            </h2>

            <div>
              <label className="text-xs text-[#555555] block mb-1">Front Editorial View URL</label>
              <input
                type="text"
                value={formData.frontImage}
                onChange={(e) => setFormData({ ...formData, frontImage: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white font-mono text-[11px]"
              />
              {formData.frontImage && (
                <div className="mt-2 w-20 h-28 border border-[#E8E5DF] overflow-hidden bg-[#FAF8F5]">
                  <img src={formData.frontImage} alt="Front Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="text-xs text-[#555555] block mb-1">Back Silhouette View URL</label>
              <input
                type="text"
                value={formData.backImage}
                onChange={(e) => setFormData({ ...formData, backImage: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="text-xs text-[#555555] block mb-1">Fabric Detail Macro URL</label>
              <input
                type="text"
                value={formData.detailImage}
                onChange={(e) => setFormData({ ...formData, detailImage: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white font-mono text-[11px]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
