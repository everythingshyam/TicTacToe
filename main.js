// ----------------------------------------------------
// STATUS functionalities working properly
//reset button DONE
    //game win/tie test DONE
    //checking for tie TODO
    //proper UI TODO
    //add sound effects TODO
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

var boxes = document.getElementsByClassName("box");
var score_x = 0;
var score_o = 0;
var score_x_view = document.getElementById("score-x");
var score_o_view = document.getElementById("score-o");
var turn = 0;
var btn = document.getElementById("reset-btn");
var v = document.getElementById("turn-text");

// -----------------------------------------------------------

function restart() {
  Array.from(boxes).forEach((ele) => {
    ele.innerHTML = " ";
  });
  for (let i = 0; i < isClicked.length; i++) {
    isClicked[i] = 0;
    console.log("Checking for clicks " + isClicked[0]);
  }

  function checkTie() {
    console.log("\nChecking Tie");
  }

  turn=0
  var v = document.getElementById("turn-text");
  v.innerHTML = "Turn of X";
}

function check(turn) {
  for (let i = 0; i < winArray.length; i++) {
    var a = document.getElementById(winArray[i][0]);
    var b = document.getElementById(winArray[i][1]);
    var c = document.getElementById(winArray[i][2]);

    if (a.innerHTML == turn && b.innerHTML == turn && c.innerHTML == turn) {
      alert(turn + " won!");
      if (turn == "X") score_x_view.innerHTML = ++score_x;
      else score_o_view.innerHTML = ++score_o;
      restart();
      break;
    }
  }
}

btn.onclick = () => {
  restart();
  score_o_view.innerHTML = "0";
  score_x_view.innerHTML = "0";
};

function checkTie(){
    let f=1;
    for(let i=0;i<isClicked.length;i++)
    {
        if(isClicked[i]==0)
        {
            f=0
            break;
        }
    }
    if(f==1)
    {
        alert('Its a tie!')
        restart();
    }
}

Array.from(boxes).forEach((ele) => {
  ele.addEventListener("click", () => {
    //alert(ele.target);
    let done=false      //stores if win or tie is done (happened)
    if (isClicked[ele.id] == 0) {
      console.log("Box click approved");
      isClicked[ele.id] = 1;
      if (turn == 0) {
        ele.innerHTML = "X";
        turn = 1;
        setTimeout(function () {
          done=check("X");
        }, 100);
        //   score_x_view.innerHTML = ++score_x;
        // var v = document.getElementById("turn-text");
        v.innerHTML = "Turn of O";
        if(done==true)
            return
      } else {
        ele.innerHTML = "O";
        turn = 0;
        setTimeout(function () {
          done=check("O");
        }, 100);
        //   score_o_view.innerHTML = ++score_o;
        v.innerHTML = "Turn of X";
        if(done==true)
            return
      }
      // checkTie();
    } else {
      console.log("Box already clicked!");
    }
    // checkTie()
    setTimeout(function () {
        done=checkTie();
      }, 100);
  });
});
