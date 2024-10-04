document.querySelector(".form_cadastro").addEventListener("submit", function(event){
    var nome = document.getElementById("nome").value;
    var dataNascimento = document.getElementById("dataNasc").value;
    var cpf = document.getElementById("cpf").value;
    var telefone = document.getElementById("telefone").value;
    var email = document.getElementById("email").value;
    var user = document.getElementById("user").value;
    var senha = document.getElementById("senha").value;

    if(nome.length < 1){
        alert("Nome precisa ter pelo menos 1 caracter!")
        event.preventDefault();
        return;
    }

    if (!dataNascimento) {
        alert("Por favor, selecione uma data de nascimento.");
        event.preventDefault();
        return;
    }

    var partesData = dataNascimento.split('-');
    var ano = parseInt(partesData[0], 10);
    var mes = parseInt(partesData[1], 10) - 1; //mês é 0-indexado
    var dia = parseInt(partesData[2], 10);

    var dataNasc = new Date(ano, mes, dia);
    var dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0); 

    if (dataNasc > dataAtual) {
        alert("A data de nascimento tem que ser inferior à data atual.");
        event.preventDefault();
        return;
    }

    if (!validaCPF(cpf)) {
        alert("CPF inválido! Verifique e tente novamente.");
        event.preventDefault();
        return;
    }

    var telefoneValido = /^\d{10,11}$/.test(telefone);
    if (!telefoneValido) {
        alert("Verifique seu telefone e tente novamente, lembrando que o formado é este: XXXXXXXXXX.");
        event.preventDefault();
        return;
    }   

    //html ja faz a validação do email, que tem que ter o @

    if (!validaUsername(user)) {
        alert("Tente novamente! Lembre-se que o username deve ter entre 2 a 20 caracteres e não conter caracteres especiais.");
        event.preventDefault();
        return;
    }

    if (senha.length < 8) {
        alert("A senha deve ter no mínimo 8 caracteres.");
        event.preventDefault();
        return;
    }

});

function verificaDataValida(dia, mes, ano) {
    var data = new Date(ano, mes, dia);
    return data.getFullYear() === ano && data.getMonth() === mes && data.getDate() === dia;
}

function validaCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        
    if (cpf.length !== 11) 
        return false;
    if (/^(\d)\1+$/.test(cpf)) 
        return false; //com todos os números iguais
        
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.charAt(9))) returnfalse;
        
    soma = 0;
    for (i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.charAt(10))) returnfalse;
        
    return true;
}
    
function validaUsername(username) {
    var usernameValido = /^[a-zA-Z0-9]{2,20}$/.test(username);
    return usernameValido;
}
