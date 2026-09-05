/* ============================================================
   BIRTHDAY WEBSITE v2 — script.js
   ============================================================ */

const CONFIG = {
  togetherSince: '2026-06-15',
};

// ─────────────────────────────────────────────
// 🖱️ CUSTOM CURSOR
// ─────────────────────────────────────────────
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth trail
(function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2)'; cursor.style.background = 'var(--pink-dark)'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursor.style.background = 'var(--pink)'; });
});

// ─────────────────────────────────────────────
// 🎈 FLOATING PARTICLES
// ─────────────────────────────────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  const emojis = ['🩷', '💕', '✨', '🎀', '💖', '🌸', '⭐', '🌷', '💗'];
  for (let i = 0; i < 32; i++) {
    const el = document.createElement('span');
    el.className = 'particle';
    if (Math.random() > 0.4) {
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.fontSize = `${Math.random() * 16 + 10}px`;
      el.style.background = 'none';
    } else {
      const size = Math.random() * 8 + 4;
      el.style.width = el.style.height = size + 'px';
      el.style.background = `hsl(${Math.random() * 40 + 320}, 100%, ${Math.random() * 20 + 65}%)`;
    }
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${Math.random() * 14 + 8}s`;
    el.style.animationDelay    = `${Math.random() * 12}s`;
    container.appendChild(el);
  }
})();

// ─────────────────────────────────────────────
// ✨ HERO GLITTER
// ─────────────────────────────────────────────
(function createGlitter() {
  const container = document.getElementById('heroGlitter');
  for (let i = 0; i < 60; i++) {
    const dot = document.createElement('div');
    dot.className = 'glitter-dot';
    const size = Math.random() * 4 + 1;
    dot.style.width  = size + 'px';
    dot.style.height = size + 'px';
    dot.style.left   = `${Math.random() * 100}%`;
    dot.style.top    = `${Math.random() * 100}%`;
    dot.style.animationDuration = `${Math.random() * 3 + 1.5}s`;
    dot.style.animationDelay    = `${Math.random() * 4}s`;
    container.appendChild(dot);
  }
})();

// ─────────────────────────────────────────────
// 🎉 CONFETTI
// ─────────────────────────────────────────────
(function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx    = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const colors = ['#ff6b9d','#ffb3d9','#d084e0','#fff','#ffd6ec','#c73672','#f3e8ff'];
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * 200,
    r: Math.random() * 7 + 3,
    d: Math.random() * 4 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10 - 5,
    tiltAngle: 0,
    tiltSpeed: Math.random() * 0.1 + 0.05,
    shape: Math.random() > 0.5 ? 'circle' : 'rect',
  }));

  let angle = 0;
  let running = true;
  let elapsed = 0;

  function draw() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    angle += 0.01;
    elapsed++;

    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x + p.tilt, p.y);
      ctx.rotate(p.tiltAngle);
      ctx.fillStyle = p.color;
      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.r, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      }
      ctx.restore();

      p.y    += p.d;
      p.tilt  = Math.sin(angle + p.tiltSpeed) * 12;
      p.tiltAngle += p.tiltSpeed;

      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });

    if (elapsed < 300) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  draw();
})();

// ─────────────────────────────────────────────
// 🎵 MUSIC PLAYER
// ─────────────────────────────────────────────
const audio      = document.getElementById('bgMusic');
const musicBtn   = document.getElementById('musicBtn');
const musicIcon  = document.getElementById('musicIcon');
const musicWave  = document.getElementById('musicWave');
const musicPlayer = document.getElementById('musicPlayer');
let playing = false;

musicBtn.addEventListener('click', () => {
  if (playing) {
    audio.pause();
    musicIcon.className = 'fa fa-play';
    musicWave.classList.remove('playing');
    musicPlayer.classList.remove('expanded');
  } else {
    audio.play().catch(() => {});
    musicIcon.className = 'fa fa-pause';
    musicWave.classList.add('playing');
    musicPlayer.classList.add('expanded');
  }
  playing = !playing;
});

// ─────────────────────────────────────────────
// 📌 NAVBAR SCROLL
// ─────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─────────────────────────────────────────────
// 💌 ENVELOPE OPEN
// ─────────────────────────────────────────────
const envelope    = document.getElementById('envelope');
const envelopeWrap = document.getElementById('envelopeWrap');
const messageCard = document.getElementById('messageCard');

envelope.addEventListener('click', () => {
  envelope.classList.add('open');
  setTimeout(() => {
    envelopeWrap.style.display = 'none';
    messageCard.classList.add('visible');
  }, 500);
});

// ─────────────────────────────────────────────
// ⏳ TOGETHER COUNTER
// ─────────────────────────────────────────────
(function updateCounter() {
  const start   = new Date(CONFIG.togetherSince);
  const now     = new Date();
  const diffMs  = now - start;
  if (diffMs < 0) return;

  const totalDays = Math.floor(diffMs / 86400000);
  const years     = Math.floor(totalDays / 365);
  const months    = Math.floor((totalDays % 365) / 30);
  const days      = totalDays % 30;

  animateCount('years-together',  years);
  animateCount('months-together', months);
  animateCount('days-together',   days);
})();

function animateCount(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const duration = 1200;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ─────────────────────────────────────────────
// 🖼️ LIGHTBOX
// ─────────────────────────────────────────────
const items     = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lightboxImg');
const lbCaption = document.getElementById('lightboxCaption');
const lbDots    = document.getElementById('lightboxDots');
let currentIdx  = 0;

// Build dots
items.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'lb-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => openLightbox(i));
  lbDots.appendChild(dot);
});

function openLightbox(idx) {
  currentIdx = idx;
  const img    = items[idx].querySelector('img');
  lbImg.src    = img.src;
  lbImg.alt    = img.alt;
  lbCaption.textContent = items[idx].dataset.caption || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.querySelectorAll('.lb-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigate(dir) {
  openLightbox((currentIdx + dir + items.length) % items.length);
}

items.forEach((item, idx) => item.addEventListener('click', () => openLightbox(idx)));
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => navigate(-1));
document.getElementById('lightboxNext').addEventListener('click', () => navigate(1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});

// Swipe support
let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend',   (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
});

// ─────────────────────────────────────────────
// 🎯 SCROLL REVEAL
// ─────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.message-card, .gallery-item, .reason-card, .counter-item, .timeline-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // For non-timeline items, use inline style reveal
      if (!entry.target.classList.contains('timeline-item')) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  if (!el.classList.contains('timeline-item')) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  }
  observer.observe(el);
});
