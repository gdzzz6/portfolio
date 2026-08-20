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
