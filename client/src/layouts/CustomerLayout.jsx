import React from "react";
import { Outlet } from "react-router-dom";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CartDrawer from "../components/layout/CartDrawer";
import SearchModal from "../components/layout/SearchModal";
import QuickViewModal from "../components/products/QuickViewModal";
import Toast from "../components/layout/Toast";
import ScrollToTop from "../components/common/ScrollToTop";

export const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#222222] font-sans selection:bg-[#B89B67] selection:text-white">
      <ScrollToTop />
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navigation */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <Toast />
    </div>
  );
};

export default CustomerLayout;

