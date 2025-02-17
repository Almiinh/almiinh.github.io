import { Ship, Player } from "./factories.js";

// Constants
const carrier = new Ship(5);
const battleship = new Ship(4);
const destroyer = new Ship(3);
const submarine = new Ship(3);
const patrolBoat = new Ship(2);
const ships = [carrier, battleship, destroyer, submarine, patrolBoat];

const playerGrid = document.getElementById("player-grid")!;
const computerGrid = document.getElementById("computer-grid")!;

const startGameButton = document.getElementById("start-game")!;
const rotateShipsButton = document.getElementById("rotate-ships")!;

const titleH1 = document.querySelector("main h1")!;
const subtitleP = document.querySelector(".warning")! as HTMLElement;
const subtitle2P = document.querySelector(".result")! as HTMLElement;
const player = new Player();
const computer = new Player();

// Utility Functions
function removeAllGridListeners(grid: HTMLElement) {
    for (let cell of grid.children) {
        const cellElement = cell as HTMLElement;
        const newCursorCell = cellElement.cloneNode(true) as HTMLElement;
        cellElement.parentNode!.replaceChild(newCursorCell, cellElement);
    }
}

/** Get ship cells from cursor cell and call fn function */
function forEachShipCell(
    length: number,
    cursorCell: HTMLElement,
    isVertical: boolean,
    fn: (shipCell: HTMLElement) => void
) {
    for (let i = 0; i < length; i++) {
        const { x, y } = getBorderedXY(cursorCell, length, isVertical);
        const selector = isVertical
            ? `.cell[data-x="${x}"][data-y="${y + i}"]`
            : `.cell[data-x="${x + i}"][data-y="${y}"]`;
        try {
            const shipCell = document.querySelector(selector)! as HTMLElement;
            fn(shipCell);
        } catch (error) {
            console.error(error);
        }
    }
}

/** Get the XY position of the ship first cell, given the borders */
function getBorderedXY(cell: HTMLElement, length: number, isVertical: boolean) {
    const px = parseInt(cell.dataset.x!);
    const py = parseInt(cell.dataset.y!);
    const offset = 10 - length;
    const x = px > offset && !isVertical ? offset : px;
    const y = py > offset && isVertical ? offset : py;
    return { x, y };
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        // Use only the lower half of the color range (0-7) for darker colors
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Event Handlers
function handlePlaceShip(cursorCell: HTMLElement, ship: Ship, isVertical: boolean) {
    try {
        // Place ship
        const { x, y } = getBorderedXY(cursorCell, ship.length, isVertical);
        player.gameboard.placeShip(ship, [x, y], isVertical);
    } catch (error) {
        // Display Error
        subtitleP!.style.opacity = "1";
        throw error;
    }
}

// Main functions
function createGrid(grid: HTMLElement) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = j.toString();
            cell.dataset.y = i.toString();
            grid.appendChild(cell);
        }
    }
}

function placeShipRandomly(gameboard: any, ship: Ship) {
    let isPlaced = false;
    let attempts = 0;
    const maxAttempts = 100; // Limit the number of attempts to avoid infinite loops

    while (!isPlaced && attempts < maxAttempts) {
        attempts++;
        const isVertical = Math.random() < 0.5;
        let x, y;

        if (isVertical) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * (11 - ship.length));
        } else {
            x = Math.floor(Math.random() * (11 - ship.length));
            y = Math.floor(Math.random() * 10);
        }

        try {
            gameboard.placeShip(ship, [x, y], isVertical);
            isPlaced = true;
        } catch (error) {
            // If placement fails, try again
            console.log("Failed to place ship, trying again...");
        }
    }

    if (!isPlaced) {
        throw new Error("Could not place ship after multiple attempts.");
    }
}

function initComputerRandomly() {
    const computerShips = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];

    computerShips.forEach((ship) => {
        placeShipRandomly(computer.gameboard, ship);
    });
}

function placeShipPhase() {
    // State for all cells
    let ship: Ship | null = ships.shift()!;
    let isVertical = true;
    let color = getRandomColor();

    // Rotate ships button toggles the state isVertical
    rotateShipsButton.addEventListener("click", () => {
        isVertical = !isVertical;
    });

    // Display Player board
    document.getElementById("player-gameboard")!.hidden = false;
    startGameButton.hidden = true;
    rotateShipsButton.hidden = false;
    titleH1.textContent = "Place your ship";

    // Add Behavior
    for (let c of playerGrid.childNodes) {
        const cursorCell = c as HTMLElement;
        const originalColor = cursorCell.style.backgroundColor;
        cursorCell.dataset.color = originalColor;

        cursorCell.addEventListener("mouseover", () => {
            // Init display
            subtitleP!.style.opacity = "0";
            forEachShipCell(ship?.length ?? 0, cursorCell, isVertical, (cell) => {
                cell.style.backgroundColor = color;
            });
        });
        cursorCell.addEventListener("mouseout", () => {
            forEachShipCell(ship?.length ?? 0, cursorCell, isVertical, (cell) => {
                cell.style.backgroundColor = cell.dataset.color!;
            });
        });
        cursorCell.addEventListener("click", () => {
            if (ship === null) return;

            handlePlaceShip(cursorCell, ship!, isVertical);
            // Define Color
            forEachShipCell(ship?.length ?? 0, cursorCell, isVertical, (cell: HTMLElement) => {
                cell.dataset.color = color;
            });

            // New state for all cell
            const newShip = ships.shift();
            if (newShip == undefined) {
                ship = null;
                color = "";
                // Remove event listeners after game starts
                removeAllGridListeners(playerGrid);
                gameStartPhase();
            } else {
                ship = newShip!;
                color = getRandomColor();
            }
        });
    }
}
function playerTurn(cell: HTMLElement, x, y) {
    const hit = computer.gameboard.receiveAttack([x, y]);
    if (hit) {
        subtitleP.textContent = "You hit a ship!";
        subtitleP.style.backgroundColor = "#4caf50";
        cell.classList.add("hit");
        cell.textContent = "💥";
    } else {
        subtitleP.textContent = "You missed!";
        subtitleP.style.backgroundColor = "";
        cell.classList.add("miss");
    }
}
function computerTurn() {
    let x: number, y: number;
    do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    } while (
        document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`)!.classList.contains("hit") ||
        document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`)!.classList.contains("miss")
    );

    const cell = document.querySelector(`#player-grid .cell[data-x="${x}"][data-y="${y}"]`) as HTMLElement;
    const hit = player.gameboard.receiveAttack([x, y]);
    if (hit) {
        subtitle2P.textContent = "Computer hit your ship!";
        subtitle2P.style.backgroundColor = "crimson";
        cell.textContent = "💥";
    } else {
        subtitle2P.textContent = "Computer missed!";
        subtitle2P.style.backgroundColor = "";
        cell.classList.add("miss");
    }
}
function gameStartPhase() {
    // Display board
    document.getElementById("computer-gameboard")!.hidden = false;
    subtitleP.style.opacity = "1";
    subtitle2P.style.opacity = "1";
    subtitleP.textContent = "🚀 Attack your opponent!";
    titleH1.textContent = "🚢 Battle!";
    rotateShipsButton.hidden = true;

    initComputerRandomly();

    // Click Event
    for (let c of computerGrid.childNodes) {
        const cell = c as HTMLElement;
        cell.addEventListener("click", () => {
            const x = parseInt(cell.dataset.x!);
            const y = parseInt(cell.dataset.y!);
            playerTurn(cell, x, y);
            setTimeout(computerTurn, 200);

            // Check Game over
            if (computer.gameboard.areAllShipSunk()) {
                subtitleP.textContent = "You win!";
                subtitleP.style.backgroundColor = "#4caf50";
                subtitle2P.textContent = "";
                subtitle2P.style.backgroundColor = "";
                removeAllGridListeners(computerGrid);
                setTimeout(() => alert("You win!"), 500);
            } else if (player.gameboard.areAllShipSunk()) {
                subtitleP.textContent = "You lose";
                subtitleP.style.backgroundColor = "crimson";
                subtitle2P.textContent = " ";
                subtitle2P.style.backgroundColor = "";
                revealShipPosition(x, y, cell);
                setTimeout(() => alert("You lose!"), 500);
            }
        });
    }
}

// Initialization
createGrid(playerGrid);
createGrid(computerGrid);

// Start game button displays player ship board and ship placement
startGameButton.addEventListener("click", placeShipPhase);
function revealShipPosition(x: number, y: number, cell: HTMLElement) {
    const isHit = computer.gameboard.ships.some((ship) =>
        ship.positions.some((pos) => pos[0] === x && pos[1] === y)
    );

    if (isHit) {
        cell.classList.add("hit");
    }
}
