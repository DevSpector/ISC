// Função para cadastro
function cadastrarUsuario(nome, login, senha) {
  const usuario = {
    nome,
    login,
    senha,
    perfil: {
      tema: "claro",
      avatar: ""
    }
  };
  localStorage.setItem(login, JSON.stringify(usuario));
  return usuario;
}

// Função para login
function fazerLogin(login, senha) {
  const usuario = JSON.parse(localStorage.getItem(login));
  
  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  if (usuario.senha !== senha) {
    throw new Error("Senha incorreta");
  }

  // Marca como usuário atual
  localStorage.setItem("usuarioAtual", login);
  return usuario;
}

// Verifica se está logado
function verificarAutenticacao() {
  const login = localStorage.getItem("usuarioAtual");
  return login ? JSON.parse(localStorage.getItem(login)) : null;
}

// Função para logout
function fazerLogout() {
  localStorage.removeItem("usuarioAtual");
}