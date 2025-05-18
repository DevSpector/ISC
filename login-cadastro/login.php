<?php
require __DIR__ . '/includes/auth.php';

if (estaLogado()) {
    header("Location: painel.php");
    exit;
}

$erro = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (fazerLogin($_POST['usuario'], $_POST['senha'])) {
        header("Location: painel.php");
        exit;
    } else {
        $erro = "Usuário ou senha incorretos";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; }
        .erro { color: red; margin-bottom: 15px; }
        form { display: flex; flex-direction: column; gap: 10px; }
        input, button { padding: 10px; }
        button { background: #4CAF50; color: white; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Login</h1>
    <?php if ($erro) echo "<p class='erro'>$erro</p>"; ?>
    <form method="POST">
        <input type="text" name="usuario" placeholder="Usuário" required>
        <input type="password" name="senha" placeholder="Senha" required>
        <button type="submit">Entrar</button>
    </form>
    <p>Não tem conta? <a href="cadastro.php">Cadastre-se</a></p>
</body>
</html>