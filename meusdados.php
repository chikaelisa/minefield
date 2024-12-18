<!DOCTYPE html>

<?php

  include('src/php/verificaSessao.php');

?>

<html lang="PT-br">

  <head>
    <meta charset="UTF-8">
    <title>Meus Dados</title>
    <link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Road+Rage&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Cabin:ital,wght@0,400..700;1,400..700&family=Road+Rage&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="estilo/meusdados.css">
    <script src="https://kit.fontawesome.com/5da4b5c12f.js" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.14.3/dist/sweetalert2.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.14.3/dist/sweetalert2.all.min.js"></script>
  </head>

  <body>

    <form class="form_cadastro" action="iniciar.php" method="get">

      <p>Meus Dados</p>

      <div>
        <i class="fa-solid fa-user" > <span class="campo_texto"> Nome completo</span></i>
        <div class="form_campo" id="campo_login1"></div> <br>
      </div>

      <div>
        <i class="fa-regular fa-calendar-days"> <span class="campo_texto"> Data de nascimento</span></i>
        <div class="form_campo" id="data_nascimento"></div> <br>
      </div>

      <div>
        <i class="fa-solid fa-file-signature" > <span class="campo_texto"> CPF</span></i>
        <div class="form_campo" id="cpf"></div> <br>
      </div>

      <div class="campo_lapis">
        <i class="fa-solid fa-phone"> <span class="campo_texto"> Telefone</span></i>
        <input class="form_campo" id="telefone" type="tel" disabled>
        <i class="fa-solid fa-pen-to-square lapis"></i>
        <br>
      </div>

      <div class="campo_lapis">
        <i class="fa-solid fa-envelope" ><span class="campo_texto"> E-mail</span></i>
        <input class="form_campo" id="email" type="email" disabled>
        <i class="fa-solid fa-pen-to-square lapis"></i>
        <br>
      </div>

      <div class="campo_lapis">
        <i class="fa-solid fa-circle-user" ><span class="campo_texto"> Username</span></i>
        <input class="form_campo" id="username" type="text" disabled>
        <br>
      </div>

      <div class="campo_lapis">
        <i class="fa-solid fa-lock" > <span class="campo_texto"> Senha</span></i>
        <input class="form_campo" id="senha" type="password" disabled>
        <i class="fa-solid fa-pen-to-square lapis"></i>
        <br>
      </div>


      <button class="alterar" type="submit"><span class="alterar_texto">Alterar</span></button>

    </form>

    <script src="src/alteraDados.js"></script>

  </body>

</html>