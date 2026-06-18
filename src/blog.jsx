const TWEAK_DEFAULTS = {"mood":"acid","voice":"editorial","intensity":"cinematic"};

const ARTICLES = [
  {
    id:'batllia-videoconferencia', tag:'Videoconferencia', date:'2025', readtime:'5 min',
    title:"Sistema de videoconferencia a la Batllia d'Andorra",
    excerpt:"Ontec ha instalmat el sistema de videoconferencia professional per als espais institucionals de la Batllia d'Andorra, permetent connexions d'alt nivell amb organismes internacionals.",
    img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop',
    featured:true
  },
  {
    id:'zero-trust-pimes', tag:'IT Security', date:'2024', readtime:'7 min',
    title:'Zero Trust: el nou paradigma de seguretat per a pimes andorranes',
    excerpt:"L'arquitectura Zero Trust ja no es exclusiva de grans corporacions. Expliquem com implementar-la en empreses petites i mitjanes a Andorra amb pressupost controlat.",
    img:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80&auto=format&fit=crop',
    featured:false
  },
  {
    id:'incibe-ciberseguretat', tag:'Ciberseguretat', date:'2024', readtime:'4 min',
    title:"INCIBE: per que tenir un tecnic certificat marca la diferencia",
    excerpt:"La col laboracio amb l'INCIBE (Instituto Nacional de Ciberseguridad) aporta un segell de qualitat i coneixement de primer nivell per als nostres serveis de ciberseguretat.",
    img:'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=900&q=80&auto=format&fit=crop',
    featured:false
  },
  {
    id:'knx-domotica', tag:'Domotica', date:'2023', readtime:'6 min',
    title:"La domotica KNX arriba als edificis premium d'Andorra",
    excerpt:"Com l'estandard internacional KNX esta transformant la gestio dels edificis d'alta gamma a Andorra, integrant llum, clima, seguretat i AV en un sol sistema.",
    img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop',
    featured:false
  },
  {
    id:'wifi6-empreses', tag:'Comunicacions', date:'2023', readtime:'5 min',
    title:'WiFi 6: la revoluccio de la connectivitat empresarial',
    excerpt:"El WiFi 6 multiplica la capacitat i redueix la latencia en entorns d'alta densitat. Analisi de les solucions Ubiquiti i Aruba per a empreses a Andorra.",
    img:'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80&auto=format&fit=crop',
    featured:false
  },
  {
    id:'av-sales-reunions', tag:'Audiovisuals', date:'2022', readtime:'4 min',
    title:'Disseny de sales de reunions per a l\'era hibrida',
    excerpt:"Com crear espais de col laboracio hibrids eficients amb tecnologia Sony, QSC i Shure. Guia practica per a arquitectes i empreses.",
    img:'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=900&q=80&auto=format&fit=crop',
    featured:false
  },
];
function BlogCard({a, big=false}) {
  return (
    <a href={`blog.html`} className="mcard" style={{display:'block'}}>
      <Cine src={a.img} alt={a.title} style={{height:big?380:220}}/>
      <div style={{padding:'24px 26px'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
          <Tag>{a.tag}</Tag>
          <span style={{fontFamily:'var(--mono)',fontSize:10.5,color:'var(--faint)'}}>{a.date}</span>
          <span style={{fontFamily:'var(--mono)',fontSize:10.5,color:'var(--faint)',marginLeft:'auto'}}>{a.readtime}</span>
        </div>
        <h3 style={{fontFamily:'var(--disp)',fontWeight:700,fontSize:big?24:18,color:'var(--ink)',lineHeight:1.3,letterSpacing:'-0.01em',marginBottom:12}}>{a.title}</h3>
        {big && <p style={{fontSize:15,color:'var(--mut)',lineHeight:1.7}}>{a.excerpt}</p>}
        <div style={{marginTop:16,display:'inline-flex',alignItems:'center',gap:8,fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--accent)'}}>Llegir mes <Icons.Arrow s={13}/></div>
      </div>
    </a>
  );
}
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeTag, setActiveTag] = useState('Tot');
  useEffect(()=>{
    const r=document.documentElement;
    r.setAttribute('data-mood',t.mood);r.setAttribute('data-voice',t.voice);r.setAttribute('data-intensity',t.intensity);
  },[t.mood,t.voice,t.intensity]);
  const tags = ['Tot','Videoconferencia','IT Security','Ciberseguretat','Domotica','Comunicacions','Audiovisuals'];
  const filtered = activeTag === 'Tot' ? ARTICLES : ARTICLES.filter(a=>a.tag===activeTag);
  return (
    <PageShell activePage="Blog">
      <PageHero kicker="Blog · Actualitat tecnologica" title="Noticies i tendencies" sub="Articles tecnics sobre IT Security, videoconferencia, domotica i les ultimes tendencies del sector a Andorra." img="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1800&q=80&auto=format&fit=crop"/>
      <section style={{padding:'80px 0 120px'}}>
        <div className="wrap-wide">
          <Reveal style={{marginBottom:40}}>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              {tags.map(tag=>(
                <button key={tag} onClick={()=>setActiveTag(tag)} style={{fontFamily:'var(--mono)',fontSize:11.5,letterSpacing:'.12em',textTransform:'uppercase',padding:'9px 20px',borderRadius:999,border:'1px solid',cursor:'pointer',transition:'all .2s',
                  background:activeTag===tag?'var(--accent)':'transparent',color:activeTag===tag?'var(--accent-ink)':'var(--mut)',borderColor:activeTag===tag?'var(--accent)':'var(--line)'}}>
                  {tag}
                </button>
              ))}
            </div>
          </Reveal>
          {filtered.length > 0 && (
            <>
              <Reveal style={{marginBottom:20}}>
                <BlogCard a={filtered[0]} big={true}/>
              </Reveal>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}} className="blog-main-grid">
                {filtered.slice(1).map((a,i)=>(
                  <Reveal key={a.id} delay={i*70}><BlogCard a={a}/></Reveal>
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