import { CalendarDays, Heart, Sparkles, BookOpen, Clock, Landmark, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

interface AboutViewProps {
  onBackToLeaf: () => void;
}

export function AboutView({ onBackToLeaf }: AboutViewProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 animate-fadeIn">
      
      {/* Return button */}
      <div className="mb-6">
        <button
          onClick={onBackToLeaf}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold bg-white dark:bg-[#24201c] text-stone-800 dark:text-stone-200 hover:text-[#8B1E1E] dark:hover:text-amber-400 border border-stone-200 dark:border-[#383129] rounded-xl shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au Feuillet Quotidien (العودة لورقة اليوم)</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-[#7a1414] via-[#651010] to-[#480b0b] dark:from-[#581111] dark:via-[#420a0a] dark:to-[#280505] text-amber-50 rounded-2xl p-6 sm:p-10 shadow-xl mb-8 border-2 border-amber-500/40 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffd700_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
        
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-400/20 border-2 border-amber-400/60 flex items-center justify-center text-amber-300 mb-4 shadow-md">
            <CalendarDays className="w-8 h-8" />
          </div>

          <span className="text-xs sm:text-sm uppercase tracking-widest font-serif text-amber-300 font-bold block mb-1">
            Éphéméride Bouayad · اليومية العصرية لبوعياد
          </span>
          <h1 className="text-2xl sm:text-4xl font-amiri font-black text-white tracking-wide">
            À propos de nous · مـن نـحـن
          </h1>
          <p className="font-amiri text-base sm:text-lg text-amber-200/90 mt-2" dir="rtl">
            ذاكرة البيوت المغربية الأصيلة وتراث الأجداد الموروث جيلاً بعد جيل
          </p>
        </div>
      </div>

      {/* Mission & Story */}
      <div className="space-y-6 text-stone-800 dark:text-stone-200">
        
        {/* Card 1: The Legend of Bouayad */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-stone-100 dark:border-[#2f2821]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 dark:bg-amber-400/10 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
                Une Institution Centenaire dans les Foyers Marocains
              </h2>
              <span className="text-xs font-amiri text-stone-500 dark:text-stone-400" dir="rtl">تاريخ عريق يمتد لعقود في الوجدان المغربي</span>
            </div>
          </div>

          <p className="text-sm sm:text-base leading-relaxed mb-4 text-stone-700 dark:text-stone-300">
            Depuis le milieu du XXe siècle, <strong>l'Éphéméride Bouayad</strong> (اليومية العصرية لبوعياد) s'est imposée comme un véritable repère temporel et culturel au sein des foyers, des boutiques, des zaouïas et des ateliers du Royaume du Maroc.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
            Accrochée au mur par son œillet cuivré traditionnel, chaque page arrachée au lever du jour constituait un rituel matinal familial : découvrir la date selon les quatre calendriers, prendre connaissance des horaires de prière calculés pour sa ville, lire le verset du jour, méditer un hadith prophétique, sourire à la lecture d'un proverbe populaire en darija, et retenir un secret de phytothérapie marocaine ou une astuce domestique au verso.
          </p>
        </div>

        {/* Card 2: Pillars of the Digital Version */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-stone-100 dark:border-[#2f2821]">
            <div className="w-10 h-10 rounded-xl bg-[#8B1E1E]/15 dark:bg-[#8B1E1E]/30 text-[#8B1E1E] dark:text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
                Notre Mission : Numériser avec Fidélité et Gratuité
              </h2>
              <span className="text-xs font-amiri text-stone-500 dark:text-stone-400" dir="rtl">رقمنة وفية للتراث وبدون مقابل</span>
            </div>
          </div>

          <p className="text-sm sm:text-base leading-relaxed mb-4 text-stone-700 dark:text-stone-300">
            Ce projet numérique bénévole est né d'une volonté profonde : <strong>sauvegarder et rendre accessible partout dans le monde cet héritage immatériel marocain</strong>, aussi bien pour les générations actuelles au Maroc que pour la diaspora marocaine attachée à ses racines.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#181512] border border-stone-200 dark:border-[#2d261e]">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-900 dark:text-stone-100 mb-1">
                <Clock className="w-4 h-4 text-[#8B1E1E] dark:text-amber-400" />
                <span>Précision Officielle GMT+0</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Calculs astronomiques rigoureux conformes aux normes du Ministère des Habous et des Affaires Islamiques du Maroc pour toutes les provinces du Royaume.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#181512] border border-stone-200 dark:border-[#2d261e]">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-900 dark:text-stone-100 mb-1">
                <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Quadruple Temporalité</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Juxtaposition harmonieuse des 4 calendriers : Grégorien civil, Hégirien musulman, Fellahi agricole (avec les 28 Manazil), et Amazigh séculaire.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#181512] border border-stone-200 dark:border-[#2d261e]">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-900 dark:text-stone-100 mb-1">
                <Heart className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Proverbes & Sagesses Darija</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Trésors de la sagesse populaire marocaine, proverbes ancestraux et remèdes traditionnels de nos grand-mères (*Tibb Al-Aachab*).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#181512] border border-stone-200 dark:border-[#2d261e]">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-900 dark:text-stone-100 mb-1">
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Accessible Hors-Ligne (PWA)</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Fonctionne sans connexion Internet grâce aux technologies PWA modernes, sans publicité intrusive, sans suivi de données et sans inscription.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Commitment to Privacy & Culture */}
        <div className="bg-amber-50/70 dark:bg-[#251e15] border-2 border-amber-300 dark:border-amber-700/60 rounded-2xl p-6 sm:p-8">
          <h3 className="font-amiri text-xl sm:text-2xl font-black text-amber-950 dark:text-amber-100 mb-2 text-right" dir="rtl">
            ميثاق الأصالة وحفظ الذاكرة الوطنية
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-amber-900 dark:text-amber-200 font-amiri font-semibold text-right" dir="rtl">
            إن هذا العمل تكريم متواضع لكل الحرفيين والمطبعيين المغاربة الذين حافظوا على يومية بوعياد كرمز للبيت المغربي الأصيل، وسعي مخلص لتيسير معرفة مواقيت الصلاة وأوقات الفلاحة ومواسم البروج في قالب عصري أنيق، مجاني ومفتوح للجميع.
          </p>
        </div>

      </div>

    </div>
  );
}
