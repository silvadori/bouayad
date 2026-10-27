export interface QuadrupleCalendarDate {
  // Gregorian
  gregorian: {
    dayOfWeekFr: string;
    dayOfWeekAr: string;
    day: number;
    monthFr: string;
    monthAr: string;
    year: number;
    formattedFr: string;
    formattedAr: string;
    isHoliday?: boolean;
    holidayName?: string;
  };
  // Hijri
  hijri: {
    day: number;
    monthAr: string;
    monthFr: string;
    year: number;
    formattedAr: string;
    formattedFr: string;
    isSacredMonth: boolean; // Al-Ashhur al-Houroum
  };
  // Agricultural (Fellahi)
  fellahi: {
    day: number;
    monthAr: string;
    monthFr: string;
    year: number;
    formattedAr: string;
    formattedFr: string;
    manzilah: ManzilahInfo;
    seasonNameAr: string;
    seasonNameFr: string;
    agriculturalNoteAr: string;
    agriculturalNoteFr: string;
  };
  // Amazigh
  amazigh: {
    day: number;
    monthAr: string;
    monthFr: string;
    monthTifinagh: string;
    year: number;
    formattedFr: string;
    formattedAr: string;
  };
  // Moon phase
  moonPhase: {
    phaseNameFr: string;
    phaseNameAr: string;
    illumination: number; // 0 to 100%
    emoji: string;
  };
}

export interface ManzilahInfo {
  index: number;
  nameAr: string;
  nameFr: string;
  starAr: string;
  starFr: string;
  startDateFellahi: string;
  proverbAr: string;
  proverbFr: string;
  descriptionAr: string;
  descriptionFr: string;
}

// 28 Agricultural Mansions (المنازل الفلاحية المغربية)
export const MOROCCAN_MANAZIL: ManzilahInfo[] = [
  {
    index: 1,
    nameAr: 'الشرطان',
    nameFr: 'Ach-Charatane',
    starAr: 'النطح (برج الحمل)',
    starFr: 'Alnath (Bélier)',
    startDateFellahi: '23 مارس',
    proverbAr: 'إيلا دخلت الشرطان، حرث الفول واقعد فرحان.',
    proverbFr: 'Quand entre Ach-Charatane, sème les fèves et sois serein.',
    descriptionAr: 'أولى منازل فصل الربيع، اعتدال الطقس وازدهار الطبيعة.',
    descriptionFr: 'Première mansion du printemps, équilibre météorologique et floraison.',
  },
  {
    index: 2,
    nameAr: 'البطين',
    nameFr: 'Al-Boutayane',
    starAr: 'بطن الحمل',
    starFr: 'Botein',
    startDateFellahi: '5 أبريل',
    proverbAr: 'إيلا طلع البطين، احرث اللي بقا في الطين.',
    proverbFr: 'Quand paraît Al-Boutayane, termine les semis dans la terre humide.',
    descriptionAr: 'منزلة معتدلة، تلائم زراعة الخضروات الصيفية والبطيخ.',
    descriptionFr: 'Période propice à la plantation des légumes d\'été et pastèques.',
  },
  {
    index: 3,
    nameAr: 'الثريا',
    nameFr: 'Ath-Thouraya (Les Pléiades)',
    starAr: 'عنقود الثريا',
    starFr: 'Pléiades',
    startDateFellahi: '18 أبريل',
    proverbAr: 'إيلا طلعت الثريا عشا، ابتغي لها من المطر رشا.',
    proverbFr: 'Quand les Pléiades montent au crépuscule, espère une douce ondée.',
    descriptionAr: 'منزلة مباركة في التراث المغربي، ترتبط بنمو السنابل وصفاء الجو.',
    descriptionFr: 'Mansion bénie dans la mémoire marocaine, croissance des épis.',
  },
  {
    index: 4,
    nameAr: 'الدبران',
    nameFr: 'Ad-Dabarane',
    starAr: 'عين الثور',
    starFr: 'Aldébaran',
    startDateFellahi: '1 ماي',
    proverbAr: 'إيلا طلع الدبران، توقد النيران ويسيل العرق على الأبدان.',
    proverbFr: 'Quand monte Ad-Dabarane, les premières chaleurs réchauffent la terre.',
    descriptionAr: 'بداية اشتداد الدفء، نضج الحبوب الباكرة وبدء حصاد الشعير في الجنوب.',
    descriptionFr: 'Hausse des températures, maturation des orges précoces dans le Sud.',
  },
  {
    index: 5,
    nameAr: 'الهقعة',
    nameFr: 'Al-Haq\'ah',
    starAr: 'رأس الجوزاء',
    starFr: 'Meissa (Orion)',
    startDateFellahi: '14 ماي',
    proverbAr: 'إيلا طلعت الهقعة، نزلت على كل ذرة بقعة.',
    proverbFr: 'Sous Al-Haq\'ah, chaque grain d\'épi se gorge de soleil.',
    descriptionAr: 'يباس الزرع واكتمال استوائه، بدء الاستعداد لموسم الحصاد (الغلة).',
    descriptionFr: 'Durcissement des grains, préparation des faucilles pour la moisson.',
  },
  {
    index: 6,
    nameAr: 'الهنعة',
    nameFr: 'Al-Han\'ah',
    starAr: 'قدم الجوزاء',
    starFr: 'Alhena (Gémeaux)',
    startDateFellahi: '27 ماي',
    proverbAr: 'في الهنعة، طابت الفقعة وثقلت الرقعة.',
    proverbFr: 'En Al-Han\'ah, les fruits s\'alourdissent et mûrissent.',
    descriptionAr: 'أوج الحصاد في السهول المغربية (الشاوية، الغرب، الحوز).',
    descriptionFr: 'Plein essor de la moisson dans les plaines de la Chaouia et du Gharb.',
  },
  {
    index: 7,
    nameAr: 'الذراع',
    nameFr: 'Ad-Dhira\'',
    starAr: 'رأس التوأم المؤخر',
    starFr: 'Pollux',
    startDateFellahi: '9 يونيو',
    proverbAr: 'إيلا طلع الذراع، حسك الكراع وتفرش القاع.',
    proverbFr: 'Quand vient Ad-Dhira\', la paille dorée couvre les aires de battage.',
    descriptionAr: 'دخول فصل الصيف، نقل المحاصيل إلى النادر (المدرس) ودرس الحبوب.',
    descriptionFr: 'Entrée officielle de l\'été, battage traditionnel du blé.',
  },
  {
    index: 8,
    nameAr: 'النثرة',
    nameFr: 'An-Nathrah',
    starAr: 'معلف السرطان',
    starFr: 'Praesepe',
    startDateFellahi: '22 يونيو',
    proverbAr: 'إيلا طلعت النثرة، لا تخل في الزرع قطرة.',
    proverbFr: 'Durant An-Nathrah, termine la récolte jusqu\'au dernier grain.',
    descriptionAr: 'أطول أيام السنة نهاراً، تجفيف البقوليات وجمع التبن.',
    descriptionFr: 'Solstice d\'été, stockage de la paille et séchage des légumineuses.',
  },
  {
    index: 9,
    nameAr: 'الطرف',
    nameFr: 'At-Tarf',
    starAr: 'عيني الأسد',
    starFr: 'Alterf (Lion)',
    startDateFellahi: '5 يوليوز',
    proverbAr: 'في الطرف، يطيب العنب والرطب والترف.',
    proverbFr: 'Dans At-Tarf, mûrissent les premiers raisins et les figues douces.',
    descriptionAr: 'نضج بواكير الفواكه الصيفية كالتين (الكرموس) والعنب والدلاح.',
    descriptionFr: 'Éclosion des premières figues douces marocaines et melons.',
  },
  {
    index: 10,
    nameAr: 'الجبهة',
    nameFr: 'Al-Jabhah',
    starAr: 'جبهة الأسد',
    starFr: 'Regulus (Lion)',
    startDateFellahi: '18 يوليوز',
    proverbAr: 'إيلا دخلت الجبهة، دخلت السمايم بشدتها وفرحتها.',
    proverbFr: 'L\'arrivée d\'Al-Jabhah annonce les quarante jours chauds des Smayem.',
    descriptionAr: 'دخول فترة السمايم (أربعينية الصيف)، حرارة عالية مفيدة لنضج التمور.',
    descriptionFr: 'Début des Smayem, chaleur intense qui sublime les dattes des oasis.',
  },
  {
    index: 11,
    nameAr: 'الزبرة',
    nameFr: 'Az-Zoubrah',
    starAr: 'ظهر الأسد',
    starFr: 'Zosma',
    startDateFellahi: '1 غشت',
    proverbAr: 'في الزبرة، تعقد التمرة وتطيب الحمرة.',
    proverbFr: 'En Az-Zoubrah, la datte prend sa texture mielleuse dans le Tafilalet.',
    descriptionAr: 'اشتداد الحرارة، جني التين والعنب، تهيئة الصوف وغسلها.',
    descriptionFr: 'Vendanges et séchage traditionnel des figues au soleil.',
  },
  {
    index: 12,
    nameAr: 'الصرفة',
    nameFr: 'As-Sarfah',
    starAr: 'ذنب الأسد',
    starFr: 'Denebola',
    startDateFellahi: '14 غشت',
    proverbAr: 'الصرفة انصراف الحر وبداية تباشير البرد.',
    proverbFr: 'As-Sarfah détourne la canicule et invite la première fraîcheur nocturne.',
    descriptionAr: 'انصراف الحرارة الشديدة وقرب انقضاء السمايم، هبوب نسائم ليلية لطيفة.',
    descriptionFr: 'Retrait progressif des grosses chaleurs, nuits plus tempérées.',
  },
  {
    index: 13,
    nameAr: 'العواء',
    nameFr: 'Al-\'Awwa',
    starAr: 'كوكبة العذراء',
    starFr: 'Porrima (Vierge)',
    startDateFellahi: '27 غشت',
    proverbAr: 'إيلا طلع العوا، طاب التمر واستوى.',
    proverbFr: 'Quand Al-\'Awwa s\'élève, les dattes Majhoul sont prêtes à cueillir.',
    descriptionAr: 'نهاية الصيف، بدء جني الرمان والتمور في واحات درعة وتافيلالت.',
    descriptionFr: 'Cueillette des grenades et premières récoltes dattières du Sud.',
  },
  {
    index: 14,
    nameAr: 'السماك',
    nameFr: 'As-Simak',
    starAr: 'السماك الأعزل',
    starFr: 'Spica',
    startDateFellahi: '9 شتنبر',
    proverbAr: 'إيلا دخل السماك، خفف على فدانك وشمر على ذراعك.',
    proverbFr: 'Quand paraît As-Simak, prépare ta charrue pour la nouvelle saison.',
    descriptionAr: 'بداية الخريف، حرث البواكير وإعداد الأرض للحبوب الخريفية.',
    descriptionFr: 'Début de l\'automne, préparation des sols pour les semailles.',
  },
  {
    index: 15,
    nameAr: 'الغفر',
    nameFr: 'Al-Ghafr',
    starAr: 'قدم العذراء',
    starFr: 'Syrma',
    startDateFellahi: '22 شتنبر',
    proverbAr: 'في الغفر، كب الماء واطلب المطر.',
    proverbFr: 'Dans Al-Ghafr, regarde le ciel et espère les premières pluies d\'automne.',
    descriptionAr: 'الاعتدال الخريفي، تراجع ساعات النهار وترقب أمطار الخريف الأولى (البكور).',
    descriptionFr: 'Équinoxe d\'automne, attente des premières pluies bienfaitrices.',
  },
  {
    index: 16,
    nameAr: 'الزبانى',
    nameFr: 'Az-Zoubana',
    starAr: 'قرنا العقرب',
    starFr: 'Zubenelgenubi (Balance)',
    startDateFellahi: '5 أكتوبر',
    proverbAr: 'إيلا دخلت الزبانى، دير الزيتون في السواني.',
    proverbFr: 'Quand vient Az-Zoubana, les olives mûrissent sur les rameaux.',
    descriptionAr: 'بداية قطاف الزيتون الأخضر والأسود، انخفاض محسوس في درجات الحرارة.',
    descriptionFr: 'Début de la cueillette des olives et première trituration de l\'huile.',
  },
  {
    index: 17,
    nameAr: 'الإكليل',
    nameFr: 'Al-Iklil',
    starAr: 'تاج العقرب',
    starFr: 'Acrab (Scorpion)',
    startDateFellahi: '18 أكتوبر',
    proverbAr: 'في الإكليل، يقصر النهار ويطول الليل.',
    proverbFr: 'Durant Al-Iklil, les jours raccourcissent et les soirées s\'étirent.',
    descriptionAr: 'موسم الحرث الأساسي، هطول أمطار الخريف النافعة التي تدعى "أمطار وسمي".',
    descriptionFr: 'Grande période des labours d\'automne et semailles du blé dur.',
  },
  {
    index: 18,
    nameAr: 'القلب',
    nameFr: 'Al-Qalb',
    starAr: 'قلب العقرب',
    starFr: 'Antarès',
    startDateFellahi: '31 أكتوبر',
    proverbAr: 'إيلا طلع القلب، سال الواد بالحلب.',
    proverbFr: 'Quand Al-Qalb brille, les oueds chantent sous les pluies d\'automne.',
    descriptionAr: 'اشتداد أعمال الفلاحة، عصر الزيتون في المعاصر التقليدية والعصرية.',
    descriptionFr: 'Plein essor des pressoirs d\'huile d\'olive à Fès, Meknès et Béni Mellal.',
  },
  {
    index: 19,
    nameAr: 'الشولة',
    nameFr: 'Ach-Chawlah',
    starAr: 'إبرة العقرب',
    starFr: 'Shaula (Scorpion)',
    startDateFellahi: '13 نونبر',
    proverbAr: 'في الشولة، تبرد القولة وتسخن الجولة.',
    proverbFr: 'En Ach-Chawlah, le vent frais s\'installe et rassemble les familles.',
    descriptionAr: 'تساقط أوراق الأشجار، اشتداد برودة الصباح، نهاية الحرث الباكر.',
    descriptionFr: 'Chute des feuilles dorées, matins frisquets, fin des labours précoces.',
  },
  {
    index: 20,
    nameAr: 'النعائم',
    nameFr: 'An-Na\'ayem',
    starAr: 'كوكبة الرامي',
    starFr: 'Kaus Australis (Sagittaire)',
    startDateFellahi: '26 نونبر',
    proverbAr: 'في النعائم، توقد النيران في الصرايم.',
    proverbFr: 'Sous An-Na\'ayem, le brasero (Mejmar) réchauffe les foyers.',
    descriptionAr: 'قرب دخول الشتاء الفعلي، غرس الأشجار المثمرة وتشذيب الكروم.',
    descriptionFr: 'Taille des vignes et préparation des vergers pour l\'hiver.',
  },
  {
    index: 21,
    nameAr: 'البلدة',
    nameFr: 'Al-Baldah',
    starAr: 'فراغ في الرامي',
    starFr: 'Albaldah',
    startDateFellahi: '9 دجنبر',
    proverbAr: 'إيلا دخلت البلدة، حممت كل مبلدة ولبس الكساوي المجلدة.',
    proverbFr: 'Avec Al-Baldah, le froid s\'affirme et l\'on sort les djellabas de laine.',
    descriptionAr: 'دخول الليالي البيض، بداية أشد أوقات السنة برودة في الأطلس والسهول.',
    descriptionFr: 'Entrée des Layali Byd (les Nuits Blanches), froid mordant d\'hiver.',
  },
  {
    index: 22,
    nameAr: 'سعد الذابح',
    nameFr: 'Sa\'d adh-Dhabih',
    starAr: 'قرن الجدي',
    starFr: 'Dabih (Capricorne)',
    startDateFellahi: '22 دجنبر',
    proverbAr: 'سعد الذابح، ما كاين لا كلب نابح ولا راعي سارح من شدة البرد.',
    proverbFr: 'Sa\'d adh-Dhabih : le froid est si vif que nul berger ne s\'éloigne.',
    descriptionAr: 'الانقلاب الشتوي، أطول ليالي السنة، قمة الليالي السود، صقيع وثلوج الجبال.',
    descriptionFr: 'Solstice d\'hiver, gelées matinales et abondance de neige sur l\'Atlas.',
  },
  {
    index: 23,
    nameAr: 'سعد بلع',
    nameFr: 'Sa\'d Bula\'',
    starAr: 'يد الدلو',
    starFr: 'Albali (Verseau)',
    startDateFellahi: '4 يناير',
    proverbAr: 'سعد بلع، تبلع الأرض ما نزل من المطر ويسيل كل تلع.',
    proverbFr: 'Sa\'d Bula\' : la terre assoiffée absorbe goulûment les ondées.',
    descriptionAr: 'امتصاص التربة للمياه، جريان العيون وتغذية الفرشات المائية الجوفية.',
    descriptionFr: 'Nourrissement des nappes phréatiques marocaines, sources vives.',
  },
  {
    index: 24,
    nameAr: 'سعد السعود',
    nameFr: 'Sa\'d as-Su\'ud',
    starAr: 'منكب الدلو',
    starFr: 'Sadalsuud (Verseau)',
    startDateFellahi: '17 يناير',
    proverbAr: 'في سعد السعود، كيدور الماء في العود وكيدفا كل مبرود.',
    proverbFr: 'En Sa\'d as-Su\'ud, la sève remonte dans le bois et la terre tiédit.',
    descriptionAr: 'سريان العصارة في جذوع الأشجار وبداية انتفاخ البراعم، خروج الليالي.',
    descriptionFr: 'Montée de la sève dans les amandiers et figuiers, fin des Layali.',
  },
  {
    index: 25,
    nameAr: 'سعد الأخبية',
    nameFr: 'Sa\'d al-Akhbiyah',
    starAr: 'ساق الدلو',
    starFr: 'Sadachbia',
    startDateFellahi: '30 يناير',
    proverbAr: 'في سعد الأخبية، تخرج الحشرات والحيايا وتتزين الدنيا بالخضورية.',
    proverbFr: 'Sous Sa\'d al-Akhbiyah, la nature sort de sa torpeur et verdit.',
    descriptionAr: 'ازدهار أزهار اللوز بمدينة تافراوت وسوس، تباشير الربيع.',
    descriptionFr: 'Floraison spectaculaire des amandiers de Tafraout et du Souss.',
  },
  {
    index: 26,
    nameAr: 'المقدم (الفرغ الأول)',
    nameFr: 'Al-Moukaddam',
    starAr: 'منكب الفرس',
    starFr: 'Markab (Pégase)',
    startDateFellahi: '12 فبراير',
    proverbAr: 'المقدم يفتح أبواب النعم ويسمن البهم.',
    proverbFr: 'Al-Moukaddam ouvre les portes de l\'abondance pour les pâturages.',
    descriptionAr: 'وفرة العشب والمراعي، ولادة الخراف والماعز ووفور الحليب والزبدة البلدية.',
    descriptionFr: 'Pâturages généreux, naissance des agneaux et beurre fermier frais.',
  },
  {
    index: 27,
    nameAr: 'المؤخر (الفرغ الثاني)',
    nameFr: 'Al-Mouakhar',
    starAr: 'جناح الفرس',
    starFr: 'Algenib (Pégase)',
    startDateFellahi: '25 فبراير',
    proverbAr: 'في المؤخر، كيخضر الشجر ويطيب النظر.',
    proverbFr: 'En Al-Mouakhar, le paysage marocain revêt son manteau d\'émeraude.',
    descriptionAr: 'فترة الحسوم (رياح باردة متقلبة)، تفتح أزهار البساتين في كل ربوع المغرب.',
    descriptionFr: 'Période des brises d\'El-Houssom, vergers en pleine floraison.',
  },
  {
    index: 28,
    nameAr: 'الرشاء (بطن الحوت)',
    nameFr: 'Ar-Racha (Batn al-Hout)',
    starAr: 'السمكة المتطاولة',
    starFr: 'Alrescha (Poissons)',
    startDateFellahi: '10 مارس',
    proverbAr: 'في الرشا، طاب اللبن ودفا العشا.',
    proverbFr: 'Au temps d\'Ar-Racha, le lait de brebis embaume et les soirs s\'adoucissent.',
    descriptionAr: 'نهاية السنة الفلاحية الفلكية واكتمال الدورة، استقبال الربيع الجديد.',
    descriptionFr: 'Clôture du cycle agricole annuel et accueil du renouveau printanier.',
  },
];

const GREGORIAN_MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const GREGORIAN_MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو',
  'يوليوز', 'غشت', 'شتنبر', 'أكتوبر', 'نونبر', 'دجنبر'
];

const DAYS_OF_WEEK_FR = [
  'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
];

const DAYS_OF_WEEK_AR = [
  'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
];

const HIJRI_MONTHS = [
  { ar: 'المُحَرَّم', fr: 'Al-Mouharram', sacred: true },
  { ar: 'صَفَر', fr: 'Safar', sacred: false },
  { ar: 'رَبِيع الأَوَّل', fr: 'Rabi\' al-Awwal', sacred: false },
  { ar: 'رَبِيع الآخِر', fr: 'Rabi\' al-Thani', sacred: false },
  { ar: 'جُمَادَى الأُولَى', fr: 'Joumada al-Oula', sacred: false },
  { ar: 'جُمَادَى الآخِرَة', fr: 'Joumada al-Thania', sacred: false },
  { ar: 'رَجَب', fr: 'Rajab', sacred: true },
  { ar: 'شَعْبَان', fr: 'Cha\'ban', sacred: false },
  { ar: 'رَمَضَان', fr: 'Ramadan', sacred: false },
  { ar: 'شَوَّال', fr: 'Chawwal', sacred: false },
  { ar: 'ذُو القَعْدَة', fr: 'Dhu al-Qi\'da', sacred: true },
  { ar: 'ذُو الحِجَّة', fr: 'Dhu al-Hijja', sacred: true },
];

const FELLAHI_MONTHS = [
  { ar: 'ينّاير', fr: 'Yennayer' },
  { ar: 'فبرايْر', fr: 'Febrayer' },
  { ar: 'مارسْ', fr: 'Mars' },
  { ar: 'كبريلْ', fr: 'Kabril' },
  { ar: 'مايُو', fr: 'Mayu' },
  { ar: 'يونيُو', fr: 'Yunyu' },
  { ar: 'يوليُوز', fr: 'Yulyuz' },
  { ar: 'غشتْ', fr: 'Ghust' },
  { ar: 'شتنبرْ', fr: 'Shtember' },
  { ar: 'كتوبرْ', fr: 'Ktubr' },
  { ar: 'نونبرْ', fr: 'Nuwanbir' },
  { ar: 'دجنبرْ', fr: 'Dujanbir' },
];

const AMAZIGH_MONTHS = [
  { ar: 'يناير', fr: 'Yennayer', tifinagh: 'ⵢⴻⵏⵏⴰⵢⴻⵔ' },
  { ar: 'فورار', fr: 'Furar', tifinagh: 'ⴼⵓⵔⴰⵔ' },
  { ar: 'ماغريس', fr: 'Meghres', tifinagh: 'ⵎⴻⵖⵔⴻⵙ' },
  { ar: 'إيبرير', fr: 'Ibrir', tifinagh: 'ⵉⴱⵔⵉⵔ' },
  { ar: 'مايو', fr: 'Mayyu', tifinagh: 'ⵎⴰⵢⵢⵓ' },
  { ar: 'يونيو', fr: 'Yunyu', tifinagh: 'ⵢⵓⵏⵢⵓ' },
  { ar: 'يوليوز', fr: 'Yulyuz', tifinagh: 'ⵢⵓⵍⵢⵓⵣ' },
  { ar: 'غشت', fr: 'Ghust', tifinagh: 'ⵖⵓⵛⵜ' },
  { ar: 'شتنبر', fr: 'Shtember', tifinagh: 'ⵛⵜⴻⵎⴱⴻⵔ' },
  { ar: 'كتوبر', fr: 'Ktubr', tifinagh: 'ⴽⵜⵓⴱⴻⵔ' },
  { ar: 'نوانبر', fr: 'Nuwanbir', tifinagh: 'ⵏⵓⵡⴰⵏⴱⵉⵔ' },
  { ar: 'دوجانبير', fr: 'Dujanbir', tifinagh: 'ⴷⵓⵊⴰⵏⴱⵉⵔ' },
];

// Moroccan official and religious dates check
function getMoroccanSpecialDay(month: number, day: number): string | undefined {
  // Gregorian celebrations
  if (month === 0 && day === 1) return 'Nouvel An Grégorien / رأس السنة الميلادية';
  if (month === 0 && day === 11) return 'Manifeste de l\'Indépendance / تقديم وثيقة الاستقلال';
  if (month === 0 && day === 14) return 'Nouvel An Amazigh / رأس السنة الأمازيغية (Yennayer)';
  if (month === 4 && day === 1) return 'Fête du Travail / عيد الشغل';
  if (month === 6 && day === 30) return 'Fête du Trône / عيد العرش المجيد';
  if (month === 7 && day === 14) return 'Allégeance Oued Ed-Dahab / ذكرى استرجاع وادي الذهب';
  if (month === 7 && day === 20) return 'Révolution du Roi et du Peuple / ثورة الملك والشعب';
  if (month === 7 && day === 21) return 'Fête de la Jeunesse / عيد الشباب';
  if (month === 10 && day === 6) return 'Anniversaire de la Marche Verte / ذكرى المسيرة الخضراء المظفرة';
  if (month === 10 && day === 18) return 'Fête de l\'Indépendance / عيد الاستقلال المجيد';
  return undefined;
}

/**
 * Calibrated Moroccan visual sighting Hijri converter anchored to 12 Joumada al-Oula 1448
 * for 2026-10-23 (as observed in Morocco).
 */
export function calculateHijri(date: Date, offsetDays: number = 0): { day: number; monthIndex: number; year: number } {
  // Anchor: 23 October corresponds to 12 Joumada al-Oula (monthIndex 4) 1448 H
  const targetYear = date.getFullYear();
  const targetMonth = date.getMonth(); // 0-indexed (9 is October)
  const targetDay = date.getDate();

  // Compare noon to noon to prevent DST/timezone artifacts
  const anchorDate = new Date(targetYear, 9, 23, 12, 0, 0);
  const targetDateOnly = new Date(targetYear, targetMonth, targetDay, 12, 0, 0);
  let diff = Math.round((targetDateOnly.getTime() - anchorDate.getTime()) / 86400000) + offsetDays;

  // Month lengths for Islamic calendar (alternating 30 and 29)
  const getMonthLength = (mIdx: number, yr: number) => {
    if (mIdx === 11) {
      // Leap years in 30-year cycle: years 2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29
      const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
      const cycleYear = yr % 30;
      return leapYears.includes(cycleYear) ? 30 : 29;
    }
    return mIdx % 2 === 0 ? 30 : 29;
  };

  let day = 12;
  let monthIndex = 4; // Joumada al-Oula
  let year = 1448;

  if (diff > 0) {
    while (diff > 0) {
      const monthLen = getMonthLength(monthIndex, year);
      const daysLeftInMonth = monthLen - day;
      if (diff <= daysLeftInMonth) {
        day += diff;
        diff = 0;
      } else {
        diff -= (daysLeftInMonth + 1);
        day = 1;
        monthIndex++;
        if (monthIndex > 11) {
          monthIndex = 0;
          year++;
        }
      }
    }
  } else if (diff < 0) {
    diff = -diff;
    while (diff > 0) {
      if (diff < day) {
        day -= diff;
        diff = 0;
      } else {
        diff -= day;
        monthIndex--;
        if (monthIndex < 0) {
          monthIndex = 11;
          year--;
        }
        day = getMonthLength(monthIndex, year);
      }
    }
  }

  return { day, monthIndex, year };
}

/**
 * Traditional Moroccan Fellahi (agricultural) calendar calculation.
 * The Fellahi calendar runs 13 days behind the Gregorian calendar (Julian solar calendar).
 * Year begins on January 14 Gregorian (1st Yennayer Fellahi).
 */
export function calculateFellahi(date: Date): { day: number; monthIndex: number; year: number; manzilah: ManzilahInfo } {
  // Shift by 13 days
  const fellahiDate = new Date(date.getTime() - 13 * 86400000);
  const day = fellahiDate.getDate();
  const monthIndex = fellahiDate.getMonth();
  const year = fellahiDate.getFullYear();

  // Determine the Manzilah (there are 28 mansions starting approx March 23rd)
  // Day of year in fellahi calendar
  const startOfYear = new Date(fellahiDate.getFullYear(), 0, 1);
  const diffTime = fellahiDate.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diffTime / 86400000) + 1; // 1 to 366

  // Manzilah index roughly calculated based on 13.04 days per mansion
  // Manzilah 1 (Ash-Charatane) begins on March 23 Fellahi (approx day 82)
  let manzilahOffset = dayOfYear - 82;
  if (manzilahOffset < 0) manzilahOffset += 365;
  const manzilahIndex = Math.floor(manzilahOffset / 13.04) % 28;
  const manzilah = MOROCCAN_MANAZIL[manzilahIndex] || MOROCCAN_MANAZIL[0];

  return { day, monthIndex, year, manzilah };
}

/**
 * Amazigh calendar calculation:
 * The Amazigh agricultural year is Gregorian year + 950.
 * In 2026 -> 2976.
 */
export function calculateAmazigh(date: Date): { day: number; monthIndex: number; year: number } {
  const fellahi = calculateFellahi(date);
  return {
    day: fellahi.day,
    monthIndex: fellahi.monthIndex,
    year: fellahi.year + 950,
  };
}

/**
 * Calculates moon phase information for the given date
 */
export function calculateMoonPhase(date: Date): { phaseNameFr: string; phaseNameAr: string; illumination: number; emoji: string } {
  const knownNewMoon = new Date('2000-01-06T18:14:00Z').getTime();
  const synodicMonth = 29.53058867 * 86400000;
  const diff = date.getTime() - knownNewMoon;
  const phaseCycle = (diff % synodicMonth) / synodicMonth;
  const phaseDays = phaseCycle * 29.53;
  const illumination = Math.round((0.5 - 0.5 * Math.cos(phaseCycle * 2 * Math.PI)) * 100);

  if (phaseDays < 1.84) return { phaseNameFr: 'Nouvelle Lune', phaseNameAr: 'المحاق / هلال جديد', illumination, emoji: '🌑' };
  if (phaseDays < 5.53) return { phaseNameFr: 'Premier Croissant', phaseNameAr: 'الهلال المتزايد', illumination, emoji: '🌒' };
  if (phaseDays < 9.22) return { phaseNameFr: 'Premier Quartier', phaseNameAr: 'التربيع الأول', illumination, emoji: '🌓' };
  if (phaseDays < 12.91) return { phaseNameFr: 'Lune Gibbeuse Croissante', phaseNameAr: 'الأحدب المتزايد', illumination, emoji: '🌔' };
  if (phaseDays < 16.61) return { phaseNameFr: 'Pleine Lune (Badr)', phaseNameAr: 'بدر التمام (ليالي البيض)', illumination, emoji: '🌕' };
  if (phaseDays < 20.30) return { phaseNameFr: 'Lune Gibbeuse Décroissante', phaseNameAr: 'الأحدب المتناقص', illumination, emoji: '🌖' };
  if (phaseDays < 23.99) return { phaseNameFr: 'Dernier Quartier', phaseNameAr: 'التربيع الثاني', illumination, emoji: '🌗' };
  return { phaseNameFr: 'Dernier Croissant', phaseNameAr: 'الهلال المتناقص', illumination, emoji: '🌘' };
}

/**
 * Build the complete Quadruple Calendar representation for any date
 */
export function getQuadrupleCalendar(date: Date, hijriOffset: number = 0): QuadrupleCalendarDate {
  // Gregorian
  const dayOfWeekIdx = date.getDay();
  const day = date.getDate();
  const monthIdx = date.getMonth();
  const year = date.getFullYear();

  const dayOfWeekFr = DAYS_OF_WEEK_FR[dayOfWeekIdx];
  const dayOfWeekAr = DAYS_OF_WEEK_AR[dayOfWeekIdx];
  const monthFr = GREGORIAN_MONTHS_FR[monthIdx];
  const monthAr = GREGORIAN_MONTHS_AR[monthIdx];
  const holidayName = getMoroccanSpecialDay(monthIdx, day);

  // Hijri
  const hijriCalc = calculateHijri(date, hijriOffset);
  const hijriMonthObj = HIJRI_MONTHS[hijriCalc.monthIndex];

  // Fellahi
  const fellahiCalc = calculateFellahi(date);
  const fellahiMonthObj = FELLAHI_MONTHS[fellahiCalc.monthIndex];

  // Amazigh
  const amazighCalc = calculateAmazigh(date);
  const amazighMonthObj = AMAZIGH_MONTHS[amazighCalc.monthIndex];

  // Moon
  const moon = calculateMoonPhase(date);

  // Fellahi season description
  let seasonNameAr = 'الربيع';
  let seasonNameFr = 'Printemps';
  if (monthIdx === 11 || monthIdx === 0 || monthIdx === 1) {
    seasonNameAr = 'الشتاء (الليالي)';
    seasonNameFr = 'Hiver (Layali)';
  } else if (monthIdx >= 5 && monthIdx <= 7) {
    seasonNameAr = 'الصيف (السمايم)';
    seasonNameFr = 'Été (Smayem)';
  } else if (monthIdx >= 8 && monthIdx <= 10) {
    seasonNameAr = 'الخريف (الحرث)';
    seasonNameFr = 'Automne (Labours)';
  }

  return {
    gregorian: {
      dayOfWeekFr,
      dayOfWeekAr,
      day,
      monthFr,
      monthAr,
      year,
      formattedFr: `${dayOfWeekFr} ${day} ${monthFr} ${year}`,
      formattedAr: `${dayOfWeekAr} ${day} ${monthAr} ${year}`,
      isHoliday: !!holidayName,
      holidayName,
    },
    hijri: {
      day: hijriCalc.day,
      monthAr: hijriMonthObj.ar,
      monthFr: hijriMonthObj.fr,
      year: hijriCalc.year,
      formattedAr: `${hijriCalc.day} ${hijriMonthObj.ar} ${hijriCalc.year} هـ`,
      formattedFr: `${hijriCalc.day} ${hijriMonthObj.fr} ${hijriCalc.year} H`,
      isSacredMonth: hijriMonthObj.sacred,
    },
    fellahi: {
      day: fellahiCalc.day,
      monthAr: fellahiMonthObj.ar,
      monthFr: fellahiMonthObj.fr,
      year: fellahiCalc.year,
      formattedAr: `${fellahiCalc.day} ${fellahiMonthObj.ar} فلاحي`,
      formattedFr: `${fellahiCalc.day} ${fellahiMonthObj.fr} (Agricole)`,
      manzilah: fellahiCalc.manzilah,
      seasonNameAr,
      seasonNameFr,
      agriculturalNoteAr: fellahiCalc.manzilah.proverbAr,
      agriculturalNoteFr: fellahiCalc.manzilah.proverbFr,
    },
    amazigh: {
      day: amazighCalc.day,
      monthAr: amazighMonthObj.ar,
      monthFr: amazighMonthObj.fr,
      monthTifinagh: amazighMonthObj.tifinagh,
      year: amazighCalc.year,
      formattedFr: `${amazighCalc.day} ${amazighMonthObj.fr} ${amazighCalc.year}`,
      formattedAr: `${amazighCalc.day} ${amazighMonthObj.ar} ${amazighCalc.year} أ`,
    },
    moonPhase: moon,
  };
}
