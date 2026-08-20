(function () {
  "use strict";

  /* ============ I18N: TRANSLATIONS ============ */
  const translations = {
    en: {
      nav: { product: "Product", features: "Features", pricing: "Pricing", customers: "Customers", signin: "Sign in", getStarted: "Get Started" },
      hero: {
        badge: "Now with AI-assisted workflow builder",
        title1: "Run your team's work",
        title2: "on",
        title3: "autopilot.",
        sub: "Flowbase connects planning, automation, and reporting into one workspace — so your team spends less time coordinating and more time shipping.",
        watchDemo: "Watch demo",
        note: "No credit card required · 14-day free trial · Cancel anytime"
      },
      cta: { startFreeTrial: "Start free trial", contactSales: "Contact sales", talkToSales: "Talk to sales" },
      logos: { label: "Trusted by teams at" },
      features: {
        kicker: "Features",
        title: "Everything your team needs, minus the busywork",
        subtitle: "Flowbase replaces a stack of disconnected tools with one workspace that plans, automates, and reports on your team's work automatically.",
        f1: { title: "Visual automation builder", desc: "Design multi-step automations with a drag-and-drop canvas — no scripts, no engineering tickets required." },
        f2: { title: "Flexible project views", desc: "Switch between board, timeline, and table views instantly. Every view stays in sync — no duplicate data entry." },
        f3: { title: "Smart notifications", desc: "Context-aware alerts route to the right person on the right channel, so nothing important gets buried." },
        f4: { title: "Live reporting", desc: "Auto-generated dashboards track velocity, cycle time, and workload — always current, never a stale spreadsheet." },
        f5: { title: "Deep integrations", desc: "Native connections to the tools you already use, plus an open API for the ones you've built yourself." },
        f6: { title: "Enterprise-grade security", desc: "SSO, granular permissions, and full audit logs come standard — built for teams that can't compromise." }
      },
      how: {
        kicker: "How it works",
        title: "From chaos to clarity in three steps",
        s1: { title: "Map your workflow", desc: "Import your existing process or start from one of 40+ templates. Flowbase adapts to how your team already works — not the other way around.", li1: "Drag-and-drop workflow canvas", li2: "Templates for engineering, marketing, and ops", li3: "Import from spreadsheets in one click" },
        s2: { title: "Automate the busywork", desc: "Set rules once and let Flowbase handle status updates, approvals, and hand-offs between teams automatically.", li1: "Conditional logic and branching rules", li2: "Scheduled and event-based triggers", li3: "Approval chains with escalation" },
        s3: { title: "Report without the spreadsheet", desc: "Every action feeds a live dashboard. Share a read-only link with stakeholders instead of building a deck.", li1: "Real-time velocity and cycle-time charts", li2: "Shareable, always-current dashboards", li3: "Exportable summaries for leadership" }
      },
      testimonials: {
        kicker: "Customers",
        title: "Teams run leaner with Flowbase",
        t1: { quote: "“We cut our weekly status meeting entirely. Everyone just checks the dashboard now — it's more accurate than the meeting ever was.”", role: "Head of Operations, Norrland Systems" },
        t2: { quote: "“The automation builder paid for itself in the first month. What used to take our ops team two days a week now runs itself.”", role: "VP Engineering, Quarterlane" },
        t3: { quote: "“Migrating from three tools to one Flowbase workspace took a single afternoon. Our team hasn't looked back since.”", role: "COO, Brightfield Labs" }
      },
      pricing: {
        kicker: "Pricing",
        title: "Simple pricing that scales with you",
        subtitle: "Start free. Upgrade when your team is ready — no surprise fees, ever.",
        monthly: "Monthly", yearly: "Yearly", save20: "Save 20%",
        billedMonthly: "Billed monthly", billedYearly: "Billed annually",
        tailored: "Tailored to your organization", perUserMo: "/user/mo", custom: "Custom",
        starter: { name: "Starter", desc: "For small teams getting organized.", f1: "Up to 10 team members", f2: "Unlimited projects", f3: "Board, list & timeline views", f4: "5 active automations", f5: "Basic reporting" },
        pro: { badge: "Most popular", name: "Pro", desc: "For teams scaling their workflows.", f1: "Unlimited team members", f2: "Unlimited projects", f3: "All views + custom fields", f4: "Unlimited automations", f5: "Advanced reporting & exports", f6: "Priority support" },
        enterprise: { name: "Enterprise", desc: "For organizations with advanced needs.", f1: "Everything in Pro", f2: "SSO & SCIM provisioning", f3: "Custom permission roles", f4: "Dedicated success manager", f5: "99.9% uptime SLA" }
      },
      faq: {
        kicker: "FAQ",
        title: "Questions, answered",
        q1: "Do I need to migrate my existing data to switch to Flowbase?",
        a1: "No. Flowbase includes one-click importers for CSV, spreadsheets, and most popular project tools. Most teams complete migration in under an hour, and our onboarding team can assist with larger data sets at no extra cost.",
        q2: "Can I build automations without writing code?",
        a2: "Yes. The visual automation builder uses a trigger-and-action model with conditional branching — entirely drag-and-drop. For advanced use cases, Pro and Enterprise plans also expose a REST API and webhook support.",
        q3: "What happens to my data if I cancel?",
        a3: "You can export all of your projects, tasks, and reports at any time in CSV or JSON format. After cancellation, we retain your data for 30 days in case you'd like to reactivate, then it's permanently deleted.",
        q4: "Is there a limit on automations or integrations?",
        a4: "Starter plans include 5 active automations. Pro and Enterprise plans include unlimited automations and integrations, with no cap on monthly execution volume.",
        q5: "Does Flowbase support single sign-on (SSO)?",
        a5: "SSO via SAML and SCIM provisioning is available on the Enterprise plan, along with custom permission roles and dedicated onboarding support for your IT team.",
        q6: "Is my data secure?",
        a6: "All data is encrypted in transit and at rest. Flowbase undergoes regular independent security audits and offers granular, role-based access controls on every plan."
      },
      ctaFinal: { title: "Ready to see what your team can do without the busywork?", subtitle: "Join hundreds of teams already running on Flowbase. Set up your workspace in minutes." },
      footer: {
        tagline: "The workspace for teams who'd rather ship than coordinate.",
        col: { product: "Product", company: "Company", resources: "Resources", legal: "Legal" },
        product: { f1: "Features", f2: "Integrations", f3: "Pricing", f4: "Changelog", f5: "Security" },
        company: { f1: "About", f2: "Careers", f3: "Blog", f4: "Press", f5: "Contact" },
        resources: { f1: "Documentation", f2: "API reference", f3: "Guides", f4: "Community", f5: "Status" },
        legal: { f1: "Privacy policy", f2: "Terms of service", f3: "Cookie policy", f4: "DPA" },
        rights: "All rights reserved.",
        disclaimer: "This is a design sample from Al's portfolio — a demonstration, not a real, fully operational product."
      }
    },

    ru: {
      nav: { product: "Продукт", features: "Возможности", pricing: "Тарифы", customers: "Клиенты", signin: "Войти", getStarted: "Начать бесплатно" },
      hero: {
        badge: "Теперь с ИИ-конструктором рабочих процессов",
        title1: "Управляйте работой команды",
        title2: "в режиме",
        title3: "автопилота.",
        sub: "Flowbase объединяет планирование, автоматизацию и отчётность в одном рабочем пространстве — команда меньше тратит времени на координацию и больше на результат.",
        watchDemo: "Смотреть демо",
        note: "Без банковской карты · 14 дней бесплатно · Отмена в любой момент"
      },
      cta: { startFreeTrial: "Начать бесплатный период", contactSales: "Связаться с отделом продаж", talkToSales: "Обсудить с отделом продаж" },
      logos: { label: "Нам доверяют команды из" },
      features: {
        kicker: "Возможности",
        title: "Всё необходимое команде — без рутины",
        subtitle: "Flowbase заменяет набор разрозненных инструментов одним рабочим пространством, которое планирует, автоматизирует и формирует отчёты о работе команды.",
        f1: { title: "Визуальный конструктор автоматизаций", desc: "Создавайте многошаговые автоматизации на холсте drag-and-drop — без скриптов и заявок в отдел разработки." },
        f2: { title: "Гибкие представления проектов", desc: "Мгновенно переключайтесь между доской, таймлайном и таблицей. Все представления синхронизированы — без дублирования данных." },
        f3: { title: "Умные уведомления", desc: "Контекстные оповещения направляются нужному человеку по нужному каналу, поэтому важное не теряется." },
        f4: { title: "Отчётность в реальном времени", desc: "Автоматически формируемые дашборды отслеживают скорость работы, цикл задач и загрузку — всегда актуально, без устаревших таблиц." },
        f5: { title: "Глубокие интеграции", desc: "Нативные подключения к инструментам, которые вы уже используете, плюс открытый API для собственных решений." },
        f6: { title: "Безопасность корпоративного уровня", desc: "SSO, гибкие права доступа и полные журналы аудита входят по умолчанию — для команд, которым важна надёжность." }
      },
      how: {
        kicker: "Как это работает",
        title: "От хаоса к ясности за три шага",
        s1: { title: "Опишите рабочий процесс", desc: "Импортируйте существующий процесс или начните с одного из 40+ шаблонов. Flowbase подстраивается под то, как уже работает ваша команда.", li1: "Холст рабочего процесса с drag-and-drop", li2: "Шаблоны для разработки, маркетинга и операций", li3: "Импорт из таблиц в один клик" },
        s2: { title: "Автоматизируйте рутину", desc: "Настройте правила один раз — и Flowbase сам обновляет статусы, обрабатывает согласования и передаёт задачи между командами.", li1: "Условная логика и ветвление правил", li2: "Триггеры по расписанию и по событиям", li3: "Цепочки согласований с эскалацией" },
        s3: { title: "Отчитывайтесь без таблиц", desc: "Каждое действие сразу попадает на живой дашборд. Делитесь ссылкой только для чтения вместо подготовки презентации.", li1: "Графики скорости и цикла задач в реальном времени", li2: "Дашборды для общего доступа, всегда актуальные", li3: "Экспортируемые сводки для руководства" }
      },
      testimonials: {
        kicker: "Клиенты",
        title: "Команды работают эффективнее с Flowbase",
        t1: { quote: "«Мы полностью отказались от еженедельной планёрки. Теперь все просто смотрят дашборд — это точнее, чем любая встреча».", role: "Руководитель отдела операций, Norrland Systems" },
        t2: { quote: "«Конструктор автоматизаций окупился уже в первый месяц. То, что раньше занимало у операционной команды два дня в неделю, теперь работает само».", role: "Вице-президент по инженерии, Quarterlane" },
        t3: { quote: "«Переезд с трёх инструментов на единое пространство Flowbase занял всего один день. Команда ни разу не пожалела».", role: "Операционный директор, Brightfield Labs" }
      },
      pricing: {
        kicker: "Тарифы",
        title: "Простые тарифы, которые растут вместе с вами",
        subtitle: "Начните бесплатно. Переходите на более высокий план, когда будете готовы — без скрытых платежей.",
        monthly: "Ежемесячно", yearly: "Ежегодно", save20: "Экономия 20%",
        billedMonthly: "Оплата ежемесячно", billedYearly: "Оплата раз в год",
        tailored: "Индивидуально для вашей организации", perUserMo: "/польз./мес", custom: "Индивидуально",
        starter: { name: "Starter", desc: "Для небольших команд, наводящих порядок в процессах.", f1: "До 10 участников команды", f2: "Неограниченное количество проектов", f3: "Доска, список и таймлайн", f4: "5 активных автоматизаций", f5: "Базовая отчётность" },
        pro: { badge: "Самый популярный", name: "Pro", desc: "Для команд, масштабирующих свои процессы.", f1: "Неограниченное количество участников", f2: "Неограниченное количество проектов", f3: "Все представления + пользовательские поля", f4: "Неограниченные автоматизации", f5: "Расширенная отчётность и экспорт", f6: "Приоритетная поддержка" },
        enterprise: { name: "Enterprise", desc: "Для организаций с повышенными требованиями.", f1: "Всё из плана Pro", f2: "SSO и SCIM-провижининг", f3: "Настраиваемые роли доступа", f4: "Персональный менеджер по успеху клиента", f5: "SLA с аптаймом 99,9%" }
      },
      faq: {
        kicker: "Вопросы",
        title: "Ответы на частые вопросы",
        q1: "Нужно ли переносить существующие данные при переходе на Flowbase?",
        a1: "Нет. Flowbase включает импорт в один клик из CSV, таблиц и большинства популярных инструментов управления проектами. Большинство команд завершают перенос менее чем за час, а для крупных объёмов данных наша команда поддержки поможет бесплатно.",
        q2: "Можно ли создавать автоматизации без программирования?",
        a2: "Да. Визуальный конструктор автоматизаций работает по модели «триггер — действие» с условным ветвлением — полностью drag-and-drop. Для сложных сценариев в планах Pro и Enterprise также доступны REST API и вебхуки.",
        q3: "Что происходит с моими данными при отмене подписки?",
        a3: "Вы можете в любой момент экспортировать все проекты, задачи и отчёты в формате CSV или JSON. После отмены мы храним данные 30 дней на случай возврата, затем они удаляются безвозвратно.",
        q4: "Есть ли ограничение на количество автоматизаций или интеграций?",
        a4: "В план Starter входит 5 активных автоматизаций. Планы Pro и Enterprise включают неограниченное количество автоматизаций и интеграций без ограничения по числу запусков в месяц.",
        q5: "Поддерживает ли Flowbase единый вход (SSO)?",
        a5: "SSO через SAML и SCIM-провижининг доступны в плане Enterprise, наряду с настраиваемыми ролями доступа и выделенной поддержкой при внедрении для вашей ИТ-команды.",
        q6: "Насколько защищены мои данные?",
        a6: "Все данные шифруются при передаче и хранении. Flowbase регулярно проходит независимый аудит безопасности и предоставляет гибкий, ролевой контроль доступа на всех планах."
      },
      ctaFinal: { title: "Готовы увидеть, на что способна ваша команда без лишней рутины?", subtitle: "Присоединяйтесь к сотням команд, уже работающих во Flowbase. Настройте рабочее пространство за считанные минуты." },
      footer: {
        tagline: "Пространство для команд, которые предпочитают действовать, а не согласовывать.",
        col: { product: "Продукт", company: "Компания", resources: "Ресурсы", legal: "Правовая информация" },
        product: { f1: "Возможности", f2: "Интеграции", f3: "Тарифы", f4: "Журнал изменений", f5: "Безопасность" },
        company: { f1: "О компании", f2: "Вакансии", f3: "Блог", f4: "Пресса", f5: "Контакты" },
        resources: { f1: "Документация", f2: "Справочник API", f3: "Руководства", f4: "Сообщество", f5: "Статус системы" },
        legal: { f1: "Политика конфиденциальности", f2: "Условия использования", f3: "Политика использования cookie", f4: "Соглашение об обработке данных" },
        rights: "Все права защищены.",
        disclaimer: "Это демонстрационный пример из портфолио Al — иллюстрация дизайна, а не реально действующий продукт."
      }
    },

    uk: {
      nav: { product: "Продукт", features: "Можливості", pricing: "Тарифи", customers: "Клієнти", signin: "Увійти", getStarted: "Почати безкоштовно" },
      hero: {
        badge: "Тепер з AI-конструктором робочих процесів",
        title1: "Керуйте роботою команди",
        title2: "в режимі",
        title3: "автопілота.",
        sub: "Flowbase об'єднує планування, автоматизацію та звітність в одному робочому просторі — команда витрачає менше часу на координацію і більше на результат.",
        watchDemo: "Дивитися демо",
        note: "Без банківської картки · 14 днів безкоштовно · Скасування будь-коли"
      },
      cta: { startFreeTrial: "Почати безкоштовний період", contactSales: "Зв'язатися з відділом продажів", talkToSales: "Обговорити з відділом продажів" },
      logos: { label: "Нам довіряють команди з" },
      features: {
        kicker: "Можливості",
        title: "Усе, що потрібно команді — без рутини",
        subtitle: "Flowbase замінює набір розрізнених інструментів одним робочим простором, який планує, автоматизує та формує звіти про роботу команди.",
        f1: { title: "Візуальний конструктор автоматизацій", desc: "Створюйте багатокрокові автоматизації на полотні drag-and-drop — без скриптів і заявок у відділ розробки." },
        f2: { title: "Гнучкі перегляди проєктів", desc: "Миттєво перемикайтеся між дошкою, таймлайном і таблицею. Усі перегляди синхронізовані — без дублювання даних." },
        f3: { title: "Розумні сповіщення", desc: "Контекстні сповіщення надходять потрібній людині потрібним каналом, тож важливе не губиться." },
        f4: { title: "Звітність у реальному часі", desc: "Автоматично сформовані дашборди відстежують швидкість роботи, цикл задач і навантаження — завжди актуально, без застарілих таблиць." },
        f5: { title: "Глибокі інтеграції", desc: "Нативні підключення до інструментів, якими ви вже користуєтесь, плюс відкритий API для власних рішень." },
        f6: { title: "Безпека корпоративного рівня", desc: "SSO, гнучкі права доступу та повні журнали аудиту входять за замовчуванням — для команд, яким важлива надійність." }
      },
      how: {
        kicker: "Як це працює",
        title: "Від хаосу до ясності за три кроки",
        s1: { title: "Опишіть робочий процес", desc: "Імпортуйте наявний процес або почніть з одного з 40+ шаблонів. Flowbase підлаштовується під те, як вже працює ваша команда.", li1: "Полотно робочого процесу з drag-and-drop", li2: "Шаблони для розробки, маркетингу та операцій", li3: "Імпорт із таблиць в один клік" },
        s2: { title: "Автоматизуйте рутину", desc: "Налаштуйте правила один раз — і Flowbase сам оновлює статуси, обробляє погодження та передає задачі між командами.", li1: "Умовна логіка та розгалуження правил", li2: "Тригери за розкладом і за подіями", li3: "Ланцюжки погоджень з ескалацією" },
        s3: { title: "Звітуйте без таблиць", desc: "Кожна дія одразу потрапляє на живий дашборд. Діліться посиланням лише для перегляду замість підготовки презентації.", li1: "Графіки швидкості та циклу задач у реальному часі", li2: "Дашборди для спільного доступу, завжди актуальні", li3: "Зведення для керівництва з можливістю експорту" }
      },
      testimonials: {
        kicker: "Клієнти",
        title: "Команди працюють ефективніше з Flowbase",
        t1: { quote: "«Ми повністю відмовились від щотижневої наради. Тепер усі просто дивляться дашборд — це точніше, ніж будь-яка зустріч».", role: "Керівник відділу операцій, Norrland Systems" },
        t2: { quote: "«Конструктор автоматизацій окупився вже в перший місяць. Те, що раніше забирало в операційної команди два дні на тиждень, тепер працює саме».", role: "Віцепрезидент з інженерії, Quarterlane" },
        t3: { quote: "«Перехід із трьох інструментів на єдиний простір Flowbase зайняв лише один день. Команда жодного разу не пошкодувала».", role: "Операційна директорка, Brightfield Labs" }
      },
      pricing: {
        kicker: "Тарифи",
        title: "Прості тарифи, що ростуть разом із вами",
        subtitle: "Почніть безкоштовно. Переходьте на вищий план, коли будете готові — без прихованих платежів.",
        monthly: "Щомісячно", yearly: "Щорічно", save20: "Економія 20%",
        billedMonthly: "Оплата щомісяця", billedYearly: "Оплата раз на рік",
        tailored: "Індивідуально для вашої організації", perUserMo: "/кор./міс", custom: "Індивідуально",
        starter: { name: "Starter", desc: "Для невеликих команд, які впорядковують процеси.", f1: "До 10 учасників команди", f2: "Необмежена кількість проєктів", f3: "Дошка, список і таймлайн", f4: "5 активних автоматизацій", f5: "Базова звітність" },
        pro: { badge: "Найпопулярніший", name: "Pro", desc: "Для команд, що масштабують свої процеси.", f1: "Необмежена кількість учасників", f2: "Необмежена кількість проєктів", f3: "Усі перегляди + користувацькі поля", f4: "Необмежені автоматизації", f5: "Розширена звітність та експорт", f6: "Пріоритетна підтримка" },
        enterprise: { name: "Enterprise", desc: "Для організацій з підвищеними вимогами.", f1: "Усе з плану Pro", f2: "SSO та SCIM-провіжинінг", f3: "Налаштовувані ролі доступу", f4: "Персональний менеджер із супроводу", f5: "SLA з аптаймом 99,9%" }
      },
      faq: {
        kicker: "Питання",
        title: "Відповіді на поширені запитання",
        q1: "Чи потрібно переносити наявні дані під час переходу на Flowbase?",
        a1: "Ні. Flowbase містить імпорт в один клік із CSV, таблиць і більшості популярних інструментів управління проєктами. Більшість команд завершують перенесення менш ніж за годину, а для великих обсягів даних наша команда підтримки допоможе безкоштовно.",
        q2: "Чи можна створювати автоматизації без програмування?",
        a2: "Так. Візуальний конструктор автоматизацій працює за моделлю «тригер — дія» з умовним розгалуженням — повністю drag-and-drop. Для складніших сценаріїв у планах Pro та Enterprise також доступні REST API та вебхуки.",
        q3: "Що станеться з моїми даними, якщо я скасую підписку?",
        a3: "Ви можете будь-коли експортувати всі проєкти, задачі та звіти у форматі CSV або JSON. Після скасування ми зберігаємо дані 30 днів на випадок повернення, потім вони видаляються безповоротно.",
        q4: "Чи є обмеження на кількість автоматизацій або інтеграцій?",
        a4: "План Starter включає 5 активних автоматизацій. Плани Pro та Enterprise включають необмежену кількість автоматизацій та інтеграцій без обмеження на кількість запусків на місяць.",
        q5: "Чи підтримує Flowbase єдиний вхід (SSO)?",
        a5: "SSO через SAML та SCIM-провіжинінг доступні в плані Enterprise, разом із налаштовуваними ролями доступу та виділеною підтримкою впровадження для вашої ІТ-команди.",
        q6: "Наскільки захищені мої дані?",
        a6: "Усі дані шифруються під час передавання та зберігання. Flowbase регулярно проходить незалежний аудит безпеки та надає гнучкий, рольовий контроль доступу на всіх планах."
      },
      ctaFinal: { title: "Готові побачити, на що здатна ваша команда без зайвої рутини?", subtitle: "Приєднуйтеся до сотень команд, які вже працюють у Flowbase. Налаштуйте робочий простір за кілька хвилин." },
      footer: {
        tagline: "Простір для команд, які радше діють, ніж погоджують.",
        col: { product: "Продукт", company: "Компанія", resources: "Ресурси", legal: "Правова інформація" },
        product: { f1: "Можливості", f2: "Інтеграції", f3: "Тарифи", f4: "Журнал змін", f5: "Безпека" },
        company: { f1: "Про нас", f2: "Вакансії", f3: "Блог", f4: "Преса", f5: "Контакти" },
        resources: { f1: "Документація", f2: "Довідник API", f3: "Посібники", f4: "Спільнота", f5: "Статус системи" },
        legal: { f1: "Політика конфіденційності", f2: "Умови використання", f3: "Політика використання cookie", f4: "Угода про обробку даних" },
        rights: "Усі права захищено.",
        disclaimer: "Це демонстраційний приклад із портфоліо Al — ілюстрація дизайну, а не реально діючий продукт."
      }
    },

    de: {
      nav: { product: "Produkt", features: "Funktionen", pricing: "Preise", customers: "Kunden", signin: "Anmelden", getStarted: "Kostenlos starten" },
      hero: {
        badge: "Jetzt mit KI-gestütztem Workflow-Builder",
        title1: "Erledigen Sie die Arbeit Ihres Teams",
        title2: "im",
        title3: "Autopilot-Modus.",
        sub: "Flowbase verbindet Planung, Automatisierung und Reporting in einem Workspace — Ihr Team koordiniert weniger und liefert mehr.",
        watchDemo: "Demo ansehen",
        note: "Keine Kreditkarte erforderlich · 14 Tage kostenlos testen · Jederzeit kündbar"
      },
      cta: { startFreeTrial: "Kostenlos testen", contactSales: "Vertrieb kontaktieren", talkToSales: "Mit dem Vertrieb sprechen" },
      logos: { label: "Das Vertrauen dieser Teams" },
      features: {
        kicker: "Funktionen",
        title: "Alles, was Ihr Team braucht — ganz ohne Fleißarbeit",
        subtitle: "Flowbase ersetzt einen ganzen Stapel isolierter Tools durch einen Workspace, der die Arbeit Ihres Teams automatisch plant, automatisiert und dokumentiert.",
        f1: { title: "Visueller Automatisierungs-Builder", desc: "Erstellen Sie mehrstufige Automatisierungen per Drag-and-drop — ganz ohne Skripte oder Tickets an die Entwicklung." },
        f2: { title: "Flexible Projektansichten", desc: "Wechseln Sie sofort zwischen Board-, Zeitleisten- und Tabellenansicht. Alle Ansichten bleiben synchron — keine doppelte Dateneingabe." },
        f3: { title: "Intelligente Benachrichtigungen", desc: "Kontextbezogene Hinweise erreichen die richtige Person über den richtigen Kanal, sodass nichts Wichtiges untergeht." },
        f4: { title: "Live-Reporting", desc: "Automatisch erstellte Dashboards verfolgen Velocity, Durchlaufzeit und Auslastung — immer aktuell, nie eine veraltete Tabelle." },
        f5: { title: "Tiefe Integrationen", desc: "Native Anbindungen an die Tools, die Sie bereits nutzen, plus eine offene API für Ihre eigenen Lösungen." },
        f6: { title: "Sicherheit auf Enterprise-Niveau", desc: "SSO, granulare Berechtigungen und lückenlose Audit-Logs sind Standard — für Teams, die keine Kompromisse eingehen können." }
      },
      how: {
        kicker: "So funktioniert's",
        title: "In drei Schritten vom Chaos zur Klarheit",
        s1: { title: "Workflow abbilden", desc: "Importieren Sie Ihren bestehenden Prozess oder starten Sie mit einer von über 40 Vorlagen. Flowbase passt sich Ihrem Team an — nicht umgekehrt.", li1: "Workflow-Canvas per Drag-and-drop", li2: "Vorlagen für Entwicklung, Marketing und Betrieb", li3: "Import aus Tabellen mit einem Klick" },
        s2: { title: "Fleißarbeit automatisieren", desc: "Regeln einmal festlegen — Flowbase übernimmt Statusaktualisierungen, Freigaben und Übergaben zwischen Teams automatisch.", li1: "Bedingte Logik und verzweigte Regeln", li2: "Zeit- und ereignisbasierte Trigger", li3: "Freigabeketten mit Eskalation" },
        s3: { title: "Reporting ohne Tabellenkalkulation", desc: "Jede Aktion fließt live in ein Dashboard ein. Teilen Sie einen schreibgeschützten Link mit Stakeholdern, statt eine Präsentation zu bauen.", li1: "Echtzeit-Diagramme zu Velocity und Durchlaufzeit", li2: "Teilbare, stets aktuelle Dashboards", li3: "Exportierbare Zusammenfassungen fürs Management" }
      },
      testimonials: {
        kicker: "Kunden",
        title: "Teams arbeiten schlanker mit Flowbase",
        t1: { quote: "„Wir haben unser wöchentliches Status-Meeting komplett gestrichen. Alle schauen jetzt einfach ins Dashboard — das ist genauer als jedes Meeting je war.“", role: "Head of Operations, Norrland Systems" },
        t2: { quote: "„Der Automatisierungs-Builder hat sich im ersten Monat amortisiert. Was unser Ops-Team früher zwei Tage pro Woche gekostet hat, läuft jetzt von selbst.“", role: "VP Engineering, Quarterlane" },
        t3: { quote: "„Der Umzug von drei Tools zu einem einzigen Flowbase-Workspace hat einen Nachmittag gedauert. Unser Team hat es nie bereut.“", role: "COO, Brightfield Labs" }
      },
      pricing: {
        kicker: "Preise",
        title: "Einfache Preise, die mit Ihnen wachsen",
        subtitle: "Kostenlos starten. Upgraden, wenn Ihr Team bereit ist — ganz ohne versteckte Kosten.",
        monthly: "Monatlich", yearly: "Jährlich", save20: "20% sparen",
        billedMonthly: "Monatliche Abrechnung", billedYearly: "Jährliche Abrechnung",
        tailored: "Individuell für Ihre Organisation", perUserMo: "/Nutzer/Monat", custom: "Individuell",
        starter: { name: "Starter", desc: "Für kleine Teams, die Struktur aufbauen.", f1: "Bis zu 10 Teammitglieder", f2: "Unbegrenzte Projekte", f3: "Board-, Listen- und Zeitleistenansicht", f4: "5 aktive Automatisierungen", f5: "Basis-Reporting" },
        pro: { badge: "Am beliebtesten", name: "Pro", desc: "Für Teams, die ihre Workflows skalieren.", f1: "Unbegrenzte Teammitglieder", f2: "Unbegrenzte Projekte", f3: "Alle Ansichten + benutzerdefinierte Felder", f4: "Unbegrenzte Automatisierungen", f5: "Erweitertes Reporting & Exporte", f6: "Priorisierter Support" },
        enterprise: { name: "Enterprise", desc: "Für Organisationen mit erweiterten Anforderungen.", f1: "Alles aus Pro", f2: "SSO & SCIM-Provisioning", f3: "Individuelle Berechtigungsrollen", f4: "Dedizierter Customer Success Manager", f5: "99,9% Verfügbarkeits-SLA" }
      },
      faq: {
        kicker: "FAQ",
        title: "Häufige Fragen",
        q1: "Muss ich meine bestehenden Daten migrieren, um zu Flowbase zu wechseln?",
        a1: "Nein. Flowbase bietet Ein-Klick-Importe für CSV, Tabellen und die gängigsten Projekt-Tools. Die meisten Teams schließen die Migration in unter einer Stunde ab, und unser Onboarding-Team unterstützt bei größeren Datenmengen kostenlos.",
        q2: "Kann ich Automatisierungen ohne Code erstellen?",
        a2: "Ja. Der visuelle Automatisierungs-Builder arbeitet mit einem Trigger-Aktion-Modell inklusive bedingter Verzweigung — vollständig per Drag-and-drop. Für fortgeschrittene Anwendungsfälle bieten Pro- und Enterprise-Pläne zusätzlich eine REST-API und Webhook-Unterstützung.",
        q3: "Was passiert mit meinen Daten, wenn ich kündige?",
        a3: "Sie können jederzeit alle Projekte, Aufgaben und Berichte im CSV- oder JSON-Format exportieren. Nach der Kündigung bewahren wir Ihre Daten 30 Tage lang auf, falls Sie reaktivieren möchten — danach werden sie dauerhaft gelöscht.",
        q4: "Gibt es ein Limit für Automatisierungen oder Integrationen?",
        a4: "Der Starter-Plan enthält 5 aktive Automatisierungen. Pro- und Enterprise-Pläne umfassen unbegrenzte Automatisierungen und Integrationen ohne Obergrenze beim monatlichen Ausführungsvolumen.",
        q5: "Unterstützt Flowbase Single Sign-on (SSO)?",
        a5: "SSO über SAML sowie SCIM-Provisioning ist im Enterprise-Plan verfügbar, zusammen mit individuellen Berechtigungsrollen und dediziertem Onboarding-Support für Ihr IT-Team.",
        q6: "Sind meine Daten sicher?",
        a6: "Alle Daten werden während der Übertragung und im Ruhezustand verschlüsselt. Flowbase durchläuft regelmäßig unabhängige Sicherheitsaudits und bietet in jedem Plan granulare, rollenbasierte Zugriffskontrollen."
      },
      ctaFinal: { title: "Bereit zu sehen, was Ihr Team ohne Fleißarbeit leisten kann?", subtitle: "Schließen Sie sich Hunderten von Teams an, die bereits mit Flowbase arbeiten. Richten Sie Ihren Workspace in wenigen Minuten ein." },
      footer: {
        tagline: "Der Workspace für Teams, die lieber liefern als koordinieren.",
        col: { product: "Produkt", company: "Unternehmen", resources: "Ressourcen", legal: "Rechtliches" },
        product: { f1: "Funktionen", f2: "Integrationen", f3: "Preise", f4: "Änderungsprotokoll", f5: "Sicherheit" },
        company: { f1: "Über uns", f2: "Karriere", f3: "Blog", f4: "Presse", f5: "Kontakt" },
        resources: { f1: "Dokumentation", f2: "API-Referenz", f3: "Anleitungen", f4: "Community", f5: "Systemstatus" },
        legal: { f1: "Datenschutzerklärung", f2: "Nutzungsbedingungen", f3: "Cookie-Richtlinie", f4: "AVV" },
        rights: "Alle Rechte vorbehalten.",
        disclaimer: "Dies ist ein Design-Beispiel aus Als Portfolio — eine Demonstration, kein real betriebenes Produkt."
      }
    },

    es: {
      nav: { product: "Producto", features: "Funciones", pricing: "Precios", customers: "Clientes", signin: "Iniciar sesión", getStarted: "Empezar gratis" },
      hero: {
        badge: "Ahora con creador de flujos de trabajo asistido por IA",
        title1: "Ponga el trabajo de su equipo",
        title2: "en",
        title3: "piloto automático.",
        sub: "Flowbase conecta planificación, automatización e informes en un solo espacio de trabajo, para que su equipo dedique menos tiempo a coordinar y más a entregar resultados.",
        watchDemo: "Ver demo",
        note: "No se requiere tarjeta de crédito · 14 días de prueba gratuita · Cancele cuando quiera"
      },
      cta: { startFreeTrial: "Iniciar prueba gratuita", contactSales: "Contactar con ventas", talkToSales: "Hablar con ventas" },
      logos: { label: "Con la confianza de equipos de" },
      features: {
        kicker: "Funciones",
        title: "Todo lo que su equipo necesita, sin el trabajo repetitivo",
        subtitle: "Flowbase sustituye un conjunto de herramientas dispersas por un solo espacio de trabajo que planifica, automatiza e informa sobre el trabajo de su equipo de forma automática.",
        f1: { title: "Creador visual de automatizaciones", desc: "Diseñe automatizaciones de varios pasos con un lienzo de arrastrar y soltar — sin scripts ni tickets para el equipo de ingeniería." },
        f2: { title: "Vistas de proyecto flexibles", desc: "Cambie al instante entre vista de tablero, cronograma y tabla. Todas las vistas permanecen sincronizadas, sin duplicar datos." },
        f3: { title: "Notificaciones inteligentes", desc: "Las alertas contextuales llegan a la persona adecuada por el canal adecuado, así nada importante se pierde." },
        f4: { title: "Informes en tiempo real", desc: "Los paneles generados automáticamente miden velocidad, tiempo de ciclo y carga de trabajo — siempre al día, nunca una hoja de cálculo obsoleta." },
        f5: { title: "Integraciones profundas", desc: "Conexiones nativas con las herramientas que ya usa, además de una API abierta para las que ha creado usted mismo." },
        f6: { title: "Seguridad de nivel empresarial", desc: "SSO, permisos granulares y registros de auditoría completos vienen incluidos de serie — pensado para equipos que no pueden permitirse riesgos." }
      },
      how: {
        kicker: "Cómo funciona",
        title: "Del caos a la claridad en tres pasos",
        s1: { title: "Defina su flujo de trabajo", desc: "Importe su proceso actual o empiece con una de más de 40 plantillas. Flowbase se adapta a cómo ya trabaja su equipo, no al revés.", li1: "Lienzo de flujo de trabajo con arrastrar y soltar", li2: "Plantillas para ingeniería, marketing y operaciones", li3: "Importación desde hojas de cálculo en un clic" },
        s2: { title: "Automatice el trabajo repetitivo", desc: "Configure las reglas una vez y deje que Flowbase gestione actualizaciones de estado, aprobaciones y traspasos entre equipos automáticamente.", li1: "Lógica condicional y reglas ramificadas", li2: "Disparadores programados y basados en eventos", li3: "Cadenas de aprobación con escalado" },
        s3: { title: "Informe sin hojas de cálculo", desc: "Cada acción alimenta un panel en vivo. Comparta un enlace de solo lectura con las partes interesadas en lugar de preparar una presentación.", li1: "Gráficos de velocidad y tiempo de ciclo en tiempo real", li2: "Paneles compartibles y siempre actualizados", li3: "Resúmenes exportables para la dirección" }
      },
      testimonials: {
        kicker: "Clientes",
        title: "Los equipos trabajan de forma más ágil con Flowbase",
        t1: { quote: "«Eliminamos por completo nuestra reunión semanal de estado. Ahora todos simplemente consultan el panel — es más preciso de lo que fue jamás la reunión».", role: "Directora de Operaciones, Norrland Systems" },
        t2: { quote: "«El creador de automatizaciones se amortizó en el primer mes. Lo que antes le llevaba dos días a la semana a nuestro equipo de operaciones ahora funciona solo».", role: "VP de Ingeniería, Quarterlane" },
        t3: { quote: "«Migrar de tres herramientas a un único espacio de trabajo en Flowbase nos llevó una sola tarde. Nuestro equipo no ha mirado atrás».", role: "COO, Brightfield Labs" }
      },
      pricing: {
        kicker: "Precios",
        title: "Precios sencillos que crecen con usted",
        subtitle: "Empiece gratis. Mejore su plan cuando su equipo esté listo — sin cargos sorpresa, nunca.",
        monthly: "Mensual", yearly: "Anual", save20: "Ahorre un 20%",
        billedMonthly: "Facturación mensual", billedYearly: "Facturación anual",
        tailored: "A medida para su organización", perUserMo: "/usuario/mes", custom: "Personalizado",
        starter: { name: "Starter", desc: "Para equipos pequeños que se están organizando.", f1: "Hasta 10 miembros del equipo", f2: "Proyectos ilimitados", f3: "Vistas de tablero, lista y cronograma", f4: "5 automatizaciones activas", f5: "Informes básicos" },
        pro: { badge: "Más popular", name: "Pro", desc: "Para equipos que escalan sus flujos de trabajo.", f1: "Miembros del equipo ilimitados", f2: "Proyectos ilimitados", f3: "Todas las vistas + campos personalizados", f4: "Automatizaciones ilimitadas", f5: "Informes avanzados y exportaciones", f6: "Soporte prioritario" },
        enterprise: { name: "Enterprise", desc: "Para organizaciones con necesidades avanzadas.", f1: "Todo lo incluido en Pro", f2: "Aprovisionamiento SSO y SCIM", f3: "Roles de permisos personalizados", f4: "Gestor de éxito de cliente dedicado", f5: "SLA de disponibilidad del 99,9%" }
      },
      faq: {
        kicker: "Preguntas frecuentes",
        title: "Respuestas a sus preguntas",
        q1: "¿Necesito migrar mis datos actuales para cambiarme a Flowbase?",
        a1: "No. Flowbase incluye importadores de un clic para CSV, hojas de cálculo y las herramientas de proyectos más populares. La mayoría de los equipos completan la migración en menos de una hora, y nuestro equipo de incorporación puede ayudar con conjuntos de datos más grandes sin coste adicional.",
        q2: "¿Puedo crear automatizaciones sin escribir código?",
        a2: "Sí. El creador visual de automatizaciones utiliza un modelo de disparador y acción con ramificación condicional, totalmente mediante arrastrar y soltar. Para casos de uso avanzados, los planes Pro y Enterprise también ofrecen una API REST y soporte de webhooks.",
        q3: "¿Qué ocurre con mis datos si cancelo?",
        a3: "Puede exportar todos sus proyectos, tareas e informes en cualquier momento en formato CSV o JSON. Tras la cancelación, conservamos sus datos durante 30 días por si desea reactivar la cuenta; después se eliminan de forma permanente.",
        q4: "¿Hay un límite de automatizaciones o integraciones?",
        a4: "Los planes Starter incluyen 5 automatizaciones activas. Los planes Pro y Enterprise incluyen automatizaciones e integraciones ilimitadas, sin límite en el volumen mensual de ejecuciones.",
        q5: "¿Flowbase admite inicio de sesión único (SSO)?",
        a5: "El SSO mediante SAML y el aprovisionamiento SCIM están disponibles en el plan Enterprise, junto con roles de permisos personalizados y soporte de incorporación dedicado para su equipo de TI.",
        q6: "¿Están seguros mis datos?",
        a6: "Todos los datos se cifran en tránsito y en reposo. Flowbase se somete a auditorías de seguridad independientes con regularidad y ofrece controles de acceso granulares basados en roles en todos los planes."
      },
      ctaFinal: { title: "¿Listo para ver lo que su equipo puede lograr sin el trabajo repetitivo?", subtitle: "Únase a cientos de equipos que ya trabajan con Flowbase. Configure su espacio de trabajo en minutos." },
      footer: {
        tagline: "El espacio de trabajo para equipos que prefieren entregar antes que coordinar.",
        col: { product: "Producto", company: "Empresa", resources: "Recursos", legal: "Legal" },
        product: { f1: "Funciones", f2: "Integraciones", f3: "Precios", f4: "Registro de cambios", f5: "Seguridad" },
        company: { f1: "Sobre nosotros", f2: "Empleo", f3: "Blog", f4: "Prensa", f5: "Contacto" },
        resources: { f1: "Documentación", f2: "Referencia de la API", f3: "Guías", f4: "Comunidad", f5: "Estado del sistema" },
        legal: { f1: "Política de privacidad", f2: "Términos del servicio", f3: "Política de cookies", f4: "Acuerdo de tratamiento de datos" },
        rights: "Todos los derechos reservados.",
        disclaimer: "Esta es una muestra de diseño del portafolio de Al — una demostración, no un producto real ni plenamente operativo."
      }
    }
  };

  const LANG_KEY = "portfolio_lang";
  let currentLang = localStorage.getItem(LANG_KEY) || "en";
  if (!translations[currentLang]) currentLang = "en";

  function translate(key) {
    const parts = key.split(".");
    let obj = translations[currentLang];
    for (let i = 0; i < parts.length; i++) {
      if (obj == null) { obj = undefined; break; }
      obj = obj[parts[i]];
    }
    if (typeof obj === "string") return obj;

    // Fallback to English if a key is missing in the active language
    obj = translations.en;
    for (let i = 0; i < parts.length; i++) {
      if (obj == null) return key;
      obj = obj[parts[i]];
    }
    return typeof obj === "string" ? obj : key;
  }

  function translateEl(el) {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    el.textContent = translate(key);
  }

  /* ============ STICKY NAV BACKGROUND ============ */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (window.scrollY > 12) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ============ MOBILE NAV TOGGLE ============ */
  const hamburger = document.getElementById("hamburger");
  const mobilePanel = document.getElementById("mobile-panel");

  function closeMobilePanel() {
    mobilePanel.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }

  function toggleMobilePanel() {
    const isOpen = mobilePanel.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  hamburger.addEventListener("click", toggleMobilePanel);

  mobilePanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobilePanel);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobilePanel();
  });

  /* ============ LANGUAGE SWITCHER ============ */
  const langSwitcher = document.getElementById("lang-switcher");
  const langBtn = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");
  const langCurrentEl = document.getElementById("lang-current");

  function closeLangMenu() {
    if (!langSwitcher) return;
    langSwitcher.classList.remove("open");
    langBtn.setAttribute("aria-expanded", "false");
  }

  function toggleLangMenu() {
    const isOpen = langSwitcher.classList.toggle("open");
    langBtn.setAttribute("aria-expanded", String(isOpen));
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(translateEl);
    document.documentElement.setAttribute("lang", currentLang);
    if (langCurrentEl) langCurrentEl.textContent = currentLang.toUpperCase();
    if (langMenu) {
      langMenu.querySelectorAll("li").forEach((li) => {
        li.setAttribute("aria-selected", li.getAttribute("data-lang") === currentLang ? "true" : "false");
      });
    }
  }

  function setLanguage(lang) {
    if (!translations[lang]) lang = "en";
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    applyTranslations();
  }

  if (langBtn && langSwitcher && langMenu) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleLangMenu();
    });

    langMenu.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", () => {
        setLanguage(li.getAttribute("data-lang"));
        closeLangMenu();
      });
    });

    document.addEventListener("click", (e) => {
      if (!langSwitcher.contains(e.target)) closeLangMenu();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLangMenu();
    });
  }

  /* ============ PRICING TOGGLE ============ */
  const billingSwitch = document.getElementById("billing-switch");
  const labelMonthly = document.getElementById("label-monthly");
  const labelYearly = document.getElementById("label-yearly");
  const saveBadge = document.querySelector(".save-badge");
  const amounts = document.querySelectorAll(".price-amount .amount");
  const billedNotes = document.querySelectorAll(".price-billed-note[data-monthly-note]");

  function setBilling(yearly) {
    billingSwitch.setAttribute("aria-checked", String(yearly));
    labelMonthly.classList.toggle("active", !yearly);
    labelYearly.classList.toggle("active", yearly);
    saveBadge.classList.toggle("visible", yearly);

    amounts.forEach((el) => {
      const value = yearly ? el.getAttribute("data-yearly") : el.getAttribute("data-monthly");
      el.textContent = value;
    });

    billedNotes.forEach((el) => {
      // data-monthly-note / data-yearly-note hold i18n KEYS (not raw text),
      // so billing state stays translation-aware across language switches.
      const key = yearly ? el.getAttribute("data-yearly-note") : el.getAttribute("data-monthly-note");
      el.setAttribute("data-i18n", key);
      translateEl(el);
    });
  }

  billingSwitch.addEventListener("click", () => {
    const currentlyYearly = billingSwitch.getAttribute("aria-checked") === "true";
    setBilling(!currentlyYearly);
  });

  setBilling(false);

  /* ============ APPLY INITIAL LANGUAGE (after all i18n-aware elements exist) ============ */
  applyTranslations();

  /* ============ FAQ ACCORDION ============ */
  const triggers = document.querySelectorAll(".accordion-trigger");

  triggers.forEach((trigger) => {
    const panel = trigger.nextElementSibling;

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      // Close all others
      triggers.forEach((t) => {
        if (t !== trigger) {
          t.setAttribute("aria-expanded", "false");
          t.nextElementSibling.style.maxHeight = null;
        }
      });

      if (isOpen) {
        trigger.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = null;
      } else {
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ============ WATCH DEMO (placeholder interaction) ============ */
  const watchDemoBtn = document.getElementById("watch-demo-btn");
  if (watchDemoBtn) {
    watchDemoBtn.addEventListener("click", () => {
      document.querySelector("#product").scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ============ SCROLL-TRIGGERED FADE-IN ============ */
  const fadeEls = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    fadeEls.forEach((el, i) => {
      // Small staggered delay per element within the same parent for polish
      el.style.transitionDelay = (i % 3) * 60 + "ms";
      observer.observe(el);
    });
  } else {
    fadeEls.forEach((el) => el.classList.add("in-view"));
  }
})();

/* ---- Custom cursor: dot with glow (unified across portfolio) ---- */
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var dot = document.createElement('div'); dot.className = 'cursor-dot';
  document.body.appendChild(dot);
  document.body.classList.add('has-custom-cursor');

  var mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
  window.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.opacity = 1;
  }, { passive: true });
  (function raf() {
    rx += (mx - rx) * 0.25; ry += (my - ry) * 0.25;
    dot.style.left = rx + 'px'; dot.style.top = ry + 'px';
    requestAnimationFrame(raf);
  })();

  var hoverSel = 'a,button,input,select,textarea,label,[role="button"],.card,.filter-btn,.toggle-btn,.menu__tab,.product-card,.listing-card,.wishlist-btn,.fav-btn,.quick-add,th.sortable,.nav-link,.icon-btn,.donut-slice,.donut-legend-item,.sidebar-collapse-btn';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest && e.target.closest(hoverSel)) dot.classList.add('is-hover');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest && e.target.closest(hoverSel)) dot.classList.remove('is-hover');
  });
  document.addEventListener('mouseleave', function () { dot.style.opacity = 0; });
})();
