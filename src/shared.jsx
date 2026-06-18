// ════════════════════════════════════════════════════════════════════════════
// Ontec — shared design system (corporate / professional)
// Light, trustworthy palette built on the real logo green. No neon, no
// particles, no scanlines. Moderate motion only: scroll reveals, count-ups,
// soft image zoom and discreet hover states.
// ════════════════════════════════════════════════════════════════════════════

const { useState, useEffect, useRef } = React;

const A = (p) => `color-mix(in srgb, var(--accent) ${p}%, transparent)`;

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
    window.addEventListener('scroll', fn, { passive: true }); fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div ref={ref} className="prog" style={{ width: '100%', transform: 'scaleX(0)' }} />;
}

/* ── Legacy effect components, neutralised (kept for API compatibility) ── */
function CursorFX() { return null; }
function ParticleField() { return null; }
function Scramble({ text, className = '', style = {} }) {
  return <span className={className} style={style}>{text}</span>;
}

/* ── CountUp ── */
function CountUp({ to, suffix = '', prefix = '', dur = 1600, decimals = 0, className = '', style = {} }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let raf, start, done = false;
    if (typeof IntersectionObserver === 'undefined') { setVal(to); return; }
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

/* ── Magnetic button wrapper (subtle) ── */
function Magnetic({ children, strength = 0.18, style = {} }) {
  const ref = useRef(null);
  const onMove = (e) => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width/2)) * strength; const y = (e.clientY - (r.top + r.height/2)) * strength;
    el.style.transform = `translate(${x}px,${y}px)`; };
  const reset = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)'; };
  return <span ref={ref} onMouseMove={onMove} onMouseLeave={reset}
    style={{ display: 'inline-flex', transition: 'transform .35s cubic-bezier(.2,.7,.3,1)', ...style }}>{children}</span>;
}

/* ── Tilt (kept as plain wrapper — no 3D rotation, corporate look) ── */
function Tilt({ children, className = '', style = {} }) {
  return <div className={className} style={style}>{children}</div>;
}

/* ── Reveal ── */
function Reveal({ children, delay = 0, as = 'div', clip = false, style = {}, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { el.classList.add('in'); return; }
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
function Marquee({ items, sep = '·', big = false }) {
  const row = (k) => (
    <div className="mq-track" key={k} aria-hidden={k === 1}>
      {items.map((it, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: big ? 26 : 18, padding: big ? '0 26px' : '0 18px' }}>
          <span style={{ fontFamily: big ? 'var(--disp)' : 'var(--mono)', fontWeight: big ? 700 : 400,
            textTransform: big ? 'none' : 'uppercase', letterSpacing: big ? 'var(--dtrack)' : '.14em',
            fontSize: big ? 'clamp(22px,3vw,40px)' : 12.5, color: big ? 'var(--ink)' : 'var(--mut)' }}>{it}</span>
          <span style={{ color: 'var(--accent)', fontSize: big ? 18 : 11, opacity: .7 }}>{sep}</span>
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
      letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--accent-deep)', background: A(10),
      border: `1px solid ${A(24)}`, borderRadius: 8, padding: '5px 12px' }}>
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
      <span style={{ width: 22, height: 2, background: 'var(--accent)' }} />
      <span className="kicker">{children}</span>
    </div>
  );
}

function OntecLogo({ height = 30, color = 'currentColor' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <img src="assets/ontec-logo.png" alt="Ontec" height={height}
        style={{ height, width: 'auto', display: 'block', flexShrink: 0 }} />
      <span style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: Math.round(height * 0.6),
        color, letterSpacing: '-0.02em' }}>Ontec</span>
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
  const solid = scrolled || mob;             // solid white bar
  const lightText = !solid;                  // over the dark hero → light text
  const textMut = lightText ? 'rgba(255,255,255,.82)' : 'var(--mut)';
  const textInk = lightText ? '#ffffff' : 'var(--ink)';
  const activeCol = lightText ? 'var(--accent-2)' : 'var(--accent-deep)';
  const linkBase = { display: 'block', padding: '9px 13px', fontFamily: 'var(--mono)', fontSize: 11.5,
    letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 8, transition: 'color .15s' };
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, transition: 'all .3s',
      background: solid ? 'rgba(255,255,255,.86)' : 'transparent',
      borderBottom: `1px solid ${solid ? 'var(--line)' : 'transparent'}`,
      backdropFilter: solid ? 'blur(18px) saturate(150%)' : 'none',
      WebkitBackdropFilter: solid ? 'blur(18px) saturate(150%)' : 'none' }}>
      <div className="wrap" style={{ height: 74, display: 'flex', alignItems: 'center' }}>
        <a href="index.html" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: textInk, marginRight: 40, flexShrink: 0 }}>
          <OntecLogo height={30} />
        </a>
        <div style={{ display: 'flex', gap: 2, flex: 1 }} className="nav-desk">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} style={{ position: 'relative' }}
              onMouseEnter={() => item.children && setDrop(item.label)}
              onMouseLeave={() => setDrop(null)}>
              <a href={item.href} style={{ ...linkBase, color: activePage === item.label ? activeCol : textMut }}
                onMouseEnter={(e) => { if (activePage !== item.label) e.currentTarget.style.color = textInk; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = activePage === item.label ? activeCol : textMut; }}>
                {item.label}
              </a>
              {item.children && drop === item.label && (
                <div style={{ position: 'absolute', top: '100%', left: 0, minWidth: 220, background: '#ffffff',
                  border: '1px solid var(--line)', borderRadius: 12, padding: '8px',
                  boxShadow: '0 24px 60px rgba(19,33,27,.16)' }}>
                  {item.children.map((ch) => (
                    <a key={ch.label} href={ch.href} style={{ display: 'block', padding: '10px 14px', color: 'var(--mut)',
                      fontSize: 13, textDecoration: 'none', borderRadius: 8, transition: 'color .12s, background .12s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-deep)'; e.currentTarget.style.background = A(8); }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--mut)'; e.currentTarget.style.background = 'transparent'; }}>
                      {ch.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexShrink: 0 }} className="nav-desk">
          <a href="tel:+37688559" style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: textMut, textDecoration: 'none', letterSpacing: '.04em' }}>+376 88 55 99</a>
          <a href="contacta.html" className="btn btn-primary" style={{ padding: '11px 20px' }}>Contacta</a>
        </div>
        <button onClick={() => setMob(!mob)} className="nav-mob"
          style={{ display: 'none', marginLeft: 'auto', background: 'transparent', border: 'none', color: textInk, cursor: 'pointer' }}
          aria-label="Menu" aria-expanded={mob}>
          {mob ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>
      {mob && (
        <div style={{ background: '#ffffff', borderTop: '1px solid var(--line)', padding: '14px 40px 28px' }}>
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="disp" style={{ display: 'block', padding: '14px 0', fontSize: 24,
              color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--line-soft)' }}>{item.label}</a>
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
    <footer style={{ position: 'relative', zIndex: 2, background: 'var(--panel-dark)', color: '#eef1ea', overflow: 'hidden' }}>
      <div style={{ borderBottom: '1px solid rgba(255,255,255,.08)', padding: '26px 0' }}>
        <Marquee big items={['Sistemes tecnològics', 'IT Security', 'Comunicacions', 'Automatització', 'Audiovisuals', 'Andorra']} />
      </div>
      <div className="wrap" style={{ padding: '64px 40px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 48, alignItems: 'start' }} className="ft-grid">
          <div>
            <div style={{ color: '#ffffff' }}><OntecLogo height={34} color="#ffffff" /></div>
            <p style={{ marginTop: 22, fontSize: 15, color: 'rgba(238,241,234,.66)', lineHeight: 1.7, maxWidth: 320 }}>
              Distribució i integració de sistemes tecnològics avançats. Andorra, des de 2016.
            </p>
            <div style={{ marginTop: 26, display: 'flex', gap: 10 }}>
              <a href="contacta.html" className="btn btn-primary" style={{ padding: '12px 22px' }}>Comença un projecte <Icons.UpRight s={14} /></a>
            </div>
          </div>
          <div>
            <div className="kicker" style={{ color: 'var(--accent-2)', marginBottom: 18 }}>Navegació</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {NAV_ITEMS.map((l) => <a key={l.label} href={l.href} style={{ fontSize: 15, color: 'rgba(238,241,234,.7)', textDecoration: 'none' }}>{l.label}</a>)}
            </div>
          </div>
          <div>
            <div className="kicker" style={{ color: 'var(--accent-2)', marginBottom: 18 }}>Contacte</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, color: 'rgba(238,241,234,.7)' }}>
              <a href="tel:+37688559" style={{ color: 'inherit', textDecoration: 'none' }}>+376 88 55 99</a>
              <a href="mailto:info@ontecandorra.com" style={{ color: 'inherit', textDecoration: 'none' }}>info@ontecandorra.com</a>
              <span>C/ de la Vena 3, Baixos<br/>Encamp, Andorra</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 56, paddingTop: 26, borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(238,241,234,.45)', letterSpacing: '.05em' }}>
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
      el.style.transform = `scale(1.14) translateY(${off * -28}px)`; };
    window.addEventListener('scroll', fn, { passive: true }); fn();
    return () => window.removeEventListener('scroll', fn);
  }, [parallax, ok]);
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--panel-2)', ...style }}>
      {ok ? (
        <img ref={imgRef} src={src} alt={alt} onError={() => setOk(false)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', willChange: parallax ? 'transform' : 'auto' }} />
      ) : (
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#1a2e22 0%,#0f1d15 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 40%, ${A(18)}, transparent 60%)` }} />
        </>
      )}
      {shade && <div className="mc-shade" />}
      {children}
    </div>
  );
}

function PageHero({ kicker, title, sub, img, align = 'left' }) {
  return (
    <section style={{ position: 'relative', minHeight: 'min(72vh,640px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: 'var(--panel-dark)' }}>
      <Cine src={img} alt="" parallax style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(8,18,12,.6) 0%,rgba(8,18,12,.35) 38%,rgba(8,18,12,.8) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(8,18,12,.85) 0%,rgba(8,18,12,.4) 50%,transparent 90%)' }} />
      <div className="wrap-wide" style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: 150, paddingBottom: 80, textAlign: align }}>
        <div className="eyebrow" style={{ marginBottom: 22, color: 'rgba(255,255,255,.78)', justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          <span style={{ width: 22, height: 2, background: 'var(--accent-2)' }} />
          {kicker}
        </div>
        <h1 className="disp" style={{ color: '#fff', fontSize: 'clamp(40px,6vw,92px)', maxWidth: 1080, margin: align === 'center' ? '0 auto' : 0 }}>
          {title}
        </h1>
        {sub && <p style={{ marginTop: 24, fontSize: 'clamp(16px,1.4vw,19px)', color: 'rgba(255,255,255,.74)', lineHeight: 1.7, maxWidth: 600, margin: align === 'center' ? '24px auto 0' : '24px 0 0' }}>{sub}</p>}
      </div>
    </section>
  );
}

function PageShell({ activePage, children }) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <style>{GLOBAL_CSS}</style>
      <ScrollProgress />
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
