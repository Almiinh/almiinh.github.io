type Coord = [number, number];

function contains(list: any[], target: any) {
    return list.some((arr) => JSON.stringify(arr) === JSON.stringify(target));
}

export class Ship {
    positions: Coord[];
    length: number;
    hits: Coord[];
    sunk: boolean;
    constructor(length: number) {
        this.positions = [];
        this.length = length;
        this.hits = [];
        this.sunk = false;
    }

    hit(position: Coord) {
        console.log(position, this.positions, contains(this.positions, position));
        if (
            !contains(this.positions, position) ||
            position[0] < 0 ||
            position[1] < 0 ||
            position[0] >= 10 ||
            position[1] >= 10
        )
            return;

        this.hits.push(position);
        console.log(this.hits);
    }

    isSunk() {
        console.log(this.hits)
        return this.hits.length >= this.length;
    }
}

export class Gameboard {
    #border_x = 10;
    #border_y = 10;
    ships: Ship[];
    board: any[][];
    missedAttack: Coord[];

    constructor() {
        this.ships = [];
        this.board = Array.from({ length: this.#border_x }, () => Array(this.#border_y).fill(false));
        this.missedAttack = [];
    }
    #areCoordValid([x, y]: [number, number]) {
        return 0 <= x && x <= this.#border_x && 0 <= y && y <= this.#border_y;
    }
    #areNeighborsFree([x, y]: any, length: number, isVertical: boolean) {
        for (let pad_secondary = -1; pad_secondary <= 1; pad_secondary++) {
            for (let pad_primary = -1; pad_primary < length + 1; pad_primary++) {
                const col = isVertical ? x + pad_secondary : x + pad_primary;
                const row = isVertical ? y + pad_primary : y + pad_secondary;
                // Skip out-of-bounds checks
                if (row < 0 || row >= this.board.length || col < 0 || col >= this.board[0].length) {
                    continue;
                }

                // board[i][j] == true means cell occupied
                if (this.board[row][col]) {
                    console.log(row, col, this.board[row][col]);
                    return false;
                }
            }
        }
        return true;
    }
    placeShip(ship: Ship, [x, y]: [number, number], isVertical: boolean) {
        const dimension: Coord = isVertical ? [x, y + ship.length] : [x + ship.length, y];
        // Check if coord are valid
        if (!this.#areCoordValid([x, y]))
            throw new RangeError(`The xy coordinates are not valid: x=${x}, y=${y}`);
        if (!this.#areCoordValid(dimension))
            throw new RangeError(`The ship dimensions overflows the borders`);
        if (!this.#areNeighborsFree([x, y], ship.length, isVertical)) throw new Error("Neighbors not free!");

        // Add positions
        for (let pad = 0; pad < ship.length; pad++) {
            const position: Coord = isVertical ? [x, y + pad] : [x + pad, y];
            ship.positions.push(position);
            this.board[position[1]][position[0]] = true;
        }

        this.ships.push(ship);
    }
    receiveAttack([x, y]: Coord) {
        if (!this.#areCoordValid([x, y])) return false;
        if (!this.board[y][x]) {
            this.missedAttack.push([x, y]);
            return false;
        }

        for (let ship of this.ships) {
            ship.hit([x, y]);
        }
        return true;
    }
    areAllShipSunk() {
        return this.ships.every((ship) => ship.isSunk());
    }
}

export class Player {
    ships: Ship[];
    gameboard: Gameboard;
    constructor() {
        this.ships = [];
        this.gameboard = new Gameboard();
    }
}
