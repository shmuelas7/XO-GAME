let boardSize = 3;
const board = document.getElementById("board");
const count = document.getElementsByClassName("counter");
const turn = document.getElementsByClassName("turn");

let player1 = null;
let player2 = null;
let gameHistory = [];
let Turn = "X";
let win = false;
let list = [];
let winer = null;
let lis = [];
let listSlantR = [];
let listSlantL = ["", "", ""];
let flagErase = false;
let intervalId = null;
let flagUndo = null;
let counter =0;

function createMarix() {
	for (let i = 0; i < boardSize; i++) {
		list[i] = [];
		lis[i] = [];
		for (let j = 0; j < boardSize; j++) {
			list[i][j] = " ";
			lis[i][j] = " ";
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
		div.className = "bodyGame ";

		for (j = 0; j < boardSize; j++) {
			let col = document.createElement("div");
			signBoard(col);
			if(i<boardSize-1 && j!==0){
				col.className += " buttomBorder";
			}else if(j==0 && i!==boardSize-1){
				col.className += " dBorder";
			}
			else if(i==boardSize-1 && j!==0){
				col.className += " leftDowneBorder";
			}else{
			col.className +=" cel";
			}
				
		

			col.id = JSON.stringify({ i, j });
			col.onclick = (e) => {
				if (e.target.innerHTML != "X" && e.target.innerHTML != "O" && !win) {
					counter ++;
					count[0].innerHTML=counter
					turn[0].innerHTML=Turn=="X"?"O":"X"
					const { i, j } = JSON.parse(e.target.id);
					flagUndo = true;


					if (Turn == "X") {
						player1.count++;
						e.target.innerText = "X";
						e.target.className += " celX"
						list[i][j] = "X";
						checkList("X");
					} else {
						player2.count++;
						e.target.innerText = "O";
						e.target.className += " celX"
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
			lis[i][j] = list[j][i];
			chec(lis[i], check);

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
			" <labal> Select a board size  </label>" +
			"<br/>" +
			'<input type="range" id="range" max="5" min="3" value="3" onchange="updateSize()">' +
			"<label  id='size'>  3<label/>",
		focusConfirm: false,
		preConfirm: () => {
			player1 = new CreatePlayer("X");
			player2 = new CreatePlayer("O");
		},
	});

	putName();
	createMarix();
	createNav();
	createBoard();
}

function putName() {
	let header = document.getElementById("header");
	let divTurn = document.createElement("div");
	let turn = document.createElement("h4");
	let you = document.createElement("h5");
	let divCounter = document.createElement("div");
	let textCounter =document.createElement("h4");


	textCounter.innerHTML="moves"
	textCounter.className="moves"
	let count = document.createElement("h5");
	count.innerText= counter
	count.className="counter"
	you.innerHTML="you"
	you.className="you"
	turn.innerHTML=Turn;
	turn.className="turn"
	divTurn.className="turnContainer"

	divCounter.append(textCounter,count)

	divTurn.append(you,turn)

	
	let timer = createTimer();
	header.append(timer,divTurn,divCounter);
	startTimer();
}

function createTimer() {
	let container = document.createElement("div");
	let name = document.createElement("div");
	let div = document.createElement("div");
	div.className = "timer";
	container.className="timerContainer"

	name.innerText="timer"
	name.className="timerName"

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
	container.append(name,div)

	return container;
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
	

	boardSize = range.value;
	board.className = `size${boardSize} text-center game `;
	count.innerHTML = boardSize;

}
function createNav() {
	let size = 2;
	let nav = document.getElementById("nav");
	let undoImg = document.createElement("button");
	let reloadBtn = document.createElement("button");
	let saveImg = document.createElement("button");
	let newGamebtn = document.createElement("button");
	let bestScorebtn = document.createElement("button");

	bestScorebtn.className = "btn";
	bestScorebtn.innerText = "best score";
	bestScorebtn.onclick = () => {
		showBestScore();
	};
	newGamebtn.className = "btn";
	newGamebtn.innerHTML = "new Game";
	newGamebtn.onclick = () => {
		newGame();
	};

	undoImg.className = "btn";
	undoImg.innerText = "step back";
	undoImg.onclick = () => {
		undo();
	};

	saveImg.innerText = "save game";
	saveImg.className = "btn";
	saveImg.onclick = () => {
		save();
	};

	reloadBtn.innerText = "reload game";
	reloadBtn.className = "btn";
	reloadBtn.onclick = () => {
		load();
	};
	
	nav.append(undoImg, saveImg, reloadBtn, newGamebtn, bestScorebtn);
}

function pushHistory() {
	gameHistory.push(JSON.stringify(list));
}
function save() {
	localStorage.savedGame = JSON.stringify(list);
	localStorage.player1 = JSON.stringify(player1);
	localStorage.player2 = JSON.stringify(player2);
	localStorage.turn = Turn;
	localStorage.history = JSON.stringify(gameHistory);
	alert("The Game Saved");
}
function load() {
	if (localStorage.savedGame) {
		list = JSON.parse(localStorage.savedGame);

		player1 = JSON.parse(localStorage.player1);
		player2 = JSON.parse(localStorage.player2);
		gameHistory = JSON.parse(localStorage.history);
		Turn = localStorage.turn;
		win=false
		console.log(Turn)
		console.log(turn[0])
		turn[0].innerHTML= Turn
		eraseBoard();
		flagErase = true;
		createBoard();
	}
}
function undo() {
	win=false
	if (gameHistory.length > 0) {
		let lastStep = gameHistory.pop();
		if (flagUndo) {
			flagUndo = false;
			lastStep = gameHistory.pop();
		}
		list = JSON.parse(lastStep);
		changeTurn()
		turn[0].innerHTML= Turn
		eraseBoard();
		flagErase = true;
		createBoard();
		
	}
}
async function winerr() {
	clearInterval(intervalId);
	let winName = Turn == "X" ?"Player X Win": "Player O Win";
	await Swal.fire({
		title: Turn,
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
	
	if (Turn == "X") {
		Turn = "O";
	}else{
		Turn = "X";
	}
}
function signBoard(col) {
	col.className +=" celX"
	if (list[i][j] == "X") {
		col.innerText = "X";
	} else if (list[i][j] == "O") {
		col.innerText = "O";
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
