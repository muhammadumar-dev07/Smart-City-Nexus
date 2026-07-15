/**
 * Contact form module
 * Responsibility: submit the contact form as a real HTML POST targeting
 * a hidden iframe, so the page never navigates away and we never rely
 * on fetch()/CORS (which is what caused the previous version to hang
 * indefinitely on "Sending…" with no error and no email).
 *
 * A plain form POST is not subject to CORS at all — only script-driven
 * reads of the response would be, and we don't need to read anything
 * back. We just watch for the iframe's load event (ignoring the very
 * first "blank" load on page open) and treat that as "submitted".
 *
 * Note: FormSubmit still requires a one-time confirmation — the FIRST
 * submission to a given email address triggers an activation email
 * instead of delivering the message. Click that link once and every
 * submission after that arrives normally.
 */
(function () {
  const form = document.getElementById('contactForm');
  const frame = document.getElementById('formsubmitFrame');
  if (!form || !frame) return;

  const successBox = document.getElementById('formSuccess');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalLabel = submitBtn.textContent;

  let hasSubmitted = false;
  let settled = false;

  function markSent() {
    if (settled) return;
    settled = true;
    form.reset();
    form.hidden = true;
    if (successBox) successBox.classList.add('is-visible');
  }

  form.addEventListener('submit', () => {
    hasSubmitted = true;
    settled = false;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    // Safety net: even if the iframe's load event doesn't fire the way
    // we expect in a given browser, don't leave the button stuck forever.
    setTimeout(() => {
      if (!settled) markSent();
    }, 4000);
    // Native form submission proceeds from here — no preventDefault().
  });

  frame.addEventListener('load', () => {
    if (!hasSubmitted) return; // ignore the initial blank iframe load
    markSent();
  });
})();
