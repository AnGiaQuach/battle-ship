import { Player } from "./board.js";
function createEl(type) {
  return document.createElement(type);
}

function addClass(target, className) {
  return target.classList.add(className);
}

export { createEl, addClass };
