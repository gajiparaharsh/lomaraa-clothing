import React, { useState } from "react";
import { ChevronDown, ChevronUp, RotateCcw, Check } from "lucide-react";

export const FilterSidebar = ({
  filters,
  setFilters,
  clearAllFilters,
  activeFilterCount,
  categoryOptions,
  genderOptions,
  sizeOptions,
  colorOptions,
  priceOptions
}) => {
  // Collapsible section states
  const [openSections, setOpenSections] = useState({
    category: true,
    gender: true,
    price: true,
    size: true,
    color: true,
    availability: true,
    discount: true
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (cat) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === cat ? "All" : cat
    }));
  };

  const handleGenderChange = (gen) => {
    setFilters((prev) => ({
      ...prev,
      gender: prev.gender === gen ? "All" : gen
    }));
  };

  const handlePriceChange = (priceKey) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: prev.priceRange === priceKey ? "all" : priceKey
    }));
  };

  const handleSizeToggle = (size) => {
    setFilters((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size]
      };
    });
  };

  const handleColorToggle = (color) => {
    setFilters((prev) => {
      const exists = prev.colors.includes(color);
      return {
        ...prev,
        colors: exists ? prev.colors.filter((c) => c !== color) : [...prev.colors, color]
      };
    });
  };

  return (
    <aside className="w-full space-y-6 text-xs text-[#222222]">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#111111]">
        <div className="flex items-center space-x-2">
          <span className="font-serif text-sm tracking-[0.2em] uppercase font-bold text-[#111111]">
            FILTERS
          </span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#111111] text-[#F5F1E8] text-[10px] font-semibold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="flex items-center space-x-1 text-[11px] uppercase tracking-wider text-[#717171] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <RotateCcw size={11} />
            <span>RESET</span>
          </button>
        )}
      </div>

      {/* 1. Category Section */}
      <div className="border-b border-[#E8E5DF] pb-5">
        <button
          onClick={() => toggleSection("category")}
          className="w-full flex items-center justify-between text-left font-medium tracking-[0.15em] uppercase text-[#111111] py-1 cursor-pointer"
        >
          <span>Category</span>
          <span className="text-[#888888]">
            {openSections.category ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </span>
        </button>

        {openSections.category && (
          <div className="mt-3 space-y-1.5 animate-fade-in">
            {categoryOptions.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleCategoryChange(cat.label)}
                className={`w-full flex items-center justify-between py-1 text-left tracking-wider transition-colors cursor-pointer ${
                  filters.category === cat.label
                    ? "font-semibold text-[#111111]"
                    : "text-[#666666] hover:text-[#111111]"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      filters.category === cat.label ? "bg-[#B89B67]" : "bg-transparent"
                    }`}
                  />
                  <span>{cat.label}</span>
                </div>
                <span className="text-[10px] text-[#999999]">({cat.count})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Gender Section */}
      <div className="border-b border-[#E8E5DF] pb-5">
        <button
          onClick={() => toggleSection("gender")}
          className="w-full flex items-center justify-between text-left font-medium tracking-[0.15em] uppercase text-[#111111] py-1 cursor-pointer"
        >
          <span>Gender</span>
          <span className="text-[#888888]">
            {openSections.gender ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </span>
        </button>

        {openSections.gender && (
          <div className="mt-3 flex flex-wrap gap-1.5 animate-fade-in">
            {genderOptions.map((gen) => (
              <button
                key={gen.label}
                onClick={() => handleGenderChange(gen.label)}
                className={`px-3 py-1.5 text-[11px] tracking-wider uppercase border transition-all cursor-pointer ${
                  filters.gender === gen.label
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-[#666666] border-[#E8E5DF] hover:border-[#111111] hover:text-[#111111]"
                }`}
              >
                {gen.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. Price Range Section */}
      <div className="border-b border-[#E8E5DF] pb-5">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex items-center justify-between text-left font-medium tracking-[0.15em] uppercase text-[#111111] py-1 cursor-pointer"
        >
          <span>Price Range</span>
          <span className="text-[#888888]">
            {openSections.price ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </span>
        </button>

        {openSections.price && (
          <div className="mt-3 space-y-2 animate-fade-in">
            {priceOptions.map((opt) => (
              <label
                key={opt.key}
                className="flex items-center space-x-2.5 text-left text-[#666666] hover:text-[#111111] cursor-pointer tracking-wider"
              >
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange === opt.key}
                  onChange={() => handlePriceChange(opt.key)}
                  className="accent-[#111111] cursor-pointer"
                />
                <span className={filters.priceRange === opt.key ? "font-semibold text-[#111111]" : ""}>
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 4. Size Section */}
      <div className="border-b border-[#E8E5DF] pb-5">
        <button
          onClick={() => toggleSection("size")}
          className="w-full flex items-center justify-between text-left font-medium tracking-[0.15em] uppercase text-[#111111] py-1 cursor-pointer"
        >
          <span>Size</span>
          <span className="text-[#888888]">
            {openSections.size ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </span>
        </button>

        {openSections.size && (
          <div className="mt-3 grid grid-cols-4 gap-1.5 animate-fade-in">
            {sizeOptions.map((size) => {
              const isSelected = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`py-1.5 text-center text-[10px] sm:text-[11px] font-medium tracking-wider uppercase border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-white text-[#555555] border-[#E8E5DF] hover:border-[#111111] hover:text-[#111111]"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Color Section */}
      <div className="border-b border-[#E8E5DF] pb-5">
        <button
          onClick={() => toggleSection("color")}
          className="w-full flex items-center justify-between text-left font-medium tracking-[0.15em] uppercase text-[#111111] py-1 cursor-pointer"
        >
          <span>Color</span>
          <span className="text-[#888888]">
            {openSections.color ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </span>
        </button>

        {openSections.color && (
          <div className="mt-3 space-y-2 animate-fade-in">
            {colorOptions.map((c) => {
              const isSelected = filters.colors.includes(c.name);
              return (
                <button
                  key={c.name}
                  onClick={() => handleColorToggle(c.name)}
                  className={`w-full flex items-center justify-between py-1 text-left transition-colors cursor-pointer ${
                    isSelected ? "font-semibold text-[#111111]" : "text-[#666666] hover:text-[#111111]"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20 flex items-center justify-center"
                      style={{ backgroundColor: c.hex }}
                    >
                      {isSelected && (
                        <Check size={9} className={c.hex === "#FFFFFF" ? "text-black" : "text-white"} />
                      )}
                    </span>
                    <span className="tracking-wider">{c.name}</span>
                  </div>
                  <span className="text-[10px] text-[#999999]">({c.count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Availability & Stock */}
      <div className="border-b border-[#E8E5DF] pb-5">
        <button
          onClick={() => toggleSection("availability")}
          className="w-full flex items-center justify-between text-left font-medium tracking-[0.15em] uppercase text-[#111111] py-1 cursor-pointer"
        >
          <span>Availability</span>
          <span className="text-[#888888]">
            {openSections.availability ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </span>
        </button>

        {openSections.availability && (
          <div className="mt-3 space-y-2 animate-fade-in">
            <label className="flex items-center space-x-2.5 text-left text-[#666666] hover:text-[#111111] cursor-pointer tracking-wider">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
                }
                className="accent-[#111111] cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        )}
      </div>

      {/* 7. Discount / Special Value */}
      <div className="pb-2">
        <button
          onClick={() => toggleSection("discount")}
          className="w-full flex items-center justify-between text-left font-medium tracking-[0.15em] uppercase text-[#111111] py-1 cursor-pointer"
        >
          <span>Discount &amp; Offers</span>
          <span className="text-[#888888]">
            {openSections.discount ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </span>
        </button>

        {openSections.discount && (
          <div className="mt-3 space-y-2 animate-fade-in">
            <label className="flex items-center space-x-2.5 text-left text-[#666666] hover:text-[#111111] cursor-pointer tracking-wider">
              <input
                type="checkbox"
                checked={filters.discountOnly}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, discountOnly: e.target.checked }))
                }
                className="accent-[#111111] cursor-pointer"
              />
              <span className="flex items-center gap-1.5">
                <span>On Sale / Special Value</span>
                <span className="text-[9px] px-1 bg-[#B89B67]/20 text-[#B89B67] font-semibold uppercase">
                  Sale
                </span>
              </span>
            </label>
          </div>
        )}
      </div>
    </aside>
  );
};

export default FilterSidebar;
