function mudouTamanho() {
            if (window.innerWidth >= 768) {
                itens.style.display = 'block'
            } else {
                itens.style.display = 'none'
            }
        }

        function clickMenu() {
            if (itens.style.display == 'block') {
                itens.style.display = 'none'
            } else {
                itens.style.display = 'block'
            }
        }

// Simulação de um "banco de dados" de usuários (apenas para demonstração)
const users = [
    { email: "usuario@exemplo.com", password: "senha123", name: "Fulano" }
];

// Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita o recarregamento da página

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Verifica se o usuário existe
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert(`Login bem-sucedido! Bem-vindo, ${user.name}.`);
        // Redirecionar para outra página (ex: dashboard.html)
        // window.location.href = "dashboard.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
});

// Cadastro
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    // Validações
    if (password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
    }

    if (users.some(u => u.email === email)) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    // Adiciona o novo usuário ao "banco de dados"
    users.push({ email, password, name });
    alert("Cadastro realizado com sucesso! Faça login.");
    container.classList.remove('active'); // Volta para a tela de login
});