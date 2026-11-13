import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  MapPin,
  Shield,
  LogOut,
  Crown,
  Edit2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";

export const AccountPage = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout, isAdmin } = useAuth();
  const { orders, wishlist, addresses, showToast } = useShop();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "Aarav Sharma",
    email: user?.email || "aarav@lomaraa.com",
    phone: user?.phone || "+91 98200 12345",
    genderPref: "Men",
    preferredSize: "M",
    fitPref: "Modern Tailored"
  });

  const [marketingEmail, setMarketingEmail] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    });
    setIsEditing(false);
    showToast("Profile details updated successfully.");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs tracking-widest uppercase text-[#888888] mb-6">
          <Link to="/" className="hover:text-[#111111]">Home</Link>
          <span>/</span>
          <span className="text-[#111111] font-semibold">My Account</span>
        </div>

        {/* User Profile Header Card */}
        <div className="bg-white border border-[#E8E5DF] p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#111111] text-[#B89B67] flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#B89B67]/40 shadow-xs">
              {user?.name ? user.name.charAt(0) : "A"}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl sm:text-3xl text-[#111111] font-medium">
                  {user?.name || "Aarav Sharma"}
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2.5 py-0.5 bg-[#FAF1E4] text-[#B89B67] border border-[#B89B67]/30 font-semibold">
                  <Crown size={12} />
                  {user?.tier || "Atelier Privé VIP"}
                </span>
              </div>
              <p className="text-xs text-[#666666] mt-1">
                {user?.email || "aarav@lomaraa.com"} • {user?.phone || "+91 98200 12345"}
              </p>
              <p className="text-[11px] text-[#888888] mt-0.5">
                Member since {user?.memberSince || "January 2026"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2 bg-[#B89B67] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#a38755] transition-colors flex items-center gap-1.5"
              >
                <Shield size={14} />
                <span>Admin Dashboard</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-[#E8E5DF] hover:border-[#111111] text-xs uppercase tracking-wider text-[#444444] hover:text-[#111111] transition-colors flex items-center gap-1.5"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Link
            to="/orders"
            className="bg-white border border-[#E8E5DF] p-5 hover:border-[#111111] transition-all group"
          >
            <div className="flex items-center justify-between">
              <ShoppingBag size={20} className="text-[#111111] group-hover:text-[#B89B67] transition-colors" />
              <span className="text-xs font-bold text-[#111111] bg-[#FAF8F5] px-2 py-0.5">
                {orders.length}
              </span>
            </div>
            <h3 className="font-serif text-sm text-[#111111] mt-3 font-medium">Orders</h3>
            <p className="text-[11px] text-[#777777] mt-0.5">Track &amp; manage purchases</p>
          </Link>

          <Link
            to="/wishlist"
            className="bg-white border border-[#E8E5DF] p-5 hover:border-[#111111] transition-all group"
          >
            <div className="flex items-center justify-between">
              <Heart size={20} className="text-[#111111] group-hover:text-[#B89B67] transition-colors" />
              <span className="text-xs font-bold text-[#111111] bg-[#FAF8F5] px-2 py-0.5">
                {wishlist.length}
              </span>
            </div>
            <h3 className="font-serif text-sm text-[#111111] mt-3 font-medium">Saved Items</h3>
            <p className="text-[11px] text-[#777777] mt-0.5">Your personal wishlist</p>
          </Link>

          <Link
            to="/addresses"
            className="bg-white border border-[#E8E5DF] p-5 hover:border-[#111111] transition-all group"
          >
            <div className="flex items-center justify-between">
              <MapPin size={20} className="text-[#111111] group-hover:text-[#B89B67] transition-colors" />
              <span className="text-xs font-bold text-[#111111] bg-[#FAF8F5] px-2 py-0.5">
                {addresses.length}
              </span>
            </div>
            <h3 className="font-serif text-sm text-[#111111] mt-3 font-medium">Addresses</h3>
            <p className="text-[11px] text-[#777777] mt-0.5">Delivery addresses</p>
          </Link>

          <Link
            to="/cart"
            className="bg-white border border-[#E8E5DF] p-5 hover:border-[#111111] transition-all group"
          >
            <div className="flex items-center justify-between">
              <ShoppingBag size={20} className="text-[#111111] group-hover:text-[#B89B67] transition-colors" />
              <span className="text-xs font-bold text-[#111111] bg-[#FAF8F5] px-2 py-0.5">
                Bag
              </span>
            </div>
            <h3 className="font-serif text-sm text-[#111111] mt-3 font-medium">Shopping Bag</h3>
            <p className="text-[11px] text-[#777777] mt-0.5">Checkout your wardrobe</p>
          </Link>
        </div>

        {/* Profile & Sartorial Preferences Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Personal Details */}
          <div className="lg:col-span-7 bg-white border border-[#E8E5DF] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E5DF]">
              <div>
                <h2 className="font-serif text-lg text-[#111111]">Personal Details</h2>
                <p className="text-xs text-[#777777] mt-0.5">Manage your identity and contact information</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs uppercase tracking-wider text-[#B89B67] hover:underline font-semibold flex items-center gap-1"
              >
                <Edit2 size={13} />
                <span>{isEditing ? "Cancel" : "Edit"}</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-xs text-[#555555] block mb-1">Full Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white disabled:bg-[#FAF8F5] disabled:text-[#777777] focus:outline-hidden focus:border-[#111111]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#555555] block mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white disabled:bg-[#FAF8F5] disabled:text-[#777777] focus:outline-hidden focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#555555] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white disabled:bg-[#FAF8F5] disabled:text-[#777777] focus:outline-hidden focus:border-[#111111]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs text-[#555555] block mb-1">Preferred Department</label>
                  <select
                    disabled={!isEditing}
                    value={formData.genderPref}
                    onChange={(e) => setFormData({ ...formData, genderPref: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white disabled:bg-[#FAF8F5] disabled:text-[#777777] focus:outline-hidden focus:border-[#111111]"
                  >
                    <option value="Men">Men's Wardrobe</option>
                    <option value="Women">Women's Wardrobe</option>
                    <option value="Both">Both / Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#555555] block mb-1">Standard Size</label>
                  <select
                    disabled={!isEditing}
                    value={formData.preferredSize}
                    onChange={(e) => setFormData({ ...formData, preferredSize: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E8E5DF] bg-white disabled:bg-[#FAF8F5] disabled:text-[#777777] focus:outline-hidden focus:border-[#111111]"
                  >
                    <option value="XS">XS - Extra Small</option>
                    <option value="S">S - Small</option>
                    <option value="M">M - Medium</option>
                    <option value="L">L - Large</option>
                    <option value="XL">XL - Extra Large</option>
                  </select>
                </div>
              </div>

              {isEditing && (
                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Preferences & Security */}
          <div className="lg:col-span-5 space-y-6">
            {/* VIP Concierge Membership Card */}
            <div className="bg-[#111111] text-white p-6 border border-[#222222] relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B67] font-semibold">
                  PRIVILEGE PROGRAM
                </span>
                <h3 className="font-serif text-xl">Lomaraa Atelier Privé</h3>
                <p className="text-xs text-[#CCCCCC] leading-relaxed">
                  As a Privé Member, you enjoy complimentary express shipping on all orders, private previews of seasonal capsule collections, and bespoke styling advice.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-[#B89B67] border-t border-white/10">
                  <span>Points Balance: 1,480 Pts</span>
                  <Link to="/shop" className="hover:underline">Redeem Privileges →</Link>
                </div>
              </div>
            </div>

            {/* Notifications & Communications */}
            <div className="bg-white border border-[#E8E5DF] p-6 space-y-4">
              <h3 className="font-serif text-base text-[#111111] pb-2 border-b border-[#E8E5DF]">
                Communication Preferences
              </h3>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-[#111111]">Editorial Capsule Releases</p>
                  <p className="text-[#777777] text-[11px]">Invitations to new drops &amp; atelier stories</p>
                </div>
                <input
                  type="checkbox"
                  checked={marketingEmail}
                  onChange={(e) => setMarketingEmail(e.target.checked)}
                  className="accent-[#111111] w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <div>
                  <p className="font-medium text-[#111111]">Order &amp; Tracking SMS</p>
                  <p className="text-[#777777] text-[11px]">Real-time courier dispatch status</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="accent-[#111111] w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
