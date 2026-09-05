/* ============================================================
   BIRTHDAY WEBSITE — script.js
   ============================================================ */

// ─────────────────────────────────────────────
// ⚙️ KONFIGURASI — Sesuaikan bagian ini!
// ─────────────────────────────────────────────
const CONFIG = {
  // Tanggal mulai bersama (format: 'YYYY-MM-DD')
  togetherSince: '2026-06-15',
};

// ─────────────────────────────────────────────
// 🎈 FLOATING PARTICLES
// ─────────────────────────────────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  const emojis = ['🩷', '💕', '✨', '🎀', '💖', '🌸', '⭐'];
  const count = 28;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'particle';

    const useEmoji = Math.random() > 0.45;
    if (useEmoji) {
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.fontSize = `${Math.random() * 18 + 10}px`;
      el.style.background = 'none';
    } else {
      const size = Math.random() * 10 + 5;
      el.style.width  = size + 'px';
      el.style.height = size + 'px';
      el.style.background = `hsl(${Math.random() * 30 + 330}, 100%, ${Math.random() * 20 + 70}%)`;
    }

    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration  = `${Math.random() * 12 + 8}s`;
    el.style.animationDelay     = `${Math.random() * 10}s`;

    container.appendChild(el);
  }
})();

// ─────────────────────────────────────────────
// ⏳ TOGETHER COUNTER
// ─────────────────────────────────────────────
(function updateTogetherCounter() {
  const start = new Date(CONFIG.togetherSince);
  const now   = new Date();
  const diffMs = now - start;

  if (diffMs < 0) return; // Tanggal belum tiba

  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
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
  const step = Math.max(1, Math.floor(target / 40));
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(interval);
  }, 30);
}

// ─────────────────────────────────────────────
// 🔍 LIGHTBOX
// ─────────────────────────────────────────────
const items     = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lightboxImg');
const lbCaption = document.getElementById('lightboxCaption');
let currentIdx  = 0;

function openLightbox(idx) {
  currentIdx = idx;
  const item   = items[idx];
  const img    = item.querySelector('img');
  lbImg.src    = img.src;
  lbImg.alt    = img.alt;
  lbCaption.textContent = item.dataset.caption || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigate(dir) {
  currentIdx = (currentIdx + dir + items.length) % items.length;
  openLightbox(currentIdx);
}

items.forEach((item, idx) => item.addEventListener('click', () => openLightbox(idx)));
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => navigate(-1));
document.getElementById('lightboxNext').addEventListener('click', () => navigate(1));

// Close on backdrop click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});

// ─────────────────────────────────────────────
// 🎯 SCROLL REVEAL (Intersection Observer)
// ─────────────────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.message-card, .gallery-item, .reason-card, .counter-item'
);
revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));
