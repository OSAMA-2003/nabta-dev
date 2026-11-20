import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

export default function FloatingWhatsApp() {
  const defaultMessage = 'السلام عليكم، أود الاستفسار عن منتجات وتوريدات متجر نبته الزراعي في مصر.';
  const whatsappUrl = createWhatsAppUrl(defaultMessage);

  return (
    <aside
      aria-label="خدمة عملاء واتساب"
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2 select-none"
    >
      {/* Main WhatsApp Button with subtle floating animation */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر الواتساب على 01029317818"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-current text-white" />
        <span className="font-bold text-xs hidden md:inline">
          طلب واستشارة واتساب 
        </span>
      </motion.a>
    </aside>
  );
}
