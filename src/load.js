import { createEl, addClass } from "./dom.js";

function loadGridIndex(playerNum) {
  const board = document.querySelector(`.board.player${playerNum}`);
  console.log(board, playerNum);

  for (let i = 2; i <= 11; i++) {
    const newDiv = createEl("div");
    newDiv.setAttribute(
      "style",
      `
           grid-row:1 / 2;
           grid-column: ${i} / ${i + 1};
           background-color: #e2dad6;
           text-align:center;
        `
    );

    newDiv.textContent = i - 1;
    board.appendChild(newDiv);
  }

  for (let i = 2; i <= 11; i++) {
    const newDiv = createEl("div");
    newDiv.setAttribute(
      "style",
      `
             grid-row:${i} / ${i + 1};
             grid-column: 1 / 2;
             background-color: #e2dad6;
             text-align:center;
          `
    );

    newDiv.textContent = i - 1;
    board.appendChild(newDiv);
  }
}

function makeGridCells(x, y, playerNum) {
  let cell = createEl("div");
  cell.setAttribute(
    "style",
    `
            grid-row: ${x} / ${x + 1};
            grid-column: ${y} / ${y + 1};
            background-color: #6482ad;
            text-align: center;  
     `
  );
  cell.setAttribute("id", `c-${x - 1}-${y - 1}-${playerNum}`);
  return cell;
}

function loadGridCells(playerNum) {
  const board = document.querySelector(`.board.player${playerNum}`);
  for (let i = 2; i <= 11; i++) {
    for (let j = 2; j <= 11; j++) {
      board.appendChild(makeGridCells(i, j, playerNum));
    }
  }
}

export { loadGridIndex, loadGridCells };
