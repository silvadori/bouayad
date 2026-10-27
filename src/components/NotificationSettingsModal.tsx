/**
 * L'Éphéméride Bouayad - Notification Settings Modal
 * Allows user to enable/disable daily wisdom notifications, customize delivery time,
 * select content category, preview, and test the notification.
 */

import React, { useState, useEffect } from 'react';
import {
  Bell,
  X,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
  BookOpen,
  Info,
} from 'lucide-react';
import {
  NotificationSettings,
  WisdomNotificationCategory,
  getNotificationPermission,
  requestNotificationPermission,
  getStoredNotificationSettings,
  saveStoredNotificationSettings,
  sendWisdomPushNotification,
  formatWisdomNotificationPayload,
  isNotificationSupported,
} from '../utils/notifications';
import { getDailyBouayadContent } from '../data/bouayadContent';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChanged?: (settings: NotificationSettings) => void;
}

const PRESET_TIMES = [
  { time: '07:00', labelAr: '07:00 (الفجر والصباح)', labelFr: '07h00 - Matin' },
  { time: '08:30', labelAr: '08:30 (الموصى به)', labelFr: '08h30 - Recommandé' },
  { time: '12:30', labelAr: '12:30 (وقت الظهيرة)', labelFr: '12h30 - Midi' },
  { time: '20:00', labelAr: '20:00 (المساء والهدوء)', labelFr: '20h00 - Soirée' },
];

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  onSettingsChanged,
}) => {
  const [settings, setSettings] = useState<NotificationSettings>(() => getStoredNotificationSettings());
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [isTesting, setIsTesting] = useState(false);
  const [testSuccessMessage, setTestSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync settings and permission state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setSettings(getStoredNotificationSettings());
      setPermission(getNotificationPermission());
      setTestSuccessMessage(null);
      setErrorMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const supported = isNotificationSupported();
  const todayContent = getDailyBouayadContent(new Date());
  const previewPayload = formatWisdomNotificationPayload(todayContent, settings.category, false);

  const handleToggleEnable = async () => {
    if (!settings.enabled) {
      // User is enabling: request browser permission if needed
      if (supported && permission !== 'granted') {
        const result = await requestNotificationPermission();
        setPermission(result);
        if (result !== 'granted') {
          setErrorMessage('يرجى السماح بإذن الإشعارات في المتصفح لتفعيل التذكير اليومي.');
          return;
        }
      }
    }

    const updated: NotificationSettings = {
      ...settings,
      enabled: !settings.enabled,
    };
    setSettings(updated);
    saveStoredNotificationSettings(updated);
    onSettingsChanged?.(updated);
    setErrorMessage(null);
  };

  const handleTimeChange = (newTime: string) => {
    const updated: NotificationSettings = {
      ...settings,
      time: newTime,
    };
    setSettings(updated);
    saveStoredNotificationSettings(updated);
    onSettingsChanged?.(updated);
  };

  const handleCategoryChange = (category: WisdomNotificationCategory) => {
    const updated: NotificationSettings = {
      ...settings,
      category,
    };
    setSettings(updated);
    saveStoredNotificationSettings(updated);
    onSettingsChanged?.(updated);
  };

  const handleTestNotification = async () => {
    setErrorMessage(null);
    setTestSuccessMessage(null);

    if (!supported) {
      setErrorMessage('خاصية الإشعارات غير مدعومة في هذا المتصفح.');
      return;
    }

    if (permission !== 'granted') {
      const result = await requestNotificationPermission();
      setPermission(result);
      if (result !== 'granted') {
        setErrorMessage('لم يتم منح الإذن. يرجى تفعيل الإشعارات في إعدادات المتصفح.');
        return;
      }
    }

    setIsTesting(true);
    try {
      const res = await sendWisdomPushNotification(todayContent, {
        isTest: true,
        category: settings.category,
      });

      if (res.success) {
        setTestSuccessMessage('تم إرسال الإشعار التجريبي بنجاح! تفقّد شريط إشعارات جهازك الآن 🔔');
        setTimeout(() => setTestSuccessMessage(null), 6000);
      } else {
        setErrorMessage(res.error || 'تعذر إرسال الإشعار.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'حدث خطأ أثناء إرسال الإشعار.');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-[#fdfbf7] dark:bg-[#1c1916] border border-stone-300 dark:border-[#383129] shadow-2xl p-5 sm:p-6 text-stone-900 dark:text-stone-100 font-amiri my-auto animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-notification-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-[#332c24] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B1E1E] dark:bg-[#701515] text-amber-300 flex items-center justify-center shadow-xs shrink-0">
              <Bell className="w-5 h-5 animate-wiggle" />
            </div>
            <div>
              <h2 id="modal-notification-title" className="font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 leading-tight">
                إشعارات حكمة اليوم
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-sans mt-0.5">
                Rappels quotidiens de la sagesse et du proverbe Bouayad
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-[#2b251f] transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Permission Status Banner */}
        {permission === 'denied' && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-600/30 text-amber-900 dark:text-amber-300 flex items-start gap-2.5 text-xs">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold block">الإشعارات محظورة في هذا المتصفح</span>
              <span>
                لتفعيلها، انقر على أيقونة القفل أو الإعدادات بجوار شريط العنوان في متصفحك، واختر السماح بالإشعارات (Notifications: Allow).
              </span>
            </div>
          </div>
        )}

        {permission === 'granted' && settings.enabled && (
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-600/30 text-emerald-900 dark:text-emerald-300 flex items-center gap-2 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              الإشعار مُفعّل ومجدول يومياً في تمام الساعة <strong>{settings.time}</strong>.
            </span>
          </div>
        )}

        {/* Error / Success Toast messages inside modal */}
        {errorMessage && (
          <div className="mb-4 p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-800 dark:text-red-300 text-xs">
            ⚠️ {errorMessage}
          </div>
        )}

        {testSuccessMessage && (
          <div className="mb-4 p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-900 dark:text-emerald-200 text-xs font-semibold animate-fade-in">
            {testSuccessMessage}
          </div>
        )}

        <div className="space-y-4 text-sm">
          {/* Main Activation Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-100 dark:bg-[#25201b] border border-stone-200/80 dark:border-[#383129] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#1a1714] border border-stone-200 dark:border-[#332b23] flex items-center justify-center text-stone-700 dark:text-stone-300">
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 block text-sm">
                  تفعيل الإشعار اليومي
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-sans">
                  إرسال حكمة اليوم تلقائياً إلى جهازك
                </span>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={settings.enabled}
              onClick={handleToggleEnable}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                settings.enabled ? 'bg-[#8B1E1E]' : 'bg-stone-300 dark:bg-stone-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  settings.enabled ? '-translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Configurable Time Section */}
          <div className={`p-4 rounded-xl bg-stone-100 dark:bg-[#25201b] border border-stone-200/80 dark:border-[#383129] space-y-3 transition-opacity ${
            !settings.enabled ? 'opacity-60' : 'opacity-100'
          }`}>
            <div className="flex items-center justify-between">
              <label htmlFor="wisdom-time-input" className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8B1E1E] dark:text-amber-400" />
                <span>وقت إرسال الإشعار اليومي</span>
              </label>
              
              {/* Custom Time Input */}
              <div className="flex items-center gap-1.5">
                <input
                  id="wisdom-time-input"
                  type="time"
                  value={settings.time}
                  disabled={!settings.enabled}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="px-2.5 py-1 text-sm font-mono font-bold bg-white dark:bg-[#1a1714] text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-[#3d362e] rounded-lg shadow-2xs focus:ring-1 focus:ring-[#8B1E1E] dark:focus:ring-amber-400 disabled:opacity-50 cursor-pointer"
                />
              </div>
            </div>

            {/* Preset Time Buttons */}
            <div>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block mb-1.5">
                أوقات موصى بها:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-sans">
                {PRESET_TIMES.map((preset) => (
                  <button
                    key={preset.time}
                    type="button"
                    disabled={!settings.enabled}
                    onClick={() => handleTimeChange(preset.time)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                      settings.time === preset.time
                        ? 'bg-[#8B1E1E] text-white shadow-xs'
                        : 'bg-white dark:bg-[#1c1916] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#2d2720] border border-stone-200 dark:border-[#383129]'
                    } disabled:cursor-not-allowed`}
                  >
                    <span>{preset.time}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Choice */}
          <div className={`p-4 rounded-xl bg-stone-100 dark:bg-[#25201b] border border-stone-200/80 dark:border-[#383129] space-y-2 transition-opacity ${
            !settings.enabled ? 'opacity-60' : 'opacity-100'
          }`}>
            <label className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#8B1E1E] dark:text-amber-400" />
              <span>محتوى الإشعار اليومي</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                disabled={!settings.enabled}
                onClick={() => handleCategoryChange('both')}
                className={`p-2.5 rounded-lg text-right font-bold transition-all cursor-pointer ${
                  settings.category === 'both'
                    ? 'bg-[#8B1E1E] text-white shadow-xs'
                    : 'bg-white dark:bg-[#1c1916] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#2e2821] border border-stone-200 dark:border-[#383129]'
                } disabled:cursor-not-allowed`}
              >
                <span className="block font-bold">حكمة ومثل مغربي</span>
                <span className={`text-[10px] block opacity-80 font-normal font-sans`}>
                  (الموصى به)
                </span>
              </button>

              <button
                type="button"
                disabled={!settings.enabled}
                onClick={() => handleCategoryChange('wisdom')}
                className={`p-2.5 rounded-lg text-right font-bold transition-all cursor-pointer ${
                  settings.category === 'wisdom'
                    ? 'bg-[#8B1E1E] text-white shadow-xs'
                    : 'bg-white dark:bg-[#1c1916] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#2e2821] border border-stone-200 dark:border-[#383129]'
                } disabled:cursor-not-allowed`}
              >
                <span className="block font-bold">حكمة اليوم فقط</span>
                <span className="text-[10px] block opacity-80 font-normal font-sans">
                  أقوال وحكم مأثورة
                </span>
              </button>

              <button
                type="button"
                disabled={!settings.enabled}
                onClick={() => handleCategoryChange('proverb')}
                className={`p-2.5 rounded-lg text-right font-bold transition-all cursor-pointer ${
                  settings.category === 'proverb'
                    ? 'bg-[#8B1E1E] text-white shadow-xs'
                    : 'bg-white dark:bg-[#1c1916] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#2e2821] border border-stone-200 dark:border-[#383129]'
                } disabled:cursor-not-allowed`}
              >
                <span className="block font-bold">مثل مغربي فقط</span>
                <span className="text-[10px] block opacity-80 font-normal font-sans">
                  أمثال شعبية دارجة
                </span>
              </button>
            </div>
          </div>

          {/* Live Notification Preview Box */}
          <div className="p-3.5 rounded-xl bg-stone-200/60 dark:bg-[#161311] border border-stone-300/80 dark:border-[#2f271f]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-stone-600 dark:text-stone-400 flex items-center gap-1.5">
                <span>معاينة الإشعار على شاشة هاتفك</span>
                <span className="text-[10px] text-stone-400 font-sans">(Aperçu du push)</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-stone-500">
                اليومية لبوعياد · {settings.time}
              </span>
            </div>

            {/* Notification Card UI */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#24201c] border border-stone-200 dark:border-[#383129] shadow-md flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8B1E1E] text-amber-200 flex items-center justify-center shrink-0 shadow-2xs">
                <Bell className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                    {previewPayload.title}
                  </span>
                  <span className="text-[10px] text-stone-400 font-sans shrink-0">الآن</span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 whitespace-pre-line leading-relaxed line-clamp-3">
                  {previewPayload.body}
                </p>
              </div>
            </div>
          </div>

          {/* Test Notification Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
            <button
              type="button"
              onClick={handleTestNotification}
              disabled={isTesting}
              className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8B1E1E] to-[#6d1616] hover:from-[#9c2222] hover:to-[#7d1919] text-amber-100 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className={`w-4 h-4 text-amber-300 ${isTesting ? 'animate-bounce' : ''}`} />
              <span>{isTesting ? 'جاري إرسال الإشعار...' : 'إرسال إشعار تجريبي الآن (Test)'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-stone-200 dark:bg-[#28221c] text-stone-800 dark:text-stone-200 font-bold text-xs hover:bg-stone-300 dark:hover:bg-[#332b23] transition-colors cursor-pointer"
            >
              تم الحفظ والإغلاق
            </button>
          </div>

          {/* Footer Note */}
          <div className="flex items-start gap-2 pt-2 text-[11px] text-stone-500 dark:text-stone-400 leading-normal" dir="rtl">
            <Info className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
            <span>
              نصيحة: لضمان وصول الإشعارات حتى عندما يكون التطبيق مغلقاً، يُنصح بتثبيت اليومية كتطبيق (PWA) عبر خيار "تثبيت التطبيق" في القائمة الرئيسية.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
