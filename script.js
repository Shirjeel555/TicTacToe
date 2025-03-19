let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameMode = "two-player";
let gameActive = true;

function startGame(mode) {
    gameMode = mode;
    document.querySelector(".home-container").style.display = "none";
    document.querySelector(".game-container").style.display = "block";
}

function goHome() {
    resetGame();
    document.querySelector(".game-container").style.display = "none";
    document.querySelector(".home-container").style.display = "block";
}

function handleClick(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerText = currentPlayer;

    if (checkWinner()) {
        showWinner(currentPlayer === "X" ? "Player 1" : "Player 2");
        return;
    }

    if (!board.includes("")) {
        showWinner("Draw");
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (gameMode === "bot" && currentPlayer === "O") {
        setTimeout(botMove, 500);
    }
}

function botMove() {
    let available = board.map((val, i) => (val === "" ? i : null)).filter(i => i !== null);
    let randomMove = available[Math.floor(Math.random() * available.length)];
    handleClick(randomMove);
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern =>
        board[pattern[0]] && board[pattern[0]] === board[pattern[1]] && board[pattern[1]] === board[pattern[2]]
    );
}

function showWinner(winner) {
    document.getElementById("winner-text").innerText = winner === "Draw" ? "It's a Draw!" : `${winner} Wins! 🎉🏆`;
    document.getElementById("winner-message").style.display = "block";
    gameActive = false;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
    document.getElementById("winner-message").style.display = "none";
}
