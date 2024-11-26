"use strict";

/*Valida username e senha digitados (será realizado em PHP) */

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  login(username, password);
});

function login(username, password) {
  let request = new XMLHttpRequest();
  let comando = `SELECT senha FROM usuario WHERE username = '${username}';`;

  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status == 200) {
        const passwordJson = JSON.parse(request.responseText);

        if (!passwordJson[0]) {
          Swal.fire({
            icon: "error",
            title: "Erro!",
            text: "Um erro ocorreu ao realizar o login",
          });
        }

        if (password == passwordJson[0].senha)
          window.location.href = "iniciar.html";
        else {
          Swal.fire({
            icon: "error",
            title: "Erro!",
            text: "Usuário ou senha incorretos!",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Um erro ocorreu ao realizar o login",
        });
      }
    }
  };

  // o caminho é diferente a depender de onde está a pasta no xampp
  const url =
    "http://localhost/minefield/src/php/consultar.php?comando=" +
    encodeURIComponent(comando);

  request.open("GET", url, true);
  request.send();
}
