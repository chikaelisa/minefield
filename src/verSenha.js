document.querySelectorAll('.togglePassword').forEach(function(toggle) {
    toggle.addEventListener('click', function () {
        const passwordField = this.previousElementSibling;
        if (passwordField.type === 'password') {
            passwordField.type = 'text';  
            this.src = 'imagens/ocultarSenha.png';  
        } else {
            passwordField.type = 'password';  
            this.src = 'imagens/verSenha.png'; 
        }
    });
});
