/**
 * Nav module
 * Responsibility: mobile menu open/close, and adding a shadow to the
 * nav once the page scrolls. Does not touch any other section.
 */
(function () {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (!nav || !toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu after tapping a link
  links.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Shadow once scrolled past the top
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
