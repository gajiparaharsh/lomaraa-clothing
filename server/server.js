import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Master Catalog Data for Seed / Fallback
let products = [
  {
    id: "lom-001",
    slug: "structured-double-breasted-wool-coat",
    sku: "LOM-W-CT-001",
    name: "Structured Double-Breasted Wool Coat",
    category: "Outerwear",
    gender: "Women",
    price: 24900,
    originalPrice: 28900,
    rating: 4.9,
    reviewCount: 38,
    isNew: true,
    isBestSeller: true,
    stock: 18,
    color: "Camel Sand",
    sizes: ["XS", "S", "M", "L"],
    tagline: "Double-faced virgin wool blend with structured shoulder silhouette.",
    coverImage: "/images/products/lom-001/front.jpg",
    gallery: {
      front: "/images/products/lom-001/front.jpg",
      back: "/images/products/lom-001/back.jpg",
      detail: "/images/products/lom-001/detail.jpg"
    }
  },
  {
    id: "lom-002",
    slug: "minimalist-oversized-wool-blazer",
    sku: "LOM-M-BLZ-002",
    name: "Minimalist Oversized Wool Blazer",
    category: "Tailoring",
    gender: "Men",
    price: 18900,
    originalPrice: 21900,
    rating: 4.8,
    reviewCount: 27,
    isNew: true,
    isBestSeller: true,
    stock: 22,
    color: "Obsidian Black",
    sizes: ["S", "M", "L", "XL"],
    tagline: "Architectural silhouette with horn buttons and breathable cupro lining.",
    coverImage: "/images/products/lom-002/front.jpg",
    gallery: {
      front: "/images/products/lom-002/front.jpg",
      back: "/images/products/lom-002/back.jpg",
      detail: "/images/products/lom-002/detail.jpg"
    }
  }
];

let orders = [
  {
    id: "LOM-98241",
    date: new Date().toISOString(),
    status: "Delivered",
    paymentMethod: "Razorpay (UPI)",
    total: 25099,
    trackingNumber: "BD-88421099IN",
    courier: "BlueDart Express"
  }
];

let coupons = [
  { code: "LOMARAA10", discountPercent: 10, minPurchase: 3000, active: true },
  { code: "FIRST20", discountPercent: 20, minPurchase: 5000, active: true },
  { code: "ELEVATE500", flatDiscount: 500, minPurchase: 2500, active: true }
];

// 1. Healthcheck
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    maison: "LOMARAA",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// 2. Products API
app.get("/api/products", (req, res) => {
  const { category, gender, search, sort } = req.query;
  let result = [...products];

  if (category && category !== "All") {
    result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (gender && gender !== "All") {
    result = result.filter((p) => p.gender.toLowerCase() === gender.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
  }

  if (sort === "price-low") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    result.sort((a, b) => b.price - a.price);
  }

  res.json({ count: result.length, products: result });
});

app.get("/api/products/:slugOrId", (req, res) => {
  const param = req.params.slugOrId;
  const product = products.find((p) => p.id === param || p.slug === param);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

app.post("/api/products", (req, res) => {
  const newProduct = {
    id: `lom-${String(products.length + 1).padStart(3, "0")}`,
    ...req.body
  };
  products.unshift(newProduct);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
});

app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  products = products.filter((p) => p.id !== id);
  res.json({ message: "Product deleted successfully" });
});

// 3. Orders API
app.get("/api/orders", (req, res) => {
  res.json({ count: orders.length, orders });
});

app.post("/api/orders", (req, res) => {
  const orderId = `LOM-${Math.floor(10000 + Math.random() * 90000)}`;
  const order = {
    id: orderId,
    date: new Date().toISOString(),
    status: "Confirmed",
    trackingNumber: `BD-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
    courier: "BlueDart Express",
    ...req.body
  };
  orders.unshift(order);
  res.status(201).json(order);
});

app.put("/api/orders/:id/status", (req, res) => {
  const { status } = req.body;
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  order.status = status;
  res.json(order);
});

// 4. Coupons API
app.get("/api/coupons", (req, res) => {
  res.json(coupons);
});

app.post("/api/coupons/validate", (req, res) => {
  const { code, subtotal } = req.body;
  const found = coupons.find((c) => c.code.toUpperCase() === code?.toUpperCase() && c.active);
  if (!found) {
    return res.status(400).json({ valid: false, message: "Invalid promotional code" });
  }
  if (subtotal && subtotal < found.minPurchase) {
    return res.status(400).json({
      valid: false,
      message: `Minimum purchase of ₹${found.minPurchase} required.`
    });
  }
  const discount = found.discountPercent
    ? Math.round((subtotal * found.discountPercent) / 100)
    : found.flatDiscount;

  res.json({ valid: true, coupon: found, discount });
});

// 5. Razorpay Simulation
app.post("/api/payment/create-razorpay-order", (req, res) => {
  const { amount } = req.body;
  const razorpayOrderId = `order_rzp_${Date.now()}`;
  res.json({
    id: razorpayOrderId,
    entity: "order",
    amount: (amount || 25000) * 100, // paise
    currency: "INR",
    status: "created"
  });
});

// 6. Auth API
app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;
  const isAdmin = email && email.toLowerCase().includes("admin");
  res.json({
    token: "jwt_token_lomaraa_session_sample",
    user: {
      id: "usr-001",
      name: isAdmin ? "Lomaraa Administrator" : "Aarav Sharma",
      email,
      role: isAdmin ? "admin" : "customer"
    }
  });
});

app.listen(PORT, () => {
  console.log(`Lomaraa API Server running on port ${PORT}`);
});

