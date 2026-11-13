import React from "react";
import { X } from "lucide-react";
import FilterSidebar from "./FilterSidebar";

export const MobileFilterDrawer = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  clearAllFilters,
  activeFilterCount,
  categoryOptions,
  genderOptions,
  sizeOptions,
  colorOptions,
  priceOptions,
  totalResults
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#E8E5DF] animate-fade-in">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#E8E5DF] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-sm tracking-[0.2em] uppercase font-bold text-[#111111]">
                FILTER &amp; REFINE
              </span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#111111] text-[#F5F1E8] text-[10px] font-semibold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] uppercase tracking-wider text-[#717171] hover:text-[#111111] transition-colors"
                >
                  Reset
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-[#666666] hover:text-[#111111] rounded-full hover:bg-black/5"
                aria-label="Close filter drawer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Drawer Body - Scrollable Filters */}
          <div className="flex-1 overflow-y-auto p-6">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              clearAllFilters={clearAllFilters}
              activeFilterCount={activeFilterCount}
              categoryOptions={categoryOptions}
              genderOptions={genderOptions}
              sizeOptions={sizeOptions}
              colorOptions={colorOptions}
              priceOptions={priceOptions}
            />
          </div>

          {/* Footer - Apply CTA */}
          <div className="p-4 border-t border-[#E8E5DF] bg-[#FAF8F5]">
            <button
              onClick={onClose}
              className="w-full py-3.5 bg-[#111111] hover:bg-[#B89B67] text-white text-xs tracking-[0.25em] font-semibold uppercase transition-all duration-300 shadow-sm"
            >
              SHOW {totalResults} {totalResults === 1 ? "RESULT" : "RESULTS"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterDrawer;
