"use strict";

import { isFinishGame } from "./finishGame.js";

let timerInterval;
let seconds;
let inicialSecondsForRivotrilMode;

const setTimeToRivotrilMode = (numMines) => {
  if (numMines <= 10) {
    seconds = 30;
    inicialSecondsForRivotrilMode = 30;
    return;
  }
  if (numMines <= 30) {
    seconds = 120;
    inicialSecondsForRivotrilMode = 120;
    return;
  }
  if (numMines <= 50) {
    seconds = 240;
    inicialSecondsForRivotrilMode = 240;
    return;
  }
  if (numMines <= 80) {
    seconds = 280;
    inicialSecondsForRivotrilMode = 240;
    return;
  }

  seconds = 300;
  inicialSecondsForRivotrilMode = 300;
};

const startTimerNormalOrRanked = () => {
  seconds = 0;
  return (timerInterval = setInterval(() => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    document.getElementById("timer").innerText = `Tempo: ${String(
      minutes
    ).padStart(2, "0")}:${String(displaySeconds).padStart(2, "0")}`;
  }, 1000));
};

const startTimerRivotril = (numMines) => {
  setTimeToRivotrilMode(numMines);
  timerInterval = setInterval(() => {
    if (seconds === 0) {
      stopTimer();
      isFinishGame(true, false);
      return;
    }
    seconds--;
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    document.getElementById("timer").innerText = `Tempo: ${String(
      minutes
    ).padStart(2, "0")}:${String(displaySeconds).padStart(2, "0")}`;
  }, 1000);
};

export const startTimer = (gameMode, numMines) => {
  if (gameMode.includes("Rivotril")) {
    startTimerRivotril(numMines);
    return;
  }
  startTimerNormalOrRanked();
};

export const stopTimer = () => {
  clearInterval(timerInterval);
};

export const countSeconds = () => seconds;

export const countSecondsForRivotrilMode = () =>
  inicialSecondsForRivotrilMode - seconds;
