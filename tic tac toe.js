const VOID = 3;
const X = 1;
const O = -1;
const TIE = 0;
var board = [VOID, VOID, VOID,VOID, VOID, VOID,VOID, VOID, VOID];
var finished;
var computer = false
var turn = 0;

function setComputer(){
    computer = true
    document.querySelector(".Humanbutton").style.display = "block"
    document.querySelector(".Computerbutton").style.display = "none"
}

function setHuman(){
    computer = false
    document.querySelector(".Computerbutton").style.display = "block"
    document.querySelector(".Humanbutton").style.display = "none"
}

function findBestTurn(b, player, count) { 
  let board = b;
  let max = player == X;
  let best = {
    x: -1,
    sc: 2
  };
  if (max) {
    best.sc = -2;
  }

   for(let i=0;i<9;i++){
    if (board[i] == VOID) { 
        board[i] = player;
        let curr = {
          x: i,
          sc: score(board, player, count) 
        };
        if (max) { 
          if (curr.sc > best.sc) {
            best = curr;
          }
        } else { 
          if (curr.sc < best.sc) {
            best = curr;
          }
        }
        board[i] = VOID;
      }
    }
  return best;
}

function score(board, player, count) {
  let winner = checkWinner(board);
  if (winner != VOID) {
    return winner;
  }
  let next = findBestTurn(board, player == X ? O : X, count + 1);
  return next.sc;
}


function checkWinner(board) {
  for (let j = 0; j < 7; j+=3) {
    if (areequal(board[j], board[1+j], board[2+j]) && board[j] != VOID) {
      return board[j];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (areequal(board[i], board[i+3], board[i+6]) && board[i] != VOID) {
      return board[i];
    }
  }
  if (areequal(board[0], board[4], board[8]) && board[0] != VOID) {
    return board[0];
  }
  if (areequal(board[2], board[4], board[6]) && board[2] != VOID) {
    return board[2];
  }

  for (let i = 0; i < 9; i++) {
      if (board[i]== VOID) {
        return VOID;
      }
  }
  return TIE;
}

function areequal(a, b, c) {
  return a == b && b == c;
}


function restart(){
    location.reload(); 
}

function finishGame(player){
    var winner = checkWinner(board)
    if(winner != VOID){
    document.querySelector('.main').textContent = winner == TIE ? "TIE" :  `Player ${player} won`;
    document.querySelector('.main1').textContent = "Restart to play the next game"; 
    }
}

function reply(id) {
    if(board[id-1] != VOID){
        document.querySelector('.main').textContent = "Oops! ";
        document.querySelector('.main1').textContent = "You re-entered the same block"; 
    }
    else if(turn%2 == 0){
        document.getElementById(id).innerHTML = 'o';
        document.querySelector('.main').textContent = "Player 2's(x) turn";
        document.querySelector('.main1').textContent = " ";
        board[id-1] = O;
        turn++;
        finishGame("o")
        if(computer){
            var index = findBestTurn(board,X,turn)
            document.querySelector('.main').textContent = "";
            board[index.x] = X
            document.getElementById(index.x+1).innerHTML = 'x';
            document.querySelector('.main').textContent = "Player 1's(o) turn";
            document.querySelector('.main1').textContent = " "; 
            turn++; finishGame("x")
        }
    } 
    else {
           document.getElementById(id).innerHTML = 'x';
           document.querySelector('.main').textContent = "Player 1's(o) turn";
           document.querySelector('.main1').textContent = " ";
           board[id-1] = X;
           turn++;
           finishGame("x")
    }
}
