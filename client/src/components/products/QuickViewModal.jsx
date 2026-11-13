import React, { useState } from "react";
import { X, Star, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { formatINR } from "../../data/products";

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, isWishlisted, toggleWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentSize = selectedSize || (product.sizes ? product.sizes[0] : "Standard");
  const gallery = product.gallery || [
    { view: "Front", label: "Model Front View", src: product.image },
    { view: "Back", label: "Model Back View", src: product.hoverImage },
    { view: "Detail", label: "Fabric & Craft Detail", src: product.detailImage }
  ].filter((item) => Boolean(item.src));

  const currentPhoto = gallery[activeImageIdx] || gallery[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white shadow-2xl border border-[#E8E5DF] overflow-hidden my-8 animate-fade-in">
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-[#222222] rounded-full shadow-md transition-all cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Gallery */}
            <div className="bg-[#FAF8F5] relative flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E5DF]">
              <div className="aspect-3/4 w-full overflow-hidden relative group">
                <img
                  src={currentPhoto.src}
                  alt={`${product.name} - ${currentPhoto.label}`}
                  className="w-full h-full object-cover object-top transition-all duration-500"
                />

                {/* Top badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  {product.isNew && (
                    <span className="bg-[#111111] text-[#F5F1E8] text-[9px] tracking-[0.25em] font-medium uppercase px-2.5 py-1">
                      NEW ARRIVAL
                    </span>
                  )}
                  {product.isBestSeller && !product.isNew && (
                    <span className="bg-[#B89B67] text-white text-[9px] tracking-[0.25em] font-medium uppercase px-2.5 py-1">
                      BEST SELLER
                    </span>
                  )}
                </div>

                {/* View Perspective Badge */}
                <span className="absolute bottom-4 left-4 px-2.5 py-1 bg-black/75 backdrop-blur-xs text-white text-[10px] tracking-[0.2em] uppercase font-medium">
                  {currentPhoto.label || currentPhoto.view}
                </span>
              </div>

              {/* View Switcher Thumbnails & Buttons */}
              <div className="p-3 bg-white flex flex-col space-y-2 border-t border-[#E8E5DF]">
                <div className="flex space-x-2 justify-center">
                  {gallery.map((item, idx) => (
                    <button
                      key={item.view + idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-medium border transition-all cursor-pointer ${
                        activeImageIdx === idx
                          ? "bg-[#111111] text-white border-[#111111]"
                          : "bg-[#F5F1E8] text-[#555555] border-[#E8E5DF] hover:border-[#111111]"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                      <span>{item.view} VIEW</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs tracking-[0.2em] uppercase text-[#B89B67] mb-2 font-medium">
                  <span>
                    {product.category} • {product.subCategory}
                  </span>
                  {product.rating && (
                    <div className="flex items-center space-x-1 text-[#111111]">
                      <Star size={13} className="fill-[#B89B67] text-[#B89B67]" />
                      <span className="font-semibold">{product.rating}</span>
                      <span className="text-[#888888]">({product.reviewCount})</span>
                    </div>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif text-[#111111] tracking-wide mb-3">
                  {product.name}
                </h2>

                <div className="flex items-baseline space-x-3 mb-4">
                  <span className="text-xl font-medium text-[#111111] tracking-wide">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#888888] line-through font-light">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs leading-relaxed text-[#666666] tracking-wide mb-6">
                  {product.tagline} Handcrafted according to Lomaraa’s exacting standards of quiet luxury, ensuring effortless elegance across seasons.
                </p>

                {/* Color */}
                {product.availableColors && product.availableColors.length > 0 && (
                  <div className="mb-5">
                    <div className="flex justify-between items-center text-xs tracking-wider mb-2">
                      <span className="uppercase text-[#888888] font-medium">Color Palette</span>
                      <span className="text-[#111111] font-semibold">{product.color}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {product.availableColors.map((c) => (
                        <div
                          key={c.name}
                          className="flex items-center space-x-1.5 p-1 border border-[#E8E5DF] bg-[#FAF8F5] text-[10px]"
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="text-[#444444] font-medium pr-1">{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center text-xs tracking-wider mb-2">
                      <span className="uppercase text-[#888888] font-medium">Select Size</span>
                      <span className="text-[#B89B67] hover:underline cursor-pointer">Size Guide</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 text-xs tracking-wider uppercase font-medium border transition-all cursor-pointer ${
                            currentSize === size
                              ? "bg-[#111111] text-white border-[#111111]"
                              : "bg-white text-[#222222] border-[#E8E5DF] hover:border-[#111111]"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#E8E5DF]">
                <button
                  onClick={() => {
                    addToCart(product, currentSize);
                    setQuickViewProduct(null);
                  }}
                  className="w-full py-4 bg-[#111111] hover:bg-[#B89B67] text-white text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>ADD TO BAG — {formatINR(product.price)}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-full py-3 border text-xs tracking-[0.2em] uppercase font-medium transition-all cursor-pointer ${
                    isWishlisted(product.id)
                      ? "border-[#B89B67] text-[#B89B67] bg-[#B89B67]/5"
                      : "border-[#111111] text-[#111111] hover:bg-[#F5F1E8]"
                  }`}
                >
                  {isWishlisted(product.id) ? "SAVED IN WISHLIST" : "ADD TO WISHLIST"}
                </button>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-2 pt-3 text-[10px] text-[#717171] tracking-wider text-center border-t border-[#F0EDE6]">
                  <div className="flex flex-col items-center">
                    <Truck size={14} className="mb-1 text-[#B89B67]" />
                    <span>Express Dispatch</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ShieldCheck size={14} className="mb-1 text-[#B89B67]" />
                    <span>100% Authentic</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RefreshCw size={14} className="mb-1 text-[#B89B67]" />
                    <span>Free Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
