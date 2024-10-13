import "./style.css";
import { loadGridIndex, loadGridCells } from "./load";
import { Player, Cordinate } from "./board";

const player1Name = "human";
const player2Name = "bot";

let player1 = new Player(player1Name);
let player2 = new Player(player2Name);

let playTurn = "player1";

const controller = (function () {
  function getRandomInRange(range) {
    return Math.floor(Math.random() * range);
  }

  function botEngine() {
    const board = player1.board.board;

    let move = [];
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        if (board[i][j] === " ") {
          move.push({ x: i, y: j });
        }
      }
    }

    let { x, y } = move[getRandomInRange(move.length - 1)];
    player1.board.check(x, y);
  }

  function evaluateWinner() {
    if (player1.isWin(player2.board)) {
      player1.board.toString();
      console.log("player1 won!");
      playTurn = "over";
    } else if (player2.isWin(player1.board)) {
      console.log("player2 won!");
      playTurn = "over";
    }
  }

  function cellHandler(playerNum, x, y) {
    return function () {
      if (playTurn === "over") {
        return;
      }

      if (playerNum === 1) {
        if (playTurn !== "player2") {
          console.log("ERROR: PLAYER NOT 2'S BUT CELL 1 WAS CALLED!");
          return;
        }

        // player1.board.check(x, y)
        // console.log("player2 attacked player1!")
        // player1.board.toString()
      } else {
        if (playTurn !== "player1") {
          console.log("ERROR: PLAYER NOT 1'S BUT CELL 2 WAS CALLED!");
          return;
        }

        if (player2.board.check(x, y)) {
          console.log("player1 attacked player2!");
          player2.board.toString();

          console.log("player2 attacked player1!");
          botEngine();
          player1.board.toString();
        }
      }

      // playTurn === "player1" ? (playTurn = "player2") : (playTurn = "player1");
      evaluateWinner();
    };
  }

  function addEventForCell(playerNum) {
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        const cell = document.querySelector(`#c-${i}-${j}-${playerNum}`);
        cell.addEventListener("click", cellHandler(playerNum, i, j));
      }
    }
  }

  return { addEventForCell };
})();

function getRandomInRange(range) {
  return Math.floor(Math.random() * range);
}

const cord = [
  new Cordinate(1, 1, 1, 3),
  new Cordinate(1, 6, 1, 7),
  new Cordinate(3, 9, 3, 9),
  new Cordinate(4, 3, 4, 6),
  new Cordinate(6, 2, 6, 2),
  new Cordinate(6, 7, 6, 7),
  new Cordinate(5, 10, 6, 10),
  new Cordinate(8, 1, 8, 2),
  new Cordinate(8, 7, 8, 9),
  new Cordinate(10, 10, 10, 10),
];

for (const c of cord) {
  const { x1, y1, x2, y2 } = c;
  player1.board.addShip(x1, y1, x2, y2);
  player2.board.addShip(x1, y1, x2, y2);
}

loadGridIndex(1);
loadGridIndex(2);
loadGridCells(1);
loadGridCells(2);

controller.addEventForCell(1);
controller.addEventForCell(2);
