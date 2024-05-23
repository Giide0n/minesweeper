document.addEventListener('DOMContentLoaded', () => {
  window.resetScreens = resetScreens;
  window.showLossScreen = showLossScreen;
  window.showWinScreen = showWinScreen;
});

const resetScreens = () => {
  document.getElementById('loss-screen').classList.remove('popover-open');
  document.getElementById('win-screen').classList.remove('popover-open');
}

const showLossScreen = () => {
  document.getElementById('loss-screen').classList.add('popover-open');
}

const showWinScreen = () => {
  document.getElementById('win-screen').classList.add('popover-open');
}
