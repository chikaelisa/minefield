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
};

export const setSpyButtonClick = (board) => {
  const spyButton = document.querySelector(".spy-button");
  spyButton.addEventListener("click", () => spyAction(board, spyButton));
};
