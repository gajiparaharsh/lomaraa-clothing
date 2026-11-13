import React, { useState } from "react";
import {
  Save,
  CheckCircle2
} from "lucide-react";
import { useShop } from "../../context/ShopContext";

export const AdminSettings = () => {
  const { showToast } = useShop();

  const [settings, setSettings] = useState({
    storeName: "LOMARAA",
    tagline: "ELEVATE YOUR EVERYDAY.",
    conciergeEmail: "concierge@lomaraa.com",
    conciergePhone: "+91 98200 88000",
    atelierAddress: "Signature Bay Towers, Marine Drive, Mumbai - 400021",
    currency: "INR (₹)",
    taxRate: 12, // 12% GST
    freeShippingThreshold: 5000,
    shippingFee: 350,
    razorpayKeyId: "rzp_test_9X8841a0Lomaraa",
    razorpaySecret: "••••••••••••••••••••••••",
    enableCod: true,
    enableRazorpay: true,
    mongoDbUri: "mongodb+srv://lomaraa:••••••••@cluster0.mongodb.net/lomaraa_db",
    cloudinaryCloudName: "lomaraa-atelier"
  });

  const [activeTab, setActiveTab] = useState("general");

  const handleSave = (e) => {
    e.preventDefault();
    showToast("Store settings saved successfully.");
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DF]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B67] font-bold">
            STORE CONFIGURATION
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold mt-1">
            System &amp; Atelier Settings
          </h1>
          <p className="text-xs text-[#666666] mt-1">
            Configure global store parameters, Razorpay integrations, GST taxation and logistics.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Save size={14} />
          <span>Save Configuration</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8E5DF] space-x-6 text-xs uppercase tracking-wider font-medium">
        <button
          onClick={() => setActiveTab("general")}
          className={`pb-3 transition-colors ${
            activeTab === "general"
              ? "border-b-2 border-[#111111] text-[#111111] font-bold"
              : "text-[#777777] hover:text-[#111111]"
          }`}
        >
          Brand &amp; Identity
        </button>
        <button
          onClick={() => setActiveTab("taxes")}
          className={`pb-3 transition-colors ${
            activeTab === "taxes"
              ? "border-b-2 border-[#111111] text-[#111111] font-bold"
              : "text-[#777777] hover:text-[#111111]"
          }`}
        >
          Taxes &amp; Logistics
        </button>
        <button
          onClick={() => setActiveTab("payments")}
          className={`pb-3 transition-colors ${
            activeTab === "payments"
              ? "border-b-2 border-[#111111] text-[#111111] font-bold"
              : "text-[#777777] hover:text-[#111111]"
          }`}
        >
          Payment Gateways
        </button>
        <button
          onClick={() => setActiveTab("infrastructure")}
          className={`pb-3 transition-colors ${
            activeTab === "infrastructure"
              ? "border-b-2 border-[#111111] text-[#111111] font-bold"
              : "text-[#777777] hover:text-[#111111]"
          }`}
        >
          Database &amp; APIs
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: General Brand */}
        {activeTab === "general" && (
          <div className="bg-white p-6 border border-[#E8E5DF] space-y-4">
            <h2 className="font-serif text-base text-[#111111] font-semibold pb-3 border-b border-[#F0EDE6]">
              Maison Identity &amp; Contact Coordinates
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[#555555] block mb-1">Maison Brand Name</label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8E5DF] font-semibold"
                />
              </div>

              <div>
                <label className="text-[#555555] block mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8E5DF]"
                />
              </div>

              <div>
                <label className="text-[#555555] block mb-1">Client Concierge Email</label>
                <input
                  type="email"
                  value={settings.conciergeEmail}
                  onChange={(e) => setSettings({ ...settings, conciergeEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8E5DF]"
                />
              </div>

              <div>
                <label className="text-[#555555] block mb-1">Concierge WhatsApp / Hotline</label>
                <input
                  type="text"
                  value={settings.conciergePhone}
                  onChange={(e) => setSettings({ ...settings, conciergePhone: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8E5DF]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[#555555] block mb-1">Flagship Atelier Location</label>
                <input
                  type="text"
                  value={settings.atelierAddress}
                  onChange={(e) => setSettings({ ...settings, atelierAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8E5DF]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Taxes & Logistics */}
        {activeTab === "taxes" && (
          <div className="bg-white p-6 border border-[#E8E5DF] space-y-4">
            <h2 className="font-serif text-base text-[#111111] font-semibold pb-3 border-b border-[#F0EDE6]">
              Indian Taxation &amp; Courier Logistics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-[#555555] block mb-1">Goods &amp; Services Tax (GST %)</label>
                <input
                  type="number"
                  min={0}
                  max={28}
                  value={settings.taxRate}
                  onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-[#E8E5DF] font-semibold"
                />
                <p className="text-[10px] text-[#888888] mt-1">Standard 12% apparel rate applies.</p>
              </div>

              <div>
                <label className="text-[#555555] block mb-1">Complimentary Shipping Threshold (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={settings.freeShippingThreshold}
                  onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-[#E8E5DF] font-semibold"
                />
                <p className="text-[10px] text-[#888888] mt-1">Orders exceeding this receive free delivery.</p>
              </div>

              <div>
                <label className="text-[#555555] block mb-1">Standard Courier Fee (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={settings.shippingFee}
                  onChange={(e) => setSettings({ ...settings, shippingFee: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-[#E8E5DF] font-semibold"
                />
                <p className="text-[10px] text-[#888888] mt-1">Applied for orders under threshold.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Payments */}
        {activeTab === "payments" && (
          <div className="bg-white p-6 border border-[#E8E5DF] space-y-4">
            <h2 className="font-serif text-base text-[#111111] font-semibold pb-3 border-b border-[#F0EDE6]">
              Razorpay Payment Gateway Integration
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[#555555] block mb-1">Razorpay Key ID</label>
                <input
                  type="text"
                  value={settings.razorpayKeyId}
                  onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8E5DF] font-mono"
                />
              </div>

              <div>
                <label className="text-[#555555] block mb-1">Razorpay Key Secret</label>
                <input
                  type="password"
                  value={settings.razorpaySecret}
                  onChange={(e) => setSettings({ ...settings, razorpaySecret: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8E5DF] font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#F0EDE6] space-y-2 text-xs">
              <label className="flex items-center space-x-2 text-[#444444] cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableRazorpay}
                  onChange={(e) => setSettings({ ...settings, enableRazorpay: e.target.checked })}
                  className="accent-[#111111] w-4 h-4"
                />
                <span className="font-medium">Enable Razorpay UPI, Cards &amp; Net Banking</span>
              </label>

              <label className="flex items-center space-x-2 text-[#444444] cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableCod}
                  onChange={(e) => setSettings({ ...settings, enableCod: e.target.checked })}
                  className="accent-[#111111] w-4 h-4"
                />
                <span className="font-medium">Enable Doorstep Cash on Delivery (COD)</span>
              </label>
            </div>
          </div>
        )}

        {/* Tab 4: Infrastructure */}
        {activeTab === "infrastructure" && (
          <div className="bg-white p-6 border border-[#E8E5DF] space-y-4">
            <h2 className="font-serif text-base text-[#111111] font-semibold pb-3 border-b border-[#F0EDE6]">
              Database &amp; Cloud Asset Storage Connectivity
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[#555555] block mb-1">MongoDB Atlas Connection String</label>
                <input
                  type="text"
                  value={settings.mongoDbUri}
                  onChange={(e) => setSettings({ ...settings, mongoDbUri: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8E5DF] font-mono"
                />
                <p className="text-[10px] text-[#2E7D32] mt-1 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Connected: Primary Replica Set (Mumbai Region)
                </p>
              </div>

              <div>
                <label className="text-[#555555] block mb-1">Cloudinary Cloud Name</label>
                <input
                  type="text"
                  value={settings.cloudinaryCloudName}
                  onChange={(e) => setSettings({ ...settings, cloudinaryCloudName: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8E5DF] font-mono"
                />
                <p className="text-[10px] text-[#2E7D32] mt-1 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Connected: CDN Auto-Optimization Active
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors"
          >
            Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
