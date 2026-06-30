# Cómo publicar y editar artículos del blog (Ontec)

El blog de la web lee los artículos desde esta carpeta `articulos/`.
**No hace falta GitHub, ni programas, ni compilar nada.** Solo editar archivos
de texto desde el Administrador de archivos de Hostinger (o por FTP).

Cada artículo son **2 cosas**:

1. Un archivo de texto con el contenido: `articulos/NOMBRE.md`
2. Una entrada en la lista: `articulos/index.json`

---

## ✏️ Editar un artículo existente

1. Entra al Administrador de archivos de Hostinger → carpeta `articulos/`.
2. Abre el archivo `.md` del artículo (ej. `knx-domotica.md`).
3. Cambia el texto y **guarda**. Listo, ya está en la web.

Para cambiar el título, la fecha o la foto de la tarjeta, edita `index.json`
(ver más abajo).

---

## ➕ Publicar un artículo NUEVO

### Paso 1 — Crear el archivo del contenido

Crea un archivo nuevo en `articulos/` con un nombre corto, en minúsculas y con
guiones, terminado en `.md`. Ejemplo: `articulos/nou-projecte.md`

Dentro escribes el texto con este formato sencillo (Markdown):

```
Aquí va el primer párrafo de introducción.

## Esto es un título de sección

Texto normal del párrafo. Puedes poner palabras en **negrita** así.

- Punto de una lista
- Otro punto
- Otro más

## Otra sección

Más texto y conclusión.
```

Reglas rápidas del formato:
- `## Texto`  → título de sección
- `### Texto` → subtítulo más pequeño
- `**texto**` → negrita
- `*texto*`   → cursiva
- `- texto`   → punto de lista (un guion + espacio al principio)
- Deja una **línea en blanco** entre párrafos.

### Paso 2 — Añadirlo a la lista (`index.json`)

Abre `articulos/index.json` y añade un bloque nuevo **al principio de la lista**
(para que salga el primero). Copia este modelo y rellénalo:

```json
  {
    "id": "nou-projecte",
    "tag": "Comunicacions",
    "date": "2026",
    "readtime": "5 min",
    "title": "Títol que es veurà a la targeta i a dalt de l'article",
    "excerpt": "Resum curt d'una o dues frases que apareix a la targeta del blog.",
    "img": "https://images.unsplash.com/photo-XXXX?w=900&q=80&auto=format&fit=crop",
    "featured": true
  },
```

Importante:
- **`id`** tiene que ser EXACTAMENTE igual que el nombre del archivo `.md`
  (sin el `.md`). Aquí `nou-projecte` → archivo `nou-projecte.md`.
- Pon una **coma** al final del bloque si tiene otros bloques debajo.
- `featured: true` hace que salga grande arriba del todo. Pon `false` en el resto.
- `img` es la dirección de una foto. Puede ser de Unsplash o cualquier URL de imagen.
  > ⚠️ Si usas una foto de un sitio nuevo (un dominio distinto a unsplash),
  > avisa a quien lleve la web para añadir ese dominio a la lista de seguridad
  > (CSP). Si no, la foto no se verá.

Guarda el archivo. **Refresca la web** (Ctrl+F5) y el artículo ya aparece.

---

## 🗑️ Borrar un artículo

1. Quita su bloque de `index.json`.
2. (Opcional) borra su archivo `.md`.

---

## ❓ Problemas frecuentes

- **El artículo no aparece** → revisa que el `id` del `index.json` coincida con el
  nombre del archivo `.md`, y que el `index.json` no tenga comas de más o de menos.
- **Sale "Artículo no encontrado"** → el `id` del enlace no existe en `index.json`.
- **La foto no se ve** → la URL de la imagen es de un dominio no permitido (ver nota
  de seguridad arriba) o la dirección está mal.
- **Comprobar el index.json** → pega el contenido en https://jsonlint.com para
  validar que el formato es correcto (es lo que más se rompe).
