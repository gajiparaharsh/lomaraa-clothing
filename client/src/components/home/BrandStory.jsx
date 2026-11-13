import React from "react";
import { Feather, Shield, Sparkles, Scissors } from "lucide-react";

export const BrandStory = () => {
  const pillars = [
    {
      icon: Feather,
      title: "NOBLE FIBRES",
      description: "Sourced responsibly from certified heritage mills: unblended Mongolian cashmere, 22mm Mulberry silk, and Normandy flax."
    },
    {
      icon: Scissors,
      title: "ARCHITECTURAL TAILORING",
      description: "Cut with millimeter precision. Balanced proportions that honor the human form with fluid drape and ease of movement."
    },
    {
      icon: Shield,
      title: "TIMELESS CONSCIOUSNESS",
      description: "We reject the churn of fast seasons. Each garment is engineered to endure wash after wash, season after season."
    }
  ];

  return (
    <section id="brand-story" className="py-24 lg:py-32 bg-[#FAF8F5] border-b border-[#E8E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Story Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#B89B67] font-semibold flex items-center gap-2">
                <Sparkles size={13} />
                ABOUT LOMARAA
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111111] tracking-tight leading-tight">
                THE ART OF <br />
                <span className="italic font-light">EVERYDAY STYLE.</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#333333] font-light leading-relaxed tracking-wide">
              LOMARAA was born from an unyielding philosophy: that true luxury lies in the objects we wear every single day. Not reserved for rarified gala occasions, but woven into the fabric of daily life.
            </p>

            <p className="text-sm text-[#666666] leading-relaxed font-light">
              By marrying centuries-old European tailoring traditions with contemporary minimalist restraint, we craft garments that speak in subtleties — the crisp weight of virgin wool, the cool touch of silk charmeuse, and silhouettes that command presence without noise.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E8E5DF]">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="space-y-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#F5F1E8] flex items-center justify-center text-[#B89B67] border border-[#B89B67]/30">
                      <Icon size={16} strokeWidth={1.7} />
                    </div>
                    <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#111111]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#717171] leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Editorial Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Atelier Image */}
              <div className="relative aspect-4/5 overflow-hidden shadow-xl bg-[#E8E5DF]">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85"
                  alt="Lomaraa Atelier Craftsmanship and Fine Fabrics"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] uppercase text-white/90 font-medium">
                  ATELIER MILANO &amp; MUMBAI
                </span>
              </div>

              {/* Overlapping Secondary Image */}
              <div className="hidden sm:block absolute -bottom-8 -left-8 w-48 sm:w-56 aspect-3/4 overflow-hidden border-4 border-white shadow-2xl bg-white">
                <img
                  src="https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=800&q=85"
                  alt="Hand-stitching detail"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Stamp */}
              <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-[#111111] text-[#F5F1E8] p-2 flex flex-col items-center justify-center text-center shadow-lg border-2 border-[#B89B67]">
                <span className="text-[8px] uppercase tracking-[0.2em] text-[#B89B67]">ESTABLISHED</span>
                <span className="font-serif text-lg font-bold text-white">2026</span>
                <span className="text-[7px] tracking-[0.25em] text-[#CDB58A]">LOMARAA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;

