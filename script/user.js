const $ = (elemento) => document.querySelector(elemento);

$("#entrar").addEventListener("click", (ev) => {
  ev.preventDefault();

  const string = localStorage.getItem("usuario");
  const usuarioCadastrado = JSON.parse(string);

  // Verifica se há usuário cadastrado
  if (!usuarioCadastrado) {
    alert("Nenhum usuário cadastrado!");
    return;
  }

  const { login, senha } = usuarioCadastrado;

  const dadosCorretos = login === $("#login").value && senha === $("#senha").value;

  if (!dadosCorretos) {
    alert("Dados inválidos!");
    return;
  }

  // Cria objeto de perfil se não existir
  if (!usuarioCadastrado.perfil) {
    usuarioCadastrado.perfil = {
      nome: login,
      bio: "",
      avatar: "",
      tema: "claro"
    };
    localStorage.setItem("usuario", JSON.stringify(usuarioCadastrado));
  }

  // Redireciona com o nome do usuário na URL
  window.location.href = `./logado.html?user=${encodeURIComponent(login)}`;
});