class Cordinate {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  length() {
    if (this.x1 < this.x2) {
      return this.x2 - this.x1 + 1;
    }
    if (this.y1 < this.y2) {
      return this.y2 - this.y1 + 1;
    }

    if (this.y1 === this.y2 && this.x1 === this.x2) {
      return 1;
    }
  }

  isInside(x, y) {
    if (x >= this.x1 && x <= this.x2 && y >= this.y1 && y <= this.y2) {
      return true;
    }
    return false;
  }
}

class Ship {
  hits = 0;

  constructor(cordinate) {
    this.length = cordinate.length();
    this.cordinate = cordinate;
  }

  hit() {
    this.hits++;
  }

  isSunked() {
    return this.hits >= this.length ? true : false;
  }
}

class GameBoard {
  array2d(row, column, val) {
    let array = [];

    for (let i = 0; i <= row; i++) {
      let rows = [];
      for (let j = 0; j <= column; j++) {
        rows.push(val);
      }
      array.push(rows);
    }
    return array;
  }
  board_size() {
    const size = 10;
    return size;
  }

  board = [];
  shipList = [];

  constructor() {
    this.board = this.array2d(this.board_size(), this.board_size(), " ");
  }

  addShip(x1, y1, x2, y2) {
    const newShip = new Ship(new Cordinate(x1, y1, x2, y2));
    this.shipList.push(newShip);
  }

  isValid(x, y) {
    return (
      (this.board[x][y] != " " ||
        x > this.board_size() ||
        x < 1 ||
        y > this.board_size() ||
        y < 1) === false
    );
  }

  check(x, y) {
    console.log(this.isValid(x, y));
    if (this.isValid(x, y) === false) {
      return false;
    }

    for (let i = 0; i < this.shipList.length; i++) {
      const ship = this.shipList[i];
      let cordinate = ship.cordinate;

      if (cordinate.isInside(x, y)) {
        ship.hit();
        this.board[x][y] = "X"; //hit
        return true;
      }
    }
    this.board[x][y] = "O"; //miss
    return true;
  }

  toString() {
    for (let i = 1; i <= this.board_size(); i++) {
      let s = "";
      for (let j = 1; j <= this.board_size(); j++) {
        if (this.board[i][j] !== " ") {
          s += `${this.board[i][j]} `;
        } else {
          s += ". ";
        }
      }
      console.log(s);
    }
  }
}

class Player {
  constructor(name) {
    this.board = new GameBoard();
    this.name = name;
  }

  isWin(enemyBoard) {
    let result = true;
    enemyBoard.shipList.forEach((ship) => {
      if (ship.isSunked() === false) {
        result = false;
      }
    });
    return result;
  }
  aliveShip() {
    let alive = 0;
    this.board.shipList.forEach((ship) => {
      ship.isSunked() === false ? alive++ : alive;
    });
    return alive;
  }
}

export { Player, Cordinate, Ship };
