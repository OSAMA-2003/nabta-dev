import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { MapPin, CreditCard, Check, ShieldCheck, MessageCircle } from 'lucide-react';
import { createOrderWhatsAppUrl, DISPLAY_PHONE } from '../utils/whatsapp';

export default function CheckoutView() {
  const { cartItems, subtotal, shippingFee, discountAmount, total, placeOrder, user, navigate } = useCart();

  const [formData, setFormData] = useState({
    fullName: user?.name || 'المهندس أسامة أحمد',
    phone: user?.phone || '01029317818',
    region: 'البحيرة والنوبارية',
    city: 'النوبارية',
    farmName: user?.farmName || 'مزرعة الخير الحديثة',
    addressDetails: 'طريق مصر إسكندرية الصحراوي - الكيلو 75 بجوار كوبري المشير',
    paymentMethod: 'فودافون كاش / إنستاباي (InstaPay)',
    notes: 'يرجى التنسيق مع أمين المستودع قبل الوصول بساعة'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    navigate('cart');
    return null;
  }

  const handleOrderSubmit = (sendToWhatsApp = false) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder = placeOrder(formData);
      setIsSubmitting(false);

      if (sendToWhatsApp) {
        const waUrl = createOrderWhatsAppUrl(newOrder);
        window.open(waUrl, '_blank');
      }
    }, 500);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8" data-node-id="122:562">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-[#00351a]">
          إتمام الطلب وشحن المستلزمات لمزارع مصر
        </h1>
        <p className="text-xs sm:text-sm text-[#404941] mt-1">
          يرجى إدخال بيانات موقع المزرعة وطريقة السداد لتأكيد حجز الشحنة
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Farm & Contact Information (Cols 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Farm Details Card */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 shadow-xs">
            <h2 className="font-bold text-base text-[#00351a] mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#1b6d24]" />
              <span>بيانات موقع المزرعة والتوصيل في مصر</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#404941] mb-1.5">
                  اسم المستلم أو المهندس المشرف *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#404941] mb-1.5">
                  رقم الهاتف (واتساب متاح) للتنسيق *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block font-bold text-[#404941] mb-1.5">
                  المحافظة / القطاع الزراعي *
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                >
                  <option value="البحيرة والنوبارية">البحيرة والنوبارية ووادي النطرون</option>
                  <option value="طريق مصر إسكندرية الصحراوي">طريق مصر - إسكندرية الصحراوي</option>
                  <option value="الإسماعيلية والصالحية">الإسماعيلية والصالحية وشرق القناة</option>
                  <option value="الشرقية والعاشر من رمضان">الشرقية وبلبيس والعاشر من رمضان</option>
                  <option value="المنوفية ومدينة السادات">المنوفية ومدينة السادات</option>
                  <option value="الجيزة والواحات البحرية">الجيزة والواحات البحرية وأكتوبر</option>
                  <option value="الفيوم وبني سويف">الفيوم وبني سويف</option>
                  <option value="المنيا ومحافظات الصعيد">المنيا وأسيوط ومحافظات الصعيد</option>
                  <option value="الدلتا والقليوبية وكفر الشيخ">كفر الشيخ والدقهلية والغربية</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#404941] mb-1.5">
                  المدينة أو المركز *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#404941] mb-1.5">
                  اسم المزرعة أو المشروع الزراعي *
                </label>
                <input
                  type="text"
                  required
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#404941] mb-1.5">
                  تفاصيل العنوان ومعلم الوصول المميز
                </label>
                <input
                  type="text"
                  value={formData.addressDetails}
                  onChange={(e) => setFormData({ ...formData, addressDetails: e.target.value })}
                  placeholder="اسم الطريق، الكيلو، أو أقرب مدق/محطة وقود"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#404941] mb-1.5">
                  ملاحظات لسائق الشاحنة أو تعليمات التنزيل
                </label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 shadow-xs">
            <h2 className="font-bold text-base text-[#00351a] mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#1b6d24]" />
              <span>طريقة السداد المعتمدة في مصر</span>
            </h2>

            <div className="space-y-3">
              {[
                { id: 'فودافون كاش / إنستاباي (InstaPay)', name: 'إنستاباي وفودافون كاش (InstaPay / Wallets)', desc: `تحويل فوري بدون رسوم على الرقم ${DISPLAY_PHONE}`, badge: 'الموصى به' },
                { id: 'بطاقة ميزة والبطاقات البنكية (Meeza / Visa / MasterCard)', name: 'بطاقة ميزة والبطاقات البنكية (Meeza / Visa)', desc: 'تقبل جميع البطاقات المصرية والمحافظ الإلكترونية', badge: '' },
                { id: 'سداد نقدي عند الاستلام في المزرعة', name: 'سداد نقدي عند الاستلام والفحص في المزرعة', desc: 'متاح لكافة المحافظات مع مراجعة الفاتورة قبل السداد', badge: '' },
                { id: 'تحويل بنكي مباشر (حساب الشركة)', name: 'تحويل بنكي مباشر للمشاريع والشركات', desc: 'البنك الأهلي المصري / بنك مصر مع إصدار فاتورة ضريبية', badge: '' }
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === m.id
                      ? 'border-[#00351a] bg-[#eff8f2]/60 ring-1 ring-[#00351a]'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.id}
                      checked={formData.paymentMethod === m.id}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="accent-[#00351a] w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-[#00351a] block">
                        {m.name}
                      </span>
                      <span className="text-[11px] text-[#6b7280]">
                        {m.desc}
                      </span>
                    </div>
                  </div>
                  {m.badge && (
                    <span className="text-[10px] bg-[#0e4d2b] text-white px-2 py-0.5 rounded-full font-bold">
                      {m.badge}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Order Summary & Final Submit (Cols 5) */}
        <div className="lg:col-span-5 bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-bold text-lg text-[#00351a] pb-3 border-b border-gray-100">
            محتويات الشحنة
          </h2>

          <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-gray-100 pr-1">
            {cartItems.map((item) => (
              <div key={item.product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 p-1 flex items-center justify-center shrink-0">
                    <img src={item.product.image} alt="" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#00351a] line-clamp-1">
                      {item.product.name}
                    </h4>
                    <span className="text-gray-400">الكمية: {item.quantity} × {item.product.price} ج.م</span>
                  </div>
                </div>
                <span className="font-bold text-[#00351a]">
                  {item.product.price * item.quantity} ج.م
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs text-[#404941]">
            <div className="flex justify-between">
              <span>المجموع الفرعي:</span>
              <span className="font-bold">{subtotal} ج.م</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#ba1a1a]">
                <span>خصم الكوبون:</span>
                <span className="font-bold">-{discountAmount} ج.م</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>الشحن المباشر للمزرعة:</span>
              <span className="font-bold">
                {shippingFee === 0 ? <span className="text-[#1b6d24]">مجاني</span> : `${shippingFee} ج.م`}
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>ضريبة القيمة المضافة:</span>
              <span>مشمولة بالسعر</span>
            </div>
          </div>

          {/* Final Total */}
          <div className="pt-4 border-t border-gray-200 flex items-baseline justify-between">
            <span className="text-base font-black text-[#00351a]">
              المبلغ الإجمالي المستحق:
            </span>
            <div className="text-right">
              <span className="text-2xl font-black text-[#00351a]">
                {total}
              </span>
              <span className="text-xs font-bold text-[#00351a] mr-1">ج.م</span>
            </div>
          </div>

          {/* Dual Submission Actions */}
          <div className="space-y-3">
            {/* Primary: Confirm and Send directly to WhatsApp */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              onClick={() => handleOrderSubmit(true)}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] disabled:bg-gray-400 text-white text-sm font-bold py-4 rounded-full shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>تأكيد الطلب وإرساله إلى الواتساب (01029317818)</span>
            </motion.button>

            {/* Secondary: Standard Web Order Submission */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              onClick={() => handleOrderSubmit(false)}
              className="w-full bg-[#00351a] hover:bg-[#0e4d2b] disabled:bg-gray-400 text-white text-xs font-bold py-3.5 rounded-full shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>تأكيد الطلب عبر الموقع فقط</span>
              <Check className="w-4 h-4 text-[#a3f69c]" />
            </motion.button>
          </div>

          <div className="text-[11px] text-[#6b7280] text-center space-y-1.5">
            <p className="flex items-center justify-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#1b6d24] shrink-0" />
              <span>تأكيد وتنسيق فوري عبر الواتساب برقم الطلب وتتبع الشاحنة</span>
            </p>
            <p className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1b6d24] shrink-0" />
              <span>مطابقة لاشتراطات وزارة الزراعة المصرية مع إمكانية الفحص قبل الاستلام</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
