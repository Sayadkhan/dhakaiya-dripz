"use client";

import React, { useState, useEffect } from "react";
import { useProducts } from "@/context/ProductContext";
import { OrderItemRecord, ProductItem } from "@/lib/mock-data";
import { CategoryItem } from "@/context/ProductContext";
import { formatPrice } from "@/lib/utils";
import AdminSidebar, { AdminTab } from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardOverview from "@/components/admin/DashboardOverview";
import ProductsTable from "@/components/admin/ProductsTable";
import OrdersTable from "@/components/admin/OrdersTable";
import CategoriesTable from "@/components/admin/CategoriesTable";
import AttributesManager from "@/components/admin/AttributesManager";
import BrandingManager from "@/components/admin/BrandingManager";
import ProductFormModal from "@/components/admin/ProductFormModal";
import AdminLoginView from "@/components/admin/AdminLoginView";
import {
  DeleteProductModal,
  AddCategoryModal,
  AddColorModal,
  AddSizeModal,
} from "@/components/admin/AdminModals";
import { Check } from "lucide-react";

export default function AdminPage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const auth =
        localStorage.getItem("dhakaiya_admin_auth") === "true" ||
        sessionStorage.getItem("dhakaiya_admin_auth") === "true";
      setIsAuthenticated(auth);
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("dhakaiya_admin_auth");
      sessionStorage.removeItem("dhakaiya_admin_auth");
    } catch {}
    setIsAuthenticated(false);
  };
  const {
    products,
    categories,
    sizes,
    colors,
    settings,
    updateDeliveryCharges,
    updateSocialLinks,
    updateContactInfo,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    addCategory,
    updateCategory,
    deleteCategory,
    addColor,
    deleteColor,
    addSize,
    deleteSize,
    toggleFeaturedProduct,
    customLogoUrl,
    updateLogo,
    updateSettings,
  } = useProducts();

  // Navigation & Layout states
  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  // Orders state
  const [orders, setOrders] = useState<OrderItemRecord[]>([]);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("dhakaiya_admin_orders");
      if (savedOrders) {
        const parsed: OrderItemRecord[] = JSON.parse(savedOrders);
        const cleanOrders = parsed.filter((o) => o.id !== "ord-1" && o.id !== "ord-2");
        setOrders(cleanOrders);
        localStorage.setItem("dhakaiya_admin_orders", JSON.stringify(cleanOrders));
      } else {
        setOrders([]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Modals state
  const [productFormModal, setProductFormModal] = useState<{
    isOpen: boolean;
    productToEdit: ProductItem | null;
  }>({
    isOpen: false,
    productToEdit: null,
  });

  const [productToDelete, setProductToDelete] = useState<ProductItem | null>(null);
  const [categoryModal, setCategoryModal] = useState<{
    isOpen: boolean;
    categoryToEdit: CategoryItem | null;
  }>({
    isOpen: false,
    categoryToEdit: null,
  });
  const [isAddColorOpen, setIsAddColorOpen] = useState(false);
  const [isAddSizeOpen, setIsAddSizeOpen] = useState(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Order status update
  const handleUpdateOrderStatus = (
    orderId: string,
    newStatus: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  ) => {
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o));
      try {
        localStorage.setItem("dhakaiya_admin_orders", JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
    triggerToast(`Order status updated to ${newStatus}!`);
  };

  // Product Actions
  const handleSaveProduct = (product: ProductItem, isEdit: boolean) => {
    if (isEdit) {
      updateProduct(product);
      triggerToast(`Product "${product.title}" updated successfully!`);
    } else {
      addProduct(product);
      triggerToast(`New product "${product.title}" published to catalog!`);
    }
  };

  const handleConfirmDeleteProduct = () => {
    if (!productToDelete) return;
    const title = productToDelete.title;
    deleteProduct(productToDelete.id);
    setProductToDelete(null);
    triggerToast(`"${title}" has been permanently deleted!`);
  };

  // Category Actions
  const handleSaveCategory = (
    name: string,
    description: string,
    image?: string,
    id?: string
  ) => {
    if (id) {
      const existing = categories.find((c) => c.id === id);
      if (existing) {
        updateCategory({
          ...existing,
          name,
          description,
          image,
        });
        triggerToast(`Category "${name}" updated successfully!`);
      }
    } else {
      addCategory(name, description, image);
      triggerToast(`Category "${name}" created successfully!`);
    }
  };

  const handleDeleteCategory = (cat: CategoryItem, linkedProductCount: number) => {
    if (linkedProductCount > 0) {
      alert(
        `Cannot delete "${cat.name}" because ${linkedProductCount} product(s) are assigned to it. Please reassign or delete those products first.`
      );
      return;
    }
    deleteCategory(cat.id);
    triggerToast(`Category "${cat.name}" deleted!`);
  };

  // Attribute Actions
  const handleSaveColor = (name: string, hex: string) => {
    addColor(name, hex);
    triggerToast(`Color swatch "${name}" (${hex}) saved!`);
  };

  const handleDeleteColor = (name: string) => {
    deleteColor(name);
    triggerToast(`Color "${name}" removed!`);
  };

  const handleSaveSize = (size: string) => {
    addSize(size);
    triggerToast(`Size metric "${size}" added!`);
  };

  const handleDeleteSize = (size: string) => {
    deleteSize(size);
    triggerToast(`Size "${size}" removed!`);
  };

  // Calculations
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === "PENDING").length;
  const totalRevenue = orders
    .filter((o) => o.orderStatus !== "CANCELLED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  // 1. Loading check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#0066ff] border-t-transparent animate-spin" />
          <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
            Loading Admin Engine...
          </span>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated check -> Show Login Screen
  if (!isAuthenticated) {
    return (
      <AdminLoginView
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          triggerToast("Welcome back! Signed in to Admin Portal.");
        }}
        adminUsername={settings.adminUsername || "admin"}
        adminPassword={settings.adminPassword || "admin"}
        logoUrl={customLogoUrl}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-[#0088ff] selection:text-white transition-colors duration-200">
      {/* 1. Left Persistent Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        productCount={products.length}
        orderCount={orders.length}
        pendingOrderCount={pendingOrdersCount}
        customLogoUrl={customLogoUrl}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Wrapper */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-200 ${
          sidebarCollapsed ? "lg:pl-16" : "lg:pl-64"
        }`}
      >
        {/* Top Header */}
        <AdminHeader
          activeTab={activeTab}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenAddProduct={() =>
            setProductFormModal({ isOpen: true, productToEdit: null })
          }
          pendingOrderCount={pendingOrdersCount}
          totalRevenueFormatted={formatPrice(totalRevenue)}
          globalSearchQuery={globalSearchQuery}
          setGlobalSearchQuery={setGlobalSearchQuery}
          onLogout={handleLogout}
        />

        {/* Viewport Content - Full Width & High Density */}
        <main className="flex-1 p-3.5 sm:p-5 w-full space-y-3.5">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === "overview" && (
            <DashboardOverview
              products={products}
              orders={orders}
              categories={categories}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenAddProduct={() =>
                setProductFormModal({ isOpen: true, productToEdit: null })
              }
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}

          {/* TAB 2: PRODUCTS CATALOG TABLE */}
          {activeTab === "products" && (
            <ProductsTable
              products={products}
              categories={categories}
              onOpenAddProduct={() =>
                setProductFormModal({ isOpen: true, productToEdit: null })
              }
              onEditProduct={(product) =>
                setProductFormModal({ isOpen: true, productToEdit: product })
              }
              onDeleteProduct={(product) => setProductToDelete(product)}
              onToggleFeatured={(id) => {
                toggleFeaturedProduct(id);
                const prod = products.find((p) => p.id === id);
                triggerToast(
                  prod?.isFeatured
                    ? `"${prod.title}" removed from Hero Slider`
                    : `"${prod?.title || "Product"}" added to Homepage Hero Slider!`
                );
              }}
              onUpdateStock={updateStock}
              initialSearchQuery={globalSearchQuery}
            />
          )}

          {/* TAB 3: ORDERS & COD PIPELINE */}
          {activeTab === "orders" && (
            <OrdersTable
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              initialSearchQuery={globalSearchQuery}
            />
          )}

          {/* TAB 4: CATEGORIES ARCHITECTURE */}
          {activeTab === "categories" && (
            <CategoriesTable
              categories={categories}
              products={products}
              onOpenAddCategory={() =>
                setCategoryModal({ isOpen: true, categoryToEdit: null })
              }
              onEditCategory={(cat) =>
                setCategoryModal({ isOpen: true, categoryToEdit: cat })
              }
              onDeleteCategory={handleDeleteCategory}
            />
          )}

          {/* TAB 5: ATTRIBUTES (COLORS & SIZES) */}
          {activeTab === "attributes" && (
            <AttributesManager
              colors={colors}
              sizes={sizes}
              onOpenAddColor={() => setIsAddColorOpen(true)}
              onOpenAddSize={() => setIsAddSizeOpen(true)}
              onDeleteColor={handleDeleteColor}
              onDeleteSize={handleDeleteSize}
              onTriggerToast={triggerToast}
            />
          )}

          {/* TAB 6: STORE SETTINGS, DELIVERY & BRANDING */}
          {activeTab === "branding" && (
            <BrandingManager
              customLogoUrl={customLogoUrl}
              onUpdateLogo={updateLogo}
              onTriggerToast={triggerToast}
              settings={settings}
              onUpdateDeliveryCharges={updateDeliveryCharges}
              onUpdateSocialLinks={updateSocialLinks}
              onUpdateContactInfo={updateContactInfo}
              onUpdateSettings={updateSettings}
            />
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODALS                                                                    */}
      {/* ========================================================================= */}

      {/* Add / Edit Product Modal */}
      <ProductFormModal
        isOpen={productFormModal.isOpen}
        onClose={() => setProductFormModal({ isOpen: false, productToEdit: null })}
        onSaveProduct={handleSaveProduct}
        initialProduct={productFormModal.productToEdit}
        categories={categories}
        colors={colors}
        sizes={sizes}
      />

      {/* Confirm Delete Product Modal */}
      <DeleteProductModal
        product={productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDeleteProduct}
      />

      {/* Add / Edit Category Modal */}
      <AddCategoryModal
        isOpen={categoryModal.isOpen}
        categoryToEdit={categoryModal.categoryToEdit}
        onClose={() => setCategoryModal({ isOpen: false, categoryToEdit: null })}
        onSave={handleSaveCategory}
      />

      {/* Add Color Modal */}
      <AddColorModal
        isOpen={isAddColorOpen}
        onClose={() => setIsAddColorOpen(false)}
        onSave={handleSaveColor}
      />

      {/* Add Size Modal */}
      <AddSizeModal
        isOpen={isAddSizeOpen}
        onClose={() => setIsAddSizeOpen(false)}
        onSave={handleSaveSize}
      />

      {/* Modern Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 border border-zinc-800 dark:border-zinc-200">
          <Check className="w-4 h-4 text-[#00a3ff] stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
