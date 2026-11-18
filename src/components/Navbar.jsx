import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import iconSearch from '../assets/icon-search.svg';
import iconArrowDown from '../assets/icon-arrow-down.svg';
import iconHeart from '../assets/icon-heart.svg';
import iconCart from '../assets/icon-cart.svg';
import iconUser from '../assets/icon-user.svg';

export default function Navbar() {
  const {
    currentView,
    navigate,
    cartCount,
    wishlist,
    searchQuery,
    setSearchQuery,
    user,
    setIsAuthModalOpen
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('catalog');
    }
  };

  return (
    <nav className="bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] border-b border-gray-100 sticky top-0 z-50" data-node-id="104:8912">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[64px] gap-3 sm:gap-6">
          
          {/* Right Section (in RTL): Logo + Search */}
          <div className="flex items-center gap-4 lg:gap-6 flex-1 max-w-[620px]">
            {/* Logo Anchor */}
            <button
              onClick={() => navigate('home')}
              className="shrink-0 flex items-center cursor-pointer focus:outline-none"
              data-node-id="104:8948"
            >
              <img 
                src={logo} 
                alt="NABTA نبتة" 
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </button>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 hidden md:block max-w-[448px]" data-node-id="104:8940">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن شتلات، أشجار، بذور، أسمدة، شبكات ري..."
                  className="w-full bg-[#eaf2eb] border border-[#c0c9bf]/60 rounded-full py-2 pr-10 pl-4 text-sm text-[#404941] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#0e4d2b]/30 focus:border-[#0e4d2b] transition-all"
                  dir="rtl"
                />
                <button
                  type="submit"
                  aria-label="بحث"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-[#404941] hover:text-[#0e4d2b] transition-colors cursor-pointer"
                >
                  <img src={iconSearch} alt="" className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Center Section: Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-[14px]" data-node-id="104:8929">
            <button
              onClick={() => navigate('home')}
              className={`transition-colors pb-1 pt-1 cursor-pointer ${
                currentView === 'home'
                  ? 'text-[#00351a] font-bold border-b-2 border-[#00351a]'
                  : 'text-[#404941] font-semibold hover:text-[#00351a]'
              }`}
              data-node-id="104:8938"
            >
              الصفحة الرئيسية
            </button>
            <button
              onClick={() => navigate('catalog')}
              className={`transition-colors pb-1 pt-1 cursor-pointer ${
                currentView === 'catalog'
                  ? 'text-[#00351a] font-bold border-b-2 border-[#00351a]'
                  : 'text-[#404941] font-semibold hover:text-[#00351a]'
              }`}
              data-node-id="104:8935"
            >
              المتجر
            </button>
            <button
              onClick={() => navigate('catalog')}
              className="py-1 flex items-center gap-1.5 text-[#404941] font-semibold hover:text-[#00351a] transition-colors cursor-pointer"
              data-node-id="104:8932"
            >
              <span>أقسام المنتجات</span>
              <img src={iconArrowDown} alt="" className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('orders')}
              className={`transition-colors pb-1 pt-1 cursor-pointer ${
                currentView === 'orders'
                  ? 'text-[#00351a] font-bold border-b-2 border-[#00351a]'
                  : 'text-[#404941] font-semibold hover:text-[#00351a]'
              }`}
            >
              طلباتي وتتبّع الشحنات
            </button>
          </div>

          {/* Left Section (in RTL): Action Icons & Login Button */}
          <div className="flex items-center gap-2 sm:gap-3" data-node-id="104:8914">
            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => navigate('catalog')}
              aria-label="المفضلة"
              className="relative p-2 rounded-full hover:bg-gray-100 text-[#404941] transition-colors cursor-pointer"
              data-node-id="104:8925"
            >
              <img src={iconHeart} alt="" className="w-5 h-5" />
              {/* Active notification red badge */}
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Shopping Cart Button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('cart')}
              aria-label="سلة التسوق"
              className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                currentView === 'cart' ? 'bg-[#eaf2eb] text-[#00351a]' : 'hover:bg-gray-100 text-[#404941]'
              }`}
              data-node-id="104:8920"
            >
              <img src={iconCart} alt="" className="w-5 h-5" />
              {/* Badge count */}
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    key={cartCount}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.5 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="absolute -top-1 -right-1 bg-[#1b6d24] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* User / Login Button */}
            {user?.isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('profile')}
                className="bg-[#0e4d2b] hover:bg-[#09381e] text-white text-xs sm:text-[13px] font-medium px-3.5 sm:px-4 py-2 rounded-[8px] flex items-center gap-2 shadow-sm transition-colors shrink-0 cursor-pointer"
              >
                <img src={iconUser} alt="" className="w-3.5 h-3.5 shrink-0" />
                <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-[#0e4d2b] hover:bg-[#09381e] text-white text-xs sm:text-[13px] font-medium px-3.5 sm:px-4 py-2 rounded-[8px] flex items-center gap-2 shadow-sm transition-colors shrink-0 cursor-pointer"
                data-node-id="104:8915"
              >
                <img src={iconUser} alt="" className="w-3.5 h-3.5 shrink-0" />
                <span>تسجيل الدخول</span>
              </motion.button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              aria-label="القائمة"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (underneath on small devices) */}
        <div className="md:hidden pb-3 pt-1">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن شتلات، أشجار، بذور، أسمدة، شبكات ري..."
              className="w-full bg-[#eaf2eb] border border-[#c0c9bf]/60 rounded-full py-2 pr-10 pl-4 text-xs text-[#404941] placeholder-[#6b7280] focus:outline-none"
              dir="rtl"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-[#404941]"
            >
              <img src={iconSearch} alt="" className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden border-t border-gray-100 py-3 space-y-1 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => { navigate('home'); setMobileMenuOpen(false); }}
                className="w-full text-right block px-3 py-2 rounded-md font-bold text-[#00351a] hover:bg-green-50"
              >
                الصفحة الرئيسية
              </button>
              <button
                type="button"
                onClick={() => { navigate('catalog'); setMobileMenuOpen(false); }}
                className="w-full text-right block px-3 py-2 rounded-md font-medium text-[#404941] hover:bg-gray-50"
              >
                المتجر والمنتجات
              </button>
              <button
                type="button"
                onClick={() => { navigate('cart'); setMobileMenuOpen(false); }}
                className="w-full text-right block px-3 py-2 rounded-md font-medium text-[#404941] hover:bg-gray-50 flex items-center justify-between"
              >
                <span>سلة التسوق</span>
                <span className="bg-[#1b6d24] text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
              </button>
              <button
                type="button"
                onClick={() => { navigate('orders'); setMobileMenuOpen(false); }}
                className="w-full text-right block px-3 py-2 rounded-md font-medium text-[#404941] hover:bg-gray-50"
              >
                طلباتي وتتبّع الشحنات
              </button>
              <button
                type="button"
                onClick={() => { navigate('profile'); setMobileMenuOpen(false); }}
                className="w-full text-right block px-3 py-2 rounded-md font-medium text-[#404941] hover:bg-gray-50"
              >
                الملف الشخصي والمزارع
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
