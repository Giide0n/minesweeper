const MINE = '*';
const EMPTY = '';

const boardState = [];
const boardSize = 10;

document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');

  for (let i = 0; i < boardSize; i++) {
    boardState.push([])
    for (let j = 0; j < boardSize; j++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.row = i;
      tile.col = j;
      tile.addEventListener('click', revealTile)

      boardState[i].push(EMPTY);

      board.appendChild(tile);
    }
  }

  placeMines();
  calculateDangerLevels();

  const tileSize = getTileSize(document.getElementsByClassName('tile').item(0));
  board.style.width = boardSize * tileSize + 'px';
});

const revealTile = (event) => {
  const tile = event.currentTarget;
  const tileClass = getTileClass(boardState[tile.row][tile.col]);
  tile.classList.add('revealed', tileClass);
  tile.innerHTML = boardState[tile.row][tile.col];
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

const placeMines = () => {
  const numberOfMines = Math.pow(boardSize, 2) / 10;
  const mineCoordinates = new Set();

  while (mineCoordinates.size < numberOfMines) {
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);
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
  for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, boardSize - 1);
      i++) {
    for (let j = Math.max(col - 1, 0); j <= Math.min(col + 1, boardSize - 1);
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
