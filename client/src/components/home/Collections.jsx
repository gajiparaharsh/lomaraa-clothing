import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { collectionsData } from "../../data/products";

export const Collections = () => {
  const getCollectionLink = (id) => {
    switch (id) {
      case "col-men":
        return "/shop?gender=Men";
      case "col-women":
        return "/shop?gender=Women";
      case "col-everyday":
        return "/shop?category=T-Shirts";
      case "col-premium":
        return "/shop?category=Outerwear";
      default:
        return "/shop";
    }
  };

  return (
    <section id="collections" className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#B89B67] font-semibold">
            CURATED CAPSULES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111111] tracking-tight">
            SHOP BY COLLECTION
          </h2>
          <p className="text-sm sm:text-base text-[#717171] font-light tracking-wide leading-relaxed">
            Four foundational pillars built on pure materials, artisanal tailoring, and understated modern elegance.
          </p>
        </div>

        {/* 4 Premium Visual Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collectionsData.map((col, index) => (
            <Link
              key={col.id}
              to={getCollectionLink(col.id)}
              className="group relative aspect-4/5 sm:aspect-3/4 lg:aspect-2/3 w-full overflow-hidden bg-[#111111] cursor-pointer shadow-sm block"
            >
              {/* Image */}
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-106 opacity-85 group-hover:opacity-95"
              />

              {/* Editorial Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:from-black/90 transition-all duration-500" />

              {/* Card Meta & Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#F5F1E8]/80 font-medium">
                  {col.itemCount}
                </span>
                <span className="text-[10px] tracking-[0.2em] font-serif text-[#B89B67] italic">
                  0{index + 1}
                </span>
              </div>

              {/* Card Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 z-10 space-y-2 transform transition-transform duration-300">
                <h3 className="text-xl sm:text-2xl font-serif text-white tracking-wide group-hover:text-[#F5F1E8] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-[#DDD7CD] font-light tracking-wide line-clamp-1">
                  {col.subtitle}
                </p>

                <div className="pt-3 flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#B89B67] group-hover:text-white transition-colors">
                  <span>{col.linkText}</span>
                  <ArrowUpRight size={14} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
