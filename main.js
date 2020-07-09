// Factory function for players
const Player = (name) => {
  const getName = () => name;
  return {
    getName,
  }
};

// Module for game board
const gameBoard = (function() {
  let grid = ['', '', '', '', '', '', '', '', ''];

  const showGrid = () => {
    return grid;
  }

  return {
    showGrid,
  };
})();

const displayController = (function() {
  const mainContainerDiv = document.getElementById('main-container');
  const gameBoardDiv = document.createElement('div');
  gameBoardDiv.id = 'game-board';

  const modalEndgame = document.getElementById('modal-endgame');
  const endgameDisplay = document.getElementById('endgame-display');
  const modalStartgame = document.getElementById('modal-startgame');

  const render = () => {
    const grid = gameBoard.showGrid();
    let count = 0;
    for (cell of grid) {
      newCell = document.createElement('div');
      newCell.classList.add('cell');
      newCell.id = count;
      newCell.textContent = cell;
      gameBoardDiv.appendChild(newCell);
      count++;
    }
    mainContainerDiv.appendChild(gameBoardDiv);
  }
  
  const changeCell = (id, p1Turn) => {
    const cell = document.getElementById(id);
    if (cell.textContent == '') { 
      cell.textContent = p1Turn == true ? 'X' : 'O';
      cell.style.color = p1Turn == true ? '#4ecdc4' : '#ffa62b';  
      p1Turn = !p1Turn;
    }
  }

  const resetGrid = (p1Turn=true) => {
    const allCells = document.querySelectorAll('.cell');
    allCells.forEach( cell => {
      cell.textContent = '';
    });
    displayTurn(p1Turn, p1.getName(), p2.getName());
  }

  const openModalWin = (p1Turn) => {
    let player = p1Turn == true ? p1.getName() : p2.getName();
    endgameDisplay.textContent = 'Congratulations, ' + player + ' wins!';
    modalEndgame.style.display = 'block';
  }

  const openModalTie = () => {
    endgameDisplay.textContent = 'It\'s a tie!';
    modalEndgame.style.display = 'block';
  }

  const clickPlayAgain = () => {
    const playAgainBtn = document.getElementById('play-again-button');
    playAgainBtn.addEventListener('click', (e) => {
      modalEndgame.style.display = 'none';
      resetGrid(!p1Turn);
      p1Turn = !p1Turn;
    });
  }

  const displayTurn = (p1Turn) => {
    const player1Display = document.getElementById('player-1-display');
    const player2Display = document.getElementById('player-2-display');
    if (p1Turn) {
      player1Display.textContent = p1.getName() + '\'s turn';
      player2Display.textContent = ''; 
    } else {
      player2Display.textContent = p2.getName() + '\'s turn';
      player1Display.textContent = '';
    }
  }

  return {
    render,
    changeCell,
    resetGrid,
    openModalWin,
    openModalTie,
    clickPlayAgain,
    displayTurn,
  }
})();

const gameController = (function() {

  const clickGridCells = () => {
    const gridCells = document.querySelectorAll('.cell');
    gridCells.forEach(cell => { 
      cell.addEventListener('click', (e) => {
        if (cell.textContent == '') {
          displayController.changeCell(e.target.id, p1Turn);
          if (!checkWin(p1Turn)) {
            p1Turn = !p1Turn;
            displayController.displayTurn(p1Turn);
          }
        }
      });
    });
  }

  const clickResetBtn= () => {
    const resetBtn = document.getElementById('reset-button');
    resetBtn.addEventListener('click', (e) => {
      displayController.resetGrid(p1Turn);
    });
  }

  const checkWin = (p1Turn) => {
    // 123, 456, 789, 147, 258, 369, 159, 357 
    cells = []
    for (let id = 0; id < 9; id++) {
      cells.push(document.getElementById(id).textContent);
    }
    if ((cells[0] != '' && cells[0] == cells[1] && cells [0] == cells[2]) ||
    (cells[3] != '' && cells[3] == cells[4] && cells [3] == cells[5]) ||
    (cells[6] != '' && cells[6] == cells[7] && cells [6] == cells[8]) ||
    (cells[0] != '' && cells[0] == cells[3] && cells [0] == cells[6]) ||
    (cells[1] != '' && cells[1] == cells[4] && cells [1] == cells[7]) ||
    (cells[2] != '' && cells[2] == cells[5] && cells [2] == cells[8]) ||
    (cells[0] != '' && cells[0] == cells[4] && cells [0] == cells[8]) ||
    (cells[2] != '' && cells[2] == cells[4] && cells [2] == cells[6])) {
      winner = p1Turn == true ? p1.getName() : p2.getName(); 
      console.log(winner + ' wins!');
      displayController.openModalWin(p1Turn);
      return true;
    } else if (cells[0] != '' && cells[1] != '' && cells[2] != '' &&
        cells[3] != '' && cells[4] != '' && cells[5] != '' &&
        cells[6] != '' && cells[7] != '' && cells[8] != '') {
      console.log('It\'s a tie!');
      displayController.openModalTie();
      return false;
    }
  }

  const clickStartgameButton = () => {
    const modalStartgame = document.getElementById('modal-startgame');
    const startgameButton = document.getElementById('startgame-button');
    startgameButton.addEventListener('click', () => {
      modalStartgame.style.display = 'none';
      p1Name = document.getElementById('p1-input').value;
      p2Name = document.getElementById('p2-input').value;
      p1 = Player(p1Name);
      p2 = Player(p2Name);
      displayController.displayTurn(true);
    });
  }

  return {
    clickGridCells,
    clickResetBtn,
    checkWin,
    clickStartgameButton,
  }
})();

let p1Turn = true;
let p1 = '';
let p2 = '';

displayController.render();
gameController.clickStartgameButton();
gameController.clickGridCells();
gameController.clickResetBtn();
displayController.clickPlayAgain();
