import React from 'react';
import { useCart } from '../context/CartContext';
import { Sprout, UserCheck, Check, Plus, Heart, LogOut, Edit3 } from 'lucide-react';

export default function ProfileView() {
  const { user, orders, wishlist, logoutUser, navigate } = useCart();

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8" data-node-id="159:881">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-[#00351a]">
          ملف المزارع والمشاريع الزراعية
        </h1>
        <p className="text-xs sm:text-sm text-[#404941] mt-1">
          إدارة بيانات المزارع المسجلة، سجلات التوريد، ومسؤولي الاستلام
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* User Card (Cols 4) */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm text-center">
          <div className="w-20 h-20 bg-[#eaf2eb] text-[#00351a] rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4 border-2 border-[#a3f69c]">
            {user.name.slice(0, 2)}
          </div>
          <h2 className="text-lg font-black text-[#00351a] mb-1">
            {user.name}
          </h2>
          <span className="text-xs text-[#0e4d2b] font-bold bg-[#eaf2eb] px-3 py-1 rounded-full inline-block mb-4">
            عضوية المزارع الذهبية المعتمدة
          </span>

          <div className="space-y-3 text-xs text-right border-t border-gray-100 pt-4">
            <div className="flex justify-between">
              <span className="text-gray-400">البريد الإلكتروني:</span>
              <span className="font-semibold text-[#00351a]" dir="ltr">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">رقم التواصل:</span>
              <span className="font-semibold text-[#00351a]" dir="ltr">{user.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">المنطقة الرئيسية:</span>
              <span className="font-semibold text-[#00351a]">{user.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">مساحة الحيازة:</span>
              <span className="font-semibold text-[#1b6d24]">{user.areaFeddan || '50'} فدان</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">عدد الشحنات المنفذة:</span>
              <span className="font-bold text-[#1b6d24]">{orders.length} طلبات</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">الأصناف المفضلة:</span>
              <span className="font-bold text-emerald-700">{wishlist.length} صنف</span>
            </div>
          </div>

          <div className="space-y-2.5 mt-6">
            <button
              onClick={() => navigate('orders')}
              className="w-full bg-[#00351a] hover:bg-[#0e4d2b] text-white text-xs font-bold py-3 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              عرض سجل الطلبات والتتبع
            </button>

            <button
              onClick={() => navigate('wishlist')}
              className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>قائمتي المفضلة ({wishlist.length})</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => navigate('login')}
                className="bg-gray-100 hover:bg-gray-200 text-[#404941] text-xs font-bold py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                title="تعديل بيانات الحساب المحفوظة"
              >
                <Edit3 className="w-3 h-3" />
                <span>تعديل الحساب</span>
              </button>

              <button
                onClick={() => {
                  logoutUser();
                  navigate('home');
                }}
                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                title="تسجيل الخروج ومسح الجلسة"
              >
                <LogOut className="w-3 h-3" />
                <span>خروج</span>
              </button>
            </div>
          </div>
        </div>

        {/* Registered Farms & Agronomist Support (Cols 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Registered Farms */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-base text-[#00351a] flex items-center gap-2">
                <Sprout className="w-5 h-5 text-[#1b6d24]" />
                <span>المزارع والمشاريع المسجلة للتوصيل المباشر</span>
              </h3>
              <button 
                type="button"
                onClick={() => alert('ميزة إضافة مزرعة جديدة متاحة عبر التطبيق وخدمة العملاء')}
                className="text-xs font-bold text-[#0e4d2b] hover:underline cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة مزرعة جديدة</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Farm 1 */}
              <div className="p-4 rounded-2xl bg-[#eff8f2]/60 border border-[#a3f69c]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-sm text-[#00351a]">مزرعة وادي النطرون والنوبارية (المقر الرئيسي)</h4>
                    <span className="text-[10px] bg-[#1b6d24] text-white font-bold px-2 py-0.5 rounded-full">افتراضي</span>
                  </div>
                  <p className="text-xs text-[#404941]">البحيرة - النوبارية، طريق مصر إسكندرية الصحراوي ك 75</p>
                  <span className="text-[11px] text-gray-500 mt-1 block">المساحة: 50 فدان | المحاصيل: موالح، خضار محمية، فراولة</span>
                </div>
                <span className="text-xs font-bold text-[#0e4d2b] shrink-0 flex items-center gap-1">
                  <span>معتمدة للتوريد</span>
                  <Check className="w-3.5 h-3.5 text-[#1b6d24]" />
                </span>
              </div>

              {/* Farm 2 */}
              <div className="p-4 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-[#00351a] mb-1">مشروع البيوت المحمية بالصالحية الجديدة</h4>
                  <p className="text-xs text-[#404941]">الشرقية - الصالحية، الظهير الزراعي الصحراوي</p>
                  <span className="text-[11px] text-gray-500 mt-1 block">المساحة: 15 صالة هيدروبونيك | المحاصيل: طماطم شيري، فلفل ألوان</span>
                </div>
                <span className="text-xs font-bold text-gray-400 shrink-0">مفعلة</span>
              </div>
            </div>
          </div>

          {/* Dedicated Agronomist Card */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#eff8f2] text-[#0e4d2b] flex items-center justify-center shrink-0">
                <UserCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#0e4d2b] bg-[#eaf2eb] px-2.5 py-0.5 rounded-full inline-block mb-1">
                  المهندس الزراعي المخصص لمزرعتك في مصر
                </span>
                <h4 className="font-bold text-sm text-[#00351a]">م. أحمد عبد الرحمن (استشاري تغذية ووقاية نبات)</h4>
                <p className="text-xs text-[#404941]">متاح للاستشارات الميدانية وتحليل برامج التسميد والمكافحة عبر الواتساب أو الاتصال المباشر.</p>
              </div>
            </div>
            <a
              href="https://wa.me/201029317818?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%85%D9%87%D9%86%D8%AF%D8%B3%20%D8%A3%D8%AD%D9%85%D8%AF%D8%8C%20%D8%A3%D8%AD%D8%AA%D8%A7%D8%AC%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%B2%D8%B1%D8%A7%D8%B9%D9%8A%D8%A9%20%D8%AE%D8%A7%D8%B5%D8%A9%20%D8%A8%D9%85%D8%B2%D8%B1%D8%B9%D8%AA%D9%8A%20%D9%88%D8%AC%D8%AF%D9%88%D9%84%20%D8%A7%D9%84%D8%AA%D8%B3%D9%85%D9%8A%D8%AF"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00351a] hover:bg-[#0e4d2b] text-white text-xs font-bold px-6 py-3 rounded-full transition-colors shrink-0 flex items-center gap-2"
            >
              <span>استشارة واتساب (01029317818)</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
