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
      kicker={tt({ca:'Informació legal',es:'Información legal',fr:'Informations légales',en:'Legal information'})}
      title={tt({ca:'Avís legal',es:'Aviso legal',fr:'Mentions légales',en:'Legal notice'})}
      updated={tt({ca:'Última actualització: juny 2026',es:'Última actualización: junio 2026',fr:'Dernière mise à jour : juin 2026',en:'Last updated: June 2026'})}>
      {tt({
        ca:<>
          <h2>1. Titular del lloc web</h2>
          <p>En compliment de la normativa vigent, s'informa que aquest lloc web és titularitat de:</p>
          <ul>
            <li><strong>Denominació:</strong> ON TECNOLOGIES S.L. (Ontec)</li>
            <li><strong>NRT:</strong> [número de registre tributari]</li>
            <li><strong>Domicili:</strong> C/ de la Vena 3, Baixos, Encamp, Andorra</li>
            <li><strong>Correu electrònic:</strong> <MailLink/></li>
            <li><strong>Telèfon:</strong> +376 88 55 99</li>
            <li><strong>Lloc web:</strong> ontecandorra.com</li>
          </ul>
          <h2>2. Objecte</h2>
          <p>Aquest lloc web té per finalitat informar sobre els serveis i solucions tecnològiques d'Ontec (IT Security, comunicacions, automatització i audiovisuals) i facilitar el contacte amb l'empresa.</p>
          <h2>3. Condicions d'ús</h2>
          <p>L'accés i la navegació en aquest lloc web impliquen l'acceptació de les presents condicions. L'usuari es compromet a fer-ne un ús adequat i a no emprar-lo per a activitats il·lícites o contràries a la bona fe.</p>
          <h2>4. Propietat intel·lectual i industrial</h2>
          <p>Tots els continguts (textos, imatges, logotips, disseny i codi) són propietat d'Ontec o de tercers que n'han autoritzat l'ús, i estan protegits per la normativa de propietat intel·lectual. Queda prohibida la seva reproducció total o parcial sense autorització expressa.</p>
          <h2>5. Responsabilitat</h2>
          <p>Ontec no es fa responsable dels possibles danys derivats de l'ús del lloc web, ni de la disponibilitat tècnica continuada del mateix. La informació publicada té caràcter merament informatiu i pot ser modificada sense previ avís.</p>
          <h2>6. Enllaços</h2>
          <p>Aquest lloc web pot contenir enllaços a pàgines de tercers. Ontec no es responsabilitza dels continguts ni de les polítiques de privacitat d'aquests llocs externs.</p>
          <h2>7. Legislació aplicable</h2>
          <p>Aquestes condicions es regeixen per la legislació del Principat d'Andorra. Per a qualsevol controvèrsia, les parts se sotmeten als tribunals d'Andorra.</p>
        </>,
        es:<>
          <h2>1. Titular del sitio web</h2>
          <p>En cumplimiento de la normativa vigente, se informa de que este sitio web es titularidad de:</p>
          <ul>
            <li><strong>Denominación:</strong> ON TECNOLOGIES S.L. (Ontec)</li>
            <li><strong>NRT:</strong> [número de registro tributario]</li>
            <li><strong>Domicilio:</strong> C/ de la Vena 3, Bajos, Encamp, Andorra</li>
            <li><strong>Correo electrónico:</strong> <MailLink/></li>
            <li><strong>Teléfono:</strong> +376 88 55 99</li>
            <li><strong>Sitio web:</strong> ontecandorra.com</li>
          </ul>
          <h2>2. Objeto</h2>
          <p>Este sitio web tiene como finalidad informar sobre los servicios y soluciones tecnológicas de Ontec (IT Security, comunicaciones, automatización y audiovisuales) y facilitar el contacto con la empresa.</p>
          <h2>3. Condiciones de uso</h2>
          <p>El acceso y la navegación en este sitio web implican la aceptación de las presentes condiciones. El usuario se compromete a hacer un uso adecuado y a no emplearlo para actividades ilícitas o contrarias a la buena fe.</p>
          <h2>4. Propiedad intelectual e industrial</h2>
          <p>Todos los contenidos (textos, imágenes, logotipos, diseño y código) son propiedad de Ontec o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual. Queda prohibida su reproducción total o parcial sin autorización expresa.</p>
          <h2>5. Responsabilidad</h2>
          <p>Ontec no se hace responsable de los posibles daños derivados del uso del sitio web, ni de su disponibilidad técnica continuada. La información publicada tiene carácter meramente informativo y puede ser modificada sin previo aviso.</p>
          <h2>6. Enlaces</h2>
          <p>Este sitio web puede contener enlaces a páginas de terceros. Ontec no se responsabiliza de los contenidos ni de las políticas de privacidad de dichos sitios externos.</p>
          <h2>7. Legislación aplicable</h2>
          <p>Estas condiciones se rigen por la legislación del Principado de Andorra. Para cualquier controversia, las partes se someten a los tribunales de Andorra.</p>
        </>,
        fr:<>
          <h2>1. Titulaire du site web</h2>
          <p>Conformément à la réglementation en vigueur, il est précisé que ce site web est la propriété de :</p>
          <ul>
            <li><strong>Dénomination :</strong> ON TECNOLOGIES S.L. (Ontec)</li>
            <li><strong>NRT :</strong> [numéro d'enregistrement fiscal]</li>
            <li><strong>Adresse :</strong> C/ de la Vena 3, Baixos, Encamp, Andorre</li>
            <li><strong>E-mail :</strong> <MailLink/></li>
            <li><strong>Téléphone :</strong> +376 88 55 99</li>
            <li><strong>Site web :</strong> ontecandorra.com</li>
          </ul>
          <h2>2. Objet</h2>
          <p>Ce site web a pour but d'informer sur les services et solutions technologiques d'Ontec (IT Security, communications, automatisation et audiovisuel) et de faciliter le contact avec l'entreprise.</p>
          <h2>3. Conditions d'utilisation</h2>
          <p>L'accès et la navigation sur ce site impliquent l'acceptation des présentes conditions. L'utilisateur s'engage à en faire un usage approprié et à ne pas l'utiliser à des fins illicites ou contraires à la bonne foi.</p>
          <h2>4. Propriété intellectuelle et industrielle</h2>
          <p>Tous les contenus (textes, images, logos, design et code) sont la propriété d'Ontec ou de tiers en ayant autorisé l'usage, et sont protégés par la réglementation sur la propriété intellectuelle. Toute reproduction totale ou partielle sans autorisation expresse est interdite.</p>
          <h2>5. Responsabilité</h2>
          <p>Ontec n'est pas responsable des éventuels dommages résultant de l'utilisation du site, ni de sa disponibilité technique continue. Les informations publiées ont un caractère purement informatif et peuvent être modifiées sans préavis.</p>
          <h2>6. Liens</h2>
          <p>Ce site peut contenir des liens vers des pages de tiers. Ontec n'est pas responsable des contenus ni des politiques de confidentialité de ces sites externes.</p>
          <h2>7. Législation applicable</h2>
          <p>Ces conditions sont régies par la législation de la Principauté d'Andorre. Pour tout litige, les parties se soumettent aux tribunaux d'Andorre.</p>
        </>,
        en:<>
          <h2>1. Website owner</h2>
          <p>In compliance with applicable regulations, this website is owned by:</p>
          <ul>
            <li><strong>Name:</strong> ON TECNOLOGIES S.L. (Ontec)</li>
            <li><strong>Tax ID (NRT):</strong> [tax registration number]</li>
            <li><strong>Address:</strong> C/ de la Vena 3, Baixos, Encamp, Andorra</li>
            <li><strong>Email:</strong> <MailLink/></li>
            <li><strong>Phone:</strong> +376 88 55 99</li>
            <li><strong>Website:</strong> ontecandorra.com</li>
          </ul>
          <h2>2. Purpose</h2>
          <p>This website aims to provide information about Ontec's technology services and solutions (IT Security, communications, automation and audiovisual) and to facilitate contact with the company.</p>
          <h2>3. Terms of use</h2>
          <p>Accessing and browsing this website implies acceptance of these terms. The user agrees to make appropriate use of it and not to use it for unlawful purposes or purposes contrary to good faith.</p>
          <h2>4. Intellectual and industrial property</h2>
          <p>All content (text, images, logos, design and code) is the property of Ontec or of third parties who have authorized its use, and is protected by intellectual property law. Its total or partial reproduction without express authorization is prohibited.</p>
          <h2>5. Liability</h2>
          <p>Ontec is not liable for any damages arising from the use of the website, nor for its continued technical availability. The information published is purely informative and may be modified without prior notice.</p>
          <h2>6. Links</h2>
          <p>This website may contain links to third-party pages. Ontec is not responsible for the content or privacy policies of those external sites.</p>
          <h2>7. Applicable law</h2>
          <p>These terms are governed by the law of the Principality of Andorra. For any dispute, the parties submit to the courts of Andorra.</p>
        </>
      })}
    </LegalLayout>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
