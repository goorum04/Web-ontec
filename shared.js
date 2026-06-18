// ════════════════════════════════════════════════════════════════════════════
// Ontec — shared design system
// Tokens + Nav, Footer, Marquee, Reveal, Tag, SectionLabel, Icons, PageShell
// Exported to window for use across all pages.
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
::-webkit-scrollbar{width:7px;}::-webkit-scrollbar-track{background:#000;}
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

.btn{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:12.5px;
  font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;cursor:pointer;
  padding:15px 26px;border-radius:999px;border:1px solid transparent;transition:transform .25s cubic-bezier(.2,.7,.3,1),background .2s,color .2s,box-shadow .25s;}
.btn-primary{background:var(--accent);color:var(--accent-ink);box-shadow:0 0 0 0 var(--accent);}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 14px 40px color-mix(in srgb,var(--accent) 38%,transparent);}
.btn-ghost{background:transparent;color:var(--ink);border-color:var(--line);}
.btn-ghost:hover{border-color:var(--ink);transform:translateY(-2px);}

.reveal{opacity:0;transform:translateY(26px);transition:opacity .9s cubic-bezier(.2,.7,.3,1),transform .9s cubic-bezier(.2,.7,.3,1);}
.reveal.in{opacity:1;transform:none;}
@media (prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none;}}

.atmos{position:fixed;inset:0;pointer-events:none;z-index:60;mix-blend-mode:overlay;
  opacity:calc(.5 * var(--grain));
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");}
.scan{position:fixed;inset:0;pointer-events:none;z-index:61;opacity:calc(.4 * var(--scan));
  background:repeating-linear-gradient(to bottom,transparent 0 2px, rgba(0,0,0,.5) 2px 3px);}

.mcard{position:relative;overflow:hidden;border-radius:18px;border:1px solid var(--line);background:var(--panel);
  text-decoration:none;display:block;transition:border-color .3s,transform .35s cubic-bezier(.2,.7,.3,1);}
.mcard:hover{border-color:color-mix(in srgb,var(--accent) 55%,transparent);transform:translateY(-4px);}
.mcard .mc-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  transition:transform .8s cubic-bezier(.2,.7,.3,1),opacity .4s;}
.mcard:hover .mc-img{transform:scale(var(--zoom));}
.mc-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05) 0%,rgba(0,0,0,.35) 45%,rgba(0,0,0,.92) 100%);}

.mq{display:flex;overflow:hidden;user-select:none;}
.mq-track{display:flex;flex-shrink:0;gap:0;align-items:center;animation:mq var(--marquee) linear infinite;}
.mq:hover .mq-track{animation-play-state:paused;}
@keyframes mq{to{transform:translateX(-50%);}}

@keyframes scanline{0%{transform:translateY(-100vh);}100%{transform:translateY(220vh);}}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
@keyframes pulse-ring{0%{transform:scale(1);opacity:.6;}100%{transform:scale(2.2);opacity:0;}}
@keyframes floaty{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}

.linkline{position:relative;text-decoration:none;color:var(--mut);transition:color .2s;}
.linkline:hover{color:var(--ink);}

@media(max-width:640px){.wrap,.wrap-wide{padding:0 20px;}}
`;

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
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
          <a href="contacta.html" className="btn btn-primary" style={{ padding: '11px 20px' }}>Contacta</a>
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
          <span>© 2026 ON TECNOLOGIES S.L. — Tots els drets reservats</span>
          <span>ANDORRA · 42.5°N 1.5°E</span>
        </div>
      </div>
      <style>{`@media(max-width:820px){.ft-grid{grid-template-columns:1fr!important;gap:36px!important;}}`}</style>
    </footer>
  );
}

function Cine({ src, alt = '', style = {}, shade = false, children }) {
  const [ok, setOk] = useState(!!src);
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#070707', ...style }}>
      {ok ? (
        <img src={src} alt={alt} onError={() => setOk(false)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#0c1810 0%,#060a07 50%,#0b0f14 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${A(10)} 1px,transparent 1px),linear-gradient(90deg,${A(10)} 1px,transparent 1px)`, backgroundSize: '44px 44px' }} />
        </>
      )}
      {shade && <div className="mc-shade" />}
      {children}
    </div>
  );
}

function PageHero({ kicker, title, sub, img, align = 'left' }) {
  return (
    <section style={{ position: 'relative', minHeight: 'min(80vh,720px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
      <Cine src={img} alt="" style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.7) 0%,rgba(0,0,0,.4) 38%,rgba(0,0,0,.78) 78%,#000 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#000 0%,rgba(0,0,0,.45) 45%,transparent 85%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${A(6)} 1px,transparent 1px),linear-gradient(90deg,${A(6)} 1px,transparent 1px)`, backgroundSize: '88px 88px', maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%,#000,transparent)' }} />
      <div className="wrap-wide" style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: 150, paddingBottom: 70, textAlign: align }}>
        <div className="reveal in eyebrow" style={{ marginBottom: 24, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
          {kicker}
        </div>
        <h1 className="disp" style={{ fontSize: 'clamp(44px,7vw,108px)', maxWidth: 1100, margin: align === 'center' ? '0 auto' : 0 }}>{title}</h1>
        {sub && <p style={{ marginTop: 26, fontSize: 'clamp(16px,1.4vw,19px)', color: 'var(--mut)', lineHeight: 1.7, maxWidth: 560, margin: align === 'center' ? '26px auto 0' : '26px 0 0' }}>{sub}</p>}
      </div>
    </section>
  );
}

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

Object.assign(window, {
  A, GLOBAL_CSS, Reveal, Marquee, Icons, Tag, SectionLabel, OntecLogo,
  Cine, PageHero, Nav, Footer, PageShell, NAV_ITEMS,
});
