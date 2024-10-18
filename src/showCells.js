"use stric";

import { isInBoardSize } from "./crateBoard.js";
import { isFinishGame } from "./finishGame.js";
import { defineCellProps } from "./helpers.js";
import { gameMode, totalSafeCells } from "./partida.js";

export const isVictory = () => revealedSafeCells === totalSafeCells;

let revealedSafeCells = 0;

export const showCell = (i, j, board) => {
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
};

export const showCloseCells = (i, j, board) => {
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
};

export const showAllCells = (board) => {
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
