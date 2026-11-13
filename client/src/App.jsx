import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import { AuthProvider } from "./context/AuthContext";

// Layouts
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";

// Customer Pages (Screens 01 - 16)
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Men from "./pages/Men";
import Women from "./pages/Women";
import ProductDetails from "./pages/ProductDetails";
import SearchPage from "./pages/SearchPage";
import FilterPage from "./pages/FilterPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AddressPage from "./pages/AddressPage";
import PaymentPage from "./pages/PaymentPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrdersPage from "./pages/OrdersPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import AccountPage from "./pages/AccountPage";

// Authentication Pages (Screens 17 - 20)
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Admin Dashboard Pages (Screens 21 - 30)
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

export function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <Router>
          <Routes>
            {/* Customer Website Routes (Screens 01 - 20) */}
            <Route element={<CustomerLayout />}>
              {/* Screen 01: Homepage */}
              <Route path="/" element={<Home />} />

              {/* Screen 02: Shop All Products */}
              <Route path="/shop" element={<Shop />} />

              {/* Screen 03: Men's Wardrobe */}
              <Route path="/men" element={<Men />} />

              {/* Screen 04: Women's Wardrobe */}
              <Route path="/women" element={<Women />} />

              {/* Screen 05: Product Details */}
              <Route path="/product/:slug" element={<ProductDetails />} />

              {/* Screen 06: Search Page */}
              <Route path="/search" element={<SearchPage />} />

              {/* Screen 07: Filter & Sort */}
              <Route path="/filters" element={<FilterPage />} />

              {/* Screen 08: Wishlist */}
              <Route path="/wishlist" element={<WishlistPage />} />

              {/* Screen 09: Shopping Bag */}
              <Route path="/cart" element={<CartPage />} />

              {/* Screen 10: Checkout */}
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Screen 11: Address Management */}
              <Route path="/addresses" element={<AddressPage />} />

              {/* Screen 12: Payment */}
              <Route path="/payment" element={<PaymentPage />} />

              {/* Screen 13: Order Confirmation */}
              <Route path="/order-success" element={<OrderSuccessPage />} />

              {/* Screen 14: My Orders */}
              <Route path="/orders" element={<OrdersPage />} />

              {/* Screen 15: Order Tracking */}
              <Route path="/track-order" element={<OrderTrackingPage />} />
              <Route path="/track-order/:orderId" element={<OrderTrackingPage />} />

              {/* Screen 16: My Account */}
              <Route path="/account" element={<AccountPage />} />

              {/* Screen 17: Login */}
              <Route path="/login" element={<LoginPage />} />

              {/* Screen 18: Register */}
              <Route path="/register" element={<RegisterPage />} />

              {/* Screen 19: Forgot Password */}
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Screen 20: Reset Password */}
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            {/* Admin Dashboard Routes (Screens 21 - 30) */}
            <Route path="/admin" element={<AdminLayout />}>
              {/* Screen 21: Executive Dashboard */}
              <Route index element={<AdminDashboard />} />

              {/* Screen 22: Product Management */}
              <Route path="products" element={<AdminProducts />} />

              {/* Screen 23: Add / Edit Product */}
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/edit/:id" element={<AdminProductForm />} />

              {/* Screen 24: Category Management */}
              <Route path="categories" element={<AdminCategories />} />

              {/* Screen 25: Order Management */}
              <Route path="orders" element={<AdminOrders />} />

              {/* Screen 26: Customer Management */}
              <Route path="customers" element={<AdminCustomers />} />

              {/* Screen 27: Inventory Management */}
              <Route path="inventory" element={<AdminInventory />} />

              {/* Screen 28: Coupon Management */}
              <Route path="coupons" element={<AdminCoupons />} />

              {/* Screen 29: Sales Analytics */}
              <Route path="analytics" element={<AdminAnalytics />} />

              {/* Screen 30: Admin Settings */}
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;
