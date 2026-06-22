<?php
// ─────────────────────────────────────────────────────────────────────────────
// Funciones compartidas del panel de administración.
// Seguridad: sesiones endurecidas, token CSRF, validación de entradas,
// escritura atómica de archivos y control de intentos de acceso.
// ─────────────────────────────────────────────────────────────────────────────

declare(strict_types=1);

function cfg(): array {
    static $c = null;
    if ($c === null) { $c = require __DIR__ . '/config.php'; }
    return $c;
}

// Escapa texto para mostrarlo en HTML de forma segura (evita XSS).
function e($s): string {
    return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
}

function client_ip(): string {
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

// ── Sesión segura ────────────────────────────────────────────────────────────
function secure_session_start(): void {
    if (session_status() === PHP_SESSION_ACTIVE) { return; }
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'httponly' => true,     // la cookie no es accesible desde JavaScript
        'secure'   => $https,   // solo viaja por HTTPS cuando hay HTTPS
        'samesite' => 'Lax',    // mitiga CSRF entre sitios
    ]);
    session_name('ontec_admin');
    session_start();
}

// ── Protección CSRF ──────────────────────────────────────────────────────────
function csrf_token(): string {
    if (empty($_SESSION['csrf'])) { $_SESSION['csrf'] = bin2hex(random_bytes(32)); }
    return $_SESSION['csrf'];
}

function csrf_check(): void {
    $t = $_POST['csrf'] ?? '';
    if (!is_string($t) || empty($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], $t)) {
        http_response_code(400);
        exit('Petición no válida (token de seguridad caducado). Recarga la página e inténtalo de nuevo.');
    }
}

// ── Autenticación ────────────────────────────────────────────────────────────
function is_logged_in(): bool {
    return !empty($_SESSION['auth']) && $_SESSION['auth'] === true;
}

function require_login(): void {
    if (!is_logged_in()) { header('Location: login.php'); exit; }
}

function credentials_exist(): bool {
    return is_file(cfg()['credentials_file']);
}

function load_credentials(): ?array {
    if (!credentials_exist()) { return null; }
    $c = require cfg()['credentials_file'];
    return is_array($c) ? $c : null;
}

function save_credentials(string $user, string $password): void {
    $dir = dirname(cfg()['credentials_file']);
    if (!is_dir($dir)) { mkdir($dir, 0750, true); }
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $payload = ['user' => $user, 'hash' => $hash, 'created' => time()];
    $php = "<?php\n// Archivo generado automáticamente. NO editar a mano.\nreturn "
        . var_export($payload, true) . ";\n";
    file_put_contents(cfg()['credentials_file'], $php, LOCK_EX);
    @chmod(cfg()['credentials_file'], 0640);
}

function verify_login(string $user, string $password): bool {
    $c = load_credentials();
    if (!$c) { return false; }
    // Comparación en tiempo constante del usuario + verificación del hash.
    $userOk = hash_equals((string)($c['user'] ?? ''), $user);
    $passOk = password_verify($password, (string)($c['hash'] ?? ''));
    return $userOk && $passOk;
}

// ── Control de intentos (anti fuerza bruta) ──────────────────────────────────
function throttle_all(): array {
    $f = cfg()['throttle_file'];
    if (!is_file($f)) { return []; }
    $d = json_decode((string)file_get_contents($f), true);
    return is_array($d) ? $d : [];
}

function throttle_write(array $all): void {
    $dir = dirname(cfg()['throttle_file']);
    if (!is_dir($dir)) { mkdir($dir, 0750, true); }
    file_put_contents(cfg()['throttle_file'], json_encode($all), LOCK_EX);
}

function lock_seconds_left(string $ip): int {
    $s = throttle_all()[$ip] ?? null;
    if (!$s) { return 0; }
    return max(0, (int)($s['until'] ?? 0) - time());
}

function register_failure(string $ip): void {
    $all = throttle_all();
    $s = $all[$ip] ?? ['count' => 0, 'until' => 0];
    $s['count'] = (int)($s['count'] ?? 0) + 1;
    if ($s['count'] >= cfg()['max_attempts']) {
        $s['until'] = time() + cfg()['lockout_minutes'] * 60;
        $s['count'] = 0;
    }
    $all[$ip] = $s;
    throttle_write($all);
}

function clear_failures(string $ip): void {
    $all = throttle_all();
    unset($all[$ip]);
    throttle_write($all);
}

// ── Lectura / escritura de contenido (con lista blanca) ──────────────────────
function content_path(string $key): ?string {
    $editable = cfg()['editable'];
    if (!isset($editable[$key])) { return null; } // solo claves permitidas
    return cfg()['content_dir'] . '/' . $editable[$key]['file'];
}

function read_content(string $key): array {
    $p = content_path($key);
    if (!$p || !is_file($p)) { return []; }
    $d = json_decode((string)file_get_contents($p), true);
    return is_array($d) ? $d : [];
}

function write_content(string $key, array $data): bool {
    $p = content_path($key);
    if (!$p) { return false; }
    $dir = dirname($p);
    if (!is_dir($dir)) { mkdir($dir, 0755, true); }
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $tmp = $p . '.tmp';
    if (file_put_contents($tmp, $json, LOCK_EX) === false) { return false; }
    return rename($tmp, $p); // reemplazo atómico: nunca queda un archivo a medias
}

// ── Subida de imágenes (validada) ────────────────────────────────────────────
function handle_image_upload(string $field): ?string {
    if (empty($_FILES[$field]) || ($_FILES[$field]['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null; // no se subió ninguna imagen: no es un error
    }
    $f = $_FILES[$field];
    if ($f['error'] !== UPLOAD_ERR_OK) {
        throw new RuntimeException('No se pudo subir la imagen (código ' . (int)$f['error'] . ').');
    }
    if ($f['size'] > cfg()['max_upload_bytes']) {
        throw new RuntimeException('La imagen es demasiado grande (máximo 5 MB).');
    }
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);
    $allowed = cfg()['allowed_images'];
    if (!isset($allowed[$mime])) {
        throw new RuntimeException('Formato no permitido. Usa JPG, PNG, WEBP o GIF.');
    }
    if (@getimagesize($f['tmp_name']) === false) {
        throw new RuntimeException('El archivo no parece una imagen válida.');
    }
    $ext  = $allowed[$mime];
    $name = 'img_' . date('Ymd') . '_' . bin2hex(random_bytes(6)) . '.' . $ext;
    $dir  = cfg()['uploads_dir'];
    if (!is_dir($dir)) { mkdir($dir, 0755, true); }
    if (!move_uploaded_file($f['tmp_name'], $dir . '/' . $name)) {
        throw new RuntimeException('No se pudo guardar la imagen en el servidor.');
    }
    return cfg()['uploads_url'] . '/' . $name;
}

// ── Plantilla visual mínima ──────────────────────────────────────────────────
function page_head(string $title, bool $withNav = false): void {
    $t = e($title);
    echo <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>{$t} · Panel Ontec</title>
<style>
  :root{--bg:#0f1115;--panel:#171a21;--line:#262b36;--ink:#eef1ea;--mut:#9aa3b2;--accent:#45e07f;--err:#ff5f57}
  *{box-sizing:border-box}
  body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--ink);line-height:1.55}
  .wrap{max-width:720px;margin:0 auto;padding:32px 20px}
  .brand{display:flex;align-items:center;gap:12px;margin-bottom:28px}
  .brand b{font-size:18px;letter-spacing:.02em}
  .dot{width:10px;height:10px;border-radius:50%;background:var(--accent);box-shadow:0 0 14px var(--accent)}
  .card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:28px;margin-bottom:20px}
  h1{font-size:24px;margin:0 0 6px}
  h2{font-size:16px;margin:0 0 16px;color:var(--mut);font-weight:600}
  label{display:block;font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:var(--mut);margin:16px 0 6px}
  input[type=text],input[type=password],textarea{width:100%;background:#0f1218;border:1px solid var(--line);border-radius:10px;padding:12px 14px;color:var(--ink);font-size:15px;font-family:inherit;outline:none}
  input:focus,textarea:focus{border-color:var(--accent)}
  textarea{resize:vertical;min-height:90px}
  .btn{display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:#06210f;border:0;border-radius:10px;padding:13px 22px;font-size:15px;font-weight:700;cursor:pointer;text-decoration:none}
  .btn.ghost{background:transparent;color:var(--mut);border:1px solid var(--line)}
  .row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:22px}
  .msg{border-radius:10px;padding:12px 16px;font-size:14px;margin-bottom:18px}
  .msg.ok{background:rgba(69,224,127,.12);border:1px solid rgba(69,224,127,.4);color:var(--accent)}
  .msg.err{background:rgba(255,95,87,.12);border:1px solid rgba(255,95,87,.4);color:var(--err)}
  .topnav{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
  .topnav a{color:var(--mut);font-size:14px;text-decoration:none}
  .hint{font-size:13px;color:var(--mut);margin-top:6px}
  .preview img{max-width:100%;border-radius:10px;border:1px solid var(--line);margin-top:8px}
</style>
</head>
<body>
<div class="wrap">
HTML;
    if ($withNav) {
        $u = e((string)($_SESSION['user'] ?? ''));
        echo '<div class="topnav"><div class="brand"><span class="dot"></span><b>Ontec · Administración</b></div>'
           . '<div>' . ($u ? "Sesión: <b>{$u}</b> · " : '') . '<a href="logout.php">Cerrar sesión</a></div></div>';
    } else {
        echo '<div class="brand"><span class="dot"></span><b>Ontec · Administración</b></div>';
    }
}

function page_foot(): void {
    echo "\n</div>\n</body>\n</html>";
}
