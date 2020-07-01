// Create players
const players = (name) => {
  const getName = () => name;
  return {
    getName
  };
};

// Create game board
const gameBoard = (function() {
  let grid = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];

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

  const grid = gameBoard.showGrid();
  let count = 1;
  for (cell of grid) {
    newCell = document.createElement('div');
    newCell.classList.add('cell');
    newCell.id = count;
    newCell.textContent = cell;
    gameBoardDiv.appendChild(newCell);
    count++;
  }
  mainContainerDiv.appendChild(gameBoardDiv);
})();

const gameController = (function() {

})();
