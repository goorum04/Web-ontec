const ARTICLE_DATA = {
  id: 'knx-domotica',
  tag: {ca:'Domotica',es:'Domótica',fr:'Domotique',en:'Home automation'},
  date: '2023',
  readtime: '6 min',
  title: {
    ca:"La domòtica KNX arriba als edificis premium d'Andorra",
    es:"La domótica KNX llega a los edificios premium de Andorra",
    fr:"La domotique KNX arrive dans les bâtiments premium d'Andorre",
    en:"KNX home automation reaches Andorra's premium buildings"
  },
  author: 'Ontec',
  content: {
    ca: (
    <>
      <p>Els edificis intel·ligents ja no són futur. A Andorra, els promotors i arquitectes de projectes premium han adoptat l'estàndard KNX per a la gestió centralitzada de la llum, el clima, la seguretat, els audiovisuals i el reg. Aquí expliquem per què.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Què és KNX?</h2>
      <p><strong>KNX</strong> és un estàndard internacional (ISO/IEC 14543) per a la domòtica i l'automatització d'edificis. Va ser creat per fusionar tres estàndards europeus (Instabus, EHS, BatiBUS) en un sistema unificat.</p>
      <p style={{marginTop:16}}>A diferència de les solucions propietàries (que bloquegen els usuaris en una sola marca), KNX permet que múltiples fabricants construeixin dispositius compatibles. Això garanteix <strong>llibertat d'elecció i independència de proveïdor</strong>.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Per què KNX?</h2>
      <p><strong>1. Interoperabilitat</strong>. Pots barrejar interruptors Siemens, termòstats Schneider i pantalles Gira en un mateix sistema.</p>
      <p style={{marginTop:16}}><strong>2. Escalabilitat</strong>. Comença amb el control bàsic de la llum i afegeix zones complexes més endavant.</p>
      <p style={{marginTop:16}}><strong>3. Eficiència energètica</strong>. Control granular de la climatització per espai = 20-30% d'estalvi en energia.</p>
      <p style={{marginTop:16}}><strong>4. Seguretat</strong>. Integració nativa amb sistemes CCTV, accés per badges i alarmes.</p>
      <p style={{marginTop:16}}><strong>5. Usabilitat</strong>. Una sola app per controlar tot l'edifici, des del mòbil o panells tàctils.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Casos d'ús a Andorra</h2>
      <p><strong>Hotels premium.</strong> Control del clima, llum ambient, cortines i entreteniment per a cada habitació. Els hostes ho controlen tot des del telèfon.</p>
      <p style={{marginTop:16}}><strong>Residències de luxe.</strong> Automatització completa de la domòtica de la llar: porter automàtic, reg intel·ligent, climatització adaptativa.</p>
      <p style={{marginTop:16}}><strong>Oficines corporatives.</strong> Sense interruptors manuals. Els espais es configuren segons l'horari de reserva de sales.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Implementació</h2>
      <p>Una instal·lació KNX típica en un edifici premium de 5.000 m² oscil·la entre 80.000€ i 150.000€ (hardware, instal·lació, enginyeria, proves). El cost per m² és típicament de 16-30€ en edificis nous.</p>
      <p style={{marginTop:16}}>El ROI arriba amb l'estalvi energètic, la reducció del manteniment manual i l'increment del valor de venda de les propietats.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Conclusió</h2>
      <p>KNX és la "lingua franca" de la domòtica global. Els edificis premium d'Andorra que l'adoptin avui gaudiran d'una tecnologia robusta, evolutiva i reconeguda internacionalment.</p>
    </>
    ),
    es: (
    <>
      <p>Los edificios inteligentes ya no son el futuro. En Andorra, los promotores y arquitectos de proyectos premium han adoptado el estándar KNX para la gestión centralizada de la luz, el clima, la seguridad, los audiovisuales y el riego. Aquí explicamos por qué.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>¿Qué es KNX?</h2>
      <p><strong>KNX</strong> es un estándar internacional (ISO/IEC 14543) para la domótica y la automatización de edificios. Fue creado para fusionar tres estándares europeos (Instabus, EHS, BatiBUS) en un sistema unificado.</p>
      <p style={{marginTop:16}}>A diferencia de las soluciones propietarias (que bloquean a los usuarios en una sola marca), KNX permite que múltiples fabricantes construyan dispositivos compatibles. Esto garantiza <strong>libertad de elección e independencia de proveedor</strong>.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>¿Por qué KNX?</h2>
      <p><strong>1. Interoperabilidad</strong>. Puedes mezclar interruptores Siemens, termostatos Schneider y pantallas Gira en un mismo sistema.</p>
      <p style={{marginTop:16}}><strong>2. Escalabilidad</strong>. Empieza con el control básico de la luz y añade zonas complejas más adelante.</p>
      <p style={{marginTop:16}}><strong>3. Eficiencia energética</strong>. Control granular de la climatización por espacio = 20-30% de ahorro en energía.</p>
      <p style={{marginTop:16}}><strong>4. Seguridad</strong>. Integración nativa con sistemas CCTV, acceso por badges y alarmas.</p>
      <p style={{marginTop:16}}><strong>5. Usabilidad</strong>. Una sola app para controlar todo el edificio, desde el móvil o paneles táctiles.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Casos de uso en Andorra</h2>
      <p><strong>Hoteles premium.</strong> Control del clima, luz ambiente, cortinas y entretenimiento para cada habitación. Los huéspedes lo controlan todo desde el teléfono.</p>
      <p style={{marginTop:16}}><strong>Residencias de lujo.</strong> Automatización completa de la domótica del hogar: portero automático, riego inteligente, climatización adaptativa.</p>
      <p style={{marginTop:16}}><strong>Oficinas corporativas.</strong> Sin interruptores manuales. Los espacios se configuran según el horario de reserva de salas.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Implementación</h2>
      <p>Una instalación KNX típica en un edificio premium de 5.000 m² oscila entre 80.000€ y 150.000€ (hardware, instalación, ingeniería, pruebas). El coste por m² es típicamente de 16-30€ en edificios nuevos.</p>
      <p style={{marginTop:16}}>El ROI llega con el ahorro energético, la reducción del mantenimiento manual y el incremento del valor de venta de las propiedades.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Conclusión</h2>
      <p>KNX es la "lingua franca" de la domótica global. Los edificios premium de Andorra que lo adopten hoy disfrutarán de una tecnología robusta, evolutiva y reconocida internacionalmente.</p>
    </>
    ),
    fr: (
    <>
      <p>Les bâtiments intelligents ne relèvent plus du futur. En Andorre, les promoteurs et architectes de projets premium ont adopté le standard KNX pour la gestion centralisée de l'éclairage, du climat, de la sécurité, de l'audiovisuel et de l'arrosage. Voici pourquoi.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Qu'est-ce que KNX ?</h2>
      <p><strong>KNX</strong> est un standard international (ISO/IEC 14543) pour la domotique et l'automatisation des bâtiments. Il a été créé pour fusionner trois standards européens (Instabus, EHS, BatiBUS) en un système unifié.</p>
      <p style={{marginTop:16}}>Contrairement aux solutions propriétaires (qui enferment les utilisateurs dans une seule marque), KNX permet à plusieurs fabricants de concevoir des appareils compatibles. Cela garantit la <strong>liberté de choix et l'indépendance vis-à-vis du fournisseur</strong>.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Pourquoi KNX ?</h2>
      <p><strong>1. Interopérabilité</strong>. Vous pouvez combiner des interrupteurs Siemens, des thermostats Schneider et des écrans Gira dans un même système.</p>
      <p style={{marginTop:16}}><strong>2. Évolutivité</strong>. Commencez avec le contrôle de base de l'éclairage et ajoutez des zones complexes plus tard.</p>
      <p style={{marginTop:16}}><strong>3. Efficacité énergétique</strong>. Contrôle granulaire de la climatisation par espace = 20 à 30 % d'économies d'énergie.</p>
      <p style={{marginTop:16}}><strong>4. Sécurité</strong>. Intégration native avec les systèmes CCTV, l'accès par badges et les alarmes.</p>
      <p style={{marginTop:16}}><strong>5. Facilité d'utilisation</strong>. Une seule application pour contrôler tout le bâtiment, depuis le mobile ou des panneaux tactiles.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Cas d'usage en Andorre</h2>
      <p><strong>Hôtels premium.</strong> Contrôle du climat, de l'éclairage d'ambiance, des rideaux et du divertissement pour chaque chambre. Les clients contrôlent tout depuis leur téléphone.</p>
      <p style={{marginTop:16}}><strong>Résidences de luxe.</strong> Automatisation complète de la domotique de la maison : portier automatique, arrosage intelligent, climatisation adaptative.</p>
      <p style={{marginTop:16}}><strong>Bureaux d'entreprise.</strong> Sans interrupteurs manuels. Les espaces se configurent en fonction des horaires de réservation des salles.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Mise en œuvre</h2>
      <p>Une installation KNX type dans un bâtiment premium de 5 000 m² se situe entre 80 000 € et 150 000 € (matériel, installation, ingénierie, tests). Le coût au m² est généralement de 16 à 30 € dans les bâtiments neufs.</p>
      <p style={{marginTop:16}}>Le ROI provient des économies d'énergie, de la réduction de la maintenance manuelle et de l'augmentation de la valeur de revente des biens.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Conclusion</h2>
      <p>KNX est la « lingua franca » de la domotique mondiale. Les bâtiments premium d'Andorre qui l'adopteront aujourd'hui bénéficieront d'une technologie robuste, évolutive et reconnue à l'international.</p>
    </>
    ),
    en: (
    <>
      <p>Smart buildings are no longer the future. In Andorra, developers and architects of premium projects have adopted the KNX standard for the centralized management of lighting, climate, security, audiovisual and irrigation. Here is why.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>What is KNX?</h2>
      <p><strong>KNX</strong> is an international standard (ISO/IEC 14543) for home automation and building automation. It was created to merge three European standards (Instabus, EHS, BatiBUS) into a unified system.</p>
      <p style={{marginTop:16}}>Unlike proprietary solutions (which lock users into a single brand), KNX allows multiple manufacturers to build compatible devices. This guarantees <strong>freedom of choice and vendor independence</strong>.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Why KNX?</h2>
      <p><strong>1. Interoperability</strong>. You can mix Siemens switches, Schneider thermostats and Gira screens in the same system.</p>
      <p style={{marginTop:16}}><strong>2. Scalability</strong>. Start with basic lighting control and add complex zones later.</p>
      <p style={{marginTop:16}}><strong>3. Energy efficiency</strong>. Granular climate control per space = 20-30% energy savings.</p>
      <p style={{marginTop:16}}><strong>4. Security</strong>. Native integration with CCTV systems, badge access and alarms.</p>
      <p style={{marginTop:16}}><strong>5. Usability</strong>. A single app to control the entire building, from a mobile or touch panels.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Use cases in Andorra</h2>
      <p><strong>Premium hotels.</strong> Control of climate, ambient lighting, curtains and entertainment for each room. Guests control everything from their phone.</p>
      <p style={{marginTop:16}}><strong>Luxury residences.</strong> Complete home automation: automatic intercom, smart irrigation, adaptive climate control.</p>
      <p style={{marginTop:16}}><strong>Corporate offices.</strong> No manual switches. Spaces are configured according to room booking schedules.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Implementation</h2>
      <p>A typical KNX installation in a premium 5,000 m² building ranges between €80,000 and €150,000 (hardware, installation, engineering, testing). The cost per m² is typically €16-30 in new buildings.</p>
      <p style={{marginTop:16}}>The ROI comes from energy savings, reduced manual maintenance and an increase in the resale value of properties.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Conclusion</h2>
      <p>KNX is the "lingua franca" of global home automation. Andorra's premium buildings that adopt it today will enjoy a robust, evolving and internationally recognized technology.</p>
    </>
    ),
  },
};
