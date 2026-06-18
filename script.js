(function () {
  "use strict";

  /* Any al footer */
  var fy = document.getElementById("fy");
  if (fy) fy.textContent = new Date().getFullYear();

  /* ── Menú mòbil ── */
  var ham = document.getElementById("navHam");
  var nav = document.getElementById("navLinks");
  if (ham && nav) {
    ham.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      ham.classList.toggle("open", open);
      ham.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        ham.classList.remove("open");
        ham.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ── Reveal on scroll ── */
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var siblings = Array.from(
          entry.target.parentElement
            ? entry.target.parentElement.querySelectorAll(":scope > .reveal")
            : []
        );
        var idx = siblings.indexOf(entry.target);
        if (idx > 0) entry.target.style.transitionDelay = (idx * 0.08) + "s";
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -24px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }

  /* ── Terminal animation ── */
  var termBody = document.getElementById("terminalBody");
  if (termBody) {
    var lines = [
      { delay: 600,  text: "> carregant mòduls…",       color: "var(--mut)" },
      { delay: 1100, text: "✓ IT Security",              color: "var(--accent)" },
      { delay: 1500, text: "✓ Comunicacions",            color: "var(--accent)" },
      { delay: 1900, text: "✓ Automatització",           color: "var(--accent)" },
      { delay: 2300, text: "✓ Audiovisuals",             color: "var(--accent)" },
      { delay: 2700, text: "✓ Videoconferència",         color: "var(--accent)" },
      { delay: 3200, text: "> sistema llest · Andorra",  color: "var(--mut)" },
    ];
    var cursor = document.createElement("span");
    cursor.className = "t-cursor";
    termBody.appendChild(cursor);

    lines.forEach(function (l) {
      setTimeout(function () {
        var d = document.createElement("div");
        d.className = "t-line";
        d.style.color = l.color;
        d.textContent = l.text;
        termBody.insertBefore(d, cursor);
      }, l.delay);
    });
  }

  /* ── Marquee (JS duplicate fallback) ── */
  /* CSS animation handles it, nothing needed */

  /* ── Formulari ── */
  window.Ontec = window.Ontec || {};
  window.Ontec.submit = function (e) {
    e.preventDefault();
    var form = e.target;
    var msg  = document.getElementById("cfMsg");
    var nom  = (form.nom  || form.cnom  || { value: "" }).value.trim();
    var mail = (form.email || form.cemail || { value: "" }).value.trim();
    var text = (form.missatge || form.cmissatge || { value: "" }).value.trim();

    if (!nom || !mail || !text) {
      if (msg) { msg.style.color = "#ff5f57"; msg.textContent = "Si us plau, omple tots els camps obligatoris."; }
      return false;
    }
    if (msg) {
      msg.style.color = "var(--accent)";
      msg.textContent = "✓ Gràcies! Hem rebut la teva consulta i ens posarem en contacte aviat.";
    }
    form.reset();
    return false;
  };

})();
