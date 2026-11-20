import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import goldenHourBg from '../assets/Golden Hour Farm with Greenhouse.png';
import phoneFarmImg from '../assets/Smartphone Sprouting a Digital Farm.png';
import {
  Search,
  Mic,
  Handshake,
  Sprout,
  Tractor,
  ShieldCheck,
  Users,
  Package,
  TrendingUp,
  Leaf
} from 'lucide-react';

export default function Hero() {
  const { navigate, setSearchQuery } = useCart();
  const [localSearch, setLocalSearch] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      navigate('catalog');
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceFeedback('خاصية البحث الصوتي غير مدعومة في متصفحك حالياً');
      setTimeout(() => setVoiceFeedback(''), 3000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-EG';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceFeedback('تحدث الآن... جارٍ الاستماع 🎙️');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setLocalSearch(transcript);
        setVoiceFeedback(`تم التعرف: "${transcript}"`);
        setIsListening(false);
        setTimeout(() => {
          setSearchQuery(transcript);
          navigate('catalog');
        }, 700);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setVoiceFeedback('تعذر التقاط الصوت، حاول مرة أخرى');
        setTimeout(() => setVoiceFeedback(''), 2500);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      setVoiceFeedback('يرجى السماح بالوصول إلى الميكروفون');
      setTimeout(() => setVoiceFeedback(''), 2500);
    }
  };

  const featureCards = [
    {
      id: 'partners',
      title: 'شركاء موثوقون',
      icon: Handshake,
      action: () => {
        const elem = document.getElementById('brands');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        else navigate('home');
      }
    },
    {
      id: 'direct-products',
      title: 'منتجات مباشر',
      icon: Sprout,
      action: () => navigate('catalog')
    },
    {
      id: 'farms',
      title: 'مزارع متنوعة',
      icon: Tractor,
      action: () => {
        const elem = document.getElementById('solutions');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        else navigate('catalog', 'services');
      }
    },
    {
      id: 'trusted-platform',
      title: 'منصة موثوقة',
      icon: ShieldCheck,
      action: () => {
        const elem = document.getElementById('trust-pillars');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        else navigate('catalog');
      }
    }
  ];

  return (
    <section 
      className="relative w-full overflow-hidden pt-4 sm:pt-8 pb-14 sm:pb-20 select-none bg-[#e8f1e9]"
      style={{
        backgroundImage: `url("${goldenHourBg}")`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
      data-node-id="111:1098"
    >
      {/* Soft gradient wash to ensure text readability while preserving the farm backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/15 to-white/10 pointer-events-none"
        aria-hidden="true"  
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Grid: Text & Search (Right) + 3D Sprouting Phone (Left) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center pt-2 sm:pt-6">
          
          {/* Right Column in RTL: Tag, Title, Subtitle, Search Bar, Feature Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-right order-2 lg:order-1"
          >
            {/* Top Badge: بوابتك للمستقبل الزراعي */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f5e9]/90 backdrop-blur-md border border-[#bbf7d0] text-[#166534] text-xs font-bold mb-4 sm:mb-5 shadow-sm"
            >
              <Leaf className="w-3.5 h-3.5 text-[#16a34a]" />
              <span>بوابتك للمستقبل الزراعي</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[#0c391f] leading-[1.2] tracking-tight mb-4"
            >
              منصة واحدة لكل
              <br />
              <span className="text-[#16a34a] inline-block mt-1">احتياجاتك الزراعية</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#374151] text-sm sm:text-base leading-relaxed max-w-lg mb-6 sm:mb-7 font-medium"
            >
              تواصل مع المزارعين والموردين والشركات الزراعية واكتشف أفضل المنتجات والخدمات في مكان واحد.
            </motion.p>

            {/* Search Bar with Voice Input */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="w-full max-w-xl mb-6 relative"
            >
              <form 
                onSubmit={handleSearchSubmit}
                className="relative flex items-center bg-white/95 backdrop-blur-md rounded-full border border-gray-200/90 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.06)] p-1.5 focus-within:ring-2 focus-within:ring-[#16a34a] focus-within:border-transparent transition-all"
              >
                {/* Search Input */}
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="ابحث عن منتج أو خدمة..."
                  className="w-full bg-transparent pr-11 pl-14 py-2.5 sm:py-3 text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none font-medium"
                  dir="rtl"
                />

                {/* Search Icon right */}
                <button
                  type="submit"
                  aria-label="بحث"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0c391f] transition-colors cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Voice Search Button left */}
                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  title="بحث صوتي"
                  aria-label="بحث صوتي"
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-md ${
                    isListening 
                      ? 'bg-red-600 text-white animate-pulse' 
                      : 'bg-[#0c391f] hover:bg-[#072413] text-white active:scale-95'
                  }`}
                >
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </form>

              {/* Voice Feedback Tooltip */}
              <AnimatePresence>
                {voiceFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute -bottom-8 right-4 text-xs font-bold text-[#0c391f] bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full shadow border border-emerald-300 z-30"
                  >
                    {voiceFeedback}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 4 Feature Pills Row */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-xl"
            >
              {featureCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <motion.button
                    key={card.id}
                    type="button"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={card.action}
                    className="bg-[#faf5ea]/85 hover:bg-white backdrop-blur-md border border-[#ede0cc] hover:border-emerald-300 rounded-2xl py-3 px-2 flex flex-col items-center justify-center text-center shadow-sm hover:shadow transition-all cursor-pointer group"
                  >
                    <IconComponent className="w-5 h-5 text-[#0c391f] group-hover:text-[#16a34a] transition-colors mb-1.5" />
                    <span className="text-[12px] font-bold text-[#0c391f] group-hover:text-[#16a34a] transition-colors whitespace-nowrap">
                      {card.title}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>

          </motion.div>

          {/* Left Column in RTL: 3D Smartphone Sprouting a Digital Farm with Interactive Badges */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2"
          >
            {/* Phone & Plant visual with subtle hovering float */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] flex items-center justify-center"
            >
              <img 
                src={phoneFarmImg} 
                alt="منصة نبتة - المزرعة الرقمية الذكية" 
                className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)] select-none pointer-events-none"
              />

              {/* Floating Badge 1: Top-Left (البندورة وملاءمتها للزراعة) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{ 
                  y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                  duration: 0.5,
                  delay: 0.3
                }}
                className="absolute top-2 sm:top-6 -left-2 sm:-left-6 bg-white/85 hover:bg-white/95 backdrop-blur-md border border-white/70 rounded-2xl p-2.5 sm:p-3 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] z-20 min-w-[145px] sm:min-w-[170px] transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg sm:text-xl shrink-0" role="img" aria-label="طماطم">🍅</span>
                  <span className="font-bold text-gray-900 text-xs sm:text-sm">طماطم</span>
                </div>
                <div className="text-[11px] text-gray-600 font-medium mb-1.5">
                  92% مناسبة لزراعتها
                </div>
                <div className="w-full bg-gray-200/90 rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    className="bg-emerald-500 h-full rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>

              {/* Floating Badge 2: Bottom-Right (الربح المتوقع) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, 6, 0] }}
                transition={{ 
                  y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
                  duration: 0.5,
                  delay: 0.45
                }}
                className="absolute bottom-12 sm:bottom-16 -right-2 sm:-right-6 bg-white/85 hover:bg-white/95 backdrop-blur-md border border-white/70 rounded-2xl p-2.5 sm:p-3 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] z-20 min-w-[135px] sm:min-w-[155px] transition-all"
              >
                <div className="flex items-center gap-1.5 text-gray-600 mb-0.5">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-semibold text-gray-600">الربح المتوقع</span>
                </div>
                <div className="text-sm sm:text-base font-black text-gray-900 flex items-baseline gap-1">
                  <span>15,000</span>
                  <span className="text-xs font-bold text-emerald-700">ج.م</span>
                </div>
              </motion.div>

            </motion.div>
          </motion.div>

        </div>

        {/* Bottom Stats Capsule Banner: 180+ مزارع ومورد | 100% منتجات موثوقة | 2,400+ عميل مسجل */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="relative z-10 max-w-[860px] mx-auto mt-10 sm:mt-14 lg:mt-16 bg-[#0c391f]/90 backdrop-blur-md border border-emerald-500/30 rounded-3xl sm:rounded-full px-4 sm:px-10 py-3.5 sm:py-4 shadow-[0_20px_35px_-5px_rgba(12,57,31,0.4)]"
        >
          <div className="grid grid-cols-3 divide-x divide-x-reverse divide-emerald-700/60 text-center items-center">
            
            {/* Stat 1: 180+ مزارع ومورد */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800/80 flex items-center justify-center shrink-0 shadow-inner">
                <Tractor className="w-4 h-4 text-white" />
              </div>
              <div className="text-center sm:text-right">
                <div className="text-base sm:text-xl font-black text-white leading-tight" dir="ltr">
                  +180
                </div>
                <div className="text-[11px] sm:text-xs text-emerald-200 font-medium">
                  مزارع ومورد
                </div>
              </div>
            </div>

            {/* Stat 2: 100% منتجات موثوقة */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800/80 flex items-center justify-center shrink-0 shadow-inner">
                <Package className="w-4 h-4 text-white" />
              </div>
              <div className="text-center sm:text-right">
                <div className="text-base sm:text-xl font-black text-white leading-tight">
                  100%
                </div>
                <div className="text-[11px] sm:text-xs text-emerald-200 font-medium">
                  منتجات موثوقة
                </div>
              </div>
            </div>

            {/* Stat 3: 2,400+ عميل مسجل */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800/80 flex items-center justify-center shrink-0 shadow-inner">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div className="text-center sm:text-right">
                <div className="text-base sm:text-xl font-black text-white leading-tight" dir="ltr">
                  +2,400
                </div>
                <div className="text-[11px] sm:text-xs text-emerald-200 font-medium">
                  عميل مسجل
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Decorative Organic Wave Transition into the rest of the page */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#fafdfa] to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
