const TWEAK_DEFAULTS = {"mood":"acid","voice":"editorial","intensity":"cinematic"};

/* ════════════════════════════════════════════════════════════════════════════
   Mini conversor de Markdown → HTML (sense dependències externes).
   Suporta: ## i ### títols, **negreta**, *cursiva*, [enllaç](url),
   llistes amb "- " i paràgrafs separats per línia en blanc.
   El contingut prové dels fitxers de /articulos (autors de confiança).
   ════════════════════════════════════════════════════════════════════════════ */
function escapeHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function inlineMd(s){
  s = escapeHtml(s);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return s;
}
function mdToHtml(md){
  const lines = String(md).replace(/\r\n/g,'\n').split('\n');
  let html = '', para = [], listOpen = false;
  const flushPara = () => { if (para.length){ html += '<p>' + inlineMd(para.join(' ')) + '</p>'; para = []; } };
  const closeList = () => { if (listOpen){ html += '</ul>'; listOpen = false; } };
  for (const raw of lines){
    const line = raw.trim();
    if (!line){ flushPara(); closeList(); continue; }
    if (/^###\s+/.test(line)){ flushPara(); closeList(); html += '<h3>' + inlineMd(line.replace(/^###\s+/,'')) + '</h3>'; continue; }
    if (/^##\s+/.test(line)){ flushPara(); closeList(); html += '<h2>' + inlineMd(line.replace(/^##\s+/,'')) + '</h2>'; continue; }
    if (/^#\s+/.test(line)){ flushPara(); closeList(); html += '<h2>' + inlineMd(line.replace(/^#\s+/,'')) + '</h2>'; continue; }
    if (/^[-*•]\s+/.test(line)){ flushPara(); if (!listOpen){ html += '<ul>'; listOpen = true; } html += '<li>' + inlineMd(line.replace(/^[-*•]\s+/,'')) + '</li>'; continue; }
    para.push(line);
  }
  flushPara(); closeList();
  return html;
}

const ARTICLE_CSS = `
.article-body{font-size:17px;line-height:1.8;color:var(--mut);}
.article-body p{margin-bottom:18px;}
.article-body h2{font-family:var(--disp);font-weight:800;font-size:clamp(24px,3vw,30px);color:var(--ink);margin:44px 0 16px;letter-spacing:var(--dtrack);}
.article-body h3{font-family:var(--disp);font-weight:700;font-size:20px;color:var(--ink);margin:32px 0 12px;}
.article-body ul{list-style:disc;margin:16px 0 22px;padding-left:26px;}
.article-body li{margin-bottom:10px;}
.article-body strong{color:var(--ink);}
.article-body a{color:var(--accent-deep);text-decoration:underline;}
`;

function getParam(name){
  try { return new URLSearchParams(window.location.search).get(name); } catch(e){ return null; }
}

function App() {
  useLang();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [meta, setMeta] = useState(null);
  const [bodyHtml, setBodyHtml] = useState('');
  const [status, setStatus] = useState('loading'); // loading | ok | notfound
  const [others, setOthers] = useState([]);

  useEffect(()=>{
    const r=document.documentElement;
    r.setAttribute('data-mood',t.mood);r.setAttribute('data-voice',t.voice);r.setAttribute('data-intensity',t.intensity);
  },[t.mood,t.voice,t.intensity]);

  useEffect(()=>{
    const id = getParam('art');
    if (!id){ setStatus('notfound'); return; }
    let cancelled = false;
    (async ()=>{
      try {
        const index = await fetch('articulos/index.json', {cache:'no-cache'}).then(r=>r.json());
        const m = index.find(a => a.id === id);
        if (!m){ if(!cancelled) setStatus('notfound'); return; }
        const md = await fetch('articulos/' + id + '.md', {cache:'no-cache'}).then(r=>{ if(!r.ok) throw new Error('404'); return r.text(); });
        if (cancelled) return;
        setMeta(m);
        setBodyHtml(mdToHtml(md));
        setOthers(index.filter(a => a.id !== id).slice(0,3));
        setStatus('ok');
        try { document.title = m.title + ' | Ontec Blog'; } catch(e){}
      } catch(e){
        if (!cancelled) setStatus('notfound');
      }
    })();
    return ()=>{ cancelled = true; };
  },[]);

  if (status === 'loading'){
    return (
      <PageShell activePage="Blog">
        <section style={{minHeight:'70vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{fontFamily:'var(--mono)',fontSize:13,color:'var(--mut)',letterSpacing:'.1em'}}>
            {tt({ca:'Carregant article…',es:'Cargando artículo…',fr:'Chargement de l\'article…',en:'Loading article…'})}
          </div>
        </section>
      </PageShell>
    );
  }

  if (status === 'notfound'){
    return (
      <PageShell activePage="Blog">
        <section style={{minHeight:'70vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:24,textAlign:'center',padding:'120px 24px'}}>
          <h1 className="disp" style={{fontSize:'clamp(32px,5vw,56px)'}}>{tt({ca:'Article no trobat',es:'Artículo no encontrado',fr:'Article introuvable',en:'Article not found'})}</h1>
          <p style={{color:'var(--mut)',maxWidth:440}}>{tt({ca:"Aquest article no existeix o ha estat mogut.",es:'Este artículo no existe o ha sido movido.',fr:"Cet article n'existe pas ou a été déplacé.",en:'This article does not exist or has been moved.'})}</p>
          <a href="blog.html" className="btn btn-primary">{tt({ca:'Tornar al blog',es:'Volver al blog',fr:'Retour au blog',en:'Back to the blog'})} <Icons.UpRight s={15}/></a>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell activePage="Blog">
      <section style={{minHeight:'58vh',display:'flex',alignItems:'flex-end',background:'var(--panel-dark)',position:'relative',overflow:'hidden'}}>
        <Cine src={meta.img} alt={meta.title} parallax style={{position:'absolute',inset:0}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(8,18,12,.55) 0%,rgba(8,18,12,.45) 40%,rgba(8,18,12,.85) 100%)'}}/>
        <div className="wrap-wide" style={{position:'relative',zIndex:2,paddingTop:130,paddingBottom:70,maxWidth:880}}>
          <a href="blog.html" style={{display:'inline-flex',alignItems:'center',gap:8,fontFamily:'var(--mono)',fontSize:11.5,letterSpacing:'.12em',textTransform:'uppercase',color:'rgba(255,255,255,.72)',textDecoration:'none',marginBottom:24}}>← {tt({ca:'Blog',es:'Blog',fr:'Blog',en:'Blog'})}</a>
          <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:18}}>
            <Tag>{meta.tag}</Tag>
            <span style={{fontFamily:'var(--mono)',fontSize:12,color:'rgba(255,255,255,.6)'}}>{meta.date}</span>
            <span style={{fontFamily:'var(--mono)',fontSize:12,color:'rgba(255,255,255,.6)'}}>· {meta.readtime}</span>
          </div>
          <h1 className="disp" style={{fontSize:'clamp(34px,5vw,60px)',color:'#fff',lineHeight:1.15}}>{meta.title}</h1>
        </div>
      </section>

      <section style={{background:'var(--bg)',padding:'72px 0'}}>
        <div className="wrap" style={{maxWidth:740}}>
          <article className="article-body" dangerouslySetInnerHTML={{__html: bodyHtml}}/>

          <div style={{marginTop:72,paddingTop:56,borderTop:'1px solid var(--line)'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:56}} className="art-foot">
              <div>
                {others.length > 0 && <>
                  <h3 className="disp" style={{fontSize:26,marginBottom:26}}>{tt({ca:'Altres articles',es:'Otros artículos',fr:'Autres articles',en:'Other articles'})}</h3>
                  <div style={{display:'flex',flexDirection:'column',gap:16}}>
                    {others.map((a)=>(
                      <a key={a.id} href={`article.html?art=${a.id}`} style={{padding:'18px 20px',background:'var(--panel)',border:'1px solid var(--line)',borderRadius:12,textDecoration:'none',color:'var(--ink)',transition:'border-color .2s,background .2s'}}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.background='var(--panel-2)';}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--line)';e.currentTarget.style.background='var(--panel)';}}>
                        <div style={{fontFamily:'var(--mono)',fontSize:11,color:'var(--accent)',marginBottom:8}}>{a.tag}</div>
                        <div style={{fontWeight:600,fontSize:15,lineHeight:1.35}}>{a.title}</div>
                      </a>
                    ))}
                  </div>
                </>}
              </div>
              <div style={{position:'sticky',top:100,alignSelf:'start'}}>
                <div style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:14,padding:26}}>
                  <div style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--accent)',marginBottom:18}}>{tt({ca:'Sobre Ontec',es:'Sobre Ontec',fr:'À propos d\'Ontec',en:'About Ontec'})}</div>
                  <p style={{fontSize:14,color:'var(--mut)',lineHeight:1.7,marginBottom:18}}>
                    {tt({
                      ca:'Som especialistes en sistemes tecnològics avançats: IT Security, videoconferència, comunicacions i automatització per a empreses andorranes.',
                      es:'Somos especialistas en sistemas tecnológicos avanzados: IT Security, videoconferencia, comunicaciones y automatización para empresas andorranas.',
                      fr:'Nous sommes spécialistes des systèmes technologiques avancés : IT Security, visioconférence, communications et automatisation pour les entreprises andorranes.',
                      en:'We are specialists in advanced technology systems: IT Security, video conferencing, communications and automation for Andorran businesses.'
                    })}
                  </p>
                  <a href="contacta.html" className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'12px 16px'}}>{tt({ca:"Contacta'ns",es:'Contáctanos',fr:'Contactez-nous',en:'Contact us'})}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{ARTICLE_CSS}</style>
      <style>{`@media(max-width:760px){.art-foot{grid-template-columns:1fr!important;gap:40px!important;}}`}</style>
    </PageShell>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
