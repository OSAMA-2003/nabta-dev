import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import { X } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, setUser, showToast } = useCart();
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState('01029317818');
  const [name, setName] = useState('');
  const [farmName, setFarmName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      id: 'usr-1',
      name: name.trim() || 'المهندس أسامة أحمد',
      email: 'osama.ahmed@example.com',
      phone: phone.trim() || '01029317818',
      farmName: farmName.trim() || 'مزرعة الخير الحديثة',
      region: 'البحيرة - النوبارية',
      isLoggedIn: true
    });
    setIsAuthModalOpen(false);
    showToast(`مرحباً بك! تم تسجيل الدخول بنجاح`);
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4" 
          data-node-id="128:6001"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAuthModalOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="bg-white rounded-[28px] max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 z-10"
            dir="rtl"
          >
            {/* Close Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-5 left-5 text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>

            <div className="text-center mb-6">
              <img src={logo} alt="نبتة" className="h-10 mx-auto mb-3" />
              <h2 className="text-xl font-black text-[#00351a]">
                {isRegister ? 'تسجيل حساب مزرعة جديد' : 'تسجيل الدخول لبوابة نبتة'}
              </h2>
              <p className="text-xs text-[#404941] mt-1">
                منصة المستلزمات الزراعية المعتمدة للأفراد والمزارع
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {isRegister && (
                <>
                  <div>
                    <label className="block font-bold text-[#404941] mb-1">
                      الاسم الكامل أو اسم المهندس المشرف *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: م. أسامة أحمد"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#404941] mb-1">
                      اسم المزرعة أو الشركة الزراعية *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: مزرعة النخيل النموذجية"
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block font-bold text-[#404941] mb-1">
                  رقم الهاتف المصري لتلقي رمز الدخول السريع (OTP) *
                </label>
                <div className="relative flex items-center">
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pl-16 focus:outline-none focus:ring-1 focus:ring-[#0e4d2b]"
                    dir="ltr"
                  />
                  <span className="absolute left-3 text-gray-400 font-bold text-xs" dir="ltr">
                    +20
                  </span>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#00351a] hover:bg-[#0e4d2b] text-white font-bold text-sm py-3.5 rounded-full shadow-md transition-colors cursor-pointer mt-2"
              >
                {isRegister ? 'إنشاء حساب المزرعة' : 'متابعة وتسجيل الدخول'}
              </motion.button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs">
              {isRegister ? (
                <p className="text-[#404941]">
                  لديك حساب بالفعل؟{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegister(false)}
                    className="font-bold text-[#0e4d2b] hover:underline cursor-pointer"
                  >
                    تسجيل الدخول هنا
                  </button>
                </p>
              ) : (
                <p className="text-[#404941]">
                  مزارع جديد؟{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegister(true)}
                    className="font-bold text-[#0e4d2b] hover:underline cursor-pointer"
                  >
                    إنشاء حساب مزرعة مجاني
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
