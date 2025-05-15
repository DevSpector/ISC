const $ = (elemento) => document.querySelector(elemento);

$("#cadastro").addEventListener("click", (ev) => {
  ev.preventDefault();

  const nome = $("#nome").value;
  const email = $("#email").value;
  const login = $("#login").value;
  const senha = $("#senha").value;
  const confirmaSenha = $("#confirma-senha").value;

  // Validações
  if (senha !== confirmaSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  if (!nome || !email || !login || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  // Verifica se já existe usuário cadastrado
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (usuarios.some(u => u.login === login)) {
    alert("Este login já está em uso!");
    return;
  }

  // Cria novo usuário
  const novoUsuario = {
    nome,
    email,
    login,
    senha,
    perfil: null // Será criado no primeiro login
  };

  // Adiciona ao array de usuários
  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
  alert("Cadastro realizado com sucesso!");
  window.location.href = "./login.html";
});