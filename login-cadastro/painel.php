<?php
require __DIR__ . '/includes/auth.php';

if (!estaLogado()) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Painel</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .btn-sair { display: inline-block; padding: 10px 15px; background: #f44336; color: white; text-decoration: none; }
    </style>
</head>
<body>
    <h1>Bem-vindo, <?= htmlspecialchars($_SESSION['usuario_nome']) ?>!</h1>
    <p>Você está logado no sistema.</p>
    <a href="logout.php" class="btn-sair">Sair</a>
</body>
</html>