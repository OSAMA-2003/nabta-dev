import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data';
import iconHeart from '../assets/icon-heart.svg';
import { 
  X, 
  ShieldCheck, 
  Wheat, 
  Sprout, 
  FlaskConical, 
  Droplets, 
  Warehouse, 
  Tractor,
  Trees,
  Plus
} from 'lucide-react';

const categoryIconMap = {
  Sprout,
  FlaskConical,
  Wheat,
  ShieldCheck,
  Droplets,
  Warehouse,
  Tractor,
  Trees
};

export default function CatalogView() {
  const {
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    searchQuery,
    setSearchQuery,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigate
  } = useCart();

  const [sortBy, setSortBy] = useState('recommended');
  const [maxPrice, setMaxPrice] = useState(1000);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategoryFilter !== 'all' && item.category !== selectedCategoryFilter) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTags) return false;
      }
      // Price filter
      if (item.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended default
    });
  }, [selectedCategoryFilter, searchQuery, maxPrice, sortBy]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8" data-node-id="105:10234">
      
      {/* Breadcrumb & Title */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-2">
            <button onClick={() => navigate('home')} className="hover:text-[#00351a] cursor-pointer">
              الرئيسية
            </button>
            <span>/</span>
            <span className="text-[#00351a] font-bold">المتجر والكتالوج الزراعي</span>
            {selectedCategoryFilter !== 'all' && (
              <>
                <span>/</span>
                <span className="text-[#0e4d2b]">
                  {categories.find(c => c.id === selectedCategoryFilter)?.name}
                </span>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#00351a]">
            كتالوج المستلزمات الزراعية المعتمدة
          </h1>
          <p className="text-xs sm:text-sm text-[#404941] mt-1">
            عرض {filteredProducts.length} من أصل {products.length} منتج مسجل
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="text-xs text-[#404941] font-semibold shrink-0">
            ترتيب حسب:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#00351a] focus:outline-none focus:ring-1 focus:ring-[#0e4d2b] cursor-pointer"
          >
            <option value="recommended">الأكثر تطابقاً ومبيعاً</option>
            <option value="price-low">السعر: من الأقل للأعلى</option>
            <option value="price-high">السعر: من الأعلى للأقل</option>
            <option value="rating">التقييم الأعلى</option>
          </select>
        </div>
      </div>

      {/* Main Layout (Sidebar + Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs h-fit">
          {/* Active Search Badge */}
          {searchQuery && (
            <div className="bg-[#eff8f2] p-3 rounded-xl flex items-center justify-between text-xs">
              <span>البحث: <strong>{searchQuery}</strong></span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                aria-label="مسح البحث"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Category Filter List */}
          <div>
            <h3 className="font-bold text-sm text-[#00351a] mb-3 pb-2 border-b border-gray-100">
              الأقسام الزراعية
            </h3>
            <div className="space-y-1">
              {categories.map((cat) => {
                const IconComponent = categoryIconMap[cat.icon] || Sprout;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryFilter(cat.id)}
                    className={`w-full text-right px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      selectedCategoryFilter === cat.id
                        ? 'bg-[#00351a] text-white font-bold shadow-xs'
                        : 'text-[#404941] hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 shrink-0" />
                      <span>{cat.name}</span>
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      selectedCategoryFilter === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Max Price Filter Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-sm text-[#00351a]">
                السقف السعري
              </h3>
              <span className="text-xs font-bold text-[#0e4d2b]">
                حتى {maxPrice} ج.م
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="1500"
              step="25"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#00351a] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>50 ج.م</span>
              <span>1500 ج.م</span>
            </div>
          </div>

          {/* Certified Quality Guarantee Badge in Sidebar */}
          <div className="bg-[#eff8f2] border border-[#a3f69c]/60 p-4 rounded-xl text-right">
            <div className="flex items-center gap-2 mb-1.5 text-[#00351a]">
              <ShieldCheck className="w-5 h-5 text-[#1b6d24] shrink-0" />
              <h4 className="font-bold text-xs">ضمان نبتة للمطابقة</h4>
            </div>
            <p className="text-[11px] text-[#404941] leading-relaxed">
              كافة الأسمدة والبذور مطابقة لاشتراطات الهيئة العامة للغذاء والدواء ووزارة الزراعة.
            </p>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-xs">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center text-[#6b7280]">
                <Wheat className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#00351a] mb-2">
                لم نجد منتجات تطابق معايير البحث الحالية
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                جرّب تعديل الكلمات المفتاحية أو إزالة فلاتر الأقسام والأسعار
              </p>
              <button
                onClick={() => {
                  setSelectedCategoryFilter('all');
                  setSearchQuery('');
                  setMaxPrice(500);
                }}
                className="bg-[#00351a] text-white text-xs font-bold px-6 py-2.5 rounded-full cursor-pointer"
              >
                إعادة تعيين الفلاتر
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filteredProducts.map((item) => {
                  const inWish = isInWishlist(item.id);
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      key={item.id}
                      className="bg-white border border-gray-100 hover:border-[#a3f69c] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between group relative"
                    >
                      {/* Badge */}
                      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 items-end pointer-events-none">
                        <span className="bg-[#00351a] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                          {item.badge}
                        </span>
                      </div>

                      {/* Wishlist Button */}
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.85 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(item.id);
                        }}
                        className={`absolute top-3 left-3 z-10 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                          inWish
                            ? 'bg-red-50 text-[#ba1a1a]'
                            : 'bg-white/80 hover:bg-white text-gray-500 hover:text-red-500'
                        }`}
                        aria-label="إضافة للمفضلة"
                      >
                        <img src={iconHeart} alt="" className={`w-4 h-4 ${inWish ? 'filter invert-[18%] sepia-[86%] saturate-[5000%] hue-rotate-[340deg]' : ''}`} />
                      </motion.button>

                      {/* Image Area */}
                      <div
                        onClick={() => navigate('product-details', item)}
                        className="w-full h-48 overflow-hidden bg-gray-50 cursor-pointer p-4 flex items-center justify-center"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content Area */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-xs text-[#6b7280] mb-1">
                            <span>{item.categoryName}</span>
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-medium text-[#404941]">
                              {item.weight}
                            </span>
                          </div>
                          <h3
                            onClick={() => navigate('product-details', item)}
                            className="font-bold text-[#00351a] text-sm leading-snug line-clamp-2 hover:text-[#0e4d2b] cursor-pointer mb-2"
                          >
                            {item.name}
                          </h3>
                          <p className="text-[11px] text-[#6b7280] line-clamp-2 mb-3">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                          <div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-base font-black text-[#00351a]">
                                {item.price}
                              </span>
                              <span className="text-[11px] font-semibold text-[#00351a]">ج.م</span>
                            </div>
                            {item.originalPrice > item.price && (
                              <span className="text-[10px] text-gray-400 line-through">
                                {item.originalPrice} ج.م
                              </span>
                            )}
                          </div>

                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addToCart(item, 1)}
                            className="bg-[#0e4d2b] hover:bg-[#00351a] text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs hover:shadow transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>أضف للسلة</span>
                            <Plus className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
