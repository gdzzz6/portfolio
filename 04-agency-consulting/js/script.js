(function () {
  "use strict";

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
      dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
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

      confirmEl.textContent = "Thanks, " + name + " — we've received your message and will reply within 48 hours.";
      confirmEl.classList.add("show");

      form.reset();

      window.clearTimeout(form._confirmTimeout);
      form._confirmTimeout = window.setTimeout(function () {
        confirmEl.classList.remove("show");
      }, 6000);
    });
  }
})();

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
