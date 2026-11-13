import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FolderTree,
  ShoppingBag,
  Users,
  Boxes,
  TicketPercent,
  BarChart3,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/layout/Toast";
import ScrollToTop from "../components/common/ScrollToTop";

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", to: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Products", to: "/admin/products", icon: Package },
    { label: "Add Product", to: "/admin/products/new", icon: PlusCircle },
    { label: "Categories", to: "/admin/categories", icon: FolderTree },
    { label: "Orders", to: "/admin/orders", icon: ShoppingBag },
    { label: "Customers", to: "/admin/customers", icon: Users },
    { label: "Inventory", to: "/admin/inventory", icon: Boxes },
    { label: "Coupons", to: "/admin/coupons", icon: TicketPercent },
    { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", to: "/admin/settings", icon: Settings }
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col font-sans text-[#222222] selection:bg-[#B89B67] selection:text-white">
      <ScrollToTop />
      {/* Top Admin Header */}
      <header className="h-16 bg-[#111111] text-white flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-[#222222] sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-1.5 text-white/80 hover:text-white"
            aria-label="Toggle sidebar"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/admin" className="flex items-center space-x-2">
            <span className="font-serif text-lg tracking-[0.25em] font-bold text-white">
              LOMARAA
            </span>
            <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-[#B89B67] text-white font-semibold">
              ADMIN
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6 text-xs">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 border border-white/20 hover:border-white text-white/90 hover:text-white tracking-wider uppercase transition-colors"
          >
            <span>VIEW STORE</span>
            <ExternalLink size={12} />
          </Link>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#B89B67] text-white font-serif flex items-center justify-center font-bold text-xs shadow-xs">
              {user?.name ? user.name.charAt(0) : "A"}
            </div>
            <div className="hidden md:block text-left">
              <p className="font-medium text-white tracking-wide">{user?.name || "Administrator"}</p>
              <p className="text-[10px] text-[#A59D90] tracking-wider uppercase">{user?.role || "Super Admin"}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#E8E5DF] sticky top-16 h-[calc(100vh-4rem)]">
          <div className="p-4 border-b border-[#F0EDE6]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#888888] font-semibold">
              MANAGEMENT CONSOLE
            </p>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 text-xs font-medium tracking-wider uppercase transition-all rounded-xs ${
                      isActive
                        ? "bg-[#111111] text-white shadow-xs font-semibold"
                        : "text-[#555555] hover:bg-[#F5F1E8] hover:text-[#111111]"
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={16} strokeWidth={1.8} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={12} className="opacity-40" />
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#E8E5DF] space-y-2">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xs text-[#717171] hover:text-[#111111] tracking-wider uppercase py-1"
            >
              <ExternalLink size={13} />
              <span>Back to Storefront</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-xs text-red-600 hover:text-red-700 tracking-wider uppercase py-1 w-full text-left cursor-pointer"
            >
              <LogOut size={13} />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl flex flex-col justify-between border-r border-[#E8E5DF] z-50 animate-fade-in">
              <div>
                <div className="p-4 border-b border-[#E8E5DF] flex justify-between items-center bg-[#111111] text-white">
                  <span className="font-serif tracking-[0.2em] font-bold">LOMARAA ADMIN</span>
                  <button onClick={() => setMobileSidebarOpen(false)}>
                    <X size={18} />
                  </button>
                </div>
                <nav className="p-3 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.label}
                        to={item.to}
                        end={item.exact}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3.5 py-2.5 text-xs font-medium tracking-wider uppercase transition-all ${
                            isActive
                              ? "bg-[#111111] text-white"
                              : "text-[#555555] hover:bg-[#F5F1E8]"
                          }`
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <Icon size={16} />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight size={12} className="opacity-40" />
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              <div className="p-4 border-t border-[#E8E5DF] space-y-2">
                <Link
                  to="/"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center space-x-2 text-xs text-[#717171] tracking-wider uppercase py-1"
                >
                  <ExternalLink size={13} />
                  <span>Back to Storefront</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-xs text-red-600 tracking-wider uppercase py-1 w-full text-left cursor-pointer"
                >
                  <LogOut size={13} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Admin Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <Toast />
    </div>
  );
};

export default AdminLayout;
