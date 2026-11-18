import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProvider, useCart } from './context/CartContext';
import TopAnnouncementBar from './components/TopAnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryPills from './components/CategoryPills';
import FeaturedProducts from './components/FeaturedProducts';
import AgriculturalSolutions from './components/AgriculturalSolutions';
import BrandBanner from './components/BrandBanner';
import TrustPillars from './components/TrustPillars';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Views
import CatalogView from './views/CatalogView';
import ProductDetailsView from './views/ProductDetailsView';
import CartView from './views/CartView';
import CheckoutView from './views/CheckoutView';
import OrderConfirmationView from './views/OrderConfirmationView';
import OrdersView from './views/OrdersView';
import ProfileView from './views/ProfileView';

function MainAppContent() {
  const { currentView } = useCart();

  return (
    <div className="min-h-screen bg-[#fafdfa] flex flex-col font-sans text-[#404941]" dir="rtl">
      {/* Top Header */}
      <header className="w-full shrink-0">
        <TopAnnouncementBar />
        <Navbar />
      </header>

      {/* Main Screen Content */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full"
          >
            {currentView === 'home' && (
              <>
                <Hero />
                <CategoryPills />
                <FeaturedProducts />
                <AgriculturalSolutions />
                <BrandBanner />
                <TrustPillars />
              </>
            )}

            {currentView === 'catalog' && <CatalogView />}
            {currentView === 'product-details' && <ProductDetailsView />}
            {currentView === 'cart' && <CartView />}
            {currentView === 'checkout' && <CheckoutView />}
            {currentView === 'order-confirmation' && <OrderConfirmationView />}
            {currentView === 'orders' && <OrdersView />}
            {currentView === 'profile' && <ProfileView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Shared Footer */}
      <Footer />

      {/* Global Modals & Notifications */}
      <AuthModal />
      <Toast />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
