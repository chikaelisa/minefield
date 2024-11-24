"use stric";

import {
  countSeconds,
  countSecondsForRivotrilMode,
  stopTimer,
} from "./timers.js";

import { showAllCells } from "./showCells.js";
import { getLoggedUser } from "./helpers.js";

const playAgain = () => {
  location.reload();
};

const setPlayAgainButton = () => {
  const playAgainDiv = document.getElementById("playAgain");
  playAgainDiv.style.display = "flex";
  playAgainDiv.style.cursor = "pointer";
  playAgainDiv.addEventListener("click", playAgain);
};

const setConfigNewGameButton = () => {
  const newGameButton = document.getElementById("configNewGame");
  newGameButton.style.display = "flex";
  newGameButton.style.cursor = "pointer";
  newGameButton.addEventListener(
    "click",
    () => (window.location.href = "iniciar.html")
  );
};

const saveGame = (gameStatus, gameDuration) => {

  const loggeduser = localStorage.getItem("username");

  console.log(loggeduser)

  if (!loggeduser)
    return false;

  const gameMode = localStorage.getItem("mode");
  const numberBombs = localStorage.getItem("numberBombs");
  const dimension = localStorage.getItem("dimension");

  let request = new XMLHttpRequest();
  let comando = `INSERT INTO partida (jogador_username, modalidade, tamTabuleiro,
                                      numBombas, resultado, tempoPartida)
                              VALUES ('${loggeduser}', '${gameMode}', ${dimension}, ${numberBombs}, 
                                      '${gameStatus}', ${gameDuration})`;                                     

  request.onreadystatechange = () => {
   if (request.readyState === XMLHttpRequest.DONE) {

      if (request.status != 200)
      {
        Swal.fire({
          icon: 'alert',
          title: 'Alerta',
          text: 'Um problema ocorreu ao salvar os dados da partida',
        });
      }
      
   } 
 };
 request.open('POST', 'http://localhost/minefield/src/php/inserir.php', true);
 request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 request.send('comando=' + encodeURIComponent(comando));

};

export const isFinishGame = (gameMode, isDefeat, isVictory) => {
  //TODO: precisa enviar pro banco: user, modo de jogo, num de bom, dimensão e tempo em segundos
  const durationGame =
    gameMode === "Rivotril" ? countSecondsForRivotrilMode : countSeconds;
  const gameDurationText = `O jogo durou ${durationGame()} segundos;`;

  if (isVictory) {
    stopTimer();
    showAllCells();
    const alertText = `Você venceu!!! ${gameDurationText}`;
    Swal.fire({
      title: "Vitória!",
      text: alertText,
      imageUrl: "imagens/bandeira.png", // Caminho relativo para o seu ícone
      imageWidth: 100, // largura da imagem
      imageHeight: 100, // altura da imagem
      imageAlt: "Ícone do Projeto",
    });
    /*if (!saveGame('vitória', durationGame()))
    {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível salvar os dados da partida.',
        });
    }*/
    setPlayAgainButton();
    setConfigNewGameButton();
    saveGame('vitória', durationGame());
  }
  if (isDefeat || (gameMode === "Rivotril" && Number(countSeconds()) === 0)) {
    stopTimer();
    showAllCells();
    const alertText = `Você perdeu! ${gameDurationText}`;
    Swal.fire({
      title: "Derrota!",
      text: alertText,
      imageUrl: "imagens/bomba.png", // Caminho relativo para o seu ícone
      imageWidth: 100, // largura da imagem
      imageHeight: 100, // altura da imagem
      imageAlt: "Derrota",
    });
    /*if (!saveGame('derrota', durationGame()))
    {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível salvar os dados da partida.',
        });
    }*/
    setPlayAgainButton();
    setConfigNewGameButton();
    saveGame('derrota', durationGame());
  }
};