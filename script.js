const burgerBtn = document.getElementById('burgerBtn');
const mainNav = document.getElementById('mainNav');

burgerBtn.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  burgerBtn.classList.toggle('open', isOpen);
  burgerBtn.setAttribute('aria-expanded', isOpen);
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    mainNav.classList.remove('open');
    burgerBtn.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');

    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      const headerOffset = document.querySelector('.site-header').offsetHeight;
      const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset - 16;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

const sections = document.querySelectorAll('section[id]');

function setActiveLinkOnScroll() {
  const scrollPos = window.scrollY + document.querySelector('.site-header').offsetHeight + 40;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

    if (scrollPos >= top && scrollPos < bottom && correspondingLink) {
      navLinks.forEach(l => l.classList.remove('active'));
      correspondingLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLinkOnScroll);

const heroMainImg = document.getElementById('heroMainImg');
const heroBars = document.getElementById('heroBars');

if (heroMainImg && heroBars) {
  const heroPhotos = {
    1: 'assets/hero-team.png',
    2: 'assets/hero-team-2.jpg',
    3: 'assets/hero-team-2.jpg'
  };

  const setActiveBar = (targetBar) => {
    const allBars = heroBars.querySelectorAll('.hero-bar');
    allBars.forEach(b => {
      const isActive = b === targetBar;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  };

  heroBars.addEventListener('click', (e) => {
    const btn = e.target.closest('.hero-bar');
    if (!btn) return;

    const photoIndex = btn.getAttribute('data-hero-photo');
    const nextSrc = heroPhotos[photoIndex] || heroPhotos[1];

    setActiveBar(btn);

    heroMainImg.classList.add('is-switching');
    window.setTimeout(() => {
      heroMainImg.src = nextSrc;
      heroMainImg.classList.remove('is-switching');
    }, 260);
  });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

