(function () {
  "use strict";

  /* ---------------------------------------------------------
     i18n — translations + language switcher
  --------------------------------------------------------- */
  var translations = {
    en: {
      nav: { services: "Services", approach: "Approach", work: "Work", insights: "Insights", contact: "Contact", bookCall: "Book a call" },
      hero: {
        eyebrow: "Strategy & Operations Consulting",
        titleMain: "Turning ambitious strategy into",
        titleAccent: "measurable growth.",
        sub: "Meridian partners with executive teams to solve the problems that matter most — market entry, operating model redesign, category-defining deals — and we stay accountable to the numbers until they land.",
        ctaPrimary: "Book a strategy call",
        ctaLink: "See our results",
        meta1: "years in practice",
        meta2: "engagements delivered",
        meta3: "client retention",
        cardTag: "Client value created",
        cardNote: "Since 2016, across 140+ engagements",
        chip1: "Avg. ROI 6.4x",
        chip2: "9-month avg. time to impact"
      },
      logos: { label: "Trusted by ambitious teams" },
      services: {
        eyebrow: "What we do",
        title: "Four practices. One standard of rigor.",
        sub: "We don't do generic playbooks. Every engagement is built around the specific constraint holding your business back.",
        card1: { title: "Growth Strategy", desc: "We identify the highest-leverage paths to revenue growth — new markets, new segments, new business models — and build the roadmap to get there, backed by real market data." },
        card2: { title: "Operations Excellence", desc: "We re-engineer processes, cost structures, and org design to unlock margin — without sacrificing quality, speed, or the people who make the business run." },
        card3: { title: "Digital Transformation", desc: "We modernize technology, data, and ways of working so your organization can move at the pace the market — and your customers — now demand." },
        card4: { title: "M&A Advisory", desc: "We support diligence, integration planning, and post-merger execution so deals deliver the value they promised on day one — and every day after." },
        learnMore: "Learn more"
      },
      approach: {
        eyebrow: "How we work",
        title: "A disciplined process, built for outcomes.",
        sub: "No hundred-slide decks that gather dust. We embed with your team from diagnosis through delivery.",
        step1: { title: "Discover", desc: "We immerse in your business — data, operations, customers — to find the real constraint on growth, not the symptom." },
        step2: { title: "Design", desc: "We build a focused strategy and execution plan, pressure-tested with your leadership team before a single slide is final." },
        step3: { title: "Deliver", desc: "We work alongside your team to implement — not just recommend — with weekly milestones and named owners for every workstream." },
        step4: { title: "Drive", desc: "We install the metrics, cadences, and capabilities that keep results compounding long after our engagement ends." }
      },
      results: {
        eyebrow: "Results",
        title: "Outcomes we're accountable for.",
        sub: "A sample of engagements. Names withheld at client request — the numbers speak for themselves.",
        case1: { industry: "Consumer Retail — Regional Chain", headline: "Reignited growth after three flat years", desc: "Repositioned the brand, redesigned the store-format economics, and relaunched in 14 new markets within nine months.", stat1: "Revenue growth", stat2: "New markets entered", stat3: "Months to breakeven" },
        case2: { industry: "Industrial — Mid-Market Manufacturer", headline: "Cut operating costs without cutting output", desc: "Redesigned the production line and supplier network, removing structural cost while lifting throughput.", stat1: "Operating costs", stat2: "Throughput", stat3: "Months to implement" },
        case3: { industry: "Fintech — Growth-Stage Scale-up", headline: "Built the playbook for a category-defining exit", desc: "Sharpened the growth narrative and unit economics ahead of a Series D, then supported the eventual acquisition.", stat1: "Valuation growth", stat2: "Deal value", stat3: "Month engagement" }
      },
      testimonials: {
        eyebrow: "What clients say",
        title: "Trusted where it matters most — the boardroom.",
        prevAria: "Previous testimonial",
        nextAria: "Next testimonial",
        goToAria: "Go to testimonial {n}"
      },
      team: {
        eyebrow: "Leadership",
        title: "The people behind the numbers.",
        sub: "A small, senior team — every engagement is led by a partner, start to finish.",
        role1: "Managing Partner", bio1: "20 years advising Fortune 500 boards on growth strategy and portfolio decisions.",
        role2: "Partner, Operations", bio2: "Former VP of Operations at a global logistics leader; obsessed with margin.",
        role3: "Partner, Digital", bio3: "Leads Meridian's technology and data transformation practice.",
        role4: "Partner, M&A", bio4: "20+ deals closed, representing $4B+ in aggregate transaction value."
      },
      cta: {
        eyebrow: "Let's talk",
        title: "Have a growth problem worth solving?",
        desc: "Tell us where it hurts. We'll come back with a point of view within 48 hours — not a sales pitch, an actual answer.",
        point1: "No obligation, no generic deck",
        point2: "Direct line to a partner, not a rep",
        point3: "Response within 48 hours"
      },
      form: {
        name: "Name", company: "Company", email: "Email", message: "Message", submit: "Send message",
        namePlaceholder: "Jordan Reyes", companyPlaceholder: "Northfield & Co.", emailPlaceholder: "jordan@company.com", messagePlaceholder: "Tell us a bit about the challenge you're facing.",
        confirmTemplate: "Thanks, {name} — we've received your message and will reply within 48 hours."
      },
      footer: {
        tagline: "Strategy and operations consulting for executive teams who need results, not slideware.",
        colCompany: "Company", about: "About", careers: "Careers", leadership: "Leadership", newsroom: "Newsroom",
        colServices: "Services",
        colInsights: "Insights", articles: "Articles", research: "Research", caseStudies: "Case Studies", podcast: "Podcast",
        colLegal: "Legal", privacy: "Privacy Policy", terms: "Terms of Service", cookies: "Cookie Policy",
        copyright: "© 2026 Meridian Consulting. All rights reserved.",
        disclaimer: "This is a design sample from Al's portfolio — a demonstration, not a real, fully operational consultancy."
      },
      a11y: { skipLink: "Skip to content", toggleMenu: "Toggle menu", selectLang: "Select language" }
    },

    ru: {
      nav: { services: "Услуги", approach: "Подход", work: "Работы", insights: "Инсайты", contact: "Контакты", bookCall: "Заказать звонок" },
      hero: {
        eyebrow: "Стратегический и операционный консалтинг",
        titleMain: "Превращаем амбициозную стратегию в",
        titleAccent: "измеримый рост.",
        sub: "Meridian помогает руководству компаний решать самые значимые задачи — выход на новые рынки, перестройку операционной модели, знаковые сделки — и мы отвечаем за результат, пока цифры не сойдутся.",
        ctaPrimary: "Записаться на стратегическую сессию",
        ctaLink: "Смотреть результаты",
        meta1: "лет практики",
        meta2: "реализованных проектов",
        meta3: "удержание клиентов",
        cardTag: "Созданная ценность для клиентов",
        cardNote: "С 2016 года, более чем в 140 проектах",
        chip1: "Средний ROI 6,4x",
        chip2: "9 месяцев в среднем до первого эффекта"
      },
      logos: { label: "Нам доверяют амбициозные команды" },
      services: {
        eyebrow: "Чем мы занимаемся",
        title: "Четыре направления. Один стандарт качества.",
        sub: "Мы не работаем по шаблону. Каждый проект строится вокруг того ограничения, которое реально сдерживает ваш бизнес.",
        card1: { title: "Стратегия роста", desc: "Мы находим наиболее перспективные пути роста выручки — новые рынки, новые сегменты, новые бизнес-модели — и выстраиваем дорожную карту на основе реальных рыночных данных." },
        card2: { title: "Операционная эффективность", desc: "Мы перестраиваем процессы, структуру затрат и оргструктуру, чтобы раскрыть маржу — не жертвуя качеством, скоростью или людьми, которые обеспечивают работу бизнеса." },
        card3: { title: "Цифровая трансформация", desc: "Мы модернизируем технологии, данные и способы работы, чтобы организация могла двигаться в темпе, которого требует рынок — и ваши клиенты." },
        card4: { title: "Консультации по M&A", desc: "Мы сопровождаем due diligence, планирование интеграции и работу после сделки, чтобы сделки приносили обещанную ценность с первого дня — и каждый день после." },
        learnMore: "Подробнее"
      },
      approach: {
        eyebrow: "Как мы работаем",
        title: "Дисциплинированный процесс, нацеленный на результат.",
        sub: "Никаких стослайдовых презентаций, которые пылятся на полке. Мы работаем в связке с вашей командой от диагностики до внедрения.",
        step1: { title: "Диагностика", desc: "Мы погружаемся в бизнес — данные, операции, клиентов, — чтобы найти истинное ограничение роста, а не симптом." },
        step2: { title: "Дизайн", desc: "Мы разрабатываем сфокусированную стратегию и план внедрения, проверяя их с вашей командой прежде, чем финализировать хоть один слайд." },
        step3: { title: "Внедрение", desc: "Мы работаем вместе с вашей командой над внедрением — не просто даём рекомендации — с еженедельными вехами и ответственными по каждому направлению." },
        step4: { title: "Развитие", desc: "Мы внедряем метрики, ритмы и компетенции, которые продолжают приносить результат и после завершения проекта." }
      },
      results: {
        eyebrow: "Результаты",
        title: "Результаты, за которые мы отвечаем.",
        sub: "Примеры проектов. Названия компаний скрыты по просьбе клиентов — цифры говорят сами за себя.",
        case1: { industry: "Розничная торговля — региональная сеть", headline: "Возобновили рост после трёх лет стагнации", desc: "Перепозиционировали бренд, пересмотрели экономику формата магазинов и запустили сеть на 14 новых рынках за девять месяцев.", stat1: "Рост выручки", stat2: "Новых рынков", stat3: "Месяцев до окупаемости" },
        case2: { industry: "Промышленность — производитель среднего сегмента", headline: "Снизили операционные расходы без потери объёмов", desc: "Перестроили производственную линию и сеть поставщиков, устранив структурные издержки и повысив производительность.", stat1: "Операционные расходы", stat2: "Производительность", stat3: "Месяцев на внедрение" },
        case3: { industry: "Финтех — быстрорастущий стартап", headline: "Разработали план для знакового выхода", desc: "Отточили нарратив роста и юнит-экономику перед раундом Series D, затем сопровождали последующее поглощение.", stat1: "Рост оценки компании", stat2: "Сумма сделки", stat3: "Месяцев сопровождения" }
      },
      testimonials: {
        eyebrow: "Отзывы клиентов",
        title: "Нам доверяют там, где это важнее всего, — в зале заседаний совета директоров.",
        prevAria: "Предыдущий отзыв",
        nextAria: "Следующий отзыв",
        goToAria: "Перейти к отзыву {n}"
      },
      team: {
        eyebrow: "Руководство",
        title: "Люди, стоящие за цифрами.",
        sub: "Небольшая команда опытных партнёров — каждый проект от начала до конца ведёт партнёр.",
        role1: "Управляющий партнёр", bio1: "20 лет консультирует советы директоров компаний из списка Fortune 500 по вопросам стратегии роста и портфельных решений.",
        role2: "Партнёр, операционная практика", bio2: "Экс-вице-президент по операциям в глобальном логистическом холдинге; одержим маржинальностью.",
        role3: "Партнёр, цифровая практика", bio3: "Руководит практикой Meridian в области технологической и цифровой трансформации.",
        role4: "Партнёр, M&A", bio4: "Закрыл более 20 сделок на общую сумму свыше 4 млрд долларов."
      },
      cta: {
        eyebrow: "Поговорим",
        title: "Есть задача роста, которую стоит решить?",
        desc: "Расскажите, что вас беспокоит. Мы вернёмся с конкретной точкой зрения в течение 48 часов — не с презентацией продаж, а с реальным ответом.",
        point1: "Никаких обязательств и типовых презентаций",
        point2: "Прямая связь с партнёром, а не с менеджером по продажам",
        point3: "Ответ в течение 48 часов"
      },
      form: {
        name: "Имя", company: "Компания", email: "Email", message: "Сообщение", submit: "Отправить сообщение",
        namePlaceholder: "Иван Петров", companyPlaceholder: "ООО «Северное поле»", emailPlaceholder: "ivan@company.com", messagePlaceholder: "Расскажите немного о задаче, с которой вы столкнулись.",
        confirmTemplate: "Спасибо, {name} — мы получили ваше сообщение и ответим в течение 48 часов."
      },
      footer: {
        tagline: "Стратегический и операционный консалтинг для руководителей, которым нужен результат, а не презентации.",
        colCompany: "Компания", about: "О нас", careers: "Карьера", leadership: "Руководство", newsroom: "Новости",
        colServices: "Услуги",
        colInsights: "Инсайты", articles: "Статьи", research: "Исследования", caseStudies: "Кейсы", podcast: "Подкаст",
        colLegal: "Правовая информация", privacy: "Политика конфиденциальности", terms: "Условия использования", cookies: "Политика cookie",
        copyright: "© 2026 Meridian Consulting. Все права защищены.",
        disclaimer: "Это демонстрационный проект из портфолио Эла — образец дизайна, а не реально действующая консалтинговая компания."
      },
      a11y: { skipLink: "Перейти к содержимому", toggleMenu: "Открыть меню", selectLang: "Выбрать язык" }
    },

    uk: {
      nav: { services: "Послуги", approach: "Підхід", work: "Роботи", insights: "Інсайти", contact: "Контакти", bookCall: "Замовити дзвінок" },
      hero: {
        eyebrow: "Стратегічний та операційний консалтинг",
        titleMain: "Перетворюємо амбітну стратегію на",
        titleAccent: "вимірне зростання.",
        sub: "Meridian допомагає керівним командам вирішувати найважливіші завдання — вихід на нові ринки, перебудову операційної моделі, знакові угоди — і ми відповідаємо за результат, доки цифри не зійдуться.",
        ctaPrimary: "Записатися на стратегічну розмову",
        ctaLink: "Переглянути результати",
        meta1: "років практики",
        meta2: "реалізованих проєктів",
        meta3: "утримання клієнтів",
        cardTag: "Створена цінність для клієнтів",
        cardNote: "З 2016 року, у понад 140 проєктах",
        chip1: "Середній ROI 6,4x",
        chip2: "9 місяців у середньому до першого ефекту"
      },
      logos: { label: "Нам довіряють амбітні команди" },
      services: {
        eyebrow: "Чим ми займаємось",
        title: "Чотири напрями. Один стандарт якості.",
        sub: "Ми не працюємо за шаблоном. Кожен проєкт побудований навколо конкретного обмеження, що стримує ваш бізнес.",
        card1: { title: "Стратегія зростання", desc: "Ми знаходимо найперспективніші шляхи зростання виручки — нові ринки, нові сегменти, нові бізнес-моделі — і будуємо дорожню карту на основі реальних ринкових даних." },
        card2: { title: "Операційна досконалість", desc: "Ми перебудовуємо процеси, структуру витрат і оргструктуру, щоб розкрити маржу — не жертвуючи якістю, швидкістю чи людьми, які забезпечують роботу бізнесу." },
        card3: { title: "Цифрова трансформація", desc: "Ми модернізуємо технології, дані та способи роботи, щоб організація могла рухатися в темпі, якого вимагає ринок — і ваші клієнти." },
        card4: { title: "Консультації з M&A", desc: "Ми супроводжуємо due diligence, планування інтеграції та роботу після угоди, щоб угоди приносили обіцяну цінність із першого дня — і кожного дня після." },
        learnMore: "Дізнатися більше"
      },
      approach: {
        eyebrow: "Як ми працюємо",
        title: "Дисциплінований процес, орієнтований на результат.",
        sub: "Жодних стосторінкових презентацій, що припадають пилом. Ми працюємо в тандемі з вашою командою від діагностики до впровадження.",
        step1: { title: "Діагностика", desc: "Ми занурюємось у бізнес — дані, операції, клієнтів, — щоб знайти справжнє обмеження зростання, а не симптом." },
        step2: { title: "Дизайн", desc: "Ми розробляємо сфокусовану стратегію та план впровадження, перевіряючи їх із вашою командою, перш ніж фіналізувати хоча б один слайд." },
        step3: { title: "Впровадження", desc: "Ми працюємо разом із вашою командою над впровадженням — не лише даємо рекомендації — з щотижневими віхами та відповідальними за кожен напрям." },
        step4: { title: "Розвиток", desc: "Ми впроваджуємо метрики, ритми та компетенції, які продовжують приносити результат і після завершення проєкту." }
      },
      results: {
        eyebrow: "Результати",
        title: "Результати, за які ми відповідаємо.",
        sub: "Приклади проєктів. Назви компаній приховані на прохання клієнтів — цифри говорять самі за себе.",
        case1: { industry: "Роздрібна торгівля — регіональна мережа", headline: "Відновили зростання після трьох років стагнації", desc: "Перепозиціювали бренд, переглянули економіку формату магазинів і запустили мережу на 14 нових ринках за дев'ять місяців.", stat1: "Зростання виручки", stat2: "Нових ринків", stat3: "Місяців до окупності" },
        case2: { industry: "Промисловість — виробник середнього сегмента", headline: "Знизили операційні витрати без втрати обсягів", desc: "Перебудували виробничу лінію та мережу постачальників, усунувши структурні витрати і підвищивши продуктивність.", stat1: "Операційні витрати", stat2: "Продуктивність", stat3: "Місяців на впровадження" },
        case3: { industry: "Фінтех — швидкозростаючий стартап", headline: "Розробили план для знакового виходу", desc: "Відточили наратив зростання та юніт-економіку перед раундом Series D, а потім супроводжували подальше поглинання.", stat1: "Зростання оцінки компанії", stat2: "Сума угоди", stat3: "Місяців супроводу" }
      },
      testimonials: {
        eyebrow: "Відгуки клієнтів",
        title: "Нам довіряють там, де це найважливіше, — у залі засідань ради директорів.",
        prevAria: "Попередній відгук",
        nextAria: "Наступний відгук",
        goToAria: "Перейти до відгуку {n}"
      },
      team: {
        eyebrow: "Керівництво",
        title: "Люди, що стоять за цифрами.",
        sub: "Невелика команда досвідчених партнерів — кожен проєкт від початку до кінця веде партнер.",
        role1: "Керуючий партнер", bio1: "20 років консультує ради директорів компаній зі списку Fortune 500 з питань стратегії зростання та портфельних рішень.",
        role2: "Партнер, операційна практика", bio2: "Ексвіцепрезидент з операцій у глобальному логістичному холдингу; одержимий маржинальністю.",
        role3: "Партнер, цифрова практика", bio3: "Очолює практику Meridian у сфері технологічної та цифрової трансформації.",
        role4: "Партнер, M&A", bio4: "Закрив понад 20 угод на загальну суму понад 4 млрд доларів."
      },
      cta: {
        eyebrow: "Поговорімо",
        title: "Маєте задачу зростання, яку варто вирішити?",
        desc: "Розкажіть, що вас турбує. Ми повернемось із конкретною точкою зору протягом 48 годин — не з презентацією продажів, а з реальною відповіддю.",
        point1: "Жодних зобов'язань і типових презентацій",
        point2: "Пряма лінія з партнером, а не з менеджером із продажів",
        point3: "Відповідь протягом 48 годин"
      },
      form: {
        name: "Ім'я", company: "Компанія", email: "Email", message: "Повідомлення", submit: "Надіслати повідомлення",
        namePlaceholder: "Іван Петренко", companyPlaceholder: "ТОВ «Північне поле»", emailPlaceholder: "ivan@company.com", messagePlaceholder: "Розкажіть трохи про виклик, з яким ви стикаєтесь.",
        confirmTemplate: "Дякуємо, {name} — ми отримали ваше повідомлення і відповімо протягом 48 годин."
      },
      footer: {
        tagline: "Стратегічний та операційний консалтинг для керівників, яким потрібен результат, а не презентації.",
        colCompany: "Компанія", about: "Про нас", careers: "Кар'єра", leadership: "Керівництво", newsroom: "Новини",
        colServices: "Послуги",
        colInsights: "Інсайти", articles: "Статті", research: "Дослідження", caseStudies: "Кейси", podcast: "Подкаст",
        colLegal: "Правова інформація", privacy: "Політика конфіденційності", terms: "Умови використання", cookies: "Політика cookie",
        copyright: "© 2026 Meridian Consulting. Усі права захищені.",
        disclaimer: "Це демонстраційний проєкт із портфоліо Ела — зразок дизайну, а не реально діюча консалтингова компанія."
      },
      a11y: { skipLink: "Перейти до змісту", toggleMenu: "Відкрити меню", selectLang: "Обрати мову" }
    },

    de: {
      nav: { services: "Leistungen", approach: "Ansatz", work: "Projekte", insights: "Insights", contact: "Kontakt", bookCall: "Gespräch vereinbaren" },
      hero: {
        eyebrow: "Strategie- und Organisationsberatung",
        titleMain: "Wir verwandeln ambitionierte Strategie in",
        titleAccent: "messbares Wachstum.",
        sub: "Meridian unterstützt Führungsteams bei den wichtigsten Herausforderungen — Markteintritt, Neugestaltung des Betriebsmodells, wegweisende Transaktionen — und wir bleiben verantwortlich, bis die Zahlen stimmen.",
        ctaPrimary: "Strategiegespräch vereinbaren",
        ctaLink: "Unsere Ergebnisse ansehen",
        meta1: "Jahre Erfahrung",
        meta2: "abgeschlossene Projekte",
        meta3: "Kundenbindung",
        cardTag: "Geschaffener Kundenwert",
        cardNote: "Seit 2016, über 140 Projekte",
        chip1: "Durchschn. ROI 6,4x",
        chip2: "9 Monate durchschnittliche Zeit bis zur Wirkung"
      },
      logos: { label: "Das Vertrauen ambitionierter Teams" },
      services: {
        eyebrow: "Was wir tun",
        title: "Vier Kompetenzfelder. Ein Qualitätsanspruch.",
        sub: "Wir arbeiten nicht mit Standardlösungen. Jedes Projekt wird um die konkrete Wachstumsbremse Ihres Unternehmens herum entwickelt.",
        card1: { title: "Wachstumsstrategie", desc: "Wir identifizieren die wirkungsvollsten Wege zu Umsatzwachstum — neue Märkte, neue Segmente, neue Geschäftsmodelle — und entwickeln den Fahrplan dorthin, gestützt auf echte Marktdaten." },
        card2: { title: "Operative Exzellenz", desc: "Wir gestalten Prozesse, Kostenstrukturen und Organisation neu, um Marge freizusetzen — ohne Qualität, Geschwindigkeit oder die Menschen zu opfern, die das Geschäft am Laufen halten." },
        card3: { title: "Digitale Transformation", desc: "Wir modernisieren Technologie, Daten und Arbeitsweisen, damit Ihr Unternehmen das Tempo mitgehen kann, das der Markt — und Ihre Kunden — heute verlangen." },
        card4: { title: "M&A-Beratung", desc: "Wir begleiten Due Diligence, Integrationsplanung und die Umsetzung nach dem Abschluss, damit Transaktionen vom ersten Tag an — und jeden Tag danach — den versprochenen Wert liefern." },
        learnMore: "Mehr erfahren"
      },
      approach: {
        eyebrow: "Wie wir arbeiten",
        title: "Ein disziplinierter Prozess mit Fokus auf Ergebnisse.",
        sub: "Keine hundertseitigen Präsentationen, die in der Schublade verstauben. Wir arbeiten von der Diagnose bis zur Umsetzung eng mit Ihrem Team zusammen.",
        step1: { title: "Verstehen", desc: "Wir tauchen tief in Ihr Unternehmen ein — Daten, Abläufe, Kunden —, um die wirkliche Wachstumsbremse zu finden, nicht nur das Symptom." },
        step2: { title: "Konzipieren", desc: "Wir entwickeln eine fokussierte Strategie und einen Umsetzungsplan, der mit Ihrer Führung geprüft wird, bevor auch nur eine Folie final ist." },
        step3: { title: "Umsetzen", desc: "Wir arbeiten gemeinsam mit Ihrem Team an der Umsetzung — nicht nur an Empfehlungen — mit wöchentlichen Meilensteinen und klaren Verantwortlichkeiten." },
        step4: { title: "Verankern", desc: "Wir etablieren die Kennzahlen, Routinen und Fähigkeiten, die Ergebnisse auch lange nach unserem Projekt weiter wachsen lassen." }
      },
      results: {
        eyebrow: "Ergebnisse",
        title: "Ergebnisse, für die wir geradestehen.",
        sub: "Eine Auswahl an Projekten. Namen auf Wunsch der Kunden anonymisiert — die Zahlen sprechen für sich.",
        case1: { industry: "Einzelhandel — regionale Handelskette", headline: "Wachstum nach drei stagnierenden Jahren neu entfacht", desc: "Marke neu positioniert, Filialformat wirtschaftlich neu ausgerichtet und in neun Monaten in 14 neuen Märkten eingeführt.", stat1: "Umsatzwachstum", stat2: "Neue Märkte", stat3: "Monate bis zur Gewinnschwelle" },
        case2: { industry: "Industrie — Mittelstandsfertiger", headline: "Betriebskosten gesenkt, ohne den Ausstoß zu senken", desc: "Produktionslinie und Lieferantennetzwerk neu gestaltet, strukturelle Kosten gesenkt und gleichzeitig den Durchsatz erhöht.", stat1: "Betriebskosten", stat2: "Durchsatz", stat3: "Monate bis zur Umsetzung" },
        case3: { industry: "Fintech — wachstumsstarkes Scale-up", headline: "Fahrplan für einen wegweisenden Exit entwickelt", desc: "Wachstumsstory und Unit Economics vor einer Series-D-Runde geschärft und anschließend die spätere Übernahme begleitet.", stat1: "Bewertungswachstum", stat2: "Transaktionswert", stat3: "Monate Begleitung" }
      },
      testimonials: {
        eyebrow: "Was Kunden sagen",
        title: "Vertrauen, wo es am meisten zählt — im Vorstand.",
        prevAria: "Vorheriges Testimonial",
        nextAria: "Nächstes Testimonial",
        goToAria: "Zu Testimonial {n} wechseln"
      },
      team: {
        eyebrow: "Führungsteam",
        title: "Die Menschen hinter den Zahlen.",
        sub: "Ein kleines, erfahrenes Team — jedes Projekt wird von Anfang bis Ende von einem Partner geleitet.",
        role1: "Managing Partner", bio1: "20 Jahre Erfahrung in der Beratung von Fortune-500-Vorständen zu Wachstumsstrategie und Portfolioentscheidungen.",
        role2: "Partner, Operations", bio2: "Ehemaliger VP Operations bei einem globalen Logistikunternehmen; von Marge besessen.",
        role3: "Partner, Digital", bio3: "Leitet den Bereich Technologie- und Datentransformation bei Meridian.",
        role4: "Partner, M&A", bio4: "Über 20 abgeschlossene Transaktionen mit einem Gesamtvolumen von über 4 Mrd. USD."
      },
      cta: {
        eyebrow: "Sprechen wir",
        title: "Ein Wachstumsproblem, das gelöst werden sollte?",
        desc: "Sagen Sie uns, wo es klemmt. Wir melden uns innerhalb von 48 Stunden mit einer fundierten Einschätzung — kein Verkaufsgespräch, sondern eine echte Antwort.",
        point1: "Unverbindlich, keine Standardpräsentation",
        point2: "Direkter Draht zu einem Partner, nicht zu einem Vertriebsmitarbeiter",
        point3: "Antwort innerhalb von 48 Stunden"
      },
      form: {
        name: "Name", company: "Unternehmen", email: "E-Mail", message: "Nachricht", submit: "Nachricht senden",
        namePlaceholder: "Jonas Reiter", companyPlaceholder: "Nordfeld & Co.", emailPlaceholder: "jonas@unternehmen.de", messagePlaceholder: "Beschreiben Sie kurz die Herausforderung, vor der Sie stehen.",
        confirmTemplate: "Danke, {name} — wir haben Ihre Nachricht erhalten und melden uns innerhalb von 48 Stunden."
      },
      footer: {
        tagline: "Strategie- und Organisationsberatung für Führungsteams, die Ergebnisse wollen — keine Foliensätze.",
        colCompany: "Unternehmen", about: "Über uns", careers: "Karriere", leadership: "Führungsteam", newsroom: "Presse",
        colServices: "Leistungen",
        colInsights: "Insights", articles: "Artikel", research: "Studien", caseStudies: "Fallstudien", podcast: "Podcast",
        colLegal: "Rechtliches", privacy: "Datenschutz", terms: "Nutzungsbedingungen", cookies: "Cookie-Richtlinie",
        copyright: "© 2026 Meridian Consulting. Alle Rechte vorbehalten.",
        disclaimer: "Dies ist ein Gestaltungsbeispiel aus Als Portfolio — eine Demonstration, keine real tätige Unternehmensberatung."
      },
      a11y: { skipLink: "Zum Inhalt springen", toggleMenu: "Menü umschalten", selectLang: "Sprache wählen" }
    },

    es: {
      nav: { services: "Servicios", approach: "Enfoque", work: "Proyectos", insights: "Recursos", contact: "Contacto", bookCall: "Reservar una llamada" },
      hero: {
        eyebrow: "Consultoría de estrategia y operaciones",
        titleMain: "Convertimos la estrategia ambiciosa en",
        titleAccent: "crecimiento medible.",
        sub: "Meridian colabora con equipos directivos para resolver los desafíos que más importan — entrada a nuevos mercados, rediseño del modelo operativo, operaciones que marcan un antes y un después — y respondemos por los resultados hasta que se cumplen.",
        ctaPrimary: "Reservar una sesión estratégica",
        ctaLink: "Ver nuestros resultados",
        meta1: "años de trayectoria",
        meta2: "proyectos entregados",
        meta3: "retención de clientes",
        cardTag: "Valor generado para clientes",
        cardNote: "Desde 2016, en más de 140 proyectos",
        chip1: "ROI promedio 6,4x",
        chip2: "9 meses de media hasta el primer impacto"
      },
      logos: { label: "La confianza de equipos ambiciosos" },
      services: {
        eyebrow: "Qué hacemos",
        title: "Cuatro prácticas. Un mismo estándar de rigor.",
        sub: "No trabajamos con manuales genéricos. Cada proyecto se construye alrededor de la limitación concreta que frena a tu negocio.",
        card1: { title: "Estrategia de crecimiento", desc: "Identificamos las vías de mayor impacto para el crecimiento de ingresos — nuevos mercados, nuevos segmentos, nuevos modelos de negocio — y construimos la hoja de ruta con datos reales del mercado." },
        card2: { title: "Excelencia operativa", desc: "Rediseñamos procesos, estructuras de costes y organización para liberar margen, sin sacrificar calidad, velocidad ni a las personas que hacen funcionar el negocio." },
        card3: { title: "Transformación digital", desc: "Modernizamos tecnología, datos y formas de trabajar para que tu organización avance al ritmo que exige el mercado — y tus clientes." },
        card4: { title: "Asesoría en M&A", desc: "Apoyamos la due diligence, la planificación de la integración y la ejecución posterior al cierre para que las operaciones entreguen el valor prometido desde el primer día — y cada día después." },
        learnMore: "Saber más"
      },
      approach: {
        eyebrow: "Cómo trabajamos",
        title: "Un proceso disciplinado, orientado a resultados.",
        sub: "Nada de presentaciones de cien diapositivas que acumulan polvo. Trabajamos junto a tu equipo desde el diagnóstico hasta la implementación.",
        step1: { title: "Descubrir", desc: "Nos sumergimos en tu negocio — datos, operaciones, clientes — para encontrar la verdadera limitación al crecimiento, no solo el síntoma." },
        step2: { title: "Diseñar", desc: "Construimos una estrategia y un plan de ejecución enfocados, puestos a prueba junto a tu equipo directivo antes de dar por cerrada una sola diapositiva." },
        step3: { title: "Ejecutar", desc: "Trabajamos junto a tu equipo para implementar — no solo recomendar — con hitos semanales y responsables asignados en cada frente de trabajo." },
        step4: { title: "Sostener", desc: "Instalamos las métricas, los ritmos y las capacidades que permiten que los resultados sigan creciendo mucho después de terminado el proyecto." }
      },
      results: {
        eyebrow: "Resultados",
        title: "Resultados de los que respondemos.",
        sub: "Una muestra de proyectos. Nombres omitidos a petición de los clientes — las cifras hablan por sí solas.",
        case1: { industry: "Retail de consumo — cadena regional", headline: "Reactivó el crecimiento tras tres años estancados", desc: "Reposicionamos la marca, rediseñamos la economía del formato de tienda y relanzamos la cadena en 14 nuevos mercados en nueve meses.", stat1: "Crecimiento de ingresos", stat2: "Nuevos mercados", stat3: "Meses hasta el punto de equilibrio" },
        case2: { industry: "Industrial — fabricante de mercado medio", headline: "Redujo costes operativos sin reducir la producción", desc: "Rediseñamos la línea de producción y la red de proveedores, eliminando costes estructurales y aumentando el rendimiento.", stat1: "Costes operativos", stat2: "Rendimiento", stat3: "Meses de implementación" },
        case3: { industry: "Fintech — scale-up en fase de crecimiento", headline: "Diseñamos la hoja de ruta para una salida referente del sector", desc: "Afinamos el relato de crecimiento y la unit economics antes de una ronda Serie D, y luego acompañamos la posterior adquisición.", stat1: "Crecimiento de valoración", stat2: "Valor de la operación", stat3: "Meses de acompañamiento" }
      },
      testimonials: {
        eyebrow: "Lo que dicen los clientes",
        title: "La confianza donde más importa: la sala del consejo.",
        prevAria: "Testimonio anterior",
        nextAria: "Siguiente testimonio",
        goToAria: "Ir al testimonio {n}"
      },
      team: {
        eyebrow: "Liderazgo",
        title: "Las personas detrás de las cifras.",
        sub: "Un equipo pequeño y senior — cada proyecto lo lidera un socio de principio a fin.",
        role1: "Socia directora", bio1: "20 años asesorando a consejos de empresas Fortune 500 en estrategia de crecimiento y decisiones de portafolio.",
        role2: "Socio, Operaciones", bio2: "Ex vicepresidente de Operaciones en un líder logístico global; obsesionado con el margen.",
        role3: "Socia, Digital", bio3: "Lidera la práctica de transformación tecnológica y de datos de Meridian.",
        role4: "Socio, M&A", bio4: "Más de 20 operaciones cerradas, por un valor conjunto superior a 4.000 millones de dólares."
      },
      cta: {
        eyebrow: "Hablemos",
        title: "¿Tienes un problema de crecimiento que vale la pena resolver?",
        desc: "Cuéntanos dónde está el dolor. Volveremos con un punto de vista claro en 48 horas — no un discurso de ventas, una respuesta real.",
        point1: "Sin compromiso, sin presentaciones genéricas",
        point2: "Línea directa con un socio, no con un comercial",
        point3: "Respuesta en un plazo de 48 horas"
      },
      form: {
        name: "Nombre", company: "Empresa", email: "Correo electrónico", message: "Mensaje", submit: "Enviar mensaje",
        namePlaceholder: "Jordan Reyes", companyPlaceholder: "Northfield & Co.", emailPlaceholder: "jordan@empresa.com", messagePlaceholder: "Cuéntanos un poco sobre el desafío al que te enfrentas.",
        confirmTemplate: "Gracias, {name} — hemos recibido tu mensaje y te responderemos en un plazo de 48 horas."
      },
      footer: {
        tagline: "Consultoría de estrategia y operaciones para equipos directivos que necesitan resultados, no diapositivas.",
        colCompany: "Empresa", about: "Sobre nosotros", careers: "Empleo", leadership: "Liderazgo", newsroom: "Sala de prensa",
        colServices: "Servicios",
        colInsights: "Recursos", articles: "Artículos", research: "Investigación", caseStudies: "Casos de éxito", podcast: "Podcast",
        colLegal: "Legal", privacy: "Política de privacidad", terms: "Términos de servicio", cookies: "Política de cookies",
        copyright: "© 2026 Meridian Consulting. Todos los derechos reservados.",
        disclaimer: "Esta es una muestra de diseño del portafolio de Al — una demostración, no una consultora real en operación."
      },
      a11y: { skipLink: "Saltar al contenido", toggleMenu: "Alternar menú", selectLang: "Seleccionar idioma" }
    }
  };

  var LANG_KEY = "portfolio_lang";
  var storedLang = null;
  try { storedLang = window.localStorage.getItem(LANG_KEY); } catch (e) {}
  var currentLang = (storedLang && translations[storedLang]) ? storedLang : "en";

  function t(key) {
    var parts = key.split(".");
    var node = translations[currentLang];
    for (var i = 0; i < parts.length; i++) {
      if (node == null) { node = undefined; break; }
      node = node[parts[i]];
    }
    if (node === undefined) {
      node = translations.en;
      for (var j = 0; j < parts.length; j++) {
        if (node == null) { node = undefined; break; }
        node = node[parts[j]];
      }
    }
    return typeof node === "string" ? node : key;
  }

  function applyLanguage(lang) {
    if (!translations[lang]) lang = "en";
    currentLang = lang;
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      var str = t(el.getAttribute("data-i18n-aria-label"));
      if (el.hasAttribute("data-i18n-n")) {
        str = str.replace("{n}", el.getAttribute("data-i18n-n"));
      }
      el.setAttribute("aria-label", str);
    });

    var langCurrentEl = document.getElementById("langCurrent");
    if (langCurrentEl) langCurrentEl.textContent = lang.toUpperCase();

    var langMenuEl = document.getElementById("langMenu");
    if (langMenuEl) {
      langMenuEl.querySelectorAll("li").forEach(function (li) {
        li.classList.toggle("active", li.getAttribute("data-lang") === lang);
      });
    }

    try { window.localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  var langSwitch = document.getElementById("langSwitch");
  var langBtn = document.getElementById("langBtn");
  var langMenu = document.getElementById("langMenu");

  if (langSwitch && langBtn && langMenu) {
    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = langSwitch.classList.toggle("open");
      langBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    langMenu.querySelectorAll("li").forEach(function (li) {
      li.addEventListener("click", function () {
        applyLanguage(li.getAttribute("data-lang"));
        langSwitch.classList.remove("open");
        langBtn.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", function (e) {
      if (!langSwitch.contains(e.target)) {
        langSwitch.classList.remove("open");
        langBtn.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        langSwitch.classList.remove("open");
        langBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------------------------------------------------------
     Sticky header background on scroll
  --------------------------------------------------------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------- */
  var hamburger = document.getElementById("hamburgerBtn");
  var mobileNav = document.getElementById("mobileNav");

  function closeMobileNav() {
    mobileNav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", function () {
    var isOpen = mobileNav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileNav);
  });

  /* ---------------------------------------------------------
     Reveal-on-scroll for sections/cards
  --------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------------------------------------------------------
     Animated count-up stats (triggered on scroll into view)
     Numbers live in data-count / data-prefix / data-suffix /
     data-decimals attributes, never in translated text, so
     switching languages never corrupts the parsed numerics.
  --------------------------------------------------------- */
  var statEls = document.querySelectorAll(".stat-num");

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1600;
    var startTime = null;

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = easeOutExpo(progress);
      var current = target * eased;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
    }
    window.requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statEls.forEach(function (el) { statObserver.observe(el); });
  } else {
    statEls.forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      el.textContent = (el.getAttribute("data-prefix") || "") + target.toFixed(decimals) + (el.getAttribute("data-suffix") || "");
    });
  }

  /* ---------------------------------------------------------
     Testimonial carousel
  --------------------------------------------------------- */
  var track = document.getElementById("carouselTrack");
  var slides = track ? Array.prototype.slice.call(track.querySelectorAll(".testimonial-slide")) : [];
  var dotsWrap = document.getElementById("carouselDots");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var currentSlide = 0;
  var autoAdvanceTimer = null;
  var AUTO_ADVANCE_MS = 7000;

  function buildDots() {
    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.setAttribute("data-i18n-aria-label", "testimonials.goToAria");
      dot.setAttribute("data-i18n-n", String(i + 1));
      dot.setAttribute("aria-label", t("testimonials.goToAria").replace("{n}", String(i + 1)));
      dot.addEventListener("click", function () {
        goToSlide(i);
        restartAutoAdvance();
      });
      dotsWrap.appendChild(dot);
    });
  }

  function renderSlides() {
    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === currentSlide);
    });
    var dots = dotsWrap.querySelectorAll(".carousel-dot");
    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    renderSlides();
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function restartAutoAdvance() {
    if (autoAdvanceTimer) window.clearInterval(autoAdvanceTimer);
    autoAdvanceTimer = window.setInterval(nextSlide, AUTO_ADVANCE_MS);
  }

  if (track && slides.length) {
    buildDots();
    renderSlides();
    restartAutoAdvance();

    nextBtn.addEventListener("click", function () { nextSlide(); restartAutoAdvance(); });
    prevBtn.addEventListener("click", function () { prevSlide(); restartAutoAdvance(); });

    // Keyboard arrow support
    var carousel = document.getElementById("carousel");
    carousel.setAttribute("tabindex", "0");
    carousel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { nextSlide(); restartAutoAdvance(); }
      if (e.key === "ArrowLeft") { prevSlide(); restartAutoAdvance(); }
    });

    // Pause auto-advance while hovered
    carousel.addEventListener("mouseenter", function () {
      if (autoAdvanceTimer) window.clearInterval(autoAdvanceTimer);
    });
    carousel.addEventListener("mouseleave", restartAutoAdvance);
  }

  /* ---------------------------------------------------------
     Contact form submit confirmation (no real backend)
  --------------------------------------------------------- */
  var form = document.getElementById("contactForm");
  var confirmEl = document.getElementById("formConfirm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nameEl = document.getElementById("cf-name");
      var name = nameEl && nameEl.value ? nameEl.value.trim().split(" ")[0] : "there";

      confirmEl.textContent = t("form.confirmTemplate").replace("{name}", name);
      confirmEl.classList.add("show");

      form.reset();

      window.clearTimeout(form._confirmTimeout);
      form._confirmTimeout = window.setTimeout(function () {
        confirmEl.classList.remove("show");
      }, 6000);
    });
  }

  /* ---------------------------------------------------------
     Initial language render (after all DOM/handlers are wired
     so dynamically created elements like carousel dots and
     data-i18n-aria-label targets are covered on first paint)
  --------------------------------------------------------- */
  applyLanguage(currentLang);
})();

/* ---- Custom cursor: corner-bracket "focus frame" ---- */
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var frame = document.createElement('div');
  frame.className = 'cursor-frame';
  ['tl', 'tr', 'bl', 'br'].forEach(function (pos) {
    var corner = document.createElement('span');
    corner.className = 'cursor-corner ' + pos;
    frame.appendChild(corner);
  });
  document.body.appendChild(frame);
  document.body.classList.add('has-custom-cursor');

  var mx = window.innerWidth / 2, my = window.innerHeight / 2, fx = mx, fy = my;
  var active = false;

  window.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    if (!active) { fx = mx; fy = my; active = true; }
    frame.style.opacity = 1;
  });

  (function raf() {
    fx += (mx - fx) * 0.2;
    fy += (my - fy) * 0.2;
    frame.style.transform = 'translate(' + fx + 'px,' + fy + 'px)';
    requestAnimationFrame(raf);
  })();

  var hoverSel = 'a,button,input,select,textarea,label,[role="button"],.service-card,.case-card,.team-card,.carousel-btn,.carousel-dot,.hamburger,.lang-switch-btn,.lang-switch-menu li';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(hoverSel)) frame.classList.add('is-hover');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(hoverSel)) frame.classList.remove('is-hover');
  });
  document.addEventListener('mousedown', function () { frame.classList.add('is-click'); });
  document.addEventListener('mouseup', function () { frame.classList.remove('is-click'); });
  document.addEventListener('mouseleave', function () { frame.style.opacity = 0; });
  document.addEventListener('mouseenter', function () { frame.style.opacity = 1; });
})();
