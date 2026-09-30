# Dhakaiya Dripz — সম্পূর্ণ চ্যাট হিস্ট্রি, প্রজেক্ট ব্লুপ্রিন্ট ও আর্কিটেকচার সামারি

> **তারিখ:** ২৯ সেপ্টেম্বর, ২০২৬  
> **প্রজেক্ট নাম:** Dhakaiya Dripz (ঢাকা ড্রিপ্স)  
> **স্ট্যাক:** Next.js 16 (App Router + Turbopack) + TypeScript + Tailwind CSS v4 + Prisma ORM + PostgreSQL  
> **মূল রেফারেন্স:** ASOS (asos.com) UX Flow + Charm Octane Streetwear Aesthetics

---

## ১. প্রাথমিক আলোচনা ও PRD বিশ্লেষণ (UK Unisex E-Commerce Platform)
ব্যবহারকারী ৩ পৃষ্ঠার একটি **Product Requirement Document (PRD)** শেয়ার করেন, যার মূল বিষয়বস্তু ছিল:
* **টার্গেট মার্কেট:** যুক্তরাজ্য (UK) - প্রিমিয়াম ইউনিসেক্স পোশাক ও ফাংশনাল এক্সেসরিজ।
* **বেঞ্চমার্ক:** ASOS (asos.com) নেভিগেশন ও পারফরম্যান্স স্ট্যান্ডার্ড।
* **পারফরম্যান্স টার্গেট:** Core Web Vitals মোবাইলে ৯০+ স্কোর, ২০০ms-এর নিচে TTFB, জিরো CLS (Layout Shift) এবং WCAG 2.1 AA অ্যাক্সেসিবিলিটি।
* **মূল ফিচারসমূহ:**
  1. **Dual-Gateway:** মেন ও উইমেন এন্ট্রি রাউটিং (শেয়ার্ড ইউনিসেক্স ইনভেন্টরি)।
  2. **Sticky PLP Filter:** UK সাইজ, কালার, ফিট (Oversized, Relaxed, Tailored) এবং রিয়েল-টাইম URL সিঙ্ক।
  3. **Catwalk Video PDP:** স্প্লিট-স্ক্রিন মোডে ইমেজ জুম এবং মডেলে পরা অবস্থায় ভিডিও প্লেয়ার।
  4. **স্লাইডিং কার্ট ড্রয়ার:** পেজ রিলোড ছাড়া ডান দিক থেকে মিনি-কার্ট বের হওয়া।
  5. **সিঙ্গেল-পেজ চেকআউট:** অ্যাকর্ডিয়ন স্টাইলে ভ্যালিডেশন ও শিপিং।
* **থার্ড-পার্টি সার্ভিস:** Loqate (UK Postcode), Stripe + Klarna/Clearpay, Royal Mail API।

---

## ২. Charm Octane (charmoctane.com) বিশ্লেষণ
ব্যবহারকারীর অনুরোধে বাংলাদেশি ফ্যাশন ব্র্যান্ড **Charm Octane**-এর ওয়েবসাইট পর্যালোচনা করা হয়:
* **ধরণ:** বাংলাদেশি হ্যান্ড-ক্রাফটেড ক্যাজুয়াল ও স্ট্রিটওয়্যার ব্র্যান্ড (মূল্য পরিসীমা: ৳ ১,৫০০ - ৳ ৩,৫০০+)।
* **টেক স্ট্যাক:** WordPress + WooCommerce (Amely থিম, WPBakery, Contact Form 7, RevSlider, WPC Size Chart)।
* **পেমেন্ট:** ক্যাশ অন ডেলিভারি (Cash on Delivery - COD)।
* **পর্যবেক্ষণ ও সীমাবদ্ধতা:**
  * প্রচুর প্লাগইন ওভারহেডের কারণে পেজ স্পিড কিছুটা ধীর।
  * কোনো আধুনিক স্লাইড-আউট মিনি কার্ট ড্রয়ার নেই (স্ট্যাটিক কার্ট পেজে রিডাইরেক্ট করে)।
  * পণ্যে কোনো ক্যাটওয়াক ভিডিও নেই, কেবল স্থির ছবি।
  * চেকআউটে অতিরিক্ত ১০% ভ্যাট হঠাৎ যুক্ত হওয়ায় কাস্টমার বিভ্রান্ত হতে পারেন।

---

## ৩. ফুল-স্ট্যাক আর্কিটেকচার সিদ্ধান্ত (Next.js vs আলাদা ব্যাকএন্ড)
ব্যবহারকারী প্রশ্ন করেন: *পুরো প্রজেক্ট Next.js দিয়ে করা ভালো হবে নাকি ব্যাকএন্ড আলাদা করা ভালো?*

**গৃহীত সিদ্ধান্ত:** ফুল প্রজেক্ট **Next.js 16 (App Router + Server Actions) + Prisma + PostgreSQL** দিয়েই করা হবে।
* **কারণসমূহ:**
  1. React Server Components (RSC)-এর কারণে কোনো নেটওয়ার্ক ওয়াটারফল তৈরি হয় না, পেজ লোড হয় সুপারফাস্ট।
  2. এন্ড-টু-এন্ড টাইপ সেফটি (Prisma মডেল সরাসরি ফ্রন্টএন্ডে টাইপ হিসেবে কাজ করে)।
  3. একই রিপোজিটরিতে কাস্টমার স্টোর ও অ্যাডমিন প্যানেল রাখা যায়।
  4. কোনো CORS বা আলাদা সার্ভার মেইনটেন্যান্সের জটিলতা নেই।
  5. ভবিষ্যতে মোবাইল অ্যাপ (Flutter/React Native) আনলেও `app/api/...` রাউট দিয়ে চালানো সম্ভব।

---

## ৪. সিস্টেম ডায়াগ্রাম

```text
                        Next.js 16 + TypeScript
                                   │
              ┌────────────────────┴────────────────────┐
              ↓                                         ↓
      Customer Storefront                          Admin Panel
      • ASOS Dual-Gateway (Unisex/Men/Women)       • Revenue & Active Orders
      • Sticky Filter PLP (URL Sync)               • Phone Verification Call
      • PDP with Catwalk Video                     • Real-Time Stock Control
      • Slide-out Cart Drawer                      • Live Inventory Updates
              │                                         │
              └────────────────────┬────────────────────┘
                                   ↓
                         PostgreSQL + Prisma
                                   │
                    ┌──────────────┴──────────────┐
                    ↓                             ↓
               Cart Engine                  Orders Pipeline
                    ↓                             ↓
            Wishlist Manager             Cash on Delivery (COD)
```

---

## ৫. ডাটাবেস ও Prisma স্কিমা (`prisma/schema.prisma`)
নিম্নলিখিত মডেলগুলো তৈরি করা হয়েছে:
1. `User` (কাস্টমার ও অ্যাডমিন রোল)
2. `Category` (Pants, Oversized Tees, Shirts, Outerwear, Accessories)
3. `Product` (Title, Slug, Pricing, Gender, Fit, IsNewDrop)
4. `ProductVariant` (Size, Color, SKU, Inventory Stock)
5. `ProductMedia` (Image ও Catwalk Video URL সাপোর্ট)
6. `Cart` & `CartItem` (কুকি/সেশন ও ডাটাবেস হ্যান্ডলিং)
7. `Wishlist` & `WishlistItem` (সেভ করা আইটেম)
8. `Order` & `OrderItem` (অর্ডার স্ট্যাটাস: `PENDING` ➔ `CONFIRMED` ➔ `SHIPPED` ➔ `DELIVERED` ➔ `CANCELLED`, COD মেথড, ডেলিভারি জোন: Inside Dhaka ৳৮০ / Outside Dhaka ৳১৫০)

---

## ৬. লাইট মোড ও ডার্ক মোড (Theme Switcher)
ব্যবহারকারী প্রশ্ন তোলেন: *সাইটের থিম কালো কেন?*  
এর প্রেক্ষিতে সাইটে **ASOS-স্টাইল ক্লিন হোয়াইট (Light Mode)** এবং **স্ট্রিটওয়্যার অবসিডিয়ান ব্ল্যাক (Dark Mode)**—দুটোই ইমপ্লিমেন্ট করা হয়েছে:
* **ডিফল্ট থিম:** আন্তর্জাতিক ফ্যাশন বেঞ্চমার্ক ASOS-এর মতো ক্লিন হোয়াইট (`#ffffff`) ব্যাকগ্রাউন্ড ও ডার্ক টাইপোগ্রাফি।
* **থিম টগল:** হেডারে **Moon 🌙 / Sun ☀️** বাটন যুক্ত করা হয়েছে।
* **মেমোরি:** লোকালস্টোরেজে ইউজারের পছন্দ সংরক্ষিত থাকে।
* **প্রতিটি পেজে সাপোর্ট:**
  * হোমপেজ (`/`)
  * ক্যাটালগ ও ফিল্টার পেজ (`/shop`)
  * প্রোডাক্ট ডিটেইল ও ক্যাটওয়াক ভিডিও (`/product/[slug]`)
  * উইশলিস্ট (`/wishlist`)
  * সিঙ্গেল-পেজ COD চেকআউট (`/checkout`)
  * অ্যাডমিন ড্যাশবোর্ড (`/admin`)

---

## ৭. গুরুত্বপূর্ণ ফাইলসমূহ

* **রুট লেআউট:** `app/layout.tsx`
* **থিম প্রোভাইডার:** `context/ThemeContext.tsx`
* **কার্ট প্রোভাইডার ও ড্রয়ার:** `context/CartContext.tsx`, `components/store/CartDrawer.tsx`
* **উইশলিস্ট প্রোভাইডার:** `context/WishlistContext.tsx`
* **নেভবার ও থিম টগল:** `components/store/Navbar.tsx`, `components/store/ThemeToggle.tsx`
* **হোমপেজ:** `app/page.tsx`
* **শপ ও স্টিকি ফিল্টারিং:** `app/shop/page.tsx`, `components/store/ShopCatalogClient.tsx`
* **ক্যাটওয়াক ভিডিও PDP:** `app/product/[slug]/page.tsx`, `components/store/ProductDetailClient.tsx`
* **সাইজ গাইড মডাল:** `components/store/SizeGuideModal.tsx`
* **COD চেকআউট:** `app/checkout/page.tsx`
* **অ্যাডমিন পোর্টাল:** `app/admin/page.tsx`
* **ডাটাবেস স্কিমা ও সিড:** `prisma/schema.prisma`, `prisma/seed.ts`
* **মক ডাটা ও পণ্য তালিকা:** `lib/mock-data.ts`
* **ইউটিলিটি ও BDT কারেন্সি ফরম্যাট:** `lib/utils.ts`

---

## ৮. প্রজেক্ট চালানোর নিয়মাবলী

```bash
# ডিপেন্ডেন্সি ইনস্টল করতে
npm install

# Prisma ক্লায়েন্ট জেনারেট করতে
npx prisma generate

# লাইভ PostgreSQL ডাটাবেসে স্কিমা পুশ করতে
npx prisma db push

# স্যাম্পল প্রোডাক্ট সিড করতে
npx tsx prisma/seed.ts

# ডেভেলপমেন্ট সার্ভার চালু করতে
npm run dev

# প্রোডাকশন বিল্ড টেস্ট করতে
npm run build
```

---
*ডকুমেন্টটি সফলভাবে সংরক্ষিত হয়েছে।*
