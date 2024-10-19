function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false; 
    }

    let soma;
    let resto;

    soma = 0;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }


    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}


document.querySelector('.recuperar').addEventListener('click', function() {
    const cpf = document.querySelector('.form_campo').value;

    if (validarCPF(cpf)) {
        window.location.href = 'alterarsenha.html'; 
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'CPF inválido!'
        });
    }
});
