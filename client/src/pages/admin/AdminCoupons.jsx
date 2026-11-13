import React, { useState } from "react";
import { PlusCircle, Trash2, X } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { formatINR } from "../../data/products";

export const AdminCoupons = () => {
  const { coupons, addCoupon, deleteCoupon, toggleCouponStatus } = useShop();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountPercent: 15,
    minPurchase: 3000,
    maxDiscount: 2000,
    flatDiscount: 0,
    type: "percent"
  });

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;

    addCoupon({
      code: newCoupon.code.toUpperCase().trim(),
      discountPercent: newCoupon.type === "percent" ? Number(newCoupon.discountPercent) : null,
      flatDiscount: newCoupon.type === "flat" ? Number(newCoupon.flatDiscount) : null,
      minPurchase: Number(newCoupon.minPurchase) || 0,
      maxDiscount: newCoupon.type === "percent" ? Number(newCoupon.maxDiscount) : null,
      active: true,
      usageCount: 0
    });

    setIsModalOpen(false);
    setNewCoupon({
      code: "",
      discountPercent: 15,
      minPurchase: 3000,
      maxDiscount: 2000,
      flatDiscount: 0,
      type: "percent"
    });
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DF]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B67] font-bold">
            PROMOTIONS &amp; PRIVILEGES
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold mt-1">
            Coupon &amp; Voucher Management
          </h1>
          <p className="text-xs text-[#666666] mt-1">
            Issue seasonal promotional campaigns, VIP vouchers and threshold discounts.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <PlusCircle size={14} />
          <span>Create Promotional Code</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Active Vouchers</span>
          <span className="font-serif text-xl font-bold text-[#111111] mt-1 block">
            {coupons.filter((c) => c.active).length} Active
          </span>
        </div>
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Total Redemptions</span>
          <span className="font-serif text-xl font-bold text-[#B89B67] mt-1 block">
            {coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0)} Orders
          </span>
        </div>
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Total Disbursed Value</span>
          <span className="font-serif text-xl font-bold text-[#2E7D32] mt-1 block">
            ₹82,450
          </span>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white border border-[#E8E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#888888] uppercase tracking-wider text-[10px] border-b border-[#E8E5DF]">
              <tr>
                <th className="py-3.5 px-4">Coupon Code</th>
                <th className="py-3.5 px-4">Discount Value</th>
                <th className="py-3.5 px-4">Min. Order Threshold</th>
                <th className="py-3.5 px-4">Max Cap</th>
                <th className="py-3.5 px-4">Redemptions</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE6]">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-[#111111] bg-[#FAF8F5] px-2.5 py-1 border border-[#E8E5DF] tracking-wider">
                      {c.code}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-[#111111]">
                    {c.discountPercent ? `${c.discountPercent}% Off` : formatINR(c.flatDiscount) + " Flat"}
                  </td>

                  <td className="py-3.5 px-4 text-[#555555]">
                    {c.minPurchase ? formatINR(c.minPurchase) : "No minimum"}
                  </td>

                  <td className="py-3.5 px-4 text-[#555555]">
                    {c.maxDiscount ? formatINR(c.maxDiscount) : "No cap"}
                  </td>

                  <td className="py-3.5 px-4 text-[#555555]">
                    {c.usageCount || 0} times
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() => toggleCouponStatus(c.code)}
                      className={`text-[9px] uppercase tracking-wider px-2 py-0.5 font-bold cursor-pointer ${
                        c.active
                          ? "bg-[#E8F5E9] text-[#2E7D32]"
                          : "bg-[#FFEBEE] text-[#C62828]"
                      }`}
                    >
                      {c.active ? "Active" : "Disabled"}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => deleteCoupon(c.code)}
                      className="p-1.5 text-[#888888] hover:text-[#C62828] transition-colors"
                      title="Delete Coupon"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 border border-[#E8E5DF] shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-3">
              <h3 className="font-serif text-lg text-[#111111]">Create Promotional Voucher</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#888888] hover:text-[#111111]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div>
                <label className="text-[#555555] block mb-1">Coupon Code (Uppercase) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SUMMER15"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8E5DF] font-mono uppercase tracking-wider focus:outline-hidden focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="text-[#555555] block mb-1">Discount Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      checked={newCoupon.type === "percent"}
                      onChange={() => setNewCoupon({ ...newCoupon, type: "percent" })}
                      className="accent-[#111111]"
                    />
                    <span>Percentage (%)</span>
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      checked={newCoupon.type === "flat"}
                      onChange={() => setNewCoupon({ ...newCoupon, type: "flat" })}
                      className="accent-[#111111]"
                    />
                    <span>Flat Amount (₹)</span>
                  </label>
                </div>
              </div>

              {newCoupon.type === "percent" ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#555555] block mb-1">Discount Percentage (%)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      value={newCoupon.discountPercent}
                      onChange={(e) => setNewCoupon({ ...newCoupon, discountPercent: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E8E5DF]"
                    />
                  </div>
                  <div>
                    <label className="text-[#555555] block mb-1">Max Cap (INR ₹)</label>
                    <input
                      type="number"
                      min={0}
                      value={newCoupon.maxDiscount}
                      onChange={(e) => setNewCoupon({ ...newCoupon, maxDiscount: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E8E5DF]"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-[#555555] block mb-1">Flat Discount (INR ₹)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newCoupon.flatDiscount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, flatDiscount: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E8E5DF]"
                  />
                </div>
              )}

              <div>
                <label className="text-[#555555] block mb-1">Minimum Order Amount (INR ₹)</label>
                <input
                  type="number"
                  min={0}
                  value={newCoupon.minPurchase}
                  onChange={(e) => setNewCoupon({ ...newCoupon, minPurchase: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8E5DF]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-[#E8E5DF]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#E8E5DF] uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#111111] text-white uppercase tracking-wider font-semibold hover:bg-black"
                >
                  Publish Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;
