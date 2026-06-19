// ════════════════════════════════════════════════════════════════════════════
// Ontec — shared design system (corporate / professional)
// Light, trustworthy palette built on the real logo green. No neon, no
// particles, no scanlines. Moderate motion only: scroll reveals, count-ups,
// soft image zoom and discreet hover states.
// ════════════════════════════════════════════════════════════════════════════

const {
  useState,
  useEffect,
  useRef
} = React;
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
const A = p => `color-mix(in srgb, var(--accent) ${p}%, transparent)`;

/* ════════════════════════════════════════════════════════════════════════════
   i18n — multilanguage (Català · Español · Français · English)
   Lightweight pub/sub store + useLang() hook + tt({ca,es,fr,en}) helper.
   Persisted in localStorage; syncs <html lang>. Page roots call useLang() so
   tt(...) calls re-evaluate on language change.
   ════════════════════════════════════════════════════════════════════════════ */
const LANGS = [{
  code: 'ca',
  label: 'CA',
  name: 'Català'
}, {
  code: 'es',
  label: 'ES',
  name: 'Español'
}, {
  code: 'fr',
  label: 'FR',
  name: 'Français'
}, {
  code: 'en',
  label: 'EN',
  name: 'English'
}];
const LANG_CODES = LANGS.map(l => l.code);
let CURRENT_LANG = (() => {
  try {
    const saved = localStorage.getItem('ontec_lang');
    if (saved && LANG_CODES.includes(saved)) return saved;
    const nav = (navigator.language || 'ca').slice(0, 2).toLowerCase();
    if (LANG_CODES.includes(nav)) return nav;
  } catch (e) {}
  return 'ca';
})();
const LANG_LISTENERS = new Set();
function setLang(code) {
  if (!LANG_CODES.includes(code) || code === CURRENT_LANG) return;
  CURRENT_LANG = code;
  try {
    localStorage.setItem('ontec_lang', code);
  } catch (e) {}
  try {
    document.documentElement.setAttribute('lang', code);
  } catch (e) {}
  LANG_LISTENERS.forEach(fn => fn(code));
}
function getLang() {
  return CURRENT_LANG;
}

/* translate: tt({ca, es, fr, en}) → value for active language (ca fallback).
   value may be a string or a JSX node. Plain strings pass through unchanged. */
function tt(obj) {
  if (obj == null) return '';
  if (typeof obj === 'string') return obj;
  if (typeof obj === 'object' && !obj.ca && !obj.es && !obj.fr && !obj.en) return obj; // JSX/element
  return obj[CURRENT_LANG] != null ? obj[CURRENT_LANG] : obj.ca != null ? obj.ca : '';
}

/* hook: subscribe a component to language changes */
function useLang() {
  const [lang, setL] = useState(CURRENT_LANG);
  useEffect(() => {
    const fn = code => setL(code);
    LANG_LISTENERS.add(fn);
    try {
      document.documentElement.setAttribute('lang', CURRENT_LANG);
    } catch (e) {}
    return () => LANG_LISTENERS.delete(fn);
  }, []);
  return [lang, setLang];
}

/* ── Language switcher (segmented CA · ES · FR · EN) ── */
function LangSwitcher({
  light = false,
  compact = false
}) {
  const [lang] = useLang();
  const idle = light ? 'rgba(255,255,255,.82)' : 'var(--mut)';
  const hover = light ? '#ffffff' : 'var(--ink)';
  return /*#__PURE__*/React.createElement("div", {
    role: "group",
    "aria-label": "Idioma",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      border: `1px solid ${light ? 'rgba(255,255,255,.28)' : 'var(--line)'}`,
      borderRadius: 999,
      padding: 3
    }
  }, LANGS.map(l => {
    const on = lang === l.code;
    return /*#__PURE__*/React.createElement("button", {
      key: l.code,
      onClick: () => setLang(l.code),
      "aria-pressed": on,
      title: l.name,
      style: {
        fontFamily: 'var(--mono)',
        fontSize: 10.5,
        letterSpacing: '.04em',
        fontWeight: 700,
        padding: compact ? '7px 10px' : '6px 9px',
        borderRadius: 999,
        border: 'none',
        cursor: 'pointer',
        background: on ? 'var(--accent)' : 'transparent',
        color: on ? 'var(--accent-ink)' : idle,
        transition: 'background .18s, color .18s'
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.color = hover;
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.color = idle;
      }
    }, l.label);
  }));
}
const GLOBAL_CSS = `
:root{
  --bg:#ffffff; --panel:#f5f7f2; --panel-2:#eef1ea; --panel-dark:#10211a;
  --ink:#13211b; --mut:rgba(19,33,27,.64); --faint:rgba(19,33,27,.42);
  --line:rgba(19,33,27,.12); --line-soft:rgba(19,33,27,.07);
  --accent:#4f9e2f; --accent-2:#8ec63f; --accent-deep:#3a7a22; --accent-ink:#ffffff;
  --disp:'Archivo',sans-serif; --body:'Space Grotesk',sans-serif; --mono:'Space Mono',monospace;
  --dtrack:-0.025em; --dweight:800;
  --zoom:1.06; --marquee:48s;
}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--ink);font-family:var(--body);overflow-x:hidden;-webkit-font-smoothing:antialiased;}
::selection{background:var(--accent);color:var(--accent-ink);}
::-webkit-scrollbar{width:10px;}::-webkit-scrollbar-track{background:var(--panel);}
::-webkit-scrollbar-thumb{background:rgba(19,33,27,.22);border-radius:5px;}
::-webkit-scrollbar-thumb:hover{background:var(--accent);}
input,textarea,button,select{font-family:var(--body);}
a{color:inherit;}

.wrap{max-width:1240px;margin:0 auto;padding:0 40px;}
.wrap-wide{max-width:1440px;margin:0 auto;padding:0 40px;}

.disp{font-family:var(--disp);font-weight:var(--dweight);letter-spacing:var(--dtrack);
  text-transform:none;line-height:1.04;color:var(--ink);text-wrap:balance;}
.kicker{font-family:var(--mono);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent-deep);}
.eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-size:11px;
  letter-spacing:.16em;text-transform:uppercase;color:var(--mut);}
.glow-text{}

/* buttons */
.btn{position:relative;display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:12.5px;
  font-weight:700;letter-spacing:.05em;text-transform:uppercase;text-decoration:none;cursor:pointer;
  padding:15px 26px;border-radius:10px;border:1px solid transparent;
  transition:transform .2s ease,background .2s,color .2s,box-shadow .25s,border-color .2s;}
.btn-primary{background:var(--accent);color:var(--accent-ink);box-shadow:0 6px 18px ${A(28)};}
.btn-primary:hover{background:var(--accent-deep);transform:translateY(-2px);box-shadow:0 12px 30px ${A(40)};}
.btn-ghost{background:transparent;color:var(--ink);border-color:var(--line);}
.btn-ghost:hover{border-color:var(--accent);color:var(--accent-deep);transform:translateY(-2px);}
.btn-light{background:rgba(255,255,255,.10);color:#fff;border-color:rgba(255,255,255,.34);
  -webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);}
.btn-light:hover{background:#fff;color:var(--accent-deep);border-color:#fff;transform:translateY(-2px);}

/* reveal on scroll */
.reveal{opacity:0;transform:translateY(26px);transition:opacity .9s cubic-bezier(.2,.7,.3,1),transform .9s cubic-bezier(.2,.7,.3,1);}
.reveal.in{opacity:1;transform:none;}
.reveal-clip{clip-path:inset(0 100% 0 0);transition:clip-path 1s cubic-bezier(.76,0,.24,1);}
.reveal-clip.in{clip-path:inset(0 0 0 0);}
@media (prefers-reduced-motion:reduce){.reveal,.reveal-clip{opacity:1;transform:none;clip-path:none;transition:none;}}

/* scroll progress */
.prog{position:fixed;top:0;left:0;height:3px;z-index:300;background:var(--accent);transform-origin:0 50%;}

/* media card */
.mcard{position:relative;overflow:hidden;border-radius:16px;border:1px solid var(--line);background:var(--bg);
  text-decoration:none;display:block;box-shadow:0 1px 2px rgba(19,33,27,.04);
  transition:border-color .3s,transform .35s cubic-bezier(.2,.7,.3,1),box-shadow .35s;}
.mcard:hover{border-color:${A(45)};transform:translateY(-5px);box-shadow:0 22px 48px rgba(19,33,27,.12);}
.mcard .mc-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  transition:transform .8s cubic-bezier(.2,.7,.3,1);}
.mcard:hover .mc-img{transform:scale(var(--zoom));}
.mc-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,18,12,.05) 0%,rgba(8,18,12,.35) 45%,rgba(8,18,12,.9) 100%);}

/* (legacy hooks kept as no-ops so existing markup stays valid) */
.glowborder{position:relative;}

/* marquee */
.mq{display:flex;overflow:hidden;user-select:none;}
.mq-track{display:flex;flex-shrink:0;gap:0;align-items:center;animation:mq var(--marquee) linear infinite;}
.mq:hover .mq-track{animation-play-state:paused;}
@keyframes mq{to{transform:translateX(-50%);}}
@keyframes floaty{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}

.linkline{position:relative;text-decoration:none;color:var(--mut);transition:color .2s;}
.linkline::after{content:'';position:absolute;left:0;bottom:-3px;width:0;height:1.5px;background:var(--accent);transition:width .3s;}
.linkline:hover{color:var(--ink);}
.linkline:hover::after{width:100%;}

@media(max-width:640px){.wrap,.wrap-wide{padding:0 20px;}}
`;

/* ── Scroll progress bar ── */
function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener('scroll', fn, {
      passive: true
    });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "prog",
    style: {
      width: '100%',
      transform: 'scaleX(0)'
    }
  });
}

/* ── Legacy effect components, neutralised (kept for API compatibility) ── */
function CursorFX() {
  return null;
}
function ParticleField() {
  return null;
}
function Scramble({
  text,
  className = '',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: style
  }, text);
}

/* ── CountUp ── */
function CountUp({
  to,
  suffix = '',
  prefix = '',
  dur = 1600,
  decimals = 0,
  className = '',
  style = {}
}) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      const obj = {
        count: 0
      };
      gsap.to(obj, {
        count: to,
        duration: dur / 1000,
        ease: 'power2.out',
        onUpdate: () => setVal(obj.count),
        onComplete: () => setVal(to),
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
      return;
    }
    let raf,
      start,
      done = false;
    if (typeof IntersectionObserver === 'undefined') {
      setVal(to);
      return;
    }
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting && !done) {
          done = true;
          const step = t => {
            if (!start) start = t;
            const p = Math.min((t - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
          io.disconnect();
        }
      });
    }, {
      threshold: .5
    });
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [to]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: className,
    style: style
  }, prefix, val.toFixed(decimals), suffix);
}

/* ── Magnetic button wrapper (subtle) ── */
function Magnetic({
  children,
  strength = 0.18,
  style = {}
}) {
  const ref = useRef(null);
  const onMove = e => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px,${y}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    onMouseMove: onMove,
    onMouseLeave: reset,
    style: {
      display: 'inline-flex',
      transition: 'transform .35s cubic-bezier(.2,.7,.3,1)',
      ...style
    }
  }, children);
}

/* ── Tilt (kept as plain wrapper — no 3D rotation, corporate look) ── */
function Tilt({
  children,
  className = '',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: style
  }, children);
}

/* ── Reveal ── */
function Reveal({
  children,
  delay = 0,
  as = 'div',
  clip = false,
  style = {},
  className = ''
}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      if (clip) {
        gsap.fromTo(el, {
          clipPath: 'inset(0 100% 0 0)'
        }, {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.1,
          delay: delay / 1000,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        });
      } else {
        gsap.fromTo(el, {
          opacity: 0,
          y: 26
        }, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: delay / 1000,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        });
      }
      return;
    }
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag2 = as;
  return /*#__PURE__*/React.createElement(Tag2, {
    ref: ref,
    className: `${clip ? 'reveal-clip' : 'reveal'} ${className}`,
    style: {
      transitionDelay: `${delay}ms`,
      ...style
    }
  }, children);
}

/* ── Marquee ── */
function Marquee({
  items,
  sep = '·',
  big = false
}) {
  const row = k => /*#__PURE__*/React.createElement("div", {
    className: "mq-track",
    key: k,
    "aria-hidden": k === 1
  }, items.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: big ? 26 : 18,
      padding: big ? '0 26px' : '0 18px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: big ? 'var(--disp)' : 'var(--mono)',
      fontWeight: big ? 700 : 400,
      textTransform: big ? 'none' : 'uppercase',
      letterSpacing: big ? 'var(--dtrack)' : '.14em',
      fontSize: big ? 'clamp(22px,3vw,40px)' : 12.5,
      color: big ? 'var(--ink)' : 'var(--mut)'
    }
  }, it), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      fontSize: big ? 18 : 11,
      opacity: .7
    }
  }, sep))));
  return /*#__PURE__*/React.createElement("div", {
    className: "mq"
  }, row(0), row(1));
}
const Icons = {
  Arrow: ({
    s = 18
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 5 19 12 12 19"
  })),
  UpRight: ({
    s = 18
  }) => /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "7",
    y1: "17",
    x2: "17",
    y2: "7"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 7 17 7 17 17"
  })),
  Mail: () => /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "4",
    width: "20",
    height: "16",
    rx: "2"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "2,4 12,13 22,4"
  })),
  Phone: () => /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.38 2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
  })),
  Pin: () => /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })),
  Check: () => /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })),
  Plus: () => /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })),
  Shield: () => /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  })),
  Wifi: () => /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12.55a11 11 0 0 1 14.08 0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1.42 9a16 16 0 0 1 21.16 0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.53 16.11a6 6 0 0 1 6.95 0"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "20",
    r: "1",
    fill: "currentColor"
  })),
  Cpu: () => /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "4",
    width: "16",
    height: "16",
    rx: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "6",
    height: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "1",
    x2: "9",
    y2: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "1",
    x2: "15",
    y2: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "20",
    x2: "9",
    y2: "23"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "20",
    x2: "15",
    y2: "23"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "9",
    x2: "23",
    y2: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "14",
    x2: "23",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "9",
    x2: "4",
    y2: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "14",
    x2: "4",
    y2: "14"
  })),
  Screen: () => /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "3",
    width: "20",
    height: "14",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "21",
    x2: "16",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12",
    y2: "21"
  })),
  Menu: () => /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "7",
    x2: "21",
    y2: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "17",
    x2: "21",
    y2: "17"
  })),
  X: () => /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })),
  Blog: () => /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "14 2 14 8 20 8"
  })),
  Video: () => /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "23 7 16 12 23 17 23 7"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "5",
    width: "15",
    height: "14",
    rx: "2"
  })),
  Lock: () => /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 0 1 10 0v4"
  })),
  Star: () => /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
  })),
  Building: () => /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 22V12h6v10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 9h18"
  }))
};
function Tag({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--mono)',
      fontSize: 10.5,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--accent-deep)',
      background: A(10),
      border: `1px solid ${A(24)}`,
      borderRadius: 8,
      padding: '5px 12px'
    }
  }, children);
}
function SectionLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 2,
      background: 'var(--accent)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, children));
}
function OntecLogo({
  height = 30,
  color = 'currentColor'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/ontec-logo.png",
    alt: "Ontec",
    height: height,
    style: {
      height,
      width: 'auto',
      display: 'block',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--disp)',
      fontWeight: 800,
      fontSize: Math.round(height * 0.6),
      color,
      letterSpacing: '-0.02em'
    }
  }, "Ontec"));
}
const NAV_ITEMS = [{
  id: 'Empresa',
  label: {
    ca: 'Empresa',
    es: 'Empresa',
    fr: 'Entreprise',
    en: 'Company'
  },
  href: 'empresa.html',
  children: [{
    label: {
      ca: 'Partners',
      es: 'Partners',
      fr: 'Partenaires',
      en: 'Partners'
    },
    href: 'empresa.html#partners'
  }]
}, {
  id: 'Solucions',
  label: {
    ca: 'Solucions',
    es: 'Soluciones',
    fr: 'Solutions',
    en: 'Solutions'
  },
  href: 'solucions.html',
  children: [{
    label: {
      ca: 'IT Security',
      es: 'IT Security',
      fr: 'IT Security',
      en: 'IT Security'
    },
    href: 'solucions.html#it-security'
  }, {
    label: {
      ca: 'Comunicacions',
      es: 'Comunicaciones',
      fr: 'Communications',
      en: 'Communications'
    },
    href: 'solucions.html#comunicacions'
  }, {
    label: {
      ca: 'Automatització',
      es: 'Automatización',
      fr: 'Automatisation',
      en: 'Automation'
    },
    href: 'solucions.html#automatitzacio'
  }, {
    label: {
      ca: 'Audiovisuals',
      es: 'Audiovisuales',
      fr: 'Audiovisuel',
      en: 'Audiovisual'
    },
    href: 'solucions.html#audiovisuals'
  }]
}, {
  id: 'Serveis',
  label: {
    ca: 'Serveis',
    es: 'Servicios',
    fr: 'Services',
    en: 'Services'
  },
  href: 'serveis.html',
  children: [{
    label: {
      ca: 'Enginyeries',
      es: 'Ingenierías',
      fr: 'Ingénieries',
      en: 'Engineering'
    },
    href: 'serveis.html#ingenieries'
  }, {
    label: {
      ca: 'Arquitectures',
      es: 'Arquitecturas',
      fr: 'Architectures',
      en: 'Architecture'
    },
    href: 'serveis.html#arquitectures'
  }, {
    label: {
      ca: 'Instal·ladors',
      es: 'Instaladores',
      fr: 'Installateurs',
      en: 'Installers'
    },
    href: 'serveis.html#installadors'
  }, {
    label: {
      ca: "Disseny d'Interiors",
      es: 'Diseño de Interiores',
      fr: "Design d'Intérieur",
      en: 'Interior Design'
    },
    href: 'serveis.html#disseny'
  }]
}, {
  id: 'Blog',
  label: {
    ca: 'Blog',
    es: 'Blog',
    fr: 'Blog',
    en: 'Blog'
  },
  href: 'blog.html'
}, {
  id: 'Contacta',
  label: {
    ca: 'Contacta',
    es: 'Contacto',
    fr: 'Contact',
    en: 'Contact'
  },
  href: 'contacta.html'
}];
function Nav({
  activePage = ''
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const [drop, setDrop] = useState(null);
  useLang();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const solid = scrolled || mob; // solid white bar
  const lightText = !solid; // over the dark hero → light text
  const textMut = lightText ? 'rgba(255,255,255,.82)' : 'var(--mut)';
  const textInk = lightText ? '#ffffff' : 'var(--ink)';
  const activeCol = lightText ? 'var(--accent-2)' : 'var(--accent-deep)';
  const linkBase = {
    display: 'block',
    padding: '9px 13px',
    fontFamily: 'var(--mono)',
    fontSize: 11.5,
    letterSpacing: '.1em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    borderRadius: 8,
    transition: 'color .15s'
  };
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 200,
      transition: 'all .3s',
      background: solid ? 'rgba(255,255,255,.86)' : 'transparent',
      borderBottom: `1px solid ${solid ? 'var(--line)' : 'transparent'}`,
      backdropFilter: solid ? 'blur(18px) saturate(150%)' : 'none',
      WebkitBackdropFilter: solid ? 'blur(18px) saturate(150%)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      height: 74,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html",
    style: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: textInk,
      marginRight: 40,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(OntecLogo, {
    height: 30
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2,
      flex: 1
    },
    className: "nav-desk"
  }, NAV_ITEMS.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    style: {
      position: 'relative'
    },
    onMouseEnter: () => item.children && setDrop(item.id),
    onMouseLeave: () => setDrop(null)
  }, /*#__PURE__*/React.createElement("a", {
    href: item.href,
    style: {
      ...linkBase,
      color: activePage === item.id ? activeCol : textMut
    },
    onMouseEnter: e => {
      if (activePage !== item.id) e.currentTarget.style.color = textInk;
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = activePage === item.id ? activeCol : textMut;
    }
  }, tt(item.label)), item.children && drop === item.id && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      minWidth: 220,
      background: '#ffffff',
      border: '1px solid var(--line)',
      borderRadius: 12,
      padding: '8px',
      boxShadow: '0 24px 60px rgba(19,33,27,.16)'
    }
  }, item.children.map(ch => /*#__PURE__*/React.createElement("a", {
    key: ch.href,
    href: ch.href,
    style: {
      display: 'block',
      padding: '10px 14px',
      color: 'var(--mut)',
      fontSize: 13,
      textDecoration: 'none',
      borderRadius: 8,
      transition: 'color .12s, background .12s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = 'var(--accent-deep)';
      e.currentTarget.style.background = A(8);
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'var(--mut)';
      e.currentTarget.style.background = 'transparent';
    }
  }, tt(ch.label))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      flexShrink: 0
    },
    className: "nav-desk"
  }, /*#__PURE__*/React.createElement(LangSwitcher, {
    light: lightText
  }), /*#__PURE__*/React.createElement("a", {
    href: "tel:+37688559",
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11.5,
      color: textMut,
      textDecoration: 'none',
      letterSpacing: '.04em'
    }
  }, "+376 88 55 99"), /*#__PURE__*/React.createElement("a", {
    href: "contacta.html",
    className: "btn btn-primary",
    style: {
      padding: '11px 20px'
    }
  }, tt({
    ca: 'Contacta',
    es: 'Contacto',
    fr: 'Contact',
    en: 'Contact'
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMob(!mob),
    className: "nav-mob",
    style: {
      display: 'none',
      marginLeft: 'auto',
      background: 'transparent',
      border: 'none',
      color: textInk,
      cursor: 'pointer'
    },
    "aria-label": "Menu",
    "aria-expanded": mob
  }, mob ? /*#__PURE__*/React.createElement(Icons.X, null) : /*#__PURE__*/React.createElement(Icons.Menu, null))), mob && /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#ffffff',
      borderTop: '1px solid var(--line)',
      padding: '14px 40px 28px'
    }
  }, NAV_ITEMS.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.id,
    href: item.href,
    className: "disp",
    style: {
      display: 'block',
      padding: '14px 0',
      fontSize: 24,
      color: 'var(--ink)',
      textDecoration: 'none',
      borderBottom: '1px solid var(--line-soft)'
    }
  }, tt(item.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(LangSwitcher, {
    compact: true
  })), /*#__PURE__*/React.createElement("a", {
    href: "contacta.html",
    className: "btn btn-primary",
    style: {
      marginTop: 18,
      width: '100%',
      justifyContent: 'center'
    }
  }, tt({
    ca: 'Contacta ara',
    es: 'Contacta ahora',
    fr: 'Contactez-nous',
    en: 'Get in touch'
  }))), /*#__PURE__*/React.createElement("style", null, `@media(max-width:920px){.nav-desk{display:none!important;}.nav-mob{display:block!important;}}`));
}
function Footer() {
  useLang();
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      position: 'relative',
      zIndex: 2,
      background: 'var(--panel-dark)',
      color: '#eef1ea',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid rgba(255,255,255,.08)',
      padding: '26px 0'
    }
  }, /*#__PURE__*/React.createElement(Marquee, {
    big: true,
    items: [tt({
      ca: 'Sistemes tecnològics',
      es: 'Sistemas tecnológicos',
      fr: 'Systèmes technologiques',
      en: 'Technology systems'
    }), 'IT Security', tt({
      ca: 'Comunicacions',
      es: 'Comunicaciones',
      fr: 'Communications',
      en: 'Communications'
    }), tt({
      ca: 'Automatització',
      es: 'Automatización',
      fr: 'Automatisation',
      en: 'Automation'
    }), tt({
      ca: 'Audiovisuals',
      es: 'Audiovisuales',
      fr: 'Audiovisuel',
      en: 'Audiovisual'
    }), 'Andorra']
  })), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      padding: '64px 40px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr',
      gap: 48,
      alignItems: 'start'
    },
    className: "ft-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#ffffff'
    }
  }, /*#__PURE__*/React.createElement(OntecLogo, {
    height: 34,
    color: "#ffffff"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 22,
      fontSize: 15,
      color: 'rgba(238,241,234,.66)',
      lineHeight: 1.7,
      maxWidth: 320
    }
  }, tt({
    ca: 'Distribució i integració de sistemes tecnològics avançats. Andorra, des de 2016.',
    es: 'Distribución e integración de sistemas tecnológicos avanzados. Andorra, desde 2016.',
    fr: 'Distribution et intégration de systèmes technologiques avancés. Andorre, depuis 2016.',
    en: 'Distribution and integration of advanced technology systems. Andorra, since 2016.'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "contacta.html",
    className: "btn btn-primary",
    style: {
      padding: '12px 22px'
    }
  }, tt({
    ca: 'Comença un projecte',
    es: 'Empieza un proyecto',
    fr: 'Démarrer un projet',
    en: 'Start a project'
  }), " ", /*#__PURE__*/React.createElement(Icons.UpRight, {
    s: 14
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "kicker",
    style: {
      color: 'var(--accent-2)',
      marginBottom: 18
    }
  }, tt({
    ca: 'Navegació',
    es: 'Navegación',
    fr: 'Navigation',
    en: 'Navigation'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, NAV_ITEMS.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    href: l.href,
    style: {
      fontSize: 15,
      color: 'rgba(238,241,234,.7)',
      textDecoration: 'none'
    }
  }, tt(l.label))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "kicker",
    style: {
      color: 'var(--accent-2)',
      marginBottom: 18
    }
  }, tt({
    ca: 'Contacte',
    es: 'Contacto',
    fr: 'Contact',
    en: 'Contact'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      fontSize: 15,
      color: 'rgba(238,241,234,.7)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:+37688559",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "+376 88 55 99"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@ontecandorra.com",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "info@ontecandorra.com"), /*#__PURE__*/React.createElement("span", null, "C/ de la Vena 3, Baixos", /*#__PURE__*/React.createElement("br", null), "Encamp, Andorra")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      paddingTop: 26,
      borderTop: '1px solid rgba(255,255,255,.08)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'rgba(238,241,234,.45)',
      letterSpacing: '.05em'
    }
  }, /*#__PURE__*/React.createElement("span", null, tt({
    ca: '© 2026 ON TECNOLOGIES S.L. — Tots els drets reservats',
    es: '© 2026 ON TECNOLOGIES S.L. — Todos los derechos reservados',
    fr: '© 2026 ON TECNOLOGIES S.L. — Tous droits réservés',
    en: '© 2026 ON TECNOLOGIES S.L. — All rights reserved'
  })), /*#__PURE__*/React.createElement("span", null, "ANDORRA · 42.5°N 1.5°E"))), /*#__PURE__*/React.createElement("style", null, `@media(max-width:820px){.ft-grid{grid-template-columns:1fr!important;gap:36px!important;}}`));
}
function Cine({
  src,
  alt = '',
  style = {},
  shade = false,
  parallax = false,
  children
}) {
  const [ok, setOk] = useState(!!src);
  const imgRef = useRef(null);
  useEffect(() => {
    if (!parallax) return;
    const el = imgRef.current;
    if (!el) return;
    const fn = () => {
      const r = el.getBoundingClientRect();
      const off = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      el.style.transform = `scale(1.14) translateY(${off * -28}px)`;
    };
    window.addEventListener('scroll', fn, {
      passive: true
    });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, [parallax, ok]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--panel-2)',
      ...style
    }
  }, ok ? /*#__PURE__*/React.createElement("img", {
    ref: imgRef,
    src: src,
    alt: alt,
    onError: () => setOk(false),
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      willChange: parallax ? 'transform' : 'auto'
    }
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg,#1a2e22 0%,#0f1d15 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(circle at 50% 40%, ${A(18)}, transparent 60%)`
    }
  })), shade && /*#__PURE__*/React.createElement("div", {
    className: "mc-shade"
  }), children);
}
function PageHero({
  kicker,
  title,
  sub,
  img,
  align = 'left'
}) {
  const kickerRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  useEffect(() => {
    if (typeof gsap === 'undefined') return;
    const tl = gsap.timeline({
      delay: 0.15
    });
    tl.fromTo(kickerRef.current, {
      opacity: 0,
      y: 14
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out'
    });
    tl.fromTo(titleRef.current, {
      opacity: 0,
      y: 36
    }, {
      opacity: 1,
      y: 0,
      duration: 1.05,
      ease: 'power3.out'
    }, '-=0.4');
    if (subRef.current) {
      tl.fromTo(subRef.current, {
        opacity: 0,
        y: 22
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.55');
    }
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 'min(72vh,640px)',
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
      background: 'var(--panel-dark)'
    }
  }, /*#__PURE__*/React.createElement(Cine, {
    src: img,
    alt: "",
    parallax: true,
    style: {
      position: 'absolute',
      inset: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg,rgba(8,18,12,.6) 0%,rgba(8,18,12,.35) 38%,rgba(8,18,12,.8) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg,rgba(8,18,12,.85) 0%,rgba(8,18,12,.4) 50%,transparent 90%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      position: 'relative',
      zIndex: 2,
      width: '100%',
      paddingTop: 150,
      paddingBottom: 80,
      textAlign: align
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: kickerRef,
    className: "eyebrow",
    style: {
      marginBottom: 22,
      color: 'rgba(255,255,255,.78)',
      justifyContent: align === 'center' ? 'center' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 2,
      background: 'var(--accent-2)'
    }
  }), kicker), /*#__PURE__*/React.createElement("h1", {
    ref: titleRef,
    className: "disp",
    style: {
      color: '#fff',
      fontSize: 'clamp(40px,6vw,92px)',
      maxWidth: 1080,
      margin: align === 'center' ? '0 auto' : 0
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    ref: subRef,
    style: {
      marginTop: 24,
      fontSize: 'clamp(16px,1.4vw,19px)',
      color: 'rgba(255,255,255,.74)',
      lineHeight: 1.7,
      maxWidth: 600,
      margin: align === 'center' ? '24px auto 0' : '24px 0 0'
    }
  }, sub)));
}
function PageShell({
  activePage,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg)'
    }
  }, /*#__PURE__*/React.createElement("style", null, GLOBAL_CSS), /*#__PURE__*/React.createElement(ScrollProgress, null), /*#__PURE__*/React.createElement(Nav, {
    activePage: activePage
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      position: 'relative',
      zIndex: 2,
      flex: 1
    }
  }, children), /*#__PURE__*/React.createElement(Footer, null));
}
Object.assign(window, {
  A,
  GLOBAL_CSS,
  Reveal,
  Marquee,
  Icons,
  Tag,
  SectionLabel,
  OntecLogo,
  Cine,
  PageHero,
  Nav,
  Footer,
  PageShell,
  NAV_ITEMS,
  ScrollProgress,
  CursorFX,
  ParticleField,
  Scramble,
  CountUp,
  Magnetic,
  Tilt,
  LANGS,
  tt,
  useLang,
  setLang,
  getLang,
  LangSwitcher
});

// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;width:100%;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "✕")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;

  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}
function TweakColor({
  label,
  value,
  onChange,
  options
}) {
  if (options && options.length) {
    const opts = options.map(o => typeof o === 'object' ? o : {
      value: o,
      label: ''
    });
    return /*#__PURE__*/React.createElement(TweakRow, {
      label: label
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, opts.map(o => {
      const on = o.value === value;
      return /*#__PURE__*/React.createElement("button", {
        key: o.value,
        type: "button",
        title: o.label || o.value,
        onClick: () => onChange(o.value),
        style: {
          flex: 1,
          height: 26,
          borderRadius: 7,
          cursor: 'default',
          background: o.value,
          padding: 0,
          border: on ? '2px solid rgba(41,38,27,.85)' : '.5px solid rgba(0,0,0,.15)',
          boxShadow: on ? '0 0 0 2px rgba(255,255,255,.7)' : 'none'
        }
      });
    })));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
    type: "color",
    className: "twk-swatch",
    value: value,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
const ARTICLE_DATA = {
  id: 'batllia-videoconferencia',
  tag: {
    ca: 'Videoconferencia',
    es: 'Videoconferencia',
    fr: 'Visioconférence',
    en: 'Video conferencing'
  },
  date: '2025',
  readtime: '5 min',
  title: {
    ca: "Sistema de videoconferencia a la Batllia d'Andorra",
    es: "Sistema de videoconferencia en la Batllia d'Andorra",
    fr: "Système de visioconférence à la Batllia d'Andorra",
    en: "Video conferencing system at the Batllia d'Andorra"
  },
  author: 'Ontec',
  content: {
    ca: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "La Batllia d'Andorra és la seu del poder executiu de la Principalitat. Durant els últims anys, les seves necessitats de comunicació s'han multiplicat amb organismes internacionals, tribunals europeus i institucions de la Unió Europea."), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        marginTop: 40,
        marginBottom: 16,
        fontFamily: 'var(--disp)'
      }
    }, "El desafiament"), /*#__PURE__*/React.createElement("p", null, "Els espais de reunions institucionals requerien una solució de videoconferència de primer nivell que complís amb estàndards internacionals de seguretat, qualitat audiovisual i escalabilitat. Les connexions amb òrgans de govern internacionals exigeixen latència mínima, criptografia de punta a punta i compatibilitat amb els sistemes més exigents."), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        marginTop: 40,
        marginBottom: 16,
        fontFamily: 'var(--disp)'
      }
    }, "La solució desplegada"), /*#__PURE__*/React.createElement("p", null, "Ontec ha implementat una ", /*#__PURE__*/React.createElement("strong", null, "infraestructura completa de videoconferència professional"), " basada en:"), /*#__PURE__*/React.createElement("ul", {
      style: {
        marginLeft: 24,
        marginTop: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Cisco Webex MCU"), " com a nucli de videoconferència, amb suport per a 500+ participants simultàniament"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Sony PTZ Cameras"), " amb enfocament automàtic i control de zoom per a captures cinematogràfiques"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Àudio d'alta qualitat"), " amb sistemes Shure de condensador de cobertura ampla"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Xarxa de transmissió segura"), " amb encriptació de dades en trànsit i en repòs"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Integració amb Microsoft Teams i Zoom"), " per a flexibilitat d'ecosistemes")), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        marginTop: 40,
        marginBottom: 16,
        fontFamily: 'var(--disp)'
      }
    }, "Resultat"), /*#__PURE__*/React.createElement("p", null, "Avui dia, la Batllia pot realitzar connexions ", /*#__PURE__*/React.createElement("strong", null, "d'alt nivell amb organismes internacionals"), " amb qualitat audiovisual certificada. Les sessions són enregistrades de forma segura, amb logs complets per a auditoria i traçabilitat total."), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 16
      }
    }, "Aquest projecte exemplifica la capacitat d'Ontec per desplegar solucions tecnològiques crítiques en entorns institucionals, combinant fiabilitat, seguretat i innovació.")),
    es: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "La Batllia d'Andorra es la sede del poder ejecutivo del Principado. Durante los últimos años, sus necesidades de comunicación se han multiplicado con organismos internacionales, tribunales europeos e instituciones de la Unión Europea."), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        marginTop: 40,
        marginBottom: 16,
        fontFamily: 'var(--disp)'
      }
    }, "El desafío"), /*#__PURE__*/React.createElement("p", null, "Los espacios de reuniones institucionales requerían una solución de videoconferencia de primer nivel que cumpliera con estándares internacionales de seguridad, calidad audiovisual y escalabilidad. Las conexiones con órganos de gobierno internacionales exigen una latencia mínima, criptografía de extremo a extremo y compatibilidad con los sistemas más exigentes."), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        marginTop: 40,
        marginBottom: 16,
        fontFamily: 'var(--disp)'
      }
    }, "La solución desplegada"), /*#__PURE__*/React.createElement("p", null, "Ontec ha implementado una ", /*#__PURE__*/React.createElement("strong", null, "infraestructura completa de videoconferencia profesional"), " basada en:"), /*#__PURE__*/React.createElement("ul", {
      style: {
        marginLeft: 24,
        marginTop: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Cisco Webex MCU"), " como núcleo de videoconferencia, con soporte para más de 500 participantes simultáneamente"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Sony PTZ Cameras"), " con enfoque automático y control de zoom para capturas cinematográficas"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Audio de alta calidad"), " con sistemas Shure de condensador de cobertura amplia"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Red de transmisión segura"), " con cifrado de datos en tránsito y en reposo"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Integración con Microsoft Teams y Zoom"), " para mayor flexibilidad de ecosistemas")), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        marginTop: 40,
        marginBottom: 16,
        fontFamily: 'var(--disp)'
      }
    }, "Resultado"), /*#__PURE__*/React.createElement("p", null, "Hoy en día, la Batllia puede realizar conexiones ", /*#__PURE__*/React.createElement("strong", null, "de alto nivel con organismos internacionales"), " con calidad audiovisual certificada. Las sesiones se graban de forma segura, con registros completos para auditoría y trazabilidad total."), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 16
      }
    }, "Este proyecto ejemplifica la capacidad de Ontec para desplegar soluciones tecnológicas críticas en entornos institucionales, combinando fiabilidad, seguridad e innovación.")),
    fr: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "La Batllia d'Andorra est le siège du pouvoir exécutif de la Principauté. Au cours des dernières années, ses besoins en communication se sont multipliés avec des organismes internationaux, des tribunaux européens et des institutions de l'Union européenne."), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        marginTop: 40,
        marginBottom: 16,
        fontFamily: 'var(--disp)'
      }
    }, "Le défi"), /*#__PURE__*/React.createElement("p", null, "Les espaces de réunion institutionnels nécessitaient une solution de visioconférence de premier ordre, conforme aux normes internationales de sécurité, de qualité audiovisuelle et d'évolutivité. Les connexions avec des organes de gouvernement internationaux exigent une latence minimale, un chiffrement de bout en bout et une compatibilité avec les systèmes les plus exigeants."), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        marginTop: 40,
        marginBottom: 16,
        fontFamily: 'var(--disp)'
      }
    }, "La solution déployée"), /*#__PURE__*/React.createElement("p", null, "Ontec a mis en place une ", /*#__PURE__*/React.createElement("strong", null, "infrastructure complète de visioconférence professionnelle"), " reposant sur :"), /*#__PURE__*/React.createElement("ul", {
      style: {
        marginLeft: 24,
        marginTop: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Cisco Webex MCU"), " comme cœur de la visioconférence, avec prise en charge de plus de 500 participants simultanément"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Sony PTZ Cameras"), " avec mise au point automatique et contrôle du zoom pour des prises de vue cinématographiques"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Audio haute qualité"), " avec des systèmes Shure à condensateur à large couverture"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Réseau de transmission sécurisé"), " avec chiffrement des données en transit et au repos"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Intégration avec Microsoft Teams et Zoom"), " pour une flexibilité entre écosystèmes")), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        marginTop: 40,
        marginBottom: 16,
        fontFamily: 'var(--disp)'
      }
    }, "Résultat"), /*#__PURE__*/React.createElement("p", null, "Aujourd'hui, la Batllia peut établir des connexions ", /*#__PURE__*/React.createElement("strong", null, "de haut niveau avec des organismes internationaux"), " avec une qualité audiovisuelle certifiée. Les sessions sont enregistrées de manière sécurisée, avec des journaux complets pour l'audit et une traçabilité totale."), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 16
      }
    }, "Ce projet illustre la capacité d'Ontec à déployer des solutions technologiques critiques dans des environnements institutionnels, en alliant fiabilité, sécurité et innovation.")),
    en: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "The Batllia d'Andorra is the seat of the Principality's executive power. In recent years, its communication needs have multiplied with international organizations, European courts and European Union institutions."), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        marginTop: 40,
        marginBottom: 16,
        fontFamily: 'var(--disp)'
      }
    }, "The challenge"), /*#__PURE__*/React.createElement("p", null, "The institutional meeting spaces required a top-tier video conferencing solution that met international standards for security, audiovisual quality and scalability. Connections with international government bodies demand minimal latency, end-to-end encryption and compatibility with the most demanding systems."), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        marginTop: 40,
        marginBottom: 16,
        fontFamily: 'var(--disp)'
      }
    }, "The deployed solution"), /*#__PURE__*/React.createElement("p", null, "Ontec has implemented a ", /*#__PURE__*/React.createElement("strong", null, "complete professional video conferencing infrastructure"), " based on:"), /*#__PURE__*/React.createElement("ul", {
      style: {
        marginLeft: 24,
        marginTop: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Cisco Webex MCU"), " as the video conferencing core, with support for 500+ simultaneous participants"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Sony PTZ Cameras"), " with automatic focus and zoom control for cinematic shots"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "High-quality audio"), " with wide-coverage Shure condenser systems"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Secure transmission network"), " with data encryption in transit and at rest"), /*#__PURE__*/React.createElement("li", {
      style: {
        marginBottom: 10
      }
    }, "• ", /*#__PURE__*/React.createElement("strong", null, "Integration with Microsoft Teams and Zoom"), " for ecosystem flexibility")), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        marginTop: 40,
        marginBottom: 16,
        fontFamily: 'var(--disp)'
      }
    }, "Outcome"), /*#__PURE__*/React.createElement("p", null, "Today, the Batllia can hold ", /*#__PURE__*/React.createElement("strong", null, "high-level connections with international organizations"), " with certified audiovisual quality. Sessions are recorded securely, with complete logs for auditing and full traceability."), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 16
      }
    }, "This project exemplifies Ontec's ability to deploy critical technology solutions in institutional environments, combining reliability, security and innovation."))
  }
};
const TWEAK_DEFAULTS = {
  "mood": "acid",
  "voice": "editorial",
  "intensity": "cinematic"
};
function BlogArticle({
  id,
  tag,
  date,
  readtime,
  title,
  author = 'Ontec',
  content
}) {
  useLang();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute('data-mood', t.mood);
    r.setAttribute('data-voice', t.voice);
    r.setAttribute('data-intensity', t.intensity);
  }, [t.mood, t.voice, t.intensity]);
  const relatedArticles = [{
    title: {
      ca: "Ciberseguretat empresarial 2025",
      es: "Ciberseguridad empresarial 2025",
      fr: "Cybersécurité en entreprise 2025",
      en: "Enterprise cybersecurity 2025"
    },
    href: "#"
  }, {
    title: {
      ca: "Tendencies en infraestructura tecnològica",
      es: "Tendencias en infraestructura tecnológica",
      fr: "Tendances en infrastructure technologique",
      en: "Trends in technology infrastructure"
    },
    href: "#"
  }, {
    title: {
      ca: "Transformació digital a Andorra",
      es: "Transformación digital en Andorra",
      fr: "Transformation numérique en Andorre",
      en: "Digital transformation in Andorra"
    },
    href: "#"
  }];
  return /*#__PURE__*/React.createElement(PageShell, {
    activePage: "Blog"
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'flex-end',
      background: 'var(--panel-dark)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg,rgba(8,18,12,.7) 0%,rgba(8,18,12,.4) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      position: 'relative',
      zIndex: 2,
      paddingTop: 120,
      paddingBottom: 80,
      maxWidth: 800
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Tag, null, tt(tag)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'rgba(255,255,255,.6)'
    }
  }, date)), /*#__PURE__*/React.createElement("h1", {
    className: "disp",
    style: {
      fontSize: 'clamp(40px,5vw,64px)',
      color: '#fff',
      lineHeight: 1.15,
      marginBottom: 20
    }
  }, tt(title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'rgba(255,255,255,.7)'
    }
  }, /*#__PURE__*/React.createElement("span", null, readtime), /*#__PURE__*/React.createElement("span", null, "·"), /*#__PURE__*/React.createElement("span", null, tt({
    ca: `Per ${author}`,
    es: `Por ${author}`,
    fr: `Par ${author}`,
    en: `By ${author}`
  })))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--bg)',
      padding: '80px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("article", {
    style: {
      fontSize: 16,
      lineHeight: 1.8,
      color: 'var(--mut)'
    }
  }, tt(content)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 80,
      paddingTop: 60,
      borderTop: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 280px',
      gap: 60
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "disp",
    style: {
      fontSize: 28,
      marginBottom: 32
    }
  }, tt({
    ca: 'Articles relacionats',
    es: 'Artículos relacionados',
    fr: 'Articles liés',
    en: 'Related articles'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, relatedArticles.map((art, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: art.href,
    style: {
      padding: '20px',
      background: 'var(--panel)',
      border: '1px solid var(--line)',
      borderRadius: 12,
      textDecoration: 'none',
      color: 'var(--ink)',
      transition: 'border-color .2s,background .2s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = 'var(--accent)';
      e.currentTarget.style.background = 'var(--panel-2)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = 'var(--line)';
      e.currentTarget.style.background = 'var(--panel)';
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--accent)',
      marginBottom: 8
    }
  }, tt({
    ca: 'ARTICLE',
    es: 'ARTÍCULO',
    fr: 'ARTICLE',
    en: 'ARTICLE'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 15
    }
  }, tt(art.title)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--panel)',
      border: '1px solid var(--line)',
      borderRadius: 14,
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      marginBottom: 20
    }
  }, tt({
    ca: 'Sobre Ontec',
    es: 'Sobre Ontec',
    fr: 'À propos d\'Ontec',
    en: 'About Ontec'
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--mut)',
      lineHeight: 1.7,
      marginBottom: 20
    }
  }, tt({
    ca: 'Som especialistes en sistemes tecnològics avancats: IT Security, videoconferència, comunicacions i automatització per a empreses andorranes.',
    es: 'Somos especialistas en sistemas tecnológicos avanzados: IT Security, videoconferencia, comunicaciones y automatización para empresas andorranas.',
    fr: 'Nous sommes spécialistes des systèmes technologiques avancés : IT Security, visioconférence, communications et automatisation pour les entreprises andorranes.',
    en: 'We are specialists in advanced technology systems: IT Security, video conferencing, communications and automation for Andorran businesses.'
  })), /*#__PURE__*/React.createElement("a", {
    href: "contacta.html",
    className: "btn btn-primary",
    style: {
      width: '100%',
      justifyContent: 'center',
      padding: '12px 16px'
    }
  }, tt({
    ca: "Contacta'ns",
    es: 'Contáctanos',
    fr: 'Contactez-nous',
    en: 'Contact us'
  })))))))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(BlogArticle, ARTICLE_DATA));