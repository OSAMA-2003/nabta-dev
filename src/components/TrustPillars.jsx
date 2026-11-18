import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, UserCheck, CreditCard } from 'lucide-react';

export default function TrustPillars() {
  const pillars = [
    {
      title: 'منتجات أصلية 100%',
      desc: 'شهادات تسجيل رسمية صادرة من وزارة الزراعة واستصلاح الأراضي المصرية',
      icon: ShieldCheck
    },
    {
      title: 'توصيل مباشر للمزرعة',
      desc: 'أسطول شاحنات مجهز يغطي النوبارية، وادي النطرون، الإسماعيلية، والدلتا والصعيد',
      icon: Truck
    },
    {
      title: 'استشارات مهندسين زراعيين',
      desc: 'فريق متخصص يقدم توصيات الجرعات وحلول الآفات مجاناً عبر الواتساب',
      icon: UserCheck
    },
    {
      title: 'دفع آمن ومرن',
      desc: 'فودافون كاش، إنستاباي، ميزة، فيزا، مع الدفع عند الاستلام في المزرعة',
      icon: CreditCard
    }
  ];

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8" data-node-id="100:1193">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white border border-gray-100 hover:border-[#a3f69c] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4 group"
            >
              <div className="shrink-0 p-3 rounded-xl bg-[#eff8f2] text-[#0e4d2b] group-hover:bg-[#00351a] group-hover:text-white transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#00351a] text-sm mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#6b7280] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
