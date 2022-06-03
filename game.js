let boardSize = 3;
const board = document.getElementById("board");
let player1 = null;
let player2 = null;
let gameHistory = [];
let Turn = "X";
let win = false;
let list = [];
let winer = null;
let lis = ["", "", ""];
let listSlantR = [];
let listSlantL = ["", "", ""];
let flagErase = false;
let intervalId = null;
let flagUndo = null;

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

			if (eraseBoard) {
				signBoard(col);
			}

			col.id = JSON.stringify({ i, j });
			col.onclick = (e) => {
				if (e.target.innerHTML != "X" && e.target.innerHTML != "O" && !win) {
					// console.log(countX);
					// console.log(countY);
					const { i, j } = JSON.parse(e.target.id);
					flagUndo = true;

					if (Turn == "X") {
						player1.count++;
						e.target.className = "col-2 cel x ";
						e.target.innerText = "X";
						e.target.style.backgroundImage = "url('./x.jpg' )";
						list[i][j] = "X";
						checkList("X");
					} else {
						player2.count++;
						e.target.innerText = "O";
						e.target.style.backgroundImage = "url('./o.jpg' )";
						e.target.className = "col-2 cel  x text-black";
						list[i][j] = "O";
						checkList("O");
					}
					changeTurn();
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
		winerr();
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

function CreatePlayer(name, count = 1) {
	this.name = name;
	this.count = count;
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

	name1.innerText = player1.name + " => X";
	div1.className = "col-3 bg-dark rounded-pill";
	div1.id = "p1";
	div1.appendChild(name1);

	name2.innerText = player2.name + " =>  O";
	div2.className = "col-3";
	div2.id = "p2";
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
	intervalId = setInterval(setTime, 1000);

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
	let centerDiv = document.getElementById("centerDiv");

	boardSize = range.value;
	board.className = `size${boardSize} col-4 text-center game `;
	count.innerHTML = boardSize;
	if (boardSize > 3) {
		center.className = "col-4";
		centerDiv.className = "col-4";
	}
}
function createNav() {
	let size = 2;
	let nav = document.getElementById("nav");

	let undoDiv = document.createElement("div");
	let undoImg = document.createElement("button");

	let reloadDiv = document.createElement("div");
	let reloadBtn = document.createElement("button");

	let saveDiv = document.createElement("div");
	let saveImg = document.createElement("button");

	let newGameDiv = document.createElement("div");
	let newGamebtn = document.createElement("button");

	let bestScorediv = document.createElement("div");
	let bestScorebtn = document.createElement("button");

	bestScorediv.className = `col-lg-${size} txt col-sm-12 mt-2 `;
	bestScorebtn.className = " size btn btn-primary";
	bestScorebtn.innerText = "best score";
	bestScorebtn.onclick = () => {
		showBestScore();
	};
	bestScorediv.appendChild(bestScorebtn);

	newGameDiv.className = `col-lg-${size} txt col-sm-12 mt-2 `;
	newGamebtn.className = " size btn btn-primary";
	newGamebtn.innerHTML = "new Game";
	newGamebtn.onclick = () => {
		newGame();
	};
	newGameDiv.appendChild(newGamebtn);

	undoDiv.className = `col-lg-${size} txt col-sm-12 mt-2`;
	undoImg.className = "size btn btn-primary";
	undoImg.innerText = "step back";
	undoDiv.appendChild(undoImg);
	undoImg.onclick = () => {
		undo();
	};

	saveDiv.className = `col-lg-${size} txt col-sm-12 mt-2 `;
	saveImg.innerText = "save game";
	saveImg.className = "size btn btn-primary";
	saveImg.onclick = () => {
		save();
	};
	saveDiv.appendChild(saveImg);

	reloadDiv.className = `col-lg-${size} txt  col-sm-12 mt-2 `;
	reloadBtn.innerText = "reload game";
	reloadBtn.className = "btn btn-primary size";
	reloadBtn.onclick = () => {
		load();
	};
	reloadDiv.appendChild(reloadBtn);

	nav.append(undoDiv, saveDiv, reloadDiv, newGameDiv, bestScorediv);
}

function pushHistory() {
	gameHistory.push(JSON.stringify(list));
}
function save() {
	localStorage.savedGame = JSON.stringify(list);
	localStorage.player1 = JSON.stringify(player1);
	localStorage.player2 = JSON.stringify(player2);
	localStorage.turn = Turn;

	console.log(player1);
	console.log(Turn);
	console.log(localStorage.player1.name);
	alert("The Game Saved");
}
function load() {
	if (localStorage.savedGame) {
		let p1 = document.getElementById("p1");
		let p2 = document.getElementById("p2");

		list = JSON.parse(localStorage.savedGame);

		player1 = JSON.parse(localStorage.player1);
		player2 = JSON.parse(localStorage.player2);

		p1.innerText = player1.name + " => X";
		p2.innerText = player2.name + " => O";

		Turn = localStorage.turn;
		changeTurn();
		eraseBoard();
		flagErase = true;
		createBoard();
	}
}
function undo() {
	debugger;
	if (gameHistory.length > 0) {
		let lastStep = gameHistory.pop();
		if (flagUndo) {
			flagUndo = false;
			lastStep = gameHistory.pop();
		}
		list = JSON.parse(lastStep);
		eraseBoard();
		flagErase = true;
		createBoard();
		let player = changeTurn();
		player.count--;
	}
}
async function winerr() {
	clearInterval(intervalId);
	let winName = Turn == "X" ? player2 : player1;

	await Swal.fire({
		title: winName.name + " WINER !!! ",
		showClass: {
			popup: "animate__animated animate__fadeInDown",
		},
		hideClass: {
			popup: "animate__animated animate__fadeOutUp",
		},
	});
	saveBestScore(winName);
}
function changeTurn() {
	let player1 = document.getElementById("p1");
	let player2 = document.getElementById("p2");
	if (Turn == "X") {
		Turn = "O";
		player2.className = "bg-black col-3 rounded-pill";
		player1.className = "col-3";
		return player1;
	} else {
		Turn = "X";
		player1.className = "bg-black col-3 rounded-pill";
		player2.className = "col-3 ";
		return player2;
	}
}
function signBoard(col) {
	if (list[i][j] == "X") {
		col.innerText = "X";
		col.style.backgroundImage = "url('./x.jpg' )";
		col.className = "col-2 cel x ";
	} else if (list[i][j] == "O") {
		col.innerText = "O";
		col.style.backgroundImage = "url('./o.jpg' )";
		col.className = "col-2 cel x ";
	}
}
function saveBestScore(player) {
	let name = `bestScore${boardSize}`;

	console.log(localStorage[name]);
	if (localStorage[name] === undefined) {
		localStorage[name] = player.count;
		console.log(localStorage[name]);
	} else {
		console.log(localStorage[name] + "" + player.count);
		if (player.count < localStorage[name]) {
			localStorage[name] = player.count;
			console.log("sucss");
		}
	}
}
function showBestScore() {
	let name = `bestScore${boardSize}`;
	Swal.fire("best result " + localStorage[name]);
}

startGame();
