/*Valida username e senha digitados (será realizado em PHP) */

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 


    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const validUsername = "usuario";
    const validPassword = "123456";

    // Verificação
    if (username === validUsername && password === validPassword) {
        window.location.href = "iniciar.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
});
