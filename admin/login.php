<?php
// Inicio de sesión.
require __DIR__ . '/lib.php';
secure_session_start();

if (!credentials_exist()) { header('Location: setup.php'); exit; } // primera vez
if (is_logged_in())       { header('Location: index.php'); exit; }

$error = '';
$ip = client_ip();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $left = lock_seconds_left($ip);
    if ($left > 0) {
        $error = 'Demasiados intentos. Espera ' . ceil($left / 60) . ' min e inténtalo de nuevo.';
    } else {
        $user = trim((string)($_POST['user'] ?? ''));
        $pass = (string)($_POST['pass'] ?? '');
        if (verify_login($user, $pass)) {
            clear_failures($ip);
            session_regenerate_id(true); // evita fijación de sesión
            $_SESSION['auth'] = true;
            $_SESSION['user'] = $user;
            header('Location: index.php');
            exit;
        }
        register_failure($ip);
        $error = 'Usuario o contraseña incorrectos.';
    }
}

$locked = lock_seconds_left($ip);
page_head('Iniciar sesión');
?>
<div class="card">
  <h1>Iniciar sesión</h1>
  <h2>Panel de administración de la web</h2>
  <?php if ($error): ?><div class="msg err"><?= e($error) ?></div><?php endif; ?>
  <form method="post" autocomplete="off">
    <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
    <label>Usuario</label>
    <input type="text" name="user" required autofocus>
    <label>Contraseña</label>
    <input type="password" name="pass" required>
    <div class="row">
      <button class="btn" type="submit" <?= $locked > 0 ? 'disabled' : '' ?>>Entrar</button>
    </div>
  </form>
</div>
<?php page_foot();
