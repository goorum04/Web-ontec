// ════════════════════════════════════════════════════════════════════════════
// Ontec — shared design system (cinematic / high-impact)
// Tokens + global motion (aurora, particles, cursor spotlight, scroll progress)
// + Reveal, Scramble, CountUp, MagneticButton, TiltCard, Marquee, Icons,
//   Tag, SectionLabel, Nav, Footer, Cine, PageHero, PageShell.
// ════════════════════════════════════════════════════════════════════════════

const { useState, useEffect, useRef } = React;

const A = (p) => `color-mix(in srgb, var(--accent) ${p}%, transparent)`;

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
    window.addEventListener('scroll', fn, { passive: true }); fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div ref={ref} className="prog" style={{ width: '100%', transform: 'scaleX(0)' }} />;
}

/* ── Cursor spotlight tracker (sets CSS vars) ── */
function CursorFX() {
  useEffect(() => {
    let raf = 0, x = innerWidth/2, y = innerHeight/2;
    const onMove = (e) => { x = e.clientX; y = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mx', x + 'px');
        document.documentElement.style.setProperty('--my', y + 'px');
        raf = 0;
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return <div className="fx-spot" />;
}

/* ── Particle network canvas (tech mesh) ── */
function ParticleField({ density = 0.00009, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    let w, h, pts = [], raf, mouse = { x: -999, y: -999 };
    const accent = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#39ff6e';
    let col = accent();
    const resize = () => {
      const r = cv.getBoundingClientRect();
      w = cv.width = r.width * devicePixelRatio; h = cv.height = r.height * devicePixelRatio;
      const n = Math.min(120, Math.max(28, Math.floor(r.width * r.height * density)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .25 * devicePixelRatio, vy: (Math.random() - .5) * .25 * devicePixelRatio,
      }));
      col = accent();
    };
    const hex = (h2) => { const m = h2.replace('#',''); const b = m.length===3 ? m.split('').map(c=>c+c).join('') : m;
      return [parseInt(b.slice(0,2),16),parseInt(b.slice(2,4),16),parseInt(b.slice(4,6),16)]; };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const [r,g,b] = hex(col.startsWith('#') ? col : '#39ff6e');
      const mx = mouse.x * devicePixelRatio, my = mouse.y * devicePixelRatio;
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      const max = 130 * devicePixelRatio;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < max) { ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - d/max) * .16})`;
            ctx.lineWidth = devicePixelRatio; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
        }
        const dmx = pts[i].x - mx, dmy = pts[i].y - my, dm = Math.hypot(dmx, dmy);
        if (dm < 180 * devicePixelRatio) { ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - dm/(180*devicePixelRatio)) * .5})`;
          ctx.lineWidth = devicePixelRatio; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mx, my); ctx.stroke(); }
        ctx.fillStyle = `rgba(${r},${g},${b},.7)`; ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, 1.4 * devicePixelRatio, 0, 7); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    const onMove = (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    resize(); draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', onMove); };
  }, [density]);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', ...style }} />;
}

/* ── Scramble / decode text ── */
function Scramble({ text, className = '', style = {}, speed = 28, delay = 0 }) {
  const [out, setOut] = useState(text);
  const ref = useRef(null);
  useEffect(() => {
    const chars = '!<>-_\\/[]{}=+*^?#01';
    let frame = 0, raf, started = false;
    const run = () => {
      const total = text.length;
      const reveal = Math.floor(frame / 1.6);
      let s = '';
      for (let i = 0; i < total; i++) {
        if (text[i] === ' ' || text[i] === '\n') { s += text[i]; continue; }
        s += i < reveal ? text[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      setOut(s); frame++;
      if (reveal <= total) raf = setTimeout(run, speed); else setOut(text);
    };
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting && !started) { started = true; setTimeout(run, delay); io.disconnect(); } });
    }, { threshold: .4 });
    if (ref.current) io.observe(ref.current);
    return () => { clearTimeout(raf); io.disconnect(); };
  }, [text]);
  return <span ref={ref} className={className} style={style}>{out}</span>;
}

/* ── CountUp ── */
function CountUp({ to, suffix = '', prefix = '', dur = 1600, decimals = 0, className = '', style = {} }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let raf, start, done = false;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting && !done) { done = true;
          const step = (t) => { if (!start) start = t; const p = Math.min((t - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3); setVal(to * eased); if (p < 1) raf = requestAnimationFrame(step); };
          raf = requestAnimationFrame(step); io.disconnect();
        }
      });
    }, { threshold: .5 });
    if (ref.current) io.observe(ref.current);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [to]);
  return <span ref={ref} className={className} style={style}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

/* ── Magnetic button wrapper ── */
function Magnetic({ children, strength = 0.35, style = {} }) {
  const ref = useRef(null);
  const onMove = (e) => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width/2)) * strength; const y = (e.clientY - (r.top + r.height/2)) * strength;
    el.style.transform = `translate(${x}px,${y}px)`; };
  const reset = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)'; };
  return <span ref={ref} onMouseMove={onMove} onMouseLeave={reset}
    style={{ display: 'inline-flex', transition: 'transform .35s cubic-bezier(.2,.7,.3,1)', ...style }}>{children}</span>;
}

/* ── Tilt 3D card ── */
function Tilt({ children, max = 8, className = '', style = {} }) {
  const ref = useRef(null);
  const onMove = (e) => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `perspective(900px) rotateY(${px*max}deg) rotateX(${-py*max}deg)`; };
  const reset = () => { if (ref.current) ref.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0)'; };
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={className}
    style={{ transition: 'transform .4s cubic-bezier(.2,.7,.3,1)', transformStyle: 'preserve-3d', ...style }}>{children}</div>;
}

/* ── Reveal ── */
function Reveal({ children, delay = 0, as = 'div', clip = false, style = {}, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag2 = as;
  return <Tag2 ref={ref} className={`${clip ? 'reveal-clip' : 'reveal'} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>{children}</Tag2>;
}

/* ── Marquee ── */
function Marquee({ items, sep = '✦', big = false }) {
  const row = (k) => (
    <div className="mq-track" key={k} aria-hidden={k === 1}>
      {items.map((it, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: big ? 26 : 18, padding: big ? '0 26px' : '0 18px' }}>
          <span style={{ fontFamily: big ? 'var(--disp)' : 'var(--mono)', fontWeight: big ? 'var(--dweight)' : 400,
            textTransform: big ? 'var(--case)' : 'uppercase', letterSpacing: big ? 'var(--dtrack)' : '.14em',
            fontSize: big ? 'clamp(28px,4vw,58px)' : 12.5, color: big ? 'var(--ink)' : 'var(--mut)' }}>{it}</span>
          <span style={{ color: 'var(--accent)', fontSize: big ? 22 : 11, opacity: .8 }}>{sep}</span>
        </span>
      ))}
    </div>
  );
  return <div className="mq">{row(0)}{row(1)}</div>;
}

const Icons = {
  Arrow:  ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  UpRight:({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>,
  Mail:   () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>,
  Phone:  () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.38 2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Pin:    () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Check:  () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Plus:   () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Shield: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Wifi:   () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>,
  Cpu:    () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  Screen: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Menu:   () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="17" x2="21" y2="17"/></svg>,
  X:      () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Blog:   () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Video:  () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  Lock:   () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Star:   () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Building:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 22V12h6v10"/><path d="M3 9h18"/></svg>,
};

function Tag({ children }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--mono)', fontSize: 10.5,
      letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', background: A(11),
      border: `1px solid ${A(28)}`, borderRadius: 999, padding: '5px 12px' }}>
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: `0 0 12px var(--accent)` }} />
      <span className="kicker">{children}</span>
    </div>
  );
}

function OntecLogo({ height = 30 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <div style={{ width: height, height, background: 'var(--accent)', borderRadius: Math.round(height * 0.22),
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 22px ${A(45)}` }}>
        <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: Math.round(height * 0.38), color: 'var(--accent-ink)', lineHeight: 1 }}>ON</span>
      </div>
      <span style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: Math.round(height * 0.62), color: 'var(--ink)', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>Ontec</span>
    </div>
  );
}

const NAV_ITEMS = [
  { label: 'Empresa',   href: 'empresa.html',   children: [{ label: 'Partners', href: 'empresa.html#partners' }] },
  { label: 'Solucions', href: 'solucions.html', children: [
    { label: 'IT Security', href: 'solucions.html#it-security' },
    { label: 'Comunicacions', href: 'solucions.html#comunicacions' },
    { label: 'Automatització', href: 'solucions.html#automatitzacio' },
    { label: 'Audiovisuals', href: 'solucions.html#audiovisuals' },
  ]},
  { label: 'Serveis', href: 'serveis.html', children: [
    { label: 'Ingenierías', href: 'serveis.html#ingenieries' },
    { label: 'Arquitectures', href: 'serveis.html#arquitectures' },
    { label: 'Instal·ladors', href: 'serveis.html#installadors' },
    { label: "Disseny d'Interiors", href: 'serveis.html#disseny' },
  ]},
  { label: 'Blog', href: 'blog.html' },
  { label: 'Contacta', href: 'contacta.html' },
];

function Nav({ activePage = '' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const [drop, setDrop] = useState(null);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn); fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const linkBase = { display: 'block', padding: '9px 14px', fontFamily: 'var(--mono)', fontSize: 11.5,
    letterSpacing: '.12em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 999, transition: 'color .15s, background .15s' };
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, transition: 'all .35s',
      background: scrolled || mob ? 'rgba(0,0,0,.72)' : 'transparent',
      borderBottom: `1px solid ${scrolled || mob ? 'var(--line)' : 'transparent'}`,
      backdropFilter: scrolled || mob ? 'blur(20px) saturate(150%)' : 'none',
      WebkitBackdropFilter: scrolled || mob ? 'blur(20px) saturate(150%)' : 'none' }}>
      <div className="wrap" style={{ height: 74, display: 'flex', alignItems: 'center' }}>
        <a href="index.html" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginRight: 40, flexShrink: 0 }}>
          <OntecLogo height={30} />
        </a>
        <div style={{ display: 'flex', gap: 2, flex: 1 }} className="nav-desk">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} style={{ position: 'relative' }}
              onMouseEnter={() => item.children && setDrop(item.label)}
              onMouseLeave={() => setDrop(null)}>
              <a href={item.href} style={{ ...linkBase, color: activePage === item.label ? 'var(--accent)' : 'var(--mut)' }}
                onMouseEnter={(e) => { if (activePage !== item.label) e.currentTarget.style.color = 'var(--ink)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = activePage === item.label ? 'var(--accent)' : 'var(--mut)'; }}>
                {item.label}
              </a>
              {item.children && drop === item.label && (
                <div style={{ position: 'absolute', top: '100%', left: 0, minWidth: 220, background: 'rgba(8,8,9,.96)',
                  border: '1px solid var(--line)', borderRadius: 14, padding: '8px', backdropFilter: 'blur(20px)',
                  boxShadow: '0 24px 60px rgba(0,0,0,.7)' }}>
                  {item.children.map((ch) => (
                    <a key={ch.label} href={ch.href} style={{ display: 'block', padding: '10px 14px', color: 'var(--mut)',
                      fontSize: 13, textDecoration: 'none', borderRadius: 9, transition: 'color .12s, background .12s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = A(10); }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--mut)'; e.currentTarget.style.background = 'transparent'; }}>
                      {ch.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexShrink: 0 }} className="nav-desk">
          <a href="tel:+37688559" style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--faint)', textDecoration: 'none', letterSpacing: '.04em' }}>+376 88 55 99</a>
          <Magnetic><a href="contacta.html" className="btn btn-primary" style={{ padding: '11px 20px' }}>Contacta</a></Magnetic>
        </div>
        <button onClick={() => setMob(!mob)} className="nav-mob"
          style={{ display: 'none', marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--ink)', cursor: 'pointer' }}
          aria-label="Menu" aria-expanded={mob}>
          {mob ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>
      {mob && (
        <div style={{ background: 'rgba(0,0,0,.96)', borderTop: '1px solid var(--line)', padding: '14px 40px 28px' }}>
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="disp" style={{ display: 'block', padding: '14px 0', fontSize: 26,
              textDecoration: 'none', borderBottom: '1px solid var(--line-soft)' }}>{item.label}</a>
          ))}
          <a href="contacta.html" className="btn btn-primary" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>Contacta ara</a>
        </div>
      )}
      <style>{`@media(max-width:920px){.nav-desk{display:none!important;}.nav-mob{display:block!important;}}`}</style>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{ position: 'relative', zIndex: 2, borderTop: '1px solid var(--line)', background: 'rgba(0,0,0,.6)', overflow: 'hidden' }}>
      <div style={{ borderBottom: '1px solid var(--line-soft)', padding: '26px 0' }}>
        <Marquee big items={['Sistemes tecnològics', 'IT Security', 'Comunicacions', 'Automatització', 'Audiovisuals', 'Andorra']} />
      </div>
      <div className="wrap" style={{ padding: '64px 40px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 48, alignItems: 'start' }} className="ft-grid">
          <div>
            <OntecLogo height={34} />
            <p style={{ marginTop: 22, fontSize: 15, color: 'var(--mut)', lineHeight: 1.7, maxWidth: 320 }}>
              Distribució i integració de sistemes tecnològics avançats. Andorra, des de 2016.
            </p>
            <div style={{ marginTop: 26, display: 'flex', gap: 10 }}>
              <Magnetic><a href="contacta.html" className="btn btn-primary" style={{ padding: '12px 22px' }}>Comença un projecte <Icons.UpRight s={14} /></a></Magnetic>
            </div>
          </div>
          <div>
            <div className="kicker" style={{ color: 'var(--faint)', marginBottom: 18 }}>Navegació</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {NAV_ITEMS.map((l) => <a key={l.label} href={l.href} className="linkline" style={{ fontSize: 15 }}>{l.label}</a>)}
            </div>
          </div>
          <div>
            <div className="kicker" style={{ color: 'var(--faint)', marginBottom: 18 }}>Contacte</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15 }}>
              <a href="tel:+37688559" className="linkline">+376 88 55 99</a>
              <a href="mailto:info@ontecandorra.com" className="linkline">info@ontecandorra.com</a>
              <span style={{ color: 'var(--mut)' }}>C/ de la Vena 3, Baixos<br/>Encamp, Andorra</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 56, paddingTop: 26, borderTop: '1px solid var(--line-soft)', display: 'flex',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--faint)', letterSpacing: '.05em' }}>
          <span>© 2026 ON TECNOLOGIES S.L. — Tots els drets reservats</span>
          <span>ANDORRA · 42.5°N 1.5°E</span>
        </div>
      </div>
      <style>{`@media(max-width:820px){.ft-grid{grid-template-columns:1fr!important;gap:36px!important;}}`}</style>
    </footer>
  );
}

function Cine({ src, alt = '', style = {}, shade = false, parallax = false, children }) {
  const [ok, setOk] = useState(!!src);
  const imgRef = useRef(null);
  useEffect(() => {
    if (!parallax) return;
    const el = imgRef.current; if (!el) return;
    const fn = () => { const r = el.getBoundingClientRect(); const off = (r.top + r.height/2 - innerHeight/2) / innerHeight;
      el.style.transform = `scale(1.18) translateY(${off * -34}px)`; };
    window.addEventListener('scroll', fn, { passive: true }); fn();
    return () => window.removeEventListener('scroll', fn);
  }, [parallax, ok]);
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#070707', ...style }}>
      {ok ? (
        <img ref={imgRef} src={src} alt={alt} onError={() => setOk(false)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', willChange: parallax ? 'transform' : 'auto' }} />
      ) : (
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#0c1810 0%,#060a07 50%,#0b0f14 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${A(12)} 1px,transparent 1px),linear-gradient(90deg,${A(12)} 1px,transparent 1px)`, backgroundSize: '44px 44px' }} />
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 40%, ${A(14)}, transparent 60%)` }} />
        </>
      )}
      {shade && <div className="mc-shade" />}
      {children}
    </div>
  );
}

function PageHero({ kicker, title, sub, img, align = 'left' }) {
  return (
    <section style={{ position: 'relative', minHeight: 'min(82vh,760px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
      <Cine src={img} alt="" parallax style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.7) 0%,rgba(0,0,0,.4) 38%,rgba(0,0,0,.78) 78%,#000 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#000 0%,rgba(0,0,0,.45) 45%,transparent 85%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${A(7)} 1px,transparent 1px),linear-gradient(90deg,${A(7)} 1px,transparent 1px)`, backgroundSize: '88px 88px', maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%,#000,transparent)' }} />
      <ParticleField style={{ opacity: .6 }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, background: `linear-gradient(90deg,transparent,${A(45)},transparent)`, animation: 'scanline 8s linear infinite' }} />
      <div className="wrap-wide" style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: 150, paddingBottom: 80, textAlign: align }}>
        <div className="reveal in eyebrow" style={{ marginBottom: 24, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
          {kicker}
        </div>
        <h1 className="disp glow-text" style={{ fontSize: 'clamp(44px,7vw,116px)', maxWidth: 1160, margin: align === 'center' ? '0 auto' : 0 }}>
          <Scramble text={title} />
        </h1>
        {sub && <p style={{ marginTop: 26, fontSize: 'clamp(16px,1.4vw,19px)', color: 'var(--mut)', lineHeight: 1.7, maxWidth: 600, margin: align === 'center' ? '26px auto 0' : '26px 0 0' }}>{sub}</p>}
      </div>
    </section>
  );
}

function PageShell({ activePage, children }) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <style>{GLOBAL_CSS}</style>
      <div className="fx-aurora" /><CursorFX /><div className="fx-vignette" />
      <div className="atmos" /><div className="scan" /><ScrollProgress />
      <Nav activePage={activePage} />
      <main style={{ position: 'relative', zIndex: 2, flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

Object.assign(window, {
  A, GLOBAL_CSS, Reveal, Marquee, Icons, Tag, SectionLabel, OntecLogo,
  Cine, PageHero, Nav, Footer, PageShell, NAV_ITEMS,
  ScrollProgress, CursorFX, ParticleField, Scramble, CountUp, Magnetic, Tilt,
});
