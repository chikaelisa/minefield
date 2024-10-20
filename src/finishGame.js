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
    setPlayAgainButton();
    setConfigNewGameButton();
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
    setPlayAgainButton();
    setConfigNewGameButton();
  }
};
