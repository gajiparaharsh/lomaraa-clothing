import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Globe } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111111] text-[#F5F1E8] pt-18 pb-12 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: Brand Statement & Scroll to Top */}
        <div className="pb-14 border-b border-[#262626] flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <span className="font-serif text-3xl sm:text-4xl tracking-[0.28em] font-bold text-white block">
              LOMARAA
            </span>
            <p className="text-xs text-[#B89B67] tracking-[0.3em] uppercase font-medium">
              ELEVATE YOUR EVERYDAY.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#999999] hover:text-[#B89B67] transition-colors py-2 border-b border-transparent hover:border-[#B89B67] cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Main Footer Links Grid */}
        <div className="py-14 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10 text-xs">
          {/* Col 1: About Lomaraa */}
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B89B67]">
              ABOUT LOMARAA
            </h4>
            <ul className="space-y-2.5 text-[#AAAAAA] tracking-wider font-light">
              <li>
                <a href="#brand-story" className="hover:text-white transition-colors">Our Philosophy</a>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">The Collection &amp; Craft</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">Sustainable Sourcing</Link>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition-colors">Careers &amp; Talents</a>
              </li>
              <li>
                <a href="#press" className="hover:text-white transition-colors">Editorial &amp; Press</a>
              </li>
            </ul>
          </div>

          {/* Col 2: Customer Service */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B89B67]">
              CLIENT CONCIERGE
            </h4>
            <ul className="space-y-2.5 text-[#AAAAAA] tracking-wider font-light">
              <li>
                <a href="#concierge" className="hover:text-white transition-colors">Contact Concierge</a>
              </li>
              <li>
                <a href="#appointments" className="hover:text-white transition-colors">Private Styling Booking</a>
              </li>
              <li>
                <a href="#care" className="hover:text-white transition-colors">Garment Care Guide</a>
              </li>
              <li>
                <a href="#size-guide" className="hover:text-white transition-colors">Size &amp; Fit Advisor</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Shipping & Returns */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B89B67]">
              SHIPPING &amp; RETURNS
            </h4>
            <ul className="space-y-2.5 text-[#AAAAAA] tracking-wider font-light">
              <li>
                <a href="#shipping" className="hover:text-white transition-colors">Complimentary Express Shipping</a>
              </li>
              <li>
                <a href="#returns" className="hover:text-white transition-colors">14-Day Atelier Returns</a>
              </li>
              <li>
                <a href="#tracking" className="hover:text-white transition-colors">Track Consignment</a>
              </li>
              <li>
                <a href="#duties" className="hover:text-white transition-colors">Customs &amp; Duties</a>
              </li>
              <li>
                <a href="#packaging" className="hover:text-white transition-colors">Signature Packaging</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policy */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B89B67]">
              LEGAL &amp; PRIVACY
            </h4>
            <ul className="space-y-2.5 text-[#AAAAAA] tracking-wider font-light">
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#cookie" className="hover:text-white transition-colors">Cookie Preferences</a>
              </li>
              <li>
                <a href="#accessibility" className="hover:text-white transition-colors">Accessibility Statement</a>
              </li>
              <li>
                <a href="#authenticity" className="hover:text-white transition-colors">Authenticity Guarantee</a>
              </li>
            </ul>
          </div>

          {/* Col 5: Global Boutiques & Social */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B89B67]">
              SALONS &amp; BOUTIQUES
            </h4>
            <p className="text-xs text-[#888888] leading-relaxed font-light">
              Flagship: Nariman Point, Mumbai<br />
              Atelier: Via Montenapoleone, Milan<br />
              Private Suite: Mayfair, London
            </p>

            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#AAAAAA] block mb-2.5 font-medium">
                FOLLOW THE JOURNEY
              </span>
              <div className="flex space-x-3 text-[#CCCCCC]">
                {/* Instagram SVG */}
                <a
                  href="#instagram"
                  className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#B89B67] hover:text-white transition-colors flex items-center justify-center"
                  aria-label="Lomaraa on Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* LinkedIn SVG */}
                <a
                  href="#linkedin"
                  className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#B89B67] hover:text-white transition-colors flex items-center justify-center"
                  aria-label="Lomaraa on LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                {/* YouTube SVG */}
                <a
                  href="#youtube"
                  className="w-8 h-8 rounded-full bg-[#222222] hover:bg-[#B89B67] hover:text-white transition-colors flex items-center justify-center"
                  aria-label="Lomaraa on YouTube"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Payment Badges & Compliance */}
        <div className="pt-8 border-t border-[#262626] flex flex-col md:flex-row justify-between items-center text-[11px] text-[#777777] tracking-wider gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span>&copy; 2026 LOMARAA COUTURE &amp; READY-TO-WEAR INC. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <Globe size={12} className="text-[#B89B67]" />
              INDIA / INR (₹)
            </span>
          </div>

          {/* Payment Badges */}
          <div className="flex items-center space-x-3 text-[10px] text-[#AAAAAA]">
            <span className="px-2 py-1 bg-[#1F1F1F] rounded-xs border border-[#333333]">VISA</span>
            <span className="px-2 py-1 bg-[#1F1F1F] rounded-xs border border-[#333333]">MASTERCARD</span>
            <span className="px-2 py-1 bg-[#1F1F1F] rounded-xs border border-[#333333]">AMEX</span>
            <span className="px-2 py-1 bg-[#1F1F1F] rounded-xs border border-[#333333]">UPI / RUPAY</span>
            <span className="px-2 py-1 bg-[#1F1F1F] rounded-xs border border-[#333333]">APPLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
