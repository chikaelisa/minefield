const gameMode = {
  RIVOTRIL: "rivotril",
  NORMAL: "normal",
  RANKING: "ranking"
};

const matchStatus = {
  VICTORY: "vitória",
  DEFEAT: "derrota"
};

const mockHistory = [
  {
    fieldSize: 30,
    gameMode: gameMode.NORMAL,
    matchTime: 240,
    matchStatus: matchStatus.VICTORY,
    matchDate: "Sat Sep 28 2024 11:01:05 GMT-0300 (Horário Padrão de Brasília)",
    bombNumber: 10
  },
  {
    fieldSize: 40,
    gameMode: gameMode.RIVOTRIL,
    matchTime: 500,
    matchStatus: matchStatus.DEFEAT,
    matchDate: "Sat Sep 10 2024 11:01:05 GMT-0300 (Horário Padrão de Brasília)",
    bombNumber: 20
  },
  {
    fieldSize: 40,
    gameMode: gameMode.RANKING,
    matchTime: 450,
    matchStatus: matchStatus.VICTORY,
    matchDate: "Sat Sep 12 2024 11:01:05 GMT-0300 (Horário Padrão de Brasília)",
    bombNumber: 20
  },
  {
    fieldSize: 60,
    gameMode: gameMode.RANKING,
    matchTime: 400,
    matchStatus: matchStatus.DEFEAT,
    matchDate: "Sat Sep 09 2024 11:01:05 GMT-0300 (Horário Padrão de Brasília)",
    bombNumber: 30
  }
];

function initialState() {
  mockHistory.forEach((match) => {
    createGameItem(match.matchStatus, formatTime(match.matchTime), match.matchDate);
  });
};

function filterHistory(gameMode) {
  const filteredHistory = mockHistory.filter((match) => match.gameMode === gameMode);
  filteredHistory.forEach((match) => {
    createGameItem(match.matchStatus, formatTime(match.matchTime), match.matchDate);
  });
}

function removeAll(id) {
  const div = document.getElementById(id);
  div.replaceChildren();
}

/*const normalMatches = filterHistory(gameMode.NORMAL);
const rivotrilMatches = filterHistory(gameMode.RIVOTRIL);
const rankingMatches = filterHistory(gameMode.RANKING);*/

function formatDate(dateString) {

  const date = new Date(dateString);


  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function formatTime(segundos) {
  const minutos = Math.floor(segundos / 60);
  const segsRestantes = segundos % 60;

  return `${minutos}:${segsRestantes.toString().padStart(2, "0")}`;
}

function createGameItem(victoryStatus, time, date) {

  const gameItem = document.createElement('div');
  gameItem.classList.add('history-game-item');

  const iconTextVictory = document.createElement('div');

  if (victoryStatus === matchStatus.VICTORY) {
    iconTextVictory.classList.add('icon-text-title-victory');
  }
  else {
    iconTextVictory.classList.add('icon-text-title-defeat');
  }

  const icon = document.createElement('img');

  if (victoryStatus === matchStatus.VICTORY) {
    icon.src = 'imagens/bandeira.png';
    icon.alt = 'ícone bandeira';
    icon.classList.add('game-icon');
  }
  else {
    icon.src = 'imagens/bomba.png';
    icon.alt = 'ícone bomba';
    icon.classList.add('game-icon');
  }

  const victoryText = document.createElement('p');
  victoryText.classList.add('list-game-status');
  victoryText.textContent = victoryStatus;

  iconTextVictory.appendChild(icon);
  iconTextVictory.appendChild(victoryText);

  const iconTextTimer = document.createElement('div');
  iconTextTimer.classList.add('icon-text-game-item');

  const timerIcon = document.createElement('img');
  timerIcon.src = 'imagens/timer-icon.png';
  timerIcon.alt = 'ícone timer';
  timerIcon.classList.add('game-icon');

  const timerText = document.createElement('p');
  timerText.classList.add('list-game-status');
  timerText.textContent = time;

  iconTextTimer.appendChild(timerIcon);
  iconTextTimer.appendChild(timerText);

  const iconTextArrow = document.createElement('div');
  iconTextArrow.classList.add('icon-text-game-item');

  const arrowText = document.createElement('p');
  arrowText.classList.add('list-game-status');
  arrowText.textContent = formatDate(date);

  const arrowIcon = document.createElement('img');
  arrowIcon.src = 'imagens/seta-baixo.png';
  arrowIcon.alt = 'ícone seta';
  arrowIcon.classList.add('seta');

  iconTextArrow.appendChild(arrowText);
  iconTextArrow.appendChild(arrowIcon);

  gameItem.appendChild(iconTextVictory);
  gameItem.appendChild(iconTextTimer);
  gameItem.appendChild(iconTextArrow);

  const gameList = document.querySelector('.history-game-list');
  gameList.appendChild(gameItem);
}

function listRankingMatches() {

  rankingMatches.forEach((match) => {
    createGameItem(match.matchStatus, formatTime(match.matchTime), match.matchDate);
  });

}

var checkboxNormal = document.getElementById("normal");
var checkboxRivotril = document.getElementById("rivotril");
var checkboxRanked = document.getElementById("ranked");

checkboxNormal.addEventListener("change", function() {  
  if (checkboxNormal.checked) {
    removeAll("history-game-list");
    filterHistory(gameMode.NORMAL);
  } else {
    removeAll("history-game-list");
    initialState();
  }
});

checkboxRivotril.addEventListener("change", function() {  
  if (checkboxRivotril.checked) {
    removeAll("history-game-list");
    filterHistory(gameMode.RIVOTRIL);
  } else {
    removeAll("history-game-list");
    initialState();
  }
});

checkboxRanked.addEventListener("change", function() {  
  if (checkboxRanked.checked) {
    removeAll("history-game-list");
    filterHistory(gameMode.RANKING);
  } else {
    removeAll("history-game-list");
    initialState();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initialState();
});