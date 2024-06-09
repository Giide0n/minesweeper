document.addEventListener('DOMContentLoaded', () => {
  initializeBoard();
});

const initializeBoard = () => {
  const board = document.getElementById('board');
  for (let i = 0; i < 16; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');

    board.appendChild(tile);
  }
}
