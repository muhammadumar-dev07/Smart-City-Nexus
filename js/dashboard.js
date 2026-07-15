/**
 * Dashboard preview module
 * Responsibility: simulate a live-updating dashboard inside the
 * homepage showcase panel — ticks KPI numbers and bar-chart heights
 * on an interval. Purely decorative/illustrative, no real data source.
 * Fully self-contained; only touches elements inside .dashboard.
 */
(function () {
  const dashboard = document.querySelector('.dashboard');
  if (!dashboard) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const bars = dashboard.querySelectorAll('.dashboard__bar-fill');
  const kpiValues = dashboard.querySelectorAll('.dashboard__kpi-value[data-base]');
  const timeEl = dashboard.querySelector('.dashboard__bar-time');

  function randomizeBars() {
    bars.forEach((bar) => {
      const min = parseInt(bar.dataset.min || '20', 10);
      const max = parseInt(bar.dataset.max || '100', 10);
      const height = Math.round(min + Math.random() * (max - min));
      bar.style.height = height + '%';
    });
  }

  function nudgeKpis() {
    kpiValues.forEach((el) => {
      const base = parseFloat(el.dataset.base);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const wiggle = (Math.random() - 0.5) * (base * 0.04);
      el.textContent = (base + wiggle).toFixed(decimals);
    });
  }

  function updateClock() {
    if (!timeEl) return;
    const now = new Date();
    timeEl.textContent = 'Updated ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  // Initial paint
  randomizeBars();
  updateClock();

  if (prefersReducedMotion) return; // static after first paint, no interval

  setInterval(() => {
    randomizeBars();
    nudgeKpis();
    updateClock();
  }, 3200);
})();
