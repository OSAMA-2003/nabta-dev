import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import { 
  UserCheck, 
  MapPin, 
  Phone, 
  Building2, 
  CheckCircle2, 
  LogOut,
  Sprout,
  ShieldCheck,
  Mail
} from 'lucide-react';

const EGYPT_REGIONS = [
  'البحيرة والنوبارية',
  'وادي النطرون والظهير الصحراوي',
  'طريق مصر إسكندرية الصحراوي',
  'الشرقية والصالحية الجديدة',
  'الإسماعيلية وشرق القناة',
  'مدينة السادات والمنوفية',
  'الجيزة والواحات البحرية',
  'بني سويف والمنيا (شمال الصعيد)',
  'أسيوط وسوهاج وقنا (جنوب الصعيد)',
  'الدقهلية وكفر الشيخ والغربية (الدلتا)',
  'مطروح والساحل الشمالي'
];

export default function LoginView() {
  const { user, loginUser, logoutUser, navigate } = useCart();
  const [isRegister, setIsRegister] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '01029317818',
    email: user?.email || '',
    farmName: user?.farmName || '',
    region: user?.region || 'البحيرة والنوبارية',
    areaFeddan: user?.areaFeddan || '50'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
      name: formData.name.trim() || 'المهندس أسامة أحمد',
      phone: formData.phone.trim() || '01029317818',
      email: formData.email.trim() || 'osama.farm@nabta.eg',
      farmName: formData.farmName.trim() || 'مزرعة الخير الحديثة',
      region: formData.region,
      areaFeddan: formData.areaFeddan.trim() || '25'
    });
    navigate('profile');
  };

  // If already logged in, show current user profile info with quick actions
  if (user?.isLoggedIn) {
    return (
      <div className="max-w-[720px] mx-auto px-4 py-12" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-100 rounded-[28px] p-8 sm:p-10 shadow-lg text-center"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-[#a3f69c] text-[#00351a] flex items-center justify-center font-black text-2xl mx-auto mb-4">
            {user.name.slice(0, 2)}
          </div>
          <span className="text-xs font-bold text-[#0e4d2b] bg-[#eaf2eb] px-3.5 py-1 rounded-full inline-block mb-2">
            تم تسجيل الدخول وحفظ البيانات محلياً (Local Storage)
          </span>
          <h1 className="text-2xl font-black text-[#00351a] mb-1">
            أهلاً بك، {user.name}
          </h1>
          <p className="text-xs text-[#404941] mb-6">
            بيانات حساب المزرعة محملة بنجاح وتعمل في كامل أقسام الموقع والسلة.
          </p>

          <div className="bg-gray-50 rounded-2xl p-4 text-xs space-y-2.5 text-right mb-6 border border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-400">اسم المزرعة:</span>
              <span className="font-bold text-[#00351a]">{user.farmName || 'مزرعة الخير'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">رقم الهاتف:</span>
              <span className="font-bold text-[#00351a]" dir="ltr">{user.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">المنطقة والمحافظة:</span>
              <span className="font-bold text-[#00351a]">{user.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">المساحة التقديرية:</span>
              <span className="font-bold text-[#1b6d24]">{user.areaFeddan || '50'} فدان</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('profile')}
              className="flex-1 bg-[#00351a] hover:bg-[#0e4d2b] text-white font-bold text-xs py-3.5 px-6 rounded-full shadow-md transition-colors cursor-pointer"
            >
              الانتقال إلى لوحة تحكم المزرعة
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={logoutUser}
              className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-red-200"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-[620px] mx-auto px-4 py-12" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-100 rounded-[28px] p-6 sm:p-10 shadow-xl relative"
      >
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <img src={logo} alt="نبتة" className="h-11 mx-auto mb-3" />
          <h1 className="text-2xl font-black text-[#00351a]">
            {isRegister ? 'تسجيل حساب مزرعة جديد في مصر' : 'تسجيل الدخول لمنصة نبتة'}
          </h1>
          <p className="text-xs text-[#404941] mt-1.5">
            يتم حفظ بياناتك وتحديثها تلقائياً على المتصفح (Local Storage) لضمان سهولة الشراء والتوريد
          </p>
        </div>

        {/* Tab switch: Login vs Register */}
        <div className="flex rounded-full bg-gray-100 p-1 mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2.5 rounded-full transition-all cursor-pointer ${
              !isRegister ? 'bg-white text-[#00351a] shadow-xs' : 'text-gray-500 hover:text-[#00351a]'
            }`}
          >
            تسجيل الدخول السريع
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2.5 rounded-full transition-all cursor-pointer ${
              isRegister ? 'bg-white text-[#00351a] shadow-xs' : 'text-gray-500 hover:text-[#00351a]'
            }`}
          >
            إنشاء حساب مزرعة جديد
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Full Name */}
          <div>
            <label className="block font-bold text-[#00351a] mb-1.5">
              الاسم الكامل / اسم المهندس المشرف *
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="مثال: م. أسامة أحمد"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
              />
              <UserCheck className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
            </div>
          </div>

          {/* Farm Name (Always shown for register, or optional for login) */}
          <div>
            <label className="block font-bold text-[#00351a] mb-1.5">
              اسم المزرعة أو المشروع الزراعي *
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                required
                name="farmName"
                value={formData.farmName}
                onChange={handleChange}
                placeholder="مثال: مزرعة الخير الحديثة بالنوبارية"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
              />
              <Building2 className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-bold text-[#00351a] mb-1.5">
              رقم الهاتف المصري للتواصل وتأكيد الشحن *
            </label>
            <div className="relative flex items-center">
              <input
                type="tel"
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01029317818"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 pl-16 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                dir="ltr"
              />
              <Phone className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
              <span className="absolute left-3 text-gray-400 font-bold text-xs" dir="ltr">
                +20
              </span>
            </div>
          </div>

          {/* Region / Governorate */}
          <div>
            <label className="block font-bold text-[#00351a] mb-1.5">
              المحافظة والنطاق الزراعي للمزرعة *
            </label>
            <div className="relative flex items-center">
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b] cursor-pointer"
              >
                {EGYPT_REGIONS.map((reg, idx) => (
                  <option key={idx} value={reg}>{reg}</option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
            </div>
          </div>

          {/* Farm Area in Feddan & Email (Shown in Register mode) */}
          {isRegister && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block font-bold text-[#00351a] mb-1.5">
                  المساحة التقديرية (بالفدان)
                </label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    name="areaFeddan"
                    value={formData.areaFeddan}
                    onChange={handleChange}
                    placeholder="مثال: 50"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                  />
                  <Sprout className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#00351a] mb-1.5">
                  البريد الإلكتروني (اختياري)
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@nabta.eg"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-10 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#00351a] hover:bg-[#0e4d2b] text-white font-bold text-sm py-4 rounded-full shadow-lg transition-colors cursor-pointer mt-4 flex items-center justify-center gap-2"
          >
            <span>{isRegister ? 'تسجيل حساب المزرعة وحفظ البيانات' : 'دخول وحفظ البيانات في المتصفح'}</span>
            <CheckCircle2 className="w-4 h-4 text-[#a3f69c]" />
          </motion.button>

        </form>

        {/* Security & LocalStorage Trust Note */}
        <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-[#6b7280]">
          <ShieldCheck className="w-4 h-4 text-[#1b6d24] shrink-0" />
          <span>يتم حفظ وتشفير الجلسة محلياً في الـ Local Storage دون الحاجة لكلمات سر معقدة</span>
        </div>

      </motion.div>
    </div>
  );
}
