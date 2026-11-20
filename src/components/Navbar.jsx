import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import { 
  ChevronDown, 
  Heart, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const {
    currentView,
    navigate,
    cartCount,
    wishlist,
    user
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [blogToast, setBlogToast] = useState(false);

  const handleScrollToSection = (sectionId) => {
    if (currentView !== 'home') {
      navigate('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleBlogClick = () => {
    setBlogToast(true);
    setTimeout(() => setBlogToast(false), 3000);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] select-none">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          
          {/* Right Section in RTL: Logo */}
          <button
            onClick={() => navigate('home')}
            className="shrink-0 flex items-center cursor-pointer focus:outline-none"
            title="نبتة - الصفحة الرئيسية"
          >
            <img 
              src={logo} 
              alt="NABTA نبتة" 
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </button>

          {/* Center Section: Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-[15px] font-semibold text-[#374151]">
            
            {/* الرئيسية */}
            <button
              type="button"
              onClick={() => navigate('home')}
              className={`relative py-2 cursor-pointer transition-colors ${
                currentView === 'home' ? 'text-[#0c391f] font-bold' : 'hover:text-[#16a34a]'
              }`}
            >
              الرئيسية
              {currentView === 'home' && (
                <motion.span 
                  layoutId="activeNavUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0c391f] rounded-full"
                />
              )}
            </button>

            {/* المنتجات ⌵ with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => navigate('catalog')}
                className={`flex items-center gap-1 py-2 cursor-pointer transition-colors ${
                  currentView === 'catalog' ? 'text-[#0c391f] font-bold' : 'hover:text-[#16a34a]'
                }`}
              >
                <span>المنتجات</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-[#16a34a]' : ''}`} />
              </button>

              <AnimatePresence>
                {productsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-1 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2.5 z-50 text-right"
                  >
                    <button
                      onClick={() => { navigate('catalog', 'fertilizers'); setProductsDropdownOpen(false); }}
                      className="w-full text-right px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#0c391f] flex items-center justify-between"
                    >
                      <span>أسمدة ومغذيات</span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">شائع</span>
                    </button>
                    <button
                      onClick={() => { navigate('catalog', 'seeds'); setProductsDropdownOpen(false); }}
                      className="w-full text-right px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#0c391f]"
                    >
                      بذور وتقاوي هجين
                    </button>
                    <button
                      onClick={() => { navigate('catalog', 'protection'); setProductsDropdownOpen(false); }}
                      className="w-full text-right px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#0c391f]"
                    >
                      مبيدات ووقاية نبات
                    </button>
                    <button
                      onClick={() => { navigate('catalog', 'trees'); setProductsDropdownOpen(false); }}
                      className="w-full text-right px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#0c391f] flex items-center justify-between"
                    >
                      <span>أشجار وشتلات مثمرة</span>
                      <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">جديد</span>
                    </button>
                    <button
                      onClick={() => { navigate('catalog', 'greenhouses'); setProductsDropdownOpen(false); }}
                      className="w-full text-right px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#0c391f]"
                    >
                      بيوت محمية وشاش تظليل
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => { navigate('catalog'); setProductsDropdownOpen(false); }}
                      className="w-full text-right px-4 py-2 text-xs font-bold text-[#16a34a] hover:bg-emerald-50"
                    >
                      عرض كافة المنتجات (15) ←
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* الخدمات ⌵ with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => navigate('catalog', 'services')}
                className="flex items-center gap-1 py-2 cursor-pointer transition-colors hover:text-[#16a34a]"
              >
                <span>الخدمات</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#16a34a]' : ''}`} />
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-1 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2.5 z-50 text-right"
                  >
                    <button
                      onClick={() => { navigate('catalog', 'services'); setServicesDropdownOpen(false); }}
                      className="w-full text-right px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#0c391f]"
                    >
                      شبكات وأنظمة الري الحديثة
                    </button>
                    <button
                      onClick={() => { navigate('catalog', 'services'); setServicesDropdownOpen(false); }}
                      className="w-full text-right px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#0c391f]"
                    >
                      تأجير معدات زراعية ثقيلة
                    </button>
                    <button
                      onClick={() => { navigate('catalog', 'services'); setServicesDropdownOpen(false); }}
                      className="w-full text-right px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-[#0c391f]"
                    >
                      التواصل مع مهندس زراعي معتمد
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* المزارعين */}
            <button
              type="button"
              onClick={() => handleScrollToSection('solutions')}
              className="py-2 cursor-pointer transition-colors hover:text-[#16a34a]"
            >
              المزارعين
            </button>

            {/* الشركات الزراعية */}
            <button
              type="button"
              onClick={() => handleScrollToSection('brands')}
              className="py-2 cursor-pointer transition-colors hover:text-[#16a34a]"
            >
              الشركات الزراعية
            </button>

            {/* المدونة */}
            <button
              type="button"
              onClick={handleBlogClick}
              className="py-2 cursor-pointer transition-colors hover:text-[#16a34a]"
            >
              المدونة
            </button>

          </div>

          {/* Left Section in RTL: User Login / Profile Pill + Divider + Cart & Wishlist */}
          <div className="flex items-center gap-3">
            
            {/* Wishlist Button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('wishlist')}
              aria-label="قائمة المفضلة"
              className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                currentView === 'wishlist' ? 'bg-[#e8f5e9] text-[#0c391f]' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </motion.button>

            {/* Shopping Cart Button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('cart')}
              aria-label="سلة التسوق"
              className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                currentView === 'cart' ? 'bg-[#e8f5e9] text-[#0c391f]' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#16a34a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            </motion.button>

            {/* Subtle Divider */}
            <span className="h-6 w-px bg-gray-200 hidden sm:inline-block" />

            {/* User / Login Pill Button */}
            {user?.isLoggedIn ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('profile')}
                className="bg-[#0c391f] hover:bg-[#072413] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
              >
                <User className="w-4 h-4 text-[#a3f69c]" />
                <span className="max-w-[110px] truncate">{user.name.split(' ')[0]}</span>
              </motion.button>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('login')}
                className="bg-[#0c391f] hover:bg-[#072413] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
              >
                <User className="w-4 h-4 text-[#a3f69c]" />
                <span>دخول / تسجيل</span>
              </motion.button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="lg:hidden border-t border-gray-100 py-3 space-y-1.5 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => { navigate('home'); setMobileMenuOpen(false); }}
                className="w-full text-right block px-3 py-2 rounded-xl font-bold text-[#0c391f] hover:bg-emerald-50"
              >
                الرئيسية
              </button>
              <button
                type="button"
                onClick={() => { navigate('catalog'); setMobileMenuOpen(false); }}
                className="w-full text-right block px-3 py-2 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
              >
                المنتجات الزراعية
              </button>
              <button
                type="button"
                onClick={() => { navigate('catalog', 'services'); setMobileMenuOpen(false); }}
                className="w-full text-right block px-3 py-2 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
              >
                الخدمات والاستشارات
              </button>
              <button
                type="button"
                onClick={() => handleScrollToSection('solutions')}
                className="w-full text-right block px-3 py-2 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
              >
                حلول المزارعين
              </button>
              <button
                type="button"
                onClick={() => handleScrollToSection('brands')}
                className="w-full text-right block px-3 py-2 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
              >
                الشركات الزراعية والموردين
              </button>
              <button
                type="button"
                onClick={handleBlogClick}
                className="w-full text-right block px-3 py-2 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
              >
                المدونة والإرشادات الموسمية
              </button>
              <div className="border-t border-gray-100 my-2 pt-2">
                <button
                  type="button"
                  onClick={() => { navigate(user?.isLoggedIn ? 'profile' : 'login'); setMobileMenuOpen(false); }}
                  className="w-full text-center py-2.5 rounded-full font-bold bg-[#0c391f] text-white"
                >
                  {user?.isLoggedIn ? 'حساب المزرعة' : 'دخول / تسجيل جديد'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Blog Toast notification */}
      <AnimatePresence>
        {blogToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#0c391f] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-2xl border border-emerald-400 z-50 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#a3f69c]" />
            <span>مدونة نبتة الإرشادية وجداول التسميد الموسمية قيد التحديث المستمر!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
