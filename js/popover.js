document.addEventListener('DOMContentLoaded', () => {
  window.resetScreens = resetScreens;
  window.showLossScreen = showLossScreen;
});

const resetScreens = () => {
  document.getElementById('loss-screen').classList.remove('popover-open');
}

const showLossScreen = () => {
  document.getElementById('loss-screen').classList.add('popover-open');
}
