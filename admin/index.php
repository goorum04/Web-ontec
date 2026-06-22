<?php
// Editor de contenido. Protegido: requiere haber iniciado sesión.
// PROTOTIPO: edita la sección "Portada (Hero)" como ejemplo. La estructura
// está preparada para añadir más secciones y el blog sin reescribir nada.
require __DIR__ . '/lib.php';
secure_session_start();
require_login();

$ok = '';
$error = '';
$data = read_content('home');
$hero = $data['hero'] ?? ['kicker' => '', 'title' => '', 'subtitle' => '', 'image' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    try {
        $hero['kicker']   = trim((string)($_POST['kicker'] ?? ''));
        $hero['title']    = trim((string)($_POST['title'] ?? ''));
        $hero['subtitle'] = trim((string)($_POST['subtitle'] ?? ''));

        $uploaded = handle_image_upload('image');     // null si no se sube nada
        if ($uploaded !== null) { $hero['image'] = $uploaded; }
        if (!empty($_POST['remove_image'])) { $hero['image'] = ''; }

        $data['hero'] = $hero;
        if (write_content('home', $data)) {
            $ok = 'Cambios guardados. La web ya muestra el contenido nuevo.';
        } else {
            $error = 'No se pudieron guardar los cambios. Revisa los permisos de la carpeta "content".';
        }
    } catch (Throwable $ex) {
        $error = $ex->getMessage();
    }
}

page_head('Editor', true);
?>
<div class="card">
  <h1>Editar la portada</h1>
  <h2>Sección principal (Hero) de la página de inicio</h2>

  <?php if ($ok):    ?><div class="msg ok"><?= e($ok) ?></div><?php endif; ?>
  <?php if ($error): ?><div class="msg err"><?= e($error) ?></div><?php endif; ?>

  <form method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">

    <label>Texto superior (kicker)</label>
    <input type="text" name="kicker" value="<?= e($hero['kicker']) ?>">

    <label>Título principal</label>
    <input type="text" name="title" value="<?= e($hero['title']) ?>">

    <label>Subtítulo / descripción</label>
    <textarea name="subtitle"><?= e($hero['subtitle']) ?></textarea>

    <label>Imagen de fondo</label>
    <?php if (!empty($hero['image'])): ?>
      <div class="preview"><img src="../<?= e($hero['image']) ?>" alt="Imagen actual"></div>
      <label style="text-transform:none;letter-spacing:0;color:var(--ink);font-size:14px;margin-top:10px">
        <input type="checkbox" name="remove_image" value="1"> Quitar la imagen actual
      </label>
    <?php endif; ?>
    <input type="file" name="image" accept="image/jpeg,image/png,image/webp,image/gif" style="margin-top:8px">
    <p class="hint">Formatos: JPG, PNG, WEBP o GIF. Máximo 5 MB. Si no eliges ninguna, se mantiene la actual.</p>

    <div class="row">
      <button class="btn" type="submit">Guardar cambios</button>
      <a class="btn ghost" href="../demo.html" target="_blank">Ver resultado</a>
    </div>
  </form>
</div>

<div class="card">
  <h2 style="margin:0">Próximamente en el panel</h2>
  <p class="hint" style="margin-top:8px">Este es un prototipo con una sección de ejemplo. La versión final incluirá:
  textos de todas las páginas, gestor de entradas del blog (crear / editar / borrar) y biblioteca de imágenes.</p>
</div>
<?php page_foot();
