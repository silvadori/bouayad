import { useState } from 'react';
import { Calendar, Sun, Moon, Sprout, Landmark, Sparkles, ArrowRightLeft } from 'lucide-react';
import { getQuadrupleCalendar } from '../utils/calendars';

interface QuadrupleCalendarViewProps {
  currentDate: Date;
  onSelectDate: (date: Date) => void;
  hijriOffset: number;
  onUpdateHijriOffset: (offset: number) => void;
}

export function QuadrupleCalendarView({
  currentDate,
  onSelectDate,
  hijriOffset,
  onUpdateHijriOffset,
}: QuadrupleCalendarViewProps) {
  const [testDateStr, setTestDateStr] = useState<string>(
    currentDate.toISOString().split('T')[0]
  );

  const selectedDate = new Date(testDateStr + 'T12:00:00');
  const quadruple = getQuadrupleCalendar(selectedDate, hijriOffset);

  const holidays = [
    { nameFr: 'Manifeste de l\'Indépendance', nameAr: 'تقديم وثيقة الاستقلال', date: '11 Janvier', type: 'national' },
    { nameFr: 'Nouvel An Amazigh (Yennayer)', nameAr: 'رأس السنة الأمازيغية', date: '14 Janvier', type: 'national' },
    { nameFr: 'Aïd Al-Fitr (estimation)', nameAr: 'عيد الفطر المبارك', date: '1er Chawwal', type: 'religious' },
    { nameFr: 'Fête du Travail', nameAr: 'عيد الشغل', date: '1er Mai', type: 'national' },
    { nameFr: 'Aïd Al-Adha (estimation)', nameAr: 'عيد الأضحى المبارك', date: '10 Dhu al-Hijja', type: 'religious' },
    { nameFr: 'Nouvel An Hégirien 1448', nameAr: 'فاتح محرم 1448', date: '1er Mouharram', type: 'religious' },
    { nameFr: 'Fête du Trône', nameAr: 'عيد العرش المجيد', date: '30 Juillet', type: 'national' },
    { nameFr: 'Allégeance Oued Ed-Dahab', nameAr: 'ذكرى استرجاع وادي الذهب', date: '14 Août', type: 'national' },
    { nameFr: 'Révolution du Roi et du Peuple', nameAr: 'ثورة الملك والشعب', date: '20 Août', type: 'national' },
    { nameFr: 'Fête de la Jeunesse', nameAr: 'عيد الشباب المجيد', date: '21 Août', type: 'national' },
    { nameFr: 'Aïd Al Mawlid Annabawi', nameAr: 'المولد النبوي الشريف', date: '12 Rabi\' al-Awwal', type: 'religious' },
    { nameFr: 'Anniversaire de la Marche Verte', nameAr: 'ذكرى المسيرة الخضراء', date: '6 Novembre', type: 'national' },
    { nameFr: 'Fête de l\'Indépendance', nameAr: 'عيد الاستقلال المجيد', date: '18 Novembre', type: 'national' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs uppercase font-serif tracking-widest text-[#8B1E1E] dark:text-amber-400 font-bold block mb-1">
          L'Éphéméride Bouayad · تقويم الأصالة
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 tracking-tight">
          Le Quadruple Calendrier Marocain
        </h2>
        <p className="font-amiri text-lg text-stone-700 dark:text-stone-300 mt-1" dir="rtl">
          تزامن فريد لأربعة تقاويم تاريخية رافقت الحضارة المغربية عبر القرون
        </p>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
          La spécificité emblématique de l'éphéméride Bouayad réside dans sa juxtaposition simultanée de 4 temporalités : civile (grégorienne), religieuse (hégirienne), agraire (fellahi) et culturelle (amazighe).
        </p>
      </div>

      {/* Interactive Date Converter Bar */}
      <div className="bg-white dark:bg-[#1e1b17] border border-stone-200 dark:border-[#352e26] rounded-xl p-4 sm:p-5 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#8B1E1E]/10 dark:bg-[#8B1E1E]/30 text-[#8B1E1E] dark:text-amber-400 flex items-center justify-center shrink-0">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">Convertisseur Quadruple Instantané</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">Choisissez une date grégorienne pour calculer ses équivalents dans les 4 تقاويم</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="date"
            value={testDateStr}
            onChange={(e) => setTestDateStr(e.target.value)}
            className="text-xs sm:text-sm font-medium px-3 py-1.5 border border-stone-300 dark:border-[#383129] dark:bg-[#181512] dark:text-stone-100 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#8B1E1E] dark:focus:ring-amber-400"
          />
          <button
            onClick={() => onSelectDate(selectedDate)}
            className="text-xs font-semibold px-3 py-1.5 bg-[#8B1E1E] hover:bg-[#741818] dark:bg-[#751616] dark:hover:bg-[#8B1E1E] text-white rounded-md transition-colors cursor-pointer"
          >
            Afficher ce Feuillet
          </button>
        </div>
      </div>

      {/* The 4 Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">
        
        {/* 1. Calendrier Grégorien */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-5 sm:p-6 shadow-sm hover:border-stone-300 dark:hover:border-stone-600 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-[#28221c] text-stone-800 dark:text-stone-200 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-[#8B1E1E] dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">التقويم الميلادي (المدني)</h3>
                <span className="text-xs sm:text-sm font-sans text-stone-500 dark:text-stone-400">Calendrier Grégorien International</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-stone-100 dark:bg-[#28221c] text-stone-700 dark:text-stone-300 px-2.5 py-1 rounded-md">
              شمسي · 365.24 يوم
            </span>
          </div>

          <div className="bg-stone-50 dark:bg-[#161310] border border-stone-200/90 dark:border-[#332a20] rounded-xl p-3.5 text-center mb-3.5 shadow-2xs">
            <div className="text-xs text-stone-500 dark:text-stone-400 font-serif">التاريخ المقابل :</div>
            <div className="font-amiri text-lg sm:text-xl font-bold text-[#8B1E1E] dark:text-amber-400 my-0.5" dir="rtl">
              {quadruple.gregorian.formattedAr}
            </div>
            <div className="font-bold text-stone-800 dark:text-stone-200 text-sm sm:text-base font-serif">
              {quadruple.gregorian.formattedFr}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
            التقويم الشمسي المدني الدولي المعتمد بالمملكة المغربية في المعاملات الإدارية، الاقتصادية، المدرسية والقانونية. تم إقراره سنة 1582.
          </p>
        </div>

        {/* 2. Calendrier Hégirien */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-emerald-200/80 dark:border-emerald-900/50 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <Moon className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">التقويم الهجري (الإسلامي)</h3>
                <span className="text-xs sm:text-sm font-sans text-emerald-800 dark:text-emerald-400 font-semibold">Calendrier Hégirien Musulman</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-md">
              قمري · 354 يوم
            </span>
          </div>

          <div className="bg-emerald-50/70 dark:bg-[#0f2117] border border-emerald-200/80 dark:border-emerald-800/60 rounded-xl p-3.5 text-center mb-3.5 shadow-2xs">
            <div className="text-xs text-stone-500 dark:text-stone-400 font-serif">التاريخ المقابل :</div>
            <div className="font-amiri text-xl sm:text-2xl font-black text-emerald-950 dark:text-emerald-200 my-0.5" dir="rtl">
              {quadruple.hijri.formattedAr}
            </div>
            <div className="font-bold text-stone-800 dark:text-stone-200 text-sm sm:text-base font-serif">
              {quadruple.hijri.formattedFr}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans mb-3">
            يرتبط بهجرة المصطفى ﷺ من مكة المكرمة إلى المدينة المنورة عام 622م. يضبط المناسبات الدينية الكبرى كرمضان وعيدي الفطر والأضحى. بالمغرب، تثبت بدايات الشهور بالرؤية البصرية الرسمية للوزارة.
          </p>

          {/* Hijri Adjustment Slider for Moroccan sighting */}
          <div className="pt-2.5 border-t border-emerald-100 dark:border-emerald-950 flex items-center justify-between text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            <span>تعديل رؤية الهلال بالمغرب :</span>
            <div className="flex items-center gap-2 font-mono">
              <button
                onClick={() => onUpdateHijriOffset(hijriOffset - 1)}
                className="w-7 h-7 rounded-md bg-stone-100 dark:bg-[#28221c] hover:bg-stone-200 dark:hover:bg-[#342d25] text-stone-900 dark:text-stone-100 font-bold cursor-pointer transition-colors"
                title="-1 يوم"
              >
                -
              </button>
              <span className="px-2 font-bold text-stone-950 dark:text-stone-100">
                {hijriOffset > 0 ? `+${hijriOffset}` : hijriOffset} يوم
              </span>
              <button
                onClick={() => onUpdateHijriOffset(hijriOffset + 1)}
                className="w-7 h-7 rounded-md bg-stone-100 dark:bg-[#28221c] hover:bg-stone-200 dark:hover:bg-[#342d25] text-stone-900 dark:text-stone-100 font-bold cursor-pointer transition-colors"
                title="+1 يوم"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* 3. Calendrier Agricole Marocain (Fellahi) */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-amber-200/80 dark:border-amber-900/50 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-amber-300 dark:hover:border-amber-800 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                <Sprout className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">التقويم الفلاحي (العجمي)</h3>
                <span className="text-xs sm:text-sm font-sans text-amber-800 dark:text-amber-400 font-semibold">Calendrier Agricole Fellahi</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 px-2.5 py-1 rounded-md">
              يولياني (+13 يوم) · 28 منزلة
            </span>
          </div>

          <div className="bg-amber-50/80 dark:bg-[#261d13] border border-amber-200/80 dark:border-amber-800/60 rounded-xl p-3.5 text-center mb-3.5 shadow-2xs">
            <div className="text-xs text-stone-500 dark:text-stone-400 font-serif">التاريخ والمنزلة الحالية :</div>
            <div className="font-amiri text-lg sm:text-xl font-black text-amber-950 dark:text-amber-200 my-0.5" dir="rtl">
              {quadruple.fellahi.formattedAr} · منزلة {quadruple.fellahi.manzilah.nameAr}
            </div>
            <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 italic font-amiri font-bold">
              « {quadruple.fellahi.manzilah.proverbAr} »
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
            إرث زراعي يولياني عريق حافظ عليه الفلاح المغربي عبر الأجيال، متأخر بـ 13 يوماً عن الميلادي. يقسم السنة إلى 28 منزلة قمرية تضبط مواسم الحرث، الزرع، الري، وفصول الليالي والسمايم.
          </p>
        </div>

        {/* 4. Calendrier Amazighe */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-blue-200/80 dark:border-blue-900/50 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-blue-300 dark:hover:border-blue-800 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">التقويم الأمازيغي (إيض يناير)</h3>
                <span className="text-xs sm:text-sm font-sans text-blue-800 dark:text-blue-400 font-semibold">Calendrier Amazighe Millénaire</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300 px-2.5 py-1 rounded-md">
              سنة {quadruple.amazigh.year}
            </span>
          </div>

          <div className="bg-blue-50/70 dark:bg-[#121c2a] border border-blue-200/80 dark:border-blue-800/60 rounded-xl p-3.5 text-center mb-3.5 shadow-2xs">
            <div className="text-xs text-stone-500 dark:text-stone-400 font-serif">التاريخ المقابل :</div>
            <div className="font-amiri text-lg sm:text-xl font-black text-blue-950 dark:text-blue-200 my-0.5" dir="rtl">
              {quadruple.amazigh.formattedAr}
            </div>
            <div className="text-xs sm:text-sm text-blue-900 dark:text-blue-300 font-bold tracking-wider">
              {quadruple.amazigh.monthTifinagh} · {quadruple.amazigh.formattedFr}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
            تقويم رعوي وزراعي عريق يخلد اعتلاء الملك الأمازيغي شيشنق الأول عرش مصر سنة 950 ق.م. وقد أقر جلالة الملك محمد السادس نصره الله رأس السنة الأمازيغية (إيض يناير / 14 يناير) عطلة وطنية رسمية مؤدى عنها.
          </p>
        </div>

      </div>

      {/* Official Moroccan Calendar Holidays Reference Table */}
      <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-4 sm:p-6 shadow-sm transition-colors">
        <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-1 flex items-center justify-between">
          <span>قائمة الأعياد الوطنية والدينية الرسمية بالمملكة المغربية</span>
          <span className="text-xs sm:text-sm font-sans text-stone-500 dark:text-stone-400">Jours Fériés au Maroc</span>
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-4">
          الائتلاف الرسمي للمناسبات الوطنية والدينية المخلدة في المملكة المغربية الشريفة.
        </p>

        <div className="overflow-x-auto -mx-1 sm:mx-0">
          <table className="w-full text-right text-xs sm:text-sm font-sans min-w-[500px]" dir="rtl">
            <thead>
              <tr className="border-b-2 border-stone-200 dark:border-[#383129] text-stone-600 dark:text-stone-300 font-serif font-bold">
                <th className="pb-3 text-right font-black">المناسبة (بالعربية)</th>
                <th className="pb-3 text-left font-semibold">Célébration (Français)</th>
                <th className="pb-3 font-semibold text-center">التاريخ / الفترة</th>
                <th className="pb-3 font-semibold text-center">طبيعة العيد</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-[#2f2923]">
              {holidays.map((h, idx) => (
                <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-[#25211c] transition-colors">
                  <td className="py-3 font-amiri font-bold text-stone-950 dark:text-stone-100 text-sm sm:text-base">{h.nameAr}</td>
                  <td className="py-3 font-medium text-stone-700 dark:text-stone-300 text-left font-sans">{h.nameFr}</td>
                  <td className="py-3 font-mono text-stone-600 dark:text-stone-400 text-center font-bold">{h.date}</td>
                  <td className="py-3 text-center">
                    <span className={`text-xs px-2.5 py-1 rounded-md font-bold ${
                      h.type === 'religious'
                        ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-amber-100 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800'
                    }`}>
                      {h.type === 'religious' ? 'ديني' : 'وطني'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
