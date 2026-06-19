const ARTICLE_DATA = {
  id: 'zero-trust-pimes',
  tag: {ca:'IT Security',es:'IT Security',fr:'IT Security',en:'IT Security'},
  date: '2024',
  readtime: '7 min',
  title: {
    ca:'Zero Trust: el nou paradigma de seguretat per a pimes andorranes',
    es:'Zero Trust: el nuevo paradigma de seguridad para pymes andorranas',
    fr:'Zero Trust : le nouveau paradigme de sécurité pour les PME andorranes',
    en:'Zero Trust: the new security paradigm for Andorran SMEs'
  },
  author: 'Ontec',
  content: {
    ca: (
    <>
      <p>La pandèmia va accelerar la transformació digital, però va deixar visible una debilitat estructural: els perímetres de seguretat tradicionals ja no funcionen. Les pimes andorranes que havien confiat en firewall i VPN de "xarxa privada" es van trobar vulnerables quan els seus treballadors van passar al treball remot.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Què és Zero Trust?</h2>
      <p><strong>Zero Trust</strong> és una arquitectura de seguretat que rebutja la premissa de "confiar en qui és dins del perímetre". En canvi, <em>verifica cada connexió</em>, independentment del seu origen.</p>
      <p style={{marginTop:16}}>Els principis fonamentals són:</p>
      <ul style={{marginLeft:24,marginTop:16,marginBottom:16}}>
        <li style={{marginBottom:10}}>• <strong>Verificació contínua</strong> d'identitat i dispositiu</li>
        <li style={{marginBottom:10}}>• <strong>Accés per privilegis mínims</strong> (least privilege)</li>
        <li style={{marginBottom:10}}>• <strong>Xifrat de tot el tràfic</strong>, intern i extern</li>
        <li style={{marginBottom:10}}>• <strong>Monitorització i logging constants</strong> d'anomalies</li>
      </ul>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Implementació a pimes: pas a pas</h2>
      <p><strong>Pas 1: Inventari i context</strong>. Mapeja els actius crítics (bases de dades, aplicacions, documents sensibles) i els usuaris que hi accedeixen.</p>
      <p style={{marginTop:16}}><strong>Pas 2: Autenticació multifactor</strong>. Implementa MFA en tots els accessos (Microsoft Entra, Okta o solucions gratuïtes com Keycloak).</p>
      <p style={{marginTop:16}}><strong>Pas 3: Segmentació de xarxa</strong>. Crea zones de confiança lògica (desenvolupament, producció, dades sensibles) amb regles d'accés granulars.</p>
      <p style={{marginTop:16}}><strong>Pas 4: Microsegmentació</strong>. Aplica polítiques a nivell de tràfic, no només a nivell d'usuari.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Cost vs. Benefici</h2>
      <p>Un desplegament Zero Trust d'entrada per a una pime de 20-50 empleats oscil·la entre 15.000€ i 40.000€ (hardware, software, formació). El temps de ROI és típicament de 18-24 mesos, considerant la reducció de riscos de breach.</p>
      <p style={{marginTop:16}}>Els costos d'un breach de dades mitjà són <strong>10-100x més alts</strong> que un desplegament preventiu.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Conclusió</h2>
      <p>Zero Trust ja no és exclusiu de bancs i governs. Les pimes andorranes que adoptin aquest model avui seran més resilients davant de les ciberamenaces en constant evolució.</p>
    </>
    ),
    es: (
    <>
      <p>La pandemia aceleró la transformación digital, pero dejó al descubierto una debilidad estructural: los perímetros de seguridad tradicionales ya no funcionan. Las pymes andorranas que habían confiado en firewall y VPN de "red privada" se encontraron vulnerables cuando sus trabajadores pasaron al trabajo remoto.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>¿Qué es Zero Trust?</h2>
      <p><strong>Zero Trust</strong> es una arquitectura de seguridad que rechaza la premisa de "confiar en quien está dentro del perímetro". En cambio, <em>verifica cada conexión</em>, independientemente de su origen.</p>
      <p style={{marginTop:16}}>Los principios fundamentales son:</p>
      <ul style={{marginLeft:24,marginTop:16,marginBottom:16}}>
        <li style={{marginBottom:10}}>• <strong>Verificación continua</strong> de identidad y dispositivo</li>
        <li style={{marginBottom:10}}>• <strong>Acceso con privilegios mínimos</strong> (least privilege)</li>
        <li style={{marginBottom:10}}>• <strong>Cifrado de todo el tráfico</strong>, interno y externo</li>
        <li style={{marginBottom:10}}>• <strong>Monitorización y logging constantes</strong> de anomalías</li>
      </ul>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Implementación en pymes: paso a paso</h2>
      <p><strong>Paso 1: Inventario y contexto</strong>. Mapea los activos críticos (bases de datos, aplicaciones, documentos sensibles) y los usuarios que acceden a ellos.</p>
      <p style={{marginTop:16}}><strong>Paso 2: Autenticación multifactor</strong>. Implementa MFA en todos los accesos (Microsoft Entra, Okta o soluciones gratuitas como Keycloak).</p>
      <p style={{marginTop:16}}><strong>Paso 3: Segmentación de red</strong>. Crea zonas de confianza lógica (desarrollo, producción, datos sensibles) con reglas de acceso granulares.</p>
      <p style={{marginTop:16}}><strong>Paso 4: Microsegmentación</strong>. Aplica políticas a nivel de tráfico, no solo a nivel de usuario.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Coste vs. Beneficio</h2>
      <p>Un despliegue Zero Trust de entrada para una pyme de 20-50 empleados oscila entre 15.000€ y 40.000€ (hardware, software, formación). El tiempo de ROI es típicamente de 18-24 meses, considerando la reducción de riesgos de breach.</p>
      <p style={{marginTop:16}}>Los costes de un breach de datos medio son <strong>10-100x más altos</strong> que un despliegue preventivo.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Conclusión</h2>
      <p>Zero Trust ya no es exclusivo de bancos y gobiernos. Las pymes andorranas que adopten este modelo hoy serán más resilientes frente a las ciberamenazas en constante evolución.</p>
    </>
    ),
    fr: (
    <>
      <p>La pandémie a accéléré la transformation numérique, mais a mis en évidence une faiblesse structurelle : les périmètres de sécurité traditionnels ne fonctionnent plus. Les PME andorranes qui avaient fait confiance au firewall et au VPN de « réseau privé » se sont retrouvées vulnérables lorsque leurs salariés sont passés au travail à distance.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Qu'est-ce que le Zero Trust ?</h2>
      <p>Le <strong>Zero Trust</strong> est une architecture de sécurité qui rejette le principe de « faire confiance à ceux qui sont à l'intérieur du périmètre ». Au contraire, il <em>vérifie chaque connexion</em>, quelle que soit son origine.</p>
      <p style={{marginTop:16}}>Les principes fondamentaux sont :</p>
      <ul style={{marginLeft:24,marginTop:16,marginBottom:16}}>
        <li style={{marginBottom:10}}>• <strong>Vérification continue</strong> de l'identité et de l'appareil</li>
        <li style={{marginBottom:10}}>• <strong>Accès au moindre privilège</strong> (least privilege)</li>
        <li style={{marginBottom:10}}>• <strong>Chiffrement de tout le trafic</strong>, interne et externe</li>
        <li style={{marginBottom:10}}>• <strong>Surveillance et journalisation constantes</strong> des anomalies</li>
      </ul>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Implémentation dans les PME : étape par étape</h2>
      <p><strong>Étape 1 : Inventaire et contexte</strong>. Cartographiez les actifs critiques (bases de données, applications, documents sensibles) et les utilisateurs qui y accèdent.</p>
      <p style={{marginTop:16}}><strong>Étape 2 : Authentification multifacteur</strong>. Mettez en place le MFA sur tous les accès (Microsoft Entra, Okta ou des solutions gratuites comme Keycloak).</p>
      <p style={{marginTop:16}}><strong>Étape 3 : Segmentation du réseau</strong>. Créez des zones de confiance logiques (développement, production, données sensibles) avec des règles d'accès granulaires.</p>
      <p style={{marginTop:16}}><strong>Étape 4 : Microsegmentation</strong>. Appliquez des politiques au niveau du trafic, et pas seulement au niveau de l'utilisateur.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Coût vs. Bénéfice</h2>
      <p>Un déploiement Zero Trust d'entrée de gamme pour une PME de 20 à 50 employés se situe entre 15 000 € et 40 000 € (matériel, logiciels, formation). Le délai de ROI est généralement de 18 à 24 mois, compte tenu de la réduction des risques de breach.</p>
      <p style={{marginTop:16}}>Les coûts d'un breach de données moyen sont <strong>10 à 100 fois plus élevés</strong> qu'un déploiement préventif.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Conclusion</h2>
      <p>Le Zero Trust n'est plus réservé aux banques et aux gouvernements. Les PME andorranes qui adopteront ce modèle dès aujourd'hui seront plus résilientes face aux cybermenaces en constante évolution.</p>
    </>
    ),
    en: (
    <>
      <p>The pandemic accelerated digital transformation, but it also exposed a structural weakness: traditional security perimeters no longer work. The Andorran SMEs that had relied on firewall and "private network" VPN found themselves vulnerable when their employees switched to remote work.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>What is Zero Trust?</h2>
      <p><strong>Zero Trust</strong> is a security architecture that rejects the premise of "trusting whoever is inside the perimeter". Instead, it <em>verifies every connection</em>, regardless of its origin.</p>
      <p style={{marginTop:16}}>The core principles are:</p>
      <ul style={{marginLeft:24,marginTop:16,marginBottom:16}}>
        <li style={{marginBottom:10}}>• <strong>Continuous verification</strong> of identity and device</li>
        <li style={{marginBottom:10}}>• <strong>Least-privilege access</strong> (least privilege)</li>
        <li style={{marginBottom:10}}>• <strong>Encryption of all traffic</strong>, internal and external</li>
        <li style={{marginBottom:10}}>• <strong>Constant monitoring and logging</strong> of anomalies</li>
      </ul>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Implementation for SMEs: step by step</h2>
      <p><strong>Step 1: Inventory and context</strong>. Map the critical assets (databases, applications, sensitive documents) and the users who access them.</p>
      <p style={{marginTop:16}}><strong>Step 2: Multi-factor authentication</strong>. Implement MFA on all access points (Microsoft Entra, Okta or free solutions such as Keycloak).</p>
      <p style={{marginTop:16}}><strong>Step 3: Network segmentation</strong>. Create logical trust zones (development, production, sensitive data) with granular access rules.</p>
      <p style={{marginTop:16}}><strong>Step 4: Micro-segmentation</strong>. Apply policies at the traffic level, not just at the user level.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Cost vs. Benefit</h2>
      <p>An entry-level Zero Trust deployment for an SME of 20-50 employees ranges between €15,000 and €40,000 (hardware, software, training). The ROI period is typically 18-24 months, factoring in the reduction of breach risks.</p>
      <p style={{marginTop:16}}>The costs of an average data breach are <strong>10-100x higher</strong> than a preventive deployment.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Conclusion</h2>
      <p>Zero Trust is no longer exclusive to banks and governments. The Andorran SMEs that adopt this model today will be more resilient against constantly evolving cyber threats.</p>
    </>
    ),
  },
};
