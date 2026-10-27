import { useState } from 'react';
import {
  Menu,
  X,
  Calendar,
  Clock,
  Compass,
  Bookmark,
  Search,
  RefreshCw,
  Sparkles,
  MapPin,
  Sprout,
  ArrowRight,
  Sun,
  Moon,
  CalendarDays,
} from 'lucide-react';
import { MoroccanCity, MOROCCAN_CITIES } from '../data/moroccanCities';
import {
  FontSizeScale,
  FONT_SIZE_OPTIONS,
  getFontSizeOption,
} from '../utils/fontSize';
import { PWAInstallButton } from './PWAInstallButton';

export type HeaderTab = 'leaf' | 'prayers' | 'quadruple' | 'manazil' | 'about' | 'terms' | 'legal';

interface HeaderProps {
  currentCity: MoroccanCity;
  onSelectCity: (city: MoroccanCity) => void;
  activeTab: HeaderTab;
  onChangeTab: (tab: HeaderTab) => void;
  onOpenFavorites: () => void;
  onOpenSearch: () => void;
  onGoToToday: () => void;
  favoritesCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  fontSizeScale: FontSizeScale;
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  onCycleFontSize: () => void;
  onSelectFontSize: (scale: FontSizeScale) => void;
  onDetectCity?: () => void;
  isDetectingCity?: boolean;
}

export function Header({
  currentCity,
  onSelectCity,
  activeTab,
  onChangeTab,
  onOpenFavorites,
  onOpenSearch,
  onGoToToday,
  favoritesCount,
  isDarkMode,
  onToggleDarkMode,
  fontSizeScale,
  onIncreaseFontSize,
  onDecreaseFontSize,
  onCycleFontSize,
  onSelectFontSize,
  onDetectCity,
  isDetectingCity = false,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentFontOption = getFontSizeOption(fontSizeScale);

  const handleNavClick = (tab: HeaderTab) => {
    onChangeTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#fbf9f5]/95 dark:bg-[#1a1714]/95 backdrop-blur-md border-b border-stone-200 dark:border-[#2f2923] shadow-xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-6">
          
          {/* Zone 1: Wordmark Brand & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 sm:p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-[#2d2721] rounded-lg transition-colors cursor-pointer"
              aria-label="القائمة الرئيسية"
              title="القائمة الرئيسية"
            >
              <Menu className="w-5 h-5 text-stone-900 dark:text-stone-100" />
            </button>

            <button
              onClick={() => onChangeTab('leaf')}
              className="flex items-center gap-1.5 sm:gap-2 text-left group cursor-pointer focus-visible:outline-hidden"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#8B1E1E] dark:bg-[#701515] text-amber-200 flex items-center justify-center shadow-xs border border-amber-600/40 shrink-0">
                <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 drop-shadow-xs" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm sm:text-base lg:text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-[#8B1E1E] dark:group-hover:text-amber-400 transition-colors whitespace-nowrap">
                  اليومية لبوعياد
                </span>
                <span className="hidden sm:block text-[10px] sm:text-[11px] font-amiri text-amber-800 dark:text-amber-400/90 -mt-1 font-semibold whitespace-nowrap" dir="rtl">
                  اليومية العصرية لبوعياد
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Desktop Navigation Links (Hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700 dark:text-stone-300 font-amiri text-base" dir="rtl">
            <button
              onClick={() => onChangeTab('leaf')}
              className={`whitespace-nowrap pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'leaf'
                  ? 'border-[#8B1E1E] text-[#8B1E1E] dark:border-amber-400 dark:text-amber-400 font-bold'
                  : 'border-transparent hover:text-stone-950 dark:hover:text-white font-semibold'
              }`}
            >
              ورقة اليوم
            </button>
            <button
              onClick={() => onChangeTab('quadruple')}
              className={`whitespace-nowrap pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'quadruple'
                  ? 'border-[#8B1E1E] text-[#8B1E1E] dark:border-amber-400 dark:text-amber-400 font-bold'
                  : 'border-transparent hover:text-stone-950 dark:hover:text-white font-semibold'
              }`}
            >
              التقويم الرباعي
            </button>
            <button
              onClick={() => onChangeTab('prayers')}
              className={`whitespace-nowrap pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'prayers'
                  ? 'border-[#8B1E1E] text-[#8B1E1E] dark:border-amber-400 dark:text-amber-400 font-bold'
                  : 'border-transparent hover:text-stone-950 dark:hover:text-white font-semibold'
              }`}
            >
              مواقيت الصلاة
            </button>
            <button
              onClick={() => onChangeTab('manazil')}
              className={`whitespace-nowrap pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'manazil'
                  ? 'border-[#8B1E1E] text-[#8B1E1E] dark:border-amber-400 dark:text-amber-400 font-bold'
                  : 'border-transparent hover:text-stone-950 dark:hover:text-white font-semibold'
              }`}
            >
              منازل الفلاح
            </button>
          </nav>

          {/* Zone 3: Primary Action & Utilities */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            
            {/* City Selector & GPS Detect */}
            <div className="flex items-center gap-1">
              <div className="relative">
                <select
                  value={currentCity.id}
                  onChange={(e) => {
                    const found = MOROCCAN_CITIES.find((c) => c.id === e.target.value);
                    if (found) onSelectCity(found);
                  }}
                  className="text-xs sm:text-sm font-semibold bg-white dark:bg-[#24201c] text-stone-800 dark:text-stone-100 border border-stone-300 dark:border-[#3d362e] rounded-lg py-1.5 pl-2 pr-5 sm:pl-3 sm:pr-7 focus:outline-hidden focus:ring-1 focus:ring-[#8B1E1E] dark:focus:ring-amber-400 cursor-pointer shadow-2xs appearance-none font-amiri max-w-[90px] xs:max-w-[110px] sm:max-w-[150px] truncate transition-colors"
                  title="اختر المدينة المغربية"
                  dir="rtl"
                >
                  {MOROCCAN_CITIES.map((c) => (
                    <option key={c.id} value={c.id} className="dark:bg-[#24201c] dark:text-stone-100">
                      🇲🇦 {c.nameAr}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 text-stone-500 dark:text-stone-400 text-[10px] sm:text-xs">
                  ▾
                </span>
              </div>

              {onDetectCity && (
                <button
                  type="button"
                  onClick={onDetectCity}
                  disabled={isDetectingCity}
                  className="p-1.5 rounded-lg border border-stone-300 dark:border-[#3d362e] bg-white dark:bg-[#24201c] text-stone-700 dark:text-stone-300 hover:text-[#8B1E1E] dark:hover:text-amber-400 hover:bg-stone-50 dark:hover:bg-[#2e2821] shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
                  title="تحديد مدينتي تلقائياً عبر GPS"
                  aria-label="Détecter ma ville automatiquement"
                >
                  <MapPin className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B1E1E] dark:text-amber-400 ${isDetectingCity ? 'animate-bounce' : ''}`} />
                </button>
              )}
            </div>

            {/* Font Size Accessibility Stepper (Desktop/Tablet) */}
            <div
              className="hidden sm:flex items-center bg-white dark:bg-[#24201c] border border-stone-300 dark:border-[#3d362e] rounded-lg p-0.5 shadow-2xs transition-colors"
              title={`حجم الخط وسهولة القراءة: ${currentFontOption.labelAr} (${currentFontOption.percentage}%)`}
            >
              <button
                type="button"
                onClick={onDecreaseFontSize}
                disabled={fontSizeScale === 'compact'}
                className="px-1.5 py-1 text-xs font-bold font-sans text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-[#2d2720] rounded-sm disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="تصغير حجم الخط (A-)"
                aria-label="Réduire la taille du texte"
              >
                A⁻
              </button>
              <button
                type="button"
                onClick={() => onSelectFontSize('normal')}
                className="px-1.5 py-0.5 text-[11px] font-sans font-bold text-stone-600 dark:text-stone-300 hover:text-[#8B1E1E] dark:hover:text-amber-400 transition-colors cursor-pointer"
                title={`حجم الخط: ${currentFontOption.percentage}% - اضغط لإعادة الضبط`}
                aria-label="Taille du texte par défaut"
              >
                <span className="inline-block min-w-[28px] text-center font-mono">
                  {currentFontOption.percentage}%
                </span>
              </button>
              <button
                type="button"
                onClick={onIncreaseFontSize}
                disabled={fontSizeScale === 'xlarge'}
                className="px-1.5 py-1 text-xs font-bold font-sans text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-[#2d2720] rounded-sm disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="تكبير حجم الخط (A+)"
                aria-label="Agrandir la taille du texte"
              >
                A⁺
              </button>
            </div>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 sm:p-2 text-stone-600 dark:text-amber-300 hover:text-stone-900 dark:hover:text-amber-200 hover:bg-stone-200/60 dark:hover:bg-[#2e2821] rounded-md transition-colors cursor-pointer shrink-0"
              title={isDarkMode ? 'الوضع النهاري (فاتح)' : 'الوضع الليلي (داكن)'}
              aria-label="Mode sombre ou clair"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 drop-shadow-xs" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700" />
              )}
            </button>

            {/* Search Button (Desktop) */}
            <button
              onClick={onOpenSearch}
              className="hidden sm:flex p-1.5 sm:p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-[#2e2821] rounded-md transition-colors cursor-pointer"
              title="بحث في الأمثال والفوائد"
              aria-label="Rechercher"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Favorites Button (Desktop) */}
            <button
              onClick={onOpenFavorites}
              className="hidden sm:flex p-1.5 sm:p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-[#2e2821] rounded-md transition-colors relative cursor-pointer"
              title="الأوراق المحفوظة"
              aria-label="Favoris"
            >
              <Bookmark className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8B1E1E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* PWA Install Button (Desktop) */}
            <PWAInstallButton variant="header" className="hidden lg:flex" />

            {/* Primary Action Button: "اليوم" (Hidden on mobile) */}
            <button
              onClick={onGoToToday}
              className="hidden sm:flex px-2 sm:px-3.5 py-1.5 text-xs sm:text-sm font-bold text-white bg-[#8B1E1E] hover:bg-[#721818] dark:bg-[#751616] dark:hover:bg-[#8B1E1E] rounded-md shadow-xs transition-colors whitespace-nowrap shrink-0 items-center gap-1 cursor-pointer font-amiri"
              dir="rtl"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>اليوم</span>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Slide-over Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-50 flex justify-start md:hidden bg-stone-900/60 backdrop-blur-xs animate-fadeIn cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-4/5 max-w-xs bg-[#fdfbf7] dark:bg-[#1a1714] h-full shadow-2xl flex flex-col border-l border-stone-200 dark:border-[#2f2923] animate-slideRight cursor-default transition-colors"
          >
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-stone-200 dark:border-[#2f2923] flex items-center justify-between bg-[#f6f2e9] dark:bg-[#231f1b]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-[#8B1E1E] dark:bg-[#701515] text-amber-200 flex items-center justify-center shadow-xs border border-amber-600/40 shrink-0">
                  <CalendarDays className="w-4 h-4 text-amber-300 drop-shadow-xs" />
                </div>
                <div>
                  <h3 className="font-amiri font-bold text-base text-stone-900 dark:text-stone-100" dir="rtl">
                    اليومية العصرية لبوعياد
                  </h3>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 font-sans block">
                    التقويم المغربي الأصيل
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200 dark:hover:bg-[#2f2923] rounded-md transition-colors cursor-pointer"
                aria-label="إغلاق القائمة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="p-4 space-y-2 flex-1 overflow-y-auto font-amiri text-right" dir="rtl">
              
              <button
                onClick={() => handleNavClick('leaf')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'leaf'
                    ? 'bg-[#8B1E1E] text-white font-bold shadow-xs'
                    : 'bg-stone-100/70 dark:bg-[#24201c] hover:bg-stone-200/70 dark:hover:bg-[#2e2821] text-stone-800 dark:text-stone-200'
                }`}
              >
                <span className="text-base">📅 ورقة اليوم</span>
                <span className="text-xs opacity-70">الرئيسية</span>
              </button>

              <button
                onClick={() => handleNavClick('quadruple')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'quadruple'
                    ? 'bg-[#8B1E1E] text-white font-bold shadow-xs'
                    : 'bg-stone-100/70 dark:bg-[#24201c] hover:bg-stone-200/70 dark:hover:bg-[#2e2821] text-stone-800 dark:text-stone-200'
                }`}
              >
                <span className="text-base">🗓️ التقويم الرباعي</span>
                <span className="text-xs opacity-70">هجري · ميلادي · فلاحي · أمازيغي</span>
              </button>

              <button
                onClick={() => handleNavClick('prayers')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'prayers'
                    ? 'bg-[#8B1E1E] text-white font-bold shadow-xs'
                    : 'bg-stone-100/70 dark:bg-[#24201c] hover:bg-stone-200/70 dark:hover:bg-[#2e2821] text-stone-800 dark:text-stone-200'
                }`}
              >
                <span className="text-base">🕌 مواقيت الصلاة</span>
                <span className="text-xs opacity-70">GMT+0 ({currentCity.nameAr})</span>
              </button>

              <button
                onClick={() => handleNavClick('manazil')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'manazil'
                    ? 'bg-[#8B1E1E] text-white font-bold shadow-xs'
                    : 'bg-stone-100/70 dark:bg-[#24201c] hover:bg-stone-200/70 dark:hover:bg-[#2e2821] text-stone-800 dark:text-stone-200'
                }`}
              >
                <span className="text-base">🌾 منازل الفلاح المغربي</span>
                <span className="text-xs opacity-70">الـ 28 منزلة والأنواء</span>
              </button>

              {/* Utility shortcuts inside Drawer */}
              <div className="pt-4 mt-4 border-t border-stone-200 dark:border-[#2f2923] space-y-3">
                
                {/* PWA Install Button inside Drawer */}
                <PWAInstallButton variant="drawer" />

                {/* Font Size Accessibility Selector in Mobile Drawer */}
                <div className="p-3 rounded-xl bg-stone-100/90 dark:bg-[#24201c] border border-stone-200 dark:border-[#383129] transition-colors">
                  <div className="flex items-center justify-between mb-2" dir="rtl">
                    <span className="text-xs font-bold font-amiri text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <span>حجم الخط والقراءة</span>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400 font-sans font-normal">(Accessibility)</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-[#8B1E1E] dark:text-amber-400">
                      {currentFontOption.percentage}%
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 font-sans">
                    {FONT_SIZE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => onSelectFontSize(opt.id)}
                        className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer ${
                          fontSizeScale === opt.id
                            ? 'bg-[#8B1E1E] text-white shadow-xs font-bold ring-1 ring-[#8B1E1E]'
                            : 'bg-white dark:bg-[#1a1714] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#2d2720] border border-stone-200/70 dark:border-[#332b23]'
                        }`}
                        title={opt.descriptionAr}
                      >
                        <span className="block text-sm leading-none mb-1 font-bold">{opt.badge}</span>
                        <span className="block text-[10px] font-amiri truncate">{opt.labelAr}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-2 text-right font-amiri leading-normal" dir="rtl">
                    {currentFontOption.descriptionAr}
                  </p>
                </div>

                {/* GPS Location Auto-detect inside mobile drawer */}
                {onDetectCity && (
                  <button
                    onClick={() => {
                      onDetectCity();
                      setMobileMenuOpen(false);
                    }}
                    disabled={isDetectingCity}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg bg-stone-100 dark:bg-[#24201c] hover:bg-stone-200 dark:hover:bg-[#2e2821] text-stone-800 dark:text-stone-200 text-sm font-bold transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 text-[#8B1E1E] dark:text-amber-400 ${isDetectingCity ? 'animate-bounce' : ''}`} />
                      <span>تحديد مدينتي تلقائياً (GPS)</span>
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-sans">
                      {isDetectingCity ? 'جاري التحديد...' : currentCity.nameAr}
                    </span>
                  </button>
                )}

                {/* Dark Mode switcher inside mobile drawer */}
                <button
                  onClick={onToggleDarkMode}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-stone-100 dark:bg-[#24201c] hover:bg-stone-200 dark:hover:bg-[#2e2821] text-stone-800 dark:text-stone-200 text-sm font-bold transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
                    <span>{isDarkMode ? 'الوضع النهاري (فاتح)' : 'الوضع الليلي (داكن للقراءة)'}</span>
                  </span>
                  <span className="text-xs font-sans text-stone-500 dark:text-stone-400">
                    {isDarkMode ? '☀️ نهار' : '🌙 ليل'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    onOpenSearch();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-stone-50 dark:bg-[#201d19] hover:bg-stone-100 dark:hover:bg-[#28241f] text-stone-700 dark:text-stone-300 text-sm font-bold"
                >
                  <span>🔍 بحث في الأمثال والفوائد</span>
                </button>

                <button
                  onClick={() => {
                    onOpenFavorites();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-stone-50 dark:bg-[#201d19] hover:bg-stone-100 dark:hover:bg-[#28241f] text-stone-700 dark:text-stone-300 text-sm font-bold"
                >
                  <span>🔖 الأوراق المحفوظة</span>
                  {favoritesCount > 0 && (
                    <span className="bg-[#8B1E1E] text-white text-xs px-2 py-0.5 rounded-full font-sans">
                      {favoritesCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Informative & Legal Pages Links */}
              <div className="pt-3 border-t border-stone-200 dark:border-[#2f2923] space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                <span className="block text-[11px] font-bold text-stone-500 dark:text-stone-400 mb-1">
                  معلومات وقانونيات
                </span>
                <button
                  onClick={() => handleNavClick('about')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-right transition-colors cursor-pointer ${
                    activeTab === 'about'
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-[#8B1E1E] dark:text-amber-400 font-bold'
                      : 'hover:bg-stone-100 dark:hover:bg-[#25201b]'
                  }`}
                >
                  <span>📖 À propos de nous (من نحن)</span>
                </button>
                <button
                  onClick={() => handleNavClick('terms')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-right transition-colors cursor-pointer ${
                    activeTab === 'terms'
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-[#8B1E1E] dark:text-amber-400 font-bold'
                      : 'hover:bg-stone-100 dark:hover:bg-[#25201b]'
                  }`}
                >
                  <span>📜 Conditions générales (الشروط والأحكام)</span>
                </button>
                <button
                  onClick={() => handleNavClick('legal')}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-right transition-colors cursor-pointer ${
                    activeTab === 'legal'
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-[#8B1E1E] dark:text-amber-400 font-bold'
                      : 'hover:bg-stone-100 dark:hover:bg-[#25201b]'
                  }`}
                >
                  <span>⚖️ Mentions légales (البيانات القانونية)</span>
                </button>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-stone-200 dark:border-[#2f2923] bg-[#f4efe6] dark:bg-[#1f1b17] text-center text-xs text-stone-500 dark:text-stone-400 font-amiri" dir="rtl">
              <span>تطبيق الويب لليومية العصرية لبوعياد بالمغرب</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

