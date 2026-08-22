(function () {
  "use strict";

  /* ===========================================================
     i18n — static UI translations
     =========================================================== */
  const LANG_KEY = "portfolio_lang";
  const SUPPORTED_LANGS = ["en", "ru", "uk", "de", "es"];

  const translations = {
    en: {
      "announce.text": "Free shipping on orders over $75 &nbsp;·&nbsp; Complimentary returns within 30 days",
      "nav.new": "New",
      "nav.living": "Living",
      "nav.bedding": "Bedding",
      "nav.tableware": "Tableware",
      "nav.sale": "Sale",
      "filter.all": "All",
      "filter.living": "Living",
      "filter.bedding": "Bedding",
      "filter.tableware": "Tableware",
      "hero.eyebrow": "Autumn Collection, 2026",
      "hero.title": "Everyday objects,<br>held to a higher quiet.",
      "hero.sub": "Linen bedding, hand-thrown ceramics, and tableware sourced from small workshops across Europe — chosen for how they age, not just how they arrive.",
      "hero.cta": "Shop the collection",
      "shop.title": "The Collection",
      "values.item1.title": "Sustainably sourced",
      "values.item1.desc": "Fibers and clays traced to certified small farms and studios — never mass extraction.",
      "values.item2.title": "Made to last",
      "values.item2.desc": "Overbuilt seams, fired stoneware, kiln-dried woods — heirlooms, not seasons.",
      "values.item3.title": "Carbon-neutral shipping",
      "values.item3.desc": "Every order offset at checkout, packed in plastic-free, recycled materials.",
      "newsletter.title": "Stay close to the studio",
      "newsletter.sub": "New arrivals, restocks, and quiet seasonal notes — once or twice a month, never more.",
      "newsletter.emailLabel": "Email address",
      "newsletter.placeholder": "you@email.com",
      "newsletter.button": "Subscribe",
      "newsletter.confirm": "Thanks for subscribing — welcome to Linen &amp; Co.",
      "footer.tagline": "Considered essentials for a quieter home. Est. 2019, Copenhagen &amp; Lisbon.",
      "footer.shop.heading": "Shop",
      "footer.shop.living": "Living",
      "footer.shop.bedding": "Bedding",
      "footer.shop.tableware": "Tableware",
      "footer.shop.giftCards": "Gift Cards",
      "footer.help.heading": "Help",
      "footer.help.shipping": "Shipping &amp; Returns",
      "footer.help.track": "Track an Order",
      "footer.help.care": "Care Guide",
      "footer.help.contact": "Contact Us",
      "footer.about.heading": "About",
      "footer.about.story": "Our Story",
      "footer.about.workshops": "The Workshops",
      "footer.about.sustainability": "Sustainability",
      "footer.about.journal": "Journal",
      "footer.legal.heading": "Legal",
      "footer.legal.privacy": "Privacy Policy",
      "footer.legal.terms": "Terms of Service",
      "footer.legal.accessibility": "Accessibility",
      "footer.disclaimer": "This is a design sample from Al's portfolio — a demonstration, not a real, fully operational store.",
      "footer.copyright": "&copy; 2026 Linen &amp; Co. All rights reserved.",
      "cart.title": "Your Bag",
      "cart.subtotal": "Subtotal",
      "cart.note": "Shipping and taxes calculated at checkout.",
      "cart.checkout": "Checkout",
      "cart.emptyTitle": "Your bag is empty",
      "cart.emptyDesc": "Everything here is made to be lived with — take a look around.",
      "cart.continueShopping": "Continue shopping",
      "cart.confirmTitle": "Thank you — your order is on its way.",
      "cart.confirmDesc": "A confirmation has been sent to your inbox. We're already preparing it with care.",
      "cart.remove": "Remove",
      "product.addToCart": "Add to cart",
      "product.added": "Added ✓",
    },
    ru: {
      "announce.text": "Бесплатная доставка при заказе от $75 &nbsp;·&nbsp; Бесплатный возврат в течение 30 дней",
      "nav.new": "Новинки",
      "nav.living": "Гостиная",
      "nav.bedding": "Спальня",
      "nav.tableware": "Посуда",
      "nav.sale": "Распродажа",
      "filter.all": "Все",
      "filter.living": "Гостиная",
      "filter.bedding": "Спальня",
      "filter.tableware": "Посуда",
      "hero.eyebrow": "Осенняя коллекция, 2026",
      "hero.title": "Вещи на каждый день,<br>достойные тишины.",
      "hero.sub": "Льняное постельное бельё, керамика ручной работы и посуда из небольших мастерских Европы — мы выбираем вещи за то, как они стареют, а не только за то, как выглядят при покупке.",
      "hero.cta": "Смотреть коллекцию",
      "shop.title": "Коллекция",
      "values.item1.title": "Экологичное сырьё",
      "values.item1.desc": "Волокна и глина — из сертифицированных небольших ферм и мастерских, без массового производства.",
      "values.item2.title": "Сделано надолго",
      "values.item2.desc": "Усиленные швы, обожжённая керамика, дерево сухой выдержки — вещи на поколения, а не на сезон.",
      "values.item3.title": "Углеродно-нейтральная доставка",
      "values.item3.desc": "Выбросы каждого заказа компенсируются при оформлении, упаковка — из переработанных материалов без пластика.",
      "newsletter.title": "Будьте ближе к студии",
      "newsletter.sub": "Новинки, поступления и тихие сезонные заметки — раз-два в месяц, не чаще.",
      "newsletter.emailLabel": "Электронная почта",
      "newsletter.placeholder": "you@email.com",
      "newsletter.button": "Подписаться",
      "newsletter.confirm": "Спасибо за подписку — добро пожаловать в Linen &amp; Co.",
      "footer.tagline": "Продуманные вещи для более тихого дома. С 2019 года, Копенгаген и Лиссабон.",
      "footer.shop.heading": "Магазин",
      "footer.shop.living": "Гостиная",
      "footer.shop.bedding": "Спальня",
      "footer.shop.tableware": "Посуда",
      "footer.shop.giftCards": "Подарочные карты",
      "footer.help.heading": "Помощь",
      "footer.help.shipping": "Доставка и возврат",
      "footer.help.track": "Отследить заказ",
      "footer.help.care": "Уход за изделиями",
      "footer.help.contact": "Связаться с нами",
      "footer.about.heading": "О нас",
      "footer.about.story": "Наша история",
      "footer.about.workshops": "Мастерские",
      "footer.about.sustainability": "Устойчивость",
      "footer.about.journal": "Журнал",
      "footer.legal.heading": "Правовая информация",
      "footer.legal.privacy": "Политика конфиденциальности",
      "footer.legal.terms": "Условия использования",
      "footer.legal.accessibility": "Доступность",
      "footer.disclaimer": "Это демонстрационный пример из портфолио Эла — иллюстрация, а не настоящий действующий магазин.",
      "footer.copyright": "&copy; 2026 Linen &amp; Co. Все права защищены.",
      "cart.title": "Ваша корзина",
      "cart.subtotal": "Промежуточный итог",
      "cart.note": "Доставка и налоги рассчитываются при оформлении заказа.",
      "cart.checkout": "Оформить заказ",
      "cart.emptyTitle": "Ваша корзина пуста",
      "cart.emptyDesc": "Всё здесь создано, чтобы жить рядом с вами — загляните ещё раз.",
      "cart.continueShopping": "Продолжить покупки",
      "cart.confirmTitle": "Спасибо — ваш заказ уже в пути.",
      "cart.confirmDesc": "Подтверждение отправлено на вашу почту. Мы уже бережно его готовим.",
      "cart.remove": "Удалить",
      "product.addToCart": "В корзину",
      "product.added": "Добавлено ✓",
    },
    uk: {
      "announce.text": "Безкоштовна доставка від $75 &nbsp;·&nbsp; Безкоштовне повернення протягом 30 днів",
      "nav.new": "Новинки",
      "nav.living": "Вітальня",
      "nav.bedding": "Спальня",
      "nav.tableware": "Посуд",
      "nav.sale": "Розпродаж",
      "filter.all": "Усі",
      "filter.living": "Вітальня",
      "filter.bedding": "Спальня",
      "filter.tableware": "Посуд",
      "hero.eyebrow": "Осіння колекція, 2026",
      "hero.title": "Речі на щодень,<br>гідні тихої якості.",
      "hero.sub": "Лляна постільна білизна, кераміка ручної роботи та посуд з невеликих майстерень Європи — ми обираємо речі за тим, як вони старіють, а не лише за першим враженням.",
      "hero.cta": "Переглянути колекцію",
      "shop.title": "Колекція",
      "values.item1.title": "Екологічна сировина",
      "values.item1.desc": "Волокна та глина — із сертифікованих невеликих ферм і майстерень, без масового видобутку.",
      "values.item2.title": "Створено надовго",
      "values.item2.desc": "Посилені шви, обпалена кераміка, витримане дерево — речі на покоління, а не на сезон.",
      "values.item3.title": "Вуглецево-нейтральна доставка",
      "values.item3.desc": "Викиди кожного замовлення компенсуються під час оформлення, упаковка — без пластику, з перероблених матеріалів.",
      "newsletter.title": "Будьте ближче до студії",
      "newsletter.sub": "Новинки, надходження та тихі сезонні нотатки — раз-два на місяць, не частіше.",
      "newsletter.emailLabel": "Електронна пошта",
      "newsletter.placeholder": "you@email.com",
      "newsletter.button": "Підписатися",
      "newsletter.confirm": "Дякуємо за підписку — ласкаво просимо до Linen &amp; Co.",
      "footer.tagline": "Продумані речі для тихішого дому. З 2019 року, Копенгаген і Лісабон.",
      "footer.shop.heading": "Крамниця",
      "footer.shop.living": "Вітальня",
      "footer.shop.bedding": "Спальня",
      "footer.shop.tableware": "Посуд",
      "footer.shop.giftCards": "Подарункові картки",
      "footer.help.heading": "Допомога",
      "footer.help.shipping": "Доставка і повернення",
      "footer.help.track": "Відстежити замовлення",
      "footer.help.care": "Догляд за виробами",
      "footer.help.contact": "Зв'язатися з нами",
      "footer.about.heading": "Про нас",
      "footer.about.story": "Наша історія",
      "footer.about.workshops": "Майстерні",
      "footer.about.sustainability": "Сталість",
      "footer.about.journal": "Журнал",
      "footer.legal.heading": "Юридична інформація",
      "footer.legal.privacy": "Політика конфіденційності",
      "footer.legal.terms": "Умови використання",
      "footer.legal.accessibility": "Доступність",
      "footer.disclaimer": "Це демонстраційний приклад із портфоліо Ела — ілюстрація, а не справжня діюча крамниця.",
      "footer.copyright": "&copy; 2026 Linen &amp; Co. Усі права захищено.",
      "cart.title": "Ваш кошик",
      "cart.subtotal": "Проміжний підсумок",
      "cart.note": "Доставка і податки розраховуються під час оформлення замовлення.",
      "cart.checkout": "Оформити замовлення",
      "cart.emptyTitle": "Ваш кошик порожній",
      "cart.emptyDesc": "Усе тут створено, щоб бути поруч із вами — погляньте ще раз.",
      "cart.continueShopping": "Продовжити покупки",
      "cart.confirmTitle": "Дякуємо — ваше замовлення вже в дорозі.",
      "cart.confirmDesc": "Підтвердження надіслано на вашу пошту. Ми вже дбайливо його готуємо.",
      "cart.remove": "Видалити",
      "product.addToCart": "У кошик",
      "product.added": "Додано ✓",
    },
    de: {
      "announce.text": "Kostenloser Versand ab $75 Bestellwert &nbsp;·&nbsp; Kostenlose Rücksendung innerhalb von 30 Tagen",
      "nav.new": "Neu",
      "nav.living": "Wohnen",
      "nav.bedding": "Bettwäsche",
      "nav.tableware": "Geschirr",
      "nav.sale": "Sale",
      "filter.all": "Alle",
      "filter.living": "Wohnen",
      "filter.bedding": "Bettwäsche",
      "filter.tableware": "Geschirr",
      "hero.eyebrow": "Herbstkollektion, 2026",
      "hero.title": "Alltagsgegenstände,<br>einer stilleren Qualität verpflichtet.",
      "hero.sub": "Leinenbettwäsche, handgetöpferte Keramik und Geschirr aus kleinen Werkstätten in ganz Europa — ausgewählt dafür, wie sie altern, nicht nur, wie sie ankommen.",
      "hero.cta": "Kollektion entdecken",
      "shop.title": "Die Kollektion",
      "values.item1.title": "Nachhaltig bezogen",
      "values.item1.desc": "Fasern und Tone stammen von zertifizierten Kleinbetrieben und Werkstätten — niemals aus Massenabbau.",
      "values.item2.title": "Für die Ewigkeit gemacht",
      "values.item2.desc": "Verstärkte Nähte, gebranntes Steinzeug, ofengetrocknete Hölzer — Erbstücke, keine Saisonware.",
      "values.item3.title": "Klimaneutraler Versand",
      "values.item3.desc": "Jede Bestellung wird beim Checkout kompensiert, verpackt in plastikfreiem, recyceltem Material.",
      "newsletter.title": "Bleiben Sie der Werkstatt nah",
      "newsletter.sub": "Neuheiten, Nachbestellungen und leise saisonale Notizen — ein- bis zweimal im Monat, nie mehr.",
      "newsletter.emailLabel": "E-Mail-Adresse",
      "newsletter.placeholder": "you@email.com",
      "newsletter.button": "Abonnieren",
      "newsletter.confirm": "Danke für Ihr Abonnement — willkommen bei Linen &amp; Co.",
      "footer.tagline": "Durchdachte Essentials für ein ruhigeres Zuhause. Seit 2019, Kopenhagen &amp; Lissabon.",
      "footer.shop.heading": "Shop",
      "footer.shop.living": "Wohnen",
      "footer.shop.bedding": "Bettwäsche",
      "footer.shop.tableware": "Geschirr",
      "footer.shop.giftCards": "Geschenkkarten",
      "footer.help.heading": "Hilfe",
      "footer.help.shipping": "Versand &amp; Rückgabe",
      "footer.help.track": "Bestellung verfolgen",
      "footer.help.care": "Pflegehinweise",
      "footer.help.contact": "Kontakt",
      "footer.about.heading": "Über uns",
      "footer.about.story": "Unsere Geschichte",
      "footer.about.workshops": "Die Werkstätten",
      "footer.about.sustainability": "Nachhaltigkeit",
      "footer.about.journal": "Journal",
      "footer.legal.heading": "Rechtliches",
      "footer.legal.privacy": "Datenschutz",
      "footer.legal.terms": "Nutzungsbedingungen",
      "footer.legal.accessibility": "Barrierefreiheit",
      "footer.disclaimer": "Dies ist ein Gestaltungsbeispiel aus Als Portfolio — eine Demonstration, kein echter, voll betriebener Shop.",
      "footer.copyright": "&copy; 2026 Linen &amp; Co. Alle Rechte vorbehalten.",
      "cart.title": "Ihre Tasche",
      "cart.subtotal": "Zwischensumme",
      "cart.note": "Versand und Steuern werden an der Kasse berechnet.",
      "cart.checkout": "Zur Kasse",
      "cart.emptyTitle": "Ihre Tasche ist leer",
      "cart.emptyDesc": "Alles hier ist zum Leben gemacht — schauen Sie sich um.",
      "cart.continueShopping": "Weiter einkaufen",
      "cart.confirmTitle": "Danke — Ihre Bestellung ist bereits unterwegs.",
      "cart.confirmDesc": "Eine Bestätigung wurde an Ihr Postfach gesendet. Wir bereiten sie bereits mit Sorgfalt vor.",
      "cart.remove": "Entfernen",
      "product.addToCart": "In den Warenkorb",
      "product.added": "Hinzugefügt ✓",
    },
    es: {
      "announce.text": "Envío gratuito en pedidos superiores a $75 &nbsp;·&nbsp; Devoluciones gratuitas en 30 días",
      "nav.new": "Nuevo",
      "nav.living": "Salón",
      "nav.bedding": "Ropa de cama",
      "nav.tableware": "Vajilla",
      "nav.sale": "Rebajas",
      "filter.all": "Todo",
      "filter.living": "Salón",
      "filter.bedding": "Ropa de cama",
      "filter.tableware": "Vajilla",
      "hero.eyebrow": "Colección de otoño, 2026",
      "hero.title": "Objetos cotidianos,<br>elevados a una quietud mayor.",
      "hero.sub": "Ropa de cama de lino, cerámica hecha a mano y vajilla de pequeños talleres de toda Europa — elegidos por cómo envejecen, no solo por cómo llegan.",
      "hero.cta": "Ver la colección",
      "shop.title": "La Colección",
      "values.item1.title": "Origen sostenible",
      "values.item1.desc": "Fibras y arcillas trazadas hasta pequeñas granjas y talleres certificados — nunca extracción masiva.",
      "values.item2.title": "Hecho para durar",
      "values.item2.desc": "Costuras reforzadas, gres cocido, maderas secadas en horno — piezas de herencia, no de temporada.",
      "values.item3.title": "Envío neutro en carbono",
      "values.item3.desc": "Cada pedido se compensa al finalizar la compra, empacado en materiales reciclados y libres de plástico.",
      "newsletter.title": "Mantente cerca del taller",
      "newsletter.sub": "Novedades, reposiciones y notas de temporada — una o dos veces al mes, nunca más.",
      "newsletter.emailLabel": "Correo electrónico",
      "newsletter.placeholder": "you@email.com",
      "newsletter.button": "Suscribirse",
      "newsletter.confirm": "Gracias por suscribirte — bienvenido a Linen &amp; Co.",
      "footer.tagline": "Esenciales pensados para un hogar más tranquilo. Desde 2019, Copenhague y Lisboa.",
      "footer.shop.heading": "Tienda",
      "footer.shop.living": "Salón",
      "footer.shop.bedding": "Ropa de cama",
      "footer.shop.tableware": "Vajilla",
      "footer.shop.giftCards": "Tarjetas de regalo",
      "footer.help.heading": "Ayuda",
      "footer.help.shipping": "Envíos y devoluciones",
      "footer.help.track": "Rastrear pedido",
      "footer.help.care": "Guía de cuidado",
      "footer.help.contact": "Contáctanos",
      "footer.about.heading": "Nosotros",
      "footer.about.story": "Nuestra historia",
      "footer.about.workshops": "Los talleres",
      "footer.about.sustainability": "Sostenibilidad",
      "footer.about.journal": "Diario",
      "footer.legal.heading": "Legal",
      "footer.legal.privacy": "Política de privacidad",
      "footer.legal.terms": "Términos de servicio",
      "footer.legal.accessibility": "Accesibilidad",
      "footer.disclaimer": "Esta es una muestra de diseño del portafolio de Al — una demostración, no una tienda real en funcionamiento.",
      "footer.copyright": "&copy; 2026 Linen &amp; Co. Todos los derechos reservados.",
      "cart.title": "Tu Bolsa",
      "cart.subtotal": "Subtotal",
      "cart.note": "Envío e impuestos calculados al finalizar la compra.",
      "cart.checkout": "Finalizar compra",
      "cart.emptyTitle": "Tu bolsa está vacía",
      "cart.emptyDesc": "Todo aquí está hecho para vivirse — echa un vistazo.",
      "cart.continueShopping": "Seguir comprando",
      "cart.confirmTitle": "Gracias — tu pedido ya está en camino.",
      "cart.confirmDesc": "Se ha enviado una confirmación a tu correo. Ya lo estamos preparando con cuidado.",
      "cart.remove": "Eliminar",
      "product.addToCart": "Añadir al carrito",
      "product.added": "Añadido ✓",
    },
  };

  function loadLang() {
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    return "en";
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}
  }

  let currentLang = loadLang();

  function t(key) {
    const dict = translations[currentLang] || translations.en;
    return dict[key] != null ? dict[key] : (translations.en[key] != null ? translations.en[key] : key);
  }

  function pField(field) {
    // field is a per-language object {en, ru, uk, de, es}
    if (!field) return "";
    return field[currentLang] != null ? field[currentLang] : field.en;
  }

  /* ===========================================================
     Product data (name / category / description are per-language)
     =========================================================== */
  const products = [
    {
      id: "p1",
      name: { en: "Stonewashed Duvet Cover", ru: "Пододеяльник «Стоунвош»", uk: "Підковдра «Стоунвош»", de: "Bettbezug Stonewashed", es: "Funda Nórdica Stonewashed" },
      categoryKey: "Bedding",
      category: { en: "Bedding", ru: "Спальня", uk: "Спальня", de: "Bettwäsche", es: "Ropa de cama" },
      price: 128,
      compareAt: null,
      description: {
        en: "European flax linen, washed soft, in oat.",
        ru: "Европейский лён, смягчён многократной стиркой, оттенок овсяный.",
        uk: "Європейський льон, м'яко випраний, відтінок вівсяний.",
        de: "Europäischer Leinenstoff, weich gewaschen, Farbton Haferbeige.",
        es: "Lino europeo, lavado suave, en tono avena.",
      },
      gradient: "grad-1",
      photo: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=700&q=70",
      isNew: true,
    },
    {
      id: "p2",
      name: { en: "Sculpted Stoneware Vase", ru: "Скульптурная ваза из керамики", uk: "Скульптурна ваза з кераміки", de: "Skulpturale Steinzeugvase", es: "Jarrón de Gres Escultural" },
      categoryKey: "Living",
      category: { en: "Living", ru: "Гостиная", uk: "Вітальня", de: "Wohnen", es: "Salón" },
      price: 58,
      compareAt: null,
      description: {
        en: "Hand-thrown, matte sand glaze, one of a kind.",
        ru: "Ручная работа, матовая песочная глазурь, каждая ваза уникальна.",
        uk: "Ручна робота, матова піщана глазур, кожна ваза унікальна.",
        de: "Handgetöpfert, matte Sandglasur, ein Unikat.",
        es: "Hecho a mano, esmalte mate color arena, pieza única.",
      },
      gradient: "grad-2",
      photo: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=700&q=70",
      isNew: false,
    },
    {
      id: "p3",
      name: { en: "Waffle-Weave Throw", ru: "Плед вафельного плетения", uk: "Плед вафельного плетіння", de: "Waffelpiqué-Decke", es: "Manta de Tejido Waffle" },
      categoryKey: "Living",
      category: { en: "Living", ru: "Гостиная", uk: "Вітальня", de: "Wohnen", es: "Salón" },
      price: 84,
      compareAt: null,
      description: {
        en: "Organic cotton, woven in Portugal, sage.",
        ru: "Органический хлопок, соткан в Португалии, цвет шалфей.",
        uk: "Органічна бавовна, зіткана в Португалії, колір шавлії.",
        de: "Bio-Baumwolle, gewebt in Portugal, Farbton Salbei.",
        es: "Algodón orgánico, tejido en Portugal, tono salvia.",
      },
      gradient: "grad-4",
      photo: "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=700&q=70",
      isNew: false,
    },
    {
      id: "p4",
      name: { en: "Hand-Blown Water Carafe", ru: "Графин ручной работы", uk: "Карафа ручної роботи", de: "Mundgeblasene Wasserkaraffe", es: "Garrafa de Agua Soplada a Mano" },
      categoryKey: "Tableware",
      category: { en: "Tableware", ru: "Посуда", uk: "Посуд", de: "Geschirr", es: "Vajilla" },
      price: 46,
      compareAt: null,
      description: {
        en: "Bubble-free glass, 1L, dishwasher safe.",
        ru: "Стекло без пузырьков, 1 л, можно мыть в посудомоечной машине.",
        uk: "Скло без бульбашок, 1 л, можна мити в посудомийній машині.",
        de: "Blasenfreies Glas, 1 L, spülmaschinenfest.",
        es: "Vidrio sin burbujas, 1 L, apto para lavavajillas.",
      },
      gradient: "grad-6",
      photo: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=700&q=70",
      isNew: false,
    },
    {
      id: "p5",
      name: { en: "Linen Pillowcase Set", ru: "Комплект льняных наволочек", uk: "Комплект лляних наволочок", de: "Leinen-Kissenbezug-Set", es: "Juego de Fundas de Almohada de Lino" },
      categoryKey: "Bedding",
      category: { en: "Bedding", ru: "Спальня", uk: "Спальня", de: "Bettwäsche", es: "Ropa de cama" },
      price: 44,
      compareAt: 54,
      description: {
        en: "Set of two, French seams, stonewashed.",
        ru: "Комплект из двух штук, французский шов, эффект стоунвош.",
        uk: "Комплект з двох штук, французький шов, ефект стоунвош.",
        de: "Set aus zwei Stück, französische Nähte, stonewashed.",
        es: "Juego de dos, costuras francesas, efecto stonewashed.",
      },
      gradient: "grad-5",
      photo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=70",
      isNew: false,
    },
    {
      id: "p6",
      name: { en: "Ash Wood Serving Board", ru: "Разделочная доска из ясеня", uk: "Дошка для подачі з ясена", de: "Servierbrett aus Eschenholz", es: "Tabla de Servir de Fresno" },
      categoryKey: "Tableware",
      category: { en: "Tableware", ru: "Посуда", uk: "Посуд", de: "Geschirr", es: "Vajilla" },
      price: 72,
      compareAt: null,
      description: {
        en: "Single-slab ash, food-safe oil finish.",
        ru: "Цельный массив ясеня, покрытие безопасным для пищи маслом.",
        uk: "Суцільний масив ясена, покриття безпечною для їжі олією.",
        de: "Aus einem Stück Eschenholz, lebensmittelechte Ölbehandlung.",
        es: "Fresno de una sola pieza, acabado con aceite apto para alimentos.",
      },
      gradient: "grad-8",
      photo: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=700&q=70",
      isNew: false,
    },
    {
      id: "p7",
      name: { en: "Ribbed Ceramic Dinner Set", ru: "Столовый набор с рифлёной керамикой", uk: "Столовий набір з рифленої кераміки", de: "Geripptes Keramik-Geschirrset", es: "Vajilla de Cerámica Acanalada" },
      categoryKey: "Tableware",
      category: { en: "Tableware", ru: "Посуда", uk: "Посуд", de: "Geschirr", es: "Vajilla" },
      price: 138,
      compareAt: null,
      description: {
        en: "4-piece setting, stoneware, oven to table.",
        ru: "Набор из 4 предметов, керамика, можно ставить в духовку.",
        uk: "Набір з 4 предметів, кераміка, можна ставити в духовку.",
        de: "4-teiliges Gedeck, Steinzeug, ofenfest bis zum Tisch.",
        es: "Set de 4 piezas, gres, apto para horno y mesa.",
      },
      gradient: "grad-3",
      photo: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=700&q=70",
      isNew: true,
    },
    {
      id: "p8",
      name: { en: "Woven Seagrass Basket", ru: "Плетёная корзина из морской травы", uk: "Плетений кошик з морської трави", de: "Geflochtener Seegras-Korb", es: "Cesta Tejida de Alga Marina" },
      categoryKey: "Living",
      category: { en: "Living", ru: "Гостиная", uk: "Вітальня", de: "Wohnen", es: "Salón" },
      price: 62,
      compareAt: null,
      description: {
        en: "Hand-woven storage, fits any shelf, natural.",
        ru: "Плетение ручной работы, подходит для любой полки, натуральный цвет.",
        uk: "Плетіння ручної роботи, підходить для будь-якої полиці, натуральний колір.",
        de: "Handgeflochten, passt auf jedes Regal, naturbelassen.",
        es: "Tejido a mano, encaja en cualquier estante, tono natural.",
      },
      gradient: "grad-9",
      photo: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?auto=format&fit=crop&w=700&q=70",
      isNew: false,
    },
    {
      id: "p9",
      name: { en: "Washed Linen Sheet Set", ru: "Комплект льняного постельного белья", uk: "Комплект лляної постільної білизни", de: "Gewaschenes Leinen-Bettwäsche-Set", es: "Juego de Sábanas de Lino Lavado" },
      categoryKey: "Bedding",
      category: { en: "Bedding", ru: "Спальня", uk: "Спальня", de: "Bettwäsche", es: "Ropa de cama" },
      price: 148,
      compareAt: null,
      description: {
        en: "Fitted, flat, and two shams, stonewashed.",
        ru: "Простыня на резинке, плоская простыня и две наволочки, стоунвош.",
        uk: "Простирадло на резинці, пласке простирадло та дві наволочки, стоунвош.",
        de: "Spannbetttuch, Betttuch und zwei Kissenbezüge, stonewashed.",
        es: "Sábana bajera, encimera y dos fundas, efecto stonewashed.",
      },
      gradient: "grad-7",
      photo: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=700&q=70",
      isNew: true,
    },
    {
      id: "p10",
      name: { en: "Cedar & Clove Candle", ru: "Свеча «Кедр и гвоздика»", uk: "Свічка «Кедр і гвоздика»", de: "Zedern- & Nelken-Kerze", es: "Vela de Cedro y Clavo" },
      categoryKey: "Living",
      category: { en: "Living", ru: "Гостиная", uk: "Вітальня", de: "Wohnen", es: "Salón" },
      price: 32,
      compareAt: 38,
      description: {
        en: "Soy-coconut wax, 45-hour burn, amber glass.",
        ru: "Соево-кокосовый воск, время горения 45 часов, стекло янтарного цвета.",
        uk: "Соєво-кокосовий віск, час горіння 45 годин, скло бурштинового кольору.",
        de: "Soja-Kokos-Wachs, 45 Stunden Brenndauer, Bernsteinglas.",
        es: "Cera de soja y coco, 45 horas de combustión, vidrio ámbar.",
      },
      gradient: "grad-10",
      photo: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=70",
      isNew: false,
    },
  ];

  /* ===========================================================
     Utilities
     =========================================================== */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const money = (n) => "$" + n.toFixed(2);

  const byId = {};
  products.forEach((p) => (byId[p.id] = p));

  /* ===========================================================
     Cart state (persisted in localStorage)
     =========================================================== */
  const CART_KEY = "linenco_cart";
  const WISHLIST_KEY = "linenco_wishlist";

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      // sanitize: only keep known product ids with positive integer qty
      const clean = {};
      Object.keys(parsed).forEach((id) => {
        if (byId[id] && Number.isFinite(parsed[id]) && parsed[id] > 0) {
          clean[id] = Math.floor(parsed[id]);
        }
      });
      return clean;
    } catch (e) {
      return {};
    }
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function loadWishlist() {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      if (!raw) return {};
      return JSON.parse(raw);
    } catch (e) {
      return {};
    }
  }

  function saveWishlist() {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }

  let cart = loadCart(); // { productId: qty }
  let wishlist = loadWishlist(); // { productId: true }
  let checkoutConfirmed = false;

  function cartCount() {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }

  function cartSubtotal() {
    return Object.keys(cart).reduce((sum, id) => {
      const p = byId[id];
      if (!p) return sum;
      return sum + p.price * cart[id];
    }, 0);
  }

  /* ===========================================================
     Product grid rendering
     =========================================================== */
  const gridEl = $("#productGrid");
  let currentFilter = "All";

  function productCardHTML(p) {
    const name = pField(p.name);
    const category = pField(p.category);
    const description = pField(p.description);
    const badge = p.isNew
      ? '<span class="badge">' + t("nav.new") + "</span>"
      : p.compareAt
      ? '<span class="badge badge--sale">' + t("nav.sale") + "</span>"
      : "";
    const priceHTML = p.compareAt
      ? `<span class="now">${money(p.price)}</span><span class="was">${money(p.compareAt)}</span>`
      : `<span class="now">${money(p.price)}</span>`;
    const wished = wishlist[p.id] ? "is-active" : "";

    return `
      <article class="product-card ${p.gradient}" data-id="${p.id}" data-category="${p.categoryKey}">
        <div class="product-card__media">
          <div class="product-card__media-inner"><img src="${p.photo}" alt="${name}" loading="lazy" onerror="this.remove()"></div>
          ${badge}
          <button class="wishlist-btn ${wished}" data-wishlist="${p.id}" aria-label="Toggle wishlist for ${name}" aria-pressed="${!!wishlist[p.id]}">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 20.2s-7.6-4.6-10-9.3C.4 7.5 2 4 5.6 4c2.1 0 3.6 1.2 4.4 2.6C10.8 5.2 12.3 4 14.4 4 18 4 19.6 7.5 22 10.9c-2.4 4.7-10 9.3-10 9.3Z"/></svg>
          </button>
          <button class="quick-add" data-add="${p.id}">${t("product.addToCart")}</button>
        </div>
        <p class="product-card__category">${category}</p>
        <h3 class="product-card__name">${name}</h3>
        <p class="product-card__desc">${description}</p>
        <div class="product-card__price">${priceHTML}</div>
      </article>
    `;
  }

  function renderGrid() {
    const list =
      currentFilter === "All"
        ? products
        : products.filter((p) => p.categoryKey === currentFilter);
    gridEl.innerHTML = list.map(productCardHTML).join("");
  }

  function setFilter(filter) {
    currentFilter = filter;
    $$(".filter-btn").forEach((btn) => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", String(active));
    });
    renderGrid();
  }

  $("#filterBar").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    setFilter(btn.dataset.filter);
  });

  // Nav links: "New" / "Sale" apply a special filter; category links map directly.
  function handleFilterLink(key) {
    if (key === "new") {
      currentFilter = "All";
      $$(".filter-btn").forEach((b) => {
        b.classList.toggle("is-active", b.dataset.filter === "All");
        b.setAttribute("aria-selected", String(b.dataset.filter === "All"));
      });
      gridEl.innerHTML = products.filter((p) => p.isNew).map(productCardHTML).join("");
    } else if (key === "sale") {
      currentFilter = "All";
      $$(".filter-btn").forEach((b) => {
        b.classList.toggle("is-active", b.dataset.filter === "All");
        b.setAttribute("aria-selected", String(b.dataset.filter === "All"));
      });
      gridEl.innerHTML = products.filter((p) => p.compareAt).map(productCardHTML).join("");
    } else {
      setFilter(key);
    }
  }

  $$("[data-filter-link]").forEach((link) => {
    link.addEventListener("click", () => {
      handleFilterLink(link.dataset.filterLink);
      closeMobileNav();
    });
  });

  // Delegated events for add-to-cart and wishlist (grid re-renders, so delegate on parent)
  gridEl.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      addToCart(addBtn.dataset.add);
      addBtn.textContent = t("product.added");
      addBtn.classList.add("is-added");
      setTimeout(() => {
        addBtn.textContent = t("product.addToCart");
        addBtn.classList.remove("is-added");
      }, 1200);
      return;
    }
    const wishBtn = e.target.closest("[data-wishlist]");
    if (wishBtn) {
      toggleWishlist(wishBtn.dataset.wishlist);
      const active = !!wishlist[wishBtn.dataset.wishlist];
      wishBtn.classList.toggle("is-active", active);
      wishBtn.setAttribute("aria-pressed", String(active));
    }
  });

  function toggleWishlist(id) {
    if (wishlist[id]) {
      delete wishlist[id];
    } else {
      wishlist[id] = true;
    }
    saveWishlist();
  }

  /* ===========================================================
     Cart drawer
     =========================================================== */
  const cartDrawer = $("#cartDrawer");
  const drawerOverlay = $("#drawerOverlay");
  const cartBody = $("#cartBody");
  const cartFoot = $("#cartFoot");
  const cartBadge = $("#cartBadge");
  const cartSubtotalEl = $("#cartSubtotal");

  function addToCart(id) {
    checkoutConfirmed = false;
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();
    updateBadge();
    openCart();
  }

  function setQty(id, qty) {
    if (qty <= 0) {
      delete cart[id];
    } else {
      cart[id] = qty;
    }
    saveCart();
    renderCart();
    updateBadge();
  }

  function removeFromCart(id) {
    delete cart[id];
    saveCart();
    renderCart();
    updateBadge();
  }

  function updateBadge() {
    const count = cartCount();
    cartBadge.textContent = String(count);
    cartBadge.classList.remove("bump");
    // force reflow to restart animation
    void cartBadge.offsetWidth;
    cartBadge.classList.add("bump");
  }

  function cartItemHTML(id) {
    const p = byId[id];
    const qty = cart[id];
    const name = pField(p.name);
    const category = pField(p.category);
    return `
      <div class="cart-item" data-id="${id}">
        <div class="cart-item__media ${p.gradient}">
          <div class="cart-item__media-inner"><img src="${p.photo}" alt="${name}" loading="lazy" onerror="this.remove()"></div>
        </div>
        <div class="cart-item__info">
          <h4>${name}</h4>
          <p class="cat">${category}</p>
          <p class="price">${money(p.price)}</p>
        </div>
        <div class="cart-item__actions">
          <div class="qty-stepper">
            <button data-step="-1" data-id="${id}" aria-label="Decrease quantity">−</button>
            <span>${qty}</span>
            <button data-step="1" data-id="${id}" aria-label="Increase quantity">+</button>
          </div>
          <button class="remove-btn" data-remove="${id}">${t("cart.remove")}</button>
        </div>
      </div>
    `;
  }

  function emptyStateHTML() {
    return `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
        <h3>${t("cart.emptyTitle")}</h3>
        <p>${t("cart.emptyDesc")}</p>
        <button class="btn btn--primary" id="continueShoppingBtn">${t("cart.continueShopping")}</button>
      </div>
    `;
  }

  function confirmStateHTML() {
    return `
      <div class="cart-confirm">
        <span class="check-circle">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 9.5 17.5 20 6.5"/></svg>
        </span>
        <h3>${t("cart.confirmTitle")}</h3>
        <p>${t("cart.confirmDesc")}</p>
        <button class="btn btn--primary" id="continueShoppingBtn2">${t("cart.continueShopping")}</button>
      </div>
    `;
  }

  function renderCart() {
    const ids = Object.keys(cart);

    if (checkoutConfirmed) {
      cartBody.innerHTML = confirmStateHTML();
      cartFoot.style.display = "none";
      return;
    }

    if (ids.length === 0) {
      cartBody.innerHTML = emptyStateHTML();
      cartFoot.style.display = "none";
      return;
    }

    cartFoot.style.display = "block";
    cartBody.innerHTML = ids.map(cartItemHTML).join("");
    cartSubtotalEl.textContent = money(cartSubtotal());
  }

  // Delegated cart body events: qty stepper, remove, continue shopping
  cartBody.addEventListener("click", (e) => {
    const stepBtn = e.target.closest("[data-step]");
    if (stepBtn) {
      const id = stepBtn.dataset.id;
      const delta = parseInt(stepBtn.dataset.step, 10);
      setQty(id, (cart[id] || 0) + delta);
      return;
    }
    const removeBtn = e.target.closest("[data-remove]");
    if (removeBtn) {
      removeFromCart(removeBtn.dataset.remove);
      return;
    }
    if (e.target.closest("#continueShoppingBtn") || e.target.closest("#continueShoppingBtn2")) {
      closeCart();
    }
  });

  $("#checkoutBtn").addEventListener("click", () => {
    if (Object.keys(cart).length === 0) return;
    checkoutConfirmed = true;
    cart = {};
    saveCart();
    renderCart();
    updateBadge();
  });

  function openCart() {
    checkoutConfirmed = false;
    renderCart();
    cartDrawer.classList.add("is-open");
    cartDrawer.setAttribute("aria-hidden", "false");
    drawerOverlay.classList.add("is-visible");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    cartDrawer.classList.remove("is-open");
    cartDrawer.setAttribute("aria-hidden", "true");
    drawerOverlay.classList.remove("is-visible");
    document.body.style.overflow = "";
    // reset confirmation view after the close transition so next open starts fresh
    setTimeout(() => {
      if (!cartDrawer.classList.contains("is-open")) {
        checkoutConfirmed = false;
        renderCart();
      }
    }, 400);
  }

  $("#cartBtn").addEventListener("click", () => {
    if (cartDrawer.classList.contains("is-open")) {
      closeCart();
    } else {
      openCart();
    }
  });
  $("#closeCartBtn").addEventListener("click", closeCart);
  drawerOverlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartDrawer.classList.contains("is-open")) {
      closeCart();
    }
  });

  /* ===========================================================
     Mobile nav
     =========================================================== */
  const hamburgerBtn = $("#hamburgerBtn");
  const mobileNav = $("#mobileNav");

  function closeMobileNav() {
    hamburgerBtn.classList.remove("is-open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
  }

  hamburgerBtn.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("is-open");
    hamburgerBtn.classList.toggle("is-open", open);
    hamburgerBtn.setAttribute("aria-expanded", String(open));
  });

  /* ===========================================================
     Newsletter form
     =========================================================== */
  const newsletterForm = $("#newsletterForm");
  const newsletterConfirm = $("#newsletterConfirm");

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = $("#newsletterEmail");
    if (!emailInput.value || !emailInput.checkValidity()) {
      emailInput.focus();
      return;
    }
    newsletterForm.hidden = true;
    newsletterConfirm.hidden = false;
    emailInput.value = "";
  });

  /* ===========================================================
     Language switcher
     =========================================================== */
  const langSwitch = $("#langSwitch");
  const langSwitchBtn = $("#langSwitchBtn");
  const langSwitchMenu = $("#langSwitchMenu");
  const langSwitchCurrent = $("#langSwitchCurrent");

  function applyStaticTranslations() {
    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.innerHTML = t(key);
    });
    $$("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", t(key));
    });
    document.documentElement.setAttribute("lang", currentLang);
    langSwitchCurrent.textContent = currentLang.toUpperCase();
    $$(".lang-switch__menu li").forEach((li) => {
      li.classList.toggle("is-active", li.dataset.lang === currentLang);
    });
  }

  function setLang(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) return;
    currentLang = lang;
    saveLang(lang);
    applyStaticTranslations();
    // Re-render dynamic content that carries per-language product fields.
    renderGrid();
    renderCart();
  }

  function openLangMenu() {
    langSwitch.classList.add("is-open");
    langSwitchBtn.setAttribute("aria-expanded", "true");
  }
  function closeLangMenu() {
    langSwitch.classList.remove("is-open");
    langSwitchBtn.setAttribute("aria-expanded", "false");
  }

  langSwitchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (langSwitch.classList.contains("is-open")) {
      closeLangMenu();
    } else {
      openLangMenu();
    }
  });

  langSwitchMenu.addEventListener("click", (e) => {
    const li = e.target.closest("li[data-lang]");
    if (!li) return;
    setLang(li.dataset.lang);
    closeLangMenu();
  });

  document.addEventListener("click", (e) => {
    if (!langSwitch.contains(e.target)) closeLangMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLangMenu();
  });

  /* ===========================================================
     Init
     =========================================================== */
  applyStaticTranslations();
  renderGrid();
  updateBadge();
  // initialize badge without the bump animation on first load
  cartBadge.classList.remove("bump");
})();

/* ---- Custom cursor: dot with glow (unified across portfolio) ---- */
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var dot = document.createElement('div'); dot.className = 'cursor-dot';
  document.body.appendChild(dot);
  document.body.classList.add('has-custom-cursor');

  // Position is set directly on mousemove; the CSS `transition` on
  // left/top does the easing. No requestAnimationFrame loop, so there's
  // nothing for a browser to suspend/stall while a tab is backgrounded —
  // the dot just picks up exactly where it should on the next mousemove.
  window.addEventListener('mousemove', function (e) {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    dot.style.opacity = 1;
  }, { passive: true });

  var hoverSel = 'a,button,input,select,textarea,label,[role="button"],.card,.filter-btn,.toggle-btn,.menu__tab,.product-card,.listing-card,.wishlist-btn,.fav-btn,.quick-add,th.sortable,.nav-link,.icon-btn,.donut-slice,.donut-legend-item,.sidebar-collapse-btn';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest && e.target.closest(hoverSel)) dot.classList.add('is-hover');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest && e.target.closest(hoverSel)) dot.classList.remove('is-hover');
  });
  document.addEventListener('mouseleave', function () { dot.style.opacity = 0; });
})();
