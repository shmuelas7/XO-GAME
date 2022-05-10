let list = [];
let num = 3;
for (let i = 0; i < num; i++) {
  list[i] = [];
  for (let j = 0; j < num; j++) {
    // debugger;
    list[i][j] = null;
  }
}

let count = 0;
let x, y;
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
      const { i, j } = JSON.parse(e.target.id);
      if (count % 2 == 0) {
        e.target.innerHTML = "X";
        list[i][j] = "X";
        checkList("X", list);
      } else {
        e.target.innerHTML = "O";
        list[i][j] = "O";
        checkList("O", list);
      }
      console.log(list);
      count++;
    };
    div.appendChild(col);
  }
  board.appendChild(div);
}
function chec(list, ch) {
  return list.every((v) => v === ch);
}
function checkList(check, list) {
  //   debugger;
  for (let i = 0; i < num; i++) {
    if (chec(list[i], check)) {
      alert("win");
      return;
    }
    let lis = [];
    for (let j = 0; j < num; j++) {
      lis[j] = list[j][i];
      console.log(list);
    }
  }
}
