(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const progress = document.getElementById("progress");

  function splitWords(el) {
    const text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    el.innerHTML = text
      .split(/\s+/)
      .map(function (word) {
        return "<span class=\"word\"><span class=\"word-inner\">" + word + "</span></span>";
      })
      .join(" ");
    return el.querySelectorAll(".word-inner");
  }

  function splitChars(el) {
    const text = el.textContent;
    el.setAttribute("aria-label", text);
    el.innerHTML = Array.from(text)
      .map(function (ch) {
        if (ch === " ") return "<span class=\"char space\">&nbsp;</span>";
        return "<span class=\"char\">" + ch + "</span>";
      })
      .join("");
    return el.querySelectorAll(".char");
  }

  document.querySelectorAll("[data-split-words]").forEach(splitWords);
  document.querySelectorAll("[data-split-chars]").forEach(splitChars);

  if (typeof gsap === "undefined") {
    console.warn("GSAP failed to load");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  if (reduce) {
    gsap.set([".word-inner", "[data-hero-fade]", "[data-card]", "[data-outro]", ".char"], {
      clearProps: "all",
      opacity: 1,
      y: 0,
    });
    return;
  }

  gsap.to(progress, {
    width: "100%",
    ease: "none",
    scrollTrigger: { scrub: 0.2 },
  });

  const heroWords = document.querySelectorAll(".hero-title .word-inner");
  const heroFade = document.querySelectorAll("[data-hero-fade]");

  gsap.set(heroWords, { yPercent: 120 });
  gsap.set(heroFade, { opacity: 0, y: 18 });

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .to(heroFade[0], { opacity: 1, y: 0, duration: 0.7 }, 0.15)
    .to(heroWords, { yPercent: 0, duration: 1.05, stagger: 0.08 }, 0.28)
    .to(heroFade, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.7);

  gsap.to(".orb", {
    y: 36,
    x: -18,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".orb-sm", {
    y: -28,
    x: 16,
    duration: 5.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  const chars = document.querySelectorAll(".reveal-line .char");
  gsap.to(chars, {
    opacity: 1,
    ease: "none",
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".reveal",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
    },
  });

  const track = document.getElementById("pin-track");
  gsap.to(track, {
    x: function () {
      return -(track.scrollWidth - window.innerWidth);
    },
    ease: "none",
    scrollTrigger: {
      trigger: ".pin",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      end: function () {
        return "+=" + Math.max(track.scrollWidth - window.innerWidth, 1);
      },
    },
  });

  gsap.from("[data-card]", {
    y: 56,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".card-grid",
      start: "top 78%",
    },
  });

  gsap.from("[data-outro]", {
    yPercent: 110,
    duration: 1.1,
    ease: "power3.out",
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".outro",
      start: "top 70%",
    },
  });

  document.querySelectorAll(".nav-links a, .cta, .nav-logo").forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  });
})();
