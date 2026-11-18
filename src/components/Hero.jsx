import React from 'react';
import { motion } from 'framer-motion';
import heroFarmer from '../assets/hero-farmer.png';
import iconConsultation from '../assets/icon-consultation.svg';
import iconBrowse from '../assets/icon-browse.svg';
import iconQualityShield from '../assets/icon-quality-shield.svg';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8" data-node-id="111:1098">
      <div 
        className="max-w-[1280px] mx-auto rounded-[24px] border border-[#a3f69c]/40 relative overflow-hidden p-6 sm:p-10 lg:p-16"
        style={{
          background: 'linear-gradient(155deg, #eff8f2 0%, #e5f4eb 50%, #d6ebd9 100%)'
        }}
      >
        {/* Ambient Decorative Glows */}
        <div 
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#b2f1c2]/30 blur-[32px] pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#a0f399]/40 blur-[20px] pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Hero Grid Container */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Right Column in RTL: Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-right"
          >
            
            {/* Trust Pill Badge */}
            <motion.div 
              variants={itemVariants}
              className="backdrop-blur-md bg-white/90 border border-[#a3f69c] rounded-full px-4 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] inline-flex items-center gap-2 mb-6"
              data-node-id="111:1103"
            >
              <span className="w-2 h-2 rounded-full bg-[#1b6d24] animate-pulse" />
              <span className="text-[12px] font-bold text-[#00351a]">
                بوابة المستلزمات الزراعية المعتمدة للأفراد والمزارع
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#00351a] leading-[1.25] tracking-tight mb-5"
              data-node-id="111:1107"
            >
              شريكك الأمثل في الزراعة
              <br />
              المستدامة والإنتاجية العالية
            </motion.h1>

            {/* Subtitle / Description */}
            <motion.p 
              variants={itemVariants}
              className="text-[#404941] text-sm sm:text-base leading-relaxed max-w-[576px] mb-8"
              data-node-id="111:1109"
            >
              نوفر منظومة متكاملة من أجود البذور المهجنة، الأسمدة التخصصية، ومبيدات المكافحة المتطورة المختبرة معملياً، مع استشارات هندسية فورية لدعم مشروعك الزراعي.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8 sm:mb-10"
              data-node-id="111:1111"
            >
              {/* Primary Action Button */}
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#00351a] hover:bg-[#002814] text-white text-sm font-semibold px-7 py-3.5 rounded-full flex items-center gap-2.5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] hover:shadow-lg transition-all"
                data-node-id="111:1117"
              >
                <span>تصفح المنتجات الزراعية</span>
                <img src={iconBrowse} alt="" className="w-3.5 h-3.5 shrink-0" />
              </motion.a>

              {/* Secondary Action Button */}
              <motion.a
                href="#consultation"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white hover:bg-gray-50 border border-[#00351a]/20 text-[#00351a] text-sm font-semibold px-6 py-3.5 rounded-full flex items-center gap-2 shadow-sm transition-all"
                data-node-id="111:1112"
              >
                <img src={iconConsultation} alt="" className="w-4 h-4 shrink-0" />
                <span>طلب استشارة زراعية مجانية</span>
              </motion.a>
            </motion.div>

            {/* Fast Stats / Trust Metrics */}
            <motion.div 
              variants={itemVariants}
              className="border-t border-[#c0c9bf]/40 pt-6 w-full grid grid-cols-3 gap-4"
              data-node-id="111:1123"
            >
              {/* Stat 1 */}
              <div className="flex flex-col text-right" data-node-id="111:1134">
                <span className="text-xl sm:text-[22px] font-black text-[#00351a] leading-none">
                  +2,400
                </span>
                <span className="text-[12px] text-[#404941] mt-2 leading-tight">
                  منتج زراعي مسجل
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col text-right" data-node-id="111:1129">
                <span className="text-xl sm:text-[22px] font-black text-[#00351a] leading-none">
                  100%
                </span>
                <span className="text-[12px] text-[#404941] mt-2 leading-tight">
                  فحص مطابقة واعتماد
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col text-right" data-node-id="111:1124">
                <span className="text-xl sm:text-[22px] font-black text-[#00351a] leading-none">
                  +180
                </span>
                <span className="text-[12px] text-[#404941] mt-2 leading-tight">
                  مزرعة ومشروع مخدوم
                </span>
              </div>
            </motion.div>

          </motion.div>

          {/* Left Column in RTL: Hero Media Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center mt-4 lg:mt-0" 
            data-node-id="111:1139"
          >
            {/* Main Picture Frame */}
            <div className="bg-white border-4 border-white rounded-[20px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden w-full max-w-[430px] aspect-[4/3.5] sm:aspect-[4/3.4]">
              <img 
                src={heroFarmer} 
                alt="خبير زراعي نبتة والمحاصيل الزراعية" 
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating Quality Tag */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute -bottom-5 right-2 sm:right-6 bg-white border border-[#a3f69c]/50 rounded-[14px] p-3 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] flex items-center gap-3 backdrop-blur-sm z-20"
              data-node-id="111:1142"
            >
              {/* Badge Icon Circle */}
              <div className="w-10 h-10 rounded-full bg-[#a0f399] flex items-center justify-center shrink-0 shadow-inner">
                <img src={iconQualityShield} alt="" className="w-4.5 h-4.5" />
              </div>

              {/* Tag Text */}
              <div className="flex flex-col text-right">
                <span className="text-[12px] font-bold text-[#00351a] leading-tight">
                  منتجات أصلية 100%
                </span>
                <span className="text-[11px] text-[#404941] leading-tight mt-0.5">
                  ضمان الإنبات ومطابقة التحليل
                </span>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
