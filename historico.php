<!DOCTYPE html>

<html lang="PT-br">

<?php

  include('src/php/verificaSessao.php');

?>

<head>
    <meta charset="UTF-8">
    <title>Histórico</title>
    <link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Road+Rage&display=swap" rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css2?family=Bungee&family=Cabin:ital,wght@0,400..700;1,400..700&family=Road+Rage&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="estilo/historico.css">
    <script src="https://kit.fontawesome.com/5da4b5c12f.js" crossorigin="anonymous"></script>
    <!--TODO: refatorar função e colocar no arquivo js-->
    <script>
        function goBack() {
            window.location.href = 'iniciar.php';
        }
    </script>
</head>

<body>

    <div class="logo">
        <img src="imagens/historico2.png" alt="Histórico">
    </div>
    <div class="section">

        <div class="select-game-mode">
            <p>
                Tipo de Partida
            </p>
            <div class="selection-checkbox">
                <input type="checkbox" id="normal" name="normal" value="NORMAL" checked>
                <label for="normal"></label>
                <span>Normal</span>
            </div>
            <div class="selection-checkbox">
                <input type="checkbox" id="rivotril" name="rivotril" value="RIVOTRIL" checked>
                <label for="rivotril"></label>
                <span>Rivotril</span>
            </div>
            <div class="selection-checkbox">
                <input type="checkbox" id="ranked" name="ranked" value="RANQUEADA" checked>
                <label for="ranked"></label>
                <span>Ranqueada</span>
            </div>
        </div>
        <div id="history-game-list" class="history-game-list"></div>

    </div>

    <button onclick="goBack()">Voltar</button>

    <script src="src/historico.js"></script>

</body>

</html>