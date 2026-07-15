/**
 * FAQ accordion module
 * Responsibility: toggle .is-open on .faq__item when its question is
 * clicked. Closes siblings within the same .faq container so only one
 * answer is open at a time. Fully self-contained.
 */
(function () {
  const faqs = document.querySelectorAll('.faq');

  faqs.forEach((faq) => {
    const items = faq.querySelectorAll('.faq__item');

    items.forEach((item) => {
      const question = item.querySelector('.faq__question');
      if (!question) return;

      question.addEventListener('click', () => {
        const wasOpen = item.classList.contains('is-open');
        items.forEach((i) => i.classList.remove('is-open'));
        if (!wasOpen) item.classList.add('is-open');
      });
    });
  });
})();
