import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RefreshCw,
  Ruler,
  ChevronDown,
  ChevronUp,
  Share2,
  ArrowRight
} from "lucide-react";
import ProductCard from "../components/products/ProductCard";
import { useShop } from "../context/ShopContext";
import { formatINR, getProductBySlug } from "../data/products";

export const ProductDetails = () => {
  const { slug } = useParams();
  const { products, addToCart, toggleWishlist, isWishlisted, showToast } = useShop();

  const product = getProductBySlug(slug) || products[0];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.color || "Standard");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeUnit, setSizeUnit] = useState("cm");

  // Accordion panels
  const [openAccordion, setOpenAccordion] = useState({
    details: true,
    fit: false,
    materials: false,
    shipping: false
  });

  const toggleAccordion = (key) => {
    setOpenAccordion((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const gallery = product.gallery || [
    { view: "Front", label: "Model Front View", src: product.image },
    { view: "Back", label: "Model Back View", src: product.hoverImage },
    { view: "Detail", label: "Craft & Fabric Detail", src: product.detailImage }
  ];

  const currentPhoto = gallery[activePhotoIdx] || gallery[0];
  const favorited = isWishlisted(product.id);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  // Recommendations: other products in same category or complimentary
  const recommendations = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard.");
    }
  };

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-4 text-xs tracking-wider uppercase text-[#717171]">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-[#111111]">Home</Link></li>
          <li className="text-[#CCCCCC]">/</li>
          <li><Link to="/shop" className="hover:text-[#111111]">Shop</Link></li>
          <li className="text-[#CCCCCC]">/</li>
          <li><Link to={`/shop?category=${product.category}`} className="hover:text-[#111111]">{product.category}</Link></li>
          <li className="text-[#CCCCCC]">/</li>
          <li className="text-[#111111] font-semibold truncate max-w-[200px]">{product.name}</li>
        </ol>
      </nav>

      {/* Main PDP Grid: H&M / Luxury Atelier Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Multi-Angle Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
            {/* Primary Large Image */}
            <div className="flex-1 aspect-3/4 bg-[#FAF8F5] overflow-hidden relative border border-[#E8E5DF] group">
              <img
                src={currentPhoto.src}
                alt={`${product.name} - ${currentPhoto.label}`}
                className="w-full h-full object-cover object-top transition-all duration-700"
              />

              {/* View Perspective Badge */}
              <span className="absolute bottom-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-xs text-white text-[10px] tracking-[0.25em] uppercase font-medium">
                {currentPhoto.label || currentPhoto.view}
              </span>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
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
                {discountPercent && (
                  <span className="bg-[#111111] text-[#CDB58A] text-[9px] tracking-[0.2em] font-medium uppercase px-2.5 py-1 border border-[#B89B67]/40">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Column */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 flex-shrink-0">
              {gallery.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`relative w-20 h-26 sm:w-22 sm:h-28 flex-shrink-0 border-2 overflow-hidden transition-all cursor-pointer ${
                    activePhotoIdx === idx
                      ? "border-[#111111] ring-1 ring-[#111111]"
                      : "border-transparent opacity-75 hover:opacity-100"
                  }`}
                >
                  <img src={photo.src} alt={photo.view} className="w-full h-full object-cover object-top" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] py-0.5 text-center uppercase tracking-wider">
                    {photo.view}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Purchase Panel (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:pl-4">
            <div>
              {/* Category, Rating & Share */}
              <div className="flex justify-between items-center text-xs tracking-[0.2em] uppercase text-[#B89B67] font-medium">
                <span>{product.gender} • {product.category}</span>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 text-[#111111]">
                    <Star size={13} className="fill-[#B89B67] text-[#B89B67]" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-[#888888]">({product.reviewCount})</span>
                  </div>
                  <button
                    onClick={handleShare}
                    className="text-[#888888] hover:text-[#111111] p-1 cursor-pointer"
                    title="Share piece"
                  >
                    <Share2 size={14} />
                  </button>
                </div>
              </div>

              {/* Title & SKU */}
              <h1 className="text-2xl sm:text-3xl font-serif text-[#111111] tracking-wide mt-2">
                {product.name}
              </h1>
              <p className="text-[10px] text-[#888888] tracking-widest uppercase mt-0.5">
                SKU: {product.sku}
              </p>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mt-4 pb-4 border-b border-[#E8E5DF]">
                <span className="text-2xl font-semibold text-[#111111] tracking-wide">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#888888] line-through font-light">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-[#717171] font-light">
                  Inclusive of all taxes. Free express shipping.
                </span>
              </div>

              {/* Tagline */}
              <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed tracking-wide my-4">
                {product.tagline}
              </p>

              {/* Color Selection */}
              <div className="my-5">
                <div className="flex justify-between text-xs tracking-wider mb-2">
                  <span className="uppercase text-[#888888] font-medium">Color:</span>
                  <span className="text-[#111111] font-semibold">{selectedColor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {product.availableColors?.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center space-x-2 px-3 py-1.5 border text-xs tracking-wider transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? "border-[#111111] bg-[#111111] text-white"
                          : "border-[#E8E5DF] bg-white text-[#444444] hover:border-[#111111]"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="my-6">
                <div className="flex justify-between text-xs tracking-wider mb-2">
                  <span className="uppercase text-[#888888] font-medium">Select Size:</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#B89B67] hover:text-[#111111] flex items-center space-x-1 cursor-pointer"
                  >
                    <Ruler size={12} />
                    <span className="underline">Size Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs tracking-wider uppercase font-medium border transition-all cursor-pointer ${
                        selectedSize === size
                          ? "bg-[#111111] text-white border-[#111111] shadow-xs"
                          : "bg-white text-[#222222] border-[#E8E5DF] hover:border-[#111111]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#888888] tracking-wider mt-2">
                  Stock Status: <strong className="text-emerald-700 font-medium">In Stock ({product.stock} units available)</strong>
                </p>
              </div>

              {/* Purchase Actions */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => addToCart(product, selectedSize, selectedColor)}
                  className="w-full py-4 bg-[#111111] hover:bg-[#B89B67] text-white text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer group"
                >
                  <ShoppingBag size={15} />
                  <span>ADD TO SHOPPING BAG — {formatINR(product.price)}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-full py-3.5 border text-xs tracking-[0.2em] uppercase font-medium transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    favorited
                      ? "border-[#B89B67] text-[#B89B67] bg-[#B89B67]/5"
                      : "border-[#111111] text-[#111111] hover:bg-[#F5F1E8]"
                  }`}
                >
                  <Heart size={15} className={favorited ? "fill-[#B89B67]" : ""} />
                  <span>{favorited ? "SAVED IN WISHLIST" : "ADD TO WISHLIST"}</span>
                </button>
              </div>

              {/* Delivery Assurance */}
              <div className="grid grid-cols-3 gap-2 py-5 mt-6 border-y border-[#E8E5DF] text-[10px] text-[#666666] tracking-wider text-center">
                <div className="flex flex-col items-center">
                  <Truck size={16} className="text-[#B89B67] mb-1" />
                  <span>Express Delivery (2-4 Days)</span>
                </div>
                <div className="flex flex-col items-center">
                  <RefreshCw size={16} className="text-[#B89B67] mb-1" />
                  <span>14-Day Free Returns</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck size={16} className="text-[#B89B67] mb-1" />
                  <span>Authentic Atelier Craft</span>
                </div>
              </div>

              {/* Collapsible Accordion Specs */}
              <div className="divide-y divide-[#E8E5DF] border-b border-[#E8E5DF]">
                {/* Details */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion("details")}
                    className="w-full flex justify-between items-center text-xs uppercase tracking-[0.15em] font-semibold text-[#111111] text-left cursor-pointer"
                  >
                    <span>Description &amp; Design Notes</span>
                    {openAccordion.details ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  {openAccordion.details && (
                    <div className="mt-2.5 text-xs text-[#666666] leading-relaxed font-light space-y-2">
                      <p>{product.description}</p>
                    </div>
                  )}
                </div>

                {/* Materials & Composition */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion("materials")}
                    className="w-full flex justify-between items-center text-xs uppercase tracking-[0.15em] font-semibold text-[#111111] text-left cursor-pointer"
                  >
                    <span>Materials &amp; Care</span>
                    {openAccordion.materials ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  {openAccordion.materials && (
                    <div className="mt-2.5 text-xs text-[#666666] leading-relaxed font-light space-y-1.5">
                      <p><strong>Composition:</strong> {product.composition}</p>
                      <p><strong>Care Guide:</strong> {product.care}</p>
                    </div>
                  )}
                </div>

                {/* Fit Guide */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion("fit")}
                    className="w-full flex justify-between items-center text-xs uppercase tracking-[0.15em] font-semibold text-[#111111] text-left cursor-pointer"
                  >
                    <span>Fit &amp; Sizing</span>
                    {openAccordion.fit ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  {openAccordion.fit && (
                    <div className="mt-2.5 text-xs text-[#666666] leading-relaxed font-light">
                      <p>{product.fit}</p>
                    </div>
                  )}
                </div>

                {/* Delivery & Returns */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion("shipping")}
                    className="w-full flex justify-between items-center text-xs uppercase tracking-[0.15em] font-semibold text-[#111111] text-left cursor-pointer"
                  >
                    <span>Complimentary Shipping &amp; Returns</span>
                    {openAccordion.shipping ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  {openAccordion.shipping && (
                    <div className="mt-2.5 text-xs text-[#666666] leading-relaxed font-light space-y-1.5">
                      <p>Complimentary express shipping across India on orders exceeding ₹5,000.</p>
                      <p>We welcome returns within 14 days of receipt. All returned garments must remain unworn with security ribbon intact.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complete the Look / Curated Recommendations */}
        <div className="mt-24 pt-12 border-t border-[#E8E5DF]">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89B67] font-semibold">
                CURATED ATELIER EDIT
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#111111]">
                Complete The Look
              </h2>
            </div>
            <Link to="/shop" className="text-xs uppercase tracking-wider font-semibold text-[#111111] hover:text-[#B89B67] flex items-center gap-1">
              <span>EXPLORE ALL</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div onClick={() => setIsSizeGuideOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-xs" />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white shadow-2xl p-6 sm:p-8 border border-[#E8E5DF] animate-fade-in">
              <div className="flex justify-between items-center pb-4 border-b border-[#E8E5DF]">
                <div>
                  <h3 className="font-serif text-xl text-[#111111]">Lomaraa Size Guide</h3>
                  <p className="text-xs text-[#888888] tracking-wider uppercase">Tailoring Measurement Standard</p>
                </div>
                <button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="p-1.5 text-[#666666] hover:text-[#111111]"
                >
                  <ChevronDown size={20} />
                </button>
              </div>

              {/* Unit Toggle */}
              <div className="flex justify-end my-4 space-x-2 text-xs">
                <button
                  onClick={() => setSizeUnit("cm")}
                  className={`px-3 py-1 font-medium border ${sizeUnit === "cm" ? "bg-[#111111] text-white border-[#111111]" : "border-[#E8E5DF]"}`}
                >
                  Centimeters (cm)
                </button>
                <button
                  onClick={() => setSizeUnit("inches")}
                  className={`px-3 py-1 font-medium border ${sizeUnit === "inches" ? "bg-[#111111] text-white border-[#111111]" : "border-[#E8E5DF]"}`}
                >
                  Inches (in)
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF8F5] uppercase tracking-wider text-[#111111] border-b border-[#E8E5DF]">
                    <tr>
                      <th className="p-2.5">Size</th>
                      <th className="p-2.5">Chest</th>
                      <th className="p-2.5">Waist</th>
                      <th className="p-2.5">Hips</th>
                      <th className="p-2.5">Sleeve</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EDE6] text-[#444444]">
                    <tr>
                      <td className="p-2.5 font-semibold text-[#111111]">XS (36)</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "88 - 92 cm" : "34 - 36 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "74 - 78 cm" : "29 - 31 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "90 - 94 cm" : "35 - 37 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "82 cm" : "32.5 in"}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-[#111111]">S (38)</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "93 - 97 cm" : "37 - 39 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "79 - 83 cm" : "31 - 33 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "95 - 99 cm" : "37 - 39 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "84 cm" : "33 in"}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-[#111111]">M (40)</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "98 - 102 cm" : "39 - 41 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "84 - 88 cm" : "33 - 35 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "100 - 104 cm" : "39 - 41 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "86 cm" : "34 in"}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-[#111111]">L (42)</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "103 - 107 cm" : "41 - 43 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "89 - 93 cm" : "35 - 37 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "105 - 109 cm" : "41 - 43 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "88 cm" : "34.5 in"}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-[#111111]">XL (44)</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "108 - 114 cm" : "43 - 45 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "94 - 100 cm" : "37 - 39 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "110 - 116 cm" : "43 - 45 in"}</td>
                      <td className="p-2.5">{sizeUnit === "cm" ? "90 cm" : "35.5 in"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E5DF] text-xs text-[#717171] flex justify-between items-center">
                <span>Need custom styling assistance? Contact Client Concierge.</span>
                <button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="px-5 py-2 bg-[#111111] text-white uppercase tracking-wider text-[11px] font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
