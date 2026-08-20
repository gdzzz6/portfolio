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
const MENU = {
  coffee: [
    { name: 'Espresso', desc: 'Double shot, classic intensity', price: '€3.20' },
    { name: 'Flat White', desc: 'Milk coffee over a double espresso', price: '€4.20' },
    { name: 'Vanilla Raf', desc: 'Cream, vanilla, cane sugar', price: '€4.80' },
    { name: 'Cappuccino', desc: 'Velvety milk foam', price: '€3.90' },
  ],
  tea: [
    { name: 'Matcha Latte', desc: 'Japanese green tea with milk', price: '€4.90' },
    { name: 'Milk Oolong', desc: 'Taiwanese tea, soft and creamy', price: '€3.90' },
    { name: 'Ginger Black Tea', desc: 'Black tea, ginger, honey, lemon', price: '€3.60' },
  ],
  food: [
    { name: 'Classic Croissant', desc: 'Baked fresh every morning', price: '€2.80' },
    { name: 'New York Cheesecake', desc: 'House-made, shortcrust base', price: '€5.20' },
    { name: 'Avocado Toast', desc: 'Rye bread, poached egg', price: '€6.50' },
  ],
};

const menuGrid = document.getElementById('menuGrid');
const tabs = document.querySelectorAll('.menu__tab');

function renderMenu(cat) {
  menuGrid.innerHTML = MENU[cat].map(item => `
    <div class="menu__card">
      <div>
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
      </div>
      <span class="menu__price">${item.price}</span>
    </div>
  `).join('');
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    renderMenu(tab.dataset.tab);
  });
});

renderMenu('coffee');

// Contact form
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', e => {
  e.preventDefault();
  note.textContent = 'Thank you! We will contact you within the hour.';
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
