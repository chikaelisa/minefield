<!DOCTYPE html>

<html lang="PT-br">

<?php

  include('src/php/verificaSessao.php');

?>

<!-- image credit <a href="https://www.flaticon.com/free-icons/hourglass" title="hourglass icons">Hourglass icons created by Freepik - Flaticon</a>   -->

<head>
  <meta charset="UTF-8">
  <title>Campo Minado</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Bungee&family=Cabin:ital,wght@0,400..700;1,400..700&family=Road+Rage&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="estilo/partida.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
  <script src="https://kit.fontawesome.com/5da4b5c12f.js" crossorigin="anonymous"></script>
  <script type="module" src="src/partida.js"></script>

</head>

<body>
  <header class="nav">
    <div class="perfil-usuario">
      <img class="logo-user" src="imagens/perfil.png" alt="Imagem perfil">
      <span class="perfil_texto">Olá, {username}</span>
    </div>
    <p onclick="destroySession()" class="exit">Sair</p>
  </header>

  <div class="title-image">
    <img class="campo-minado-image" src="imagens/iniciar-titulo.png" alt="Campo Minado">
  </div>

  <div class="content">
    <div class="options-ranking-history">
      <a href="ranking.php">
        <div class="iniciar-options">
          <img src="imagens/trofeu.png" alt="Imagem ranking">
          <p class="icon-text">Ranking</p>
        </div>
      </a>

      <a href="historico.php">
        <div class="iniciar-options">
          <img src="imagens/historico.png" alt="Imagem historico">
          <p class="icon-text">Histórico</p>
        </div>
      </a>
    </div>

    <div class="settings">

      <div class="game-settings-container">

        <div class="board-title">
          <p id="game-mode">Modo: clássico</p>
          <p id="number-mines">Número de bombas: 5</p>
          <p id="dimension">Dimensão: 5</p>
          <p id="timer">Tempo: 00:00</p>
        </div>

        <div class="board"></div>
        <!-- <img class="board-img" src="imagens/campominado.png" alt="Imagem campo"> -->

      </div>

      <div class="partida-footer">
        <div class="spy-button">
          <i class="fa-solid fa-eye-slash"></i>
          <p>Trapaça</p>
        </div>

        <p class="leave-game">Abandonar partida</p>

      </div>

    </div>

    <div class="options-ranking-history">
    
        <div class="iniciar-options">
          <img src="imagens/mineFlag.png" alt="Bombas marcadas">
          <p class="icon-text" id="gameFlags"></p>
        </div>

        <div class="iniciar-options" id="timer-rivotril-div" style="display: none;">
          <img src="imagens/ampulheta.png" alt="tempo rivotril">
          <p class="icon-text" id="timer-rivotril"></p>
        </div>

        <div class="iniciar-options" id="configNewGame" style="display: none;">
          <img src="imagens/configNewGame.png" alt="novo jogo">
          <p class="icon-text" >Criar novo jogo</p>
        </div>
 
    </div>

  </div>


</body>

</html>