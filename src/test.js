import { Player, Cordinate, Ship } from "./board.js";

const userPlayer = new Player();
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
  userPlayer.board.addShip(x1, y1, x2, y2);
}
// const testCordinate = new Cordinate(1, 6, 1, 7);
// if (testCordinate.length() === 2) {
//   console.log("Cordinate is passed", testCordinate.length());
// }

// const testShip = new Ship(testCordinate);
// testShip.hit();
// testShip.hit();

// if (testShip.length === 2) {
//   console.log("Ship is passed", testCordinate.length());
// }
// if (testShip.hits === 2) {
//   console.log("Ship is passed", testShip.hits);
// }

// if (testShip.isSunked() === true) {
//   console.log("Ship is passed", testShip.isSunked());
// }

userPlayer.board.check(2, 2);
userPlayer.board.check(1, 2);
userPlayer.board.check(1, 3);
userPlayer.board.check(1, 1);
userPlayer.board.check(6, 2);
userPlayer.board.check(1, 6);
userPlayer.board.check(1, 7);
userPlayer.board.check(6, 7);

userPlayer.board.toString();
console.log(userPlayer.aliveShip());
