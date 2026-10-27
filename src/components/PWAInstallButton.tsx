/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, Smartphone, X, Share2, PlusSquare } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'header' | 'drawer' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'header',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // Suppress completely if running in standalone mode (already installed as PWA)
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    if (variant === 'drawer') {
      return (
        <button
          onClick={install}
          className={`w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#8B1E1E] to-[#6a1515] text-amber-100 hover:from-[#9d2424] hover:to-[#781919] font-bold text-sm shadow-md transition-all cursor-pointer font-amiri ${className}`}
          dir="rtl"
        >
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4 text-amber-300" />
            <span>تثبيت اليومية كتطبيق (PWA)</span>
          </span>
          <span className="text-[10px] bg-amber-400 text-stone-950 font-sans px-2 py-0.5 rounded-full font-bold">
            مجاني
          </span>
        </button>
      );
    }

    return (
      <button
        onClick={install}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-[#8B1E1E] dark:text-amber-300 border border-amber-600/30 dark:border-amber-500/40 text-xs font-bold font-amiri shadow-2xs transition-colors cursor-pointer ${className}`}
        title="تثبيت اليومية كتطبيق على جهازك (PWA)"
        aria-label="Installer l'application"
        dir="rtl"
      >
        <Download className="w-3.5 h-3.5 text-[#8B1E1E] dark:text-amber-400 shrink-0" />
        <span className="whitespace-nowrap">تثبيت التطبيق</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        {variant === 'drawer' ? (
          <button
            onClick={() => setShowIOSGuide(true)}
            className={`w-full flex items-center justify-between p-3 rounded-xl bg-stone-100 dark:bg-[#24201c] hover:bg-stone-200 dark:hover:bg-[#2e2821] text-stone-800 dark:text-stone-200 font-bold text-sm transition-colors cursor-pointer font-amiri ${className}`}
            dir="rtl"
          >
            <span className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-stone-600 dark:text-stone-400" />
              <span>تثبيت على الآيفون (iOS)</span>
            </span>
            <span className="text-xs text-stone-500 font-sans">Safari</span>
          </button>
        ) : (
          <button
            onClick={() => setShowIOSGuide(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-100 dark:bg-[#24201c] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#2d2822] border border-stone-200 dark:border-[#383129] text-xs font-bold font-amiri transition-colors cursor-pointer ${className}`}
            title="طريقة تثبيت اليومية على أجهزة iPhone / iPad"
            dir="rtl"
          >
            <Smartphone className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400 shrink-0" />
            <span className="whitespace-nowrap">تثبيت (iOS)</span>
          </button>
        )}

        {/* Guided iOS Installation Modal */}
        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-xs p-4 animate-fadeIn"
            onClick={() => setShowIOSGuide(false)}
          >
            <div
              className="w-full max-w-sm rounded-2xl bg-[#fdfbf7] dark:bg-[#1c1916] border border-stone-300 dark:border-[#383129] p-5 shadow-2xl text-stone-900 dark:text-stone-100 font-amiri"
              dir="rtl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-[#332c24] pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#8B1E1E] text-amber-200 flex items-center justify-center font-bold">
                    📱
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                      التثبيت على iPhone و iPad
                    </h3>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 font-sans block">
                      متصفح Safari الأصلي
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-[#29231c]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-100 dark:bg-[#25201b]">
                  <span className="w-5 h-5 rounded-full bg-[#8B1E1E] text-white flex items-center justify-center font-bold text-[11px] shrink-0 font-sans">
                    1
                  </span>
                  <div>
                    <span>اضغط على أيقونة المشاركة </span>
                    <Share2 className="inline w-3.5 h-3.5 mx-1 text-blue-600 dark:text-blue-400" />
                    <span className="font-bold">(Partager)</span>
                    <span> في شريط أدوات Safari السفلي.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-100 dark:bg-[#25201b]">
                  <span className="w-5 h-5 rounded-full bg-[#8B1E1E] text-white flex items-center justify-center font-bold text-[11px] shrink-0 font-sans">
                    2
                  </span>
                  <div>
                    <span>مرّر للأسفل واختر </span>
                    <PlusSquare className="inline w-3.5 h-3.5 mx-1 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-bold font-sans">"Sur l'écran d'accueil"</span>
                    <span> (إضافة إلى الصفحة الرئيسية).</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-100 dark:bg-[#25201b]">
                  <span className="w-5 h-5 rounded-full bg-[#8B1E1E] text-white flex items-center justify-center font-bold text-[11px] shrink-0 font-sans">
                    3
                  </span>
                  <div>
                    <span>اضغط على </span>
                    <span className="font-bold font-sans">"Ajouter"</span>
                    <span> في الزاوية العلوية لفتح اليومية كأي تطبيق مثبت.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full py-2 bg-[#8B1E1E] hover:bg-[#721818] text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                فهمت، شكراً
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
