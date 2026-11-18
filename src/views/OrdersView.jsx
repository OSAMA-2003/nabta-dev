import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Check, MessageCircle } from 'lucide-react';
import { WHATSAPP_PHONE } from '../utils/whatsapp';

export default function OrdersView() {
  const { orders, navigate } = useCart();
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id || null);

  const activeOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const stages = [
    { key: 'confirmed', label: 'تم تأكيد الطلب', desc: 'تم استلام الدفعة ومراجعة الأصناف' },
    { key: 'processing', label: 'قيد التجهيز بمستودع نبتة', desc: 'فحص درجات الحرارة وتجهيز الشحنة' },
    { key: 'shipped', label: 'خرجت الشاحنة للتوصيل', desc: 'في الطريق إلى المزرعة' },
    { key: 'delivered', label: 'تم التسليم في المزرعة', desc: 'استلم المشرف الزراعي الشحنة' }
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8" data-node-id="122:1480">
      
      {/* Title */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#00351a]">
            طلباتي وتتبّع الشحنات الميدانية
          </h1>
          <p className="text-xs sm:text-sm text-[#404941] mt-1">
            متابعة حالة شاحنات التوريد وسجلات فواتير المزرعة
          </p>
        </div>
        <button
          onClick={() => navigate('catalog')}
          className="bg-[#00351a] hover:bg-[#0e4d2b] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-xs transition-colors cursor-pointer"
        >
          + طلب مستلزمات جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Orders List (Cols 4) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-bold text-xs uppercase text-[#6b7280] tracking-wider mb-2">
            سجل الطلبات السابقة والحالية ({orders.length})
          </h3>
          {orders.map((o) => {
            const isSelected = o.id === activeOrder?.id;
            return (
              <div
                key={o.id}
                onClick={() => setSelectedOrderId(o.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#00351a] bg-white shadow-md ring-1 ring-[#00351a]'
                    : 'border-gray-100 bg-white hover:border-gray-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-bold text-[#00351a]" dir="ltr">{o.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    o.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {o.statusLabel}
                  </span>
                </div>
                <div className="text-xs text-[#6b7280] flex justify-between">
                  <span>تاريخ الطلب: {o.date}</span>
                  <span className="font-bold text-[#00351a]">{o.total} ج.م</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Details & Tracking Timeline (Cols 8) */}
        {activeOrder && (
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 shadow-sm space-y-8">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <span className="text-[11px] text-gray-400 block mb-0.5">تفاصيل تتبع الطلب:</span>
                <h2 className="text-xl font-black text-[#00351a]" dir="ltr">
                  {activeOrder.id}
                </h2>
                <span className="text-xs text-gray-500 mt-1 block">
                  وجهة التسليم: {activeOrder.shippingAddress}
                </span>
              </div>
              <div className="text-left sm:text-right flex flex-col items-start sm:items-end gap-2">
                <div>
                  <span className="text-xs text-gray-400 block">الإجمالي الكلي:</span>
                  <span className="text-2xl font-black text-[#00351a]">{activeOrder.total} ج.م</span>
                </div>
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`مرحباً نبتة، أود الاستفسار عن موعد وصول الشحنة رقم: ${activeOrder.id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>تنسيق الوصول عبر الواتساب</span>
                </a>
              </div>
            </div>

            {/* Visual Tracking Stepper */}
            <div>
              <h4 className="font-bold text-xs text-[#00351a] mb-6">
                مسار رحلة الشحنة الميدانية:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                {stages.map((st, idx) => {
                  const currentIdx = getStageIndex(activeOrder.status);
                  const isDone = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div key={st.key} className="flex flex-col items-center sm:items-start text-center sm:text-right relative">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-3 shadow-xs ${
                        isDone
                          ? 'bg-[#00351a] text-white ring-4 ring-[#a3f69c]/30'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isDone ? <Check className="w-4 h-4 stroke-[2.5]" /> : idx + 1}
                      </div>
                      <h5 className={`font-bold text-xs leading-snug mb-1 ${
                        isCurrent ? 'text-[#00351a]' : isDone ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                        {st.label}
                      </h5>
                      <p className="text-[10px] text-gray-400 leading-tight">
                        {st.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items List in this order */}
            <div className="pt-6 border-t border-gray-100">
              <h4 className="font-bold text-xs text-[#00351a] mb-4">
                قائمة الأصناف المحملة في هذه الشحنة:
              </h4>
              <div className="space-y-3">
                {activeOrder.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl text-xs">
                    <div className="flex items-center gap-3">
                      <img src={it.product.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-white" />
                      <div>
                        <span className="font-bold text-[#00351a] block">{it.product.name}</span>
                        <span className="text-gray-400">الكمية: {it.quantity} عبوة</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#00351a]">{it.price * it.quantity} ج.م</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
