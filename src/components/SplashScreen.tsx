import React, { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      // Show splash once per browsing session to provide a polished native-app feel
      return sessionStorage.getItem('bouayad_splash_done') !== 'true';
    } catch {
      return true;
    }
  });
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Show splash briefly (800ms) then smoothly fade out
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 850);

    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem('bouayad_splash_done', 'true');
      } catch {
        // ignore
      }
      onFinish?.();
    }, 1250);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [isVisible, onFinish]);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => {
        setIsFading(true);
        setTimeout(() => {
          setIsVisible(false);
          try {
            sessionStorage.setItem('bouayad_splash_done', 'true');
          } catch {
            // ignore
          }
        }, 150);
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f7f4ee] dark:bg-[#151311] transition-opacity duration-400 cursor-pointer select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-label="Écran de démarrage L'Éphéméride Bouayad"
    >
      {/* Centered Splash Circle containing JUST the calendar icon */}
      <div className="relative flex items-center justify-center">
        {/* Subtle decorative pulse ring */}
        <div className="absolute inset-0 -m-3 rounded-full bg-amber-400/20 dark:bg-amber-400/10 blur-md animate-pulse" />

        {/* The Circle */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white dark:bg-[#221e1a] border-3 border-amber-500/40 dark:border-amber-400/30 shadow-2xl flex items-center justify-center transition-transform hover:scale-105">
          {/* Inside the circle: JUST the calendar icon */}
          <CalendarDays className="w-14 h-14 sm:w-16 sm:h-16 text-[#8B1E1E] dark:text-amber-400 drop-shadow-xs" />
        </div>
      </div>

      {/* App Wordmark Title underneath */}
      <div className="mt-5 text-center">
        <h1 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 tracking-wide">
          اليومية لبوعياد
        </h1>
        <p className="text-xs text-amber-800 dark:text-amber-400/90 font-amiri mt-0.5" dir="rtl">
          اليومية العصرية لبوعياد
        </p>
      </div>
    </div>
  );
};
