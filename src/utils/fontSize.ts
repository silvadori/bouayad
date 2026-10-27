/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FontSizeScale = 'compact' | 'normal' | 'large' | 'xlarge';

export interface FontSizeOption {
  id: FontSizeScale;
  labelAr: string;
  labelFr: string;
  percentage: number;
  rootPx: string;
  badge: string;
  descriptionAr: string;
}

export const FONT_SIZE_OPTIONS: FontSizeOption[] = [
  {
    id: 'compact',
    labelAr: 'أصغر',
    labelFr: 'Compact',
    percentage: 90,
    rootPx: '14.5px',
    badge: 'A⁻',
    descriptionAr: 'عرض مدمج لشاشات أصغر',
  },
  {
    id: 'normal',
    labelAr: 'عادي',
    labelFr: 'Normal',
    percentage: 100,
    rootPx: '16px',
    badge: 'A',
    descriptionAr: 'الحجم الأصلي المتوازن',
  },
  {
    id: 'large',
    labelAr: 'كبير',
    labelFr: 'Grand',
    percentage: 115,
    rootPx: '18.4px',
    badge: 'A⁺',
    descriptionAr: 'قراءة مريحة للعين والآيات والأمثال',
  },
  {
    id: 'xlarge',
    labelAr: 'كبير جداً',
    labelFr: 'Très grand',
    percentage: 130,
    rootPx: '20.8px',
    badge: 'A⁺⁺',
    descriptionAr: 'وضوح فائق لكبار السن وتفاصيل اليومية',
  },
];

export const DEFAULT_FONT_SIZE_SCALE: FontSizeScale = 'normal';

export function getFontSizeOption(id: FontSizeScale): FontSizeOption {
  return FONT_SIZE_OPTIONS.find((o) => o.id === id) || FONT_SIZE_OPTIONS[1];
}
