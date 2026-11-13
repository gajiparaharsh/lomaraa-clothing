import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RotateCcw, ArrowRight } from "lucide-react";

export const FilterPage = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("All");
  const [gender, setGender] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  const categories = ["All", "Outerwear", "Tailoring", "Dresses", "Shirts", "Trousers", "Jeans", "T-Shirts", "Knitwear", "Accessories"];
  const genders = ["All", "Women", "Men", "Unisex"];
  const sizes = ["XS", "S", "M", "L", "XL", "30", "32", "34", "38R", "40R", "42R"];
  const colors = [
    { name: "Obsidian Black", hex: "#111111" },
    { name: "Optic White", hex: "#FFFFFF" },
    { name: "Camel Sand", hex: "#C2A684" },
    { name: "Raw Indigo", hex: "#1B2A47" },
    { name: "Muted Taupe", hex: "#968B7B" },
    { name: "Natural Flax", hex: "#E7DFC9" },
    { name: "Sky Oxford", hex: "#D4DFEE" }
  ];

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const resetAll = () => {
    setCategory("All");
    setGender("All");
    setPriceRange("all");
    setSelectedSizes([]);
    setSelectedColors([]);
    setInStockOnly(false);
    setDiscountOnly(false);
    setSortBy("featured");
  };

  const handleApply = () => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (gender !== "All") params.set("gender", gender);
    if (sortBy !== "featured") params.set("sort", sortBy);
    navigate(`/shop?${params.toString()}`);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-[#E8E5DF] shadow-md p-6 sm:p-12">
        {/* Header */}
        <div className="flex justify-between items-center pb-6 border-b border-[#111111]">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89B67] font-semibold">
              SPECIFICATION SELECTOR
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#111111]">
              Filter &amp; Sort Collection
            </h1>
          </div>
          <button
            onClick={resetAll}
            className="flex items-center space-x-1.5 text-xs uppercase tracking-wider text-[#717171] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset All</span>
          </button>
        </div>

        {/* Filter Form Body */}
        <div className="py-8 space-y-8 text-xs">
          {/* Gender */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] mb-3">
              1. Gender / Division
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {genders.map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`py-2.5 text-center uppercase tracking-wider border font-medium transition-all ${
                    gender === g
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-[#FAF8F5] text-[#555555] border-[#E8E5DF] hover:border-[#111111]"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] mb-3">
              2. Garment Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 uppercase tracking-wider border font-medium transition-all ${
                    category === c
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-white text-[#555555] border-[#E8E5DF] hover:border-[#111111]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] mb-3">
              3. Price Range (INR)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { key: "all", label: "All Prices" },
                { key: "under-5000", label: "Under ₹5,000" },
                { key: "5000-10000", label: "₹5,000 – ₹10,000" },
                { key: "above-10000", label: "Above ₹10,000" }
              ].map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPriceRange(p.key)}
                  className={`py-2 text-center uppercase tracking-wider border font-medium transition-all ${
                    priceRange === p.key
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-[#FAF8F5] text-[#555555] border-[#E8E5DF] hover:border-[#111111]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] mb-3">
              4. Available Sizes
            </h3>
            <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSizeToggle(s)}
                  className={`py-2 text-center uppercase tracking-wider border font-medium transition-all ${
                    selectedSizes.includes(s)
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-white text-[#555555] border-[#E8E5DF] hover:border-[#111111]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] mb-3">
              5. Atelier Color Palette
            </h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleColorToggle(c.name)}
                  className={`flex items-center space-x-2 px-3 py-1.5 border text-xs tracking-wider transition-all ${
                    selectedColors.includes(c.name)
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-white text-[#444444] border-[#E8E5DF] hover:border-[#111111]"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Availability & Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <label className="flex items-center space-x-3 p-3 border border-[#E8E5DF] bg-[#FAF8F5] cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#111111]"
              />
              <span className="font-medium text-[#111111]">In Stock Ready to Dispatch Only</span>
            </label>

            <label className="flex items-center space-x-3 p-3 border border-[#E8E5DF] bg-[#FAF8F5] cursor-pointer">
              <input
                type="checkbox"
                checked={discountOnly}
                onChange={(e) => setDiscountOnly(e.target.checked)}
                className="accent-[#111111]"
              />
              <span className="font-medium text-[#111111]">Special Value &amp; Seasonal Reductions</span>
            </label>
          </div>
        </div>

        {/* Footer Apply CTA */}
        <div className="pt-6 border-t border-[#E8E5DF] flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link to="/shop" className="text-xs uppercase tracking-wider text-[#717171] hover:underline">
            Cancel &amp; Return to Shop
          </Link>
          <button
            onClick={handleApply}
            className="w-full sm:w-auto px-10 py-4 bg-[#111111] hover:bg-[#B89B67] text-white text-xs tracking-[0.25em] uppercase font-semibold transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>APPLY &amp; VIEW GARMENTS</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
