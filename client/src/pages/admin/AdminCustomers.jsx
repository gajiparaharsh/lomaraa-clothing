import React, { useState } from "react";
import { Search, Crown, X } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { formatINR } from "../../data/products";

export const AdminCustomers = () => {
  const { customers } = useShop();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter((c) => {
    if (selectedTier !== "all" && c.tier !== selectedTier) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchEmail = c.email.toLowerCase().includes(q);
      const matchPhone = c.phone?.toLowerCase().includes(q);
      return matchName || matchEmail || matchPhone;
    }
    return true;
  });

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E5DF]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B67] font-bold">
            CLIENT ATELIER CRM
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold mt-1">
            Patron &amp; Customer Directory
          </h1>
          <p className="text-xs text-[#666666] mt-1">
            Maintain customer relationships, loyalty tiers and bespoke styling preferences.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Registered Patrons</span>
          <span className="font-serif text-xl font-bold text-[#111111] mt-1 block">
            {customers.length + 84}
          </span>
        </div>
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">VIP Privé Members</span>
          <span className="font-serif text-xl font-bold text-[#B89B67] mt-1 block">
            42 Patrons
          </span>
        </div>
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Average Order Value</span>
          <span className="font-serif text-xl font-bold text-[#111111] mt-1 block">
            ₹18,450
          </span>
        </div>
        <div className="bg-white p-4 border border-[#E8E5DF]">
          <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Customer Retention</span>
          <span className="font-serif text-xl font-bold text-[#2E7D32] mt-1 block">
            78.4%
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-[#E8E5DF] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
          <input
            type="text"
            placeholder="Search by patron name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
          />
        </div>

        <div className="flex gap-2 text-xs">
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E8E5DF] focus:outline-hidden focus:border-[#111111]"
          >
            <option value="all">All Membership Tiers</option>
            <option value="Atelier Privé VIP">Atelier Privé VIP</option>
            <option value="Diamond Patron">Diamond Patron</option>
            <option value="Classic Member">Classic Member</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-[#E8E5DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#888888] uppercase tracking-wider text-[10px] border-b border-[#E8E5DF]">
              <tr>
                <th className="py-3.5 px-4">Patron Name</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Membership Tier</th>
                <th className="py-3.5 px-4">Orders Placed</th>
                <th className="py-3.5 px-4">Lifetime Spend</th>
                <th className="py-3.5 px-4">Member Since</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE6]">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#111111] text-[#B89B67] flex items-center justify-center font-bold text-xs shrink-0">
                        {cust.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-[#111111]">{cust.name}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="text-[#333333]">{cust.email}</p>
                    <p className="text-[11px] text-[#777777] mt-0.5">{cust.phone}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#FAF1E4] text-[#B89B67] border border-[#B89B67]/30 font-bold">
                      <Crown size={10} />
                      {cust.tier}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-[#111111]">
                    {cust.ordersCount} orders
                  </td>

                  <td className="py-3.5 px-4 font-bold text-[#111111]">
                    {formatINR(cust.totalSpent)}
                  </td>

                  <td className="py-3.5 px-4 text-[#777777]">
                    {cust.joinedDate}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(cust)}
                      className="text-xs uppercase tracking-wider text-[#B89B67] hover:underline font-semibold"
                    >
                      Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Inspection Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 border border-[#E8E5DF] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E5DF] pb-3">
              <h3 className="font-serif text-lg text-[#111111]">Patron Portfolio</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-[#888888] hover:text-[#111111]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center space-x-4 pt-1">
              <div className="w-14 h-14 rounded-full bg-[#111111] text-[#B89B67] flex items-center justify-center font-serif text-xl font-bold">
                {selectedCustomer.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-serif text-base text-[#111111] font-semibold">{selectedCustomer.name}</h4>
                <p className="text-xs text-[#777777]">{selectedCustomer.email}</p>
                <span className="inline-block mt-1 text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#FAF1E4] text-[#B89B67] font-semibold">
                  {selectedCustomer.tier}
                </span>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-3 text-xs space-y-1.5 border border-[#E8E5DF]">
              <div className="flex justify-between text-[#666666]">
                <span>Total Orders:</span>
                <span className="font-bold text-[#111111]">{selectedCustomer.ordersCount}</span>
              </div>
              <div className="flex justify-between text-[#666666]">
                <span>Total Value Acquired:</span>
                <span className="font-bold text-[#111111]">{formatINR(selectedCustomer.totalSpent)}</span>
              </div>
              <div className="flex justify-between text-[#666666]">
                <span>Phone:</span>
                <span className="text-[#111111]">{selectedCustomer.phone}</span>
              </div>
              <div className="flex justify-between text-[#666666]">
                <span>Customer Status:</span>
                <span className="text-[#2E7D32] font-semibold">{selectedCustomer.status}</span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-[#E8E5DF]">
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
