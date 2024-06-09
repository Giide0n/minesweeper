document.addEventListener('DOMContentLoaded', () => {
  initializeBoard();

  spawnTile();
  spawnTile();
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

