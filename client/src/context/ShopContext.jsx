import React, { createContext, useContext, useState, useEffect } from "react";
import { products as initialProducts } from "../data/products";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // 1. Dynamic Catalog for Admin CRUD
  const [productList, setProductList] = useState(() => {
    const saved = localStorage.getItem("lomaraa_products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem("lomaraa_products", JSON.stringify(productList));
  }, [productList]);

  // 2. Shopping Bag / Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("lomaraa_cart");
    return saved
      ? JSON.parse(saved)
      : [
          {
            ...initialProducts[0],
            selectedSize: "M",
            selectedColor: initialProducts[0].color,
            quantity: 1
          }
        ];
  });

  useEffect(() => {
    localStorage.setItem("lomaraa_cart", JSON.stringify(cart));
  }, [cart]);

  // 3. Wishlist
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("lomaraa_wishlist");
    return saved ? JSON.parse(saved) : ["lom-001", "lom-003", "lom-009"];
  });

  useEffect(() => {
    localStorage.setItem("lomaraa_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // 4. Coupons
  const [coupons, setCoupons] = useState([
    { code: "LOMARAA10", discountPercent: 10, minPurchase: 3000, maxDiscount: 2500, active: true, usageCount: 142 },
    { code: "FIRST20", discountPercent: 20, minPurchase: 5000, maxDiscount: 4000, active: true, usageCount: 89 },
    { code: "ELEVATE500", flatDiscount: 500, minPurchase: 2500, active: true, usageCount: 231 }
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // 5. Customer Addresses
  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      name: "Aarav Sharma",
      phone: "+91 98200 12345",
      street: "Flat 1402, Signature Bay Towers, Marine Drive",
      landmark: "Near Oberoi Hotel",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400021",
      isDefault: true,
      type: "Home"
    },
    {
      id: "addr-2",
      name: "Aarav Sharma (Studio)",
      phone: "+91 98200 98765",
      street: "Studio 4B, The Mill District, Lower Parel",
      landmark: "Opposite Phoenix Palladium",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400013",
      isDefault: false,
      type: "Office"
    }
  ]);

  // 6. Customer Orders
  const [orders, setOrders] = useState([
    {
      id: "LOM-98241",
      date: "2026-04-10T14:32:00Z",
      status: "Delivered",
      paymentMethod: "Razorpay (UPI)",
      paymentStatus: "Paid",
      trackingNumber: "BD-88421099IN",
      courier: "BlueDart Express",
      estimatedDelivery: "2026-04-13",
      shippingAddress: {
        name: "Aarav Sharma",
        street: "Flat 1402, Signature Bay Towers, Marine Drive",
        city: "Mumbai, Maharashtra - 400021"
      },
      items: [
        {
          ...initialProducts[0],
          selectedSize: "M",
          selectedColor: "Camel Sand",
          quantity: 1,
          price: 24900
        }
      ],
      subtotal: 24900,
      discount: 2490,
      tax: 2689,
      shipping: 0,
      total: 25099
    },
    {
      id: "LOM-98319",
      date: "2026-04-14T09:15:00Z",
      status: "Shipped",
      paymentMethod: "Razorpay (Credit Card)",
      paymentStatus: "Paid",
      trackingNumber: "DLV-9941024IN",
      courier: "Delhivery Air",
      estimatedDelivery: "2026-04-16",
      shippingAddress: {
        name: "Aarav Sharma",
        street: "Flat 1402, Signature Bay Towers, Marine Drive",
        city: "Mumbai, Maharashtra - 400021"
      },
      items: [
        {
          ...initialProducts[8],
          selectedSize: "L",
          selectedColor: "Optic White",
          quantity: 2,
          price: 3490
        },
        {
          ...initialProducts[6],
          selectedSize: "M",
          selectedColor: "Natural Flax",
          quantity: 1,
          price: 6990
        }
      ],
      subtotal: 13970,
      discount: 1000,
      tax: 1556,
      shipping: 0,
      total: 14526
    }
  ]);

  // 7. Categories for Store & Admin
  const [categories, setCategories] = useState([
    { id: "cat-1", name: "Outerwear", count: 4, coverImage: "/images/products/lom-001/front.jpg", active: true },
    { id: "cat-2", name: "Tailoring", count: 3, coverImage: "/images/products/lom-002/front.jpg", active: true },
    { id: "cat-3", name: "Dresses", count: 2, coverImage: "/images/products/lom-003/front.jpg", active: true },
    { id: "cat-4", name: "Shirts", count: 3, coverImage: "/images/products/lom-007/front.jpg", active: true },
    { id: "cat-5", name: "Trousers", count: 2, coverImage: "/images/products/lom-005/front.jpg", active: true },
    { id: "cat-6", name: "T-Shirts", count: 1, coverImage: "/images/products/lom-009/front.jpg", active: true },
    { id: "cat-7", name: "Jeans", count: 1, coverImage: "/images/products/lom-011/front.jpg", active: true },
    { id: "cat-8", name: "Hoodies", count: 1, coverImage: "/images/products/lom-014/front.jpg", active: true },
    { id: "cat-9", name: "Accessories", count: 1, coverImage: "/images/products/lom-006/front.jpg", active: true }
  ]);

  // 8. Customers Directory for Admin
  const [customers] = useState([
    {
      id: "cust-1",
      name: "Aarav Sharma",
      email: "aarav@lomaraa.com",
      phone: "+91 98200 12345",
      ordersCount: 2,
      totalSpent: 39625,
      tier: "Atelier Privé VIP",
      joinedDate: "2026-01-15",
      status: "Active"
    },
    {
      id: "cust-2",
      name: "Meera Kapoor",
      email: "meera.kapoor@outlook.com",
      phone: "+91 98110 54321",
      ordersCount: 4,
      totalSpent: 68400,
      tier: "Diamond Patron",
      joinedDate: "2026-02-01",
      status: "Active"
    },
    {
      id: "cust-3",
      name: "Rohan Singhal",
      email: "rohan.singhal@gmail.com",
      phone: "+91 99300 77889",
      ordersCount: 1,
      totalSpent: 18900,
      tier: "Classic Member",
      joinedDate: "2026-03-22",
      status: "Active"
    }
  ]);

  // Overlays & UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message) => {
    setToastMessage(message);
  };

  // Cart operations
  const addToCart = (product, size = null, color = null) => {
    const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : "Standard");
    const chosenColor = color || product.color || "Standard";

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.id === product.id && i.selectedSize === chosenSize && i.selectedColor === chosenColor
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { ...product, selectedSize: chosenSize, selectedColor: chosenColor, quantity: 1 }];
    });

    showToast(`Added ${product.name} (${chosenSize}) to bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id, size, color) => {
    setCart((prev) =>
      prev.filter((i) => !(i.id === id && i.selectedSize === size && (color ? i.selectedColor === color : true)))
    );
  };

  const updateQuantity = (id, size, delta, color = null) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.selectedSize === size && (color ? item.selectedColor === color : true)) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const cartCount = cart.reduce((total, i) => total + i.quantity, 0);
  const cartSubtotal = cart.reduce((total, i) => total + i.price * i.quantity, 0);
  const freeShippingThreshold = 5000;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Coupon application
  const applyCoupon = (code) => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase().trim() && c.active);
    if (!found) {
      return { success: false, message: "Invalid or inactive promotional code." };
    }
    if (cartSubtotal < found.minPurchase) {
      return { success: false, message: `Minimum purchase of ₹${found.minPurchase} required for this code.` };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied!`);
    return { success: true, message: `Coupon ${found.code} successfully applied.` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Promotional code removed.");
  };

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountPercent
      ? Math.min(appliedCoupon.maxDiscount || Infinity, Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100))
      : appliedCoupon.flatDiscount || 0
    : 0;

  const shippingFee = cartSubtotal === 0 || cartSubtotal >= freeShippingThreshold ? 0 : 350;
  const taxableAmount = Math.max(0, cartSubtotal - discountAmount);
  const taxAmount = Math.round(taxableAmount * 0.12); // 12% GST
  const finalTotal = taxableAmount + taxAmount + shippingFee;

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const isFav = prev.includes(productId);
      if (isFav) {
        showToast("Removed from wishlist.");
        return prev.filter((id) => id !== productId);
      }
      showToast("Saved to personal wishlist.");
      return [...prev, productId];
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Address operations
  const addAddress = (newAddr) => {
    const id = `addr-${Date.now()}`;
    const addressWithId = { ...newAddr, id };
    setAddresses((prev) => {
      if (newAddr.isDefault) {
        return [...prev.map((a) => ({ ...a, isDefault: false })), addressWithId];
      }
      return [...prev, addressWithId];
    });
    showToast("New delivery address saved.");
    return id;
  };

  const updateAddress = (id, updated) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return { ...a, ...updated };
        }
        if (updated.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
    showToast("Address updated.");
  };

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast("Address removed.");
  };

  const setDefaultAddress = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    showToast("Default address updated.");
  };

  // Order operations
  const createOrder = (orderData) => {
    const orderId = `LOM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      status: "Confirmed",
      trackingNumber: `BD-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
      courier: "BlueDart Express",
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      ...orderData
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o))
    );
    showToast(`Order ${orderId} has been cancelled.`);
  };

  const getOrderById = (orderId) => {
    return orders.find((o) => o.id === orderId);
  };

  // Admin Catalog CRUD operations
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: `lom-${String(productList.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString().split("T")[0]
    };
    setProductList((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" added to catalog.`);
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
    showToast(`Product updated successfully.`);
  };

  const deleteProduct = (id) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
    showToast(`Product removed from catalog.`);
  };

  // Admin Coupon operations
  const addCoupon = (couponData) => {
    setCoupons((prev) => [couponData, ...prev]);
    showToast(`Coupon "${couponData.code}" created.`);
  };

  const deleteCoupon = (code) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showToast(`Coupon removed.`);
  };

  const toggleCouponStatus = (code) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
  };

  // Admin Category operations
  const addCategory = (categoryData) => {
    const newCat = {
      id: `cat-${Date.now()}`,
      count: 0,
      active: true,
      ...categoryData
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${newCat.name}" added.`);
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast(`Category removed.`);
  };

  // Admin Order operations
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order ${orderId} marked as ${newStatus}.`);
  };

  return (
    <ShopContext.Provider
      value={{
        // Catalog
        products: productList,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        addCategory,
        deleteCategory,
        // Cart
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        freeShippingThreshold,
        freeShippingRemaining,
        // Coupons
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        shippingFee,
        taxAmount,
        finalTotal,
        addCoupon,
        deleteCoupon,
        toggleCouponStatus,
        // Wishlist
        wishlist,
        toggleWishlist,
        isWishlisted,
        // Addresses
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        // Orders
        orders,
        createOrder,
        cancelOrder,
        getOrderById,
        updateOrderStatus,
        // Customers (Admin)
        customers,
        // UI
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
