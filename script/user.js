// Carrega dados do usuário
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem("usuario"));
    
    if (userData) {
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

// Configurações iniciais
document.addEventListener('DOMContentLoaded', function() {
    // Upload de avatar
    document.getElementById('avatar-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            const userData = JSON.parse(localStorage.getItem("usuario")) || {};
            if (!userData.perfil) userData.perfil = {};
            userData.perfil.avatar = event.target.result;
            localStorage.setItem("usuario", JSON.stringify(userData));
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
    document.getElementById('save-btn').addEventListener('click', function(e) {
        e.preventDefault();
        saveProfile();
    });
});

// Salva alterações do perfil
function saveProfile() {
    const userData = JSON.parse(localStorage.getItem("usuario")) || {};
    
    userData.perfil = {
        nome: document.getElementById('nome').value,
        bio: document.getElementById('bio').value,
        tema: document.querySelector('.theme-option.selected')?.dataset.theme || "claro",
        avatar: document.querySelector('#user-avatar img')?.src || ""
    };

    localStorage.setItem("usuario", JSON.stringify(userData));
    
    // Feedback visual
    const saveBtn = document.getElementById('save-btn');
    saveBtn.innerHTML = '<i class="fas fa-check"></i> Salvo!';
    setTimeout(() => {
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Salvar Alterações';
    }, 2000);
    
    // Atualiza a exibição
    loadUserData();
}