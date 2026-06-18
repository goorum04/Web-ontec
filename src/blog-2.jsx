const ARTICLE_DATA = {
  id: 'zero-trust-pimes',
  tag: 'IT Security',
  date: '2024',
  readtime: '7 min',
  title: 'Zero Trust: el nou paradigma de seguretat per a pimes andorranes',
  author: 'Ontec',
  content: (
    <>
      <p>La pandèmia va accelerar la transformació digital, però va deixar visible una debilitat estructural: els perímetres de seguretat tradicionals ja no funcionen. Les pimes andorranes que havien confiat en firewall i VPN de "xarxa privada" es van trobar vulnerables quan els seus treballadors van passar a treballo remot.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Què és Zero Trust?</h2>
      <p><strong>Zero Trust</strong> és una arquitectura de seguretat que rebutja la premissa de "confiar en qui és dins del perímetre". En canvi, <em>verifica cadascun connexió</em>, independent de la seva origen.</p>
      <p style={{marginTop:16}}>Els principis fonamentals són:</p>
      <ul style={{marginLeft:24,marginTop:16,marginBottom:16}}>
        <li style={{marginBottom:10}}>• <strong>Verificació contínua</strong> de identitat i dispositiu</li>
        <li style={{marginBottom:10}}>• <strong>Accés per privilegis mínims</strong> (least privilege)</li>
        <li style={{marginBottom:10}}>• <strong>Xifrat de tot el tràfic</strong>, intern i extern</li>
        <li style={{marginBottom:10}}>• <strong>Monitorització i logging constant</strong> d'anomalies</li>
      </ul>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Implementació a pimes: pas a pas</h2>
      <p><strong>Pas 1: Inventari i context</strong>. Mapeja els actius crítics (bases de dades, aplicacions, documents sensibles) i els usuaris que hi accedeixen.</p>
      <p style={{marginTop:16}}><strong>Pas 2: Autenticació multi-factor</strong>. Implementa MFA en tots els accesos (Microsoft Entra, Okta o solucions gratuïtes com Keycloak).</p>
      <p style={{marginTop:16}}><strong>Pas 3: Segmentació de xarxa</strong>. Crea zones de confiança lògica (development, producció, dades sensibles) amb regles d'accés granulars.</p>
      <p style={{marginTop:16}}><strong>Pas 4: Micro-segmentació</strong>. Aplica polítiques a nivell de tràfic, no només a nivell de usuari.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Cost vs. Benefici</h2>
      <p>Un desployment Zero Trust entry-level per a una pime de 20-50 empleats oscil·la entre 15.000€ i 40.000€ (hardware, software, formació). El temps de ROI és típicament 18-24 mesos, considerant reducció de riscos de breach.</p>
      <p style={{marginTop:16}}>Els costos d'un breach de dades mitjà són <strong>10-100x més alts</strong> que un desployment preventiu.</p>

      <h2 style={{fontSize:24,fontWeight:700,marginTop:40,marginBottom:16,fontFamily:'var(--disp)'}}>Conclusió</h2>
      <p>Zero Trust ja no és exclusiva de bancs i governs. Les pimes andorranes que adoptin aquest model avui serán més resilients davant de ciberamenaces en constant evolució.</p>
    </>
  ),
};
