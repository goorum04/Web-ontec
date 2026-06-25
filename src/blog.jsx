const TWEAK_DEFAULTS = {"mood":"acid","voice":"editorial","intensity":"cinematic"};

const ARTICLES = [
  {
    id:'batllia-videoconferencia', tagId:'video',
    tag:{ca:'Videoconferencia',es:'Videoconferencia',fr:'Visioconférence',en:'Video conferencing'},
    date:'2025', readtime:'5 min',
    title:{
      ca:"Sistema de videoconferencia per a la seu de justicia d'Andorra",
      es:"Sistema de videoconferencia para la sede de justicia de Andorra",
      fr:"Système de visioconférence pour le siège de la justice d'Andorre",
      en:"Video conferencing system for the judicial center of Andorra"
    },
    excerpt:{
      ca:"Ontec ha instal·lat el sistema de videoconferencia professional per als espais de l'edifici emblemàtic de la seu de justicia, permetent connexions d'alt nivell amb organismes internacionals.",
      es:"Ontec ha instalado el sistema de videoconferencia profesional para los espacios del edificio emblemático de la sede de justicia, permitiendo conexiones de alto nivel con organismos internacionales.",
      fr:"Ontec a installé le système de visioconférence professionnel pour les espaces du bâtiment emblématique du siège de la justice, permettant des connexions de haut niveau avec des organismes internationaux.",
      en:"Ontec has installed the professional video conferencing system for the spaces of the emblematic judicial building, enabling high-level connections with international organizations."
    },
    img:'https://d8j0ntlcm91z4.cloudfront.net/user_3CrRWyLJlKarEWqwmRMbcLE2UCZ/hf_20260625_113547_7dc81eb6-4452-4f0e-b974-47df8ed10343.png',
    featured:true
  },
  {
    id:'zero-trust-pimes', tagId:'itsec',
    tag:{ca:'IT Security',es:'IT Security',fr:'IT Security',en:'IT Security'},
    date:'2024', readtime:'7 min',
    title:{
      ca:'Zero Trust: el nou paradigma de seguretat per a pimes andorranes',
      es:'Zero Trust: el nuevo paradigma de seguridad para pymes andorranas',
      fr:'Zero Trust : le nouveau paradigme de sécurité pour les PME andorranes',
      en:'Zero Trust: the new security paradigm for Andorran SMEs'
    },
    excerpt:{
      ca:"L'arquitectura Zero Trust ja no es exclusiva de grans corporacions. Expliquem com implementar-la en empreses petites i mitjanes a Andorra amb pressupost controlat.",
      es:"La arquitectura Zero Trust ya no es exclusiva de las grandes corporaciones. Explicamos cómo implementarla en pequeñas y medianas empresas en Andorra con un presupuesto controlado.",
      fr:"L'architecture Zero Trust n'est plus réservée aux grandes entreprises. Nous expliquons comment l'implémenter dans les petites et moyennes entreprises en Andorre avec un budget maîtrisé.",
      en:"The Zero Trust architecture is no longer exclusive to large corporations. We explain how to implement it in small and medium-sized businesses in Andorra with a controlled budget."
    },
    img:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80&auto=format&fit=crop',
    featured:false
  },
  {
    id:'incibe-ciberseguretat', tagId:'ciber',
    tag:{ca:'Ciberseguretat',es:'Ciberseguridad',fr:'Cybersécurité',en:'Cybersecurity'},
    date:'2024', readtime:'4 min',
    title:{
      ca:"INCIBE: per que tenir un tecnic certificat marca la diferencia",
      es:"INCIBE: por qué tener un técnico certificado marca la diferencia",
      fr:"INCIBE : pourquoi disposer d'un technicien certifié fait la différence",
      en:"INCIBE: why having a certified technician makes the difference"
    },
    excerpt:{
      ca:"La col laboracio amb l'INCIBE (Instituto Nacional de Ciberseguridad) aporta un segell de qualitat i coneixement de primer nivell per als nostres serveis de ciberseguretat.",
      es:"La colaboración con el INCIBE (Instituto Nacional de Ciberseguridad) aporta un sello de calidad y conocimiento de primer nivel a nuestros servicios de ciberseguridad.",
      fr:"La collaboration avec l'INCIBE (Instituto Nacional de Ciberseguridad) apporte un gage de qualité et un savoir-faire de premier ordre à nos services de cybersécurité.",
      en:"The collaboration with INCIBE (Instituto Nacional de Ciberseguridad) brings a seal of quality and first-class expertise to our cybersecurity services."
    },
    img:'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=900&q=80&auto=format&fit=crop',
    featured:false
  },
  {
    id:'knx-domotica', tagId:'domotica',
    tag:{ca:'Domotica',es:'Domótica',fr:'Domotique',en:'Home automation'},
    date:'2023', readtime:'6 min',
    title:{
      ca:"La domotica KNX arriba als edificis premium d'Andorra",
      es:"La domótica KNX llega a los edificios premium de Andorra",
      fr:"La domotique KNX arrive dans les bâtiments premium d'Andorre",
      en:"KNX home automation reaches Andorra's premium buildings"
    },
    excerpt:{
      ca:"Com l'estandard internacional KNX esta transformant la gestio dels edificis d'alta gamma a Andorra, integrant llum, clima, seguretat i AV en un sol sistema.",
      es:"Cómo el estándar internacional KNX está transformando la gestión de los edificios de alta gama en Andorra, integrando luz, clima, seguridad y AV en un solo sistema.",
      fr:"Comment le standard international KNX transforme la gestion des bâtiments haut de gamme en Andorre, en intégrant l'éclairage, le climat, la sécurité et l'AV dans un seul système.",
      en:"How the international KNX standard is transforming the management of high-end buildings in Andorra, integrating lighting, climate, security and AV into a single system."
    },
    img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop',
    featured:false
  },
  {
    id:'wifi6-empreses', tagId:'comun',
    tag:{ca:'Comunicacions',es:'Comunicaciones',fr:'Communications',en:'Communications'},
    date:'2023', readtime:'5 min',
    title:{
      ca:'WiFi 6: la revoluccio de la connectivitat empresarial',
      es:'WiFi 6: la revolución de la conectividad empresarial',
      fr:'WiFi 6 : la révolution de la connectivité en entreprise',
      en:'WiFi 6: the revolution in enterprise connectivity'
    },
    excerpt:{
      ca:"El WiFi 6 multiplica la capacitat i redueix la latencia en entorns d'alta densitat. Analisi de les solucions Ubiquiti i Aruba per a empreses a Andorra.",
      es:"El WiFi 6 multiplica la capacidad y reduce la latencia en entornos de alta densidad. Análisis de las soluciones Ubiquiti y Aruba para empresas en Andorra.",
      fr:"Le WiFi 6 multiplie la capacité et réduit la latence dans les environnements à haute densité. Analyse des solutions Ubiquiti et Aruba pour les entreprises en Andorre.",
      en:"WiFi 6 multiplies capacity and reduces latency in high-density environments. An analysis of the Ubiquiti and Aruba solutions for companies in Andorra."
    },
    img:'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80&auto=format&fit=crop',
    featured:false
  },
  {
    id:'av-sales-reunions', tagId:'av',
    tag:{ca:'Audiovisuals',es:'Audiovisuales',fr:'Audiovisuel',en:'Audiovisual'},
    date:'2022', readtime:'4 min',
    title:{
      ca:'Disseny de sales de reunions per a l\'era hibrida',
      es:'Diseño de salas de reuniones para la era híbrida',
      fr:'Conception de salles de réunion pour l\'ère hybride',
      en:'Designing meeting rooms for the hybrid era'
    },
    excerpt:{
      ca:"Com crear espais de col laboracio hibrids eficients amb tecnologia Sony, QSC i Shure. Guia practica per a arquitectes i empreses.",
      es:"Cómo crear espacios de colaboración híbridos eficientes con tecnología Sony, QSC y Shure. Guía práctica para arquitectos y empresas.",
      fr:"Comment créer des espaces de collaboration hybrides efficaces avec la technologie Sony, QSC et Shure. Guide pratique pour les architectes et les entreprises.",
      en:"How to create efficient hybrid collaboration spaces with Sony, QSC and Shure technology. A practical guide for architects and businesses."
    },
    img:'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=900&q=80&auto=format&fit=crop',
    featured:false
  },
];
function BlogCard({a, big=false, idx=0}) {
  return (
    <a href={`blog-${idx+1}.html`} className="mcard" style={{display:'block'}}>
      <Cine src={a.img} alt={tt(a.title)} style={{height:big?380:220}}/>
      <div style={{padding:'24px 26px'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
          <Tag>{tt(a.tag)}</Tag>
          <span style={{fontFamily:'var(--mono)',fontSize:10.5,color:'var(--faint)'}}>{a.date}</span>
          <span style={{fontFamily:'var(--mono)',fontSize:10.5,color:'var(--faint)',marginLeft:'auto'}}>{a.readtime}</span>
        </div>
        <h3 style={{fontFamily:'var(--disp)',fontWeight:700,fontSize:big?24:18,color:'var(--ink)',lineHeight:1.3,letterSpacing:'-0.01em',marginBottom:12}}>{tt(a.title)}</h3>
        {big && <p style={{fontSize:15,color:'var(--mut)',lineHeight:1.7}}>{tt(a.excerpt)}</p>}
        <div style={{marginTop:16,display:'inline-flex',alignItems:'center',gap:8,fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--accent)'}}>{tt({ca:'Llegir mes',es:'Leer más',fr:'Lire plus',en:'Read more'})} <Icons.Arrow s={13}/></div>
      </div>
    </a>
  );
}
function App() {
  useLang();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeTag, setActiveTag] = useState('all');
  useEffect(()=>{
    const r=document.documentElement;
    r.setAttribute('data-mood',t.mood);r.setAttribute('data-voice',t.voice);r.setAttribute('data-intensity',t.intensity);
  },[t.mood,t.voice,t.intensity]);
  const tags = [
    {id:'all',label:{ca:'Tot',es:'Todo',fr:'Tout',en:'All'}},
    {id:'video',label:{ca:'Videoconferencia',es:'Videoconferencia',fr:'Visioconférence',en:'Video conferencing'}},
    {id:'itsec',label:{ca:'IT Security',es:'IT Security',fr:'IT Security',en:'IT Security'}},
    {id:'ciber',label:{ca:'Ciberseguretat',es:'Ciberseguridad',fr:'Cybersécurité',en:'Cybersecurity'}},
    {id:'domotica',label:{ca:'Domotica',es:'Domótica',fr:'Domotique',en:'Home automation'}},
    {id:'comun',label:{ca:'Comunicacions',es:'Comunicaciones',fr:'Communications',en:'Communications'}},
    {id:'av',label:{ca:'Audiovisuals',es:'Audiovisuales',fr:'Audiovisuel',en:'Audiovisual'}},
  ];
  const filtered = activeTag === 'all' ? ARTICLES : ARTICLES.filter(a=>a.tagId===activeTag);
  return (
    <PageShell activePage="Blog">
      <PageHero kicker={tt({ca:'Blog · Actualitat tecnologica',es:'Blog · Actualidad tecnológica',fr:'Blog · Actualité technologique',en:'Blog · Technology news'})} title={tt({ca:'Noticies i tendencies',es:'Noticias y tendencias',fr:'Actualités et tendances',en:'News and trends'})} sub={tt({ca:'Articles tecnics sobre IT Security, videoconferencia, domotica i les ultimes tendencies del sector a Andorra.',es:'Artículos técnicos sobre IT Security, videoconferencia, domótica y las últimas tendencias del sector en Andorra.',fr:'Articles techniques sur l\'IT Security, la visioconférence, la domotique et les dernières tendances du secteur en Andorre.',en:'Technical articles on IT Security, video conferencing, home automation and the latest trends in the sector in Andorra.'})} img="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1800&q=80&auto=format&fit=crop"/>
      <section style={{padding:'80px 0 120px'}}>
        <div className="wrap-wide">
          <Reveal style={{marginBottom:40}}>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              {tags.map(t=>(
                <button key={t.id} onClick={()=>setActiveTag(t.id)} style={{fontFamily:'var(--mono)',fontSize:11.5,letterSpacing:'.12em',textTransform:'uppercase',padding:'9px 20px',borderRadius:999,border:'1px solid',cursor:'pointer',transition:'all .2s',
                  background:activeTag===t.id?'var(--accent)':'transparent',color:activeTag===t.id?'var(--accent-ink)':'var(--mut)',borderColor:activeTag===t.id?'var(--accent)':'var(--line)'}}>
                  {tt(t.label)}
                </button>
              ))}
            </div>
          </Reveal>
          {filtered.length > 0 && (
            <>
              <Reveal style={{marginBottom:20}}>
                <BlogCard a={filtered[0]} big={true} idx={ARTICLES.indexOf(filtered[0])}/>
              </Reveal>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}} className="blog-main-grid">
                {filtered.slice(1).map((a,i)=>(
                  <Reveal key={a.id} delay={i*70}><BlogCard a={a} idx={ARTICLES.indexOf(a)}/></Reveal>
                ))}
              </div>
            </>
          )}
        </div>
        <style>{`@media(max-width:860px){.blog-main-grid{grid-template-columns:1fr!important;}} @media(max-width:1100px){.blog-main-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
      </section>
    </PageShell>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
