import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Check, AlertTriangle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useCart();

  const bgColors = {
    success: 'bg-[#00351a] border-[#a3f69c] text-white',
    info: 'bg-[#1b6d24] border-green-300 text-white',
    error: 'bg-[#ba1a1a] border-red-300 text-white'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm pointer-events-none" dir="rtl">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border ${bgColors[toast.type] || bgColors.success} text-xs font-bold backdrop-blur-md pointer-events-auto`}
          >
            {toast.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-300" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 shrink-0 text-green-200" />
            ) : (
              <Check className="w-4 h-4 shrink-0 text-[#a3f69c]" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
