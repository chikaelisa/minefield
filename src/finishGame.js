"use stric";

import {
  countSeconds,
  countSecondsForRivotrilMode,
  stopTimer,
} from "./timers.js";

import { showAllCells } from "./showCells.js";

export const isFinishGame = (gameMode, isDefeat, isVictory) => {
  //TODO: precisa enviar pro banco: user, modo de jogo, num de bom, dimensão e tempo em segundos
  const durationGame =
    gameMode === "Rivotril" ? countSecondsForRivotrilMode : countSeconds;

  if (isVictory) {
    stopTimer();
    showAllCells();
    alert(`Você venceu!!! O jogo durou ${durationGame()} segundos`);
  }
  if (isDefeat || (gameMode === "Rivotril" && Number(countSeconds()) === 0)) {
    stopTimer();
    showAllCells();
    alert(`Você perdeu. O jogo durou ${durationGame()} segundos`);
  }
};
