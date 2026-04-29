const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const faqButtons = document.querySelectorAll(".faq-question");
const revealTargets = document.querySelectorAll(
  ".info-card, .service-card, .pillar-card, .process-step, .result-card, .testimonial-card, .audience-card, .team-section, .cta-panel, .about-card, .way-row, .tabs-panel-inner"
);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) return;

    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

// Tab switching
const tabButtons = document.querySelectorAll(".tabs-menu__btn");
const tabPanels = document.querySelectorAll(".tabs-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-tab");

    tabButtons.forEach((btn) => {
      btn.classList.remove("is-active");
      btn.setAttribute("aria-selected", "false");
    });
    tabPanels.forEach((panel) => {
      panel.classList.remove("is-active");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");

    const targetPanel = document.querySelector(`[data-panel="${target}"]`);
    if (targetPanel) targetPanel.classList.add("is-active");
  });
});

if (reduceMotion) {
  revealTargets.forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
  revealTargets.forEach((element) => {
    element.setAttribute("data-reveal", "");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealTargets.forEach((element) => observer.observe(element));
}
