"use strict";

/*Valida username e senha digitados (será realizado em PHP) */

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  login(username, password);

  /*const validUsername = "Pietra";
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
});*/
});

function login(username, password) {

  let request = new XMLHttpRequest();
  let comando = `SELECT senha FROM usuario WHERE username = '${username}';`;
  
  request.onreadystatechange = () => {

    if (request.readyState === XMLHttpRequest.DONE) {

      if (request.status == 200)
      {
          const passwordJson = JSON.parse(request.responseText);

          if (!passwordJson.length)
          {
            Swal.fire({
              icon: "error",
              title: "Erro!",
              text: "Usuário ou senha incorretos!",
            });
            return;
          }
         
          if (password == passwordJson[0].senha)
          {
            createSession(username);
          }
          else
          {
            Swal.fire({
              icon: "error",
              title: "Erro!",
              text: "Usuário ou senha incorretos!",
            });
          }
      }
      else
      {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Um erro ocorreu ao realizar o login.",
        });
      }
      
    } 
  };
  request.open('GET', 'http://localhost/minefield/src/php/consultar.php?comando=' + encodeURIComponent(comando), true);
  request.send();
}

function createSession(username) {
  
  let request = new XMLHttpRequest();

  request.onreadystatechange = () => {
   if (request.readyState === XMLHttpRequest.DONE) {
    if (request.status == 200)
    {
      localStorage.setItem("username", username);
      window.location.href = "iniciar.php";
    }
    else
      {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Não foi possível iniciar a sessão.",
        });
      }
   } 
   };
   request.open('POST', 'http://localhost/minefield/src/php/criarSessao.php', true);
   request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   request.send('user=' + encodeURIComponent(username));
}