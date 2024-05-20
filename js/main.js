document.addEventListener('DOMContentLoaded', () => {
  const boardSize = 10;
  const board = document.getElementById('board');

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');

      board.appendChild(tile);
    }
  }

  const tileSize = getTileSize(document.getElementsByClassName('tile').item(0));
  board.style.width = boardSize * tileSize + 'px';
});

const getTileSize = (tile) => {
  if(!tile) {
    return 0;
  }

  const style = getComputedStyle(tile);
  const width = parseInt(style.width)
  const marginLeft = parseInt(style.marginLeft)
  const marginRight = parseInt(style.marginRight)

  return width + marginLeft + marginRight;
}
