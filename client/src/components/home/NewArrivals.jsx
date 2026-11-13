import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "../products/ProductCard";
import { products } from "../../data/products";

export const NewArrivals = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Women", "Men"];

  const newProducts = products.filter((p) => p.isNew);

  const displayedProducts =
    activeCategory === "All"
      ? newProducts.slice(0, 4)
      : newProducts.filter((p) => p.category === activeCategory).slice(0, 4);

  return (
    <section id="new-arrivals" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#F0EDE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[11px] tracking-[0.3em] uppercase text-[#B89B67] font-semibold">
              <Sparkles size={13} />
              <span>SPRING / SUMMER 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111111] tracking-tight">
              NEW ARRIVALS
            </h2>
            <p className="text-sm sm:text-base text-[#717171] font-light tracking-wide max-w-lg">
              Discover what&rsquo;s new this season. Architectural tailoring and lightweight noble fibres crafted for modern living.
            </p>
          </div>

          {/* Category Tabs & View All Link */}
          <div className="mt-6 md:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <div className="flex space-x-6 border-b border-[#E8E5DF] sm:border-0 pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs uppercase tracking-[0.2em] font-medium pb-1 transition-all ${
                    activeCategory === cat
                      ? "text-[#111111] border-b-2 border-[#111111] font-semibold"
                      : "text-[#888888] hover:text-[#111111]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <Link
              to="/shop"
              className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] hover:text-[#B89B67] transition-colors"
            >
              <span>VIEW ALL</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 4 Product Cards Grid on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;

