let reset = document.getElementById("reset");
let newGame = document.getElementById("newGame");
newGame.onclick = () => {
  localStorage.setItem("FirstPlayer", countX);
  localStorage.setItem("SecndPlayer", county);
  document.location.reload(true);
};
reset.onclick = () => {
  localStorage.clear();
  document.location.reload(true);
};
// let s =
let countX = localStorage.getItem("FirstPlayer");
let county = localStorage.getItem("SecndPlayer");

let list = [];
let num = 3;
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
      if (e.target.innerHTML != "X" && e.target.innerHTML != "O" && !win) {
        console.log(countX);
        console.log(county);
        const { i, j } = JSON.parse(e.target.id);
        if (count % 2 == 0) {
          countX++;
          e.target.innerHTML = "X";
          list[i][j] = "X";
          checkList("X", list);
        } else {
          county++;
          e.target.innerHTML = "O";
          list[i][j] = "O";
          checkList("O", list);
        }
        // console.log(list);
        count++;
      }
    };
    div.appendChild(col);
  }
  board.appendChild(div);
}

function chec(list, ch) {
  if (
    list.every((v) => {
      v === ch && v != " ";
    })
  )
    win = true;
}

let lis = ["", "", ""];
let listSlantR = [];
let listSlantL = ["", "", ""];
function checkList(check, list) {
  //   debugger;
  for (let i = 0; i < num; i++) {
    // debugger;
    chec(list[i], check);
    // if (chec(list[i], check)) {
    //   // alert("win");
    //   win = 1;
    //   return;
    // }
    for (let j = 0; j < num; j++) {
      lis[j] = list[j][i];
      if (i == j) {
        listSlantR[i] = list[i][j];
      }
      if (i == num - 1 - j) {
        listSlantL[i] = list[i][j];
      }
      chec(lis, check);
      chec(listSlantR, check);
      chec(listSlantL, check);
      // if (chec(lis, check)) {
      //   // console.log("win");
      //   win = true;
      // } else if (chec(listSlantR, check)) {
      //   // console.log("win");
      //   win = 1;
      // } else if (chec(listSlantL, check)) {
      //   // console.log("win");
      //   win = 1;
      // }
    }
  }
}
// }
