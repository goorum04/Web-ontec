// ════════════════════════════════════════════════════════════════════════════
// Ontec — shared design system (cinematic / high-impact)
// Tokens + global motion (aurora, particles, cursor spotlight, scroll progress)
// + Reveal, Scramble, CountUp, MagneticButton, TiltCard, Marquee, Icons,
//   Tag, SectionLabel, Nav, Footer, Cine, PageHero, PageShell.
// ════════════════════════════════════════════════════════════════════════════

const {
  useState,
  useEffect,
  useRef
} = React;
const A = p => `color-mix(in srgb, var(--accent) ${p}%, transparent)`;
const GLOBAL_CSS = `
:root{
  --bg:#000; --panel:#0b0b0c; --panel-2:#101011;
  --ink:#f4f5f3; --mut:rgba(244,245,243,.54); --faint:rgba(244,245,243,.3);
  --line:rgba(255,255,255,.10); --line-soft:rgba(255,255,255,.06);
  --accent:#39ff6e; --accent-ink:#04130a;
  --disp:'Archivo',sans-serif; --body:'Space Grotesk',sans-serif; --mono:'Space Mono',monospace;
  --case:uppercase; --dtrack:-0.035em; --dweight:840;
  --glow:1; --grain:.5; --zoom:1.07; --marquee:38s; --scan:0;
  --mx:50vw; --my:50vh;
}
[data-mood="acid"]  { --accent:#39ff6e; --accent-ink:#04130a; }
[data-mood="ice"]   { --accent:#41dfff; --accent-ink:#03161c; }
[data-mood="flare"] { --accent:#ff5836; --accent-ink:#190603; }
[data-mood="mono"]  { --accent:#f4f5f3; --accent-ink:#000; }
[data-voice="editorial"]{ --case:uppercase; --dweight:900; --dtrack:-0.04em; }
[data-voice="modern"]   { --case:none;      --dweight:780; --dtrack:-0.03em; }
[data-voice="soft"]     { --case:none;      --dweight:640; --dtrack:-0.018em; --disp:'Space Grotesk',sans-serif; }
[data-intensity="calm"]     { --glow:.35; --grain:.12; --zoom:1.03; --marquee:64s; --scan:0; }
[data-intensity="cinematic"]{ --glow:1;   --grain:.5;  --zoom:1.07; --marquee:38s; --scan:0; }
[data-intensity="hyper"]    { --glow:1.6; --grain:.85; --zoom:1.14; --marquee:18s; --scan:1; }

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--ink);font-family:var(--body);overflow-x:hidden;-webkit-font-smoothing:antialiased;}
::selection{background:var(--accent);color:var(--accent-ink);}
::-webkit-scrollbar{width:8px;}::-webkit-scrollbar-track{background:#000;}
::-webkit-scrollbar-thumb{background:var(--line);border-radius:4px;}
::-webkit-scrollbar-thumb:hover{background:var(--accent);}
input,textarea,button,select{font-family:var(--body);}
a{color:inherit;}

.wrap{max-width:1320px;margin:0 auto;padding:0 40px;}
.wrap-wide{max-width:1680px;margin:0 auto;padding:0 40px;}

.disp{font-family:var(--disp);font-weight:var(--dweight);letter-spacing:var(--dtrack);
  text-transform:var(--case);line-height:.96;color:var(--ink);text-wrap:balance;}
.kicker{font-family:var(--mono);font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);}
.eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-size:11px;
  letter-spacing:.18em;text-transform:uppercase;color:var(--mut);}
.glow-text{text-shadow:0 0 40px ${A(35)};}

/* buttons */
.btn{position:relative;display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:12.5px;
  font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;cursor:pointer;
  padding:15px 26px;border-radius:999px;border:1px solid transparent;overflow:hidden;
  transition:transform .25s cubic-bezier(.2,.7,.3,1),background .2s,color .2s,box-shadow .25s,border-color .2s;}
.btn-primary{background:var(--accent);color:var(--accent-ink);box-shadow:0 0 0 0 var(--accent);}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 14px 50px ${A(50)},0 0 0 1px ${A(60)};}
.btn-primary::after{content:'';position:absolute;top:0;left:-120%;width:60%;height:100%;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-18deg);transition:left .6s ease;}
.btn-primary:hover::after{left:140%;}
.btn-ghost{background:rgba(255,255,255,.02);color:var(--ink);border-color:var(--line);}
.btn-ghost:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-2px);box-shadow:0 10px 40px ${A(18)};}

/* reveal on scroll */
.reveal{opacity:0;transform:translateY(34px);transition:opacity 1s cubic-bezier(.2,.7,.3,1),transform 1s cubic-bezier(.2,.7,.3,1);}
.reveal.in{opacity:1;transform:none;}
.reveal-clip{clip-path:inset(0 100% 0 0);transition:clip-path 1.1s cubic-bezier(.76,0,.24,1);}
.reveal-clip.in{clip-path:inset(0 0 0 0);}
@media (prefers-reduced-motion:reduce){.reveal,.reveal-clip{opacity:1;transform:none;clip-path:none;transition:none;}}

/* fixed atmosphere layers */
.fx-aurora{position:fixed;inset:-20%;z-index:0;pointer-events:none;opacity:calc(.9*var(--glow));
  background:
    radial-gradient(38% 44% at 18% 22%, ${A(22)}, transparent 60%),
    radial-gradient(34% 40% at 82% 14%, ${A(14)}, transparent 60%),
    radial-gradient(46% 50% at 70% 88%, ${A(16)}, transparent 62%),
    radial-gradient(40% 44% at 26% 82%, ${A(10)}, transparent 60%);
  filter:blur(30px);animation:aurora 22s ease-in-out infinite alternate;}
@keyframes aurora{0%{transform:translate3d(-2%,-1%,0) scale(1.02) rotate(0deg);}
  50%{transform:translate3d(3%,2%,0) scale(1.08) rotate(2deg);}
  100%{transform:translate3d(-1%,3%,0) scale(1.04) rotate(-1deg);}}
.fx-spot{position:fixed;inset:0;z-index:1;pointer-events:none;mix-blend-mode:screen;
  background:radial-gradient(420px 420px at var(--mx) var(--my), ${A(12)}, transparent 70%);
  opacity:calc(.9*var(--glow));transition:background .08s linear;}
.atmos{position:fixed;inset:0;pointer-events:none;z-index:60;mix-blend-mode:overlay;
  opacity:calc(.5 * var(--grain));
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");}
.scan{position:fixed;inset:0;pointer-events:none;z-index:61;opacity:calc(.4 * var(--scan));
  background:repeating-linear-gradient(to bottom,transparent 0 2px, rgba(0,0,0,.5) 2px 3px);}
.scan-on{opacity:.18!important;}
.fx-vignette{position:fixed;inset:0;pointer-events:none;z-index:59;
  background:radial-gradient(ellipse 120% 80% at 50% 40%, transparent 55%, rgba(0,0,0,.55) 100%);}

/* scroll progress */
.prog{position:fixed;top:0;left:0;height:2px;z-index:300;background:linear-gradient(90deg,${A(50)},var(--accent));
  box-shadow:0 0 14px var(--accent);transform-origin:0 50%;}

/* media card */
.mcard{position:relative;overflow:hidden;border-radius:18px;border:1px solid var(--line);background:var(--panel);
  text-decoration:none;display:block;transition:border-color .3s,transform .35s cubic-bezier(.2,.7,.3,1),box-shadow .35s;}
.mcard:hover{border-color:${A(55)};transform:translateY(-6px);box-shadow:0 30px 70px rgba(0,0,0,.6),0 0 0 1px ${A(30)};}
.mcard .mc-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  transition:transform .8s cubic-bezier(.2,.7,.3,1),opacity .4s;}
.mcard:hover .mc-img{transform:scale(var(--zoom));}
.mc-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05) 0%,rgba(0,0,0,.35) 45%,rgba(0,0,0,.92) 100%);}

/* animated gradient border */
.glowborder{position:relative;}
.glowborder::before{content:'';position:absolute;inset:-1px;border-radius:inherit;padding:1px;
  background:conic-gradient(from var(--ang,0deg), transparent 0 55%, ${A(80)} 75%, transparent 90%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .3s;animation:spinang 4s linear infinite;}
.glowborder:hover::before{opacity:1;}
@keyframes spinang{to{--ang:360deg;}}
@property --ang{syntax:'<angle>';initial-value:0deg;inherits:false;}

/* marquee */
.mq{display:flex;overflow:hidden;user-select:none;}
.mq-track{display:flex;flex-shrink:0;gap:0;align-items:center;animation:mq var(--marquee) linear infinite;}
.mq:hover .mq-track{animation-play-state:paused;}
@keyframes mq{to{transform:translateX(-50%);}}

@keyframes scanline{0%{transform:translateY(-100vh);}100%{transform:translateY(220vh);}}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
@keyframes pulse-ring{0%{transform:scale(1);opacity:.6;}100%{transform:scale(2.2);opacity:0;}}
@keyframes floaty{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
@keyframes gridmove{to{background-position:88px 88px;}}

.linkline{position:relative;text-decoration:none;color:var(--mut);transition:color .2s;}
.linkline::after{content:'';position:absolute;left:0;bottom:-3px;width:0;height:1px;background:var(--accent);transition:width .3s;}
.linkline:hover{color:var(--ink);}
.linkline:hover::after{width:100%;}

@media(max-width:640px){.wrap,.wrap-wide{padding:0 20px;}.fx-spot{display:none;}}
@media(hover:none){.fx-spot{display:none;}}
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

/* ── Cursor spotlight tracker (sets CSS vars) ── */
function CursorFX() {
  useEffect(() => {
    let raf = 0,
      x = innerWidth / 2,
      y = innerHeight / 2;
    const onMove = e => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mx', x + 'px');
        document.documentElement.style.setProperty('--my', y + 'px');
        raf = 0;
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "fx-spot"
  });
}

/* ── Particle network canvas (tech mesh) ── */
function ParticleField({
  density = 0.00009,
  style = {}
}) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let w,
      h,
      pts = [],
      raf,
      mouse = {
        x: -999,
        y: -999
      };
    const accent = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#39ff6e';
    let col = accent();
    const resize = () => {
      const r = cv.getBoundingClientRect();
      w = cv.width = r.width * devicePixelRatio;
      h = cv.height = r.height * devicePixelRatio;
      const n = Math.min(120, Math.max(28, Math.floor(r.width * r.height * density)));
      pts = Array.from({
        length: n
      }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - .5) * .25 * devicePixelRatio,
        vy: (Math.random() - .5) * .25 * devicePixelRatio
      }));
      col = accent();
    };
    const hex = h2 => {
      const m = h2.replace('#', '');
      const b = m.length === 3 ? m.split('').map(c => c + c).join('') : m;
      return [parseInt(b.slice(0, 2), 16), parseInt(b.slice(2, 4), 16), parseInt(b.slice(4, 6), 16)];
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const [r, g, b] = hex(col.startsWith('#') ? col : '#39ff6e');
      const mx = mouse.x * devicePixelRatio,
        my = mouse.y * devicePixelRatio;
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      const max = 130 * devicePixelRatio;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x,
            dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < max) {
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - d / max) * .16})`;
            ctx.lineWidth = devicePixelRatio;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        const dmx = pts[i].x - mx,
          dmy = pts[i].y - my,
          dm = Math.hypot(dmx, dmy);
        if (dm < 180 * devicePixelRatio) {
          ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - dm / (180 * devicePixelRatio)) * .5})`;
          ctx.lineWidth = devicePixelRatio;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(${r},${g},${b},.7)`;
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, 1.4 * devicePixelRatio, 0, 7);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    const onMove = e => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, [density]);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      display: 'block',
      ...style
    }
  });
}

/* ── Scramble / decode text ── */
function Scramble({
  text,
  className = '',
  style = {},
  speed = 28,
  delay = 0
}) {
  const [out, setOut] = useState(text);
  const ref = useRef(null);
  useEffect(() => {
    const chars = '!<>-_\\/[]{}=+*^?#01';
    let frame = 0,
      raf,
      started = false;
    const run = () => {
      const total = text.length;
      const reveal = Math.floor(frame / 1.6);
      let s = '';
      for (let i = 0; i < total; i++) {
        if (text[i] === ' ' || text[i] === '\n') {
          s += text[i];
          continue;
        }
        s += i < reveal ? text[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      setOut(s);
      frame++;
      if (reveal <= total) raf = setTimeout(run, speed);else setOut(text);
    };
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting && !started) {
          started = true;
          setTimeout(run, delay);
          io.disconnect();
        }
      });
    }, {
      threshold: .4
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      clearTimeout(raf);
      io.disconnect();
    };
  }, [text]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: className,
    style: style
  }, out);
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
    let raf,
      start,
      done = false;
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
    if (ref.current) io.observe(ref.current);
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

/* ── Magnetic button wrapper ── */
function Magnetic({
  children,
  strength = 0.35,
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

/* ── Tilt 3D card ── */
function Tilt({
  children,
  max = 8,
  className = '',
  style = {}
}) {
  const ref = useRef(null);
  const onMove = e => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5,
      py = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onMouseMove: onMove,
    onMouseLeave: reset,
    className: className,
    style: {
      transition: 'transform .4s cubic-bezier(.2,.7,.3,1)',
      transformStyle: 'preserve-3d',
      ...style
    }
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
  sep = '✦',
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
      fontWeight: big ? 'var(--dweight)' : 400,
      textTransform: big ? 'var(--case)' : 'uppercase',
      letterSpacing: big ? 'var(--dtrack)' : '.14em',
      fontSize: big ? 'clamp(28px,4vw,58px)' : 12.5,
      color: big ? 'var(--ink)' : 'var(--mut)'
    }
  }, it), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      fontSize: big ? 22 : 11,
      opacity: .8
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
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      background: A(11),
      border: `1px solid ${A(28)}`,
      borderRadius: 999,
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
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--accent)',
      boxShadow: `0 0 12px var(--accent)`
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, children));
}
function OntecLogo({
  height = 30
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: height,
      height,
      background: 'var(--accent)',
      borderRadius: Math.round(height * 0.22),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxShadow: `0 0 22px ${A(45)}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontWeight: 700,
      fontSize: Math.round(height * 0.38),
      color: 'var(--accent-ink)',
      lineHeight: 1
    }
  }, "ON")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--disp)',
      fontWeight: 800,
      fontSize: Math.round(height * 0.62),
      color: 'var(--ink)',
      letterSpacing: '-0.03em',
      textTransform: 'uppercase'
    }
  }, "Ontec"));
}
const NAV_ITEMS = [{
  label: 'Empresa',
  href: 'empresa.html',
  children: [{
    label: 'Partners',
    href: 'empresa.html#partners'
  }]
}, {
  label: 'Solucions',
  href: 'solucions.html',
  children: [{
    label: 'IT Security',
    href: 'solucions.html#it-security'
  }, {
    label: 'Comunicacions',
    href: 'solucions.html#comunicacions'
  }, {
    label: 'Automatització',
    href: 'solucions.html#automatitzacio'
  }, {
    label: 'Audiovisuals',
    href: 'solucions.html#audiovisuals'
  }]
}, {
  label: 'Serveis',
  href: 'serveis.html',
  children: [{
    label: 'Ingenierías',
    href: 'serveis.html#ingenieries'
  }, {
    label: 'Arquitectures',
    href: 'serveis.html#arquitectures'
  }, {
    label: 'Instal·ladors',
    href: 'serveis.html#installadors'
  }, {
    label: "Disseny d'Interiors",
    href: 'serveis.html#disseny'
  }]
}, {
  label: 'Blog',
  href: 'blog.html'
}, {
  label: 'Contacta',
  href: 'contacta.html'
}];
function Nav({
  activePage = ''
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const [drop, setDrop] = useState(null);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const linkBase = {
    display: 'block',
    padding: '9px 14px',
    fontFamily: 'var(--mono)',
    fontSize: 11.5,
    letterSpacing: '.12em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    borderRadius: 999,
    transition: 'color .15s, background .15s'
  };
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 200,
      transition: 'all .35s',
      background: scrolled || mob ? 'rgba(0,0,0,.72)' : 'transparent',
      borderBottom: `1px solid ${scrolled || mob ? 'var(--line)' : 'transparent'}`,
      backdropFilter: scrolled || mob ? 'blur(20px) saturate(150%)' : 'none',
      WebkitBackdropFilter: scrolled || mob ? 'blur(20px) saturate(150%)' : 'none'
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
    key: item.label,
    style: {
      position: 'relative'
    },
    onMouseEnter: () => item.children && setDrop(item.label),
    onMouseLeave: () => setDrop(null)
  }, /*#__PURE__*/React.createElement("a", {
    href: item.href,
    style: {
      ...linkBase,
      color: activePage === item.label ? 'var(--accent)' : 'var(--mut)'
    },
    onMouseEnter: e => {
      if (activePage !== item.label) e.currentTarget.style.color = 'var(--ink)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = activePage === item.label ? 'var(--accent)' : 'var(--mut)';
    }
  }, item.label), item.children && drop === item.label && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      minWidth: 220,
      background: 'rgba(8,8,9,.96)',
      border: '1px solid var(--line)',
      borderRadius: 14,
      padding: '8px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 24px 60px rgba(0,0,0,.7)'
    }
  }, item.children.map(ch => /*#__PURE__*/React.createElement("a", {
    key: ch.label,
    href: ch.href,
    style: {
      display: 'block',
      padding: '10px 14px',
      color: 'var(--mut)',
      fontSize: 13,
      textDecoration: 'none',
      borderRadius: 9,
      transition: 'color .12s, background .12s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = 'var(--accent)';
      e.currentTarget.style.background = A(10);
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'var(--mut)';
      e.currentTarget.style.background = 'transparent';
    }
  }, ch.label)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      flexShrink: 0
    },
    className: "nav-desk"
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:+37688559",
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11.5,
      color: 'var(--faint)',
      textDecoration: 'none',
      letterSpacing: '.04em'
    }
  }, "+376 88 55 99"), /*#__PURE__*/React.createElement(Magnetic, null, /*#__PURE__*/React.createElement("a", {
    href: "contacta.html",
    className: "btn btn-primary",
    style: {
      padding: '11px 20px'
    }
  }, "Contacta"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMob(!mob),
    className: "nav-mob",
    style: {
      display: 'none',
      marginLeft: 'auto',
      background: 'transparent',
      border: 'none',
      color: 'var(--ink)',
      cursor: 'pointer'
    },
    "aria-label": "Menu",
    "aria-expanded": mob
  }, mob ? /*#__PURE__*/React.createElement(Icons.X, null) : /*#__PURE__*/React.createElement(Icons.Menu, null))), mob && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,0,0,.96)',
      borderTop: '1px solid var(--line)',
      padding: '14px 40px 28px'
    }
  }, NAV_ITEMS.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.label,
    href: item.href,
    className: "disp",
    style: {
      display: 'block',
      padding: '14px 0',
      fontSize: 26,
      textDecoration: 'none',
      borderBottom: '1px solid var(--line-soft)'
    }
  }, item.label)), /*#__PURE__*/React.createElement("a", {
    href: "contacta.html",
    className: "btn btn-primary",
    style: {
      marginTop: 20,
      width: '100%',
      justifyContent: 'center'
    }
  }, "Contacta ara")), /*#__PURE__*/React.createElement("style", null, `@media(max-width:920px){.nav-desk{display:none!important;}.nav-mob{display:block!important;}}`));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      position: 'relative',
      zIndex: 2,
      borderTop: '1px solid var(--line)',
      background: 'rgba(0,0,0,.6)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--line-soft)',
      padding: '26px 0'
    }
  }, /*#__PURE__*/React.createElement(Marquee, {
    big: true,
    items: ['Sistemes tecnològics', 'IT Security', 'Comunicacions', 'Automatització', 'Audiovisuals', 'Andorra']
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(OntecLogo, {
    height: 34
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 22,
      fontSize: 15,
      color: 'var(--mut)',
      lineHeight: 1.7,
      maxWidth: 320
    }
  }, "Distribució i integració de sistemes tecnològics avançats. Andorra, des de 2016."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Magnetic, null, /*#__PURE__*/React.createElement("a", {
    href: "contacta.html",
    className: "btn btn-primary",
    style: {
      padding: '12px 22px'
    }
  }, "Comença un projecte ", /*#__PURE__*/React.createElement(Icons.UpRight, {
    s: 14
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "kicker",
    style: {
      color: 'var(--faint)',
      marginBottom: 18
    }
  }, "Navegació"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, NAV_ITEMS.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href,
    className: "linkline",
    style: {
      fontSize: 15
    }
  }, l.label)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "kicker",
    style: {
      color: 'var(--faint)',
      marginBottom: 18
    }
  }, "Contacte"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:+37688559",
    className: "linkline"
  }, "+376 88 55 99"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@ontecandorra.com",
    className: "linkline"
  }, "info@ontecandorra.com"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--mut)'
    }
  }, "C/ de la Vena 3, Baixos", /*#__PURE__*/React.createElement("br", null), "Encamp, Andorra")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      paddingTop: 26,
      borderTop: '1px solid var(--line-soft)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--faint)',
      letterSpacing: '.05em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "© 2026 ON TECNOLOGIES S.L. — Tots els drets reservats"), /*#__PURE__*/React.createElement("span", null, "ANDORRA · 42.5°N 1.5°E"))), /*#__PURE__*/React.createElement("style", null, `@media(max-width:820px){.ft-grid{grid-template-columns:1fr!important;gap:36px!important;}}`));
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
      el.style.transform = `scale(1.18) translateY(${off * -34}px)`;
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
      background: '#070707',
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
      background: 'linear-gradient(135deg,#0c1810 0%,#060a07 50%,#0b0f14 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: `linear-gradient(${A(12)} 1px,transparent 1px),linear-gradient(90deg,${A(12)} 1px,transparent 1px)`,
      backgroundSize: '44px 44px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(circle at 50% 40%, ${A(14)}, transparent 60%)`
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
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 'min(82vh,760px)',
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden'
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
      background: 'linear-gradient(180deg,rgba(0,0,0,.7) 0%,rgba(0,0,0,.4) 38%,rgba(0,0,0,.78) 78%,#000 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg,#000 0%,rgba(0,0,0,.45) 45%,transparent 85%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: `linear-gradient(${A(7)} 1px,transparent 1px),linear-gradient(90deg,${A(7)} 1px,transparent 1px)`,
      backgroundSize: '88px 88px',
      maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%,#000,transparent)'
    }
  }), /*#__PURE__*/React.createElement(ParticleField, {
    style: {
      opacity: .6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 1,
      background: `linear-gradient(90deg,transparent,${A(45)},transparent)`,
      animation: 'scanline 8s linear infinite'
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
    className: "reveal in eyebrow",
    style: {
      marginBottom: 24,
      justifyContent: align === 'center' ? 'center' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--accent)',
      boxShadow: '0 0 10px var(--accent)'
    }
  }), kicker), /*#__PURE__*/React.createElement("h1", {
    className: "disp glow-text",
    style: {
      fontSize: 'clamp(44px,7vw,116px)',
      maxWidth: 1160,
      margin: align === 'center' ? '0 auto' : 0
    }
  }, /*#__PURE__*/React.createElement(Scramble, {
    text: title
  })), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 26,
      fontSize: 'clamp(16px,1.4vw,19px)',
      color: 'var(--mut)',
      lineHeight: 1.7,
      maxWidth: 600,
      margin: align === 'center' ? '26px auto 0' : '26px 0 0'
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
  }, /*#__PURE__*/React.createElement("style", null, GLOBAL_CSS), /*#__PURE__*/React.createElement("div", {
    className: "fx-aurora"
  }), /*#__PURE__*/React.createElement(CursorFX, null), /*#__PURE__*/React.createElement("div", {
    className: "fx-vignette"
  }), /*#__PURE__*/React.createElement("div", {
    className: "atmos"
  }), /*#__PURE__*/React.createElement("div", {
    className: "scan"
  }), /*#__PURE__*/React.createElement(ScrollProgress, null), /*#__PURE__*/React.createElement(Nav, {
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
  Tilt
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
const TWEAK_DEFAULTS = {
  "mood": "acid",
  "voice": "editorial",
  "intensity": "cinematic"
};
const PARTNERS = [{
  name: 'Fortinet',
  cat: 'Ciberseguretat',
  desc: "Lider mundial en seguretat de xarxa de nova generacio."
}, {
  name: 'Cisco',
  cat: 'Xarxa & Video',
  desc: "Infraestructura de xarxa i solucions de col laboracio."
}, {
  name: 'Ubiquiti',
  cat: 'Xarxa WiFi',
  desc: "Xarxes WiFi professionals per a entorns exigents."
}, {
  name: 'KNX',
  cat: 'Domotica',
  desc: "Estandard internacional per a automatitzacio d'edificis."
}, {
  name: 'Crestron',
  cat: 'Control AV',
  desc: "Sistemes de control AV per a sales executives."
}, {
  name: 'HPE Aruba',
  cat: 'Xarxa',
  desc: "Solucions d'xarxa empresarial d'alta disponibilitat."
}, {
  name: 'Palo Alto',
  cat: 'Seguretat',
  desc: "Plataforma de ciberseguretat Zero Trust."
}, {
  name: 'Lutron',
  cat: 'Llum & Persianes',
  desc: "Control de llum i persianes de precisio."
}, {
  name: 'Samsung',
  cat: 'Pantalles',
  desc: "Pantalles professionals per a entorns comercials."
}, {
  name: 'Sony',
  cat: 'AV Pro',
  desc: "Cameras PTZ i solucions audiovisuals professionals."
}, {
  name: 'QSC',
  cat: 'Audio',
  desc: "Processament d'audio professional per a grans espais."
}, {
  name: 'Shure',
  cat: 'Microfonos',
  desc: "Microfonos i sistemes de conferencia de referencia."
}];
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute('data-mood', t.mood);
    r.setAttribute('data-voice', t.voice);
    r.setAttribute('data-intensity', t.intensity);
  }, [t.mood, t.voice, t.intensity]);
  return /*#__PURE__*/React.createElement(PageShell, {
    activePage: "Empresa"
  }, /*#__PURE__*/React.createElement(PageHero, {
    kicker: "Empresa · Des de 2016",
    title: "Tecnologia amb proposit",
    sub: "Som distribuidors i integradors especialitzats en sistemes tecnologics avancats per a empreses i professionals a Andorra.",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1800&q=80&auto=format&fit=crop"
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '100px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 80,
      alignItems: 'center'
    },
    className: "about-grid"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SectionLabel, null, "Qui som"), /*#__PURE__*/React.createElement("h2", {
    className: "disp",
    style: {
      fontSize: 'clamp(36px,5vw,72px)',
      marginBottom: 28
    }
  }, "8 anys integrant tecnologia a Andorra"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: 'var(--mut)',
      lineHeight: 1.8,
      marginBottom: 20
    }
  }, "Des de 2016, Ontec ha estat el soci tecnologic de referencia per a empreses, arquitectes, ingenieries i dissenyadors d'interiors que necessiten solucions avancades d'IT Security, comunicacions, automatitzacio i audiovisuals."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: 'var(--mut)',
      lineHeight: 1.8,
      marginBottom: 40
    }
  }, "L'equip d'Ontec combina experiencia tecnica profunda amb una visio clara: la tecnologia ha d'integrar-se de forma invisible i fiable en cada projecte. Per aixo treballem amb els millors fabricants del mon i oferim suport local rapid."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, [['200+', 'Projectes lliurats'], ['8+', 'Anys d\'experiencia'], ['12', 'Partners certificats'], ['99.9%', 'Uptime garantit']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      background: 'var(--panel)',
      border: '1px solid var(--line)',
      borderRadius: 14,
      padding: '22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "disp",
    style: {
      fontSize: 'clamp(28px,4vw,44px)',
      color: 'var(--accent)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 10.5,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--mut)',
      marginTop: 6
    }
  }, l))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 20,
      overflow: 'hidden',
      border: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement(Cine, {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop",
    alt: "Equip Ontec",
    style: {
      height: 500
    }
  }))))), /*#__PURE__*/React.createElement("style", null, `.about-grid{@media(max-width:860px){grid-template-columns:1fr!important;gap:48px!important;}}`)), /*#__PURE__*/React.createElement("section", {
    id: "partners",
    style: {
      padding: '80px 0 120px',
      borderTop: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement(Reveal, {
    style: {
      marginBottom: 56,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Partners"), /*#__PURE__*/React.createElement("h2", {
    className: "disp",
    style: {
      fontSize: 'clamp(36px,5vw,80px)'
    }
  }, "Els millors fabricants", /*#__PURE__*/React.createElement("br", null), "del mon")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16
    },
    className: "partners-grid"
  }, PARTNERS.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: p.name,
    delay: i * 40
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--panel)',
      border: '1px solid var(--line)',
      borderRadius: 16,
      padding: '28px',
      transition: 'border-color .2s,transform .3s cubic-bezier(.2,.7,.3,1)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = A(35);
      e.currentTarget.style.transform = 'translateY(-4px)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = 'var(--line)';
      e.currentTarget.style.transform = 'none';
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--disp)',
      fontWeight: 800,
      fontSize: 22,
      color: 'var(--ink)',
      letterSpacing: '-0.02em'
    }
  }, p.name), /*#__PURE__*/React.createElement(Tag, null, p.cat)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--mut)',
      lineHeight: 1.6
    }
  }, p.desc)))))), /*#__PURE__*/React.createElement("style", null, `@media(max-width:860px){.partners-grid{grid-template-columns:1fr!important;}} @media(max-width:1200px){.partners-grid{grid-template-columns:repeat(2,1fr)!important;}}`)), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Mood"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Mood",
    value: t.mood,
    options: [{
      value: 'acid',
      label: 'Acid'
    }, {
      value: 'ice',
      label: 'Ice'
    }, {
      value: 'flare',
      label: 'Flare'
    }, {
      value: 'mono',
      label: 'Mono'
    }],
    onChange: v => setTweak('mood', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Voice"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Voice",
    value: t.voice,
    options: [{
      value: 'editorial',
      label: 'Editorial'
    }, {
      value: 'modern',
      label: 'Modern'
    }, {
      value: 'soft',
      label: 'Soft'
    }],
    onChange: v => setTweak('voice', v)
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));