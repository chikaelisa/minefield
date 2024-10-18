"use strict";

import { isFinishGame } from "./finishGame.js";
import { cleanString, defineCellProps } from "./helpers.js";
import { startTimer } from "./timers.js";

const isInBoardSize = (x, y, size) => x >= 0 && x < size && y >= 0 && y < size;

const createBoard = (size, numMines, firstX, firstY) => {
  let board = Array(size)
    .fill()
    .map(() => Array(size).fill(0));

  let leftMines = numMines;

  console.log("firstX, fisrtY", firstX, firstY);

  while (leftMines > 0) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);

    const canPutMineOnCell =
      board[x][y] !== "M" && firstX !== x && firstY !== y;

    if (canPutMineOnCell) {
      board[x][y] = "M";
      leftMines--;
    }
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === "M") continue;

      let closeMines = 0;

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          let newX = i + dx;
          let newY = j + dy;
          if (isInBoardSize(newX, newY, size) && board[newX][newY] === "M") {
            closeMines++;
          }
        }
      }

      board[i][j] = closeMines;
    }
  }

  return board;
};

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
          console.log(i, j);
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
};

function showCell(i, j, board) {
  const cell = document.querySelector(
    `.cell[data-row='${i}'][data-col='${j}']`
  );

  if (
    !cell ||
    cell.classList.contains("revealed") ||
    cell.classList.contains("flagged")
  )
    return;

  cell.classList.add("revealed");
  defineCellProps(cell);
  cell.innerText = board[i][j] === 0 ? "" : board[i][j];

  if (board[i][j] === "M") {
    cell.classList.add("mine");
    defineCellProps(cell);
    isFinishGame(gameMode, true, false);
    return;
  }
  revealedSafeCells++;

  if (board[i][j] === 0) {
    showCloseCells(i, j, board);
  }
  isFinishGame(gameMode, false, isVictory());
}

const showAllCells = (board) => {
  const size = board.length;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.querySelector(
        `.cell[data-row='${i}'][data-col='${j}']`
      );

      if (cell && !cell.classList.contains("revealed")) {
        cell.classList.add("revealed");

        if (board[i][j] === "M") {
          cell.classList.add("mine");
        } else if (board[i][j] === 0) {
          cell.innerText = "";
        } else {
          cell.innerText = board[i][j];
        }
      }
      if (cell.classList.contains("flagged")) {
        cell.classList.toggle("flagged");
      }
      defineCellProps(cell);
    }
  }
};

function showCloseCells(i, j, board) {
  const size = board.length;

  showCell(i, j, board);

  if (board[i][j] === 0) {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        let newX = i + dx;
        let newY = j + dy;

        if (
          isInBoardSize(newX, newY, size) &&
          board[newX][newY] !== "M" &&
          !document
            .querySelector(`.cell[data-row='${newX}'][data-col='${newY}']`)
            .classList.contains("revealed")
        ) {
          showCloseCells(newX, newY, board);
        }
      }
    }
  }
}

const isVictory = () => revealedSafeCells === totalSafeCells;

const setGameInicialInfos = () => {
  document.getElementById("game-mode").innerText = `Modo: ${cleanString(
    gameMode
  )}`;
  document.getElementById(
    "number-mines"
  ).innerText = `Número de bombas: ${numMines}`;
  document.getElementById("dimension").innerText = `Dimensão: ${dimension}`;
};

const redefineCellAfterSpy = (board) => {
  const size = board.length;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.querySelector(
        `.cell[data-row='${i}'][data-col='${j}']`
      );

      if (
        cell &&
        !cell.classList.contains("revealed") &&
        cell.classList.contains("spy")
      ) {
        cell.style.pointerEvents = "auto";
        cell.innerText = "";
        if (cell.classList.contains("flagged")) {
          cell.innerText = "🚩";
          cell.style.backgroundColor = "white";
        } else {
          cell.style.backgroundColor = "blue";
        }

        cell.classList.remove("spy");
      }
    }
  }
};

const showCellInSpy = (board) => {
  const size = board.length;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.querySelector(
        `.cell[data-row='${i}'][data-col='${j}']`
      );

      if (cell && !cell.classList.contains("revealed")) {
        cell.classList.add("spy");
        cell.style.pointerEvents = "none";

        if (board[i][j] === "M") {
          cell.innerText = "💣";
          cell.style.backgroundColor = "red";
        } else if (board[i][j] === 0) {
          cell.innerText = "";
          cell.style.backgroundColor = "white";
        } else {
          cell.innerText = board[i][j];
          cell.style.color = "black";
          cell.style.backgroundColor = "white";
        }
      }
    }
  }
};

const spyAction = (board, spyButton) => {
  spyButton.style.pointerEvents = "none";
  showCellInSpy(board);

  setTimeout(() => {
    spyButton.style.pointerEvents = "auto";
    redefineCellAfterSpy(board);
  }, 2000);
  console.log("chamando spy Action");
};

const setSpyButtonClick = (board) => {
  const spyButton = document.querySelector(".spy-button");
  spyButton.addEventListener("click", () => spyAction(board, spyButton));
};

// nas configurações, vamos deixar no máximo um tabuleiro 20x20, 200 bombas
const dimension = Number(localStorage.getItem("dimension"));
const numMines = Number(localStorage.getItem("numberBombs"));
const gameMode = cleanString(localStorage.getItem("mode"));
const user = localStorage.getItem("user");
const totalSafeCells = dimension * dimension - numMines;
let isFirstClick = true;
let revealedSafeCells = 0;
let boardGame;

document.addEventListener("DOMContentLoaded", () => {
  renderBoard(dimension, numMines);
  setGameInicialInfos();

  console.log({ dimension });
  console.log({ numMines });
  console.log({ gameMode });
  // console.log({ user });
});
