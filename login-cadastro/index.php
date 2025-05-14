<?php
// Redireciona para login se não estiver autenticado
session_start();
if (!isset($_SESSION['user'])) {
    header('Location: login.php');
    exit;
}
require 'dashboard.php';
?>