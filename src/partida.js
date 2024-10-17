"use-strict";

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

const defineCellProps = (cell) => {
  cell.style.color = "black";
  cell.style.border = "1px solid #000";
  cell.style.alignItems = "center";

  if (cell.classList.contains("revealed")) {
    cell.style.backgroundColor = "lightgray";
  }
  if (cell.classList.contains("mine")) {
    cell.innerText = "💣";
    cell.style.backgroundColor = "red";
  }
  if (cell.classList.contains("flagged")) {
    cell.innerText = "🚩";
    cell.style.backgroundColor = "white";
  }
};

const renderBoard = (size, numMines) => {
  const boardDiv = document.querySelector(".board");

  boardDiv.style.gridTemplateColumns = `repeat(${dimension}, 50px)`;
  boardDiv.innerHTML = "";

  let board;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;

      cell.addEventListener("click", async () => {
        if (isFirstClick) {
          console.log(i, j);
          board = createBoard(size, numMines, i, j);
          startTime();
          isFirstClick = false;
        }
        showCell(i, j, board);
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

  if (!cell || cell.classList.contains("revealed")) return;

  cell.classList.add("revealed");
  defineCellProps(cell);
  cell.innerText = board[i][j] === 0 ? "" : board[i][j];

  if (board[i][j] === "M") {
    cell.classList.add("mine");
    isDefeat = true;
    defineCellProps(cell);
    showAllCells(board);
    setTimeout(isFinishGame, 300);
    return;
  }
  revealedSafeCells++;

  if (board[i][j] === 0) {
    showCloseCells(i, j, board);
  }

  isFinishGame();
}

function showAllCells(board) {
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
}

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
let isDefeat = false;

const isFinishGame = () => {
  //TODO: precisa enviar pro banco: user, modo de jogo, num de bom, dimentão e tempo em segundos
  if (isVictory()) {
    alert(`Você venceu!!! O jogo durou ${seconds} segundos`);
    stopTimer();
  }
  if (isDefeat || (gameMode.includes("Rivotril") && Number(seconds) === 0)) {
    alert(`Você perdeu. O jogo durou ${seconds} segundos`);
    stopTimer();
  }
};

const startTimerNormalOrRanked = () => {
  seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    document.getElementById("timer").innerText = `Tempo: ${String(
      minutes
    ).padStart(2, "0")}:${String(displaySeconds).padStart(2, "0")}`;
  }, 1000);
};

const setTimeToRivotrilMode = () => {
  if (numMinas <= 10) {
    seconds = 10;
    return;
  }
  if (numMinas <= 30) {
    seconds = 180;
    return;
  }
  if (numMinas <= 50) {
    seconds = 240;
    return;
  }
  if (numMinas <= 80) {
    seconds = 280;
    return;
  }

  seconds = 300;
};

const startTime = () => {
  if (gameMode.includes("Rivotril")) {
    startTimerRivotril();
    return;
  }
  startTimerNormalOrRanked();
};

const startTimerRivotril = () => {
  setTimeToRivotrilMode();
  timerInterval = setInterval(() => {
    if (seconds === 0) {
      stopTimer();
      isFinishGame();
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

const stopTimer = () => {
  clearInterval(timerInterval);
};
const setGameInicialInfos = () => {
  document.getElementById("game-mode").innerText = `Modo: ${cleanString(
    gameMode
  )}`;
  document.getElementById(
    "number-mines"
  ).innerText = `Número de bombas: ${numMinas}`;
  document.getElementById("dimension").innerText = `Dimensão: ${dimension}`;
};

const cleanString = (text) => {
  return text.replace(/\s+/g, " ").trim();
};

// nas configurações, vamos deixar no máximo um tabuleiro 20x20, 200 bombas
// Testando a função
const dimension = Number(localStorage.getItem("dimension"));
const numMinas = Number(localStorage.getItem("numberBombs"));
const gameMode = localStorage.getItem("mode");
const user = localStorage.getItem("user");
const totalSafeCells = dimension * dimension - numMinas;
let isFirstClick = true;
let revealedSafeCells = 0;
let timerInterval;
let seconds;

document.addEventListener("DOMContentLoaded", () => {
  renderBoard(dimension, numMinas);
  setGameInicialInfos();

  console.log({ dimension });
  console.log({ numMinas });
  console.log({ gameMode });
  console.log({ user });
  console.log(gameMode.includes("Rivotril"));
});
