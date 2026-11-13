# LOMARAA – Luxury Minimal Fashion E-Commerce Platform

> **"ELEVATE YOUR EVERYDAY."**
> An international, H&M / COS-inspired luxury minimalist clothing and fashion e-commerce platform built with React 18, Vite, Tailwind CSS v4, and Node.js/Express.

---

## 💎 Brand Identity & Design System

- **Brand Name**: LOMARAA
- **Tagline**: Elevate Your Everyday.
- **Industry**: Premium Fashion, Haute Tailoring & Contemporary Wardrobe Essentials
- **Aesthetic**: Luxury Minimal, Editorial Atelier, Architectural Whitespace

### Design Tokens & Palette
| Role | Color Name | Hex Code | Purpose |
|---|---|---|---|
| **Primary** | Obsidian Black | `#111111` | Primary brand headers, buttons, high-contrast borders |
| **Secondary** | Atelier Sand | `#F5F1E8` | Editorial card backgrounds, subtle warm neutrals |
| **Background** | Pure White | `#FFFFFF` | Core canvas, airy negative space |
| **Accent** | Maison Gold | `#B89B67` | Badges, privilege indicators, price highlights |
| **Body Text** | Charcoal | `#222222` | High-legibility typography |

### Typography
- **Headings & Editorial Titles**: `Playfair Display` (Serif)
- **Body, UI & Technical Details**: `Inter` (Sans-serif)

---

## 🏛️ All 30 Implemented Screens & Routing Architecture

Every single screen is a fully functional, responsive React component integrated into React Router DOM:

### 🛍️ Customer Website (Screens 01 – 16)
| # | Screen Name | Route Path | Features & Highlights |
|---|---|---|---|
| **01** | **Premium Homepage** | `/` | Editorial hero, category navigation, announcement bar, New Arrivals, Curated Collections, Best Sellers, Brand Story, Newsletter, Luxury Footer |
| **02** | **Shop All Products** | `/shop` | 4/3/2 column responsive grid, collapsible desktop filters (category, gender, size, color, price), sorting dropdown, active filters chips |
| **03** | **Men's Collection** | `/men` | Dedicated men's wardrobe editorial banner, department filters, tailoring, outerwear and casual staples |
| **04** | **Women's Collection** | `/women` | Dedicated women's collection editorial hero, seasonal dresses, knitwear, and coats |
| **05** | **Product Details** | `/product/:slug` | H&M-inspired 3-view studio gallery (Front, Back, Detail), size selector, interactive Size Guide modal, composition accordions, "Complete the Look" recommendations |
| **06** | **Search Page** | `/search` | Live search input, recent searches history tags, trending atelier tags, instant filtered results grid |
| **07** | **Filter & Sort** | `/filters` | Dedicated full-page filter & sort matrix with multi-select chips for sizes, colors, price ranges and stock |
| **08** | **Wishlist** | `/wishlist` | Saved wardrobe edit, move to bag interaction, item removal, empty state with shopping CTA |
| **09** | **Shopping Bag** | `/cart` | Sliding drawer + full-page bag, item quantity steppers, coupon validation, GST (12%) calculation, free shipping meter |
| **10** | **Checkout** | `/checkout` | 3-step checkout flow, address selection & inline creation, delivery speed selection (Complimentary Express vs White-Glove Atelier) |
| **11** | **Address Book** | `/addresses` | Add/Edit modal, set default delivery address, delete address, validation |
| **12** | **Payment** | `/payment` | Razorpay simulation modal with animated progress, UPI / QR scanning, Credit/Debit cards, Net Banking, Cash on Delivery, 256-bit SSL badges |
| **13** | **Order Confirmation** | `/order-success` | Animated confirmation, generated order reference (`LOM-XXXXX`), fulfillment progress tracker, itemized invoice, print receipt action |
| **14** | **My Orders** | `/orders` | Order history tabs (All, In Transit, Delivered, Cancelled), tracking links, re-order button, order cancellation modal |
| **15** | **Order Tracking** | `/track-order/:orderId` | Live 5-step fulfillment timeline, courier status scans (BlueDart Air Express), delivery destination card, SMS notification toggles |
| **16** | **My Account** | `/account` | Patron profile overview, Atelier Privé VIP badge, editable profile coordinates, sartorial size preferences, quick links |

---

### 🔐 Authentication (Screens 17 – 20)
| # | Screen Name | Route Path | Features & Highlights |
|---|---|---|---|
| **17** | **Login** | `/login` | Client atelier sign-in, show/hide password, "Remember Me", 1-click **Customer Demo** & **Admin Demo** fast-login buttons |
| **18** | **Register** | `/register` | New patron registration, password confirmation, auto-fill demo button, terms agreement |
| **19** | **Forgot Password** | `/forgot-password` | Account recovery with simulated authentication email dispatch and reset simulator |
| **20** | **Reset Password** | `/reset-password` | Password updater with live strength indicator bar and confirmation redirect |

---

### ⚙️ Admin Dashboard (Screens 21 – 30)
| # | Screen Name | Route Path | Features & Highlights |
|---|---|---|---|
| **21** | **Admin Dashboard** | `/admin` | Executive KPIs (Gross Revenue, Total Orders, Patrons, SKUs), 6-month interactive revenue chart, recent orders table |
| **22** | **Product Management** | `/admin/products` | Complete catalog data table, thumbnails, SKU, category, stock counter, status pill, search/filter, delete modal |
| **23** | **Add / Edit Product** | `/admin/products/new`<br>`/admin/products/edit/:id` | Full garment creation and modification form: title, slug, SKU, category, gender, pricing, stock, size chips, studio photography URLs with live previews |
| **24** | **Category Management** | `/admin/categories` | Visual collections grid, garment counts, Add Category modal with image link, remove category |
| **25** | **Order Fulfillment** | `/admin/orders` | Order management table, status updater dropdown (Confirmed, Processing, Shipped, Delivered, Cancelled), printable invoice inspection modal |
| **26** | **Customer Management** | `/admin/customers` | Patron CRM directory, lifetime spend, orders count, VIP tier badges, patron portfolio modal |
| **27** | **Inventory & Stock** | `/admin/inventory` | Stock level audits, low stock alerts, inline stepper controls (+1, -1), +25 units quick restock action |
| **28** | **Coupons & Vouchers** | `/admin/coupons` | Promotional vouchers table, discount percentage or flat amount, threshold, redemptions count, Add Voucher modal, status toggles |
| **29** | **Sales Analytics** | `/admin/analytics` | GMV, AOV, conversion rate, cart abandonment, acquisition channel splits, geographical distribution in India, Top 5 performing garments |
| **30** | **Admin Settings** | `/admin/settings` | Multi-tab settings: Maison Coordinates, GST Tax & Shipping thresholds, Razorpay Gateway credentials, MongoDB & Cloudinary connectivity |

---

## 📸 H&M-Inspired Professional Photography Architecture

All 16 luxury garments feature local high-resolution studio photography with 3 unique angles per product stored systematically in:
`client/public/images/products/lom-001/` through `lom-016/`
- `front.jpg` — Full-length editorial front view on model
- `back.jpg` — Tailored back silhouette view
- `detail.jpg` — Close-up macro view highlighting fabric texture, weave, and craftsmanship

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 2. Start Frontend Development Server
From the root directory:
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in `client/dist`.

### 4. Run Express REST API Server
```bash
npm run server
```
Runs the Express backend API on **`http://localhost:5000`**.

---

## 🔑 Fast Evaluation Credentials

| Role | Email | Password | Access Rights |
|---|---|---|---|
| **Admin** | `admin@lomaraa.com` | `admin2026` | Full Customer Store + Complete Admin Dashboard (Screens 21–30) |
| **Customer** | `aarav@lomaraa.com` | `lomaraa2026` | Customer Store, Bag, Checkout, Order Tracking & Profile |

*(You can also click the **"Admin Demo"** or **"Customer Demo"** button directly on the `/login` screen for 1-click access).*

