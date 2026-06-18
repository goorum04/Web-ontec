const TWEAK_DEFAULTS = {"mood":"acid","voice":"editorial","intensity":"cinematic"};

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({nom:'',empresa:'',email:'',tel:'',servei:'',missatge:''});
  const [err, setErr] = useState('');
  const handle = (k,v) => setForm(f=>({...f,[k]:v}));
  const submit = (e) => {
    e.preventDefault();
    if(!form.nom||!form.email||!form.missatge){setErr('Si us plau, omple els camps obligatoris.');return;}
    setSent(true); setErr('');
  };
  const field = (label, key, type='text', req=false, placeholder='') => (
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      <label style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--mut)'}}>{label}{req&&<span style={{color:'var(--accent)',marginLeft:4}}>*</span>}</label>
      <input type={type} value={form[key]} onChange={e=>handle(key,e.target.value)} placeholder={placeholder}
        style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:12,padding:'14px 18px',fontSize:15,color:'var(--ink)',outline:'none',transition:'border-color .2s',fontFamily:'var(--body)'}}
        onFocus={e=>e.target.style.borderColor=A(50)} onBlur={e=>e.target.style.borderColor='var(--line)'}/>
    </div>
  );
  if(sent) return (
    <div style={{textAlign:'center',padding:'60px 0'}}>
      <div style={{width:72,height:72,borderRadius:'50%',background:A(15),border:`1px solid ${A(30)}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px',color:'var(--accent)'}}>
        <Icons.Check/>
      </div>
      <h3 className="disp" style={{fontSize:36,marginBottom:16}}>Gracies, {form.nom}!</h3>
      <p style={{fontSize:17,color:'var(--mut)',lineHeight:1.7}}>Hem rebut la teva consulta i ens posarem en contacte en menys de 4 hores.</p>
    </div>
  );
  return (
    <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:20}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}} className="form-row">
        {field('Nom i cognoms','nom','text',true,'Joan Garcia')}
        {field('Empresa','empresa','text',false,'Empresa S.L.')}
        {field('Correu electronic','email','email',true,'joan@empresa.com')}
        {field('Telefon','tel','tel',false,'+376 XXX XXX')}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <label style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--mut)'}}>Servei d'interes</label>
        <select value={form.servei} onChange={e=>handle('servei',e.target.value)}
          style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:12,padding:'14px 18px',fontSize:15,color:form.servei?'var(--ink)':'var(--mut)',outline:'none',fontFamily:'var(--body)',cursor:'pointer'}}>
          <option value="">Selecciona una opcio...</option>
          <option>IT Security / Ciberseguretat</option>
          <option>Comunicacions i xarxes</option>
          <option>Automatitzacio KNX</option>
          <option>Audiovisuals i videoconferencia</option>
          <option>Altres / Consulta general</option>
        </select>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <label style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--mut)'}}>Missatge<span style={{color:'var(--accent)',marginLeft:4}}>*</span></label>
        <textarea value={form.missatge} onChange={e=>handle('missatge',e.target.value)} rows={5}
          placeholder="Descriu el teu projecte o consulta..."
          style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:12,padding:'14px 18px',fontSize:15,color:'var(--ink)',outline:'none',resize:'vertical',fontFamily:'var(--body)',lineHeight:1.6,transition:'border-color .2s'}}
          onFocus={e=>e.target.style.borderColor=A(50)} onBlur={e=>e.target.style.borderColor='var(--line)'}/>
      </div>
      {err && <p style={{fontFamily:'var(--mono)',fontSize:12.5,color:'#ff5f57'}}>{err}</p>}
      <button type="submit" className="btn btn-primary" style={{alignSelf:'flex-start',padding:'16px 32px'}}>
        Enviar consulta <Icons.UpRight s={15}/>
      </button>
      <style>{`.form-row{@media(max-width:640px){grid-template-columns:1fr!important;}}`}</style>
    </form>
  );
}
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(()=>{
    const r=document.documentElement;
    r.setAttribute('data-mood',t.mood);r.setAttribute('data-voice',t.voice);r.setAttribute('data-intensity',t.intensity);
  },[t.mood,t.voice,t.intensity]);
  return (
    <PageShell activePage="Contacta">
      <PageHero kicker="Contacta · Resposta en 4h" title="Parla amb l'equip" sub="Tens un projecte en ment? Explica'ns-ho i prepararem una proposta tecnica a mida sense compromis." img="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1800&q=80&auto=format&fit=crop"/>
      <section style={{padding:'100px 0'}}>
        <div className="wrap-wide">
          <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:80,alignItems:'start'}} className="contact-grid">
            <Reveal>
              <SectionLabel>Formulari de contacte</SectionLabel>
              <h2 className="disp" style={{fontSize:'clamp(36px,4vw,64px)',marginBottom:40}}>Envia'ns una consulta</h2>
              <ContactForm/>
            </Reveal>
            <div>
              <Reveal delay={120}>
                <div style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:20,padding:'36px',marginBottom:20}}>
                  <SectionLabel>Contacte directe</SectionLabel>
                  <div style={{display:'flex',flexDirection:'column',gap:20,marginTop:8}}>
                    {[
                      {icon:<Icons.Phone/>,label:'Telefon',val:'+376 88 55 99',href:'tel:+37688559'},
                      {icon:<Icons.Mail/>,label:'Email',val:'info@ontecandorra.com',href:'mailto:info@ontecandorra.com'},
                      {icon:<Icons.Pin/>,label:'Oficina',val:'C/ de la Vena 3, Baixos\nEncamp, Andorra',href:null},
                    ].map((item,i)=>(
                      <div key={i} style={{display:'flex',alignItems:'flex-start',gap:16}}>
                        <div style={{width:44,height:44,borderRadius:12,background:A(12),border:`1px solid ${A(25)}`,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--accent)',flexShrink:0}}>{item.icon}</div>
                        <div>
                          <div style={{fontFamily:'var(--mono)',fontSize:10.5,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--faint)',marginBottom:4}}>{item.label}</div>
                          {item.href ? <a href={item.href} style={{fontSize:16,color:'var(--ink)',textDecoration:'none'}}>{item.val}</a> : <span style={{fontSize:15,color:'var(--ink)',whiteSpace:'pre-line'}}>{item.val}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:20,padding:'28px'}}>
                  <div className="kicker" style={{marginBottom:14}}>Horari d'atencio</div>
                  {[['Dilluns — Divendres','9:00 — 18:00'],['Dissabte','Tancat'],['Urgencies tecni.','24/7 amb contracte']].map(([d,h])=>(
                    <div key={d} style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid var(--line-soft)',fontSize:14}}>
                      <span style={{color:'var(--mut)'}}>{d}</span>
                      <span style={{color:'var(--ink)',fontFamily:'var(--mono)',fontSize:12}}>{h}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:920px){.contact-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>
    </PageShell>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);