import { useState, useMemo } from 'react';
import { X, Search, Sparkles, BookOpen, Heart, ArrowRight } from 'lucide-react';
import { BOUAYAD_CONTENT_LIBRARY, BouayadDailyContent } from '../data/bouayadContent';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLibraryItem: (itemIndex: number) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  onSelectLibraryItem,
}: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'proverbs' | 'health' | 'quran' | 'hadith'>('all');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    return BOUAYAD_CONTENT_LIBRARY.map((item, index) => ({ item, index })).filter(({ item }) => {
      if (!q) return true;

      const matchesQuran =
        item.quran.verseAr.includes(q) ||
        item.quran.verseFr.toLowerCase().includes(q) ||
        item.quran.surahAr.includes(q);

      const matchesHadith =
        item.hadith.textAr.includes(q) ||
        item.hadith.textFr.toLowerCase().includes(q);

      const matchesProverb =
        item.proverb.textDarija.includes(q) ||
        item.proverb.textFr.toLowerCase().includes(q) ||
        item.proverb.meaningAr.includes(q);

      const matchesHealth =
        item.healthTip.titleAr.includes(q) ||
        item.healthTip.titleFr.toLowerCase().includes(q) ||
        item.healthTip.descriptionAr.includes(q);

      const matchesHistory = item.historyEvent ? (
        item.historyEvent.titleAr.includes(q) ||
        (item.historyEvent.titleFr ? item.historyEvent.titleFr.toLowerCase().includes(q) : false)
      ) : false;

      if (filterType === 'proverbs') return matchesProverb;
      if (filterType === 'health') return matchesHealth;
      if (filterType === 'quran') return matchesQuran;
      if (filterType === 'hadith') return matchesHadith;

      return matchesQuran || matchesHadith || matchesProverb || matchesHealth || matchesHistory;
    });
  }, [query, filterType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-[#fcfbf7] dark:bg-[#1c1916] border border-stone-300 dark:border-[#332c25] rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn transition-colors">
        
        {/* Header with Search Input */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-[#332c25] bg-white dark:bg-[#231f1b]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Search className="w-4 h-4 text-[#8B1E1E] dark:text-amber-400" />
              <span>Recherche dans la Mémoire Bouayad</span>
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-[#2d2722] rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher un proverbe (اللسان، الواد، الحديد...), un remède (الشيبة، الزعتر...), ou un verset..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 bg-stone-50 dark:bg-[#181512] text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-[#383129] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#8B1E1E] dark:focus:ring-amber-400"
              autoFocus
            />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto text-xs pb-1">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterType === 'all'
                  ? 'bg-[#8B1E1E] dark:bg-[#721818] text-white font-medium'
                  : 'bg-stone-100 dark:bg-[#29241f] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#322c26]'
              }`}
            >
              Tout
            </button>
            <button
              onClick={() => setFilterType('proverbs')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterType === 'proverbs'
                  ? 'bg-[#8B1E1E] dark:bg-[#721818] text-white font-medium'
                  : 'bg-stone-100 dark:bg-[#29241f] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#322c26]'
              }`}
            >
              Proverbes (أمثال)
            </button>
            <button
              onClick={() => setFilterType('health')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterType === 'health'
                  ? 'bg-[#8B1E1E] dark:bg-[#721818] text-white font-medium'
                  : 'bg-stone-100 dark:bg-[#29241f] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#322c26]'
              }`}
            >
              Remèdes & Santé (طب وأعشاب)
            </button>
            <button
              onClick={() => setFilterType('quran')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterType === 'quran'
                  ? 'bg-[#8B1E1E] dark:bg-[#721818] text-white font-medium'
                  : 'bg-stone-100 dark:bg-[#29241f] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#322c26]'
              }`}
            >
              Coran (قرآن)
            </button>
            <button
              onClick={() => setFilterType('hadith')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filterType === 'hadith'
                  ? 'bg-[#8B1E1E] dark:bg-[#721818] text-white font-medium'
                  : 'bg-stone-100 dark:bg-[#29241f] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#322c26]'
              }`}
            >
              Hadiths (أحاديث)
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5">
          {results.length === 0 ? (
            <div className="text-center py-12 text-stone-500 dark:text-stone-400">
              <p className="text-sm font-serif">Aucun résultat trouvé pour « {query} ».</p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                Essayez un autre mot-clé en arabe ou en français.
              </p>
            </div>
          ) : (
            results.map(({ item, index }) => (
              <div
                key={index}
                className="bg-white dark:bg-[#231f1b] border border-stone-200 dark:border-[#352e26] rounded-xl p-4 shadow-2xs hover:border-[#8B1E1E]/40 dark:hover:border-amber-400/40 transition-colors"
              >
                {/* Proverb */}
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-800 dark:text-amber-400 mb-0.5">
                    <span className="font-amiri font-bold">مثل مغربي مأثور</span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">دارجة مغربية</span>
                  </div>
                  <p className="font-amiri text-lg sm:text-xl font-black text-stone-950 dark:text-stone-100" dir="rtl">
                    « {item.proverb.textDarija} »
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-serif italic mt-0.5">
                    « {item.proverb.textFr} »
                  </p>
                </div>

                {/* Health & Wisdom excerpts */}
                <div className="pt-2 border-t border-stone-100 dark:border-[#352e26] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-emerald-50/70 dark:bg-[#102318] p-2 rounded-md">
                    <span className="font-bold text-emerald-900 dark:text-emerald-200 block font-amiri text-xs" dir="rtl">
                      🌿 {item.healthTip.titleAr}
                    </span>
                    <span className="text-[11px] text-emerald-800 dark:text-emerald-300 line-clamp-2">
                      {item.healthTip.descriptionFr}
                    </span>
                  </div>

                  <div className="bg-stone-50 dark:bg-[#1a1714] p-2 rounded-md">
                    <span className="font-bold text-stone-800 dark:text-stone-200 block font-amiri text-xs" dir="rtl">
                      📖 {item.quran.surahAr}
                    </span>
                    <span className="text-[11px] text-stone-700 dark:text-stone-300 font-amiri line-clamp-1" dir="rtl">
                      « {item.quran.verseAr} »
                    </span>
                  </div>
                </div>

                {/* Select button */}
                <div className="mt-3 text-right">
                  <button
                    onClick={() => {
                      onSelectLibraryItem(index);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B1E1E] dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    <span>Charger ce contenu dans le feuillet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
