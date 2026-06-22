# Panel de administración Ontec — Instalación (Hostinger)

Permite al dueño de la web editar contenido (textos, imágenes y, en la versión
final, el blog) desde una página `/admin` con login, **sin tocar código** y sin
depender de nadie. Todo se ejecuta en el hosting del cliente.

> **Estado:** prototipo. Incluye el login completo y la edición de la sección
> "Portada (Hero)" como ejemplo. Falta extender el editor al resto de secciones
> y al blog (planificado).

---

## Requisitos
- Hosting con **PHP 8** (Hostinger lo trae por defecto).
- Soporte de **.htaccess** (Hostinger usa LiteSpeed, compatible).

## Instalación (una sola vez, la hace el informático)

1. **Sube los archivos** al hosting (vía hPanel → Administrador de archivos, o por FTP),
   manteniendo esta estructura en la carpeta pública (`public_html`):
   ```
   public_html/
   ├── admin/        ← el panel
   ├── content/      ← los textos (archivos JSON)
   ├── uploads/      ← las imágenes subidas
   └── ... (resto de la web: index.html, etc.)
   ```

2. **Da permisos de escritura** a estas dos carpetas (en hPanel → Administrador
   de archivos → clic derecho → Permisos), para que el panel pueda guardar:
   - `content/`  → 755
   - `uploads/`  → 755

3. **Abre en el navegador** `https://EL-DOMINIO/admin/setup.php` y crea el
   usuario y la contraseña. Esto solo se puede hacer una vez: en cuanto se crea
   la cuenta, la página de configuración se bloquea sola.

4. ¡Listo! A partir de ahí, el dueño entra en `https://EL-DOMINIO/admin/` con su
   usuario y contraseña.

## Cómo lo usa el dueño (día a día)
1. Entra en `https://EL-DOMINIO/admin/`.
2. Inicia sesión.
3. Edita los textos / sube una imagen y pulsa **Guardar**.
4. La web se actualiza al instante (el contenido se lee de `content/`).

Para ver el ejemplo funcionando: `https://EL-DOMINIO/demo.html`.

---

## Seguridad incluida
- Contraseña **cifrada** (hash), nunca en el código ni en texto plano.
- **Sesión** con cookie `HttpOnly` + `SameSite`, y regeneración de ID al entrar.
- Protección **CSRF** en todos los formularios.
- **Bloqueo temporal** tras varios intentos fallidos (anti fuerza bruta).
- Subida de imágenes **validada** (tipo real, tamaño, nombre aleatorio) y carpeta
  de subidas sin ejecución de scripts.
- Solo se pueden editar contenidos de una **lista blanca** (sin acceso a otros archivos).
- La carpeta `admin/data/` (contraseña e intentos) está bloqueada por `.htaccess`.

## Recomendación adicional
Activa **HTTPS** (certificado SSL gratuito de Hostinger) para que el login viaje
cifrado. Hostinger lo ofrece con un clic en hPanel → Seguridad → SSL.
