const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".statusText");
const restartButton = document.querySelector(".restartButton");
const twoPlayerButton = document.querySelector(".twoPlayer");
const aiButton = document.querySelector(".AI");

restartButton.style.display = "none";

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
let aiMode = false;
let currentPlayer = "X";
let isGameActive = false;

twoPlayerButton.addEventListener("click", () => {
	aiMode = false;
	startGame();
});
aiButton.addEventListener("click", () => {
	aiMode = true;
	startGame();
});

function startGame() {
	currentPlayer = "X";
	gameboard = ["", "", "", "", "", "", "", "", ""];
	cells.forEach((cell) => (cell.textContent = ""));
	twoPlayerButton.style.display = "none";
	aiButton.style.display = "none";
	cells.forEach((cell) => (cell.style.backgroundColor = "#202020"));
	isGameActive = true;
	cells.forEach((cell) => cell.addEventListener("click", cellClicked));
	restartButton.style.display = "block";
	restartButton.addEventListener("click", restartGame);
	if (aiMode) {
		statusText.textContent = "AI Mode";
	} else {
		statusText.textContent = `${currentPlayer}'s turn!`;
	}
}

function cellClicked() {
	if (!aiMode) {
		const cellIndex = this.getAttribute("cellIndex");
		if (gameboard[cellIndex] != "" || !isGameActive) {
			return;
		}
		updateCell(this, cellIndex);
		checkWinner(cellIndex);
	} else {
		if (currentPlayer === "X") {
			const cellIndex = this.getAttribute("cellIndex");
			if (gameboard[cellIndex] != "" || !isGameActive) {
				return;
			}
			updateCell(this, cellIndex);
			checkWinner(cellIndex);
			aiPickCell();
		}
	}
}

function aiPickCell() {
	if (isGameActive) {
		let randomCellIndex = getRandomCell();
		let cellElement = cells[randomCellIndex];
		updateCell(cellElement, randomCellIndex);
		checkWinner(randomCellIndex);
	} else {
		return;
	}
}

function getRandomCell() {
	let i = 0;
	while (true) {
		let temp = Math.floor(Math.random() * 8);
		if (gameboard[temp] === "X" || gameboard[temp] === "O") {
			i++;
			// console.log(`Counter: ${i}`);
			if (i > 50) {
				break;
			}
			continue;
		} else {
			return temp;
		}
	}
}

function updateCell(cell, cellIndex) {
	gameboard[cellIndex] = currentPlayer;
	cell.textContent = currentPlayer;
}

function switchPlayer() {
	if (currentPlayer === "X") {
		currentPlayer = "O";
		if (aiMode) {
			statusText.textContent = "AI Mode";
		} else {
			statusText.textContent = `${currentPlayer}'s turn!`;
		}
	} else {
		currentPlayer = "X";
		if (aiMode) {
			statusText.textContent = "AI Mode";
		} else {
			statusText.textContent = `${currentPlayer}'s turn!`;
		}
	}
}

function highlightWinningCells() {
	for (let i = 0; i < winConditions.length; i++) {
		const condition = winConditions[i];
		const cellColorOne = cells[condition[0]];
		const cellColorTwo = cells[condition[1]];
		const cellColorThree = cells[condition[2]];

		if (
			cellColorOne.textContent === cellColorTwo.textContent &&
			cellColorTwo.textContent === cellColorThree.textContent
		) {
			if (
				cellColorOne.textContent != "" &&
				cellColorTwo.textContent != "" &&
				cellColorThree.textContent != ""
			) {
				cellColorOne.style.backgroundColor = "green";
				cellColorTwo.style.backgroundColor = "green";
				cellColorThree.style.backgroundColor = "green";
			}
		}
	}
	initalizeGame();
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
			highlightWinningCells();
			break;
		}
	}

	if (roundWon) {
		statusText.textContent = `${currentPlayer} is the winner! Play again?`;
		isGameActive = false;
	} else if (!gameboard.includes("")) {
		statusText.textContent = "Draw! Play again?";
		isGameActive = false;
	} else {
		switchPlayer();
	}
}

function initalizeGame() {
	statusText.textContent = "Play Again?";
	restartButton.style.display = "none";
	twoPlayerButton.style.display = "block";
	aiButton.style.display = "block";
}

function restartGame() {
	startGame();
	// statusText.textContent = `${currentPlayer}'s turn!`;
	//
	// isGameActive = true;
}
