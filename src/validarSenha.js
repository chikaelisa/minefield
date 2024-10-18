document.querySelector('.alterar').addEventListener('click', function(event) {
    event.preventDefault();

    const novaSenha = document.querySelectorAll('.form_campo')[0].value;
    const confirmarSenha = document.querySelectorAll('.form_campo')[1].value;

    if (novaSenha.length < 8) {
        Swal.fire({
            icon: 'warning',
            title: 'Erro',
            text: 'A senha deve ter pelo menos 8 caracteres.',
        });
        return;
    }

    if (novaSenha !== confirmarSenha) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'As senhas não coincidem.',
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Senha alterada com sucesso!',
    }).then(() => {
        // Redireciona após clicar em OK
        window.location.href = 'index.html';
    });
});
