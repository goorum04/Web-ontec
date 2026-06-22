<?php
// ─────────────────────────────────────────────────────────────────────────────
// Configuración del panel de administración de Ontec.
// Normalmente NO hace falta tocar nada aquí. Si algún día cambia la estructura
// de carpetas en el hosting, este es el único sitio donde ajustar rutas.
// ─────────────────────────────────────────────────────────────────────────────

return [
    // Carpeta donde se guardan los textos editables (archivos JSON).
    'content_dir'      => __DIR__ . '/../content',

    // Carpeta donde se suben las imágenes desde el panel.
    'uploads_dir'      => __DIR__ . '/../uploads',
    // Ruta pública (URL) de esa carpeta, relativa a la raíz de la web.
    'uploads_url'      => 'uploads',

    // Archivo donde se guarda la contraseña (cifrada). Es un .php protegido,
    // nunca se muestra su contenido en el navegador.
    'credentials_file' => __DIR__ . '/data/credentials.php',
    // Registro de intentos de acceso fallidos (anti fuerza bruta).
    'throttle_file'    => __DIR__ . '/data/throttle.json',

    // Lista blanca de contenidos editables. Solo se pueden editar estas claves;
    // así nadie puede pedir editar un archivo arbitrario del servidor.
    'editable'         => [
        'home' => ['file' => 'home.json', 'label' => 'Portada (Hero)'],
    ],

    // Seguridad del login.
    'max_attempts'     => 5,    // intentos fallidos antes de bloquear
    'lockout_minutes'  => 10,   // minutos de bloqueo tras superarlos

    // Subida de imágenes.
    'max_upload_bytes' => 5 * 1024 * 1024, // 5 MB
    'allowed_images'   => [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
        'image/gif'  => 'gif',
    ],
];
