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
     Listings filter (All / Houses / Apartments / Villas)
  --------------------------------------------------- */
  var filterBar = document.getElementById('filterBar');
  var listingGrid = document.getElementById('listingGrid');
  var noResults = document.getElementById('noResults');
  var cards = Array.prototype.slice.call(listingGrid.querySelectorAll('.listing-card'));

  function applyFilter(type) {
    var visibleCount = 0;
    cards.forEach(function (card) {
      var matches = type === 'all' || card.dataset.type === type;
      if (matches) {
        card.classList.remove('hidden-card');
        visibleCount++;
        // retrigger reveal animation subtly
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
    applyFilter(btn.dataset.filter);
  });

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

    applyFilter(targetBtn.dataset.filter);

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
