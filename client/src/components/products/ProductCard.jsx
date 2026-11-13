import React, { useState } from "react";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { formatINR } from "../../data/products";

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [activeColor, setActiveColor] = useState(product.color);

  const favorited = isWishlisted(product.id);

  const handleQuickAdd = (size) => {
    addToCart(product, size);
    setShowSizes(false);
  };

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="group flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
    >
      {/* Image Container with Hover Swap */}
      <div className="relative aspect-3/4 w-full bg-[#F5F1E8] overflow-hidden">
        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out ${
            isHovered && product.hoverImage ? "opacity-0" : "opacity-100"
          } transform group-hover:scale-103 transition-transform duration-700`}
        />

        {/* Hover Secondary Image (Editorial model pose / angle) */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out ${
              isHovered ? "opacity-100" : "opacity-0"
            } transform group-hover:scale-103 transition-transform duration-700`}
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-[#111111] text-[#F5F1E8] text-[8px] sm:text-[9px] tracking-[0.25em] font-medium uppercase px-2 py-0.5 shadow-xs">
              NEW
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-[#B89B67] text-white text-[8px] sm:text-[9px] tracking-[0.25em] font-medium uppercase px-2 py-0.5 shadow-xs">
              BEST SELLER
            </span>
          )}
          {discountPercent && (
            <span className="bg-[#111111] text-[#CDB58A] text-[8px] sm:text-[9px] tracking-[0.2em] font-medium uppercase px-2 py-0.5 border border-[#B89B67]/40">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 sm:top-3 right-2.5 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            favorited
              ? "bg-[#B89B67] text-white shadow-md"
              : "bg-white/85 hover:bg-white text-[#111111] backdrop-blur-xs shadow-xs hover:scale-105"
          }`}
        >
          <Heart size={14} className={favorited ? "fill-white" : ""} strokeWidth={1.8} />
        </button>

        {/* Quick View Button (Desktop Overlay) */}
        <button
          onClick={() => setQuickViewProduct(product)}
          aria-label={`Quick view ${product.name}`}
          className="absolute top-12 right-2.5 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/85 hover:bg-white text-[#111111] backdrop-blur-xs shadow-xs hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
          title="Quick View"
        >
          <Eye size={14} strokeWidth={1.8} />
        </button>

        {/* Quick Add Overlay Slide-up */}
        <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 z-20">
          {showSizes ? (
            <div className="bg-white/95 backdrop-blur-md p-2 sm:p-2.5 shadow-lg border border-[#E8E5DF] animate-fade-in">
              <div className="flex justify-between items-center text-[9px] sm:text-[10px] tracking-widest text-[#717171] uppercase mb-1.5 font-medium">
                <span>Select Size</span>
                <button
                  onClick={() => setShowSizes(false)}
                  className="text-[#111111] hover:text-[#B89B67] text-[10px]"
                >
                  Cancel
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleQuickAdd(size)}
                    className="py-1 text-[10px] sm:text-[11px] font-medium border border-[#E8E5DF] hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                if (product.sizes && product.sizes.length > 1) {
                  setShowSizes(true);
                } else {
                  handleQuickAdd(product.sizes?.[0] || "Standard");
                }
              }}
              className="w-full py-2 sm:py-2.5 bg-white/95 hover:bg-[#111111] text-[#111111] hover:text-white text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 backdrop-blur-md shadow-md flex items-center justify-center space-x-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transform sm:translate-y-2 sm:group-hover:translate-y-0"
            >
              <ShoppingBag size={12} strokeWidth={1.8} />
              <span>QUICK ADD</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-3 pb-2 flex flex-col space-y-1">
        {/* Category & Rating */}
        <div className="flex justify-between items-baseline text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#717171] font-medium">
          <span>{product.category}</span>
          {product.rating && (
            <div className="flex items-center space-x-1 text-[10px] sm:text-[11px] text-[#555555]">
              <Star size={10} className="fill-[#B89B67] text-[#B89B67]" />
              <span className="font-medium text-[#111111]">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Product Title */}
        <h3
          onClick={() => setQuickViewProduct(product)}
          className="text-xs sm:text-sm font-medium text-[#111111] tracking-wide cursor-pointer hover:text-[#B89B67] transition-colors line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Price & Original Price */}
        <div className="flex items-center space-x-2 pt-0.5">
          <span className="text-xs sm:text-sm font-semibold text-[#111111] tracking-wide">
            {formatINR(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] sm:text-[11px] text-[#888888] line-through font-light">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Available Color Indicators */}
        <div className="pt-1 flex items-center justify-between">
          {product.availableColors && product.availableColors.length > 0 ? (
            <div className="flex items-center space-x-1.5">
              {product.availableColors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setActiveColor(c.name)}
                  title={c.name}
                  aria-label={c.name}
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border transition-all ${
                    activeColor === c.name
                      ? "ring-1 ring-offset-1 ring-[#111111] scale-110"
                      : "border-black/20 hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <span className="text-[10px] text-[#888888] ml-1 font-light hidden sm:inline">
                {product.availableColors.length} colors
              </span>
            </div>
          ) : (
            product.color && (
              <p className="text-[10px] sm:text-[11px] text-[#888888] tracking-wider">
                {product.color}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
