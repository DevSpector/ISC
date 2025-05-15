const $ = (elemento) => document.querySelector(elemento);

$("#entrar").addEventListener("click", (ev) => {
  ev.preventDefault();

  const login = $("#login").value;
  const senha = $("#senha").value;

  if (!login || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  // Busca usuário no array de usuários
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(u => u.login === login && u.senha === senha);

  if (!usuario) {
    alert("Credenciais inválidas!");
    return;
  }

  // Cria perfil se não existir
  if (!usuario.perfil) {
    usuario.perfil = {
      nome: usuario.nome || usuario.login,
      bio: "",
      avatar: "",
      tema: "claro"
    };
    
    // Atualiza no array de usuários
    const index = usuarios.findIndex(u => u.login === usuario.login);
    usuarios[index] = usuario;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  // Salva usuário ativo
  localStorage.setItem("usuarioAtivo", JSON.stringify(usuario));
  
  // Redireciona
  window.location.href = `./logado.html?user=${encodeURIComponent(usuario.login)}`;
});