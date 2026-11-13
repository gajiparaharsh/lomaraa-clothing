import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit2, Trash2, Home, Building2 } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";

export const AddressPage = () => {
  const { user } = useAuth();
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useShop();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    street: "",
    landmark: "",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    type: "Home",
    isDefault: false
  });

  const openAddModal = () => {
    setEditingAddress(null);
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      street: "",
      landmark: "",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      type: "Home",
      isDefault: addresses.length === 0
    });
    setIsModalOpen(true);
  };

  const openEditModal = (addr) => {
    setEditingAddress(addr);
    setFormData({ ...addr });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.street || !formData.pincode) return;

    if (editingAddress) {
      updateAddress(editingAddress.id, formData);
    } else {
      addAddress(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-white min-h-[75vh]">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-4 text-xs tracking-wider uppercase text-[#717171]">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-[#111111]">Home</Link></li>
          <li className="text-[#CCCCCC]">/</li>
          <li><Link to="/account" className="hover:text-[#111111]">Account</Link></li>
          <li className="text-[#CCCCCC]">/</li>
          <li className="text-[#111111] font-semibold">Address Book</li>
        </ol>
      </nav>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-6 border-b border-[#111111] mb-8 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89B67] font-semibold block mb-1">
              CLIENT PROFILE
            </span>
            <h1 className="text-3xl font-serif text-[#111111]">
              Saved Addresses ({addresses.length})
            </h1>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center space-x-2 px-6 py-3 bg-[#111111] hover:bg-[#B89B67] text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
          >
            <Plus size={14} />
            <span>ADD NEW ADDRESS</span>
          </button>
        </div>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-6 border relative flex flex-col justify-between transition-all ${
                addr.isDefault
                  ? "border-[#111111] bg-[#FAF8F5] shadow-xs"
                  : "border-[#E8E5DF] bg-white hover:border-[#CCCCCC]"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    {addr.type === "Office" ? <Building2 size={16} className="text-[#717171]" /> : <Home size={16} className="text-[#717171]" />}
                    <h3 className="font-serif text-base font-semibold text-[#111111]">{addr.name}</h3>
                    <span className="px-2 py-0.5 bg-[#E8E5DF] text-[#444444] text-[9px] uppercase tracking-wider font-medium">
                      {addr.type}
                    </span>
                  </div>

                  {addr.isDefault && (
                    <span className="text-[10px] font-semibold text-[#B89B67] tracking-wider uppercase border border-[#B89B67]/40 px-2 py-0.5 bg-white">
                      DEFAULT DESTINATION
                    </span>
                  )}
                </div>

                <div className="text-xs text-[#555555] leading-relaxed space-y-1">
                  <p>{addr.street}</p>
                  {addr.landmark && <p className="text-[#888888]">Landmark: {addr.landmark}</p>}
                  <p>{addr.city}, {addr.state} — <strong>{addr.pincode}</strong></p>
                  <p className="text-[#888888] pt-1">Phone: {addr.phone}</p>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-6 mt-4 border-t border-[#E8E5DF] flex items-center justify-between text-xs">
                <div className="flex space-x-4">
                  <button
                    onClick={() => openEditModal(addr)}
                    className="flex items-center space-x-1 text-[#444444] hover:text-[#111111] uppercase tracking-wider font-medium cursor-pointer"
                  >
                    <Edit2 size={12} />
                    <span>Edit</span>
                  </button>
                  {addresses.length > 1 && (
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700 uppercase tracking-wider font-medium cursor-pointer"
                    >
                      <Trash2 size={12} />
                      <span>Delete</span>
                    </button>
                  )}
                </div>

                {!addr.isDefault && (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-[#B89B67] hover:text-[#111111] text-[11px] tracking-wider uppercase underline cursor-pointer"
                  >
                    Set As Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add / Edit Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white border border-[#E8E5DF] shadow-2xl p-6 sm:p-8 animate-fade-in">
              <h2 className="font-serif text-xl text-[#111111] pb-3 border-b border-[#E8E5DF] mb-5">
                {editingAddress ? "Edit Delivery Address" : "Add New Delivery Address"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#555555] uppercase tracking-wider text-[10px] font-semibold mb-1">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full p-2.5 border border-[#E8E5DF] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[#555555] uppercase tracking-wider text-[10px] font-semibold mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full p-2.5 border border-[#E8E5DF] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[#555555] uppercase tracking-wider text-[10px] font-semibold mb-1">
                    Address (Street / Building / House)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    required
                    className="w-full p-2.5 border border-[#E8E5DF] text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#555555] uppercase tracking-wider text-[10px] font-semibold mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      className="w-full p-2.5 border border-[#E8E5DF] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#555555] uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      required
                      className="w-full p-2.5 border border-[#E8E5DF] text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#555555] uppercase tracking-wider text-[10px] font-semibold mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                      className="w-full p-2.5 border border-[#E8E5DF] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#555555] uppercase tracking-wider text-[10px] font-semibold mb-1">
                      Address Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full p-2.5 border border-[#E8E5DF] text-xs bg-white"
                    >
                      <option value="Home">Home</option>
                      <option value="Office">Office / Studio</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <label className="flex items-center space-x-2 pt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="accent-[#111111]"
                  />
                  <span>Set as default shipping address</span>
                </label>

                <div className="flex justify-end space-x-3 pt-4 border-t border-[#E8E5DF]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 border border-[#CCCCCC] uppercase tracking-wider text-[11px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#111111] hover:bg-[#B89B67] text-white uppercase tracking-wider text-[11px] font-semibold transition-colors"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressPage;
