



function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

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
}

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
}

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
  const playRound = (column, row) => {
    if (board.getBoard()[row][column].getValue() === 0) {
      board.placeMark(column, row, getActivePlayer().mark);
      console.log(`Placing ${getActivePlayer().name}'s mark to column ${column} row ${row}.`);
      switchPlayer();
    } else {
      console.log("Choose again!");
    }


    checkRow

    //add logic to check for winner here
    printNewRound();
  };
  printNewRound();
  return {
    playRound
  };
}

const game = GameController();
window.playRound = game.playRound;
