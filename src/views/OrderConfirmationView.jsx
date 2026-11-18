import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Check, MessageCircle, ArrowLeft } from 'lucide-react';
import { createOrderWhatsAppUrl, DISPLAY_PHONE } from '../utils/whatsapp';

export default function OrderConfirmationView() {
  const { latestOrder, navigate } = useCart();

  if (!latestOrder) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-[#00351a]">لا توجد تفاصيل طلب حالي</h2>
        <button
          onClick={() => navigate('home')}
          className="mt-4 bg-[#00351a] text-white px-6 py-2 rounded-xl text-sm cursor-pointer"
        >
          العودة للصفحة الرئيسية
        </button>
      </div>
    );
  }

  const whatsappUrl = createOrderWhatsAppUrl(latestOrder);

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12" data-node-id="122:1066">
      
      {/* Success Box */}
      <div className="bg-white border border-[#a3f69c] rounded-[28px] p-8 sm:p-12 text-center shadow-md mb-8">
        
        {/* Animated Checkmark Circle */}
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="w-20 h-20 bg-[#eff8f2] border-2 border-[#1b6d24] text-[#1b6d24] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
        >
          <Check className="w-10 h-10 stroke-[2.5]" />
        </motion.div>

        <span className="text-xs font-bold text-[#0e4d2b] bg-[#eaf2eb] px-3.5 py-1.5 rounded-full inline-block mb-3">
          تم استلام وتأكيد طلبك بنجاح في مصر
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-[#00351a] mb-2">
          شكراً لثقتك في منصة نبتة الزراعية!
        </h1>

        <p className="text-sm text-[#404941] max-w-md mx-auto mb-6">
          رقم طلبك هو <strong className="text-[#00351a] font-mono font-black" dir="ltr">{latestOrder.id}</strong>. لقد تم إرسال رسالة نصية وفاتورة إلكترونية لهاتفك المسجل.
        </p>

        {/* WhatsApp Notification Action */}
        <div className="mb-6">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-md transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>متابعة الشحن والتنسيق عبر الواتساب ({DISPLAY_PHONE})</span>
          </motion.a>
        </div>

        {/* Status Callout */}
        <div className="bg-[#eff8f2] border border-[#a3f69c]/60 rounded-2xl p-4 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
          <div>
            <span className="text-gray-500 block">حالة الشحنة الحالية:</span>
            <span className="font-bold text-[#00351a] text-sm">{latestOrder.statusLabel}</span>
          </div>
          <div>
            <span className="text-gray-500 block">الموعد التقديري للوصول للمزرعة:</span>
            <span className="font-bold text-[#1b6d24] text-sm">{latestOrder.estimatedDelivery}</span>
          </div>
        </div>

      </div>

      {/* Order Details Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-6 mb-8 text-xs">
        <h3 className="font-bold text-sm text-[#00351a] pb-3 border-b border-gray-100">
          تفاصيل الشحنة والتسليم
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-gray-400 block mb-1">موقع المزرعة والتوصيل:</span>
            <span className="font-bold text-[#00351a]">{latestOrder.shippingAddress}</span>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">طريقة السداد:</span>
            <span className="font-bold text-[#00351a]">{latestOrder.paymentMethod}</span>
          </div>
        </div>

        {/* Items Recap */}
        <div>
          <span className="text-gray-400 block mb-2">المنتجات المطلوبة:</span>
          <div className="space-y-2 divide-y divide-gray-50">
            {latestOrder.items.map((it, idx) => (
              <div key={idx} className="pt-2 flex items-center justify-between">
                <span>{it.product.name} × <strong>{it.quantity}</strong></span>
                <span className="font-bold">{it.product.price * it.quantity} ج.م</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="pt-4 border-t border-gray-100 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-gray-500">المجموع الفرعي:</span>
            <span>{latestOrder.subtotal} ج.م</span>
          </div>
          {latestOrder.discount > 0 && (
            <div className="flex justify-between text-[#ba1a1a]">
              <span>خصم الكوبون:</span>
              <span>-{latestOrder.discount} ج.م</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">الشحن والتوصيل للمزرعة:</span>
            <span>{latestOrder.shipping === 0 ? 'مجاني' : `${latestOrder.shipping} ج.م`}</span>
          </div>
          <div className="flex justify-between font-black text-sm text-[#00351a] pt-2 border-t border-gray-200">
            <span>الإجمالي المدفوع:</span>
            <span>{latestOrder.total} ج.م</span>
          </div>
        </div>
      </div>

      {/* Navigation CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate('orders')}
          className="bg-[#00351a] hover:bg-[#0e4d2b] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-md transition-all cursor-pointer"
        >
          تتبع مسار شحنتك الميدانية
        </button>
        <button
          onClick={() => navigate('home')}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-[#00351a] font-bold text-sm px-8 py-3.5 rounded-full shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>العودة للصفحة الرئيسية</span>
        </button>
      </div>

    </div>
  );
}
