<!DOCTYPE html>

<html lang="PT-br">

<?php

  include('src/php/verificaSessao.php');

?>

<head>
    <meta charset="UTF-8">
    <title>Iniciar jogo</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Bungee&family=Cabin:ital,wght@0,400..700;1,400..700&family=Road+Rage&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="estilo/iniciar.css">
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.14.3/dist/sweetalert2.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.14.3/dist/sweetalert2.all.min.js"></script>
</head>

<body>
    <header class="nav">
        <div class="perfil-usuario" onclick="myData()">
            <img class="logo-user" src="imagens/perfil.png" alt="Imagem perfil">
            <span class="perfil_texto">Olá, {username}</span>
        </div>
        <p onclick="goBack(); destroySession();" class="exit">Sair</p>

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
                    <img src="imagens/historico.png" alt="Imagem trofeu">
                    <p class="icon-text">Histórico</p>
                </div>
            </a>
        </div>

        <div class="game-settings-container">

            <div class="area_iniciar">

                <div class="item-iniciar">
                    <span class="perfil_texto">Dimensão</span>
                    <span id="simboloMenosDimensao" class="simbolo_menos">-</span>
                    <input type="range" min="10" max="20" value="10" id="dimensao" oninput="updateBombs()">
                    <span id="simboloMaisDimensao" class="simbolo_mais">+</span>
                    <span id="dimensaoValue">10</span>
                </div>

                <div class="item-iniciar">
                    <span class="perfil_texto">N° Bombas</span>
                    <span id="simboloMenosBomba" class="simbolo_menos">-</span>
                    <input type="range" min="5" max="50" value="5" id="bombas" oninput="updateBombasValue()">
                    <span id="simboloMaisBomba" class="simbolo_mais">+</span>
                    <span id="bombasValue">5</span>
                </div>

                <div class="item-iniciar">
                    <span class="perfil_texto">Modalidade</span>
                    <div class="selection-mode">
                        <button class="game-mode" type="button">
                            <span class="game-mode-text">NORMAL</span>
                        </button>
                        <button class="game-mode" type="button">
                            <span class="game-mode-text">RIVOTRIL</span>
                        </button>
                        <button id="rankedButton" class="game-mode" type="button">
                            <span class="game-mode-text">RANQUEADA</span>
                        </button>
                    </div>
                </div>

                <div class="bora-comecar">
                    <button class="start-game-button" type="button" onclick="startGame()"><span
                            class="start-game-text">Iniciar Jogo</span></button>
                </div>



            </div>
        </div>
    </div>
    <script src="./src/iniciar.js"></script>
</body>

</html>