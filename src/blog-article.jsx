const TWEAK_DEFAULTS = {"mood":"acid","voice":"editorial","intensity":"cinematic"};

function BlogArticle({ id, tag, date, readtime, title, author='Ontec', content }) {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(()=>{
    const r=document.documentElement;
    r.setAttribute('data-mood',t.mood);r.setAttribute('data-voice',t.voice);r.setAttribute('data-intensity',t.intensity);
  },[t.mood,t.voice,t.intensity]);

  const relatedArticles = [
    {title:"Ciberseguretat empresarial 2025",href:"#"},
    {title:"Tendencies en infraestructura tecnològica",href:"#"},
    {title:"Transformació digital a Andorra",href:"#"},
  ];

  return (
    <PageShell activePage="Blog">
      <section style={{minHeight:'60vh',display:'flex',alignItems:'flex-end',background:'var(--panel-dark)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(8,18,12,.7) 0%,rgba(8,18,12,.4) 100%)'}}/>
        <div className="wrap-wide" style={{position:'relative',zIndex:2,paddingTop:120,paddingBottom:80,maxWidth:800}}>
          <div style={{marginBottom:28}}>
            <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:18}}>
              <Tag>{tag}</Tag>
              <span style={{fontFamily:'var(--mono)',fontSize:12,color:'rgba(255,255,255,.6)'}}>{date}</span>
            </div>
            <h1 className="disp" style={{fontSize:'clamp(40px,5vw,64px)',color:'#fff',lineHeight:1.15,marginBottom:20}}>{title}</h1>
            <div style={{display:'flex',alignItems:'center',gap:20,fontFamily:'var(--mono)',fontSize:13,color:'rgba(255,255,255,.7)'}}>
              <span>{readtime}</span>
              <span>·</span>
              <span>Per {author}</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{background:'var(--bg)',padding:'80px 0'}}>
        <div className="wrap" style={{maxWidth:720}}>
          <article style={{fontSize:16,lineHeight:1.8,color:'var(--mut)'}}>
            {content}
          </article>

          <div style={{marginTop:80,paddingTop:60,borderTop:'1px solid var(--line)'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:60}}>
              <div>
                <h3 className="disp" style={{fontSize:28,marginBottom:32}}>Articles relacionats</h3>
                <div style={{display:'flex',flexDirection:'column',gap:20}}>
                  {relatedArticles.map((art,i)=>(
                    <a key={i} href={art.href} style={{padding:'20px',background:'var(--panel)',border:'1px solid var(--line)',borderRadius:12,textDecoration:'none',color:'var(--ink)',transition:'border-color .2s,background .2s'}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.background='var(--panel-2)';}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--line)';e.currentTarget.style.background='var(--panel)';}}>
                      <div style={{fontFamily:'var(--mono)',fontSize:11,color:'var(--accent)',marginBottom:8}}>ARTICLE</div>
                      <div style={{fontWeight:600,fontSize:15}}>{art.title}</div>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{position:'sticky',top:100}}>
                <div style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:14,padding:28}}>
                  <div style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--accent)',marginBottom:20}}>Sobre Ontec</div>
                  <p style={{fontSize:14,color:'var(--mut)',lineHeight:1.7,marginBottom:20}}>
                    Som especialistes en sistemes tecnològics avancats: IT Security, videoconferència, comunicacions i automatització per a empreses andorranes.
                  </p>
                  <a href="contacta.html" className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'12px 16px'}}>Contacta'ns</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BlogArticle {...ARTICLE_DATA}/>);
