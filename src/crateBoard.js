"use strict";

export const isInBoardSize = (x, y, size) =>
  x >= 0 && x < size && y >= 0 && y < size;

export const createBoard = (size, numMines, firstX, firstY) => {
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
