<!DOCTYPE html>

<html lang="PT-br">

<?php

  include('src/php/verificaSessao.php');

?>

    <head>
        <meta charset="UTF-8">
        <title>Ranking</title>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Cabin:ital,wght@0,400..700;1,400..700&family=Road+Rage&display=swap" rel="stylesheet">

        <link rel="stylesheet" type="text/css" href="estilo/ranking.css">
        <script src="https://kit.fontawesome.com/5da4b5c12f.js" crossorigin="anonymous"></script>
        <script>
            function goBack() {
                window.location.href = 'iniciar.php';
            }
        </script>
       
    </head>

    <body id="ranking">

        <div class="title">
            <p class="title-text">Ranking</p>
        </div>
        <div class="container"></div>

        <button type="button" class="iniciar" onclick="goBack()"><span class="iniciar-text">Voltar</span></button>

        <script type="module" src="./src/ranking.js"></script>
    </body>

</html>
