"use-strict";

const mockUsers = [
  {
    userName: "enzito",
    time: 240,
    nickName: "Enzo",
  },
  {
    userName: "fernandinha",
    time: 245,
    nickName: "Fernanda",
  },
  {
    userName: "chikaelisa",
    time: 300,
    nickName: "Chika",
  },
  {
    userName: "ste",
    time: 200,
    nickName: "Stephani",
  },
  {
    userName: "pipi",
    time: 198,
    nickName: "Pietra",
  },
];

currentUser = "chikaelisa";

mockUsers.sort((a, b) => a.time - b.time);

function formatTime(segundos) {
  const minutos = Math.floor(segundos / 60);
  const segsRestantes = segundos % 60;

  return `${minutos}:${segsRestantes.toString().padStart(2, "0")}`;
}

function createRankingItem(name, tempo, index) {
  const rankingItem = document.createElement("div");
  if (name === currentUser) {
    rankingItem.className = "ranking-item-current-user";
  } else {
    rankingItem.className = "ranking-item";
  }

  const iconTrofeu = document.createElement("div");
  iconTrofeu.className = "icon-trofeu";

  const trofeuIcon = document.createElement("img");

  if (index < 3) {
    trofeuIcon.src = "imagens/trofeu-ouro.png";
  } else {
    trofeuIcon.src = "imagens/trofeu-prata.png";
  }
  trofeuIcon.alt = "ícone troféu";
  trofeuIcon.className = "game-icon";

  const userName = document.createElement("p");

  userName.className = "list-game-status";
  userName.textContent = name;

  iconTrofeu.appendChild(trofeuIcon);
  iconTrofeu.appendChild(userName);

  const iconTimeGameItem = document.createElement("div");
  iconTimeGameItem.className = "icon-time-game-item";

  const timerIcon = document.createElement("img");
  timerIcon.src = "imagens/timer-icon.png";
  timerIcon.alt = "ícone timer";
  timerIcon.className = "game-icon";

  const tempoText = document.createElement("p");
  tempoText.className = "list-game-status";
  tempoText.textContent = tempo;

  iconTimeGameItem.appendChild(timerIcon);
  iconTimeGameItem.appendChild(tempoText);

  rankingItem.appendChild(iconTrofeu);
  rankingItem.appendChild(iconTimeGameItem);

  return rankingItem;
}

function addRankingItems() {
  const container = document.querySelector(".container");

  mockUsers.forEach((item, index) => {
    const rankingItem = createRankingItem(
      item.userName,
      formatTime(item.time),
      index
    );
    container.appendChild(rankingItem);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  addRankingItems();
});