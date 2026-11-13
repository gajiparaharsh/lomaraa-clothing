import React from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center bg-[#111111] overflow-hidden">
      {/* Background Editorial Image with Luxury Subtle Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2400&q=90"
          alt="LOMARAA Editorial Campaign - Style is a way of life"
          className="w-full h-full object-cover object-[center_28%] scale-102 transform duration-1000 ease-out"
        />
        {/* Editorial Multi-layer Gradient: ensures crystal clear text legibility while preserving imagery */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full flex flex-col justify-between min-h-[80vh] lg:min-h-[85vh]">
        {/* Top Badges / Tagline */}
        <div className="flex items-center space-x-3">
          <span className="w-8 h-[1px] bg-[#B89B67]"></span>
          <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#F5F1E8] font-medium font-sans">
            COLLECTION 01 • SPRING / SUMMER &rsquo;26
          </span>
        </div>

        {/* Center Editorial Headlines */}
        <div className="max-w-2xl sm:max-w-3xl my-auto space-y-6 pt-12 pb-16">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.08] text-[#FFFFFF] tracking-tight font-normal">
            STYLE IS A <br />
            <span className="italic font-light text-[#F5F1E8]">WAY OF LIFE.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#E5E1D8] font-light max-w-xl leading-relaxed tracking-wide font-sans">
            Discover timeless essentials designed for modern living. Tailored in pure noble fibres with uncompromising attention to silhouette.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3.5 sm:space-y-0 sm:space-x-5">
            <Link
              to="/shop?gender=Men"
              className="px-9 py-4 bg-[#FFFFFF] hover:bg-[#B89B67] text-[#111111] hover:text-white text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 text-center shadow-lg group flex items-center justify-center space-x-2"
            >
              <span>SHOP MEN</span>
              <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              to="/shop?gender=Women"
              className="px-9 py-4 bg-transparent hover:bg-white/10 text-[#FFFFFF] text-xs tracking-[0.25em] uppercase font-semibold border border-[#FFFFFF]/80 hover:border-white transition-all duration-300 text-center backdrop-blur-xs flex items-center justify-center space-x-2"
            >
              <span>SHOP WOMEN</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Bottom Hero Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-white/20 pt-6 text-white/80 gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89B67] font-semibold">
              LOOK 01
            </span>
            <span className="text-xs text-[#F5F1E8] tracking-wider font-light">
              Double-Faced Cashmere &amp; Silk Bias Silhouette
            </span>
          </div>

          <a
            href="#new-arrivals"
            className="flex items-center space-x-2 text-[11px] tracking-[0.25em] uppercase text-[#F5F1E8] hover:text-[#B89B67] transition-colors group"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={14} className="transform group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

