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
    return { getBoard, placeMark, printBoard, placeMark};
};


function Cell() {
  let value = 0;
  const addMark = (player) => {
    value = player;
  };
  const getValue = () => value;
  return {
    addMark,
    getValue
  };
};

let gameOver = false;

//function endGame() {
  //if(gameOver === true) {
    //console.log("Game Over");
  //}
//};

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

  const nameOne = document.querySelector("#submit-1");
  let name1;
  nameOne.addEventListener('click', () => {
    name1 = document.getElementById("name-1").value;
    players[0].name = name1;
    document.getElementById("turn-output").textContent = `Hello ${name1}`
    document.getElementById("name-1").value = "";
    console.log(name1);
});

  const nameTwo = document.querySelector("#submit-2");
  let name2;
  nameTwo.addEventListener('click', () => {
    name2 = document.getElementById("name-2").value;
    players[1].name = name2;
    document.getElementById("turn-output").textContent = `Hello ${name2}`
    document.getElementById("name-2").value = "";
    console.log(name2);
});


  function winCondition () {
    
    const b = board.getBoard().map(row => row.map(cell => cell.getValue()));
    for (let i = 0; i < 3; i++) {
      if (b[i][0] !== 0 && b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
        document.querySelector("#output").textContent = `${getActivePlayer().name} wins!`;
        document.querySelector("#turn-output").textContent = "";
        //console.log(`${getActivePlayer().name} wins!`);
        board.printBoard()
        gameOver = true;
        return true;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (b[0][i] !== 0 && b[0][i] === b[1][i] && b[1][i] === b[2][i]) {
        document.querySelector("#output").textContent = `${getActivePlayer().name} wins!`;
        document.querySelector("#turn-output").textContent = "";
        //console.log(`${getActivePlayer().name} wins!`);
        board.printBoard()
        gameOver = true;
        return true;
      }
    }
    if (b[0][0] !== 0 && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
      document.querySelector("#output").textContent = `${getActivePlayer().name} wins!`;
      document.querySelector("#turn-output").textContent = "";
      //console.log(`${getActivePlayer().name} wins!`);
      board.printBoard()
      gameOver = true;
      return true;
    }
    if (b[0][2] !== 0 && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
      document.querySelector("#output").textContent = `${getActivePlayer().name} wins!`;
      document.querySelector("#turn-output").textContent = "";
      //console.log(`${getActivePlayer().name} wins!`);
      board.printBoard()
      gameOver = true;
      return true;
    }
    return false;
  }

  function resetBoard() {
    const boardArr = board.getBoard();
    for (let row of boardArr) {
      for (let cell of row) {
        cell.addMark(0);
        activePlayer = players[0];
        document.querySelector("#output").textContent = "";
        document.querySelector("#turn-output").textContent = "";
      }
    }
    gameOver = false;
    Display();
  }

  function Display() {
    const viewBoard = board.getBoard().flat().map(cell => cell.getValue());
    for (let i = 0; i < 9; i++) {
      const tile = document.querySelector(`#tile-${i+1}`);
      if (tile) {
        tile.textContent = viewBoard[i] === 0 ? "" : viewBoard[i];
      };
    };
  };

  function draw() {
    const tileValue = board.getBoard().flat().map(cell => cell.getValue());
    if (tileValue.every(val => val !== 0) && !winCondition()) {
      document.querySelector("#output").textContent = "It's a draw!";
      document.querySelector("#turn-output").textContent = "";
      gameOver = true;
      activePlayer = players[0];
      return true;
    }
    return false;
  };
  const playRound = (column, row) => {
    if (gameOver === false) {
      Display();
      
      if (board.getBoard()[row][column].getValue() === 0) {
        board.placeMark(column, row, getActivePlayer().mark);
        document.querySelector("#output").textContent = `Placing ${getActivePlayer().name}'s mark to column ${column} row ${row}.`;
        draw();
        Display();
        if (!winCondition() && !draw()) {
          switchPlayer();
          document.querySelector("#turn-output").textContent = `${getActivePlayer().name}'s turn`;
          printNewRound();
        }
        return;
      } else if (board.getBoard()[row][column].getValue() !== 0){
        document.querySelector("#output").textContent = `Choose again! cannot place ${getActivePlayer().name}'s mark at ${column} row ${row} `;
        return;
        //console.log(`Choose again! cannot place ${getActivePlayer().name}'s mark at ${column} row ${row} `);
        //console.log(`${getActivePlayer().name}'s turn`)
      } else if (winCondition === true) {
        getActivePlayer().name = playerOne;
        getActivePlayer().mark = "X";
        document.querySelector("#turn-output").textContent = "";
        return;
      } else {
        document.querySelector("#turn-output").textContent = "";
      };
    };
  };

  const start = document.querySelector("#start");
  start.addEventListener('click', () => {
    document.querySelector("#output").textContent = "";
    activePlayer = players[0];
    board.printBoard();
    document.querySelector("#turn-output").textContent = "";
    document.querySelector("#turn-output").textContent = `${getActivePlayer().name}'s turn`
    game.resetBoard();
    players[0].name = "Player One";
    players[1].name = "Player Two";
    document.getElementById("turn-output").textContent = "Enter player names!"
  });
  return { playRound, printNewRound, Display, resetBoard, getActivePlayer };
};
const clickMark = (event) => {
  const tile = event.target;
  const row = parseInt(tile.dataset.row, 10);
  const col = parseInt(tile.dataset.col, 10);
  game.playRound(col, row);
};
const game = GameController();
window.playRound = game.playRound;


const tiles = document.querySelectorAll(".tiles");
tiles.forEach(element => element.addEventListener('click', clickMark));

const resetButton = document.querySelector("#reset")
resetButton.addEventListener('click', () => {
  game.resetBoard();
});


