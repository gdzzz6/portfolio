(function () {
  'use strict';

  /* ---------------------------------------------------
     Sticky nav background on scroll
  --------------------------------------------------- */
  var header = document.getElementById('siteHeader');
  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------- */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');

  function closeMobileNav() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  /* ---------------------------------------------------
     Listings filter (category + buy/rent + price range)
  --------------------------------------------------- */
  var filterBar = document.getElementById('filterBar');
  var listingToggle = document.getElementById('listingToggle');
  var listingGrid = document.getElementById('listingGrid');
  var noResults = document.getElementById('noResults');
  var cards = Array.prototype.slice.call(listingGrid.querySelectorAll('.listing-card'));

  var currentCategory = 'all';
  var currentListingType = 'sale';
  var currentPriceMin = 0;
  var currentPriceMax = Infinity;

  function applyAllFilters() {
    var visibleCount = 0;
    cards.forEach(function (card) {
      var price = parseFloat(card.dataset.price) || 0;
      var matches =
        (currentCategory === 'all' || card.dataset.type === currentCategory) &&
        card.dataset.listingType === currentListingType &&
        price >= currentPriceMin && price <= currentPriceMax;

      if (matches) {
        card.classList.remove('hidden-card');
        visibleCount++;
        card.classList.remove('reveal');
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            card.classList.add('reveal');
          });
        });
      } else {
        card.classList.add('hidden-card');
      }
    });
    noResults.hidden = visibleCount !== 0;
  }

  filterBar.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    currentCategory = btn.dataset.filter;
    applyAllFilters();
  });

  listingToggle.addEventListener('click', function (e) {
    var btn = e.target.closest('.toggle-btn');
    if (!btn) return;
    listingToggle.querySelectorAll('.toggle-btn').forEach(function (b) {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    currentListingType = btn.dataset.listingType;
    applyAllFilters();
  });

  /* ---------------------------------------------------
     Dual-handle price range slider ($150 - $15,000,000, log scale)
  --------------------------------------------------- */
  var PRICE_FLOOR = 150;
  var PRICE_CEIL = 15000000;
  var SLIDER_STEPS = 1000;
  var SLIDER_GAP = 12; // minimum step gap between handles

  var priceMinInput = document.getElementById('priceMin');
  var priceMaxInput = document.getElementById('priceMax');
  var priceRangeFill = document.getElementById('priceRangeFill');
  var priceSliderValue = document.getElementById('priceSliderValue');

  function posToPrice(pos) {
    var minLog = Math.log(PRICE_FLOOR);
    var maxLog = Math.log(PRICE_CEIL);
    var scale = (maxLog - minLog) / SLIDER_STEPS;
    return Math.round(Math.exp(minLog + scale * pos));
  }

  function formatMoney(v) {
    return '$' + Math.round(v).toLocaleString('en-US');
  }

  function updatePriceSlider() {
    var minPos = parseInt(priceMinInput.value, 10);
    var maxPos = parseInt(priceMaxInput.value, 10);

    if (minPos > maxPos - SLIDER_GAP) {
      if (document.activeElement === priceMinInput) {
        minPos = maxPos - SLIDER_GAP;
        priceMinInput.value = minPos;
      } else {
        maxPos = minPos + SLIDER_GAP;
        priceMaxInput.value = maxPos;
      }
    }

    var minPct = (minPos / SLIDER_STEPS) * 100;
    var maxPct = (maxPos / SLIDER_STEPS) * 100;
    priceRangeFill.style.left = minPct + '%';
    priceRangeFill.style.right = (100 - maxPct) + '%';

    currentPriceMin = minPos <= 0 ? PRICE_FLOOR : posToPrice(minPos);
    currentPriceMax = maxPos >= SLIDER_STEPS ? Infinity : posToPrice(maxPos);

    var maxLabel = maxPos >= SLIDER_STEPS ? formatMoney(PRICE_CEIL) + '+' : formatMoney(currentPriceMax);
    priceSliderValue.textContent = formatMoney(currentPriceMin) + ' – ' + maxLabel;

    applyAllFilters();
  }

  priceMinInput.addEventListener('input', updatePriceSlider);
  priceMaxInput.addEventListener('input', updatePriceSlider);
  updatePriceSlider();

  /* ---------------------------------------------------
     Favorite / heart toggle
  --------------------------------------------------- */
  listingGrid.addEventListener('click', function (e) {
    var favBtn = e.target.closest('.fav-btn');
    if (!favBtn) return;
    var active = favBtn.classList.toggle('active');
    favBtn.setAttribute('aria-pressed', String(active));
  });

  /* ---------------------------------------------------
     Hero search bar -> filters listings + scrolls down
  --------------------------------------------------- */
  var searchBar = document.getElementById('searchBar');
  var searchType = document.getElementById('searchType');

  searchBar.addEventListener('submit', function (e) {
    e.preventDefault();
    var type = searchType.value || 'all';

    // sync the filter pill state
    var targetBtn = filterBar.querySelector('[data-filter="' + type + '"]') ||
                     filterBar.querySelector('[data-filter="all"]');
    filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    targetBtn.classList.add('active');
    targetBtn.setAttribute('aria-selected', 'true');

    currentCategory = targetBtn.dataset.filter;
    applyAllFilters();

    document.getElementById('listings').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ---------------------------------------------------
     Contact form submit confirmation
  --------------------------------------------------- */
  var contactForm = document.getElementById('contactForm');
  var formConfirm = document.getElementById('formConfirm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    formConfirm.hidden = false;
    contactForm.reset();
    formConfirm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  /* ---------------------------------------------------
     Scroll-reveal for listing cards (IntersectionObserver)
  --------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    cards.forEach(function (card) {
      observer.observe(card);
    });
  } else {
    cards.forEach(function (card) { card.classList.add('reveal'); });
  }

})();

/* =========================================================
   Language switcher / i18n
   ========================================================= */
(function () {
  'use strict';

  var LANG_KEY = 'portfolio_lang';
  var LABELS = { en: 'EN', ru: 'RU', uk: 'UA', de: 'DE', es: 'ES' };

  var translations = {
    en: {
      'nav.listings': 'Listings',
      'nav.about': 'About',
      'nav.agents': 'Agents',
      'nav.contact': 'Contact',
      'nav.cta': 'Book a Viewing',

      'hero.eyebrow': 'Est. 2008 — Curated Real Estate',
      'hero.title': 'Homes that hold<br>their <em>vantage.</em>',
      'hero.sub': 'We represent an exclusive portfolio of architecturally significant homes, penthouses and estates for discerning buyers and sellers across the globe.',
      'hero.scroll': 'Scroll',

      'search.location.label': 'Location',
      'search.location.any': 'Any Location',
      'search.location.london': 'London',
      'search.location.newyork': 'New York',
      'search.location.la': 'Los Angeles',
      'search.location.paris': 'Paris',
      'search.location.dubai': 'Dubai',
      'search.type.label': 'Property Type',
      'search.type.all': 'All Types',
      'search.price.label': 'Price Range',
      'search.price.any': 'Any Price',
      'search.submit': 'Search',

      'listings.eyebrow': 'Featured Portfolio',
      'listings.heading': 'Current Listings',
      'listings.sub': "A hand-selected edit of the properties currently represented by Vantage Estates.",
      'listings.noResults': 'No properties currently match this filter — please check back soon or contact an agent for off-market opportunities.',

      'toggle.sale': 'For Sale',
      'toggle.rent': 'For Rent',
      'filter.all': 'All',
      'filter.house': 'Houses',
      'filter.apartment': 'Apartments',
      'filter.villa': 'Villas',
      'price.label': 'Price range',

      'badge.sale': 'For Sale',
      'badge.new': 'New',
      'badge.rent': 'For Rent',
      'type.house': 'House',
      'type.apartment': 'Apartment',
      'type.villa': 'Villa',
      'unit.beds': 'Beds',
      'unit.baths': 'Baths',
      'unit.sqft': 'sqft',
      'unit.perMonth': '/mo',

      'stats.sales': 'In Property Sales',
      'stats.sold': 'Properties Sold',
      'stats.years': 'Years of Experience',
      'stats.satisfaction': 'Client Satisfaction',

      'agents.eyebrow': 'The People',
      'agents.heading': 'Meet Our Agents',
      'agents.sub': "A close-knit team of specialists, each fluent in a different corner of the world's luxury market.",
      'agent1.title': 'Founding Partner, European Estates',
      'agent1.bio': 'Formerly of a leading Parisian auction house, Alexandra has placed over 120 landmark residences across France, Monaco and the UK in the last decade.',
      'agent2.title': 'Director, New York & Northeast',
      'agent2.bio': "James built his reputation on Manhattan's most competitive off-market deals, closing more penthouse transactions than any agent in his cohort.",
      'agent3.title': 'Head of Gulf & Emerging Markets',
      'agent3.bio': 'Sophia advises a portfolio of private clients across Dubai and Abu Dhabi, specializing in waterfront villas and branded residences.',
      'agent4.title': 'Senior Agent, West Coast',
      'agent4.bio': 'A Los Angeles native, Daniel pairs deep neighborhood knowledge with a design-forward eye, representing architect-built homes from Malibu to the Hills.',

      'testimonials.eyebrow': 'Client Stories',
      'testimonials.heading': 'What Our Clients Say',
      'testimonial1.quote': "Vantage Estates found us a home that wasn't even on the market yet. Their discretion and market knowledge made a very private search feel effortless.",
      'testimonial1.author': '— Richard & Elena Hastings, Belgravia buyers',
      'testimonial2.quote': 'We sold our penthouse within three weeks, above asking, to a buyer James sourced through his own network. It never even needed to hit the open market.',
      'testimonial2.author': '— Marcus Chen, Riverside Park seller',
      'testimonial3.quote': 'Sophia understood exactly what we wanted before we could fully articulate it ourselves. The villa she found us has exceeded every expectation.',
      'testimonial3.author': '— The Al-Farsi Family, Palm Jumeirah buyers',

      'contact.eyebrow': 'Get In Touch',
      'contact.heading': "Let's find your<br>next address.",
      'contact.sub': "Whether you're buying, selling or simply exploring what's possible, our team responds personally within one business day.",

      'form.name.label': 'Full Name',
      'form.name.placeholder': 'Jane Whitfield',
      'form.email.label': 'Email Address',
      'form.email.placeholder': 'jane@example.com',
      'form.phone.label': 'Phone Number',
      'form.phone.placeholder': '+1 (555) 000-0000',
      'form.message.label': 'Message',
      'form.message.placeholder': "Tell us what you're looking for...",
      'form.submit': 'Send Enquiry',
      'form.confirm': "Thank you — we'll be in touch within one business day.",

      'footer.tagline': "Curated representation for the world's most distinctive homes.",
      'footer.explore': 'Explore',
      'footer.contact': 'Contact',
      'footer.follow': 'Follow',
      'footer.rights': 'All rights reserved.',
      'footer.disclaimer': "This is a design sample from Al's portfolio — a demonstration, not a real, fully operational agency."
    },

    ru: {
      'nav.listings': 'Объекты',
      'nav.about': 'О нас',
      'nav.agents': 'Агенты',
      'nav.contact': 'Контакты',
      'nav.cta': 'Записаться на показ',

      'hero.eyebrow': 'С 2008 года — избранная недвижимость',
      'hero.title': 'Дома, которые<br>держат <em>высоту.</em>',
      'hero.sub': 'Мы представляем эксклюзивный портфель архитектурно значимых домов, пентхаусов и поместий для взыскательных покупателей и продавцов по всему миру.',
      'hero.scroll': 'Прокрутите',

      'search.location.label': 'Локация',
      'search.location.any': 'Любая локация',
      'search.location.london': 'Лондон',
      'search.location.newyork': 'Нью-Йорк',
      'search.location.la': 'Лос-Анджелес',
      'search.location.paris': 'Париж',
      'search.location.dubai': 'Дубай',
      'search.type.label': 'Тип недвижимости',
      'search.type.all': 'Все типы',
      'search.price.label': 'Ценовой диапазон',
      'search.price.any': 'Любая цена',
      'search.submit': 'Искать',

      'listings.eyebrow': 'Избранный портфель',
      'listings.heading': 'Текущие объекты',
      'listings.sub': 'Тщательно отобранная подборка объектов, которые в настоящее время представляет Vantage Estates.',
      'listings.noResults': 'По этому фильтру объектов пока нет — загляните позже или свяжитесь с агентом, чтобы узнать о внебиржевых предложениях.',

      'toggle.sale': 'Продажа',
      'toggle.rent': 'Аренда',
      'filter.all': 'Все',
      'filter.house': 'Дома',
      'filter.apartment': 'Апартаменты',
      'filter.villa': 'Виллы',
      'price.label': 'Диапазон цен',

      'badge.sale': 'Продаётся',
      'badge.new': 'Новинка',
      'badge.rent': 'Аренда',
      'type.house': 'Дом',
      'type.apartment': 'Апартаменты',
      'type.villa': 'Вилла',
      'unit.beds': 'спален',
      'unit.baths': 'санузлов',
      'unit.sqft': 'кв. фут.',
      'unit.perMonth': '/мес.',

      'stats.sales': 'объём продаж недвижимости',
      'stats.sold': 'объектов продано',
      'stats.years': 'лет опыта',
      'stats.satisfaction': 'удовлетворённость клиентов',

      'agents.eyebrow': 'Наша команда',
      'agents.heading': 'Наши агенты',
      'agents.sub': 'Сплочённая команда специалистов, каждый из которых знает свой уголок мирового рынка элитной недвижимости.',
      'agent1.title': 'Партнёр-основатель, европейская недвижимость',
      'agent1.bio': 'Ранее сотрудница ведущего парижского аукционного дома, Александра за последнее десятилетие продала более 120 знаковых резиденций во Франции, Монако и Великобритании.',
      'agent2.title': 'Директор по Нью-Йорку и Северо-Востоку',
      'agent2.bio': 'Джеймс заработал репутацию на самых конкурентных внебиржевых сделках Манхэттена, закрыв больше сделок по пентхаусам, чем любой агент его поколения.',
      'agent3.title': 'Руководитель направления стран Персидского залива',
      'agent3.bio': 'София консультирует частных клиентов в Дубае и Абу-Даби, специализируясь на виллах у воды и брендированных резиденциях.',
      'agent4.title': 'Старший агент, Западное побережье',
      'agent4.bio': 'Уроженец Лос-Анджелеса, Дэниел сочетает глубокое знание районов с чутьём к дизайну, представляя дома от архитекторов от Малибу до Голливудских холмов.',

      'testimonials.eyebrow': 'Истории клиентов',
      'testimonials.heading': 'Что говорят наши клиенты',
      'testimonial1.quote': 'Vantage Estates нашли для нас дом, который ещё даже не был выставлен на продажу. Их деликатность и знание рынка сделали очень приватный поиск удивительно лёгким.',
      'testimonial1.author': '— Ричард и Елена Хастингс, покупатели в Белгравии',
      'testimonial2.quote': 'Мы продали свой пентхаус за три недели дороже начальной цены покупателю, найденному через собственную сеть контактов Джеймса. Объект даже не попал на открытый рынок.',
      'testimonial2.author': '— Маркус Чен, продавец в Риверсайд-Парк',
      'testimonial3.quote': 'София поняла, чего мы хотим, ещё до того, как мы смогли это сформулировать. Найденная ею вилла превзошла все ожидания.',
      'testimonial3.author': '— Семья Аль-Фарси, покупатели на Пальме Джумейра',

      'contact.eyebrow': 'Связаться с нами',
      'contact.heading': 'Найдём ваш<br>следующий адрес.',
      'contact.sub': 'Планируете покупку, продажу или просто изучаете возможности — наша команда ответит лично в течение одного рабочего дня.',

      'form.name.label': 'Полное имя',
      'form.name.placeholder': 'Анна Смирнова',
      'form.email.label': 'Электронная почта',
      'form.email.placeholder': 'anna@example.com',
      'form.phone.label': 'Номер телефона',
      'form.phone.placeholder': '+7 (900) 000-00-00',
      'form.message.label': 'Сообщение',
      'form.message.placeholder': 'Расскажите, что вы ищете...',
      'form.submit': 'Отправить заявку',
      'form.confirm': 'Спасибо — мы свяжемся с вами в течение одного рабочего дня.',

      'footer.tagline': 'Индивидуальное сопровождение сделок с самыми выдающимися домами мира.',
      'footer.explore': 'Разделы',
      'footer.contact': 'Контакты',
      'footer.follow': 'Мы в соцсетях',
      'footer.rights': 'Все права защищены.',
      'footer.disclaimer': 'Это демонстрационный пример из портфолио Al — не настоящее и не действующее агентство недвижимости.'
    },

    uk: {
      'nav.listings': 'Об’єкти',
      'nav.about': 'Про нас',
      'nav.agents': 'Агенти',
      'nav.contact': 'Контакти',
      'nav.cta': 'Записатися на перегляд',

      'hero.eyebrow': 'З 2008 року — вишукана нерухомість',
      'hero.title': 'Оселі, що<br>тримають <em>висоту.</em>',
      'hero.sub': 'Ми представляємо ексклюзивний портфель архітектурно значущих будинків, пентхаусів та маєтків для вибагливих покупців і продавців з усього світу.',
      'hero.scroll': 'Гортайте',

      'search.location.label': 'Локація',
      'search.location.any': 'Будь-яка локація',
      'search.location.london': 'Лондон',
      'search.location.newyork': 'Нью-Йорк',
      'search.location.la': 'Лос-Анджелес',
      'search.location.paris': 'Париж',
      'search.location.dubai': 'Дубай',
      'search.type.label': 'Тип нерухомості',
      'search.type.all': 'Всі типи',
      'search.price.label': 'Ціновий діапазон',
      'search.price.any': 'Будь-яка ціна',
      'search.submit': 'Пошук',

      'listings.eyebrow': 'Обраний портфель',
      'listings.heading': 'Поточні об’єкти',
      'listings.sub': 'Ретельно відібрана добірка об’єктів, які наразі представляє Vantage Estates.',
      'listings.noResults': 'За цим фільтром об’єктів поки немає — завітайте пізніше або зв’яжіться з агентом щодо позабіржових пропозицій.',

      'toggle.sale': 'Продаж',
      'toggle.rent': 'Оренда',
      'filter.all': 'Всі',
      'filter.house': 'Будинки',
      'filter.apartment': 'Апартаменти',
      'filter.villa': 'Вілли',
      'price.label': 'Діапазон цін',

      'badge.sale': 'Продається',
      'badge.new': 'Новинка',
      'badge.rent': 'Оренда',
      'type.house': 'Будинок',
      'type.apartment': 'Апартаменти',
      'type.villa': 'Вілла',
      'unit.beds': 'спалень',
      'unit.baths': 'санвузлів',
      'unit.sqft': 'кв. фут.',
      'unit.perMonth': '/міс.',

      'stats.sales': 'обсяг продажу нерухомості',
      'stats.sold': 'об’єктів продано',
      'stats.years': 'років досвіду',
      'stats.satisfaction': 'задоволеність клієнтів',

      'agents.eyebrow': 'Наша команда',
      'agents.heading': 'Наші агенти',
      'agents.sub': 'Згуртована команда фахівців, кожен з яких добре знає свій куточок світового ринку елітної нерухомості.',
      'agent1.title': 'Партнерка-засновниця, європейська нерухомість',
      'agent1.bio': 'Раніше працювала в провідному паризькому аукціонному домі, за останнє десятиліття Александра продала понад 120 знакових резиденцій у Франції, Монако та Великій Британії.',
      'agent2.title': 'Директор напряму Нью-Йорк і Північний Схід',
      'agent2.bio': 'Джеймс здобув репутацію на найконкурентніших позабіржових угодах Мангеттена, уклавши більше угод з пентхаусами, ніж будь-хто з його покоління агентів.',
      'agent3.title': 'Керівниця напряму країн Перської затоки',
      'agent3.bio': 'Софія консультує приватних клієнтів у Дубаї та Абу-Дабі, спеціалізуючись на віллах біля води та брендованих резиденціях.',
      'agent4.title': 'Старший агент, Західне узбережжя',
      'agent4.bio': 'Уродженець Лос-Анджелеса, Деніел поєднує глибоке знання районів із чуттям до дизайну, представляючи будинки від архітекторів від Малібу до Голлівудських пагорбів.',

      'testimonials.eyebrow': 'Історії клієнтів',
      'testimonials.heading': 'Що кажуть наші клієнти',
      'testimonial1.quote': 'Vantage Estates знайшли для нас дім, якого ще навіть не було на ринку. Їхня делікатність і знання ринку зробили дуже приватний пошук напрочуд легким.',
      'testimonial1.author': '— Річард і Елена Гастінгс, покупці в Белгравії',
      'testimonial2.quote': 'Ми продали свій пентхаус за три тижні, дорожче за початкову ціну, покупцю, знайденому через власну мережу контактів Джеймса. Об’єкт навіть не потрапив на відкритий ринок.',
      'testimonial2.author': '— Маркус Чен, продавець у Ріверсайд-Парк',
      'testimonial3.quote': 'Софія зрозуміла, чого ми хочемо, ще до того, як ми змогли це сформулювати. Знайдена нею вілла перевершила всі очікування.',
      'testimonial3.author': '— Родина Аль-Фарсі, покупці на Пальм Джумейра',

      'contact.eyebrow': 'Зв’яжіться з нами',
      'contact.heading': 'Знайдімо вашу<br>наступну адресу.',
      'contact.sub': 'Плануєте купівлю, продаж чи просто вивчаєте можливості — наша команда відповість особисто протягом одного робочого дня.',

      'form.name.label': 'Повне ім’я',
      'form.name.placeholder': 'Анна Коваленко',
      'form.email.label': 'Електронна пошта',
      'form.email.placeholder': 'anna@example.com',
      'form.phone.label': 'Номер телефону',
      'form.phone.placeholder': '+380 00 000 0000',
      'form.message.label': 'Повідомлення',
      'form.message.placeholder': 'Розкажіть, що ви шукаєте...',
      'form.submit': 'Надіслати запит',
      'form.confirm': 'Дякуємо — ми зв’яжемося з вами протягом одного робочого дня.',

      'footer.tagline': 'Індивідуальний супровід угод з найвишуканішими оселями світу.',
      'footer.explore': 'Розділи',
      'footer.contact': 'Контакти',
      'footer.follow': 'Ми в соцмережах',
      'footer.rights': 'Усі права захищені.',
      'footer.disclaimer': 'Це демонстраційний приклад із портфоліо Al — не справжня і не діюча агенція нерухомості.'
    },

    de: {
      'nav.listings': 'Objekte',
      'nav.about': 'Über uns',
      'nav.agents': 'Makler',
      'nav.contact': 'Kontakt',
      'nav.cta': 'Besichtigung buchen',

      'hero.eyebrow': 'Seit 2008 — Kuratierte Immobilien',
      'hero.title': 'Häuser mit<br><em>Weitblick.</em>',
      'hero.sub': 'Wir vertreten ein exklusives Portfolio architektonisch bedeutender Häuser, Penthouses und Anwesen für anspruchsvolle Käufer und Verkäufer weltweit.',
      'hero.scroll': 'Scrollen',

      'search.location.label': 'Standort',
      'search.location.any': 'Beliebiger Standort',
      'search.location.london': 'London',
      'search.location.newyork': 'New York',
      'search.location.la': 'Los Angeles',
      'search.location.paris': 'Paris',
      'search.location.dubai': 'Dubai',
      'search.type.label': 'Immobilientyp',
      'search.type.all': 'Alle Typen',
      'search.price.label': 'Preisspanne',
      'search.price.any': 'Beliebiger Preis',
      'search.submit': 'Suchen',

      'listings.eyebrow': 'Ausgewähltes Portfolio',
      'listings.heading': 'Aktuelle Angebote',
      'listings.sub': 'Eine handverlesene Auswahl der von Vantage Estates aktuell vertretenen Immobilien.',
      'listings.noResults': 'Derzeit entsprechen keine Objekte diesem Filter — schauen Sie bald wieder vorbei oder kontaktieren Sie einen Makler für Off-Market-Angebote.',

      'toggle.sale': 'Kaufen',
      'toggle.rent': 'Mieten',
      'filter.all': 'Alle',
      'filter.house': 'Häuser',
      'filter.apartment': 'Wohnungen',
      'filter.villa': 'Villen',
      'price.label': 'Preisspanne',

      'badge.sale': 'Zu verkaufen',
      'badge.new': 'Neu',
      'badge.rent': 'Zu vermieten',
      'type.house': 'Haus',
      'type.apartment': 'Wohnung',
      'type.villa': 'Villa',
      'unit.beds': 'Schlafzimmer',
      'unit.baths': 'Bäder',
      'unit.sqft': 'sqft',
      'unit.perMonth': '/Monat',

      'stats.sales': 'Immobilienumsatz',
      'stats.sold': 'Verkaufte Objekte',
      'stats.years': 'Jahre Erfahrung',
      'stats.satisfaction': 'Kundenzufriedenheit',

      'agents.eyebrow': 'Unser Team',
      'agents.heading': 'Unsere Makler',
      'agents.sub': 'Ein eingespieltes Team von Spezialisten, jeder versiert in einem anderen Teil des globalen Luxusmarkts.',
      'agent1.title': 'Gründungspartnerin, Europäische Immobilien',
      'agent1.bio': 'Ehemals bei einem führenden Pariser Auktionshaus tätig, hat Alexandra in den letzten zehn Jahren über 120 bedeutende Residenzen in Frankreich, Monaco und Großbritannien vermittelt.',
      'agent2.title': 'Direktor, New York & Nordosten',
      'agent2.bio': 'James machte sich einen Namen mit den umkämpftesten Off-Market-Deals Manhattans und schloss mehr Penthouse-Transaktionen ab als jeder andere Makler seines Jahrgangs.',
      'agent3.title': 'Leiterin Golfregion & Wachstumsmärkte',
      'agent3.bio': 'Sophia berät Privatkunden in Dubai und Abu Dhabi und ist auf Villen am Wasser sowie Markenresidenzen spezialisiert.',
      'agent4.title': 'Senior Agent, Westküste',
      'agent4.bio': 'Als gebürtiger Angeleno verbindet Daniel tiefes Wissen über die Stadtviertel mit einem designorientierten Blick und vertritt Architektenhäuser von Malibu bis in die Hollywood Hills.',

      'testimonials.eyebrow': 'Kundenstimmen',
      'testimonials.heading': 'Das sagen unsere Kunden',
      'testimonial1.quote': 'Vantage Estates fand für uns ein Haus, das noch nicht einmal auf dem Markt war. Ihre Diskretion und Marktkenntnis machten eine sehr private Suche mühelos.',
      'testimonial1.author': '— Richard & Elena Hastings, Käufer in Belgravia',
      'testimonial2.quote': 'Wir haben unser Penthouse innerhalb von drei Wochen über dem Angebotspreis an einen von James über sein eigenes Netzwerk vermittelten Käufer verkauft — es musste nie öffentlich angeboten werden.',
      'testimonial2.author': '— Marcus Chen, Verkäufer in Riverside Park',
      'testimonial3.quote': 'Sophia verstand genau, was wir wollten, noch bevor wir es selbst richtig formulieren konnten. Die Villa, die sie für uns fand, hat alle Erwartungen übertroffen.',
      'testimonial3.author': '— Die Familie Al-Farsi, Käufer auf Palm Jumeirah',

      'contact.eyebrow': 'Kontaktieren Sie uns',
      'contact.heading': 'Finden wir Ihre<br>nächste Adresse.',
      'contact.sub': 'Ob Kauf, Verkauf oder einfach nur Erkunden der Möglichkeiten — unser Team antwortet Ihnen persönlich innerhalb eines Werktags.',

      'form.name.label': 'Vollständiger Name',
      'form.name.placeholder': 'Anna Müller',
      'form.email.label': 'E-Mail-Adresse',
      'form.email.placeholder': 'anna@example.com',
      'form.phone.label': 'Telefonnummer',
      'form.phone.placeholder': '+49 30 000 0000',
      'form.message.label': 'Nachricht',
      'form.message.placeholder': 'Erzählen Sie uns, wonach Sie suchen...',
      'form.submit': 'Anfrage senden',
      'form.confirm': 'Vielen Dank — wir melden uns innerhalb eines Werktags bei Ihnen.',

      'footer.tagline': 'Kuratierte Vertretung für die außergewöhnlichsten Häuser der Welt.',
      'footer.explore': 'Entdecken',
      'footer.contact': 'Kontakt',
      'footer.follow': 'Folgen',
      'footer.rights': 'Alle Rechte vorbehalten.',
      'footer.disclaimer': 'Dies ist ein Gestaltungsbeispiel aus Als Portfolio — eine Demonstration, keine echte, tatsächlich tätige Agentur.'
    },

    es: {
      'nav.listings': 'Propiedades',
      'nav.about': 'Nosotros',
      'nav.agents': 'Agentes',
      'nav.contact': 'Contacto',
      'nav.cta': 'Reservar visita',

      'hero.eyebrow': 'Desde 2008 — Bienes raíces con criterio',
      'hero.title': 'Hogares que<br>mantienen su <em>altura.</em>',
      'hero.sub': 'Representamos un portafolio exclusivo de casas, áticos y fincas de gran valor arquitectónico para compradores y vendedores exigentes de todo el mundo.',
      'hero.scroll': 'Desplázate',

      'search.location.label': 'Ubicación',
      'search.location.any': 'Cualquier ubicación',
      'search.location.london': 'Londres',
      'search.location.newyork': 'Nueva York',
      'search.location.la': 'Los Ángeles',
      'search.location.paris': 'París',
      'search.location.dubai': 'Dubái',
      'search.type.label': 'Tipo de propiedad',
      'search.type.all': 'Todos los tipos',
      'search.price.label': 'Rango de precio',
      'search.price.any': 'Cualquier precio',
      'search.submit': 'Buscar',

      'listings.eyebrow': 'Portafolio destacado',
      'listings.heading': 'Propiedades actuales',
      'listings.sub': 'Una selección cuidadosamente elegida de las propiedades que representa actualmente Vantage Estates.',
      'listings.noResults': 'Actualmente no hay propiedades que coincidan con este filtro — vuelva pronto o contacte a un agente para conocer oportunidades fuera de mercado.',

      'toggle.sale': 'En venta',
      'toggle.rent': 'En alquiler',
      'filter.all': 'Todas',
      'filter.house': 'Casas',
      'filter.apartment': 'Apartamentos',
      'filter.villa': 'Villas',
      'price.label': 'Rango de precio',

      'badge.sale': 'En venta',
      'badge.new': 'Nuevo',
      'badge.rent': 'En alquiler',
      'type.house': 'Casa',
      'type.apartment': 'Apartamento',
      'type.villa': 'Villa',
      'unit.beds': 'Hab.',
      'unit.baths': 'Baños',
      'unit.sqft': 'pies²',
      'unit.perMonth': '/mes',

      'stats.sales': 'en ventas de propiedades',
      'stats.sold': 'propiedades vendidas',
      'stats.years': 'años de experiencia',
      'stats.satisfaction': 'satisfacción del cliente',

      'agents.eyebrow': 'Nuestro equipo',
      'agents.heading': 'Conozca a nuestros agentes',
      'agents.sub': 'Un equipo muy unido de especialistas, cada uno experto en un rincón distinto del mercado inmobiliario de lujo.',
      'agent1.title': 'Socia fundadora, propiedades europeas',
      'agent1.bio': 'Antigua integrante de una destacada casa de subastas parisina, Alexandra ha colocado más de 120 residencias emblemáticas en Francia, Mónaco y el Reino Unido en la última década.',
      'agent2.title': 'Director, Nueva York y Noreste',
      'agent2.bio': 'James forjó su reputación con las operaciones fuera de mercado más competitivas de Manhattan, cerrando más transacciones de áticos que cualquier agente de su generación.',
      'agent3.title': 'Responsable del Golfo y mercados emergentes',
      'agent3.bio': 'Sophia asesora a una cartera de clientes privados en Dubái y Abu Dabi, especializándose en villas frente al mar y residencias de marca.',
      'agent4.title': 'Agente sénior, Costa Oeste',
      'agent4.bio': 'Nativo de Los Ángeles, Daniel combina un profundo conocimiento del vecindario con una mirada orientada al diseño, representando casas de autor desde Malibú hasta las colinas de Hollywood.',

      'testimonials.eyebrow': 'Historias de clientes',
      'testimonials.heading': 'Lo que dicen nuestros clientes',
      'testimonial1.quote': 'Vantage Estates nos encontró una casa que ni siquiera estaba en el mercado todavía. Su discreción y conocimiento del mercado hicieron que una búsqueda muy privada resultara sencilla.',
      'testimonial1.author': '— Richard y Elena Hastings, compradores en Belgravia',
      'testimonial2.quote': 'Vendimos nuestro ático en tres semanas, por encima del precio inicial, a un comprador que James encontró a través de su propia red. Nunca llegó a salir al mercado abierto.',
      'testimonial2.author': '— Marcus Chen, vendedor en Riverside Park',
      'testimonial3.quote': 'Sophia entendió exactamente lo que queríamos antes de que pudiéramos expresarlo del todo. La villa que nos encontró superó todas nuestras expectativas.',
      'testimonial3.author': '— La familia Al-Farsi, compradores en Palm Jumeirah',

      'contact.eyebrow': 'Póngase en contacto',
      'contact.heading': 'Encontremos su<br>próxima dirección.',
      'contact.sub': 'Ya sea que compre, venda o simplemente esté explorando posibilidades, nuestro equipo responderá personalmente en un plazo de un día hábil.',

      'form.name.label': 'Nombre completo',
      'form.name.placeholder': 'Ana García',
      'form.email.label': 'Correo electrónico',
      'form.email.placeholder': 'ana@example.com',
      'form.phone.label': 'Número de teléfono',
      'form.phone.placeholder': '+34 600 000 000',
      'form.message.label': 'Mensaje',
      'form.message.placeholder': 'Cuéntenos qué está buscando...',
      'form.submit': 'Enviar consulta',
      'form.confirm': 'Gracias — nos pondremos en contacto en un plazo de un día hábil.',

      'footer.tagline': 'Representación exclusiva para los hogares más distintivos del mundo.',
      'footer.explore': 'Explorar',
      'footer.contact': 'Contacto',
      'footer.follow': 'Síguenos',
      'footer.rights': 'Todos los derechos reservados.',
      'footer.disclaimer': 'Esta es una muestra de diseño del portafolio de Al — una demostración, no una agencia real ni operativa.'
    }
  };

  var langCurrentLabel = document.getElementById('langCurrentLabel');
  var langToggle = document.getElementById('langToggle');
  var langMenu = document.getElementById('langMenu');
  var langSwitch = document.getElementById('langSwitch');

  function applyLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    var dict = translations[lang];
    var fallback = translations.en;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = dict[key] != null ? dict[key] : fallback[key];
      if (val == null) return;
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var val = dict[key] != null ? dict[key] : fallback[key];
      if (val != null) el.setAttribute('placeholder', val);
    });

    document.documentElement.lang = lang;
    if (langCurrentLabel) langCurrentLabel.textContent = LABELS[lang] || 'EN';

    if (langMenu) {
      langMenu.querySelectorAll('li[data-lang]').forEach(function (li) {
        var isActive = li.dataset.lang === lang;
        li.classList.toggle('active', isActive);
        li.setAttribute('aria-selected', String(isActive));
      });
    }

    try { localStorage.setItem(LANG_KEY, lang); } catch (err) { /* ignore storage errors */ }
  }

  function closeLangMenu() {
    if (!langMenu) return;
    langMenu.hidden = true;
    langToggle.setAttribute('aria-expanded', 'false');
  }

  function openLangMenu() {
    if (!langMenu) return;
    langMenu.hidden = false;
    langToggle.setAttribute('aria-expanded', 'true');
  }

  if (langToggle && langMenu) {
    langToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (langMenu.hidden) openLangMenu(); else closeLangMenu();
    });

    langMenu.addEventListener('click', function (e) {
      var li = e.target.closest('li[data-lang]');
      if (!li) return;
      applyLanguage(li.dataset.lang);
      closeLangMenu();
    });

    langMenu.addEventListener('keydown', function (e) {
      var li = e.target.closest('li[data-lang]');
      if (!li) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        applyLanguage(li.dataset.lang);
        closeLangMenu();
      }
    });

    document.addEventListener('click', function (e) {
      if (langSwitch && !langSwitch.contains(e.target)) closeLangMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLangMenu();
    });
  }

  var savedLang = 'en';
  try { savedLang = localStorage.getItem(LANG_KEY) || 'en'; } catch (err) { /* ignore storage errors */ }
  applyLanguage(savedLang);
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
