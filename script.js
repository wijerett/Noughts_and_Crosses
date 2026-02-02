function Gameboard() {
  const rows = 3;
  const columns = 3;
  let board = [];
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;
  const placeMark = (column, row, player) => {
    if(board[row][column].getValue() === 0) {
      board[row][column].addMark(player)
    } else {
      console.log("Choose again!")
      return
    }
  };
  const printBoard = () => {
  const boardValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardValues);
  };
    return { getBoard, placeMark, printBoard};
};


function Cell() {
  let value = 0
  const addMark = (player) => {
    value = player;
  };
  const getValue = () => value;
  return {
    addMark,
    getValue
  };
};

function GameController(
  playerOne = "Player One",
  playerTwo = "Player Two"
) {
  const board = Gameboard();
  const players = [
    {
      name: playerOne,
      mark: "X"
    },
    {
      name: playerTwo,
      mark: "O"
    }
  ];
  let activePlayer = players[0];
  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;
  const printNewRound = () => {
    board.printBoard();
    winCondition();
    console.log(`${getActivePlayer().name}'s turn.`);
  };
    function winCondition () {
    const b = board.getBoard().map(row => row.map(cell => cell.getValue()));
    for (let i = 0; i < 3; i++) {
      if (b[i][0] !== 0 && b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
        console.log(`${getActivePlayer().name} wins!`);
        board.printBoard()
        return true;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (b[0][i] !== 0 && b[0][i] === b[1][i] && b[1][i] === b[2][i]) {
        console.log(`${getActivePlayer().name} wins!`);
        board.printBoard()
        return true;
      }
    }
    if (b[0][0] !== 0 && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
      console.log(`${getActivePlayer().name} wins!`);
      board.printBoard()
      return true;
    }
    if (b[0][2] !== 0 && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
      console.log(`${getActivePlayer().name}} wins!`);
      board.printBoard()
      return true;
    }
    return false;
  }
  const playRound = (column, row) => {
    printNewRound();
    if (board.getBoard()[row][column].getValue() === 0) {
      board.placeMark(column, row, getActivePlayer().mark);
      console.log(`Placing ${getActivePlayer().name}'s mark to column ${column} row ${row}.`);
    } else {
      console.log("Choose again!");
    }

    if (winCondition() !== true) {
      return switchPlayer(), printNewRound;
    } else {
      return;
    }
  };
  return { playRound, printNewRound };
}

const game = GameController();
window.playRound = game.playRound;

const play = game.playRound;
game.playRound(0,0);
game.playRound(0,1);
game.playRound(1,0);
game.playRound(1,1);
game.playRound(2,0);

function Display() {
  const board = Gameboard();

  this.displayBoard = function() {
    viewBoard = board.getBoard().map(row => row.map(cell => cell.getValue()));
    //problem getting updated array items in DOM
    
    newBoard = viewBoard.flat();

    const display1 = document.querySelector("#tile-1");
    const display2 = document.querySelector("#tile-2");
    const display3 = document.querySelector("#tile-3");
    const display4 = document.querySelector("#tile-4");
    const display5 = document.querySelector("#tile-5");
    const display6 = document.querySelector("#tile-6");
    const display7 = document.querySelector("#tile-7");
    const display8 = document.querySelector("#tile-8");
    const display9 = document.querySelector("#tile-9");

    display1.textContent = newBoard[0];
    display2.textContent = newBoard[1];
    display3.textContent = newBoard[2];
    display4.textContent = newBoard[3];
    display5.textContent = newBoard[4];
    display6.textContent = newBoard[5];
    display7.textContent = newBoard[6];
    display8.textContent = newBoard[7];
    display9.textContent = newBoard[8];
    
  }

};

const board1 = new Display();
board1.displayBoard();