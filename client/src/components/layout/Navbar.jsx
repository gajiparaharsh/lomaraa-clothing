import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { useShop } from "../../context/ShopContext";

export const Navbar = () => {
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinksLeft = [
    { label: "Shop All", to: "/shop" },
    { label: "Women", to: "/shop?gender=Women" },
    { label: "Men", to: "/shop?gender=Men" }
  ];

  const navLinksRight = [
    { label: "New Arrivals", to: "/shop?filter=new", badge: "NEW" },
    { label: "Collections", to: "/shop" },
    { label: "About Us", to: "/#brand-story" }
  ];

  const allNavLinks = [...navLinksLeft, ...navLinksRight];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-[#E8E5DF]"
          : "bg-white border-b border-[#E8E5DF]"
      }`}
    >
      <nav aria-label="Main Navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] hover:text-[#B89B67] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#111111] hover:text-[#B89B67] transition-colors ml-1 cursor-pointer"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinksLeft.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-xs uppercase tracking-[0.2em] font-medium text-[#222222] hover:text-[#B89B67] transition-colors relative group py-2"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B89B67] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Brand Logo - Centered */}
          <div className="text-center flex-1 lg:flex-initial">
            <Link to="/" className="inline-block group focus:outline-hidden">
              <span className="font-serif text-2xl sm:text-3xl lg:text-[32px] tracking-[0.28em] font-bold text-[#111111] transition-colors group-hover:text-[#B89B67]">
                LOMARAA
              </span>
              <span className="block text-[8px] sm:text-[9px] tracking-[0.35em] text-[#717171] uppercase font-sans mt-0.5 font-medium">
                ELEVATE YOUR EVERYDAY
              </span>
            </Link>
          </div>

          {/* Desktop Right Nav Links & Actions */}
          <div className="flex items-center space-x-6 sm:space-x-7">
            <div className="hidden lg:flex items-center space-x-7">
              {navLinksRight.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-xs uppercase tracking-[0.2em] font-medium text-[#222222] hover:text-[#B89B67] transition-colors relative group py-2"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-[#B89B67] text-white text-[9px] font-semibold tracking-wider rounded-xs">
                      {link.badge}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B89B67] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4 sm:space-x-5">
              {/* Search Icon (Desktop) */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:inline-flex p-1.5 text-[#222222] hover:text-[#B89B67] transition-colors cursor-pointer"
                aria-label="Open search dialog"
              >
                <Search size={19} strokeWidth={1.8} />
              </button>

              {/* Account Icon with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="p-1.5 text-[#222222] hover:text-[#B89B67] transition-colors flex items-center cursor-pointer"
                  aria-label="Account menu"
                  aria-expanded={accountMenuOpen}
                >
                  <User size={19} strokeWidth={1.8} />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl border border-[#E8E5DF] py-3 text-xs tracking-wider z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-[#F0EDE6] mb-1">
                      <p className="font-medium text-[#111111]">Welcome to Lomaraa</p>
                      <p className="text-[11px] text-[#888888]">Guest Client</p>
                    </div>
                    <Link
                      to="/shop"
                      className="block px-4 py-2 text-[#222222] hover:bg-[#F5F1E8] hover:text-[#B89B67] transition-colors"
                      onClick={() => setAccountMenuOpen(false)}
                    >
                      Browse Collection
                    </Link>
                    <a
                      href="#orders"
                      className="block px-4 py-2 text-[#222222] hover:bg-[#F5F1E8] hover:text-[#B89B67] transition-colors"
                      onClick={() => setAccountMenuOpen(false)}
                    >
                      Track Orders
                    </a>
                    <a
                      href="#concierge"
                      className="block px-4 py-2 text-[#222222] hover:bg-[#F5F1E8] hover:text-[#B89B67] transition-colors"
                      onClick={() => setAccountMenuOpen(false)}
                    >
                      Client Concierge
                    </a>
                  </div>
                )}
              </div>

              {/* Wishlist Icon */}
              <Link
                to="/shop"
                className="p-1.5 text-[#222222] hover:text-[#B89B67] transition-colors relative"
                aria-label="View wishlist"
              >
                <Heart size={19} strokeWidth={1.8} className={wishlist.length > 0 ? "text-[#B89B67]" : ""} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B89B67] text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-1.5 text-[#222222] hover:text-[#B89B67] transition-colors relative cursor-pointer"
                aria-label="Open shopping bag"
              >
                <ShoppingBag size={19} strokeWidth={1.8} />
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#111111] text-[#F5F1E8] rounded-full text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8E5DF] py-6 px-2 space-y-4 animate-fade-in bg-white">
            <div className="space-y-1">
              {allNavLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 px-3 text-sm font-medium tracking-[0.15em] uppercase text-[#111111] hover:bg-[#F5F1E8] hover:text-[#B89B67] transition-all"
                >
                  <span>{link.label}</span>
                  {link.badge ? (
                    <span className="px-2 py-0.5 bg-[#B89B67] text-white text-[9px] font-semibold tracking-wider">
                      {link.badge}
                    </span>
                  ) : (
                    <ArrowRight size={14} className="text-[#888888]" />
                  )}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-[#F0EDE6] px-3 space-y-3 text-xs tracking-wider text-[#666666]">
              <div className="flex justify-between items-center py-1">
                <span>Currency</span>
                <span className="font-semibold text-[#111111]">INR (₹)</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Client Concierge</span>
                <span className="text-[#B89B67]">+91 (0) 22 8000 LOM</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
