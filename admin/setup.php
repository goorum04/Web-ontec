<?php
// Configuración inicial: crear el usuario y la contraseña la PRIMERA vez.
// Una vez creada, esta página se bloquea sola (no se puede reabrir).
require __DIR__ . '/lib.php';
secure_session_start();

if (credentials_exist()) {
    // Ya hay credenciales: por seguridad no se permite volver a usar el setup.
    header('Location: login.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $user  = trim((string)($_POST['user'] ?? ''));
    $pass  = (string)($_POST['pass'] ?? '');
    $pass2 = (string)($_POST['pass2'] ?? '');

    if (strlen($user) < 3) {
        $error = 'El nombre de usuario debe tener al menos 3 caracteres.';
    } elseif (strlen($pass) < 10) {
        $error = 'La contraseña debe tener al menos 10 caracteres.';
    } elseif ($pass !== $pass2) {
        $error = 'Las dos contraseñas no coinciden.';
    } else {
        save_credentials($user, $pass);
        $_SESSION['auth'] = true;
        $_SESSION['user'] = $user;
        session_regenerate_id(true);
        header('Location: index.php');
        exit;
    }
}

page_head('Configuración inicial');
?>
<div class="card">
  <h1>Bienvenido 👋</h1>
  <h2>Crea la cuenta de administración (solo se hace una vez)</h2>
  <?php if ($error): ?><div class="msg err"><?= e($error) ?></div><?php endif; ?>
  <form method="post" autocomplete="off">
    <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
    <label>Usuario</label>
    <input type="text" name="user" value="<?= e($_POST['user'] ?? 'admin') ?>" required>
    <label>Contraseña (mínimo 10 caracteres)</label>
    <input type="password" name="pass" required>
    <label>Repite la contraseña</label>
    <input type="password" name="pass2" required>
    <p class="hint">Apunta estos datos en un lugar seguro. Podrás cambiarlos más adelante.</p>
    <div class="row"><button class="btn" type="submit">Crear cuenta y entrar</button></div>
  </form>
</div>
<?php page_foot();
