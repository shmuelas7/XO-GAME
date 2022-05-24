let boardSize = 3;
let reset = document.getElementById("reset");
let newGame = document.getElementById("newGame");
// let entnum = document.getElementById("num");
let start = document.getElementById("start");
let player1 = null;
let player2 = null;
let gameHistory = [];

newGame.onclick = () => {
	localStorage.setItem("FirstPlayer", countX);
	localStorage.setItem("SecndPlayer", countY);
	document.location.reload(true);
	win = false;
};

reset.onclick = () => {
	localStorage.clear();
	document.location.reload(true);
};

// entnum.onchange = (e) => {
// 	boardSize = Number(e.target.value);
// };

// start.onclick = () => {};

// let s =
let countX = localStorage.getItem("FirstPlayer");
let countY = localStorage.getItem("SecndPlayer");

let list = [];
for (let i = 0; i < boardSize; i++) {
	list[i] = [];
	for (let j = 0; j < boardSize; j++) {
		list[i][j] = " ";
	}
}

let count = 0;
let x, y;
let win = false;
let winer = [,];

const board = document.getElementById("board");

function createBoard() {
	let div = document.createElement("div");
	div.className = "col-3";
	board.appendChild(div);

	for (i = 0; i < boardSize; i++) {
		let div = document.createElement("div");

		for (j = 0; j < boardSize; j++) {
			let col = document.createElement("div");
			col.className = "col-2 cel";
			col.style.backgroundColor = "red";
			col.innerHTML = "a";
			col.id = JSON.stringify({ i, j });
			col.onclick = (e) => {
				if (win) console.log("win");

				if (e.target.innerHTML != "X" && e.target.innerHTML != "O" && !win) {
					console.log(countX);
					console.log(countY);
					const { i, j } = JSON.parse(e.target.id);

					if (count % 2 == 0) {
						e.target.innerHTML = "X";
						list[i][j] = "X";
						checkList("X", list);
						if (win) countX++;
					} else {
						e.target.innerHTML = "O";
						list[i][j] = "O";
						checkList("O", list);
						if (win) countY++;
					}

					count++;
				}
			};
			div.appendChild(col);
			div.className = "row";
		}
		board.appendChild(div);
	}
}

function chec(list, ch) {
	if (list.every((v) => v === ch)) {
		return (win = true);
	}
}

let lis = ["", "", ""];
let listSlantR = [];
let listSlantL = ["", "", ""];

function checkList(check, list) {
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

	blank.className = "col-3 col-sm-0";

	name1.className = "text-center";
	name2.className = "text-center";

	name1.innerText = player1.name;
	div1.className = "col-3 ";
	div1.appendChild(name1);

	name2.innerText = player2.name;
	div2.className = "col-3";
	div2.appendChild(name2);

	timer.className = "text-center";

	header.append(timer, div1, div2);
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
	boardSize = range.value;
	count.innerHTML = boardSize;
}

startGame();
