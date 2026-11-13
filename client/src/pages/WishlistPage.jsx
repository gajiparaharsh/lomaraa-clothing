import React from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import ProductCard from "../components/products/ProductCard";
import { useShop } from "../context/ShopContext";

export const WishlistPage = () => {
  const { products, wishlist } = useShop();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="w-full bg-white min-h-[75vh]">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-4 text-xs tracking-wider uppercase text-[#717171]">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-[#111111]">Home</Link></li>
          <li className="text-[#CCCCCC]">/</li>
          <li className="text-[#111111] font-semibold">Wishlist</li>
        </ol>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-6 border-b border-[#111111] mb-10 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89B67] font-semibold block mb-1">
              CURATED WARDROBE
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#111111]">
              Saved Wishlist ({wishlistedProducts.length})
            </h1>
          </div>

          <p className="text-xs text-[#717171] tracking-wider max-w-sm">
            Pieces you have saved for contemplation. Easily transfer items into your shopping bag as inventory allows.
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          /* Empty State */
          <div className="py-24 text-center max-w-md mx-auto space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#E8E5DF] text-[#B89B67] flex items-center justify-center mx-auto">
              <Heart size={28} strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl text-[#111111]">Your Wishlist is Empty</h2>
            <p className="text-xs text-[#666666] leading-relaxed">
              Explore the Lomaraa collections and click the heart icon on any garment to reserve it in your personal edit.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#111111] hover:bg-[#B89B67] text-white text-xs tracking-[0.2em] uppercase font-semibold transition-colors"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {wishlistedProducts.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default WishlistPage;
