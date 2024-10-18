"use strict";

import { createBoard } from "./crateBoard.js";
import { isFinishGame } from "./finishGame.js";
import { cleanString, defineCellProps } from "./helpers.js";
import { showCell } from "./showCells.js";
import { setSpyButtonClick } from "./spyLogic.js";
import { startTimer } from "./timers.js";

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
          isFirstClick = false;
        }
        showCell(i, j, boardGame);
      });

      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault(); // Evita que o menu de contexto padrão apareça

        if (!cell.classList.contains("revealed") && !isFirstClick) {
          cell.classList.toggle("flagged");

          if (cell.classList.contains("flagged")) {
            defineCellProps(cell);
          } else {
            cell.innerText = "";
            cell.style.backgroundColor = "blue";
          }
        }
      });

      boardDiv.appendChild(cell);
    }
  }
  localStorage.setItem("boardGame", boardGame);
};

const setGameInicialInfos = () => {
  document.getElementById("game-mode").innerText = `Modo: ${cleanString(
    gameMode
  )}`;
  document.getElementById(
    "number-mines"
  ).innerText = `Número de bombas: ${numMines}`;
  document.getElementById("dimension").innerText = `Dimensão: ${dimension}`;
};

const setLeaveGameButton = () => {
  isFinishGame(gameMode, true, false);
};
export const generalBoardGabe = () => boardGame;
// nas configurações, vamos deixar no máximo um tabuleiro 20x20, 200 bombas
const numMines = Number(localStorage.getItem("numberBombs"));
const dimension = Number(localStorage.getItem("dimension"));
export const gameMode = cleanString(localStorage.getItem("mode"));
export const totalSafeCells = dimension * dimension - numMines;
const user = localStorage.getItem("user");
let isFirstClick = true;
let boardGame;

document.addEventListener("DOMContentLoaded", () => {
  renderBoard(dimension, numMines);
  setGameInicialInfos();
});
