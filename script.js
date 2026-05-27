const revealItems = document.querySelectorAll('.reveal, .reveal-card');

revealItems.forEach((item, index) => {
  if (item.classList.contains('reveal-card')) {
    item.style.setProperty('--delay', `${Math.min(index * 35, 160)}ms`);
  }
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const reserveButton = document.querySelector('#reserveButton');
const toast = document.querySelector('#toast');
let toastTimer;

reserveButton?.addEventListener('click', () => {
  const size = document.querySelector('#size')?.value || 'selected size';
  toast.textContent = `${size} reservation demo captured.`;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
});
