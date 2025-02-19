/**
 * Navigates back to the home screen by clearing intervals and updating the display.
 */
function homeGame() {
  clearAllGameIntervals();
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("win-screen").style.display = "none";
  document.getElementById("game-container").style.display = "none";
  document.getElementById("startscreen").style.display = "flex";
}

/**
 * Resets the game state without reloading the page.
 * Clears all intervals, resets UI elements, recreates the level, and restarts background music if not muted.
 */
function resetGame() {
  clearAllGameIntervals();
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("win-screen").style.display = "none";
  level1 = createLevel1();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  world.statusBar.setPercentage(100);
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  if (localStorage.getItem("muteStatus") !== "true") {
    backgroundMusic.play().catch(() => {});
  }
}
