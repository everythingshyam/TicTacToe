// ----------------------------------------------------
// STATUS functionalities working properly
//proper UI TODO
//add sound effects TODO
// TODO instead of alert bar, use manually made dialog box
// DONE color method
// TODO on smartphones, after click, box to get back to original color
//reset button DONE
//game win/tie test DONE
//checking for tie DONE
// -----------------------------------------------------

const winArray = [
  [0, 4, 8],
  [2, 4, 6],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

var isClicked = [0, 0, 0, 0, 0, 0, 0, 0, 0];

const color_x = getComputedStyle(document.documentElement).getPropertyValue(
  "--x-color"
);
const color_o = getComputedStyle(document.documentElement).getPropertyValue(
  "--o-color"
);

const color_win = getComputedStyle(document.documentElement).getPropertyValue(
  "--win-color"
);
const color_lose = getComputedStyle(document.documentElement).getPropertyValue(
  "--lose-color"
);
const color_tie = getComputedStyle(document.documentElement).getPropertyValue(
  "--tie-color"
);

const color_mainLight = getComputedStyle(
  document.documentElement
).getPropertyValue("--main-light");
const color_mainDark = getComputedStyle(
  document.documentElement
).getPropertyValue("--main-dark");
const color_mainDarker = getComputedStyle(
  document.documentElement
).getPropertyValue("--main-darker");

var container = document.getElementById("container");
var turnTxt = document.getElementById("turn-text");
var boxes = document.getElementsByClassName("box");
var score_x = 0;
var score_o = 0;
var score_x_view = document.getElementById("score-x");
var score_o_view = document.getElementById("score-o");
var turn = 0;
var btn = document.getElementById("reset-btn");
var resetBoardBtn = document.getElementById("reset-board-btn");
var v = document.getElementById("turn-text");
//change colors of container, grid values score-x, score-o,

// ------------------------------------------------------------------------------------------
//RUN AT STARTUP SECTION

reset();
// flicker();

// ------------------------------------------------------------------------------------------
function resetGameBoard() {
  console.log("Function resetGameBoard called");
  Array.from(boxes).forEach((ele) => {
    ele.innerHTML = " ";
    ele.classList.remove("box-hover");
    ele.classList.remove("box-no-hover");
  });
  for (let i = 0; i < isClicked.length; i++) {
    isClicked[i] = 0;
  }
}
function resetScoreBoard() {
  console.log("Function resetScoreBoard called");
  score_o = 0;
  score_x = 0;
  score_o_view.innerHTML = score_o;
  score_x_view.innerHTML = score_x;
}
// ------------------------------------------------------------------------------------------
function setTurn() {
  console.log("Function setTurn called");
  if (Math.random() < 0.5) {
    turnTxt.innerHTML = "Turn of X";
    turn = 0;
    // color();
  } else {
    turnTxt.innerHTML = "Turn of O";
    turn = 1;
    // color();
  }
}
function reset() {
  console.log("Function reset called");
  resetGameBoard();
  resetScoreBoard();
  setTurn();
  color();
}
// ------------------------------------------------------------------------------------------
function color() {
  console.log("Function color called");
  //changing color based on turn of x and o
  if (turn == 0) {
    v.style.color = color_x;
    container.style.backgroundColor = color_x;
  } else {
    v.style.color = color_o;
    container.style.backgroundColor = color_o;
  }

  if (score_o == score_x) {
    score_x_view.style.backgroundColor = color_tie;
    score_o_view.style.backgroundColor = color_tie;
  } else if (score_x > score_o) {
    score_x_view.style.backgroundColor = color_win;
    score_o_view.style.backgroundColor = color_lose;
  } else {
    score_x_view.style.backgroundColor = color_lose;
    score_o_view.style.backgroundColor = color_win;
  }

  //changing color based on win/losing/tie
}
// ------------------------------------------------------------------------------------------
function check(turn) {
  console.log("Function check called");
  for (let i = 0; i < winArray.length; i++) {
    var a = document.getElementById(winArray[i][0]);
    var b = document.getElementById(winArray[i][1]);
    var c = document.getElementById(winArray[i][2]);

    if (a.innerHTML == turn && b.innerHTML == turn && c.innerHTML == turn) {
      alert(turn + " won!");
      if (turn == "X") {
        score_x_view.innerHTML = ++score_x;
        color();
      } else {
        score_o_view.innerHTML = ++score_o;
        color();
      }
      resetGameBoard();
      break;
    }
  }
}
// ------------------------------------------------------------------------------------------
function checkTie() {
  console.log("Function checkTie called");
  let f = 1;
  for (let i = 0; i < isClicked.length; i++) {
    if (isClicked[i] == 0) {
      f = 0;
      break;
    }
  }
  if (f == 1) {
    alert("Its a tie!");
    reset();
  }
}
// ------------------------------------------------------------------------------------------
function flicker() {
  var allElem = document.querySelectorAll("*");
  allElem.forEach((ele) => {
    ele.classList.add("flicker-on");
    setTimeout(function () {
      console.log("Delay before removing flicker effect");
      // ele.classList.remove("flicker-on");
    }, 3000);
  });
}
// ------------------------------------------------------------------------------------------
btn.onclick = () => {
  console.log("Clicked on reset btn");
  let cnfreset = window.confirm(
    "This will reset the scores as well. Go ahead?"
  );
  if (cnfreset) {
    console.log("Confirmed to reset.");
    reset();
    score_o_view.innerHTML = "0";
    score_x_view.innerHTML = "0";
  } else {
    console.log("Cancelled reset operation.");
  }
};
// ------------------------------------------------------------------------------------------
resetBoardBtn.onclick = () => {
  console.log("Clicked on reset board btn");
  resetGameBoard();
  setTurn();
  color();
};
// ------------------------------------------------------------------------------------------
Array.from(boxes).forEach((ele) => {
  ele.addEventListener("click", () => {
    console.log("Clicked on board box " + ele.id);
    //alert(ele.target);
    let done = false; //stores if win or tie is done (happened)
    if (isClicked[ele.id] == 0) {
      console.log("Box click approved");
      // isClicked[ele.id] = 1;
      if (turn == 0) {
        ele.innerHTML = "X";
        ele.style.color = color_x;
        turn = 1;
        setTimeout(function () {
          done = check("X");
        }, 100);
        //   score_x_view.innerHTML = ++score_x;
        // var v = document.getElementById("turn-text");
        v.innerHTML = "Turn of O";
        color();
        if (done == true) return;
      } else {
        ele.innerHTML = "O";
        ele.style.color = color_o;
        turn = 0;
        setTimeout(function () {
          done = check("O");
        }, 100);
        //   score_o_view.innerHTML = ++score_o;
        v.innerHTML = "Turn of X";
        color();
        if (done == true) return;
      }
      // checkTie();
      //color of the box to be reverted back
      // ele.style.transition="background-color 5s ease"
      ele.classList.remove("box-no-hover");
      ele.classList.remove("box-hover");
      // ele.classList.add("box-hover");
      // setTimeout(function () {
      //   console.log("Delay before removing hover effect");
      // }, 10000);

      // ele.classList.remove("transition-slow");
      // ele.classList.add("transition-fast");
      // ele.style.backgroundColor = color_mainLight;
      // ele.classList.remove("transition-fast");
      // ele.classList.add("transition-slow");
      // ele.style.backgroundColor = color_mainDarker;
      // ele.classList.remove("transition-slow");

      isClicked[ele.id] = 1;
    } else {
      console.log("Box already clicked!");
    }
    // checkTie()
    setTimeout(function () {
      done = checkTie();
    }, 100);
  });
});

Array.from(boxes).forEach((ele) => {
  ele.addEventListener("mouseover", () => {
    if (isClicked[ele.id] == "0") {
      console.log("Hovering on box " + ele.id);
      ele.style.transition = "background-color .5s ease;";
      ele.classList.remove("box-no-hover");
      ele.classList.add("box-hover");
    }
  });
});

Array.from(boxes).forEach((ele) => {
  ele.addEventListener("mouseout", () => {
    if (isClicked[ele.id] == 0) {
      console.log("Unhovered from box " + ele.id);
      ele.style.transition = "background-color .5s ease;";
      ele.classList.remove("box-hover");
      ele.classList.add("box-no-hover");
    }
  });
});
