import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { 
  Heart, 
  Trees, 
  FlaskConical, 
  Wheat, 
  ShieldCheck, 
  Warehouse, 
  Sparkles, 
  ArrowLeft,
  Plus,
  Zap,
  CheckCircle2,
  Wrench
} from 'lucide-react';

function ProductCard({ 
  item, 
  inWish, 
  isAdded, 
  toggleWishlist, 
  onAddToCart, 
  onBuyNow, 
  navigate 
}) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="bg-white border border-gray-100 hover:border-[#a3f69c] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between group relative"
    >
      {/* Product Badge */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 items-end pointer-events-none">
        <span className="bg-[#00351a] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
          {item.badge}
        </span>
        {item.originalPrice > item.price && (
          <span className="bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            خصم {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Wishlist Button - Green when active */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.1 }}
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(item.id);
        }}
        className={`absolute top-3 left-3 z-10 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
          inWish
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-300 shadow-sm'
            : 'bg-white/80 hover:bg-white text-gray-400 hover:text-emerald-500 shadow-xs'
        }`}
        aria-label={inWish ? "إزالة من المفضلة" : "إضافة للمفضلة"}
      >
        <Heart className={`w-4 h-4 ${inWish ? 'fill-emerald-600 text-emerald-600' : 'text-gray-400'}`} />
      </motion.button>

      {/* Product Image */}
      <div
        onClick={() => navigate('product-details', item)}
        className="w-full h-52 overflow-hidden bg-gray-50 cursor-pointer relative p-3 flex items-center justify-center"
      >
        <img
          src={item.image}
          alt={item.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Weight */}
          <div className="flex items-center justify-between text-xs text-[#6b7280] mb-1.5">
            <span className="font-medium text-[#0e4d2b] bg-[#eaf2eb] px-2 py-0.5 rounded text-[11px]">
              {item.categoryName}
            </span>
            <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-medium text-[#404941]">
              {item.weight}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => navigate('product-details', item)}
            className="font-bold text-[#00351a] text-sm sm:text-[15px] leading-snug line-clamp-2 hover:text-[#0e4d2b] cursor-pointer mb-2"
          >
            {item.name}
          </h3>

          {/* Specs Snippet */}
          <p className="text-[11px] text-[#6b7280] line-clamp-1 mb-3">
            {item.composition}
          </p>
        </div>

        {/* Price and Action Buttons */}
        <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-[#00351a]">
                {item.price}
              </span>
              <span className="text-xs font-semibold text-[#00351a]">ج.م</span>
            </div>
            {item.originalPrice > item.price && (
              <span className="text-xs text-[#9ca3af] line-through">
                {item.originalPrice} ج.م
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {isAdded ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('cart');
                }}
                className="bg-[#1b6d24] text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer ring-2 ring-[#a3f69c]"
                title="انتقل للسلة لتأكيد الطلب"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a3f69c] animate-pulse" />
                <span>تأكيد الطلب</span>
              </motion.button>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => onAddToCart(e, item)}
                className="bg-[#0e4d2b] hover:bg-[#00351a] text-white text-[11px] font-bold px-2.5 py-2 rounded-xl shadow-xs hover:shadow transition-colors flex items-center gap-1 cursor-pointer"
                title="أضف إلى السلة"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>أضف للسلة</span>
              </motion.button>
            )}

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => onBuyNow(e, item)}
              className="bg-[#a3f69c] hover:bg-[#85e87d] text-[#00351a] text-[11px] font-bold px-2.5 py-2 rounded-xl shadow-xs hover:shadow transition-colors flex items-center gap-1 cursor-pointer"
              title="شراء فوري والانتقال لصفحة تأكيد الشراء"
            >
              <Zap className="w-3.5 h-3.5 fill-[#00351a]" />
              <span>اشتري فوراً</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const { addToCart, toggleWishlist, isInWishlist, navigate } = useCart();
  const [activeTab, setActiveTab] = useState('all');
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart(item, 1);
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 2500);
  };

  const handleBuyNow = (e, item) => {
    e.stopPropagation();
    addToCart(item, 1);
    navigate('checkout');
  };

  // Filter tabs definition
  const offerTabs = [
    { id: 'all', name: 'جميع العروض', icon: Sparkles },
    { id: 'trees', name: 'أشجار وشتلات', icon: Trees },
    { id: 'fertilizers', name: 'أسمدة ومغذيات', icon: FlaskConical },
    { id: 'seeds', name: 'بذور وتقاوي', icon: Wheat },
    { id: 'protection', name: 'مبيدات ووقاية', icon: ShieldCheck },
    { id: 'greenhouses', name: 'بيوت محمية', icon: Warehouse },
    { id: 'services', name: 'خدمات واستشارات', icon: Wrench },
  ];

  // Grouped category sections when "all" is active
  const categorySections = [
    {
      id: 'trees',
      title: 'قسم الأشجار والشتلات المعتمدة',
      subtitle: 'شتلات زيتون، فسائل نخيل نسيجي، موالح ومانجو جاهزة للغرس المباشر',
      icon: Trees,
      tag: 'إنتاج مشاتل مصر',
      items: products.filter(p => p.category === 'trees')
    },
    {
      id: 'fertilizers',
      title: 'قسم الأسمدة والمغذيات الورقية والتحجيم',
      subtitle: 'مركبات NPK، هيومات بوتاسيوم نقية، وكالسيوم بورون للتزهير وعقد الثمار',
      icon: FlaskConical,
      tag: 'تسميد وتحجيم متوازن',
      items: products.filter(p => p.category === 'fertilizers').slice(0, 4)
    },
    {
      id: 'services',
      title: 'قسم الخدمات والاستشارات الزراعية والهندسية',
      subtitle: 'شبكات ري حديثة، تأجير معدات ثقيلة، والتواصل المباشر مع استشاري زراعي',
      icon: Wrench,
      tag: 'تنفيذ واستشارات ميدانية',
      items: products.filter(p => p.category === 'services')
    },
    {
      id: 'seeds',
      title: 'قسم البذور، الوقاية الحيوية ومستلزمات الحماية',
      subtitle: 'تقاوي هجين عالية الإنبات، مبيدات وقائية عضوية، وشباك حماية ضد الإجهاد',
      icon: Wheat,
      tag: 'وقاية ومضاعفة إنتاج',
      items: [
        products.find(p => p.id === 'prod-3'), // بذور طماطم
        products.find(p => p.id === 'prod-2'), // مبيد عضوي
        products.find(p => p.id === 'prod-4'), // لفة شباك تظليل
        products.find(p => p.id === 'prod-8'), // سماد NPK عبوة محكمة
      ].filter(Boolean)
    }
  ];

  // Filtered list when a specific tab is selected
  const activeTabProducts = activeTab === 'all' 
    ? [] 
    : products.filter(p => p.category === activeTab);

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10" data-node-id="100:863">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-gray-200/80 pb-5 mb-6 gap-4">
        <div>
          <span className="text-[#0e4d2b] font-bold text-xs uppercase tracking-wider bg-[#eaf2eb] px-3 py-1 rounded-full inline-block mb-2">
            الأكثر طلباً وتوصية
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#00351a]">
            أحدث المنتجات الزراعية والعروض التخصصية
          </h2>
          <p className="text-[#404941] text-xs sm:text-sm mt-1">
            منتجات مختبرة وخدمات هندسية مرتبة بحسب الأقسام الزراعية لتسهيل تلبية احتياجات مزرعتك
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('catalog')}
          className="text-[#00351a] hover:text-[#0e4d2b] font-bold text-sm flex items-center gap-1.5 transition-colors self-end sm:self-auto cursor-pointer"
        >
          <span>عرض كافة المنتجات والخدمات في الكتالوج</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {offerTabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#00351a] text-white shadow-md'
                  : 'bg-white hover:bg-gray-100 text-[#404941] border border-gray-200'
              }`}
            >
              <TabIcon className="w-3.5 h-3.5" />
              <span>{tab.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Animate Tab Content Switching */}
      <AnimatePresence mode="wait">
        {/* Mode A: "all" view - Each category displayed together in its own organized row */}
        {activeTab === 'all' && (
          <motion.div 
            key="all-categories"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {categorySections.map((section) => {
              const SectionIcon = section.icon;
              return (
                <motion.div 
                  key={section.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-50/40 p-4 sm:p-6 rounded-[28px] border border-gray-100"
                >
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-gray-200/80 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#eaf2eb] text-[#0e4d2b] flex items-center justify-center shrink-0 shadow-inner">
                        <SectionIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-black text-base sm:text-lg text-[#00351a]">
                            {section.title}
                          </h3>
                          <span className="text-[11px] font-bold text-[#0e4d2b] bg-[#eaf2eb] px-2.5 py-0.5 rounded-full">
                            {section.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#6b7280] mt-0.5">
                          {section.subtitle}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate('catalog', section.id)}
                      className="text-xs font-bold text-[#0e4d2b] hover:text-[#00351a] flex items-center gap-1.5 cursor-pointer self-start sm:self-auto hover:underline shrink-0"
                    >
                      <span>تصفح هذا القسم بالكامل</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 4 Cards Grid - All items in this category side-by-side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {section.items.map((item) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        inWish={isInWishlist(item.id)}
                        isAdded={Boolean(addedItems[item.id])}
                        toggleWishlist={toggleWishlist}
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow}
                        navigate={navigate}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Mode B: Single Category Filter view */}
        {activeTab !== 'all' && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {activeTabProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <p className="text-sm text-gray-500">لا توجد عروض ترويجية نشطة حالياً في هذا القسم.</p>
                <button
                  type="button"
                  onClick={() => navigate('catalog', activeTab)}
                  className="mt-4 bg-[#00351a] text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer hover:bg-[#0e4d2b] transition-colors"
                >
                  تصفح كافة منتجات القسم في الكتالوج
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeTabProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    inWish={isInWishlist(item.id)}
                    isAdded={Boolean(addedItems[item.id])}
                    toggleWishlist={toggleWishlist}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    navigate={navigate}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
