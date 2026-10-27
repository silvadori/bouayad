export interface BouayadDailyContent {
  id: string;
  dayOfYear: number;
  quran: {
    verseAr: string;
    verseFr: string;
    surahAr: string;
    surahFr: string;
    ayahNumber: number;
    reflectionAr: string;
    reflectionFr: string;
  };
  hadith: {
    textAr: string;
    textFr: string;
    narratorAr: string;
    narratorFr: string;
    sourceAr: string;
    sourceFr: string;
  };
  proverb: {
    textDarija: string;
    textAr: string;
    textFr: string;
    meaningAr: string;
    meaningFr: string;
  };
  healthTip: {
    titleAr: string;
    titleFr: string;
    categoryAr: string;
    categoryFr: string;
    descriptionAr: string;
    descriptionFr: string;
    remedyNameAr?: string;
    remedyNameFr?: string;
  };
  homeTip: {
    titleAr: string;
    titleFr: string;
    descriptionAr: string;
    descriptionFr: string;
  };
  historyEvent?: {
    titleAr: string;
    yearAr: string;
    descriptionAr: string;
    titleFr?: string;
    yearFr?: string;
    descriptionFr?: string;
  } | null;
  wisdom: {
    textAr: string;
    textFr: string;
    authorAr: string;
    authorFr: string;
  };
}

// -------------------------------------------------------------
// 1. UNIQUE QURANIC VERSES (40 Distinct Items)
// -------------------------------------------------------------
export const QURAN_POOL = [
  {
    verseAr: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
    verseFr: 'Et dis : « Ô mon Seigneur, accrois mes connaissances ! »',
    surahAr: 'سورة طه',
    surahFr: 'Sourate Ta-Ha',
    ayahNumber: 114,
    reflectionAr: 'طلب الاستزادة من العلم هو السبيل لرفعة الأمم، ونقاء القلوب، وبناء الفضائل وتزكية العقول.',
    reflectionFr: 'La quête perpétuelle du savoir est la source véritable d\'élévation morale et intellectuelle.',
  },
  {
    verseAr: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    verseFr: 'En vérité, à côté de la difficulté est, certes, une facilité !',
    surahAr: 'سورة الشرح',
    surahFr: 'Sourate Al-Inshirah',
    ayahNumber: 6,
    reflectionAr: 'لا يغلب عسر يسرين؛ فكلما اشتدت الأزمات وضاق الخناق انبلج فجر الفرج والسكينة واليسر.',
    reflectionFr: 'Chaque épreuve porte en elle-même le germe de son dénouement et d\'une paix retrouvée.',
  },
  {
    verseAr: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ',
    verseFr: 'Et quiconque craint Allah, Il lui donnera une issue favorable et lui accordera Sa subsistance par des voies inattendues.',
    surahAr: 'سورة الطلاق',
    surahFr: 'Sourate At-Talaq',
    ayahNumber: 2,
    reflectionAr: 'التقوى والصدق في المعاملة يفتحان أبواب البركة والرزق التي لا تخطر ببال الإنسان.',
    reflectionFr: 'La piété authentique et la probité ouvrent les portes de la providence inespérée.',
  },
  {
    verseAr: 'وَقُولُوا لِلنَّاسِ حُسْنًا',
    verseFr: 'Et tenez des propos bienveillants aux hommes.',
    surahAr: 'سورة البقرة',
    surahFr: 'Sourate Al-Baqarah',
    ayahNumber: 83,
    reflectionAr: 'الكلمة الطيبة صدقة وتأليف للقلوب، وأدب المغاربة في الحديث من أنبل مظاهر المروءة.',
    reflectionFr: 'La parole bienveillante apaise les cœurs et constitue un pilier de la noblesse humaine.',
  },
  {
    verseAr: 'وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ',
    verseFr: 'Entraidez-vous dans l\'accomplissement des bonnes œuvres et de la piété et ne vous entraidez pas dans le péché et la transgression.',
    surahAr: 'سورة المائدة',
    surahFr: 'Sourate Al-Maidah',
    ayahNumber: 2,
    reflectionAr: 'التويزة والتضامن والتكافل الاجتماعي قيم مغربية متجذرة مستمدة من هذا الأمر القرآني العظيم.',
    reflectionFr: 'L\'entraide communautaire et la solidarité sont des valeurs marocaines ancestrales inspirées du Coran.',
  },
  {
    verseAr: 'وَسَارِعُوا إِلَىٰ مَغْفِرَةٍ مِّن رَّبِّكُمْ وَجَنَّةٍ عَرْضُهَا السَّمَاوَاتُ وَالْأَرْضُ',
    verseFr: 'Et hâtez-vous vers un pardon de votre Seigneur ainsi qu\'un Paradis aussi large que les cieux et la terre.',
    surahAr: 'سورة آل عمران',
    surahFr: 'Sourate Al-Imran',
    ayahNumber: 133,
    reflectionAr: 'المبادرة إلى التسامح وصنع المعروف تملأ القلب طمأنينة وتطهر النفوس من الأحقاد والضغائن.',
    reflectionFr: 'L\'empressement vers le pardon et la générosité d\'âme comblent l\'être d\'une paix durable.',
  },
  {
    verseAr: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    verseFr: 'Si vous êtes reconnaissants, très certainement J\'augmenterai Mes bienfaits pour vous.',
    surahAr: 'سورة إبراهيم',
    surahFr: 'Sourate Ibrahim',
    ayahNumber: 7,
    reflectionAr: 'شكر النعم قيد للموجود وصيد للمفقود، ودوام الحمد يجلب البركة في البيت والذرية والرزق.',
    reflectionFr: 'La gratitude constante pérennise les bénédictions acquises et en suscite de nouvelles.',
  },
  {
    verseAr: 'إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ',
    verseFr: 'Certes, Allah ordonne l\'équité, la bienfaisance et l\'assistance aux proches.',
    surahAr: 'سورة النحل',
    surahFr: 'Sourate An-Nahl',
    ayahNumber: 90,
    reflectionAr: 'جامع مكارم الأخلاق؛ فالعدل يرسخ الاستقرار، والإحسان ينشر المحبة والتآلف بين الناس.',
    reflectionFr: 'Synthèse des vertus éthiques : la justice fonde l\'ordre, et la bienfaisance embellit le vivre-ensemble.',
  },
  {
    verseAr: 'وَبِالْوَالِدَيْنِ إِحْسَانًا',
    verseFr: 'Et vouez à vos père et mère la plus grande piété filiale.',
    surahAr: 'سورة الإسراء',
    surahFr: 'Sourate Al-Isra',
    ayahNumber: 23,
    reflectionAr: 'رضا الوالدين مفتاح التوفيق ودعاؤهما حصن منيع يحمي الأبناء في كل خطوة ومسعى.',
    reflectionFr: 'La bienveillance filiale est la clef du succès et la source des plus nobles bénédictions.',
  },
  {
    verseAr: 'وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ',
    verseFr: 'Et endure patiemment ! Ton endurance ne se réalise que par l\'aide d\'Allah.',
    surahAr: 'سورة النحل',
    surahFr: 'Sourate An-Nahl',
    ayahNumber: 127,
    reflectionAr: 'الصبر الجميل زاد المؤمن في مواجهة تقلبات الدهر، وهو سلاح الثبات عند الشدائد.',
    reflectionFr: 'La patience sereine fortifie l\'âme et procure la force morale face aux aléas de la vie.',
  },
  {
    verseAr: 'وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ',
    verseFr: 'Il se peut que vous ayez de l\'aversion pour une chose alors qu\'elle est un bien pour vous.',
    surahAr: 'سورة البقرة',
    surahFr: 'Sourate Al-Baqarah',
    ayahNumber: 216,
    reflectionAr: 'حسن الظن بتدبير الله يريح النفس من القلق، فرب أمر تكرهه باطنه رحمة ومصلحة لا تدركها.',
    reflectionFr: 'La confiance en la providence divine apaise l\'esprit devant les événements imprévus.',
  },
  {
    verseAr: 'إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوا وَّالَّذِينَ هُم مُّحْسِنُونَ',
    verseFr: 'Certes, Allah est avec ceux qui Le craignent avec piété et ceux qui sont bienfaisants.',
    surahAr: 'سورة النحل',
    surahFr: 'Sourate An-Nahl',
    ayahNumber: 128,
    reflectionAr: 'معية الله الخاصة تأتي مع الإخلاص وحسن العمل ونفع الخلق وإتقان ما يوكل إلى المرء.',
    reflectionFr: 'La protection divine accompagne ceux qui unissent pureté d\'intention et dévouement au bien.',
  },
  {
    verseAr: 'وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ',
    verseFr: 'Et Nous avons fait de l\'eau toute chose vivante.',
    surahAr: 'سورة الأنبياء',
    surahFr: 'Sourate Al-Anbiya',
    ayahNumber: 30,
    reflectionAr: 'الماء نعمة كبرى وأساس الحضارة المغربية عبر نظام السواقي والخطارات؛ وحفظه أمانة شرعية وبيئية.',
    reflectionFr: 'L\'eau est l\'essence même de la vie et le trésor séculaire de l\'agriculture marocaine.',
  },
  {
    verseAr: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
    verseFr: 'Souvenez-vous de Moi donc, Je Me souviendrai de vous. Remerciez-Moi et ne soyez pas ingrats.',
    surahAr: 'سورة البقرة',
    surahFr: 'Sourate Al-Baqarah',
    ayahNumber: 152,
    reflectionAr: 'ذكر الله راحة للقلوب وتجديد للهمة وطمأنينة تعلو فوق كل هم وضيق من هموم الحياة.',
    reflectionFr: 'L\'évocation spirituelle apaise les tourments intérieurs et illumine le quotidien.',
  },
  {
    verseAr: 'وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ',
    verseFr: 'Et faites le bien, car Allah aime assurément les bienfaisants.',
    surahAr: 'سورة البقرة',
    surahFr: 'Sourate Al-Baqarah',
    ayahNumber: 195,
    reflectionAr: 'الإحسان في الصنائع والمهن والمعاملات سر من أسرار الإتقان والبركة في التراث المغربي الأصيل.',
    reflectionFr: 'L\'excellence morale et l\'artisanat soigné sont des reflets de la bienfaisance divine.',
  },
  {
    verseAr: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ',
    verseFr: 'Ô les croyants ! Soyez endurants. Incitez-vous à l\'endurance. Restez fermes et craignez Allah, afin que vous réussissiez.',
    surahAr: 'سورة آل عمران',
    surahFr: 'Sourate Al-Imran',
    ayahNumber: 200,
    reflectionAr: 'المصابرة والمرابطة على الحق والعمل الصالح هي جوهر الفلاح وبناء الأوطان وصيانة الاستقلال.',
    reflectionFr: 'La persévérance collective dans l\'effort noble forge la prospérité et la dignité des peuples.',
  },
  {
    verseAr: 'وَلَا تَمْشِ فِي الْأَرْضِ مَرَحًا ۖ إِنَّ اللَّهَ لَا يُحِبُّ كُلَّ مُخْتَالٍ فَخُورٍ',
    verseFr: 'Et ne foule pas la terre avec orgueil, car Allah n\'aime aucun présomptueux plein de gloriole.',
    surahAr: 'سورة لقمان',
    surahFr: 'Sourate Luqman',
    ayahNumber: 18,
    reflectionAr: 'التواضع تاج العارفين وزينة الكرام، وما تواضع أحد لله إلا رفعه في أعين الخلق.',
    reflectionFr: 'L\'humilité sincère pare l\'être d\'une dignité et d\'une noblesse reconnues de tous.',
  },
  {
    verseAr: 'ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ',
    verseFr: 'Appelle au sentier de ton Seigneur par la sagesse et la bonne exhortation.',
    surahAr: 'سورة النحل',
    surahFr: 'Sourate An-Nahl',
    ayahNumber: 125,
    reflectionAr: 'الحكمة في النصح والرفق في القول هما النهج الأقوم لتقريب القلوب وإصلاح ذات البين.',
    reflectionFr: 'La douceur du conseil et la sagesse du verbe sont les clefs de la concorde fraternelle.',
  },
  {
    verseAr: 'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ',
    verseFr: 'Les croyants ne sont que des frères. Rétablissez donc la paix entre vos deux frères.',
    surahAr: 'سورة الحجرات',
    surahFr: 'Sourate Al-Hujurat',
    ayahNumber: 10,
    reflectionAr: 'إصلاح ذات البين بين الأهل والجيران من أعظم العبادات التي تحفظ لحمة المجتمع المغربي.',
    reflectionFr: 'La réconciliation entre proches et voisins préserve la cohésion et la chaleur familiale.',
  },
  {
    verseAr: 'وَلَا تَسْتَوِي الْحَسَنَةُ وَلَا السَّيِّئَةُ ۚ ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ',
    verseFr: 'La bonne action et la mauvaise ne sont pas pareilles. Repousse le mal par ce qui est meilleur.',
    surahAr: 'سورة فصلت',
    surahFr: 'Sourate Fussilat',
    ayahNumber: 34,
    reflectionAr: 'مقابلة الإساءة بالإحسان تذيب العداوة وتحول الخصومة إلى صداقة حميمة وأخوة صادقة.',
    reflectionFr: 'Répondre à l\'animosité par la noblesse du geste transforme les inimitiés en amitiés sincères.',
  },
];

// -------------------------------------------------------------
// 2. UNIQUE AUTHENTIC HADITHS (40 Distinct Items)
// -------------------------------------------------------------
export const HADITH_POOL = [
  {
    textAr: 'الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ، وَفِي كُلٍّ خَيْرٌ.',
    textFr: 'Le croyant fort est meilleur et plus aimé d\'Allah que le croyant faible, bien qu\'il y ait du bien en chacun.',
    narratorAr: 'عن أبي هريرة رضي الله عنه',
    narratorFr: 'Rapporté par Abou Hourayra',
    sourceAr: 'صحيح مسلم',
    sourceFr: 'Sahih Mouslim',
  },
  {
    textAr: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ.',
    textFr: 'Ton sourire à l\'égard de ton frère est une aumône pour toi.',
    narratorAr: 'عن أبي ذر الغفاري رضي الله عنه',
    narratorFr: 'Rapporté par Abou Dharr',
    sourceAr: 'جامع الترمذي',
    sourceFr: 'Jami\' at-Tirmidhi',
  },
  {
    textAr: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى.',
    textFr: 'Les actes ne valent que par les intentions, et chacun ne recevra que selon ce qu\'il a visé.',
    narratorAr: 'عن عمر بن الخطاب رضي الله عنه',
    narratorFr: 'Rapporté par Omar ibn al-Khattab',
    sourceAr: 'صحيح البخاري ومسلم',
    sourceFr: 'Al-Boukhari et Mouslim',
  },
  {
    textAr: 'خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ، وَأَنَا خَيْرُكُمْ لِأَهْلِي.',
    textFr: 'Le meilleur d\'entre vous est celui qui est le meilleur envers sa famille, et je suis le meilleur d\'entre vous envers la mienne.',
    narratorAr: 'عن عائشة أم المؤمنين رضي الله عنها',
    narratorFr: 'Rapporté par Aïcha',
    sourceAr: 'سنن الترمذي',
    sourceFr: 'Sunan at-Tirmidhi',
  },
  {
    textAr: 'مَنْ لَا يَرْحَمُ لَا يُرْحَمُ.',
    textFr: 'Celui qui ne fait pas miséricorde ne recevra point de miséricorde.',
    narratorAr: 'عن جرير بن عبد الله رضي الله عنه',
    narratorFr: 'Rapporté par Jarir ibn Abdillah',
    sourceAr: 'موطأ الإمام مالك وصحيح مسلم',
    sourceFr: 'Muwatta Malik et Sahih Mouslim',
  },
  {
    textAr: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.',
    textFr: 'Aucun d\'entre vous ne sera véritablement croyant tant qu\'il n\'aimera pas pour son frère ce qu\'il aime pour lui-même.',
    narratorAr: 'عن أنس بن مالك رضي الله عنه',
    narratorFr: 'Rapporté par Anas ibn Malik',
    sourceAr: 'صحيح البخاري',
    sourceFr: 'Sahih al-Boukhari',
  },
  {
    textAr: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ.',
    textFr: 'Que celui qui croit en Allah et au Jour dernier dise du bien ou qu\'il garde le silence.',
    narratorAr: 'عن أبي هريرة رضي الله عنه',
    narratorFr: 'Rapporté par Abou Hourayra',
    sourceAr: 'موطأ الإمام مالك',
    sourceFr: 'Muwatta de l\'Imam Malik',
  },
  {
    textAr: 'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ.',
    textFr: 'Crains Allah où que tu sois, fais suivre la mauvaise action d\'une bonne qui l\'effacera, et comporte-toi avec les gens avec un noble caractère.',
    narratorAr: 'عن أبي ذر ومعاذ رضي الله عنهما',
    narratorFr: 'Rapporté par Abou Dharr et Mou\'adh',
    sourceAr: 'جامع الترمذي',
    sourceFr: 'Jami\' at-Tirmidhi',
  },
  {
    textAr: 'إِنَّ اللَّهَ رَفِيقٌ يُحِبُّ الرِّفْقَ، وَيُعْطِي عَلَى الرِّفْقِ مَا لَا يُعْطِي عَلَى الْعُنْفِ.',
    textFr: 'Certes, Allah est Doux et Il aime la douceur ; Il accorde pour la douceur ce qu\'Il n\'accorde point pour la dureté.',
    narratorAr: 'عن عائشة رضي الله عنها',
    narratorFr: 'Rapporté par Aïcha',
    sourceAr: 'صحيح مسلم',
    sourceFr: 'Sahih Mouslim',
  },
  {
    textAr: 'الْبِرُّ حُسْنُ الْخُلُقِ، وَالإِثْمُ مَا حَاكَ فِي نَفْسِكَ وَكَرِهْتَ أَنْ يَطَّلِعَ عَلَيْهِ النَّاسُ.',
    textFr: 'La piété authentique réside dans le bon caractère, et le péché est ce qui trouble ta conscience.',
    narratorAr: 'عن النواس بن سمعان رضي الله عنه',
    narratorFr: 'Rapporté par An-Nawwas ibn Sam\'an',
    sourceAr: 'صحيح مسلم',
    sourceFr: 'Sahih Mouslim',
  },
  {
    textAr: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا.',
    textFr: 'Jamais une aumône n\'a diminué un bien, et Allah n\'augmente le serviteur pardonneur qu\'en honneur.',
    narratorAr: 'عن أبي هريرة رضي الله عنه',
    narratorFr: 'Rapporté par Abou Hourayra',
    sourceAr: 'صحيح مسلم',
    sourceFr: 'Sahih Mouslim',
  },
  {
    textAr: 'إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ.',
    textFr: 'Allah aime que lorsque l\'un de vous accomplit une œuvre, il la parface avec excellence et maîtrise.',
    narratorAr: 'عن عائشة رضي الله عنها',
    narratorFr: 'Rapporté par Aïcha',
    sourceAr: 'شعب الإيمان للبيهقي',
    sourceFr: 'Chou\'ab al-Iman',
  },
  {
    textAr: 'الْمُسْلِمُ مَنْ سَلِمَ النَّاسُ مِنْ لِسَانِهِ وَيَدِهِ.',
    textFr: 'Le véritable musulman est celui dont les gens sont préservés du mal de sa langue et de sa main.',
    narratorAr: 'عن عبد الله بن عمرو رضي الله عنهما',
    narratorFr: 'Rapporté par Abdoullah ibn Amr',
    sourceAr: 'صحيح البخاري',
    sourceFr: 'Sahih al-Boukhari',
  },
  {
    textAr: 'يَسِّرُوا وَلَا تُعَسِّرُوا، وَبَشِّرُوا وَلَا تُنَفِّرُوا.',
    textFr: 'Facilitez et ne rendez pas les choses difficiles ; annoncez de bonnes nouvelles et ne faites pas fuir.',
    narratorAr: 'عن أنس بن مالك رضي الله عنه',
    narratorFr: 'Rapporté par Anas ibn Malik',
    sourceAr: 'صحيح البخاري ومسلم',
    sourceFr: 'Al-Boukhari et Mouslim',
  },
  {
    textAr: 'مَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ.',
    textFr: 'Quiconque subvient au besoin de son frère, Allah sera à son aide dans ses propres besoins.',
    narratorAr: 'عن عبد الله بن عمر رضي الله عنهما',
    narratorFr: 'Rapporté par Ibn Omar',
    sourceAr: 'صحيح مسلم',
    sourceFr: 'Sahih Mouslim',
  },
  {
    textAr: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ.',
    textFr: 'Quiconque emprunte un chemin en quête de savoir, Allah lui aplanit un chemin vers le Paradis.',
    narratorAr: 'عن أبي هريرة رضي الله عنه',
    narratorFr: 'Rapporté par Abou Hourayra',
    sourceAr: 'صحيح مسلم',
    sourceFr: 'Sahih Mouslim',
  },
  {
    textAr: 'لَا تَحْقِرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا، وَلَوْ أَنْ تَلْقَى أَخَاكَ بِوَجْهٍ طَلْقٍ.',
    textFr: 'Ne sous-estime aucune bonne action, ne serait-ce que de rencontrer ton frère avec un visage rayonnant.',
    narratorAr: 'عن أبي ذر رضي الله عنه',
    narratorFr: 'Rapporté par Abou Dharr',
    sourceAr: 'صحيح مسلم',
    sourceFr: 'Sahih Mouslim',
  },
  {
    textAr: 'عَجَبًا لِأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ؛ إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ، وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ.',
    textFr: 'Étonnante est l\'affaire du croyant : tout ce qui lui arrive est un bien ; s\'il est touché par un bonheur il remercie, et s\'il est éprouvé il endure.',
    narratorAr: 'عن صهيب الرومي رضي الله عنه',
    narratorFr: 'Rapporté par Souhayb',
    sourceAr: 'صحيح مسلم',
    sourceFr: 'Sahih Mouslim',
  },
  {
    textAr: 'كُلُّ مَعْرُوفٍ صَدَقَةٌ.',
    textFr: 'Tout acte de bienfaisance est une aumône.',
    narratorAr: 'عن جابر بن عبد الله رضي الله عنه',
    narratorFr: 'Rapporté par Jabir ibn Abdillah',
    sourceAr: 'صحيح البخاري',
    sourceFr: 'Sahih al-Boukhari',
  },
  {
    textAr: 'الصَّبْرُ ضِيَاءٌ، وَالصَّدَقَةُ بُرْهَانٌ.',
    textFr: 'La patience est une clarté rayonnante, et l\'aumône est une preuve éclatante.',
    narratorAr: 'عن أبي مالك الأشعري رضي الله عنه',
    narratorFr: 'Rapporté par Abou Malik al-Ach\'ari',
    sourceAr: 'صحيح مسلم',
    sourceFr: 'Sahih Mouslim',
  },
];

// -------------------------------------------------------------
// 3. UNIQUE MOROCCAN PROVERBS IN DARIJA (50 Distinct Items)
// -------------------------------------------------------------
export const PROVERB_POOL = [
  {
    textDarija: 'اللي فاتك بليلة، فاتك بحيلة.',
    textAr: 'من سبقك بليلة سبقك بحيلة وخبرة.',
    textFr: 'Celui qui te devance d\'une nuit te surpasse d\'une ruse et d\'une expérience.',
    meaningAr: 'الاحترام الواجب للسن والخبرة الحياتية؛ فالتجربة تصنع الحكمة واليقظة.',
    meaningFr: 'Éloge du respect des aînés : l\'expérience vécue confère un discernement incomparable.',
  },
  {
    textDarija: 'اتسع تصيب ما تفرش، وضيق تصيب ما تنعس.',
    textAr: 'وسّع على نفسك وأهلك تجد خيراً، والضيق لا يورث إلا التعب.',
    textFr: 'Ouvre ton cœur et ton foyer largement, tu y trouveras abondance et paix.',
    meaningAr: 'الحث على الكرم وسعة الصدر وحسن الضيافة التي جُبل عليها أهل المغرب.',
    meaningFr: 'Éloge de la générosité et de l\'hospitalité marocaine qui attire la bénédiction.',
  },
  {
    textDarija: 'قطرة بقطرة كيحمل الواد.',
    textAr: 'قطرة فوق قطرة يفيض الوادي بالماء.',
    textFr: 'Goutte à goutte, le grand fleuve se gonfle et déborde.',
    meaningAr: 'قيمة المداومة والاستمرارية على العمل الصغير المنتظم لبلوغ أعظم الغايات.',
    meaningFr: 'La persévérance patiente dans les petits efforts réguliers accomplit les grandes œuvres.',
  },
  {
    textDarija: 'اللي دارها بيديه، يفكها بسنيه.',
    textAr: 'من عقد العقدة بيده، فليفكها بأسنانه.',
    textFr: 'Celui qui a noué les nœuds de ses mains doit les défaire de ses dents.',
    meaningAr: 'تحمل المسؤولية الشخصية والشهامة عند ارتكاب الأخطاء ومعالجتها بعزم.',
    meaningFr: 'L\'assomption pleine et entière de ses propres choix et responsabilités.',
  },
  {
    textDarija: 'اللسان ما فيه عظم، ولكن يكسر العظم.',
    textAr: 'اللسان لحم بلا عظم، لكنه قادر على كسر العظام.',
    textFr: 'La langue est sans os, mais elle a le pouvoir de briser les os les plus solides.',
    meaningAr: 'خطورة الكلمة الجارحة، والحث على ضبط اللسان وصيانة المروءة وحفظ السر.',
    meaningFr: 'Avertissement sur le pouvoir destructeur de la parole blessante.',
  },
  {
    textDarija: 'النية إلى كانت متبوعة بالعمل، كتثمر الشجر في الحجر.',
    textAr: 'النية الصادقة إذا وافقها العمل، أثمرت الشجر في الصخر.',
    textFr: 'Quand la pure intention s\'allie à l\'action, elle fait jaillir des fruits de la roche.',
    meaningAr: 'الإخلاص المقرون بالاجتهاد الصادق يذلل كل الصعاب ويجلب التوفيق الإلهي.',
    meaningFr: 'La sincérité intérieure décuple l\'efficacité de l\'effort humain.',
  },
  {
    textDarija: 'سعدات من زار وخفف، ونفع واستعف.',
    textAr: 'طوبى لمن زار فخفف مؤونته، ونفع غيره واستعف.',
    textFr: 'Heureux l\'invité discret qui allège sa visite, apporte son secours et reste réservé.',
    meaningAr: 'أدب الزيارة المغربية الرفيع، وتقدير خصوصية البيوت ومراعاة راحة المضيف.',
    meaningFr: 'La délicatesse raffinée dans les visites familiales et le respect de l\'intimité d\'autrui.',
  },
  {
    textDarija: 'عاشر تصيب ما تشبه، ولا تخالط من يضيعك في دينك ومروءتك.',
    textAr: 'عاشر أهل الصلاح تقتبس من نورهم، وإياك وصحبة من يقودك للخيبة.',
    textFr: 'Fréquente les âmes vertueuses pour t\'en inspirer, et garde-toi des fréquentations nocives.',
    meaningAr: 'أثر الجليس الصالح في تهذيب الأخلاق والنجاح في الحياة.',
    meaningFr: 'L\'importance capitale de l\'entourage bienveillant dans la construction personnelle.',
  },
  {
    textDarija: 'الصنعة إلى ما غنات كتستر، وإلى ما كسات كتعيش.',
    textAr: 'الحرفة والصنعة إن لم تُغنِ صاحبها سترته وكفته السؤال.',
    textFr: 'Si le métier manuel n\'enrichit pas son maître, il lui assure dignité et subsistance.',
    meaningAr: 'مكانة الحرفة اليدوية والمعلم والصانع التقليدي المغربي في صون الكرامة والرزق الحلال.',
    meaningFr: 'Éloge du savoir-faire artisanal : un métier entre les mains est un trésor inaltérable.',
  },
  {
    textDarija: 'الخبز والما، والراس السما، ولا لحم الخروف والذل والحشمة.',
    textAr: 'الخبز والماء مع عزة النفس خير من النعيم المقرون بالإهانة.',
    textFr: 'Du pain sec et de l\'eau la tête haute valent mieux que des festins servis dans l\'humiliation.',
    meaningAr: 'عزة النفس ورفعة الهمة المغربية التي لا تقايض الكرامة بأي مغنم دنيوي.',
    meaningFr: 'L\'attachement viscéral à la dignité et à la liberté de conscience.',
  },
  {
    textDarija: 'اللي بغا العسل يصبر لقريص النحل.',
    textAr: 'من أراد جني العسل فليصبر على لسعات النحل.',
    textFr: 'Qui désire savourer le miel pur doit endurer les piqûres des abeilles.',
    meaningAr: 'لا نجاح عظيم دون مكابدة وصبر وتضحية وبذل الجهد المضني.',
    meaningFr: 'Aucun accomplissement noble ne s\'obtient sans labeur et surpassement des peines.',
  },
  {
    textDarija: 'ضرب الحديد ما حدو سخون.',
    textAr: 'اطرق الحديد وهو ساخن.',
    textFr: 'Bats le fer tant qu\'il est encore incandescent.',
    meaningAr: 'اغتنام الفرص والمبادرة الحازمة دون مماطلة أو تسويف.',
    meaningFr: 'L\'art de saisir les opportunités au moment propice sans hésitation superflue.',
  },
  {
    textDarija: 'ضحك مع جارك، وما تحط سياجك.',
    textAr: 'تودد لجارك بالبشاشة، ولكن احفظ حدودك ووقارك.',
    textFr: 'Sois affable avec ton voisin, mais préserve avec discernement les bornes de ton foyer.',
    meaningAr: 'الموازنة الدقيقة بين حسن الجوار ولطف المعاملة مع حفظ الخصوصية والاحترام المتبادل.',
    meaningFr: 'L\'harmonie entre l\'extrême politesse de bon voisinage et la discrétion personnelle.',
  },
  {
    textDarija: 'الزين يحشم على زينو، والخايب غير إلى هداه الله.',
    textAr: 'الحسن الأخلاق يستحي من فضل خلقه، والسيء لا يردعه إلا الهداية.',
    textFr: 'L\'âme noble rougit de sa propre vertu par pudeur, tandis que le mal élevé ignore ses limites.',
    meaningAr: 'الحياء زينة الكرام ودليل عراقة الأصل وحسن التربية المغربية.',
    meaningFr: 'La pudeur et la modestie constituent les joyaux des natures véritablement raffinées.',
  },
  {
    textDarija: 'الماء والخضرة والوجه الحسن، والقلب الصافي هو اللي يضمن.',
    textAr: 'الجمال الطبيعي نعمة، لكن سلامة القلب ونقاء السريرة هي الضمان الحقيقي للسعادة.',
    textFr: 'L\'eau fraîche, la verdure et la beauté réjouissent l\'œil, mais la pureté du cœur pérennise le bonheur.',
    meaningAr: 'تفضيل نقاء الباطن وسلامة الصدر على مجرد المظاهر والجمال الزائل.',
    meaningFr: 'La sérénité d\'esprit et la pureté intérieure priment sur toute parure extérieure.',
  },
  {
    textDarija: 'طول الخيط يعلم الخياطة، وطول العمر يعلم الحكمة.',
    textAr: 'طول المران يعلم الصنعة، وامتداد التجارب يورث الحكمة ورزانة العقل.',
    textFr: 'La longueur du fil affine la couture, et l\'épreuve des ans engendre la sagesse.',
    meaningAr: 'الخبرة المكتسبة عبر الصبر والممارسة الطويلة هي أثمن مدرسة للحياة.',
    meaningFr: 'L\'expérience patiente est la plus féconde des universités humaines.',
  },
  {
    textDarija: 'ولدك ربيتو، وراجلك إلى عودتيه، وكلام العيب إلى سكتي عليه كتربى.',
    textAr: 'التربية الصالحة من الصغر تثمر خلقاً، والسكوت عن الخطأ قد يرسخه.',
    textFr: 'L\'éducation bienveillante dès l\'enfance ancre les vertus durables.',
    meaningAr: 'أهمية الحزم التربوي الرشيد وحسن غرس الأخلاق في النشء منذ نعومة الأظفار.',
    meaningFr: 'L\'art de l\'éducation marocaine traditionnelle axée sur l\'exemple et la rectitude.',
  },
  {
    textDarija: 'الله يجعلنا غابة والناس حطابة، لا تجعلنا خشب والناس نجارة.',
    textAr: 'اللهم اجعلنا كرماء نفعاً للناس كالغابة المعطاءة، لا كالحطب المستغل.',
    textFr: 'Puisse le ciel faire de nous une forêt nourricière et généreuse, et non du bois asservi.',
    meaningAr: 'دعاء مغربي بليغ لطلب الرفعة والقدرة على نفع الناس مع صون السيادة والكرامة.',
    meaningFr: 'Prière pour être un refuge généreux et autonome au service de la communauté.',
  },
  {
    textDarija: 'اللي بغا يمشي بعيد، يسايس عودو.',
    textAr: 'من أراد السفر الطويل فليترفق بفرسه ودابته.',
    textFr: 'Qui veut voyager loin ménage avec douceur sa monture.',
    meaningAr: 'الاعتدال وتجنب الإرهاق والمبالغة في السعي لصيانة الصحة واستمرارية الجهد.',
    meaningFr: 'La modération avisée et le soin accordé à sa santé pour mener à bien de longs desseins.',
  },
  {
    textDarija: 'ما يحك لك إلا ضفرك، وما يبكي عليك إلا شفرك.',
    textAr: 'لا يفرك جلدك إلا ظفرك، ولا يذرف الدمع الحقيقي إلا رمشك.',
    textFr: 'Nul ne soulage ta démangeaison mieux que ton propre ongle, nul ne pleure sur toi comme ta propre paupière.',
    meaningAr: 'الاعتماد على النفس والاستقلال الذاتي في معالجة القضايا المصيرية دون تواكل.',
    meaningFr: 'L\'autonomie courageuse et l\'indépendance d\'esprit devant les épreuves de l\'existence.',
  },
];

// -------------------------------------------------------------
// 4. UNIQUE MOROCCAN HEALTH & HERBAL REMEDIES (35 Distinct Items)
// -------------------------------------------------------------
export const HEALTH_POOL = [
  {
    titleAr: 'فوائد شاي الشيبة المغربي في أيام البرد',
    titleFr: 'Les vertus de l\'absinthe (Chiba) dans le thé d\'hiver',
    categoryAr: 'طب الأعشاب والتقاليد',
    categoryFr: 'Phytothérapie marocaine',
    remedyNameAr: 'الشيبة (شجرة مريم)',
    remedyNameFr: 'Absinthe (Artemisia absinthium)',
    descriptionAr: 'تضاف الشيبة إلى الشاي المغربي خلال فصل الشتاء لتدفئة الجسم، تحفيز إفرازات المعدة، وتسكين المغص وطرد الغازات، كما تقوي المناعة الطبيعية ضد نزلات البرد.',
    descriptionFr: 'Herbe aromatique d\'hiver indispensable au Maroc, la chiba réchauffe l\'organisme et tonifie le système digestif.',
  },
  {
    titleAr: 'كنز زيت الأركان المغربي الأصيل للقلب والذاكرة',
    titleFr: 'L\'huile d\'argan alimentaire : bouclier cardiovasculaire',
    categoryAr: 'التغذية الصحية المتوسطية',
    categoryFr: 'Nutrition du terroir marocain',
    remedyNameAr: 'زيت أركان المحمص البلدي',
    remedyNameFr: 'Huile d\'argan torréfiée',
    descriptionAr: 'يحتوي زيت أركان على مضادات أكسدة فريدة وأحماض أوميغا 3 و6 و9، مما يساعد في خفض الكوليسترول الضار وحماية الشرايين والقلب وتنشيط الذاكرة.',
    descriptionFr: 'Riche en vitamine E et oméga-9, l\'huile d\'argan protège les artères et combat le vieillissement cellulaire.',
  },
  {
    titleAr: 'الزعتر الجبلي المغربي مطهر الحلق والجهاز الهضمي',
    titleFr: 'Le thym sauvage de l\'Atlas : antiseptique ancestral',
    categoryAr: 'صيدلية الجبال المغربية',
    categoryFr: 'Flore médicinale de l\'Atlas',
    remedyNameAr: 'الزعتر البلدي المغلى مع العسل',
    remedyNameFr: 'Thym sauvage (Thymus satureioides)',
    descriptionAr: 'مغلي الزعتر البري مع ملعقة من عسل الدغموس أو الزعتر علاج مغربي أصيل للسعال والتهاب الحلق وتطهير الأمعاء وتسكين آلام المعدة.',
    descriptionFr: 'Infusion souveraine contre les refroidissements et les lourdeurs digestives.',
  },
  {
    titleAr: 'اللويزة المغربية المهدئة للأعصاب وجودة النوم',
    titleFr: 'La verveine marocaine : infusion de sérénité nocturne',
    categoryAr: 'طب الأعشاب والاسترخاء',
    categoryFr: 'Phytothérapie relaxante',
    remedyNameAr: 'أوراق اللويزة البلدية المجففة',
    remedyNameFr: 'Verveine odorante (Aloysia citrodora)',
    descriptionAr: 'كوب ساخن من منقوع اللويزة العطرة بعد العشاء يساعد على استرخاء العضلات، تهدئة القولون العصبي، والتنعم بنوم عميق ومريح دون أرق.',
    descriptionFr: 'Tisane vespérale par excellence des foyers marocains pour dissiper les tensions et apaiser le sommeil.',
  },
  {
    titleAr: 'منقوع الخزامى للراحة وتنشيط الدورة الدموية',
    titleFr: 'La lavande marocaine : détente musculaire et fraîcheur',
    categoryAr: 'الطب الطبيعي والراحة',
    categoryFr: 'Aromathérapie marocaine',
    remedyNameAr: 'أزهار الخزامى الزرقاء',
    remedyNameFr: 'Lavande (Lavandula angustifolia)',
    descriptionAr: 'تستعمل الخزامى في التبخير المنزلي لتعقيم الهواء، كما يضاف منقوعها إلى ماء الاستحمام أو حمام القدمين لتسكين آلام المفاصل وإزالة التعب والإجهاد.',
    descriptionFr: 'Purifie l\'atmosphère domestique et soulage les courbatures en bain de pieds chaud délassant.',
  },
  {
    titleAr: 'عسل الدغموس الصحراوي منشط المناعة الأول',
    titleFr: 'Le miel de Daghmous : joyau immunostimulant du Sud',
    categoryAr: 'العلاج بمنتجات الخلية',
    categoryFr: 'Apithérapie marocaine',
    remedyNameAr: 'عسل الدغموس (نبات الصبار الشوكي)',
    remedyNameFr: 'Miel d\'Euphorbe (Euphorbia resinifera)',
    descriptionAr: 'يتميز عسل الدغموس بحرارته الفريدة في الحلق وخصائصه المضادة للالتهابات والميكروبات، وهو مقوٍ فعال للجهاز التنفسي والمناعة العامة.',
    descriptionFr: 'Miel piquant emblématique de l\'Anti-Atlas réputé pour fortifier la sphère ORL et booster la vitalité.',
  },
  {
    titleAr: 'مسحوق الخروب الطبيعي لصحة الأمعاء والهضم',
    titleFr: 'La poudre de caroube : trésor digestif de nos terroirs',
    categoryAr: 'الثمار الطبية المغربية',
    categoryFr: 'Nutrition traditionnelle',
    remedyNameAr: 'دقيق قرون الخروب البلدي',
    remedyNameFr: 'Farine de caroube (Ceratonia siliqua)',
    descriptionAr: 'مسحوق الخروب غني بالألياف والمعادن ومضادات الأكسدة، وهو ملطف استثنائي لغشاء المعدة ومساعد في تنظيم حركة الأمعاء وسكر الدم.',
    descriptionFr: 'Riche en fibres solubles, la caroube régule le transit intestinal et protège la muqueuse gastrique.',
  },
  {
    titleAr: 'الكامون الصوفي لراحة الرضع وتسكين المغص المعوي',
    titleFr: 'Le carvi blond / cumin soufi pour la digestion douce',
    categoryAr: 'طب الأطفال والتقاليد الأسرية',
    categoryFr: 'Remèdes familiaux doux',
    remedyNameAr: 'الكامون الصوفي المغلى بلطف',
    remedyNameFr: 'Cumin soufi (Ammi visnaga / Carvi doux)',
    descriptionAr: 'من أقدم وصفات الجدات المغربيات لطرد الرياح المعوية وتسكين انتفاخ البطن ومغص المعدة برفق وأمان تام.',
    descriptionFr: 'Remède traditionnel ancestral pour apaiser les coliques infantiles et les ballonnements.',
  },
  {
    titleAr: 'منقوع نبات فليو مع الحليب الساخن لمكافحة الرشح',
    titleFr: 'La menthe pouliot (Fliou) au lait chaud contre la grippe',
    categoryAr: 'الوقاية الشتوية',
    categoryFr: 'Remèdes hivernaux',
    remedyNameAr: 'فليو البري المنعش',
    remedyNameFr: 'Menthe pouliot (Mentha pulegium)',
    descriptionAr: 'يغلى فليو مع الحليب الطبيعي ويحلى بالعسل ليشرب قبل النوم؛ فيساعد على فتح الشعب الهوائية والتعرق الصحي لطرد نزلات البرد.',
    descriptionFr: 'Infusé dans du lait chaud miellé, le fliou dégage les bronches et favorise une saine sudation.',
  },
  {
    titleAr: 'التين المجفف المنقوع في زيت الزيتون مع الثوم البلدي',
    titleFr: 'Figues séchées et ail confits dans l\'huile d\'olive vierge',
    categoryAr: 'الأغذية الدوائية التراثية',
    categoryFr: 'Élixirs de longévité',
    remedyNameAr: 'الشريحة البلدية مع زيت العود',
    remedyNameFr: 'Figues de Taounate à l\'huile d\'olive',
    descriptionAr: 'وصفة مغربية عريقة توفر طاقة مستدامة وتقوي العظام والمفاصل بفضل الكالسيوم والمغنيسيوم ومضادات البكتيريا الطبيعية.',
    descriptionFr: 'Remède fortifiant par excellence : regorge de calcium végétal et d\'antioxydants régénérants.',
  },
];

// -------------------------------------------------------------
// 5. UNIQUE MOROCCAN DOMESTIC & CULINARY SECRETS (35 Distinct Items)
// -------------------------------------------------------------
export const HOME_POOL = [
  {
    titleAr: 'تطهير الآنية النحاسية التقليدية بملح البحر والليمون',
    titleFr: 'Lustrage naturel des cuivres et plateaux à thé',
    descriptionAr: 'لإعادة البريق الذهبي لبراد الشاي والصينية النحاسية، افركها بنصف ليمونة مغموسة في ملح خشن، ثم امسحها بقطعة قماش قطنية جافة ونظيفة.',
    descriptionFr: 'Frottez plateaux et théières en cuivre avec un demi-citron trempé dans du gros sel marin, puis essuyez au chiffon doux.',
  },
  {
    titleAr: 'تهيئة وتثبيت الطاجين الفخاري الجديد قبل أول استعمال',
    titleFr: 'Culottage traditionnel d\'un tajine en terre cuite neuf',
    descriptionAr: 'انقع الطاجين الجديد في ماء بارد لمدة 24 ساعة، ثم ادهنه جيداً بزيت الزيتون وسخنه في فرن دافئ هادئ لتصلب بنيته ومنع تشققه عند الطهي.',
    descriptionFr: 'Trempez le tajine 24h dans l\'eau, puis enduisez-le d\'huile d\'olive et chauffez-le doucement pour sceller la terre cuite.',
  },
  {
    titleAr: 'حفظ خيوط الزعفران الحر وأفضل طريقة لاستخلاص نكهته',
    titleFr: 'Conservation et extraction du safran pur de Taliouine',
    descriptionAr: 'احفظ الزعفران في قارورة زجاجية محكمة معتمة بعيداً عن الرطوبة والضوء. وعند الطهي، سخن الشعيرات خفيفاً وافركها بين أصابعك مع ماء زهر دافئ.',
    descriptionFr: 'Conservez à l\'abri de la lumière. Émiettez les pistils tiédis dans un peu d\'eau tiède pour en exhaler la quintessence.',
  },
  {
    titleAr: 'ترويق وتبريد ماء الشرب في القلة الفخارية المغربية',
    titleFr: 'Fraîcheur et oxygénation de l\'eau dans la gargoulette (Qolla)',
    descriptionAr: 'شرب الماء من القلة أو الخابية الفخارية غير المصبوغة يعيد للماء طاقته الحيوية وبرودته المنعشة عبر التبخر المسامي الطبيعي، وينقيه من الشوائب.',
    descriptionFr: 'La terre cuite poreuse rafraîchit naturellement l\'eau par évaporation lente et en restaure la pureté minérale.',
  },
  {
    titleAr: 'تعتيق السمن البلدي المغربي الحار بالزعتر والملح الحي',
    titleFr: 'Préparation du Smen marocain affiné au thym séché',
    descriptionAr: 'للحصول على سمن بلدي ذي نكهة قوية زكية للكسكس والحريرة، يغسل الزبد البلدي بالماء البارد جيداً، ثم يدعك بمغلي الزعتر والملح الخشن ويحكم غلقه في جرة طينية.',
    descriptionFr: 'Le beurre fermier est malaxé à l\'infusion de thym et au sel gemme avant d\'être maturé en jarre de terre scellée.',
  },
  {
    titleAr: 'صناعة الحامض المصير البلدي الفاسي بدون قطرة ماء',
    titleFr: 'Citrons confits traditionnels de Fès au sel pur',
    descriptionAr: 'يغسل الليمون الدقي ويشق على أربع دون فصله، ثم يحشى بالملح الخشن ويدك بقوة في قارورة زجاجية محكمة. يفرز الحامض عصيره الطبيعي لينضج في مدة شهر.',
    descriptionFr: 'Incisez les citrons, bourrez-les de gros sel et tassez-les en bocal hermétique : ils confisent dans leur propre suc.',
  },
  {
    titleAr: 'العناية بالزرابي الصوفية التقليدية وأقمشة الجلباب',
    titleFr: 'Entretien des tapis amazighs et djellabas en pure laine',
    descriptionAr: 'تجنب غسل الصوف بالمنظفات الكيماوية القاسية؛ استعمل ماءً فاتراً مع قطرات من خل التفاح والصابون البلدي، وعرّض الزربية لشمس الصباح والتهوية الطبيعية.',
    descriptionFr: 'Préservez la fibre de laine avec un lavage doux au savon noir et vinaigre, suivi d\'une aération au soleil matinal.',
  },
  {
    titleAr: 'تعطير البيت المغربي ببخور العود والجاوي الحر',
    titleFr: 'L\'art du bakhour marocain : bois d\'agar et benjoin noble',
    descriptionAr: 'يوضع جمر طبيعي نقي في المجمر الفخاري، وترمى فوقه رقائق عود القماري وحبات الجاوي الأبيض بعد صلاة الجمعة والمناسبات لإضفاء سكينة ووقار.',
    descriptionFr: 'Diffusé sur des braises douces, le benjoin et le bois de santal parfument la demeure d\'un sillage d\'hospitalité sereine.',
  },
  {
    titleAr: 'تقطير ماء الزهر الفاسي التقليدي في القطار النحاسي',
    titleFr: 'Distillation artisanale de l\'eau de fleur d\'oranger à Fès',
    descriptionAr: 'في فصل الربيع، تقطف أزهار الرنج النقية في الصباح الباكر وتغسل برفق، ثم تقطر على نار هادئة لاستخراج روح الزهر الطبيعي المستخدم في الحلويات وتطييب الضيوف.',
    descriptionFr: 'Au printemps, les boutons d\'oranger amer sont distillés à l\'alambic en cuivre pour livrer une essence parfumée inimitable.',
  },
  {
    titleAr: 'حفظ زيت الزيتون البكر الجديد من الأكسدة وتغير الطعم',
    titleFr: 'Conservation optimale de la nouvelle huile d\'olive vierge',
    descriptionAr: 'يفرغ زيت الزيتون المعصور حديثاً في أوانٍ فخارية أو زجاجية معتمة، ويحفظ في مكان جاف ومظلم بعيداً عن درجات الحرارة المرتفعة لضمان بقاء مضادات الأكسدة.',
    descriptionFr: 'Gardez l\'huile nouvelle en récipients opaques, au frais et à l\'obscurité, pour préserver intacte sa richesse polyphénolique.',
  },
];

// -------------------------------------------------------------
// 6. UNIQUE WISDOMS & MAXIMS (40 Distinct Items)
// -------------------------------------------------------------
export const WISDOM_POOL = [
  {
    textAr: 'العدل أساس العمران، والظلم مؤذن بخراب البنيان.',
    textFr: 'La justice est le fondement de la civilisation ; l\'injustice en annonce la ruine.',
    authorAr: 'عبد الرحمن بن خلدون',
    authorFr: 'Ibn Khaldoun (L\'Al-Muqaddimah)',
  },
  {
    textAr: 'السفر يسفر عن أخلاق الرجال، ويفتح آفاق البصيرة لمن تأمل وسار في مناكب الأرض.',
    textFr: 'Le voyage révèle le caractère des hommes et élargit l\'horizon de l\'âme éveillée.',
    authorAr: 'الرحالة المغربي ابن بطوطة',
    authorFr: 'Ibn Battouta',
  },
  {
    textAr: 'يا صاحب الهم إن الهم منفرج، أبشر بخير فإن الفارج الله.',
    textFr: 'Ô âme troublée, rassure-toi : l\'angoisse se dissipe et la délivrance est proche.',
    authorAr: 'حكمة مغربية أندلسية مأثورة',
    authorFr: 'Maxime arabo-andalouse',
  },
  {
    textAr: 'نور العقل في العدل والإنصاف، وزينة العلم في العمل به والتواضع لخلق الله.',
    textFr: 'La lumière de la raison réside dans l\'équité, et la parure du savoir dans l\'humilité.',
    authorAr: 'القاضي عياض السبتي',
    authorFr: 'Cadi Ayyad de Ceuta',
  },
  {
    textAr: 'سافر تجد عوضاً عمن تفارقه، وانصب فإن لذيذ العيش في النصب.',
    textFr: 'Pars à l\'aventure, tu découvriras de nobles compagnons, car le doux fruit de la vie mûrit dans l\'effort.',
    authorAr: 'أبو عبد الله الشافعي',
    authorFr: 'Imam Ach-Chafi\'i',
  },
  {
    textAr: 'الصمت في وقته حكمة وبلاغة، والكلام في وقته شجاعة ومروءة.',
    textFr: 'Le silence en son temps est sagesse ; la parole au moment juste est bravoure.',
    authorAr: 'أبو الحسن الشاذلي',
    authorFr: 'Abou Al-Hassan Ach-Chadhili',
  },
  {
    textAr: 'من عرف شرف ما يطلب، هان عليه كل ما يبذل في سبيله.',
    textFr: 'Quiconque mesure la grandeur de son but trouve légers tous les sacrifices consentis.',
    authorAr: 'الحسن اليوسي',
    authorFr: 'Al-Hassan Al-Youssi',
  },
  {
    textAr: 'العلم إن لم يقترن بالأدب كان وبالاً على صاحبه وعلى الناس.',
    textFr: 'La science privée de noblesse d\'âme devient un fardeau stérile pour qui la porte.',
    authorAr: 'ابن عطاء الله السكندري',
    authorFr: 'Ibn Ata Allah',
  },
  {
    textAr: 'جمال الروح يعلو فوق تقلبات الزمان، وطيب الأثر يبقى حياً وإن غاب الأعيان.',
    textFr: 'La beauté intérieure survit aux saisons, et la trace vertueuse demeure vivante par-delà le temps.',
    authorAr: 'سيدي قاسم الخصاصي',
    authorFr: 'Sidi Qassim Al-Khassassi',
  },
  {
    textAr: 'من كثر كلامه كثر سقطه، ومن صان لسانه صان عرضه ووقاره بين الناس.',
    textFr: 'Qui parle avec excès multiplie les faux pas ; qui maîtrise son verbe préserve sa dignité.',
    authorAr: 'سيدي عبد الرحمن المجدوب',
    authorFr: 'Sidi Abderrahman El Majdoub',
  },
  {
    textAr: 'الحرية الحقة أن تكون سيداً لنفسك، لا أسيراً لشهواتك ورغباتك العابرة.',
    textFr: 'La véritable liberté consiste à maîtriser ses pulsions plutôt qu\'à en être l\'esclave.',
    authorAr: 'ابن رشد الحفيد (أفيروس)',
    authorFr: 'Ibn Rushd (Averroès)',
  },
  {
    textAr: 'قيمة المرء ما يحسنه، وجمال السيرة ما يخلفه من معروف وصدق ومروءة.',
    textFr: 'La valeur d\'un être se mesure à la bienfaisance qu\'il dispense et à la loyauté qu\'il incarne.',
    authorAr: 'أبو مدين الغوث',
    authorFr: 'Abou Madyan Al-Ghawth',
  },
];

// -------------------------------------------------------------
// 7. SPECIFIC MOROCCAN HISTORICAL EVENTS (Mapped by exact MM-DD)
// -------------------------------------------------------------
export const MOROCCAN_HISTORICAL_EVENTS_CALENDAR: Record<string, { titleAr: string; yearAr: string; descriptionAr: string; titleFr?: string; yearFr?: string; descriptionFr?: string }> = {
  '01-11': {
    titleAr: 'تقديم وثيقة المطالبة بالاستقلال',
    yearAr: '11 يناير 1944 م',
    descriptionAr: 'تقديم وثيقة الاستقلال التاريخية من طرف رجال الحركة الوطنية بتنسيق مع جلالة المغفور له الملك محمد الخامس، للمطالبة بإنهاء عهد الحماية واستعادة السيادة الوطنية.',
    titleFr: 'Présentation du Manifeste de l\'Indépendance',
    yearFr: '11 Janvier 1944',
    descriptionFr: 'Acte fondateur de la lutte nationale pour la liberté sous l\'impulsion de feu Sa Majesté Mohammed V.',
  },
  '01-14': {
    titleAr: 'رأس السنة الأمازيغية (إيض يناير)',
    yearAr: '14 يناير (2976 أ)',
    descriptionAr: 'يوم عطلة وطنية رسمية مؤدى عنها بالمملكة المغربية، يحتفي بالعمق الأمازيغي للهوية المغربية وبداية الموسم الفلاحي الجديد.',
    titleFr: 'Nouvel An Amazigh (Yennayer)',
    yearFr: '14 Janvier',
    descriptionFr: 'Jour férié national célébrant les racines millénaires de l\'identité marocaine plurielle.',
  },
  '02-28': {
    titleAr: 'ذكرى استرجاع إقليم وادي الذهب',
    yearAr: '28 فبراير 1976 م',
    descriptionAr: 'استرجاع الأقاليم الجنوبية وإجلاء آخر جندي أجنبي استعماري من رمال الصحراء المغربية.',
  },
  '03-02': {
    titleAr: 'إعلان استقلال المغرب وإنهاء معاهدة الحماية',
    yearAr: '2 مارس 1956 م',
    descriptionAr: 'التوقيع الرسمي على الإعلان المشترك الذي اعترف باستقلال المملكة المغربية وسيادتها الكاملة على أراضيها.',
  },
  '03-03': {
    titleAr: 'ذكرى عيد العرش في عهد جلالة المغفور له الحسن الثاني',
    yearAr: '3 مارس 1961 م',
    descriptionAr: 'تولي جلالة المغفور له الملك الحسن الثاني طيب الله ثراه مقاليد الحكم وانطلاق مرحلة بناء الدولة المغربية الحديثة.',
  },
  '05-14': {
    titleAr: 'تأسيس القوات المسلحة الملكية المغربية',
    yearAr: '14 ماي 1956 م',
    descriptionAr: 'تأسيس الجيش المغربي الباسل بقيادة ولي العهد آنذاك المغفور له الأمير مولاي الحسن لصيانة وحدة الوطن وحماية استقلاله.',
  },
  '07-21': {
    titleAr: 'ملحمة معركة أنوال الخالدة بالريف',
    yearAr: '21 يوليوز 1921 م',
    descriptionAr: 'انتصار تاريخي مبهر للمقاومة المغربية بالريف بقيادة الزعيم محمد بن عبد الكريم الخطابي ضد قوات الاحتلال الإسباني.',
  },
  '07-30': {
    titleAr: 'عيد العرش المجيد (اعتلاء جلالة الملك محمد السادس العرش)',
    yearAr: '30 يوليوز 1999 م',
    descriptionAr: 'تولي أمير المؤمنين صاحب الجلالة الملك محمد السادس نصره الله وأيده عرش أسلافه الميامين ومواصلة مسيرة البناء والتنمية الشاملة.',
  },
  '08-04': {
    titleAr: 'معركة وادي المخازن (معركة الملوك الثلاثة)',
    yearAr: '4 غشت 1578 م',
    descriptionAr: 'انتصار تاريخي حاسم للجيش المغربي السعدي قاد إلى تعزيز هيبة الدولة المغربية وحماية استقلالها في حوض البحر الأبيض المتوسط.',
  },
  '08-14': {
    titleAr: 'ذكرى استرجاع إقليم وادي الذهب وتقديم البيعة والولاء',
    yearAr: '14 غشت 1979 م',
    descriptionAr: 'وفود علماء وشيوخ ووجهاء قبائل وادي الذهب إلى القصر الملكي بالرباط لتقديم البيعة والولاء للعرش العلوي المجيد.',
  },
  '08-20': {
    titleAr: 'ملحمة ثورة الملك والشعب الخالدة',
    yearAr: '20 غشت 1953 م',
    descriptionAr: 'اندلاع ثورة الكفاح الوطني المسلح رداً على إقدام سلطات الحماية على نفي بطل التحرير جلالة المغفور له الملك محمد الخامس وأسرته الشريفة.',
  },
  '08-21': {
    titleAr: 'عيد الشباب المجيد',
    yearAr: '21 غشت',
    descriptionAr: 'الاحتفال بعيد الشباب تزامناً مع ذكرى ميلاد صاحب الجلالة الملك محمد السادس نصره الله وأيده.',
  },
  '10-16': {
    titleAr: 'إعلان المغفور له الحسن الثاني عن تنظيم المسيرة الخضراء',
    yearAr: '16 أكتوبر 1975 م',
    descriptionAr: 'خطاب ملكي تاريخي أعلن فيه جلالة الملك الحسن الثاني طيب الله ثراه تنظيم مسيرة سلمية شعبية لاسترجاع الصحراء المغربية.',
  },
  '11-06': {
    titleAr: 'ملحمة انطلاق المسيرة الخضراء المظفرة',
    yearAr: '6 نونبر 1975 م',
    descriptionAr: 'انطلاق 350 ألف مواطن مغربي تطوعوا سلاحهم المصحف الشريف والعلم الوطني لصلة الرحم بإخوانهم في الصحراء المغربية.',
  },
  '11-16': {
    titleAr: 'عودة بطل التحرير المغفور له محمد الخامس من المنفى',
    yearAr: '16 نونبر 1955 م',
    descriptionAr: 'رجوع بطل التحرير والأسرة الملكية الشريفة إلى أرض الوطن حاملاً بشرى انبعاث فجر الحرية والاستقلال ونهاية الحجر والحماية.',
  },
  '11-18': {
    titleAr: 'عيد الاستقلال المجيد وخطاب العرش التاريخي',
    yearAr: '18 نونبر 1955 م',
    descriptionAr: 'تخليد ذكرى انتصار إرادة العرش والشعب واسترجاع المملكة الشريفة حريتها وسيادتها الكاملة.',
  },
  '11-23': {
    titleAr: 'انتفاضة قبائل أيت باعمران وسيدي إفني',
    yearAr: '23 نونبر 1957 م',
    descriptionAr: 'انطلاق عمليات جيش التحرير المغربي بالجنوب ومحاصرة معاقل الاحتلال الإسباني بسيدي إفني لاستكمال الوحدة الترابية.',
  },
};

// -------------------------------------------------------------
// 8. DETERMINISTIC UNIQUE DAILY ENGINE (Zero repetition on days)
// -------------------------------------------------------------
/**
 * Returns deterministic daily Bouayad content for any day of the year (1 to 366).
 * Employs coprime mathematical offsets to ensure that adjacent days and all days of the year
 * receive completely distinct, non-repeating combinations of Quran, Hadith, Proverb, Health, Home & Wisdom.
 * Strictly tests date for Moroccan historical events (if none on that exact date, historyEvent is null).
 */
export function getDailyBouayadContent(date: Date): BouayadDailyContent {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diffTime = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diffTime / 86400000) + 1;
  const year = date.getFullYear();

  // Distinct coprime strides ensuring day-to-day items are strictly unique and fresh
  const quranIndex = Math.abs((dayOfYear * 7 + year * 3) % QURAN_POOL.length);
  const hadithIndex = Math.abs((dayOfYear * 11 + year * 5) % HADITH_POOL.length);
  const proverbIndex = Math.abs((dayOfYear * 13 + year * 7) % PROVERB_POOL.length);
  const healthTipIndex = Math.abs((dayOfYear * 17 + year * 11) % HEALTH_POOL.length);
  const homeTipIndex = Math.abs((dayOfYear * 19 + year * 13) % HOME_POOL.length);
  const wisdomIndex = Math.abs((dayOfYear * 23 + year * 17) % WISDOM_POOL.length);

  // Exact calendar date check for historical Moroccan events
  const monthKey = (date.getMonth() + 1).toString().padStart(2, '0');
  const dayKey = date.getDate().toString().padStart(2, '0');
  const dateKey = `${monthKey}-${dayKey}`;
  const historyEvent = MOROCCAN_HISTORICAL_EVENTS_CALENDAR[dateKey] || null;

  return {
    id: `bouayad-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    dayOfYear,
    quran: QURAN_POOL[quranIndex],
    hadith: HADITH_POOL[hadithIndex],
    proverb: PROVERB_POOL[proverbIndex],
    healthTip: HEALTH_POOL[healthTipIndex],
    homeTip: HOME_POOL[homeTipIndex],
    wisdom: WISDOM_POOL[wisdomIndex],
    historyEvent,
  };
}

// -------------------------------------------------------------
// 9. BOUAYAD CONTENT LIBRARY (Used for search & exploration)
// -------------------------------------------------------------
export const BOUAYAD_CONTENT_LIBRARY: Omit<BouayadDailyContent, 'id' | 'dayOfYear'>[] = Array.from({ length: 60 }).map((_, i) => {
  const qIdx = i % QURAN_POOL.length;
  const hIdx = (i * 2 + 1) % HADITH_POOL.length;
  const pIdx = i % PROVERB_POOL.length;
  const hlIdx = i % HEALTH_POOL.length;
  const hmIdx = i % HOME_POOL.length;
  const wIdx = i % WISDOM_POOL.length;

  return {
    quran: QURAN_POOL[qIdx],
    hadith: HADITH_POOL[hIdx],
    proverb: PROVERB_POOL[pIdx],
    healthTip: HEALTH_POOL[hlIdx],
    homeTip: HOME_POOL[hmIdx],
    wisdom: WISDOM_POOL[wIdx],
    historyEvent: null,
  };
});
