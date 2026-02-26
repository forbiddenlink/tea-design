// TeaPlace - Portfolio Site JavaScript
// Modern vanilla JS with intersection observers and scroll-driven effects

// ============================================
// Navigation
// ============================================
const navbar = document.querySelector(".navbar");
const mobileBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

// Toggle Mobile Menu
mobileBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileBtn.classList.toggle("active");
  document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileBtn.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
}, { passive: true });

// ============================================
// Scroll Reveal Animation
// ============================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Don't unobserve - allow re-triggering for some elements
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Observe elements for reveal
document.querySelectorAll(
  ".feature-card, .product-card, .section-header, .philosophy-content, .brew-step"
).forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  revealObserver.observe(el);
});

// Add visible class styles
const style = document.createElement("style");
style.textContent = `
  .feature-card.visible,
  .product-card.visible,
  .section-header.visible,
  .philosophy-content.visible,
  .brew-step.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Stagger animation for grid items
document.querySelectorAll(".feature-card, .product-card, .brew-step").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 0.1}s`;
});

// ============================================
// Tea Journey Section
// ============================================
const journeySection = document.querySelector(".journey-section");
const journeyStages = document.querySelectorAll(".journey-stage");
const progressDots = document.querySelectorAll(".progress-dot");

// Journey stage observer
const journeyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Update progress dots
        const stage = entry.target.dataset.stage;
        progressDots.forEach((dot) => {
          dot.classList.toggle("active", dot.dataset.stage === stage);
        });
      }
    });
  },
  {
    threshold: 0.5,
    rootMargin: "-10% 0px -10% 0px",
  }
);

journeyStages.forEach((stage) => journeyObserver.observe(stage));

// Show/hide progress dots based on section visibility
const journeySectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const progressContainer = document.querySelector(".journey-progress");
      if (progressContainer) {
        progressContainer.classList.toggle("visible", entry.isIntersecting);
      }
    });
  },
  { threshold: 0.1 }
);

if (journeySection) {
  journeySectionObserver.observe(journeySection);
}

// Progress dot click navigation
progressDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const stage = dot.dataset.stage;
    const target = document.querySelector(`.journey-stage[data-stage="${stage}"]`);
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

// Parallax effect for journey backgrounds
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      journeyStages.forEach((stage) => {
        const rect = stage.getBoundingClientRect();
        const scrollY = (rect.top / window.innerHeight) * 50;
        stage.style.setProperty("--scroll-y", `${scrollY}px`);
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// ============================================
// 3D Tilt Effect for Product Cards
// ============================================
const tiltCards = document.querySelectorAll("[data-tilt]");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  });
});

// ============================================
// Stat Counter Animation
// ============================================
const statNumbers = document.querySelectorAll(".stat-number");

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCount(entry.target, target);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((num) => countObserver.observe(num));

function animateCount(element, target) {
  let current = 0;
  const increment = target / 40;
  const duration = 1500;
  const stepTime = duration / 40;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

// ============================================
// Newsletter Form
// ============================================
const newsletterForm = document.querySelector(".newsletter-form");
const submitBtn = newsletterForm?.querySelector("button");
const emailInput = newsletterForm?.querySelector("input");

newsletterForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (emailInput?.validity.valid) {
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      You're in!
    `;
    submitBtn.style.pointerEvents = "none";
    emailInput.disabled = true;

    // Reset after 3 seconds (demo only)
    setTimeout(() => {
      submitBtn.textContent = "Subscribe";
      submitBtn.style.pointerEvents = "";
      emailInput.disabled = false;
      emailInput.value = "";
    }, 3000);
  }
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = navbar?.offsetHeight || 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ============================================
// Brewing Guide Step Hover Effects
// ============================================
const brewSteps = document.querySelectorAll(".brew-step");

brewSteps.forEach((step) => {
  const icon = step.querySelector(".step-icon svg");

  step.addEventListener("mouseenter", () => {
    // Add subtle animation to SVG
    if (icon) {
      icon.style.transform = "scale(1.1)";
    }
  });

  step.addEventListener("mouseleave", () => {
    if (icon) {
      icon.style.transform = "";
    }
  });
});

// ============================================
// Image Grid Lazy Loading (optional enhancement)
// ============================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ============================================
// Prefers Reduced Motion
// ============================================
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (prefersReducedMotion.matches) {
  // Disable animations for users who prefer reduced motion
  document.documentElement.style.setProperty("--transition-slow", "0s");
  document.documentElement.style.setProperty("--transition-medium", "0s");
  document.documentElement.style.setProperty("--transition-fast", "0s");

  // Remove tilt effect
  tiltCards.forEach((card) => {
    card.removeAttribute("data-tilt");
  });
}

// ============================================
// Back to Top Button
// ============================================
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop?.classList.add("visible");
  } else {
    backToTop?.classList.remove("visible");
  }
}, { passive: true });

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

console.log("TeaPlace loaded successfully");
