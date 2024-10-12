// Função para criar o tabuleiro de Campo Minado
function createBoard(size, numMines) {
  // Criar a matriz vazia
  let board = Array(size)
    .fill()
    .map(() => Array(size).fill(0));

  // Função para verificar se a célula está dentro dos limites
  const isInBoardSize = (x, y) => x >= 0 && x < size && y >= 0 && y < size;

  // Adicionar as minas aleatoriamente no tabuleiro
  let leftMines = numMines;
  while (leftMines > 0) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);

    if (board[x][y] !== "M") {
      // "M" representa uma mina
      board[x][y] = "M";
      leftMines--;
    }
  }

  // Gerar pistas (números de minas ao redor de cada célula)
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === "M") continue;

      let closeMines = 0;

      // Verificar as 8 células ao redor
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue; // Pular a célula atual
          let newX = i + dx;
          let newY = j + dy;
          if (isInBoardSize(newX, newY) && board[newX][newY] === "M") {
            closeMines++;
          }
        }
      }
      // Atribuir o número de minas adjacentes
      board[i][j] = closeMines;
    }
  }

  return board;
}

function renderBoard(board) {
  const boardDiv = document.querySelector(".board");
  const L = board.length;

  boardDiv.style.gridTemplateColumns = `repeat(${L}, 50px)`;
  boardDiv.innerHTML = ""; // Limpar o tabuleiro

  for (let i = 0; i < L; i++) {
    for (let j = 0; j < L; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i; // Armazena a linha e coluna
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

  if (cell.classList.contains("revealed")) return; // Se já foi revelada, não faz nada

  cell.classList.add("revealed");
  cell.classList.remove("cell");
  cell.style.backgroundColor = "lightgray";
  cell.style.color = "black";
  cell.innerText = board[i][j] === 0 ? "" : board[i][j];

  if (board[i][j] === "M") {
    cell.classList.add("mine");
    cell.innerText = "M";
    cell.style.backgroundColor = "red";
    showAllCells(board); // Se for mina, revela todas as células
  } else if (board[i][j] === 0) {
    showCloseCells(i, j, board); // Se for 0, revelar células adjacentes
  }
}

function showAllCells(tabuleiro) {
  const L = tabuleiro.length;

  for (let i = 0; i < L; i++) {
    for (let j = 0; j < L; j++) {
      const cell = document.querySelector(
        `.cell[data-row='${i}'][data-col='${j}']`
      );

      // Certificar que a célula existe e não foi revelada
      if (cell && !cell.classList.contains("revealed")) {
        cell.classList.add("revealed");
        cell.classList.remove("cell");
        cell.style.backgroundColor = "lightgray";
        cell.style.color = "black";

        // Se for mina, marca como mina
        if (tabuleiro[i][j] === "M") {
          cell.classList.add("mine");
          cell.innerText = "M";
          cell.style.backgroundColor = "red";
        } else if (tabuleiro[i][j] === 0) {
          // Se o valor for 0, deixar a célula vazia (sem texto)
          cell.innerText = "";
        } else {
          // Caso contrário, mostrar o número de minas ao redor
          cell.innerText = tabuleiro[i][j];
        }
      }
    }
  }
}

function showCloseCells(i, j, tabuleiro) {
  const isInBoardSize = (x, y) =>
    x >= 0 && x < tabuleiro.length && y >= 0 && y < tabuleiro[x].length;

  // Verifica se a célula atual é uma mina
  if (
    tabuleiro[i][j] === "M" ||
    document
      .querySelector(`.cell[data-row='${i}'][data-col='${j}']`)
      .classList.contains("revealed")
  ) {
    return; // Não faz nada se for mina ou já revelada
  }

  // Revela a célula atual
  showCell(i, j, tabuleiro);

  // Se a célula revelada é vazia (valor 0), revela as adjacentes
  if (tabuleiro[i][j] === 0) {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        let newX = i + dx;
        let newY = j + dy;

        if (
          isInBoardSize(newX, newY) &&
          tabuleiro[newX][newY] !== "M" && // Verifica se não é mina
          !document
            .querySelector(`.cell[data-row='${newX}'][data-col='${newY}']`)
            .classList.contains("revealed")
        ) {
          // Chama a função recursivamente para revelar as células adjacentes
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
