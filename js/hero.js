/**
 * Hero panel module
 * Responsibility: switch the active state on the Traffic/Energy/Safety
 * tabs inside the hero's floating metrics panel. Presentational only —
 * swaps a label/placeholder, doesn't touch any other section.
 */
(function () {
  const tabs = document.querySelectorAll('.hero__panel-tab');
  const layerField = document.getElementById('heroLayer');

  if (!tabs.length || !layerField) return;

  const layerOptions = {
    traffic: ['Congestion map', 'Signal timing', 'Incident feed'],
    energy: ['Load forecast', 'Substation health', 'Demand response'],
    safety: ['Active alerts', 'Camera coverage', 'Response times'],
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const key = tab.dataset.tab;
      const options = layerOptions[key] || [];
      layerField.innerHTML = options
        .map((label) => `<option>${label}</option>`)
        .join('');
    });
  });
})();
