import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products } from '../data';
import { 
  ShoppingCart, 
  Truck, 
  Trash2, 
  Check, 
  Lock, 
  ArrowLeft, 
  Plus, 
  Minus,
  MessageCircle 
} from 'lucide-react';
import { createCartWhatsAppUrl } from '../utils/whatsapp';

export default function CartView() {
  const {
    cartItems,
    cartCount,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shippingFee,
    isFreeShipping,
    freeShippingThreshold,
    discountAmount,
    coupon,
    applyCoupon,
    total,
    addToCart,
    navigate
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  // Cross sell items (items not already in cart)
  const cartProductIds = cartItems.map(i => i.product.id);
  const crossSellProducts = products.filter(p => !cartProductIds.includes(p.id)).slice(0, 3);

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const whatsappUrl = createCartWhatsAppUrl(cartItems, subtotal, shippingFee, discountAmount, total);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-16 text-center" data-node-id="122:7">
        <div className="w-20 h-20 bg-[#eff8f2] rounded-full flex items-center justify-center text-[#0e4d2b] mx-auto mb-4">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-[#00351a] mb-2">
          سلة التسوق فارغة حالياً
        </h2>
        <p className="text-sm text-[#404941] mb-8 max-w-sm mx-auto">
          لم تقم بإضافة أي مستلزمات زراعية إلى سلتك بعد. تصفح تشكيلة الأسمدة والتقاوي المعتمدة في مصر.
        </p>
        <button
          onClick={() => navigate('catalog')}
          className="bg-[#00351a] hover:bg-[#0e4d2b] text-white text-sm font-bold px-8 py-3.5 rounded-full shadow-md transition-all cursor-pointer"
        >
          تصفح المتجر والمنتجات
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8" data-node-id="122:7">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#00351a]">
            سلة التسوق ومستلزمات الطلب
          </h1>
          <p className="text-xs sm:text-sm text-[#404941] mt-1">
            لديك <strong>{cartCount}</strong> منتجات في السلة
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer"
        >
          إفراغ السلة
        </button>
      </div>

      {/* Free Shipping Progress Notification */}
      <div className="bg-[#eff8f2] border border-[#a3f69c] rounded-2xl p-4 sm:p-5 mb-8">
        <div className="flex items-center justify-between text-xs sm:text-sm mb-2 font-bold">
          <span className="text-[#00351a] flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#1b6d24] shrink-0" />
            {isFreeShipping ? (
              <span className="text-[#1b6d24]">تهانينا! لقد حصلت على شحن مجاني مباشر لمزرعتك في مصر.</span>
            ) : (
              <span>
                أضف منتجات بقيمة <strong>{remainingForFreeShipping} ج.م</strong> إضافية للحصول على شحن مجاني
              </span>
            )}
          </span>
          <span className="text-[#0e4d2b]">{shippingProgress}%</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#1b6d24] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${shippingProgress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Grid: Cart Items (Left 8) + Summary Box (Right 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart Items Table / List */}
        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0, overflow: 'hidden' }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 shrink-0 p-2 flex items-center justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] bg-gray-100 text-[#404941] px-2 py-0.5 rounded font-medium inline-block mb-1">
                    {item.product.weight}
                  </span>
                  <h3
                    onClick={() => navigate('product-details', item.product)}
                    className="font-bold text-sm text-[#00351a] hover:text-[#0e4d2b] cursor-pointer line-clamp-1"
                  >
                    {item.product.name}
                  </h3>
                  <div className="text-xs text-[#0e4d2b] font-bold mt-1">
                    {item.product.price} ج.م
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Line Total */}
              <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 p-0.5">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center font-bold text-[#00351a] shadow-xs cursor-pointer text-xs"
                    aria-label="تقليل الكمية"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-[#00351a]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center font-bold text-[#00351a] shadow-xs cursor-pointer text-xs"
                    aria-label="زيادة الكمية"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right sm:w-24">
                  <span className="font-black text-sm text-[#00351a]">
                    {item.product.price * item.quantity} ج.م
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-gray-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                  title="حذف من السلة"
                  aria-label="حذف من السلة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

          {/* Continue Shopping Button */}
          <div className="pt-2">
            <button
              onClick={() => navigate('catalog')}
              className="text-xs font-bold text-[#00351a] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>العودة لإضافة مزيد من المستلزمات</span>
            </button>
          </div>
        </div>

        {/* Order Summary Box (Cols 4) */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm space-y-5">
          <h2 className="font-black text-lg text-[#00351a] pb-4 border-b border-gray-100">
            ملخص الطلب والفاتورة
          </h2>

          {/* Coupon Input */}
          <div>
            <label className="block text-xs font-bold text-[#404941] mb-2">
              كود الخصم أو قسيمة المزرعة:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="جرّب: NABTA10"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                dir="ltr"
              />
              <button
                onClick={() => applyCoupon(couponInput)}
                className="bg-[#0e4d2b] hover:bg-[#00351a] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                تطبيق
              </button>
            </div>
            {coupon.discountPercent > 0 && (
              <span className="text-[11px] text-[#1b6d24] font-bold flex items-center gap-1 mt-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>تم تطبيق كود {coupon.code} (-{coupon.discountPercent}%)</span>
              </span>
            )}
          </div>

          {/* Breakdown Lines */}
          <div className="space-y-3 text-xs text-[#404941] pt-2 border-t border-gray-100">
            <div className="flex justify-between">
              <span>المجموع الفرعي ({cartCount} منتجات):</span>
              <span className="font-bold">{subtotal} ج.م</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-[#ba1a1a]">
                <span>خصم الكوبون ({coupon.discountPercent}%):</span>
                <span className="font-bold">-{discountAmount} ج.م</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>تكلفة الشحن والتوصيل للمزرعة:</span>
              <span className="font-bold">
                {isFreeShipping ? (
                  <span className="text-[#1b6d24]">مجاني</span>
                ) : (
                  <span>{shippingFee} ج.م</span>
                )}
              </span>
            </div>

            <div className="flex justify-between text-[11px] text-[#6b7280]">
              <span>ضريبة القيمة المضافة:</span>
              <span>مشمولة بالأسعار</span>
            </div>
          </div>

          {/* Total Line */}
          <div className="pt-4 border-t border-gray-200 flex items-baseline justify-between">
            <span className="text-base font-black text-[#00351a]">
              الإجمالي النهائي:
            </span>
            <div className="text-right">
              <span className="text-2xl font-black text-[#00351a]">
                {total}
              </span>
              <span className="text-xs font-bold text-[#00351a] mr-1">ج.م</span>
            </div>
          </div>

          {/* Dual Checkout CTAs */}
          <div className="space-y-2.5 pt-2">
            {/* Proceed to Web Checkout */}
            <button
              onClick={() => navigate('checkout')}
              className="w-full bg-[#00351a] hover:bg-[#0e4d2b] text-white text-sm font-bold py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>متابعة الطلب والدفع</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Direct WhatsApp Order Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              title="إرسال قائمة السلة عبر الواتساب"
            >
              <MessageCircle className="w-5 h-5" />
              <span>طلب محتويات السلة عبر الواتساب (01029317818)</span>
            </a>
          </div>

          <p className="text-[11px] text-center text-[#6b7280] flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#1b6d24]" />
            <span>توصيل سريع لكافة مزارع مصر مع إمكانية الفحص قبل الاستلام</span>
          </p>
        </div>

      </div>

      {/* Recommended Cross-Sells Section */}
      {crossSellProducts.length > 0 && (
        <div className="mt-16 pt-10 border-t border-gray-200">
          <h2 className="text-xl font-black text-[#00351a] mb-6">
            منتجات إضافية يشتريها المزارعون عادةً مع هذه الأصناف
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {crossSellProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-3"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 shrink-0 p-1 flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-[#00351a] truncate">
                    {p.name}
                  </h4>
                  <span className="text-xs font-bold text-[#0e4d2b] block mt-0.5">
                    {p.price} ج.م
                  </span>
                </div>
                <button
                  onClick={() => addToCart(p, 1)}
                  className="bg-[#eaf2eb] hover:bg-[#0e4d2b] text-[#00351a] hover:text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>أضف</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
