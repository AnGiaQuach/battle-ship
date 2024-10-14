import { Cordinate } from "./board.js";

const board_size = 10;

function getRandom(range) {
  return Math.floor(Math.random() * range);
}

function getPermute(orderList, valueList, permutation) {
  let chooseIndex = getRandom(orderList.length - 1);
  permutation.push(valueList[chooseIndex]);

  orderList.splice(chooseIndex, 1);
  valueList.splice(chooseIndex, 1);

  if (orderList.length > 0) {
    getPermute(orderList, valueList, permutation);
  }
}

function array2d(xLength, yLength, val) {
  let result = [[]];

  for (let i = 1; i <= xLength; i++) {
    let row = [val];
    for (let j = 1; j <= yLength; j++) {
      row.push(val);
    }
    result.push(row);
  }

  return result;
}

function isValidCordinate(x1, y1, x2, y2) {
  if (
    x1 > board_size ||
    x1 < 1 ||
    x2 > board_size ||
    x2 < 1 ||
    y1 > board_size ||
    y1 < 1 ||
    y2 > board_size ||
    y2 < 1
  ) {
    return false;
  }
  return true;
}

function isValidPlace(x1, y1, x2, y2, board) {
  if (isValidCordinate(x1, y1, x2, y2) === false) {
    return false;
  }

  if (x1 == x2 && y1 == y2) {
    return board[x1][y1] === " ";
  } else {
    if (x1 < x2) {
      for (let i = x1; i <= x2; i++) {
        if (board[i][y1] !== " ") {
          return false;
        }
      }
    } else {
      for (let i = y1; i <= y2; i++) {
        if (board[x1][i] !== " ") {
          return false;
        }
      }
    }
    return true;
  }
}

function getPossibleCordinate(shipLength, board) {
  let cordinateList = [];
  for (let i = 1; i <= board_size; i++) {
    for (let j = 1; j <= board_size; j++) {
      let x1 = i,
        y1 = j;
      if (isValidPlace(x1, y1, x1 + shipLength - 1, y1, board)) {
        cordinateList.push(new Cordinate(x1, y1, x1 + shipLength - 1, y1));
      }
      if (isValidCordinate(x1, y1, x1, y1 + shipLength - 1, board)) {
        cordinateList.push(new Cordinate(x1, y1, x1, y1 + shipLength - 1));
      }
    }
  }

  return cordinateList;
}

function randomizeShipCordinate(shipSizeList) {
  let orderList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let valueList = shipSizeList;
  let permutation = [];

  getPermute(orderList, valueList, permutation);
  let board = array2d(board_size, board_size, " ");

  let index = 0;
  let result = [];
  while (index < permutation.length) {
    let cordinateList = getPossibleCordinate(permutation[index], board);
    let randomCordinate = cordinateList[getRandom(cordinateList.length - 1)];
    result.push(randomCordinate);
    index++;
  }

  //console.log(result);
  return result;
}

export { randomizeShipCordinate };
