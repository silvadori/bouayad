/**
 * L'Éphéméride Bouayad - Notification System
 * Handles daily local push notifications for the Wisdom of the Day (حكمة اليوم).
 */

import { BouayadDailyContent, getDailyBouayadContent } from '../data/bouayadContent';

export type WisdomNotificationCategory = 'wisdom' | 'proverb' | 'both';

export interface NotificationSettings {
  enabled: boolean;
  time: string; // HH:mm in 24h format (e.g. "08:30")
  category: WisdomNotificationCategory;
  lastDeliveredDate: string | null; // "YYYY-MM-DD"
}

const STORAGE_KEY = 'bouayad_notification_settings';

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enabled: false,
  time: '08:30',
  category: 'both',
  lastDeliveredDate: null,
};

/**
 * Check if the browser supports the Notification API and Service Worker
 */
export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Get current notification permission state
 */
export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

/**
 * Request notification permission from user
 */
export async function requestNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (!isNotificationSupported()) return 'unsupported';
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.warn('Error requesting notification permission:', error);
    return Notification.permission;
  }
}

/**
 * Retrieve saved notification preferences from localStorage
 */
export function getStoredNotificationSettings(): NotificationSettings {
  if (typeof window === 'undefined') return DEFAULT_NOTIFICATION_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_NOTIFICATION_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      enabled: Boolean(parsed.enabled),
      time: typeof parsed.time === 'string' && /^\d{2}:\d{2}$/.test(parsed.time) ? parsed.time : '08:30',
      category: ['wisdom', 'proverb', 'both'].includes(parsed.category) ? parsed.category : 'both',
      lastDeliveredDate: parsed.lastDeliveredDate || null,
    };
  } catch {
    return DEFAULT_NOTIFICATION_SETTINGS;
  }
}

/**
 * Save notification preferences to localStorage
 */
export function saveStoredNotificationSettings(settings: NotificationSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save notification settings:', error);
  }
}

/**
 * Builds the notification title, body, and payload based on selected category
 */
export function formatWisdomNotificationPayload(
  content: BouayadDailyContent,
  category: WisdomNotificationCategory = 'both',
  isTest = false
) {
  let title = '📖 حكمة اليوم · اليومية العصرية لبوعياد';
  let body = '';

  if (category === 'wisdom') {
    title = isTest ? '🔔 تجربة الإشعار · حكمة اليوم' : '📖 حكمة اليوم · اليومية لبوعياد';
    body = `«${content.wisdom.textAr}»\n— ${content.wisdom.authorAr || 'حكمة مأثورة'}`;
  } else if (category === 'proverb') {
    title = isTest ? '🔔 تجربة الإشعار · مثل شعبي' : '🇲🇦 مثل اليوم · اليومية لبوعياد';
    const proverbText = content.proverb.textDarija || content.proverb.textAr;
    body = `«${proverbText}»\n💡 ${content.proverb.meaningAr}`;
  } else {
    // Both wisdom and proverb
    title = isTest ? '🔔 تجربة الإشعار · حكمة ومثل اليوم' : '📖 حكمة ومثل اليوم · اليومية لبوعياد';
    const proverbText = content.proverb.textDarija || content.proverb.textAr;
    body = `«${content.wisdom.textAr}» — ${content.wisdom.authorAr}\n💡 مثل مغربي: «${proverbText}»`;
  }

  const todayStr = new Date().toISOString().slice(0, 10);
  const tag = isTest ? `bouayad-test-${Date.now()}` : `bouayad-wisdom-${todayStr}`;

  return { title, body, tag };
}

/**
 * Triggers a local push notification immediately (using Service Worker when possible)
 */
export async function sendWisdomPushNotification(
  content: BouayadDailyContent,
  options?: { isTest?: boolean; category?: WisdomNotificationCategory }
): Promise<{ success: boolean; error?: string }> {
  if (!isNotificationSupported()) {
    return { success: false, error: 'الإشعارات غير مدعومة في هذا المتصفح' };
  }

  if (Notification.permission !== 'granted') {
    return { success: false, error: 'إذن الإشعارات غير مُفعّل. يرجى تفعيله في المتصفح.' };
  }

  const category = options?.category || 'both';
  const isTest = Boolean(options?.isTest);
  const payload = formatWisdomNotificationPayload(content, category, isTest);

  const notificationOptions: NotificationOptions & { [key: string]: any } = {
    body: payload.body,
    icon: '/pwa-192x192.png',
    badge: '/favicon.ico',
    tag: payload.tag,
    renotify: true,
    silent: false,
    dir: 'rtl',
    lang: 'ar',
    data: {
      url: '/',
      date: new Date().toISOString(),
    },
  };

  // 1. Try Service Worker showNotification (Best for background & PWA)
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      if (registration && registration.showNotification) {
        await registration.showNotification(payload.title, notificationOptions);
        return { success: true };
      }
    } catch (swError) {
      console.warn('ServiceWorker showNotification failed, attempting fallback:', swError);
    }
  }

  // 2. Fallback to standard window Notification
  try {
    const notification = new Notification(payload.title, notificationOptions);
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
    return { success: true };
  } catch (error: any) {
    console.error('Failed to display notification:', error);
    return { success: false, error: error?.message || 'فشل إرسال الإشعار' };
  }
}

/**
 * Check if the daily notification should fire at the current time and deliver it
 */
export async function checkAndTriggerScheduledWisdom(onDelivered?: () => void): Promise<boolean> {
  if (!isNotificationSupported()) return false;
  if (Notification.permission !== 'granted') return false;

  const settings = getStoredNotificationSettings();
  if (!settings.enabled) return false;

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  // Already delivered today?
  if (settings.lastDeliveredDate === todayStr) {
    return false;
  }

  // Check current time vs configured time
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const [configHoursStr, configMinutesStr] = settings.time.split(':');
  const configHours = parseInt(configHoursStr, 10);
  const configMinutes = parseInt(configMinutesStr, 10);

  const currentMinutesOfDay = currentHours * 60 + currentMinutes;
  const configMinutesOfDay = configHours * 60 + configMinutes;

  // If current time has reached or passed the scheduled time today:
  if (currentMinutesOfDay >= configMinutesOfDay) {
    const dailyContent = getDailyBouayadContent(now);
    const result = await sendWisdomPushNotification(dailyContent, {
      isTest: false,
      category: settings.category,
    });

    if (result.success) {
      settings.lastDeliveredDate = todayStr;
      saveStoredNotificationSettings(settings);
      onDelivered?.();
      return true;
    }
  }

  return false;
}
