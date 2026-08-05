/* Custom cursor */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

(function animFollower() {
  fx += (mx - fx) * 0.15;
  fy += (my - fy) * 0.15;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animFollower);
})();

document.querySelectorAll('a, button, .bento-item, .info-card, .contact-big').forEach(el => {
  el.addEventListener('mouseenter', () => follower.classList.add('hover'));
  el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
});

/* Theme */
const themeBtn = document.getElementById('theme-btn');
const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);
themeBtn.querySelector('i').className = saved === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeBtn.querySelector('i').className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

/* Mobile menu */
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* Scroll progress */
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (window.scrollY / h * 100) + '%';
});

/* Side nav active */
const sections = document.querySelectorAll('section[id]');
const dots = document.querySelectorAll('.nav-dot');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  sections.forEach(sec => {
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      dots.forEach(d => d.classList.remove('active'));
      const active = document.querySelector(`.nav-dot[href="#${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
});

/* Fade up */
const fades = document.querySelectorAll('.fade-up, .bento-item, .stack-group, .info-card, .contact-panel');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.style.opacity = '1';
      e.target.style.transform = 'none';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

fades.forEach((el, i) => {
  if (!el.classList.contains('fade-up')) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${i % 4 * 0.08}s, transform 0.6s ease ${i % 4 * 0.08}s`;
  }
  io.observe(el);
});

/* Counters */
document.querySelectorAll('[data-count]').forEach(el => {
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const target = +el.dataset.count;
      const start = performance.now();
      const dur = 1200;
      (function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      })(start);
      obs.unobserve(el);
    }
  }, { threshold: 0.5 });
  obs.observe(el);
});

/* Simple tilt on bento */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
