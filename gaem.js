let num = 3;
let reset = document.getElementById("reset");
let newGame = document.getElementById("newGame");
let entnum = document.getElementById("num");
let start = document.getElementById("start");

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

entnum.onchange = (e) => {
  num = Number(e.target.value);
};

start.onclick = () => {};

// let s =
let countX = localStorage.getItem("FirstPlayer");
let countY = localStorage.getItem("SecndPlayer");

let list = [];
for (let i = 0; i < num; i++) {
  list[i] = [];
  for (let j = 0; j < num; j++) {
    list[i][j] = " ";
  }
}

let count = 0;
let x, y;
let win = false;
let winer = [,];

const board = document.getElementById("board");

for (i = 0; i < num; i++) {
  let div = document.createElement("div");
  div.className = "row";

  for (j = 0; j < num; j++) {
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
  }
  board.appendChild(div);
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
  for (let i = 0; i < num; i++) {
    chec(list[i], check);

    for (let j = 0; j < num; j++) {
      lis[j] = list[j][i];
      chec(lis, check);

      if (i == j) {
        listSlantR[i] = list[i][j];
      }

      if (i == num - 1 - j) {
        listSlantL[i] = list[i][j];
      }
    }
  }
  chec(listSlantR, check);
  chec(listSlantL, check);
}
