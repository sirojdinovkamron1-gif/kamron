document.addEventListener("DOMContentLoaded", () => {

  /* ====== Yil (footer) ====== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ====== Navbar: scroll effekti va aktiv link ====== */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* ====== Mobil menyu ====== */
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    navMenu.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("open");
      navMenu.classList.remove("open");
    });
  });

  /* ====== Scroll bilan paydo bo'lish animatsiyasi ====== */
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ====== Ko'nikma bar'lari ====== */
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("span[data-level]").forEach((bar) => {
            bar.style.width = bar.dataset.level + "%";
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll(".skills-grid").forEach((el) => skillObserver.observe(el));

  /* ====== Raqamlarni sanash (counter) ====== */
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        const duration = 1600;
        const start = performance.now();

        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          el.textContent = Math.floor(progress * target) + (progress === 1 ? "+" : "");
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  /* ====== Yozilayotgan matn effekti ====== */
  const typedEl = document.querySelector(".typed");
  if (typedEl) {
    const words = JSON.parse(typedEl.dataset.words);
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const word = words[wordIndex];
      typedEl.textContent = word.substring(0, charIndex);

      let delay = deleting ? 50 : 100;

      if (!deleting && charIndex === word.length) {
        delay = 1800;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
      }

      charIndex += deleting ? -1 : 1;
      setTimeout(type, delay);
    };
    type();
  }

  /* ====== Aloqa formasi ====== */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type='submit']");
      btn.disabled = true;
      btn.textContent = "Yuborilmoqda...";
      status.textContent = "";

      // Bu yerga haqiqiy yuborish kodini (fetch, EmailJS va h.k.) qo'shishingiz mumkin.
      setTimeout(() => {
        status.textContent = "Xabaringiz yuborildi. Rahmat!";
        form.reset();
        btn.disabled = false;
        btn.textContent = "Yuborish";
      }, 1200);
    });
  }
});
