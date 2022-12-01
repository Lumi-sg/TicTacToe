const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".statusText");
const restartButton = document.querySelector(".restartButton");

restartButton.addEventListener("click", () => {});

const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
let gameboard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = false;

startGame();

function startGame() {
	isGameActive = true;
	cells.forEach((cell) => cell.addEventListener("click", cellClicked));
	restartButton.addEventListener("click", restartGame);
	switchPlayer();
}

function cellClicked() {
	const cellIndex = this.getAttribute("cellIndex");

	if (gameboard[cellIndex] != "" || !isGameActive) {
		return;
	}
	updateCell(this, cellIndex);
	checkWinner();
}

function updateCell(cell, index) {
	gameboard[index] = currentPlayer;
	cell.textContent = currentPlayer;
}

function switchPlayer() {
	if (currentPlayer === "X") {
		currentPlayer = "O";
		statusText.textContent = `${currentPlayer}'s turn!`;
	} else {
		currentPlayer = "X";
		statusText.textContent = `${currentPlayer}'s turn!`;
	}
}

function checkWinner() {
	let roundWon = false;

	for (let i = 0; i < winConditions.length; i++) {
		const condition = winConditions[i];
		const cellOne = gameboard[condition[0]];
		const cellTwo = gameboard[condition[1]];
		const cellThree = gameboard[condition[2]];

		if (cellOne === "" || cellTwo === "" || cellThree === "") {
			continue;
		}
		if (cellOne === cellTwo && cellTwo === cellThree) {
			roundWon = true;
			break;
		}
	}

	if (roundWon) {
		statusText.textContent = `${currentPlayer} is the winner!`;
		isGameActive = false;
	} else if (!gameboard.includes("")) {
		statusText.textContent = "Draw!";
		isGameActive = false;
	} else {
		switchPlayer();
	}
}

function restartGame() {
	currentPlayer = "X";
	gameboard = ["", "", "", "", "", "", "", "", ""];
	cells.forEach((cell) => (cell.textContent = ""));
	statusText.textContent = `${currentPlayer}'s turn!`;
	isGameActive = true;
}
