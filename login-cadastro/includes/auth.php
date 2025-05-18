<?php
require __DIR__ . '/config.php';

// Função para cadastrar usuário
function cadastrarUsuario($nome, $email, $usuario, $senha) {
    global $pdo;
    
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
    
    $stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, usuario, senha) VALUES (?, ?, ?, ?)");
    return $stmt->execute([$nome, $email, $usuario, $senhaHash]);
}

// Função para fazer login
function fazerLogin($usuario, $senha) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE usuario = ?");
    $stmt->execute([$usuario]);
    $user = $stmt->fetch();
    
    if ($user && password_verify($senha, $user['senha'])) {
        $_SESSION['usuario_id'] = $user['id'];
        $_SESSION['usuario_nome'] = $user['nome'];
        return true;
    }
    return false;
}

// Verifica se usuário está logado
function estaLogado() {
    return isset($_SESSION['usuario_id']);
}

// Faz logout
function logout() {
    session_destroy();
    header("Location: login.php");
    exit;
}