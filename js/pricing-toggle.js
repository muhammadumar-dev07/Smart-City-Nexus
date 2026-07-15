/**
 * Pricing toggle module
 * Responsibility: switch every [data-monthly]/[data-annual] price on
 * the page when the Monthly/Annual toggle is clicked. Self-contained.
 */
(function () {
  const toggle = document.getElementById('pricingToggle');
  if (!toggle) return;

  const buttons = toggle.querySelectorAll('button');
  const prices = document.querySelectorAll('.pricing-card__price[data-monthly]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const mode = btn.dataset.mode;
      prices.forEach((price) => {
        const value = mode === 'annual' ? price.dataset.annual : price.dataset.monthly;
        const unit = price.querySelector('.pricing-card__price-unit');
        price.firstChild.textContent = value;
        if (unit) price.appendChild(unit); // keep unit span after the text node
      });
    });
  });
})();
