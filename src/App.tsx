import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BouayadLeaf } from './components/BouayadLeaf';
import { QuadrupleCalendarView } from './components/QuadrupleCalendarView';
import { PrayerTimesView } from './components/PrayerTimesView';
import { ManazilView } from './components/ManazilView';
import { AboutView } from './components/AboutView';
import { TermsView } from './components/TermsView';
import { LegalNoticeView } from './components/LegalNoticeView';
import { FavoritesModal, SavedLeafItem } from './components/FavoritesModal';
import { SearchModal } from './components/SearchModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { MapPin } from 'lucide-react';
import { MoroccanCity, MOROCCAN_CITIES, DEFAULT_CITY, findClosestMoroccanCity } from './data/moroccanCities';
import { getQuadrupleCalendar } from './utils/calendars';
import { calculatePrayerTimes, getNextPrayer } from './utils/prayerTimes';
import { getDailyBouayadContent, BOUAYAD_CONTENT_LIBRARY } from './data/bouayadContent';
import {
  FontSizeScale,
  FONT_SIZE_OPTIONS,
  DEFAULT_FONT_SIZE_SCALE,
  getFontSizeOption,
} from './utils/fontSize';

export type AppTab = 'leaf' | 'prayers' | 'quadruple' | 'manazil' | 'about' | 'terms' | 'legal';

export default function App() {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [currentCity, setCurrentCity] = useState<MoroccanCity>(() => {
    try {
      const saved = localStorage.getItem('bouayad_city_id');
      if (saved) {
        const found = MOROCCAN_CITIES.find((c) => c.id === saved);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return DEFAULT_CITY;
  });

  const [activeTab, setActiveTab] = useState<AppTab>('leaf');
  const [hijriOffset, setHijriOffset] = useState<number>(0);

  // Global Font Size Scaling for Accessibility
  const [fontSizeScale, setFontSizeScale] = useState<FontSizeScale>(() => {
    try {
      const saved = localStorage.getItem('bouayad_font_size');
      if (saved && FONT_SIZE_OPTIONS.some((o) => o.id === saved)) {
        return saved as FontSizeScale;
      }
    } catch {
      // ignore
    }
    return DEFAULT_FONT_SIZE_SCALE;
  });

  useEffect(() => {
    try {
      const option = getFontSizeOption(fontSizeScale);
      document.documentElement.style.fontSize = option.rootPx;
      document.documentElement.setAttribute('data-font-scale', fontSizeScale);
      localStorage.setItem('bouayad_font_size', fontSizeScale);
    } catch {
      // ignore
    }
  }, [fontSizeScale]);

  const handleIncreaseFontSize = () => {
    setFontSizeScale((current) => {
      const currentIndex = FONT_SIZE_OPTIONS.findIndex((o) => o.id === current);
      if (currentIndex < FONT_SIZE_OPTIONS.length - 1) {
        return FONT_SIZE_OPTIONS[currentIndex + 1].id;
      }
      return current;
    });
  };

  const handleDecreaseFontSize = () => {
    setFontSizeScale((current) => {
      const currentIndex = FONT_SIZE_OPTIONS.findIndex((o) => o.id === current);
      if (currentIndex > 0) {
        return FONT_SIZE_OPTIONS[currentIndex - 1].id;
      }
      return current;
    });
  };

  const handleCycleFontSize = () => {
    setFontSizeScale((current) => {
      const currentIndex = FONT_SIZE_OPTIONS.findIndex((o) => o.id === current);
      const nextIndex = (currentIndex + 1) % FONT_SIZE_OPTIONS.length;
      return FONT_SIZE_OPTIONS[nextIndex].id;
    });
  };

  const handleSelectFontSize = (scale: FontSizeScale) => {
    setFontSizeScale(scale);
  };

  // Theme State: Default to Light Mode (Daylight Authentic Parchment) as requested
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('bouayad_theme');
      // Only use dark mode if user explicitly saved 'dark' in past; otherwise strictly default to light
      return saved === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('bouayad_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('bouayad_theme', 'light');
      }
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // City Geolocation Detection (automatic on load + manual GPS re-trigger)
  const [isDetectingCity, setIsDetectingCity] = useState(false);
  const [cityNotification, setCityNotification] = useState<{ message: string; city: MoroccanCity } | null>(null);

  const detectUserCity = (isManual = false) => {
    if (!('geolocation' in navigator)) {
      if (isManual) {
        setCityNotification({
          message: 'خاصية تحديد الموقع الجغرافي غير مدعومة في هذا المتصفح',
          city: currentCity,
        });
        setTimeout(() => setCityNotification(null), 4500);
      }
      return;
    }

    setIsDetectingCity(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsDetectingCity(false);
        const { latitude, longitude } = position.coords;
        const matchedCity = findClosestMoroccanCity(latitude, longitude);
        setCurrentCity(matchedCity);
        try {
          localStorage.setItem('bouayad_city_id', matchedCity.id);
        } catch {
          // ignore
        }
        setCityNotification({
          message: `تم تحديد مدينتك تلقائياً: ${matchedCity.nameAr} (${matchedCity.nameFr})`,
          city: matchedCity,
        });
        setTimeout(() => setCityNotification(null), 5000);
      },
      (error) => {
        setIsDetectingCity(false);
        console.warn('Geolocation detection error/refused:', error.message);
        if (isManual) {
          setCityNotification({
            message: 'تعذر تحديد موقعك. يرجى السماح لإذن الموقع (GPS) في المتصفح.',
            city: currentCity,
          });
          setTimeout(() => setCityNotification(null), 4500);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 min cache
      }
    );
  };

  // Automatically detect user city on app launch
  useEffect(() => {
    detectUserCity(false);
  }, []);

  const [favorites, setFavorites] = useState<SavedLeafItem[]>(() => {
    try {
      const saved = localStorage.getItem('bouayad_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Live timer for next prayer updates
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 30000); // update every 30 seconds
    return () => clearInterval(timer);
  }, []);

  // Save city choice
  const handleSelectCity = (city: MoroccanCity) => {
    setCurrentCity(city);
    try {
      localStorage.setItem('bouayad_city_id', city.id);
    } catch {
      // ignore
    }
  };

  // Save Hijri offset
  const handleUpdateHijriOffset = (offset: number) => {
    setHijriOffset(offset);
    try {
      localStorage.setItem('bouayad_hijri_offset', offset.toString());
    } catch {
      // ignore
    }
  };

  // Navigate day by offset (-1, +1)
  const handleNavigateDay = (offset: number) => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + offset);
      return next;
    });
  };

  const handleGoToToday = () => {
    setCurrentDate(new Date());
    setActiveTab('leaf');
  };

  const handleSelectDate = (date: Date) => {
    setCurrentDate(date);
    setActiveTab('leaf');
  };

  // Compute live data for current date
  const calendarData = getQuadrupleCalendar(currentDate, hijriOffset);
  const prayerTimes = calculatePrayerTimes(currentCity, currentDate);
  const nextPrayer = getNextPrayer(prayerTimes, now);
  const dailyContent = getDailyBouayadContent(currentDate);

  const leafId = `bouayad-${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  const isCurrentLeafFavorite = favorites.some((f) => f.id === leafId);

  const handleToggleFavorite = () => {
    if (isCurrentLeafFavorite) {
      const updated = favorites.filter((f) => f.id !== leafId);
      setFavorites(updated);
      try {
        localStorage.setItem('bouayad_favorites', JSON.stringify(updated));
      } catch {
        // ignore
      }
    } else {
      const newItem: SavedLeafItem = {
        id: leafId,
        isoDate: currentDate.toISOString(),
        formattedFr: calendarData.gregorian.formattedFr,
        formattedAr: calendarData.gregorian.formattedAr,
        content: dailyContent,
      };
      const updated = [newItem, ...favorites];
      setFavorites(updated);
      try {
        localStorage.setItem('bouayad_favorites', JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  const handleRemoveFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    try {
      localStorage.setItem('bouayad_favorites', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSelectLibraryItem = (itemIndex: number) => {
    // Jump to a day corresponding to that item in the library
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + (itemIndex - ((targetDate.getDate() - 1) % BOUAYAD_CONTENT_LIBRARY.length)));
    setCurrentDate(targetDate);
    setActiveTab('leaf');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode
        ? 'bg-[#151311] text-stone-100 selection:bg-amber-900/60'
        : 'bg-[#f7f4ee] text-stone-900 selection:bg-amber-200'
    }`}>
      
      {/* Strict 1-row, 3-zone Header */}
      <Header
        currentCity={currentCity}
        onSelectCity={handleSelectCity}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onGoToToday={handleGoToToday}
        favoritesCount={favorites.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        fontSizeScale={fontSizeScale}
        onIncreaseFontSize={handleIncreaseFontSize}
        onDecreaseFontSize={handleDecreaseFontSize}
        onCycleFontSize={handleCycleFontSize}
        onSelectFontSize={handleSelectFontSize}
        onDetectCity={() => detectUserCity(true)}
        isDetectingCity={isDetectingCity}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'leaf' && (
          <BouayadLeaf
            calendarData={calendarData}
            prayerTimes={prayerTimes}
            nextPrayer={nextPrayer}
            dailyContent={dailyContent}
            currentCity={currentCity}
            currentDate={currentDate}
            onNavigateDay={handleNavigateDay}
            onSelectDate={handleSelectDate}
            isFavorite={isCurrentLeafFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activeTab === 'quadruple' && (
          <QuadrupleCalendarView
            currentDate={currentDate}
            onSelectDate={handleSelectDate}
            hijriOffset={hijriOffset}
            onUpdateHijriOffset={handleUpdateHijriOffset}
          />
        )}

        {activeTab === 'prayers' && (
          <PrayerTimesView
            currentCity={currentCity}
            onSelectCity={handleSelectCity}
            currentDate={currentDate}
            prayerTimes={prayerTimes}
          />
        )}

        {activeTab === 'manazil' && (
          <ManazilView currentDate={currentDate} />
        )}

        {activeTab === 'about' && (
          <AboutView onBackToLeaf={() => {
            setActiveTab('leaf');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        )}

        {activeTab === 'terms' && (
          <TermsView onBackToLeaf={() => {
            setActiveTab('leaf');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        )}

        {activeTab === 'legal' && (
          <LegalNoticeView onBackToLeaf={() => {
            setActiveTab('leaf');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        )}
      </main>

      {/* Cultural Heritage Footer with Page Links */}
      <footer className="mt-auto border-t border-stone-200 dark:border-[#2f2923] bg-[#f4efe6] dark:bg-[#1a1714] py-8 text-xs text-stone-600 dark:text-stone-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm block">
                L'Éphéméride Bouayad · اليومية العصرية لبوعياد
              </span>
              <span className="text-stone-500 dark:text-stone-400 font-amiri text-xs" dir="rtl">
                أشهر تقويم ورقي تقليدي في تاريخ المملكة المغربية الشريفة
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400 font-sans flex-wrap justify-center">
              <span>التقويم الرباعي</span>
              <span>·</span>
              <span>مواقيت الصلاة الرسمية (GMT+0)</span>
              <span>·</span>
              <span>الأمثال والطب الشعبي</span>
            </div>

            <div className="text-[11px] text-stone-400 dark:text-stone-500">
              Hommage au patrimoine culturel marocain
            </div>
          </div>

          {/* Navigation Links for Legal, Terms, and About */}
          <div className="pt-4 border-t border-stone-200/80 dark:border-[#2a241e] flex flex-wrap items-center justify-center sm:justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 flex-wrap justify-center font-medium">
              <button
                onClick={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`hover:text-[#8B1E1E] dark:hover:text-amber-400 transition-colors cursor-pointer ${
                  activeTab === 'about' ? 'text-[#8B1E1E] dark:text-amber-400 font-bold underline' : ''
                }`}
              >
                À propos de nous (من نحن)
              </button>
              <span className="text-stone-300 dark:text-stone-700">·</span>
              <button
                onClick={() => {
                  setActiveTab('terms');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`hover:text-[#8B1E1E] dark:hover:text-amber-400 transition-colors cursor-pointer ${
                  activeTab === 'terms' ? 'text-[#8B1E1E] dark:text-amber-400 font-bold underline' : ''
                }`}
              >
                Conditions générales (الشروط والأحكام)
              </button>
              <span className="text-stone-300 dark:text-stone-700">·</span>
              <button
                onClick={() => {
                  setActiveTab('legal');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`hover:text-[#8B1E1E] dark:hover:text-amber-400 transition-colors cursor-pointer ${
                  activeTab === 'legal' ? 'text-[#8B1E1E] dark:text-amber-400 font-bold underline' : ''
                }`}
              >
                Mentions légales (البيانات القانونية)
              </button>
            </div>

            <div className="text-[11px] text-stone-500 dark:text-stone-400">
              © {new Date().getFullYear()} L'Éphéméride Bouayad · جميع الحقوق محفوظة
            </div>
          </div>

        </div>
      </footer>

      {/* Modals */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        onSelectDate={handleSelectDate}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLibraryItem={handleSelectLibraryItem}
      />

      {/* Offline PWA Connectivity Indicator */}
      <OfflineIndicator />

      {/* Geolocation City Detection Toast */}
      {cityNotification && (
        <div
          dir="rtl"
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#8B1E1E] dark:bg-[#721515] text-amber-50 px-4 py-3 rounded-xl shadow-2xl border border-amber-400/40 font-amiri text-sm max-w-[92vw] sm:max-w-md transition-all animate-bounce-short"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-amber-300" />
          </div>
          <div className="flex-1 leading-snug">
            <span className="font-bold text-amber-200 block text-xs">تحديد الموقع الجغرافي</span>
            <span className="text-stone-100">{cityNotification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setCityNotification(null)}
            className="text-amber-200/80 hover:text-white p-1 rounded-md text-xs transition-colors cursor-pointer"
            aria-label="إغلاق التنبيه"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
}
