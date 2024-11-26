"use strict";

export const cleanString = (text) => {
  return text.replace(/\s+/g, " ").trim();
};

const insertImageOnCell = (cell, imagePath) => {
  cell.innerText = "";
  const alreadyHasImage = cell.querySelector("img");
  if (alreadyHasImage) {
    container.removeChild(alreadyHasImage);
  }
  const img = document.createElement("img");
  img.src = imagePath;
  img.alt = "mark";
  img.width = 35;
  img.width = 35;
  cell.appendChild(img);
};

export const defineCellProps = (cell) => {
  cell.style.color = "black";
  cell.style.border = "1px solid #000";
  cell.style.alignItems = "center";

  if (cell.classList.contains("revealed")) {
    cell.style.backgroundColor = "lightgray";
  }
  if (cell.classList.contains("mine")) {
    insertImageOnCell(cell, "imagens/mine.png");
    cell.style.backgroundColor = "red";
  }
  if (cell.classList.contains("flagged")) {
    insertImageOnCell(cell, "imagens/mineFlag.png");
    cell.style.backgroundColor = "white";
  }
};

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;

  return { minutes, displaySeconds };
};

export const getLoggedUser = () => {
  const loggedUser = '';
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status == 200) {
        loggedUser = request.responseText;

        if (!loggedUser)
          return '';

        return loggedUser;
      }
      else
        return '';
    } 
  };
  request.open('GET', 'http://localhost/minefield/src/php/obterUsuarioSessao.php', true);
  request.send();
};
