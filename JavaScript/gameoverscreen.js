/**
 * Displays the game over screen and hides the game canvas.
 */
function showGameOverScreen() {
  document.getElementById("canvas").style.display = "none";
  document.getElementById("gameover-screen").style.display = "flex";
}

/**
 * Restarts the game by hiding the game over screen, showing the canvas, and reinitializing the game.
 */
function restartGame() {
  document.getElementById("gameover-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  init();
}

/**
 * Returns to the home screen by hiding the game over screen and displaying the start screen.
 */
function goToHome() {
  document.getElementById("gameover-screen").style.display = "none";
  document.getElementById("startscreen").style.display = "flex";
}
