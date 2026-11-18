import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products } from '../data';
import iconHeart from '../assets/icon-heart.svg';
import { Truck, Microscope, Star, Plus, Minus, MessageCircle } from 'lucide-react';
import { WHATSAPP_PHONE } from '../utils/whatsapp';

export default function ProductDetailsView() {
  const { selectedProduct, addToCart, toggleWishlist, isInWishlist, navigate } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'usage' | 'reviews'

  if (!selectedProduct) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-[#00351a]">لم يتم تحديد منتج</h2>
        <button
          onClick={() => navigate('catalog')}
          className="mt-4 bg-[#00351a] text-white px-6 py-2 rounded-xl text-sm"
        >
          العودة للمتجر
        </button>
      </div>
    );
  }

  const inWish = isInWishlist(selectedProduct.id);
  const relatedProducts = products
    .filter(p => p.id !== selectedProduct.id && p.category === selectedProduct.category)
    .slice(0, 3);

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    navigate('cart');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8" data-node-id="103:5874">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#6b7280] mb-6">
        <button onClick={() => navigate('home')} className="hover:text-[#00351a] cursor-pointer">
          الرئيسية
        </button>
        <span>/</span>
        <button onClick={() => navigate('catalog')} className="hover:text-[#00351a] cursor-pointer">
          المتجر
        </button>
        <span>/</span>
        <button
          onClick={() => navigate('catalog', selectedProduct.category)}
          className="hover:text-[#00351a] cursor-pointer"
        >
          {selectedProduct.categoryName}
        </button>
        <span>/</span>
        <span className="text-[#00351a] font-bold truncate max-w-[200px] sm:max-w-none">
          {selectedProduct.name}
        </span>
      </nav>

      {/* Main Product Showcase (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white p-6 sm:p-8 rounded-[24px] border border-gray-100 shadow-sm mb-12">
        
        {/* Media / Gallery Column (Cols 5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 relative group">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
              <span className="bg-[#00351a] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {selectedProduct.badge}
              </span>
              <span className="bg-[#1b6d24] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                {selectedProduct.origin}
              </span>
            </div>
            {/* Wishlist button */}
            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md shadow-sm transition-all cursor-pointer ${
                inWish ? 'bg-red-50 text-[#ba1a1a]' : 'bg-white/80 hover:bg-white text-gray-600'
              }`}
              aria-label="إضافة للمفضلة"
            >
              <img src={iconHeart} alt="" className={`w-5 h-5 ${inWish ? 'filter invert-[18%] sepia-[86%] saturate-[5000%] hue-rotate-[340deg]' : ''}`} />
            </button>
          </div>

          {/* Quick Trust Badges */}
          <div className="grid grid-cols-2 gap-3 text-right">
            <div className="bg-[#eff8f2] p-3 rounded-xl border border-[#a3f69c]/40 text-xs">
              <span className="font-bold text-[#00351a] flex items-center gap-1.5 mb-0.5">
                <Truck className="w-4 h-4 text-[#1b6d24]" />
                <span>شحن مجاني</span>
              </span>
              <span className="text-[#404941] text-[11px]">للطلبات فوق 1500 ج.م لكافة محافظات مصر</span>
            </div>
            <div className="bg-[#eff8f2] p-3 rounded-xl border border-[#a3f69c]/40 text-xs">
              <span className="font-bold text-[#00351a] flex items-center gap-1.5 mb-0.5">
                <Microscope className="w-4 h-4 text-[#1b6d24]" />
                <span>فحص جودة معملي</span>
              </span>
              <span className="text-[#404941] text-[11px]">معتمد من وزارة الزراعة واستصلاح الأراضي</span>
            </div>
          </div>
        </div>

        {/* Info & Purchase Column (Cols 7) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* SKU and Rating */}
            <div className="flex items-center justify-between text-xs text-[#6b7280] mb-2">
              <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                SKU: {selectedProduct.sku}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{selectedProduct.rating}</span>
                <span className="text-gray-400">({selectedProduct.reviewsCount} تقييم مزارع)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-[#00351a] leading-tight mb-4">
              {selectedProduct.name}
            </h1>

            {/* Price Box */}
            <div className="bg-[#f8faf8] border border-gray-100 rounded-2xl p-4 mb-6 flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#00351a]">
                {selectedProduct.price}
              </span>
              <span className="text-sm font-bold text-[#00351a]">جنيه مصري (ج.م)</span>
              {selectedProduct.originalPrice > selectedProduct.price && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    {selectedProduct.originalPrice} ج.م
                  </span>
                  <span className="bg-[#ba1a1a] text-white text-xs font-bold px-2 py-0.5 rounded-full mr-auto">
                    وفر {selectedProduct.originalPrice - selectedProduct.price} ج.م
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm text-[#404941] leading-relaxed mb-6">
              {selectedProduct.description}
            </p>

            {/* Key Specs Pills */}
            <div className="space-y-2 mb-6 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#00351a] w-24 shrink-0">التركيب الكيميائي:</span>
                <span className="text-[#404941] bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                  {selectedProduct.composition}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#00351a] w-24 shrink-0">العبوة والوزن:</span>
                <span className="text-[#404941] bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                  {selectedProduct.weight}
                </span>
              </div>
            </div>
          </div>

          {/* Action Row: Quantity + Add to Cart + Buy Now */}
          <div className="pt-6 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center font-bold text-[#00351a] shadow-xs cursor-pointer"
                  aria-label="تقليل الكمية"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center font-bold text-sm text-[#00351a]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center font-bold text-[#00351a] shadow-xs cursor-pointer"
                  aria-label="زيادة الكمية"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-xs text-[#6b7280]">
                المجموع: <strong>{selectedProduct.price * quantity} ج.م</strong>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(selectedProduct, quantity)}
                className="flex-1 bg-[#00351a] hover:bg-[#0e4d2b] text-white font-bold text-sm py-3.5 px-6 rounded-full shadow-md hover:shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>أضف إلى سلة التسوق</span>
                <Plus className="w-4 h-4" />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="bg-[#a0f399] hover:bg-[#8ee687] text-[#00351a] font-bold text-sm py-3.5 px-8 rounded-full shadow-md transition-colors cursor-pointer"
              >
                شراء فوري ومتابعة الدفع
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`مرحباً نبتة، أود طلب المنتج: "${selectedProduct.name}"\nالكمية: ${quantity} عبوة\nالسعر: ${selectedProduct.price * quantity} ج.م\nيرجى التواصل لتأكيد الشحن إلى المزرعة.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm py-3.5 px-5 rounded-full shadow-md transition-colors flex items-center justify-center gap-2"
                title="طلب مباشر عبر الواتساب"
              >
                <MessageCircle className="w-4 h-4" />
                <span>طلب عبر الواتساب</span>
              </motion.a>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs: Technical Sheet / Dosage & Recommendations */}
      <div className="bg-white rounded-[24px] border border-gray-100 p-6 sm:p-8 shadow-sm mb-12">
        <div className="flex border-b border-gray-200 gap-8 mb-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-bold transition-colors cursor-pointer ${
              activeTab === 'specs'
                ? 'border-b-2 border-[#00351a] text-[#00351a]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            البطاقة الفنية والتحليلية
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`pb-3 text-sm font-bold transition-colors cursor-pointer ${
              activeTab === 'usage'
                ? 'border-b-2 border-[#00351a] text-[#00351a]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            معدلات الاستخدام والتسميد
          </button>
        </div>

        {activeTab === 'specs' ? (
          <div className="space-y-4 text-xs sm:text-sm text-[#404941] leading-relaxed">
            <p><strong>التركيب:</strong> {selectedProduct.composition}</p>
            <p><strong>المصدر والاعتماد:</strong> {selectedProduct.origin} - معتمد بموجب ترخيص استيراد وتداول الأسمدة الزراعية.</p>
            <p><strong>شروط التخزين:</strong> يحفظ في مكان جاف ومظلل بعيداً عن أشعة الشمس المباشرة ومصادر الرطوبة في درجات حرارة بين 5 - 35 مئوية.</p>
          </div>
        ) : (
          <div className="space-y-4 text-xs sm:text-sm text-[#404941] leading-relaxed">
            <p><strong>طريقة الاستخدام الموصى بها:</strong> {selectedProduct.usage}</p>
            <p><strong>توصية المهندس الزراعي:</strong> يفضل إجراء الرش في الصباح الباكر أو بعد انكسار أشعة الشمس لتفادي حروق الأوراق وضمان أقصى استفادة للثغور التنفسية.</p>
          </div>
        )}
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-black text-[#00351a] mb-6">
            منتجات ذات صلة يوصي بها الخبراء
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedProducts.map(p => (
              <div
                key={p.id}
                onClick={() => {
                  navigate('product-details', p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white border border-gray-100 hover:border-[#a3f69c] rounded-2xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-4 items-center"
              >
                <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                <div>
                  <h4 className="font-bold text-xs text-[#00351a] line-clamp-1 mb-1">
                    {p.name}
                  </h4>
                  <span className="text-xs font-black text-[#0e4d2b] block mb-1">
                    {p.price} ج.م
                  </span>
                  <span className="text-[10px] text-gray-400">انقر لعرض التفاصيل</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
