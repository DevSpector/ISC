<?php
require __DIR__ . '/includes/auth.php';

if (estaLogado()) {
    header("Location: painel.php");
    exit;
}

$erro = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (cadastrarUsuario(
            $_POST['nome'],
            $_POST['email'],
            $_POST['usuario'],
            $_POST['senha']
        )) {
            header("Location: login.php?cadastro=sucesso");
            exit;
        }
    } catch (PDOException $e) {
        $erro = "Erro ao cadastrar: " . (strpos($e->getMessage(), 'Duplicate') ? 'Usuário ou e-mail já existe' : 'Erro no sistema');
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Cadastro</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; }
        .erro { color: red; margin-bottom: 15px; }
        .sucesso { color: green; margin-bottom: 15px; }
        form { display: flex; flex-direction: column; gap: 10px; }
        input, button { padding: 10px; }
        button { background: #4CAF50; color: white; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Cadastro</h1>
    <?php 
    if ($erro) echo "<p class='erro'>$erro</p>"; 
    if (isset($_GET['cadastro'])) echo "<p class='sucesso'>Cadastro realizado com sucesso!</p>";
    ?>
    <form method="POST">
        <input type="text" name="nome" placeholder="Nome completo" required>
        <input type="email" name="email" placeholder="E-mail" required>
        <input type="text" name="usuario" placeholder="Nome de usuário" required>
        <input type="password" name="senha" placeholder="Senha" required>
        <button type="submit">Cadastrar</button>
    </form>
    <p>Já tem conta? <a href="login.php">Faça login</a></p>
    <script>
    function validarForm() {
        const inputs = document.querySelectorAll('input[required]');
        for (let input of inputs) {
            if (!input.value.trim()) {
                alert(`Por favor, preencha o campo ${input.placeholder}`);
                return false;
            }
        }
        return true;
    }
    </script>
</body>
</html>