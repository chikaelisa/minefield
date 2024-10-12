function createBoard(size, numMines) {
  let board = Array(size)
    .fill()
    .map(() => Array(size).fill(0));

  const isInBoardSize = (x, y) => x >= 0 && x < size && y >= 0 && y < size;

  let leftMines = numMines;
  while (leftMines > 0) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);

    if (board[x][y] !== "M") {
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
          if (isInBoardSize(newX, newY) && board[newX][newY] === "M") {
            closeMines++;
          }
        }
      }

      board[i][j] = closeMines;
    }
  }

  return board;
}

function renderBoard(board) {
  const boardDiv = document.querySelector(".board");
  const L = board.length;

  boardDiv.style.gridTemplateColumns = `repeat(${L}, 50px)`;
  boardDiv.innerHTML = "";

  for (let i = 0; i < L; i++) {
    for (let j = 0; j < L; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;

      cell.addEventListener("click", () => {
        showCell(i, j, board);
      });

      boardDiv.appendChild(cell);
    }
  }
}

function showCell(i, j, board) {
  const cell = document.querySelector(
    `.cell[data-row='${i}'][data-col='${j}']`
  );

  if (!cell || cell.classList.contains("revealed")) return;

  cell.classList.add("revealed");
  cell.style.backgroundColor = "lightgray";
  cell.style.color = "black";
  cell.innerText = board[i][j] === 0 ? "" : board[i][j];

  if (board[i][j] === "M") {
    cell.classList.add("mine");
    cell.innerText = "M";
    cell.style.backgroundColor = "red";
    cell.style.border = "1px solid #000";
    cell.style.alignItems = "center";
    showAllCells(board);
  } else if (board[i][j] === 0) {
    showCloseCells(i, j, board);
  }
}

function showAllCells(tabuleiro) {
  const L = tabuleiro.length;

  for (let i = 0; i < L; i++) {
    for (let j = 0; j < L; j++) {
      const cell = document.querySelector(
        `.cell[data-row='${i}'][data-col='${j}']`
      );

      if (cell && !cell.classList.contains("revealed")) {
        cell.classList.add("revealed");
        cell.classList.remove("cell");
        cell.style.backgroundColor = "lightgray";
        cell.style.color = "black";

        if (tabuleiro[i][j] === "M") {
          cell.classList.add("mine");
          cell.innerText = "M";
          cell.style.backgroundColor = "red";
          cell.style.border = "1px solid #000";
          cell.style.alignItems = "center";
        } else if (tabuleiro[i][j] === 0) {
          cell.innerText = "";
        } else {
          cell.innerText = tabuleiro[i][j];
        }
      }
    }
  }
}

function showCloseCells(i, j, tabuleiro) {
  const isInBoardSize = (x, y) =>
    x >= 0 && x < tabuleiro.length && y >= 0 && y < tabuleiro[x].length;

  showCell(i, j, tabuleiro);

  if (tabuleiro[i][j] === 0) {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        let newX = i + dx;
        let newY = j + dy;

        if (
          isInBoardSize(newX, newY) &&
          tabuleiro[newX][newY] !== "M" &&
          !document
            .querySelector(`.cell[data-row='${newX}'][data-col='${newY}']`)
            .classList.contains("revealed")
        ) {
          showCloseCells(newX, newY, tabuleiro);
        }
      }
    }
  }
}

// nas configurações, vamos deixar no máximo um tabuleiro 20x20, 200 bombas
// Testando a função
const L = 10; // Tamanho do tabuleiro LxL
const numMinas = 10; // Número de minas no tabuleiro

document.addEventListener("DOMContentLoaded", () => {
  let tabuleiro = createBoard(L, numMinas);
  renderBoard(tabuleiro);
});
