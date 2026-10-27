import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, ArrowLeft, Scale, Lock } from 'lucide-react';

interface TermsViewProps {
  onBackToLeaf: () => void;
}

export function TermsView({ onBackToLeaf }: TermsViewProps) {
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
            <FileText className="w-8 h-8" />
          </div>

          <span className="text-xs sm:text-sm uppercase tracking-widest font-serif text-amber-300 font-bold block mb-1">
            Conditions Générales d'Utilisation
          </span>
          <h1 className="text-2xl sm:text-4xl font-amiri font-black text-white tracking-wide">
            الشروط والأحكام العامة للاستخدام
          </h1>
          <p className="font-amiri text-base sm:text-lg text-amber-200/90 mt-2" dir="rtl">
            ضوابط الاستخدام الشخصي والروحي وحماية الخصوصية الرقمية
          </p>
        </div>
      </div>

      {/* Terms Content Sections */}
      <div className="space-y-6 text-stone-800 dark:text-stone-200">
        
        {/* Section 1: Objet du Service */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#8B1E1E] dark:text-amber-400" />
            <span>1. Objet du Service et Portée</span>
          </h2>
          <p className="text-xs font-amiri text-stone-500 dark:text-stone-400 mb-3" dir="rtl">
            طبيعة الخدمة ومجال الاستعمال
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 mb-3">
            L'application web <strong>L'Éphéméride Bouayad</strong> (اليومية العصرية لبوعياد) est une plateforme numérique à vocation patrimoniale, spirituelle et culturelle. Elle a pour objet de mettre à disposition des utilisateurs :
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 mr-2">
            <li>Le quadruple calendrier traditionnel marocain (grégorien, hégirien, fellahi et amazighe).</li>
            <li>Les horaires officiels des 5 prières quotidiennes et du lever du soleil pour toutes les villes du Maroc selon le fuseau horaire légal GMT+0.</li>
            <li>Le suivi des 28 mansions agricoles (*Manazil*) et des saisons traditionnelles (Layali, Smayem, Houssom, Nissane).</li>
            <li>Des contenus spirituels (versets et hadiths) et de sagesse populaire (proverbes darija, médecine par les plantes).</li>
          </ul>
        </div>

        {/* Section 2: Gratuité et Accès */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>2. Gratuité, Disponibilité et Mode Hors-Ligne (PWA)</span>
          </h2>
          <p className="text-xs font-amiri text-stone-500 dark:text-stone-400 mb-3" dir="rtl">
            مجانية الاستخدام وإمكانية التشغيل بدون إنترنت
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 mb-3">
            Le service est accessible <strong>gratuitement</strong>, sans aucune obligation d'inscription, sans abonnement, et sans publicité.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
            Conçue en tant que Progressive Web App (PWA), l'application peut être installée directement sur l'écran d'accueil d'un smartphone, tablette ou ordinateur, et demeure consultable même en l'absence totale de réseau grâce à la mise en cache locale sécurisée.
          </p>
        </div>

        {/* Section 3: Précision des horaires de prière et observation lunaire */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>3. Précision Horaires de Prière et Observation Lunaire</span>
          </h2>
          <p className="text-xs font-amiri text-stone-500 dark:text-stone-400 mb-3" dir="rtl">
            دقة مواقيت الصلاة وثبوت الرؤية الشرعية للهلال
          </p>
          <div className="space-y-3 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
            <p>
              Les horaires de prière sont calculés selon la méthode officielle en vigueur au Royaume du Maroc (angle de Fajr à 19°, angle de l'Icha à 17°, jurisprudence malékite pour le Asr, fuseau GMT+0).
            </p>
            <p>
              Concernant le calendrier hégirien, les débuts et fins des mois sacrés (notamment Ramadan, Chaoual et Dhou al-Hijja) sont assujettis à <strong>l'observation oculaire officielle du croissant lunaire (ثبوت الرؤية الشرعية)</strong> proclamée par le Ministère des Habous et des Affaires Islamiques. L'utilisateur a la faculté d'ajuster le décalage lunaire d'un jour via les paramètres si nécessaire.
            </p>
          </div>
        </div>

        {/* Section 4: Respect de la Vie Privée et Confidentialité */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>4. Protection Absolue de la Vie Privée</span>
          </h2>
          <p className="text-xs font-amiri text-stone-500 dark:text-stone-400 mb-3" dir="rtl">
            السرية التامة وعدم جمع المعطيات الشخصية
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 mb-3">
            L'application n'utilise <strong>aucun traceur publicitaire, aucun cookie tiers, et ne transmet aucune donnée personnelle</strong> vers des serveurs distants.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
            Toutes les préférences (ville sélectionnée, feuillets mis en favoris, taille de police choisie, thème sombre ou clair) sont stockées <strong>exclusivement en local sur votre appareil</strong> via la technologie <em>localStorage</em> de votre navigateur. Vous pouvez effacer ces données à tout moment via les paramètres de votre navigateur.
          </p>
        </div>

        {/* Section 5: Propriété intellectuelle et usage */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8B1E1E] dark:text-amber-400" />
            <span>5. Propriété Intellectuelle et Usage Respectueux</span>
          </h2>
          <p className="text-xs font-amiri text-stone-500 dark:text-stone-400 mb-3" dir="rtl">
            الملكية الفكرية والاستعمال غير التجاري
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 mb-3">
            Les textes traditionnels, versets, proverbes et dictons agricoles font partie intégrante du domaine public et du patrimoine culturel marocain.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
            Le code source, le design d'interface, les animations de déchirure et les agencements visuels de cette application sont protégés. Toute utilisation est réservée à un <strong>cadre personnel, familial, éducatif et non commercial</strong>.
          </p>
        </div>

      </div>

    </div>
  );
}
