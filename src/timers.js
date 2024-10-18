"use strict";

import { isFinishGame } from "./finishGame.js";
import { cleanString, formatTime } from "./helpers.js";

const numMines = Number(localStorage.getItem("numberBombs"));
const gameMode = cleanString(localStorage.getItem("mode"));

let timerInterval;
let seconds;
let inicialSecondsForRivotrilMode;

export const rivotrilTimerInitial = () => inicialSecondsForRivotrilMode;

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
    const { minutes, displaySeconds } = formatTime(seconds);
    showTimerText(["timer", "timer-rivotril"], minutes, displaySeconds);
  }, 1000));
};

export const showTimerText = (elementIds, minutes, displaySeconds) => {
  elementIds.forEach((element) => {
    document.getElementById(element).innerText = `Tempo: ${String(
      minutes
    ).padStart(2, "0")}:${String(displaySeconds).padStart(2, "0")}`;
  });
};

const startTimerRivotril = (numMines) => {
  timerInterval = setInterval(() => {
    if (seconds === 0) {
      stopTimer();
      isFinishGame(true, false);
      return;
    }
    seconds--;
    const { minutes, displaySeconds } = formatTime(seconds);
    showTimerText(["timer", "timer-rivotril"], minutes, displaySeconds);
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

document.addEventListener("DOMContentLoaded", () => {
  if (gameMode === "Rivotril") {
    setTimeToRivotrilMode(numMines);
  }
});
