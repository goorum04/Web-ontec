// ═══════════════════════════════════════════════════════
// Seu de la Justicia — Interactive Case Study Page
// Hotspot image: click microphone / screen / speaker
// ═══════════════════════════════════════════════════════

const HOTSPOTS = [
  {
    id: 'micros',
    icon: '🎙',
    x: '59%',
    y: '58%',
    label: { ca: 'Micròfons', es: 'Micrófonos', fr: 'Microphones', en: 'Microphones' },
    title: { ca: 'Sistema de Microfonia Professional', es: 'Sistema de Microfonía Profesional', fr: 'Système de Microphones Professionnel', en: 'Professional Microphone System' },
    desc: {
      ca: "Hem instal·lat un sistema de microfonia digital de conferència que garanteix una captura d'àudio nítida i sense interferències en totes les posicions de la sala, tant per al jutge com per als advocats i les parts.",
      es: "Hemos instalado un sistema de microfonía digital de conferencia que garantiza una captura de audio nítida y sin interferencias en todas las posiciones de la sala, tanto para el juez como para los abogados y las partes.",
      fr: "Nous avons installé un système de microphones de conférence numérique garantissant une capture audio nette et sans interférences à toutes les positions de la salle.",
      en: "We installed a digital conference microphone system ensuring clear, interference-free audio capture at all positions in the room."
    },
    specs: [
      { ca: 'Micròfons Shure MXA310 de taula — àrea de captació 360°', es: 'Micrófonos Shure MXA310 de mesa — área de captación 360°', fr: 'Microphones de table Shure MXA310 — zone de captation 360°', en: 'Shure MXA310 table microphones — 360° pick-up area' },
      { ca: 'Cancel·lació d\'eco automàtica (AEC) integrada', es: 'Cancelación de eco automática (AEC) integrada', fr: 'Annulation d\'écho automatique (AEC) intégrée', en: 'Integrated automatic echo cancellation (AEC)' },
      { ca: 'Distribució d\'àudio en xarxa via protocol Dante', es: 'Distribución de audio en red vía protocolo Dante', fr: 'Distribution audio réseau via protocole Dante', en: 'Network audio distribution via Dante protocol' },
      { ca: 'Processador DSP Biamp Tesira per a gestió de sala', es: 'Procesador DSP Biamp Tesira para gestión de sala', fr: 'Processeur DSP Biamp Tesira pour gestion de salle', en: 'Biamp Tesira DSP processor for room management' },
      { ca: 'Control de volum i muting individual des del panell tàctil', es: 'Control de volumen y muting individual desde el panel táctil', fr: 'Contrôle du volume et muting individuel depuis le panneau tactile', en: 'Individual volume and muting control from touch panel' },
    ],
    color: '#4f9e2f',
  },
  {
    id: 'pantalles',
    icon: '🖥',
    x: '89%',
    y: '34%',
    label: { ca: 'Pantalles', es: 'Pantallas', fr: 'Écrans', en: 'Screens' },
    title: { ca: 'Sistema de Visualització AV', es: 'Sistema de Visualización AV', fr: 'Système de Visualisation AV', en: 'AV Display System' },
    desc: {
      ca: "Les pantalles permeten projectar documents, videoconferències i proves documentals en temps real, visibles des de qualsevol punt de la sala. El sistema matricial permet distribuir qualsevol font a qualsevol pantalla.",
      es: "Las pantallas permiten proyectar documentos, videoconferencias y pruebas documentales en tiempo real, visibles desde cualquier punto de la sala. El sistema matricial permite distribuir cualquier fuente a cualquier pantalla.",
      fr: "Les écrans permettent de projeter des documents, des vidéoconférences et des preuves documentaires en temps réel, visibles depuis n'importe quel point de la salle.",
      en: "The screens allow projecting documents, video conferences and documentary evidence in real time, visible from any point in the room."
    },
    specs: [
      { ca: 'Pantalles Samsung comercials 65" QLED 4K UHD', es: 'Pantallas Samsung comerciales 65" QLED 4K UHD', fr: 'Écrans Samsung commerciaux 65" QLED 4K UHD', en: 'Samsung commercial 65" QLED 4K UHD screens' },
      { ca: 'Commutador matricial HDMI 2.0 — 8 entrades / 4 sortides', es: 'Conmutador matricial HDMI 2.0 — 8 entradas / 4 salidas', fr: 'Commutateur matriciel HDMI 2.0 — 8 entrées / 4 sorties', en: 'HDMI 2.0 matrix switch — 8 inputs / 4 outputs' },
      { ca: 'Integració nativa amb Zoom, Teams i Cisco Webex', es: 'Integración nativa con Zoom, Teams y Cisco Webex', fr: 'Intégration native avec Zoom, Teams et Cisco Webex', en: 'Native integration with Zoom, Teams and Cisco Webex' },
      { ca: 'Transmissió de vídeo en xarxa via AV over IP (NDI)', es: 'Transmisión de vídeo en red vía AV over IP (NDI)', fr: 'Transmission vidéo réseau via AV over IP (NDI)', en: 'Network video transmission via AV over IP (NDI)' },
      { ca: 'Senyal anti-reflexos i calibrat de color per a sala judicial', es: 'Señal anti-reflejos y calibrado de color para sala judicial', fr: 'Signal antireflet et calibrage couleur pour salle judiciaire', en: 'Anti-glare signal and color calibration for judicial room' },
    ],
    color: '#2e7cbe',
  },
  {
    id: 'altaveus',
    icon: '🔊',
    x: '47%',
    y: '18%',
    label: { ca: 'Altaveus', es: 'Altavoces', fr: 'Haut-parleurs', en: 'Speakers' },
    title: { ca: 'Sistema d\'Àudio i Acústica de Sala', es: 'Sistema de Audio y Acústica de Sala', fr: 'Système Audio et Acoustique de Salle', en: 'Room Audio & Acoustics System' },
    desc: {
      ca: "L'encastament d'altaveus en el sostre garanteix una distribució uniforme del so per tota la sala, assegurant que tothom pugui escoltar amb claredat, tant en sessions de viva veu com en reproducció de videoconferència.",
      es: "El encastamiento de altavoces en el techo garantiza una distribución uniforme del sonido por toda la sala, asegurando que todos puedan escuchar con claridad, tanto en sesiones de viva voz como en reproducción de videoconferencia.",
      fr: "L'encastrement de haut-parleurs au plafond garantit une distribution uniforme du son dans toute la salle.",
      en: "Ceiling-embedded speakers ensure uniform sound distribution throughout the room, so everyone can hear clearly in both live sessions and video conference playback."
    },
    specs: [
      { ca: 'Altaveus de sostre Bose DS16F d\'alta intel·ligibilitat', es: 'Altavoces de techo Bose DS16F de alta inteligibilidad', fr: 'Haut-parleurs de plafond Bose DS16F à haute intelligibilité', en: 'Bose DS16F high-intelligibility ceiling speakers' },
      { ca: 'Amplificadors de classe D Crown CDi 4|300 — 300 W per canal', es: 'Amplificadores de clase D Crown CDi 4|300 — 300 W por canal', fr: 'Amplificateurs classe D Crown CDi 4|300 — 300 W par canal', en: 'Crown CDi 4|300 class D amplifiers — 300 W per channel' },
      { ca: 'Tractament acústic de panells absorbents en parets laterals', es: 'Tratamiento acústico de paneles absorbentes en paredes laterales', fr: 'Traitement acoustique par panneaux absorbants sur les murs latéraux', en: 'Acoustic treatment with absorbing panels on lateral walls' },
      { ca: 'Sistema de delay calibrat per zones — llatència < 5 ms', es: 'Sistema de delay calibrado por zonas — latencia < 5 ms', fr: 'Système de delay calibré par zones — latence < 5 ms', en: 'Zone-calibrated delay system — latency < 5 ms' },
      { ca: 'Equalització automàtica de la sala per freqüències de veu', es: 'Ecualización automática de la sala para frecuencias de voz', fr: 'Égalisation automatique de la salle pour les fréquences vocales', en: 'Automatic room equalization for voice frequencies' },
    ],
    color: '#9b5fc0',
  },
  {
    id: 'control',
    icon: '⚙️',
    x: '28%',
    y: '52%',
    label: { ca: 'Control Central', es: 'Control Central', fr: 'Contrôle Central', en: 'Central Control' },
    title: { ca: 'Sistema de Control Centralitzat', es: 'Sistema de Control Centralizado', fr: 'Système de Contrôle Centralisé', en: 'Centralized Control System' },
    desc: {
      ca: "Un únic punt de control permet al personal de la sala gestionar tots els sistemes audiovisuals, d'il·luminació i comunicació des d'una pantalla tàctil intuïtiva, amb escenes preconfigurades per a cada tipus de sessió.",
      es: "Un único punto de control permite al personal de la sala gestionar todos los sistemas audiovisuales, de iluminación y comunicación desde una pantalla táctil intuitiva, con escenas preconfiguradas para cada tipo de sesión.",
      fr: "Un point de contrôle unique permet au personnel de gérer tous les systèmes audiovisuels, d'éclairage et de communication depuis un écran tactile intuitif.",
      en: "A single control point allows room staff to manage all audiovisual, lighting and communication systems from an intuitive touch screen, with pre-configured scenes for each session type."
    },
    specs: [
      { ca: 'Processador de control Crestron CP4N com a nucli del sistema', es: 'Procesador de control Crestron CP4N como núcleo del sistema', fr: 'Processeur de contrôle Crestron CP4N comme noyau du système', en: 'Crestron CP4N control processor as system core' },
      { ca: 'Panell tàctil Crestron TSW-1070 de 10" muntada en taula', es: 'Panel táctil Crestron TSW-1070 de 10" montado en mesa', fr: 'Panneau tactile Crestron TSW-1070 de 10" monté en table', en: '10" Crestron TSW-1070 touch panel mounted on table' },
      { ca: 'Escenes preconfigurades: Audiència · Presentació · Reunió · Descans', es: 'Escenas preconfiguradas: Audiencia · Presentación · Reunión · Descanso', fr: 'Scènes préconfigurées : Audience · Présentation · Réunion · Pause', en: 'Pre-configured scenes: Hearing · Presentation · Meeting · Break' },
      { ca: 'Control integrat d\'il·luminació, persianes i climatització', es: 'Control integrado de iluminación, persianas y climatización', fr: 'Contrôle intégré de l\'éclairage, des stores et de la climatisation', en: 'Integrated control of lighting, blinds and air conditioning' },
      { ca: 'Monitoratge remot i manteniment preventiu via VPN segura', es: 'Monitoreo remoto y mantenimiento preventivo vía VPN segura', fr: 'Surveillance à distance et maintenance préventive via VPN sécurisé', en: 'Remote monitoring and preventive maintenance via secure VPN' },
    ],
    color: '#d4820a',
  },
];

const STATS = [
  { num: 4,  suf: '', label: { ca: 'Sales equipades', es: 'Salas equipadas', fr: 'Salles équipées', en: 'Equipped rooms' } },
  { num: 12, suf: '', label: { ca: 'Micròfons instal·lats', es: 'Micrófonos instalados', fr: 'Microphones installés', en: 'Microphones installed' } },
  { num: 8,  suf: '', label: { ca: 'Pantalles 4K', es: 'Pantallas 4K', fr: 'Écrans 4K', en: '4K screens' } },
  { num: 3,  suf: '',  label: { ca: 'Mesos d\'instal·lació', es: 'Meses de instalación', fr: 'Mois d\'installation', en: 'Months of installation' } },
];

/* ── Pulsing hotspot dot ── */
function HotspotDot({ spot, active, onClick }) {
  const col = spot.color;
  return (
    <button
      onClick={() => onClick(active ? null : spot.id)}
      title={tt(spot.label)}
      style={{
        position: 'absolute',
        left: spot.x,
        top: spot.y,
        transform: 'translate(-50%,-50%)',
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: `2.5px solid ${active ? col : 'rgba(255,255,255,.9)'}`,
        background: active ? col : 'rgba(255,255,255,.18)',
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        zIndex: 10,
        boxShadow: active ? `0 0 0 8px ${col}40, 0 4px 20px rgba(0,0,0,.4)` : '0 4px 16px rgba(0,0,0,.3)',
        transition: 'all .25s',
      }}
    >
      <span role="img" aria-label={tt(spot.label)}>{spot.icon}</span>
      {!active && (
        <span style={{
          position: 'absolute',
          inset: -6,
          borderRadius: '50%',
          border: `2px solid ${col}`,
          animation: 'pulse-ring 2s ease-out infinite',
          pointerEvents: 'none',
        }} />
      )}
    </button>
  );
}

/* ── Info panel that slides in from right ── */
function InfoPanel({ spot, onClose }) {
  const [visible, setVisible] = useState(false);
  useLang();
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, [spot]);

  if (!spot) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 'min(400px, 100%)',
        background: 'rgba(10,20,14,.94)',
        backdropFilter: 'blur(24px)',
        borderLeft: `3px solid ${spot.color}`,
        padding: '32px 28px',
        overflowY: 'auto',
        zIndex: 20,
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .35s cubic-bezier(.2,.7,.3,1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: 'rgba(255,255,255,.1)',
          border: '1px solid rgba(255,255,255,.2)',
          borderRadius: '50%',
          width: 34,
          height: 34,
          cursor: 'pointer',
          color: '#fff',
          fontSize: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background .15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.2)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
        aria-label="Tancar"
      >✕</button>

      <div>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: `${spot.color}22`,
          border: `1.5px solid ${spot.color}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, marginBottom: 14,
        }}>
          {spot.icon}
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: spot.color, marginBottom: 8 }}>
          {tt(spot.label)}
        </div>
        <h3 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 22, color: '#fff', lineHeight: 1.2, marginBottom: 14 }}>
          {tt(spot.title)}
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,.72)' }}>
          {tt(spot.desc)}
        </p>
      </div>

      <div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: 14 }}>
          {tt({ ca: 'Equipament instal·lat', es: 'Equipamiento instalado', fr: 'Équipement installé', en: 'Installed equipment' })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {spot.specs.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', background: 'rgba(255,255,255,.06)', borderRadius: 10, border: '1px solid rgba(255,255,255,.08)' }}>
              <span style={{ color: spot.color, fontSize: 12, marginTop: 1, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,.82)', lineHeight: 1.5 }}>{tt(s)}</span>
            </div>
          ))}
        </div>
      </div>

      <a href="contacta.html" className="btn btn-primary" style={{ marginTop: 'auto', justifyContent: 'center' }}>
        {tt({ ca: 'Sol·licita un projecte similar', es: 'Solicita un proyecto similar', fr: 'Demander un projet similaire', en: 'Request a similar project' })}
      </a>
    </div>
  );
}

function SeuJusticiaPage() {
  useLang();
  const [activeId, setActiveId] = useState(null);
  const activeSpot = HOTSPOTS.find(h => h.id === activeId) || null;

  return (
    <PageShell activePage="Blog">
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: .8; }
          100% { transform: scale(2.1); opacity: 0; }
        }
        .hotspot-img { width: 100%; height: 100%; object-fit: cover; display: block; }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', minHeight: '56vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: 'var(--panel-dark)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#0a1a0e 0%,#152b1c 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(79,158,47,.12) 0%, transparent 60%)' }} />
        <div className="wrap-wide" style={{ position: 'relative', zIndex: 2, paddingTop: 140, paddingBottom: 70, maxWidth: 900 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
            <Tag>
              {tt({ ca: 'Cas d\'Èxit', es: 'Caso de Éxito', fr: 'Cas de Succès', en: 'Success Case' })}
            </Tag>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,.5)', letterSpacing: '.06em' }}>2024</span>
          </div>
          <h1 className="disp" style={{ color: '#fff', fontSize: 'clamp(36px,5.5vw,76px)', lineHeight: 1.08, marginBottom: 22 }}>
            {tt({ ca: 'Seu de la Justícia d\'Andorra', es: 'Sede de la Justicia de Andorra', fr: 'Siège de la Justice d\'Andorre', en: 'Seat of Justice of Andorra' })}
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,.72)', lineHeight: 1.7, maxWidth: 640 }}>
            {tt({
              ca: "Instal·lació integral de sistemes de microfonia, audiovisual i control centralitzat per a les sales d'audiències de la Seu de la Justícia del Principat d'Andorra.",
              es: "Instalación integral de sistemas de microfonía, audiovisual y control centralizado para las salas de audiencias de la Sede de la Justicia del Principado de Andorra.",
              fr: "Installation intégrale de systèmes de microphones, audiovisuels et de contrôle centralisé pour les salles d'audiences du Siège de la Justice de la Principauté d'Andorre.",
              en: "Complete installation of microphone, audiovisual and centralized control systems for the hearing rooms of the Seat of Justice of the Principality of Andorra.",
            })}
          </p>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ background: 'var(--accent)', padding: '0' }}>
        <div className="wrap-wide" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '0' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: '28px 24px', borderRight: i < 3 ? '1px solid rgba(255,255,255,.2)' : 'none', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 'clamp(28px,3vw,48px)', color: '#fff', lineHeight: 1 }}>
                <CountUp to={s.num} suffix={s.suf} dur={1400} />
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.8)', marginTop: 6 }}>
                {tt(s.label)}
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:640px){.wrap-wide > div[style*="grid-template-columns"]{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
      </section>

      {/* ── Interactive image section ── */}
      <section style={{ background: 'var(--panel-dark)', padding: '80px 0' }}>
        <div className="wrap-wide">
          <Reveal style={{ marginBottom: 48 }}>
            <SectionLabel>{tt({ ca: 'Explora la instal·lació', es: 'Explora la instalación', fr: 'Explorez l\'installation', en: 'Explore the installation' })}</SectionLabel>
            <h2 className="disp" style={{ fontSize: 'clamp(28px,3.5vw,48px)', color: '#fff', marginBottom: 14 }}>
              {tt({ ca: 'Fes clic en cada element per veure els detalls', es: 'Haz clic en cada elemento para ver los detalles', fr: 'Cliquez sur chaque élément pour voir les détails', en: 'Click on each element to see the details' })}
            </h2>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 16, maxWidth: 580 }}>
              {tt({ ca: 'Toca els punts de la imatge per descobrir la tecnologia instal·lada en cada punt de la sala.', es: 'Toca los puntos de la imagen para descubrir la tecnología instalada en cada punto de la sala.', fr: 'Touchez les points de l\'image pour découvrir la technologie installée en chaque point de la salle.', en: 'Touch the points on the image to discover the technology installed at each point of the room.' })}
            </p>
          </Reveal>

          {/* Hotspot legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
            {HOTSPOTS.map(h => (
              <button
                key={h.id}
                onClick={() => setActiveId(activeId === h.id ? null : h.id)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '9px 16px', borderRadius: 999,
                  border: `1.5px solid ${activeId === h.id ? h.color : 'rgba(255,255,255,.18)'}`,
                  background: activeId === h.id ? `${h.color}22` : 'transparent',
                  color: activeId === h.id ? h.color : 'rgba(255,255,255,.7)',
                  fontFamily: 'var(--mono)', fontSize: 11.5, letterSpacing: '.08em',
                  cursor: 'pointer', transition: 'all .2s',
                }}
              >
                <span>{h.icon}</span>
                <span style={{ textTransform: 'uppercase', letterSpacing: '.1em' }}>{tt(h.label)}</span>
              </button>
            ))}
          </div>

          {/* Image container with hotspots */}
          <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 40px 100px rgba(0,0,0,.5)' }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
              <img
                className="hotspot-img"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_3CrRWyLJlKarEWqwmRMbcLE2UCZ/hf_20260628_115309_5a9afcae-ec14-4774-bc37-194992c82f74.png"
                alt="Sala d'audiències — Seu de la Justícia d'Andorra"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />

              {/* dark overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(8,18,12,.35) 0%,rgba(8,18,12,.18) 100%)', pointerEvents: 'none' }} />

              {/* Hotspot dots */}
              {HOTSPOTS.map(h => (
                <HotspotDot key={h.id} spot={h} active={activeId === h.id} onClick={setActiveId} />
              ))}

              {/* Instruction chip */}
              {!activeId && (
                <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
                  background: 'rgba(10,20,14,.8)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,.15)', borderRadius: 999,
                  padding: '10px 22px', display: 'flex', alignItems: 'center', gap: 10, pointerEvents: 'none' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse-ring 1.8s ease-out infinite', display: 'inline-block' }} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,.8)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                    {tt({ ca: 'Fes clic en un punt', es: 'Haz clic en un punto', fr: 'Cliquez sur un point', en: 'Click on a point' })}
                  </span>
                </div>
              )}

              {/* Info panel overlay */}
              <InfoPanel spot={activeSpot} onClose={() => setActiveId(null)} />
            </div>
          </div>

          {/* Mobile card fallback — stacked cards on small screens */}
          <div style={{ display: 'none', marginTop: 40, flexDirection: 'column', gap: 16 }} className="mobile-cards">
            {HOTSPOTS.map(h => (
              <div key={h.id} style={{ background: 'rgba(255,255,255,.05)', border: `1px solid ${h.color}44`, borderRadius: 16, padding: '20px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>{h.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: h.color, textTransform: 'uppercase', letterSpacing: '.14em' }}>{tt(h.label)}</div>
                    <div style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 17, color: '#fff' }}>{tt(h.title)}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,.65)', lineHeight: 1.7 }}>{tt(h.desc)}</p>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:640px){ .mobile-cards{display:flex!important;} }`}</style>
        </div>
      </section>

      {/* ── Project narrative ── */}
      <section style={{ background: 'var(--bg)', padding: '100px 0' }}>
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }} className="proj-grid">
            <Reveal>
              <SectionLabel>{tt({ ca: 'El Repte', es: 'El Reto', fr: 'Le Défi', en: 'The Challenge' })}</SectionLabel>
              <h2 className="disp" style={{ fontSize: 32, marginBottom: 20 }}>
                {tt({ ca: 'Tecnologia d\'alt rendiment en un entorn institucional', es: 'Tecnología de alto rendimiento en un entorno institucional', fr: 'Technologie haute performance dans un environnement institutionnel', en: 'High-performance technology in an institutional environment' })}
              </h2>
              <p style={{ color: 'var(--mut)', lineHeight: 1.8, fontSize: 15 }}>
                {tt({
                  ca: "La Seu de la Justícia d'Andorra requeria una solució audiovisual robusta, discreta i escalable, compatible amb els protocols d'enregistrament judicial i els estàndards de seguretat institucionals. El repte principal era integrar tots els sistemes —microfonia, àudio, vídeo i control— en un únic flux de treball sense interrupcions.",
                  es: "La Sede de la Justicia de Andorra requería una solución audiovisual robusta, discreta y escalable, compatible con los protocolos de grabación judicial y los estándares de seguridad institucionales. El reto principal era integrar todos los sistemas —microfonía, audio, vídeo y control— en un único flujo de trabajo sin interrupciones.",
                  fr: "Le Siège de la Justice d'Andorre nécessitait une solution audiovisuelle robuste, discrète et évolutive, compatible avec les protocoles d'enregistrement judiciaire et les normes de sécurité institutionnelles.",
                  en: "The Seat of Justice of Andorra required a robust, discreet and scalable audiovisual solution, compatible with judicial recording protocols and institutional security standards.",
                })}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <SectionLabel>{tt({ ca: 'La Solució', es: 'La Solución', fr: 'La Solution', en: 'The Solution' })}</SectionLabel>
              <h2 className="disp" style={{ fontSize: 32, marginBottom: 20 }}>
                {tt({ ca: 'Integració total amb un sol punt de control', es: 'Integración total con un solo punto de control', fr: 'Intégration totale avec un seul point de contrôle', en: 'Total integration with a single control point' })}
              </h2>
              <p style={{ color: 'var(--mut)', lineHeight: 1.8, fontSize: 15 }}>
                {tt({
                  ca: "Ontec ha desplegat una arquitectura audiovisual completa on microfonia, àudio de sala, pantalles i il·luminació convergeixen en un sistema Crestron centralitzat. El personal pot canviar entre modes —Audiència, Presentació, Reunió— amb un sol toc.",
                  es: "Ontec ha desplegado una arquitectura audiovisual completa donde microfonía, audio de sala, pantallas e iluminación convergen en un sistema Crestron centralizado. El personal puede cambiar entre modos —Audiencia, Presentación, Reunión— con un solo toque.",
                  fr: "Ontec a déployé une architecture audiovisuelle complète où microphones, audio de salle, écrans et éclairage convergent dans un système Crestron centralisé.",
                  en: "Ontec deployed a complete audiovisual architecture where microphones, room audio, screens and lighting converge in a centralized Crestron system.",
                })}
              </p>
            </Reveal>
          </div>
          <style>{`@media(max-width:720px){.proj-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
        </div>
      </section>

      {/* ── Results / Quote ── */}
      <section style={{ background: 'var(--panel)', padding: '80px 0' }}>
        <div className="wrap" style={{ maxWidth: 760, textAlign: 'center' }}>
          <Reveal>
            <div style={{ fontSize: 48, marginBottom: 24 }}>⚖️</div>
            <blockquote style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 'clamp(22px,3vw,36px)', color: 'var(--ink)', lineHeight: 1.25, marginBottom: 24 }}>
              {tt({
                ca: '"La instal·lació d\'Ontec ha transformat completament la nostra capacitat per realitzar audiències telemàtiques i garantir l\'enregistrament judicial de qualitat."',
                es: '"La instalación de Ontec ha transformado completamente nuestra capacidad para realizar audiencias telemáticas y garantizar la grabación judicial de calidad."',
                fr: '"L\'installation d\'Ontec a complètement transformé notre capacité à tenir des audiences téléphoniques et à garantir un enregistrement judiciaire de qualité."',
                en: '"Ontec\'s installation has completely transformed our capacity to conduct remote hearings and guarantee quality judicial recording."',
              })}
            </blockquote>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mut)', letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {tt({ ca: 'Seu de la Justícia — Andorra, 2024', es: 'Sede de la Justicia — Andorra, 2024', fr: 'Siège de la Justice — Andorre, 2024', en: 'Seat of Justice — Andorra, 2024' })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--accent)', padding: '80px 0', textAlign: 'center' }}>
        <div className="wrap">
          <Reveal>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.8)', marginBottom: 18 }}>
              {tt({ ca: 'Tens un projecte similar?', es: '¿Tienes un proyecto similar?', fr: 'Vous avez un projet similaire?', en: 'Have a similar project?' })}
            </div>
            <h2 className="disp" style={{ color: '#fff', fontSize: 'clamp(28px,4vw,56px)', marginBottom: 36 }}>
              {tt({ ca: 'Parlem del teu espai', es: 'Hablemos de tu espacio', fr: 'Parlons de votre espace', en: "Let's talk about your space" })}
            </h2>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="contacta.html" className="btn btn-light">
                {tt({ ca: 'Contacta ara', es: 'Contacta ahora', fr: 'Contactez-nous', en: 'Contact us now' })} <Icons.Arrow s={16} />
              </a>
              <a href="blog.html" className="btn" style={{ background: 'rgba(255,255,255,.12)', color: '#fff', border: '1px solid rgba(255,255,255,.3)' }}>
                {tt({ ca: 'Veure tots els casos', es: 'Ver todos los casos', fr: 'Voir tous les cas', en: 'View all cases' })}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SeuJusticiaPage />);
