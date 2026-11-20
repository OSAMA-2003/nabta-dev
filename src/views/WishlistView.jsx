import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { 
  Heart, 
  Trash2, 
  Plus, 
  Zap, 
  CheckCircle2, 
  ArrowLeft, 
  MessageCircle,
  PackageOpen
} from 'lucide-react';
import { createCartWhatsAppUrl } from '../utils/whatsapp';

export default function WishlistView() {
  const { 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    navigate 
  } = useCart();

  const [addedMap, setAddedMap] = useState({});

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    setAddedMap(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedMap(prev => ({ ...prev, [item.id]: false }));
    }, 2500);
  };

  const handleBuyNow = (item) => {
    addToCart(item, 1);
    navigate('checkout');
  };

  const handleOrderAllWhatsApp = () => {
    if (wishlistProducts.length === 0) return;
    const sub = wishlistProducts.reduce((sum, p) => sum + p.price, 0);
    const url = createCartWhatsAppUrl(
      wishlistProducts.map(p => ({ product: p, quantity: 1 })),
      sub,
      0,
      0,
      sub
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8" dir="rtl">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-gray-100 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#00351a]">
              قائمتي المفضلة
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#404941]">
            المستلزمات والشتلات والخدمات التي قمت بحفظها للرجوع إليها أو طلبها مباشرة
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOrderAllWhatsApp}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>طلب المفضلة كاملة عبر الواتساب</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {wishlistProducts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white border border-gray-100 rounded-[28px] p-8 max-w-lg mx-auto shadow-xs"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <PackageOpen className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-black text-[#00351a] mb-2">
            قائمة المفضلة فارغة حالياً
          </h2>
          <p className="text-xs text-[#404941] mb-6 leading-relaxed">
            يمكنك تصفح الكتالوج الزراعي والأشجار والخدمات والضغط على رمز القلب لحفظ أي صنف هنا للطلب السريع في أي وقت.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('catalog')}
            className="bg-[#00351a] hover:bg-[#0e4d2b] text-white font-bold text-xs px-6 py-3 rounded-full shadow-md transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>استكشاف المنتجات والخدمات الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
        </motion.div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {wishlistProducts.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                className="bg-white border border-gray-100 hover:border-[#a3f69c] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between group relative"
              >
                {/* Active Green Heart (indicates selected) */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => toggleWishlist(item.id)}
                  className="absolute top-3 left-3 z-10 p-2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 shadow-sm cursor-pointer"
                  title="إزالة من المفضلة"
                >
                  <Heart className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                </motion.button>

                {/* Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-[#00351a] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                    {item.badge}
                  </span>
                </div>

                {/* Product Image */}
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

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#6b7280] mb-1">
                      <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                        {item.categoryName}
                      </span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] text-[#404941]">
                        {item.weight}
                      </span>
                    </div>

                    <h3
                      onClick={() => navigate('product-details', item)}
                      className="font-bold text-[#00351a] text-sm leading-snug line-clamp-2 hover:text-[#0e4d2b] cursor-pointer mb-2"
                    >
                      {item.name}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-gray-500 text-xs">السعر:</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black text-[#00351a]">
                          {item.price}
                        </span>
                        <span className="text-xs font-bold text-[#00351a]">ج.م</span>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      {addedMap[item.id] ? (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => navigate('cart')}
                          className="bg-[#1b6d24] text-white text-[11px] font-bold py-2 rounded-xl shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer ring-2 ring-[#a3f69c]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#a3f69c] animate-pulse" />
                          <span>تأكيد الطلب</span>
                        </motion.button>
                      ) : (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleAddToCart(item)}
                          className="bg-[#0e4d2b] hover:bg-[#00351a] text-white text-[11px] font-bold py-2 rounded-xl shadow-xs hover:shadow transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>أضف للسلة</span>
                        </motion.button>
                      )}

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleBuyNow(item)}
                        className="bg-[#a3f69c] hover:bg-[#85e87d] text-[#00351a] text-[11px] font-bold py-2 rounded-xl shadow-xs hover:shadow transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 fill-[#00351a]" />
                        <span>اشتري فوراً</span>
                      </motion.button>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(item.id)}
                      className="text-gray-400 hover:text-red-500 text-[11px] font-medium py-1 text-center transition-colors flex items-center justify-center gap-1 cursor-pointer hover:bg-gray-50 rounded-lg"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>حذف من المفضلة</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

    </div>
  );
}
