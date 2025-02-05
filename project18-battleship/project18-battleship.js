class Ship {
    constructor(length, hits, sunk) {
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits >= this.length;
    }
}

class Gameboard {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.board = {};
    }
    receiveAttack({ x, y }) {
        this.board;
    }
    areAllShipSunk() {}
    displayAttacks() {}
}

class Player {
    constructor() {
        this.gameboard = new Gameboard();
    }
}
