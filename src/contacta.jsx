const TWEAK_DEFAULTS = {"mood":"acid","voice":"editorial","intensity":"cinematic"};

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({nom:'',empresa:'',email:'',tel:'',servei:'',missatge:''});
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState('');
  const handle = (k,v) => setForm(f=>({...f,[k]:v}));
  const submit = (e) => {
    e.preventDefault();
    if(!form.nom||!form.email||!form.missatge){setErr(tt({ca:'Si us plau, omple els camps obligatoris.',es:'Por favor, rellena los campos obligatorios.',fr:'Veuillez remplir les champs obligatoires.',en:'Please fill in the required fields.'}));return;}
    if(!consent){setErr(tt({ca:"Has d'acceptar la política de privacitat per continuar.",es:'Debes aceptar la política de privacidad para continuar.',fr:'Vous devez accepter la politique de confidentialité pour continuer.',en:'You must accept the privacy policy to continue.'}));return;}
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
      <h3 className="disp" style={{fontSize:36,marginBottom:16}}>{tt({ca:'Gracies',es:'Gracias',fr:'Merci',en:'Thank you'})}, {form.nom}!</h3>
      <p style={{fontSize:17,color:'var(--mut)',lineHeight:1.7}}>{tt({ca:'Hem rebut la teva consulta i ens posarem en contacte en menys de 4 hores.',es:'Hemos recibido tu consulta y nos pondremos en contacto en menos de 4 horas.',fr:'Nous avons bien reçu votre demande et vous recontacterons sous moins de 4 heures.',en:'We have received your enquiry and will get in touch within 4 hours.'})}</p>
    </div>
  );
  return (
    <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:20}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}} className="form-row">
        {field(tt({ca:'Nom i cognoms',es:'Nombre y apellidos',fr:'Nom et prénom',en:'Full name'}),'nom','text',true,'Joan Garcia')}
        {field(tt({ca:'Empresa',es:'Empresa',fr:'Entreprise',en:'Company'}),'empresa','text',false,'Empresa S.L.')}
        {field(tt({ca:'Correu electronic',es:'Correo electrónico',fr:'Adresse e-mail',en:'Email'}),'email','email',true,'joan@empresa.com')}
        {field(tt({ca:'Telefon',es:'Teléfono',fr:'Téléphone',en:'Phone'}),'tel','tel',false,'+376 XXX XXX')}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <label style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--mut)'}}>{tt({ca:'Area d\'interes',es:'Área de interés',fr:'Domaine d\'intérêt',en:'Area of interest'})}</label>
        <select value={form.servei} onChange={e=>handle('servei',e.target.value)}
          style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:12,padding:'14px 18px',fontSize:15,color:form.servei?'var(--ink)':'var(--mut)',outline:'none',fontFamily:'var(--body)',cursor:'pointer'}}>
          <option value="">{tt({ca:'Selecciona una opcio...',es:'Selecciona una opción...',fr:'Sélectionnez une option...',en:'Select an option...'})}</option>
          {[
            {ca:'IT Security / Ciberseguretat',es:'IT Security / Ciberseguridad',fr:'IT Security / Cybersécurité',en:'IT Security / Cybersecurity'},
            {ca:'Comunicacions i xarxes',es:'Comunicaciones y redes',fr:'Communications et réseaux',en:'Communications and networks'},
            {ca:'Automatitzacio KNX',es:'Automatización KNX',fr:'Automatisation KNX',en:'KNX automation'},
            {ca:'Audiovisuals i videoconferencia',es:'Audiovisuales y videoconferencia',fr:'Audiovisuel et visioconférence',en:'Audiovisual and video conferencing'},
            {ca:'Altres / Consulta general',es:'Otros / Consulta general',fr:'Autres / Demande générale',en:'Other / General enquiry'},
          ].map(o=>(<option key={o.ca} value={o.ca}>{tt(o)}</option>))}
        </select>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <label style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--mut)'}}>{tt({ca:'Missatge',es:'Mensaje',fr:'Message',en:'Message'})}<span style={{color:'var(--accent)',marginLeft:4}}>*</span></label>
        <textarea value={form.missatge} onChange={e=>handle('missatge',e.target.value)} rows={5}
          placeholder={tt({ca:'Descriu el teu projecte o consulta...',es:'Describe tu proyecto o consulta...',fr:'Décrivez votre projet ou votre demande...',en:'Describe your project or enquiry...'})}
          style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:12,padding:'14px 18px',fontSize:15,color:'var(--ink)',outline:'none',resize:'vertical',fontFamily:'var(--body)',lineHeight:1.6,transition:'border-color .2s'}}
          onFocus={e=>e.target.style.borderColor=A(50)} onBlur={e=>e.target.style.borderColor='var(--line)'}/>
      </div>
      <label style={{display:'flex',alignItems:'flex-start',gap:12,cursor:'pointer',fontSize:13.5,color:'var(--mut)',lineHeight:1.6}}>
        <input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}
          style={{marginTop:3,width:17,height:17,accentColor:'var(--accent)',flexShrink:0,cursor:'pointer'}}/>
        <span>
          {tt({
            ca:<>He llegit i accepto la <a href="privacitat.html" target="_blank" rel="noopener" style={{color:'var(--accent-deep)',textDecoration:'underline'}}>política de privacitat</a> i el tractament de les meves dades per respondre la consulta.</>,
            es:<>He leído y acepto la <a href="privacitat.html" target="_blank" rel="noopener" style={{color:'var(--accent-deep)',textDecoration:'underline'}}>política de privacidad</a> y el tratamiento de mis datos para responder a la consulta.</>,
            fr:<>J'ai lu et j'accepte la <a href="privacitat.html" target="_blank" rel="noopener" style={{color:'var(--accent-deep)',textDecoration:'underline'}}>politique de confidentialité</a> et le traitement de mes données pour répondre à la demande.</>,
            en:<>I have read and accept the <a href="privacitat.html" target="_blank" rel="noopener" style={{color:'var(--accent-deep)',textDecoration:'underline'}}>privacy policy</a> and the processing of my data to respond to this enquiry.</>
          })}
        </span>
      </label>
      {err && <p style={{fontFamily:'var(--mono)',fontSize:12.5,color:'#ff5f57'}}>{err}</p>}
      <button type="submit" className="btn btn-primary" style={{alignSelf:'flex-start',padding:'16px 32px'}}>
        {tt({ca:'Enviar consulta',es:'Enviar consulta',fr:'Envoyer la demande',en:'Send enquiry'})} <Icons.UpRight s={15}/>
      </button>
      <style>{`.form-row{@media(max-width:640px){grid-template-columns:1fr!important;}}`}</style>
    </form>
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
    <PageShell activePage="Contacta">
      <PageHero kicker={tt({ca:'Contacta · Resposta en 4h',es:'Contacto · Respuesta en 4h',fr:'Contact · Réponse sous 4h',en:'Contact · Reply within 4h'})} title={tt({ca:"Parla amb l'equip",es:'Habla con el equipo',fr:"Parlez avec l'équipe",en:'Talk to the team'})} sub={tt({ca:"Tens un projecte en ment? Explica'ns-ho i prepararem una proposta tecnica a mida sense compromis.",es:'¿Tienes un proyecto en mente? Cuéntanoslo y prepararemos una propuesta técnica a medida sin compromiso.',fr:"Vous avez un projet en tête ? Parlez-nous-en et nous préparerons une proposition technique sur mesure, sans engagement.",en:'Have a project in mind? Tell us about it and we will prepare a tailored technical proposal at no commitment.'})} img="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1800&q=80&auto=format&fit=crop"/>
      <section style={{padding:'100px 0'}}>
        <div className="wrap-wide">
          <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:80,alignItems:'start'}} className="contact-grid">
            <Reveal>
              <SectionLabel>{tt({ca:'Formulari de contacte',es:'Formulario de contacto',fr:'Formulaire de contact',en:'Contact form'})}</SectionLabel>
              <h2 className="disp" style={{fontSize:'clamp(36px,4vw,64px)',marginBottom:40}}>{tt({ca:"Envia'ns una consulta",es:'Envíanos una consulta',fr:'Envoyez-nous une demande',en:'Send us an enquiry'})}</h2>
              <ContactForm/>
            </Reveal>
            <div>
              <Reveal delay={120}>
                <div style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:20,padding:'36px',marginBottom:20}}>
                  <SectionLabel>{tt({ca:'Contacte directe',es:'Contacto directo',fr:'Contact direct',en:'Direct contact'})}</SectionLabel>
                  <div style={{display:'flex',flexDirection:'column',gap:20,marginTop:8}}>
                    {[
                      {icon:<Icons.Phone/>,label:tt({ca:'Telefon',es:'Teléfono',fr:'Téléphone',en:'Phone'}),val:'+376 88 55 99',href:'tel:+37688559'},
                      {icon:<Icons.Mail/>,label:tt({ca:'Email',es:'Email',fr:'E-mail',en:'Email'}),val:'info@ontecandorra.com',href:'mailto:info@ontecandorra.com'},
                      {icon:<Icons.Pin/>,label:tt({ca:'Oficina',es:'Oficina',fr:'Bureau',en:'Office'}),val:'C/ de la Vena 3, Baixos\nEncamp, Andorra',href:null},
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
                  <div className="kicker" style={{marginBottom:14}}>{tt({ca:'Horari d\'atencio',es:'Horario de atención',fr:'Horaires d\'ouverture',en:'Opening hours'})}</div>
                  {[[tt({ca:'Dilluns — Divendres',es:'Lunes — Viernes',fr:'Lundi — Vendredi',en:'Monday — Friday'}),'9:00 — 18:00'],[tt({ca:'Dissabte',es:'Sábado',fr:'Samedi',en:'Saturday'}),tt({ca:'Tancat',es:'Cerrado',fr:'Fermé',en:'Closed'})],[tt({ca:'Urgencies tecni.',es:'Urgencias técni.',fr:'Urgences tech.',en:'Tech emergencies'}),tt({ca:'24/7 amb contracte',es:'24/7 con contrato',fr:'24/7 avec contrat',en:'24/7 with contract'})]].map(([d,h])=>(
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