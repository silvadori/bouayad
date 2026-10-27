export interface MoroccanCity {
  id: string;
  nameFr: string;
  nameAr: string;
  lat: number;
  lng: number;
  qibla: number; // degrees from North clockwise
  regionFr: string;
  regionAr: string;
}

export const MOROCCAN_CITIES: MoroccanCity[] = [
  {
    id: 'casablanca',
    nameFr: 'Casablanca',
    nameAr: 'الدار البيضاء',
    lat: 33.5731,
    lng: -7.5898,
    qibla: 98,
    regionFr: 'Casablanca-Settat',
    regionAr: 'الدار البيضاء - سطات',
  },
  {
    id: 'rabat',
    nameFr: 'Rabat',
    nameAr: 'الرباط',
    lat: 34.0209,
    lng: -6.8416,
    qibla: 98,
    regionFr: 'Rabat-Salé-Kénitra',
    regionAr: 'الرباط - سلا - القنيطرة',
  },
  {
    id: 'fes',
    nameFr: 'Fès',
    nameAr: 'فاس',
    lat: 34.0331,
    lng: -5.0003,
    qibla: 99,
    regionFr: 'Fès-Meknès',
    regionAr: 'فاس - مكناس',
  },
  {
    id: 'marrakech',
    nameFr: 'Marrakech',
    nameAr: 'مراكش',
    lat: 31.6295,
    lng: -7.9811,
    qibla: 96,
    regionFr: 'Marrakech-Safi',
    regionAr: 'مراكش - آسفي',
  },
  {
    id: 'tanger',
    nameFr: 'Tanger',
    nameAr: 'طنجة',
    lat: 35.7595,
    lng: -5.8340,
    qibla: 100,
    regionFr: 'Tanger-Tétouan-Al Hoceïma',
    regionAr: 'طنجة - تطوان - الحسيمة',
  },
  {
    id: 'agadir',
    nameFr: 'Agadir',
    nameAr: 'أكادير',
    lat: 30.4278,
    lng: -9.5981,
    qibla: 94,
    regionFr: 'Souss-Massa',
    regionAr: 'سوس - ماسة',
  },
  {
    id: 'oujda',
    nameFr: 'Oujda',
    nameAr: 'وجدة',
    lat: 34.6867,
    lng: -1.9114,
    qibla: 101,
    regionFr: 'Oriental',
    regionAr: 'الشرق',
  },
  {
    id: 'meknes',
    nameFr: 'Meknès',
    nameAr: 'مكناس',
    lat: 33.8938,
    lng: -5.5516,
    qibla: 99,
    regionFr: 'Fès-Meknès',
    regionAr: 'فاس - مكناس',
  },
  {
    id: 'tetouan',
    nameFr: 'Tétouan',
    nameAr: 'تطوان',
    lat: 35.5889,
    lng: -5.3626,
    qibla: 100,
    regionFr: 'Tanger-Tétouan-Al Hoceïma',
    regionAr: 'طنجة - تطوان - الحسيمة',
  },
  {
    id: 'laayoune',
    nameFr: 'Laâyoune',
    nameAr: 'العيون',
    lat: 27.1536,
    lng: -13.2033,
    qibla: 89,
    regionFr: 'Laâyoune-Sakia El Hamra',
    regionAr: 'العيون - الساقية الحمراء',
  },
  {
    id: 'safi',
    nameFr: 'Safi',
    nameAr: 'آسفي',
    lat: 32.2994,
    lng: -9.2372,
    qibla: 96,
    regionFr: 'Marrakech-Safi',
    regionAr: 'مراكش - آسفي',
  },
  {
    id: 'el-jadida',
    nameFr: 'El Jadida',
    nameAr: 'الجديدة',
    lat: 33.2562,
    lng: -8.5060,
    qibla: 97,
    regionFr: 'Casablanca-Settat',
    regionAr: 'الدار البيضاء - سطات',
  },
  {
    id: 'nador',
    nameFr: 'Nador',
    nameAr: 'الناظور',
    lat: 35.1688,
    lng: -2.9335,
    qibla: 101,
    regionFr: 'Oriental',
    regionAr: 'الشرق',
  },
  {
    id: 'kenitra',
    nameFr: 'Kénitra',
    nameAr: 'القنيطرة',
    lat: 34.2610,
    lng: -6.5802,
    qibla: 98,
    regionFr: 'Rabat-Salé-Kénitra',
    regionAr: 'الرباط - سلا - القنيطرة',
  },
  {
    id: 'beni-mellal',
    nameFr: 'Béni Mellal',
    nameAr: 'بني ملال',
    lat: 32.3394,
    lng: -6.3608,
    qibla: 97,
    regionFr: 'Béni Mellal-Khénifra',
    regionAr: 'بني ملال - خنيفرة',
  },
  {
    id: 'dakhla',
    nameFr: 'Dakhla',
    nameAr: 'الداخلة',
    lat: 23.6848,
    lng: -15.9570,
    qibla: 84,
    regionFr: 'Dakhla-Oued Ed-Dahab',
    regionAr: 'الداخلة - وادي الذهب',
  },
  {
    id: 'essaouira',
    nameFr: 'Essaouira',
    nameAr: 'الصويرة',
    lat: 31.5085,
    lng: -9.7595,
    qibla: 95,
    regionFr: 'Marrakech-Safi',
    regionAr: 'مراكش - آسفي',
  },
  {
    id: 'ouarzazate',
    nameFr: 'Ouarzazate',
    nameAr: 'ورزازات',
    lat: 30.9189,
    lng: -6.8934,
    qibla: 96,
    regionFr: 'Drâa-Tafilalet',
    regionAr: 'درعة - تافيلالت',
  },
  {
    id: 'taza',
    nameFr: 'Taza',
    nameAr: 'تازة',
    lat: 34.2138,
    lng: -4.0103,
    qibla: 100,
    regionFr: 'Fès-Meknès',
    regionAr: 'فاس - مكناس',
  },
  {
    id: 'al-hoceima',
    nameFr: 'Al Hoceïma',
    nameAr: 'الحسيمة',
    lat: 35.2472,
    lng: -3.9322,
    qibla: 101,
    regionFr: 'Tanger-Tétouan-Al Hoceïma',
    regionAr: 'طنجة - تطوان - الحسيمة',
  },
  {
    id: 'taroudant',
    nameFr: 'Taroudant',
    nameAr: 'تارودانت',
    lat: 30.4703,
    lng: -8.8770,
    qibla: 95,
    regionFr: 'Souss-Massa',
    regionAr: 'سوس - ماسة',
  },
  {
    id: 'errachidia',
    nameFr: 'Errachidia',
    nameAr: 'الرشيدية',
    lat: 31.9315,
    lng: -4.4244,
    qibla: 98,
    regionFr: 'Drâa-Tafilalet',
    regionAr: 'درعة - تافيلالت',
  },
  {
    id: 'chefchaouen',
    nameFr: 'Chefchaouen',
    nameAr: 'شفشاون',
    lat: 35.1688,
    lng: -5.2636,
    qibla: 100,
    regionFr: 'Tanger-Tétouan-Al Hoceïma',
    regionAr: 'طنجة - تطوان - الحسيمة',
  },
  {
    id: 'guelmim',
    nameFr: 'Guelmim',
    nameAr: 'كلميم',
    lat: 28.9870,
    lng: -10.0574,
    qibla: 92,
    regionFr: 'Guelmim-Oued Noun',
    regionAr: 'كلميم - واد نون',
  },
];

export const DEFAULT_CITY = MOROCCAN_CITIES[0]; // Casablanca

/**
 * Finds the closest Moroccan city in the list from latitude and longitude coordinates
 * using the Haversine great-circle distance formula.
 */
export function findClosestMoroccanCity(latitude: number, longitude: number): MoroccanCity {
  let closest = MOROCCAN_CITIES[0];
  let minDistance = Infinity;

  const toRad = (value: number) => (value * Math.PI) / 180;

  for (const city of MOROCCAN_CITIES) {
    const dLat = toRad(city.lat - latitude);
    const dLng = toRad(city.lng - longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(latitude)) * Math.cos(toRad(city.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371 * c; // Earth radius in kilometers

    if (distance < minDistance) {
      minDistance = distance;
      closest = city;
    }
  }

  return closest;
}

