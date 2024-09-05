// Função para cadastrar o usuário e salvar os dados no localStorage
function cadastrarUsuario(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;
    const repetirSenha = document.getElementById('repetir-senha').value;
    const email = document.getElementById('email').value;

    if (senha !== repetirSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    const userInfo = {
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        telefone: telefone,
        email: email,
        adicionais: {} // Inicializa um objeto para armazenar informações adicionais
    };

    // Salvar as informações no localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    // Redirecionar para a página inicial do jogo (pginicial.html)
    window.location.href = 'pginicial.html';
}

// Função para carregar as informações do usuário na área do usuário
function carregarUsuario() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo) {
        const userInfoDiv = document.getElementById('userInfo');
        userInfoDiv.innerHTML = `
            <div class="info-block"><strong>Nome:</strong> ${userInfo.nome} ${userInfo.sobrenome}</div>
            <div class="info-block"><strong>CPF:</strong> ${userInfo.cpf}</div>
            <div class="info-block"><strong>Telefone:</strong> ${userInfo.telefone}</div>
            <div class="info-block"><strong>Email:</strong> ${userInfo.email}</div>
        `;

        carregarInformacoesAdicionais(userInfo.adicionais);
    } else {
        alert('Nenhum usuário encontrado.');
    }
}

// Função para adicionar informações adicionais
function adicionarInformacoes(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const hobbies = document.getElementById('hobbies').value;
    const endereco = document.getElementById('endereco').value;
    const preferencias = document.getElementById('preferencias').value;

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    userInfo.adicionais = {
        hobbies: hobbies,
        endereco: endereco,
        preferencias: preferencias
    };

    // Salvar as informações adicionais no localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    // Carregar as informações adicionais na tela
    carregarInformacoesAdicionais(userInfo.adicionais);
}

// Função para carregar as informações adicionais na área do usuário
function carregarInformacoesAdicionais(adicionais) {
    const additionalInfoDiv = document.getElementById('additionalInfo');
    additionalInfoDiv.innerHTML = `
        <h3>Informações Adicionais</h3>
        <div class="info-block"><strong>Hobbies:</strong> ${adicionais.hobbies || 'Não informado'}</div>
        <div class="info-block"><strong>Endereço:</strong> ${adicionais.endereco || 'Não informado'}</div>
        <div class="info-block"><strong>Preferências de Jogos:</strong> ${adicionais.preferencias || 'Não informado'}</div>
        <button class="btn btn-secondary mt-3" onclick="editarInformacoesAdicionais()">Editar Informações</button>
    `;
}

// Função para permitir a edição das informações adicionais
function editarInformacoesAdicionais() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    document.getElementById('hobbies').value = userInfo.adicionais.hobbies || '';
    document.getElementById('endereco').value = userInfo.adicionais.endereco || '';
    document.getElementById('preferencias').value = userInfo.adicionais.preferencias || '';
}

// Chama a função carregarUsuario() automaticamente ao carregar a página areaUsuario.html
if (window.location.pathname.includes('areaUsuario.html')) {
    carregarUsuario();
}
