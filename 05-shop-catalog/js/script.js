(function () {
  "use strict";

  /* ===========================================================
     Product data
     =========================================================== */
  const products = [
    {
      id: "p1",
      name: "Stonewashed Duvet Cover",
      category: "Bedding",
      price: 128,
      compareAt: null,
      description: "European flax linen, washed soft, in oat.",
      gradient: "grad-1",
      photo: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=700&q=70",
      isNew: true,
    },
    {
      id: "p2",
      name: "Sculpted Stoneware Vase",
      category: "Living",
      price: 58,
      compareAt: null,
      description: "Hand-thrown, matte sand glaze, one of a kind.",
      gradient: "grad-2",
      photo: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=700&q=70",
      isNew: false,
    },
    {
      id: "p3",
      name: "Waffle-Weave Throw",
      category: "Living",
      price: 84,
      compareAt: null,
      description: "Organic cotton, woven in Portugal, sage.",
      gradient: "grad-4",
      photo: "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=700&q=70",
      isNew: false,
    },
    {
      id: "p4",
      name: "Hand-Blown Water Carafe",
      category: "Tableware",
      price: 46,
      compareAt: null,
      description: "Bubble-free glass, 1L, dishwasher safe.",
      gradient: "grad-6",
      photo: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=700&q=70",
      isNew: false,
    },
    {
      id: "p5",
      name: "Linen Pillowcase Set",
      category: "Bedding",
      price: 44,
      compareAt: 54,
      description: "Set of two, French seams, stonewashed.",
      gradient: "grad-5",
      photo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=70",
      isNew: false,
    },
    {
      id: "p6",
      name: "Ash Wood Serving Board",
      category: "Tableware",
      price: 72,
      compareAt: null,
      description: "Single-slab ash, food-safe oil finish.",
      gradient: "grad-8",
      photo: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=700&q=70",
      isNew: false,
    },
    {
      id: "p7",
      name: "Ribbed Ceramic Dinner Set",
      category: "Tableware",
      price: 138,
      compareAt: null,
      description: "4-piece setting, stoneware, oven to table.",
      gradient: "grad-3",
      photo: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=700&q=70",
      isNew: true,
    },
    {
      id: "p8",
      name: "Woven Seagrass Basket",
      category: "Living",
      price: 62,
      compareAt: null,
      description: "Hand-woven storage, fits any shelf, natural.",
      gradient: "grad-9",
      photo: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?auto=format&fit=crop&w=700&q=70",
      isNew: false,
    },
    {
      id: "p9",
      name: "Washed Linen Sheet Set",
      category: "Bedding",
      price: 148,
      compareAt: null,
      description: "Fitted, flat, and two shams, stonewashed.",
      gradient: "grad-7",
      photo: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=700&q=70",
      isNew: true,
    },
    {
      id: "p10",
      name: "Cedar & Clove Candle",
      category: "Living",
      price: 32,
      compareAt: 38,
      description: "Soy-coconut wax, 45-hour burn, amber glass.",
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
    const badge = p.isNew
      ? '<span class="badge">New</span>'
      : p.compareAt
      ? '<span class="badge badge--sale">Sale</span>'
      : "";
    const priceHTML = p.compareAt
      ? `<span class="now">${money(p.price)}</span><span class="was">${money(p.compareAt)}</span>`
      : `<span class="now">${money(p.price)}</span>`;
    const wished = wishlist[p.id] ? "is-active" : "";

    return `
      <article class="product-card ${p.gradient}" data-id="${p.id}" data-category="${p.category}">
        <div class="product-card__media">
          <div class="product-card__media-inner"><img src="${p.photo}" alt="${p.name}" loading="lazy" onerror="this.remove()"></div>
          ${badge}
          <button class="wishlist-btn ${wished}" data-wishlist="${p.id}" aria-label="Toggle wishlist for ${p.name}" aria-pressed="${!!wishlist[p.id]}">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 20.2s-7.6-4.6-10-9.3C.4 7.5 2 4 5.6 4c2.1 0 3.6 1.2 4.4 2.6C10.8 5.2 12.3 4 14.4 4 18 4 19.6 7.5 22 10.9c-2.4 4.7-10 9.3-10 9.3Z"/></svg>
          </button>
          <button class="quick-add" data-add="${p.id}">Add to cart</button>
        </div>
        <p class="product-card__category">${p.category}</p>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${p.description}</p>
        <div class="product-card__price">${priceHTML}</div>
      </article>
    `;
  }

  function renderGrid() {
    const list =
      currentFilter === "All"
        ? products
        : products.filter((p) => p.category === currentFilter);
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
      addBtn.textContent = "Added ✓";
      addBtn.classList.add("is-added");
      setTimeout(() => {
        addBtn.textContent = "Add to cart";
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
    return `
      <div class="cart-item" data-id="${id}">
        <div class="cart-item__media ${p.gradient}">
          <div class="cart-item__media-inner"><img src="${p.photo}" alt="${p.name}" loading="lazy" onerror="this.remove()"></div>
        </div>
        <div class="cart-item__info">
          <h4>${p.name}</h4>
          <p class="cat">${p.category}</p>
          <p class="price">${money(p.price)}</p>
        </div>
        <div class="cart-item__actions">
          <div class="qty-stepper">
            <button data-step="-1" data-id="${id}" aria-label="Decrease quantity">−</button>
            <span>${qty}</span>
            <button data-step="1" data-id="${id}" aria-label="Increase quantity">+</button>
          </div>
          <button class="remove-btn" data-remove="${id}">Remove</button>
        </div>
      </div>
    `;
  }

  function emptyStateHTML() {
    return `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
        <h3>Your bag is empty</h3>
        <p>Everything here is made to be lived with — take a look around.</p>
        <button class="btn btn--primary" id="continueShoppingBtn">Continue shopping</button>
      </div>
    `;
  }

  function confirmStateHTML() {
    return `
      <div class="cart-confirm">
        <span class="check-circle">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 9.5 17.5 20 6.5"/></svg>
        </span>
        <h3>Thank you — your order is on its way.</h3>
        <p>A confirmation has been sent to your inbox. We're already preparing it with care.</p>
        <button class="btn btn--primary" id="continueShoppingBtn2">Continue shopping</button>
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
     Init
     =========================================================== */
  renderGrid();
  updateBadge();
  // initialize badge without the bump animation on first load
  cartBadge.classList.remove("bump");
})();
