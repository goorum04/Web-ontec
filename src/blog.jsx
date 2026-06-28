const TWEAK_DEFAULTS = {"mood":"acid","voice":"editorial","intensity":"cinematic"};

/* Els articles es carreguen en temps d'execució des de /articulos/index.json.
   Per publicar un article nou NO cal compilar res: només editar fitxers de text
   a Hostinger. Vegeu articulos/COM-PUBLICAR.md
   Un article pot tenir "directHref" a index.json per enllaçar a una pàgina
   pròpia (p. ex. seu-justicia.html) en lloc del lector genèric d'articles. */

function BlogCard({a, big=false}) {
  const href = a.directHref || `article.html?art=${a.id}`;
  return (
    <a href={href} className="mcard" style={{display:'block'}}>
      <Cine src={a.img} alt={a.title} style={{height:big?380:220}}/>
      <div style={{padding:'24px 26px'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
          <Tag>{a.tag}</Tag>
          <span style={{fontFamily:'var(--mono)',fontSize:10.5,color:'var(--faint)'}}>{a.date}</span>
          <span style={{fontFamily:'var(--mono)',fontSize:10.5,color:'var(--faint)',marginLeft:'auto'}}>{a.readtime}</span>
        </div>
        <h3 style={{fontFamily:'var(--disp)',fontWeight:700,fontSize:big?24:18,color:'var(--ink)',lineHeight:1.3,letterSpacing:'-0.01em',marginBottom:12}}>{a.title}</h3>
        {big && <p style={{fontSize:15,color:'var(--mut)',lineHeight:1.7}}>{a.excerpt}</p>}
        <div style={{marginTop:16,display:'inline-flex',alignItems:'center',gap:8,fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--accent)'}}>{tt({ca:'Llegir més',es:'Leer más',fr:'Lire plus',en:'Read more'})} <Icons.Arrow s={13}/></div>
      </div>
    </a>
  );
}

function App() {
  useLang();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [articles, setArticles] = useState(null);
  const [activeTag, setActiveTag] = useState('all');
  useEffect(()=>{
    const r=document.documentElement;
    r.setAttribute('data-mood',t.mood);r.setAttribute('data-voice',t.voice);r.setAttribute('data-intensity',t.intensity);
  },[t.mood,t.voice,t.intensity]);

  useEffect(()=>{
    let cancelled = false;
    fetch('articulos/index.json', {cache:'no-cache'})
      .then(r=>r.json())
      .then(data=>{ if(!cancelled) setArticles(Array.isArray(data)?data:[]); })
      .catch(()=>{ if(!cancelled) setArticles([]); });
    return ()=>{ cancelled = true; };
  },[]);

  const list = articles || [];
  // tags únics derivats dels articles (manté el blog autònom)
  const uniqueTags = [];
  list.forEach(a=>{ if(a.tag && !uniqueTags.includes(a.tag)) uniqueTags.push(a.tag); });
  const filtered = activeTag === 'all' ? list : list.filter(a=>a.tag===activeTag);

  return (
    <PageShell activePage="Blog">
      <PageHero kicker={tt({ca:'Blog · Actualitat tecnològica',es:'Blog · Actualidad tecnológica',fr:'Blog · Actualité technologique',en:'Blog · Technology news'})} title={tt({ca:'Notícies i tendències',es:'Noticias y tendencias',fr:'Actualités et tendances',en:'News and trends'})} sub={tt({ca:'Articles tècnics sobre IT Security, videoconferència, domòtica i les últimes tendències del sector a Andorra.',es:'Artículos técnicos sobre IT Security, videoconferencia, domótica y las últimas tendencias del sector en Andorra.',fr:'Articles techniques sur l\'IT Security, la visioconférence, la domotique et les dernières tendances du secteur en Andorre.',en:'Technical articles on IT Security, video conferencing, home automation and the latest trends in the sector in Andorra.'})} img="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1800&q=80&auto=format&fit=crop"/>
      <section style={{padding:'80px 0 120px'}}>
        <div className="wrap-wide">
          {uniqueTags.length > 0 && (
            <Reveal style={{marginBottom:40}}>
              <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                {[{id:'all',label:tt({ca:'Tot',es:'Todo',fr:'Tout',en:'All'})}, ...uniqueTags.map(tg=>({id:tg,label:tg}))].map(tg=>(
                  <button key={tg.id} onClick={()=>setActiveTag(tg.id)} style={{fontFamily:'var(--mono)',fontSize:11.5,letterSpacing:'.12em',textTransform:'uppercase',padding:'9px 20px',borderRadius:999,border:'1px solid',cursor:'pointer',transition:'all .2s',
                    background:activeTag===tg.id?'var(--accent)':'transparent',color:activeTag===tg.id?'var(--accent-ink)':'var(--mut)',borderColor:activeTag===tg.id?'var(--accent)':'var(--line)'}}>
                    {tg.label}
                  </button>
                ))}
              </div>
            </Reveal>
          )}

          {articles === null && (
            <div style={{fontFamily:'var(--mono)',fontSize:13,color:'var(--mut)',letterSpacing:'.1em',padding:'40px 0'}}>
              {tt({ca:'Carregant articles…',es:'Cargando artículos…',fr:'Chargement des articles…',en:'Loading articles…'})}
            </div>
          )}

          {articles !== null && filtered.length === 0 && (
            <div style={{fontFamily:'var(--mono)',fontSize:13,color:'var(--mut)',letterSpacing:'.1em',padding:'40px 0'}}>
              {tt({ca:'Encara no hi ha articles publicats.',es:'Todavía no hay artículos publicados.',fr:'Aucun article publié pour le moment.',en:'No articles published yet.'})}
            </div>
          )}

          {filtered.length > 0 && (
            <>
              <Reveal style={{marginBottom:20}}>
                <BlogCard a={filtered[0]} big={true}/>
              </Reveal>
              {filtered.length > 1 && (
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}} className="blog-main-grid">
                  {filtered.slice(1).map((a,i)=>(
                    <Reveal key={a.id} delay={i*70}><BlogCard a={a}/></Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <style>{`@media(max-width:860px){.blog-main-grid{grid-template-columns:1fr!important;}} @media(max-width:1100px){.blog-main-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
      </section>
    </PageShell>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
