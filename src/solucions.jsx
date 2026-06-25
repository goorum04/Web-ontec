const TWEAK_DEFAULTS = {"mood":"acid","voice":"editorial","intensity":"cinematic"};

const SOLS_FULL = [
  {
    id:'it-security', n:'01', title:'IT Security',
    titleI18n:{ca:'IT Security',es:'IT Security',fr:'IT Security',en:'IT Security'},
    icon:<Icons.Shield/>,
    img:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80&auto=format&fit=crop',
    sub:{
      ca:'Proteccio integral de la infraestructura digital',
      es:'Protección integral de la infraestructura digital',
      fr:"Protection intégrale de l'infrastructure numérique",
      en:'Comprehensive protection of digital infrastructure'
    },
    desc:{
      ca:"La ciberseguretat es la base de qualsevol infraestructura tecnologica moderna. Ontec ofereix solucions completes de seguretat IT amb tecnologia Fortinet i Palo Alto Networks, incloent un tecnic certificat per l'INCIBE.",
      es:"La ciberseguridad es la base de cualquier infraestructura tecnológica moderna. Ontec ofrece soluciones completas de seguridad IT con tecnología Fortinet y Palo Alto Networks, incluyendo un técnico certificado por el INCIBE.",
      fr:"La cybersécurité est la base de toute infrastructure technologique moderne. Ontec propose des solutions complètes de sécurité IT avec les technologies Fortinet et Palo Alto Networks, dont un technicien certifié par l'INCIBE.",
      en:"Cybersecurity is the foundation of any modern technology infrastructure. Ontec provides complete IT security solutions with Fortinet and Palo Alto Networks technology, including an INCIBE-certified technician."
    },
    features:{
      ca:['Firewall NGFW Fortinet & Palo Alto','VPN i acces remot segur','Zero Trust Network Access','Monitorat SOC 24/7','Auditories de seguretat','Deteccio i resposta (EDR/XDR)'],
      es:['Firewall NGFW Fortinet & Palo Alto','VPN y acceso remoto seguro','Zero Trust Network Access','Monitorización SOC 24/7','Auditorías de seguridad','Detección y respuesta (EDR/XDR)'],
      fr:['Firewall NGFW Fortinet & Palo Alto','VPN et accès distant sécurisé','Zero Trust Network Access','Supervision SOC 24/7','Audits de sécurité','Détection et réponse (EDR/XDR)'],
      en:['Firewall NGFW Fortinet & Palo Alto','VPN and secure remote access','Zero Trust Network Access','24/7 SOC monitoring','Security audits','Detection and response (EDR/XDR)']
    },
    partners:['Fortinet','Palo Alto Networks','Cisco']
  },
  {
    id:'comunicacions', n:'02', title:'Comunicacions',
    titleI18n:{ca:'Comunicacions',es:'Comunicaciones',fr:'Communications',en:'Communications'},
    icon:<Icons.Wifi/>,
    img:'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80&auto=format&fit=crop',
    sub:{
      ca:"Connectivitat d'alt rendiment per a qualsevol entorn",
      es:'Conectividad de alto rendimiento para cualquier entorno',
      fr:'Connectivité haute performance pour tout environnement',
      en:'High-performance connectivity for any environment'
    },
    desc:{
      ca:"Dissenyem i despleguem infraestructures de comunicacions empresarials d'alta disponibilitat: xarxes WiFi, commutadors gestionats, sistemes de videoconferencia i telefonia IP.",
      es:'Diseñamos y desplegamos infraestructuras de comunicaciones empresariales de alta disponibilidad: redes WiFi, conmutadores gestionados, sistemas de videoconferencia y telefonía IP.',
      fr:'Nous concevons et déployons des infrastructures de communication d\'entreprise à haute disponibilité : réseaux WiFi, commutateurs administrés, systèmes de visioconférence et téléphonie IP.',
      en:'We design and deploy high-availability enterprise communications infrastructures: WiFi networks, managed switches, videoconferencing systems and IP telephony.'
    },
    features:{
      ca:['WiFi 6/6E empresarial Ubiquiti & Aruba','Commutadors gestionats HPE Aruba','Videoconferencia Cisco Webex & Teams','Telefonia IP i VOIP','Fibra optica i cablatge estructurat','SD-WAN i gestio centralitzada'],
      es:['WiFi 6/6E empresarial Ubiquiti & Aruba','Conmutadores gestionados HPE Aruba','Videoconferencia Cisco Webex & Teams','Telefonía IP y VOIP','Fibra óptica y cableado estructurado','SD-WAN y gestión centralizada'],
      fr:['WiFi 6/6E professionnel Ubiquiti & Aruba','Commutateurs administrés HPE Aruba','Visioconférence Cisco Webex & Teams','Téléphonie IP et VOIP','Fibre optique et câblage structuré','SD-WAN et gestion centralisée'],
      en:['Enterprise WiFi 6/6E Ubiquiti & Aruba','HPE Aruba managed switches','Cisco Webex & Teams videoconferencing','IP telephony and VOIP','Fiber optics and structured cabling','SD-WAN and centralized management']
    },
    partners:['Ubiquiti','Cisco','HPE Aruba']
  },
  {
    id:'automatitzacio', n:'03', title:'Automatitzacio',
    titleI18n:{ca:'Automatitzacio',es:'Automatización',fr:'Automatisation',en:'Automation'},
    icon:<Icons.Cpu/>,
    img:'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80&auto=format&fit=crop',
    sub:{
      ca:"Sistemes intel ligents per a edificis i llars",
      es:'Sistemas inteligentes para edificios y hogares',
      fr:'Systèmes intelligents pour bâtiments et habitations',
      en:'Intelligent systems for buildings and homes'
    },
    desc:{
      ca:"Integrem sistemes de domotica i BMS (Building Management Systems) amb l'estandard internacional KNX i solucions Crestron per a control total de llum, persianes, clima i seguretat.",
      es:'Integramos sistemas de domótica y BMS (Building Management Systems) con el estándar internacional KNX y soluciones Crestron para el control total de luz, persianas, clima y seguridad.',
      fr:'Nous intégrons des systèmes de domotique et de BMS (Building Management Systems) avec le standard international KNX et des solutions Crestron pour un contrôle total de l\'éclairage, des stores, du climat et de la sécurité.',
      en:'We integrate home automation and BMS (Building Management Systems) with the international KNX standard and Crestron solutions for full control of lighting, blinds, climate and security.'
    },
    features:{
      ca:['Domotica KNX per a edificis i llars','Control centralitzat Crestron','Il luminacio Lutron DALI/KNX','Gestio de clima i HVAC','Seguretat i control d\'acces','Integracio amb plataformes IoT'],
      es:['Domótica KNX para edificios y hogares','Control centralizado Crestron','Iluminación Lutron DALI/KNX','Gestión de clima y HVAC','Seguridad y control de acceso','Integración con plataformas IoT'],
      fr:['Domotique KNX pour bâtiments et habitations','Contrôle centralisé Crestron','Éclairage Lutron DALI/KNX','Gestion du climat et HVAC','Sécurité et contrôle d\'accès','Intégration avec plateformes IoT'],
      en:['KNX home automation for buildings and homes','Centralized Crestron control','Lutron DALI/KNX lighting','Climate and HVAC management','Security and access control','Integration with IoT platforms']
    },
    partners:['KNX','Crestron','Lutron']
  },
  {
    id:'audiovisuals', n:'04', title:'Audiovisuals & Videoconferencia',
    titleI18n:{
      ca:'Audiovisuals & Videoconferencia',
      es:'Audiovisuales & Videoconferencia',
      fr:'Audiovisuel & Visioconférence',
      en:'Audiovisual & Videoconferencing'
    },
    icon:<Icons.Video/>,
    img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop',
    sub:{
      ca:'Sistemes AV professionals i videoconferencia d\'alt nivell',
      es:'Sistemas A/V profesionales y videoconferencia de alto nivel',
      fr:'Systèmes A/V professionnels et visioconférence haut de gamme',
      en:'Professional A/V systems and high-end videoconferencing'
    },
    desc:{
      ca:"Dissenyem i instal lem sistemes audiovisuals professionals i sales de videoconferencia de primer nivell. Referencia: installacio a l'edifici emblemàtic de la seu de justicia per a connexions institucionals internacionals.",
      es:'Diseñamos e instalamos sistemas audiovisuales profesionales y salas de videoconferencia de primer nivel. Referencia: instalación en la sede de justicia para conexiones institucionales internacionales.',
      fr:'Nous concevons et installons des systèmes audiovisuels professionnels et des salles de visioconférence haut de gamme. Référence : installation au siège de la justice pour des connexions institutionnelles internationales.',
      en:'We design and install professional audiovisual systems and top-tier videoconferencing rooms. Reference: installation at the judicial center for international institutional connections.'
    },
    features:{
      ca:['Sales de videoconferencia Cisco Webex','Cameras PTZ Sony professionals','Pantalles interactives Samsung','Sistemes d\'audio QSC & Shure','Sistemes de presentacio wireless','Cas d\'exit: Seu de Justicia d\'Andorra'],
      es:['Salas de videoconferencia Cisco Webex','Cámaras PTZ Sony profesionales','Pantallas interactivas Samsung','Sistemas de audio QSC & Shure','Sistemas de presentación wireless','Caso de éxito: Sede de Justicia de Andorra'],
      fr:['Salles de visioconférence Cisco Webex','Caméras PTZ Sony professionnelles','Écrans interactifs Samsung','Systèmes audio QSC & Shure','Systèmes de présentation sans fil','Cas de réussite : Siège de la Justice d\'Andorre'],
      en:['Cisco Webex videoconferencing rooms','Professional Sony PTZ cameras','Samsung interactive displays','QSC & Shure audio systems','Wireless presentation systems','Success story: Judicial Center of Andorra']
    },
    partners:['Cisco','Sony','Samsung','QSC','Shure']
  },
];

const L = {
  featuresLabel:{ca:'Característiques',es:'Características',fr:'Caractéristiques',en:'Features'},
  requestQuote:{ca:'Sol licitar pressupost',es:'Solicitar presupuesto',fr:'Demander un devis',en:'Request a quote'},
  heroKicker:{ca:'Solucions · 4 arees',es:'Soluciones · 4 áreas',fr:'Solutions · 4 domaines',en:'Solutions · 4 areas'},
  heroTitle:{ca:'Tecnologia que funciona',es:'Tecnología que funciona',fr:'Une technologie qui fonctionne',en:'Technology that works'},
  heroSub:{
    ca:'IT Security, Comunicacions, Automatitzacio i Audiovisuals. Quatre arees especialitzades, un sol integrador de confianca.',
    es:'IT Security, Comunicaciones, Automatización y Audiovisuales. Cuatro áreas especializadas, un solo integrador de confianza.',
    fr:'IT Security, Communications, Automatisation et Audiovisuel. Quatre domaines spécialisés, un seul intégrateur de confiance.',
    en:'IT Security, Communications, Automation and Audiovisual. Four specialized areas, a single trusted integrator.'
  },
  ctaKicker:{ca:'Comencem?',es:'¿Empezamos?',fr:'On commence ?',en:'Shall we start?'},
  ctaTitle:{ca:'Tens un projecte?',es:'¿Tienes un proyecto?',fr:'Vous avez un projet ?',en:'Have a project?'},
  ctaSub:{
    ca:"Explica'ns les teves necessitats i prepararem una proposta a mida.",
    es:'Cuéntanos tus necesidades y prepararemos una propuesta a medida.',
    fr:'Parlez-nous de vos besoins et nous préparerons une proposition sur mesure.',
    en:'Tell us your needs and we will prepare a tailor-made proposal.'
  },
  contactNow:{ca:'Contacta ara',es:'Contacta ahora',fr:'Contactez-nous',en:'Contact us now'}
};

function SolucioSection({s, reverse=false}) {
  return (
    <section id={s.id} style={{padding:'100px 0',borderBottom:'1px solid var(--line)'}}>
      <div className="wrap-wide">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center',direction:reverse?'rtl':'ltr'}} className="sol-grid">
          <Reveal style={{direction:'ltr'}}>
            <SectionLabel>{s.n} — {tt(s.titleI18n)}</SectionLabel>
            <h2 className="disp" style={{fontSize:'clamp(36px,5vw,72px)',marginBottom:16}}>{tt(s.titleI18n)}</h2>
            <p style={{fontSize:15,color:'var(--accent)',fontFamily:'var(--mono)',letterSpacing:'.04em',marginBottom:20}}>{tt(s.sub)}</p>
            <p style={{fontSize:16,color:'var(--mut)',lineHeight:1.8,marginBottom:28}}>{tt(s.desc)}</p>
            <ul style={{listStyle:'none',marginBottom:36}}>
              {tt(s.features).map((f,i)=>(
                <li key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'8px 0',borderBottom:'1px solid var(--line-soft)',fontSize:15,color:'var(--ink)'}}>
                  <span style={{color:'var(--accent)',flexShrink:0}}><Icons.Check/></span>{f}
                </li>
              ))}
            </ul>
            <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:32}}>
              {s.partners.map(p=><Tag key={p}>{p}</Tag>)}
            </div>
            <a href="contacta.html" className="btn btn-primary">{tt(L.requestQuote)} <Icons.UpRight s={15}/></a>
          </Reveal>
          <Reveal delay={120} style={{direction:'ltr'}}>
            <div style={{borderRadius:20,overflow:'hidden',border:'1px solid var(--line)'}}>
              <Cine src={s.img} alt={s.title} style={{height:480}}/>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`.sol-grid{@media(max-width:860px){grid-template-columns:1fr!important;direction:ltr!important;}}`}</style>
    </section>
  );
}
function App() {
  useLang();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(()=>{
    const r=document.documentElement;
    r.setAttribute('data-mood',t.mood);r.setAttribute('data-voice',t.voice);r.setAttribute('data-intensity',t.intensity);
  },[t.mood,t.voice,t.intensity]);
  return (
    <PageShell activePage="Solucions">
      <PageHero kicker={tt(L.heroKicker)} title={tt(L.heroTitle)} sub={tt(L.heroSub)} img="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1800&q=80&auto=format&fit=crop"/>
      {SOLS_FULL.map((s,i)=><SolucioSection key={s.id} s={s} reverse={i%2===1}/>)}
      <section style={{padding:'100px 0',textAlign:'center'}}>
        <div className="wrap">
          <Reveal>
            <div className="kicker" style={{display:'flex',justifyContent:'center',marginBottom:20}}>{tt(L.ctaKicker)}</div>
            <h2 className="disp" style={{fontSize:'clamp(40px,6vw,96px)',marginBottom:28}}>{tt(L.ctaTitle)}</h2>
            <p style={{fontSize:18,color:'var(--mut)',lineHeight:1.7,maxWidth:520,margin:'0 auto 36px'}}>{tt(L.ctaSub)}</p>
            <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
              <a href="contacta.html" className="btn btn-primary">{tt(L.contactNow)} <Icons.UpRight s={15}/></a>
              <a href="tel:+37688559" className="btn btn-ghost"><Icons.Phone/> +376 88 55 99</a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);