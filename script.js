  const board = document.getElementById('board');
const popup = document.getElementById('popup');
const message = document.getElementById('message');
const newGameButton = document.getElementById('newGameButton');
const restartButton = document.getElementById('restartButton');
const playBotButton = document.getElementById('playBotButton');
const playFriendButton = document.getElementById('playFriendButton');
let cells;
let currentPlayer = 'X';
let gameActive = true;
let playAgainstBot = true; // Default to play against bot

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
    cells = document.querySelectorAll('.cell');
    popup.style.display = 'none';
    gameActive = true;
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (cell.textContent !== '' || !gameActive) {
        return;
    }

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer); // Add class for styling

    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (playAgainstBot && currentPlayer === 'O' && gameActive) {
        setTimeout(botMove, 500); // Bot makes a move after a short delay
    }
}

function botMove() {
    const bestMove = getBestMove();
    const cell = cells[bestMove];
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer); // Add class for styling

    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function getBestMove() {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            cells[i].textContent = currentPlayer;
            let score = minimax(cells, 0, false);
            cells[i].textContent = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

const scores = {
    X: -1,
    O: 1,
    tie: 0
};

function minimax(newBoard, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i].textContent === '') {
                newBoard[i].textContent = 'O';
                let score = minimax(newBoard, depth + 1, false);
                newBoard[i].textContent = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i].textContent === '') {
                newBoard[i].textContent = 'X';
                let score = minimax(newBoard, depth + 1, true);
                newBoard[i].textContent = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner() {
    let winner = null;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
            winner = cells[a].textContent;
        }
    }

    const openSpots = [...cells].filter(cell => cell.textContent === '').length;
    if (winner === null && openSpots === 0) {
        return 'tie';
    } else {
        return winner;
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showMessage(`Player ${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    const roundDraw = [...cells].every(cell => cell.textContent !== '');
    if (roundDraw) {
        showMessage('Draw!');
        gameActive = false;
        return;
    }
}

function showMessage(msg) {
    message.textContent = msg;
    popup.style.display = 'flex';
}

newGameButton.addEventListener('click', () => {
    currentPlayer = 'X';
    playAgainstBot = true;
    createBoard();
});

restartButton.addEventListener('click', () => {
    currentPlayer = 'X';
    playAgainstBot = true;
    createBoard();
});

playBotButton.addEventListener('click', () => {
    currentPlayer = 'X';
    playAgainstBot = true;
    createBoard();
});

playFriendButton.addEventListener('click', () => {
    currentPlayer = 'X';
    playAgainstBot = false;
    createBoard();
});

createBoard();
