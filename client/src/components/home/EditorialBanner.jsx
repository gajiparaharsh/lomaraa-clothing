import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";

export const EditorialBanner = () => {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#111111] text-white overflow-hidden">
      {/* Background Editorial Visual */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2400&q=85"
          alt="Lomaraa Editorial - Less, but better"
          className="w-full h-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl sm:max-w-2xl space-y-6">
          <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#B89B67] font-semibold">
            <Compass size={13} />
            <span>EDITORIAL MANIFESTO</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#FFFFFF] tracking-tight leading-[1.05]">
            LESS, BUT <br />
            <span className="italic font-light text-[#F5F1E8]">BETTER.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#DDD7CD] font-light leading-relaxed tracking-wide">
            Restraint is the purest expression of luxury. In an age of endless accumulation, Lomaraa champions deliberate wardrobe architecture: garments stripped of excess, rich in proportion, and crafted to endure.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              to="/shop"
              className="px-8 py-4 bg-[#B89B67] hover:bg-white text-[#111111] text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg group"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <span className="text-xs text-[#999999] tracking-wider italic font-serif">
              — Edition No. 04 / Spring
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialBanner;

