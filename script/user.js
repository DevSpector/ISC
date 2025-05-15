// Carrega dados do usuário
function loadUserData() {
  const userData = JSON.parse(localStorage.getItem("usuarioAtivo"));
  
  if (!userData) {
    window.location.href = "./login.html";
    return;
  }

  // Preenche os campos
  document.getElementById('username').textContent = userData.perfil?.nome || userData.login;
  document.getElementById('user-bio').textContent = userData.perfil?.bio || "Sem biografia";
  document.getElementById('nome').value = userData.perfil?.nome || userData.login;
  document.getElementById('bio').value = userData.perfil?.bio || "";

  // Atualiza avatar
  updateAvatar(userData);

  // Aplica tema
  if (userData.perfil?.tema) {
    applyTheme(userData.perfil.tema);
  }
}

// Atualiza a exibição do avatar
function updateAvatar(userData) {
  const avatar = document.getElementById('user-avatar');
  avatar.innerHTML = '';

  if (userData.perfil?.avatar) {
    const img = document.createElement('img');
    img.src = userData.perfil.avatar;
    img.alt = "Foto do perfil";
    img.onerror = () => showInitial(userData);
    avatar.appendChild(img);
  } else {
    showInitial(userData);
  }
}

// Mostra inicial do nome
function showInitial(userData) {
  const avatar = document.getElementById('user-avatar');
  const name = userData.perfil?.nome || userData.login || "U";
  avatar.innerHTML = `<span>${name.charAt(0).toUpperCase()}</span>`;
}

// Aplica tema selecionado
function applyTheme(theme) {
  document.body.className = `tema-${theme}`;
  document.querySelectorAll('.theme-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.theme === theme);
  });
}

// Salva alterações do perfil
function saveProfile() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const userData = JSON.parse(localStorage.getItem("usuarioAtivo"));

  if (!userData) return;

  const avatarImg = document.querySelector('#user-avatar img');
  const selectedTheme = document.querySelector('.theme-option.selected');

  // Atualiza dados
  userData.perfil = {
    nome: document.getElementById('nome').value,
    bio: document.getElementById('bio').value,
    avatar: avatarImg?.src || "",
    tema: selectedTheme?.dataset.theme || "claro"
  };

  // Atualiza no array de usuários
  const index = usuarios.findIndex(u => u.login === userData.login);
  if (index !== -1) {
    usuarios[index] = userData;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioAtivo", JSON.stringify(userData));
  }

  // Feedback visual
  const saveBtn = document.getElementById('save-btn');
  saveBtn.innerHTML = '<i class="fas fa-check"></i> Salvo!';
  setTimeout(() => {
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Salvar Alterações';
  }, 2000);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Verifica parâmetro na URL
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has('user')) {
    window.location.href = "./login.html";
    return;
  }

  loadUserData();

  // Upload de avatar
  document.getElementById('avatar-upload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const userData = JSON.parse(localStorage.getItem("usuarioAtivo"));
      if (!userData.perfil) userData.perfil = {};
      userData.perfil.avatar = event.target.result;
      localStorage.setItem("usuarioAtivo", JSON.stringify(userData));
      updateAvatar(userData);
    };
    reader.readAsDataURL(file);
  });

  // Seleção de tema
  document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', function() {
      const theme = this.dataset.theme;
      applyTheme(theme);
    });
  });

  // Botão salvar
  document.getElementById('save-btn').addEventListener('click', (e) => {
    e.preventDefault();
    saveProfile();
  });
});