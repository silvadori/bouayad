import { MoroccanCity } from '../data/moroccanCities';

export interface PrayerTimeData {
  fajr: string;
  sunrise: string;
  dohr: string;
  asr: string;
  maghrib: string;
  icha: string;
  fajrDate: Date;
  sunriseDate: Date;
  dohrDate: Date;
  asrDate: Date;
  maghribDate: Date;
  ichaDate: Date;
}

export interface NextPrayerInfo {
  nameFr: string;
  nameAr: string;
  time: string;
  remainingMinutes: number;
  remainingFormatted: string;
  progressPercent: number;
}

// Convert degrees to radians and back
const d2r = (deg: number) => (deg * Math.PI) / 180;
const r2d = (rad: number) => (rad * 180) / Math.PI;

function fixHour(h: number): number {
  let res = h - 24 * Math.floor(h / 24);
  return res < 0 ? res + 24 : res;
}

function formatTime(decimalHours: number): string {
  const fixed = fixHour(decimalHours);
  const hours = Math.floor(fixed);
  const minutes = Math.floor((fixed - hours) * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function timeToDate(baseDate: Date, decimalHours: number): Date {
  const fixed = fixHour(decimalHours);
  const hours = Math.floor(fixed);
  const minutes = Math.floor((fixed - hours) * 60);
  const seconds = Math.floor(((fixed - hours) * 60 - minutes) * 60);
  const d = new Date(baseDate);
  d.setHours(hours, minutes, seconds, 0);
  return d;
}

// Sun coordinates algorithm based on NOAA / Astronomical Algorithms
function getSunCoordinates(date: Date) {
  const d =
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000 -
    10957.5;
  const L = (280.46 + 0.9856474 * d) % 360;
  const g = (357.528 + 0.9856003 * d) % 360;
  const lambda = (L + 1.915 * Math.sin(d2r(g)) + 0.02 * Math.sin(d2r(2 * g))) % 360;
  const ep = 23.439 - 0.0000004 * d;
  
  const alpha =
    r2d(
      Math.atan2(
        Math.cos(d2r(ep)) * Math.sin(d2r(lambda)),
        Math.cos(d2r(lambda))
      )
    ) / 15;
  const delta = r2d(Math.asin(Math.sin(d2r(ep)) * Math.sin(d2r(lambda))));
  
  // Equation of time (in hours)
  const eot = (L / 15 - (alpha < 0 ? alpha + 24 : alpha));
  return { declination: delta, equationOfTime: eot };
}

/**
 * Calculates prayer times for a given Moroccan city and date.
 * Uses Moroccan Ministry standard angles: Fajr 19.0°, Isha 17.0°, Maliki Asr factor 1.
 * Standard Moroccan timezone set to GMT+0 (UTC+0).
 */
export function calculatePrayerTimes(city: MoroccanCity, date: Date, timezoneOffset: number = 0): PrayerTimeData {
  const { declination: dec, equationOfTime: eot } = getSunCoordinates(date);
  
  // Midday (solar noon)
  const noon = fixHour(12 + timezoneOffset - city.lng / 15 - eot);

  // Fajr: angle = -19°
  const fajrAngle = -19;
  const cosFajrHA =
    (Math.sin(d2r(fajrAngle)) - Math.sin(d2r(city.lat)) * Math.sin(d2r(dec))) /
    (Math.cos(d2r(city.lat)) * Math.cos(d2r(dec)));
  const fajrHA = (cosFajrHA >= -1 && cosFajrHA <= 1) ? r2d(Math.acos(cosFajrHA)) / 15 : 6;
  const fajrDec = noon - fajrHA;

  // Sunrise: zenith = 90.833°
  const sunriseZenith = 90.833;
  const cosSunriseHA =
    (Math.cos(d2r(sunriseZenith)) - Math.sin(d2r(city.lat)) * Math.sin(d2r(dec))) /
    (Math.cos(d2r(city.lat)) * Math.cos(d2r(dec)));
  const sunriseHA = (cosSunriseHA >= -1 && cosSunriseHA <= 1) ? r2d(Math.acos(cosSunriseHA)) / 15 : 6;
  const sunriseDec = noon - sunriseHA;

  // Dohr: solar noon + safety cushion of 5 minutes (standard Moroccan ministry practice)
  const dohrDec = noon + (5 / 60);

  // Asr: Maliki/Shafii standard: shadow = 1 + shadow at noon
  const noonZenith = Math.abs(city.lat - dec);
  const asrAngle = r2d(Math.atan(1 + Math.tan(d2r(noonZenith))));
  const cosAsrHA =
    (Math.sin(d2r(90 - asrAngle)) - Math.sin(d2r(city.lat)) * Math.sin(d2r(dec))) /
    (Math.cos(d2r(city.lat)) * Math.cos(d2r(dec)));
  const asrHA = (cosAsrHA >= -1 && cosAsrHA <= 1) ? r2d(Math.acos(cosAsrHA)) / 15 : 3;
  const asrDec = noon + asrHA;

  // Maghrib: sunset (zenith 90.833) + 4 minutes safety cushion
  const maghribDec = noon + sunriseHA + (4 / 60);

  // Isha: angle = -17°
  const ishaAngle = -17;
  const cosIshaHA =
    (Math.sin(d2r(ishaAngle)) - Math.sin(d2r(city.lat)) * Math.sin(d2r(dec))) /
    (Math.cos(d2r(city.lat)) * Math.cos(d2r(dec)));
  const ishaHA = (cosIshaHA >= -1 && cosIshaHA <= 1) ? r2d(Math.acos(cosIshaHA)) / 15 : 7.5;
  const ishaDec = noon + ishaHA;

  return {
    fajr: formatTime(fajrDec),
    sunrise: formatTime(sunriseDec),
    dohr: formatTime(dohrDec),
    asr: formatTime(asrDec),
    maghrib: formatTime(maghribDec),
    icha: formatTime(ishaDec),
    fajrDate: timeToDate(date, fajrDec),
    sunriseDate: timeToDate(date, sunriseDec),
    dohrDate: timeToDate(date, dohrDec),
    asrDate: timeToDate(date, asrDec),
    maghribDate: timeToDate(date, maghribDec),
    ichaDate: timeToDate(date, ishaDec),
  };
}

/**
 * Determines the next prayer from current time and returns remaining minutes
 */
export function getNextPrayer(prayers: PrayerTimeData, now: Date = new Date()): NextPrayerInfo {
  const prayerList = [
    { nameFr: 'Fajr (Aube)', nameAr: 'الفجر', date: prayers.fajrDate, time: prayers.fajr },
    { nameFr: 'Chourouk (Lever)', nameAr: 'الشروق', date: prayers.sunriseDate, time: prayers.sunrise },
    { nameFr: 'Dohr (Midi)', nameAr: 'الظهر', date: prayers.dohrDate, time: prayers.dohr },
    { nameFr: 'Asr (Après-midi)', nameAr: 'العصر', date: prayers.asrDate, time: prayers.asr },
    { nameFr: 'Maghrib (Coucher)', nameAr: 'المغرب', date: prayers.maghribDate, time: prayers.maghrib },
    { nameFr: 'Icha (Nuit)', nameAr: 'العشاء', date: prayers.ichaDate, time: prayers.icha },
  ];

  const nowMs = now.getTime();

  for (let i = 0; i < prayerList.length; i++) {
    const item = prayerList[i];
    if (item.date.getTime() > nowMs) {
      const diffMs = item.date.getTime() - nowMs;
      const totalMinutes = Math.floor(diffMs / 60000);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      
      const prevPrayerDate = i > 0 ? prayerList[i - 1].date : new Date(prayers.fajrDate.getTime() - 8 * 3600000);
      const totalInterval = item.date.getTime() - prevPrayerDate.getTime();
      const elapsed = nowMs - prevPrayerDate.getTime();
      const progressPercent = Math.min(100, Math.max(0, Math.round((elapsed / totalInterval) * 100)));

      return {
        nameFr: item.nameFr,
        nameAr: item.nameAr,
        time: item.time,
        remainingMinutes: totalMinutes,
        remainingFormatted: hours > 0 ? `${hours}h ${minutes}m` : `${minutes} min`,
        progressPercent,
      };
    }
  }

  // After Isha, next is tomorrow's Fajr
  const tomorrowFajrDate = new Date(prayers.fajrDate.getTime() + 24 * 3600000);
  const diffMs = tomorrowFajrDate.getTime() - nowMs;
  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    nameFr: 'Fajr (Aube)',
    nameAr: 'الفجر',
    time: prayers.fajr,
    remainingMinutes: totalMinutes,
    remainingFormatted: hours > 0 ? `${hours}h ${minutes}m` : `${minutes} min`,
    progressPercent: 15,
  };
}
