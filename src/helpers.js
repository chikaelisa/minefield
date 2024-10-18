"use strict";

export const cleanString = (text) => {
  return text.replace(/\s+/g, " ").trim();
};

export const defineCellProps = (cell) => {
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

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;

  return { minutes, displaySeconds };
};
