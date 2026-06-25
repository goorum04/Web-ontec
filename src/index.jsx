/* ── Hero areas card (replaces the old terminal card) ── */
function HeroAreas() {
  const areas=[
    {icon:<Icons.Shield/>,t:{ca:'IT Security',es:'IT Security',fr:'IT Security',en:'IT Security'}},
    {icon:<Icons.Wifi/>,t:{ca:'Comunicacions',es:'Comunicaciones',fr:'Communications',en:'Communications'}},
    {icon:<Icons.Cpu/>,t:{ca:'Automatització',es:'Automatización',fr:'Automatisation',en:'Automation'}},
    {icon:<Icons.Video/>,t:{ca:'Audiovisuals',es:'Audiovisuales',fr:'Audiovisuel',en:'Audiovisual'}},
  ];
  return (
    <div style={{width:340,maxWidth:'90vw',borderRadius:16,overflow:'hidden',
      border:'1px solid rgba(255,255,255,.14)',background:'rgba(16,33,26,.55)',
      backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',boxShadow:'0 24px 70px rgba(0,0,0,.4)'}}>
      <div style={{padding:'18px 22px',borderBottom:'1px solid rgba(255,255,255,.1)'}}>
        <div style={{fontFamily:'var(--mono)',fontSize:10.5,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--accent-2)'}}>{tt({ca:'Àrees de servei',es:'Áreas de servicio',fr:'Domaines de service',en:'Service areas'})}</div>
        <div style={{marginTop:6,fontFamily:'var(--disp)',fontWeight:700,fontSize:19,color:'#fff'}}>{tt({ca:'Un sol integrador',es:'Un solo integrador',fr:'Un seul intégrateur',en:'A single integrator'})}</div>
      </div>
      <div style={{padding:'10px 12px'}}>
        {areas.map((a,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'13px 12px',borderRadius:10}}>
            <span style={{width:38,height:38,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',
              color:'var(--accent-2)',background:'rgba(142,198,63,.12)',border:'1px solid rgba(142,198,63,.22)',flexShrink:0}}>{a.icon}</span>
            <span style={{fontSize:15,color:'rgba(255,255,255,.92)',fontWeight:500}}>{tt(a.t)}</span>
            <span style={{marginLeft:'auto',color:'var(--accent-2)'}}><Icons.Check/></span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Hero ── */
function Hero() {
  const eyebrowRef = useRef(null);
  const h1Ref = useRef(null);
  const pRef = useRef(null);
  const ctaRef = useRef(null);
  const areasRef = useRef(null);
  useEffect(() => {
    if (typeof gsap === 'undefined') return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
      .fromTo(h1Ref.current, { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 1.15, ease: 'power3.out' }, '-=0.38')
      .fromTo(pRef.current, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }, '-=0.55')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, '-=0.5')
      .fromTo(areasRef.current, { opacity: 0, x: 36 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' }, '-=0.72');
  }, []);
  return (
    <section style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'flex-end',overflow:'hidden',background:'var(--panel-dark)'}}>
      <Cine src="https://images.unsplash.com/photo-1546616722-2b46187dd255?w=2000&q=80&auto=format&fit=crop" alt="Muntanyes d'Andorra" shade={false} parallax style={{position:'absolute',inset:0}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(8,18,12,.62) 0%,rgba(8,18,12,.34) 32%,rgba(8,18,12,.78) 100%)'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(8,18,12,.82) 0%,rgba(8,18,12,.4) 48%,transparent 82%)'}}/>
      <div className="wrap-wide" style={{position:'relative',zIndex:2,width:'100%',paddingBottom:96,paddingTop:150,display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:48,flexWrap:'wrap'}}>
        <div style={{maxWidth:760}}>
          <div ref={eyebrowRef} className="eyebrow" style={{marginBottom:26,color:'rgba(255,255,255,.8)'}}>
            <span style={{width:22,height:2,background:'var(--accent-2)'}}/>
            {tt({ca:'Andorra · Distribució tecnològica des de 2016',es:'Andorra · Distribución tecnológica desde 2016',fr:'Andorre · Distribution technologique depuis 2016',en:'Andorra · Technology distribution since 2016'})}
          </div>
          <h1 ref={h1Ref} className="disp" style={{color:'#fff',fontSize:'clamp(44px,6.6vw,104px)',lineHeight:1.02}}>
            {tt({
              ca:<>Sistemes tecnològics<br/><span style={{color:'var(--accent-2)'}}>avançats</span></>,
              es:<>Sistemas tecnológicos<br/><span style={{color:'var(--accent-2)'}}>avanzados</span></>,
              fr:<>Systèmes technologiques<br/><span style={{color:'var(--accent-2)'}}>avancés</span></>,
              en:<>Advanced<br/><span style={{color:'var(--accent-2)'}}>technology systems</span></>
            })}
          </h1>
          <p ref={pRef} style={{marginTop:30,fontSize:'clamp(16px,1.5vw,20px)',color:'rgba(255,255,255,.76)',lineHeight:1.7,maxWidth:560}}>
            {tt({
              ca:'Distribuïm, integrem i donem suport a infraestructures tecnològiques per a empreses, arquitectures, enginyeries i instal·ladors a Andorra.',
              es:'Distribuimos, integramos y damos soporte a infraestructuras tecnológicas para empresas, arquitecturas, ingenierías e instaladores en Andorra.',
              fr:'Nous distribuons, intégrons et accompagnons les infrastructures technologiques pour les entreprises, architectes, bureaux d\'études et installateurs en Andorre.',
              en:'We distribute, integrate and support technology infrastructures for businesses, architects, engineering firms and installers in Andorra.'
            })}
          </p>
          <div ref={ctaRef} style={{display:'flex',gap:14,marginTop:40,flexWrap:'wrap'}}>
            <a href="solucions.html" className="btn btn-primary">{tt({ca:'Veure solucions',es:'Ver soluciones',fr:'Voir les solutions',en:'View solutions'})} <Icons.UpRight s={15}/></a>
            <a href="contacta.html" className="btn btn-light">{tt({ca:'Parla amb un expert',es:'Habla con un experto',fr:'Parlez à un expert',en:'Talk to an expert'})}</a>
          </div>
        </div>
        <div ref={areasRef} className="hero-areas"><HeroAreas/></div>
      </div>
      <style>{`@media(max-width:1100px){.hero-areas{display:none;}}`}</style>
    </section>
  );
}

/* ── Stat band (count up) ── */
function StatBand() {
  const stats=[
    {to:8,suf:'+',l:{ca:'Anys operant',es:'Años operando',fr:'Années d\'activité',en:'Years operating'}},
    {to:200,suf:'+',l:{ca:'Projectes lliurats',es:'Proyectos entregados',fr:'Projets livrés',en:'Projects delivered'}},
    {to:4,suf:'',l:{ca:'Àrees clau',es:'Áreas clave',fr:'Domaines clés',en:'Key areas'}},
    {to:99.9,suf:'%',dec:1,l:{ca:'Uptime garantit',es:'Uptime garantizado',fr:'Disponibilité garantie',en:'Guaranteed uptime'}},
    {to:4,pre:'< ',suf:'h',l:{ca:'Temps de resposta',es:'Tiempo de respuesta',fr:'Temps de réponse',en:'Response time'}},
  ];
  return (
    <section style={{borderTop:'1px solid var(--line)',borderBottom:'1px solid var(--line)',background:'var(--panel)'}}>
      <div className="wrap-wide stat-wrap" style={{display:'grid',gridTemplateColumns:`repeat(${stats.length},1fr)`,gap:0}}>
        {stats.map((s,i)=>(
          <Reveal key={i} delay={i*70} style={{padding:'46px 28px',borderRight:i<stats.length-1?'1px solid var(--line)':'none'}}>
            <div className="disp" style={{fontSize:'clamp(34px,4vw,64px)',color:'var(--accent-deep)'}}>
              <CountUp to={s.to} suffix={s.suf} prefix={s.pre||''} decimals={s.dec||0}/>
            </div>
            <div style={{marginTop:8,fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--mut)'}}>{tt(s.l)}</div>
          </Reveal>
        ))}
      </div>
      <style>{`@media(max-width:760px){.stat-wrap{grid-template-columns:1fr 1fr!important;}}`}</style>
    </section>
  );
}

const SOLS=[
  {t:{ca:'IT Security',es:'IT Security',fr:'IT Security',en:'IT Security'},href:'solucions.html#it-security',n:'01',icon:<Icons.Shield/>,desc:{ca:'Protecció integral de la infraestructura digital.',es:'Protección integral de la infraestructura digital.',fr:'Protection intégrale de l\'infrastructure numérique.',en:'Comprehensive protection of your digital infrastructure.'},img:'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1100&q=80&auto=format&fit=crop'},
  {t:{ca:'Comunicacions',es:'Comunicaciones',fr:'Communications',en:'Communications'},href:'solucions.html#comunicacions',n:'02',icon:<Icons.Wifi/>,desc:{ca:"Connectivitat d'alt rendiment per a qualsevol entorn.",es:'Conectividad de alto rendimiento para cualquier entorno.',fr:'Connectivité haute performance pour tout environnement.',en:'High-performance connectivity for any environment.'},img:'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1100&q=80&auto=format&fit=crop'},
  {t:{ca:'Automatització',es:'Automatización',fr:'Automatisation',en:'Automation'},href:'solucions.html#automatitzacio',n:'03',icon:<Icons.Cpu/>,desc:{ca:"Sistemes intel·ligents per a edificis i llars.",es:'Sistemas inteligentes para edificios y hogares.',fr:'Systèmes intelligents pour bâtiments et habitations.',en:'Smart systems for buildings and homes.'},img:'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1100&q=80&auto=format&fit=crop'},
  {t:{ca:'Audiovisuals',es:'Audiovisuales',fr:'Audiovisuel',en:'Audiovisual'},href:'solucions.html#audiovisuals',n:'04',icon:<Icons.Screen/>,desc:{ca:'Sistemes A/V professionals per a qualsevol espai.',es:'Sistemas A/V profesionales para cualquier espacio.',fr:'Systèmes A/V professionnels pour tout espace.',en:'Professional A/V systems for any space.'},img:'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1100&q=80&auto=format&fit=crop'},
];
function SolutionsGallery() {
  return (
    <section style={{padding:'120px 0'}}>
      <div className="wrap-wide">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:56,flexWrap:'wrap',gap:24}}>
          <Reveal><SectionLabel>{tt({ca:'Solucions',es:'Soluciones',fr:'Solutions',en:'Solutions'})}</SectionLabel><h2 className="disp" style={{fontSize:'clamp(40px,6vw,96px)'}}>{tt({ca:<>Tot integrat,<br/>tot controlat</>,es:<>Todo integrado,<br/>todo controlado</>,fr:<>Tout intégré,<br/>tout maîtrisé</>,en:<>Fully integrated,<br/>fully controlled</>})}</h2></Reveal>
          <Reveal delay={120}><Magnetic><a href="solucions.html" className="btn btn-ghost">{tt({ca:'Veure totes',es:'Ver todas',fr:'Voir toutes',en:'View all'})} <Icons.UpRight s={14}/></a></Magnetic></Reveal>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:18}} className="gal-grid">
          {SOLS.map((s,i)=>(
            <Reveal key={i} delay={(i%2)*100}>
              <Tilt max={6}>
                <a href={s.href} className="mcard glowborder" style={{height:400,display:'block'}}>
                  <Cine src={s.img} alt={tt(s.t)} style={{position:'absolute',inset:0}}/>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(0,0,0,.15) 0%,rgba(0,0,0,.4) 45%,rgba(0,0,0,.92) 100%)'}}/>
                  <div style={{position:'relative',zIndex:1,height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'30px 32px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                      <div style={{width:54,height:54,borderRadius:12,background:'rgba(142,198,63,.16)',border:'1px solid rgba(142,198,63,.3)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--accent-2)'}}>{s.icon}</div>
                      <span style={{fontFamily:'var(--mono)',fontSize:11,color:'rgba(255,255,255,.6)',letterSpacing:'.1em'}}>{s.n}</span>
                    </div>
                    <div>
                      <h3 className="disp" style={{fontSize:'clamp(28px,3vw,42px)',color:'#fff',marginBottom:10}}>{tt(s.t)}</h3>
                      <p style={{fontSize:14.5,color:'rgba(255,255,255,.7)',lineHeight:1.6,maxWidth:360}}>{tt(s.desc)}</p>
                      <div style={{marginTop:18,display:'inline-flex',alignItems:'center',gap:8,fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--accent-2)'}}>{tt({ca:'Explorar',es:'Explorar',fr:'Explorer',en:'Explore'})} <Icons.Arrow s={13}/></div>
                    </div>
                  </div>
                </a>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:760px){.gal-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

function CaseBatllia() {
  const specs=[
    [{ca:'Sistema',es:'Sistema',fr:'Système',en:'System'},{ca:'Videoconferència HD',es:'Videoconferencia HD',fr:'Visioconférence HD',en:'HD video conferencing'}],
    [{ca:'Ubicació',es:'Ubicación',fr:'Emplacement',en:'Location'},{ca:"Edifici emblemàtic d'Andorra",es:"Edificio emblemático de Andorra",fr:"Bâtiment emblématique d'Andorre",en:"Emblematic building of Andorra"}],
    [{ca:'Equipament',es:'Equipamiento',fr:'Équipement',en:'Equipment'},{ca:'Cisco Webex + Sony PTZ',es:'Cisco Webex + Sony PTZ',fr:'Cisco Webex + Sony PTZ',en:'Cisco Webex + Sony PTZ'}],
    [{ca:'Cobertura',es:'Cobertura',fr:'Couverture',en:'Coverage'},{ca:'3 sales de reunions',es:'3 salas de reuniones',fr:'3 salles de réunion',en:'3 meeting rooms'}],
    [{ca:'Integració',es:'Integración',fr:'Intégration',en:'Integration'},{ca:'MS Teams / Zoom',es:'MS Teams / Zoom',fr:'MS Teams / Zoom',en:'MS Teams / Zoom'}],
    [{ca:'Suport',es:'Soporte',fr:'Support',en:'Support'},{ca:'24/7 garantit',es:'24/7 garantizado',fr:'24/7 garanti',en:'24/7 guaranteed'}]
  ];
  return (
    <section style={{position:'relative',padding:'120px 0',background:'var(--panel)',borderTop:'1px solid var(--line)',borderBottom:'1px solid var(--line)',overflow:'hidden'}}>
      <div className="wrap-wide" style={{position:'relative'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center'}} className="case-grid">
          <Reveal>
            <SectionLabel>{tt({ca:"Cas d'èxit",es:'Caso de éxito',fr:'Étude de cas',en:'Case study'})}</SectionLabel>
            <h2 className="disp" style={{fontSize:'clamp(36px,5vw,84px)',marginBottom:24}}>{tt({ca:<>Seu de Justicia<br/>d'Andorra</>,es:<>Sede de Justicia<br/>de Andorra</>,fr:<>Siège de la Justice<br/>d'Andorre</>,en:<>Judicial Center<br/>of Andorra</>})}</h2>
            <p style={{fontSize:17,color:'var(--mut)',lineHeight:1.8,marginBottom:24}}>
              {tt({
                ca:"Instal·lació integral d'un sistema de videoconferència professional per a la seu de justicia d'Andorra. Un projecte que demostra la capacitat d'Ontec per desplegar solucions d'alt nivell en entorns de gran exigència tècnica i protocol·lària.",
                es:"Instalación integral de un sistema de videoconferencia profesional para la sede de justicia de Andorra. Un proyecto que demuestra la capacidad de Ontec para desplegar soluciones de alto nivel en entornos de gran exigencia técnica y protocolaria.",
                fr:"Installation intégrale d'un système de visioconférence professionnel pour le siège de la justice d'Andorre. Un projet qui démontre la capacité d'Ontec à déployer des solutions haut de gamme dans des environnements aux exigences techniques et protocolaires élevées.",
                en:"Full deployment of a professional video conferencing system for the judicial center of Andorra. A project that showcases Ontec's ability to deliver high-end solutions in demanding technical and protocol environments."
              })}
            </p>
            <p style={{fontSize:17,color:'var(--mut)',lineHeight:1.8,marginBottom:40}}>
              {tt({
                ca:"El sistema permet la connexió simultània amb organismes internacionals, tribunals i institucions europees amb qualitat audiovisual de primer nivell i latència mínima.",
                es:"El sistema permite la conexión simultánea con organismos internacionales, tribunales e instituciones europeas con calidad audiovisual de primer nivel y latencia mínima.",
                fr:"Le système permet la connexion simultanée avec des organismes internationaux, des tribunaux et des institutions européennes, avec une qualité audiovisuelle de premier ordre et une latence minimale.",
                en:"The system enables simultaneous connections with international bodies, courts and European institutions, with top-tier audiovisual quality and minimal latency."
              })}
            </p>
            <Magnetic><a href="solucions.html#audiovisuals" className="btn btn-primary">{tt({ca:'Veure solució',es:'Ver solución',fr:'Voir la solution',en:'View solution'})} <Icons.UpRight s={15}/></a></Magnetic>
          </Reveal>
          <div>
            <Reveal delay={120}>
              <Tilt max={7}>
                <div className="glowborder" style={{position:'relative',borderRadius:20,overflow:'hidden',border:'1px solid var(--line)',marginBottom:18}}>
                  <Cine src="https://d8j0ntlcm91z4.cloudfront.net/user_3CrRWyLJlKarEWqwmRMbcLE2UCZ/hf_20260625_113547_7dc81eb6-4452-4f0e-b974-47df8ed10343.png" alt="Sala de videoconferència de la seu de justicia" style={{height:320}}/>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 50%,rgba(0,0,0,.85) 100%)'}}/>
                  <div style={{position:'absolute',bottom:24,left:24,right:24,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div>
                      <div style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--accent-2)',marginBottom:4}}>{tt({ca:'Projecte completat',es:'Proyecto completado',fr:'Projet réalisé',en:'Completed project'})}</div>
                      <div style={{fontFamily:'var(--disp)',fontWeight:700,fontSize:18,color:'#fff'}}>{tt({ca:'Edifici emblemàtic',es:'Edificio emblemático',fr:'Bâtiment emblématique',en:'Emblematic building'})}</div>
                    </div>
                    <div style={{width:44,height:44,borderRadius:'50%',background:'rgba(142,198,63,.2)',border:'1px solid rgba(142,198,63,.4)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--accent-2)'}}><Icons.Video/></div>
                  </div>
                </div>
              </Tilt>
            </Reveal>
            <Reveal delay={200}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                {specs.map(([k,v],i)=>(
                  <div key={i} style={{background:'var(--panel-2)',border:'1px solid var(--line)',borderRadius:12,padding:'16px 18px'}}>
                    <div style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--faint)',marginBottom:6}}>{tt(k)}</div>
                    <div style={{fontSize:14,color:'var(--ink)',fontWeight:600}}>{tt(v)}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:860px){.case-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
    </section>
  );
}

function CiberseguretatIncibe() {
  const threats=[
    {icon:<Icons.Shield/>,t:{ca:'Firewall avançat',es:'Firewall avanzado',fr:'Pare-feu avancé',en:'Advanced firewall'},d:{ca:'Fortinet & Palo Alto Networks de nova generació.',es:'Fortinet & Palo Alto Networks de nueva generación.',fr:'Fortinet & Palo Alto Networks nouvelle génération.',en:'Next-generation Fortinet & Palo Alto Networks.'}},
    {icon:<Icons.Lock/>,t:{ca:'Zero Trust',es:'Zero Trust',fr:'Zero Trust',en:'Zero Trust'},d:{ca:'Arquitectura de confiança zero per a xarxes corporatives.',es:'Arquitectura de confianza cero para redes corporativas.',fr:'Architecture zéro confiance pour les réseaux d\'entreprise.',en:'Zero-trust architecture for corporate networks.'}},
    {icon:<Icons.Wifi/>,t:{ca:'SOC Monitorat',es:'SOC Monitorizado',fr:'SOC Supervisé',en:'Monitored SOC'},d:{ca:'Supervisió contínua 24/7 de la infraestructura.',es:'Supervisión continua 24/7 de la infraestructura.',fr:'Supervision continue 24/7 de l\'infrastructure.',en:'Continuous 24/7 infrastructure monitoring.'}},
    {icon:<Icons.Cpu/>,t:{ca:'Pentesting',es:'Pentesting',fr:'Pentesting',en:'Pentesting'},d:{ca:'Auditories de seguretat i proves de penetració.',es:'Auditorías de seguridad y pruebas de penetración.',fr:'Audits de sécurité et tests d\'intrusion.',en:'Security audits and penetration testing.'}},
  ];
  return (
    <section style={{padding:'120px 0'}}>
      <div className="wrap-wide">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center'}} className="incibe-grid">
          <div>
            <Reveal>
              <Tilt max={7}>
                <div className="glowborder" style={{position:'relative',borderRadius:20,overflow:'hidden',border:'1px solid var(--line)',marginBottom:20}}>
                  <Cine src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=900&q=80&auto=format&fit=crop" alt="Ciberseguretat" style={{height:380}}/>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,.1) 100%)'}}/>
                  <div style={{position:'absolute',top:24,left:24}}>
                    <div style={{display:'inline-flex',alignItems:'center',gap:10,background:'rgba(0,0,0,.7)',backdropFilter:'blur(12px)',border:'1px solid var(--line)',borderRadius:999,padding:'8px 16px'}}>
                      <span style={{width:7,height:7,borderRadius:'50%',background:'var(--accent)',boxShadow:'0 0 8px var(--accent)'}}/>
                      <span style={{fontFamily:'var(--mono)',fontSize:11,color:'var(--accent)',letterSpacing:'.1em'}}>INCIBE CERT</span>
                    </div>
                  </div>
                </div>
              </Tilt>
            </Reveal>
            <Reveal delay={100}>
              <div style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:16,padding:'22px 26px',display:'flex',alignItems:'center',gap:18}}>
                <div style={{width:52,height:52,borderRadius:13,background:A(15),border:`1px solid ${A(30)}`,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--accent)',flexShrink:0,boxShadow:`0 0 28px ${A(22)}`}}><Icons.Shield/></div>
                <div>
                  <div style={{fontFamily:'var(--mono)',fontSize:10.5,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--accent)',marginBottom:4}}>{tt({ca:'Col·laboració oficial',es:'Colaboración oficial',fr:'Collaboration officielle',en:'Official collaboration'})}</div>
                  <div style={{fontSize:15,color:'var(--ink)',fontWeight:600}}>{tt({ca:'Tècnic certificat per INCIBE',es:'Técnico certificado por INCIBE',fr:'Technicien certifié par INCIBE',en:'INCIBE-certified technician'})}</div>
                  <div style={{fontSize:13,color:'var(--mut)',marginTop:3}}>Instituto Nacional de Ciberseguridad</div>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={80}>
            <SectionLabel>{tt({ca:'Ciberseguretat',es:'Ciberseguridad',fr:'Cybersécurité',en:'Cybersecurity'})}</SectionLabel>
            <h2 className="disp glow-text" style={{fontSize:'clamp(36px,5vw,84px)',marginBottom:24}}>{tt({ca:<>Protecció real<br/>per a la teva<br/>empresa</>,es:<>Protección real<br/>para tu<br/>empresa</>,fr:<>Une protection réelle<br/>pour votre<br/>entreprise</>,en:<>Real protection<br/>for your<br/>business</>})}</h2>
            <p style={{fontSize:17,color:'var(--mut)',lineHeight:1.8,marginBottom:20}}>
              {tt({
                ca:<>Ontec compta amb un tècnic especialitzat en ciberseguretat col·laborador de l'<strong style={{color:'var(--ink)'}}>INCIBE</strong> (Instituto Nacional de Ciberseguridad d'Espanya), garantint els estàndards més exigents en protecció d'infraestructures digitals.</>,
                es:<>Ontec cuenta con un técnico especializado en ciberseguridad colaborador del <strong style={{color:'var(--ink)'}}>INCIBE</strong> (Instituto Nacional de Ciberseguridad de España), garantizando los estándares más exigentes en protección de infraestructuras digitales.</>,
                fr:<>Ontec dispose d'un technicien spécialisé en cybersécurité, collaborateur de l'<strong style={{color:'var(--ink)'}}>INCIBE</strong> (Instituto Nacional de Ciberseguridad d'Espagne), garantissant les standards les plus exigeants en matière de protection des infrastructures numériques.</>,
                en:<>Ontec has a cybersecurity specialist who collaborates with <strong style={{color:'var(--ink)'}}>INCIBE</strong> (Spain's Instituto Nacional de Ciberseguridad), ensuring the highest standards in digital infrastructure protection.</>
              })}
            </p>
            <p style={{fontSize:17,color:'var(--mut)',lineHeight:1.8,marginBottom:36}}>
              {tt({
                ca:"Des d'auditories de seguretat fins a la implantació de solucions Zero Trust, oferim una cobertura completa per protegir els actius digitals de qualsevol organització a Andorra.",
                es:'Desde auditorías de seguridad hasta la implantación de soluciones Zero Trust, ofrecemos una cobertura completa para proteger los activos digitales de cualquier organización en Andorra.',
                fr:"Des audits de sécurité jusqu'au déploiement de solutions Zero Trust, nous offrons une couverture complète pour protéger les actifs numériques de toute organisation en Andorre.",
                en:'From security audits to the deployment of Zero Trust solutions, we offer complete coverage to protect the digital assets of any organization in Andorra.'
              })}
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:40}}>
              {threats.map((th,i)=>(
                <Reveal key={i} delay={i*60}>
                  <div className="glowborder" style={{background:'var(--panel)',border:'1px solid var(--line)',borderRadius:14,padding:'20px',transition:'border-color .2s,background .2s'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=A(35);e.currentTarget.style.background=A(6);}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--line)';e.currentTarget.style.background='var(--panel)';}}>
                    <div style={{color:'var(--accent)',marginBottom:12}}>{th.icon}</div>
                    <div style={{fontFamily:'var(--disp)',fontWeight:700,fontSize:15,color:'var(--ink)',marginBottom:6,letterSpacing:'-0.01em'}}>{tt(th.t)}</div>
                    <div style={{fontSize:13,color:'var(--mut)',lineHeight:1.5}}>{tt(th.d)}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Magnetic><a href="solucions.html#it-security" className="btn btn-primary">{tt({ca:'Veure IT Security',es:'Ver IT Security',fr:'Voir IT Security',en:'View IT Security'})} <Icons.UpRight s={15}/></a></Magnetic>
          </Reveal>
        </div>
      </div>
      <style>{`@media(max-width:860px){.incibe-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
    </section>
  );
}

function PartnersMarquee() {
  const partners=['Fortinet','Cisco','Ubiquiti','KNX','Crestron','HPE Aruba','Palo Alto','Lutron','Samsung','Sony','QSC','Shure'];
  return (
    <section style={{borderTop:'1px solid var(--line)',borderBottom:'1px solid var(--line)',background:'var(--panel)'}}>
      <div className="wrap" style={{paddingTop:28,paddingBottom:14}}>
        <div className="kicker" style={{textAlign:'center'}}>{tt({ca:'Fabricants i partners certificats',es:'Fabricantes y partners certificados',fr:'Fabricants et partenaires certifiés',en:'Certified manufacturers and partners'})}</div>
      </div>
      <div style={{paddingBottom:30}}><Marquee items={partners}/></div>
    </section>
  );
}

function ServicesList() {
  const svcs=[
    {n:'01',t:{ca:'Ingenierías',es:'Ingenierías',fr:'Bureaux d\'études',en:'Engineering firms'},href:'serveis.html#ingenieries',d:{ca:'Prescripció, especificació i assistència tècnica.',es:'Prescripción, especificación y asistencia técnica.',fr:'Prescription, spécification et assistance technique.',en:'Specification, prescription and technical support.'}},
    {n:'02',t:{ca:'Arquitectures',es:'Arquitecturas',fr:'Architectes',en:'Architects'},href:'serveis.html#arquitectures',d:{ca:'Tecnologia integrada des de la fase de projecte.',es:'Tecnología integrada desde la fase de proyecto.',fr:'Technologie intégrée dès la phase de projet.',en:'Technology integrated from the project phase.'}},
    {n:'03',t:{ca:'Instal·ladors',es:'Instaladores',fr:'Installateurs',en:'Installers'},href:'serveis.html#installadors',d:{ca:'Subministre, preconfiguració i suport en obra.',es:'Suministro, preconfiguración y soporte en obra.',fr:'Fourniture, préconfiguration et support sur chantier.',en:'Supply, pre-configuration and on-site support.'}},
    {n:'04',t:{ca:"Disseny d'Interiors",es:'Diseño de Interiores',fr:'Architecture d\'intérieur',en:'Interior Design'},href:'serveis.html#disseny',d:{ca:"Tecnologia invisible, part del disseny.",es:'Tecnología invisible, parte del diseño.',fr:'Une technologie invisible, intégrée au design.',en:'Invisible technology, part of the design.'}},
  ];
  return (
    <section style={{padding:'120px 0'}}>
      <div className="wrap-wide">
        <Reveal style={{marginBottom:48}}>
          <SectionLabel>{tt({ca:'Serveis',es:'Servicios',fr:'Services',en:'Services'})}</SectionLabel>
          <h2 className="disp" style={{fontSize:'clamp(40px,6vw,96px)'}}>{tt({ca:<>Adaptat al<br/>teu sector</>,es:<>Adaptado a<br/>tu sector</>,fr:<>Adapté à<br/>votre secteur</>,en:<>Tailored to<br/>your sector</>})}</h2>
        </Reveal>
        <div style={{borderTop:'1px solid var(--line)'}}>
          {svcs.map((s,i)=>(
            <Reveal key={i} delay={i*60}>
              <a href={s.href} style={{display:'grid',gridTemplateColumns:'90px 1fr auto',gap:28,alignItems:'center',padding:'34px 8px',borderBottom:'1px solid var(--line)',textDecoration:'none',transition:'background .25s,padding .25s'}}
                onMouseEnter={e=>{e.currentTarget.style.background=A(6);e.currentTarget.style.paddingLeft='24px';e.currentTarget.querySelector('.sv-t').style.color='var(--accent)';}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.paddingLeft='8px';e.currentTarget.querySelector('.sv-t').style.color='var(--ink)';}}>
                <span style={{fontFamily:'var(--mono)',fontSize:13,color:'var(--faint)',letterSpacing:'.1em'}}>{s.n}</span>
                <div style={{display:'flex',alignItems:'baseline',gap:26,flexWrap:'wrap'}}>
                  <span className="sv-t disp" style={{fontSize:'clamp(26px,3.4vw,48px)',transition:'color .25s'}}>{tt(s.t)}</span>
                  <span style={{fontSize:15,color:'var(--mut)'}}>{tt(s.d)}</span>
                </div>
                <span style={{color:'var(--accent)'}}><Icons.UpRight s={22}/></span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const BLOG=[
  {date:'2025',tag:{ca:'Videoconferència',es:'Videoconferencia',fr:'Visioconférence',en:'Video conferencing'},title:{ca:"Sistema de videoconferència per a la seu de justicia d'Andorra",es:"Sistema de videoconferencia para la sede de justicia de Andorra",fr:"Système de visioconférence pour le siège de la justice d'Andorre",en:"Video conferencing system for the judicial center of Andorra"},img:'https://d8j0ntlcm91z4.cloudfront.net/user_3CrRWyLJlKarEWqwmRMbcLE2UCZ/hf_20260625_113547_7dc81eb6-4452-4f0e-b974-47df8ed10343.png'},
  {date:'2024',tag:{ca:'IT Security',es:'IT Security',fr:'IT Security',en:'IT Security'},title:{ca:'Zero Trust: el nou paradigma de seguretat per a pimes',es:'Zero Trust: el nuevo paradigma de seguridad para pymes',fr:'Zero Trust : le nouveau paradigme de sécurité pour les PME',en:'Zero Trust: the new security paradigm for SMEs'},img:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80&auto=format&fit=crop'},
  {date:'2022',tag:{ca:'Domòtica',es:'Domótica',fr:'Domotique',en:'Home automation'},title:{ca:"La domòtica KNX arriba als edificis premium d'Andorra",es:"La domótica KNX llega a los edificios premium de Andorra",fr:"La domotique KNX arrive dans les bâtiments premium d'Andorre",en:"KNX home automation arrives in Andorra's premium buildings"},img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop'},
];
function BlogPreview() {
  return (
    <section style={{padding:'0 0 120px'}}>
      <div className="wrap-wide">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:48,flexWrap:'wrap',gap:24}}>
          <Reveal><SectionLabel>Blog</SectionLabel><h2 className="disp" style={{fontSize:'clamp(36px,5vw,80px)'}}>{tt({ca:'Últimes notícies',es:'Últimas noticias',fr:'Dernières actualités',en:'Latest news'})}</h2></Reveal>
          <Reveal delay={120}><Magnetic><a href="blog.html" className="btn btn-ghost">{tt({ca:'Veure tot',es:'Ver todo',fr:'Voir tout',en:'View all'})} <Icons.UpRight s={14}/></a></Magnetic></Reveal>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}} className="blog-grid">
          {BLOG.map((p,i)=>(
            <Reveal key={i} delay={i*90}>
              <a href="blog.html" className="mcard" style={{display:'block'}}>
                <Cine src={p.img} alt={tt(p.title)} style={{height:230}}/>
                <div style={{padding:'24px 26px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
                    <Tag>{tt(p.tag)}</Tag>
                    <span style={{fontFamily:'var(--mono)',fontSize:10.5,color:'var(--faint)'}}>{p.date}</span>
                  </div>
                  <h4 style={{fontFamily:'var(--disp)',fontWeight:700,fontSize:18,color:'var(--ink)',lineHeight:1.3,letterSpacing:'-0.01em'}}>{tt(p.title)}</h4>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:860px){.blog-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

function CtaBig() {
  return (
    <section style={{position:'relative',overflow:'hidden',background:'var(--panel-dark)'}}>
      <Cine src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&q=80&auto=format&fit=crop" alt="" shade={false} parallax style={{position:'absolute',inset:0}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(8,18,12,.86) 0%,rgba(8,18,12,.7) 50%,rgba(8,18,12,.9) 100%)'}}/>
      <div className="wrap" style={{position:'relative',zIndex:1,padding:'140px 40px',textAlign:'center'}}>
        <Reveal>
          <div className="kicker" style={{justifyContent:'center',display:'flex',marginBottom:22,color:'var(--accent-2)'}}>{tt({ca:'Comencem?',es:'¿Empezamos?',fr:'On commence ?',en:'Shall we start?'})}</div>
          <h2 className="disp" style={{color:'#fff',fontSize:'clamp(40px,7vw,112px)'}}>{tt({ca:<>Tens un projecte<br/>en ment?</>,es:<>¿Tienes un proyecto<br/>en mente?</>,fr:<>Vous avez un projet<br/>en tête ?</>,en:<>Have a project<br/>in mind?</>})}</h2>
          <p style={{margin:'28px auto 0',maxWidth:540,fontSize:18,color:'rgba(255,255,255,.76)',lineHeight:1.7}}>
            {tt({
              ca:"Explica'ns les teves necessitats i trobarem la millor solució tecnològica per al teu projecte.",
              es:'Cuéntanos tus necesidades y encontraremos la mejor solución tecnológica para tu proyecto.',
              fr:'Parlez-nous de vos besoins et nous trouverons la meilleure solution technologique pour votre projet.',
              en:"Tell us about your needs and we'll find the best technology solution for your project."
            })}
          </p>
          <div style={{display:'flex',gap:14,marginTop:42,justifyContent:'center',flexWrap:'wrap'}}>
            <a href="contacta.html" className="btn btn-primary">{tt({ca:'Contacta ara',es:'Contacta ahora',fr:'Contactez-nous',en:'Get in touch'})} <Icons.UpRight s={15}/></a>
            <a href="tel:+37688559" className="btn btn-light"><Icons.Phone/> +376 88 55 99</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const TWEAK_DEFAULTS = {"mood":"acid","voice":"editorial","intensity":"cinematic"};
function App() {
  useLang();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute('data-mood', t.mood);
    r.setAttribute('data-voice', t.voice);
    r.setAttribute('data-intensity', t.intensity);
  }, [t.mood, t.voice, t.intensity]);
  return (
    <PageShell activePage="Inici">
      <Hero/><StatBand/><SolutionsGallery/><CaseBatllia/><CiberseguretatIncibe/>
      <PartnersMarquee/><ServicesList/><BlogPreview/><CtaBig/>
      <TweaksPanel title="Tweaks">
        <TweakSection label="Mood"/>
        <TweakRadio label="Mood" value={t.mood} options={[{value:'acid',label:'Acid'},{value:'ice',label:'Ice'},{value:'flare',label:'Flare'},{value:'mono',label:'Mono'}]} onChange={v=>setTweak('mood',v)}/>
        <TweakSection label="Voice"/>
        <TweakRadio label="Voice" value={t.voice} options={[{value:'editorial',label:'Editorial'},{value:'modern',label:'Modern'},{value:'soft',label:'Soft'}]} onChange={v=>setTweak('voice',v)}/>
        <TweakSection label="Intensity"/>
        <TweakRadio label="Intensity" value={t.intensity} options={[{value:'calm',label:'Calm'},{value:'cinematic',label:'Cinema'},{value:'hyper',label:'Hyper'}]} onChange={v=>setTweak('intensity',v)}/>
      </TweaksPanel>
    </PageShell>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
