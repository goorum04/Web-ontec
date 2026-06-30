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
      kicker={tt({ca:'Cookies i emmagatzematge',es:'Cookies y almacenamiento',fr:'Cookies et stockage',en:'Cookies and storage'})}
      title={tt({ca:'Política de cookies',es:'Política de cookies',fr:'Politique de cookies',en:'Cookie policy'})}
      updated={tt({ca:'Última actualització: juny 2026',es:'Última actualización: junio 2026',fr:'Dernière mise à jour : juin 2026',en:'Last updated: June 2026'})}>
      {tt({
        ca:<>
          <h2>1. Aquest lloc no fa servir cookies de seguiment</h2>
          <p>Ontec <strong>no utilitza cookies publicitàries, d'analítica ni de seguiment</strong>. No fem servir Google Analytics, píxels de xarxes socials ni cap eina de rastreig del comportament dels visitants.</p>
          <h2>2. Emmagatzematge tècnic local</h2>
          <p>Per millorar la teva experiència, el lloc desa una única preferència al teu navegador mitjançant <em>localStorage</em>:</p>
          <ul>
            <li><strong>Idioma (ontec_lang):</strong> recorda l'idioma que has triat (català, espanyol, francès o anglès).</li>
          </ul>
          <p>Aquesta informació es desa només al teu dispositiu, no s'envia enlloc i no permet identificar-te. Per aquest motiu no requereix consentiment.</p>
          <h2>3. Serveis de tercers</h2>
          <p>El lloc carrega alguns recursos externs (tipografies, llibreries tècniques i imatges) des de proveïdors com Google Fonts, jsDelivr o Unsplash. En carregar-los, aquests proveïdors poden registrar la teva adreça IP per motius tècnics. No instal·len cookies de seguiment en nom d'Ontec.</p>
          <h2>4. Com gestionar o eliminar l'emmagatzematge</h2>
          <p>Pots esborrar les dades emmagatzemades en qualsevol moment des de la configuració del teu navegador (esborrar dades de navegació / dades de llocs). També pots navegar en mode privat/incògnit perquè no es desi res.</p>
          <h2>5. Canvis</h2>
          <p>Podem actualitzar aquesta política si en el futur incorporem noves funcionalitats. Et recomanem revisar-la periòdicament.</p>
        </>,
        es:<>
          <h2>1. Este sitio no usa cookies de seguimiento</h2>
          <p>Ontec <strong>no utiliza cookies publicitarias, de analítica ni de seguimiento</strong>. No usamos Google Analytics, píxeles de redes sociales ni ninguna herramienta de rastreo del comportamiento de los visitantes.</p>
          <h2>2. Almacenamiento técnico local</h2>
          <p>Para mejorar tu experiencia, el sitio guarda una única preferencia en tu navegador mediante <em>localStorage</em>:</p>
          <ul>
            <li><strong>Idioma (ontec_lang):</strong> recuerda el idioma que has elegido (catalán, español, francés o inglés).</li>
          </ul>
          <p>Esta información se guarda solo en tu dispositivo, no se envía a ningún sitio y no permite identificarte. Por ello no requiere consentimiento.</p>
          <h2>3. Servicios de terceros</h2>
          <p>El sitio carga algunos recursos externos (tipografías, librerías técnicas e imágenes) desde proveedores como Google Fonts, jsDelivr o Unsplash. Al cargarlos, dichos proveedores pueden registrar tu dirección IP por motivos técnicos. No instalan cookies de seguimiento en nombre de Ontec.</p>
          <h2>4. Cómo gestionar o eliminar el almacenamiento</h2>
          <p>Puedes borrar los datos almacenados en cualquier momento desde la configuración de tu navegador (borrar datos de navegación / datos de sitios). También puedes navegar en modo privado/incógnito para que no se guarde nada.</p>
          <h2>5. Cambios</h2>
          <p>Podemos actualizar esta política si en el futuro incorporamos nuevas funcionalidades. Te recomendamos revisarla periódicamente.</p>
        </>,
        fr:<>
          <h2>1. Ce site n'utilise pas de cookies de suivi</h2>
          <p>Ontec <strong>n'utilise pas de cookies publicitaires, d'analyse ni de suivi</strong>. Nous n'utilisons ni Google Analytics, ni pixels de réseaux sociaux, ni aucun outil de suivi du comportement des visiteurs.</p>
          <h2>2. Stockage technique local</h2>
          <p>Pour améliorer votre expérience, le site enregistre une seule préférence dans votre navigateur via <em>localStorage</em> :</p>
          <ul>
            <li><strong>Langue (ontec_lang) :</strong> mémorise la langue choisie (catalan, espagnol, français ou anglais).</li>
          </ul>
          <p>Cette information est enregistrée uniquement sur votre appareil, n'est envoyée nulle part et ne permet pas de vous identifier. Elle ne nécessite donc pas de consentement.</p>
          <h2>3. Services tiers</h2>
          <p>Le site charge certaines ressources externes (polices, bibliothèques techniques et images) depuis des fournisseurs tels que Google Fonts, jsDelivr ou Unsplash. Lors de leur chargement, ces fournisseurs peuvent enregistrer votre adresse IP pour des raisons techniques. Ils n'installent pas de cookies de suivi au nom d'Ontec.</p>
          <h2>4. Comment gérer ou supprimer le stockage</h2>
          <p>Vous pouvez effacer les données stockées à tout moment depuis les paramètres de votre navigateur (effacer les données de navigation / données de sites). Vous pouvez aussi naviguer en mode privé pour que rien ne soit enregistré.</p>
          <h2>5. Modifications</h2>
          <p>Nous pouvons mettre à jour cette politique si de nouvelles fonctionnalités sont ajoutées à l'avenir. Nous vous recommandons de la consulter régulièrement.</p>
        </>,
        en:<>
          <h2>1. This site does not use tracking cookies</h2>
          <p>Ontec <strong>does not use advertising, analytics or tracking cookies</strong>. We do not use Google Analytics, social media pixels or any visitor-behaviour tracking tools.</p>
          <h2>2. Local technical storage</h2>
          <p>To improve your experience, the site stores a single preference in your browser via <em>localStorage</em>:</p>
          <ul>
            <li><strong>Language (ontec_lang):</strong> remembers the language you chose (Catalan, Spanish, French or English).</li>
          </ul>
          <p>This information is stored only on your device, is not sent anywhere and cannot identify you. It therefore does not require consent.</p>
          <h2>3. Third-party services</h2>
          <p>The site loads some external resources (fonts, technical libraries and images) from providers such as Google Fonts, jsDelivr or Unsplash. When loading them, these providers may record your IP address for technical reasons. They do not install tracking cookies on behalf of Ontec.</p>
          <h2>4. How to manage or delete storage</h2>
          <p>You can delete the stored data at any time from your browser settings (clear browsing data / site data). You can also browse in private/incognito mode so nothing is saved.</p>
          <h2>5. Changes</h2>
          <p>We may update this policy if new features are added in the future. We recommend reviewing it periodically.</p>
        </>
      })}
    </LegalLayout>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
