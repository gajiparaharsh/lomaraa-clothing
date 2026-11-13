import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Search,
  Sparkles
} from "lucide-react";
import ProductCard from "../components/products/ProductCard";
import FilterSidebar from "../components/shop/FilterSidebar";
import MobileFilterDrawer from "../components/shop/MobileFilterDrawer";
import { products } from "../data/products";

export const Shop = () => {
  const [searchParams] = useSearchParams();

  // URL Query Sync
  const urlCategory = searchParams.get("category");
  const urlGender = searchParams.get("gender");
  const urlFilter = searchParams.get("filter");

  // Filters State
  const [filters, setFilters] = useState({
    category: urlCategory || "All",
    gender: urlGender || "All",
    priceRange: "all",
    sizes: [],
    colors: [],
    inStockOnly: false,
    discountOnly: false,
    newArrivalsOnly: urlFilter === "new"
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  // Sync state if URL search params change
  useEffect(() => {
    if (urlCategory || urlGender || urlFilter) {
      setFilters((prev) => ({
        ...prev,
        category: urlCategory || prev.category,
        gender: urlGender || prev.gender,
        newArrivalsOnly: urlFilter === "new" ? true : prev.newArrivalsOnly
      }));
    }
  }, [urlCategory, urlGender, urlFilter]);

  // Derived filter options with counts
  const categoryOptions = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    const uniqueCategories = Object.keys(counts).sort();
    return [
      { label: "All", count: products.length },
      ...uniqueCategories.map((c) => ({ label: c, count: counts[c] }))
    ];
  }, []);

  const genderOptions = [
    { label: "All" },
    { label: "Women" },
    { label: "Men" },
    { label: "Unisex" }
  ];

  const priceOptions = [
    { key: "all", label: "All Prices" },
    { key: "under-5000", label: "Under ₹5,000" },
    { key: "5000-10000", label: "₹5,000 – ₹10,000" },
    { key: "10000-20000", label: "₹10,000 – ₹20,000" },
    { key: "above-20000", label: "Above ₹20,000" }
  ];

  const sizeOptions = ["XS", "S", "M", "L", "XL", "30", "32", "34", "36", "38R", "40R", "42R", "44R"];

  const colorOptions = useMemo(() => {
    const colorMap = new Map();
    products.forEach((p) => {
      if (p.availableColors) {
        p.availableColors.forEach((c) => {
          if (!colorMap.has(c.name)) {
            colorMap.set(c.name, { name: c.name, hex: c.hex, count: 1 });
          } else {
            colorMap.get(c.name).count += 1;
          }
        });
      } else if (p.color) {
        if (!colorMap.has(p.color)) {
          colorMap.set(p.color, { name: p.color, hex: p.colorHex || "#111111", count: 1 });
        } else {
          colorMap.get(p.color).count += 1;
        }
      }
    });
    return Array.from(colorMap.values());
  }, []);

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          (p.tagline && p.tagline.toLowerCase().includes(q))
      );
    }

    // 2. Category
    if (filters.category && filters.category !== "All") {
      result = result.filter((p) => p.category === filters.category);
    }

    // 3. Gender
    if (filters.gender && filters.gender !== "All") {
      result = result.filter(
        (p) => p.gender === filters.gender || p.gender === "Unisex"
      );
    }

    // 4. Price Range
    if (filters.priceRange && filters.priceRange !== "all") {
      if (filters.priceRange === "under-5000") {
        result = result.filter((p) => p.price < 5000);
      } else if (filters.priceRange === "5000-10000") {
        result = result.filter((p) => p.price >= 5000 && p.price <= 10000);
      } else if (filters.priceRange === "10000-20000") {
        result = result.filter((p) => p.price > 10000 && p.price <= 20000);
      } else if (filters.priceRange === "above-20000") {
        result = result.filter((p) => p.price > 20000);
      }
    }

    // 5. Sizes
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes && p.sizes.some((s) => filters.sizes.includes(s))
      );
    }

    // 6. Colors
    if (filters.colors.length > 0) {
      result = result.filter((p) => {
        if (p.availableColors) {
          return p.availableColors.some((c) => filters.colors.includes(c.name));
        }
        return filters.colors.includes(p.color);
      });
    }

    // 7. In Stock
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // 8. Discounted
    if (filters.discountOnly) {
      result = result.filter((p) => p.originalPrice && p.originalPrice > p.price);
    }

    // 9. New Arrivals
    if (filters.newArrivalsOnly) {
      result = result.filter((p) => p.isNew);
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case "best-selling":
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case "featured":
      default:
        // Featured default: prioritize signature items & new arrivals
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return result;
  }, [filters, searchQuery, sortBy]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== "All") count += 1;
    if (filters.gender !== "All") count += 1;
    if (filters.priceRange !== "all") count += 1;
    count += filters.sizes.length;
    count += filters.colors.length;
    if (filters.inStockOnly) count += 1;
    if (filters.discountOnly) count += 1;
    if (filters.newArrivalsOnly) count += 1;
    return count;
  }, [filters]);

  const clearAllFilters = () => {
    setFilters({
      category: "All",
      gender: "All",
      priceRange: "all",
      sizes: [],
      colors: [],
      inStockOnly: false,
      discountOnly: false,
      newArrivalsOnly: false
    });
    setSearchQuery("");
  };

  const removeFilter = (type, value = null) => {
    if (type === "category") setFilters((p) => ({ ...p, category: "All" }));
    if (type === "gender") setFilters((p) => ({ ...p, gender: "All" }));
    if (type === "priceRange") setFilters((p) => ({ ...p, priceRange: "all" }));
    if (type === "size")
      setFilters((p) => ({ ...p, sizes: p.sizes.filter((s) => s !== value) }));
    if (type === "color")
      setFilters((p) => ({ ...p, colors: p.colors.filter((c) => c !== value) }));
    if (type === "inStockOnly") setFilters((p) => ({ ...p, inStockOnly: false }));
    if (type === "discountOnly") setFilters((p) => ({ ...p, discountOnly: false }));
    if (type === "newArrivalsOnly") setFilters((p) => ({ ...p, newArrivalsOnly: false }));
  };

  const sortOptions = [
    { key: "featured", label: "Featured" },
    { key: "newest", label: "Newest" },
    { key: "price-asc", label: "Price: Low to High" },
    { key: "price-desc", label: "Price: High to Low" },
    { key: "best-selling", label: "Best Selling" }
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      {/* 1. Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3 text-xs tracking-wider uppercase text-[#717171]"
      >
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:text-[#111111] transition-colors">
              Home
            </Link>
          </li>
          <li className="text-[#CCCCCC]">/</li>
          <li className="text-[#111111] font-semibold">Shop</li>
          {filters.category !== "All" && (
            <>
              <li className="text-[#CCCCCC]">/</li>
              <li className="text-[#B89B67]">{filters.category}</li>
            </>
          )}
        </ol>
      </nav>

      {/* 2. Editorial Fashion Banner & Page Header */}
      <section className="relative w-full bg-[#111111] text-white overflow-hidden mb-8 sm:mb-12">
        <div className="absolute inset-0 z-0 opacity-45">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=2200&q=85"
            alt="Lomaraa Shop All Collection"
            className="w-full h-full object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#B89B67] font-semibold">
              <Sparkles size={13} />
              <span>THE COMPLETE REPERTOIRE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-white font-normal">
              SHOP ALL
            </h1>

            <p className="text-sm sm:text-base text-[#E5E1D8] font-light tracking-wide leading-relaxed">
              Discover the Lomaraa collection. An uncompromising edit of architectural silhouettes, noble fibres, and enduring everyday essentials.
            </p>

            <div className="pt-2 flex items-center space-x-4 text-xs tracking-widest uppercase text-[#B89B67] font-medium">
              <span>{products.length} CURATED PIECES</span>
              <span>•</span>
              <span>EST. 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Toolbar: Search, Filters Toggle, Active Filters, Sorting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E8E5DF]">
          {/* Left: Desktop Sidebar Toggle & Results Count */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
              className="hidden lg:flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#111111] hover:text-[#B89B67] transition-colors py-2 cursor-pointer"
            >
              <SlidersHorizontal size={14} />
              <span>{desktopSidebarOpen ? "HIDE FILTERS" : "SHOW FILTERS"}</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#111111] text-white text-[9px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-3.5 py-2 border border-[#111111] text-xs uppercase tracking-[0.15em] font-medium text-[#111111] cursor-pointer"
            >
              <SlidersHorizontal size={14} />
              <span>FILTERS {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}</span>
            </button>

            <span className="text-xs text-[#717171] tracking-wider font-light">
              Showing <strong className="text-[#111111] font-semibold">{filteredAndSortedProducts.length}</strong>{" "}
              {filteredAndSortedProducts.length === 1 ? "piece" : "pieces"}
            </span>
          </div>

          {/* Right: Search & Sorting */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search
                size={14}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#888888]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection..."
                className="w-full pl-9 pr-7 py-2 bg-[#FAF8F5] border border-[#E8E5DF] text-xs text-[#111111] placeholder-[#888888] focus:outline-hidden focus:border-[#111111] tracking-wide"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-[#888888] hover:text-[#111111] text-xs"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="w-full sm:w-auto flex items-center justify-between sm:justify-start space-x-2 px-4 py-2 border border-[#E8E5DF] hover:border-[#111111] bg-white text-xs uppercase tracking-[0.15em] text-[#111111] font-medium transition-colors cursor-pointer"
                aria-haspopup="listbox"
                aria-expanded={isSortDropdownOpen}
              >
                <span className="text-[#717171]">Sort:</span>
                <span className="font-semibold">
                  {sortOptions.find((o) => o.key === sortBy)?.label}
                </span>
                <ChevronDown size={14} />
              </button>

              {isSortDropdownOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-white border border-[#E8E5DF] shadow-xl z-30 py-1 text-xs tracking-wider animate-fade-in">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        setSortBy(opt.key);
                        setIsSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 transition-colors cursor-pointer ${
                        sortBy === opt.key
                          ? "bg-[#F5F1E8] font-semibold text-[#111111]"
                          : "text-[#555555] hover:bg-[#FAF8F5] hover:text-[#111111]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-3 animate-fade-in">
            <span className="text-[11px] uppercase tracking-widest text-[#888888] font-medium mr-1">
              Active:
            </span>

            {filters.category !== "All" && (
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#F5F1E8] border border-[#E8E5DF] text-xs text-[#111111] tracking-wider">
                <span>Category: {filters.category}</span>
                <button
                  onClick={() => removeFilter("category")}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X size={11} />
                </button>
              </span>
            )}

            {filters.gender !== "All" && (
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#F5F1E8] border border-[#E8E5DF] text-xs text-[#111111] tracking-wider">
                <span>Gender: {filters.gender}</span>
                <button
                  onClick={() => removeFilter("gender")}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X size={11} />
                </button>
              </span>
            )}

            {filters.priceRange !== "all" && (
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#F5F1E8] border border-[#E8E5DF] text-xs text-[#111111] tracking-wider">
                <span>
                  Price: {priceOptions.find((p) => p.key === filters.priceRange)?.label}
                </span>
                <button
                  onClick={() => removeFilter("priceRange")}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X size={11} />
                </button>
              </span>
            )}

            {filters.sizes.map((s) => (
              <span
                key={s}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#F5F1E8] border border-[#E8E5DF] text-xs text-[#111111] tracking-wider"
              >
                <span>Size: {s}</span>
                <button
                  onClick={() => removeFilter("size", s)}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X size={11} />
                </button>
              </span>
            ))}

            {filters.colors.map((c) => (
              <span
                key={c}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#F5F1E8] border border-[#E8E5DF] text-xs text-[#111111] tracking-wider"
              >
                <span>Color: {c}</span>
                <button
                  onClick={() => removeFilter("color", c)}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X size={11} />
                </button>
              </span>
            ))}

            {filters.inStockOnly && (
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#F5F1E8] border border-[#E8E5DF] text-xs text-[#111111] tracking-wider">
                <span>In Stock Only</span>
                <button
                  onClick={() => removeFilter("inStockOnly")}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X size={11} />
                </button>
              </span>
            )}

            {filters.discountOnly && (
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#F5F1E8] border border-[#E8E5DF] text-xs text-[#111111] tracking-wider">
                <span>Sale Items Only</span>
                <button
                  onClick={() => removeFilter("discountOnly")}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X size={11} />
                </button>
              </span>
            )}

            {filters.newArrivalsOnly && (
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#F5F1E8] border border-[#E8E5DF] text-xs text-[#111111] tracking-wider">
                <span>New Arrivals</span>
                <button
                  onClick={() => removeFilter("newArrivalsOnly")}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  <X size={11} />
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs uppercase tracking-wider text-[#B89B67] hover:text-[#111111] underline transition-colors cursor-pointer ml-1"
            >
              Clear All
            </button>
          </div>
        )}
      </section>

      {/* 5. Main Content: Sidebar + Responsive Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          {desktopSidebarOpen && (
            <div className="hidden lg:block w-64 flex-shrink-0 sticky top-28 self-start max-h-[82vh] overflow-y-auto pr-3">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                clearAllFilters={clearAllFilters}
                activeFilterCount={activeFilterCount}
                categoryOptions={categoryOptions}
                genderOptions={genderOptions}
                sizeOptions={sizeOptions}
                colorOptions={colorOptions}
                priceOptions={priceOptions}
              />
            </div>
          )}

          {/* Product Grid Area */}
          <div className="flex-1 w-full">
            {filteredAndSortedProducts.length === 0 ? (
              /* Empty State */
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4 bg-[#FAF8F5] border border-[#E8E5DF] p-8">
                <div className="w-14 h-14 rounded-full bg-[#F5F1E8] flex items-center justify-center text-[#B89B67]">
                  <Search size={24} />
                </div>
                <h3 className="font-serif text-2xl text-[#111111]">No Garments Found</h3>
                <p className="text-xs text-[#666666] max-w-md leading-relaxed">
                  We could not find any pieces matching your current filters. Try refining your selections or resetting to explore the full collection.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-2 px-8 py-3.5 bg-[#111111] hover:bg-[#B89B67] text-white text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Responsive Product Grid: 4 cols on large desktop, 3 on tablet, 2 on mobile */
              <div
                className={`grid grid-cols-2 ${
                  desktopSidebarOpen
                    ? "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3"
                    : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                } gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10`}
              >
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        clearAllFilters={clearAllFilters}
        activeFilterCount={activeFilterCount}
        categoryOptions={categoryOptions}
        genderOptions={genderOptions}
        sizeOptions={sizeOptions}
        colorOptions={colorOptions}
        priceOptions={priceOptions}
        totalResults={filteredAndSortedProducts.length}
      />
    </div>
  );
};

export default Shop;
