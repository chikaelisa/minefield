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

  if (isVictory) {
    stopTimer();
    showAllCells();
    alert(`Você venceu!!! O jogo durou ${durationGame()} segundos`);
    setPlayAgainButton();
    setConfigNewGameButton();
  }
  if (isDefeat || (gameMode === "Rivotril" && Number(countSeconds()) === 0)) {
    stopTimer();
    showAllCells();
    alert(`Você perdeu. O jogo durou ${durationGame()} segundos`);
    setPlayAgainButton();
    setConfigNewGameButton();
  }
};
