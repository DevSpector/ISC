<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $_POST['email'];
  $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
  
  $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
  $stmt->execute([$email, $password]);
  
  header("Location: login.php?success=1");
  exit;
}
?>

<form method="POST">
  <input type="email" name="email" required>
  <input type="password" name="password" required>
  <button type="submit">Cadastrar</button>
</form>