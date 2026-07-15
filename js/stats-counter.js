/**
 * Stat counter module
 * Responsibility: animate any [data-count-to] element's .stats__count
 * child from 0 to its target value once it scrolls into view. Runs
 * once per element. Fully self-contained.
 */
(function () {
  const values = document.querySelectorAll('.stats__value[data-count-to]');
  if (!values.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animate(el) {
    const target = parseFloat(el.dataset.countTo);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const countEl = el.querySelector('.stats__count');
    if (!countEl || Number.isNaN(target)) return;

    if (prefersReducedMotion) {
      countEl.textContent = target.toFixed(decimals);
      return;
    }

    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      countEl.textContent = (target * eased).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if (!('IntersectionObserver' in window)) {
    values.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  values.forEach((el) => observer.observe(el));
})();
