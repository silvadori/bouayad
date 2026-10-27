import { useState } from 'react';
import { Sprout, Sun, Wind, CloudRain, Star, Info, Search } from 'lucide-react';
import { MOROCCAN_MANAZIL, ManzilahInfo, calculateFellahi } from '../utils/calendars';

interface ManazilViewProps {
  currentDate: Date;
}

export function ManazilView({ currentDate }: ManazilViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const fellahiCurrent = calculateFellahi(currentDate);
  const currentManzilahIndex = fellahiCurrent.manzilah.index;

  const filtered = MOROCCAN_MANAZIL.filter(
    (m) =>
      m.nameAr.includes(searchTerm) ||
      m.nameFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.proverbAr.includes(searchTerm) ||
      m.descriptionFr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
        <span className="text-xs sm:text-sm uppercase font-serif tracking-widest text-[#8B1E1E] dark:text-amber-400 font-bold block mb-1.5">
          تقويم الفلاح والأنواء الفلكية بالمغرب
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-stone-900 dark:text-stone-100 tracking-tight">
          دليل المنازل الفلاحية الـ 28 المغربية
        </h2>
        <p className="font-amiri text-lg sm:text-xl text-stone-800 dark:text-stone-200 mt-1.5" dir="rtl">
          منازل القمر الفلاحية والبروج: الحكمة الزراعية المغربية الموروثة
        </p>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2">
          في تقاليد اليومية العصرية لبوعياد، تنقسم السنة الفلاحية إلى 28 منزلة قمرية (13 يوماً لكل منزلة)، ترشد الفلاح المغربي في مواسم الحرث والغرس والري وتقلبات الطقس.
        </p>
      </div>

      {/* Special Moroccan Seasons Cards (الليالي، السمايم، الحسوم، ماء النيسان) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-8 sm:mb-10">
        
        {/* 1. Layali */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-stone-300 dark:hover:border-stone-600 transition-colors">
          <div className="flex items-center gap-2.5 text-blue-900 dark:text-blue-300 mb-2">
            <Wind className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">فصل الليالي (Layali)</h3>
          </div>
          <span className="text-xs font-mono font-bold text-stone-600 dark:text-stone-400 block mb-1.5">25 دجنبر – 2 فبراير (40 يوماً)</span>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
            تنقسم إلى 20 يوماً من <strong>الليالي البيض</strong> (برد قارس مشمس) و20 يوماً من <strong>الليالي السود</strong> (صقيع وغيوم). سكون نباتي حاسم.
          </p>
        </div>

        {/* 2. El-Houssom */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-stone-300 dark:hover:border-stone-600 transition-colors">
          <div className="flex items-center gap-2.5 text-stone-900 dark:text-stone-100 mb-2">
            <CloudRain className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">فترة الحسوم (Houssom)</h3>
          </div>
          <span className="text-xs font-mono font-bold text-stone-600 dark:text-stone-400 block mb-1.5">10 مارس – 17 مارس (8 أيام)</span>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
            فترة انتقال ربيعي برياح متقلبة تلقح الأشجار المثمرة وتهيئ براعم الزيتون واللوز.
          </p>
        </div>

        {/* 3. Nissane */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-stone-300 dark:hover:border-stone-600 transition-colors">
          <div className="flex items-center gap-2.5 text-emerald-900 dark:text-emerald-300 mb-2">
            <Sprout className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">ماء النيسان (Nissane)</h3>
          </div>
          <span className="text-xs font-mono font-bold text-stone-600 dark:text-stone-400 block mb-1.5">أواخر أبريل (أمطار البركة)</span>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
            « مطرة في نيسان تسوى الذهب والميزان » : غيث ربيعي مبارك يملأ السنابل بالحبوب ويثبت المحصول.
          </p>
        </div>

        {/* 4. Smayem */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-stone-300 dark:hover:border-stone-600 transition-colors">
          <div className="flex items-center gap-2.5 text-amber-900 dark:text-amber-300 mb-2">
            <Sun className="w-5 h-5 text-amber-500 shrink-0" />
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">فصل السمايم (Smayem)</h3>
          </div>
          <span className="text-xs font-mono font-bold text-stone-600 dark:text-stone-400 block mb-1.5">25 يوليوز – 2 شتنبر (40 يوماً)</span>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
            أيام الحر الشديد المغربي الضرورية لنضج التمور المجهول، التين والعنب.
          </p>
        </div>

      </div>

      {/* Search and Current Mansion Status */}
      <div className="bg-amber-50/80 dark:bg-[#251e16] border-2 border-amber-300 dark:border-amber-700/60 rounded-2xl p-4 sm:p-6 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
        <div className="text-center md:text-right w-full md:w-auto" dir="rtl">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs sm:text-sm font-serif font-bold text-amber-900 dark:text-amber-400 mb-1">
            <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>المنزلة الفلاحية الحالية في هذا اليوم :</span>
          </div>
          <h3 className="font-amiri text-2xl sm:text-3xl lg:text-4xl font-black text-amber-950 dark:text-amber-100">
            منزلة {fellahiCurrent.manzilah.nameAr} ({fellahiCurrent.manzilah.nameFr})
          </h3>
          <p className="text-sm sm:text-base text-amber-900 dark:text-amber-300 font-amiri font-bold italic mt-1">
            « {fellahiCurrent.manzilah.proverbAr} »
          </p>
        </div>

        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ابحث عن منزلة أو مثل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs sm:text-sm font-sans pl-9 pr-3 py-2 bg-white dark:bg-[#181512] text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-[#383129] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#8B1E1E] dark:focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Grid of the 28 Mansions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => {
          const isCurrent = m.index === currentManzilahIndex;

          return (
            <div
              key={m.index}
              className={`rounded-2xl p-4 sm:p-5 border-2 transition-all ${
                isCurrent
                  ? 'bg-amber-50/95 dark:bg-[#2e2316] border-amber-400 dark:border-amber-500 shadow-md ring-2 ring-amber-400/60'
                  : 'bg-white dark:bg-[#1e1b17] border-stone-200 dark:border-[#352e26] shadow-2xs hover:border-stone-300 dark:hover:border-stone-600'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xs font-mono font-bold text-stone-400 dark:text-stone-500 block">
                    المنزلة {m.index} / 28
                  </span>
                  <h4 className="font-amiri text-xl sm:text-2xl font-black text-stone-950 dark:text-stone-50" dir="rtl">
                    {m.nameAr}
                  </h4>
                  <span className="text-xs font-serif text-stone-600 dark:text-stone-400 font-medium">{m.nameFr}</span>
                </div>

                <div className="text-right">
                  <span className="text-xs bg-stone-100 dark:bg-[#2a241e] text-stone-800 dark:text-stone-200 px-2.5 py-1 rounded-md font-mono font-bold block">
                    {m.startDateFellahi}
                  </span>
                  {isCurrent && (
                    <span className="mt-1.5 inline-block text-[10px] bg-[#8B1E1E] dark:bg-[#961e1e] text-white px-2 py-0.5 rounded-sm font-black uppercase tracking-wider">
                      الآن جارية
                    </span>
                  )}
                </div>
              </div>

              {/* Star info */}
              <div className="text-xs text-stone-600 dark:text-stone-400 mb-2.5 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 fill-amber-400/40" />
                <span>نجم: {m.starAr} ({m.starFr})</span>
              </div>

              {/* Proverb Card */}
              <div className="bg-stone-50 dark:bg-[#171411] border-r-3 border-amber-500 p-2.5 sm:p-3 rounded-l-lg mb-2.5">
                <p className="font-amiri text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 leading-relaxed" dir="rtl">
                  « {m.proverbAr} »
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-serif italic mt-1">
                  « {m.proverbFr} »
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed" dir="rtl">
                {m.descriptionAr}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

