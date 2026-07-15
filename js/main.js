/**
 * Main entry point.
 * Each module (nav.js, scroll-reveal.js, ...) is self-initializing
 * via its own IIFE, so this file stays minimal — it's a place to
 * wire up anything that genuinely needs cross-module coordination,
 * which should stay rare by design.
 */
document.documentElement.classList.add('js-ready');
