import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { products, formatINR } from "../../data/products";

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useShop();
  const [searchTerm, setSearchTerm] = useState("");

  if (!isSearchOpen) return null;

  const popularSearches = [
    "Cashmere Trench",
    "Wool-Blend Blazer",
    "Mulberry Silk",
    "Merino Knitwear",
    "Pleated Trousers",
    "Leather Bag"
  ];

  const filteredProducts = searchTerm.trim() === ""
    ? []
    : products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="relative min-h-screen flex items-start justify-center pt-16 sm:pt-24 px-4 pb-12">
        <div className="relative w-full max-w-3xl bg-white shadow-2xl p-6 sm:p-10 border border-[#E8E5DF] z-10 animate-fade-in">
          {/* Close button */}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 p-2 text-[#666666] hover:text-[#111111] transition-colors rounded-full"
            aria-label="Close search"
          >
            <X size={22} />
          </button>

          {/* Title */}
          <div className="text-center mb-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89B67] font-semibold block mb-1">
              DISCOVER LOMARAA
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#111111] tracking-wide">
              Search The Collection
            </h2>
          </div>

          {/* Search Bar Input */}
          <div className="relative border-b-2 border-[#111111] pb-3 mb-6 flex items-center">
            <Search size={22} className="text-[#888888] mr-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by garment, fabric, or collection..."
              autoFocus
              className="w-full text-base sm:text-lg text-[#111111] placeholder-[#999999] focus:outline-hidden font-light tracking-wide bg-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-xs uppercase text-[#888888] hover:text-[#111111] tracking-widest ml-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Popular Searches */}
          <div className="mb-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#717171] block mb-3">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="px-3.5 py-1.5 text-xs bg-[#F5F1E8] text-[#222222] hover:bg-[#111111] hover:text-white transition-all tracking-wider border border-transparent hover:border-[#111111] cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Quick link to Shop All */}
          <div className="pt-2 pb-6 border-b border-[#E8E5DF] flex justify-between items-center text-xs">
            <span className="text-[#888888]">Looking for full collection?</span>
            <Link
              to="/shop"
              onClick={() => setIsSearchOpen(false)}
              className="font-medium text-[#111111] hover:text-[#B89B67] tracking-wider uppercase flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All Products ({products.length})</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Results */}
          {searchTerm.trim() !== "" && (
            <div>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E8E5DF]">
                <span className="text-xs uppercase tracking-[0.2em] text-[#666666]">
                  Results ({filteredProducts.length})
                </span>
                <span className="text-xs text-[#888888]">
                  Searching for &ldquo;{searchTerm}&rdquo;
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-[#717171]">
                  <p className="text-sm">No items found matching &ldquo;{searchTerm}&rdquo;.</p>
                  <p className="text-xs mt-1 text-[#999999]">Try searching for &ldquo;Cashmere&rdquo;, &ldquo;Blazer&rdquo;, or &ldquo;Silk&rdquo;.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-1">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex space-x-3.5 p-2.5 border border-[#E8E5DF] hover:border-[#111111] transition-colors group cursor-pointer bg-white"
                      onClick={() => {
                        addToCart(product);
                        setIsSearchOpen(false);
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-20 object-cover object-top flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <span className="text-[10px] tracking-wider uppercase text-[#B89B67] font-medium block">
                            {product.category}
                          </span>
                          <h4 className="text-xs font-medium text-[#111111] group-hover:text-[#B89B67] transition-colors line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-xs font-semibold text-[#111111] mt-1">
                            {formatINR(product.price)}
                          </p>
                        </div>
                        <span className="text-[10px] tracking-widest uppercase text-[#888888] group-hover:text-[#111111] flex items-center gap-1">
                          Add to Bag <ArrowRight size={10} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

