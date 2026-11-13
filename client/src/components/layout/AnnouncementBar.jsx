import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export const AnnouncementBar = () => {
  const announcements = [
    {
      text: "COMPLIMENTARY EXPRESS SHIPPING ON ORDERS OVER ₹5,000",
      highlight: "AUTOMATIC AT CHECKOUT"
    },
    {
      text: "THE EDIT: SPRING / SUMMER 2026 CAPSULE IS NOW LIVE",
      highlight: "EXPLORE NOW"
    },
    {
      text: "SIGNATURE PACKAGING & SUSTAINABLE ATELIER GARMENT BAG INCLUDED",
      highlight: "OUR PROMISE"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <aside aria-label="Announcements" className="bg-[#111111] text-[#F5F1E8] text-[11px] font-medium tracking-[0.2em] uppercase border-b border-[#222222] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        {/* Left: Region / Currency */}
        <div className="hidden md:flex items-center space-x-3 text-[10px] tracking-[0.25em] text-[#CDB58A]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B89B67] animate-pulse"></span>
          <span>INDIA / INR (₹)</span>
          <span className="text-[#444444]">•</span>
          <span className="text-[#999999] hover:text-[#F5F1E8] cursor-pointer transition-colors">CONCIERGE</span>
        </div>

        {/* Center: Rotating Announcement */}
        <div className="flex-1 flex items-center justify-center space-x-3 text-center">
          <button
            onClick={handlePrev}
            aria-label="Previous announcement"
            className="text-[#888888] hover:text-white p-1 transition-colors"
          >
            <ChevronLeft size={13} />
          </button>

          <div className="h-5 overflow-hidden flex items-center justify-center min-w-[280px] sm:min-w-[420px]">
            <div
              key={currentIndex}
              className="animate-fade-in flex items-center justify-center space-x-2"
            >
              <span className="text-[#E5E1D8]">{announcements[currentIndex].text}</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-[#B89B67]/20 text-[#B89B67] border border-[#B89B67]/40 tracking-wider">
                {announcements[currentIndex].highlight}
              </span>
            </div>
          </div>

          <button
            onClick={handleNext}
            aria-label="Next announcement"
            className="text-[#888888] hover:text-white p-1 transition-colors"
          >
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Right: Tagline / Perks */}
        <div className="hidden md:flex items-center space-x-2 text-[10px] text-[#A59D90] tracking-[0.2em]">
          <Sparkles size={11} className="text-[#B89B67]" />
          <span>ELEVATE YOUR EVERYDAY</span>
        </div>
      </div>
    </aside>
  );
};

export default AnnouncementBar;

