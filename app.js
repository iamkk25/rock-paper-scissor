const startBtn = document.querySelector('#start-btn');
const showWinnerBox = document.querySelector('#winner__box');
const playerChoice = document.querySelector('.player__choice');
const computerChoice = document.querySelector('.computer__choice');
const playerScoreBoard = document.querySelector('.player__score');
const computerScoreBoard = document.querySelector('.computer__score');
const resetBtn = document.querySelector('#reset-btn');

const [rock, paper, scissor] = [`ROCK`, `PAPER`, `SCISSOR`];
const [draw, computerWins, playerWins] = [`draw`, `computer wins`, `player wins`];
let gameIsRunning = false;
const gameChoice = [rock, paper, scissor];
let playerScore = 0;
let computerScore = 0;

playerScoreBoard.textContent = playerScore;
computerScoreBoard.textContent = computerScore;

function randomChoice() {
    let randomValue = Math.round(Math.random() * 2);
    if (randomValue === 0) return rock;
    else if (randomValue === 1) return paper;
    else return scissor;
}

function createBackdrop() {
    const divForBackdrop = document.createElement('div');
    divForBackdrop.className = 'backdrop';
    return divForBackdrop;
}

function createDiv(innerElements, ...classNames) {
    const div = document.createElement('div');
    div.className = `${classNames.join(' ')}`;
    div.innerHTML = innerElements;
    return div;
}

function getPlayerChoice() {
    let defaultChoice = randomChoice();
<<<<<<< HEAD
    const enteredChoice = prompt(`${rock}, ${paper}, ${scissor}`, '');
    if(enteredChoice === null) {
        return;
    }
    let userChoice = enteredChoice.toUpperCase();
=======
    const userChoice  = prompt(`${rock}, ${paper}, ${scissor}`, '').toUpperCase();
>>>>>>> 3241bc946996a917ff1f760316a52390e4cde1e7
    if (!gameChoice.includes(userChoice)) {
        alert(`Invalid User Choice, we chose ${defaultChoice} for you!`);
        return defaultChoice;
    }
    console.log(userChoice)
    return userChoice;

}

function getComputerChoice() {
    let randomValue = Math.floor(Math.random() * 3);
    if (randomValue === 0) return rock;
    else if (randomValue === 1) return paper;
    else return scissor;
}

function getWinners() {
    // use this condition when you want to run the game only once.
    // When you use this condition you have to refresh the page every time you want to start the game
    if (gameIsRunning) return;

    // console.log(`Game is Starting Now...`);
    gameIsRunning = true;

    const userSelection = getPlayerChoice();
    playerChoice.textContent = userSelection;

    const computerSelection = getComputerChoice();
    computerChoice.textContent = computerSelection;
    if (userSelection === computerSelection) {
        showWinnerBox.textContent = `${draw}`;
    } else if (userSelection === rock && computerSelection === scissor || userSelection === paper && computerSelection === rock || userSelection === scissor && computerSelection === paper) {
        showWinnerBox.textContent = `${playerWins}`;
        playerScoreBoard.textContent = ++playerScore;
    } else {
        showWinnerBox.textContent = `${computerWins}`;
        computerScoreBoard.textContent = ++computerScore;
    }
    gameIsRunning = false;
}

function closeHandler(el1, el2) {
    document.body.removeChild(el1);
    document.body.removeChild(el2);
}

function finish() {
    const backdrop = createBackdrop();
    document.body.appendChild(backdrop);

    let playerResult = Number(playerScoreBoard.textContent);
    let computerResult = Number(computerScoreBoard.textContent);

    const elementForResultCard = `
        <p class="winner__text">${playerResult === computerResult ? 'Draw' : playerResult > computerResult ? "Player Won" : 'Computer Won'} the match with the score of <span class="bold">${playerResult > computerResult ? playerResult : computerResult}</span></p>
        <button class="close btn">Close</button>
    `;
    const divForResultCard = createDiv(elementForResultCard, 'card');
    document.body.appendChild(divForResultCard);

    const closeBtn = document.querySelector('.close');
    const backdropEl = document.querySelector('.backdrop');

    closeBtn.addEventListener('click', closeHandler.bind(null, backdrop, divForResultCard));
    backdropEl.addEventListener('click', closeHandler.bind(null, backdrop, divForResultCard));
}

function reset() {

    if (playerScoreBoard.textContent == 0 && computerScoreBoard.textContent == 0) return;

    finish()

    playerChoice.textContent = '';
    computerChoice.textContent = '';
    showWinnerBox.textContent = '';
    playerScoreBoard.textContent = '0';
    computerScoreBoard.textContent = '0';
    playerScore = 0;
    computerScore = 0;
}

startBtn.addEventListener('click', getWinners);
resetBtn.addEventListener('click', reset);
