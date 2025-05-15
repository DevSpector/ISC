const $ = (elemento) => document.querySelector(elemento);

$("#cadastro").addEventListener("click", (ev) => {
  ev.preventDefault();

  // Validação simplificada
  if ($("#senha").value !== $("#confirma-senha").value) {
    alert("As senhas não coincidem!");
    return;
  }

  if ($("#senha").value.length < 4) {
    alert("A senha precisa ter no mínimo 4 caracteres");
    return;
  }

  const usuario = {
    login: $("#login").value,
    senha: $("#senha").value,
    perfil: {
      nome: $("#nome").value,
      tema: "claro"
    }
  };

  localStorage.setItem("usuario", JSON.stringify(usuario));
  alert("Cadastro realizado!\nVocê será redirecionado para login.");
  window.location.href = "./login.html";
});