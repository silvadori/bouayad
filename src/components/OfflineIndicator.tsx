/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 flex items-center gap-3 rounded-xl bg-[#2a1714] text-amber-100 border border-amber-600/50 p-3 shadow-2xl backdrop-blur-md animate-fadeIn"
      dir="rtl"
    >
      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
        <WifiOff className="w-4 h-4 animate-pulse text-amber-400" />
      </div>
      <div className="flex-1 text-right">
        <p className="text-xs font-bold font-amiri text-amber-200">
          أنت تتصفح دون اتصال بالإنترنت (Offline)
        </p>
        <p className="text-[11px] font-sans text-stone-300 mt-0.5">
          التقويم الرباعي ومواقيت الصلاة والأمثال تعمل بكفاءة تامة من الذاكرة المحلية.
        </p>
      </div>
    </div>
  );
};
