(function () {
  "use strict";

  /* Any footer */
  var yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===== Menú mòbil ===== */
  var ham = document.getElementById("hamburger");
  var nav = document.getElementById("mainNav");
  if (ham && nav) {
    ham.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      ham.classList.toggle("open", open);
      ham.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a[href]")) {
        nav.classList.remove("open");
        ham.classList.remove("open");
        ham.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ===== Submenús (botó) ===== */
  document.querySelectorAll(".nav-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
    });
  });

  /* ===== Reveal on scroll ===== */
  var revealEls = document.querySelectorAll(".reveal");
  if (typeof IntersectionObserver !== "undefined") {
    var revealIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            /* Delay per a fills consecutius */
            var siblings = entry.target.parentElement
              ? Array.from(entry.target.parentElement.querySelectorAll(".reveal"))
              : [];
            var idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = (idx * 0.07) + "s";
            entry.target.classList.add("in");
            revealIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    revealEls.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ===== Contadors animats ===== */
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-count") || "0", 10);
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round(easeOut(p) * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll(".stat-n[data-count]");
  if (typeof IntersectionObserver !== "undefined" && counters.length) {
    var cntIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            cntIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { cntIO.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute("data-count") || "0";
    });
  }

  /* ===== Header scrolled ===== */
  var header = document.querySelector(".site-header");
  if (header) {
    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ===== Formulari de contacte ===== */
  window.Ontec = window.Ontec || {};
  window.Ontec.submit = function (e) {
    e.preventDefault();
    var form = e.target;
    var msg = document.getElementById("formMsg");

    /* Validació bàsica */
    var nom = form.nom.value.trim();
    var email = form.email.value.trim();
    var missatge = form.missatge.value.trim();
    if (!nom || !email || !missatge) {
      if (msg) { msg.style.color = "#fca5a5"; msg.textContent = "Si us plau, omple tots els camps obligatoris."; }
      return false;
    }

    /* Simulació d'enviament */
    if (msg) {
      msg.style.color = "#86efac";
      msg.textContent = "Gràcies! Hem rebut la teva consulta i ens posarem en contacte aviat.";
    }
    form.reset();
    return false;
  };

})();
