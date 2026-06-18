const TWEAK_DEFAULTS = {"mood":"acid","voice":"editorial","intensity":"cinematic"};

const SVCS = [
  {
    id:'ingenieries', n:'01', t:'Ingenieries', icon:<Icons.Cpu/>,
    img:'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=80&auto=format&fit=crop',
    sub:'Prescripcio, especificacio i assistencia tecnica',
    desc:"Col laborem amb ingenieries en la definicio tecnica dels sistemes, l'especificacio d'equips i l'assistencia durant totes les fases del projecte.",
    points:["Prescripcio de sistemes IT i AV","Especificacio d'equips i materials","Assistencia tecnica en obra","Dossiers tecnics i documentacio","Formacio per a l'equip tecnic"]
  },
  {
    id:'arquitectures', n:'02', t:'Arquitectures', icon:<Icons.Building/>,
    img:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop',
    sub:'Tecnologia integrada des de la fase de projecte',
    desc:"Treballem amb equips d'arquitectura per integrar la tecnologia des del disseny inicial, assegurant que els sistemes s'integrin de forma optima en l'espai.",
    points:["Consulta en fase de projecte","Disseny de passadissos i infraestructura","Integracio estetica de dispositius","Coordinacio amb altres industrials","Pressupost de tecnologia per al projecte"]
  },
  {
    id:'installadors', n:'03', t:'Installadors', icon:<Icons.Shield/>,
    img:'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80&auto=format&fit=crop',
    sub:'Subministre, preconfiguracio i suport en obra',
    desc:"Subministrem i preconfigurem equips per a installadors, oferint suport tecnic durant la installacio i la posada en marxa dels sistemes.",
    points:["Subministre d'equips certificats","Preconfiguracio de dispositius","Suport tecnic en obra","Posada en marxa i configuracio","Formacio i certificacio"]
  },
  {
    id:'disseny', n:'04', t:"Disseny d'Interiors", icon:<Icons.Screen/>,
    img:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80&auto=format&fit=crop',
    sub:"Tecnologia invisible, part del disseny",
    desc:"Assessorem dissenyadors d'interiors en la seleccio i integracio de tecnologia que es fongui amb l'estetica del projecte sense comprometre les prestacions.",
    points:["Seleccio de dispositius discrets","Pantalles i panells integrats","Il luminacio i control ambiental","Cable management estetic","Solucions sense fils quan es possible"]
  },
];
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(()=>{
    const r=document.documentElement;
    r.setAttribute('data-mood',t.mood);r.setAttribute('data-voice',t.voice);r.setAttribute('data-intensity',t.intensity);
  },[t.mood,t.voice,t.intensity]);
  return (
    <PageShell activePage="Serveis">
      <PageHero kicker="Serveis · Adaptat a cada sector" title="Per al teu sector" sub="Solucions tecnologiques adaptades a cada tipus de client: ingenieries, arquitectures, installadors i dissenyadors d'interiors." img="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1800&q=80&auto=format&fit=crop"/>
      {SVCS.map((s,i)=>(
        <section key={s.id} id={s.id} style={{padding:'100px 0',borderBottom:'1px solid var(--line)'}}>
          <div className="wrap-wide">
            <div style={{display:'grid',gridTemplateColumns:i%2===0?'1fr 1fr':'1fr 1fr',gap:80,alignItems:'center'}} className="srv-grid">
              {i%2===0 ? <>
                <Reveal>
                  <SectionLabel>{s.n} — Serveis</SectionLabel>
                  <h2 className="disp" style={{fontSize:'clamp(36px,5vw,72px)',marginBottom:12}}>{s.t}</h2>
                  <p style={{fontSize:14,color:'var(--accent)',fontFamily:'var(--mono)',letterSpacing:'.04em',marginBottom:20}}>{s.sub}</p>
                  <p style={{fontSize:16,color:'var(--mut)',lineHeight:1.8,marginBottom:28}}>{s.desc}</p>
                  <ul style={{listStyle:'none',marginBottom:36}}>
                    {s.points.map((p,j)=><li key={j} style={{display:'flex',alignItems:'center',gap:12,padding:'8px 0',borderBottom:'1px solid var(--line-soft)',fontSize:15}}><span style={{color:'var(--accent)'}}><Icons.Check/></span>{p}</li>)}
                  </ul>
                  <a href="contacta.html" className="btn btn-primary">Parla amb nosaltres <Icons.UpRight s={15}/></a>
                </Reveal>
                <Reveal delay={120}><div style={{borderRadius:20,overflow:'hidden',border:'1px solid var(--line)'}}><Cine src={s.img} alt={s.t} style={{height:460}}/></div></Reveal>
              </> : <>
                <Reveal delay={120}><div style={{borderRadius:20,overflow:'hidden',border:'1px solid var(--line)'}}><Cine src={s.img} alt={s.t} style={{height:460}}/></div></Reveal>
                <Reveal>
                  <SectionLabel>{s.n} — Serveis</SectionLabel>
                  <h2 className="disp" style={{fontSize:'clamp(36px,5vw,72px)',marginBottom:12}}>{s.t}</h2>
                  <p style={{fontSize:14,color:'var(--accent)',fontFamily:'var(--mono)',letterSpacing:'.04em',marginBottom:20}}>{s.sub}</p>
                  <p style={{fontSize:16,color:'var(--mut)',lineHeight:1.8,marginBottom:28}}>{s.desc}</p>
                  <ul style={{listStyle:'none',marginBottom:36}}>
                    {s.points.map((p,j)=><li key={j} style={{display:'flex',alignItems:'center',gap:12,padding:'8px 0',borderBottom:'1px solid var(--line-soft)',fontSize:15}}><span style={{color:'var(--accent)'}}><Icons.Check/></span>{p}</li>)}
                  </ul>
                  <a href="contacta.html" className="btn btn-primary">Parla amb nosaltres <Icons.UpRight s={15}/></a>
                </Reveal>
              </>}
            </div>
          </div>
          <style>{`.srv-grid{@media(max-width:860px){grid-template-columns:1fr!important;}}`}</style>
        </section>
      ))}
    </PageShell>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);