import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, ClipboardCheck, Leaf, ArrowLeft } from 'lucide-react';

export default function AgriculturalSolutions() {
  const solutions = [
    {
      title: 'تحليل التربة والمياه المعملي',
      desc: 'فحص ملوحة التربة (EC)، معامل القلوية (pH)، وقياس نسب العناصر الغذائية لوضع خطة تسميد دقيقة وموفرة.',
      tag: 'مختبرات معتمدة',
      icon: Microscope,
      color: 'from-emerald-50 to-teal-50'
    },
    {
      title: 'برامج التسميد والمكافحة المخصصة',
      desc: 'جداول تسميد هيدروبونيك وتربة صممت بأيدي مهندسين زراعيين متخصصين لكل محصول وموسم.',
      tag: 'إشراف هندسي',
      icon: ClipboardCheck,
      color: 'from-green-50 to-emerald-50'
    },
    {
      title: 'زيارات ميدانية واستشارات فورية',
      desc: 'فحص وتشخيص الآفات الفطرية والحشرية ونقص العناصر ميدانياً أو عبر الذكاء الاصطناعي والصور.',
      tag: 'دعم 24/7',
      icon: Leaf,
      color: 'from-lime-50 to-green-50'
    }
  ];

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12" data-node-id="100:1114">
      <div className="bg-[#eff8f2] border border-[#a3f69c]/50 rounded-[28px] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-[672px] mx-auto mb-10"
        >
          <span className="text-[#0e4d2b] font-bold text-xs uppercase tracking-wider bg-white px-4 py-1.5 rounded-full inline-block mb-3 shadow-xs">
            خدمات الدعم الفني الزراعي
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#00351a]">
            محصولك في أمان مع استشارات نبتة
          </h2>
          <p className="text-[#404941] text-sm mt-2">
            لا نكتفي ببيع المستلزمات؛ بل نرافقك في كل خطوة لضمان أعلى إنتاجية وأقل تكلفة تشغيلية
          </p>
        </motion.div>

        {/* 3 Solutions Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-2xl bg-[#eff8f2] text-[#0e4d2b] shadow-inner group-hover:bg-[#00351a] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-[#0e4d2b] bg-[#eaf2eb] px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#00351a] mb-2 group-hover:text-[#0e4d2b] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#404941] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-6">
                  <a
                    href="https://wa.me/201029317818?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AD%D8%AC%D8%B2%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%B2%D8%B1%D8%A7%D8%B9%D9%8A%D8%A9%20%D9%85%D8%B9%D9%85%D9%84%D9%8A%D8%A9%20%D9%84%D9%85%D8%B2%D8%B1%D8%B9%D8%AA%D9%8A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#0e4d2b] hover:text-[#00351a] flex items-center gap-1.5 transition-colors"
                  >
                    <span>طلب الخدمة عبر الواتساب</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
