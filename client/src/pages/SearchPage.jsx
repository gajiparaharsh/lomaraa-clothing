import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Clock, ArrowRight } from "lucide-react";
import ProductCard from "../components/products/ProductCard";
import { useShop } from "../context/ShopContext";

export const SearchPage = () => {
  const { products } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("lomaraa_recent_searches");
    return saved ? JSON.parse(saved) : ["Cashmere", "Trench Coat", "Silk Dress", "Linen Shirt"];
  });

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const trendingSearches = [
    "Cashmere Trench",
    "Wool-Blend Blazer",
    "Mulberry Silk Gown",
    "Merino Turtleneck",
    "Linen Shirt",
    "Selvedge Jeans",
    "Leather Bag"
  ];

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) return;

    setSearchParams({ q: searchTerm.trim() });

    // Update recent searches
    setRecentSearches((prev) => {
      const updated = [searchTerm.trim(), ...prev.filter((s) => s.toLowerCase() !== searchTerm.trim().toLowerCase())].slice(0, 6);
      localStorage.setItem("lomaraa_recent_searches", JSON.stringify(updated));
      return updated;
    });
  };

  const handleTagClick = (tag) => {
    setSearchTerm(tag);
    setSearchParams({ q: tag });
  };

  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem("lomaraa_recent_searches");
  };

  // Filter products based on search term
  const searchResults = useMemo(() => {
    if (!queryParam.trim()) return [];
    const q = queryParam.toLowerCase().trim();
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subCategory.toLowerCase().includes(q) ||
      p.gender.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  }, [products, queryParam]);

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-4 text-xs tracking-wider uppercase text-[#717171]">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-[#111111]">Home</Link></li>
          <li className="text-[#CCCCCC]">/</li>
          <li className="text-[#111111] font-semibold">Search</li>
        </ol>
      </nav>

      {/* Search Header Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-center">
        <span className="text-[11px] tracking-[0.35em] uppercase text-[#B89B67] font-semibold block mb-2">
          CURATED CATALOG EXPLORATION
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111111] mb-6">
          Search The Lomaraa Collection
        </h1>

        {/* Search Bar Input */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto mb-8">
          <div className="flex items-center border-b-2 border-[#111111] pb-3 bg-white">
            <Search size={22} className="text-[#888888] mr-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by silhouette, fabric, SKU, or category..."
              className="w-full text-base sm:text-lg text-[#111111] placeholder-[#888888] font-light tracking-wide focus:outline-hidden"
              autoFocus
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="text-xs text-[#888888] hover:text-[#111111] uppercase tracking-wider px-2 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-semibold ml-2 hover:bg-[#B89B67] transition-colors cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        {/* Trending & Recent Searches */}
        <div className="max-w-2xl mx-auto space-y-5 text-left text-xs">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div>
              <div className="flex justify-between items-center text-[#888888] uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                  <Clock size={12} />
                  Recent Searches
                </span>
                <button onClick={clearHistory} className="hover:text-[#111111] text-[10px] cursor-pointer">
                  Clear History
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleTagClick(s)}
                    className="px-3 py-1 bg-[#FAF8F5] border border-[#E8E5DF] text-[#444444] hover:border-[#111111] hover:text-[#111111] tracking-wider transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div>
            <span className="block text-[#888888] uppercase tracking-wider text-[11px] font-semibold mb-2">
              Trending In Atelier
            </span>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((t) => (
                <button
                  key={t}
                  onClick={() => handleTagClick(t)}
                  className="px-3 py-1 bg-[#F5F1E8] text-[#222222] hover:bg-[#111111] hover:text-white tracking-wider transition-all border border-transparent hover:border-[#111111] cursor-pointer"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {queryParam ? (
          <div>
            {/* Results Counter Header */}
            <div className="flex justify-between items-center pb-4 mb-8 border-b border-[#E8E5DF]">
              <span className="text-xs uppercase tracking-[0.2em] text-[#666666]">
                Results for &ldquo;<strong className="text-[#111111]">{queryParam}</strong>&rdquo;
              </span>
              <span className="text-xs text-[#888888]">
                {searchResults.length} {searchResults.length === 1 ? "piece" : "pieces"} found
              </span>
            </div>

            {searchResults.length === 0 ? (
              <div className="py-20 text-center bg-[#FAF8F5] border border-[#E8E5DF] p-8 max-w-xl mx-auto space-y-4">
                <Search size={28} className="text-[#B89B67] mx-auto" />
                <h3 className="font-serif text-2xl text-[#111111]">No Matching Silhouettes</h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  We could not find any garments matching &ldquo;{queryParam}&rdquo;. Try checking the spelling or browse our popular categories below.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <Link
                    to="/shop"
                    className="px-6 py-3 bg-[#111111] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B89B67] transition-colors"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {searchResults.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Recommended Showcase when no query */
          <div>
            <div className="flex justify-between items-center pb-4 mb-8 border-b border-[#E8E5DF]">
              <span className="text-xs uppercase tracking-[0.2em] text-[#111111] font-semibold">
                CURATED SELECTIONS TO DISCOVER
              </span>
              <Link to="/shop" className="text-xs uppercase tracking-wider text-[#B89B67] hover:underline flex items-center gap-1">
                <span>View Full Catalog</span>
                <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.slice(0, 8).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
