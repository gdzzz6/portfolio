/* ---- Translations ---- */
const translations = {
  en: {
    nav: { about: "Our Story", menu: "Menu", gallery: "Space", contact: "Visit", menuAria: "Menu" },
    lang: { ariaLabel: "Change language" },
    hero: {
      badge: "☕ Voted Best Coffee House 2025",
      eyebrow: "Roasting since 2015",
      title: "Coffee that starts<br>the morning <em>right</em>",
      text: "We roast our own beans, brew with care, and serve with pride. Step in — your morning is about to get better.",
      btnMenu: "View Menu",
      btnFind: "Find Us",
      proof: "<strong>2,400+</strong> regulars trust their morning to us",
      ratingCount: "1,240+ reviews",
      roastEyebrow: "Today's roast",
      roastName: "Ethiopian Yirgacheffe",
    },
    marquee: { item1: "SINGLE ORIGIN", item2: "SLOW ROASTED", item3: "LOCALLY SOURCED", item4: "BAKED FRESH DAILY", item5: "ZERO COMPROMISE" },
    about: {
      eyebrow: "Our Story",
      title: "A place that smells like fresh pastry and good coffee",
      text: "Ember & Oak started as a small corner bar and grew into the neighbourhood's favourite spot. We work with local producers, roast our own beans in-house, and bake croissants fresh every morning from 5am.",
      stat1Num: "10+", stat1Label: "years in business",
      stat2Num: "12", stat2Label: "origins in rotation",
      list1Num: "10+ years", list1Label: "in business",
      list2Num: "4 roasts", list2Label: "crafted in-house",
      list3Num: "12 origins", list3Label: "in rotation",
    },
    press: { label: "As featured in", name1: "Berlin Eats", name2: "Kinfolk Journal", name3: "The Daily Grind", name4: "City Weekender", name5: "Roast Magazine" },
    menu: {
      eyebrow: "Menu", title: "What to try",
      tabCoffee: "Coffee", tabTea: "Tea", tabFood: "Pastry",
      items: {
        coffee: {
          espresso: { name: "Espresso", desc: "Double shot, classic intensity" },
          flatWhite: { name: "Flat White", desc: "Milk coffee over a double espresso" },
          vanillaRaf: { name: "Vanilla Raf", desc: "Cream, vanilla, cane sugar" },
          cappuccino: { name: "Cappuccino", desc: "Velvety milk foam" },
        },
        tea: {
          matchaLatte: { name: "Matcha Latte", desc: "Japanese green tea with milk" },
          milkOolong: { name: "Milk Oolong", desc: "Taiwanese tea, soft and creamy" },
          gingerBlackTea: { name: "Ginger Black Tea", desc: "Black tea, ginger, honey, lemon" },
        },
        food: {
          croissant: { name: "Classic Croissant", desc: "Baked fresh every morning" },
          cheesecake: { name: "New York Cheesecake", desc: "House-made, shortcrust base" },
          avocadoToast: { name: "Avocado Toast", desc: "Rye bread, poached egg" },
        },
      },
    },
    gallery: {
      eyebrow: "Atmosphere", title: "Come in for a cup",
      caption1: "Morning light in the front room", caption2: "Beans, roasted in-house",
      caption3: "Our roastery in the back", caption4: "Weekend regulars", caption5: "Latte art, always",
    },
    testimonials: {
      eyebrow: "Reviews", title: "What people say",
      t1: { quote: "\"Hands down the best flat white in the city. The staff remember my order and my name — that's rare these days.\"", name: "Julia Meyer", role: "Regular since 2019" },
      t2: { quote: "\"I work from here twice a week. Great wifi, better coffee, and the croissants alone are worth the trip.\"", name: "Anton Krüger", role: "Local freelancer" },
      t3: { quote: "\"We book their table for every team breakfast. The space feels warm without trying too hard.\"", name: "Sofia Lang", role: "Studio owner" },
    },
    contact: {
      eyebrow: "Visit Us", title: "We'd love to see you",
      addressLabel: "Address", addressValue: "14 Garden Street, Berlin",
      hoursLabel: "Opening Hours", hoursValue: "Mon–Sun, 8:00–22:00",
      phoneLabel: "Phone", phoneValue: "+49 30 1234 5678",
      formTitle: "Reserve a Table",
      namePlaceholder: "Your name", phonePlaceholder: "Phone number",
      btnSend: "Send Request",
      formNoteThanks: "Thank you! We will contact you within the hour.",
    },
    footer: {
      copyright: "© 2026 Ember & Oak Coffee House. All rights reserved.",
      instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn",
      disclaimer: "This is a design sample from Al's portfolio — a demonstration, not a real, fully operational website.",
    },
    fab: { label: "Reserve a table" },
  },

  ru: {
    nav: { about: "О нас", menu: "Меню", gallery: "Атмосфера", contact: "Контакты", menuAria: "Меню" },
    lang: { ariaLabel: "Выбрать язык" },
    hero: {
      badge: "☕ Лучшая кофейня 2025 года",
      eyebrow: "Обжариваем с 2015 года",
      title: "Кофе, с которого<br>начинается <em>идеальное</em> утро",
      text: "Мы сами обжариваем зёрна, бережно варим кофе и подаём его с любовью. Заходите — ваше утро вот-вот станет лучше.",
      btnMenu: "Смотреть меню",
      btnFind: "Как нас найти",
      proof: "<strong>2 400+</strong> постоянных гостей доверяют нам своё утро",
      ratingCount: "1 240+ отзывов",
      roastEyebrow: "Обжарка дня",
      roastName: "Эфиопия Иргачеффе",
    },
    marquee: { item1: "МОНОСОРТ", item2: "МЕДЛЕННАЯ ОБЖАРКА", item3: "МЕСТНЫЕ ПОСТАВЩИКИ", item4: "ВЫПЕЧКА КАЖДЫЙ ДЕНЬ", item5: "БЕЗ КОМПРОМИССОВ" },
    about: {
      eyebrow: "О нас",
      title: "Место, где пахнет свежей выпечкой и хорошим кофе",
      text: "Ember & Oak начиналась как маленькая кофейня на углу и превратилась в любимое место всего района. Мы работаем с местными поставщиками, сами обжариваем зёрна и каждое утро с 5 часов печём свежие круассаны.",
      stat1Num: "10+", stat1Label: "лет работы",
      stat2Num: "12", stat2Label: "сортов в ротации",
      list1Num: "10+ лет", list1Label: "на рынке",
      list2Num: "4 обжарки", list2Label: "готовим сами",
      list3Num: "12 сортов", list3Label: "в ротации",
    },
    press: { label: "О нас писали", name1: "Berlin Eats", name2: "Kinfolk Journal", name3: "The Daily Grind", name4: "City Weekender", name5: "Roast Magazine" },
    menu: {
      eyebrow: "Меню", title: "Что попробовать",
      tabCoffee: "Кофе", tabTea: "Чай", tabFood: "Выпечка",
      items: {
        coffee: {
          espresso: { name: "Эспрессо", desc: "Двойная порция, классическая крепость" },
          flatWhite: { name: "Флэт уайт", desc: "Молочный кофе на двойном эспрессо" },
          vanillaRaf: { name: "Ванильный раф", desc: "Сливки, ваниль, тростниковый сахар" },
          cappuccino: { name: "Капучино", desc: "Нежная молочная пенка" },
        },
        tea: {
          matchaLatte: { name: "Матча латте", desc: "Японский зелёный чай с молоком" },
          milkOolong: { name: "Молочный улун", desc: "Тайваньский чай, мягкий и сливочный" },
          gingerBlackTea: { name: "Чёрный чай с имбирём", desc: "Чёрный чай, имбирь, мёд, лимон" },
        },
        food: {
          croissant: { name: "Классический круассан", desc: "Печём свежим каждое утро" },
          cheesecake: { name: "Нью-йоркский чизкейк", desc: "Домашний, песочная основа" },
          avocadoToast: { name: "Тост с авокадо", desc: "Ржаной хлеб, яйцо пашот" },
        },
      },
    },
    gallery: {
      eyebrow: "Атмосфера", title: "Загляните на чашечку кофе",
      caption1: "Утренний свет в зале", caption2: "Зёрна, обжаренные у нас",
      caption3: "Наша обжарочная в глубине зала", caption4: "Постоянные гости по выходным", caption5: "Латте-арт — всегда",
    },
    testimonials: {
      eyebrow: "Отзывы", title: "Что говорят гости",
      t1: { quote: "«Однозначно лучший флэт уайт в городе. Персонал помнит мой заказ и моё имя — сейчас это редкость.»", name: "Юлия Мейер", role: "Постоянный гость с 2019 года" },
      t2: { quote: "«Работаю отсюда дважды в неделю. Отличный wifi, кофе ещё лучше, а ради круассанов стоит приехать в одиночку.»", name: "Антон Крюгер", role: "Фрилансер из района" },
      t3: { quote: "«Мы бронируем столик здесь для каждого командного завтрака. Место тёплое без лишних усилий.»", name: "София Ланг", role: "Владелица студии" },
    },
    contact: {
      eyebrow: "Приходите", title: "Будем рады вас видеть",
      addressLabel: "Адрес", addressValue: "Гарден-стрит, 14, Берлин",
      hoursLabel: "Часы работы", hoursValue: "Пн–Вс, 8:00–22:00",
      phoneLabel: "Телефон", phoneValue: "+49 30 1234 5678",
      formTitle: "Забронировать столик",
      namePlaceholder: "Ваше имя", phonePlaceholder: "Номер телефона",
      btnSend: "Отправить заявку",
      formNoteThanks: "Спасибо! Мы свяжемся с вами в течение часа.",
    },
    footer: {
      copyright: "© 2026 Кофейня Ember & Oak. Все права защищены.",
      instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn",
      disclaimer: "Это демонстрационный образец из портфолио Al — не полноценный работающий сайт.",
    },
    fab: { label: "Забронировать столик" },
  },

  uk: {
    nav: { about: "Про нас", menu: "Меню", gallery: "Атмосфера", contact: "Контакти", menuAria: "Меню" },
    lang: { ariaLabel: "Обрати мову" },
    hero: {
      badge: "☕ Найкраща кав'ярня 2025 року",
      eyebrow: "Обсмажуємо з 2015 року",
      title: "Кава, з якої<br>починається <em>чудовий</em> ранок",
      text: "Ми самі обсмажуємо зерна, дбайливо варимо каву та подаємо її з любов'ю. Заходьте — ваш ранок ось-ось стане кращим.",
      btnMenu: "Переглянути меню",
      btnFind: "Як нас знайти",
      proof: "<strong>2 400+</strong> постійних гостей довіряють нам свій ранок",
      ratingCount: "1 240+ відгуків",
      roastEyebrow: "Обсмажка дня",
      roastName: "Ефіопія Іргачефе",
    },
    marquee: { item1: "МОНОСОРТ", item2: "ПОВІЛЬНА ОБСМАЖКА", item3: "МІСЦЕВІ ПОСТАЧАЛЬНИКИ", item4: "ВИПІЧКА ЩОДНЯ", item5: "БЕЗ КОМПРОМІСІВ" },
    about: {
      eyebrow: "Про нас",
      title: "Місце, де пахне свіжою випічкою та гарною кавою",
      text: "Ember & Oak починалася як маленька кав'ярня на розі й перетворилася на улюблене місце всього району. Ми співпрацюємо з місцевими постачальниками, самі обсмажуємо зерна і щоранку з 5 години печемо свіжі круасани.",
      stat1Num: "10+", stat1Label: "років роботи",
      stat2Num: "12", stat2Label: "сортів у ротації",
      list1Num: "10+ років", list1Label: "на ринку",
      list2Num: "4 обсмажки", list2Label: "готуємо самі",
      list3Num: "12 сортів", list3Label: "у ротації",
    },
    press: { label: "Про нас писали", name1: "Berlin Eats", name2: "Kinfolk Journal", name3: "The Daily Grind", name4: "City Weekender", name5: "Roast Magazine" },
    menu: {
      eyebrow: "Меню", title: "Що спробувати",
      tabCoffee: "Кава", tabTea: "Чай", tabFood: "Випічка",
      items: {
        coffee: {
          espresso: { name: "Еспресо", desc: "Подвійна порція, класична міцність" },
          flatWhite: { name: "Флет вайт", desc: "Молочна кава на подвійному еспресо" },
          vanillaRaf: { name: "Ванільний раф", desc: "Вершки, ваніль, тростинний цукор" },
          cappuccino: { name: "Капучино", desc: "Ніжна молочна піна" },
        },
        tea: {
          matchaLatte: { name: "Матча латте", desc: "Японський зелений чай з молоком" },
          milkOolong: { name: "Молочний улун", desc: "Тайванський чай, м'який і вершковий" },
          gingerBlackTea: { name: "Чорний чай з імбиром", desc: "Чорний чай, імбир, мед, лимон" },
        },
        food: {
          croissant: { name: "Класичний круасан", desc: "Печемо свіжим щоранку" },
          cheesecake: { name: "Нью-йоркський чізкейк", desc: "Домашній, пісочна основа" },
          avocadoToast: { name: "Тост з авокадо", desc: "Житній хліб, яйце пашот" },
        },
      },
    },
    gallery: {
      eyebrow: "Атмосфера", title: "Завітайте на чашечку кави",
      caption1: "Ранкове світло в залі", caption2: "Зерна, обсмажені у нас",
      caption3: "Наша обсмажувальня в глибині", caption4: "Постійні гості у вихідні", caption5: "Лате-арт — завжди",
    },
    testimonials: {
      eyebrow: "Відгуки", title: "Що кажуть гості",
      t1: { quote: "«Однозначно найкращий флет вайт у місті. Персонал пам'ятає моє замовлення і моє ім'я — це рідкість.»", name: "Юлія Маєр", role: "Постійна гостя з 2019 року" },
      t2: { quote: "«Працюю звідси двічі на тиждень. Чудовий wifi, кава ще краща, а заради круасанів варто приїхати.»", name: "Антон Крюгер", role: "Фрилансер з району" },
      t3: { quote: "«Ми бронюємо столик тут для кожного командного сніданку. Місце тепле без зайвих зусиль.»", name: "Софія Ланг", role: "Власниця студії" },
    },
    contact: {
      eyebrow: "Завітайте", title: "Будемо раді вас бачити",
      addressLabel: "Адреса", addressValue: "Гарден-стріт, 14, Берлін",
      hoursLabel: "Години роботи", hoursValue: "Пн–Нд, 8:00–22:00",
      phoneLabel: "Телефон", phoneValue: "+49 30 1234 5678",
      formTitle: "Забронювати столик",
      namePlaceholder: "Ваше ім'я", phonePlaceholder: "Номер телефону",
      btnSend: "Надіслати заявку",
      formNoteThanks: "Дякуємо! Ми зв'яжемося з вами протягом години.",
    },
    footer: {
      copyright: "© 2026 Кав'ярня Ember & Oak. Усі права захищені.",
      instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn",
      disclaimer: "Це демонстраційний зразок із портфоліо Al — не повноцінний робочий сайт.",
    },
    fab: { label: "Забронювати столик" },
  },

  de: {
    nav: { about: "Über uns", menu: "Speisekarte", gallery: "Ambiente", contact: "Besuch", menuAria: "Menü" },
    lang: { ariaLabel: "Sprache wählen" },
    hero: {
      badge: "☕ Bestes Café 2025",
      eyebrow: "Rösten seit 2015",
      title: "Kaffee, mit dem<br>der Morgen <em>richtig</em> beginnt",
      text: "Wir rösten unsere eigenen Bohnen, brühen mit Sorgfalt und servieren mit Stolz. Kommen Sie herein — Ihr Morgen wird gleich besser.",
      btnMenu: "Speisekarte ansehen",
      btnFind: "So finden Sie uns",
      proof: "<strong>2.400+</strong> Stammgäste vertrauen uns ihren Morgen an",
      ratingCount: "1.240+ Bewertungen",
      roastEyebrow: "Röstung des Tages",
      roastName: "Äthiopien Yirgacheffe",
    },
    marquee: { item1: "SORTENREIN", item2: "LANGSAM GERÖSTET", item3: "REGIONAL BEZOGEN", item4: "TÄGLICH FRISCH GEBACKEN", item5: "KEINE KOMPROMISSE" },
    about: {
      eyebrow: "Über uns",
      title: "Ein Ort, der nach frischem Gebäck und gutem Kaffee duftet",
      text: "Ember & Oak begann als kleine Eckbar und wurde zum Lieblingsort des Viertels. Wir arbeiten mit lokalen Erzeugern zusammen, rösten unsere Bohnen selbst und backen jeden Morgen ab 5 Uhr frische Croissants.",
      stat1Num: "10+", stat1Label: "Jahre im Geschäft",
      stat2Num: "12", stat2Label: "Röstungen im Wechsel",
      list1Num: "10+ Jahre", list1Label: "am Markt",
      list2Num: "4 Röstungen", list2Label: "hausgemacht",
      list3Num: "12 Herkünfte", list3Label: "im Wechsel",
    },
    press: { label: "Bekannt aus", name1: "Berlin Eats", name2: "Kinfolk Journal", name3: "The Daily Grind", name4: "City Weekender", name5: "Roast Magazine" },
    menu: {
      eyebrow: "Speisekarte", title: "Das sollten Sie probieren",
      tabCoffee: "Kaffee", tabTea: "Tee", tabFood: "Gebäck",
      items: {
        coffee: {
          espresso: { name: "Espresso", desc: "Doppelter Shot, klassische Intensität" },
          flatWhite: { name: "Flat White", desc: "Milchkaffee auf doppeltem Espresso" },
          vanillaRaf: { name: "Vanille Raf", desc: "Sahne, Vanille, Rohrzucker" },
          cappuccino: { name: "Cappuccino", desc: "Samtiger Milchschaum" },
        },
        tea: {
          matchaLatte: { name: "Matcha Latte", desc: "Japanischer Grüntee mit Milch" },
          milkOolong: { name: "Milch-Oolong", desc: "Taiwanesischer Tee, sanft und cremig" },
          gingerBlackTea: { name: "Ingwer-Schwarztee", desc: "Schwarztee, Ingwer, Honig, Zitrone" },
        },
        food: {
          croissant: { name: "Klassisches Croissant", desc: "Jeden Morgen frisch gebacken" },
          cheesecake: { name: "New York Cheesecake", desc: "Hausgemacht, Mürbeteigboden" },
          avocadoToast: { name: "Avocado-Toast", desc: "Roggenbrot, pochiertes Ei" },
        },
      },
    },
    gallery: {
      eyebrow: "Ambiente", title: "Kommen Sie auf eine Tasse vorbei",
      caption1: "Morgenlicht im vorderen Raum", caption2: "Bohnen, hausgeröstet",
      caption3: "Unsere Rösterei im Hinterzimmer", caption4: "Stammgäste am Wochenende", caption5: "Latte Art, immer",
    },
    testimonials: {
      eyebrow: "Bewertungen", title: "Was die Leute sagen",
      t1: { quote: "„Der mit Abstand beste Flat White der Stadt. Das Personal kennt meine Bestellung und meinen Namen — das ist heute selten.“", name: "Julia Meyer", role: "Stammgast seit 2019" },
      t2: { quote: "„Ich arbeite zweimal die Woche von hier aus. Tolles WLAN, noch besserer Kaffee, und allein die Croissants sind den Weg wert.“", name: "Anton Krüger", role: "Freelancer aus der Nachbarschaft" },
      t3: { quote: "„Wir reservieren hier den Tisch für jedes Team-Frühstück. Der Ort wirkt warm, ohne sich anzustrengen.“", name: "Sofia Lang", role: "Studio-Inhaberin" },
    },
    contact: {
      eyebrow: "Besuchen Sie uns", title: "Wir würden uns freuen, Sie zu sehen",
      addressLabel: "Adresse", addressValue: "Gartenstraße 14, Berlin",
      hoursLabel: "Öffnungszeiten", hoursValue: "Mo–So, 8:00–22:00 Uhr",
      phoneLabel: "Telefon", phoneValue: "+49 30 1234 5678",
      formTitle: "Tisch reservieren",
      namePlaceholder: "Ihr Name", phonePlaceholder: "Telefonnummer",
      btnSend: "Anfrage senden",
      formNoteThanks: "Vielen Dank! Wir melden uns innerhalb einer Stunde bei Ihnen.",
    },
    footer: {
      copyright: "© 2026 Ember & Oak Coffee House. Alle Rechte vorbehalten.",
      instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn",
      disclaimer: "Dies ist ein Design-Beispiel aus Als Portfolio — eine Demonstration, keine echte, voll funktionsfähige Website.",
    },
    fab: { label: "Tisch reservieren" },
  },

  es: {
    nav: { about: "Nuestra historia", menu: "Menú", gallery: "Espacio", contact: "Visítanos", menuAria: "Menú" },
    lang: { ariaLabel: "Cambiar idioma" },
    hero: {
      badge: "☕ Mejor cafetería 2025",
      eyebrow: "Tostando desde 2015",
      title: "El café que empieza<br>la mañana <em>como debe ser</em>",
      text: "Tostamos nuestro propio café, lo preparamos con esmero y lo servimos con orgullo. Entra — tu mañana está a punto de mejorar.",
      btnMenu: "Ver el menú",
      btnFind: "Cómo llegar",
      proof: "<strong>Más de 2400</strong> clientes habituales confían en nosotros cada mañana",
      ratingCount: "Más de 1240 reseñas",
      roastEyebrow: "El tueste de hoy",
      roastName: "Etiopía Yirgacheffe",
    },
    marquee: { item1: "ORIGEN ÚNICO", item2: "TUESTE LENTO", item3: "PRODUCTO LOCAL", item4: "HORNEADO A DIARIO", item5: "CERO COMPROMISOS" },
    about: {
      eyebrow: "Nuestra historia",
      title: "Un lugar que huele a bollería recién hecha y buen café",
      text: "Ember & Oak empezó como un pequeño bar de barrio y se convirtió en el rincón favorito del vecindario. Trabajamos con productores locales, tostamos nuestro propio café y horneamos croissants frescos cada mañana desde las 5.",
      stat1Num: "10+", stat1Label: "años de trayectoria",
      stat2Num: "12", stat2Label: "orígenes en rotación",
      list1Num: "10+ años", list1Label: "de trayectoria",
      list2Num: "4 tuestes", list2Label: "elaborados por nosotros",
      list3Num: "12 orígenes", list3Label: "en rotación",
    },
    press: { label: "Como han dicho", name1: "Berlin Eats", name2: "Kinfolk Journal", name3: "The Daily Grind", name4: "City Weekender", name5: "Roast Magazine" },
    menu: {
      eyebrow: "Menú", title: "Qué probar",
      tabCoffee: "Café", tabTea: "Té", tabFood: "Repostería",
      items: {
        coffee: {
          espresso: { name: "Espresso", desc: "Doble, con toda su intensidad clásica" },
          flatWhite: { name: "Flat White", desc: "Café con leche sobre un espresso doble" },
          vanillaRaf: { name: "Raf de vainilla", desc: "Nata, vainilla, azúcar de caña" },
          cappuccino: { name: "Capuchino", desc: "Espuma de leche aterciopelada" },
        },
        tea: {
          matchaLatte: { name: "Latte de matcha", desc: "Té verde japonés con leche" },
          milkOolong: { name: "Oolong con leche", desc: "Té taiwanés, suave y cremoso" },
          gingerBlackTea: { name: "Té negro con jengibre", desc: "Té negro, jengibre, miel, limón" },
        },
        food: {
          croissant: { name: "Croissant clásico", desc: "Horneado fresco cada mañana" },
          cheesecake: { name: "Tarta de queso al estilo Nueva York", desc: "Casera, base quebrada" },
          avocadoToast: { name: "Tostada de aguacate", desc: "Pan de centeno, huevo escalfado" },
        },
      },
    },
    gallery: {
      eyebrow: "Ambiente", title: "Ven a tomarte un café",
      caption1: "Luz de la mañana en la sala principal", caption2: "Café tostado por nosotros",
      caption3: "Nuestra tostadora al fondo", caption4: "Habituales del fin de semana", caption5: "Arte latte, siempre",
    },
    testimonials: {
      eyebrow: "Reseñas", title: "Lo que dicen nuestros clientes",
      t1: { quote: "«Sin duda el mejor flat white de la ciudad. El personal recuerda mi pedido y mi nombre — algo poco común hoy en día.»", name: "Julia Meyer", role: "Clienta habitual desde 2019" },
      t2: { quote: "«Trabajo desde aquí dos veces por semana. Wifi estupendo, café todavía mejor, y los croissants ya justifican la visita.»", name: "Anton Krüger", role: "Freelance del barrio" },
      t3: { quote: "«Reservamos su mesa para cada desayuno de equipo. El espacio se siente acogedor sin esforzarse demasiado.»", name: "Sofia Lang", role: "Dueña de un estudio" },
    },
    contact: {
      eyebrow: "Visítanos", title: "Nos encantaría verte por aquí",
      addressLabel: "Dirección", addressValue: "Garden Street 14, Berlín",
      hoursLabel: "Horario", hoursValue: "Lun–Dom, 8:00–22:00",
      phoneLabel: "Teléfono", phoneValue: "+49 30 1234 5678",
      formTitle: "Reservar una mesa",
      namePlaceholder: "Tu nombre", phonePlaceholder: "Número de teléfono",
      btnSend: "Enviar solicitud",
      formNoteThanks: "¡Gracias! Nos pondremos en contacto contigo en menos de una hora.",
    },
    footer: {
      copyright: "© 2026 Ember & Oak Coffee House. Todos los derechos reservados.",
      instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn",
      disclaimer: "Esta es una muestra de diseño del portafolio de Al — una demostración, no un sitio web real y totalmente operativo.",
    },
    fab: { label: "Reservar una mesa" },
  },
};

const LANG_STORAGE_KEY = 'portfolio_lang';
const MENU_PRICES = {
  espresso: '€3.20', flatWhite: '€4.20', vanillaRaf: '€4.80', cappuccino: '€3.90',
  matchaLatte: '€4.90', milkOolong: '€3.90', gingerBlackTea: '€3.60',
  croissant: '€2.80', cheesecake: '€5.20', avocadoToast: '€6.50',
};
const MENU_ORDER = {
  coffee: ['espresso', 'flatWhite', 'vanillaRaf', 'cappuccino'],
  tea: ['matchaLatte', 'milkOolong', 'gingerBlackTea'],
  food: ['croissant', 'cheesecake', 'avocadoToast'],
};

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function getInitialLang() {
  const stored = localStorage.getItem(LANG_STORAGE_KEY);
  return (stored && translations[stored]) ? stored : 'en';
}

let currentLang = getInitialLang();
let activeMenuTab = 'coffee';

function applyTranslations(lang) {
  if (!translations[lang]) lang = 'en';
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = getByPath(translations[lang], key);
    if (val !== undefined) el.innerHTML = val;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = getByPath(translations[lang], key);
    if (val !== undefined) el.setAttribute('placeholder', val);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    const val = getByPath(translations[lang], key);
    if (val !== undefined) el.setAttribute('aria-label', val);
  });

  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const key = el.getAttribute('data-i18n-alt');
    const val = getByPath(translations[lang], key);
    if (val !== undefined) el.setAttribute('alt', val);
  });

  updateLangSwitchUI(lang);
  renderMenu(activeMenuTab);
}

function setLang(lang) {
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  applyTranslations(lang);
}

/* Language switcher UI */
const langSwitch = document.getElementById('langSwitch');
const langToggle = document.getElementById('langToggle');
const langCurrent = document.getElementById('langCurrent');
const langMenu = document.getElementById('langMenu');
const langButtons = langMenu.querySelectorAll('[data-lang]');

function updateLangSwitchUI(lang) {
  langCurrent.textContent = lang.toUpperCase();
  langButtons.forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });
}

function closeLangMenu() {
  langSwitch.classList.remove('is-open');
  langToggle.setAttribute('aria-expanded', 'false');
}

langToggle.addEventListener('click', () => {
  const willOpen = !langSwitch.classList.contains('is-open');
  langSwitch.classList.toggle('is-open', willOpen);
  langToggle.setAttribute('aria-expanded', String(willOpen));
});

langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setLang(btn.dataset.lang);
    closeLangMenu();
  });
});

document.addEventListener('click', e => {
  if (!langSwitch.contains(e.target)) closeLangMenu();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLangMenu();
});

// Header scroll shadow + floating CTA visibility
const header = document.getElementById('header');
const fab = document.getElementById('fab');
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
  fab.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
});

// Scroll-reveal animations
const revealTargets = document.querySelectorAll(
  '.about__text, .about__media, .testimonial-card, .gallery__item, .press__row strong, .section-title'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// Burger menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => nav.classList.toggle('is-open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('is-open')));

// Menu data + tabs
const menuGrid = document.getElementById('menuGrid');
const tabs = document.querySelectorAll('.menu__tab');

function renderMenu(cat) {
  const items = getByPath(translations[currentLang], `menu.items.${cat}`) || {};
  menuGrid.innerHTML = MENU_ORDER[cat].map(id => {
    const item = items[id] || {};
    return `
    <div class="menu__card">
      <div>
        <h4>${item.name || ''}</h4>
        <p>${item.desc || ''}</p>
      </div>
      <span class="menu__price">${MENU_PRICES[id]}</span>
    </div>
  `;
  }).join('');
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    activeMenuTab = tab.dataset.tab;
    renderMenu(activeMenuTab);
  });
});

// Contact form
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', e => {
  e.preventDefault();
  note.textContent = getByPath(translations[currentLang], 'contact.formNoteThanks');
  form.reset();
});

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Apply the persisted (or default) language on load — also renders the initial menu
applyTranslations(currentLang);

/* ---- Custom cursor ---- */
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var dot = document.createElement('div'); dot.className = 'cursor-dot';
  var ring = document.createElement('div'); ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.body.classList.add('has-custom-cursor');

  var mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
  window.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    dot.style.opacity = 1;
  });
  (function raf() {
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(raf);
  })();

  var hoverSel = 'a,button,input,select,textarea,label,[role="button"],.card,.filter-btn,.toggle-btn,.menu__tab,.product-card,.listing-card,.wishlist-btn,.fav-btn,.quick-add';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(hoverSel)) ring.classList.add('is-hover');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(hoverSel)) ring.classList.remove('is-hover');
  });
  document.addEventListener('mousedown', function () { ring.classList.add('is-click'); });
  document.addEventListener('mouseup', function () { ring.classList.remove('is-click'); });
  document.addEventListener('mouseleave', function () { dot.style.opacity = 0; ring.style.opacity = 0; });
  document.addEventListener('mouseenter', function () { dot.style.opacity = 1; });
})();
