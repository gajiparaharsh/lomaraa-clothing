import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Award, ArrowRight } from "lucide-react";
import ProductCard from "../products/ProductCard";
import { products } from "../../data/products";

export const BestSellers = () => {
  const [filter, setFilter] = useState("All");

  const bestSellerProducts = products.filter((p) => p.isBestSeller);

  const filteredItems =
    filter === "All"
      ? bestSellerProducts.slice(0, 4)
      : bestSellerProducts.filter((p) => p.category === filter).slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#F0EDE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[11px] tracking-[0.3em] uppercase text-[#B89B67] font-semibold">
              <Award size={13} />
              <span>TIMELESS ICONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111111] tracking-tight">
              BEST SELLERS
            </h2>
            <p className="text-sm sm:text-base text-[#717171] font-light tracking-wide max-w-lg">
              The silhouettes most cherished by our patrons worldwide, distinguished by flawless drape and impeccable hand.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="mt-6 md:mt-0 flex items-center space-x-4">
            {["All", "Women", "Men"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium border transition-all ${
                  filter === category
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-[#717171] border-[#E8E5DF] hover:border-[#111111] hover:text-[#111111]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Assurance Bar */}
        <div className="mt-16 pt-8 border-t border-[#F0EDE6] flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 text-xs text-[#717171] tracking-wider">
          <p>
            Rated <strong className="text-[#111111]">4.9 / 5.0</strong> by over 2,400 clients across 30+ countries.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#111111] hover:text-[#B89B67] uppercase tracking-[0.2em] transition-colors"
          >
            <span>DISCOVER THE FULL REPERTOIRE</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;

