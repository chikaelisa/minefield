const usermock = { //alteraDados.js
    /*fullName: 'Pietra Ferreira',
    birthDate: 'Tue Oct 03 2024 12:34:56 GMT-0300 (Brasilia Standard Time)',
    CPF: 66555577045,
    phone: 19707070701,
    mail: 'blabla@blabla.com',
    username: 'Pietra',
    senha: '12345678'*/

};

let loggedUser = '';

function formatarData(date){

    const birthDate = new Date(date);
    const formattedDate = ("0" + birthDate.getDate()).slice(-2) + "/" + 
                  ("0" + (birthDate.getMonth() + 1)).slice(-2) + "/" + 
                  birthDate.getFullYear();
    return formattedDate;
}

function preencherCampos() {
  document.getElementById('campo_login1').innerText = usermock.fullName;
  const formattedDate = formatarData(usermock.birthDate);
  document.getElementById('data_nascimento').innerText = formattedDate;
  document.getElementById('cpf').innerText = usermock.CPF;
  document.getElementById('telefone').value = usermock.phone;
  document.getElementById('email').value = usermock.mail;
  document.getElementById('username').value = usermock.username;
  document.getElementById('senha').value = usermock.senha;
}

const lapisIcons = document.querySelectorAll('.lapis');


  lapisIcons.forEach(function(icon) {
      icon.addEventListener('click', function() {
      
          const input = this.previousElementSibling;
  
          
          if (input.disabled) {
              input.disabled = false;
              input.focus();
          } else {
              input.disabled = true;
          }
      });
  });

function validarSenha(senha) {
    return senha.length >= 8; 
}


const senhaInput = document.getElementById('senha');
senhaInput.addEventListener('blur', function() {
    const senha = senhaInput.value;

    if (!validarSenha(senha)) {
        Swal.fire({
            icon: 'error',
            title: 'Senha inválida',
            text: 'A senha deve ter pelo menos 8 caracteres.',
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'A senha está válida.',
        });
    }
});

// Verifica se houver alterações e exibe alerta
document.querySelector('.alterar').addEventListener('click', function(event) {
    event.preventDefault();

    const telefoneAtual = document.getElementById('telefone').value;
    const emailAtual = document.getElementById('email').value;
    const usernameAtual = document.getElementById('username').value;
    const senhaAtual = document.getElementById('senha').value;

    if (
        telefoneAtual !== usermock.phone.toString() ||
        emailAtual !== usermock.mail ||
        usernameAtual !== usermock.username ||
        senhaAtual !== usermock.senha
    ) {
        changeDataLoggedUser(loggedUser, telefoneAtual, emailAtual, usernameAtual, senhaAtual);
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Nenhum dado alterado',
            text: 'Você será redirecionado para a página do jogo.',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'iniciar.php'; // Redireciona para iniciar.html
            }
        });
    }
});

function loadUserData(loggedUser) {
    
  let request = new XMLHttpRequest();
  let comando = `SELECT * FROM usuario WHERE username = '${loggedUser}';`;
  
  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status == 200) {

           let convertedResponse = JSON.parse(request.responseText);
           usermock.fullName = convertedResponse[0].nome;
           usermock.birthDate = convertedResponse[0].dataNasc;
           usermock.CPF = convertedResponse[0].cpf;
           usermock.phone = convertedResponse[0].telefone;
           usermock.mail = convertedResponse[0].email;
           usermock.username = convertedResponse[0].username;
           usermock.senha = convertedResponse[0].senha;

           preencherCampos();
      }
      else
      {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Um problema ocorreu ao recurar os dados do perfil.',
        })
      }
    } 
  };
  request.open('GET', 'http://localhost/minefield/src/php/consultar.php?comando=' + encodeURIComponent(comando), true);
  request.send();

}

function getLoggedUser() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status == 200) {
        loggedUser = request.responseText;
        loadUserData(loggedUser);
      }
    } 
  };
  request.open('GET', 'http://localhost/minefield/src/php/obterUsuarioSessao.php', true);
  request.send();
}

function changeDataLoggedUser(loggedUser, telefoneAtual, emailAtual, usernameAtual, senhaAtual) {
    let request = new XMLHttpRequest();
    let comando = `UPDATE usuario
                      SET username = '${usernameAtual}',
                          telefone = '${telefoneAtual}',
                          email = '${emailAtual}',
                          senha = '${senhaAtual}'
                   WHERE username = '${loggedUser}';`;

    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status == 200) {
            console.log(request.responseText)
            Swal.fire({
                icon: 'success',
                title: 'Dados alterados com sucesso!',
                text: 'Você será redirecionado para a página do jogo.',
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.setItem("username", usernameAtual);
                    window.location.href = 'iniciar.php';
                }
            });
        }
        else
        {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Um problema ocorreu ao alterar os dados do perfil.',
            })
        }
      } 
    };
    request.open('POST', 'http://localhost/minefield/src/php/atualizar.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send('comando=' + encodeURIComponent(comando));
}

document.addEventListener("DOMContentLoaded", () => {
    getLoggedUser();
});