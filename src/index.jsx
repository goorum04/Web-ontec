/* ── Terminal status card ── */
function StatusCard() {
  const lines = [
    { t:0,    text:'$ ontec --init sistema', c:'#fff' },
    { t:600,  text:'> carregant mòduls…', c:'var(--mut)' },
    { t:1050, text:'✓ IT Security', c:'var(--accent)' },
    { t:1400, text:'✓ Comunicacions', c:'var(--accent)' },
    { t:1750, text:'✓ Automatització', c:'var(--accent)' },
    { t:2100, text:'✓ Audiovisuals', c:'var(--accent)' },
    { t:2450, text:'✓ Videoconferència', c:'var(--accent)' },
    { t:2900, text:'> sistema llest · Andorra', c:'var(--mut)' },
  ];
  const [vis,setVis]=useState(0);
  const [cur,setCur]=useState(true);
  useEffect(()=>{
    const ids=lines.map((l,i)=>setTimeout(()=>setVis(v=>Math.max(v,i+1)),l.t));
    const b=setInterval(()=>setCur(v=>!v),530);
    return()=>{ ids.forEach(clearTimeout);clearInterval(b); };
  },[]);
  return (
    <div className="glowborder" style={{width:360,maxWidth:'90vw',borderRadius:16,overflow:'hidden',border:'1px solid var(--line)',background:'rgba(7,7,8,.66)',backdropFilter:'blur(18px)',WebkitBackdropFilter:'blur(18px)',boxShadow:'0 30px 90px rgba(0,0,0,.7)'}}>
      <div style={{display:'flex',alignItems:'center',gap:8,padding:'12px 16px',borderBottom:'1px solid var(--line-soft)'}}>
        <div style={{display:'flex',gap:6}}>{['#ff5f57','#ffbd2e','#28c840'].map(c=><div key={c} style={{width:9,height:9,borderRadius:'50%',background:c,opacity:.85}}/>)}</div>
        <span style={{fontFamily:'var(--mono)',fontSize:10.5,color:'var(--faint)',letterSpacing:'.08em',marginLeft:6}}>ontec://status</span>
        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:7}}>
          <span style={{position:'relative',width:7,height:7}}>
            <span style={{position:'absolute',inset:0,borderRadius:'50%',background:'var(--accent)'}}/>
            <span style={{position:'absolute',inset:0,borderRadius:'50%',background:'var(--accent)',animation:'pulse-ring 2s ease-out infinite'}}/>
          </span>
          <span style={{fontFamily:'var(--mono)',fontSize:9.5,color:'var(--accent)',letterSpacing:'.1em'}}>LIVE</span>
        </div>
      </div>
      <div style={{padding:'18px 20px',minHeight:200,fontFamily:'var(--mono)',fontSize:12.5,lineHeight:2}}>
        {lines.slice(0,vis).map((l,i)=><div key={i} style={{color:l.c}}>{l.text}</div>)}
        {vis<lines.length && <span style={{display:'inline-block',width:7,height:14,background:'var(--accent)',opacity:cur?1:0,verticalAlign:'middle'}}/>}
      </div>
    </div>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'flex-end',overflow:'hidden'}}>
      <Cine src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=2000&q=80&auto=format&fit=crop" alt="Infraestructura tecnològica" shade={false} style={{position:'absolute',inset:0}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(0,0,0,.74) 0%,rgba(0,0,0,.38) 30%,rgba(0,0,0,.62) 62%,#000 100%)'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,#000 0%,rgba(0,0,0,.55) 42%,transparent 80%)'}}/>
      <div style={{position:'absolute',inset:0,backgroundImage:`linear-gradient(${A(7)} 1px,transparent 1px),linear-gradient(90deg,${A(7)} 1px,transparent 1px)`,backgroundSize:'88px 88px',maskImage:'radial-gradient(ellipse 80% 70% at 50% 40%,#000,transparent)',animation:'gridmove 6s linear infinite'}}/>
      <ParticleField style={{opacity:.85}}/>
      <div style={{position:'absolute',left:0,right:0,top:0,height:1,background:`linear-gradient(90deg,transparent,${A(45)},transparent)`,animation:'scanline 8s linear infinite'}}/>
      <div className="wrap-wide" style={{position:'relative',zIndex:2,width:'100%',paddingBottom:90,paddingTop:140}}>
        <div style={{maxWidth:1120}}>
          <div className="reveal in eyebrow" style={{marginBottom:26}}>
            <span style={{width:7,height:7,borderRadius:'50%',background:'var(--accent)',boxShadow:'0 0 10px var(--accent)'}}/>
            Andorra · Distribució tecnològica des de 2016
          </div>
          <h1 className="disp glow-text" style={{fontSize:'clamp(50px,7.8vw,128px)',lineHeight:.9}}>
            <Scramble text="Sistemes"/><br/><Scramble text="tecnològics" delay={120}/><br/><span style={{color:'var(--accent)'}}><Scramble text="avançats" delay={240}/></span>
          </h1>
          <p style={{marginTop:34,fontSize:'clamp(16px,1.5vw,21px)',color:'var(--mut)',lineHeight:1.7,maxWidth:580}}>
            Distribuïm, integrem i donem suport a infraestructures tecnològiques per a empreses,
            arquitectures, ingenierías i instal·ladors a Andorra.
          </p>
          <div style={{display:'flex',gap:14,marginTop:42,flexWrap:'wrap'}}>
            <Magnetic><a href="solucions.html" className="btn btn-primary">Veure solucions <Icons.UpRight s={15}/></a></Magnetic>
            <Magnetic><a href="contacta.html" className="btn btn-ghost">Parla amb un expert</a></Magnetic>
          </div>
        </div>
      </div>
      <div style={{position:'absolute',right:'max(40px,calc((100vw - 1680px)/2 + 40px))',top:'28%',zIndex:3,animation:'floaty 7s ease-in-out infinite'}} className="hero-status">
        <StatusCard/>
      </div>
      <div style={{position:'absolute',bottom:34,left:'50%',transform:'translateX(-50%)',zIndex:3,display:'flex',flexDirection:'column',alignItems:'center',gap:8,opacity:.6}}>
        <span style={{fontFamily:'var(--mono)',fontSize:9.5,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--mut)'}}>Scroll</span>
        <span style={{width:1,height:38,background:`linear-gradient(180deg,var(--accent),transparent)`}}/>
      </div>
      <style>{`@media(max-width:1100px){.hero-status{display:none;}}`}</style>
    </section>
  );
}

/* ── Stat band (count up) ── */
function StatBand() {
  const stats=[
    {to:8,suf:'+',l:'Anys operant'},
    {to:200,suf:'+',l:'Projectes lliurats'},
    {to:4,suf:'',l:'Àrees clau'},
    {to:99.9,suf:'%',dec:1,l:'Uptime garantit'},
    {to:4,pre:'< ',suf:'h',l:'Temps de resposta'},
  ];
  return (
    <section style={{borderTop:'1px solid var(--line)',borderBottom:'1px solid var(--line)',background:'rgba(8,8,9,.5)'}}>
      <div className="wrap-wide stat-wrap" style={{display:'grid',gridTemplateColumns:`repeat(${stats.length},1fr)`,gap:0}}>
        {stats.map((s,i)=>(
          <Reveal key={i} delay={i*70} style={{padding:'46px 28px',borderRight:i<stats.length-1?'1px solid var(--line-soft)':'none'}}>
            <div className="disp glow-text" style={{fontSize:'clamp(34px,4vw,64px)',color:'var(--accent)'}}>
              <CountUp to={s.to} suffix={s.suf} prefix={s.pre||''} decimals={s.dec||0}/>
            </div>
            <div style={{marginTop:8,fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--mut)'}}>{s.l}</div>
          </Reveal>
        ))}
      </div>
      <style>{`@media(max-width:760px){.stat-wrap{grid-template-columns:1fr 1fr!important;}}`}</style>
    </section>
  );
}

const SOLS=[
  {t:'IT Security',href:'solucions.html#it-security',n:'01',icon:<Icons.Shield/>,desc:'Protecció integral de la infraestructura digital.',img:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1100&q=80&auto=format&fit=crop'},
  {t:'Comunicacions',href:'solucions.html#comunicacions',n:'02',icon:<Icons.Wifi/>,desc:"Connectivitat d'alt rendiment per a qualsevol entorn.",img:'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1100&q=80&auto=format&fit=crop'},
  {t:'Automatització',href:'solucions.html#automatitzacio',n:'03',icon:<Icons.Cpu/>,desc:"Sistemes intel·ligents per a edificis i llars.",img:'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1100&q=80&auto=format&fit=crop'},
  {t:'Audiovisuals',href:'solucions.html#audiovisuals',n:'04',icon:<Icons.Screen/>,desc:'Sistemes A/V professionals per a qualsevol espai.',img:'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1100&q=80&auto=format&fit=crop'},
];
function SolutionsGallery() {
  return (
    <section style={{padding:'120px 0'}}>
      <div className="wrap-wide">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:56,flexWrap:'wrap',gap:24}}>
          <Reveal><SectionLabel>Solucions</SectionLabel><h2 className="disp" style={{fontSize:'clamp(40px,6vw,96px)'}}>Tot integrat,<br/>tot controlat</h2></Reveal>
          <Reveal delay={120}><Magnetic><a href="solucions.html" className="btn btn-ghost">Veure totes <Icons.UpRight s={14}/></a></Magnetic></Reveal>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:18}} className="gal-grid">
          {SOLS.map((s,i)=>(
            <Reveal key={s.t} delay={(i%2)*100}>
              <Tilt max={6}>
                <a href={s.href} className="mcard glowborder" style={{height:400,display:'block'}}>
                  <Cine src={s.img} alt={s.t} style={{position:'absolute',inset:0}}/>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(0,0,0,.15) 0%,rgba(0,0,0,.4) 45%,rgba(0,0,0,.92) 100%)'}}/>
                  <div style={{position:'relative',zIndex:1,height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'30px 32px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                      <div style={{width:54,height:54,borderRadius:13,background:A(16),border:`1px solid ${A(34)}`,backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--accent)',boxShadow:`0 0 30px ${A(25)}`}}>{s.icon}</div>
                      <span style={{fontFamily:'var(--mono)',fontSize:11,color:'var(--mut)',letterSpacing:'.1em'}}>{s.n}</span>
                    </div>
                    <div>
                      <h3 className="disp" style={{fontSize:'clamp(28px,3vw,42px)',marginBottom:10}}>{s.t}</h3>
                      <p style={{fontSize:14.5,color:'rgba(255,255,255,.66)',lineHeight:1.6,maxWidth:360}}>{s.desc}</p>
                      <div style={{marginTop:18,display:'inline-flex',alignItems:'center',gap:8,fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--accent)'}}>Explorar <Icons.Arrow s={13}/></div>
                    </div>
                  </div>
                </a>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:760px){.gal-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

function CaseBatllia() {
  const specs=[['Sistema','Videoconferència HD'],['Ubicació',"la Batllia d'Andorra"],['Equipament','Cisco Webex + Sony PTZ'],['Cobertura','3 sales de reunions'],['Integració','MS Teams / Zoom'],['Suport','24/7 garantit']];
  return (
    <section style={{position:'relative',padding:'120px 0',background:'rgba(11,11,12,.7)',borderTop:'1px solid var(--line)',borderBottom:'1px solid var(--line)',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'-30%',right:'-10%',width:600,height:600,background:`radial-gradient(circle,${A(10)},transparent 70%)`,filter:'blur(40px)',pointerEvents:'none'}}/>
      <div className="wrap-wide" style={{position:'relative'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center'}} className="case-grid">
          <Reveal>
            <SectionLabel>Cas d'èxit</SectionLabel>
            <h2 className="disp glow-text" style={{fontSize:'clamp(36px,5vw,84px)',marginBottom:24}}>La Batllia<br/>d'Andorra</h2>
            <p style={{fontSize:17,color:'var(--mut)',lineHeight:1.8,marginBottom:24}}>
              Instal·lació integral del sistema de videoconferència professional per als espais institucionals
              de la Batllia d'Andorra. Un projecte que demostra la capacitat d'Ontec per desplegar solucions
              d'alt nivell en entorns de gran exigència tècnica i protocol·lària.
            </p>
            <p style={{fontSize:17,color:'var(--mut)',lineHeight:1.8,marginBottom:40}}>
              El sistema permet la connexió simultània amb organismes internacionals, tribunals i institucions
              europees amb qualitat audiovisual de primer nivell i latència mínima.
            </p>
            <Magnetic><a href="solucions.html#audiovisuals" className="btn btn-primary">Veure solució <Icons.UpRight s={15}/></a></Magnetic>
          </Reveal>
          <div>
            <Reveal delay={120}>
              <Tilt max={7}>
                <div className="glowborder" style={{position:'relative',borderRadius:20,overflow:'hidden',border:'1px solid var(--line)',marginBottom:18}}>
                  <Cine src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop" alt="Sala de videoconferència la Batllia" style={{height:320}}/>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 50%,rgba(0,0,0,.85) 100%)'}}/>
                  <div style={{position:'absolute',bottom:24,left:24,right:24,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div>
                      <div className="kicker" style={{marginBottom:4}}>Projecte completat</div>
                      <div style={{fontFamily:'var(--disp)',fontWeight:700,fontSize:18,color:'var(--ink)'}}>La Batllia d'Andorra</div>
                    </div>
                    <div style={{width:44,height:44,borderRadius:'50%',background:A(20),border:`1px solid ${A(40)}`,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--accent)'}}><Icons.Video/></div>
                  </div>
                </div>
              </Tilt>
            </Reveal>
            <Reveal delay={200}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                {specs.map(([k,v])=>(
                  <div key={k} style={{background:'var(--panel-2)',border:'1px solid var(--line)',borderRadius:12,padding:'16px 18px'}}>
                    <div style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--faint)',marginBottom:6}}>{k}</div>
                    <div style={{fontSize:14,color:'var(--ink)',fontWeight:600}}>{v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:860px){.case-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
    </section>
  );
}

function CiberseguretatIncibe() {
  const threats=[
    {icon:<Icons.Shield/>,t:'Firewall avançat',d:'Fortinet & Palo Alto Networks de nova generació.'},
    {icon:<Icons.Lock/>,t:'Zero Trust',d:'Arquitectura de confiança zero per a xarxes corporatives.'},
    {icon:<Icons.Wifi/>,t:'SOC Monitorat',d:'Supervisió contínua 24/7 de la infraestructura.'},
    {icon:<Icons.Cpu/>,t:'Pentesting',d:'Auditories de seguretat i proves de penetració.'},
  ];
  return (
    <section style={{padding:'120px 0'}}>
      <div className="wrap-wide">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center'}} className="incibe-grid">
          <div>
            <Reveal>
              <Tilt max={7}>
                <div className="glowborder" style={{position:'relative',borderRadius:20,overflow:'hidden',border:'1px solid var(--line)',marginBottom:20}}>
                  <Cine src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=900&q=80&auto=format&fit=crop" alt="Ciberseguretat" style={{height:380}}/>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,.1) 100%)'}}/>
                  <div style={{position:'absolute',top:24,left:24}}>
                    <div style={{display:'inline-flex',alignItems:'center',gap:10,background:'rgba(0,0,0,.7)',backdropFilter:'blur(12px)',border:'1px solid var(--line)',borderRadius:999,padding:'8px 16px'}}>
                      <span style={{width:7,height:7,borderRadius:'50%',background:'var(--accent)',boxShadow:'0 0 8px var(--accent)'}}/>
                      <span style={{fontFamily:'var(--mono)',fontSize:11,color:'var(--accent)',letterSpacing:'.1em'}}>INCIBE CERT</span>
                    </div>
                  </div>
                </div>
              </Tilt>
            </Reveal>
            <Reveal delay={100}>
              <div style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:16,padding:'22px 26px',display:'flex',alignItems:'center',gap:18}}>
                <div style={{width:52,height:52,borderRadius:13,background:A(15),border:`1px solid ${A(30)}`,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--accent)',flexShrink:0,boxShadow:`0 0 28px ${A(22)}`}}><Icons.Shield/></div>
                <div>
                  <div style={{fontFamily:'var(--mono)',fontSize:10.5,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--accent)',marginBottom:4}}>Col·laboració oficial</div>
                  <div style={{fontSize:15,color:'var(--ink)',fontWeight:600}}>Tècnic certificat per INCIBE</div>
                  <div style={{fontSize:13,color:'var(--mut)',marginTop:3}}>Instituto Nacional de Ciberseguridad</div>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={80}>
            <SectionLabel>Ciberseguretat</SectionLabel>
            <h2 className="disp glow-text" style={{fontSize:'clamp(36px,5vw,84px)',marginBottom:24}}>Protecció real<br/>per a la teva<br/>empresa</h2>
            <p style={{fontSize:17,color:'var(--mut)',lineHeight:1.8,marginBottom:20}}>
              Ontec compta amb un tècnic especialitzat en ciberseguretat col·laborador de l'<strong style={{color:'var(--ink)'}}>INCIBE</strong>
              (Instituto Nacional de Ciberseguridad d'Espanya), garantint els estàndards més exigents
              en protecció d'infraestructures digitals.
            </p>
            <p style={{fontSize:17,color:'var(--mut)',lineHeight:1.8,marginBottom:36}}>
              Des d'auditories de seguretat fins a la implantació de solucions Zero Trust, oferim una
              cobertura completa per protegir els actius digitals de qualsevol organització a Andorra.
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:40}}>
              {threats.map((th,i)=>(
                <Reveal key={i} delay={i*60}>
                  <div className="glowborder" style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:14,padding:'20px',transition:'border-color .2s,background .2s'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=A(35);e.currentTarget.style.background=A(6);}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--line)';e.currentTarget.style.background='var(--panel)';}}>
                    <div style={{color:'var(--accent)',marginBottom:12}}>{th.icon}</div>
                    <div style={{fontFamily:'var(--disp)',fontWeight:700,fontSize:15,color:'var(--ink)',marginBottom:6,letterSpacing:'-0.01em'}}>{th.t}</div>
                    <div style={{fontSize:13,color:'var(--mut)',lineHeight:1.5}}>{th.d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Magnetic><a href="solucions.html#it-security" className="btn btn-primary">Veure IT Security <Icons.UpRight s={15}/></a></Magnetic>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:860px){.incibe-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
    </section>
  );
}

function PartnersMarquee() {
  const partners=['Fortinet','Cisco','Ubiquiti','KNX','Crestron','HPE Aruba','Palo Alto','Lutron','Samsung','Sony','QSC','Shure'];
  return (
    <section style={{borderTop:'1px solid var(--line)',borderBottom:'1px solid var(--line)',background:'rgba(11,11,12,.6)'}}>
      <div className="wrap" style={{paddingTop:28,paddingBottom:14}}>
        <div className="kicker" style={{color:'var(--faint)',textAlign:'center'}}>Fabricants i partners certificats</div>
      </div>
      <div style={{paddingBottom:30}}><Marquee items={partners}/></div>
    </section>
  );
}

function ServicesList() {
  const svcs=[
    {n:'01',t:'Ingenierías',href:'serveis.html#ingenieries',d:'Prescripció, especificació i assistència tècnica.'},
    {n:'02',t:'Arquitectures',href:'serveis.html#arquitectures',d:'Tecnologia integrada des de la fase de projecte.'},
    {n:'03',t:'Instal·ladors',href:'serveis.html#installadors',d:'Subministre, preconfiguració i suport en obra.'},
    {n:'04',t:"Disseny d'Interiors",href:'serveis.html#disseny',d:"Tecnologia invisible, part del disseny."},
  ];
  return (
    <section style={{padding:'120px 0'}}>
      <div className="wrap-wide">
        <Reveal style={{marginBottom:48}}>
          <SectionLabel>Serveis</SectionLabel>
          <h2 className="disp" style={{fontSize:'clamp(40px,6vw,96px)'}}>Adaptat al<br/>teu sector</h2>
        </Reveal>
        <div style={{borderTop:'1px solid var(--line)'}}>
          {svcs.map((s,i)=>(
            <Reveal key={s.t} delay={i*60}>
              <a href={s.href} style={{display:'grid',gridTemplateColumns:'90px 1fr auto',gap:28,alignItems:'center',padding:'34px 8px',borderBottom:'1px solid var(--line)',textDecoration:'none',transition:'background .25s,padding .25s'}}
                onMouseEnter={e=>{e.currentTarget.style.background=A(6);e.currentTarget.style.paddingLeft='24px';e.currentTarget.querySelector('.sv-t').style.color='var(--accent)';}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.paddingLeft='8px';e.currentTarget.querySelector('.sv-t').style.color='var(--ink)';}}>
                <span style={{fontFamily:'var(--mono)',fontSize:13,color:'var(--faint)',letterSpacing:'.1em'}}>{s.n}</span>
                <div style={{display:'flex',alignItems:'baseline',gap:26,flexWrap:'wrap'}}>
                  <span className="sv-t disp" style={{fontSize:'clamp(26px,3.4vw,48px)',transition:'color .25s'}}>{s.t}</span>
                  <span style={{fontSize:15,color:'var(--mut)'}}>{s.d}</span>
                </div>
                <span style={{color:'var(--accent)'}}><Icons.UpRight s={22}/></span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const BLOG=[
  {date:'2025',tag:'Videoconferència',title:"Sistema de videoconferència a la Batllia d'Andorra",img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop'},
  {date:'2024',tag:'IT Security',title:'Zero Trust: el nou paradigma de seguretat per a pimes',img:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80&auto=format&fit=crop'},
  {date:'2022',tag:'Domòtica',title:"La domòtica KNX arriba als edificis premium d'Andorra",img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop'},
];
function BlogPreview() {
  return (
    <section style={{padding:'0 0 120px'}}>
      <div className="wrap-wide">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:48,flexWrap:'wrap',gap:24}}>
          <Reveal><SectionLabel>Blog</SectionLabel><h2 className="disp" style={{fontSize:'clamp(36px,5vw,80px)'}}>Últimes notícies</h2></Reveal>
          <Reveal delay={120}><Magnetic><a href="blog.html" className="btn btn-ghost">Veure tot <Icons.UpRight s={14}/></a></Magnetic></Reveal>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}} className="blog-grid">
          {BLOG.map((p,i)=>(
            <Reveal key={i} delay={i*90}>
              <a href="blog.html" className="mcard" style={{display:'block'}}>
                <Cine src={p.img} alt={p.title} style={{height:230}}/>
                <div style={{padding:'24px 26px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
                    <Tag>{p.tag}</Tag>
                    <span style={{fontFamily:'var(--mono)',fontSize:10.5,color:'var(--faint)'}}>{p.date}</span>
                  </div>
                  <h4 style={{fontFamily:'var(--disp)',fontWeight:700,fontSize:18,color:'var(--ink)',lineHeight:1.3,letterSpacing:'-0.01em'}}>{p.title}</h4>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:860px){.blog-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

function CtaBig() {
  return (
    <section style={{position:'relative',overflow:'hidden',borderTop:'1px solid var(--line)'}}>
      <Cine src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&q=80&auto=format&fit=crop" alt="" shade={false} parallax style={{position:'absolute',inset:0}}/>
      <div style={{position:'absolute',inset:0,background:`linear-gradient(180deg,#000 0%,${A(8)} 50%,#000 100%)`}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 80% at 50% 50%,rgba(0,0,0,.2),#000)'}}/>
      <ParticleField style={{opacity:.5}}/>
      <div className="wrap" style={{position:'relative',zIndex:1,padding:'150px 40px',textAlign:'center'}}>
        <Reveal>
          <div className="kicker" style={{justifyContent:'center',display:'flex',marginBottom:22}}>Comencem?</div>
          <h2 className="disp glow-text" style={{fontSize:'clamp(44px,8vw,140px)'}}>Tens un projecte<br/>en ment?</h2>
          <p style={{margin:'28px auto 0',maxWidth:540,fontSize:18,color:'var(--mut)',lineHeight:1.7}}>
            Explica'ns les teves necessitats i trobarem la millor solució tecnològica per al teu projecte.
          </p>
          <div style={{display:'flex',gap:14,marginTop:42,justifyContent:'center',flexWrap:'wrap'}}>
            <Magnetic><a href="contacta.html" className="btn btn-primary">Contacta ara <Icons.UpRight s={15}/></a></Magnetic>
            <Magnetic><a href="tel:+37688559" className="btn btn-ghost"><Icons.Phone/> +376 88 55 99</a></Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const TWEAK_DEFAULTS = {"mood":"acid","voice":"editorial","intensity":"cinematic"};
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute('data-mood', t.mood);
    r.setAttribute('data-voice', t.voice);
    r.setAttribute('data-intensity', t.intensity);
  }, [t.mood, t.voice, t.intensity]);
  return (
    <PageShell activePage="Inici">
      <Hero/><StatBand/><SolutionsGallery/><CaseBatllia/><CiberseguretatIncibe/>
      <PartnersMarquee/><ServicesList/><BlogPreview/><CtaBig/>
      <TweaksPanel title="Tweaks">
        <TweakSection label="Mood"/>
        <TweakRadio label="Mood" value={t.mood} options={[{value:'acid',label:'Acid'},{value:'ice',label:'Ice'},{value:'flare',label:'Flare'},{value:'mono',label:'Mono'}]} onChange={v=>setTweak('mood',v)}/>
        <TweakSection label="Voice"/>
        <TweakRadio label="Voice" value={t.voice} options={[{value:'editorial',label:'Editorial'},{value:'modern',label:'Modern'},{value:'soft',label:'Soft'}]} onChange={v=>setTweak('voice',v)}/>
        <TweakSection label="Intensity"/>
        <TweakRadio label="Intensity" value={t.intensity} options={[{value:'calm',label:'Calm'},{value:'cinematic',label:'Cinema'},{value:'hyper',label:'Hyper'}]} onChange={v=>setTweak('intensity',v)}/>
      </TweaksPanel>
    </PageShell>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
