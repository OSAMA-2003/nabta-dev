import React from 'react';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import { PhoneCall } from 'lucide-react';

const CURRENT_YEAR = 2026;

export default function Footer() {
  const { navigate } = useCart();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16" data-node-id="104:8850">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-gray-100">
          
          {/* Brand Info (Cols 5) */}
          <div className="lg:col-span-5" data-node-id="104:8891">
            <img src={logo} alt="نبتة NABTA" className="h-10 w-auto mb-4" />
            <p className="text-sm text-[#404941] leading-relaxed mb-6 max-w-sm">
              نبتة هي المنصة الزراعية الأولى في مصر المتخصصة في تزويد المزارع والمشاريع الاستثمارية بالأسمدة، البذور، المبيدات، وأنظمة الري المعتمدة بأعلى معايير الجودة ومطابقة وزارة الزراعة المصرية.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#6b7280]">
              <span className="inline-flex items-center gap-1.5 bg-[#eaf2eb] text-[#0e4d2b] font-bold px-3 py-1.5 rounded-full">
                <span>سجل تجاري: 1010892415</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#eaf2eb] text-[#0e4d2b] font-bold px-3 py-1.5 rounded-full">
                <span>الرقم الضريبي: 310894200100003</span>
              </span>
            </div>
          </div>

          {/* Quick Links (Cols 2) */}
          <div className="lg:col-span-2" data-node-id="104:8877">
            <h4 className="font-bold text-[#00351a] text-sm mb-4">
              أقسام المتجر
            </h4>
            <ul className="space-y-2.5 text-xs text-[#404941]">
              <li>
                <button onClick={() => navigate('catalog', 'fertilizers')} className="hover:text-[#0e4d2b] transition-colors cursor-pointer">
                  أسمدة ومغذيات
                </button>
              </li>
              <li>
                <button onClick={() => navigate('catalog', 'seeds')} className="hover:text-[#0e4d2b] transition-colors cursor-pointer">
                  بذور وتقاوي هجين
                </button>
              </li>
              <li>
                <button onClick={() => navigate('catalog', 'protection')} className="hover:text-[#0e4d2b] transition-colors cursor-pointer">
                  مبيدات ووقاية نبات
                </button>
              </li>
              <li>
                <button onClick={() => navigate('catalog', 'irrigation')} className="hover:text-[#0e4d2b] transition-colors cursor-pointer">
                  شبكات وأنظمة ري
                </button>
              </li>
              <li>
                <button onClick={() => navigate('catalog', 'tools')} className="hover:text-[#0e4d2b] transition-colors cursor-pointer">
                  معدات وأدوات حقلية
                </button>
              </li>
            </ul>
          </div>

          {/* Mandatory / Policy Links (Cols 2) */}
          <div className="lg:col-span-2" data-node-id="104:8863">
            <h4 className="font-bold text-[#00351a] text-sm mb-4">
              روابط مهمة
            </h4>
            <ul className="space-y-2.5 text-xs text-[#404941]">
              <li>
                <button onClick={() => navigate('orders')} className="hover:text-[#0e4d2b] transition-colors cursor-pointer">
                  تتبع الشحنات والطلبات
                </button>
              </li>
              <li>
                <button onClick={() => navigate('profile')} className="hover:text-[#0e4d2b] transition-colors cursor-pointer">
                  حسابي والمزارع المسجلة
                </button>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#0e4d2b] transition-colors">
                  سياسة الخصوصية والاستخدام
                </a>
              </li>
              <li>
                <a href="#shipping-policy" className="hover:text-[#0e4d2b] transition-colors">
                  سياسة الشحن والتوصيل للمزارع
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-[#0e4d2b] transition-colors">
                  سياسة الاسترجاع وضمان الجودة
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact (Cols 3) */}
          <div className="lg:col-span-3" data-node-id="104:8852">
            <h4 className="font-bold text-[#00351a] text-sm mb-4">
              النشرة الإرشادية الزراعية
            </h4>
            <p className="text-xs text-[#6b7280] mb-3">
              اشترك لتصلك جداول التسميد الموسمية والتنبيهات المناخية لآفات المحاصيل
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="bg-[#f3f4f6] border border-gray-200 rounded-lg px-3 py-2 text-xs text-right w-full focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                dir="rtl"
              />
              <button 
                type="button" 
                onClick={() => alert('شكراً لاشتراكك في نشرة نبتة الزراعية!')}
                className="bg-[#00351a] hover:bg-[#0e4d2b] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                اشتراك
              </button>
            </div>
            <div className="mt-4 text-xs text-[#404941] flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#00351a]" />
                <span>الهاتف والواتساب:</span>
                <a href="https://wa.me/201029317818" target="_blank" rel="noopener noreferrer" className="font-bold text-[#00351a] hover:underline" dir="ltr">
                  01029317818
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Sub-footer Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6b7280] gap-4" data-node-id="104:8901">
          <p>© {CURRENT_YEAR} منصة نبتة للحلول والمستلزمات الزراعية (جمهورية مصر العربية). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-3 text-gray-400">
            <span>فودافون كاش</span>
            <span>•</span>
            <span>InstaPay إنستاباي</span>
            <span>•</span>
            <span>ميزة Meeza</span>
            <span>•</span>
            <span>Visa</span>
            <span>•</span>
            <span>MasterCard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
