import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { categories } from '../data';
import { 
  Sprout, 
  FlaskConical, 
  Wheat, 
  ShieldCheck, 
  Droplets, 
  Warehouse, 
  Tractor,
  Trees 
} from 'lucide-react';

const iconMap = {
  Sprout,
  FlaskConical,
  Wheat,
  ShieldCheck,
  Droplets,
  Warehouse,
  Tractor,
  Trees
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function CategoryPills() {
  const { navigate } = useCart();

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10" data-node-id="100:794">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-[672px] mx-auto mb-8"
      >
        <span className="text-[#0e4d2b] font-bold text-xs uppercase tracking-wider bg-[#eaf2eb] px-3.5 py-1.5 rounded-full inline-block mb-2">
          التصنيفات المعتمدة
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#00351a]">
          أقسام المنتجات الزراعية الأساسية
        </h2>
        <p className="text-[#404941] text-sm mt-2">
          حلول متكاملة تغطي كافة مراحل الدورة الزراعية من البذرة والشتلة وحتى الحصاد والتسويق
        </p>
      </motion.div>

      {/* Grid of Categories */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4"
      >
        {categories.filter(c => c.id !== 'all').map((cat) => {
          const IconComponent = iconMap[cat.icon] || Sprout;
          return (
            <motion.button
              key={cat.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('catalog', cat.id)}
              className="group bg-white hover:bg-[#eaf2eb]/50 border border-gray-100 hover:border-[#a3f69c] rounded-2xl p-4 text-center transition-colors duration-200 shadow-sm hover:shadow-md flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#eff8f2] group-hover:bg-[#00351a] flex items-center justify-center mb-3 transition-colors duration-200 shadow-inner">
                <IconComponent className="w-6 h-6 text-[#0e4d2b] group-hover:text-white transition-colors group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xs sm:text-[13px] font-bold text-[#00351a] group-hover:text-[#0e4d2b] leading-tight">
                {cat.name}
              </h3>
              <span className="text-[11px] text-[#6b7280] mt-1">
                +{cat.count} صنف معتمد
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </section>
  );
}
