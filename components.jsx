// ════════════════════════════════════════════════════════════════════════════
// Ontec — shared design system (Higgsfield-inspired cinematic dark)
// Tokens (CSS vars driven by Tweaks) + Nav, Footer, Marquee, Reveal, MediaCard,
// Tag, SectionLabel, Icons, OntecLogo, PageShell.
// Everything exported to window for use across pages.
// ════════════════════════════════════════════════════════════════════════════

const { useState, useEffect, useRef } = React;

/* ── accent alpha helper (color-mix so tints follow the live --accent var) ── */
const A = (p) => `color-mix(in srgb, var(--accent) ${p}%, transparent)`;

/* ── Global stylesheet: tokens + utilities + keyframes + mood/voice/intensity ── */
const GLOBAL_CSS = `
:root{
  --bg:#08090a; --panel:#0d0e0f; --panel-2:#121315;
  --ink:#ECEBE3; --mut:rgba(236,235,227,.56); --faint:rgba(236,235,227,.34);
  --line:rgba(236,235,227,.13); --line-soft:rgba(236,235,227,.07);
  --accent:#45e07f; --accent-ink:#04130a;
  --serif:'Newsreader',Georgia,serif; --sans:'Archivo',sans-serif;
  --disp:var(--serif); --body:'Space Grotesk',sans-serif; --mono:'Space Mono',monospace;
  --case:none; --dtrack:-0.012em; --dweight:560; --dleading:1.02; --ditalic:italic;
  --grain:.32; --zoom:1.06; --marquee:46s; --scan:0;
}
/* ── MOOD : palette / energy ── */
[data-mood="acid"]  { --accent:#45e07f; --accent-ink:#04130a; }
[data-mood="ice"]   { --accent:#7fd3e6; --accent-ink:#03161c; }
[data-mood="flare"] { --accent:#ff6a45; --accent-ink:#1a0703; }
[data-mood="mono"]  { --accent:#ECEBE3; --accent-ink:#08090a; }
/* ── VOICE : typographic personality ── */
[data-voice="editorial"]{ --disp:var(--serif); --case:none; --dweight:560; --dtrack:-0.012em; --dleading:1.02; }
[data-voice="modern"]   { --disp:var(--sans);  --case:uppercase; --dweight:840; --dtrack:-0.04em; --dleading:.94; }
[data-voice="soft"]     { --disp:'Space Grotesk',sans-serif; --case:none; --dweight:600; --dtrack:-0.02em; --dleading:1.0; }
/* ── INTENSITY : motion / atmosphere ── */
[data-intensity="calm"]     { --grain:.14; --zoom:1.03; --marquee:72s; --scan:0; }
[data-intensity="cinematic"]{ --grain:.32; --zoom:1.06; --marquee:46s; --scan:0; }
[data-intensity="hyper"]    { --grain:.6;  --zoom:1.12; --marquee:22s; --scan:.6; }

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--ink);font-family:var(--body);overflow-x:hidden;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
::selection{background:var(--accent);color:var(--accent-ink);}
::-webkit-scrollbar{width:7px;}::-webkit-scrollbar-track{background:var(--bg);}
::-webkit-scrollbar-thumb{background:var(--line);border-radius:4px;}
::-webkit-scrollbar-thumb:hover{background:var(--accent);}
input,textarea,button,select{font-family:var(--body);}
a{color:inherit;}

.wrap{max-width:1280px;margin:0 auto;padding:0 40px;}
.wrap-wide{max-width:1640px;margin:0 auto;padding:0 40px;}

.disp{font-family:var(--disp);font-weight:var(--dweight);letter-spacing:var(--dtrack);
  text-transform:var(--case);line-height:var(--dleading);color:var(--ink);text-wrap:balance;}
.disp em,.ital{font-style:var(--ditalic);font-weight:inherit;}
.kicker{font-family:var(--mono);font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--mut);}
.eyebrow{display:inline-flex;align-items:center;gap:11px;font-family:var(--mono);font-size:11px;
  letter-spacing:.2em;text-transform:uppercase;color:var(--mut);}

/* buttons */
.btn{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:12px;
  font-weight:700;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;cursor:pointer;
  padding:15px 26px;border-radius:2px;border:1px solid transparent;transition:transform .3s cubic-bezier(.2,.7,.3,1),background .25s,color .25s,border-color .25s;}
.btn-primary{background:var(--accent);color:var(--accent-ink);}
.btn-primary:hover{transform:translateY(-2px);}
.btn-ghost{background:transparent;color:var(--ink);border-color:var(--line);}
.btn-ghost:hover{border-color:var(--ink);background:rgba(236,235,227,.04);}

/* reveal on scroll */
.reveal{opacity:0;transform:translateY(24px);transition:opacity 1s cubic-bezier(.2,.7,.3,1),transform 1s cubic-bezier(.2,.7,.3,1);}
.reveal.in{opacity:1;transform:none;}
@media (prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none;}}

/* film grain (subtle) */
.atmos{position:fixed;inset:0;pointer-events:none;z-index:60;mix-blend-mode:soft-light;
  opacity:calc(.42 * var(--grain));
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");}
.scan{position:fixed;inset:0;pointer-events:none;z-index:61;opacity:calc(.35 * var(--scan));
  background:repeating-linear-gradient(to bottom,transparent 0 2px, rgba(0,0,0,.5) 2px 3px);}

/* cohesive cinematic colour grade on all photography */
.cine-img{filter:grayscale(.32) contrast(1.06) brightness(.84) saturate(.92);}
.cine-tint{position:absolute;inset:0;pointer-events:none;mix-blend-mode:color;opacity:.16;background:var(--accent);}

/* media card */
.mcard{position:relative;overflow:hidden;border-radius:3px;border:1px solid var(--line);background:var(--panel);
  text-decoration:none;display:block;transition:border-color .4s,transform .5s cubic-bezier(.2,.7,.3,1);}
.mcard:hover{border-color:${A(45)};}
.mcard .mc-img,.mcard img{transition:transform 1s cubic-bezier(.2,.7,.3,1);}
.mcard:hover img{transform:scale(var(--zoom));}
.mc-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05) 0%,rgba(0,0,0,.3) 42%,rgba(8,9,10,.94) 100%);}

/* marquee */
.mq{display:flex;overflow:hidden;user-select:none;}
.mq-track{display:flex;flex-shrink:0;gap:0;align-items:center;animation:mq var(--marquee) linear infinite;}
.mq:hover .mq-track{animation-play-state:paused;}
@keyframes mq{to{transform:translateX(-50%);}}

@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
@keyframes floaty{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
@keyframes kenburns{0%{transform:scale(1.04) translate(0,0);}100%{transform:scale(1.15) translate(-2.2%,-2.4%);}}
@keyframes lightsweep{0%{transform:translateX(-30%) rotate(8deg);opacity:0;}50%{opacity:.5;}100%{transform:translateX(60%) rotate(8deg);opacity:0;}}
@keyframes scrollcue{0%{transform:translateY(0);opacity:0;}30%{opacity:1;}100%{transform:translateY(14px);opacity:0;}}
.kb{animation:kenburns 26s ease-in-out infinite alternate;will-change:transform;}
@keyframes heroslide{0%{opacity:0;}4%{opacity:1;}22%{opacity:1;}27%{opacity:0;}100%{opacity:0;}}
.heroslide{position:absolute;inset:0;opacity:0;animation:heroslide 32s linear infinite;will-change:opacity;}
@media (prefers-reduced-motion:reduce){.kb{animation:none;}.heroslide{animation:none;}.heroslide:first-child{opacity:1;}}
.heromedia video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1.4s ease;}
.heromedia video.ready{opacity:1;}

.linkline{position:relative;text-decoration:none;color:var(--mut);transition:color .25s;}
.linkline:hover{color:var(--ink);}
.hover-row{transition:background .3s,padding .3s,color .25s;}
`;

/* ── Reveal: scroll-triggered fade/slide wrapper ── */
function Reveal({ children, delay = 0, as = 'div', style = {}, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag2 = as;
  return <Tag2 ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>{children}</Tag2>;
}

/* ── Marquee ── */
function Marquee({ items, sep = '—', big = false }) {
  const row = (k) => (
    <div className="mq-track" key={k} aria-hidden={k === 1}>
      {items.map((it, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: big ? 30 : 18, padding: big ? '0 30px' : '0 18px' }}>
          <span style={{ fontFamily: big ? 'var(--disp)' : 'var(--mono)', fontWeight: big ? 'var(--dweight)' : 400,
            fontStyle: big ? 'var(--ditalic)' : 'normal',
            textTransform: big ? 'var(--case)' : 'uppercase', letterSpacing: big ? 'var(--dtrack)' : '.16em',
            fontSize: big ? 'clamp(26px,3.6vw,52px)' : 12, color: big ? 'var(--ink)' : 'var(--mut)' }}>{it}</span>
          <span style={{ color: 'var(--accent)', fontSize: big ? 20 : 10, opacity: .7 }}>{sep}</span>
        </span>
      ))}
    </div>
  );
  return <div className="mq">{row(0)}{row(1)}</div>;
}

/* ── Icons ── */
const Icons = {
  Arrow: ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  UpRight: ({ s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>,
  Mail:  () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>,
  Phone: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.38 2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Pin:   () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Check: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Plus:  () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Shield: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Wifi:   () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>,
  Cpu:    () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  Screen: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Menu:   () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="17" x2="21" y2="17"/></svg>,
  X:      () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Blog:   () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  Play:   () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>,
};

/* ── Tag ── */
function Tag({ children }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--mono)', fontSize: 10,
      letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mut)', border: `1px solid var(--line)`,
      borderRadius: 2, padding: '5px 11px' }}>
      <span style={{ width: 5, height: 5, background: 'var(--accent)', flexShrink: 0 }} />
      {children}
    </span>
  );
}

/* ── Section label (editorial: index number + hairline + mono caption) ── */
function SectionLabel({ children, index }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 26 }}>
      {index && <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '.1em' }}>{index}</span>}
      <span style={{ width: 40, height: 1, background: 'var(--accent)' }} />
      <span className="kicker">{children}</span>
    </div>
  );
}

/* ── Logo (exact Ontec monogram + wordmark) ── */
function OntecLogo({ height = 30, wordmark = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <img src="assets/ontec-logo.png" alt="Ontec"
        style={{ height: Math.round(height * 1.18), width: 'auto', display: 'block', flexShrink: 0 }} />
      {wordmark && <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: Math.round(height * 0.66), color: 'var(--ink)', letterSpacing: '-0.04em' }}>Ontec</span>}
    </div>
  );
}

/* ── Nav ── */
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
      backdropFilter: scrolled || mob ? 'blur(20px) saturate(150%)' : 'none', WebkitBackdropFilter: scrolled || mob ? 'blur(20px) saturate(150%)' : 'none' }}>
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
          <a href="contacta.html" className="btn btn-primary" style={{ padding: '11px 20px' }}>Contacta</a>
        </div>
        <button onClick={() => setMob(!mob)} className="nav-mob" style={{ display: 'none', marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--ink)', cursor: 'pointer' }} aria-label="Menu">
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

/* ── Footer ── */
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)', overflow: 'hidden' }}>
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
              <a href="contacta.html" className="btn btn-primary" style={{ padding: '12px 22px' }}>Comença un projecte <Icons.UpRight s={14} /></a>
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
          <span>© 2026 ON TECNOLOGIES S.L.</span>
          <span>ANDORRA · 42.5°N 1.5°E</span>
        </div>
      </div>
      <style>{`@media(max-width:820px){.ft-grid{grid-template-columns:1fr!important;gap:36px!important;}}`}</style>
    </footer>
  );
}

/* ── Cinematic image w/ graceful fallback + cohesive grade (shared) ── */
function Cine({ src, alt = '', style = {}, shade = false, grade = true, tint = true, children }) {
  const [ok, setOk] = useState(!!src);
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#0a0b0c', ...style }}>
      {ok ? (
        <img src={src} alt={alt} onError={() => setOk(false)} className={grade ? 'cine-img' : ''}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#11140f 0%,#0a0b0c 55%,#0c1014 100%)' }} />
      )}
      {tint && ok && <div className="cine-tint" />}
      {shade && <div className="mc-shade" />}
      {children}
    </div>
  );
}

/* ── Interior page hero (full-bleed cinematic, editorial) ── */
function PageHero({ kicker, title, sub, img, align = 'left', index }) {
  return (
    <section style={{ position: 'relative', minHeight: 'min(82vh,760px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
      <Cine src={img} alt="" style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(8,9,10,.66) 0%,rgba(8,9,10,.32) 38%,rgba(8,9,10,.74) 76%,var(--bg) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,var(--bg) 0%,rgba(8,9,10,.4) 48%,transparent 88%)' }} />
      <div className="wrap-wide" style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: 160, paddingBottom: 76, textAlign: align }}>
        <div className="reveal in" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          {index && <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '.1em' }}>{index}</span>}
          <span style={{ width: 40, height: 1, background: 'var(--accent)' }} />
          <span className="kicker">{kicker}</span>
        </div>
        <h1 className="disp" style={{ fontSize: 'clamp(46px,7.4vw,116px)', maxWidth: 1140, margin: align === 'center' ? '0 auto' : 0 }}>{title}</h1>
        {sub && <p style={{ marginTop: 28, fontSize: 'clamp(16px,1.35vw,20px)', color: 'var(--mut)', lineHeight: 1.7, maxWidth: 580, margin: align === 'center' ? '28px auto 0' : '28px 0 0' }}>{sub}</p>}
      </div>
    </section>
  );
}

/* ── Page shell ── */
function PageShell({ activePage, children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <style>{GLOBAL_CSS}</style>
      <div className="atmos" /><div className="scan" />
      <Nav activePage={activePage} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

/* ── exports ── */
Object.assign(window, {
  A, GLOBAL_CSS, Reveal, Marquee, Icons, Tag, SectionLabel, OntecLogo,
  Cine, PageHero, Nav, Footer, PageShell, NAV_ITEMS,
});
