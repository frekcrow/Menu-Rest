/**
 * KUDO KUDO - Menu & Locations Dataset
 * Separated Data Module
 */

"use strict";

window.XFF_DATA = (function () {
  const MENU_ITEMS = [
    // [ N Series ] HAND-RIPPED NOODLES
    {
      id: "N1",
      sku: "N1",
      englishName: "Spicy Cumin Lamb Hand-Ripped Noodles",
      name: "نودلز لحم الضأن بالكمون الحار (بيانغ بيانغ)",
      category: "noodles",
      categoryName: "نودلز مسحوبة يدوياً",
      description: "النودلز العريضة الأشهر في شيآن تُسحب باليد عند كل طلب. تُقلب مع شرائح لحم الضأن المتبل بالكمون المحمص، البصل الأحمر، الثوم، وزيت الفلفل الحار مع الخل الأسود المعتق.",
      price: 46,
      calories: 780,
      spiceLevel: "🌶️🌶️ حار كلاسيكي",
      badge: "الأكثر شهرة",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "N2",
      sku: "N2",
      englishName: "Spicy Cumin Beef Hand-Ripped Noodles",
      name: "نودلز لحم البقر بالكمون الحار",
      category: "noodles",
      categoryName: "نودلز مسحوبة يدوياً",
      description: "نودلز عريضة طازجة ومطاطية مع شرائح لحم بقر أنجوس طرية متبلة بخلطة الكمون الحارة، الكرفس، والبصل الأخضر، مغمورة بصلصة شيآن الحارة الحامضة.",
      price: 44,
      calories: 740,
      spiceLevel: "🌶️🌶️ حار كلاسيكي",
      badge: "توصية الشيف",
      image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "N3",
      sku: "N3",
      englishName: "Mt. Qi Savory Beef Hand-Ripped Noodles in Soup",
      name: "حساء نودلز جبل تشي بقطع اللحم والخل الأسود",
      category: "noodles",
      categoryName: "نودلز مسحوبة يدوياً",
      description: "شوربة نودلز ساخنة بطعم الخل الحامض المميز، قطع لحم مطبوخة على نار هادئة، فطر أذن الخشب الأسود، مكعبات التوفو، والبيض المقلي المقطع.",
      price: 42,
      calories: 690,
      spiceLevel: "🌶️ معتدل الحار",
      badge: "حساء ساخن",
      image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "N9",
      sku: "N9",
      englishName: "Savory Zha Jiang Hand-Ripped Noodles",
      name: "نودلز تشا جيانغ بصلصة الفاصوليا واللحم المفروم",
      category: "noodles",
      categoryName: "نودلز مسحوبة يدوياً",
      description: "نودلز جافة مسحوبة يدوياً تعلوها صلصة فول الصويا المخمرة مع اللحم المفروم، شرائح الخيار المنعشة، وبراعم الفاصوليا المقرمشة.",
      price: 39,
      calories: 670,
      spiceLevel: "🚫 غير حار",
      badge: "كلاسيك شيآن",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
    },

    // [ B Series ] ROUJIAMO BURGERS
    {
      id: "B1",
      sku: "B1",
      englishName: "Stewed Beef Roujiamo Burger",
      name: "برجر شيآن بلحم البقر المطهو ببطء (روجيامو)",
      category: "burgers",
      categoryName: "برجر وفطائر روجيامو",
      description: "خبز روجيامو المقرمش المحضر طازجاً في الفرن، محشو بلحم البقر المفروم المطهو لساعات في مرق التوابل الصينية العطرية حتى يذوب في الفم.",
      price: 28,
      calories: 450,
      spiceLevel: "🚫 غير حار",
      badge: "الأصل منذ 2005",
      image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "B2",
      sku: "B2",
      englishName: "Spicy Cumin Lamb Roujiamo Burger",
      name: "برجر روجيامو لحم الضأن بالكمون الحار",
      category: "burgers",
      categoryName: "برجر وفطائر روجيامو",
      description: "الساندويتش الأشهر في شوارع شمال غرب الصين: خبز مسطح مقرمش محشو بشرائح لحم الضأن المقلية بالكمون الحار، الفلفل الأخضر، والبصل.",
      price: 29,
      calories: 480,
      spiceLevel: "🌶️🌶️ حار كلاسيكي",
      badge: "الأكثر طلباً",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
    },

    // [ A Series ] LIANG PI & COLD DISHES
    {
      id: "A1",
      sku: "A1",
      englishName: "Liang Pi 'Cold-Skin' Noodles",
      name: "نودلز ليانغ بي الباردة بصلصة الخل وزيت الفلفل",
      category: "liangpi",
      categoryName: "ليانغ بي ومقبلات باردة",
      description: "طبق شيآن الأسطوري: نودلز قمح باردة حريرية مع مكعبات السيتان الاسفنجية التي تمتص صلصة الخل الأسود والثوم وزيت الفلفل الحار، تقدم مع الخيار والكزبرة.",
      price: 26,
      calories: 380,
      spiceLevel: "🌶️🌶️ حار كلاسيكي",
      badge: "نباتي شهير",
      image: "https://images.unsplash.com/photo-1548340748-6d2b7d7da280?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "A2",
      sku: "A2",
      englishName: "Tiger Vegetable Salad",
      name: "سلطة النمر المنعشة بالفلفل والكزبرة",
      category: "liangpi",
      categoryName: "ليانغ بي ومقبلات باردة",
      description: "سلطة صيفية حارقة ومنعشة مكونة من أعواد الفلفل الحار الطازج، الكزبرة الخضراء، الكراث، وزيت السمسم المحمص مع خل الأرز.",
      price: 22,
      calories: 140,
      spiceLevel: "🌶️🌶️ حار",
      badge: "منعش ومقرمش",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "A3",
      sku: "A3",
      englishName: "Smashed Garlic Cucumbers",
      name: "خيار مكسور بصلصة الثوم والخل المعتق",
      category: "liangpi",
      categoryName: "ليانغ بي ومقبلات باردة",
      description: "قطع خيار طازجة مكسورة بالسكين لتمتص التتبيلة الغنية بالثوم المهروس، زيت الفلفل الحار، وزيت السمسم الفاخر.",
      price: 20,
      calories: 110,
      spiceLevel: "🌶️ خفيف",
      badge: "مقبلات",
      image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80"
    },

    // [ F Series ] DUMPLINGS & SOUPS
    {
      id: "F1",
      sku: "F1",
      englishName: "Chang'An Spicy Tofu Custard",
      name: "حلوى التوفو الحارة الدافئة بطريقة تشانغ آن",
      category: "dumplings",
      categoryName: "زلابية وشوربات حارة",
      description: "توفو حريري ناعم يُقدم دافئاً مع مخلل الخضار المقرمش، الكزبرة، فول الصويا المحمص، وصلصات شيآن الحامضة والمالحة.",
      price: 24,
      calories: 220,
      spiceLevel: "🌶️🌶️ حار",
      badge: "توفو طازج",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "F4",
      sku: "F4",
      englishName: "Spicy & Sour Lamb Dumplings (8 pcs)",
      name: "زلابية لحم الضأن في حساء الخل وزيت الفلفل (8 قطع)",
      category: "dumplings",
      categoryName: "زلابية وشوربات حارة",
      description: "زلابية مصنوعة يدوياً ومحشوة بلحم الضأن والتوابل، تسبح في وعاء من صلصة الخل الأسود والزيت الحار مع الكزبرة وبذور السمسم.",
      price: 36,
      calories: 490,
      spiceLevel: "🌶️🌶️ حار كلاسيكي",
      badge: "الأكثر مبيعاً",
      image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80"
    },

    // [ D Series ] DRINKS & TEAS
    {
      id: "D1",
      sku: "D1",
      englishName: "Sour Hawthorn & Plum Herbal Tea",
      name: "مشروب الزعرور والبرقوق المجفف (المهدئ للحرارة)",
      category: "drinks",
      categoryName: "مشروبات الشاي والباشن",
      description: "المشروب التراثي الأول لمرافقة الأطعمة الحارة في شيآن: يُغلى من ثمار الزعرور والبرقوق المدخن وسكر النبات، يُقدم مثلجاً ليهدئ الفم من حرارة الفلفل.",
      price: 18,
      calories: 130,
      spiceLevel: "🚫 غير حار",
      badge: "مهدئ للحرارة",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "D2",
      sku: "D2",
      englishName: "Iced Jasmine Green Tea with Passion Fruit",
      name: "شاي الياسمين الأخضر المنعش بالباشن فروت",
      category: "drinks",
      categoryName: "مشروبات الشاي والباشن",
      description: "شاي أخضر بزهور الياسمين الطبيعية يُحضر بارداً مع لب فاكهة الباشن فروت وأوراق النعناع الطازجة.",
      price: 22,
      calories: 140,
      spiceLevel: "🚫 غير حار",
      badge: "طازج 100%",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const LOCATIONS_DATA = [
    {
      id: "loc-1",
      name: "Flushing Original (المقر الأصلي فلاشينغ)",
      city: "Queens, NY",
      address: "41-10 Main St, Flushing, NY 11355",
      phone: "+1 (212) 786-2068",
      hours: "11:00 AM – 9:00 PM يومياً",
      status: "مفتوح الآن",
      statusType: "open",
      note: "الموقع التاريخي الأصلي تحت مجمع غولدن التجاري"
    },
    {
      id: "loc-2",
      name: "Midtown Manhattan (فرع وسط مانهاتن)",
      city: "Manhattan, NY",
      address: "24 W 45th St, New York, NY 10036",
      phone: "+1 (212) 786-2068",
      hours: "11:00 AM – 8:30 PM",
      status: "مفتوح الآن",
      statusType: "open",
      note: "قريب من تايمز سكوير ومحطة غراند سنترال"
    },
    {
      id: "loc-3",
      name: "Chinatown NYC (حي تشايناتاون)",
      city: "Manhattan, NY",
      address: "45 Bayard St, New York, NY 10013",
      phone: "+1 (212) 786-2068",
      hours: "11:30 AM – 9:00 PM",
      status: "مفتوح الآن",
      statusType: "open",
      note: "قلب الحي الصيني مقابل متنزه كولومبوس"
    },
    {
      id: "loc-4",
      name: "East Village (إيست فيليدج)",
      city: "Manhattan, NY",
      address: "81 St Marks Pl, New York, NY 10003",
      phone: "+1 (212) 786-2068",
      hours: "12:00 PM – 9:30 PM",
      status: "مفتوح الآن",
      statusType: "open",
      note: "شارع سانت ماركس الشهير مأكولات الشارع"
    },
    {
      id: "loc-5",
      name: "Greenpoint Brooklyn (غرينبوينت بروكلين)",
      city: "Brooklyn, NY",
      address: "648 Manhattan Ave, Brooklyn, NY 11222",
      phone: "+1 (212) 786-2068",
      hours: "11:30 AM – 9:00 PM",
      status: "مفتوح الآن",
      statusType: "open",
      note: "مطبخ النودلز السريع وخدمة الاستلام الذاتي"
    }
  ];

  return {
    menu: MENU_ITEMS,
    locations: LOCATIONS_DATA
  };
})();
