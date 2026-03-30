const revealTargets = document.querySelectorAll(
  ".section-shell, .menu-card, .gallery-grid img, .value-item, .special-card, .review-card, .kitchen-points article, .faq-list details, .band-item, .service-row, .visit-table-wrap, .chef-note blockquote, .reserve-form label"
);

const textTargets = document.querySelectorAll(
  ".hero-content h1, .hero-content .lead, .section-heading-wrap h2, .section-heading-wrap .kicker, .story p"
);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function prepareTextAnimation(node) {
  const text = node.textContent.trim();
  if (!text) {
    return;
  }

  const words = text.split(/\s+/);
  node.textContent = "";

  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.style.animationDelay = `${index * 0.045}s`;
    span.textContent = word;
    node.appendChild(span);
    if (index < words.length - 1) {
      node.appendChild(document.createTextNode(" "));
    }
  });

  node.classList.add("text-animate");
}

if (!prefersReducedMotion) {
  textTargets.forEach((node) => prepareTextAnimation(node));
}

revealTargets.forEach((node) => node.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealTargets.forEach((node) => observer.observe(node));

if (!prefersReducedMotion) {
  const textObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          textObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  textTargets.forEach((node) => textObserver.observe(node));
}

const bookTabs = document.querySelectorAll(".book-tab");
const bookPages = document.querySelectorAll(".menu-page");

if (bookTabs.length && bookPages.length) {
  bookTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const page = tab.dataset.page;

      bookTabs.forEach((button) => {
        const isActive = button.dataset.page === page;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
      });

      bookPages.forEach((panel) => {
        const isActive = panel.dataset.page === page;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    });
  });
}
