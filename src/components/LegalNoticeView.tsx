import { Shield, BookMarked, Globe, Server, Mail, ArrowLeft, Info, Landmark } from 'lucide-react';

interface LegalNoticeViewProps {
  onBackToLeaf: () => void;
}

export function LegalNoticeView({ onBackToLeaf }: LegalNoticeViewProps) {
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
            <Shield className="w-8 h-8" />
          </div>

          <span className="text-xs sm:text-sm uppercase tracking-widest font-serif text-amber-300 font-bold block mb-1">
            Informations Légales & Réglementaires
          </span>
          <h1 className="text-2xl sm:text-4xl font-amiri font-black text-white tracking-wide">
            Mentions Légales · البيانات القانونية
          </h1>
          <p className="font-amiri text-base sm:text-lg text-amber-200/90 mt-2" dir="rtl">
            الإطار القانوني، المراجع الرسمية وحقوق الملكية الفكرية
          </p>
        </div>
      </div>

      {/* Legal Notice Cards */}
      <div className="space-y-6 text-stone-800 dark:text-stone-200">
        
        {/* 1. Éditeur de l'application */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#8B1E1E] dark:text-amber-400" />
            <span>1. Éditeur de l'Application Numérique</span>
          </h2>
          <p className="text-xs font-amiri text-stone-500 dark:text-stone-400 mb-3" dir="rtl">
            الجهة المشرفة والناشرة للمنصة الرقمية
          </p>
          <div className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 space-y-2">
            <p>
              <strong>Nom du service :</strong> L'Éphéméride Bouayad Numérique (اليومية العصرية لبوعياد)
            </p>
            <p>
              <strong>Nature du projet :</strong> Initiative numérique citoyenne et patrimoniale à but non lucratif, dédiée à la sauvegarde et à la diffusion du calendrier traditionnel marocain.
            </p>
            <p>
              <strong>Statut :</strong> Application web progressive (PWA) gratuite, sans commercialisation ni abonnement payant.
            </p>
          </div>
        </div>

        {/* 2. Hébergement & Sécurité */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>2. Hébergement & Architecture Technique</span>
          </h2>
          <p className="text-xs font-amiri text-stone-500 dark:text-stone-400 mb-3" dir="rtl">
            الاستضافة والبنية التحتية المعلوماتية
          </p>
          <div className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 space-y-2">
            <p>
              <strong>Protocole :</strong> HTTPS avec chiffrement TLS de bout en bout pour garantir la sécurité et l'intégrité des échanges.
            </p>
            <p>
              <strong>Technologie PWA :</strong> Exécution côté client (client-side rendering) avec Service Workers et cache Workbox pour un fonctionnement instantané et autonome hors connexion.
            </p>
          </div>
        </div>

        {/* 3. Protection des Données Personnelles (Loi 09-08) */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#8B1E1E] dark:text-amber-400" />
            <span>3. Protection des Données Personnelles (Conformité Loi Marocaine n° 09-08)</span>
          </h2>
          <p className="text-xs font-amiri text-stone-500 dark:text-stone-400 mb-3" dir="rtl">
            حماية المعطيات ذات الطابع الشخصي (القانون رقم 09-08)
          </p>
          <div className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 space-y-3">
            <p>
              Conformément aux dispositions de la <strong>loi marocaine n° 09-08</strong> relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, l'application est conçue selon le principe du <em>Privacy by Design</em> :
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li><strong>Zéro collecte nominative :</strong> Aucun nom, adresse email, numéro de téléphone ou géolocalisation GPS en temps réel n'est transmis à des serveurs tiers.</li>
              <li><strong>Stockage local exclusif :</strong> Les choix de ville, d'échelle de police et de signets favoris sont conservés uniquement dans la mémoire locale de votre navigateur.</li>
              <li><strong>Droit à l'oubli :</strong> Vous pouvez à tout instant effacer vos données locales en vidant le cache de votre navigateur.</li>
            </ul>
          </div>
        </div>

        {/* 4. Sources et Références Officielles */}
        <div className="bg-white dark:bg-[#1e1b17] border-2 border-stone-200 dark:border-[#352e26] rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>4. Sources et Références Officielles Marocaines</span>
          </h2>
          <p className="text-xs font-amiri text-stone-500 dark:text-stone-400 mb-3" dir="rtl">
            المراجع الرسمية والمصادر العلمية المعتمدة
          </p>
          <div className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300 space-y-2">
            <p>
              • <strong>Horaires de Prière :</strong> Méthode astronomique conforme aux directives du <em>Ministère des Habous et des Affaires Islamiques du Royaume du Maroc</em> (توقيت غرينتش GMT+0).
            </p>
            <p>
              • <strong>Calendrier Agricole (Fellahi) :</strong> Tradition julienne séculaire préservée par le monde rural marocain, découpée en 28 mansions lunaires (*Manazil*).
            </p>
            <p>
              • <strong>Calendrier Amazigh :</strong> Référence à l'ère amazighe célébrée au Maroc le 14 janvier (Yennayer / رأس السنة الأمازيغية), fête nationale officielle.
            </p>
            <p>
              • <strong>Proverbes & Sagesses :</strong> Recueils de la tradition orale marocaine et de l'art populaire de la Darija.
            </p>
          </div>
        </div>

        {/* 5. Contact & Assistance */}
        <div className="bg-stone-50 dark:bg-[#221c16] border-2 border-stone-200 dark:border-[#383025] rounded-2xl p-6 sm:p-8 text-center">
          <Mail className="w-8 h-8 text-[#8B1E1E] dark:text-amber-400 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 mb-1">
            Contact & Suggestions Culturelles
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
            Pour toute suggestion de proverbe, correction d'horaire ou enrichissement du patrimoine de l'éphéméride, vous pouvez nous écrire via les canaux du projet.
          </p>
        </div>

      </div>

    </div>
  );
}
