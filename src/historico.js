const gameMode = {
  RIVOTRIL: "RIVOTRIL",
  NORMAL: "NORMAL",
  RANKING: "RANQUEADA",
};

const matchStatus = {
  VICTORY: "VITORIA",
  DEFEAT: "DERROTA",
};

let mockHistory = [];

function fetchAll() {
  let request = new XMLHttpRequest();
  const loggedUser = localStorage.getItem("username");
  let comando = `SELECT * 
                   FROM partida
                  WHERE jogador_username = '${loggedUser}';`;

  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      let convertedResponse = JSON.parse(request.responseText);
      convertedResponse.forEach((history) => {
        mockHistory.push({
          playerName: history.jogador_username,
          fieldSize: history.tamTabuleiro,
          gameMode: history.modalidade,
          matchTime: history.tempoPartida,
          matchStatus: history.resultado,
          matchDate: formatDate(history.dataPartida),
          bombNumber: history.numBombas,
        });
      });

      initialState();
    }
  };
  request.open(
    "GET",
    "http://localhost/minefield/src/php/consultar.php?comando=" +
      encodeURIComponent(comando),
    true
  );
  request.send();
}

function initialState() {
  mockHistory.forEach((match) => {
    createGameItem(
      match.matchStatus,
      formatTime(match.matchTime),
      match.matchDate,
      match.playerName,
      match.fieldSize,
      match.bombNumber,
      match.gameMode
    );
  });
}

function getStatusFilter() {
  const gameModes = [];

  var checkboxNormal = document.getElementById("normal");
  var checkboxRivotril = document.getElementById("rivotril");
  var checkboxRanked = document.getElementById("ranked");

  if (checkboxNormal.checked) gameModes.push(gameMode.NORMAL);

  if (checkboxRivotril.checked) gameModes.push(gameMode.RIVOTRIL);

  if (checkboxRanked.checked) gameModes.push(gameMode.RANKING);

  return gameModes;
}

function filterHistory(/*gameMode*/) {
  const gameModes = getStatusFilter();

  if (gameModes.length === 0) {
    removeAll("history-game-list");
    return;
  }

  removeAll("history-game-list");

  const filteredHistory = mockHistory.filter((match) =>
    gameModes.includes(match.gameMode)
  );
  filteredHistory.forEach((match) => {
    createGameItem(
      match.matchStatus,
      formatTime(match.matchTime),
      match.matchDate,
      match.playerName,
      match.fieldSize,
      match.bombNumber,
      match.gameMode
    );
  });
}

function removeAll(id) {
  const div = document.getElementById(id);
  div.replaceChildren();
}

function formatDate(dateString) {
  const year = dateString.split("-")[0];
  const month = dateString.split("-")[1];
  const day = dateString.split("-")[2];

  return `${day}/${month}/${year}`;
}

function formatTime(segundos) {
  const minutos = Math.floor(segundos / 60);
  const segsRestantes = segundos % 60;

  return `${minutos}:${segsRestantes.toString().padStart(2, "0")}`;
}

function createGameItem(
  victoryStatus,
  time,
  date,
  playerName,
  fieldSize,
  bombNumber,
  gameMode
) {
  const gameItem = document.createElement("div");
  gameItem.classList.add("history-game-item");

  const iconTextVictory = document.createElement("div");

  if (victoryStatus === matchStatus.VICTORY) {
    iconTextVictory.classList.add("icon-text-title-victory");
  } else {
    iconTextVictory.classList.add("icon-text-title-defeat");
  }

  const icon = document.createElement("img");

  if (victoryStatus === matchStatus.VICTORY) {
    icon.src = "imagens/bandeira.png";
    icon.alt = "ícone bandeira";
    icon.classList.add("game-icon");
  } else {
    icon.src = "imagens/bomba.png";
    icon.alt = "ícone bomba";
    icon.classList.add("game-icon");
  }

  const victoryText = document.createElement("p");
  victoryText.classList.add("list-game-status");
  victoryText.textContent = victoryStatus;

  iconTextVictory.appendChild(icon);
  iconTextVictory.appendChild(victoryText);

  const iconTextTimer = document.createElement("div");
  iconTextTimer.classList.add("icon-text-game-item");

  const timerIcon = document.createElement("img");
  timerIcon.src = "imagens/timer-icon.png";
  timerIcon.alt = "ícone timer";
  timerIcon.classList.add("game-icon");

  const timerText = document.createElement("p");
  timerText.classList.add("list-game-status");
  timerText.textContent = time;

  iconTextTimer.appendChild(timerIcon);
  iconTextTimer.appendChild(timerText);

  const iconTextArrow = document.createElement("div");
  iconTextArrow.classList.add("icon-text-game-item");

  const arrowText = document.createElement("p");
  arrowText.classList.add("list-game-status");
  arrowText.textContent = date;

  iconTextArrow.appendChild(arrowText);

  const playerText = document.createElement("p");
  playerText.classList.add("list-game-status");
  playerText.textContent = `Jogador: ${playerName}`;

  const fieldSizeText = document.createElement("p");
  fieldSizeText.classList.add("list-game-status");
  fieldSizeText.textContent = `Tamanho do Campo: ${fieldSize}`;

  const bombNumberText = document.createElement("p");
  bombNumberText.classList.add("list-game-status");
  bombNumberText.textContent = `Número de Bombas: ${bombNumber}`;

  const gameModeText = document.createElement("p");
  gameModeText.classList.add("list-game-status");
  gameModeText.textContent = `Modalidade: ${gameMode}`;

  gameItem.appendChild(iconTextVictory);
  gameItem.appendChild(iconTextTimer);
  gameItem.appendChild(iconTextArrow);
  gameItem.appendChild(playerText);
  gameItem.appendChild(fieldSizeText);
  gameItem.appendChild(bombNumberText);
  gameItem.appendChild(gameModeText);

  const gameList = document.querySelector(".history-game-list");
  gameList.appendChild(gameItem);
}

var checkboxNormal = document.getElementById("normal");
var checkboxRivotril = document.getElementById("rivotril");
var checkboxRanked = document.getElementById("ranked");

checkboxNormal.addEventListener("change", function () {
  if (checkboxNormal.checked) {
    filterHistory();
  } else {
    filterHistory();
  }
});

checkboxRivotril.addEventListener("change", function () {
  if (checkboxRivotril.checked) {
    filterHistory();
  } else {
    filterHistory();
  }
});

checkboxRanked.addEventListener("change", function () {
  if (checkboxRanked.checked) {
    filterHistory();
  } else {
    filterHistory();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetchAll();
});
