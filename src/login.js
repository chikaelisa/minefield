"use strict";

/*Valida username e senha digitados (será realizado em PHP) */

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const validUsername = "Pietra";
  const validPassword = "123456";

  // Verificação
  if (username === validUsername && password === validPassword) {
    window.location.href = "iniciar.html";
  } else {
    Swal.fire({
      icon: "error",
      title: "Erro!",
      text: "Usuário ou senha incorretos!",
    });
  }
});
