import React from 'react';
import iconStore from '../assets/icon-store.svg';
import iconPhone from '../assets/icon-phone.svg';
import iconTruck from '../assets/icon-truck.svg';
import { DISPLAY_PHONE, WHATSAPP_PHONE } from '../utils/whatsapp';

export default function TopAnnouncementBar() {
  return (
    <div className="bg-[#0e4d2b] text-white text-[12px] py-2 px-4 select-none" data-node-id="101:4438">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Right side in RTL (First in DOM): Delivery promise */}
        <div className="flex items-center gap-2 text-right">
          <img src={iconTruck} alt="" className="w-3.5 h-3.5 shrink-0" />
          <span className="leading-tight">
            توصيل مباشر لكافة المزارع والمشاريع في مصر | شحن مجاني للطلبات فوق 1500 ج.م
          </span>
        </div>

        {/* Left side in RTL: Support hotline & Supplier link */}
        <div className="flex items-center gap-4 text-xs">
          {/* Support hotline */}
          <div className="flex items-center gap-1.5">
            <img src={iconPhone} alt="" className="w-3.5 h-3.5 shrink-0" />
            <span className="text-gray-200">استشارات وطلب عبر الواتساب:</span>
            <a 
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('مرحباً نبتة، أرغب بالاستفسار عن المستلزمات الزراعية المتاحة للشحن للمزرعة.')}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold tracking-wider hover:underline text-[#a3f69c]"
              dir="ltr"
            >
              {DISPLAY_PHONE}
            </a>
          </div>

          <span className="h-3.5 w-px bg-white/20 hidden sm:inline-block" />

          {/* Supplier join link */}
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('مرحباً نبتة، أرغب بالانضمام كمورد أو مصنع معتمد لدى المنصة.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-green-200 transition-colors"
          >
            <img src={iconStore} alt="" className="w-3 h-3 shrink-0" />
            <span>انضم كمورد معتمد</span>
          </a>
        </div>
      </div>
    </div>
  );
}
