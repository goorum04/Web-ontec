# Auditoría de seguridad — Web Ontec

**Fecha:** 2026-06-22
**Alcance:** Todo el repositorio `Web-ontec` (sitio estático: HTML + React vendorizado + JSX compilado a `*.page.js`).
**Tipo de aplicación:** Sitio web corporativo **estático**, sin backend propio. No hay procesamiento de datos en servidor, ni base de datos, ni autenticación.

---

## Estado de remediación (aplicado en esta entrega)

| # | Hallazgo | Estado |
|---|----------|--------|
| 1 | SRI en GSAP | ✅ **Corregido** — versión fijada a `gsap@3.12.5` + `integrity` (SHA-384) + `crossorigin` en las 12 páginas HTML |
| 2 | Content Security Policy | ✅ **Corregido** — `<meta>` CSP en las 12 páginas + cabecera CSP en `vercel.json` / `_headers` |
| 3 | Cabeceras de seguridad HTTP | ✅ **Corregido** — `vercel.json` (Vercel) y `_headers` (Netlify/portable): X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy, Permissions-Policy, COOP |
| 4 | `postMessage` sin validar origen | ✅ **Corregido** — el puente del panel solo confía en mensajes del `parent` directo, fija el `targetOrigin` al origen real del host y queda inerte si la página no está embebida (`src/tweaks.jsx` + los 12 bundles `*.page.js`) |
| 5 | Tooling de edición en producción | ✅ **Mitigado** — el protocolo de edición ya no se activa fuera de un host de previsualización (no framed → inerte) |
| 6 | Formulario de contacto | ⏳ **Pendiente de decisión** — requiere definir backend/servicio de envío antes de publicarse como funcional (recomendaciones abajo) |
| 7 | Recursos de terceros (fuentes/imágenes) | ℹ️ **Opcional** — restringidos por CSP; auto-hospedaje recomendado por privacidad RGPD |

> Las cabeceras se entregan tanto en `vercel.json` (hosting actual) como en `_headers` (formato Netlify/Cloudflare Pages) para que el cliente pueda desplegar en cualquier host estático sin re-derivar la política.

---

## Resumen ejecutivo

El sitio es estático y tiene una superficie de ataque pequeña. **No se han encontrado vulnerabilidades de inyección (XSS, etc.) explotables en el código de la aplicación**: todo el contenido dinámico se renderiza vía JSX de React (escapado automático) y no se usan `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function`, `document.write` ni `insertAdjacentHTML`. Tampoco hay secretos, claves API ni credenciales en el repositorio.

Los hallazgos son principalmente de **endurecimiento (hardening) y cadena de suministro**:

| # | Hallazgo | Severidad |
|---|----------|-----------|
| 1 | Scripts de CDN de terceros (GSAP) sin Subresource Integrity (SRI) | **Alta** |
| 2 | Ausencia total de Content Security Policy (CSP) | **Media** |
| 3 | Sin cabeceras de seguridad HTTP (clickjacking, MIME-sniffing, HSTS, Referrer-Policy, Permissions-Policy) | **Media** |
| 4 | `postMessage` sin validación de origen + `targetOrigin` comodín (`'*'`) en el panel de edición | **Media** |
| 5 | Herramienta interna de edición de diseño (`TweaksPanel`) embarcada en producción | **Baja** |
| 6 | Formulario de contacto sin endpoint / sin medidas anti-spam (riesgo futuro) | **Baja / Info** |
| 7 | Recursos de terceros (Google Fonts, Unsplash) — privacidad y disponibilidad | **Info** |

---

## Hallazgos detallados

### 1. Scripts de CDN de terceros sin Subresource Integrity (SRI) — **Alta**

Las 6 páginas HTML cargan GSAP directamente desde `cdn.jsdelivr.net` sin atributo `integrity` ni `crossorigin`:

```html
<!-- index.html:26-27 (idéntico en blog, contacta, empresa, serveis, solucions) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js"></script>
```

**Riesgo:** Si la CDN se ve comprometida (o ante un proxy/MITM que rompa TLS), se ejecutaría JavaScript arbitrario con control total de cada página. Además, `gsap@3.12` es un rango de versión "flotante": la CDN puede servir cualquier patch nuevo, lo que impide fijar el contenido.

**Remediación:**
- Añadir SRI y `crossorigin` a cada `<script>` de CDN, fijando una versión exacta (p. ej. `gsap@3.12.5`):
  ```html
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
          integrity="sha384-<hash>" crossorigin="anonymous"></script>
  ```
  Generar el hash con: `curl -s <url> | openssl dgst -sha384 -binary | openssl base64 -A`
- **Recomendado:** vendorizar GSAP en `/vendor/` (igual que React) y servirlo desde el propio dominio, eliminando la dependencia de la CDN en tiempo de ejecución.

---

### 2. Ausencia de Content Security Policy (CSP) — **Media**

No existe ninguna CSP (ni cabecera HTTP ni `<meta http-equiv>`). Una CSP es la principal defensa en profundidad frente a XSS e inyección de scripts de terceros; sin ella, cualquier inyección (presente o futura) se ejecuta sin restricción.

**Remediación (mínimo viable como `<meta>` en cada HTML):**
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src https://fonts.gstatic.com;
  img-src 'self' data: https://images.unsplash.com https://ontecandorra.com;
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  object-src 'none'">
```
> Nota: `frame-ancestors` solo surte efecto vía **cabecera HTTP**, no en `<meta>`. Para clickjacking ver hallazgo 3. Idealmente entregar la CSP como cabecera desde el hosting (Vercel `vercel.json`, Netlify `_headers`, Nginx, etc.).

---

### 3. Sin cabeceras de seguridad HTTP — **Media**

Al ser estático no hay configuración de cabeceras. Faltan, como mínimo:

- `X-Frame-Options: DENY` (o `Content-Security-Policy: frame-ancestors 'none'`) → previene **clickjacking** (relevante por el hallazgo 4).
- `X-Content-Type-Options: nosniff` → evita MIME-sniffing.
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` → fuerza HTTPS.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy: geolocation=(), microphone=(), camera=()` → desactiva APIs no usadas.

**Remediación:** configurarlas en la capa de hosting. Ejemplo para Vercel (`vercel.json`):
```json
{
  "headers": [{
    "source": "/(.*)",
    "headers": [
      { "key": "X-Frame-Options", "value": "DENY" },
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" }
    ]
  }]
}
```

---

### 4. `postMessage` sin validación de origen + `targetOrigin` comodín — **Media**

El panel de edición de diseño (`src/tweaks.jsx`) usa el protocolo `postMessage` con el host:

```js
// src/tweaks.jsx:148, 199, 205 — envía a CUALQUIER parent
window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
window.parent.postMessage({ type: '__edit_mode_available' }, '*');

// src/tweaks.jsx:192-201 — escucha SIN comprobar e.origin
const onMsg = (e) => {
  const t = e?.data?.type;
  if (t === '__activate_edit_mode') setOpen(true);
  else if (t === '__deactivate_edit_mode') setOpen(false);
};
window.addEventListener('message', onMsg);
```

**Riesgo:** (1) El `targetOrigin: '*'` difunde los mensajes a cualquier página que embeba el sitio en un iframe. (2) El listener no valida `e.origin`, por lo que un frame padre malicioso (si el sitio puede ser embebido — ver hallazgo 3) puede manipular el estado del panel. El impacto real hoy es bajo (solo abre/cierra un panel de tweaks cosméticos), pero es manejo de entrada no confiable sin validación de origen.

**Remediación:** validar `e.origin` contra una allowlist y no usar `'*'` como `targetOrigin`. Mejor aún, ver hallazgo 5.

---

### 5. Herramienta interna de edición (`TweaksPanel`) embarcada en producción — **Baja**

`TweaksPanel` y el protocolo `__edit_mode_*` son tooling de diseño/preview. Se renderiza en producción (p. ej. `src/index.jsx:388`, `src/empresa.jsx:83`). Expone un protocolo interno y código no necesario para el usuario final, aumentando la superficie y el peso del bundle.

**Remediación:** excluir el panel de los builds de producción (flag de entorno en `build.mjs`, o no montar `<TweaksPanel>` en el árbol de producción).

---

### 6. Formulario de contacto sin endpoint ni anti-spam — **Baja / Informativo**

`src/contacta.jsx` recoge PII (nombre, email, teléfono, mensaje) pero **no envía los datos a ningún sitio**: `submit()` solo hace `setSent(true)`. Es decir, **el formulario hoy no funciona** (no llega ningún mensaje a Ontec) — más un bug funcional que una vulnerabilidad.

**Cuando se conecte un backend/servicio de envío**, será imprescindible:
- Validación de entrada en servidor (no solo el chequeo de presencia del cliente).
- Protección anti-spam/anti-bot (honeypot, reCAPTCHA/Turnstile, rate-limiting).
- Protección CSRF si el endpoint mantiene estado/sesión.
- Sanitizar el contenido antes de incluirlo en correos (evitar inyección de cabeceras/HTML en emails).
- Cumplimiento RGPD: aviso de privacidad y base legal para tratar la PII.

> Positivo: el reflejo del nombre `Gracies, {form.nom}!` (`contacta.jsx:26`) es seguro porque React escapa el valor (no hay XSS).

---

### 7. Recursos de terceros (Google Fonts, Unsplash) — **Informativo**

- **Google Fonts** (`fonts.googleapis.com` / `fonts.gstatic.com`) y **Unsplash** (`images.unsplash.com`) se cargan en caliente. Implicaciones: privacidad (fuga de IP del visitante a terceros, relevante para RGPD) y disponibilidad (si el tercero cae, fallan tipografías/imágenes).
- **Remediación opcional:** auto-hospedar fuentes (WOFF2 en `/assets`) e imágenes clave para eliminar dependencias externas y mejorar privacidad y rendimiento.

---

## Comprobaciones realizadas (resultado limpio)

- **XSS / inyección DOM:** sin `dangerouslySetInnerHTML`, `innerHTML`, `outerHTML`, `eval`, `new Function`, `document.write`, `insertAdjacentHTML`. ✅
- **Secretos / credenciales:** sin claves API, tokens, contraseñas ni `.env` en el repo. ✅
- **Integridad de dependencias vendorizadas:** `vendor/react.js` y `vendor/react-dom.js` son builds oficiales de producción de React (cabeceras de licencia MIT correctas, sin código añadido sospechoso). ✅
- **Enlaces externos:** no hay `target="_blank"` (por tanto no aplica el riesgo `rel="noopener"`); todos los enlaces son internos o `tel:`/`mailto:`. ✅
- **`robots.txt` / `sitemap.xml`:** correctos, sin exponer rutas sensibles. ✅
- **`localStorage` / `sessionStorage` / `cookies`:** no se usan; no hay almacenamiento de datos sensibles en cliente. ✅

---

## Priorización recomendada

1. **(Alta)** Añadir SRI + versión fija a los scripts de GSAP, o vendorizarlos (hallazgo 1).
2. **(Media)** Configurar cabeceras de seguridad y CSP en el hosting (hallazgos 2 y 3).
3. **(Media)** Validar origen en el `postMessage` del panel o retirarlo de producción (hallazgos 4 y 5).
4. **(Baja)** Definir la estrategia del formulario de contacto antes de publicarlo como funcional (hallazgo 6).
</content>
</invoke>
