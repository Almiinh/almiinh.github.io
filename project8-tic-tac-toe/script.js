// Player Factory Function
const Player = (name, marker) => {
    return { name, marker };
};

// Gameboard Module
const Gameboard = (() => {
    let board = Array(9).fill('');
    
    const getBoard = () => board;
    
    const makeMove = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        }
        return false;
    };
    
    const reset = () => {
        board = Array(9).fill('');
    };
    
    return { getBoard, makeMove, reset };
})();

// Game Controller Module
const GameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;
    
    const initialize = (player1Name, player2Name) => {
        players = [
            Player(player1Name, 'X'),
            Player(player2Name, 'O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.reset();
    };
    
    const getCurrentPlayer = () => players[currentPlayerIndex];
    
    const switchPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };
    
    const checkWin = (board) => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        return winningCombos.some(combo => {
            return combo.every(index => {
                return board[index] === getCurrentPlayer().marker;
            });
        });
    };
    
    const checkTie = (board) => {
        return board.every(cell => cell !== '');
    };
    
    const playTurn = (index) => {
        if (gameOver || !Gameboard.makeMove(index, getCurrentPlayer().marker)) {
            return false;
        }
        
        const board = Gameboard.getBoard();
        
        if (checkWin(board)) {
            gameOver = true;
            return 'win';
        }
        
        if (checkTie(board)) {
            gameOver = true;
            return 'tie';
        }
        
        switchPlayer();
        return 'next';
    };
    
    const isGameOver = () => gameOver;
    
    return { initialize, getCurrentPlayer, playTurn, isGameOver };
})();

// Display Controller Module
const DisplayController = (() => {
    const playerSetupDiv = document.getElementById('player-setup');
    const gameBoardDiv = document.getElementById('game-board');
    const statusDiv = document.getElementById('status');
    const cells = document.querySelectorAll('.cell');
    
    const startGameBtn = document.getElementById('start-game');
    const restartBtn = document.getElementById('restart');
    
    const updateBoard = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };
    
    const showMessage = (message) => {
        statusDiv.textContent = message;
    };
    
    const initializeDisplay = () => {
        playerSetupDiv.classList.add('active');
        playerSetupDiv.classList.remove('hidden');
        gameBoardDiv.classList.add('hidden');
        gameBoardDiv.classList.remove('active');
    };
    
    const startGame = () => {
        const player1Name = document.getElementById('player1').value || 'Player 1';
        const player2Name = document.getElementById('player2').value || 'Player 2';
        
        GameController.initialize(player1Name, player2Name);
        
        playerSetupDiv.classList.remove('active');
        playerSetupDiv.classList.add('hidden');
        gameBoardDiv.classList.remove('hidden');
        gameBoardDiv.classList.add('active');
        
        updateBoard();
        showMessage(`${GameController.getCurrentPlayer().name}'s turn (${GameController.getCurrentPlayer().marker})`);
    };
    
    // Event Listeners
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const index = cell.getAttribute('data-index');
            const result = GameController.playTurn(index);
            
            if (result === 'win') {
                updateBoard();
                showMessage(`${GameController.getCurrentPlayer().name} wins!`);
            } else if (result === 'tie') {
                updateBoard();
                showMessage("It's a tie!");
            } else if (result === 'next') {
                updateBoard();
                showMessage(`${GameController.getCurrentPlayer().name}'s turn (${GameController.getCurrentPlayer().marker})`);
            }
        });
    });
    
    startGameBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
    
    return { initializeDisplay };
})();

// Initialize the game
DisplayController.initializeDisplay();


