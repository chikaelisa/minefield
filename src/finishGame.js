"use stric";

import {
  countSeconds,
  countSecondsForRivotrilMode,
  stopTimer,
} from "./timers.js";

import { showAllCells } from "./showCells.js";

const playAgain = () => {
  location.reload();
};

const setConfigNewGameButton = () => {
  const newGameButton = document.getElementById("configNewGame");
  newGameButton.style.display = "flex";
  newGameButton.style.cursor = "pointer";
  newGameButton.addEventListener(
    "click",
    () => (window.location.href = "iniciar.php")
  );
};

const saveGame = (gameStatus, gameMode, gameDuration) => {
  const loggeduser = localStorage.getItem("username");

  if (!loggeduser) return false;

  let date = new Date();
  date = date.toISOString().split("T")[0];

  const numberBombs = localStorage.getItem("numberBombs");
  const dimension = localStorage.getItem("dimension");

  let request = new XMLHttpRequest();
  let comando = `INSERT INTO partida (jogador_username, modalidade, tamTabuleiro,
                                      numBombas, resultado, tempoPartida, dataPartida)
                              VALUES ('${loggeduser}', '${gameMode}', ${dimension}, ${numberBombs}, 
                                      '${gameStatus}', ${gameDuration}, '${date}')`;

  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status != 200) {
        Swal.fire({
          icon: "alert",
          title: "Alerta",
          text: "Um problema ocorreu ao salvar os dados da partida",
        });
      }
    }
  };
  request.open("POST", "http://localhost/minefield/src/php/inserir.php", true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send("comando=" + encodeURIComponent(comando));
};

export const isFinishGame = (gameMode, isDefeat, isVictory) => {
  const durationGame =
    gameMode === "RIVOTRIL" ? countSecondsForRivotrilMode : countSeconds;
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
    saveGame("VITORIA", gameMode, Number(countSeconds()));
    setPlayAgainButton();
    setConfigNewGameButton();
  }
  if (isDefeat || (gameMode === "RIVOTRIL" && Number(countSeconds()) === 0)) {
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
    setConfigNewGameButton();
    saveGame("DERROTA", gameMode, Number(countSeconds()));
  }
};
