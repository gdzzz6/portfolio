(function () {
  "use strict";

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
      el.textContent = yearly
        ? el.getAttribute("data-yearly-note")
        : el.getAttribute("data-monthly-note");
    });
  }

  billingSwitch.addEventListener("click", () => {
    const currentlyYearly = billingSwitch.getAttribute("aria-checked") === "true";
    setBilling(!currentlyYearly);
  });

  setBilling(false);

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
