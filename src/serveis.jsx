const TWEAK_DEFAULTS = {"mood":"acid","voice":"editorial","intensity":"cinematic"};

const SVCS = [
  {
    id:'ingenieries', n:'01', title:'Ingenieries', icon:<Icons.Cpu/>,
    titleI18n:{ca:'Ingenieries',es:'Ingenierías',fr:'Ingénieries',en:'Engineering'},
    img:'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=80&auto=format&fit=crop',
    sub:{ca:'Prescripcio, especificacio i assistencia tecnica',es:'Prescripción, especificación y asistencia técnica',fr:'Prescription, spécification et assistance technique',en:'Specification, prescription and technical assistance'},
    desc:{ca:"Col laborem amb ingenieries en la definicio tecnica dels sistemes, l'especificacio d'equips i l'assistencia durant totes les fases del projecte.",es:"Colaboramos con ingenierías en la definición técnica de los sistemas, la especificación de equipos y la asistencia durante todas las fases del proyecto.",fr:"Nous collaborons avec les bureaux d'ingénierie sur la définition technique des systèmes, la spécification des équipements et l'assistance tout au long des phases du projet.",en:"We work with engineering firms on the technical definition of systems, equipment specification and assistance throughout every phase of the project."},
    points:[
      {ca:"Prescripcio de sistemes IT i AV",es:"Prescripción de sistemas IT y AV",fr:"Prescription de systèmes IT et AV",en:"IT and AV system specification"},
      {ca:"Especificacio d'equips i materials",es:"Especificación de equipos y materiales",fr:"Spécification d'équipements et de matériaux",en:"Equipment and materials specification"},
      {ca:"Assistencia tecnica en obra",es:"Asistencia técnica en obra",fr:"Assistance technique sur chantier",en:"On-site technical assistance"},
      {ca:"Dossiers tecnics i documentacio",es:"Dossieres técnicos y documentación",fr:"Dossiers techniques et documentation",en:"Technical dossiers and documentation"},
      {ca:"Formacio per a l'equip tecnic",es:"Formación para el equipo técnico",fr:"Formation pour l'équipe technique",en:"Training for the technical team"}
    ]
  },
  {
    id:'arquitectures', n:'02', title:'Arquitectures', icon:<Icons.Building/>,
    titleI18n:{ca:'Arquitectures',es:'Arquitecturas',fr:'Architectures',en:'Architecture'},
    img:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format&fit=crop',
    sub:{ca:'Tecnologia integrada des de la fase de projecte',es:'Tecnología integrada desde la fase de proyecto',fr:'Technologie intégrée dès la phase de projet',en:'Technology integrated from the design phase'},
    desc:{ca:"Treballem amb equips d'arquitectura per integrar la tecnologia des del disseny inicial, assegurant que els sistemes s'integrin de forma optima en l'espai.",es:"Trabajamos con equipos de arquitectura para integrar la tecnología desde el diseño inicial, asegurando que los sistemas se integren de forma óptima en el espacio.",fr:"Nous travaillons avec les équipes d'architecture pour intégrer la technologie dès la conception initiale, en garantissant que les systèmes s'intègrent de manière optimale dans l'espace.",en:"We work with architecture teams to integrate technology from the initial design, ensuring systems blend optimally into the space."},
    points:[
      {ca:"Consulta en fase de projecte",es:"Consultoría en fase de proyecto",fr:"Conseil en phase de projet",en:"Consulting during the design phase"},
      {ca:"Disseny de passadissos i infraestructura",es:"Diseño de pasillos e infraestructura",fr:"Conception des passages et de l'infrastructure",en:"Design of routing and infrastructure"},
      {ca:"Integracio estetica de dispositius",es:"Integración estética de dispositivos",fr:"Intégration esthétique des dispositifs",en:"Aesthetic integration of devices"},
      {ca:"Coordinacio amb altres industrials",es:"Coordinación con otros industriales",fr:"Coordination avec les autres corps de métier",en:"Coordination with other trades"},
      {ca:"Pressupost de tecnologia per al projecte",es:"Presupuesto de tecnología para el proyecto",fr:"Budget technologique pour le projet",en:"Technology budget for the project"}
    ]
  },
  {
    id:'installadors', n:'03', title:'Installadors', icon:<Icons.Shield/>,
    titleI18n:{ca:'Installadors',es:'Instaladores',fr:'Installateurs',en:'Installers'},
    img:'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80&auto=format&fit=crop',
    sub:{ca:'Subministre, preconfiguracio i suport en obra',es:'Suministro, preconfiguración y soporte en obra',fr:'Fourniture, préconfiguration et support sur chantier',en:'Supply, preconfiguration and on-site support'},
    desc:{ca:"Subministrem i preconfigurem equips per a installadors, oferint suport tecnic durant la installacio i la posada en marxa dels sistemes.",es:"Suministramos y preconfiguramos equipos para instaladores, ofreciendo soporte técnico durante la instalación y la puesta en marcha de los sistemas.",fr:"Nous fournissons et préconfigurons les équipements pour les installateurs, en offrant un support technique pendant l'installation et la mise en service des systèmes.",en:"We supply and preconfigure equipment for installers, providing technical support during installation and system commissioning."},
    points:[
      {ca:"Subministre d'equips certificats",es:"Suministro de equipos certificados",fr:"Fourniture d'équipements certifiés",en:"Supply of certified equipment"},
      {ca:"Preconfiguracio de dispositius",es:"Preconfiguración de dispositivos",fr:"Préconfiguration des dispositifs",en:"Device preconfiguration"},
      {ca:"Suport tecnic en obra",es:"Soporte técnico en obra",fr:"Support technique sur chantier",en:"On-site technical support"},
      {ca:"Posada en marxa i configuracio",es:"Puesta en marcha y configuración",fr:"Mise en service et configuration",en:"Commissioning and configuration"},
      {ca:"Formacio i certificacio",es:"Formación y certificación",fr:"Formation et certification",en:"Training and certification"}
    ]
  },
  {
    id:'disseny', n:'04', title:"Disseny d'Interiors", icon:<Icons.Screen/>,
    titleI18n:{ca:"Disseny d'Interiors",es:"Diseño de Interiores",fr:"Design d'Intérieur",en:"Interior Design"},
    img:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80&auto=format&fit=crop',
    sub:{ca:"Tecnologia invisible, part del disseny",es:"Tecnología invisible, parte del diseño",fr:"Technologie invisible, partie du design",en:"Invisible technology, part of the design"},
    desc:{ca:"Assessorem dissenyadors d'interiors en la seleccio i integracio de tecnologia que es fongui amb l'estetica del projecte sense comprometre les prestacions.",es:"Asesoramos a diseñadores de interiores en la selección e integración de tecnología que se fusione con la estética del proyecto sin comprometer las prestaciones.",fr:"Nous conseillons les designers d'intérieur dans la sélection et l'intégration de technologies qui se fondent dans l'esthétique du projet sans compromettre les performances.",en:"We advise interior designers on selecting and integrating technology that blends with the project's aesthetic without compromising performance."},
    points:[
      {ca:"Seleccio de dispositius discrets",es:"Selección de dispositivos discretos",fr:"Sélection de dispositifs discrets",en:"Selection of discreet devices"},
      {ca:"Pantalles i panells integrats",es:"Pantallas y paneles integrados",fr:"Écrans et panneaux intégrés",en:"Integrated screens and panels"},
      {ca:"Il luminacio i control ambiental",es:"Iluminación y control ambiental",fr:"Éclairage et contrôle d'ambiance",en:"Lighting and ambient control"},
      {ca:"Cable management estetic",es:"Cable management estético",fr:"Gestion esthétique des câbles",en:"Aesthetic cable management"},
      {ca:"Solucions sense fils quan es possible",es:"Soluciones inalámbricas cuando es posible",fr:"Solutions sans fil lorsque c'est possible",en:"Wireless solutions where possible"}
    ]
  },
];
function App() {
  useLang();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(()=>{
    const r=document.documentElement;
    r.setAttribute('data-mood',t.mood);r.setAttribute('data-voice',t.voice);r.setAttribute('data-intensity',t.intensity);
  },[t.mood,t.voice,t.intensity]);
  return (
    <PageShell activePage="Serveis">
      <PageHero kicker={tt({ca:"Serveis · Adaptat a cada sector",es:"Servicios · Adaptado a cada sector",fr:"Services · Adapté à chaque secteur",en:"Services · Tailored to each sector"})} title={tt({ca:"Per al teu sector",es:"Para tu sector",fr:"Pour votre secteur",en:"For your sector"})} sub={tt({ca:"Solucions tecnologiques adaptades a cada tipus de client: ingenieries, arquitectures, installadors i dissenyadors d'interiors.",es:"Soluciones tecnológicas adaptadas a cada tipo de cliente: ingenierías, arquitecturas, instaladores y diseñadores de interiores.",fr:"Des solutions technologiques adaptées à chaque type de client : ingénieries, architectures, installateurs et designers d'intérieur.",en:"Technology solutions tailored to each type of client: engineering firms, architects, installers and interior designers."})} img="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1800&q=80&auto=format&fit=crop"/>
      {SVCS.map((s,i)=>(
        <section key={s.id} id={s.id} style={{padding:'100px 0',borderBottom:'1px solid var(--line)'}}>
          <div className="wrap-wide">
            <div style={{display:'grid',gridTemplateColumns:i%2===0?'1fr 1fr':'1fr 1fr',gap:80,alignItems:'center'}} className="srv-grid">
              {i%2===0 ? <>
                <Reveal>
                  <SectionLabel>{s.n} — {tt({ca:"Serveis",es:"Servicios",fr:"Services",en:"Services"})}</SectionLabel>
                  <h2 className="disp" style={{fontSize:'clamp(36px,5vw,72px)',marginBottom:12}}>{tt(s.titleI18n)}</h2>
                  <p style={{fontSize:14,color:'var(--accent)',fontFamily:'var(--mono)',letterSpacing:'.04em',marginBottom:20}}>{tt(s.sub)}</p>
                  <p style={{fontSize:16,color:'var(--mut)',lineHeight:1.8,marginBottom:28}}>{tt(s.desc)}</p>
                  <ul style={{listStyle:'none',marginBottom:36}}>
                    {s.points.map((p,j)=><li key={j} style={{display:'flex',alignItems:'center',gap:12,padding:'8px 0',borderBottom:'1px solid var(--line-soft)',fontSize:15}}><span style={{color:'var(--accent)'}}><Icons.Check/></span>{tt(p)}</li>)}
                  </ul>
                  <a href="contacta.html" className="btn btn-primary">{tt({ca:"Parla amb nosaltres",es:"Habla con nosotros",fr:"Parlez avec nous",en:"Talk to us"})} <Icons.UpRight s={15}/></a>
                </Reveal>
                <Reveal delay={120}><div style={{borderRadius:20,overflow:'hidden',border:'1px solid var(--line)'}}><Cine src={s.img} alt={s.title} style={{height:460}}/></div></Reveal>
              </> : <>
                <Reveal delay={120}><div style={{borderRadius:20,overflow:'hidden',border:'1px solid var(--line)'}}><Cine src={s.img} alt={s.title} style={{height:460}}/></div></Reveal>
                <Reveal>
                  <SectionLabel>{s.n} — {tt({ca:"Serveis",es:"Servicios",fr:"Services",en:"Services"})}</SectionLabel>
                  <h2 className="disp" style={{fontSize:'clamp(36px,5vw,72px)',marginBottom:12}}>{tt(s.titleI18n)}</h2>
                  <p style={{fontSize:14,color:'var(--accent)',fontFamily:'var(--mono)',letterSpacing:'.04em',marginBottom:20}}>{tt(s.sub)}</p>
                  <p style={{fontSize:16,color:'var(--mut)',lineHeight:1.8,marginBottom:28}}>{tt(s.desc)}</p>
                  <ul style={{listStyle:'none',marginBottom:36}}>
                    {s.points.map((p,j)=><li key={j} style={{display:'flex',alignItems:'center',gap:12,padding:'8px 0',borderBottom:'1px solid var(--line-soft)',fontSize:15}}><span style={{color:'var(--accent)'}}><Icons.Check/></span>{tt(p)}</li>)}
                  </ul>
                  <a href="contacta.html" className="btn btn-primary">{tt({ca:"Parla amb nosaltres",es:"Habla con nosotros",fr:"Parlez avec nous",en:"Talk to us"})} <Icons.UpRight s={15}/></a>
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