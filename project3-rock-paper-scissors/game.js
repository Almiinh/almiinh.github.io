let playerScore = 0;
let computerScore = 0;

// Function to get computer's choice
function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

// Function to play a single round
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    let result = "";
    if (playerSelection === computerSelection) {
        result = "It's a tie!";
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'scissors' && computerSelection === 'paper') ||
        (playerSelection === 'paper' && computerSelection === 'rock')
    ) {
        result = `You Win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}.`;
    } else {
        result = `You Lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}.`;
    }

    if (result.startsWith("You Win")) {
        playerScore++;
    } else if (result.startsWith("You Lose")) {
        computerScore++;
    }

    // Display Result
    const computerSelectionDiv = document.querySelector('.computerSelection');
    const scoreDiv = document.querySelector('.score');
    const resultDiv = document.querySelector('.result');
    computerSelectionDiv.textContent = `Computer played ${capitalize(computerSelection)}`;
    scoreDiv.textContent = `Score: ${playerScore} - ${computerScore}: `;
    resultDiv.textContent =  result;
    
    if (playerScore === 5 && computerScore < 5 || computerScore === 5 && playerScore < 5) {
        let scoreText = '';
        if (playerScore > computerScore) {
            scoreText = `You won the game! Score: ${playerScore} - ${computerScore}`;
        } else if (computerScore > playerScore) {
            scoreText = `You lost the game. Score: ${playerScore} - ${computerScore}`;
        } else {
            scoreText = `The game is a tie. Score: ${playerScore} - ${computerScore}`;
        }
        alert(scoreText);
    }
    return result
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Function to play a best-of-five game
function game() {
    
    alert("Rock paper scissors, first to 5 wins !")

    for (let i = 0; i < 5; i++) {
        const playerSelection = prompt("Choose Rock, Paper or Scissors:");
        const computerSelection = getComputerChoice();
        const result = playRound(playerSelection, computerSelection);
        alert(result);
    }

    if (playerScore > computerScore) {
        alert(`You won the game! Score: ${playerScore} - ${computerScore}`);
    } else if (computerScore > playerScore) {
        alert(`You lost the game. Score: ${playerScore} - ${computerScore}`);
    } else {
        alert(`The game is a tie. Score: ${playerScore} - ${computerScore}`);
    }
}

