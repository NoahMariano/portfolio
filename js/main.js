// Behavior for the portfolio.
// index.html holds the words. css/styles.css holds the look.
// This file connects clicks to those elements through data-* attributes.

const themeToggle = document.querySelector("[data-theme-toggle]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const copyButton = document.querySelector("[data-copy]");
const copyStatus = document.querySelector("[data-copy-status]");
const emptyNote = document.querySelector("[data-empty]");
const year = document.querySelector("[data-year]");

function currentTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function updateThemeButton(theme) {
  const isDark = theme === "dark";
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

if (themeToggle) {
  updateThemeButton(currentTheme());

  themeToggle.addEventListener("click", () => {
    const nextTheme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    updateThemeButton(nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (error) {
      // Private browsing can block storage. The theme still changes for this visit.
    }
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    document.querySelectorAll("[data-filter]").forEach((other) => {
      const active = other === button;
      other.classList.toggle("is-active", active);
      other.setAttribute("aria-pressed", String(active));
    });

    let visibleCount = 0;
    document.querySelectorAll("[data-category]").forEach((card) => {
      const show = category === "all" || card.dataset.category === category;
      card.hidden = !show;
      if (show) visibleCount += 1;
    });

    if (emptyNote) emptyNote.hidden = visibleCount !== 0;
  });
});

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const email = document.querySelector("[data-email]").textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = "Copied";
      copyStatus.textContent = "Email copied.";
    } catch (error) {
      copyButton.textContent = "Select the email";
      copyStatus.textContent = "Copy is unavailable here. Select the address instead.";
    }
    window.setTimeout(() => {
      copyButton.textContent = "Copy email";
    }, 1600);
  });
}

if (nav) {
  const sectionLinks = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => {
          link.classList.toggle("is-current", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => spy.observe(section));
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const banner = document.querySelector("[data-banner]");

if (banner) {
  const slides = [...banner.querySelectorAll("[data-banner-slide]")];
  const prevButton = banner.querySelector("[data-banner-prev]");
  const nextButton = banner.querySelector("[data-banner-next]");
  const dotsWrap = banner.querySelector("[data-banner-dots]");
  const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  let timer = 0;

  const dots = slides.map((_, slideIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "banner-dot";
    dot.setAttribute("aria-label", `Show banner ${slideIndex + 1}`);
    dot.addEventListener("click", () => {
      showSlide(slideIndex);
      restartTimer();
    });
    dotsWrap.append(dot);
    return dot;
  });

  function showSlide(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, slideIndex) => {
      const active = slideIndex === index;
      dot.classList.toggle("is-active", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function restartTimer() {
    window.clearInterval(timer);
    if (!motionOk || slides.length < 2) return;
    timer = window.setInterval(() => showSlide(index + 1), 6000);
  }

  prevButton.addEventListener("click", () => {
    showSlide(index - 1);
    restartTimer();
  });

  nextButton.addEventListener("click", () => {
    showSlide(index + 1);
    restartTimer();
  });

  banner.addEventListener("mouseenter", () => window.clearInterval(timer));
  banner.addEventListener("mouseleave", restartTimer);
  banner.addEventListener("focusin", () => window.clearInterval(timer));
  banner.addEventListener("focusout", (event) => {
    if (!banner.contains(event.relatedTarget)) restartTimer();
  });

  showSlide(0);
  restartTimer();
}

const resumeEmbed = document.querySelector("[data-resume-embed]");
const resumeMissing = document.querySelector("[data-resume-missing]");

if (resumeEmbed && resumeMissing) {
  fetch("resume.pdf", { method: "HEAD" })
    .then((response) => {
      if (!response.ok) return;
      resumeEmbed.hidden = false;
      resumeMissing.hidden = true;
    })
    .catch(() => {});
}
