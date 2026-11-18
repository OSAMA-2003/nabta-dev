import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { WHATSAPP_PHONE } from '../utils/whatsapp';

export default function BrandBanner() {
  const { navigate } = useCart();

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8" data-node-id="100:1174">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="rounded-[28px] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #00351a 0%, #0e4d2b 60%, #1b6d24 100%)'
        }}
      >
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#a0f399]/10 rounded-full blur-2xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <span className="bg-[#a0f399] text-[#00351a] text-xs font-black px-3.5 py-1 rounded-full inline-block mb-4 shadow-sm">
            شراكة الحقل والإنتاج في مصر
          </span>
          <h2 className="text-2xl sm:text-4xl font-black leading-tight mb-4">
            نوصل لجميع مزارع محافظات مصر
            <br />
            بشاحنات مجهزة لحفظ جودة الأسمدة والتقاوي
          </h2>
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-8">
            نغطي خطوط النوبارية، وادي النطرون، الإسماعيلية، الشرقية، الصالحية، ومحافظات الصعيد والدلتا بشحن مباشر وتسهيلات للمزارع الكبرى.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('catalog')}
              className="bg-[#a0f399] hover:bg-[#8ee687] text-[#00351a] font-bold text-sm px-7 py-3.5 rounded-full shadow-lg transition-colors cursor-pointer"
            >
              اطلب مستلزمات مزرعتك الآن
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('مرحباً، أود استشارة مهندس زراعي بخصوص مستلزمات مزرعتي في مصر.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded-full backdrop-blur transition-colors flex items-center gap-2"
            >
              <span>تحدث مع مهندس زراعي (واتساب)</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
