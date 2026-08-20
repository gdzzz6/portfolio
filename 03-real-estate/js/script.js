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
