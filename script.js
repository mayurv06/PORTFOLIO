// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// Theme toggle with local storage persistence
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const storedTheme = localStorage.getItem("theme");

if (storedTheme) {
  root.setAttribute("data-theme", storedTheme);
}

function updateThemeButton() {
  const darkMode = root.getAttribute("data-theme") !== "light";
  if (themeToggle) {
    themeToggle.textContent = darkMode ? "Light mode" : "Dark mode";
  }
}

updateThemeButton();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    updateThemeButton();
  });
}

// Typing effect for hero subtitle
const typingText = document.getElementById("typingText");
const phrases = [
  "Backend Engineer",
  "Full-Stack Problem Solver",
  "Python | C++ | Java | SQL"
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingText) return;

  const currentPhrase = phrases[phraseIndex];

  if (!deleting) {
    typingText.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === currentPhrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1300);
      return;
    }
  } else {
    typingText.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 45 : 85);
}

typeLoop();

// Project filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projects.forEach((project) => {
      const category = project.getAttribute("data-category") || "";
      const show = filter === "all" || category.includes(filter);
      project.style.display = show ? "block" : "none";
    });
  });
});

// Scroll reveal animation
const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

// Back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTop) return;
  if (window.scrollY > 420) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Footer year
const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

// Basic form submit guard (demo mode)
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thanks for your message. I will get back to you soon.");
    contactForm.reset();
  });
}
