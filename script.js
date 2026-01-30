function Gameboard() {
  const rows = 3;
  const columns = 3;
  let board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
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
    return { getBoard, placeMark, printBoard };
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
    console.log(`${getActivePlayer().name}'s turn.`);
  };
    function winCondition () {
    const b = board.getBoard().map(row => row.map(cell => cell.getValue()));
    for (let i = 0; i < 3; i++) {
      if (b[i][0] !== 0 && b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
        console.log(`${b[i][0]} wins!`);
        return true;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (b[0][i] !== 0 && b[0][i] === b[1][i] && b[1][i] === b[2][i]) {
        console.log(`${b[0][i]} wins!`);
        return true;
      }
    }
    if (b[0][0] !== 0 && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
      console.log(`${b[0][0]} wins!`);
      return true;
    }
    if (b[0][2] !== 0 && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
      console.log(`${b[0][2]} wins!`);
      return true;
    }
    return false;
  }
  const playRound = (column, row) => {
    new Display.renderBoard;
    if (board.getBoard()[row][column].getValue() === 0) {
      board.placeMark(column, row, getActivePlayer().mark);
      console.log(`Placing ${getActivePlayer().name}'s mark to column ${column} row ${row}.`);
      switchPlayer();
    } else {
      console.log("Choose again!");
    }

  if (winCondition() === true) {
    return;
  } else {
    winCondition();
    printNewRound();
  }
  };
  printNewRound();
  return {
    playRound, printNewRound
  };
}

const game = GameController();
window.playRound = game.playRound;

function Display(board, markers) {
  this.board = board;
  this.markers = markers;
  this.displayBoard = function() {
    const renderBoard = document.getElementById("playboard");
    const fillBoard = document.
    return renderBoard;
  };
}

const board1 = new Display();
board1.displayBoard();