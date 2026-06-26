const TWEAK_DEFAULTS = {"mood":"acid","voice":"editorial","intensity":"cinematic"};
const PARTNERS = [
  {name:'Cisco',cat:{ca:'Xarxa & Video',es:'Red y Vídeo',fr:'Réseau et Vidéo',en:'Network & Video'},desc:{ca:"Infraestructura de xarxa i solucions de col laboracio.",es:"Infraestructura de red y soluciones de colaboración.",fr:"Infrastructure réseau et solutions de collaboration.",en:"Network infrastructure and collaboration solutions."}},
  {name:'Ubiquiti',cat:{ca:'Xarxa WiFi',es:'Red WiFi',fr:'Réseau WiFi',en:'WiFi Network'},desc:{ca:"Xarxes WiFi professionals per a entorns exigents.",es:"Redes WiFi profesionales para entornos exigentes.",fr:"Réseaux WiFi professionnels pour environnements exigeants.",en:"Professional WiFi networks for demanding environments."}},
  {name:'KNX',cat:{ca:'Domotica',es:'Domótica',fr:'Domotique',en:'Home Automation'},desc:{ca:"Estandard internacional per a automatitzacio d'edificis.",es:"Estándar internacional para la automatización de edificios.",fr:"Standard international pour l'automatisation des bâtiments.",en:"International standard for building automation."}},
  {name:'Crestron',cat:{ca:'Control AV',es:'Control AV',fr:'Contrôle AV',en:'AV Control'},desc:{ca:"Sistemes de control AV per a sales executives.",es:"Sistemas de control AV para salas ejecutivas.",fr:"Systèmes de contrôle AV pour salles de direction.",en:"AV control systems for executive rooms."}},
  {name:'HPE Aruba',cat:{ca:'Xarxa',es:'Red',fr:'Réseau',en:'Network'},desc:{ca:"Solucions d'xarxa empresarial d'alta disponibilitat.",es:"Soluciones de red empresarial de alta disponibilidad.",fr:"Solutions réseau d'entreprise haute disponibilité.",en:"High-availability enterprise network solutions."}},
  {name:'Palo Alto',cat:{ca:'Seguretat',es:'Seguridad',fr:'Sécurité',en:'Security'},desc:{ca:"Plataforma de ciberseguretat Zero Trust.",es:"Plataforma de ciberseguridad Zero Trust.",fr:"Plateforme de cybersécurité Zero Trust.",en:"Zero Trust cybersecurity platform."}},
  {name:'Lutron',cat:{ca:'Llum & Persianes',es:'Luz y Persianas',fr:'Éclairage et Stores',en:'Light & Blinds'},desc:{ca:"Control de llum i persianes de precisio.",es:"Control de luz y persianas de precisión.",fr:"Contrôle d'éclairage et de stores de précision.",en:"Precision light and blind control."}},
  {name:'Samsung',cat:{ca:'Pantalles',es:'Pantallas',fr:'Écrans',en:'Displays'},desc:{ca:"Pantalles professionals per a entorns comercials.",es:"Pantallas profesionales para entornos comerciales.",fr:"Écrans professionnels pour environnements commerciaux.",en:"Professional displays for commercial environments."}},
  {name:'Sony',cat:{ca:'AV Pro',es:'AV Pro',fr:'AV Pro',en:'AV Pro'},desc:{ca:"Cameras PTZ i solucions audiovisuals professionals.",es:"Cámaras PTZ y soluciones audiovisuales profesionales.",fr:"Caméras PTZ et solutions audiovisuelles professionnelles.",en:"PTZ cameras and professional audiovisual solutions."}},
  {name:'QSC',cat:{ca:'Audio',es:'Audio',fr:'Audio',en:'Audio'},desc:{ca:"Processament d'audio professional per a grans espais.",es:"Procesamiento de audio profesional para grandes espacios.",fr:"Traitement audio professionnel pour grands espaces.",en:"Professional audio processing for large spaces."}},
  {name:'Shure',cat:{ca:'Microfonos',es:'Micrófonos',fr:'Microphones',en:'Microphones'},desc:{ca:"Microfonos i sistemes de conferencia de referencia.",es:"Micrófonos y sistemas de conferencia de referencia.",fr:"Microphones et systèmes de conférence de référence.",en:"Reference microphones and conference systems."}},
];
function App() {
  useLang();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(()=>{
    const r=document.documentElement;
    r.setAttribute('data-mood',t.mood);r.setAttribute('data-voice',t.voice);r.setAttribute('data-intensity',t.intensity);
  },[t.mood,t.voice,t.intensity]);
  const STATS = [
    {n:'200+',l:{ca:'Projectes lliurats',es:'Proyectos entregados',fr:'Projets livrés',en:'Projects delivered'}},
    {n:'8+',l:{ca:'Anys d\'experiencia',es:'Años de experiencia',fr:'Années d\'expérience',en:'Years of experience'}},
    {n:'12',l:{ca:'Partners certificats',es:'Partners certificados',fr:'Partenaires certifiés',en:'Certified partners'}},
    {n:'99.9%',l:{ca:'Uptime garantit',es:'Uptime garantizado',fr:'Disponibilité garantie',en:'Guaranteed uptime'}},
  ];
  return (
    <PageShell activePage="Empresa">
      <PageHero kicker={tt({ca:'Empresa · Des de 2016',es:'Empresa · Desde 2016',fr:'Entreprise · Depuis 2016',en:'Company · Since 2016'})} title={tt({ca:'Tecnologia amb proposit',es:'Tecnología con propósito',fr:'La technologie au service du sens',en:'Technology with purpose'})} sub={tt({ca:'Som distribuidors i integradors especialitzats en sistemes tecnologics avancats per a empreses i professionals a Andorra.',es:'Somos distribuidores e integradores especializados en sistemas tecnológicos avanzados para empresas y profesionales en Andorra.',fr:'Nous sommes distributeurs et intégrateurs spécialisés dans les systèmes technologiques avancés pour les entreprises et professionnels en Andorre.',en:'We are distributors and integrators specialized in advanced technology systems for businesses and professionals in Andorra.'})} img="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1800&q=80&auto=format&fit=crop"/>
      <section style={{padding:'100px 0'}}>
        <div className="wrap-wide">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center'}} className="about-grid">
            <Reveal>
              <SectionLabel>{tt({ca:'Qui som',es:'Quiénes somos',fr:'Qui sommes-nous',en:'Who we are'})}</SectionLabel>
              <h2 className="disp" style={{fontSize:'clamp(36px,5vw,72px)',marginBottom:28}}>{tt({ca:'8 anys integrant tecnologia a Andorra',es:'8 años integrando tecnología en Andorra',fr:'8 ans d\'intégration technologique en Andorre',en:'8 years integrating technology in Andorra'})}</h2>
              <p style={{fontSize:17,color:'var(--mut)',lineHeight:1.8,marginBottom:20}}>
                {tt({ca:'Des de 2016, Ontec ha estat el soci tecnologic de referencia per a empreses, arquitectes, ingenieries i dissenyadors d\'interiors que necessiten solucions avancades d\'IT Security, comunicacions, automatitzacio i audiovisuals.',es:'Desde 2016, Ontec ha sido el socio tecnológico de referencia para empresas, arquitectos, ingenierías y diseñadores de interiores que necesitan soluciones avanzadas de IT Security, comunicaciones, automatización y audiovisuales.',fr:'Depuis 2016, Ontec est le partenaire technologique de référence des entreprises, architectes, bureaux d\'études et designers d\'intérieur qui ont besoin de solutions avancées en IT Security, communications, automatisation et audiovisuel.',en:'Since 2016, Ontec has been the reference technology partner for companies, architects, engineering firms and interior designers who need advanced IT Security, communications, automation and audiovisual solutions.'})}
              </p>
              <p style={{fontSize:17,color:'var(--mut)',lineHeight:1.8,marginBottom:40}}>
                {tt({ca:'L\'equip d\'Ontec combina experiencia tecnica profunda amb una visio clara: la tecnologia ha d\'integrar-se de forma invisible i fiable en cada projecte. Per aixo treballem amb els millors fabricants del mon i oferim suport local rapid.',es:'El equipo de Ontec combina una profunda experiencia técnica con una visión clara: la tecnología debe integrarse de forma invisible y fiable en cada proyecto. Por eso trabajamos con los mejores fabricantes del mundo y ofrecemos soporte local rápido.',fr:'L\'équipe d\'Ontec allie une expertise technique approfondie à une vision claire : la technologie doit s\'intégrer de manière invisible et fiable dans chaque projet. C\'est pourquoi nous travaillons avec les meilleurs fabricants du monde et offrons un support local rapide.',en:'The Ontec team combines deep technical expertise with a clear vision: technology must integrate invisibly and reliably into every project. That\'s why we work with the world\'s best manufacturers and provide fast local support.'})}
              </p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
                {STATS.map((s,i)=>(
                  <div key={i} style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:14,padding:'22px'}}>
                    <div className="disp" style={{fontSize:'clamp(28px,4vw,44px)',color:'var(--accent)'}}>{s.n}</div>
                    <div style={{fontFamily:'var(--mono)',fontSize:10.5,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--mut)',marginTop:6}}>{tt(s.l)}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div style={{borderRadius:20,overflow:'hidden',border:'1px solid var(--line)'}}>
                <Cine src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop" alt="Equip Ontec" style={{height:500}}/>
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`.about-grid{@media(max-width:860px){grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
      </section>
      <section id="partners" style={{padding:'80px 0 120px',borderTop:'1px solid var(--line)'}}>
        <div className="wrap-wide">
          <Reveal style={{marginBottom:56,textAlign:'center'}}>
            <SectionLabel>{tt({ca:'Partners',es:'Partners',fr:'Partenaires',en:'Partners'})}</SectionLabel>
            <h2 className="disp" style={{fontSize:'clamp(36px,5vw,80px)'}}>{tt({ca:<>Els millors fabricants<br/>del mon</>,es:<>Los mejores fabricantes<br/>del mundo</>,fr:<>Les meilleurs fabricants<br/>du monde</>,en:<>The world's best<br/>manufacturers</>})}</h2>
          </Reveal>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}} className="partners-grid">
            {PARTNERS.map((p,i)=>(
              <Reveal key={p.name} delay={i*40}>
                <div style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:16,padding:'28px',transition:'border-color .2s,transform .3s cubic-bezier(.2,.7,.3,1)'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=A(35);e.currentTarget.style.transform='translateY(-4px)';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--line)';e.currentTarget.style.transform='none';}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
                    <div style={{fontFamily:'var(--disp)',fontWeight:800,fontSize:22,color:'var(--ink)',letterSpacing:'-0.02em'}}>{p.name}</div>
                    <Tag>{tt(p.cat)}</Tag>
                  </div>
                  <p style={{fontSize:14,color:'var(--mut)',lineHeight:1.6}}>{tt(p.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:860px){.partners-grid{grid-template-columns:1fr!important;}} @media(max-width:1200px){.partners-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
      </section>
      <TweaksPanel title="Tweaks">
        <TweakSection label="Mood"/><TweakRadio label="Mood" value={t.mood} options={[{value:'acid',label:'Acid'},{value:'ice',label:'Ice'},{value:'flare',label:'Flare'},{value:'mono',label:'Mono'}]} onChange={v=>setTweak('mood',v)}/>
        <TweakSection label="Voice"/><TweakRadio label="Voice" value={t.voice} options={[{value:'editorial',label:'Editorial'},{value:'modern',label:'Modern'},{value:'soft',label:'Soft'}]} onChange={v=>setTweak('voice',v)}/>
      </TweaksPanel>
    </PageShell>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);