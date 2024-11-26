document
  .querySelector(".form_cadastro")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let dataNascimento = document.getElementById("dataNasc").value;
    let cpf = document.getElementById("cpf").value;
    let telefone = document.getElementById("telefone").value;
    let email = document.getElementById("email").value;
    let user = document.getElementById("user").value;
    let senha = document.getElementById("senha").value;

    if (nome.length < 1) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Nome precisa ter pelo menos 1 caracter!",
      });
      return;
    }

    if (!dataNascimento) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Por favor, selecione uma data de nascimento.",
      });
      return;
    }

    let partesData = dataNascimento.split("-");
    let ano = parseInt(partesData[0], 10);
    let mes = parseInt(partesData[1], 10) - 1; //mês é 0-indexado
    let dia = parseInt(partesData[2], 10);

    let dataNasc = new Date(ano, mes, dia);
    let dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    if (dataNasc > dataAtual) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "A data de nascimento tem que ser inferior à data atual.",
      });
      return;
    }

    if (!validaCPF(cpf)) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "CPF inválido! Verifique e tente novamente.",
      });
      return;
    }

    let telefoneValido = /^\d{10,11}$/.test(telefone);
    if (!telefoneValido) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Verifique seu telefone e tente novamente, lembrando que o formato é XXXXXXXXXX.",
      });
      return;
    }

    //html ja faz a validação do email, que tem que ter o @

    if (!validaUsername(user)) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Tente novamente! Lembre-se que o username deve ter entre 2 a 20 caracteres e não conter caracteres especiais.",
      });
      return;
    }

    if (senha.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "A senha deve ter no mínimo 8 caracteres.",
      });
      return;
    }

    const usuario = {
      nome,
      dataNascimento,
      cpf: cpf.replace(/\D/g, ""),
      telefone,
      email,
      user,
      senha,
    };

    cadastraUsuario(usuario);
  });

function verificaDataValida(dia, mes, ano) {
  let data = new Date(ano, mes, dia);
  return (
    data.getFullYear() === ano &&
    data.getMonth() === mes &&
    data.getDate() === dia
  );
}

function validaCPF(cpf) {
  cpf = cpf.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false; //com todos os números iguais

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.charAt(10))) return false;

  return true;
}

function validaUsername(username) {
  let usernameValido = /^[a-zA-Z0-9]{2,20}$/.test(username);
  return usernameValido;
}

function cadastraUsuario(usuario) {
  let request = new XMLHttpRequest();

  let comando = `INSERT INTO usuario VALUES ('${usuario.user}', '${usuario.cpf}', '${usuario.nome}', '${usuario.dataNascimento}', 
                                               '${usuario.telefone}', '${usuario.email}', '${usuario.senha}')`;

  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Cadastro realizado com sucesso!",
        }).then(() => {
          window.location.href = "index.html";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível realizar o cadastro.",
        });
      }
    }
  };

  request.open("POST", "http://localhost/minefield/src/php/inserir.php", true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send("comando=" + encodeURIComponent(comando));
}

function cadastraUsuario(usuario) {
  let request = new XMLHttpRequest();

  let comando = `INSERT INTO usuario VALUES ('${usuario.user}', '${usuario.cpf}', '${usuario.nome}', ${usuario.dataNascimento}, 
                                               '${usuario.telefone}', '${usuario.email}', '${usuario.senha}')`;

  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Cadastro realizado com sucesso!",
        }).then(() => {
          window.location.href = "index.html";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível realizar o cadastro.",
        });
      }
    }
  };
  request.open("POST", "http://localhost/minefield/src/php/inserir.php", false);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send("comando=" + encodeURIComponent(comando));
}

function cadastraUsuario(usuario) {
  let request = new XMLHttpRequest();

  let comando = `INSERT INTO usuario VALUES ('${usuario.user}', '${usuario.cpf}', '${usuario.nome}', ${usuario.dataNascimento}, 
                                               '${usuario.telefone}', '${usuario.email}', '${usuario.senha}')`;

  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Cadastro realizado com sucesso!",
        }).then(() => {
          window.location.href = "index.html";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível realizar o cadastro.",
        });
      }
    }
  };
  request.open("POST", "http://localhost/minefield/src/php/inserir.php", false);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send("comando=" + encodeURIComponent(comando));
}
