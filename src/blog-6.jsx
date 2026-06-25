const ARTICLE_DATA = {
  id: 'av-sales-reunions',
  tag: {ca:'Audiovisuals',es:'Audiovisuales',fr:'Audiovisuel',en:'Audiovisual'},
  date: '2022',
  readtime: '5 min',
  title: {
    ca:'Disseny de sales de reunions per a l\'era hibrida',
    es:'Diseño de salas de reuniones para la era híbrida',
    fr:'Conception de salles de réunion pour l\'ère hybride',
    en:'Designing meeting rooms for the hybrid era'
  },
  author: 'Ontec',
  content: {
    ca: (
    <>
      <p>La pandèmia va forçar les empreses a reimaginar les sales de reunions. Ja no es tracta de 10 persones al voltant d'una taula: ara es barreja personal presencial amb remot (persones en 3-5 ubicacions simultàniament). Aquí t'expliquem com dissenyar sales que siguin efectives per al treball híbrid.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Requisits de la sala híbrida</h2>
      <p><strong>1. Captura audiovisual equilibrada</strong>. Totes les persones presencials han de ser visibles de manera equitativa per als remots. Això requereix càmeres de pan-tilt-zoom amb enfocament automàtic. Sense un "cap de la sala" dominant.</p>
      <p style={{marginTop:16}}><strong>2. Àudio professional</strong>. Micròfons de condensador de cobertura ampla (no una sola unitat de conferència de taula). Cancel·lació d'eco agressiva. Els remots han de sentir-se com si fossin a la sala.</p>
      <p style={{marginTop:16}}><strong>3. Pantalles múltiples</strong>. Una pantalla gran (75"-85") per al contingut compartit. Miniatures dels participants remots en angles visibles.</p>
      <p style={{marginTop:16}}><strong>4. Control intuïtiu</strong>. Un botó per iniciar la reunió, control automàtic de brillantor i zoom. Els executius no han de ser tècnics.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Arquitectura recomanada</h2>
      <p><strong>Càmeres:</strong> Sony PTZ Pro 2 o Logitech Rally. Control motoritzat, AI tracking dels parlants actius.</p>
      <p style={{marginTop:16}}><strong>Àudio:</strong> Unitat de conferència Shure Microflex + subwoofers QSC per als greus. Processament de senyal en temps real.</p>
      <p style={{marginTop:16}}><strong>Pantalla:</strong> Samsung The Wall (LED modular) o LG OLED signage (800+ nits de brillantor).</p>
      <p style={{marginTop:16}}><strong>Codec:</strong> Cisco Webex Room Pro o Zoom Rooms. Integració seamless amb apps estàndard.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Costos típics</h2>
      <p>Una sala de reunions híbrida premium de 25-30 m² oscil·la entre:</p>
      <ul style={{marginLeft:24,marginTop:16,marginBottom:16}}>
        <li style={{marginBottom:10}}>• Equipament: 25.000€ - 40.000€</li>
        <li style={{marginBottom:10}}>• Instal·lació i xarxes: 8.000€ - 12.000€</li>
        <li style={{marginBottom:10}}>• Formació i suport: 2.000€ - 3.000€</li>
      </ul>
      <p style={{marginTop:16}}>Total: 35.000€ - 55.000€. El ROI es recupera en 18-24 mesos (reducció de viatges, productivitat ampliada).</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Truc avançat: control de llum adaptatiu</h2>
      <p>Les càmeres es veuen millor amb una il·luminació consistent. Integra Lutron Palladiom per al control automàtic de la llum: detecta si s'està fent streaming i ajusta la brillantor i la temperatura de color per optimitzar la captura.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Conclusió</h2>
      <p>Una sala de reunions híbrida ben dissenyada no és un luxe: és una necessitat competitiva. Els equips remots senten que hi són físicament. Els executius lideren des de qualsevol ubicació sense pèrdua de presència.</p>
    </>
    ),
    es: (
    <>
      <p>La pandemia obligó a las empresas a reimaginar las salas de reuniones. Ya no se trata de 10 personas alrededor de una mesa: ahora se mezcla personal presencial con remoto (personas en 3-5 ubicaciones simultáneamente). Aquí te explicamos cómo diseñar salas que sean efectivas para el trabajo híbrido.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Requisitos de la sala híbrida</h2>
      <p><strong>1. Captura audiovisual equilibrada</strong>. Todas las personas presenciales deben ser visibles de forma equitativa para los remotos. Esto requiere cámaras de pan-tilt-zoom con enfoque automático. Sin un "cabecera de la sala" dominante.</p>
      <p style={{marginTop:16}}><strong>2. Audio profesional</strong>. Micrófonos de condensador de cobertura amplia (no una sola unidad de conferencia de mesa). Cancelación de eco agresiva. Los remotos deben sentirse como si estuvieran en la sala.</p>
      <p style={{marginTop:16}}><strong>3. Pantallas múltiples</strong>. Una pantalla grande (75"-85") para el contenido compartido. Miniaturas de los participantes remotos en ángulos visibles.</p>
      <p style={{marginTop:16}}><strong>4. Control intuitivo</strong>. Un botón para iniciar la reunión, control automático de brillo y zoom. Los ejecutivos no tienen que ser técnicos.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Arquitectura recomendada</h2>
      <p><strong>Cámaras:</strong> Sony PTZ Pro 2 o Logitech Rally. Control motorizado, AI tracking de los hablantes activos.</p>
      <p style={{marginTop:16}}><strong>Audio:</strong> Unidad de conferencia Shure Microflex + subwoofers QSC para los graves. Procesamiento de señal en tiempo real.</p>
      <p style={{marginTop:16}}><strong>Pantalla:</strong> Samsung The Wall (LED modular) o LG OLED signage (800+ nits de brillo).</p>
      <p style={{marginTop:16}}><strong>Codec:</strong> Cisco Webex Room Pro o Zoom Rooms. Integración seamless con apps estándar.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Costes típicos</h2>
      <p>Una sala de reuniones híbrida premium de 25-30 m² oscila entre:</p>
      <ul style={{marginLeft:24,marginTop:16,marginBottom:16}}>
        <li style={{marginBottom:10}}>• Equipamiento: 25.000€ - 40.000€</li>
        <li style={{marginBottom:10}}>• Instalación y redes: 8.000€ - 12.000€</li>
        <li style={{marginBottom:10}}>• Formación y soporte: 2.000€ - 3.000€</li>
      </ul>
      <p style={{marginTop:16}}>Total: 35.000€ - 55.000€. El ROI se recupera en 18-24 meses (reducción de viajes, productividad ampliada).</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Truco avanzado: control de luz adaptativo</h2>
      <p>Las cámaras se ven mejor con una iluminación consistente. Integra Lutron Palladiom para el control automático de la luz: detecta si se está haciendo streaming y ajusta el brillo y la temperatura de color para optimizar la captura.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Conclusión</h2>
      <p>Una sala de reuniones híbrida bien diseñada no es un lujo: es una necesidad competitiva. Los equipos remotos sienten que están físicamente presentes. Los ejecutivos lideran desde cualquier ubicación sin pérdida de presencia.</p>
    </>
    ),
    fr: (
    <>
      <p>La pandémie a contraint les entreprises à repenser les salles de réunion. Il ne s'agit plus de 10 personnes autour d'une table : on mélange désormais du personnel en présentiel et à distance (des personnes réparties dans 3 à 5 lieux simultanément). Voici comment concevoir des salles efficaces pour le travail hybride.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Exigences de la salle hybride</h2>
      <p><strong>1. Captation audiovisuelle équilibrée</strong>. Toutes les personnes présentes doivent être visibles de manière équitable pour les participants distants. Cela nécessite des caméras pan-tilt-zoom avec mise au point automatique. Sans une « tête de table » dominante.</p>
      <p style={{marginTop:16}}><strong>2. Audio professionnel</strong>. Microphones à condensateur à large couverture (et non une seule unité de conférence de table). Annulation d'écho agressive. Les participants distants doivent avoir l'impression d'être dans la salle.</p>
      <p style={{marginTop:16}}><strong>3. Écrans multiples</strong>. Un grand écran (75"-85") pour le contenu partagé. Vignettes des participants distants à des angles visibles.</p>
      <p style={{marginTop:16}}><strong>4. Contrôle intuitif</strong>. Un bouton pour démarrer la réunion, contrôle automatique de la luminosité et du zoom. Les dirigeants n'ont pas à être techniciens.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Architecture recommandée</h2>
      <p><strong>Caméras :</strong> Sony PTZ Pro 2 ou Logitech Rally. Contrôle motorisé, AI tracking des intervenants actifs.</p>
      <p style={{marginTop:16}}><strong>Audio :</strong> Unité de conférence Shure Microflex + subwoofers QSC pour les graves. Traitement du signal en temps réel.</p>
      <p style={{marginTop:16}}><strong>Écran :</strong> Samsung The Wall (LED modulaire) ou LG OLED signage (800+ nits de luminosité).</p>
      <p style={{marginTop:16}}><strong>Codec :</strong> Cisco Webex Room Pro ou Zoom Rooms. Intégration seamless avec les applications standard.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Coûts typiques</h2>
      <p>Une salle de réunion hybride premium de 25-30 m² se situe entre :</p>
      <ul style={{marginLeft:24,marginTop:16,marginBottom:16}}>
        <li style={{marginBottom:10}}>• Équipement : 25 000 € - 40 000 €</li>
        <li style={{marginBottom:10}}>• Installation et réseaux : 8 000 € - 12 000 €</li>
        <li style={{marginBottom:10}}>• Formation et support : 2 000 € - 3 000 €</li>
      </ul>
      <p style={{marginTop:16}}>Total : 35 000 € - 55 000 €. Le ROI se récupère en 18 à 24 mois (réduction des déplacements, productivité accrue).</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Astuce avancée : contrôle d'éclairage adaptatif</h2>
      <p>Les caméras rendent mieux avec un éclairage constant. Intégrez Lutron Palladiom pour le contrôle automatique de l'éclairage : il détecte si un streaming est en cours et ajuste la luminosité et la température de couleur pour optimiser la captation.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Conclusion</h2>
      <p>Une salle de réunion hybride bien conçue n'est pas un luxe : c'est une nécessité concurrentielle. Les équipes distantes ont le sentiment d'être physiquement présentes. Les dirigeants pilotent depuis n'importe quel lieu sans perte de présence.</p>
    </>
    ),
    en: (
    <>
      <p>The pandemic forced companies to reimagine meeting rooms. It is no longer about 10 people around a table: now in-person staff mix with remote participants (people in 3-5 locations simultaneously). Here is how to design rooms that are effective for hybrid work.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Hybrid room requirements</h2>
      <p><strong>1. Balanced audiovisual capture</strong>. Everyone in the room must be equally visible to remote participants. This requires pan-tilt-zoom cameras with automatic focus. No dominant "head of the room".</p>
      <p style={{marginTop:16}}><strong>2. Professional audio</strong>. Wide-coverage condenser microphones (not a single tabletop conference unit). Aggressive echo cancellation. Remote participants must feel as if they are in the room.</p>
      <p style={{marginTop:16}}><strong>3. Multiple screens</strong>. A large screen (75"-85") for shared content. Thumbnails of remote participants at visible angles.</p>
      <p style={{marginTop:16}}><strong>4. Intuitive control</strong>. A single button to start the meeting, automatic brightness and zoom control. Executives should not have to be technicians.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Recommended architecture</h2>
      <p><strong>Cameras:</strong> Sony PTZ Pro 2 or Logitech Rally. Motorized control, AI tracking of active speakers.</p>
      <p style={{marginTop:16}}><strong>Audio:</strong> Shure Microflex conference unit + QSC subwoofers for the low end. Real-time signal processing.</p>
      <p style={{marginTop:16}}><strong>Screen:</strong> Samsung The Wall (modular LED) or LG OLED signage (800+ nits of brightness).</p>
      <p style={{marginTop:16}}><strong>Codec:</strong> Cisco Webex Room Pro or Zoom Rooms. Seamless integration with standard apps.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Typical costs</h2>
      <p>A premium hybrid meeting room of 25-30 m² ranges between:</p>
      <ul style={{marginLeft:24,marginTop:16,marginBottom:16}}>
        <li style={{marginBottom:10}}>• Equipment: €25,000 - €40,000</li>
        <li style={{marginBottom:10}}>• Installation and networking: €8,000 - €12,000</li>
        <li style={{marginBottom:10}}>• Training and support: €2,000 - €3,000</li>
      </ul>
      <p style={{marginTop:16}}>Total: €35,000 - €55,000. The ROI is recovered within 18-24 months (reduced travel, increased productivity).</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Advanced tip: adaptive lighting control</h2>
      <p>Cameras look better with consistent lighting. Integrate Lutron Palladiom for automatic lighting control: it detects whether streaming is in progress and adjusts brightness and color temperature to optimize the capture.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Conclusion</h2>
      <p>A well-designed hybrid meeting room is not a luxury: it is a competitive necessity. Remote teams feel as if they are physically present. Executives lead from any location without loss of presence.</p>
    </>
    ),
  },
};
