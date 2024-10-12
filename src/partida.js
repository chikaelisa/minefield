// Função para criar o tabuleiro de Campo Minado
function criarTabuleiro(size, numMines) {
  // Criar a matriz vazia
  let board = Array(size)
    .fill()
    .map(() => Array(size).fill(0));

  // Função para verificar se a célula está dentro dos limites
  const estaDentro = (x, y) => x >= 0 && x < size && y >= 0 && y < size;

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
          if (estaDentro(newX, newY) && board[newX][newY] === "M") {
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

// Exibir o tabuleiro no console (para fins de teste)
// function renderBoard(tabuleiro) {
//   for (let i = 0; i < tabuleiro.length; i++) {
//     console.log(tabuleiro[i].join(" "));
//   }
// }

function renderBoard(board) {
  const boardDiv = document.querySelector(".board");
  const L = board.length;

  // Ajustar o grid-template-columns para o tamanho do tabuleiro
  boardDiv.style.gridTemplateColumns = `repeat(${L}, 50px)`;

  // Limpar a div do board
  boardDiv.innerHTML = "";

  for (let i = 0; i < L; i++) {
    for (let j = 0; j < L; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");

      if (board[i][j] === "M") {
        cell.classList.add("mine");
        cell.innerText = "M";
      } else {
        cell.innerText = board[i][j] === 0 ? "" : board[i][j];
      }

      boardDiv.appendChild(cell);
    }
  }
}

// nas configurações, vamos deixar no máximo um tabuleiro 20x20, 200 bombas
// Testando a função
const L = 20; // Tamanho do tabuleiro LxL
const numMinas = 200; // Número de minas no tabuleiro

document.addEventListener("DOMContentLoaded", () => {
  let tabuleiro = criarTabuleiro(L, numMinas);
  renderBoard(tabuleiro);
});
