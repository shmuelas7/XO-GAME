let boardSize = 3;
const board = document.getElementById("board");
let player1 = null;
let player2 = null;
let gameHistory = [];
let Turn = true;
let win = false;
let list = [];

let x, y;

let winer = [,];

let lis = ["", "", ""];
let listSlantR = [];
let listSlantL = ["", "", ""];

function createMarix() {
	for (let i = 0; i < boardSize; i++) {
		list[i] = [];
		for (let j = 0; j < boardSize; j++) {
			list[i][j] = " ";
		}
	}
}

function newGame() {
	document.location.reload(true);
}
function eraseBoard() {
	let element = document.getElementById("board");
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

function createBoard() {
	for (i = 0; i < boardSize; i++) {
		let div = document.createElement("div");
		div.className = "row";

		for (j = 0; j < boardSize; j++) {
			let col = document.createElement("div");
			col.className = "col-2 cel";
			col.style.backgroundColor = "red";

			col.id = JSON.stringify({ i, j });
			col.onclick = (e) => {
				if (e.target.innerHTML != "X" && e.target.innerHTML != "O" && !win) {
					// console.log(countX);
					// console.log(countY);
					const { i, j } = JSON.parse(e.target.id);

					if (Turn) {
						e.target.className = "col-2 cel ";
						e.target.innerText = "X";

						list[i][j] = "X";
						Turn = false;
						checkList("X");

						// if (win) countX++;
					} else {
						e.target.innerText = "O";
						e.target.className = "col-2 cel ";
						list[i][j] = "O";
						Turn = true;
						checkList("O");

						// if (win) countY++;
					}
					pushHistory();
				}
			};
			div.appendChild(col);
		}
		board.appendChild(div);
	}
}

function chec(list, ch) {
	if (list.every((v) => v === ch)) {
		return (win = true);
	}
}

function checkList(check) {
	for (let i = 0; i < boardSize; i++) {
		chec(list[i], check);

		for (let j = 0; j < boardSize; j++) {
			lis[j] = list[j][i];
			chec(lis, check);

			if (i == j) {
				listSlantR[i] = list[i][j];
			}

			if (i == boardSize - 1 - j) {
				listSlantL[i] = list[i][j];
			}
		}
	}
	chec(listSlantR, check);
	chec(listSlantL, check);
}

function CreatePlayer(name) {
	this.name = name;
	count = 0;
}

async function startGame() {
	await Swal.fire({
		title: "Enter Names",
		html:
			'<input id="name1" class="swal2-input" placeholder="First Name">' +
			'<input id="name2" class="swal2-input" placeholder="Secend Name">' +
			"<br/>" +
			" <labal> Select a board size  </label>" +
			"<br/>" +
			'<input type="range" id="range" max="5" min="3" value="3" onchange="updateSize()">' +
			"<label  id='size'>  3<label/>",
		focusConfirm: false,
		preConfirm: () => {
			let a = document.getElementById("name1").value;
			let b = document.getElementById("name2").value;
			player1 = new CreatePlayer(a);
			player2 = new CreatePlayer(b);
		},
	});

	putName();
	createMarix();
	createNav();
	createBoard();
}

function putName() {
	let header = document.getElementById("header");
	let blank = document.createElement("div");
	let div1 = document.createElement("div");
	let div2 = document.createElement("div");
	let timer = createTimer();
	let name1 = document.createElement("h3");
	let name2 = document.createElement("h3");
	let label1 = document.createElement("label");
	let label2 = document.createElement("label");

	blank.className = "col-3 ";

	name1.className = "text-center";
	name2.className = "text-center";

	name1.innerText = player1.name;
	div1.className = "col-3 ";
	div1.appendChild(name1);

	name2.innerText = player2.name;
	div2.className = "col-3";
	div2.appendChild(name2);

	timer.className = "text-center col-3";

	header.append(timer, div1, div2, blank);
	startTimer();
}

function createTimer() {
	let div = document.createElement("div");
	div.className = "col-3";

	let minutes = document.createElement("label");
	minutes.id = "minutes";
	minutes.innerHTML = "00";

	let colon = document.createElement("label");
	colon.id = "colon";
	colon.innerHTML = ":";

	let seconds = document.createElement("label");
	seconds.id = "seconds";
	seconds.innerHTML = "00";

	div.append(minutes, colon, seconds);
	return div;
}
function startTimer() {
	let minutesLabel = document.getElementById("minutes");
	let secondsLabel = document.getElementById("seconds");
	let totalSeconds = 0;
	setInterval(setTime, 1000);

	function setTime() {
		++totalSeconds;
		secondsLabel.innerHTML = pad(totalSeconds % 60);
		minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
	}

	function pad(val) {
		let valString = val + "";
		return valString.length < 2 ? "0" + valString : valString;
	}
}

function updateSize() {
	let range = document.getElementById("range");
	let count = document.getElementById("size");
	let center = document.getElementById("center");

	boardSize = range.value;
	count.innerHTML = boardSize;
}
function createNav() {
	let size = boardSize == 3 ? 2 : 3;
	let nav = document.getElementById("nav");

	let undoDiv = document.createElement("div");
	let undoImg = document.createElement("button");

	let reloadDiv = document.createElement("div");
	let reloadBtn = document.createElement("button");

	let saveDiv = document.createElement("div");
	let saveImg = document.createElement("button");

	let newGameDiv = document.createElement("div");
	let newGamebtn = document.createElement("button");

	newGameDiv.className = `col-${size} txt`;
	newGamebtn.innerHTML = "new Game";
	newGamebtn.onclick = () => {
		newGame();
	};
	newGameDiv.appendChild(newGamebtn);

	undoDiv.className = `col-${size} txt`;
	undoImg.className = "undo";
	undoImg.innerText = "step back";
	undoDiv.appendChild(undoImg);
	undoImg.onclick = () => {
		undo();
	};

	saveDiv.className = `col-${size} txt`;
	saveImg.innerText = "save game";
	saveImg.className = "save";
	saveImg.onclick = () => {
		save();
	};
	saveDiv.appendChild(saveImg);

	reloadDiv.className = `col-${size} txt`;
	reloadBtn.innerText = "reload game";
	reloadBtn.onclick = () => {
		load();
	};
	reloadDiv.appendChild(reloadBtn);

	nav.append(undoDiv, saveDiv, reloadDiv, newGameDiv);
}

function pushHistory() {
	gameHistory.push(JSON.stringify(list));
}
function save() {
	localStorage.savedGame = JSON.stringify(list);
	alert("The Game Saved");
}
function load() {
	if (localStorage.savedGame) {
		list = JSON.parse(localStorage.savedGame);
		eraseBoard();
		createNewBoard();
	}
}
function createNewBoard() {
	for (i = 0; i < list.length; i++) {
		let div = document.createElement("div");
		div.className = "row";

		for (j = 0; j < list.length; j++) {
			let col = document.createElement("div");
			col.className = "col-2 cel";
			col.style.backgroundColor = "red";
			if (list[i][j] == "X") {
				col.innerText = "X";
			} else if (list[i][j] == "O") {
				col.innerText = "O";
			}

			col.id = JSON.stringify({ i, j });
			col.onclick = (e) => {
				// if (win) console.log("win");

				if (e.target.innerHTML != "X" && e.target.innerHTML != "O" && !win) {
					// console.log(countX);
					// console.log(countY);
					const { i, j } = JSON.parse(e.target.id);

					if (Turn) {
						e.target.innerText = "X";
						list[i][j] = "X";
						Turn = false;
						checkList("X");

						// if (win) countX++;
					} else {
						e.target.innerText = "O";
						list[i][j] = "O";
						Turn = true;
						checkList("O");

						// if (win) countY++;
					}
				}
			};
			div.appendChild(col);
		}
		board.appendChild(div);
	}
}
function undo() {
	if (gameHistory.length) {
		list = JSON.parse(gameHistory.pop());
		eraseBoard();
		createNewBoard();
	}
}

startGame();
