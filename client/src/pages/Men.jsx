import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SlidersHorizontal, ChevronDown, Sparkles } from "lucide-react";
import ProductCard from "../components/products/ProductCard";
import FilterSidebar from "../components/shop/FilterSidebar";
import MobileFilterDrawer from "../components/shop/MobileFilterDrawer";
import { useShop } from "../context/ShopContext";

export const Men = () => {
  const { products } = useShop();

  // Filter only Men's or Unisex products
  const menProducts = useMemo(() => {
    return products.filter((p) => p.gender === "Men" || p.gender === "Unisex");
  }, [products]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [filters, setFilters] = useState({
    category: "All",
    gender: "Men",
    priceRange: "all",
    sizes: [],
    colors: [],
    inStockOnly: false,
    discountOnly: false
  });

  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const menCategories = ["All", "Tailoring", "Shirts", "Outerwear", "Trousers", "Jeans", "T-Shirts", "Knitwear"];

  const filteredProducts = useMemo(() => {
    let result = [...menProducts];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (filters.category !== "All") {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.priceRange !== "all") {
      if (filters.priceRange === "under-5000") result = result.filter((p) => p.price < 5000);
      else if (filters.priceRange === "5000-10000") result = result.filter((p) => p.price >= 5000 && p.price <= 10000);
      else if (filters.priceRange === "10000-20000") result = result.filter((p) => p.price > 10000 && p.price <= 20000);
      else if (filters.priceRange === "above-20000") result = result.filter((p) => p.price > 20000);
    }

    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes && p.sizes.some((s) => filters.sizes.includes(s)));
    }

    if (filters.colors.length > 0) {
      result = result.filter((p) => {
        if (p.availableColors) return p.availableColors.some((c) => filters.colors.includes(c.name));
        return filters.colors.includes(p.color);
      });
    }

    if (filters.inStockOnly) result = result.filter((p) => p.inStock);
    if (filters.discountOnly) result = result.filter((p) => p.originalPrice && p.originalPrice > p.price);

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "newest": result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)); break;
      case "best-selling": result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break;
      default: result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
    }

    return result;
  }, [menProducts, activeCategory, filters, sortBy]);

  const clearAllFilters = () => {
    setActiveCategory("All");
    setFilters({
      category: "All",
      gender: "Men",
      priceRange: "all",
      sizes: [],
      colors: [],
      inStockOnly: false,
      discountOnly: false
    });
  };

  const activeFilterCount =
    (activeCategory !== "All" ? 1 : 0) +
    (filters.category !== "All" ? 1 : 0) +
    (filters.priceRange !== "all" ? 1 : 0) +
    filters.sizes.length +
    filters.colors.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.discountOnly ? 1 : 0);

  const priceOptions = [
    { key: "all", label: "All Prices" },
    { key: "under-5000", label: "Under ₹5,000" },
    { key: "5000-10000", label: "₹5,000 – ₹10,000" },
    { key: "10000-20000", label: "₹10,000 – ₹20,000" },
    { key: "above-20000", label: "Above ₹20,000" }
  ];

  const sizeOptions = ["S", "M", "L", "XL", "30", "32", "34", "38R", "40R", "42R", "44R"];

  const colorOptions = [
    { name: "Charcoal Obsidian", hex: "#222222", count: 4 },
    { name: "Pebble Cream", hex: "#DDD7CD", count: 3 },
    { name: "Raw Indigo", hex: "#1B2A47", count: 3 },
    { name: "Optic White", hex: "#FFFFFF", count: 2 },
    { name: "Natural Flax", hex: "#E7DFC9", count: 2 }
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3 text-xs tracking-wider uppercase text-[#717171]">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-[#111111]">Home</Link></li>
          <li className="text-[#CCCCCC]">/</li>
          <li className="text-[#111111] font-semibold">Men</li>
        </ol>
      </nav>

      {/* Editorial Men's Hero Banner */}
      <section className="relative w-full bg-[#111111] text-white overflow-hidden mb-10">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/images/products/lom-002/front.jpg"
            alt="Lomaraa Men's Campaign"
            className="w-full h-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-xl space-y-4">
            <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#B89B67] font-semibold">
              <Sparkles size={13} />
              <span>THE MEN&rsquo;S WARDROBE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white font-normal">
              MEN&rsquo;S COLLECTION
            </h1>
            <p className="text-sm sm:text-base text-[#DDD7CD] font-light leading-relaxed tracking-wide">
              Architectural tailoring, breathable French linen, and heavy Japanese selvedge. Engineered with pure noble materials for modern daily living.
            </p>
          </div>
        </div>
      </section>

      {/* Category Pills Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {menCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-[#FAF8F5] text-[#555555] border-[#E8E5DF] hover:border-[#111111] hover:text-[#111111]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid & Sidebar Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Toolbar */}
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-[#E8E5DF]">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="hidden lg:flex items-center space-x-2 text-xs uppercase tracking-widest text-[#111111] hover:text-[#B89B67] cursor-pointer"
            >
              <SlidersHorizontal size={14} />
              <span>{showFilters ? "HIDE FILTERS" : "SHOW FILTERS"}</span>
            </button>

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-3 py-1.5 border border-[#111111] text-xs uppercase tracking-wider"
            >
              <SlidersHorizontal size={13} />
              <span>FILTERS {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}</span>
            </button>

            <span className="text-xs text-[#717171]">
              Showing <strong className="text-[#111111]">{filteredProducts.length}</strong> pieces
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center space-x-2 px-3.5 py-1.5 border border-[#E8E5DF] text-xs uppercase tracking-wider text-[#111111] font-medium"
            >
              <span>SORT:</span>
              <span className="font-semibold">{sortBy.toUpperCase()}</span>
              <ChevronDown size={14} />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-[#E8E5DF] shadow-lg z-20 py-1 text-xs">
                {["featured", "newest", "price-asc", "price-desc", "best-selling"].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSortBy(s);
                      setIsSortOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#F5F1E8] uppercase tracking-wider"
                  >
                    {s.replace("-", " ")}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex gap-8 items-start">
          {showFilters && (
            <div className="hidden lg:block w-64 flex-shrink-0 sticky top-28 self-start">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                clearAllFilters={clearAllFilters}
                activeFilterCount={activeFilterCount}
                categoryOptions={menCategories.map((c) => ({ label: c, count: menProducts.filter((p) => c === "All" || p.category === c).length }))}
                genderOptions={[{ label: "Men" }, { label: "Unisex" }]}
                sizeOptions={sizeOptions}
                colorOptions={colorOptions}
                priceOptions={priceOptions}
              />
            </div>
          )}

          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-[#FAF8F5] border border-[#E8E5DF] p-8">
                <p className="font-serif text-xl text-[#111111] mb-2">No Men&rsquo;s Pieces Match Current Filters</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-widest font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 ${
                  showFilters
                    ? "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3"
                    : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                } gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10`}
              >
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        clearAllFilters={clearAllFilters}
        activeFilterCount={activeFilterCount}
        categoryOptions={menCategories.map((c) => ({ label: c, count: menProducts.filter((p) => c === "All" || p.category === c).length }))}
        genderOptions={[{ label: "Men" }, { label: "Unisex" }]}
        sizeOptions={sizeOptions}
        colorOptions={colorOptions}
        priceOptions={priceOptions}
        totalResults={filteredProducts.length}
      />
    </div>
  );
};

export default Men;

