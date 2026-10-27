import { useState } from 'react';
import { Compass, Volume2, Calendar, MapPin, Info, CheckCircle2 } from 'lucide-react';
import { MoroccanCity, MOROCCAN_CITIES } from '../data/moroccanCities';
import { calculatePrayerTimes, getNextPrayer, PrayerTimeData } from '../utils/prayerTimes';
import { soundManager } from '../utils/audio';

interface PrayerTimesViewProps {
  currentCity: MoroccanCity;
  onSelectCity: (city: MoroccanCity) => void;
  currentDate: Date;
  prayerTimes: PrayerTimeData;
}

export function PrayerTimesView({
  currentCity,
  onSelectCity,
  currentDate,
  prayerTimes,
}: PrayerTimesViewProps) {
  const [playingChime, setPlayingChime] = useState(false);
  const nextPrayer = getNextPrayer(prayerTimes, new Date());

  const handleTestChime = () => {
    setPlayingChime(true);
    soundManager.playPrayerChime();
    setTimeout(() => setPlayingChime(false), 2000);
  };

  // Generate 7 days upcoming prayer timetable
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(currentDate);
    d.setDate(currentDate.getDate() + i);
    const times = calculatePrayerTimes(currentCity, d);
    return { date: d, times };
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-2" dir="rtl">
        <span className="text-xs sm:text-sm uppercase font-serif tracking-widest text-[#8B1E1E] dark:text-amber-400 font-bold block mb-1.5">
          مواقيت الصلاة الرسمية بالمملكة المغربية
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-amiri text-stone-900 dark:text-stone-100 tracking-tight">
          مواقيت الصلاة لمدينة {currentCity.nameAr}
        </h2>
        <p className="font-amiri text-base sm:text-lg text-stone-700 dark:text-stone-300 mt-1.5">
          حسب توقيت غرينتش (GMT+0) ووفق معايير وزارة الأوقاف والشؤون الإسلامية
        </p>

        {/* City Quick Picker on the Page */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <label htmlFor="city-select" className="text-xs sm:text-sm font-bold text-stone-600 dark:text-stone-300 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-[#8B1E1E] dark:text-amber-400" />
            <span>تغيير المدينة:</span>
          </label>
          <select
            id="city-select"
            value={currentCity.id}
            onChange={(e) => {
              const selected = MOROCCAN_CITIES.find((c) => c.id === e.target.value);
              if (selected) onSelectCity(selected);
            }}
            className="text-xs sm:text-sm font-bold font-amiri px-3 py-1.5 bg-white dark:bg-[#24201c] text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-[#383129] rounded-lg shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-[#8B1E1E] dark:focus:ring-amber-400 cursor-pointer"
          >
            {MOROCCAN_CITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nameAr} ({c.nameFr})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Today's Summary Card */}
      <div className="bg-gradient-to-br from-[#7a1414] via-[#651010] to-[#480b0b] dark:from-[#581111] dark:via-[#420a0a] dark:to-[#280505] text-amber-50 rounded-2xl p-4 sm:p-7 shadow-2xl mb-8 sm:mb-10 relative overflow-hidden border-2 border-amber-500/40">
        
        {/* Subtle Moroccan geometric watermark */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffd700_1.5px,transparent_1.5px)] [background-size:20px_20px]" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 pb-6 border-b border-amber-500/30">
          
          {/* City & Date Info */}
          <div className="text-center md:text-right" dir="rtl">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-200 text-xs sm:text-sm font-bold mb-1">
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>{currentCity.regionAr} · المملكة المغربية (GMT+0)</span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-amiri font-black text-amber-100 tracking-wide drop-shadow-xs">
              {currentCity.nameAr}
            </h3>
            <span className="text-sm sm:text-base font-sans text-amber-300/90 font-medium block mt-1">
              {currentCity.nameFr}
            </span>
          </div>

          {/* Next Prayer Highlight Card (ENLARGED) */}
          <div className="w-full sm:w-auto bg-stone-950/50 backdrop-blur-md border-2 border-amber-400/70 rounded-2xl px-5 sm:px-7 py-4 text-center shadow-xl min-w-[220px]" dir="rtl">
            <span className="text-xs sm:text-sm font-amiri text-amber-200 block font-extrabold">
              الصلاة القادمة
            </span>
            <span className="font-amiri text-2xl sm:text-3xl lg:text-4xl font-black text-amber-300 block my-1">
              صلاة {nextPrayer.nameAr}
            </span>
            <div className="font-mono text-3xl sm:text-4xl font-black text-white tabular-nums drop-shadow-xs">
              {nextPrayer.time}
            </div>
            <span className="text-xs sm:text-sm text-amber-200 font-bold block mt-1.5 font-amiri">
              متبقي: {nextPrayer.remainingFormatted}
            </span>
          </div>

          {/* Qibla & Chime Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-center">
            <div className="flex-1 sm:flex-initial flex flex-col items-center justify-center bg-stone-950/40 border border-amber-400/40 rounded-xl p-3 text-center min-w-[105px]">
              <Compass className="w-6 h-6 text-amber-300 mb-1" />
              <span className="text-[11px] text-amber-200 font-bold">اتجاه القبلة</span>
              <span className="font-mono text-sm sm:text-base font-black text-white">{currentCity.qibla}° ENE</span>
            </div>

            <button
              onClick={handleTestChime}
              className="flex-1 sm:flex-initial flex flex-col items-center justify-center bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black rounded-xl p-3 text-center min-w-[105px] shadow-md transition-all cursor-pointer active:scale-95"
              title="سماع التنبيه الصوتي"
            >
              <Volume2 className="w-6 h-6 mb-1 text-stone-950" />
              <span className="text-[11px] font-sans font-bold">أذان / تنبيه</span>
              <span className="text-xs font-black">{playingChime ? 'استماع...' : 'تجربة'}</span>
            </button>
          </div>

        </div>

        {/* 6 Prayers Cards Grid (Redesigned for Big Mobile Readability) */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 mt-6">
          
          <div className={`p-3.5 sm:p-4 rounded-xl border-2 text-center transition-all ${
            nextPrayer.nameAr === 'الفجر'
              ? 'bg-amber-400/30 border-amber-300 text-white shadow-lg ring-2 ring-amber-300 scale-[1.02]'
              : 'bg-stone-950/40 border-amber-500/30 text-amber-100 hover:border-amber-400/50'
          }`}>
            <span className="font-amiri text-lg sm:text-xl font-black block" dir="rtl">الفجر</span>
            <span className="text-xs uppercase font-serif tracking-wider text-amber-200/80 font-bold block">Fajr</span>
            <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-black text-white block mt-1.5 tabular-nums">
              {prayerTimes.fajr}
            </span>
          </div>

          <div className={`p-3.5 sm:p-4 rounded-xl border-2 text-center transition-all ${
            nextPrayer.nameAr === 'الشروق'
              ? 'bg-amber-400/30 border-amber-300 text-white shadow-lg ring-2 ring-amber-300 scale-[1.02]'
              : 'bg-stone-950/40 border-amber-500/30 text-amber-100 hover:border-amber-400/50'
          }`}>
            <span className="font-amiri text-lg sm:text-xl font-black block" dir="rtl">الشروق</span>
            <span className="text-xs uppercase font-serif tracking-wider text-amber-200/80 font-bold block">Lever</span>
            <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-black text-white block mt-1.5 tabular-nums">
              {prayerTimes.sunrise}
            </span>
          </div>

          <div className={`p-3.5 sm:p-4 rounded-xl border-2 text-center transition-all ${
            nextPrayer.nameAr === 'الظهر'
              ? 'bg-amber-400/30 border-amber-300 text-white shadow-lg ring-2 ring-amber-300 scale-[1.02]'
              : 'bg-stone-950/40 border-amber-500/30 text-amber-100 hover:border-amber-400/50'
          }`}>
            <span className="font-amiri text-lg sm:text-xl font-black block" dir="rtl">الظهر</span>
            <span className="text-xs uppercase font-serif tracking-wider text-amber-200/80 font-bold block">Dohr</span>
            <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-black text-white block mt-1.5 tabular-nums">
              {prayerTimes.dohr}
            </span>
          </div>

          <div className={`p-3.5 sm:p-4 rounded-xl border-2 text-center transition-all ${
            nextPrayer.nameAr === 'العصر'
              ? 'bg-amber-400/30 border-amber-300 text-white shadow-lg ring-2 ring-amber-300 scale-[1.02]'
              : 'bg-stone-950/40 border-amber-500/30 text-amber-100 hover:border-amber-400/50'
          }`}>
            <span className="font-amiri text-lg sm:text-xl font-black block" dir="rtl">العصر</span>
            <span className="text-xs uppercase font-serif tracking-wider text-amber-200/80 font-bold block">Asr</span>
            <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-black text-white block mt-1.5 tabular-nums">
              {prayerTimes.asr}
            </span>
          </div>

          <div className={`p-3.5 sm:p-4 rounded-xl border-2 text-center transition-all ${
            nextPrayer.nameAr === 'المغرب'
              ? 'bg-amber-400/30 border-amber-300 text-white shadow-lg ring-2 ring-amber-300 scale-[1.02]'
              : 'bg-stone-950/40 border-amber-500/30 text-amber-100 hover:border-amber-400/50'
          }`}>
            <span className="font-amiri text-lg sm:text-xl font-black block" dir="rtl">المغرب</span>
            <span className="text-xs uppercase font-serif tracking-wider text-amber-200/80 font-bold block">Maghrib</span>
            <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-black text-white block mt-1.5 tabular-nums">
              {prayerTimes.maghrib}
            </span>
          </div>

          <div className={`p-3.5 sm:p-4 rounded-xl border-2 text-center transition-all ${
            nextPrayer.nameAr === 'العشاء'
              ? 'bg-amber-400/30 border-amber-300 text-white shadow-lg ring-2 ring-amber-300 scale-[1.02]'
              : 'bg-stone-950/40 border-amber-500/30 text-amber-100 hover:border-amber-400/50'
          }`}>
            <span className="font-amiri text-lg sm:text-xl font-black block" dir="rtl">العشاء</span>
            <span className="text-xs uppercase font-serif tracking-wider text-amber-200/80 font-bold block">Icha</span>
            <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-black text-white block mt-1.5 tabular-nums">
              {prayerTimes.icha}
            </span>
          </div>

        </div>

      </div>

      {/* 7 Days Forward Weekly Schedule Table */}
      <div className="bg-white dark:bg-[#1e1b17] border border-stone-200 dark:border-[#383129] rounded-2xl p-4 sm:p-6 shadow-sm mb-8 transition-colors">
        <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span>جدول مواقيت الصلاة للأيام السبعة القادمة</span>
          <span className="text-xs sm:text-sm font-amiri font-bold text-[#8B1E1E] dark:text-amber-400" dir="rtl">مدينة {currentCity.nameAr}</span>
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-4">
          الحساب الفلكي الرسمي لوزارة الأوقاف والشؤون الإسلامية (الفجر 19°، العشاء 17°، توقيت GMT+0).
        </p>

        <div className="overflow-x-auto -mx-1 sm:mx-0">
          <table className="w-full text-center text-xs sm:text-sm font-sans min-w-[500px]">
            <thead>
              <tr className="border-b-2 border-stone-200 dark:border-[#383129] text-stone-600 dark:text-stone-300 font-serif font-bold">
                <th className="pb-3 text-left font-black">اليوم / التاريخ</th>
                <th className="pb-3 font-black text-stone-800 dark:text-stone-200">الفجر</th>
                <th className="pb-3 font-bold text-stone-500 dark:text-stone-400">الشروق</th>
                <th className="pb-3 font-black text-stone-800 dark:text-stone-200">الظهر</th>
                <th className="pb-3 font-black text-stone-800 dark:text-stone-200">العصر</th>
                <th className="pb-3 font-black text-[#8B1E1E] dark:text-amber-400">المغرب</th>
                <th className="pb-3 font-black text-stone-800 dark:text-stone-200">العشاء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-[#2f2923]">
              {weekDays.map((item, idx) => {
                const dayNameFr = item.date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
                const dayNameAr = item.date.toLocaleDateString('ar-MA', { weekday: 'short', day: 'numeric', month: 'short' });
                const isTodayRow = idx === 0;

                return (
                  <tr key={idx} className={`hover:bg-stone-50 dark:hover:bg-[#25211c] transition-colors ${isTodayRow ? 'bg-amber-100/40 dark:bg-amber-950/30 font-bold' : ''}`}>
                    <td className="py-3 text-left font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 whitespace-nowrap">
                      {isTodayRow && <span className="w-2 h-2 rounded-full bg-[#8B1E1E] dark:bg-amber-400 shrink-0" />}
                      <span className="font-amiri text-xs sm:text-sm font-bold">{dayNameAr}</span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 font-sans">({dayNameFr})</span>
                    </td>
                    <td className="py-3 font-mono tabular-nums text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">{item.times.fajr}</td>
                    <td className="py-3 font-mono tabular-nums text-xs sm:text-sm text-stone-500 dark:text-stone-400">{item.times.sunrise}</td>
                    <td className="py-3 font-mono tabular-nums text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">{item.times.dohr}</td>
                    <td className="py-3 font-mono tabular-nums text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">{item.times.asr}</td>
                    <td className="py-3 font-mono tabular-nums text-xs sm:text-sm font-black text-[#8B1E1E] dark:text-amber-400">{item.times.maghrib}</td>
                    <td className="py-3 font-mono tabular-nums text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">{item.times.icha}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Moroccan Ministry Methodological Standards */}
      <div className="bg-[#fcfbf7] dark:bg-[#181512] border-2 border-stone-200 dark:border-[#383129] rounded-2xl p-5 sm:p-6 transition-colors shadow-2xs">
        <h4 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
          <Info className="w-5 h-5 text-[#8B1E1E] dark:text-amber-400 shrink-0" />
          <span>الضوابط الشرعية والفلكية المعتمدة بالمملكة المغربية</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed" dir="rtl">
          <div className="p-3 bg-white/60 dark:bg-[#201c18] rounded-xl border border-stone-200/80 dark:border-[#322a21]">
            <span className="font-black text-stone-900 dark:text-stone-100 block mb-1 text-sm">زاوية الفجر (19.0°)</span>
            اعتمدتها وزارة الأوقاف والشؤون الإسلامية بالمغرب لضبط طلوع الفجر الصادق المنتشر في الأفق.
          </div>
          <div className="p-3 bg-white/60 dark:bg-[#201c18] rounded-xl border border-stone-200/80 dark:border-[#322a21]">
            <span className="font-black text-stone-900 dark:text-stone-100 block mb-1 text-sm">المذهب المالكي (العصر)</span>
            يدخل وقت العصر إذا صار ظل كل شيء مثله مضافاً إليه فيء الزوال (مقياس الظل الواحد).
          </div>
          <div className="p-3 bg-white/60 dark:bg-[#201c18] rounded-xl border border-stone-200/80 dark:border-[#322a21]">
            <span className="font-black text-stone-900 dark:text-stone-100 block mb-1 text-sm">زاوية العشاء (17.0°)</span>
            تحدد مغيب الشفق الأحمر تماماً على السواحل الأطلسية والمتوسطية للمملكة.
          </div>
        </div>
      </div>

    </div>
  );
}
