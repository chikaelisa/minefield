const usermock = {
    fullName: 'Pietra Ferreira',
    birthDate: 'Tue Oct 03 2024 12:34:56 GMT-0300 (Brasilia Standard Time)',
    CPF: 66555577045,
    phone: 19707070701,
    mail: 'blabla@blabla.com',
    username: 'Pietra',
    senha: '12345678'

};
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

  window.onload = preencherCampos();

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
        Swal.fire({
            icon: 'success',
            title: 'Dados alterados com sucesso!',
            text: 'Você será redirecionado para a página do jogo.',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'iniciar.html'; // Redireciona para iniciar.html
            }
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Nenhum dado alterado',
            text: 'Você será redirecionado para a página do jogo.',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'iniciar.html'; // Redireciona para iniciar.html
            }
        });
    }
});