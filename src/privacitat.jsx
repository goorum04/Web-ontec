const TWEAK_DEFAULTS = {"mood":"acid","voice":"editorial","intensity":"cinematic"};

function App() {
  useLang();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(()=>{
    const r=document.documentElement;
    r.setAttribute('data-mood',t.mood);r.setAttribute('data-voice',t.voice);r.setAttribute('data-intensity',t.intensity);
  },[t.mood,t.voice,t.intensity]);
  return (
    <LegalLayout
      activePage=""
      kicker={tt({ca:'Protecció de dades',es:'Protección de datos',fr:'Protection des données',en:'Data protection'})}
      title={tt({ca:'Política de privacitat',es:'Política de privacidad',fr:'Politique de confidentialité',en:'Privacy policy'})}
      updated={tt({ca:'Última actualització: juny 2026',es:'Última actualización: junio 2026',fr:'Dernière mise à jour : juin 2026',en:'Last updated: June 2026'})}>
      {tt({
        ca:<>
          <p>Ontec respecta la teva privacitat i tracta les teves dades personals d'acord amb la <strong>Llei 29/2021, qualificada de protecció de dades personals d'Andorra (LQPD)</strong>.</p>
          <h2>1. Responsable del tractament</h2>
          <p>ON TECNOLOGIES S.L. — C/ de la Vena 3, Baixos, Encamp, Andorra — info@ontecandorra.com — +376 88 55 99.</p>
          <h2>2. Quines dades recollim</h2>
          <p>Únicament les dades que ens facilites voluntàriament a través del formulari de contacte: <strong>nom i cognoms, correu electrònic, telèfon, empresa i el contingut del missatge</strong>. No recollim dades de navegació amb finalitats de seguiment.</p>
          <h2>3. Amb quina finalitat</h2>
          <p>Per atendre i respondre les teves consultes, preparar pressupostos i mantenir el contacte comercial que sol·licitis. No fem servir les teves dades per a publicitat no sol·licitada.</p>
          <h2>4. Base jurídica</h2>
          <p>El tractament es basa en el teu <strong>consentiment</strong>, que atorgues en marcar la casella del formulari, i en l'interès legítim de respondre la teva sol·licitud.</p>
          <h2>5. Conservació</h2>
          <p>Conservem les dades durant el temps necessari per atendre la teva consulta i, si escau, durant la relació comercial. Després se suprimeixen, llevat d'obligacions legals de conservació.</p>
          <h2>6. Destinataris</h2>
          <p>No cedim les teves dades a tercers. Les dades es poden allotjar als servidors del nostre proveïdor d'allotjament web, que actua com a encarregat del tractament amb les garanties exigides.</p>
          <h2>7. Els teus drets</h2>
          <p>Pots exercir els drets d'<strong>accés, rectificació, supressió, oposició, limitació i portabilitat</strong> escrivint a info@ontecandorra.com. També tens dret a presentar una reclamació davant l'<strong>Agència Andorrana de Protecció de Dades (APDA)</strong> — apda.ad.</p>
          <h2>8. Emmagatzematge local</h2>
          <p>Aquest lloc desa una preferència tècnica al teu navegador (l'idioma escollit). No és una cookie de seguiment i no s'utilitza per identificar-te. Consulta més detalls a la <a href="cookies.html">política de cookies</a>.</p>
        </>,
        es:<>
          <p>Ontec respeta tu privacidad y trata tus datos personales de acuerdo con la <strong>Ley 29/2021, calificada de protección de datos personales de Andorra (LQPD)</strong>.</p>
          <h2>1. Responsable del tratamiento</h2>
          <p>ON TECNOLOGIES S.L. — C/ de la Vena 3, Bajos, Encamp, Andorra — info@ontecandorra.com — +376 88 55 99.</p>
          <h2>2. Qué datos recogemos</h2>
          <p>Únicamente los datos que nos facilitas voluntariamente a través del formulario de contacto: <strong>nombre y apellidos, correo electrónico, teléfono, empresa y el contenido del mensaje</strong>. No recogemos datos de navegación con fines de seguimiento.</p>
          <h2>3. Con qué finalidad</h2>
          <p>Para atender y responder a tus consultas, preparar presupuestos y mantener el contacto comercial que solicites. No usamos tus datos para publicidad no solicitada.</p>
          <h2>4. Base jurídica</h2>
          <p>El tratamiento se basa en tu <strong>consentimiento</strong>, que otorgas al marcar la casilla del formulario, y en el interés legítimo de responder a tu solicitud.</p>
          <h2>5. Conservación</h2>
          <p>Conservamos los datos durante el tiempo necesario para atender tu consulta y, en su caso, durante la relación comercial. Después se suprimen, salvo obligaciones legales de conservación.</p>
          <h2>6. Destinatarios</h2>
          <p>No cedemos tus datos a terceros. Los datos pueden alojarse en los servidores de nuestro proveedor de alojamiento web, que actúa como encargado del tratamiento con las garantías exigidas.</p>
          <h2>7. Tus derechos</h2>
          <p>Puedes ejercer los derechos de <strong>acceso, rectificación, supresión, oposición, limitación y portabilidad</strong> escribiendo a info@ontecandorra.com. También tienes derecho a presentar una reclamación ante la <strong>Agencia Andorrana de Protección de Datos (APDA)</strong> — apda.ad.</p>
          <h2>8. Almacenamiento local</h2>
          <p>Este sitio guarda una preferencia técnica en tu navegador (el idioma elegido). No es una cookie de seguimiento y no se utiliza para identificarte. Consulta más detalles en la <a href="cookies.html">política de cookies</a>.</p>
        </>,
        fr:<>
          <p>Ontec respecte votre vie privée et traite vos données personnelles conformément à la <strong>loi 29/2021 relative à la protection des données personnelles d'Andorre (LQPD)</strong>.</p>
          <h2>1. Responsable du traitement</h2>
          <p>ON TECNOLOGIES S.L. — C/ de la Vena 3, Baixos, Encamp, Andorre — info@ontecandorra.com — +376 88 55 99.</p>
          <h2>2. Quelles données nous collectons</h2>
          <p>Uniquement les données que vous nous fournissez volontairement via le formulaire de contact : <strong>nom et prénom, e-mail, téléphone, entreprise et le contenu du message</strong>. Nous ne collectons pas de données de navigation à des fins de suivi.</p>
          <h2>3. Dans quel but</h2>
          <p>Pour traiter et répondre à vos demandes, préparer des devis et maintenir le contact commercial que vous sollicitez. Nous n'utilisons pas vos données à des fins de publicité non sollicitée.</p>
          <h2>4. Base juridique</h2>
          <p>Le traitement repose sur votre <strong>consentement</strong>, donné en cochant la case du formulaire, et sur l'intérêt légitime de répondre à votre demande.</p>
          <h2>5. Conservation</h2>
          <p>Nous conservons les données le temps nécessaire au traitement de votre demande et, le cas échéant, pendant la relation commerciale. Elles sont ensuite supprimées, sauf obligations légales de conservation.</p>
          <h2>6. Destinataires</h2>
          <p>Nous ne cédons pas vos données à des tiers. Les données peuvent être hébergées sur les serveurs de notre prestataire d'hébergement web, qui agit en tant que sous-traitant avec les garanties requises.</p>
          <h2>7. Vos droits</h2>
          <p>Vous pouvez exercer vos droits d'<strong>accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité</strong> en écrivant à info@ontecandorra.com. Vous avez également le droit d'introduire une réclamation auprès de l'<strong>Agence andorrane de protection des données (APDA)</strong> — apda.ad.</p>
          <h2>8. Stockage local</h2>
          <p>Ce site enregistre une préférence technique dans votre navigateur (la langue choisie). Il ne s'agit pas d'un cookie de suivi et il n'est pas utilisé pour vous identifier. Plus de détails dans la <a href="cookies.html">politique de cookies</a>.</p>
        </>,
        en:<>
          <p>Ontec respects your privacy and processes your personal data in accordance with <strong>Andorra's Law 29/2021 on personal data protection (LQPD)</strong>.</p>
          <h2>1. Data controller</h2>
          <p>ON TECNOLOGIES S.L. — C/ de la Vena 3, Baixos, Encamp, Andorra — info@ontecandorra.com — +376 88 55 99.</p>
          <h2>2. What data we collect</h2>
          <p>Only the data you voluntarily provide through the contact form: <strong>full name, email, phone, company and the message content</strong>. We do not collect browsing data for tracking purposes.</p>
          <h2>3. Purpose</h2>
          <p>To handle and respond to your enquiries, prepare quotes and maintain the commercial contact you request. We do not use your data for unsolicited advertising.</p>
          <h2>4. Legal basis</h2>
          <p>Processing is based on your <strong>consent</strong>, given when you tick the form checkbox, and on the legitimate interest of responding to your request.</p>
          <h2>5. Retention</h2>
          <p>We keep the data for as long as necessary to handle your enquiry and, where applicable, for the duration of the commercial relationship. It is then deleted, except for legal retention obligations.</p>
          <h2>6. Recipients</h2>
          <p>We do not share your data with third parties. Data may be hosted on the servers of our web hosting provider, which acts as a data processor with the required guarantees.</p>
          <h2>7. Your rights</h2>
          <p>You can exercise your rights of <strong>access, rectification, erasure, objection, restriction and portability</strong> by writing to info@ontecandorra.com. You also have the right to lodge a complaint with the <strong>Andorran Data Protection Agency (APDA)</strong> — apda.ad.</p>
          <h2>8. Local storage</h2>
          <p>This site stores a technical preference in your browser (your chosen language). It is not a tracking cookie and is not used to identify you. See more details in the <a href="cookies.html">cookie policy</a>.</p>
        </>
      })}
    </LegalLayout>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
