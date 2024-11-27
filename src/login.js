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

  request.open("POST", "http://localhost/minefield/src/php/login.php", true);
  let formData = new FormData();
  formData.append("username", username);
  formData.append("senha", password);
  request.send(formData);

  request.onload = () => 
  {
    if (request.status == 200) 
    {
        const response = JSON.parse(request.responseText);
        if (response.erro) 
        {
          Swal.fire({
            icon: "error",
            title: "Erro!",
            text: response.erro
          });
        }
        else
          createSession(username);
    }
  }
}

function createSession(username) {
  let request = new XMLHttpRequest();

  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status == 200) {
        localStorage.setItem("username", username);
        window.location.href = "iniciar.php";
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Não foi possível iniciar a sessão.",
        });
      }
    }
  };
  request.open(
    "POST",
    "http://localhost/minefield/src/php/criarSessao.php",
    true
  );
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send("user=" + encodeURIComponent(username));
}
