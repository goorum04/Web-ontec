// ═══════════════════════════════════════════════════════
// Seu de la Justicia — Interactive Case Study Page
// Professional, institutional case study with an interactive
// hotspot floor-plan and detailed equipment breakdown.
// ═══════════════════════════════════════════════════════

/* ── Local line-icons (SVG, no emoji) ── */
const LIcons = {
  Mic: ({ s = 22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>,
  Screen: ({ s = 22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Speaker: ({ s = 22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><line x1="12" y1="6" x2="12.01" y2="6"/></svg>,
  Sliders: ({ s = 22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
  Scales: ({ s = 40 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="3" x2="12" y2="21"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="4" y1="6.5" x2="20" y2="6.5"/><circle cx="12" cy="4" r="1.4"/><path d="M6 6.5 2.5 13.5a3.5 3.5 0 0 0 7 0z"/><path d="M18 6.5 14.5 13.5a3.5 3.5 0 0 0 7 0z"/></svg>,
  Search: ({ s = 22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>,
  Pencil: ({ s = 22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>,
  Tools: ({ s = 22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/></svg>,
  Grad: ({ s = 22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/></svg>,
};

/* Shared microphone-system equipment (reused across the bench hotspots) */
const MIC_SPECS = [
  { ca: 'Micròfons de coll de cigne Shure professionals per posició', es: 'Micrófonos de cuello de cisne Shure profesionales por posición', fr: 'Microphones col-de-cygne Shure professionnels par position', en: 'Professional Shure gooseneck microphones per position' },
  { ca: 'Cancel·lació d\'eco automàtica (AEC) integrada', es: 'Cancelación de eco automática (AEC) integrada', fr: 'Annulation d\'écho automatique (AEC) intégrée', en: 'Integrated automatic echo cancellation (AEC)' },
  { ca: 'Distribució d\'àudio en xarxa via protocol Dante', es: 'Distribución de audio en red vía protocolo Dante', fr: 'Distribution audio réseau via protocole Dante', en: 'Network audio distribution via Dante protocol' },
  { ca: 'Processador DSP Biamp Tesira per a gestió de sala', es: 'Procesador DSP Biamp Tesira para gestión de sala', fr: 'Processeur DSP Biamp Tesira pour gestion de salle', en: 'Biamp Tesira DSP processor for room management' },
  { ca: 'Activació automàtica i muting individual per posició', es: 'Activación automática y muting individual por posición', fr: 'Activation automatique et muting individuel par position', en: 'Automatic activation and individual muting per position' },
];

const HOTSPOTS = [
  {
    id: 'estrat',
    n: '01',
    Ico: LIcons.Mic,
    x: '63%',
    y: '27%',
    label: { ca: 'Estrat del Jutge', es: 'Estrado del Juez', fr: 'Estrade du Juge', en: "Judge's Bench" },
    title: { ca: 'Microfonia de l\'Estrat', es: 'Microfonía del Estrado', fr: 'Microphones de l\'Estrade', en: 'Bench Microphone System' },
    desc: {
      ca: "L'estrat del jutge i el tribunal disposa de micròfons de coll de cigne amb prioritat de paraula, que capten amb total claredat la direcció de la vista i garanteixen un enregistrament judicial fidel.",
      es: "El estrado del juez y el tribunal dispone de micrófonos de cuello de cisne con prioridad de palabra, que captan con total claridad la dirección de la vista y garantizan una grabación judicial fiel.",
      fr: "L'estrade du juge dispose de microphones col-de-cygne avec priorité de parole, captant avec une clarté totale la conduite de l'audience et garantissant un enregistrement judiciaire fidèle.",
      en: "The judge's bench features gooseneck microphones with speech priority, capturing the conduct of the hearing with total clarity and ensuring faithful judicial recording."
    },
    specs: MIC_SPECS,
    color: '#4f9e2f',
  },
  {
    id: 'fiscalia',
    n: '02',
    Ico: LIcons.Mic,
    x: '50%',
    y: '27%',
    label: { ca: 'Bancada Fiscalia', es: 'Bancada Fiscalía', fr: 'Banc du Parquet', en: 'Prosecution Bench' },
    title: { ca: 'Microfonia de la Fiscalia', es: 'Microfonía de la Fiscalía', fr: 'Microphones du Parquet', en: 'Prosecution Microphones' },
    desc: {
      ca: "La bancada de la Fiscalia incorpora micròfons individuals per a cada posició, assegurant una captació nítida de les intervencions del ministeri fiscal, integrats en el mateix sistema digital de sala.",
      es: "La bancada de la Fiscalía incorpora micrófonos individuales para cada posición, asegurando una captación nítida de las intervenciones del ministerio fiscal, integrados en el mismo sistema digital de sala.",
      fr: "Le banc du parquet intègre des microphones individuels pour chaque position, assurant une captation nette des interventions, intégrés au même système numérique de salle.",
      en: "The prosecution bench incorporates individual microphones for each position, ensuring clear capture of the prosecution's interventions, integrated into the same digital room system."
    },
    specs: MIC_SPECS,
    color: '#4f9e2f',
  },
  {
    id: 'advocats',
    n: '03',
    Ico: LIcons.Mic,
    x: '56%',
    y: '29%',
    label: { ca: 'Bancada Advocats', es: 'Bancada Abogados', fr: 'Banc des Avocats', en: 'Lawyers Bench' },
    title: { ca: 'Microfonia dels Advocats', es: 'Microfonía de los Abogados', fr: 'Microphones des Avocats', en: 'Lawyers Microphones' },
    desc: {
      ca: "La bancada dels advocats compta amb micròfons propis per a cada lletrat, permetent que les intervencions de la defensa quedin recollides amb la mateixa qualitat i sense interferències que la resta de la sala.",
      es: "La bancada de los abogados cuenta con micrófonos propios para cada letrado, permitiendo que las intervenciones de la defensa queden recogidas con la misma calidad y sin interferencias que el resto de la sala.",
      fr: "Le banc des avocats dispose de microphones propres pour chaque avocat, permettant de recueillir les interventions de la défense avec la même qualité et sans interférences que le reste de la salle.",
      en: "The lawyers bench has dedicated microphones for each counsel, so the defense's interventions are captured with the same quality and interference-free clarity as the rest of the room."
    },
    specs: MIC_SPECS,
    color: '#4f9e2f',
  },
  {
    id: 'secretaria',
    n: '04',
    Ico: LIcons.Mic,
    x: '75%',
    y: '34%',
    label: { ca: 'Secretaria Judicial', es: 'Secretaría Judicial', fr: 'Greffe', en: 'Court Clerk' },
    title: { ca: 'Microfonia de Secretaria', es: 'Microfonía de Secretaría', fr: 'Microphones du Greffe', en: 'Court Clerk Microphones' },
    desc: {
      ca: "La taula de la secretaria judicial incorpora micròfons de coll de cigne dedicats per documentar la sessió i gestionar les actes, garantint una captació clara de totes les intervencions del procediment.",
      es: "La mesa de la secretaría judicial incorpora micrófonos de cuello de cisne dedicados para documentar la sesión y gestionar las actas, garantizando una captación clara de todas las intervenciones del procedimiento.",
      fr: "La table du greffe intègre des microphones col-de-cygne dédiés pour documenter la séance et gérer les procès-verbaux, garantissant une captation claire de toutes les interventions.",
      en: "The court clerk's desk includes dedicated gooseneck microphones to document the session and manage the records, ensuring clear capture of all interventions in the proceedings."
    },
    specs: MIC_SPECS,
    color: '#4f9e2f',
  },
  {
    id: 'pantalles',
    n: '05',
    Ico: LIcons.Screen,
    x: '37%',
    y: '16%',
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
    color: '#2563a0',
  },
  {
    id: 'altaveus',
    n: '06',
    Ico: LIcons.Speaker,
    x: '64%',
    y: '8%',
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
      { ca: 'Sistema de delay calibrat per zones — latència < 5 ms', es: 'Sistema de delay calibrado por zonas — latencia < 5 ms', fr: 'Système de delay calibré par zones — latence < 5 ms', en: 'Zone-calibrated delay system — latency < 5 ms' },
      { ca: 'Equalització automàtica de la sala per freqüències de veu', es: 'Ecualización automática de la sala para frecuencias de voz', fr: 'Égalisation automatique de la salle pour les fréquences vocales', en: 'Automatic room equalization for voice frequencies' },
    ],
    color: '#7c5cbf',
  },
  {
    id: 'declaracio',
    n: '07',
    Ico: LIcons.Mic,
    x: '60%',
    y: '41%',
    label: { ca: 'Estrat de Declaració', es: 'Estrado de Declaración', fr: 'Barre de Déclaration', en: 'Witness Stand' },
    title: { ca: 'Microfonia del Declarant', es: 'Microfonía del Declarante', fr: 'Microphone du Déclarant', en: 'Witness Microphone' },
    desc: {
      ca: "La taula on declaren testimonis, pèrits i les parts disposa d'un micròfon dedicat que garanteix una captació clara de cada declaració, essencial per a l'enregistrament judicial i la retransmissió per videoconferència.",
      es: "La mesa donde declaran testigos, peritos y las partes dispone de un micrófono dedicado que garantiza una captación clara de cada declaración, esencial para la grabación judicial y la retransmisión por videoconferencia.",
      fr: "La table où témoignent témoins, experts et parties dispose d'un microphone dédié garantissant une captation claire de chaque déclaration, essentielle à l'enregistrement judiciaire et à la visioconférence.",
      en: "The table where witnesses, experts and parties give testimony has a dedicated microphone ensuring clear capture of every statement, essential for judicial recording and video-conference streaming."
    },
    specs: MIC_SPECS,
    color: '#4f9e2f',
  },
];

const STATS = [
  { num: 4,  suf: '', label: { ca: 'Sales equipades', es: 'Salas equipadas', fr: 'Salles équipées', en: 'Equipped rooms' } },
  { num: 12, suf: '', label: { ca: 'Micròfons instal·lats', es: 'Micrófonos instalados', fr: 'Microphones installés', en: 'Microphones installed' } },
  { num: 8,  suf: '', label: { ca: 'Pantalles 4K', es: 'Pantallas 4K', fr: 'Écrans 4K', en: '4K screens' } },
  { num: 100, suf: '%', label: { ca: 'Integració centralitzada', es: 'Integración centralizada', fr: 'Intégration centralisée', en: 'Centralized integration' } },
];

/* Project fact-sheet (institutional case-study meta) */
const META = [
  { k: { ca: 'Client', es: 'Cliente', fr: 'Client', en: 'Client' },
    v: { ca: 'Seu de la Justícia · Principat d\'Andorra', es: 'Sede de la Justicia · Principado de Andorra', fr: 'Siège de la Justice · Principauté d\'Andorre', en: 'Seat of Justice · Principality of Andorra' } },
  { k: { ca: 'Sector', es: 'Sector', fr: 'Secteur', en: 'Sector' },
    v: { ca: 'Institucional · Judicial', es: 'Institucional · Judicial', fr: 'Institutionnel · Judiciaire', en: 'Institutional · Judicial' } },
  { k: { ca: 'Àmbit', es: 'Ámbito', fr: 'Périmètre', en: 'Scope' },
    v: { ca: 'Microfonia · AV · Control', es: 'Microfonía · AV · Control', fr: 'Micros · AV · Contrôle', en: 'Microphones · AV · Control' } },
  { k: { ca: 'Any', es: 'Año', fr: 'Année', en: 'Year' },
    v: { ca: '2024', es: '2024', fr: '2024', en: '2024' } },
];

/* Real equipment brands deployed (marquee) */
const BRANDS = ['Shure', 'Biamp', 'Bose', 'Crown', 'Crestron', 'Samsung', 'Dante', 'Cisco Webex'];

/* Methodology / process steps */
const PROCESS = [
  { Ico: LIcons.Search, n: '01',
    t: { ca: 'Anàlisi i consultoria', es: 'Análisis y consultoría', fr: 'Analyse et conseil', en: 'Analysis & consulting' },
    d: { ca: 'Estudi acústic de la sala, anàlisi de requeriments judicials i protocols de seguretat institucionals.', es: 'Estudio acústico de la sala, análisis de requisitos judiciales y protocolos de seguridad institucionales.', fr: 'Étude acoustique de la salle, analyse des exigences judiciaires et des protocoles de sécurité.', en: 'Room acoustic study, analysis of judicial requirements and institutional security protocols.' } },
  { Ico: LIcons.Pencil, n: '02',
    t: { ca: 'Disseny i enginyeria', es: 'Diseño e ingeniería', fr: 'Conception et ingénierie', en: 'Design & engineering' },
    d: { ca: 'Projecte tècnic detallat, selecció d\'equipament homologat i disseny de la integració centralitzada.', es: 'Proyecto técnico detallado, selección de equipamiento homologado y diseño de la integración centralizada.', fr: 'Projet technique détaillé, sélection d\'équipement homologué et conception de l\'intégration centralisée.', en: 'Detailed technical project, selection of certified equipment and design of the centralized integration.' } },
  { Ico: LIcons.Tools, n: '03',
    t: { ca: 'Instal·lació i posada en marxa', es: 'Instalación y puesta en marcha', fr: 'Installation et mise en service', en: 'Installation & commissioning' },
    d: { ca: 'Desplegament, cablejat estructurat, calibratge acústic i configuració de tots els subsistemes.', es: 'Despliegue, cableado estructurado, calibrado acústico y configuración de todos los subsistemas.', fr: 'Déploiement, câblage structuré, calibrage acoustique et configuration de tous les sous-systèmes.', en: 'Deployment, structured cabling, acoustic calibration and configuration of all subsystems.' } },
  { Ico: LIcons.Grad, n: '04',
    t: { ca: 'Formació i suport', es: 'Formación y soporte', fr: 'Formation et support', en: 'Training & support' },
    d: { ca: 'Formació del personal, documentació tècnica i manteniment preventiu amb monitoratge remot.', es: 'Formación del personal, documentación técnica y mantenimiento preventivo con monitoreo remoto.', fr: 'Formation du personnel, documentation technique et maintenance préventive avec surveillance à distance.', en: 'Staff training, technical documentation and preventive maintenance with remote monitoring.' } },
];

/* ── Pulsing hotspot marker (SVG icon, numbered) ── */
function HotspotDot({ spot, active, onClick }) {
  const col = spot.color;
  const Ico = spot.Ico;
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={() => onClick(active ? null : spot.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={tt(spot.label)}
      style={{
        position: 'absolute',
        left: spot.x,
        top: spot.y,
        transform: `translate(-50%,-50%) scale(${active || hover ? 1.08 : 1})`,
        width: 46,
        height: 46,
        borderRadius: '50%',
        border: `2px solid ${active ? '#fff' : 'rgba(255,255,255,.92)'}`,
        background: active ? col : 'rgba(12,22,16,.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        zIndex: active || hover ? 16 : 10,
        boxShadow: active ? `0 0 0 6px ${col}33, 0 8px 24px rgba(0,0,0,.45)` : '0 4px 16px rgba(0,0,0,.4)',
        transition: 'transform .25s cubic-bezier(.2,.7,.3,1), background .25s, box-shadow .25s',
      }}
    >
      <Ico s={20} />
      {/* number badge */}
      <span style={{
        position: 'absolute', top: -7, right: -7, minWidth: 19, height: 19, padding: '0 4px',
        borderRadius: 10, background: active ? '#fff' : col, color: active ? col : '#fff',
        fontFamily: 'var(--mono)', fontSize: 9.5, fontWeight: 700, lineHeight: '19px', textAlign: 'center',
        border: '1.5px solid rgba(255,255,255,.85)', pointerEvents: 'none',
      }}>{spot.n}</span>
      {/* pulse ring (idle only) */}
      {!active && (
        <span style={{
          position: 'absolute', inset: -4, borderRadius: '50%',
          border: `2px solid ${col}`, animation: 'pulse-ring 2.2s ease-out infinite', pointerEvents: 'none',
        }} />
      )}
      {/* hover label chip */}
      {hover && !active && (
        <span style={{
          position: 'absolute', bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)',
          whiteSpace: 'nowrap', background: 'rgba(10,20,14,.92)', color: '#fff',
          fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase',
          padding: '6px 11px', borderRadius: 7, border: `1px solid ${col}`, pointerEvents: 'none',
        }}>{tt(spot.label)}</span>
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
  const Ico = spot.Ico;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 'min(420px, 100%)',
        background: 'rgba(10,20,14,.95)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderLeft: `3px solid ${spot.color}`,
        padding: '34px 30px',
        overflowY: 'auto',
        zIndex: 20,
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .35s cubic-bezier(.2,.7,.3,1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 18, right: 18,
          background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.18)',
          borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.2)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
        aria-label="Tancar"
      ><Icons.X /></button>

      <div>
        <div style={{
          width: 50, height: 50, borderRadius: 14,
          background: `${spot.color}26`, border: `1.5px solid ${spot.color}66`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', marginBottom: 16,
        }}>
          <Ico s={24} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, color: spot.color }}>{spot.n}</span>
          <span style={{ width: 16, height: 1, background: `${spot.color}88` }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: spot.color }}>
            {tt(spot.label)}
          </span>
        </div>
        <h3 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 23, color: '#fff', lineHeight: 1.18, marginBottom: 14 }}>
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
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '11px 14px', background: 'rgba(255,255,255,.05)', borderRadius: 10, border: '1px solid rgba(255,255,255,.08)' }}>
              <span style={{ color: spot.color, marginTop: 1, flexShrink: 0, display: 'inline-flex' }}><Icons.Check /></span>
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

/* ── 3D card (mobile) — perspective, depth, tap-tilt & expand ── */
function Card3D({ spot, index }) {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const Ico = spot.Ico;
  useLang();
  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setShown(true); return; }
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { setShown(true); io.unobserve(el); } });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const tilt = (e) => {
    const el = cardRef.current; if (!el) return;
    const t = e.touches ? e.touches[0] : e;
    const r = el.getBoundingClientRect();
    const px = (t.clientX - r.left) / r.width - 0.5;
    const py = (t.clientY - r.top) / r.height - 0.5;
    el.style.transition = 'transform .08s linear';
    el.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 14}deg) translateZ(16px)`;
  };
  const reset = () => {
    const el = cardRef.current; if (!el) return;
    el.style.transition = 'transform .6s cubic-bezier(.2,.7,.3,1)';
    el.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
  };
  return (
    <div ref={wrapRef} className="c3d-wrap">
      <div
        ref={cardRef}
        className={`c3d ${shown ? 'c3d-in' : ''}`}
        onTouchMove={tilt}
        onTouchEnd={reset}
        onTouchCancel={reset}
        onMouseMove={tilt}
        onMouseLeave={reset}
        style={{
          position: 'relative',
          animationDelay: `${index * 90}ms`,
          background: 'linear-gradient(160deg, rgba(20,34,26,.96), rgba(9,17,12,.98))',
          border: `1px solid ${spot.color}55`,
          borderRadius: 22,
          padding: '30px 24px',
          boxShadow: `0 26px 60px -20px ${spot.color}66, 0 10px 30px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06)`,
          overflow: 'hidden',
        }}
      >
        {/* corner glow */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 190, height: 190, borderRadius: '50%', background: `radial-gradient(circle, ${spot.color}40, transparent 70%)`, pointerEvents: 'none' }} />
        {/* watermark number */}
        <span style={{ position: 'absolute', top: 6, right: 16, fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 92, lineHeight: 1, color: '#fff', opacity: 0.05, pointerEvents: 'none' }}>{spot.n}</span>

        {/* floating 3D icon badge */}
        <div className="c3d-badge" style={{
          width: 66, height: 66, borderRadius: 18, marginBottom: 22,
          background: `linear-gradient(145deg, ${spot.color}, ${spot.color}aa)`,
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 16px 34px -8px ${spot.color}cc`,
        }}>
          <Ico s={30} />
        </div>

        <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: spot.color, textTransform: 'uppercase', letterSpacing: '.16em', marginBottom: 8 }}>{spot.n} · {tt(spot.label)}</div>
        <h3 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 21, color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>{tt(spot.title)}</h3>
        <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.66)', lineHeight: 1.7 }}>{tt(spot.desc)}</p>

        <button onClick={() => setOpen(o => !o)} style={{
          marginTop: 20, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,.06)', border: `1px solid ${spot.color}44`, borderRadius: 12,
          padding: '13px 16px', cursor: 'pointer', color: '#fff',
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase',
        }}>
          {open ? tt({ ca: 'Amaga equipament', es: 'Ocultar equipo', fr: 'Masquer', en: 'Hide equipment' }) : tt({ ca: 'Veure equipament', es: 'Ver equipamiento', fr: 'Voir équipement', en: 'View equipment' })}
          <span style={{ transition: 'transform .3s', transform: open ? 'rotate(45deg)' : 'none', display: 'inline-flex' }}><Icons.Plus /></span>
        </button>

        <div style={{ maxHeight: open ? 800 : 0, overflow: 'hidden', transition: 'max-height .55s cubic-bezier(.2,.7,.3,1)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, paddingTop: 16 }}>
            {spot.specs.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: spot.color, marginTop: 1, flexShrink: 0, display: 'inline-flex' }}><Icons.Check /></span>
                <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.78)', lineHeight: 1.5 }}>{tt(s)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
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
          0% { transform: scale(1); opacity: .75; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .hotspot-img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* 3D mobile cards */
        .explore-mobile { display: none; }
        .c3d-wrap { perspective: 1000px; }
        .c3d { transform-style: preserve-3d; opacity: 0; will-change: transform; }
        .c3d-in { animation: c3d-enter .85s cubic-bezier(.2,.7,.3,1) both; }
        @keyframes c3d-enter {
          0% { opacity: 0; transform: rotateX(26deg) translateY(46px) scale(.92); }
          100% { opacity: 1; transform: rotateX(0) translateY(0) scale(1); }
        }
        .c3d-badge { transform: translateZ(42px); animation: c3d-float 4s ease-in-out infinite; }
        @keyframes c3d-float {
          0%,100% { transform: translateZ(42px) translateY(0); }
          50% { transform: translateZ(42px) translateY(-6px); }
        }
        @media (max-width: 720px) {
          .explore-desktop { display: none !important; }
          .explore-mobile { display: grid !important; gap: 20px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .c3d, .c3d-in { animation: none !important; opacity: 1 !important; }
          .c3d-badge { animation: none !important; transform: translateZ(42px); }
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', minHeight: '62vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: 'var(--panel-dark)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#0a1a0e 0%,#152b1c 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 72% 45%, rgba(79,158,47,.14) 0%, transparent 62%)' }} />
        <div className="wrap-wide" style={{ position: 'relative', zIndex: 2, paddingTop: 140, paddingBottom: 64, maxWidth: 980 }}>
          {/* breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 26, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.08em', color: 'rgba(255,255,255,.5)' }}>
            <a href="index.html" style={{ color: 'inherit', textDecoration: 'none' }}>{tt({ ca: 'Inici', es: 'Inicio', fr: 'Accueil', en: 'Home' })}</a>
            <span style={{ opacity: .5 }}>/</span>
            <a href="blog.html" style={{ color: 'inherit', textDecoration: 'none' }}>{tt({ ca: 'Casos d\'èxit', es: 'Casos de éxito', fr: 'Études de cas', en: 'Case studies' })}</a>
            <span style={{ opacity: .5 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,.85)' }}>{tt({ ca: 'Seu de la Justícia', es: 'Sede de la Justicia', fr: 'Siège de la Justice', en: 'Seat of Justice' })}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
            <Tag>{tt({ ca: 'Cas d\'Èxit', es: 'Caso de Éxito', fr: 'Cas de Succès', en: 'Success Case' })}</Tag>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,.5)', letterSpacing: '.06em' }}>{tt({ ca: 'Sector Institucional', es: 'Sector Institucional', fr: 'Secteur Institutionnel', en: 'Institutional Sector' })}</span>
          </div>
          <h1 className="disp" style={{ color: '#fff', fontSize: 'clamp(36px,5.5vw,76px)', lineHeight: 1.06, marginBottom: 24 }}>
            {tt({ ca: 'Seu de la Justícia d\'Andorra', es: 'Sede de la Justicia de Andorra', fr: 'Siège de la Justice d\'Andorre', en: 'Seat of Justice of Andorra' })}
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,.74)', lineHeight: 1.7, maxWidth: 660 }}>
            {tt({
              ca: "Instal·lació integral de sistemes de microfonia, audiovisual i control centralitzat per a les sales d'audiències de la Seu de la Justícia del Principat d'Andorra.",
              es: "Instalación integral de sistemas de microfonía, audiovisual y control centralizado para las salas de audiencias de la Sede de la Justicia del Principado de Andorra.",
              fr: "Installation intégrale de systèmes de microphones, audiovisuels et de contrôle centralisé pour les salles d'audiences du Siège de la Justice de la Principauté d'Andorre.",
              en: "Complete installation of microphone, audiovisual and centralized control systems for the hearing rooms of the Seat of Justice of the Principality of Andorra.",
            })}
          </p>
        </div>
      </section>

      {/* ── Project fact-sheet ── */}
      <section style={{ background: 'var(--panel-dark)', borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <div className="wrap-wide meta-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {META.map((m, i) => (
            <div key={i} style={{ padding: '26px 28px', borderRight: i < META.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent-2)', marginBottom: 9 }}>{tt(m.k)}</div>
              <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,.86)', lineHeight: 1.4 }}>{tt(m.v)}</div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:760px){.meta-grid{grid-template-columns:repeat(2,1fr)!important;} .meta-grid > div:nth-child(2n){border-right:none!important;} .meta-grid > div:nth-child(-n+2){border-bottom:1px solid rgba(255,255,255,.08);}}`}</style>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ background: 'var(--accent)', padding: '0' }}>
        <div className="wrap-wide stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '0' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: '30px 24px', borderRight: i < 3 ? '1px solid rgba(255,255,255,.2)' : 'none', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 'clamp(28px,3vw,48px)', color: '#fff', lineHeight: 1 }}>
                <CountUp to={s.num} suffix={s.suf} dur={1400} />
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.82)', marginTop: 8 }}>
                {tt(s.label)}
              </div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:640px){.stat-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
      </section>

      {/* ── Interactive image section ── */}
      <section style={{ background: 'var(--panel-dark)', padding: '90px 0' }}>
        <div className="wrap-wide">
          <Reveal style={{ marginBottom: 44 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
              <span style={{ width: 22, height: 2, background: 'var(--accent-2)' }} />
              <span className="kicker" style={{ color: 'var(--accent-2)' }}>{tt({ ca: 'Explora la instal·lació', es: 'Explora la instalación', fr: 'Explorez l\'installation', en: 'Explore the installation' })}</span>
            </div>
            <h2 className="disp" style={{ fontSize: 'clamp(28px,3.5vw,48px)', color: '#fff', marginBottom: 14 }}>
              {tt({ ca: 'Fes clic en cada element per veure els detalls', es: 'Haz clic en cada elemento para ver los detalles', fr: 'Cliquez sur chaque élément pour voir les détails', en: 'Click on each element to see the details' })}
            </h2>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 16, maxWidth: 600, lineHeight: 1.7 }}>
              {tt({ ca: 'Explora els quatre subsistemes que hem desplegat a la sala d\'audiències. Cada punt revela la tecnologia instal·lada i l\'equipament professional emprat.', es: 'Explora los cuatro subsistemas que hemos desplegado en la sala de audiencias. Cada punto revela la tecnología instalada y el equipamiento profesional empleado.', fr: 'Explorez les quatre sous-systèmes déployés dans la salle d\'audiences. Chaque point révèle la technologie installée et l\'équipement professionnel utilisé.', en: 'Explore the four subsystems we deployed in the hearing room. Each point reveals the installed technology and the professional equipment used.' })}
            </p>
          </Reveal>

          {/* Desktop: interactive hotspot image */}
          <div className="explore-desktop">
          {/* Hotspot legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
            {HOTSPOTS.map(h => {
              const on = activeId === h.id;
              const Ico = h.Ico;
              return (
                <button
                  key={h.id}
                  onClick={() => setActiveId(on ? null : h.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 9,
                    padding: '9px 16px 9px 12px', borderRadius: 999,
                    border: `1.5px solid ${on ? h.color : 'rgba(255,255,255,.18)'}`,
                    background: on ? `${h.color}22` : 'transparent',
                    color: on ? '#fff' : 'rgba(255,255,255,.7)',
                    fontFamily: 'var(--mono)', fontSize: 11.5, letterSpacing: '.08em',
                    cursor: 'pointer', transition: 'all .2s',
                  }}
                >
                  <span style={{ display: 'inline-flex', color: h.color }}><Ico s={16} /></span>
                  <span style={{ textTransform: 'uppercase', letterSpacing: '.1em' }}>{tt(h.label)}</span>
                </button>
              );
            })}
          </div>

          {/* Image container with hotspots */}
          <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 40px 100px rgba(0,0,0,.5)' }}>
            <div style={{ position: 'relative', paddingBottom: '39.1%' }}>
              <img
                className="hotspot-img"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_3CrRWyLJlKarEWqwmRMbcLE2UCZ/hf_20260629_061548_e1229967-32c7-468f-b0cd-5d1a12da7334.png"
                alt="Sala de vistes — Seu de la Justícia d'Andorra"
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
                  background: 'rgba(10,20,14,.82)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,.15)', borderRadius: 999,
                  padding: '10px 22px', display: 'flex', alignItems: 'center', gap: 10, pointerEvents: 'none' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-2)', animation: 'pulse-ring 1.8s ease-out infinite', display: 'inline-block' }} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,.82)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                    {tt({ ca: 'Fes clic en un punt', es: 'Haz clic en un punto', fr: 'Cliquez sur un point', en: 'Click on a point' })}
                  </span>
                </div>
              )}

              {/* Info panel overlay */}
              <InfoPanel spot={activeSpot} onClose={() => setActiveId(null)} />
            </div>
          </div>
          </div>{/* /explore-desktop */}

          {/* Mobile: immersive 3D cards */}
          <div className="explore-mobile">
            {HOTSPOTS.map((h, i) => (
              <Card3D key={h.id} spot={h} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Equipment brands marquee ── */}
      <section style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line)', padding: '34px 0' }}>
        <div className="wrap-wide" style={{ marginBottom: 22 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--faint)', textAlign: 'center' }}>
            {tt({ ca: 'Equipament professional desplegat', es: 'Equipamiento profesional desplegado', fr: 'Équipement professionnel déployé', en: 'Professional equipment deployed' })}
          </div>
        </div>
        <Marquee items={BRANDS} />
      </section>

      {/* ── Challenge / Solution narrative ── */}
      <section style={{ background: 'var(--bg)', padding: '100px 0' }}>
        <div className="wrap" style={{ maxWidth: 980 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }} className="proj-grid">
            <Reveal>
              <SectionLabel>{tt({ ca: 'El Repte', es: 'El Reto', fr: 'Le Défi', en: 'The Challenge' })}</SectionLabel>
              <h2 className="disp" style={{ fontSize: 30, marginBottom: 20 }}>
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
              <h2 className="disp" style={{ fontSize: 30, marginBottom: 20 }}>
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

      {/* ── Methodology / process ── */}
      <section style={{ background: 'var(--panel)', padding: '100px 0', borderTop: '1px solid var(--line)' }}>
        <div className="wrap-wide">
          <Reveal style={{ marginBottom: 56, maxWidth: 680 }}>
            <SectionLabel>{tt({ ca: 'Metodologia', es: 'Metodología', fr: 'Méthodologie', en: 'Methodology' })}</SectionLabel>
            <h2 className="disp" style={{ fontSize: 'clamp(28px,3.4vw,46px)', marginBottom: 16 }}>
              {tt({ ca: 'Com hem executat el projecte', es: 'Cómo hemos ejecutado el proyecto', fr: 'Comment nous avons exécuté le projet', en: 'How we executed the project' })}
            </h2>
            <p style={{ color: 'var(--mut)', fontSize: 16, lineHeight: 1.7 }}>
              {tt({ ca: 'Un procés de quatre fases que garanteix una instal·lació sense incidències i una transició operativa fluida.', es: 'Un proceso de cuatro fases que garantiza una instalación sin incidencias y una transición operativa fluida.', fr: 'Un processus en quatre phases garantissant une installation sans incident et une transition opérationnelle fluide.', en: 'A four-phase process ensuring an incident-free installation and a smooth operational handover.' })}
            </p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }} className="proc-grid">
            {PROCESS.map((p, i) => {
              const Ico = p.Ico;
              return (
                <Reveal key={i} delay={i * 90}>
                  <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 16, padding: '28px 24px', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                      <span style={{ width: 46, height: 46, borderRadius: 12, background: A(10), border: `1px solid ${A(24)}`, color: 'var(--accent-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico s={22} /></span>
                      <span style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 28, color: 'var(--line)' }}>{p.n}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 17, marginBottom: 10, lineHeight: 1.25 }}>{tt(p.t)}</h3>
                    <p style={{ color: 'var(--mut)', fontSize: 13.5, lineHeight: 1.65 }}>{tt(p.d)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <style>{`@media(max-width:980px){.proc-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:560px){.proc-grid{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </section>

      {/* ── Results / Quote ── */}
      <section style={{ background: 'var(--panel-dark)', padding: '100px 0' }}>
        <div className="wrap" style={{ maxWidth: 820, textAlign: 'center' }}>
          <Reveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 72, height: 72, borderRadius: 18, background: 'rgba(142,198,63,.12)', border: '1px solid rgba(142,198,63,.3)', color: 'var(--accent-2)', marginBottom: 30 }}>
              <LIcons.Scales s={36} />
            </div>
            <blockquote style={{ fontFamily: 'var(--disp)', fontWeight: 800, fontSize: 'clamp(22px,3vw,36px)', color: '#fff', lineHeight: 1.3, marginBottom: 26, letterSpacing: '-0.01em' }}>
              {tt({
                ca: '"La instal·lació d\'Ontec ha transformat completament la nostra capacitat per realitzar audiències telemàtiques i garantir l\'enregistrament judicial de qualitat."',
                es: '"La instalación de Ontec ha transformado completamente nuestra capacidad para realizar audiencias telemáticas y garantizar la grabación judicial de calidad."',
                fr: '"L\'installation d\'Ontec a complètement transformé notre capacité à tenir des audiences à distance et à garantir un enregistrement judiciaire de qualité."',
                en: '"Ontec\'s installation has completely transformed our capacity to conduct remote hearings and guarantee quality judicial recording."',
              })}
            </blockquote>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent-2)', letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {tt({ ca: 'Seu de la Justícia — Andorra, 2024', es: 'Sede de la Justicia — Andorra, 2024', fr: 'Siège de la Justice — Andorre, 2024', en: 'Seat of Justice — Andorra, 2024' })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--accent)', padding: '90px 0', textAlign: 'center' }}>
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
