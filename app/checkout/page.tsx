"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
  Phone,
  MapPin,
  User,
  ShoppingBag,
  Clock,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import { useCart } from "@/context/CartContext";
import { formatPrice, generateOrderNumber } from "@/lib/utils";

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    deliveryZone,
    setDeliveryZone,
    deliveryCharge,
    totalAmount,
    clearCart,
  } = useCart();

  // Form fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Success state
  const [placedOrder, setPlacedOrder] = useState<{
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    totalAmount: number;
    deliveryZone: string;
    address: string;
  } | null>(null);

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = "Please enter your full name";
    if (!phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^01[3-9]\d{8}$/.test(phone.replace(/\s+/g, ""))) {
      errs.phone = "Enter a valid 11-digit Bangladeshi mobile number (01XXXXXXXXX)";
    }
    if (!address.trim()) errs.address = "Please provide your detailed delivery address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (items.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = generateOrderNumber();
      setPlacedOrder({
        orderNumber,
        customerName: fullName,
        customerPhone: phone,
        totalAmount,
        deliveryZone: deliveryZone === "INSIDE_DHAKA" ? "Inside Dhaka (24-48h)" : "Outside Dhaka (48-72h)",
        address,
      });
      clearCart();
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  // If order was placed successfully:
  if (placedOrder) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-[#d4ff00] selection:text-black">
        <Navbar />

        <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full text-center">
          <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-6">
            <div className="w-16 h-16 bg-[#d4ff00]/20 border border-[#d4ff00] rounded-full flex items-center justify-center mx-auto text-black dark:text-[#d4ff00]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-block bg-[#d4ff00] text-black font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                COD ORDER RECEIVED
              </span>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
                Order Placed Successfully!
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm max-w-md mx-auto">
                Thank you, <strong className="text-zinc-950 dark:text-white">{placedOrder.customerName}</strong>. Our logistics officer will call you at <strong className="text-zinc-950 dark:text-white font-mono">{placedOrder.customerPhone}</strong> to verify before parcel dispatch.
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-left space-y-3 font-mono text-xs shadow-xs">
              <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                <span className="text-zinc-500">Order ID:</span>
                <span className="text-zinc-950 dark:text-[#d4ff00] font-black text-sm">{placedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                <span className="text-zinc-500">Payment:</span>
                <span className="text-zinc-900 dark:text-white font-bold">Cash on Delivery (৳)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                <span className="text-zinc-500">Delivery Zone:</span>
                <span className="text-zinc-700 dark:text-zinc-300">{placedOrder.deliveryZone}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                <span className="text-zinc-500">Address:</span>
                <span className="text-zinc-700 dark:text-zinc-300 text-right max-w-xs truncate">{placedOrder.address}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold">
                <span className="text-zinc-900 dark:text-white">Amount Due on Delivery:</span>
                <span className="text-zinc-950 dark:text-[#d4ff00] text-base font-black">{formatPrice(placedOrder.totalAmount)}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-left text-xs space-y-3">
              <div className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-black dark:text-[#d4ff00]" /> What Happens Next?
              </div>
              <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#d4ff00] text-black font-bold text-[10px] flex items-center justify-center">1</span>
                  <span><strong>Verification Call:</strong> Expect a call from 01799445851 within 2 business hours.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-bold text-[10px] flex items-center justify-center">2</span>
                  <span><strong>Packaging & Dispatch:</strong> Your garment will be packed in our custom anti-crease bag.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-bold text-[10px] flex items-center justify-center">3</span>
                  <span><strong>Doorstep Delivery:</strong> Inspect the product, confirm size, and hand cash to delivery rider.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="bg-[#d4ff00] hover:bg-[#b8dd00] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition shadow-md"
              >
                Continue Shopping
              </Link>
              <Link
                href="/admin"
                className="bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition"
              >
                View in Admin Panel
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-[#d4ff00] selection:text-black">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Breadcrumb & Title */}
        <div className="mb-8 space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
            Home / Shopping Bag / COD Checkout
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
            Single-Page COD Checkout
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Cash on delivery nationwide across Bangladesh. Zero advance payment required.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/30 rounded-3xl border border-zinc-200 dark:border-zinc-900 space-y-4">
            <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-900 mx-auto flex items-center justify-center text-zinc-500">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Your bag is empty</h3>
            <p className="text-xs text-zinc-500">
              You must add at least one garment to your bag before checking out.
            </p>
            <Link
              href="/shop"
              className="inline-flex bg-[#d4ff00] text-black font-black text-xs uppercase px-6 py-3 rounded-full hover:bg-[#b8dd00] transition"
            >
              Shop New Drops
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Customer Form & Shipping Details */}
            <div className="lg:col-span-7">
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                
                {/* 1. Contact Info Card */}
                <div className="bg-zinc-50 dark:bg-zinc-900/40 p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-4 shadow-xs">
                  <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800 text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                    <User className="w-4 h-4 text-black dark:text-[#d4ff00]" />
                    <span>1. Customer & Phone Details</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors({ ...errors, fullName: "" });
                        }}
                        placeholder="e.g. Tanvir Ahmed"
                        className={`w-full bg-white dark:bg-zinc-950 border rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none transition ${
                          errors.fullName ? "border-red-500" : "border-zinc-300 dark:border-zinc-800 focus:border-black dark:focus:border-[#d4ff00]"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Mobile Number (For Call & SMS) *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors({ ...errors, phone: "" });
                        }}
                        placeholder="017XXXXXXXX"
                        className={`w-full bg-white dark:bg-zinc-950 border rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 font-mono focus:outline-none transition ${
                          errors.phone ? "border-red-500" : "border-zinc-300 dark:border-zinc-800 focus:border-black dark:focus:border-[#d4ff00]"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Alternative Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={altPhone}
                      onChange={(e) => setAltPhone(e.target.value)}
                      placeholder="018XXXXXXXX (backup number in case main is busy)"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 font-mono focus:outline-none focus:border-black dark:focus:border-[#d4ff00] transition"
                    />
                  </div>
                </div>

                {/* 2. Shipping Zone & Address Card */}
                <div className="bg-zinc-50 dark:bg-zinc-900/40 p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-4 shadow-xs">
                  <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800 text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                    <Truck className="w-4 h-4 text-black dark:text-[#d4ff00]" />
                    <span>2. Delivery Zone & Address</span>
                  </div>

                  {/* Zone Selector */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                      Choose Your Delivery Location *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setDeliveryZone("INSIDE_DHAKA")}
                        className={`p-3.5 rounded-xl border cursor-pointer transition ${
                          deliveryZone === "INSIDE_DHAKA"
                            ? "border-black dark:border-[#d4ff00] bg-zinc-100 dark:bg-[#d4ff00]/10 text-zinc-950 dark:text-white"
                            : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 hover:border-zinc-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-zinc-950 dark:text-white">Inside Dhaka</span>
                          <span className="font-mono text-xs font-bold text-black dark:text-[#d4ff00]">
                            {subtotal >= 3000 ? "FREE" : "৳80 BDT"}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">24 to 48 Hours Delivery via RedX / Steadfast</p>
                      </div>

                      <div
                        onClick={() => setDeliveryZone("OUTSIDE_DHAKA")}
                        className={`p-3.5 rounded-xl border cursor-pointer transition ${
                          deliveryZone === "OUTSIDE_DHAKA"
                            ? "border-black dark:border-[#d4ff00] bg-zinc-100 dark:bg-[#d4ff00]/10 text-zinc-950 dark:text-white"
                            : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 hover:border-zinc-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-zinc-950 dark:text-white">Outside Dhaka</span>
                          <span className="font-mono text-xs font-bold text-black dark:text-[#d4ff00]">
                            {subtotal >= 3000 ? "FREE" : "৳150 BDT"}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Chattogram, Sylhet, Rajshahi, all districts (48-72h)</p>
                      </div>
                    </div>
                  </div>

                  {/* Address input */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Full Street Address *
                    </label>
                    <textarea
                      rows={3}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (errors.address) setErrors({ ...errors, address: "" });
                      }}
                      placeholder="House / Flat No, Road Name, Area/Sector, Thana, District"
                      className={`w-full bg-white dark:bg-zinc-950 border rounded-xl p-3.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none transition ${
                        errors.address ? "border-red-500" : "border-zinc-300 dark:border-zinc-800 focus:border-black dark:focus:border-[#d4ff00]"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Delivery Notes */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g. Call before coming, deliver after 3 PM"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-black dark:focus:border-[#d4ff00] transition"
                    />
                  </div>
                </div>

                {/* 3. Payment Method Card (COD Guaranteed) */}
                <div className="bg-zinc-50 dark:bg-zinc-900/40 p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800 text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                    <ShieldCheck className="w-4 h-4 text-black dark:text-[#d4ff00]" />
                    <span>3. Payment Protocol</span>
                  </div>

                  <div className="p-4 rounded-xl border border-black dark:border-[#d4ff00] bg-zinc-100 dark:bg-[#d4ff00]/10 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-black dark:bg-[#d4ff00] text-white dark:text-black font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <div className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-2">
                        <span>Cash on Delivery (ক্যাশ অন ডেলিভারি)</span>
                        <span className="bg-[#d4ff00] text-black font-extrabold text-[9px] px-1.5 py-0.2 rounded uppercase">
                          No Prepayment
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
                        Pay total amount in cash directly to the delivery rider when the parcel arrives at your doorstep. You can inspect the garment packaging beforehand.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#d4ff00] hover:bg-[#c2ea00] disabled:bg-zinc-300 text-black font-black text-base uppercase tracking-wider py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-[#d4ff00]/25 transition transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Securing Order...
                    </span>
                  ) : (
                    <>
                      <span>Confirm Cash on Delivery Order</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Order Items Summary */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 bg-zinc-50 dark:bg-zinc-900/40 p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white pb-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <span>Order Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                  <Link href="/shop" className="text-xs font-mono text-zinc-900 dark:text-[#d4ff00] hover:underline normal-case font-bold">
                    Edit Bag
                  </Link>
                </h3>

                {/* Items List */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 text-xs">
                      <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex-shrink-0">
                        <Image src={item.image} alt={item.title} fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-zinc-900 dark:text-white truncate">{item.title}</div>
                        <div className="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">
                          Size: <strong className="text-zinc-900 dark:text-zinc-200">{item.size}</strong> • {item.color}
                        </div>
                        <div className="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </div>
                      </div>
                      <div className="font-mono font-bold text-zinc-950 dark:text-white text-right">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation Breakdown */}
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-zinc-950 dark:text-white font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      Delivery ({deliveryZone === "INSIDE_DHAKA" ? "Inside Dhaka" : "Outside Dhaka"})
                    </span>
                    <span className="font-mono text-zinc-950 dark:text-white font-bold">
                      {deliveryCharge === 0 ? (
                        <span className="text-emerald-600 dark:text-[#d4ff00] font-bold">FREE</span>
                      ) : (
                        formatPrice(deliveryCharge)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-zinc-950 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
                    <span>Payable on Delivery</span>
                    <span className="font-mono text-zinc-950 dark:text-[#d4ff00] text-lg">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 space-y-1">
                  <div className="text-zinc-900 dark:text-zinc-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-black dark:text-[#d4ff00]" /> 100% Risk Free
                  </div>
                  <p>You only hand over cash when the courier hands the parcel to you.</p>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
