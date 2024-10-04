document.querySelector('.alterar').addEventListener('click', function(event) {
    event.preventDefault();

    const novaSenha = document.querySelectorAll('.form_campo')[0].value;
    const confirmarSenha = document.querySelectorAll('.form_campo')[1].value;

    if (novaSenha.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres.");
        return;
    }

    if (novaSenha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    alert("Senha alterada com sucesso!");
    window.location.href = 'index.html';
});
