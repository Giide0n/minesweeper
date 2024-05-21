const MINE = '*';
const EMPTY = '';

let boardState = [];
let boardHeight;
let boardWidth;
let numberOfMines;

document.addEventListener('DOMContentLoaded', () => {
  const radioButtons = document.querySelectorAll('input[name="difficulty"]');
  radioButtons.forEach(r => {
    r.addEventListener('change', initializeBoard);
  });

  document.getElementById('solve').addEventListener('click', clickSolve);

  initializeBoard();
});

const initializeBoard = () => {
  setDifficulty();

  const board = document.getElementById('board');
  board.innerHTML = '';
  boardState = [];

  for (let i = 0; i < boardHeight; i++) {
    boardState.push([])
    for (let j = 0; j < boardWidth; j++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.row = i;
      tile.col = j;
      tile.addEventListener('click', clickTile);
      tile.addEventListener('contextmenu', flagTile);

      boardState[i].push(EMPTY);

      board.appendChild(tile);
    }
  }

  placeMines();
  calculateDangerLevels();

  const tileSize = getTileSize(document.getElementsByClassName('tile').item(0));
  board.style.width = boardWidth * tileSize + 'px';
}

const setDifficulty = () => {
  const difficulty = document.querySelector(
      'input[name="difficulty"]:checked').value;
  switch (difficulty) {
    case 'easy':
      boardHeight = 9;
      boardWidth = 9;
      numberOfMines = 10;
      break;
    case 'medium':
      boardHeight = 16;
      boardWidth = 16;
      numberOfMines = 40;
      break;
    case 'hard':
      boardHeight = 16;
      boardWidth = 30;
      numberOfMines = 99;
      break;
  }
}

const clickTile = (event) => {
  event.preventDefault();
  revealTile(event.currentTarget);
}

const revealTile = (tile) => {
  if (!tile.classList.contains('flagged')) {
    setTileRevealed(tile);

    if (boardState[tile.row][tile.col] === EMPTY) {
      setTimeout(() => {
        maybeReveal(Math.max(tile.row - 1, 0), tile.col);
        maybeReveal(Math.min(tile.row + 1, boardHeight - 1), tile.col);
        maybeReveal(tile.row, Math.max(tile.col - 1, 0));
        maybeReveal(tile.row, Math.min(tile.col + 1, boardWidth - 1));
      }, 75)
    }
  }
}

const setTileRevealed = (tile) => {
  const tileClass = getTileClass(boardState[tile.row][tile.col]);
  tile.classList.add('revealed', tileClass);
  tile.innerHTML = boardState[tile.row][tile.col];
}

const maybeReveal = (row, col) => {
  const tile = getTile(row, col);
  if (!tile.classList.contains('revealed')) {
    revealTile(tile);
  }
}

const getTile = (row, col) => {
  return document.querySelectorAll('.tile')[boardWidth * row + col];
}

const getTileClass = (field) => {
  let tileClass;

  switch (field) {
    case MINE:
      tileClass = 'mine';
      break;
    case EMPTY:
      tileClass = 'empty';
      break;
    default:
      tileClass = 'number-' + field;
      break;
  }

  return tileClass;
}

const clickSolve = () => {
  solve(getTile(0, 0));
}

const solve = (tile) => {
  console.log(tile);
  tile.classList.remove('flagged');
  setTileRevealed(tile);

  setTimeout(() => {
    if(tile.row + 1 < boardHeight) {
      solve(getTile(tile.row + 1, tile.col));
    }
    if(tile.col + 1 < boardWidth) {
      solve(getTile(tile.row, tile.col + 1));
    }
  }, 75);
}

const flagTile = (event) => {
  event.preventDefault();
  const tile = event.currentTarget;
  if (!tile.classList.contains('revealed')) {
    if (tile.classList.contains('flagged')) {
      tile.classList.remove('flagged');
    } else {
      tile.classList.add('flagged');
    }
  }
}

const placeMines = () => {
  const mineCoordinates = new Set();

  while (mineCoordinates.size < numberOfMines) {
    const row = Math.floor(Math.random() * boardHeight);
    const col = Math.floor(Math.random() * boardWidth);
    mineCoordinates.add(`${row},${col}`);
  }

  mineCoordinates.forEach(m => {
    const [row, col] = m.split(',');
    boardState[row][col] = MINE;
  });
}

const calculateDangerLevels = () => {
  boardState.forEach((r, row) => {
    r.forEach((tile, col) => {
      if (boardState[row][col] === MINE) {
        increaseDanger(row, col);
      }
    });
  });
}

const increaseDanger = (row, col) => {
  for (let i = Math.max(row - 1, 0);
      i <= Math.min(row + 1, boardHeight - 1);
      i++) {
    for (let j = Math.max(col - 1, 0);
        j <= Math.min(col + 1, boardWidth - 1);
        j++) {
      if (boardState[i][j] !== MINE) {
        boardState[i][j] = boardState[i][j] === EMPTY ? 1 : parseInt(
            boardState[i][j]) + 1;
      }
    }
  }
}

const getTileSize = (tile) => {
  if (!tile) {
    return 0;
  }

  const style = getComputedStyle(tile);
  const width = parseInt(style.width)
  const marginLeft = parseInt(style.marginLeft)
  const marginRight = parseInt(style.marginRight)

  return width + marginLeft + marginRight;
}
