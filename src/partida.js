const isInBoardSize = (x, y, size) => x >= 0 && x < size && y >= 0 && y < size;

const createBoard = (size, numMines, firstX, firstY) => {
  let board = Array(size)
    .fill()
    .map(() => Array(size).fill(0));

  let leftMines = numMines;

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

  boardDiv.style.gridTemplateColumns = `repeat(${L}, 50px)`;
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
          board = createBoard(size, numMines, i, j);
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
    defineCellProps(cell);
    showAllCells(board);
  } else if (board[i][j] === 0) {
    showCloseCells(i, j, board);
  }
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

// nas configurações, vamos deixar no máximo um tabuleiro 20x20, 200 bombas
// Testando a função
const L = 20; // Tamanho do tabuleiro LxL
const numMinas = 80; // Número de minas no tabuleiro
let isFirstClick = true;

document.addEventListener("DOMContentLoaded", () => {
  renderBoard(L, numMinas);
});
