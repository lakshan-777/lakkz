/* ===== LOADER ===== */
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
const loaderText = document.getElementById('loaderText');
const messages = ['Initializing system...', 'Loading modules...', 'Almost ready...', 'Welcome!'];
let progress = 0;
let msgIdx = 0;

const loaderInterval = setInterval(() => {
  progress += Math.random() * 18 + 8;
  if (progress > 100) progress = 100;
  if (loaderFill) loaderFill.style.width = progress + '%';
  if (loaderText && msgIdx < messages.length - 1 && progress > (msgIdx + 1) * 30) {
    msgIdx++;
    loaderText.textContent = messages[msgIdx];
  }
  if (progress >= 100) {
    clearInterval(loaderInterval);
    setTimeout(() => {
      if (loader) loader.classList.add('hide');
      triggerReveal();
    }, 300);
  }
}, 80);

/* ===== REVEAL on load ===== */
function triggerReveal() {
  const els = document.querySelectorAll('.reveal, .hero-badge, .hero-title, .hero-sub, .hero-btns, .hero-stats, .hero-visual');
  els.forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), i * 100);
  });
  countStats();
}

/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
});
setInterval(() => {
  if (trail) { trail.style.left = mx + 'px'; trail.style.top = my + 'px'; }
}, 80);

document.querySelectorAll('a, button, .tool-btn, .feature-card, .tool-card').forEach(el => {
  el.addEventListener('mouseenter', () => { if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; });
  el.addEventListener('mouseleave', () => { if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });
});

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

/* ===== PARTICLE CANVAS ===== */
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * 2000,
      y: Math.random() * 1200,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.1
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124,58,237,${p.alpha})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

/* ===== COUNTER ANIMATION ===== */
function countStats() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target || 0);
    let cur = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = Math.floor(cur);
    }, 40);
  });
}

/* ===== INTERSECTION OBSERVER for scroll reveals ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.feature-card, .about-text, .about-card').forEach(el => observer.observe(el));
