import { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Scissors,
  Bookmark,
  Share2,
  Printer,
  Moon,
  Check,
  Calendar as CalendarIcon,
  Bell,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuadrupleCalendarDate } from '../utils/calendars';
import { PrayerTimeData, NextPrayerInfo } from '../utils/prayerTimes';
import { BouayadDailyContent } from '../data/bouayadContent';
import { MoroccanCity } from '../data/moroccanCities';
import { soundManager } from '../utils/audio';

interface BouayadLeafProps {
  calendarData: QuadrupleCalendarDate;
  prayerTimes: PrayerTimeData;
  nextPrayer: NextPrayerInfo;
  dailyContent: BouayadDailyContent;
  currentCity: MoroccanCity;
  currentDate: Date;
  onNavigateDay: (offset: number) => void;
  onSelectDate: (date: Date) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenNotifications?: () => void;
}

export function BouayadLeaf({
  calendarData,
  prayerTimes,
  nextPrayer,
  dailyContent,
  currentCity,
  currentDate,
  onNavigateDay,
  onSelectDate,
  isFavorite,
  onToggleFavorite,
  onOpenNotifications,
}: BouayadLeafProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTearing, setIsTearing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const leafRef = useRef<HTMLDivElement>(null);

  // Handle page tear
  const handleTearOff = () => {
    if (isTearing) return;
    setIsTearing(true);
    soundManager.playPaperTear();

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.35 },
        colors: ['#f5f5f4', '#e7e5e4', '#d6d3d1', '#c7a363'],
        shapes: ['square'],
        scalar: 0.85,
        gravity: 1.2,
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      onNavigateDay(1);
      setIsTearing(false);
      setIsFlipped(false);
    }, 450);
  };

  // Share text purely in authentic Arabic
  const handleShare = async () => {
    const text = `📖 اليومية العصرية لبوعياد - ${calendarData.gregorian.formattedAr}\n` +
      `📅 ${calendarData.hijri.formattedAr} | ${calendarData.fellahi.formattedAr}\n` +
      `🕌 مواقيت الصلاة في ${currentCity.nameAr} (GMT+0):\n` +
      `الفجر ${prayerTimes.fajr} · الشروق ${prayerTimes.sunrise} · الظهر ${prayerTimes.dohr} · العصر ${prayerTimes.asr} · المغرب ${prayerTimes.maghrib} · العشاء ${prayerTimes.icha}\n` +
      `✨ مثل اليوم: « ${dailyContent.proverb.textDarija} »\n` +
      `💡 حكمة اليوم: « ${dailyContent.wisdom.textAr} »`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `اليومية العصرية لبوعياد - ${calendarData.gregorian.formattedAr}`,
          text,
        });
      } catch {
        // user cancel
      }
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formattedIsoDate = currentDate.toISOString().split('T')[0];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-1 sm:px-2">

      {/* Date Navigation Bar (Responsive on Mobile) */}
      <div className="w-full max-w-[580px] flex items-center justify-between gap-1.5 sm:gap-3 mb-4 sm:mb-6">
        <button
          onClick={() => onNavigateDay(-1)}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-bold bg-white dark:bg-[#24201c] text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-amber-300 border border-stone-200 dark:border-[#383129] rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">اليوم السابق</span>
          <span className="sm:hidden">السابق</span>
        </button>

        {/* Date jumper */}
        <div className="relative flex-1 text-center">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="w-full max-w-[260px] inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3.5 py-1.5 text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 bg-white dark:bg-[#24201c] border border-stone-300 dark:border-[#383129] rounded-lg shadow-2xs hover:border-[#8B1E1E] dark:hover:border-amber-400 transition-colors cursor-pointer font-amiri truncate"
            dir="rtl"
          >
            <CalendarIcon className="w-4 h-4 text-[#8B1E1E] dark:text-amber-400 shrink-0" />
            <span className="truncate">{calendarData.gregorian.formattedAr}</span>
          </button>

          {showDatePicker && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white dark:bg-[#24201c] p-3 rounded-lg shadow-xl border border-stone-200 dark:border-[#383129] z-50 flex flex-col gap-2 min-w-[220px]">
              <label className="text-xs font-medium text-stone-600 dark:text-stone-300 font-amiri text-right" dir="rtl">اختر تاريخاً :</label>
              <input
                type="date"
                value={formattedIsoDate}
                onChange={(e) => {
                  if (e.target.value) {
                    onSelectDate(new Date(e.target.value));
                    setShowDatePicker(false);
                  }
                }}
                className="text-xs p-1.5 border border-stone-300 dark:border-[#383129] dark:bg-[#1a1714] dark:text-stone-100 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#8B1E1E] dark:focus:ring-amber-400"
              />
            </div>
          )}
        </div>

        <button
          onClick={() => onNavigateDay(1)}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-bold bg-white dark:bg-[#24201c] text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-amber-300 border border-stone-200 dark:border-[#383129] rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0"
        >
          <span className="hidden sm:inline">اليوم الموالي</span>
          <span className="sm:hidden">الموالي</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* The Physical Wall Calendar Mount (Support mural en carton Bouayad - Responsive & Clean) */}
      <div className="relative w-full max-w-[580px] bg-[#651010] dark:bg-[#460a0a] rounded-2xl p-2.5 sm:p-5 shadow-2xl border-2 sm:border-4 border-[#8B1E1E] dark:border-[#600e0e] text-stone-900 dark:text-stone-100 select-none overflow-hidden transition-colors">
        
        {/* Subtle Moroccan Arabesque / Gilded Leather Background Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Top Moroccan Brass Wall Fixture (التعليقة النحاسية الأصيلة) */}
        <div className="relative flex flex-col items-center mb-2.5 sm:mb-3">
          {/* Hanging eyelet ring */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-3 sm:border-4 border-amber-400 dark:border-amber-500 bg-stone-900/40 shadow-inner flex items-center justify-center -mt-1 sm:-mt-2 mb-1">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-stone-300 shadow-xs" />
          </div>

          {/* Gilded Header Plaque */}
          <div className="w-full text-center py-2 px-3 sm:px-4 rounded-lg bg-gradient-to-r from-[#500c0c] via-[#751616] to-[#500c0c] dark:from-[#380707] dark:via-[#580f0f] dark:to-[#380707] border border-amber-400/60 dark:border-amber-500/50 shadow-md">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-amiri font-bold text-amber-200 tracking-wide drop-shadow-xs" dir="rtl">
              اليومية العصرية لبوعياد
            </h1>
            <div className="mt-0.5 sm:mt-1 flex items-center justify-center gap-2 text-[11px] sm:text-sm text-amber-100/90 font-amiri font-semibold" dir="rtl">
              <span>مواقيت الصلاة الرسمية (GMT+0)</span>
              <span>·</span>
              <span>التقويم الرباعي المغربي</span>
            </div>
          </div>
        </div>

        {/* Detachable Ephemeris Leaf Container with Perforations */}
        <div
          ref={leafRef}
          className={`relative w-full bg-[#fdfbf7] dark:bg-[#1e1b17] text-stone-900 dark:text-stone-100 rounded-sm shadow-xl border border-stone-300 dark:border-[#383129] transition-all duration-300 ${
            isTearing ? 'translate-y-8 rotate-1 opacity-0 scale-95 duration-400' : 'translate-y-0 opacity-100'
          }`}
        >
          {/* Perforated Rip Line at Top */}
          <div className="h-2 w-full perforated-border border-b border-stone-200 dark:border-[#302922]" />

          {/* 3D Flip Card Container */}
          <div className="perspective-1000 min-h-[500px] sm:min-h-[580px] p-3 sm:p-6">
            
            {/* If NOT flipped: FRONT SIDE (الوجه) */}
            {!isFlipped ? (
              <div className="flex flex-col h-full animate-fadeIn font-amiri">
                
                {/* 1. Quadruple Calendar Top Header Ribbon */}
                <div className="border-b-2 border-stone-900/80 dark:border-stone-500 pb-2.5 mb-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-base sm:text-lg lg:text-xl font-extrabold text-stone-900 dark:text-stone-100 gap-1.5" dir="rtl">
                    {/* Hijri Right */}
                    <div className="text-right flex items-center gap-2">
                      <span className="text-xl sm:text-2xl opacity-75 dark:opacity-80 inline-block select-none filter drop-shadow-2xs" title={`طَوْرُ القَمَر: ${calendarData.moonPhase.phaseNameAr} (${calendarData.moonPhase.illumination}%)`}>
                        {calendarData.moonPhase.emoji}
                      </span>
                      <span className="text-[#8B1E1E] dark:text-amber-400 text-lg sm:text-xl lg:text-2xl block font-black">
                        {calendarData.hijri.formattedAr}
                      </span>
                    </div>

                    {/* Gregorian Left */}
                    <div className="text-right sm:text-left font-amiri font-bold text-stone-800 dark:text-stone-200 text-base sm:text-lg lg:text-xl">
                      {calendarData.gregorian.dayOfWeekAr} {calendarData.gregorian.day} {calendarData.gregorian.monthAr} {calendarData.gregorian.year} م
                    </div>
                  </div>

                  {/* Secondary Agricultural (Fellahi) & Amazigh Ribbon (High-Legibility on Mobile) */}
                  <div className="mt-2 pt-2 border-t border-dashed border-stone-300 dark:border-[#383129] flex flex-wrap items-center justify-between text-sm sm:text-base text-stone-900 dark:text-stone-200 font-bold gap-2" dir="rtl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-stone-600 dark:text-stone-400 font-bold">التقويم الفلاحي:</span>
                      <span className="font-black text-stone-950 dark:text-stone-100">{calendarData.fellahi.formattedAr}</span>
                      <span className="text-stone-400 dark:text-stone-600">·</span>
                      <span className="text-[#8B1E1E] dark:text-amber-400 font-black">منزلة {calendarData.fellahi.manzilah.nameAr}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-stone-600 dark:text-stone-400 font-bold">الأمازيغي:</span>
                      <span className="font-black text-stone-950 dark:text-stone-100">{calendarData.amazigh.formattedAr}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Massive Date Numeral Section (ENLARGED & MAJESTIC CENTERPIECE) */}
                <div className="py-2 sm:py-3.5 text-center relative border-b-2 border-stone-900/80 dark:border-stone-500">
                  <div className="flex items-center justify-around gap-1.5 sm:gap-3">
                    
                    {/* Right side: Day of week and Gregorian month */}
                    <div className="text-right flex flex-col justify-center min-w-[75px] sm:min-w-[100px]" dir="rtl">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#8B1E1E] dark:text-amber-400 block leading-tight">
                        {calendarData.gregorian.dayOfWeekAr}
                      </span>
                      <span className="text-lg sm:text-xl lg:text-2xl font-extrabold text-stone-800 dark:text-stone-200 block mt-1">
                        {calendarData.gregorian.monthAr}
                      </span>
                    </div>

                    {/* The Giant Iconic Date Numeral (Scales smoothly on mobile) */}
                    <div className="font-cormorant text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-stone-950 dark:text-stone-50 tabular-nums leading-none py-1 drop-shadow-xs px-2 shrink-0">
                      {calendarData.gregorian.day}
                    </div>

                    {/* Left side: Year in Gregorian & Hijri */}
                    <div className="text-left flex flex-col justify-center min-w-[75px] sm:min-w-[100px] font-sans">
                      <span className="text-lg sm:text-xl lg:text-2xl font-black text-stone-900 dark:text-stone-100 block">
                        {calendarData.gregorian.year}
                      </span>
                      <span className="text-sm sm:text-base lg:text-lg font-amiri font-black text-[#8B1E1E] dark:text-amber-400 block mt-1">
                        {calendarData.hijri.year} هـ
                      </span>
                    </div>

                  </div>

                  {calendarData.gregorian.isHoliday && (
                    <div className="mt-2 inline-block bg-amber-100 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-700 text-xs sm:text-sm font-black px-3.5 py-1 rounded-md font-amiri shadow-2xs" dir="rtl">
                      ★ {calendarData.gregorian.holidayName}
                    </div>
                  )}
                </div>

                {/* 3. Moroccan Prayer Times Table (مواقيت الصلاة بتوقيت GMT+0 - Enhanced Typography & Contrast) */}
                <div className="my-2.5 sm:my-3.5 bg-stone-50 dark:bg-[#161310] border-2 border-stone-300 dark:border-[#383026] rounded-xl p-2 sm:p-3 shadow-2xs">
                  <div className="flex items-center justify-between text-sm sm:text-base font-black text-stone-900 dark:text-stone-100 pb-2 border-b border-stone-200 dark:border-[#332a21] mb-2" dir="rtl">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-sm sm:text-base font-black">مواقيت الصلاة</span>
                      <span className="text-stone-700 dark:text-stone-300 font-extrabold">({currentCity.nameAr})</span>
                      <span className="text-xs text-stone-500 dark:text-stone-400 font-sans font-bold">GMT+0</span>
                    </span>
                    <span className="text-xs sm:text-sm text-[#8B1E1E] dark:text-amber-400 font-black truncate max-w-[180px] sm:max-w-none">
                      القادمة: {nextPrayer.nameAr} ({nextPrayer.remainingFormatted})
                    </span>
                  </div>

                  {/* 6 Times Grid: Fajr, Sunrise, Dohr, Asr, Maghrib, Isha (Crystal-Clear Numbers on Mobile) */}
                  <div className="grid grid-cols-6 gap-1 sm:gap-2 text-center" dir="rtl">
                    <div className={`p-1.5 sm:p-2 rounded-lg transition-all ${nextPrayer.nameAr === 'الفجر' ? 'bg-[#8B1E1E]/15 dark:bg-amber-400/20 font-black text-[#8B1E1E] dark:text-amber-300 ring-2 ring-[#8B1E1E]/50 dark:ring-amber-400/60' : 'text-stone-800 dark:text-stone-300'}`}>
                      <span className="block text-xs sm:text-sm font-amiri font-black text-stone-800 dark:text-stone-200">الفجر</span>
                      <span className="font-mono tabular-nums text-xs sm:text-sm md:text-base font-extrabold block mt-0.5">{prayerTimes.fajr}</span>
                    </div>
                    <div className={`p-1.5 sm:p-2 rounded-lg transition-all ${nextPrayer.nameAr === 'الشروق' ? 'bg-[#8B1E1E]/15 dark:bg-amber-400/20 font-black text-[#8B1E1E] dark:text-amber-300 ring-2 ring-[#8B1E1E]/50 dark:ring-amber-400/60' : 'text-stone-800 dark:text-stone-300'}`}>
                      <span className="block text-xs sm:text-sm font-amiri font-black text-stone-800 dark:text-stone-200">الشروق</span>
                      <span className="font-mono tabular-nums text-xs sm:text-sm md:text-base font-bold block mt-0.5">{prayerTimes.sunrise}</span>
                    </div>
                    <div className={`p-1.5 sm:p-2 rounded-lg transition-all ${nextPrayer.nameAr === 'الظهر' ? 'bg-[#8B1E1E]/15 dark:bg-amber-400/20 font-black text-[#8B1E1E] dark:text-amber-300 ring-2 ring-[#8B1E1E]/50 dark:ring-amber-400/60' : 'text-stone-800 dark:text-stone-300'}`}>
                      <span className="block text-xs sm:text-sm font-amiri font-black text-stone-800 dark:text-stone-200">الظهر</span>
                      <span className="font-mono tabular-nums text-xs sm:text-sm md:text-base font-extrabold block mt-0.5">{prayerTimes.dohr}</span>
                    </div>
                    <div className={`p-1.5 sm:p-2 rounded-lg transition-all ${nextPrayer.nameAr === 'العصر' ? 'bg-[#8B1E1E]/15 dark:bg-amber-400/20 font-black text-[#8B1E1E] dark:text-amber-300 ring-2 ring-[#8B1E1E]/50 dark:ring-amber-400/60' : 'text-stone-800 dark:text-stone-300'}`}>
                      <span className="block text-xs sm:text-sm font-amiri font-black text-stone-800 dark:text-stone-200">العصر</span>
                      <span className="font-mono tabular-nums text-xs sm:text-sm md:text-base font-extrabold block mt-0.5">{prayerTimes.asr}</span>
                    </div>
                    <div className={`p-1.5 sm:p-2 rounded-lg transition-all ${nextPrayer.nameAr === 'المغرب' ? 'bg-[#8B1E1E]/15 dark:bg-amber-400/20 font-black text-[#8B1E1E] dark:text-amber-300 ring-2 ring-[#8B1E1E]/50 dark:ring-amber-400/60' : 'text-stone-800 dark:text-stone-300'}`}>
                      <span className="block text-xs sm:text-sm font-amiri font-black text-stone-800 dark:text-stone-200">المغرب</span>
                      <span className="font-mono tabular-nums text-xs sm:text-sm md:text-base font-extrabold block mt-0.5">{prayerTimes.maghrib}</span>
                    </div>
                    <div className={`p-1.5 sm:p-2 rounded-lg transition-all ${nextPrayer.nameAr === 'العشاء' ? 'bg-[#8B1E1E]/15 dark:bg-amber-400/20 font-black text-[#8B1E1E] dark:text-amber-300 ring-2 ring-[#8B1E1E]/50 dark:ring-amber-400/60' : 'text-stone-800 dark:text-stone-300'}`}>
                      <span className="block text-xs sm:text-sm font-amiri font-black text-stone-800 dark:text-stone-200">العشاء</span>
                      <span className="font-mono tabular-nums text-xs sm:text-sm md:text-base font-extrabold block mt-0.5">{prayerTimes.icha}</span>
                    </div>
                  </div>
                </div>

                {/* 4. Quranic Verse & Tafsir (BOOSTED MOBILE LEGIBILITY) */}
                <div className="py-3 sm:py-4 border-b border-stone-200 dark:border-[#332c25] text-right" dir="rtl">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-[#332c25] mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1E1E]/10 dark:bg-[#8B1E1E]/30 border border-[#8B1E1E]/30 dark:border-[#8B1E1E]/50 text-[#8B1E1E] dark:text-amber-300 text-xs sm:text-sm font-black shadow-2xs">
                      <span className="text-xs text-amber-700 dark:text-amber-400">✦</span>
                      <span>آية اليوم وتفسيرها</span>
                    </span>
                    <span className="text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-black">{dailyContent.quran.surahAr} - آية {dailyContent.quran.ayahNumber}</span>
                  </div>
                  <p className="font-amiri text-xl sm:text-2xl lg:text-3xl text-stone-950 dark:text-stone-50 font-black leading-loose text-center py-2 px-1">
                    « {dailyContent.quran.verseAr} »
                  </p>
                  <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-semibold mt-1">
                    {dailyContent.quran.reflectionAr}
                  </p>
                </div>

                {/* 5. Hadith of the Day */}
                <div className="py-3 sm:py-4 border-b border-stone-200 dark:border-[#332c25] text-right" dir="rtl">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-[#332c25] mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/10 dark:bg-emerald-900/30 border border-emerald-800/30 dark:border-emerald-700/50 text-emerald-950 dark:text-emerald-300 text-xs sm:text-sm font-black shadow-2xs">
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">✦</span>
                      <span>حديث نبوي شريف</span>
                    </span>
                    <span className="text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-black">{dailyContent.hadith.sourceAr}</span>
                  </div>
                  <p className="font-amiri text-lg sm:text-xl lg:text-2xl text-stone-950 dark:text-stone-50 font-bold leading-relaxed py-1">
                    قال رسول الله ﷺ: « {dailyContent.hadith.textAr} »
                  </p>
                  <span className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-bold block mt-1">
                    {dailyContent.hadith.narratorAr}
                  </span>
                </div>

                {/* 6. Moroccan Proverb (Enhanced Moroccan Card) */}
                <div className="pt-3 sm:pt-4 text-right" dir="rtl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-700/15 dark:bg-amber-800/30 border border-amber-700/35 dark:border-amber-600/50 text-amber-950 dark:text-amber-300 text-xs sm:text-sm font-black shadow-2xs">
                      <span className="text-xs text-amber-700 dark:text-amber-400">✦</span>
                      <span>مثل شعبي مغربي</span>
                    </span>
                    <span className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-black">حكمة الأجداد</span>
                  </div>
                  <div className="bg-amber-50/95 dark:bg-[#282117] border-2 border-amber-300/80 dark:border-amber-700/60 rounded-xl p-3 sm:p-4 text-center shadow-xs">
                    <p className="font-amiri text-xl sm:text-2xl lg:text-3xl font-black text-amber-950 dark:text-amber-100 leading-relaxed">
                      « {dailyContent.proverb.textDarija} »
                    </p>
                    <p className="text-sm sm:text-base text-amber-900 dark:text-amber-200 mt-1.5 leading-relaxed font-bold">
                      المغزى: {dailyContent.proverb.meaningAr}
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              /* If flipped: BACK SIDE (ظهر الورقة / القفا) */
              <div className="flex flex-col h-full animate-fadeIn font-amiri text-right" dir="rtl">
                
                {/* Back side header */}
                <div className="border-b-2 border-stone-900/80 dark:border-stone-500 pb-2.5 mb-3 text-center">
                  <div className="flex items-center justify-between text-sm sm:text-base font-black text-stone-800 dark:text-stone-200">
                    <span className="text-stone-600 dark:text-stone-400">ظهر الورقة</span>
                    <span className="text-lg sm:text-xl lg:text-2xl font-black text-[#8B1E1E] dark:text-amber-400">
                      فوائد وثقافة مغربية
                    </span>
                    <span className="text-stone-900 dark:text-stone-100 font-bold">{calendarData.gregorian.day} {calendarData.gregorian.monthAr}</span>
                  </div>
                </div>

                {/* 1. Traditional Medicine & Moroccan Herbal Remedy */}
                <div className="bg-emerald-50/90 dark:bg-[#102318] border-2 border-emerald-300/80 dark:border-emerald-700/60 rounded-xl p-3 sm:p-4 mb-3 shadow-2xs">
                  <div className="flex items-center justify-between text-sm sm:text-base font-bold text-emerald-950 dark:text-emerald-200 mb-1.5 pb-1.5 border-b border-emerald-200 dark:border-emerald-800/50">
                    <span className="text-base sm:text-lg lg:text-xl font-black text-emerald-950 dark:text-emerald-100">🌿 {dailyContent.healthTip.titleAr}</span>
                    <span className="text-xs bg-emerald-100 dark:bg-emerald-900/70 text-emerald-950 dark:text-emerald-200 px-2.5 py-0.5 rounded-md font-black">
                      {dailyContent.healthTip.categoryAr}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-emerald-950 dark:text-emerald-100 leading-relaxed mt-1 font-semibold">
                    {dailyContent.healthTip.descriptionAr}
                  </p>
                  {dailyContent.healthTip.remedyNameAr && (
                    <div className="mt-2 text-xs sm:text-sm text-emerald-900 dark:text-emerald-300 font-black">
                      العنصر الفعال: {dailyContent.healthTip.remedyNameAr}
                    </div>
                  )}
                </div>

                {/* 2. Domestic Secret & Traditional Recipe */}
                <div className="bg-stone-50 dark:bg-[#1c1916] border-2 border-stone-300/80 dark:border-[#383026] rounded-xl p-3 sm:p-4 mb-3 shadow-2xs">
                  <div className="text-base sm:text-lg lg:text-xl font-black text-stone-950 dark:text-stone-100 mb-1.5 pb-1.5 border-b border-stone-200 dark:border-[#352e26]">
                    💡 {dailyContent.homeTip.titleAr}
                  </div>
                  <p className="text-sm sm:text-base text-stone-900 dark:text-stone-200 leading-relaxed font-semibold">
                    {dailyContent.homeTip.descriptionAr}
                  </p>
                </div>

                {/* 3. Moroccan History Event */}
                {dailyContent.historyEvent && (
                  <div className="border-2 border-amber-300/80 dark:border-amber-900/60 rounded-xl p-3 sm:p-4 mb-3 bg-amber-50/70 dark:bg-[#251e16] shadow-2xs">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-200 mb-1.5 pb-1.5 border-b border-amber-200 dark:border-[#352e26]">
                      <span className="text-[#8B1E1E] dark:text-amber-400 text-sm sm:text-base lg:text-lg font-black">🇲🇦 حدث في مثل هذا اليوم في تاريخ المغرب</span>
                      <span className="font-mono text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-bold">{dailyContent.historyEvent.yearAr}</span>
                    </div>
                    <h4 className="text-base sm:text-lg lg:text-xl font-black text-stone-950 dark:text-stone-100">
                      {dailyContent.historyEvent.titleAr}
                    </h4>
                    <p className="text-sm sm:text-base text-stone-800 dark:text-stone-300 leading-relaxed mt-1 font-semibold">
                      {dailyContent.historyEvent.descriptionAr}
                    </p>
                  </div>
                )}

                {/* 4. Moon Phase & Light & Agricultural Manzilah */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-2.5 sm:p-3.5 bg-stone-100/90 dark:bg-[#181512] border-2 border-stone-300/80 dark:border-[#383026] rounded-xl mb-3 shadow-2xs">
                  {/* Moon Phase & Light (الضوء والقمر) */}
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/70 dark:bg-[#201c18] border border-stone-200/80 dark:border-[#322a21] text-right" dir="rtl">
                    {/* The Moon: Bigger, on the right, with slightly reduced opacity */}
                    <div className="relative shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-stone-900/5 dark:bg-amber-400/10 border border-stone-300/70 dark:border-amber-400/30 shadow-inner">
                      <span className="text-3xl sm:text-4xl opacity-75 dark:opacity-80 select-none filter drop-shadow-xs transform transition-transform hover:scale-105">
                        {calendarData.moonPhase.emoji}
                      </span>
                      {/* Soft ambient lunar glow with reduced opacity */}
                      <div className="absolute inset-0 rounded-full bg-amber-300/20 dark:bg-amber-400/15 opacity-60 pointer-events-none blur-xs" />
                    </div>

                    {/* Text Details: Moon Phase & Light */}
                    <div className="flex-1 min-w-0">
                      <span className="block text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 font-bold">
                        طَوْرُ القَمَر
                      </span>
                      <span className="block font-black text-stone-950 dark:text-stone-100 text-sm sm:text-base leading-snug truncate">
                        {calendarData.moonPhase.phaseNameAr}
                      </span>
                      <div className="flex items-center gap-2 mt-1 text-xs text-stone-700 dark:text-stone-300 font-bold">
                        <span className="text-amber-700 dark:text-amber-400 font-black">الضوء:</span>
                        <span className="font-mono tabular-nums text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100">
                          {calendarData.moonPhase.illumination}%
                        </span>
                        <div className="flex-1 max-w-[65px] h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-l from-amber-400 to-amber-200 dark:from-amber-300 dark:to-amber-500 rounded-full opacity-80"
                            style={{ width: `${calendarData.moonPhase.illumination}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Agricultural Manzilah */}
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/70 dark:bg-[#201c18] border border-stone-200/80 dark:border-[#322a21] text-right" dir="rtl">
                    <div className="relative shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-400/30 shadow-inner">
                      <span className="text-2xl sm:text-3xl opacity-80 select-none">🌾</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 font-bold">
                        المنزلة الفلاحية الحالية
                      </span>
                      <span className="block font-black text-[#8B1E1E] dark:text-amber-400 text-sm sm:text-base leading-snug truncate">
                        منزلة {calendarData.fellahi.manzilah.nameAr}
                      </span>
                      <span className="text-[11px] sm:text-xs text-stone-800 dark:text-stone-300 font-bold italic line-clamp-1 block mt-0.5">
                        « {calendarData.fellahi.manzilah.proverbAr} »
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5. Wisdom of the Day */}
                <div className="mt-auto pt-3 border-t-2 border-stone-300 dark:border-[#383026] text-center">
                  <p className="font-amiri text-xl sm:text-2xl lg:text-3xl font-black text-stone-950 dark:text-stone-100 leading-relaxed">
                    « {dailyContent.wisdom.textAr} »
                  </p>
                  <span className="block text-sm sm:text-base text-stone-700 dark:text-stone-300 font-bold mt-1">
                    — {dailyContent.wisdom.authorAr}
                  </span>

                  {onOpenNotifications && (
                    <button
                      type="button"
                      onClick={onOpenNotifications}
                      className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-200/80 hover:bg-amber-500/20 text-stone-700 hover:text-[#8B1E1E] dark:bg-[#25201b] dark:text-stone-300 dark:hover:text-amber-300 border border-stone-300 dark:border-[#383026] transition-colors cursor-pointer shadow-2xs font-amiri"
                      title="تفعيل إشعار يومي بحكمة اليوم"
                    >
                      <Bell className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>تفعيل إشعار يومي بهذه الحكمة</span>
                    </button>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* Bottom leaf border decoration */}
          <div className="h-1.5 bg-gradient-to-r from-stone-200 via-stone-400 to-stone-200 rounded-b-sm" />
        </div>

        {/* Calendar Leaf Interactive Toolbar: 2 Isolated Primary Buttons on Top, Utilities Below */}
        <div className="mt-4 sm:mt-5 flex flex-col gap-2.5 sm:gap-3 pt-2.5 sm:pt-3 border-t-2 border-amber-500/40">
          
          {/* TOP ROW: The 2 Main Actions (مشاهدة الوجه/القفا en premier sur mobile) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 w-full">
            
            {/* 1. Flip Card Button (مشاهدة الوجه / مشاهدة القفا) - EN PREMIER SUR MOBILE */}
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="order-1 flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 bg-amber-200/25 hover:bg-amber-200/35 text-amber-100 font-black text-base sm:text-lg rounded-xl border-2 border-amber-400/60 transition-all cursor-pointer font-amiri transform active:scale-95 shadow-md min-h-[46px]"
              title="قلب الورقة لمشاهدة الوجه أو الظهر"
            >
              <RotateCw className="w-5 h-5 text-amber-300 shrink-0" />
              <span>{isFlipped ? 'مشاهدة الوجه' : 'مشاهدة القفا (الظهر)'}</span>
            </button>

            {/* 2. Tear Off Button (قطع الورقة) - Second on mobile */}
            <button
              onClick={handleTearOff}
              className="order-2 flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-black text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer font-amiri transform active:scale-95 border border-amber-300 min-h-[46px]"
              title="اقتلاع الورقة للمرور لليوم الموالي"
            >
              <Scissors className="w-5 h-5 shrink-0" />
              <span>قطع الورقة</span>
            </button>

          </div>

          {/* BOTTOM ROW: Secondary Utility Actions (حفظ، مشاركة، طباعة) */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 pt-0.5 text-xs">
            
            {/* Favorite Toggle */}
            <button
              onClick={onToggleFavorite}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 border rounded-lg transition-colors cursor-pointer font-amiri text-xs sm:text-sm font-bold min-h-[38px] ${
                isFavorite
                  ? 'bg-rose-500/35 text-rose-100 border-rose-300'
                  : 'bg-stone-900/40 hover:bg-stone-900/60 text-amber-100 border-amber-400/30'
              }`}
              title="حفظ هذه الورقة في المفضلة"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-300 text-rose-300' : 'text-amber-300'}`} />
              <span>{isFavorite ? 'محفوظة' : 'حفظ'}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-900/40 hover:bg-stone-900/60 text-amber-100 border border-amber-400/30 rounded-lg transition-colors cursor-pointer font-amiri text-xs sm:text-sm font-bold min-h-[38px]"
              title="مشاركة الورقة"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-300" />}
              <span>{copied ? 'تم النسخ !' : 'مشاركة'}</span>
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-900/40 hover:bg-stone-900/60 text-amber-100 border border-amber-400/30 rounded-lg transition-colors cursor-pointer font-amiri text-xs sm:text-sm font-bold min-h-[38px]"
              title="طباعة الورقة"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>طباعة</span>
            </button>

          </div>

        </div>

      </div>

      {/* Cultural Heritage Footnote */}
      <div className="mt-6 sm:mt-8 text-center text-xs text-stone-600 dark:text-stone-400 max-w-lg px-2" dir="rtl">
        <p className="font-amiri text-sm sm:text-base font-bold text-stone-800 dark:text-stone-200">
          « اليومية العصرية لبوعياد » إرث ثقافي مغربي أصيل يزين بيوت المغاربة منذ عقود خلت.
        </p>
      </div>

    </div>
  );
}
