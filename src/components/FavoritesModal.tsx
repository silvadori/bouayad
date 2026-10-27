import { X, Trash2, Calendar, ExternalLink, Bookmark } from 'lucide-react';
import { BouayadDailyContent } from '../data/bouayadContent';

export interface SavedLeafItem {
  id: string;
  isoDate: string;
  formattedFr: string;
  formattedAr: string;
  content: BouayadDailyContent;
}

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: SavedLeafItem[];
  onRemoveFavorite: (id: string) => void;
  onSelectDate: (date: Date) => void;
}

export function FavoritesModal({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectDate,
}: FavoritesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-[#fcfbf7] dark:bg-[#1c1916] border border-stone-300 dark:border-[#332c25] rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn transition-colors">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-[#332c25] flex items-center justify-between bg-white dark:bg-[#231f1b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8B1E1E]/10 dark:bg-[#8B1E1E]/30 text-[#8B1E1E] dark:text-amber-400 flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-[#8B1E1E] dark:fill-amber-400" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                Mes Feuillets Favoris ({favorites.length})
              </h3>
              <span className="text-xs font-amiri text-stone-500 dark:text-stone-400" dir="rtl">
                الأوراق والفوائد المحفوظة
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-[#2c2722] rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {favorites.length === 0 ? (
            <div className="text-center py-12 text-stone-500 dark:text-stone-400">
              <Bookmark className="w-10 h-10 mx-auto text-stone-300 dark:text-stone-600 mb-2" />
              <p className="text-sm font-serif">Aucun feuillet enregistré pour le moment.</p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                انقر على زر « حفظ » في أسفل أي ورقة لتجدها محفوظة هنا.
              </p>
            </div>
          ) : (
            favorites.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start justify-between gap-3 bg-white dark:bg-[#24201c] p-4 rounded-xl border border-stone-200 dark:border-[#383129] shadow-2xs transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#8B1E1E] dark:text-amber-400 font-serif">
                      {item.formattedFr}
                    </span>
                    <span className="text-stone-300 dark:text-stone-600">·</span>
                    <span className="text-xs sm:text-sm font-amiri font-bold text-stone-700 dark:text-stone-300" dir="rtl">
                      {item.formattedAr}
                    </span>
                  </div>

                  <p className="font-amiri text-base sm:text-lg font-black text-amber-950 dark:text-amber-200" dir="rtl">
                    « {item.content.proverb.textDarija} »
                  </p>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-1 italic font-serif">
                    {item.content.healthTip.titleFr} : {item.content.healthTip.descriptionFr}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => {
                      onSelectDate(new Date(item.isoDate));
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold bg-stone-100 dark:bg-[#322a22] hover:bg-stone-200 dark:hover:bg-[#40362c] text-stone-800 dark:text-stone-200 rounded-lg transition-colors cursor-pointer"
                    title="Voir ce feuillet"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>عرض</span>
                  </button>

                  <button
                    onClick={() => onRemoveFavorite(item.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                    title="حذف من المفضلة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-[#332c25] bg-stone-50 dark:bg-[#201c18] flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>حفظ تلقائي محلي على هاتفك أو متصفحك</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-200 dark:bg-[#342e27] hover:bg-stone-300 dark:hover:bg-[#443c33] text-stone-800 dark:text-stone-200 rounded-lg font-bold cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
}
