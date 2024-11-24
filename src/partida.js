"use strict";

import { createBoard } from "./crateBoard.js";
import { isFinishGame } from "./finishGame.js";
import { cleanString, defineCellProps, formatTime, getLoggedUser } from "./helpers.js";
import { showCell } from "./showCells.js";
import { setSpyButtonClick } from "./spyLogic.js";
import { rivotrilTimerInitial, showTimerText, startTimer } from "./timers.js";

/* definição de variáveis globais */

const gameMode = cleanString(localStorage.getItem("mode"));
const numMines = Number(localStorage.getItem("numberBombs"));
const dimension = Number(localStorage.getItem("dimension"));
const username = localStorage.getItem("username");

let isFirstClick = true;
let boardGame;
let flags = 0;

export const totalSafeCells = dimension * dimension - numMines; // nas configurações, vamos deixar no máximo um tabuleiro 20x20, 200 bombas

/* fim da definição de variáveis globais */

export const generalBoardGame = () => boardGame;

const renderBoard = (size, numMines) => {
  const boardDiv = document.querySelector(".board");

  boardDiv.style.gridTemplateColumns = `repeat(${dimension}, 50px)`;
  boardDiv.innerHTML = "";

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;

      cell.addEventListener("click", async () => {
        if (isFirstClick) {
          boardGame = createBoard(size, numMines, i, j);
          startTimer(gameMode, numMines);
          setSpyButtonClick(boardGame);
          setLeaveGameButton();
          isFirstClick = false;
        }
        showCell(i, j, boardGame);
      });

      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault(); // Evita que o menu de contexto padrão apareça

        if (!cell.classList.contains("revealed") && !isFirstClick) {
          cell.classList.toggle("flagged");

          if (cell.classList.contains("flagged")) {
            flags++;
            defineCellProps(cell);
          } else {
            flags--;
            cell.innerText = "";
            cell.style.backgroundColor = "blue";
          }
          setGameFlags();
        }
      });

      boardDiv.appendChild(cell);
    }
  }
  localStorage.setItem("boardGame", boardGame);
};

const setGameInicialInfos = () => {
  document.querySelector(".perfil_texto").innerText = `Olá, ${
    username ?? "pessoa"
  }`;
  document.getElementById("game-mode").innerText = `Modo: ${cleanString(
    gameMode
  )}`;
  document.getElementById(
    "number-mines"
  ).innerText = `Número de bombas: ${numMines}`;
  document.getElementById("dimension").innerText = `Dimensão: ${dimension}`;

  setGameFlags();
  setExitButton();
  setTimerInicialText();
};

const setGameFlags = () => {
  const gameFlags = document.getElementById("gameFlags");
  gameFlags.innerText = `Bombas marcadas: ${flags}/${numMines}`;
  if (flags > numMines) {
    gameFlags.style.color = "red";
  }
  if (flags === numMines) {
    gameFlags.style.color = "blue";
  }
};

const setTimerInicialText = () => {
  if (gameMode === "Rivotril") {
    const timerRivotril = document.getElementById("timer-rivotril-div");
    timerRivotril.style.display = "flex";
    const seconds = rivotrilTimerInitial();
    const { minutes, displaySeconds } = formatTime(seconds);
    return showTimerText(["timer", "timer-rivotril"], minutes, displaySeconds);
  }
  showTimerText(["timer"], 0, 0);
};

const exit = () => {
  // TODO: encerrar a conexão com o banco?
  window.location.href = "index.html";
};

const setExitButton = () => {
  const exitButton = document.querySelector(".exit");
  exitButton.addEventListener("click", exit);
};

const setLeaveGameButton = () => {
  const leaveGameButton = document.querySelector(".leave-game");
  leaveGameButton.addEventListener("click", () =>
    isFinishGame(gameMode, true, false)
  );
};

document.addEventListener("DOMContentLoaded", () => {
  renderBoard(dimension, numMines);
  setGameInicialInfos();
});
