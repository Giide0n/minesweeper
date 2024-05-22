document.addEventListener('DOMContentLoaded', () => {
  window.showLossScreen = showLossScreen;
});

const showLossScreen = () => {
  document.getElementById('loss-screen').classList.add('popover-open');
}
