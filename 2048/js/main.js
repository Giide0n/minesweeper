document.addEventListener('DOMContentLoaded', () => {
  initializeBoard();

  spawnTile();
  spawnTile();

  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        break;
      case 'ArrowDown':
        break;
      case 'ArrowLeft':
        break;
      case 'ArrowRight':
        swipeRight();
        break;
      default:
        break;
    }
  });
});

const initializeBoard = () => {
  const board = document.getElementById('board');
  for (let i = 0; i < 16; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.classList.add('empty');

    board.appendChild(tile);
  }
}

const spawnTile = () => {
  const tiles = document.getElementsByClassName('tile');
  let r;
  do {
    r = Math.floor(Math.random() * 16);
  } while (!tiles[r].classList.contains('empty'))

  tiles[r].classList.remove('empty');
  tiles[r].classList.add('number-2')
}

const swipeRight = () => {
  const tiles = document.getElementsByClassName('tile');
  for (let i = 0; i < 4; i++) {
    for (let j = 3; j >= 0; j--) {
      const idx = 4 * i + j;
      if(!tiles[idx].classList.contains('empty')) {
        const numberClass = extractValue(tiles[idx]);
      }
    }
  }
}

const extractValue = (tile) => {
  for (let i = 0; i < tile.classList.length; i++) {
    if (tile.classList[i].startsWith('number-')) {
      return tile.classList[i];
    }
  }
  return null;
}
